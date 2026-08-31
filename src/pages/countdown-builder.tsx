import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { isIpAllowed } from '../lib/ip-allowlist';

/**
 * Server-side IP gate. The builder is an internal authoring tool, so requests
 * from outside the COUNTDOWN_ALLOWED_IPS allowlist get a 404 (the page is hidden
 * entirely rather than merely styled as forbidden). Runs on every request since
 * it is getServerSideProps, so the page is never statically served to anyone.
 */
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (!isIpAllowed(ctx.req)) return { notFound: true };
  return { props: {} };
}

/**
 * Countdown GIF Builder
 * -----------------------------------------------------------------------------
 * A standalone landing page for configuring the animated countdown timer served
 * by /api/countdown.gif. Every query param the endpoint accepts has a dedicated
 * UI control; the page assembles a clean URL (only non-default params are
 * emitted), shows a live preview, and produces copy-ready outputs — a plain
 * URL, an <img> email snippet, and an optional obfuscated ("o=") token URL.
 *
 * Route: /countdown-builder  (client-rendered; no WordPress data needed)
 */

// --- Defaults mirror src/lib/countdown-gif.js -------------------------------
const DEFAULTS = {
  frames: 5,
  w: 640,
  h: 200,
  bg: '006939',
  panel: '272c30',
  digit: 'ffffff',
  label: 'ffffff',
  accent: 'ffffff',
  labels: ['DAYS', 'HOURS', 'MINS', 'SECS'],
  labelpos: 'top',
  expired: 'EXPIRED',
  expiredcolor: 'ffffff',
  endcolor: 'ffffff',
};

// --- Small helpers ----------------------------------------------------------
const clean = (hex: string) => String(hex || '').replace(/^#/, '').trim().toLowerCase();
const withHash = (hex: string) => `#${clean(hex)}`;

/** Format a Date for a datetime-local input value ("YYYY-MM-DDTHH:mm:ss"). */
function toLocalInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(
    d.getMinutes(),
  )}:${p(d.getSeconds())}`;
}

/** Current local UTC offset as an ISO string, e.g. "-06:00" or "+05:30". */
function localOffset(): string {
  const mins = -new Date().getTimezoneOffset();
  const sign = mins >= 0 ? '+' : '-';
  const a = Math.abs(mins);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${sign}${p(Math.floor(a / 60))}:${p(a % 60)}`;
}

const OFFSETS = ['Z', '-05:00', '-06:00', '-07:00', '-08:00', '-04:00', '+00:00', '+01:00'];

type State = {
  datetime: string;
  offset: string;
  frames: number;
  w: number;
  h: number;
  loopMode: 'freeze' | 'infinite';
  repeats: number;
  font: 'smooth' | 'pixel';
  bg: string;
  panel: string;
  digit: string;
  label: string;
  accent: string;
  labels: string[];
  labelpos: 'top' | 'bottom';
  expired: string;
  expiredcolor: string;
  expiredTransparent: boolean;
  expiredbg: string;
  endEnabled: boolean;
  endtext: string;
  endtz: string;
  endcolor: string;
  endTransparent: boolean;
  endbg: string;
};

export default function CountdownBuilder() {
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState<string>('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState<{ url: string; token: string } | null>(null);
  const [tokenErr, setTokenErr] = useState('');

  const [s, setS] = useState<State>({
    datetime: '',
    offset: '-06:00',
    frames: DEFAULTS.frames,
    w: DEFAULTS.w,
    h: DEFAULTS.h,
    loopMode: 'freeze',
    repeats: 0,
    font: 'smooth',
    bg: DEFAULTS.bg,
    panel: DEFAULTS.panel,
    digit: DEFAULTS.digit,
    label: DEFAULTS.label,
    accent: DEFAULTS.accent,
    labels: [...DEFAULTS.labels],
    labelpos: 'bottom',
    expired: DEFAULTS.expired,
    expiredcolor: DEFAULTS.expiredcolor,
    expiredTransparent: true,
    expiredbg: '006939',
    endEnabled: true,
    endtext: 'Ends [DATE]',
    endtz: '',
    endcolor: DEFAULTS.endcolor,
    endTransparent: false,
    endbg: '006939',
  });

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((prev) => ({ ...prev, [k]: v }));

  // Initialise browser-dependent defaults after mount (avoids SSR mismatch).
  useEffect(() => {
    setMounted(true);
    setOrigin(window.location.origin);
    const off = localOffset();
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setSeconds(0);
    setS((prev) => ({ ...prev, datetime: toLocalInput(d), offset: off }));
  }, []);

  // Any settings change invalidates a previously minted obfuscated token.
  useEffect(() => {
    setToken(null);
    setTokenErr('');
  }, [s]);

  const offsetOptions = useMemo(() => {
    const set = new Set(OFFSETS);
    if (mounted) set.add(localOffset());
    return Array.from(set);
  }, [mounted]);

  // Assemble the `to` value and the full query string (non-defaults only).
  const { to, query } = useMemo(() => buildQuery(s), [s]);

  const path = `/api/countdown.gif${query ? `?${query}` : ''}`;
  const fullUrl = origin ? `${origin}${path}` : path;
  const previewSrc = `${path}${query ? '&' : '?'}_=${refreshKey}`;
  const imgSnippet = `<img src="${fullUrl}" width="${s.w}" height="${s.h}" alt="Countdown timer" style="display:block;border:0;outline:none;" />`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('');
    }
  };

  const mintToken = async () => {
    setTokenErr('');
    setToken(null);
    try {
      const params = new URLSearchParams(query);
      params.set('encode', '1');
      if (secret) params.set('secret', secret);
      const res = await fetch(`/api/countdown.gif?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setToken({ token: data.token, url: `${origin}${data.url}` });
    } catch (e: any) {
      setTokenErr(e.message || 'Failed to mint token');
    }
  };

  const targetValid = Boolean(to);

  return (
    <>
      <Head>
        <title>Countdown GIF Builder</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="cgb">
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        <header className="cgb-head">
          <h1>Countdown GIF Builder</h1>
          <p>
            Configure the animated countdown timer served by <code>/api/countdown.gif</code>. Every
            setting below maps to a URL parameter. The GIF regenerates from the live server clock on
            every open, so it counts down inside email — embed it as a plain <code>&lt;img&gt;</code>.
          </p>
        </header>

        <div className="cgb-grid">
          {/* ---------------- Controls ---------------- */}
          <div className="cgb-controls">
            <Section title="Target date &amp; time" hint="When the countdown reaches zero.">
              <Field label="Target (local wall-clock)">
                <input
                  type="datetime-local"
                  step={1}
                  value={s.datetime}
                  onChange={(e) => set('datetime', e.target.value)}
                />
              </Field>
              <Field label="Timezone offset" hint="Offset baked into the target instant.">
                <select value={s.offset} onChange={(e) => set('offset', e.target.value)}>
                  {offsetOptions.map((o) => (
                    <option key={o} value={o}>
                      {o === 'Z' ? 'Z (UTC)' : o}
                      {mounted && o === localOffset() ? ' — your local time' : ''}
                    </option>
                  ))}
                </select>
              </Field>
              <p className={`cgb-resolved ${targetValid ? '' : 'bad'}`}>
                <span>to =</span> <code>{to || 'set a target date'}</code>
              </p>
            </Section>

            <Section title="Size &amp; animation">
              <div className="cgb-row">
                <Field label="Width (px)" hint="120–1600">
                  <input
                    type="number"
                    min={120}
                    max={1600}
                    value={s.w}
                    onChange={(e) => set('w', +e.target.value)}
                  />
                </Field>
                <Field label="Height (px)" hint="80–800">
                  <input
                    type="number"
                    min={80}
                    max={800}
                    value={s.h}
                    onChange={(e) => set('h', +e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Frames" hint="Seconds shown, one frame/sec (1–600).">
                <input
                  type="number"
                  min={1}
                  max={600}
                  value={s.frames}
                  onChange={(e) => set('frames', +e.target.value)}
                />
              </Field>
              <Field label="Looping">
                <select
                  value={s.loopMode}
                  onChange={(e) => set('loopMode', e.target.value as State['loopMode'])}
                >
                  <option value="freeze">Play, then freeze on last frame</option>
                  <option value="infinite">Loop forever</option>
                </select>
              </Field>
              {s.loopMode === 'freeze' && (
                <Field label="Extra replays before freezing" hint="0 = play once, then hold.">
                  <input
                    type="number"
                    min={0}
                    max={65534}
                    value={s.repeats}
                    onChange={(e) => set('repeats', +e.target.value)}
                  />
                </Field>
              )}
              <Field label="Font" hint="Smooth = anti-aliased vector; pixel = blocky bitmap.">
                <select value={s.font} onChange={(e) => set('font', e.target.value as State['font'])}>
                  <option value="smooth">Smooth (IBM Plex Sans, anti-aliased)</option>
                  <option value="pixel">Pixel (5×7 bitmap)</option>
                </select>
              </Field>
            </Section>

            <Section title="Colors">
              <div className="cgb-swatches">
                <ColorField label="Background" value={s.bg} onChange={(v) => set('bg', v)} />
                <ColorField label="Panel" value={s.panel} onChange={(v) => set('panel', v)} />
                <ColorField label="Digits" value={s.digit} onChange={(v) => set('digit', v)} />
                <ColorField label="Labels" value={s.label} onChange={(v) => set('label', v)} />
                <ColorField label="Accent (colons)" value={s.accent} onChange={(v) => set('accent', v)} />
              </div>
            </Section>

            <Section title="Unit labels">
              <div className="cgb-row cgb-row-4">
                {s.labels.map((lab, i) => (
                  <Field key={i} label={['Days', 'Hours', 'Mins', 'Secs'][i]}>
                    <input
                      type="text"
                      value={lab}
                      maxLength={8}
                      onChange={(e) => {
                        const next = [...s.labels];
                        next[i] = e.target.value;
                        set('labels', next);
                      }}
                    />
                  </Field>
                ))}
              </div>
              <Field label="Label position">
                <select
                  value={s.labelpos}
                  onChange={(e) => set('labelpos', e.target.value as State['labelpos'])}
                >
                  <option value="top">Above panels</option>
                  <option value="bottom">Below panels</option>
                </select>
              </Field>
            </Section>

            <Section title="Expired state" hint="Shown once the target passes.">
              <Field label="Expired text">
                <input
                  type="text"
                  value={s.expired}
                  onChange={(e) => set('expired', e.target.value)}
                />
              </Field>
              <div className="cgb-swatches">
                <ColorField
                  label="Text color"
                  value={s.expiredcolor}
                  onChange={(v) => set('expiredcolor', v)}
                />
                <BgField
                  label="Background"
                  transparent={s.expiredTransparent}
                  onTransparent={(v) => set('expiredTransparent', v)}
                  value={s.expiredbg}
                  onChange={(v) => set('expiredbg', v)}
                />
              </div>
            </Section>

            <Section title="End card" hint="Optional closing frame after the countdown.">
              <label className="cgb-check">
                <input
                  type="checkbox"
                  checked={s.endEnabled}
                  onChange={(e) => set('endEnabled', e.target.checked)}
                />
                Append an end card
              </label>
              {s.endEnabled && (
                <>
                  <Field label="End text" hint="[DATE] is replaced with the target date.">
                    <input
                      type="text"
                      value={s.endtext}
                      onChange={(e) => set('endtext', e.target.value)}
                    />
                  </Field>
                  <Field label="[DATE] timezone" hint="Defaults to the target's offset.">
                    <select value={s.endtz} onChange={(e) => set('endtz', e.target.value)}>
                      <option value="">Same as target</option>
                      {offsetOptions.map((o) => (
                        <option key={o} value={o}>
                          {o === 'Z' ? 'Z (UTC)' : o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="cgb-swatches">
                    <ColorField
                      label="Text color"
                      value={s.endcolor}
                      onChange={(v) => set('endcolor', v)}
                    />
                    <BgField
                      label="Background"
                      transparent={s.endTransparent}
                      onTransparent={(v) => set('endTransparent', v)}
                      value={s.endbg}
                      onChange={(v) => set('endbg', v)}
                    />
                  </div>
                </>
              )}
            </Section>
          </div>

          {/* ---------------- Preview & output ---------------- */}
          <div className="cgb-side">
            <Section title="Live preview">
              <div className="cgb-preview" style={{ background: withHash(s.bg) }}>
                {targetValid ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewSrc} alt="Countdown preview" style={{ maxWidth: '100%' }} />
                ) : (
                  <span className="cgb-muted">Set a target date to preview</span>
                )}
              </div>
              <button className="cgb-btn" onClick={() => setRefreshKey((k) => k + 1)}>
                ↻ Refresh preview
              </button>
            </Section>

            <Section title="Plain URL">
              <textarea readOnly rows={3} value={fullUrl} />
              <button
                className="cgb-btn cgb-btn-primary"
                disabled={!targetValid}
                onClick={() => copy(fullUrl, 'url')}
              >
                {copied === 'url' ? 'Copied!' : 'Copy URL'}
              </button>
            </Section>

            <Section title="Email &lt;img&gt; snippet">
              <textarea readOnly rows={4} value={imgSnippet} />
              <button
                className="cgb-btn"
                disabled={!targetValid}
                onClick={() => copy(imgSnippet, 'img')}
              >
                {copied === 'img' ? 'Copied!' : 'Copy snippet'}
              </button>
            </Section>

            <Section
              title="Obfuscated token"
              hint="Hides every setting behind one opaque o= token."
            >
              <Field label="Encode secret" hint="Only if COUNTDOWN_ENCODE_SECRET is set.">
                <input
                  type="text"
                  value={secret}
                  placeholder="(optional)"
                  onChange={(e) => setSecret(e.target.value)}
                />
              </Field>
              <button className="cgb-btn" disabled={!targetValid} onClick={mintToken}>
                Generate token
              </button>
              {tokenErr && <p className="cgb-err">{tokenErr}</p>}
              {token && (
                <>
                  <textarea readOnly rows={3} value={token.url} />
                  <button className="cgb-btn cgb-btn-primary" onClick={() => copy(token.url, 'tok')}>
                    {copied === 'tok' ? 'Copied!' : 'Copy obfuscated URL'}
                  </button>
                </>
              )}
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

// --- URL assembly -----------------------------------------------------------
// Every setting is emitted explicitly (not just non-defaults). The builder's
// defaults are the brand's, which differ from the endpoint's built-in defaults;
// omitting a param would let the endpoint fall back to *its* default and render
// something other than what the UI shows. A fully self-describing URL keeps the
// preview, the copied URL, and the email render identical.
function buildQuery(s: State): { to: string; query: string } {
  const p = new URLSearchParams();

  const to = s.datetime ? `${s.datetime}${s.offset === 'Z' ? 'Z' : s.offset}` : '';
  if (to) p.set('to', to);

  p.set('w', String(s.w));
  p.set('h', String(s.h));
  p.set('frames', String(s.frames));
  p.set('loop', s.loopMode === 'infinite' ? 'infinite' : String(s.repeats));
  p.set('font', s.font);

  p.set('bg', clean(s.bg));
  p.set('panel', clean(s.panel));
  p.set('digit', clean(s.digit));
  p.set('label', clean(s.label));
  p.set('accent', clean(s.accent));

  p.set('labels', s.labels.join(','));
  p.set('labelpos', s.labelpos);

  p.set('expired', s.expired);
  p.set('expiredcolor', clean(s.expiredcolor));
  p.set('expiredbg', s.expiredTransparent ? 'transparent' : clean(s.expiredbg));

  if (s.endEnabled) {
    const txt = s.endtext.trim();
    if (txt) p.set('endtext', s.endtext);
    else p.set('end', '1');
    if (s.endtz) p.set('endtz', s.endtz);
    p.set('endcolor', clean(s.endcolor));
    p.set('endbg', s.endTransparent ? 'transparent' : clean(s.endbg));
  }

  return { to, query: p.toString() };
}

// --- Presentational sub-components ------------------------------------------
function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cgb-section">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {hint && <p className="cgb-hint">{hint}</p>}
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="cgb-field">
      <span className="cgb-field-label">{label}</span>
      {children}
      {hint && <span className="cgb-field-hint">{hint}</span>}
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="cgb-color">
      <span className="cgb-field-label">{label}</span>
      <div className="cgb-color-row">
        <input type="color" value={withHash(value)} onChange={(e) => onChange(clean(e.target.value))} />
        <input
          type="text"
          className="cgb-hex"
          value={clean(value)}
          maxLength={6}
          onChange={(e) => onChange(clean(e.target.value))}
        />
      </div>
    </div>
  );
}

function BgField({
  label,
  transparent,
  onTransparent,
  value,
  onChange,
}: {
  label: string;
  transparent: boolean;
  onTransparent: (v: boolean) => void;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="cgb-color">
      <span className="cgb-field-label">{label}</span>
      <label className="cgb-check cgb-check-sm">
        <input type="checkbox" checked={transparent} onChange={(e) => onTransparent(e.target.checked)} />
        Transparent
      </label>
      {!transparent && (
        <div className="cgb-color-row">
          <input
            type="color"
            value={withHash(value)}
            onChange={(e) => onChange(clean(e.target.value))}
          />
          <input
            type="text"
            className="cgb-hex"
            value={clean(value)}
            maxLength={6}
            onChange={(e) => onChange(clean(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}

// --- Scoped styles ----------------------------------------------------------
const STYLES = `
.cgb { box-sizing: border-box; max-width: 1180px; margin: 0 auto; padding: 32px 20px 64px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1a2024; background: #f4f6f8; min-height: 100vh; }
.cgb *, .cgb *::before, .cgb *::after { box-sizing: border-box; }
.cgb-head h1 { font-size: 28px; margin: 0 0 8px; color: #006939; }
.cgb-head p { margin: 0 0 24px; max-width: 720px; line-height: 1.5; color: #4a555c; font-size: 14px; }
.cgb code { background: #e7ebee; padding: 1px 5px; border-radius: 4px; font-size: 12px;
  font-family: 'SF Mono', Menlo, Consolas, monospace; }
.cgb-grid { display: grid; grid-template-columns: 1fr 400px; gap: 24px; align-items: start; }
@media (max-width: 900px) { .cgb-grid { grid-template-columns: 1fr; } }
.cgb-controls { display: flex; flex-direction: column; gap: 16px; }
.cgb-side { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 20px; }
@media (max-width: 900px) { .cgb-side { position: static; } }
.cgb-section { background: #fff; border: 1px solid #e2e7ea; border-radius: 10px; padding: 18px 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
.cgb-section h2 { font-size: 15px; margin: 0 0 4px; font-weight: 600; }
.cgb-hint { margin: 0 0 14px; font-size: 12px; color: #7b868c; }
.cgb-section h2 + .cgb-field, .cgb-section h2 + .cgb-row, .cgb-section h2 + .cgb-swatches { margin-top: 12px; }
.cgb-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.cgb-field:last-child { margin-bottom: 0; }
.cgb-field-label { font-size: 12px; font-weight: 600; color: #3a444a; }
.cgb-field-hint { font-size: 11px; color: #9aa3a8; }
.cgb input[type=text], .cgb input[type=number], .cgb input[type=datetime-local], .cgb select, .cgb textarea {
  width: 100%; padding: 8px 10px; border: 1px solid #cdd5da; border-radius: 6px; font-size: 13px;
  background: #fff; color: #1a2024; font-family: inherit; }
.cgb textarea { font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 12px; resize: vertical;
  word-break: break-all; margin-bottom: 8px; }
.cgb input:focus, .cgb select:focus, .cgb textarea:focus { outline: none; border-color: #006939;
  box-shadow: 0 0 0 3px rgba(0,105,57,0.15); }
.cgb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cgb-row-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 520px) { .cgb-row-4 { grid-template-columns: 1fr 1fr; } }
.cgb-resolved { margin: 6px 0 0; font-size: 12px; color: #4a555c; }
.cgb-resolved.bad code { color: #b3261e; }
.cgb-swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 14px; }
.cgb-color { display: flex; flex-direction: column; gap: 6px; }
.cgb-color-row { display: flex; gap: 6px; align-items: center; }
.cgb input[type=color] { width: 40px; height: 34px; padding: 2px; border: 1px solid #cdd5da;
  border-radius: 6px; background: #fff; cursor: pointer; flex: none; }
.cgb-hex { text-transform: lowercase; }
.cgb-check { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
.cgb-check-sm { font-size: 12px; font-weight: 400; color: #4a555c; }
.cgb-check input { width: auto; }
.cgb-preview { display: flex; align-items: center; justify-content: center; min-height: 120px;
  border: 1px dashed #cdd5da; border-radius: 8px; padding: 12px; margin-bottom: 10px; overflow: hidden; }
.cgb-muted { color: #9aa3a8; font-size: 13px; }
.cgb-btn { width: 100%; padding: 9px 14px; border: 1px solid #cdd5da; border-radius: 6px;
  background: #fff; color: #1a2024; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
.cgb-btn:hover:not(:disabled) { background: #f0f2f4; }
.cgb-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cgb-btn-primary { background: #006939; border-color: #006939; color: #fff; }
.cgb-btn-primary:hover:not(:disabled) { background: #00542e; }
.cgb-err { color: #b3261e; font-size: 12px; margin: 8px 0 0; }
`;
