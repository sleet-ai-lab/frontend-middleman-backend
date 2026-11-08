import { api_app_ping_get } from "@sleet-ai-lab/frontend-middleman-backend-bun-middleman-angular";
import { BASE_URL } from "./base_url.ts";
// ========================================
// PING_FUN
api_app_ping_get(BASE_URL).catch(() => {});
// ========================================
