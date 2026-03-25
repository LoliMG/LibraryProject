/** Same-origin on Vercel; set VITE_API_URL in .env if the API is on another host (no trailing slash). */
export function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
