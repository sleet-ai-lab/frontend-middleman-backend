import { api_app_ping_get } from "../src/fun/api_app_ping_get";
import { resolve_base_url } from "./fun/resolve_base_url";
// ========================================
// API_APP_PING_GET_BIN_FUN
const DEFAULT_BASE_URL = "http://127.0.0.1:64077";

const argv = process.argv.slice(2);
const base_url = resolve_base_url(argv, DEFAULT_BASE_URL);

const ping = await api_app_ping_get(base_url);

console.log("PING", ping.ok ? "ok" : "not ok", `app: ${ping.app}`);
// ========================================
