const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

export const CONFIG = {
  bUrl: BACKEND_HOST ? `https://${BACKEND_HOST}/seal/` : '/seal/',
  ws: BACKEND_HOST ? `wss://${BACKEND_HOST}/wisp/` : '/wisp/',
  unsupported: ['spotify.com'],
  filter: ['neal.fun'],
};
