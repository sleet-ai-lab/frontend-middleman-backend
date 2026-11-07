export function resolve_base_url(
  argv: string[],
  default_base_url: string,
): string {
  const index = argv.indexOf("--base-url");
  if (index !== -1 && index + 1 < argv.length) {
    const value = argv[index + 1];
    if (value && value.length > 0) return value;
  }
  return default_base_url;
}
