"use strict";

try {
  const savedTheme = localStorage.getItem("theme");
  const dark =
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
} catch (_) {}
