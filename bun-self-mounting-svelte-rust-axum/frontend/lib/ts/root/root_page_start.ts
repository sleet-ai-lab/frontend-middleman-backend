// ========================================
// ROOT_PAGE_START_FUN
const REDIRECT_DELAY_MS = 1500;
const REDIRECT_TARGET = "./app/index.html";

if (typeof window !== "undefined") {
  window.setTimeout(() => {
    window.location.replace(REDIRECT_TARGET);
  }, REDIRECT_DELAY_MS);
}
// ========================================
