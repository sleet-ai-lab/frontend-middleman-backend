// ========================================
// BASE_URL
// the origin the frontend is served from, used as the base url for every
// api call. falls back to an empty string when there is no window (ssr /
// build time), so the relative url is used instead.
export const BASE_URL =
  typeof window !== "undefined" ? window.location.origin : "";
// ========================================
