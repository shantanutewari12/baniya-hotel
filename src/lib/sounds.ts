/** Web Audio-based sound effects for Hotel E-Menu book UI */

let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!_ctx) {
      _ctx = new (
        window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext
      )();
    }
    return _ctx;
  } catch {
    return null;
  }
}

function playNoise(
  durationSecs: number,
  envelope: (t: number) => number,
  filterType: BiquadFilterType,
  filterFreq: number,
  gainVal: number,
): void {
  const ctx = getCtx();
  if (!ctx) return;
  ctx.resume().catch(() => {});
  const n = Math.floor(ctx.sampleRate * durationSecs);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * envelope(i / n);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = filterType;
  f.frequency.value = filterFreq;
  const g = ctx.createGain();
  g.gain.value = gainVal;
  src.connect(f).connect(g).connect(ctx.destination);
  src.start();
}

/** Short paper-rustle sound — played on every page turn */
export function playPageTurn(): void {
  try {
    playNoise(0.13, (t) => Math.pow(1 - t, 2.5) * 0.9, "highpass", 3800, 0.38);
  } catch {
    // ignore
  }
}

/** Longer creak + rustle — played when book cover opens */
export function playBookOpen(): void {
  try {
    // Two layered noises: low creak + high rustle
    playNoise(
      0.5,
      (t) => (t < 0.12 ? t / 0.12 : Math.pow(1 - (t - 0.12) / 0.88, 1.8)) * 0.65,
      "bandpass",
      1100,
      0.32,
    );
    setTimeout(() => {
      playNoise(0.2, (t) => Math.pow(1 - t, 2) * 0.5, "highpass", 3500, 0.2);
    }, 80);
  } catch {
    // ignore
  }
}

/** Beautiful success chime sound — played when order is placed */
export function playSuccessChime(): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    ctx.resume().catch(() => {});
    const now = ctx.currentTime;

    // First note: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    osc1.connect(gain1).connect(ctx.destination);

    // Second note: A5 (880.00 Hz) - arpeggiated slightly
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880.0, now + 0.08);
    gain2.gain.setValueAtTime(0, now + 0.08);
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.13);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    osc2.connect(gain2).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.8);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.9);
  } catch {
    // ignore
  }
}
