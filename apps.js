"use strict";

(() => {
  const appsData = [
    { id: "com.fabianocesar.estado", nome: "Estado: Plano Quinquenal", versao: "1.0.0", categoria: "game", screenshotUrl: "/assets/apps/estado-preview.jpg", iconeUrl: "/assets/apps/estado-icon.jpg", qrUrl: "/assets/apps/estado-qr.png", playStoreUrl: "https://play.google.com/store/apps/details?id=com.fabianocesar.estado", descricao: { "pt-br": "O expediente nunca termina — mas os carimbos precisam continuar!\n\nBem-vindo ao Estado: Plano Quinquenal, um jogo casual idle/clicker de sátira burocrática, totalmente local e offline. Assine formulários, automatize repartições públicas fictícias e cumpra metas produtivas implacáveis para alcançar a glória administrativa.\n\nAqui, a burocracia não é um obstáculo: é a sua maior aliada.", en: "The workday never ends — but the stamps must keep moving!\n\nWelcome to Estado: Plano Quinquenal, a fully local, offline casual idle/clicker game that satirizes bureaucracy. Sign forms, automate fictional public offices, and meet relentless production goals to achieve administrative glory.\n\nHere, bureaucracy is not an obstacle: it is your greatest ally.", es: "La jornada nunca termina, ¡pero los sellos deben seguir funcionando!\n\nBienvenido a Estado: Plano Quinquenal, un juego casual idle/clicker de sátira burocrática, totalmente local y sin conexión. Firma formularios, automatiza oficinas públicas ficticias y cumple metas de producción implacables para alcanzar la gloria administrativa.\n\nAquí, la burocracia no es un obstáculo: es tu mayor aliada." } },
    { id: "com.facrf.rxauto", nome: "RXAuto", versao: "1.0", categoria: "utility", screenshotUrl: "/assets/apps/rxauto-preview.jpg", iconeUrl: "/assets/apps/rxauto-icon.png", qrUrl: "/assets/apps/rxauto-qr.png", playStoreUrl: "https://play.google.com/store/apps/details?id=com.facrf.rxauto", descricao: { "pt-br": "RxAuto é seu organizador completo para cuidar do veículo com mais tranquilidade. Registre abastecimentos, manutenções, despesas e lembretes, acompanhe indicadores importantes e mantenha documentos e fotos protegidos no seu aparelho.", en: "RxAuto is your complete organizer for taking care of your vehicle with greater peace of mind. Record fuel stops, maintenance, expenses, and reminders; follow key indicators; and keep documents and photos protected on your device.", es: "RxAuto es tu organizador completo para cuidar tu vehículo con mayor tranquilidad. Registra abastecimientos, mantenimientos, gastos y recordatorios; sigue indicadores importantes y conserva documentos y fotos protegidos en tu dispositivo." } },
    { id: "com.facrf.edfin", nome: "edFin — Finanças Pessoais", versao: "1.0.2", categoria: "finance", screenshotUrl: "/assets/apps/edfin-preview.jpg", iconeUrl: "/assets/apps/edfin-icon.png", qrUrl: "/assets/apps/edfin-qr.png", playStoreUrl: "https://play.google.com/store/apps/details?id=com.facrf.edfin", descricao: { "pt-br": "edFin — Finanças Pessoais é um aplicativo brasileiro para organizar sua vida financeira com clareza, privacidade e sem complicação.\n\nCadastre contas, dívidas, valores a receber, metas, reserva de emergência e limites mensais por categoria. Acompanhe vencimentos, pagamentos, recebimentos e movimentações recentes em um só lugar.", en: "edFin — Personal Finance is a Brazilian app for organizing your financial life with clarity, privacy, and no hassle.\n\nAdd accounts, debts, receivables, goals, an emergency fund, and monthly category limits. Track due dates, payments, income, and recent activity in one place.", es: "edFin — Finanzas Personales es una aplicación brasileña para organizar tu vida financiera con claridad, privacidad y sin complicaciones.\n\nRegistra cuentas, deudas, importes por cobrar, metas, fondo de emergencia y límites mensuales por categoría. Sigue vencimientos, pagos, cobros y movimientos recientes en un solo lugar." } },
    { id: "com.ideias.appsite", nome: "AppSite", versao: "1.2", categoria: "education", screenshotUrl: "/assets/apps/appsite-preview.png", iconeUrl: "/assets/apps/appsite-icon.png", qrUrl: "/assets/apps/appsite-qr.png", playStoreUrl: "https://play.google.com/store/apps/details?id=com.ideias.appsite", descricao: { "pt-br": "Neste aplicativo temos desde noções básicas de programação até software de auxílio à criação de sistemas informatizados.", en: "This app covers everything from programming fundamentals to software that supports the creation of information systems.", es: "Esta aplicación abarca desde nociones básicas de programación hasta software que ayuda a crear sistemas informatizados." } },
  ];
  const labels = { "pt-br": { version: "Versão", available: "Disponível no", screenshot: "Ver prévia do aplicativo", qr: "Abrir QR Code do aplicativo", all: "Todos", game: "Jogo", utility: "Utilitário", finance: "Finanças", education: "Educação" }, en: { version: "Version", available: "Get it on", screenshot: "View app preview", qr: "Open app QR code", all: "All", game: "Game", utility: "Utility", finance: "Finance", education: "Education" }, es: { version: "Versión", available: "Disponible en", screenshot: "Ver vista previa de la aplicación", qr: "Abrir código QR de la aplicación", all: "Todos", game: "Juego", utility: "Utilidad", finance: "Finanzas", education: "Educación" } };
  const categories = ["all", "game", "utility", "finance", "education"];
  const container = document.getElementById("app-catalog-container");
  const filterContainer = document.getElementById("app-catalog-filters");
  if (!container || !filterContainer) return;
  let activeCategory = "all";
  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const image = (className, src, width, height) => {
    const node = document.createElement("img");
    node.className = className;
    node.src = src;
    node.alt = "";
    node.width = width;
    node.height = height;
    node.loading = "lazy";
    return node;
  };
  const link = (className, href, label) => {
    const node = document.createElement("a");
    node.className = className;
    node.href = href;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    node.setAttribute("aria-label", label);
    return node;
  };
  const playBadge = (app, copy) => {
    const badge = link("app-catalog-play-badge", app.playStoreUrl, `${copy.available} Google Play: ${app.nome}`);
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.add("app-catalog-play-icon");
    icon.setAttribute("viewBox", "0 0 40 44");
    icon.setAttribute("aria-hidden", "true");
    [["#00d7ff", "M3 3 24 22 3 41c-1 1-3 0-3-2V5c0-2 2-3 3-2Z"], ["#00e676", "m3 3 27 16-6 3L3 3Z"], ["#ffca28", "m3 41 21-19 6 3L3 41Z"], ["#ff5252", "m30 19 7 2c2 1 2 3 0 4l-7 2-6-5 6-3Z"]].forEach(([fill, d]) => { const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("fill", fill); path.setAttribute("d", d); icon.append(path); });
    const label = element("span", "app-catalog-play-copy");
    label.append(element("small", "", copy.available), element("strong", "", "Google Play"));
    badge.append(icon, label);
    return badge;
  };
  const createCard = (app, language) => {
    const copy = labels[language] || labels["pt-br"];
    const article = element("article", "app-catalog-card");
    const header = element("div", "app-catalog-card-header");
    const titleGroup = element("div");
    titleGroup.append(element("h3", "", app.nome), element("p", "app-catalog-version", `${copy.version} ${app.versao}`));
    header.append(image("app-catalog-icon", app.iconeUrl, 64, 64), titleGroup);
    const gallery = link("app-catalog-gallery", app.playStoreUrl, `${copy.screenshot}: ${app.nome}`);
    gallery.append(image("", app.screenshotUrl, 230, 512), element("span", "app-catalog-gallery-caption", copy.screenshot));
    const qr = link("app-catalog-qr", app.playStoreUrl, `${copy.qr}: ${app.nome}`);
    qr.append(image("", app.qrUrl, 114, 114));
    const actions = element("div", "app-catalog-actions");
    actions.append(playBadge(app, copy), qr);
    const footer = element("footer", "app-catalog-footer");
    footer.append(element("p", "app-catalog-package", app.id), actions);
    article.append(header, element("p", "app-catalog-description", app.descricao[language] || app.descricao["pt-br"]), gallery, footer);
    return article;
  };
  const renderApps = (language = "pt-br") => {
    const copy = labels[language] || labels["pt-br"];
    container.replaceChildren(...appsData.filter((app) => activeCategory === "all" || app.categoria === activeCategory).map((app) => createCard(app, language)));
    filterContainer.replaceChildren(...categories.map((category) => {
      const filter = element("button", "app-catalog-filter", copy[category]);
      filter.type = "button";
      filter.setAttribute("aria-pressed", String(category === activeCategory));
      filter.addEventListener("click", () => { activeCategory = category; renderApps(language); });
      return filter;
    }));
  };
  renderApps();
  window.addEventListener("site:languagechange", (event) => renderApps(event.detail.language));
})();
