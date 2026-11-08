import { api_app_ping_get } from "@sleet-ai-lab/frontend-middleman-backend-bun-middleman-preact";
import { BASE_URL } from "./base_url";
// ========================================
// PING_FUN
api_app_ping_get(BASE_URL).catch(() => {});
// ========================================
