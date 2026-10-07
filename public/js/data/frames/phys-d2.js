/* Physics (C.3-E.5) - diagrams and graphs to know (original). */
(function () {
  // ---------- tiny SVG helpers (all strokes/text use currentColor or --fig-* variables) ----------
  const CA = "var(--fig-a)", CB = "var(--fig-b)", CC = "var(--fig-c)", CD = "var(--fig-d)", CM = "var(--fig-muted)", CF = "var(--fig-fill)";
  const r1 = (v) => Math.round(v * 10) / 10;
  const S = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-size="12">${body}</svg>`;
  const mk = (id, c = "currentColor") => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>`;
  const sw = (o) => (/stroke-width/.test(o) ? "" : 'stroke-width="1.6" ');
  const L = (x1, y1, x2, y2, c = "currentColor", o = "") => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${c}" ${sw(o)}${o}/>`;
  const D = (x1, y1, x2, y2, c = CM) => L(x1, y1, x2, y2, c, 'stroke-dasharray="4 3" stroke-width="1.2"');
  const A = (id, x1, y1, x2, y2, c = "currentColor", o = "") => L(x1, y1, x2, y2, c, `marker-end="url(#${id})" ${o}`);
  const T = (x, y, s, o = "") => `<text x="${r1(x)}" y="${r1(y)}" ${/fill=/.test(o) ? "" : 'fill="currentColor" '}${o}>${s}</text>`;
  const Tm = (x, y, s, o = "") => T(x, y, s, `text-anchor="middle" ${o}`);
  const Te = (x, y, s, o = "") => T(x, y, s, `text-anchor="end" ${o}`);
  const C = (cx, cy, r, c = "currentColor", fill = "none", o = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" stroke="${c}" ${sw(o)}fill="${fill}" ${o}/>`;
  const P = (d, c = "currentColor", o = "") => `<path d="${d}" fill="none" stroke="${c}" ${sw(o)}${o}/>`;
  const R = (x, y, w, h, c = "currentColor", fill = "none", o = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" stroke="${c}" ${sw(o)}fill="${fill}" ${o}/>`;
  const poly = (pts) => pts.map((p, i) => (i ? "L" : "M") + r1(p[0]) + " " + r1(p[1])).join("");
  // sampled curve y = f(x) from a to b
  const fpath = (f, a, b, n = 40) => poly(Array.from({ length: n + 1 }, (_, i) => { const x = a + ((b - a) * i) / n; return [x, f(x)]; }));
  // arrowhead placed along a traced path at index i
  const arrowOn = (id, pts, i, c = "currentColor") => { const p = pts[Math.min(i, pts.length - 2)], q = pts[Math.min(i + 1, pts.length - 1)]; return `<path d="M${r1(p[0])} ${r1(p[1])}L${r1(q[0])} ${r1(q[1])}" stroke="${c}" stroke-width="1.6" marker-end="url(#${id})"/>`; };
  // dot = out of page, cross = into page
  const dotOut = (x, y, r = 7) => C(x, y, r) + `<circle cx="${x}" cy="${y}" r="2" fill="currentColor"/>`;
  const crossIn = (x, y, r = 7) => C(x, y, r) + L(x - r * 0.7, y - r * 0.7, x + r * 0.7, y + r * 0.7) + L(x - r * 0.7, y + r * 0.7, x + r * 0.7, y - r * 0.7);
  const xs = (x, y, s = 4) => `<path d="M${x - s} ${y - s}l${2 * s} ${2 * s}m0 ${-2 * s}l${-2 * s} ${2 * s}" stroke="${CM}" stroke-width="1.2"/>`;

  // electric field-line tracer for point charges [{x,y,q}], starting around positive charges
  function fieldLines(ch, perCharge, box, sign = 1) {
    const out = [];
    const E = (x, y) => { let ex = 0, ey = 0; ch.forEach((c) => { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2); ex += (c.q * dx) / (r2 * r); ey += (c.q * dy) / (r2 * r); }); return [ex * sign, ey * sign]; };
    ch.filter((c) => c.q * sign > 0).forEach((c) => {
      const n = perCharge(c);
      for (let k = 0; k < n; k++) {
        const a = (2 * Math.PI * (k + 0.5)) / n;
        let x = c.x + 9 * Math.cos(a), y = c.y + 9 * Math.sin(a);
        const pts = [[x, y]];
        for (let s = 0; s < 500; s++) {
          const [ex, ey] = E(x, y), m = Math.hypot(ex, ey) || 1;
          x += (3 * ex) / m; y += (3 * ey) / m;
          if (s % 5 === 4) pts.push([x, y]);
          const sink = ch.find((d) => d.q * sign < 0 && Math.hypot(x - d.x, y - d.y) < 9);
          if (sink) { pts.push([x, y]); break; }
          if (x < box[0] || x > box[2] || y < box[1] || y > box[3]) break;
        }
        out.push(pts);
      }
    });
    return out;
  }
  const drawLines = (lines, id, c = "currentColor", at = 0.45) => lines.map((p) => P(poly(p), c, 'stroke-width="1.3"') + (p.length > 4 ? arrowOn(id, p, Math.floor(p.length * at), c) : "")).join("");

  // standing-wave envelope between x0 and x0+len at height y: type ff (fixed-fixed), oo (open-open), co (closed at x0, open at end)
  function envelope(x0, len, y, amp, n, type) {
    const k = type === "co" ? ((2 * n - 1) * Math.PI) / (2 * len) : (n * Math.PI) / len;
    const g = (x) => (type === "oo" ? Math.cos(k * (x - x0)) : Math.sin(k * (x - x0)));
    return P(fpath((x) => y - amp * g(x), x0, x0 + len, 32), CA) + P(fpath((x) => y + amp * g(x), x0, x0 + len, 32), CA, 'stroke-dasharray="4 3"');
  }

  // ---------- C.3 figures ----------
  const refl = (() => {
    const id = "ar-p13-1";
    return S(340, 200, "Reflection and refraction of a ray at an air-glass boundary",
      mk(id) + R(20, 100, 300, 85, "none", CF) + L(20, 100, 320, 100) + D(170, 15, 170, 190) +
      A(id, 110, 20, 168, 97.5, CA) + A(id, 172, 97.5, 230, 20, CA, 'stroke-dasharray="5 3"') + A(id, 171, 102, 204, 178, CA) +
      P("M170 70 A30 30 0 0 0 152 76", "currentColor", 'stroke-width="1"') + T(150, 66, "i") +
      P("M170 70 A30 30 0 0 1 188 76", "currentColor", 'stroke-width="1"') + T(184, 66, "i") +
      P("M170 140 A40 40 0 0 0 186 136.6", "currentColor", 'stroke-width="1"') + T(178, 158, "r") +
      T(26, 30, "air, n₁") + T(26, 175, "glass, n₂ > n₁") + T(176, 28, "normal", 'font-size="11"') +
      T(236, 40, "reflected: angle i", 'font-size="11"') + T(210, 128, "refracted: bends", 'font-size="11"') + T(210, 142, "towards normal", 'font-size="11"') +
      T(26, 120, "n₁ sin i = n₂ sin r", 'font-size="11"'));
  })();

  const tir = (() => {
    const id = "ar-p13-2";
    const panel = (cx, ia, lab1, lab2) => {
      const n = 1.5, a = (ia * Math.PI) / 180, dy = ia > 50 ? 40 : 55, dx = dy * Math.tan(a);
      let s = D(cx, 25, cx, 145) + A(id, cx - dx, 80 + dy, cx - 1, 81, CA);
      const sr = n * Math.sin(a);
      if (sr < 0.999) { const r = Math.asin(sr); s += A(id, cx, 80, cx + 55 * Math.sin(r), 80 - 55 * Math.cos(r), CA) + A(id, cx + 1, 81, cx + dx, 80 + dy, CM, 'stroke-dasharray="3 3"'); }
      else if (sr < 1.01) s += A(id, cx, 79, cx + 58, 79, CA) + A(id, cx + 1, 81, cx + dx, 80 + dy, CM, 'stroke-dasharray="3 3"');
      else s += A(id, cx + 1, 81, cx + dx, 80 + dy, CA);
      return s + Tm(cx, 162, lab1, 'font-size="11"') + Tm(cx, 176, lab2, 'font-size="11"');
    };
    return S(420, 185, "Total internal reflection: angle of incidence below, equal to and above the critical angle",
      mk(id) + R(5, 80, 410, 70, "none", CF) + L(5, 80, 415, 80) + T(10, 22, "air (lower n)") + T(10, 145, "glass (higher n)") +
      panel(75, 28, "i &lt; θc: refracts out", "(+ weak reflection)") + panel(210, 41.8, "i = θc: refracted ray", "along boundary (r = 90°)") + panel(345, 58, "i &gt; θc: total internal", "reflection, no refracted ray"));
  })();

  const fibre = (() => {
    const id = "ar-p13-3";
    const pts = [[20, 66]]; let x = 20, up = true;
    while (x < 300) { x += 40; pts.push([x, up ? 46 : 86]); up = !up; }
    return S(360, 140, "Optical fibre: ray totally internally reflected along the core",
      mk(id) + R(10, 26, 340, 80, CM, CF) + R(10, 46, 340, 40, "currentColor", "none") +
      P(poly(pts), CA) + arrowOn(id, pts.map((p, i) => (i === pts.length - 1 ? [(p[0] + pts[i - 1][0]) / 2 + 2, (p[1] + pts[i - 1][1]) / 2 + (p[1] > 60 ? 1 : -1)] : p)), pts.length - 2, CA) +
      T(14, 20, "cladding: lower refractive index", 'font-size="11"') + T(14, 120, "core (inner strip): higher refractive index", 'font-size="11"') +
      T(14, 134, "ray stays in the core by TIR at the core–cladding boundary (i &gt; θc)", 'font-size="11"'));
  })();

  const gapDiff = (() => {
    let s = "";
    // wide gap
    s += L(95, 15, 95, 45, "currentColor", 'stroke-width="4"') + L(95, 125, 95, 155, "currentColor", 'stroke-width="4"');
    [35, 50, 65, 80].forEach((x) => (s += L(x, 25, x, 145, CA)));
    [110, 125, 140, 155].forEach((x, i) => (s += P(`M${x - 4 - 2 * i} ${36 - 3 * i} Q${x} ${42} ${x} ${55}L${x} 115Q${x} 128 ${x - 4 - 2 * i} ${134 + 3 * i}`, CA)));
    s += Tm(95, 172, "gap ≫ λ: little spreading", 'font-size="11"');
    // narrow gap
    s += L(275, 15, 275, 77, "currentColor", 'stroke-width="4"') + L(275, 93, 275, 155, "currentColor", 'stroke-width="4"');
    [215, 230, 245, 260].forEach((x) => (s += L(x, 25, x, 145, CA)));
    [15, 30, 45, 60].forEach((r) => { const a = (75 * Math.PI) / 180; s += P(`M${r1(275 + r * Math.cos(a))} ${r1(85 - r * Math.sin(a))}A${r} ${r} 0 0 1 ${r1(275 + r * Math.cos(a))} ${r1(85 + r * Math.sin(a))}`, CA); });
    s += Tm(285, 172, "gap ≈ λ: spreads as semicircles", 'font-size="11"');
    s += T(30, 12, "λ", 'font-size="11"') + L(35, 18, 50, 18, "currentColor", 'stroke-width="1"') + Tm(190, 190, "wavelength (wavefront spacing) is the same before and after the gap", 'font-size="11"');
    return S(380, 198, "Diffraction of plane wavefronts through a wide gap and a narrow gap", s);
  })();

  const dslit = (() => {
    const id = "ar-p13-4";
    let s = mk(id) + L(110, 15, 110, 72, "currentColor", 'stroke-width="3"') + L(110, 78, 110, 102, "currentColor", 'stroke-width="3"') + L(110, 108, 110, 165, "currentColor", 'stroke-width="3"');
    s += L(360, 15, 360, 165, "currentColor", 'stroke-width="2"');
    [-2, -1, 0, 1, 2].forEach((k) => (s += L(354, 90 + 28 * k, 366, 90 + 28 * k, CA, 'stroke-width="5"')));
    s += A(id, 20, 90, 70, 90, CA) + T(15, 80, "coherent", 'font-size="11"') + T(15, 106, "light, λ", 'font-size="11"');
    s += L(110, 75, 360, 34, CB, 'stroke-width="1.2"') + L(110, 105, 360, 34, CB, 'stroke-width="1.2"') + D(110, 90, 360, 90);
    s += T(116, 70, "S₁", 'font-size="11"') + T(116, 118, "S₂", 'font-size="11"') + Te(104, 94, "d", 'font-style="italic"');
    s += T(366, 30, "P") + T(370, 94, "O") + A(id, 380, 90, 380, 64) + A(id, 380, 64, 380, 90) + T(384, 82, "s", 'font-style="italic"');
    s += A(id, 110, 178, 358, 178) + A(id, 358, 178, 112, 178) + Tm(235, 192, "D (slits to screen, D ≫ d)", 'font-size="11"');
    s += T(150, 140, "bright: S₂P − S₁P = nλ", 'font-size="11"') + T(150, 156, "dark: S₂P − S₁P = (n + ½)λ", 'font-size="11"') + T(220, 104, "s = λD/d", 'font-size="11"');
    return S(400, 198, "Young's double-slit arrangement with path difference to point P", s);
  })();

  const grating = (() => {
    const id = "ar-p13-5", cx = 100, cy = 110, len = 200;
    let s = mk(id) + L(cx, 20, cx, 200, "currentColor", 'stroke-width="2"');
    for (let y = 26; y < 200; y += 8) s += L(cx - 4, y, cx + 4, y, "currentColor", 'stroke-width="1"');
    [70, 95, 125, 150].forEach((y) => (s += A(id, 20, y, cx - 6, y, CA)));
    [[0, "n = 0"], [Math.asin(0.25), "n = 1"], [Math.asin(0.5), "n = 2"]].forEach(([a, lab], i) => {
      const x2 = cx + len * Math.cos(a), dy = len * Math.sin(a);
      s += A(id, cx, cy, x2, cy - dy, i ? CB : CA) + T(x2 + 4, cy - dy + 4, lab, 'font-size="11"');
      if (i) s += A(id, cx, cy, x2, cy + dy, i ? CB : CA) + T(x2 + 4, cy + dy + 4, lab, 'font-size="11"');
    });
    s += P(`M${cx + 60} ${cy}A60 60 0 0 0 ${r1(cx + 60 * Math.cos(0.2527))} ${r1(cy - 60 * Math.sin(0.2527))}`, "currentColor", 'stroke-width="1"') + T(cx + 64, cy - 6, "θ₁", 'font-size="11"');
    s += T(14, 40, "monochromatic", 'font-size="11"') + T(14, 54, "plane waves", 'font-size="11"') + T(14, 236, "grating: line spacing d = 1/N (N lines per metre)", 'font-size="11"');
    s += T(14, 252, "d sin θ = nλ; highest order: largest n with sin θ ≤ 1", 'font-size="11"');
    return S(360, 260, "Diffraction grating: zero, first and second order maxima", s);
  })();

  const wavefrontRefraction = (() => {
    const id = "ar-p13-6", ia = (40 * Math.PI) / 180, ra = Math.asin(Math.sin(ia) / 1.5), l1 = 24, l2 = l1 / 1.5, step = l1 / Math.sin(ia);
    let s = mk(id) + R(10, 100, 320, 90, "none", CF) + L(10, 100, 330, 100);
    for (let k = 0; k < 6; k++) {
      const X = 80 + k * step;
      s += L(X, 100, X + 75 * Math.cos(ia), 100 - 75 * Math.sin(ia), CA) + L(X, 100, X - 75 * Math.cos(ra), 100 + 75 * Math.sin(ra), CA);
    }
    s += A(id, 40, 25, 40 + 60 * Math.sin(ia), 25 + 60 * Math.cos(ia), CB, 'stroke-width="2"') + A(id, 170, 120, 170 + 60 * Math.sin(ra), 120 + 60 * Math.cos(ra), CB, 'stroke-width="2"');
    s += T(14, 18, "fast medium (air): wavefronts λ₁ apart", 'font-size="11"') + T(14, 186, "slow medium (glass): λ₂ &lt; λ₁", 'font-size="11"') + T(238, 186, "f unchanged", 'font-size="11"');
    s += T(240, 140, "ray bends towards", 'font-size="11"') + T(240, 154, "the normal", 'font-size="11"');
    return S(340, 196, "Plane wavefronts refracting into a slower medium", s);
  })();

  // ---------- C.4 figures ----------
  const stringHarm = (() => {
    let s = "";
    [1, 2, 3].forEach((n, i) => {
      const y = 40 + i * 62;
      s += envelope(70, 220, y, 18, n, "ff") + `<circle cx="70" cy="${y}" r="3" fill="currentColor"/><circle cx="290" cy="${y}" r="3" fill="currentColor"/>`;
      for (let k = 0; k <= n; k++) s += Tm(70 + (220 * k) / n, y + 32, "N", 'font-size="11"');
      for (let k = 0; k < n; k++) s += Tm(70 + (220 * (k + 0.5)) / n, y - 22, "A", 'font-size="11"');
      s += T(8, y + 4, `n = ${n}`, 'font-size="11"') + T(300, y - 4, ["λ = 2L", "λ = L", "λ = 2L/3"][i], 'font-size="11"') + T(300, y + 12, ["f₁ = v/2L", "f₂ = 2f₁", "f₃ = 3f₁"][i], 'font-size="11"');
    });
    s += Tm(180, 222, "string fixed at both ends: nodes at the ends, f = nv/2L", 'font-size="11"');
    return S(370, 230, "First three harmonics on a string fixed at both ends", s);
  })();

  const pipe = (type) => {
    let s = "";
    [1, 2, 3].forEach((n, i) => {
      const y = 44 + i * 74, m = type === "co" ? 2 * n - 1 : n;
      s += L(70, y - 24, 290, y - 24) + L(70, y + 24, 290, y + 24);
      if (type === "co") s += L(70, y - 24, 70, y + 24, "currentColor", 'stroke-width="4"');
      s += envelope(70, 220, y, 18, n, type);
      const nodes = [], anti = [];
      if (type === "oo") for (let k = 0; k <= n; k++) { anti.push(k / n); if (k < n) nodes.push((k + 0.5) / n); }
      else for (let j = 0; j < n; j++) { nodes.push((2 * j) / m); anti.push((2 * j + 1) / m); }
      nodes.forEach((f) => (s += Tm(70 + 220 * f, y + 37, "N", 'font-size="10"')));
      anti.forEach((f) => (s += Tm(70 + 220 * f, y + 37, "A", `font-size="10" fill="${CA}"`)));
      const lam = type === "oo" ? ["λ = 2L", "λ = L", "λ = 2L/3"][i] : ["λ = 4L", "λ = 4L/3", "λ = 4L/5"][i];
      const f = type === "oo" ? ["f₁ = v/2L", "f₂ = 2f₁", "f₃ = 3f₁"][i] : ["f₁ = v/4L", "f₃ = 3f₁", "f₅ = 5f₁"][i];
      s += T(300, y - 2, lam, 'font-size="11"') + T(300, y + 14, f, 'font-size="11"') + T(6, y + 4, type === "oo" ? `n = ${n}` : ["1st", "3rd", "5th"][i], 'font-size="11"');
    });
    s += Tm(185, 252, type === "oo" ? "open both ends: displacement antinode (A) at each end" : "closed end: node (N); open end: antinode (A)", 'font-size="11"');
    s += Tm(185, 266, type === "oo" ? "all harmonics: f = nv/2L" : "odd harmonics only: f = (2n − 1)v/4L", 'font-size="11"');
    return S(370, 272, type === "oo" ? "Displacement standing waves in a pipe open at both ends" : "Displacement standing waves in a pipe closed at one end", s);
  };

  const resTube = (() => {
    let s = "";
    [[60, 50, "L₁ ≈ λ/4", 1], [230, 150, "L₂ ≈ 3λ/4", 2]].forEach(([x, depth, lab, n]) => {
      const top = 40, water = top + depth;
      s += L(x, top, x, 230) + L(x + 40, top, x + 40, 230) + R(x, water, 40, 230 - water, "none", CF) + L(x, water, x + 40, water, CB);
      // fork
      s += P(`M${x + 12} 10 L${x + 12} 28 Q${x + 20} 34 ${x + 28} 28 L${x + 28} 10`) + L(x + 20, 32, x + 20, 38);
      const len = water - top, g = (y) => Math.cos(((2 * n - 1) * Math.PI * (y - top)) / (2 * len));
      s += P(poly(Array.from({ length: 41 }, (_, i) => { const y = top + (len * i) / 40; return [x + 20 - 14 * g(y), y]; })), CA) + P(poly(Array.from({ length: 41 }, (_, i) => { const y = top + (len * i) / 40; return [x + 20 + 14 * g(y), y]; })), CA, 'stroke-dasharray="4 3"');
      s += T(x + 48, top + 8, "A", 'font-size="11"') + T(x + 48, water + 4, "N", 'font-size="11"') + T(x + 48, (top + water) / 2, lab, 'font-size="11"');
      s += T(x + 46, 222, "water", 'font-size="11"');
    });
    s += Tm(180, 252, "first two resonances: L₂ − L₁ = λ/2 (end correction cancels)", 'font-size="11"');
    return S(360, 260, "Resonance tube: first and second resonance lengths", s);
  })();

  // ---------- C.5 figures ----------
  const doppler = (() => {
    const id = "ar-p15-1";
    let s = mk(id);
    [12, 24, 36, 48].forEach((r) => (s += C(65, 100, r, CA, "none", 'stroke-width="1.3"')));
    s += `<circle cx="65" cy="100" r="3" fill="currentColor"/>` + Tm(65, 182, "stationary source:", 'font-size="11"') + Tm(65, 196, "λ same all round", 'font-size="11"');
    // moving source at half the wave speed: emitted at t = 0..3 from x = 200 + 9t, now t = 4
    for (let k = 0; k < 4; k++) s += C(200 + k * 9, 100, (4 - k) * 17, CA, "none", 'stroke-width="1.3"');
    s += `<circle cx="236" cy="100" r="3" fill="currentColor"/>` + A(id, 236, 100, 258, 100, CD, 'stroke-width="2"') + T(240, 94, "u", 'font-size="11"');
    s += T(286, 92, "ahead: λ shorter,", 'font-size="11"') + T(286, 106, "f higher", 'font-size="11"') + Tm(130, 20, "behind: λ longer,", 'font-size="11"') + Tm(130, 34, "f lower", 'font-size="11"');
    s += Tm(260, 182, "source moving right (u &lt; v):", 'font-size="11"') + Tm(260, 196, "wavefronts bunch up ahead", 'font-size="11"');
    return S(400, 202, "Wavefronts from a stationary and a moving source", s);
  })();

  const redshift = (() => {
    const id = "ar-p15-2", lines = [434, 486, 656], sx = (l) => 40 + ((l - 400) / 320) * 300;
    let s = mk(id) + R(40, 30, 300, 36, "currentColor", CF) + R(40, 100, 300, 36, "currentColor", CF);
    lines.forEach((l) => { s += L(sx(l), 30, sx(l), 66, "currentColor", 'stroke-width="3"') + L(sx(l * 1.06), 100, sx(l * 1.06), 136, "currentColor", 'stroke-width="3"') + D(sx(l), 66, sx(l), 100); });
    s += A(id, sx(656), 84, sx(656 * 1.06), 84, CD) + T(sx(656) + 2, 80, "Δλ", 'font-size="11"');
    s += T(40, 22, "laboratory (source at rest)", 'font-size="11"') + T(40, 152, "distant galaxy: same pattern shifted to longer λ (redshift)", 'font-size="11"');
    s += T(40, 172, "violet / shorter λ", 'font-size="11"') + Te(340, 172, "red / longer λ", 'font-size="11"') + A(id, 150, 168, 230, 168, CM);
    s += T(40, 190, "z = Δλ/λ₀ ≈ v/c (v ≪ c); receding galaxy", 'font-size="11"');
    return S(360, 198, "Absorption lines of a galaxy redshifted compared with a laboratory spectrum", s);
  })();

  // ---------- D.1 figures ----------
  const radialG = (() => {
    const id = "ar-p16-1";
    let s = mk(id) + C(100, 100, 32, "currentColor", CF) + Tm(100, 104, "M");
    for (let k = 0; k < 12; k++) { const a = (k * Math.PI) / 6; s += A(id, 100 + 88 * Math.cos(a), 100 + 88 * Math.sin(a), 100 + 35 * Math.cos(a), 100 + 35 * Math.sin(a), CA); }
    s += Tm(100, 206, "radial: lines point to centre;", 'font-size="11"') + Tm(100, 220, "closer lines = stronger field", 'font-size="11"');
    // near-surface uniform field
    s += L(230, 170, 370, 170, "currentColor", 'stroke-width="2"');
    for (let x = 234; x < 370; x += 10) s += L(x, 170, x - 6, 178, "currentColor", 'stroke-width="1"');
    for (let x = 245; x < 370; x += 25) s += A(id, x, 40, x, 166, CA);
    s += Tm(300, 206, "near the surface: parallel,", 'font-size="11"') + Tm(300, 220, "equally spaced = uniform g", 'font-size="11"') + Tm(300, 30, "small region above surface", 'font-size="11"');
    return S(400, 228, "Gravitational field lines: radial around a planet and uniform near its surface", s);
  })();

  const equipG = (() => {
    const id = "ar-p16-2";
    let s = mk(id) + C(110, 110, 25, "currentColor", CF);
    [[31.25, "−0.8"], [41.7, "−0.6"], [62.5, "−0.4"], [100, "−0.25"]].forEach(([r]) => (s += C(110, 110, r, CB, "none", 'stroke-dasharray="4 3"')));
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4 + 0.39; s += A(id, 110 + 104 * Math.cos(a), 110 + 104 * Math.sin(a), 110 + 27 * Math.cos(a), 110 + 27 * Math.sin(a), CA, 'stroke-width="1.3"'); }
    s += T(232, 40, "— field lines (radial)", 'font-size="11"', "") + T(232, 58, "- - equipotentials: circles", 'font-size="11"');
    s += T(232, 76, "at equal steps of ΔV,", 'font-size="11"') + T(232, 94, "spacing increases outwards", 'font-size="11"') + T(232, 118, "field lines ⟂ equipotentials", 'font-size="11"');
    s += T(232, 136, "no work done moving along", 'font-size="11"') + T(232, 150, "an equipotential", 'font-size="11"') + T(232, 174, "V = −GM/r (always negative)", 'font-size="11"');
    return S(400, 222, "Equipotential surfaces around a spherical mass", s);
  })();

  const kepler2 = (() => {
    const a = 140, b = 80, c = Math.sqrt(a * a - b * b), e = c / a, cx = 190, cy = 100, fx = cx - c;
    const pos = (M) => { let E = M; for (let i = 0; i < 30; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); return [cx - a * Math.cos(E), cy - b * Math.sin(E)]; };
    const sector = (M0, M1) => { const pts = Array.from({ length: 13 }, (_, i) => pos(M0 + ((M1 - M0) * i) / 12)); return `<path d="M${r1(fx)} ${cy}${poly(pts).replace("M", "L")}Z" fill="${CF}" stroke="${CB}" stroke-width="1.2"/>`; };
    let s = sector(-0.35, 0.35) + sector(Math.PI - 0.35, Math.PI + 0.35) + `<ellipse cx="${cx}" cy="${cy}" rx="${a}" ry="${b}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    s += `<circle cx="${r1(fx)}" cy="${cy}" r="7" fill="${CA}"/>` + T(4, 168, "Sun (at a focus)", 'font-size="11"') + L(30, 157, fx - 3, cy + 6, CM, 'stroke-width="1"');
    s += T(14, 30, "perihelion: fast", 'font-size="11"') + Te(345, 30, "aphelion: slow", 'font-size="11"');
    s += Tm(190, 200, "equal areas swept in equal times (shaded areas equal)", 'font-size="11"');
    return S(360, 208, "Kepler's second law: equal areas in equal times", s);
  })();


  const openPipe = pipe("oo"), closedPipe = pipe("co");

  // ---------- D.2 figures ----------
  const pointCharges = (() => {
    const id = "ar-p17-1";
    let s = mk(id) + C(80, 90, 14, "currentColor", CF) + Tm(80, 95, "+", 'font-size="14"') + C(260, 90, 14, "currentColor", CF) + Tm(260, 95, "−", 'font-size="14"');
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4, c = Math.cos(a), si = Math.sin(a);
      s += A(id, 80 + 17 * c, 90 + 17 * si, 80 + 70 * c, 90 + 70 * si, CA) + A(id, 260 + 70 * c, 90 + 70 * si, 260 + 17 * c, 90 + 17 * si, CA);
    }
    s += Tm(80, 182, "positive: lines radially outwards", 'font-size="11"') + Tm(260, 182, "negative: lines radially inwards", 'font-size="11"');
    return S(340, 190, "Electric field lines of isolated positive and negative point charges", s);
  })();

  const dipole = (() => {
    const id = "ar-p17-2", ch = [{ x: 130, y: 110, q: 1 }, { x: 270, y: 110, q: -1 }];
    let s = mk(id) + drawLines(fieldLines(ch, () => 14, [0, 0, 400, 220]), id, CA, 0.3);
    s += C(130, 110, 11, "currentColor", CF) + Tm(130, 115, "+", 'font-size="14"') + C(270, 110, 11, "currentColor", CF) + Tm(270, 115, "−", 'font-size="14"');
    s += Tm(200, 214, "lines start on + and end on −; never cross; ⟂ to the surfaces", 'font-size="11"');
    return S(400, 222, "Electric field lines between equal and opposite charges", s);
  })();

  const likeCharges = (() => {
    const id = "ar-p17-3", ch = [{ x: 130, y: 110, q: 1 }, { x: 270, y: 110, q: 1 }];
    let s = mk(id) + drawLines(fieldLines(ch, () => 10, [0, 0, 400, 220]), id, CA, 0.3);
    s += C(130, 110, 11, "currentColor", CF) + Tm(130, 115, "+", 'font-size="14"') + C(270, 110, 11, "currentColor", CF) + Tm(270, 115, "+", 'font-size="14"');
    s += xs(200, 110, 5) + T(205, 128, "N (E = 0)", 'font-size="11"') + Tm(200, 214, "two like charges: lines repel, neutral point midway", 'font-size="11"');
    return S(400, 222, "Electric field lines of two equal positive charges with a neutral point", s);
  })();

  const plates = (() => {
    const id = "ar-p17-4";
    let s = mk(id) + R(60, 30, 220, 8, "currentColor", CF) + R(60, 152, 220, 8, "currentColor", CF);
    for (let x = 80; x <= 260; x += 30) s += A(id, x, 40, x, 150, CA);
    s += P("M64 40 Q50 95 64 150", CA) + P("M276 40 Q290 95 276 150", CA) + P("M60 38 Q30 95 60 152", CA, 'stroke-width="1.2"') + P("M280 38 Q310 95 280 152", CA, 'stroke-width="1.2"');
    [72, 95, 118].forEach((y) => (s += D(70, y, 270, y, CB)));
    for (let x = 70; x < 280; x += 22) s += Tm(x, 27, "+", 'font-size="12"') + Tm(x, 174, "−", 'font-size="12"');
    s += T(300, 60, "uniform field", 'font-size="11"') + T(300, 74, "E = V/d", 'font-size="11"') + T(300, 100, "- - equipotentials", 'font-size="11"') + T(300, 114, "parallel to plates", 'font-size="11"') + T(300, 140, "edge effect:", 'font-size="11"') + T(300, 154, "lines bulge", 'font-size="11"');
    return S(400, 184, "Uniform electric field between charged parallel plates with edge effects", s);
  })();

  const wireField = (() => {
    const id = "ar-p17-5";
    let s = mk(id);
    const ring = (cx, out) => {
      let g = out ? dotOut(cx, 90) : crossIn(cx, 90);
      [24, 44, 66].forEach((r) => { g += C(cx, 90, r, CA, "none", 'stroke-width="1.3"'); const y = 90 - r; g += A(id, cx + (out ? 4 : -4), y, cx + (out ? -6 : 6), y, CA); });
      return g;
    };
    s += ring(90, true) + ring(270, false);
    s += Tm(90, 178, "current out of page ⊙:", 'font-size="11"') + Tm(90, 192, "anticlockwise circles", 'font-size="11"') + Tm(270, 178, "current into page ⊗:", 'font-size="11"') + Tm(270, 192, "clockwise circles", 'font-size="11"');
    s += Tm(180, 210, "right-hand grip: thumb = current, fingers = B; spacing grows (B ∝ 1/r)", 'font-size="11"');
    return S(360, 218, "Magnetic field of a long straight current-carrying wire", s);
  })();

  // closed field loops from end xa to end xb (outside a magnet or solenoid); arrows show direction
  const loops = (id, xa, xb, y0, dir, hs = 1, ws = 1) => {
    let s = "";
    [[8, 22, 40], [16, 44, 75], [24, 68, 110]].forEach(([dy, h, w]) => {
      [-1, 1].forEach((sg) => {
        const e = Math.sign(xa - xb), ya = y0 + sg * dy, c1 = y0 + sg * (dy + h * hs * 1.33), mid = (xa + xb) / 2, ytop = y0 + sg * (dy + h * hs);
        s += P(`M${xa} ${ya} C${xa + w * ws * e} ${c1} ${xb - w * ws * e} ${c1} ${xb} ${ya}`, CA, 'stroke-width="1.3"') + A(id, mid - 4 * dir, ytop, mid + 4 * dir, ytop, CA);
      });
    });
    return s;
  };
  const solenoid = (() => {
    const id = "ar-p17-6";
    // N at right end (x = 290): outside, lines leave N and loop back to S (left)
    let s = mk(id) + loops(id, 290, 110, 110, -1) + A(id, 292, 110, 360, 110, CA) + A(id, 40, 110, 108, 110, CA);
    s += R(110, 80, 180, 60, "none", CF);
    for (let x = 122; x <= 280; x += 20) s += dotOut(x, 80, 6) + crossIn(x, 140, 6);
    [95, 110, 125].forEach((y) => (s += A(id, 115, y, 285, y, CA)));
    s += T(296, 100, "N", 'font-size="13" font-weight="bold"') + Te(104, 100, "S", 'font-size="13" font-weight="bold"');
    s += Tm(200, 214, "inside: strong, uniform, parallel; outside: like a bar magnet", 'font-size="11"');
    return S(400, 222, "Magnetic field of a current-carrying solenoid", s);
  })();

  const barMagnet = (() => {
    const id = "ar-p17-7";
    let s = mk(id) + loops(id, 150, 250, 100, 1, 0.75, 1.5) + A(id, 150, 100, 70, 100, CA) + A(id, 330, 100, 252, 100, CA);
    s += R(150, 86, 50, 28, "currentColor", CF) + R(200, 86, 50, 28, "currentColor", "none") + Tm(175, 105, "N", 'font-size="13" font-weight="bold"') + Tm(225, 105, "S", 'font-size="13" font-weight="bold"');
    s += Tm(200, 194, "outside the magnet, field lines leave N and enter S; they never cross", 'font-size="11"');
    return S(400, 200, "Magnetic field lines around a bar magnet", s);
  })();

  const millikan = (() => {
    const id = "ar-p17-8";
    let s = mk(id) + R(60, 40, 200, 8, "currentColor", CF) + R(60, 152, 200, 8, "currentColor", CF) + Tm(160, 32, "+ + + + + + + +") + Tm(160, 178, "− − − − − − − −");
    s += `<circle cx="160" cy="100" r="7" fill="${CB}"/>` + A(id, 160, 92, 160, 56, CA, 'stroke-width="2"') + A(id, 160, 108, 160, 144, CD, 'stroke-width="2"');
    s += T(168, 70, "electric force qE", 'font-size="11"') + T(168, 136, "weight mg", 'font-size="11"') + T(176, 104, "negative oil drop", 'font-size="11"');
    s += T(270, 90, "p.d. V,", 'font-size="11"') + T(270, 104, "spacing d", 'font-size="11"') + T(20, 200, "stationary drop: qV/d = mg → q = mgd/V (always a multiple of e)", 'font-size="11"');
    return S(380, 208, "Millikan's oil drop: electric force balances weight", s);
  })();

  // ---------- D.3 figures ----------
  const circB = (() => {
    const id = "ar-p18-1";
    let s = mk(id);
    for (let x = 30; x <= 330; x += 60) for (let y = 20; y <= 200; y += 45) s += xs(x, y, 3);
    s += C(180, 110, 70, CA, "none", 'stroke-dasharray="5 4"') + `<circle cx="180" cy="180" r="5" fill="${CB}"/>` + Tm(180, 198, "+q", 'font-size="11"');
    s += A(id, 40, 180, 172, 180, CB, 'stroke-width="2"') + A(id, 186, 180, 236, 180, CC, 'stroke-width="2"') + T(214, 172, "v", 'font-size="12"');
    s += A(id, 180, 174, 180, 132, CD, 'stroke-width="2"') + T(186, 150, "F = qvB", 'font-size="11"') + T(186, 164, "towards centre", 'font-size="11"');
    s += A(id, 250, 110, 250, 104, CA) + `<circle cx="180" cy="110" r="2" fill="currentColor"/>` + D(180, 110, 180, 172) + T(160, 104, "r", 'font-size="12"');
    s += T(260, 30, "B into page (×)", 'font-size="11"') + T(12, 222, "r = mv/qB; F ⟂ v, so speed and KE stay constant", 'font-size="11"') + T(12, 236, "an electron (negative) would curve the other way", 'font-size="11"');
    return S(360, 244, "Positive charge moving in a circle in a uniform magnetic field", s);
  })();

  const vSelector = (() => {
    const id = "ar-p18-2";
    let s = mk(id) + R(80, 30, 220, 8, "currentColor", CF) + R(80, 142, 220, 8, "currentColor", CF) + Tm(190, 24, "+ + + + + + +") + Tm(190, 166, "− − − − − − −");
    for (let x = 100; x <= 280; x += 30) [60, 120].forEach((y) => (s += xs(x, y, 3)));
    s += A(id, 20, 90, 330, 90, CA, 'stroke-width="2"') + P("M180 90 Q260 90 330 60", CB, 'stroke-dasharray="4 3"') + P("M180 90 Q260 90 330 120", CC, 'stroke-dasharray="4 3"');
    s += `<circle cx="180" cy="90" r="4" fill="${CA}"/>` + A(id, 180, 86, 180, 60, CD) + A(id, 180, 94, 180, 120, CD);
    s += T(186, 70, "qvB", 'font-size="11"') + T(186, 116, "qE", 'font-size="11"') + T(334, 60, "v &gt; E/B", 'font-size="11"') + T(334, 94, "v = E/B", 'font-size="11"') + T(334, 124, "v &lt; E/B", 'font-size="11"');
    s += T(20, 190, "positive ions; B into page; undeflected when qE = qvB → v = E/B", 'font-size="11"');
    return S(400, 198, "Velocity selector: crossed electric and magnetic fields", s);
  })();

  const wireForce = (() => {
    const id = "ar-p18-3";
    let s = mk(id) + R(20, 50, 60, 100, "currentColor", CF) + R(280, 50, 60, 100, "currentColor", CF) + Tm(50, 105, "N", 'font-size="14" font-weight="bold"') + Tm(310, 105, "S", 'font-size="14" font-weight="bold"');
    [70, 100, 130].forEach((y) => (s += A(id, 84, y, 160, y, CA, 'stroke-width="1.3"') + A(id, 200, y, 276, y, CA, 'stroke-width="1.3"')));
    s += crossIn(180, 100, 10) + A(id, 180, 112, 180, 170, CD, 'stroke-width="2.2"') + T(188, 166, "F", 'font-size="12"') + T(188, 92, "I into page", 'font-size="11"');
    s += Tm(180, 30, "B left → right (N to S)", 'font-size="11"') + T(20, 194, "F = BIL sin θ; left-hand rule: First finger B, seCond finger I, thuMb F", 'font-size="11"');
    return S(360, 202, "Force on a current-carrying wire in a magnetic field", s);
  })();

  const parallelWires = (() => {
    const id = "ar-p18-4";
    let s = mk(id);
    const pair = (x0, same) => {
      let g = dotOut(x0, 90) + (same ? dotOut(x0 + 80, 90) : crossIn(x0 + 80, 90));
      g += C(x0, 90, 28, CM, "none", 'stroke-width="1" stroke-dasharray="3 3"') + C(x0 + 80, 90, 28, CM, "none", 'stroke-width="1" stroke-dasharray="3 3"');
      g += same ? A(id, x0 + 10, 90, x0 + 34, 90, CD, 'stroke-width="2"') + A(id, x0 + 70, 90, x0 + 46, 90, CD, 'stroke-width="2"') : A(id, x0 - 10, 90, x0 - 34, 90, CD, 'stroke-width="2"') + A(id, x0 + 90, 90, x0 + 114, 90, CD, 'stroke-width="2"');
      return g;
    };
    s += pair(50, true) + pair(250, false);
    s += Tm(90, 150, "same direction: attract", 'font-size="11"') + Tm(290, 150, "opposite directions: repel", 'font-size="11"');
    s += Tm(190, 176, "F/L = μ₀I₁I₂/2πr (equal and opposite, Newton's third law)", 'font-size="11"');
    return S(380, 184, "Forces between parallel current-carrying wires", s);
  })();

  // ---------- D.4 figures ----------
  const lenzMagnet = (() => {
    const id = "ar-p19-1";
    let s = mk(id) + R(20, 75, 50, 30, "currentColor", CF) + R(70, 75, 50, 30, "currentColor", "none") + Tm(45, 95, "S", 'font-size="13" font-weight="bold"') + Tm(95, 95, "N", 'font-size="13" font-weight="bold"');
    s += A(id, 70, 124, 120, 124, CB, 'stroke-width="2"') + T(70, 140, "magnet moves in", 'font-size="11"');
    for (let x = 170; x <= 290; x += 15) s += `<ellipse cx="${x}" cy="90" rx="6" ry="30" fill="none" stroke="${CA}" stroke-width="1.6"/>`;
    s += Tm(170, 52, "N", 'font-size="13" font-weight="bold"') + Tm(290, 52, "S", 'font-size="13" font-weight="bold"');
    s += P("M290 120 L290 170 L250 170", CA) + P("M170 120 L170 170 L210 170", CA) + C(230, 170, 14) + Tm(230, 174, "G", 'font-size="11"');
    s += T(10, 196, "induced current makes the near end of the coil an N pole,", 'font-size="11"') + T(10, 210, "repelling the approaching magnet (opposes the change)", 'font-size="11"');
    return S(380, 218, "Lenz's law: magnet pushed into a coil", s);
  })();

  const rails = (() => {
    const id = "ar-p19-2";
    let s = mk(id);
    for (let x = 70; x <= 330; x += 52) [45, 75, 105, 135].forEach((y) => (s += xs(x, y, 3)));
    s += L(40, 30, 350, 30, "currentColor", 'stroke-width="2.5"') + L(40, 150, 350, 150, "currentColor", 'stroke-width="2.5"') + L(40, 30, 40, 150, "currentColor", 'stroke-width="2.5"');
    s += R(33, 72, 14, 36, "currentColor", CF) + T(10, 94, "R", 'font-size="12"');
    s += L(240, 22, 240, 158, CB, 'stroke-width="5"') + A(id, 246, 168, 290, 168, CC, 'stroke-width="2"') + T(294, 172, "v", 'font-size="12"');
    s += A(id, 236, 110, 196, 110, CD, 'stroke-width="2"') + T(150, 106, "F = BIL", 'font-size="11"');
    s += A(id, 255, 120, 255, 60, CA) + T(260, 94, "I", 'font-size="12"') + A(id, 140, 30, 100, 30, CA) + A(id, 100, 150, 140, 150, CA) + T(248, 16, "rod, length L", 'font-size="11"');
    s += T(10, 192, "B into page; ε = BLv; current anticlockwise (flux into page increasing);", 'font-size="11"') + T(10, 206, "force on rod opposes its motion (Lenz)", 'font-size="11"');
    return S(380, 214, "Conducting rod moving on rails in a magnetic field", s);
  })();

  const fluxAngle = (() => {
    const id = "ar-p19-3";
    let s = mk(id);
    [40, 70, 100, 130, 160].forEach((y) => (s += A(id, 20, y, 330, y, CA, 'stroke-width="1.2"')));
    const c = Math.cos(0.6), si = Math.sin(0.6);
    s += L(170 - 70 * si, 100 - 70 * c, 170 + 70 * si, 100 + 70 * c, CB, 'stroke-width="4"');
    s += A(id, 170, 100, 170 + 80 * c, 100 - 80 * si, CD, 'stroke-width="2"') + T(170 + 84 * c, 100 - 84 * si, "normal", 'font-size="11"');
    s += P(`M210 100 A40 40 0 0 0 ${r1(170 + 40 * c)} ${r1(100 - 40 * si)}`, "currentColor", 'stroke-width="1"') + T(214, 92, "θ", 'font-size="12"');
    s += T(20, 26, "uniform B", 'font-size="11"') + T(120, 186, "coil of area A (edge-on)", 'font-size="11"') + T(20, 206, "Φ = BA cos θ (θ between B and the normal); flux linkage = NΦ", 'font-size="11"');
    return S(360, 214, "Magnetic flux through a coil at an angle to the field", s);
  })();

  const generator = (() => {
    const id = "ar-p19-4";
    let s = mk(id) + R(20, 40, 50, 100, "currentColor", CF) + R(290, 40, 50, 100, "currentColor", CF) + Tm(45, 95, "N", 'font-size="14" font-weight="bold"') + Tm(315, 95, "S", 'font-size="14" font-weight="bold"');
    s += R(110, 55, 140, 70, CA, "none", 'stroke-width="2.4"') + D(180, 35, 180, 150, CM);
    s += P("M172 125 L172 168", CA, 'stroke-width="2"') + P("M188 125 L188 182", CA, 'stroke-width="2"');
    s += `<ellipse cx="180" cy="168" rx="18" ry="5" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="180" cy="182" rx="18" ry="5" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    s += R(150, 163, 8, 10, "currentColor", CF) + R(202, 177, 8, 10, "currentColor", CF) + L(150, 168, 110, 168) + L(210, 182, 250, 182) + T(70, 196, "brushes → a.c. output", 'font-size="11"') + T(214, 168, "slip rings", 'font-size="11"');
    s += P("M240 30 A70 16 0 0 1 120 30", "currentColor", `marker-end="url(#${id})"`) + Tm(180, 14, "coil rotates about the axis", 'font-size="11"');
    s += T(10, 222, "ε = −N dΦ/dt; ε is maximum when the coil plane is parallel to B (Φ = 0)", 'font-size="11"') + T(10, 236, "doubling the rotation frequency doubles ε₀ and halves the period", 'font-size="11"');
    return S(380, 244, "Simple a.c. generator with slip rings and brushes", s);
  })();

  const gmApparatus = (() => {
    const id = "ar-p20-1";
    let s = mk(id) + C(200, 110, 90, "currentColor", "none", 'stroke-dasharray="6 4"') + R(40, 95, 40, 30, "currentColor", CF) + `<circle cx="70" cy="110" r="4" fill="${CD}"/>`;
    s += L(80, 104, 92, 104, "currentColor", 'stroke-width="3"') + L(80, 116, 92, 116, "currentColor", 'stroke-width="3"') + A(id, 84, 110, 196, 110, CA, 'stroke-width="2"');
    s += L(200, 85, 200, 135, CB, 'stroke-width="3"');
    const a = -0.9, dx = Math.cos(a), dy = Math.sin(a);
    s += A(id, 202, 108, 200 + 78 * dx, 110 + 78 * dy, CA, 'stroke-dasharray="4 3"') + `<rect x="-12" y="-7" width="24" height="14" transform="translate(${r1(200 + 88 * dx)} ${r1(110 + 88 * dy)}) rotate(${r1((a * 180) / Math.PI + 90)})" fill="${CF}" stroke="currentColor" stroke-width="1.6"/>`;
    s += P(`M240 110 A40 40 0 0 0 ${r1(200 + 40 * dx)} ${r1(110 + 40 * dy)}`, "currentColor", 'stroke-width="1"') + T(244, 98, "θ", 'font-size="12"');
    s += T(10, 86, "α source in", 'font-size="11"') + T(10, 140, "lead block", 'font-size="11"') + T(206, 150, "thin gold foil", 'font-size="11"') + T(276, 30, "ZnS detector +", 'font-size="11"') + T(276, 44, "microscope", 'font-size="11"') + T(270, 200, "vacuum", 'font-size="11"');
    s += T(10, 222, "count rate measured at each θ: most α undeviated, a few > 90°", 'font-size="11"');
    return S(380, 230, "Geiger-Marsden apparatus for alpha-particle scattering", s);
  })();

  const rutherford = (() => {
    const id = "ar-p20-2", nx = 290, ny = 110, K = 12;
    let s = mk(id);
    [2, 10, 22, 40, 70, -16, -46].forEach((b) => {
      let x = 10, y = ny - b, vx = 1, vy = 0;
      const pts = [[x, y]];
      for (let i = 0; i < 4000; i++) {
        const dx = x - nx, dy = y - ny, r = Math.hypot(dx, dy), a = K / (r * r);
        vx += (a * dx) / r * 0.5; vy += (a * dy) / r * 0.5; x += vx * 0.5; y += vy * 0.5;
        if (i % 24 === 23) pts.push([x, y]);
        if (x < 5 || x > 395 || y < 5 || y > 215) break;
      }
      pts.push([x, y]);
      s += P(poly(pts), CA, 'stroke-width="1.3"') + arrowOn(id, pts, Math.max(2, pts.length - 3), CA);
    });
    s += `<circle cx="${nx}" cy="${ny}" r="5" fill="${CD}"/>` + T(nx + 8, ny + 18, "nucleus (+)", 'font-size="11"');
    s += T(10, 210, "closer approach → larger deflection; head-on → bounces back", 'font-size="11"');
    return S(400, 218, "Paths of alpha particles scattered by a gold nucleus", s);
  })();

  const spectraTypes = (() => {
    const sx = (l) => 70 + ((l - 400) / 300) * 300, Hl = [410, 434, 486, 656];
    let s = R(70, 20, 300, 30, "currentColor", CF) + T(4, 40, "continuous", 'font-size="11"');
    s += R(70, 70, 300, 30, "currentColor", "none") + T(4, 90, "emission", 'font-size="11"');
    s += R(70, 120, 300, 30, "currentColor", CF) + T(4, 140, "absorption", 'font-size="11"');
    Hl.forEach((l) => (s += L(sx(l), 70, sx(l), 100, CA, 'stroke-width="3"') + L(sx(l), 120, sx(l), 150, "currentColor", 'stroke-width="3"')));
    s += T(70, 168, "400 nm (violet)", 'font-size="11"') + Te(370, 168, "700 nm (red)", 'font-size="11"');
    s += T(4, 188, "hot solid: all λ · hot low-pressure gas: bright lines · cool gas in front of", 'font-size="11"') + T(4, 202, "a continuous source: dark lines at the SAME λ as the emission lines", 'font-size="11"');
    return S(380, 210, "Continuous, emission line and absorption line spectra (hydrogen)", s);
  })();

  const hSeries = (() => {
    const id = "ar-p20-3", Y = { 1: 220, 2: 128, 3: 86, 4: 64, 5: 50, 6: 42, 99: 28 }, E = { 1: "−13.6", 2: "−3.40", 3: "−1.51", 4: "−0.85", 99: "0" };
    let s = mk(id);
    Object.entries(Y).forEach(([n, y]) => { s += L(60, y, 350, y, n == 99 ? CM : "currentColor", n == 99 ? 'stroke-dasharray="4 3"' : ""); if (E[n]) s += Te(54, y + 4, E[n], 'font-size="11"'); if (n <= 4 || n == 99) s += T(356, y + 4, n == 99 ? "n = ∞" : `n = ${n}`, 'font-size="11"'); });
    [2, 3, 4, 99].forEach((n, i) => (s += A(id, 80 + i * 14, Y[n], 80 + i * 14, 218, CD)));
    [3, 4, 5].forEach((n, i) => (s += A(id, 170 + i * 16, Y[n], 170 + i * 16, 126, CA)));
    [4, 5].forEach((n, i) => (s += A(id, 300 + i * 16, Y[n], 300 + i * 16, 84, CB)));
    s += T(132, 186, "Lyman (UV)", 'font-size="11"') + T(214, 118, "Balmer (visible)", 'font-size="11"') + T(226, 78, "Paschen (IR)", 'font-size="11"');
    s += T(4, 16, "E / eV", 'font-size="11"') + T(110, 244, "not to scale · levels converge towards n = ∞ (ionisation)", 'font-size="11"');
    return S(400, 250, "Hydrogen energy levels with the Lyman, Balmer and Paschen series", s);
  })();

  const balmerLines = (() => {
    const sx = (l) => 20 + ((l - 350) / 330) * 340;
    let s = R(20, 30, 340, 40, "currentColor", "none");
    for (let n = 3; n <= 14; n++) { const l = (364.6 * n * n) / (n * n - 4); s += L(sx(l), 30, sx(l), 70, CA, `stroke-width="${n < 7 ? 2.5 : 1.2}"`); }
    [[656, "656"], [486, "486"], [434, "434"], [410, "410"]].forEach(([l, t]) => (s += Tm(sx(l), 86, t, 'font-size="11"')));
    s += L(sx(364.6), 24, sx(364.6), 76, CD, 'stroke-dasharray="3 2"') + Tm(sx(364.6) + 6, 100, "limit 365", 'font-size="11"');
    s += T(20, 18, "Balmer series, λ / nm", 'font-size="11"') + T(20, 122, "lines get closer together towards short λ and converge at the", 'font-size="11"') + T(20, 136, "series limit (transition from n = ∞ to n = 2)", 'font-size="11"');
    return S(380, 144, "Balmer series emission lines converging to the series limit", s);
  })();

  const nuclide = (() => {
    let s = T(210, 60, "A", 'font-size="14"') + T(210, 96, "Z", 'font-size="14"') + T(226, 92, "X", 'font-size="30"');
    s += L(206, 55, 180, 44, CM, 'stroke-width="1"') + Te(176, 44, "nucleon number A = Z + N", 'font-size="11"') + L(206, 92, 180, 110, CM, 'stroke-width="1"') + Te(176, 114, "proton number Z", 'font-size="11"');
    s += L(254, 80, 270, 66, CM, 'stroke-width="1"') + T(272, 62, "element symbol", 'font-size="11"') + T(20, 140, "e.g. ²³⁵₉₂U has 92 protons and 235 − 92 = 143 neutrons", 'font-size="11"');
    return S(380, 150, "Nuclide notation", s);
  })();

  const wavy = (x1, y1, x2, y2, c, wl = 12, amp = 4) => { const L0 = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L0, uy = (y2 - y1) / L0, n = Math.floor(L0 / 2); return P(poly(Array.from({ length: n + 1 }, (_, i) => { const d = (L0 * i) / n, w = amp * Math.sin((2 * Math.PI * d) / wl); return [x1 + ux * d - uy * w, y1 + uy * d + ux * w]; })), c); };
  const photoCell = (() => {
    const id = "ar-p21-1";
    let s = mk(id) + R(70, 20, 220, 80, "currentColor", "none", 'rx="30"') + T(220, 16, "vacuum", 'font-size="11"');
    s += P("M110 35 Q100 60 110 85", "currentColor", 'stroke-width="4"') + L(260, 40, 260, 80, "currentColor", 'stroke-width="3"') + T(116, 98, "metal C", 'font-size="11"') + Te(256, 98, "collector A", 'font-size="11"');
    s += wavy(20, 20, 98, 52, CB) + wavy(20, 50, 96, 62, CB) + T(4, 88, "UV light, f", 'font-size="11"');
    [45, 60, 75].forEach((y) => (s += A(id, 120, y, 245, y, CA, 'stroke-dasharray="4 3" stroke-width="1.2"')));
    s += T(150, 56, "photoelectrons", 'font-size="11"');
    s += P("M106 85 L106 170 L150 170 M190 170 L230 170 M250 170 L310 170 L310 60 L262 60") + C(170, 170, 14) + Tm(170, 174, "µA", 'font-size="11"');
    s += L(232, 158, 232, 182, "currentColor", 'stroke-width="2"') + L(240, 164, 240, 176, "currentColor", 'stroke-width="3"') + L(240, 170, 250, 170) + A(id, 222, 188, 256, 152, CM, 'stroke-width="1.2"');
    s += C(270, 210, 13) + Tm(270, 214, "V", 'font-size="11"') + P("M228 170 L228 210 L257 210 M283 210 L310 210 L310 170");
    s += T(10, 236, "variable, reversible p.d.: make A negative to find the stopping potential Vs", 'font-size="11"');
    return S(380, 244, "Photoelectric effect apparatus", s);
  })();

  const compton = (() => {
    const id = "ar-p21-2";
    let s = mk(id) + wavy(20, 110, 160, 110, CB, 14, 5) + A(id, 150, 110, 162, 110, CB) + T(40, 98, "photon λ", 'font-size="11"');
    s += `<circle cx="180" cy="110" r="6" fill="${CA}"/>` + T(160, 132, "electron at rest", 'font-size="11"');
    const a = -0.75, b = 0.85;
    s += wavy(186, 106, 186 + 140 * Math.cos(a), 110 + 140 * Math.sin(a), CB, 18, 5) + T(300, 26, "scattered photon λ′ &gt; λ", 'font-size="11"');
    s += A(id, 186, 114, 186 + 120 * Math.cos(b), 110 + 120 * Math.sin(b), CA, 'stroke-width="2"') + T(270, 200, "recoil electron", 'font-size="11"');
    s += D(186, 110, 360, 110) + P(`M236 110 A50 50 0 0 0 ${r1(186 + 50 * Math.cos(a))} ${r1(110 + 50 * Math.sin(a))}`, "currentColor", 'stroke-width="1"') + T(240, 96, "θ", 'font-size="12"');
    s += T(10, 226, "Δλ = λ′ − λ = (h/mₑc)(1 − cos θ): photon has momentum p = h/λ", 'font-size="11"');
    return S(390, 234, "Compton scattering of a photon by an electron", s);
  })();

  const eDiffraction = (() => {
    const id = "ar-p21-3";
    let s = mk(id) + R(20, 70, 50, 40, "currentColor", CF) + T(14, 128, "electron gun", 'font-size="11"') + T(14, 142, "(p.d. V)", 'font-size="11"');
    s += A(id, 70, 90, 156, 90, CA, 'stroke-width="2"') + L(160, 76, 160, 104, CB, 'stroke-width="4"') + T(130, 66, "graphite film", 'font-size="11"');
    s += L(162, 90, 260, 50, CA, 'stroke-dasharray="4 3"') + L(162, 90, 260, 130, CA, 'stroke-dasharray="4 3"') + L(162, 90, 260, 66, CA, 'stroke-dasharray="4 3"') + L(162, 90, 260, 114, CA, 'stroke-dasharray="4 3"') + L(260, 30, 260, 150, "currentColor", 'stroke-width="3"');
    [12, 24, 40].forEach((r) => (s += C(325, 90, r, CA)));
    s += `<circle cx="325" cy="90" r="3" fill="${CA}"/>` + Tm(325, 150, "screen: rings", 'font-size="11"');
    s += T(10, 180, "rings = diffraction of electron waves by atom planes; λ = h/p", 'font-size="11"') + T(10, 194, "higher V → larger p → smaller λ → smaller rings", 'font-size="11"');
    return S(380, 202, "Electron diffraction by graphite", s);
  })();

  // ---------- E.3 figures ----------
  const abgB = (() => {
    const id = "ar-p22-1";
    let s = mk(id);
    for (let x = 70; x <= 350; x += 56) for (let y = 20; y <= 200; y += 45) s += xs(x, y, 3);
    s += R(10, 100, 30, 20, "currentColor", CF) + T(4, 140, "source", 'font-size="11"');
    s += P("M40 110 A1000 1000 0 0 0 370 55", CD, `stroke-width="2" marker-end="url(#${id})"`) + T(250, 40, "α (+2e, massive)", 'font-size="11"');
    s += A(id, 40, 110, 370, 110, CC, 'stroke-width="2"') + T(300, 104, "γ: undeflected", 'font-size="11"');
    s += P("M40 110 A150 150 0 0 1 170 185", CB, `stroke-width="2" marker-end="url(#${id})"`) + T(176, 196, "β⁻ (−e, light): curves most", 'font-size="11"');
    s += T(60, 12, "B into page (×)", 'font-size="11"');
    return S(400, 210, "Deflection of alpha, beta and gamma radiation in a magnetic field", s);
  })();

  const penetration = (() => {
    const id = "ar-p22-2";
    let s = mk(id) + R(10, 40, 30, 120, "currentColor", CF) + T(10, 176, "source", 'font-size="11"');
    s += R(110, 30, 4, 140, "currentColor", CF) + R(190, 30, 12, 140, "currentColor", CF) + R(280, 30, 40, 140, "currentColor", CF);
    s += A(id, 40, 60, 106, 60, CD, 'stroke-width="2"') + T(48, 52, "α", 'font-size="12"');
    s += A(id, 40, 100, 186, 100, CB, 'stroke-width="2"') + T(48, 92, "β", 'font-size="12"');
    s += A(id, 40, 140, 276, 140, CA, 'stroke-width="2"') + A(id, 322, 140, 370, 140, CA, 'stroke-width="1" stroke-dasharray="3 2"') + T(48, 132, "γ", 'font-size="12"');
    s += Tm(112, 188, "paper", 'font-size="11"') + Tm(196, 188, "few mm Al", 'font-size="11"') + Tm(300, 188, "cm of lead", 'font-size="11"') + T(326, 132, "reduced", 'font-size="11"');
    s += T(10, 210, "α: strongly ionising, short range · γ: weakly ionising, never fully stopped", 'font-size="11"');
    return S(390, 218, "Penetrating power of alpha, beta and gamma radiation", s);
  })();

  const nzChart = (() => {
    const id = "ar-p22-3", X = (z) => 50 + z * 3.3, Y = (n) => 210 - n * 1.3;
    let s = mk(id) + A(id, 50, 210, 360, 210) + A(id, 50, 210, 50, 14) + T(340, 226, "Z", 'font-size="12"') + T(24, 20, "N", 'font-size="12"');
    s += D(X(0), Y(0), X(90), Y(90)) + T(X(90) + 4, Y(90) + 4, "N = Z", 'font-size="11"');
    const band = Array.from({ length: 21 }, (_, i) => { const z = (83 * i) / 20; return z + 0.0066 * z * z; });
    const up = band.map((n, i) => [X((83 * i) / 20), Y(n + 3 + (8 * i) / 20)]), lo = band.map((n, i) => [X((83 * i) / 20), Y(Math.max(0, n - 3 - (6 * i) / 20))]).reverse();
    s += `<path d="${poly(up.concat(lo))}Z" fill="${CF}" stroke="${CA}" stroke-width="1.4"/>`;
    s += T(X(2), Y(130), "above the band (neutron-rich):", 'font-size="11"') + T(X(2), Y(119), "β⁻ decay", 'font-size="11"') + T(X(42), Y(30), "below the band (proton-rich):", 'font-size="11"') + T(X(42), Y(19), "β⁺ decay", 'font-size="11"');
    s += Te(X(80), Y(140), "Z &gt; 82: α decay", 'font-size="11"') + Te(X(47), Y(75), "band of stability", 'font-size="11"');
    const kx = X(12), ky = Y(92);
    s += A(id, kx, ky, kx - 24, ky + 24, CD) + T(kx - 40, ky + 34, "α", 'font-size="11"') + A(id, kx, ky, kx + 14, ky + 14, CB) + T(kx + 14, ky + 28, "β⁻", 'font-size="11"') + A(id, kx, ky, kx - 14, ky - 14, CC) + T(kx - 30, ky - 14, "β⁺", 'font-size="11"');
    s += Tm(X(0), 224, "0", 'font-size="11"') + Tm(X(20), 224, "20", 'font-size="11"') + Tm(X(50), 224, "50", 'font-size="11"') + Tm(X(80), 224, "80", 'font-size="11"') + Te(46, Y(50) + 4, "50", 'font-size="11"') + Te(46, Y(100) + 4, "100", 'font-size="11"');
    return S(380, 232, "Neutron number against proton number: the band of stability", s);
  })();

  const decayChain = (() => {
    const id = "ar-p22-4", X = (z) => 60 + (z - 89) * 60, Y = (n) => 210 - (n - 139) * 22;
    let s = mk(id);
    for (let z = 89; z <= 93; z++) s += D(X(z), Y(139), X(z), Y(147), CM) + Tm(X(z), 226, z, 'font-size="11"');
    for (let n = 139; n <= 147; n++) s += D(X(89), Y(n), X(93), Y(n), CM) + Te(52, Y(n) + 4, n, 'font-size="11"');
    const nuc = [[92, 146, "²³⁸U"], [90, 144, "²³⁴Th"], [91, 143, "²³⁴Pa"], [92, 142, "²³⁴U"], [90, 140, "²³⁰Th"]];
    const off = [[8, -6], [-40, -6], [8, -6], [8, 4], [8, 16]];
    nuc.forEach(([z, n, t], i) => { s += `<circle cx="${X(z)}" cy="${Y(n)}" r="5" fill="${CA}"/>` + T(X(z) + off[i][0], Y(n) + off[i][1], t, 'font-size="11"'); if (i) { const [z0, n0] = nuc[i - 1], dx = X(z) - X(z0), dy = Y(n) - Y(n0), m = Math.hypot(dx, dy); s += A(id, X(z0) + (6 * dx) / m, Y(n0) + (6 * dy) / m, X(z) - (8 * dx) / m, Y(n) - (8 * dy) / m, i === 1 || i === 4 ? CD : CB); } });
    s += T(330, 240, "Z", 'font-size="12"') + T(8, 16, "N", 'font-size="12"') + T(308, 110, "α: Z − 2,", 'font-size="11"') + T(318, 124, "N − 2", 'font-size="11"') + T(308, 150, "β⁻: Z + 1,", 'font-size="11"') + T(318, 164, "N − 1", 'font-size="11"');
    return S(380, 246, "Part of the uranium-238 decay chain on an N-Z grid", s);
  })();

  const gammaLevels = (() => {
    const id = "ar-p22-5";
    let s = mk(id) + L(30, 30, 130, 30, "currentColor", 'stroke-width="2"') + T(30, 22, "parent nucleus", 'font-size="11"');
    s += L(200, 110, 340, 110) + L(200, 150, 340, 150) + L(200, 200, 340, 200, "currentColor", 'stroke-width="2"');
    s += Te(380, 114, "excited 2", 'font-size="11"') + Te(380, 154, "excited 1", 'font-size="11"') + Te(380, 204, "ground", 'font-size="11"') + T(200, 220, "daughter nucleus", 'font-size="11"');
    s += A(id, 110, 32, 220, 108, CD) + A(id, 100, 32, 250, 198, CD) + T(130, 64, "α₁", 'font-size="11"') + T(130, 116, "α₂", 'font-size="11"');
    s += A(id, 280, 110, 280, 198, CB) + A(id, 310, 110, 310, 148, CB) + A(id, 330, 150, 330, 198, CB) + T(286, 176, "γ", 'font-size="11"');
    s += T(10, 240, "discrete α and γ energies → nuclei have discrete energy levels", 'font-size="11"');
    return S(390, 248, "Nuclear energy levels: alpha decay followed by gamma emission", s);
  })();

  // ---------- E.4 figures ----------
  const nuc = (x, y, r, lab, c = CA) => C(x, y, r, c, CF) + Tm(x, y + 4, lab, 'font-size="11"');
  const neut = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="${CB}"/>`;
  const fissionEvent = (() => {
    const id = "ar-p23-1";
    let s = mk(id) + neut(20, 90) + A(id, 27, 90, 52, 90, CB) + T(10, 76, "slow n", 'font-size="11"') + nuc(80, 90, 24, "²³⁵U") + A(id, 106, 90, 130, 90) + nuc(162, 90, 26, "²³⁶U*", CD);
    s += A(id, 188, 80, 230, 50) + A(id, 188, 100, 230, 130) + nuc(256, 42, 22, "¹⁴¹Ba") + nuc(256, 140, 18, "⁹²Kr");
    [[300, 80], [310, 95], [300, 110]].forEach(([x, y]) => (s += A(id, 192, 90, x - 8, y, CB, 'stroke-width="1"') + neut(x, y)));
    s += T(318, 100, "3 n", 'font-size="11"') + T(10, 180, "¹n + ²³⁵U → ¹⁴¹Ba + ⁹²Kr + 3 ¹n + ≈ 200 MeV (mostly KE of fragments)", 'font-size="11"');
    return S(380, 188, "Neutron-induced fission of uranium-235", s);
  })();

  const chain = (() => {
    const id = "ar-p23-2";
    let s = mk(id) + neut(14, 110) + A(id, 20, 110, 44, 110, CB) + nuc(58, 110, 12, "U");
    const g1 = [50, 110, 170], g2 = [];
    g1.forEach((y) => { s += A(id, 70, 110, 128, y, CB, 'stroke-width="1.2"') + nuc(142, y, 12, "U"); [-26, 0, 26].forEach((d) => { g2.push(y + d * 0.8); s += A(id, 154, y, 214, y + d * 0.8, CB, 'stroke-width="1"'); }); });
    g2.forEach((y) => (s += neut(220, y)));
    s += T(240, 60, "each fission releases", 'font-size="11"') + T(240, 74, "2–3 neutrons; if ≥ 1", 'font-size="11"') + T(240, 88, "causes another fission", 'font-size="11"') + T(240, 102, "the reaction sustains", 'font-size="11"');
    s += T(240, 130, "critical mass: enough", 'font-size="11"') + T(240, 144, "fuel that neutrons are", 'font-size="11"') + T(240, 158, "not lost from surface", 'font-size="11"');
    s += T(10, 206, "1 → 3 → 9 neutrons: grows without control", 'font-size="11"') + T(10, 220, "(bomb) unless control rods absorb the excess", 'font-size="11"');
    return S(390, 222, "A fission chain reaction", s);
  })();

  const reactor = (() => {
    const id = "ar-p23-3";
    let s = mk(id) + R(10, 20, 170, 190, "currentColor", "none", 'stroke-width="6" stroke-dasharray="2 2"') + R(30, 40, 130, 150, "currentColor", CF);
    [55, 85, 115, 145].forEach((x) => (s += L(x, 70, x, 180, "currentColor", 'stroke-width="5"')));
    [70, 100, 130].forEach((x) => (s += L(x, 28, x, 120, CD, 'stroke-width="4"')));
    s += T(40, 196, "moderator", 'font-size="11"') + T(196, 30, "control rods (absorb n)", 'font-size="11"') + T(196, 44, "fuel rods (enriched U)", 'font-size="11"') + T(196, 58, "moderator slows n", 'font-size="11"');
    s += L(194, 26, 132, 36, CM, 'stroke-width="1"') + L(194, 40, 148, 90, CM, 'stroke-width="1"');
    s += P("M160 90 L220 90 L220 110", CD, `marker-end="url(#${id})"`) + P("M220 170 L220 180 L160 180", CB, `marker-end="url(#${id})"`) + R(205, 110, 60, 60, "currentColor", "none") + Tm(235, 136, "heat", 'font-size="11"') + Tm(235, 150, "exchanger", 'font-size="11"');
    s += A(id, 265, 120, 300, 120, CD) + R(300, 100, 40, 40, "currentColor", "none") + Tm(320, 124, "turbine", 'font-size="10"') + A(id, 340, 120, 352, 120) + C(366, 120, 13) + Tm(366, 124, "G", 'font-size="11"');
    s += T(270, 112, "steam", 'font-size="10"') + T(200, 198, "coolant loop (pumped)", 'font-size="11"') + T(14, 228, "shielding (thick concrete) absorbs radiation", 'font-size="11"');
    return S(390, 236, "Schematic of a thermal fission reactor", s);
  })();

  const sankey = (() => {
    let s = `<path d="M10 40 L250 40 L250 30 L290 56 L250 82 L250 72 L190 72 Q130 72 130 132 L130 170 L140 170 L114 200 L88 170 L98 170 L98 132 Q98 72 90 72 L10 72 Z" fill="${CF}" stroke="currentColor" stroke-width="1.4"/>`;
    s += `<path d="M10 40 L250 40 L250 30 L290 46 L250 62 L250 51 L10 51 Z" fill="${CA}" stroke="currentColor" stroke-width="1"/>`;
    s += T(10, 30, "nuclear (thermal) energy in: 100 %", 'font-size="11"') + T(296, 50, "electrical", 'font-size="11"') + T(296, 64, "≈ 33 %", 'font-size="11"');
    s += T(150, 150, "thermal energy to", 'font-size="11"') + T(150, 164, "surroundings ≈ 67 %", 'font-size="11"') + T(150, 178, "(cooling towers, friction)", 'font-size="11"');
    s += T(10, 222, "arrow width ∝ power; efficiency = useful out / total in", 'font-size="11"');
    return S(380, 230, "Sankey diagram for a nuclear power station", s);
  })();

  // ---------- E.5 figures ----------
  const equilibrium = (() => {
    const id = "ar-p24-1";
    let s = mk(id) + C(120, 110, 70, CA, CF);
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4, c = Math.cos(a), si = Math.sin(a), a2 = a + 0.39, c2 = Math.cos(a2), s2 = Math.sin(a2); s += A(id, 120 + 95 * c, 110 + 95 * si, 120 + 74 * c, 110 + 74 * si, CD, 'stroke-width="2"') + A(id, 120 + 30 * c2, 110 + 30 * s2, 120 + 62 * c2, 110 + 62 * s2, CB, 'stroke-width="2"'); }
    s += T(230, 66, "inward arrows (outside):", 'font-size="11"') + T(230, 80, "gravity", 'font-size="11"') + T(230, 106, "outward arrows (inside):", 'font-size="11"') + T(230, 120, "radiation + gas pressure", 'font-size="11"') + T(230, 150, "balanced → stable size", 'font-size="11"') + T(230, 164, "(main sequence)", 'font-size="11"');
    return S(390, 220, "Stellar equilibrium: gravity balanced by radiation and gas pressure", s);
  })();

  const hrEvol = (() => {
    const id = "ar-p24-2", X = (T0) => 40 + ((4.6 - Math.log10(T0)) / 1.2) * 300, Y = (L0) => 20 + (6 - Math.log10(L0)) * 18;
    let s = mk(id) + L(40, 200, 345, 200) + L(40, 200, 40, 14);
    [[40000, "40 000"], [10000, "10 000"], [5000, "5000"], [2500, "2500"]].forEach(([t, l]) => (s += Tm(X(t), 214, l, 'font-size="11"')));
    [[1e6, "10⁶"], [1e4, "10⁴"], [100, "10²"], [1, "1"], [0.01, "10⁻²"], [1e-4, "10⁻⁴"]].forEach(([l, t]) => (s += Te(36, Y(l) + 4, t, 'font-size="11"')));
    s += T(150, 230, "surface temperature / K (decreasing →)", 'font-size="11"') + T(44, 12, "L / L☉", 'font-size="11"');
    s += P(`M${r1(X(32000))} ${r1(Y(1e5))} Q${r1(X(7000))} ${r1(Y(3))} ${r1(X(3000))} ${r1(Y(1e-3))}`, CM, 'stroke-width="14" stroke-linecap="round" opacity="0.35"') + T(X(12000), Y(0.05), "main sequence", 'font-size="11"');
    s += `<ellipse cx="${r1(X(4200))}" cy="${r1(Y(150))}" rx="22" ry="12" fill="none" stroke="${CM}" stroke-width="1.4"/>` + T(X(4500), Y(25), "red giants", 'font-size="11"');
    s += `<ellipse cx="${r1(X(6000))}" cy="${r1(Y(2e5))}" rx="90" ry="8" fill="none" stroke="${CM}" stroke-width="1.4"/>` + Tm(X(6000), Y(2e5) - 12, "supergiants", 'font-size="11"');
    s += `<ellipse cx="${r1(X(14000))}" cy="${r1(Y(0.003))}" rx="22" ry="9" fill="none" stroke="${CM}" stroke-width="1.4"/>` + T(X(30000), Y(1e-4) - 2, "white dwarfs", 'font-size="11"');
    const sun = [X(5800), Y(1)];
    s += `<circle cx="${r1(sun[0])}" cy="${r1(sun[1])}" r="4" fill="${CA}"/>` + T(sun[0] + 6, sun[1] + 14, "Sun", 'font-size="11"');
    s += P(`M${r1(sun[0])} ${r1(sun[1])} Q${r1(X(4600))} ${r1(Y(10))} ${r1(X(4200))} ${r1(Y(150))}`, CA, `stroke-width="2" marker-end="url(#${id})"`);
    s += P(`M${r1(X(4200))} ${r1(Y(160))} C${r1(X(9000))} ${r1(Y(5000))} ${r1(X(38000))} ${r1(Y(5000))} ${r1(X(38000))} ${r1(Y(10))} C${r1(X(38000))} ${r1(Y(0.3))} ${r1(X(22000))} ${r1(Y(0.005))} ${r1(X(15000))} ${r1(Y(0.003))}`, CA, `stroke-width="1.6" stroke-dasharray="5 3" marker-end="url(#${id})"`);
    s += T(X(20000), Y(1500), "planetary nebula", 'font-size="11"');
    s += P(`M${r1(X(25000))} ${r1(Y(3e4))} L${r1(X(3600))} ${r1(Y(1.2e5))}`, CD, `stroke-width="2" marker-end="url(#${id})"`) + T(X(9000), Y(3e4) + 18, "massive star", 'font-size="11"');
    return S(360, 238, "HR diagram with evolutionary paths of a Sun-like star and a massive star", s);
  })();

  const parallax = (() => {
    const id = "ar-p24-3";
    let s = mk(id) + `<ellipse cx="200" cy="190" rx="80" ry="14" fill="none" stroke="${CM}" stroke-width="1.2"/>` + `<circle cx="200" cy="190" r="6" fill="${CA}"/>` + T(206, 210, "Sun", 'font-size="11"');
    s += `<circle cx="120" cy="190" r="4" fill="${CB}"/><circle cx="280" cy="190" r="4" fill="${CB}"/>` + Te(114, 194, "Earth (Jan)", 'font-size="11"') + T(286, 194, "Earth (Jul)", 'font-size="11"');
    s += `<circle cx="200" cy="70" r="4" fill="currentColor"/>` + T(206, 74, "nearby star", 'font-size="11"');
    s += L(120, 190, 200, 70, CB, 'stroke-width="1.2"') + L(280, 190, 200, 70, CB, 'stroke-width="1.2"') + D(200, 70, 200, 190);
    s += L(200, 70, 233.6, 19.6, CM, 'stroke-dasharray="2 3" stroke-width="1"') + L(200, 70, 166.4, 19.6, CM, 'stroke-dasharray="2 3" stroke-width="1"');
    for (let x = 40; x <= 360; x += 40) s += T(x, 18, "✶", `font-size="11" fill="${CM}"`);
    s += T(250, 36, "distant 'fixed' stars", 'font-size="11"') + P("M200 100 A30 30 0 0 0 186 96.5", "currentColor", 'stroke-width="1"') + T(184, 116, "p", 'font-size="12"') + T(204, 140, "d", 'font-size="12"') + T(150, 182, "1 AU", 'font-size="11"');
    s += T(10, 232, "p = half the angular shift over 6 months; d / pc = 1 / (p / arcsec)", 'font-size="11"') + T(10, 246, "only for nearby stars (p too small to measure for distant ones)", 'font-size="11"');
    return S(400, 254, "Stellar parallax", s);
  })();

  const evolFlow = (() => {
    const id = "ar-p24-4", box = (x, y, w, t) => R(x, y, w, 26, "currentColor", CF, 'rx="5"') + Tm(x + w / 2, y + 17, t, 'font-size="11"');
    let s = mk(id) + box(6, 105, 62, "nebula") + A(id, 68, 118, 80, 118) + box(80, 105, 70, "protostar") + A(id, 150, 118, 162, 118) + box(162, 105, 96, "main sequence");
    s += A(id, 258, 112, 286, 24) + A(id, 258, 124, 286, 154) + T(232, 60, "low mass", 'font-size="10"') + T(228, 182, "high mass", 'font-size="10"');
    s += box(286, 10, 128, "red giant") + A(id, 350, 36, 350, 46) + box(286, 46, 128, "planetary nebula") + A(id, 350, 72, 350, 82) + box(286, 82, 128, "white dwarf");
    s += box(286, 140, 128, "red supergiant") + A(id, 350, 166, 350, 176) + box(286, 176, 128, "supernova") + A(id, 350, 202, 350, 212) + box(286, 212, 128, "neutron star / BH");
    s += T(6, 170, "white dwarf: core &lt; 1.4 M☉", 'font-size="10"') + T(6, 184, "neutron star: ≈ 1.4–3 M☉", 'font-size="10"') + T(6, 198, "black hole: core &gt; ≈ 3 M☉", 'font-size="10"');
    return S(420, 244, "Evolution of low- and high-mass stars", s);
  })();

  const onion = (() => {
    const lay = [["H", 100], ["He", 84], ["C", 68], ["O", 52], ["Si", 36], ["Fe", 20]];
    let s = "";
    lay.forEach(([e, r], i) => (s += C(120, 115, r, i === 5 ? CD : CA, i % 2 ? CF : "none", 'stroke-width="1.3"')));
    lay.forEach(([e, r], i) => (s += Tm(120, 115 - r + (i === 5 ? 24 : 12), e, 'font-size="11"')));
    s += T(236, 60, "massive star before", 'font-size="11"') + T(236, 74, "supernova: shell", 'font-size="11"') + T(236, 88, "fusion in layers", 'font-size="11"') + T(236, 120, "iron core: fusion", 'font-size="11"') + T(236, 134, "beyond Fe absorbs", 'font-size="11"') + T(236, 148, "energy (B/A peak)", 'font-size="11"');
    return S(380, 225, "Layered (onion-shell) structure of an evolved massive star", s);
  })();

  // ---------- plot helpers ----------
  const peak = (u, N) => { const d = Math.sin(Math.PI * u); return Math.abs(d) < 1e-6 ? 1 : Math.pow(Math.sin(N * Math.PI * u) / (N * d), 2); };
  const planck = (lam, T0) => 1 / (Math.pow(lam, 5) * (Math.exp(14388 / (lam * T0)) - 1)); // lam in µm
  const bea = (A0) => { const Z = A0 / (1.98 + 0.0155 * Math.pow(A0, 2 / 3)); return (15.8 * A0 - 18.3 * Math.pow(A0, 2 / 3) - (0.714 * Z * (Z - 1)) / Math.pow(A0, 1 / 3) - (23.2 * Math.pow(A0 - 2 * Z, 2)) / A0) / A0; };
  const fig = (title, svg, caption) => ({ title, svg, caption });

  IB.addExamFrames("phys", { topics: {
    // ======================= C.3 =======================
    "phys-13": {
      diagrams: [
        { title: "Double-slit intensity (ignoring single-slit envelope): equal, equally spaced fringes s = λD/d", x: [-3.2, 3.2], y: [0, 1.25], xLabel: "position / s", yLabel: "I", grid: false,
          curves: [{ f: (x) => Math.pow(Math.cos(Math.PI * x), 2), color: "a" }], texts: [{ at: [0.05, 1.12], text: "central max (path diff 0)" }] },
        { title: "Grating (many slits, a) vs double slit (b, dashed): grating maxima at the same angles but much sharper and brighter", x: [-2.3, 2.3], y: [0, 1.15], xLabel: "sin θ / (λ/d)", yLabel: "I (scaled)", grid: false,
          curves: [{ f: (x) => peak(x, 10), color: "a", label: "a" , labelX: 0.08}, { f: (x) => Math.pow(Math.cos(Math.PI * x), 2) * 0.6, color: "b", dash: true, label: "b", labelX: 0.5 }] },
        { title: "Refraction: sin θ₂ against sin θ₁ entering glass (n = 1.5) - gradient n₁/n₂", x: [0, 1.05], y: [0, 0.8], xLabel: "sin θ₁ (air)", yLabel: "sin θ₂", grid: false,
          curves: [{ f: (x) => x / 1.5, color: "a", label: "gradient 1/n", labelX: 0.6 }] },
      ],
      figures: [
        fig("Reflection and refraction at a boundary", refl, "angles measured from the normal; reflected angle = incident angle"),
        fig("Total internal reflection and the critical angle", tir, "sin θc = n₂/n₁ (n₁ > n₂)"),
        fig("Optical fibre", fibre, "repeated TIR at the core-cladding boundary"),
        fig("Diffraction through a gap", gapDiff, "spreading greatest when gap ≈ λ"),
        fig("Young's double slit", dslit, "fringes equally spaced; s = λD/d"),
        fig("Diffraction grating orders", grating, "d sin θ = nλ (here sin θ₁ = 0.25, sin θ₂ = 0.5)"),
      ],
      frames: [
        { title: "Draw wavefronts refracting at a boundary", paper: "P2", where: "Paper 2 · 3 marks · complete a wavefront diagram",
          q: "Plane waves travel from deep water into shallow water, where they travel more slowly, meeting the boundary at an angle. Draw the wavefronts in the shallow water and state what happens to the wavelength, the frequency and the direction of travel.",
          marks: ["wavefronts in shallow water are __closer together__: __wavelength decreases__", "wavefronts continuous at the boundary and the direction __bends towards the normal__", "__frequency unchanged__ (set by the source), so v = fλ falls"],
          svg: wavefrontRefraction, svgCaption: "λ₂ < λ₁, f the same, rays (⟂ wavefronts) bend towards the normal",
          model: "In the shallow water the wavefronts are closer together, so the wavelength decreases. The wavefronts stay joined at the boundary, so the direction of travel bends towards the normal. The frequency is unchanged because it is set by the source, so the speed falls with the wavelength.",
          accept: "rays drawn ⟂ to the wavefronts; λ₂/λ₁ = v₂/v₁",
          reject: "wavefronts drawn with the same spacing; frequency changing; wavefronts broken or not meeting at the boundary",
          tip: "入慢啲嘅介質：波前密啲（λ 細）、頻率唔變、方向靠近法線。波前喺界面要接得埋！" },
        { title: "Sketch the intensity pattern for a diffraction grating", paper: "P2", where: "Paper 2 · 2 marks · compared with double slit",
          q: "Monochromatic light passes first through a double slit and then through a diffraction grating with the same slit separation. Sketch the intensity against angle for the grating and state two differences from the double-slit pattern.",
          marks: ["maxima at the __same angles__ (d sin θ = nλ) but __much narrower/sharper__", "maxima __much brighter__ (more slits let more light through), with near-dark regions between"],
          diagram: { title: "Grating: sharp, bright maxima at the double-slit positions", x: [-2.3, 2.3], y: [0, 1.15], xLabel: "angle", yLabel: "I", grid: false, curves: [{ f: (x) => peak(x, 10), color: "a" }] },
          model: "The grating gives maxima at the same angles as the double slit, because both obey d sin θ = nλ, but the grating maxima are much narrower and sharper. They are also much brighter because many more slits contribute, and the regions between them are almost dark.",
          accept: "\"principal maxima\"; \"more widely separated\" is NOT required",
          reject: "maxima at different angles for the same d; grating maxima drawn wider",
          tip: "同一個 d 位置一樣，但光柵嘅亮紋又窄又光。畫圖時亮紋之間幾乎係零。" },
      ],
      concepts: [
        { h: "Wavefronts, rays and Huygens' principle", b: "<p>A <b>wavefront</b> joins points in phase (e.g. crests); a <b>ray</b> shows the direction of energy transfer and is always perpendicular to the wavefronts. Every point on a wavefront acts as a source of secondary wavelets; the new wavefront is their envelope - this explains diffraction at a gap and the bending of wavefronts on refraction. Wavefront spacing = λ; it changes on refraction but not on reflection or diffraction.</p>", yue: "射線永遠垂直波前；折射時 λ 變、f 唔變；衍射同反射 λ 都唔變。" },
      ],
    },

    // ======================= C.4 =======================
    "phys-14": {
      diagrams: [
        { title: "Standing wave (2nd harmonic) at successive instants: all points between adjacent nodes in phase", x: [0, 1], y: [-1.2, 1.2], xLabel: "x / L", yLabel: "y", grid: false,
          curves: [1, 0.5, 0, -0.5, -1].map((c, i) => ({ f: (x) => c * Math.sin(2 * Math.PI * x), color: i === 0 ? "a" : i === 4 ? "b" : "muted", dash: i > 0 && i < 4 })),
          texts: [{ at: [0.02, -0.15], text: "N" }, { at: [0.48, -0.15], text: "N" }, { at: [0.95, -0.15], text: "N" }, { at: [0.23, 1.1], text: "A" }, { at: [0.73, 1.1], text: "A" }] },
        { title: "Amplitude of oscillation along the string for the 2nd harmonic: |A| = A₀|sin(2πx/L)|", x: [0, 1], y: [0, 1.2], xLabel: "x / L", yLabel: "amplitude", grid: false,
          curves: [{ f: (x) => Math.abs(Math.sin(2 * Math.PI * x)), color: "a" }] },
        { title: "Harmonic frequency against harmonic number: string/open pipe f = n·v/2L (a); closed pipe only odd n, f = n·v/4L (b)", x: [0, 6], y: [0, 6.5], xLabel: "n", yLabel: "f / f₁(string)", grid: false,
          curves: [{ f: (x) => x, color: "a", dash: true, domain: [0, 6] }], points: [1, 2, 3, 4, 5, 6].map((n) => ({ at: [n, n], color: "a" })).concat([1, 3, 5].map((n) => ({ at: [n, n / 2], color: "b" }))),
          texts: [{ at: [4.2, 1.6], text: "closed pipe: odd n" }] },
      ],
      figures: [
        fig("Harmonics on a string fixed at both ends", stringHarm, "N = node, A = antinode; L = n λ/2"),
        fig("Pipe open at both ends", openPipe, "displacement antinodes at open ends; L = n λ/2"),
        fig("Pipe closed at one end", closedPipe, "node at closed end; L = (2n − 1) λ/4"),
        fig("Resonance tube to measure the speed of sound", resTube, "v = f λ = 2f (L₂ − L₁)"),
      ],
      frames: [
        { title: "Draw the second harmonic in a pipe open at both ends", star: true, paper: "P2", where: "Paper 2 · 3 marks · label nodes and antinodes",
          q: "A pipe of length 0.80 m is open at both ends. Draw the displacement pattern of the second harmonic, label the nodes (N) and antinodes (A), and calculate its frequency. Speed of sound = 340 m s⁻¹.",
          marks: ["__antinodes at both open ends__ and one in the middle, with __two nodes__ (at L/4 and 3L/4)", "λ = L = 0.80 m", "f = v/λ = 340/0.80 = 425 Hz"],
          numeric: { value: 425, tol: 2 },
          svg: openPipe, svgCaption: "middle row: 2nd harmonic, A N A N A",
          model: "The second harmonic has displacement antinodes at both open ends and one in the middle, with two nodes at L/4 and 3L/4. So one full wavelength fits in the pipe: λ = L = 0.80 m. f = v/λ = 340/0.80 = 425 Hz.",
          accept: "430 Hz; pressure diagram if clearly labelled as pressure (nodes and antinodes swapped)",
          reject: "nodes at the open ends; only one node drawn; λ = 2L for the second harmonic",
          tip: "開口端一定係位移波腹 A；兩端開口第 n 諧波 λ = 2L/n。記住畫上下兩條包絡線。" },
        { title: "Identify the harmonic and find λ from a closed-pipe diagram", paper: "P1A", where: "Paper 1A / Paper 2 · 2 marks",
          q: "A pipe closed at one end has length 0.60 m. The standing wave has a node at the closed end, an antinode at the open end and one further node and antinode in between. Identify the harmonic and calculate the wavelength.",
          marks: ["pattern N A N A = 3/4 of a wavelength: __third harmonic__", "λ = 4L/3 = 4 × 0.60/3 = 0.80 m"],
          numeric: { value: 0.8, tol: 0.01 },
          svg: closedPipe, svgCaption: "middle row: 3rd harmonic, L = 3λ/4",
          model: "From the closed end the pattern is node, antinode, node, antinode, which is three quarters of a wavelength, so it is the third harmonic. L = 3λ/4 so λ = 4L/3 = 4 × 0.60/3 = 0.80 m.",
          accept: "\"second mode / first overtone\" if the third harmonic is also stated",
          reject: "\"second harmonic\" (closed pipes have only odd harmonics)",
          tip: "閉管只有奇數諧波：1、3、5…。數 N 到 A 有幾多個 λ/4。" },
      ],
      concepts: [
        { h: "Boundary conditions and end correction", b: "<p>Fixed end of a string and closed end of a pipe = displacement <b>node</b>; free/open end = displacement <b>antinode</b>. String or open pipe: L = nλ/2, all harmonics f = nv/2L. Closed pipe: L = (2n − 1)λ/4, odd harmonics only, f = (2n − 1)v/4L. The antinode at an open end lies slightly beyond the end (end correction e ≈ 0.6r), so in a resonance-tube experiment use the difference of successive resonance lengths: L₂ − L₁ = λ/2. A pressure node sits where the displacement antinode is, and vice versa.</p>", yue: "位移節點 = 壓力波腹。共鳴管用 L₂ − L₁ = λ/2 就唔使理端點修正。" },
      ],
    },

    // ======================= C.5 =======================
    "phys-15": {
      diagrams: [
        { title: "Observed frequency against source speed (sound): approaching f′ = fv/(v − u) (a) rises ever faster; receding f′ = fv/(v + u) (b)", x: [0, 0.8], y: [0, 5.2], xLabel: "u / v", yLabel: "f′/f", grid: false,
          curves: [{ f: (x) => 1 / (1 - x), color: "a", label: "a", labelX: 0.7 }, { f: (x) => 1 / (1 + x), color: "b", label: "b", labelX: 0.7 }], hlines: [{ y: 1, label: "f′ = f" }] },
        { title: "Moving observer: f′ = f(v ± u)/v is linear in u (approaching a, receding b)", x: [0, 0.8], y: [0, 2], xLabel: "u / v", yLabel: "f′/f", grid: false,
          curves: [{ f: (x) => 1 + x, color: "a", label: "a", labelX: 0.7 }, { f: (x) => 1 - x, color: "b", label: "b", labelX: 0.7 }] },
        { title: "Light, v ≪ c: Δf/f = Δλ/λ = v/c - straight line through the origin, gradient 1/c", x: [0, 10], y: [0, 10], xLabel: "v", yLabel: "Δλ/λ", grid: false,
          curves: [{ f: (x) => 0.9 * x, color: "a" }] },
      ],
      figures: [
        fig("Wavefronts from a moving source", doppler, "λ shorter ahead, longer behind; speed of the waves unchanged"),
        fig("Redshift of absorption lines", redshift, "the whole pattern shifts; line spacing ratios kept"),
      ],
      frames: [
        { title: "Draw wavefronts from a moving source and explain the frequency change", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "A source of sound moves to the right at constant speed less than the speed of sound. Draw the wavefronts it has emitted and explain why a stationary observer ahead of the source hears a higher frequency.",
          marks: ["circles whose __centres shift__ in the direction of motion (each centre = where the source was when emitted)", "wavefronts __closer together ahead__ of the source, so the __wavelength is shorter__ ahead", "wave speed unchanged, so f = v/λ is __higher__ ahead (lower behind)"],
          svg: doppler, svgCaption: "right panel: moving source",
          model: "The wavefronts are circles whose centres are displaced in the direction of motion, because each was emitted from where the source was at that moment. Ahead of the source the wavefronts are closer together, so the wavelength is shorter. The speed of sound in the air is unchanged, so the frequency heard ahead, f = v/λ, is higher, and it is lower behind.",
          accept: "\"wavefronts bunched/compressed ahead\"",
          reject: "concentric circles with changed spacing; wave speed increasing; \"the source emits a higher frequency\"",
          tip: "圓圈唔係同心！每個圓心係發出嗰刻聲源嘅位置。聲速唔變，λ 細咗所以 f 高咗。" },
      ],
    },

    // ======================= D.1 =======================
    "phys-16": {
      diagrams: [
        { title: "g against r inside and outside a uniform planet: g ∝ r inside, g ∝ 1/r² outside, maximum at the surface R", x: [0, 4], y: [0, 1.2], xLabel: "r / R", yLabel: "g / g₀", grid: false,
          curves: [{ f: (x) => x, domain: [0, 1], color: "a" }, { f: (x) => 1 / (x * x), domain: [1, 4], color: "a" }], vlines: [{ x: 1, label: "R" }] },
        { title: "Satellite energies against orbital radius: Ek = GMm/2r (a), Ep = −GMm/r (b), E_total = −GMm/2r (c)", x: [0, 6], y: [-2.2, 1.2], xLabel: "r", yLabel: "E", grid: false,
          curves: [{ f: (x) => 1 / x, domain: [1, 6], color: "a", label: "Ek", labelX: 4.8 }, { f: (x) => -2 / x, domain: [1, 6], color: "b", label: "Ep", labelX: 1.5 }, { f: (x) => -1 / x, domain: [1, 6], color: "c", label: "E = −Ek", labelX: 2.2 }] },
        { title: "Gravitational potential and potential energy against r: V = −GM/r, approaching 0 at infinity", x: [0, 6], y: [-1.2, 0.2], xLabel: "r", yLabel: "V", grid: false,
          curves: [{ f: (x) => -1 / x, domain: [1, 6], color: "a" }], vlines: [{ x: 1, label: "R" }] },
        { title: "Kepler's third law: T² against r³ is a straight line through the origin, gradient 4π²/GM", x: [0, 10], y: [0, 10], xLabel: "r³", yLabel: "T²", grid: false,
          curves: [{ f: (x) => 0.85 * x, color: "a" }], points: [{ at: [2, 1.7] }, { at: [4, 3.4] }, { at: [6.5, 5.5] }, { at: [9, 7.65] }] },
        { title: "Net field strength along the Earth-Moon line (towards Moon +): zero at ≈ 0.9 of the separation", x: [0.1, 1], y: [-1.2, 1.2], xLabel: "x / d", yLabel: "g_net", grid: false, origin: false,
          curves: [{ f: (x) => 0.012 * (-1 / (x * x) + 0.0123 / ((1 - x) * (1 - x))), domain: [0.1, 0.985], color: "a" }], hlines: [{ y: 0 }], points: [{ at: [0.9, 0], label: "g = 0" }] },
        { title: "Potential along the Earth-Moon line: maximum (least negative) where g = 0", x: [0.1, 1], y: [-1.1, 0.05], xLabel: "x / d", yLabel: "V", grid: false,
          curves: [{ f: (x) => -0.1 / x - 0.0123 * 0.1 / (1 - x), domain: [0.1, 0.985], color: "a" }], vlines: [{ x: 0.9, label: "g = 0" }] },
      ],
      figures: [
        fig("Gravitational field lines", radialG, "arrows show the direction of force on a test mass"),
        fig("Equipotentials around a planet", equipG, "equal steps of V: spacing increases with r"),
        fig("Kepler's second law", kepler2, "a planet moves fastest at perihelion"),
      ],
      frames: [
        { title: "Sketch Ek, Ep and total energy of a satellite against orbital radius", paper: "P2", where: "Paper 2 · 3 marks · AHL energy of orbits", hl: true,
          q: "Sketch, on the same axes, how the kinetic energy, the gravitational potential energy and the total energy of a satellite in circular orbit vary with orbital radius r (r ≥ R). Use the graph to explain what happens to the speed when drag reduces the total energy.",
          marks: ["Ek positive, ∝ 1/r; Ep negative ∝ −1/r with __magnitude twice Ek__", "total E = __−Ek__, negative, halfway between", "drag makes E more negative → __r decreases__ → __Ek and speed increase__"],
          diagram: { title: "Ek (a), E_total (c), Ep (b) against r", x: [0, 6], y: [-2.2, 1.2], xLabel: "r", yLabel: "E", grid: false,
            curves: [{ f: (x) => 1 / x, domain: [1, 6], color: "a", label: "Ek", labelX: 4.8 }, { f: (x) => -2 / x, domain: [1, 6], color: "b", label: "Ep", labelX: 1.5 }, { f: (x) => -1 / x, domain: [1, 6], color: "c", label: "E = −Ek", labelX: 2.2 }] },
          model: "Ek = GMm/2r is positive and proportional to 1/r. Ep = −GMm/r is negative and its magnitude is twice Ek. The total energy E = −GMm/2r = −Ek is negative and lies halfway between. Drag removes energy so E becomes more negative, which means r decreases; Ek therefore increases and the satellite speeds up.",
          accept: "curves asymptotic to zero at large r; |Ep| = 2Ek shown at any r",
          reject: "Ep drawn positive; satellite slowing down when drag acts",
          tip: "Ep 係 Ek 嘅兩倍（負），總能量 = −Ek。阻力令佢跌低軌道反而行快咗。" },
        { title: "Draw equipotentials and field lines around a planet", paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw the gravitational field lines and three equipotential surfaces, at equal intervals of potential, around an isolated spherical planet.",
          marks: ["__radial__ field lines pointing __towards the centre__", "equipotentials are concentric circles __perpendicular__ to field lines with __spacing increasing__ outwards"],
          svg: equipG,
          model: "The field lines are radial and point towards the centre of the planet. The equipotentials are concentric circles, perpendicular to the field lines, and for equal steps of potential their spacing increases with distance because the field weakens.",
          accept: "at least 6 symmetric field lines; arrows on field lines",
          reject: "equally spaced equipotentials; arrows pointing outwards",
          tip: "等勢面同場線一定垂直；ΔV 相等時越出越疏。" },
      ],
      concepts: [
        { h: "Energy of a circular orbit (AHL)", hl: true, b: "<p>For a satellite of mass m at radius r: \\(E_k = \\frac{GMm}{2r}\\), \\(E_p = -\\frac{GMm}{r}\\), \\(E_{total} = -\\frac{GMm}{2r} = -E_k\\). Moving to a higher orbit needs energy but the satellite ends up slower. Drag lowers the orbit and increases the speed.</p>" },
      ],
    },

    // ======================= D.2 =======================
    "phys-17": {
      diagrams: [
        { title: "Between parallel plates: E constant (a), V rises linearly from the negative plate (b)", x: [0, 10], y: [0, 10], xLabel: "distance from − plate", yLabel: "E, V", grid: false,
          curves: [{ f: () => 6, domain: [0, 8], color: "a", label: "E = V₀/d", labelX: 5 }, { f: (x) => x, domain: [0, 8], color: "b", label: "V", labelX: 6.5 }], vlines: [{ x: 8, label: "d" }] },
        { title: "Coulomb force against separation: F ∝ 1/r² (doubling r quarters F)", x: [0, 5], y: [0, 4.4], xLabel: "r", yLabel: "F", grid: false,
          curves: [{ f: (x) => 1 / (x * x), domain: [0.48, 5], color: "a" }], points: [{ at: [1, 1], label: "F₀" }, { at: [2, 0.25], label: "F₀/4" }] },
        { title: "Field of a charged conducting sphere (radius R): E = 0 inside, kQ/r² outside (a); V constant inside (b)", x: [0, 4], y: [0, 1.2], xLabel: "r / R", yLabel: "E, V", grid: false,
          curves: [{ f: () => 0, domain: [0, 0.999], color: "a" }, { f: (x) => 1 / (x * x), domain: [1, 4], color: "a", label: "E", labelX: 1.4 }, { f: () => 1, domain: [0, 1], color: "b", dash: true }, { f: (x) => 1 / x, domain: [1, 4], color: "b", dash: true, label: "V", labelX: 3 }], vlines: [{ x: 1, label: "R" }] },
      ],
      figures: [
        fig("Field lines of point charges", pointCharges, "direction = force on a small positive test charge"),
        fig("Field of two opposite charges (dipole)", dipole, "traced from Coulomb's law"),
        fig("Field of two like charges", likeCharges, "neutral point where the fields cancel"),
        fig("Uniform field between parallel plates", plates, "E = V/d; equipotentials parallel to the plates"),
        fig("Magnetic field of a straight wire", wireField, "B = μ₀I/2πr"),
        fig("Magnetic field of a solenoid", solenoid, "⊙ out of page on top, ⊗ into page on the bottom"),
        fig("Magnetic field of a bar magnet", barMagnet, "same shape as the field outside a solenoid"),
        fig("Millikan's oil-drop balance", millikan, "q = mgd/V; charge is quantised in units of e"),
      ],
      frames: [
        { title: "Sketch the electric field between two opposite point charges", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch the electric field pattern around a positive point charge and an equal negative point charge a short distance apart.",
          marks: ["lines __start on the positive__ and __end on the negative__ charge, with arrows from + to −", "lines __radial near each charge__ (normal to the charge surface) and __never cross__", "pattern symmetric; lines closest together between the charges (strongest field)"],
          svg: dipole,
          model: "Field lines start on the positive charge and end on the negative charge, with arrows pointing from positive to negative. Near each charge the lines are radial and they never cross. The pattern is symmetric and the lines are closest together between the charges, where the field is strongest.",
          accept: "some lines leaving the diagram from the outside of the charges",
          reject: "lines crossing; arrows from − to +; lines not touching the charges",
          tip: "由 + 出、入 −，唔可以交叉，近電荷要垂直表面。記得畫箭咀！" },
        { title: "Sketch the magnetic field of a solenoid and identify its poles", paper: "P2", where: "Paper 2 · 2 marks",
          q: "Sketch the magnetic field inside and outside a current-carrying solenoid and identify which end is the north pole.",
          marks: ["inside: __parallel, equally spaced__ lines (uniform field); outside: lines loop round like a __bar magnet__", "N pole at the end where the field lines __emerge__ (right-hand grip: fingers along current, thumb points to N)"],
          svg: solenoid,
          model: "Inside the solenoid the field lines are parallel and equally spaced, so the field is uniform. Outside, the lines loop round from one end to the other like the field of a bar magnet. The north pole is the end where the lines emerge, found with the right-hand grip rule: fingers curl with the current and the thumb points to the north pole.",
          accept: "\"anticlockwise current when viewed from the end = N\"",
          reject: "field lines crossing; uniform field drawn outside",
          tip: "右手握法：四指跟電流，拇指指住 N。內部平行均勻，外面似條形磁鐵。" },
      ],
      concepts: [
        { h: "Charged conducting sphere", b: "<p>All excess charge sits on the outer surface of a conductor. Inside a charged conducting sphere E = 0 and V is constant (equal to the surface value). Outside, the field and potential are the same as for a point charge Q at the centre: E = kQ/r², V = kQ/r. Field lines meet a conducting surface at 90°.</p>" },
      ],
    },

    // ======================= D.3 =======================
    "phys-18": {
      diagrams: [
        { title: "Radius of circular path in B: r = mv/qB - proportional to v (a) and to momentum", x: [0, 10], y: [0, 10], xLabel: "v", yLabel: "r", grid: false,
          curves: [{ f: (x) => 0.9 * x, color: "a" }] },
        { title: "Radius against B at fixed v: r ∝ 1/B", x: [0, 5], y: [0, 4.4], xLabel: "B", yLabel: "r", grid: false,
          curves: [{ f: (x) => 1 / x, domain: [0.24, 5], color: "a" }] },
        { title: "Charge accelerated from rest through p.d. V: speed ∝ √V (qV = ½mv²)", x: [0, 10], y: [0, 3.5], xLabel: "V", yLabel: "v", grid: false,
          curves: [{ f: (x) => Math.sqrt(x), color: "a" }] },
      ],
      figures: [
        fig("Velocity selector", vSelector, "only v = E/B passes undeflected, independent of q and m"),
        fig("Force on a current in a magnetic field", wireForce, "F is perpendicular to both B and I"),
        fig("Forces between parallel currents", parallelWires, "dashed circles: field of each wire"),
      ],
      frames: [
        { title: "Draw the path of a charged particle entering a magnetic field", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "A proton moves to the right into a region of uniform magnetic field directed into the page. Draw its path, show the force on it at one point, and explain why its speed does not change.",
          marks: ["path is a __circular arc curving upwards__ (anticlockwise as seen) inside the field", "force drawn __towards the centre__ of the circle, perpendicular to velocity", "force always __perpendicular to velocity__, so __no work is done__: KE and speed constant"],
          svg: circB, svgCaption: "proton: F = qvB towards the centre",
          model: "Inside the field the proton follows a circular arc curving upwards, anticlockwise as seen. The magnetic force qvB acts towards the centre of the circle, at right angles to the velocity. Because the force is always perpendicular to the velocity, no work is done on the proton, so its kinetic energy and speed stay constant; only its direction changes.",
          accept: "Fleming's left-hand rule with current in the direction of the proton; electron drawn curving the opposite way if asked",
          reject: "parabolic path (that is for an electric field); force along v; curving downwards for a proton",
          tip: "磁場：圓弧（力垂直速度，唔做功）；電場：拋物線。用左手定則，電子要反轉方向。" },
      ],
    },

    // ======================= D.4 =======================
    "phys-19": {
      diagrams: [
        { title: "Square coil moving at constant speed through a field region wider than the coil: flux NΦ (a) and emf ε = −dΦ/dt (b)", x: [0, 10], y: [-4, 6], xLabel: "t", yLabel: "NΦ, ε", grid: false,
          lines: [{ from: [0, 0], to: [2, 0], color: "a" }, { from: [2, 0], to: [4, 5], color: "a", label: "NΦ" }, { from: [4, 5], to: [6, 5], color: "a" }, { from: [6, 5], to: [8, 0], color: "a" }, { from: [8, 0], to: [10, 0], color: "a" },
            { from: [2, -2.5], to: [4, -2.5], color: "b", label: "ε" }, { from: [4, 0.05], to: [6, 0.05], color: "b" }, { from: [6, 2.5], to: [8, 2.5], color: "b" }, { from: [2, 0], to: [2, -2.5], color: "b", dash: true }, { from: [4, -2.5], to: [4, 0], color: "b", dash: true }, { from: [6, 0], to: [6, 2.5], color: "b", dash: true }, { from: [8, 2.5], to: [8, 0], color: "b", dash: true }],
          texts: [{ at: [2.1, -3.3], text: "entering" }, { at: [4.2, 1.2], text: "fully in: ε = 0" }, { at: [6.1, 3.2], text: "leaving" }] },
        { title: "B increasing at a steady rate then held constant: ε constant (= NA dB/dt) then zero", x: [0, 10], y: [-1, 6], xLabel: "t", yLabel: "B, ε", grid: false,
          lines: [{ from: [0, 0], to: [5, 5], color: "a", label: "B" }, { from: [5, 5], to: [10, 5], color: "a" }, { from: [0, 2], to: [5, 2], color: "b", label: "|ε|" }, { from: [5, 2], to: [5, 0], color: "b", dash: true }, { from: [5, 0.05], to: [10, 0.05], color: "b" }] },
        { title: "Peak emf of a generator is proportional to rotation frequency: ε₀ = BANω", x: [0, 10], y: [0, 10], xLabel: "f", yLabel: "ε₀", grid: false,
          curves: [{ f: (x) => 0.9 * x, color: "a" }] },
      ],
      figures: [
        fig("Lenz's law with a magnet and coil", lenzMagnet, "the induced current opposes the change in flux"),
        fig("Rod moving on rails", rails, "ε = BLv; I = BLv/R; P = Fv = I²R"),
        fig("Flux through a coil at an angle", fluxAngle, "Φ in Wb = T m²"),
        fig("Simple a.c. generator", generator, "slip rings keep the output alternating"),
      ],
      frames: [
        { title: "Sketch the emf as a coil passes through a field region", paper: "P2", where: "Paper 2 · 3 marks · AHL", hl: true,
          q: "A square coil moves at constant speed through a region of uniform magnetic field that is wider than the coil. Sketch how the induced emf varies with time from before the coil enters until after it leaves.",
          marks: ["__constant emf while entering__ (flux increasing at a steady rate)", "__zero emf while fully inside__ (flux constant)", "constant emf of the __same magnitude but opposite sign while leaving__"],
          diagram: { title: "emf: −ε₀ entering, 0 inside, +ε₀ leaving", x: [0, 10], y: [-4, 4], xLabel: "t", yLabel: "ε", grid: false,
            lines: [{ from: [0, 0.05], to: [2, 0.05], color: "a" }, { from: [2, -2.5], to: [4, -2.5], color: "a" }, { from: [4, 0.05], to: [6, 0.05], color: "a" }, { from: [6, 2.5], to: [8, 2.5], color: "a" }, { from: [8, 0.05], to: [10, 0.05], color: "a" }, { from: [2, 0], to: [2, -2.5], color: "a", dash: true }, { from: [4, -2.5], to: [4, 0], color: "a", dash: true }, { from: [6, 0], to: [6, 2.5], color: "a", dash: true }, { from: [8, 2.5], to: [8, 0], color: "a", dash: true }] },
          model: "While the coil is entering, the flux through it increases at a steady rate, so there is a constant emf. While the coil is fully inside the flux is constant, so the emf is zero. While it is leaving, the flux decreases at the same rate, so there is a constant emf of the same magnitude but opposite sign.",
          accept: "either sign first, as long as entering and leaving are opposite; ε = BLv for the magnitude",
          reject: "emf non-zero while fully inside; same sign on entering and leaving",
          tip: "ε 係 Φ 嘅斜率：入場斜率正、完全喺入面平（ε = 0）、出場斜率負，所以符號相反。" },
      ],
    },

    // ======================= E.1 =======================
    "phys-20": {
      diagrams: [
        { title: "Nuclear radius against A^(1/3): straight line through origin, R = R₀A^(1/3), gradient R₀ ≈ 1.2 fm", x: [0, 7], y: [0, 8.5], xLabel: "A^(1/3)", yLabel: "R / fm", grid: false,
          curves: [{ f: (x) => 1.2 * x, color: "a" }], points: [{ at: [2.29, 2.75], label: "C-12" }, { at: [3.98, 4.8], label: "Cu-63" }, { at: [5.82, 7.0], label: "Au-197" }] },
        { title: "Alpha scattering: number detected falls extremely steeply with angle (N ∝ 1/sin⁴(θ/2)); a few at > 90°", x: [0, 180], y: [0, 10], xLabel: "θ / °", yLabel: "N", grid: false,
          curves: [{ f: (x) => 9.5 * Math.pow(Math.sin((15 * Math.PI) / 360) / Math.sin((x * Math.PI) / 360), 4), domain: [15, 180], color: "a" }] },
      ],
      figures: [
        fig("Geiger-Marsden apparatus", gmApparatus, "evacuated so α are not stopped by air; very thin foil so α scatter once"),
        fig("Alpha-particle paths near a nucleus", rutherford, "repulsive Coulomb force: hyperbolic paths (computed)"),
        fig("Continuous, emission and absorption spectra", spectraTypes, "hydrogen lines at 410, 434, 486, 656 nm"),
        fig("Hydrogen energy levels and spectral series", hSeries, "longest-λ line of each series: smallest jump into that level"),
        fig("Balmer series converging", balmerLines, "λ = 364.6 n²/(n² − 4) nm"),
        fig("Nuclide notation", nuclide, "isotopes: same Z, different N"),
      ],
      frames: [
        { title: "Draw the transition for the longest-wavelength visible hydrogen line", paper: "P2", where: "Paper 2 · 3 marks",
          q: "On an energy-level diagram for hydrogen (n = 1: −13.6 eV, n = 2: −3.40 eV, n = 3: −1.51 eV), draw an arrow for the transition that emits the visible line of longest wavelength and calculate this wavelength.",
          marks: ["arrow __downwards from n = 3 to n = 2__ (Balmer series, smallest energy gap into n = 2)", "ΔE = 3.40 − 1.51 = 1.89 eV = 3.02 × 10⁻¹⁹ J", "λ = hc/ΔE = 6.6 × 10⁻⁷ m (656 nm)"],
          numeric: { value: 656, tol: 8 },
          svg: hSeries, svgCaption: "first Balmer arrow (3 → 2)",
          model: "Visible lines end on n = 2 (Balmer series), and the longest wavelength comes from the smallest gap, so the arrow goes down from n = 3 to n = 2. ΔE = 3.40 − 1.51 = 1.89 eV = 1.89 × 1.60 × 10⁻¹⁹ = 3.02 × 10⁻¹⁹ J. λ = hc/ΔE = (6.63 × 10⁻³⁴ × 3.00 × 10⁸)/3.02 × 10⁻¹⁹ = 6.6 × 10⁻⁷ m, i.e. 656 nm.",
          accept: "6.6 × 10⁻⁷ m; 650-660 nm",
          reject: "upward arrow (that is absorption); transition to n = 1 (ultraviolet)",
          tip: "發射 = 箭咀向下。可見光係落 n = 2；最長 λ = 最細能隙 (3→2)。" },
      ],
      concepts: [
        { h: "Spectral series of hydrogen", b: "<p>Transitions down to n = 1 form the <b>Lyman</b> series (ultraviolet), to n = 2 the <b>Balmer</b> series (visible: 656, 486, 434, 410 nm) and to n = 3 the <b>Paschen</b> series (infrared). The levels crowd together towards n = ∞, so each series' lines get closer together and converge at a series limit (the transition from n = ∞). From level n, the number of possible downward transitions is n(n − 1)/2.</p>", yue: "落 1 = Lyman 紫外，落 2 = Balmer 可見，落 3 = Paschen 紅外。" },
      ],
    },

    // ======================= E.2 =======================
    "phys-21": {
      diagrams: [
        { title: "Stopping potential against frequency: gradient h/e, x-intercept f₀, extrapolated y-intercept −Φ/e", x: [-2, 10], y: [-3, 6], xLabel: "f", yLabel: "Vs", grid: false,
          lines: [{ from: [3, 0], to: [9.5, 5.2], color: "a", label: "gradient h/e" }, { from: [0, -2.4], to: [3, 0], color: "a", dash: true }], points: [{ at: [3, 0], label: "f₀" }, { at: [0, -2.4], label: "−Φ/e" }] },
        { title: "Compton shift against scattering angle: Δλ = (h/mₑc)(1 − cos θ), maximum 2h/mₑc ≈ 4.9 pm at 180°", x: [0, 180], y: [0, 5.5], xLabel: "θ / °", yLabel: "Δλ / pm", grid: false,
          curves: [{ f: (x) => 2.43 * (1 - Math.cos((x * Math.PI) / 180)), color: "a" }] },
        { title: "de Broglie wavelength of electrons against accelerating p.d.: λ = h/√(2meV) ∝ 1/√V", x: [0, 10], y: [0, 4], xLabel: "V", yLabel: "λ", grid: false,
          curves: [{ f: (x) => 1.2 / Math.sqrt(x), domain: [0.1, 10], color: "a" }] },
        { title: "Photocurrent against intensity at fixed f > f₀: proportional (a); zero for f < f₀ at any intensity (b)", x: [0, 10], y: [0, 10], xLabel: "intensity", yLabel: "I", grid: false,
          curves: [{ f: (x) => 0.85 * x, color: "a", label: "f > f₀", labelX: 6.5 }, { f: () => 0.08, color: "b", label: "f < f₀", labelX: 7.5 }] },
      ],
      figures: [
        fig("Photoelectric effect apparatus", photoCell, "UV on a clean metal surface in a vacuum"),
        fig("Compton scattering", compton, "momentum and energy are both conserved"),
        fig("Electron diffraction", eDiffraction, "evidence for the wave nature of particles"),
      ],
      frames: [
        { title: "Sketch stopping potential against frequency for two metals", paper: "P2", where: "Paper 2 · 3 marks · AHL", hl: true,
          q: "Sketch a graph of stopping potential Vs against frequency f for metal X and for metal Y, which has a larger work function. State what the gradient and intercepts represent.",
          marks: ["two __parallel straight lines__ (same gradient)", "gradient = __h/e__; f-intercept = threshold frequency f₀", "line for Y __shifted to higher f₀__; extrapolated Vs-intercept = −Φ/e (more negative for Y)"],
          diagram: { title: "Vs against f: X (a) and Y (b), parallel lines", x: [-1, 10], y: [-4, 6], xLabel: "f", yLabel: "Vs", grid: false,
            lines: [{ from: [2, 0], to: [8.5, 5.4], color: "a", label: "X" }, { from: [4, 0], to: [9.8, 4.8], color: "b", label: "Y" }, { from: [0, -1.66], to: [2, 0], color: "a", dash: true }, { from: [0, -3.3], to: [4, 0], color: "b", dash: true }] },
          model: "Both graphs are straight lines with the same gradient, h/e, because eVs = hf − Φ. The line meets the f-axis at the threshold frequency f₀ = Φ/h, so Y's line is shifted to a higher frequency. Extrapolated back, the Vs-intercept is −Φ/e, which is more negative for Y.",
          accept: "Ek,max on the y-axis with gradient h",
          reject: "lines with different gradients; lines through the origin; lines continued below the f-axis as measured data",
          tip: "斜率永遠係 h/e，兩條線一定平行；功函數大 → 截距 f₀ 大。" },
      ],
    },

    // ======================= E.3 =======================
    "phys-22": {
      diagrams: [
        { title: "Parent nuclei (a) decay exponentially while stable daughter nuclei (b) grow: they are equal at t = T½", x: [0, 5], y: [0, 1.15], xLabel: "t / T½", yLabel: "N / N₀", grid: false,
          curves: [{ f: (x) => Math.pow(0.5, x), color: "a", label: "parent", labelX: 3.5 }, { f: (x) => 1 - Math.pow(0.5, x), color: "b", label: "daughter", labelX: 3.5 }], vlines: [{ x: 1, label: "T½" }] },
        { title: "Measured count rate tends to the background count, not to zero: subtract background before finding T½", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "count rate", grid: false,
          curves: [{ f: (x) => 8 * Math.exp(-0.45 * x) + 1.2, color: "a" }], hlines: [{ y: 1.2, label: "background" }] },
        { title: "Activity is proportional to the number of undecayed nuclei: A = λN (gradient λ)", x: [0, 10], y: [0, 10], xLabel: "N", yLabel: "A", grid: false,
          curves: [{ f: (x) => 0.8 * x, color: "a" }] },
      ],
      figures: [
        fig("α, β and γ in a magnetic field", abgB, "opposite curvature: opposite charge"),
        fig("Penetrating power", penetration, "ionising ability decreases α > β > γ"),
        fig("N-Z chart and the band of stability", nzChart, "light stable nuclei N ≈ Z; heavy ones N > Z"),
        fig("A decay chain on an N-Z grid", decayChain, "α: down-left diagonal 2 squares; β⁻: one square right and down"),
        fig("Nuclear energy levels", gammaLevels, "γ energy = difference between nuclear levels"),
      ],
      frames: [
        { title: "Show a decay sequence on an N-Z chart", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "Uranium-238 (Z = 92) decays by α emission to thorium (Th), which then decays by β⁻ emission to protactinium (Pa). On a grid of neutron number N against proton number Z, mark ²³⁸U, the Th nuclide and the Pa nuclide, and write both nuclear equations.",
          marks: ["²³⁸U at Z = 92, N = 146 → __Th-234 at Z = 90, N = 144__ (α: Z − 2, N − 2)", "→ __Pa-234 at Z = 91, N = 143__ (β⁻: Z + 1, N − 1)", "²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂α and ²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e + __antineutrino__"],
          svg: decayChain, svgCaption: "first two steps: U-238 → Th-234 → Pa-234",
          model: "Uranium-238 is at Z = 92, N = 146. Alpha decay removes 2 protons and 2 neutrons, giving thorium-234 at Z = 90, N = 144. Beta-minus decay turns a neutron into a proton, giving protactinium-234 at Z = 91, N = 143. Equations: ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂α, and ²³⁴₉₀Th → ²³⁴₉₁Pa + ⁰₋₁e + antineutrino.",
          accept: "⁴₂He for α; ν̄ₑ for the antineutrino",
          reject: "a neutrino (not antineutrino) in β⁻ decay; A changing in β decay",
          tip: "α：Z−2、N−2（斜落左下兩格）；β⁻：Z+1、N−1。β⁻ 一定有反中微子！" },
        { title: "Sketch parent and daughter numbers against time", paper: "P1A", where: "Paper 1A / Paper 2 · 2 marks",
          q: "A radioactive sample decays to a stable daughter. Sketch, on the same axes, the number of parent and daughter nuclei against time for three half-lives and state the time at which they are equal.",
          marks: ["parent: __exponential decay__ halving every T½; daughter: rising curve __levelling off at N₀__ (sum always N₀)", "curves cross at __t = T½__ (N = N₀/2)"],
          diagram: { title: "Parent (a) and daughter (b)", x: [0, 3.2], y: [0, 1.15], xLabel: "t / T½", yLabel: "N / N₀", grid: false,
            curves: [{ f: (x) => Math.pow(0.5, x), color: "a" }, { f: (x) => 1 - Math.pow(0.5, x), color: "b" }], vlines: [{ x: 1, label: "T½" }] },
          model: "The parent number decays exponentially, halving every half-life. The daughter number rises and levels off towards N₀ because the two always add up to N₀. The curves cross at t = T½ where both are N₀/2.",
          accept: "N₀/2, N₀/4, N₀/8 marked at 1, 2, 3 half-lives",
          reject: "straight-line decay; daughter exceeding N₀",
          tip: "母核 + 子核 = N₀，兩條線一個半衰期就相交。" },
      ],
      concepts: [
        { h: "Stability and the N-Z chart", b: "<p>Light stable nuclei have N ≈ Z; heavier stable nuclei need N > Z because extra neutrons add strong-force attraction without adding Coulomb repulsion. Nuclei above the band of stability (neutron-rich) decay by β⁻; below it (proton-rich) by β⁺; very heavy nuclei (Z > 82) decay mainly by α. On an N-Z chart α moves 2 left and 2 down, β⁻ moves 1 right and 1 down, β⁺ moves 1 left and 1 up; γ emission does not move the nuclide.</p>", yue: "中子太多 → β⁻；質子太多 → β⁺；太重 → α。" },
      ],
    },

    // ======================= E.4 =======================
    "phys-23": {
      diagrams: [
        { title: "Binding energy per nucleon: U-235 (≈ 7.6 MeV) splits into fragments near the peak (≈ 8.5 MeV) - the increase × nucleons is the energy released", x: [0, 250], y: [0, 9.5], xLabel: "A", yLabel: "B/A / MeV", grid: false,
          curves: [{ f: (x) => Math.max(0, bea(x)), domain: [8, 245], color: "a" }], points: [{ at: [235, bea(235)], label: "U-235" }, { at: [141, bea(141)], label: "Ba-141" }, { at: [92, bea(92)], label: "Kr-92" }] },
        { title: "Neutron population with multiplication factor k: k > 1 grows (a), k = 1 steady (b, reactor), k < 1 dies out (c)", x: [0, 10], y: [0, 6], xLabel: "generation", yLabel: "neutrons", grid: false,
          curves: [{ f: (x) => Math.pow(1.2, x), color: "a", label: "k > 1", labelX: 8.4 }, { f: () => 1, color: "b", label: "k = 1", labelX: 8.4 }, { f: (x) => Math.pow(0.8, x), color: "c", label: "k < 1", labelX: 6 }] },
      ],
      figures: [
        fig("Neutron-induced fission", fissionEvent, "one possible pair of fragments"),
        fig("Chain reaction", chain, "fuel above critical mass"),
        fig("Thermal fission reactor", reactor, "fuel, moderator, control rods, coolant/heat exchanger, shielding"),
        fig("Sankey diagram for a power station", sankey, "≈ 1/3 efficient overall"),
      ],
      frames: [
        { title: "Draw a Sankey diagram for a nuclear power station", paper: "P2", where: "Paper 2 · 2 marks",
          q: "A nuclear power station has a thermal power input of 3.0 GW and an electrical output of 1.0 GW. Draw a Sankey diagram and calculate the efficiency.",
          marks: ["arrow widths __proportional to power__: 3.0 GW in splits into 1.0 GW electrical and __2.0 GW thermal to surroundings__", "efficiency = 1.0/3.0 = 0.33 (33 %)"],
          numeric: { value: 33, tol: 1 },
          svg: sankey,
          model: "The input arrow, 3.0 GW, splits into a useful electrical arrow of 1.0 GW (one third of the width) and a wasted arrow of 2.0 GW to the surroundings (two thirds of the width), with arrow widths proportional to power. Efficiency = 1.0/3.0 = 0.33, i.e. 33 %.",
          accept: "0.33; 33.3 %",
          reject: "arrows not to scale; waste arrow pointing back into the input",
          tip: "Sankey 箭嘅闊度要按比例；入 = 出（能量守恆）。" },
      ],
      concepts: [
        { h: "Multiplication factor and reactor control", b: "<p>The multiplication factor k = number of neutrons in one generation ÷ number in the previous one. A reactor runs at k = 1 (critical, steady power); k > 1 is supercritical (power rises, uncontrolled in a bomb); k < 1 is subcritical (reaction dies out). Control rods (e.g. boron, cadmium) absorb neutrons to keep k = 1; the moderator slows neutrons to thermal energies so they are more likely to cause fission of U-235.</p>" },
      ],
    },

    // ======================= E.5 =======================
    "phys-24": {
      diagrams: [
        { title: "Black-body spectra: hotter star (a, 6000 K) is brighter at every λ and peaks at shorter λ than cooler stars (b 4500 K, c 3000 K); λ_max T = 2.9 × 10⁻³ m K", x: [0, 3], y: [0, 1.15], xLabel: "λ / µm", yLabel: "intensity", grid: false,
          curves: [{ f: (x) => planck(x, 6000) / planck(0.483, 6000), domain: [0.12, 3], color: "a" }, { f: (x) => planck(x, 4500) / planck(0.483, 6000), domain: [0.12, 3], color: "b" }, { f: (x) => planck(x, 3000) / planck(0.483, 6000), domain: [0.12, 3], color: "c" }],
          vlines: [{ x: 0.483, label: "0.48 µm" }] },
        { title: "Fusion vs fission on the B/A curve: both move towards the peak near Fe-56", x: [0, 250], y: [0, 9.5], xLabel: "A", yLabel: "B/A / MeV", grid: false,
          curves: [{ f: (x) => Math.max(0, bea(x)), domain: [8, 245], color: "a" }], points: [{ at: [56, bea(56)], label: "Fe-56 (peak)" }], texts: [{ at: [15, 2.5], text: "fusion →" }, { at: [175, 6.5], text: "← fission" }] },
      ],
      figures: [
        fig("Stellar equilibrium", equilibrium, "hydrostatic equilibrium on the main sequence"),
        fig("Evolutionary paths on the HR diagram", hrEvol, "solid: Sun to red giant; dashed: planetary nebula to white dwarf; red: massive star to supergiant"),
        fig("Stellar parallax", parallax, "1 pc = distance at which p = 1 arcsec"),
        fig("Stellar evolution flowchart", evolFlow, "the mass of the star decides its fate"),
        fig("Shell structure of a massive star", onion, "heavier elements fused deeper, iron core at the centre"),
      ],
      frames: [
        { title: "Draw the evolutionary path of the Sun on an HR diagram", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "On an HR diagram, draw the evolutionary path of the Sun from the main sequence to its final state and name each stage.",
          marks: ["from the main sequence up and to the right to the __red giant__ region (cooler, more luminous)", "then across to the left as the outer layers are ejected (__planetary nebula__)", "down to the __white dwarf__ region (hot, low luminosity, bottom left)"],
          svg: hrEvol,
          model: "The Sun leaves the main sequence and moves up and to the right to the red giant region, becoming cooler at the surface but more luminous. It then ejects its outer layers as a planetary nebula while the exposed core moves to the left (hotter), and finally moves down to the white dwarf region at the bottom left: hot but of low luminosity.",
          accept: "helium flash / horizontal branch details not required",
          reject: "Sun becoming a supernova, neutron star or black hole; path going to the bottom right",
          tip: "太陽：主序 → 紅巨星（右上）→ 行星狀星雲 → 白矮星（左下）。唔會變超新星！" },
        { title: "Sketch black-body curves for two stars", paper: "P2", where: "Paper 2 · 2 marks",
          q: "Star A has a surface temperature of 6000 K and star B of 3000 K. Sketch the black-body spectrum of each on the same axes and calculate the peak wavelength of star A, in nm.",
          marks: ["A's curve __higher at all wavelengths__ with its __peak at shorter λ__ than B's", "λ_max = 2.9 × 10⁻³/6000 = 4.8 × 10⁻⁷ m = 480 nm"],
          numeric: { value: 480, tol: 10 },
          diagram: { title: "6000 K (a) and 3000 K (b)", x: [0, 3], y: [0, 1.15], xLabel: "λ / µm", yLabel: "intensity", grid: false,
            curves: [{ f: (x) => planck(x, 6000) / planck(0.483, 6000), domain: [0.12, 3], color: "a" }, { f: (x) => planck(x, 3000) / planck(0.483, 6000), domain: [0.12, 3], color: "b" }] },
          model: "Star A's curve is higher than star B's at every wavelength and its peak is at a shorter wavelength. By Wien's law, λ_max = 2.9 × 10⁻³/6000 = 4.8 × 10⁻⁷ m.",
          accept: "480 nm; peaks in ratio 1 : 2",
          reject: "curves crossing; hotter star peaking at longer λ",
          tip: "熱啲：成條曲線高晒，峰值向左（短 λ）。曲線唔可以相交。" },
      ],
      concepts: [
        { h: "Stellar remnants and mass limits", b: "<p>A low-mass star (up to about 8 solar masses initially) ends as a <b>white dwarf</b>, supported by electron degeneracy pressure, which is possible only for a core below about 1.4 M☉ (the Chandrasekhar limit). Heavier cores collapse in a supernova to a <b>neutron star</b> (supported by neutron degeneracy pressure) or, above roughly 3 M☉ (the Oppenheimer–Volkoff limit), a <b>black hole</b>. Elements heavier than iron are made by neutron capture in supernovae and neutron-star mergers.</p>", yue: "核心 < 1.4 M☉ → 白矮星；更重 → 中子星；> 約 3 M☉ → 黑洞。" },
      ],
    },
  } });
})();
