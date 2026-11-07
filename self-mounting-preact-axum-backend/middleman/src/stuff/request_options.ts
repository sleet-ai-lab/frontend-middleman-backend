// ========================================
// REQUEST_OPTIONS
export interface REQUEST_OPTIONS {
  api_key?: string;
  headers?: Record<string, string>;
}

// ========================================
// BUILD_HEADERS_FUN
export function build_headers(
  options: REQUEST_OPTIONS = {},
  extra: Record<string, string> = {},
): Record<string, string> {
  const out: Record<string, string> = {};
  if (options.api_key) {
    out["x-api-key"] = options.api_key;
  }
  Object.assign(out, extra, options.headers ?? {});
  return out;
}
// ========================================
