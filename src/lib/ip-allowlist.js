/**
 * IP allowlist for the countdown builder tooling.
 *
 * The public countdown GIF (/api/countdown.gif) stays open — emails must be able
 * to load it from anywhere. Only the authoring surfaces are restricted:
 *   - the builder page (/countdown-builder)
 *   - the token "encode" mode of the API
 *
 * The allowlist is configured via COUNTDOWN_ALLOWED_IPS (comma-separated) and
 * defaults to a single office IP. Loopback is additionally allowed outside
 * production so the tool still works on localhost during `npm run dev`.
 *
 *   COUNTDOWN_ALLOWED_IPS=71.13.168.2
 *   COUNTDOWN_ALLOWED_IPS=71.13.168.2,203.0.113.7
 *
 * The loopback bypass is itself configurable via COUNTDOWN_ALLOW_LOOPBACK so the
 * gate can be exercised both ways during testing:
 *   COUNTDOWN_ALLOW_LOOPBACK=false  → gate localhost too (test the 404/403 path)
 *   COUNTDOWN_ALLOW_LOOPBACK=true   → always allow localhost (even in production)
 * When unset it defaults to "allowed outside production" (dev convenience).
 */

const DEFAULT_ALLOWED = '71.13.168.2';

/** Parsed, trimmed allowlist from the env (falls back to the default IP). */
function allowedIps() {
  const raw = process.env.COUNTDOWN_ALLOWED_IPS || DEFAULT_ALLOWED;
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Strip an IPv4-mapped IPv6 prefix ("::ffff:1.2.3.4") and any zone/port noise. */
function normalizeIp(ip) {
  let s = String(ip || '').trim();
  s = s.replace(/^::ffff:/i, '');
  return s;
}

function isLoopback(ip) {
  return ip === '127.0.0.1' || ip === '::1';
}

/** Parse a boolean-ish env var. Returns undefined when unset/unrecognized. */
function envFlag(name) {
  const v = process.env[name];
  if (v === undefined || v === '') return undefined;
  const s = String(v).trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(s)) return true;
  if (['0', 'false', 'no', 'off'].includes(s)) return false;
  return undefined;
}

/**
 * Whether loopback requests bypass the allowlist. Explicit COUNTDOWN_ALLOW_LOOPBACK
 * wins; otherwise defaults to "allowed unless running in production".
 */
function loopbackAllowed() {
  const flag = envFlag('COUNTDOWN_ALLOW_LOOPBACK');
  if (flag !== undefined) return flag;
  return process.env.NODE_ENV !== 'production';
}

/**
 * Best-effort client IP. Behind WP Engine / a CDN the real address is in
 * x-forwarded-for (first hop); fall back to x-real-ip, then the socket.
 */
function getClientIp(req) {
  const h = (req && req.headers) || {};
  const xff = h['x-forwarded-for'];
  if (xff) {
    const first = String(xff).split(',')[0].trim();
    if (first) return normalizeIp(first);
  }
  if (h['x-real-ip']) return normalizeIp(h['x-real-ip']);
  const ra = req && req.socket && req.socket.remoteAddress;
  return normalizeIp(ra);
}

/** True when the request's client IP is permitted to use the builder/encode. */
function isIpAllowed(req) {
  const ip = getClientIp(req);
  if (allowedIps().includes(ip)) return true;
  if (loopbackAllowed() && isLoopback(ip)) return true;
  return false;
}

module.exports = { isIpAllowed, getClientIp, allowedIps };
