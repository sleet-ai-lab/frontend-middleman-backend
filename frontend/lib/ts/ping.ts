import { api_app_ping_get } from "@sleet-ai-lab/frontend-middleman-backend-middleman";

const base_url = window.location.origin;

api_app_ping_get(base_url)
  .then((ping) => {
    console.log("=============================");
    console.log("PING", ping.ok ? "ok" : "not ok", `app: ${ping.app}`);
    console.log("=============================");
  })
  .catch((err) => {
    console.error(err);
  });
