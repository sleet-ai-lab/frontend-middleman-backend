import { ENDPOINT_PATHS, type EndpointKey } from "./endpoint_paths";
import { parse_error } from "./parse_error";
import { build_headers, type REQUEST_OPTIONS } from "./request_options";

export interface API_CALL_PARAMS {
  base_url: string;
  key: EndpointKey;
  path?: string;
  query?: Record<string, string | number | boolean | undefined>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  options?: REQUEST_OPTIONS;
  label: string;
  fallback: string;
}

export async function api_call<T = unknown>({
  base_url,
  key,
  path,
  query,
  method,
  body,
  options = {},
  label,
  fallback,
}: API_CALL_PARAMS): Promise<T> {
  let url = `${base_url}${path ?? ENDPOINT_PATHS[key]}`;
  if (query) {
    const entries = Object.entries(query).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined && entry[1] !== null && entry[1] !== "",
    );
    if (entries.length > 0) {
      const qs = new URLSearchParams(
        Object.fromEntries(
          entries.map(([k, v]) => [k, encode_query_value_fun(v)]),
        ),
      ).toString();
      url = `${url}?${qs}`;
    }
  }

  const init: RequestInit = {
    method,
    headers: build_headers(
      options,
      body !== undefined ? { "content-type": "application/json" } : {},
    ),
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  if (!res.ok) {
    throw await parse_error(res, fallback, {
      url,
      method,
      label,
      request_body: init.body,
    });
  }

  const json = (await res.json()) as T;
  console.log("=============================");
  console.log(` ${label} via ${method} on:`, url);
  console.log("RESPONSE STATUS:", `${res.status} - ${res.statusText}`);
  console.log("RESPONSE:", json);
  console.log("=============================");
  return json;
}

function encode_query_value_fun(value: string | number | boolean): string {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "null";
  }
  return String(value);
}
