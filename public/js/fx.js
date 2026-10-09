/* FX: the living background and the extra micro-animations layered on top of motion.js.
   - a "plotted points" constellation on the page ground that drifts and leans away from the pointer
   - a soft light that follows the pointer (desktop only)
   - drawn curves (supply / demand, a wave, a growth curve) in the dark header bands, with pointer + scroll parallax
   - word-by-word hero headline, a typed answer in the marking demo, magnetic hero buttons
   - a back-to-top button whose ring fills as you read
   All of it is skipped under prefers-reduced-motion and when the browser asks to save data;
   the canvas pauses whenever the tab is hidden. */
(function () {
  const IB = window.IB;
  const mq = (q) => window.matchMedia && matchMedia(q).matches;
  const reduce = () => mq("(prefers-reduced-motion: reduce)");
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const fine = () => mq("(hover: hover) and (pointer: fine)");
  const pointer = { x: -9999, y: -9999, active: false };

  window.addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; }, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.active = false; pointer.x = pointer.y = -9999; });

  /* ---------- 1. constellation of plotted points ---------- */
  function constellation() {
    const cv = document.createElement("canvas");
    cv.className = "fx-net";
    cv.setAttribute("aria-hidden", "true");
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, dpr = 1, pts = [], dot = "", line = "", raf = 0, last = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      dot = cs.getPropertyValue("--fx-dot").trim() || "45, 91, 255";
      line = cs.getPropertyValue("--fx-line").trim() || dot;
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = Math.round(Math.min(W < 700 ? 26 : 64, (W * H) / 20000));
      while (pts.length < want) pts.push(spawn());
      pts.length = want;
    };
    const spawn = () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: 1 + Math.random() * 1.6, p: Math.random() * Math.PI * 2,
    });

    const LINK = 130, PUSH = 150;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(3, (now - (last || now)) / 16.7);
      last = now;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        if (pointer.active) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < PUSH * PUSH && d2 > 1) { const f = (1 - Math.sqrt(d2) / PUSH) * 0.06; p.vx += dx * f / 40; p.vy += dy * f / 40; }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        // keep a gentle minimum drift so the field never freezes
        if (Math.abs(p.vx) + Math.abs(p.vy) < 0.08) { p.vx += (Math.random() - 0.5) * 0.04; p.vy += (Math.random() - 0.5) * 0.04; }
        p.x += p.vx * dt; p.y += p.vy * dt; p.p += 0.02 * dt;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          ctx.strokeStyle = `rgba(${line}, ${(1 - Math.sqrt(d2) / LINK) * 0.16})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        if (pointer.active) {
          const dx = a.x - pointer.x, dy = a.y - pointer.y, d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            ctx.strokeStyle = `rgba(${dot}, ${(1 - Math.sqrt(d2) / 180) * 0.22})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${dot}, ${0.22 + Math.sin(p.p) * 0.1})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    readColors(); resize(); start();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColors);
    IB.fxRefresh = readColors;
  }

  /* ---------- 2. pointer light ---------- */
  function pointerGlow() {
    const g = document.createElement("div");
    g.className = "fx-glow";
    g.setAttribute("aria-hidden", "true");
    document.body.prepend(g);
    let x = innerWidth / 2, y = innerHeight / 3, raf = 0;
    const tick = () => {
      raf = 0;
      if (!pointer.active) return;
      x += (pointer.x - x) * 0.12; y += (pointer.y - y) * 0.12;
      g.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      g.style.opacity = "1";
      if (Math.abs(pointer.x - x) + Math.abs(pointer.y - y) > 0.5) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    document.addEventListener("pointerleave", () => { g.style.opacity = "0"; });
  }

  /* ---------- 3. drawn curves + parallax in the dark bands ---------- */
  const CURVES = `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
    <path class="c1" d="M-20 300 C 200 120, 380 360, 600 200 S 980 60, 1220 180"/>
    <path class="c2" d="M760 40 L1080 360"/><path class="c2 c2b" d="M760 360 L1080 40"/>
    <circle class="c3" cx="920" cy="200" r="6"/>
    <path class="c4" d="M40 380 C 260 378, 420 360, 520 300 S 640 80, 900 30"/>
  </svg>`;
  function bandFx(band) {
    if (band.querySelector(".band-curves")) return;
    const layer = document.createElement("div");
    layer.className = "band-curves";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = CURVES;
    band.prepend(layer);
    if (!fine()) return;
    const fl = band.querySelector(".floaters");
    band.addEventListener("pointermove", (e) => {
      const r = band.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      layer.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;
      if (fl) fl.style.transform = `translate3d(${x * 26}px, ${y * 18}px, 0)`;
    }, { passive: true });
    band.addEventListener("pointerleave", () => { layer.style.transform = ""; if (fl) fl.style.transform = ""; });
  }
  // scroll parallax: the band's decoration sinks a little slower than the page
  let bandsRaf = 0;
  window.addEventListener("scroll", () => {
    if (bandsRaf || reduce()) return;
    bandsRaf = requestAnimationFrame(() => {
      bandsRaf = 0;
      const y = Math.min(scrollY, 600);
      document.querySelectorAll(".band-curves svg, .floaters").forEach((el) => el.style.setProperty("--py", `${y * 0.25}px`));
    });
  }, { passive: true });

  /* ---------- 4. hero headline words, typed demo answer, magnetic buttons ---------- */
  function heroWords(root) {
    root.querySelectorAll(".band h1:not([data-split])").forEach((h) => {
      h.dataset.split = "1";
      let i = 0;
      const wrap = (node) => {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
            const s = document.createElement("span");
            s.className = "fx-w";
            s.style.setProperty("--wi", i++);
            s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1) {
          // keep a highlighted phrase whole so its marker sweep stays one stroke
          if (node.classList.contains("hl")) { node.classList.add("fx-w"); node.style.setProperty("--wi", i++); }
          else Array.from(node.childNodes).forEach(wrap);
        }
      };
      Array.from(h.childNodes).forEach(wrap);
      h.classList.add("fx-split");
    });
  }

  function typedDemo(root) {
    const ans = root.querySelector(".hero-demo .answer");
    if (!ans || ans.dataset.typed) return;
    ans.dataset.typed = "1";
    const full = ans.textContent;
    const demo = ans.closest(".hero-demo");
    ans.style.minHeight = ans.offsetHeight + "px";
    ans.textContent = "";
    const caret = document.createElement("span");
    caret.className = "fx-caret";
    ans.appendChild(caret);
    demo.classList.add("fx-typing");
    let n = 0;
    const step = () => {
      const from = n;
      n = Math.min(full.length, n + 2);
      caret.before(full.slice(from, n));
      if (n < full.length) setTimeout(step, 22);
      else { ans.normalize(); demo.classList.remove("fx-typing"); demo.classList.add("fx-typed"); setTimeout(() => caret.remove(), 1600); }
    };
    setTimeout(step, 650);
  }

  function magnetic(root) {
    if (!fine()) return;
    root.querySelectorAll(".band .btn:not([data-mag])").forEach((b) => {
      b.dataset.mag = "1";
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 10}px ${((e.clientY - r.top) / r.height - 0.5) * 8}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    });
  }

  /* ---------- 5. back to top, with a reading ring ---------- */
  function backToTop() {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "fx-top";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = `<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="trk" cx="22" cy="22" r="19"/><circle class="ring" cx="22" cy="22" r="19"/><path d="M15 25l7-7 7 7"/></svg>`;
    document.body.appendChild(b);
    const ring = b.querySelector(".ring");
    const C = 2 * Math.PI * 19;
    ring.style.strokeDasharray = C;
    let raf = 0;
    const set = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      ring.style.strokeDashoffset = C * (1 - p);
      b.classList.toggle("show", scrollY > 700);
    };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(set); }, { passive: true });
    b.onclick = () => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
    set();
  }

  /* ---------- wiring ---------- */
  // Called after every page render (see IB.runPage in app.js).
  IB.fx = function (root) {
    if (!root || reduce()) return;
    root.querySelectorAll(".band").forEach(bandFx);
    heroWords(root);
    typedDemo(root);
    magnetic(root);
  };

  document.addEventListener("DOMContentLoaded", () => {
    backToTop();
    if (reduce() || saveData) return;
    document.documentElement.classList.add("fx-on");
    if (window.HTMLCanvasElement) constellation();
    if (fine()) pointerGlow();
  });
})();
