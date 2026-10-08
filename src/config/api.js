const DEFAULT_GATEWAY_URL = "http://localhost:8080";

/** @deprecated use GATEWAY_URL from src/apiConfig.js */
export const API_GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || import.meta.env.VITE_API_GATEWAY_URL || DEFAULT_GATEWAY_URL;

export function buildWebSocketUrl(path) {
  const baseUrl = API_GATEWAY_URL.replace(/\/$/, "");
  const wsBaseUrl = baseUrl.replace(/^http/, "ws");
  return `${wsBaseUrl}${path}`;
}
