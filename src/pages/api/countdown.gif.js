import { generateCountdownGif, encodeOptions, decodeOptions } from '../../lib/countdown-gif';
import { isIpAllowed } from '../../lib/ip-allowlist';

/**
 * Animated countdown-timer GIF, generated from the current server time.
 *
 * Because email clients strip JavaScript, embed this as a plain <img> and it
 * counts down live: every open re-requests the URL, and we send no-cache
 * headers so it is regenerated against the current server clock each time.
 *
 * Query params:
 *   to      required. Target time — ISO 8601 (e.g. 2026-12-31T23:59:59-06:00)
 *           or epoch milliseconds. Include a timezone offset in ISO strings;
 *           otherwise it is parsed as UTC.
 *   frames  frames to render, one per second (default 60, max 600)
 *   w, h    dimensions (default 640x200)
 *   loop    extra repeats after the first play, then freeze on the last frame
 *           (default 1 → plays, loops once more, then holds the final frame).
 *           Use "infinite" (or -1) to loop forever without freezing.
 *   bg      page background — hex color (with or without #), or
 *           "transparent"/"none" to let the countdown sit directly on the
 *           email background (default: opaque)
 *   panel, digit, label, accent   hex colors (with or without #)
 *   font    "smooth" (default, anti-aliased vector font) or "pixel"/"bitmap"
 *           for the blocky 5x7 bitmap font
 *   labels  comma-separated unit labels (default "DAYS,HRS,MINS,SECS")
 *   labelpos label placement, "top" (default) or "bottom"
 *   expired text shown once the target passes (default "EXPIRED")
 *   endtext  closing "end card" frame appended after the countdown (for a clean
 *            stop, esp. with loop=1). "[DATE]" is replaced with the target date.
 *            Pass "end=1" alone for the default "Ends [DATE]".
 *   endtz    timezone offset for [DATE], e.g. "-06:00" or "Z" (defaults to the
 *            offset in `to`, else UTC).
 *   expiredcolor, expiredbg, endcolor, endbg   text/background colors for the
 *            expired and end-card banners. Text defaults to white. Background
 *            defaults to transparent for the expired banner and opaque #006939
 *            for the end card; accepts a hex color or "transparent"/"none".
 *
 * Obfuscated options (hide the params from the recipient):
 *   o        a single opaque token that decodes to all of the above. Explicit
 *            query params, if also present, override the token (handy for tests).
 *   encode   mint a token: /api/countdown.gif?encode=1&to=...&accent=006939
 *            returns JSON { token, url }. If COUNTDOWN_ENCODE_SECRET is set,
 *            requires &secret=<value>.
 *
 * Example:
 *   /api/countdown.gif?to=2026-12-31T23:59:59-06:00&accent=006939
 *   /api/countdown.gif?o=AS3k9c...        (obfuscated)
 */
export default function handler(req, res) {
  let q = req.query;

  // Obfuscated single-token options. Explicit query params override the token.
  if (typeof q.o === 'string' && q.o) {
    try {
      q = { ...decodeOptions(q.o), ...req.query };
    } catch (_) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(400).json({ error: 'Invalid options token' });
    }
  }

  // Token generator mode. Restricted to the configured IP allowlist — the public
  // GIF rendering below stays open, but minting/authoring tokens does not.
  if (q.encode !== undefined) {
    if (!isIpAllowed(req)) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(403).json({ error: 'Forbidden' });
    }
    const gate = process.env.COUNTDOWN_ENCODE_SECRET;
    if (gate && q.secret !== gate) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(401).json({ error: 'Invalid secret' });
    }
    const KEYS = ['to', 'frames', 'w', 'h', 'loop', 'font', 'bg', 'panel', 'digit', 'label', 'accent', 'labels', 'labelpos', 'expired', 'endtext', 'end', 'endtz', 'expiredcolor', 'expiredbg', 'endcolor', 'endbg'];
    const obj = {};
    for (const k of KEYS) if (q[k] !== undefined) obj[k] = q[k];
    const token = encodeOptions(obj);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ token, url: `/api/countdown.gif?o=${token}` });
  }

  const targetMs = parseTarget(q.to);
  if (targetMs === null) {
    res.setHeader('Cache-Control', 'no-store');
    return res
      .status(400)
      .json({ error: 'Query param "to" is required and must be an ISO 8601 date or epoch milliseconds.' });
  }

  const labels =
    typeof q.labels === 'string'
      ? q.labels.split(',').map((s) => s.trim()).slice(0, 4)
      : undefined;

  // Optional closing end card. Enabled by `endtext` or the `end` flag; "[DATE]"
  // is replaced with the target date in the target's timezone (or `endtz`).
  let endText;
  if (typeof q.endtext === 'string' || q.end !== undefined) {
    const template = typeof q.endtext === 'string' && q.endtext.trim() ? q.endtext : 'Ends [DATE]';
    endText = template.replace(/\[DATE\]/gi, formatTargetDate(targetMs, q.to, q.endtz));
  }

  try {
    const gif = generateCountdownGif({
      targetMs,
      nowMs: Date.now(),
      frames: q.frames,
      width: q.w,
      height: q.h,
      loop: q.loop,
      font: q.font,
      bg: q.bg,
      panel: q.panel,
      digit: q.digit,
      label: q.label,
      accent: q.accent,
      labels: labels && labels.length === 4 ? labels : undefined,
      labelPos: typeof q.labelpos === 'string' ? q.labelpos.toLowerCase() : undefined,
      expired: q.expired,
      expiredColor: q.expiredcolor,
      expiredBg: q.expiredbg,
      endText,
      endColor: q.endcolor,
      endBg: q.endbg,
    });

    // Never cache — each open must reflect the live server time.
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Content-Length', gif.length);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('CDN-Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.status(200).send(gif);
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(500).json({ error: 'Failed to render countdown', detail: err.message });
  }
}

/** Parse an ISO 8601 string or epoch-ms value into epoch ms, or null. */
function parseTarget(to) {
  if (!to) return null;
  if (/^\d+$/.test(String(to).trim())) {
    const n = Number(to);
    return Number.isFinite(n) ? n : null;
  }
  const ms = Date.parse(to);
  return Number.isNaN(ms) ? null : ms;
}

/** Extract a UTC offset in minutes from an ISO string ("Z" or ±HH:MM), or null. */
function parseOffsetMinutes(s) {
  if (typeof s !== 'string') return null;
  const t = s.trim();
  if (/[zZ]$/.test(t)) return 0;
  const m = t.match(/([+-])(\d{2}):?(\d{2})$/);
  if (!m) return null;
  return (m[1] === '-' ? -1 : 1) * (parseInt(m[2], 10) * 60 + parseInt(m[3], 10));
}

/**
 * Format the target instant as "Month D, YYYY" in the target's timezone. The
 * offset comes from `tzOverride` (e.g. "-06:00"), else from `toStr`, else UTC.
 */
function formatTargetDate(ms, toStr, tzOverride) {
  let offsetMin = parseOffsetMinutes(tzOverride);
  if (offsetMin === null) offsetMin = parseOffsetMinutes(toStr);
  if (offsetMin === null) offsetMin = 0;
  const d = new Date(ms + offsetMin * 60000); // shift so UTC getters read wall-clock
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
