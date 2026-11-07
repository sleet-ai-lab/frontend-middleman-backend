import { api_app_ping_get } from "@sleet-ai-lab/frontend-middleman-backend-middleman";

api_app_ping_get(window.location.origin).catch(() => {});
