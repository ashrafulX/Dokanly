import { useEffect } from "react";
import { GRILL_CLIP } from "./assets.js";

const NF = 48;
const FS = 560;
const clamp = (v) => Math.min(1, Math.max(0, v));

function chromaKey(ctx) {
  const img = ctx.getImageData(0, 0, FS, FS);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const m = Math.max(r, b);
    const k = g - m;
    if (k > 18) {
      d[i + 3] = Math.max(0, 1 - (k - 18) / 52) * 255;
      d[i + 1] = Math.min(g, m + 6);
    }
  }
  ctx.putImageData(img, 0, 0);
}

/** Drives balloons, both grill canvases and the headline fade from scroll. */
export default function useOllaScroll(refs) {
  useEffect(() => {
    const { sky, kitchen, ktext, balloons, gS, gK } = refs;
    const sky_ = sky.current, kit = kitchen.current, kt = ktext.current;
    const bal = balloons.current, cS = gS.current, cK = gK.current;
    const ctxS = cS.getContext("2d"), ctxK = cK.getContext("2d");

    let cancelled = false, raf = 0;
    let S, K, c0 = 1, c1 = 1, x0 = 0, y0 = 0, x1 = 0, y1 = 0, m = 1, end = 1;
    let sp = 0, ready = 0, lastF = -1, force = true;
    const frames = [];

    function measure() {
      const sr = sky_.getBoundingClientRect(), kr = kit.getBoundingClientRect();
      S = { x: sr.left, y: sr.top + scrollY, w: sr.width, h: sr.height };
      K = { x: kr.left, y: kr.top + scrollY, w: kr.width, h: kr.height };

      x0 = S.x + 0.81 * S.w;
      y0 = S.y + 0.525 * S.h;
      c0 = 0.425 * S.h;

      const bw = 0.3 * S.w, bh = (bw * 2048) / 1360;
      const hy = 0.525 * S.h - c0 / 2 + 0.075 * c0;
      bal.style.left = 0.81 * S.w - bw * 0.494 + "px";
      bal.style.top = hy - bh * 0.946 + "px";

      const sc = Math.max(K.w / 2688, K.h / 1520);
      const ox = (K.w - 2688 * sc) / 2, oy = (K.h - 1520 * sc) / 2;
      const H = 1520 * sc;
      const gx = K.x + ox + 0.489 * 2688 * sc;
      const gy = K.y + oy + 0.641 * H;
      c1 = (H * 0.2) / 0.83;
      x1 = gx;
      y1 = gy - c1 * 0.91 + c1 / 2;

      kt.style.left = ox + 0.496 * 2688 * sc + "px";
      kt.style.top = oy + 0.125 * H + "px";
      kit.style.setProperty("--kh", (H * 0.0285).toFixed(1) + "px");
      kit.style.setProperty("--kp", (H * 0.0205).toFixed(1) + "px");

      end = Math.max(200, K.y - 0.093 * innerHeight);

      m = Math.ceil(Math.max(c0, c1) * 1.05);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [cS, cK]) {
        c.style.width = c.style.height = m + "px";
        c.width = c.height = Math.round(m * dpr);
      }
      force = true;
    }

    async function cacheFrames() {
      try {
        const v = document.createElement("video");
        v.crossOrigin = "anonymous";
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        await new Promise((res, rej) => {
          v.addEventListener("loadeddata", res, { once: true });
          v.addEventListener("error", rej, { once: true });
          v.src = GRILL_CLIP;
        });
        const dur = v.duration - 0.05;
        for (let i = 0; i < NF; i++) {
          if (cancelled) return;
          await new Promise((res) => {
            v.addEventListener("seeked", res, { once: true });
            v.currentTime = (dur * i) / (NF - 1);
          });
          const c = document.createElement("canvas");
          c.width = c.height = FS;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(v, 0, 0, FS, FS);
          chromaKey(ctx);
          frames.push(c);
          ready = frames.length;
          if (i === 0) force = true;
        }
      } catch (e) {
        /* grill is optional — page keeps working */
      }
    }

    function draw(f) {
      const src = frames[Math.min(f, frames.length - 1)];
      for (const [c, ctx] of [[cS, ctxS], [cK, ctxK]]) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(src, 0, 0, c.width, c.height);
      }
    }

    function tick() {
      if (cancelled) return;
      const target = scrollY / end;
      sp += (target - sp) * 0.18;
      if (Math.abs(target - sp) < 0.0005) sp = target;
      const p = clamp(sp);

      const q = clamp((p - 0.02) / 0.9);
      const fall = Math.pow(q, 1.75);
      const s = q * q * (3 - 2 * q);

      const t = performance.now() / 1000;
      const idle = 1 - clamp(p * 12);
      const bob = idle * Math.sin(1.9 * t) * 6;
      const sway = idle * Math.sin(1.3 * t) * 1.4;

      const x = x0 + (x1 - x0) * s;
      const y = y0 + (y1 - y0) * fall + bob;
      const size = c0 + (c1 - c0) * s;
      const tilt = Math.sin(q * Math.PI) * -9 + sway;
      const scl = size / m;

      const f = ready
        ? Math.min(ready - 1, Math.round(clamp((q - 0.12) / 0.72) * (NF - 1)))
        : 0;
      if (ready && (f !== lastF || force)) {
        draw(f);
        lastF = f;
        force = false;
      }

      cS.style.transform = `translate(${x - S.x - m / 2}px, ${y - S.y - m / 2}px) rotate(${tilt}deg) scale(${scl})`;
      cK.style.transform = `translate(${x - K.x - m / 2}px, ${y - K.y - m / 2}px) rotate(${tilt}deg) scale(${scl})`;

      const r = clamp(p * 1.25);
      bal.style.transform = `translate(${r * -0.06 * S.w}px, ${bob - r * 1.25 * S.h}px) rotate(${sway * 1.6 - r * 6}deg)`;

      document.body.classList.toggle("landed", p > 0.9);
      sp_debug = sp;
      raf = requestAnimationFrame(tick);
    }

    let sp_debug = 0;
    window.__olla = {
      get p() { return sp_debug; },
      get ready() { return ready; },
      measure,
    };

    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    cacheFrames();
    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("landed");
      delete window.__olla;
    };
  }, [refs]);
}
