import type { APP_ERROR_RESPONSE } from "../types/common";

export interface APP_API_ERROR extends Error {
  status: number;
  code: string;
}

export interface PARSE_ERROR_CONTEXT {
  url?: string;
  method?: string;
  label?: string;
  request_body?: BodyInit | null;
}

export async function parse_error(
  res: Response,
  fallback: string,
  context: PARSE_ERROR_CONTEXT = {},
): Promise<APP_API_ERROR> {
  let detail = "";
  let response_json: unknown;
  let response_text = "";
  try {
    const text = await res.text();
    response_text = text;
    if (text) {
      try {
        const parsed = JSON.parse(text) as APP_ERROR_RESPONSE;
        const envelope = parsed?.error;
        if (
          envelope &&
          typeof envelope.message === "string" &&
          envelope.message.length > 0
        ) {
          detail = envelope.message;
        }
      } catch {
        detail = text.slice(0, 500);
      }
    }
  } catch {
    detail = "";
  }

  const code = `http_${res.status}`;
  const message = detail
    ? `${fallback}: ${code}: ${detail}`
    : `${fallback}: ${code}`;

  console.log("=============================");
  console.log(` ${context.label ?? fallback} via ${context.method ?? "?"} on:`);
  console.log(context.url ?? "");
  console.log("RESPONSE STATUS:", `${res.status} - ${res.statusText}`);
  if (response_text) console.log("RESPONSE TEXT:", response_text);
  console.log("=============================");

  const error = new Error(message) as APP_API_ERROR;
  error.status = res.status;
  error.code = code;
  return error;
}
