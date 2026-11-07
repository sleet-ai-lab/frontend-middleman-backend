import { api_app_ping_get } from "@sleet-ai-lab/frontend-middleman-backend-middleman-angular";
// ========================================
// PING_FUN
api_app_ping_get(window.location.origin).catch(() => {});
// ========================================
