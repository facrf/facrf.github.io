"use strict";

document.documentElement.classList.add("js");

const state = { language: "pt-br", translations: null, repositories: [] };
const languageAliases = { pt: "pt-br", "pt-br": "pt-br", en: "en", es: "es" };
const localeNames = { "pt-br": "pt-BR", en: "en", es: "es" };
const openGraphLocales = { "pt-br": "pt_BR", en: "en_US", es: "es_ES" };
const siteUrl = "https://fabianocesar.com/";

function preferredLanguage() {
  const requestedLanguage = new URLSearchParams(window.location.search)
    .get("lang")
    ?.toLowerCase();
  if (requestedLanguage && languageAliases[requestedLanguage])
    return languageAliases[requestedLanguage];
  try {
    const saved = localStorage.getItem("language");
    if (saved && languageAliases[saved]) return languageAliases[saved];
  } catch (_) {}
  const browserLanguage = (navigator.language || "pt-br").toLowerCase();
  return (
    languageAliases[browserLanguage] ||
    languageAliases[browserLanguage.split("-")[0]] ||
    "pt-br"
  );
}

function setMetaContent(selector, content) {
  const meta = document.querySelector(selector);
  if (meta && content) meta.content = content;
}

function synchronizeLocalizedMetadata(language) {
  const title = text("meta_title") || document.title;
  const description = text("meta_description");
  const canonicalUrl = new URL(siteUrl);
  if (language !== "pt-br") canonicalUrl.searchParams.set("lang", language);

  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:locale"]', openGraphLocales[language]);
  setMetaContent('meta[property="og:url"]', canonicalUrl.href);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute(
    "href",
    canonicalUrl.href,
  );

  const browserUrl = new URL(window.location.href);
  if (language === "pt-br") browserUrl.searchParams.delete("lang");
  else browserUrl.searchParams.set("lang", language);
  window.history.replaceState(
    window.history.state,
    "",
    `${browserUrl.pathname}${browserUrl.search}${browserUrl.hash}`,
  );
}

function text(key) {
  return (
    state.translations?.[state.language]?.[key] ||
    state.translations?.["pt-br"]?.[key] ||
    ""
  );
}

function applyLanguage(language) {
  if (!state.translations?.[language]) return;
  state.language = language;
  document.documentElement.lang = localeNames[language];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const translated = text(node.dataset.i18n);
    if (translated) node.textContent = translated;
  });
  document
    .querySelectorAll("[data-language]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === language),
      ),
    );
  synchronizeLocalizedMetadata(language);
  document
    .querySelector(".language-picker")
    ?.setAttribute("aria-label", text("language_label"));
  const menu = document.querySelector(".menu-toggle");
  menu?.setAttribute(
    "aria-label",
    menu.getAttribute("aria-expanded") === "true"
      ? text("menu_close")
      : text("menu_open"),
  );
  document
    .querySelector(".theme-toggle")
    ?.setAttribute("aria-label", text("theme_toggle"));
  try {
    localStorage.setItem("language", language);
  } catch (_) {}
  if (state.repositories.length) renderRepositories(state.repositories);
}

async function loadTranslations() {
  try {
    const response = await fetch("/traducoes.json", { cache: "force-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.translations = await response.json();
    applyLanguage(preferredLanguage());
  } catch (error) {
    console.warn("Não foi possível carregar as traduções.", error);
  }
}

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function repositoryCard(repo) {
  const card = element("a", "repo-card");
  card.href = repo.html_url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  const top = element("div", "repo-card-top");
  top.append(element("h3", "", repo.name));
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.add("external-icon");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M14 5h5v5M19 5 9 15M17 13v6H5V7h6");
  icon.append(path);
  top.append(icon);
  const description = element(
    "p",
    "repo-description",
    repo.description || text("repos_no_description"),
  );
  const metadata = element("div", "repo-meta");
  if (repo.language) {
    const language = element("span");
    language.append(
      element("i", "language-dot"),
      document.createTextNode(repo.language),
    );
    metadata.append(language);
  }
  if (Number(repo.stargazers_count) > 0)
    metadata.append(element("span", "", `★ ${repo.stargazers_count}`));
  card.append(top, description, metadata);
  return card;
}

function renderRepositories(repositories) {
  const container = document.getElementById("repos-container");
  const status = document.getElementById("repo-status");
  if (!container || !status) return;
  container.replaceChildren(...repositories.map(repositoryCard));
  status.hidden = true;
}

function showRepositoryFallback() {
  const status = document.getElementById("repo-status");
  if (!status) return;
  status.replaceChildren();
  const message = element(
    "span",
    "",
    text("repos_error") || "Veja os projetos diretamente no GitHub.",
  );
  message.dataset.i18n = "repos_error";
  const link = element(
    "a",
    "text-link",
    text("repos_fallback_link") || "Abrir GitHub",
  );
  link.dataset.i18n = "repos_fallback_link";
  link.href = "https://github.com/facrf?tab=repositories";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  status.append(message, link);
}

async function loadRepositories() {
  const cacheKey = "facrf-repositories-v2";
  let staleRepositories = [];
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (Array.isArray(cached?.data)) staleRepositories = cached.data;
    if (
      cached?.savedAt > Date.now() - 21600000 &&
      staleRepositories.length
    ) {
      state.repositories = cached.data;
      renderRepositories(state.repositories);
      return;
    }
  } catch (_) {}
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    let data;
    try {
      const response = await fetch("/repos-data.json", { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data = await response.json();
    } catch (e) {
      console.warn("Usando fallback da API do GitHub.", e);
      const response = await fetch(
        "https://api.github.com/users/facrf/repos?sort=updated&per_page=100",
        {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        },
      );
      if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
      const rawData = await response.json();
      data = rawData
        .filter((repo) => !repo.fork && !repo.archived)
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          html_url: repo.html_url,
        }));
    }

    if (!Array.isArray(data))
      throw new TypeError("Resposta inesperada de repositórios");
    state.repositories = data;
    if (!state.repositories.length)
      throw new Error("Nenhum repositório público encontrado");
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ savedAt: Date.now(), data: state.repositories }),
      );
    } catch (_) {}
    renderRepositories(state.repositories);
  } catch (error) {
    console.warn("Não foi possível carregar os repositórios.", error);
    if (staleRepositories.length) {
      state.repositories = staleRepositories;
      renderRepositories(state.repositories);
    } else {
      showRepositoryFallback();
    }
  } finally {
    clearTimeout(timeout);
  }
}

function initializeInterface() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menuPanel = document.querySelector(".header-panel");
  const updateHeader = () =>
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (menuButton?.getAttribute("aria-expanded") !== "true") return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      text("menu_open") || "Abrir menu",
    );
    menuPanel?.classList.remove("is-open");
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    if (!open) {
      closeMenu();
      return;
    }
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", text("menu_close") || "Fechar menu");
    menuPanel?.classList.add("is-open");
    window.requestAnimationFrame(() => menuPanel?.querySelector("a")?.focus());
  });
  document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) =>
    link.addEventListener("click", () => {
      closeMenu();
    }),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu({ restoreFocus: true });
  });
  document.addEventListener("pointerdown", (event) => {
    if (!header?.contains(event.target)) closeMenu();
  });
  const desktopMedia = window.matchMedia("(min-width: 961px)");
  const handleDesktopChange = (event) => {
    if (event.matches) closeMenu();
  };
  if (desktopMedia.addEventListener)
    desktopMedia.addEventListener("change", handleDesktopChange);
  else desktopMedia.addListener(handleDesktopChange);
  document
    .querySelectorAll("[data-language]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        applyLanguage(button.dataset.language),
      ),
    );
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').content =
      next === "dark" ? "#101713" : "#f4f1ea";
    try {
      localStorage.setItem("theme", next);
    } catch (_) {}
  });
  document.getElementById("current-year").textContent = String(
    new Date().getFullYear(),
  );
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((item) => revealObserver.observe(item));
    const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            navLinks.forEach((link) => {
              if (link.hash === `#${entry.target.id}`)
                link.setAttribute("aria-current", "true");
              else link.removeAttribute("aria-current");
            });
        }),
      { rootMargin: "-30% 0px -60%", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => navObserver.observe(section));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((item) => item.classList.add("is-visible"));
  }
}

initializeInterface();
Promise.allSettled([loadTranslations(), loadRepositories()]);
