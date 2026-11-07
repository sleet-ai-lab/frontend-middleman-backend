export const ENDPOINT_PATHS = {
  api_app_ping: "/api/app/ping",
} as const;

export type EndpointKey = keyof typeof ENDPOINT_PATHS;
