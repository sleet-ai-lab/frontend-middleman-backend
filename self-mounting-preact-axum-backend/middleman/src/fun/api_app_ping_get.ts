import { api_call } from "../stuff/api_call";
import type { APP_PING } from "../types/app_ping";
// ========================================
// API_APP_PING_GET_FUN
export async function api_app_ping_get(base_url: string): Promise<APP_PING> {
  const json = await api_call<APP_PING>({
    base_url,
    key: "api_app_ping",
    method: "GET",
    label: "APP PING GET",
    fallback: "api_app_ping_get failed",
  });

  if (
    typeof json !== "object" ||
    json === null ||
    Array.isArray(json) ||
    typeof (json as APP_PING).ok !== "boolean" ||
    typeof (json as APP_PING).app !== "string"
  ) {
    throw new Error(
      "api_app_ping_get failed: invalid_response: expected a json object with ok and app",
    );
  }

  return json;
}
// ========================================
