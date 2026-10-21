/**
 * API Gateway (único punto de entrada). El front solo habla con :8080.
 * VITE_GATEWAY_URL opcional, ej. http://localhost:8080
 */
export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:8080";

/**
 * @param {string} _service reservado por compatibilidad (ignorado)
 * @param {string} path ruta absoluta del API, ej. /api/users/login
 */
export const buildApiUrl = (_service, path) => {
  const base = GATEWAY_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
};
