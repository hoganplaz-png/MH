/* Mathematics AA - diagrams and graphs to know, topics 3 (AHL), 4, 5 and 5 (AHL) (original). */
(function () {
  const PI = Math.PI;
  const COL = { a: "var(--fig-a)", b: "var(--fig-b)", c: "var(--fig-c)", d: "var(--fig-d)", m: "var(--fig-muted)", f: "var(--fig-fill)", t: "currentColor" };
  const col = (c) => COL[c || "t"] || c;
  let uid = 0;
  const mk = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  const open = (w, h, label, id) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-size="12" fill="currentColor">` + (id ? mk(id) : "");
  const tx = (x, y, t, o = {}) => `<text x="${x}" y="${y}"${o.a ? ` text-anchor="${o.a}"` : ""}${o.c ? ` fill="${col(o.c)}"` : ""}${o.s ? ` font-size="${o.s}"` : ""}${o.i ? ` font-style="italic"` : ""}${o.b ? ` font-weight="bold"` : ""}>${t}</text>`;
  const ln = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col(o.c)}" stroke-width="${o.w || 1.5}"${o.dash ? ` stroke-dasharray="${o.dash === true ? "5 4" : o.dash}"` : ""}${o.ar ? ` marker-end="url(#${o.ar})"` : ""}/>`;

  // Function-graph figure with filled regions (data coordinates). Returns an SVG string.
  function G(o) {
    const W = o.w || 360, H = o.h || 230, L = o.L ?? 30, R = o.R ?? 22, T = o.T ?? 22, B = o.B ?? 26;
    const [x0, x1] = o.x, [y0, y1] = o.y, id = "ar-m2g-" + ++uid;
    const X = (x) => +(L + ((x - x0) / (x1 - x0)) * (W - L - R)).toFixed(1);
    const Y = (y) => +(H - B - ((y - y0) / (y1 - y0)) * (H - T - B)).toFixed(1);
    const samp = (f, a, b, N, clamp) => {
      const p = [];
      for (let i = 0; i <= N; i++) {
        const x = a + ((b - a) * i) / N; let y = f(x);
        if (!isFinite(y)) { p.push(null); continue; }
        if (clamp) y = Math.max(y0, Math.min(y1, y));
        else if (y < y0 - (y1 - y0) * 0.01 || y > y1 + (y1 - y0) * 0.01) { p.push(null); continue; }
        p.push([x, y]);
      }
      return p;
    };
    const dp = (pts) => { let d = "", pen = false; pts.forEach((p) => { if (!p) { pen = false; return; } d += (pen ? "L" : "M") + X(p[0]) + " " + Y(p[1]); pen = true; }); return d; };
    let s = open(W, H, o.label || "graph", id);
    (o.fills || []).forEach((f) => {
      const pts = f.poly ? f.poly : samp(f.f, f.d[0], f.d[1], 120, true).concat(samp(f.g || (() => 0), f.d[0], f.d[1], 120, true).reverse());
      s += `<path d="M${pts.filter(Boolean).map((p) => X(p[0]) + " " + Y(p[1])).join("L")}Z" fill="${col(f.c || "c")}" fill-opacity="${f.op || 0.28}" stroke="none"/>`;
    });
    const ax = o.ax ?? (x0 <= 0 && x1 >= 0 ? 0 : x0), ay = o.ay ?? (y0 <= 0 && y1 >= 0 ? 0 : y0);
    s += ln(X(x0), Y(ay), X(x1) + 12, Y(ay), { w: 1.2, ar: id }) + ln(X(ax), Y(y0), X(ax), Y(y1) - 12, { w: 1.2, ar: id });
    s += tx(W - 4, Y(ay) + 15, o.xl || "x", { a: "end", i: true }) + tx(X(ax) + 7, 12, o.yl ?? "y", { i: true });
    if (o.O !== false && ax === 0 && ay === 0) s += tx(X(0) - 4, Y(0) + 13, "O", { a: "end", s: 11 });
    (o.xt || []).forEach(([v, l]) => (s += ln(X(v), Y(ay) - 3, X(v), Y(ay) + 3, { w: 1 }) + tx(X(v), Y(ay) + 15, l ?? v, { a: "middle", s: 11 })));
    (o.yt || []).forEach(([v, l]) => (s += ln(X(ax) - 3, Y(v), X(ax) + 3, Y(v), { w: 1 }) + tx(X(ax) - 5, Y(v) + 4, l ?? v, { a: "end", s: 11 })));
    (o.vl || []).forEach((v) => (s += ln(X(v.x), Y(v.from ?? y0), X(v.x), Y(v.to ?? y1), { c: v.c || "m", w: 1.2, dash: true })));
    (o.hl || []).forEach((v) => (s += ln(X(v.from ?? x0), Y(v.y), X(v.to ?? x1), Y(v.y), { c: v.c || "m", w: 1.2, dash: true })));
    (o.polys || []).forEach((p) => (s += `<path d="M${p.pts.map((q) => X(q[0]) + " " + Y(q[1])).join("L")}${p.close ? "Z" : ""}" fill="${p.fc ? col(p.fc) : "none"}"${p.fc ? ` fill-opacity="${p.op || 0.25}"` : ""} stroke="${col(p.c || "a")}" stroke-width="${p.w || 1.6}"${p.dash ? ' stroke-dasharray="5 4"' : ""}/>`));
    (o.curves || []).forEach((c) => (s += `<path d="${dp(samp(c.f, c.d ? c.d[0] : x0, c.d ? c.d[1] : x1, c.n || 200))}" fill="none" stroke="${col(c.c || "a")}" stroke-width="${c.w || 2.2}"${c.dash ? ' stroke-dasharray="6 4"' : ""}/>`));
    (o.segs || []).forEach((g) => (s += ln(X(g.p[0]), Y(g.p[1]), X(g.q[0]), Y(g.q[1]), { c: g.c || "t", w: g.w || 1.6, dash: g.dash, ar: g.ar ? id : "" })));
    (o.dots || []).forEach((d) => (s += `<circle cx="${X(d.p[0])}" cy="${Y(d.p[1])}" r="3.5" fill="${d.open ? "none" : col(d.c || "t")}" stroke="${col(d.c || "t")}" stroke-width="1.5"/>`));
    if (o.raw) s += o.raw(X, Y);
    (o.texts || []).forEach((t) => (s += tx(+(X(t.p[0]) + (t.dx || 0)).toFixed(1), +(Y(t.p[1]) + (t.dy || 0)).toFixed(1), t.t, { a: t.a, c: t.c, s: t.s || 11, i: t.i })));
    return s + "</svg>";
  }

  const npdf = (m, sd) => (x) => Math.exp(-((x - m) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * PI));
  const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
  const bin = (n, p) => Array.from({ length: n + 1 }, (_, k) => C(n, k) * p ** k * (1 - p) ** (n - k));
  const bars = (ps, c) => ps.map((p, k) => ({ from: [k, 0], to: [k, p], color: c || "a" }));
  const branches = (f, cuts, lo, hi, color, dash) => { const pts = [lo, ...cuts, hi], out = []; for (let i = 0; i < pts.length - 1; i++) out.push({ f, domain: [pts[i] + 0.02, pts[i + 1] - 0.02], color, dash }); return out; };

  // ---------- Venn helpers (circle A left, circle B right, equal radii) ----------
  function vennPaths(cx1, cx2, cy, r) {
    const xm = (cx1 + cx2) / 2, h = Math.sqrt(r * r - ((cx2 - cx1) / 2) ** 2), t = (cy - h).toFixed(1), b = (cy + h).toFixed(1);
    const circ = (cx) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    return {
      A: circ(cx1), B: circ(cx2),
      lens: `M${xm} ${t}A${r} ${r} 0 0 1 ${xm} ${b}A${r} ${r} 0 0 1 ${xm} ${t}Z`,
      union: `M${xm} ${t}A${r} ${r} 0 1 0 ${xm} ${b}A${r} ${r} 0 1 0 ${xm} ${t}Z`,
    };
  }
  function vennPanel(ox, oy, w, h, shade, title) {
    const r = Math.min(w, h) * 0.3, cy = oy + h / 2 + 4, cx1 = ox + w / 2 - r * 0.62, cx2 = ox + w / 2 + r * 0.62, P = vennPaths(cx1, cx2, cy, r);
    const rect = `M${ox} ${oy}h${w}v${h}h${-w}Z`;
    const d = { "A∪B": P.union, "A∩B": P.lens, "A′": rect + P.A, "A∩B′": P.A + P.lens, "A∪B′": rect + P.B + P.lens, "(A∪B)′": rect + P.union, "A′∩B": P.B + P.lens }[shade];
    return `<path d="${d}" fill="var(--fig-a)" fill-opacity=".35" fill-rule="evenodd" stroke="none"/><rect x="${ox}" y="${oy}" width="${w}" height="${h}" fill="none" stroke="currentColor"/>` +
      `<circle cx="${cx1}" cy="${cy}" r="${r}" fill="none" stroke="currentColor"/><circle cx="${cx2}" cy="${cy}" r="${r}" fill="none" stroke="currentColor"/>` +
      tx(cx1 - r * 0.55, cy - r * 0.95, "A", { a: "middle", s: 11, i: true }) + tx(cx2 + r * 0.55, cy - r * 0.95, "B", { a: "middle", s: 11, i: true }) +
      tx(ox + 4, oy + 12, "U", { s: 11 }) + tx(ox + w / 2, oy + h + 15, title || shade, { a: "middle", s: 12 });
  }

  // ---------- tree-diagram helper ----------
  // nodes: [x,y,label], edges: [i,j,branchLabel]
  function tree(w, h, nodes, edges, id, label, extra) {
    let s = open(w, h, label);
    edges.forEach(([i, j, l]) => {
      const [x1, y1] = nodes[i], [x2, y2] = nodes[j];
      s += ln(x1 + 6, y1, x2 - 14, y2, { w: 1.3 });
      if (l) s += tx(((x1 + x2) / 2).toFixed(0), ((y1 + y2) / 2 + (y2 < y1 ? -6 : 13)).toFixed(0), l, { a: "middle", s: 11, c: "a" });
    });
    nodes.forEach(([x, y, l]) => l && (s += tx(x - 10, y + 4, l, { s: 12, i: true })));
    return s + (extra || "") + "</svg>";
  }

  // ---------- skewness panel ----------
  function skewPanel(ox, f, bx, cap) {
    const W = 115, top = 18, base = 82, X = (u) => (ox + 8 + u * (W - 16)).toFixed(1);
    let d = ""; for (let i = 0; i <= 60; i++) { const u = i / 60; d += (i ? "L" : "M") + X(u) + " " + (base - f(u) * (base - top)).toFixed(1); }
    const [mn, q1, me, q3, mx] = bx, y = 108;
    return `<path d="${d}" fill="var(--fig-a)" fill-opacity=".18" stroke="var(--fig-a)" stroke-width="2"/>` + ln(ox + 6, base, ox + W - 6, base, { w: 1 }) +
      `<rect x="${X(q1)}" y="${y - 9}" width="${(X(q3) - X(q1)).toFixed(1)}" height="18" fill="none" stroke="currentColor" stroke-width="1.4"/>` +
      ln(X(me), y - 9, X(me), y + 9, { w: 2, c: "b" }) + ln(X(mn), y, X(q1), y, { w: 1.3 }) + ln(X(q3), y, X(mx), y, { w: 1.3 }) +
      ln(X(mn), y - 5, X(mn), y + 5, { w: 1.3 }) + ln(X(mx), y - 5, X(mx), y + 5, { w: 1.3 }) +
      cap.map((c, i) => tx(ox + W / 2, 136 + i * 14, c, { a: "middle", s: 11 })).join("");
  }

  // ---------- sign-table helper ----------
  function signTable(w, label, headers, rows, colW, labW) {
    const rh = 24, h = rh * (rows.length + 1) + 8;
    let s = open(w, h, label) + `<rect x="4" y="4" width="${labW + colW * headers.length}" height="${rh * (rows.length + 1)}" fill="none" stroke="currentColor"/>`;
    s += `<rect x="4" y="4" width="${labW + colW * headers.length}" height="${rh}" fill="var(--fig-fill)" stroke="currentColor"/>`;
    for (let r = 1; r <= rows.length; r++) s += ln(4, 4 + rh * r, 4 + labW + colW * headers.length, 4 + rh * r, { w: 1 });
    s += ln(4 + labW, 4, 4 + labW, 4 + rh * (rows.length + 1), { w: 1 });
    headers.forEach((hd, i) => (s += tx(4 + labW + colW * (i + 0.5), 4 + rh * 0.68, hd, { a: "middle", s: 11 })));
    rows.forEach((row, r) => {
      s += tx(10, 4 + rh * (r + 1.68), row[0], { s: 12 });
      row.slice(1).forEach((v, i) => (s += tx(4 + labW + colW * (i + 0.5), 4 + rh * (r + 1.7), v, { a: "middle", s: 12, c: v === "+" ? "c" : v === "−" ? "d" : "" })));
    });
    return s + "</svg>";
  }

  // =====================================================================
  IB.addExamFrames("math", { topics: {

  // ======================= AHL 3.9-3.19 Further trig, vectors, lines, planes =======================
  "math-h3": {
    diagrams: [
      { title: "y = sec x (dashed: y = cos x) - asymptotes where cos x = 0; range y ≤ −1 or y ≥ 1; period 2π", x: [-6.4, 6.4], y: [-4.5, 4.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [...branches((x) => 1 / Math.cos(x), [-1.5 * PI, -PI / 2, PI / 2, 1.5 * PI], -2 * PI, 2 * PI, "a"), { f: Math.cos, domain: [-2 * PI, 2 * PI], color: "muted", dash: true }],
        vlines: [{ x: -1.5 * PI }, { x: -PI / 2, label: "−π/2" }, { x: PI / 2, label: "π/2" }, { x: 1.5 * PI }], points: [{ at: [0, 1], label: "(0, 1)" }, { at: [PI, -1], label: "(π, −1)" }] },
      { title: "y = cosec x (dashed: y = sin x) - asymptotes at x = kπ; turning points (π/2, 1), (3π/2, −1)", x: [-6.4, 6.4], y: [-4.5, 4.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [...branches((x) => 1 / Math.sin(x), [-PI, 0, PI], -2 * PI, 2 * PI, "a"), { f: Math.sin, domain: [-2 * PI, 2 * PI], color: "muted", dash: true }],
        vlines: [{ x: -2 * PI }, { x: -PI, label: "−π" }, { x: PI, label: "π" }, { x: 2 * PI, label: "2π" }], points: [{ at: [PI / 2, 1], label: "(π/2, 1)" }, { at: [1.5 * PI, -1] }] },
      { title: "y = cot x = 1/tan x - asymptotes at x = kπ, zeros at x = π/2 + kπ, decreasing on each branch, period π", x: [-6.4, 6.4], y: [-4.5, 4.5], xLabel: "x", yLabel: "y", grid: false,
        curves: branches((x) => Math.cos(x) / Math.sin(x), [-PI, 0, PI], -2 * PI, 2 * PI, "a"),
        vlines: [{ x: -2 * PI }, { x: -PI, label: "−π" }, { x: PI, label: "π" }, { x: 2 * PI }], points: [{ at: [PI / 2, 0], label: "π/2" }, { at: [-PI / 2, 0] }] },
      { title: "y = arcsin x: domain −1 ≤ x ≤ 1, range −π/2 ≤ y ≤ π/2, odd function (reflection of sin x in y = x)", x: [-1.6, 1.6], y: [-1.8, 1.8], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.asin, domain: [-1, 1], color: "a" }, { f: Math.sin, domain: [-PI / 2, PI / 2].map((v) => Math.max(v, -1.6)), color: "muted", dash: true }, { f: (x) => x, domain: [-1.6, 1.6], color: "muted", dash: true, label: "y = x" }],
        points: [{ at: [1, PI / 2], label: "(1, π/2)" }, { at: [-1, -PI / 2], label: "(−1, −π/2)" }] },
      { title: "y = arccos x: domain −1 ≤ x ≤ 1, range 0 ≤ y ≤ π, decreasing, passes (0, π/2)", x: [-1.6, 1.6], y: [-0.4, 3.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.acos, domain: [-1, 1], color: "a" }], points: [{ at: [-1, PI], label: "(−1, π)" }, { at: [0, PI / 2], label: "(0, π/2)" }, { at: [1, 0], label: "(1, 0)" }] },
      { title: "y = arctan x: domain all real x, range −π/2 < y < π/2 with horizontal asymptotes y = ±π/2", x: [-6, 6], y: [-2.2, 2.2], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.atan, domain: [-6, 6], color: "a" }], hlines: [{ y: PI / 2, label: "y = π/2" }, { y: -PI / 2, label: "y = −π/2" }], points: [{ at: [1, PI / 4], label: "(1, π/4)" }] },
    ],
    figures: [
      { title: "Vector equation of a line: r = a + λb", caption: "a = position vector of a known point A; b = direction vector; every value of λ gives a point R on the line.",
        svg: open(340, 200, "Vector equation of a line", "ar-mh3-1") + ln(30, 129.5, 315, 10.8, { c: "m", w: 1.3 }) +
          ln(40, 175, 118, 94, { w: 1.6, ar: "ar-mh3-1" }) + ln(40, 175, 237, 44, { w: 1.6, c: "b", ar: "ar-mh3-1" }) + ln(120, 92, 176, 69, { w: 2.6, c: "a", ar: "ar-mh3-1" }) +
          ln(180, 67, 236, 44, { c: "a", dash: true }) + `<circle cx="120" cy="92" r="3.5"/><circle cx="240" cy="42" r="3.5"/>` +
          tx(30, 190, "O") + tx(110, 86, "A") + tx(244, 40, "R") + tx(66, 128, "a", { b: true, i: true }) + tx(150, 126, "r", { b: true, i: true, c: "b" }) +
          tx(150, 66, "b", { b: true, i: true, c: "a" }) + tx(214, 70, "λb", { i: true, c: "a" }) + `<rect x="200" y="140" width="128" height="26" fill="var(--fig-fill)" stroke="currentColor"/>` + tx(264, 158, "r = a + λb", { a: "middle", s: 13, b: true }) + "</svg>" },
      { title: "Vector equation of a plane: (r − a)·n = 0", caption: "n is perpendicular to every vector in the plane. Cartesian form ax + by + cz = d where n = (a, b, c) and d = a·n.",
        svg: open(340, 200, "Plane with normal vector", "ar-mh3-2") + `<path d="M40 165L240 165L300 105L100 105Z" fill="var(--fig-fill)" stroke="currentColor"/>` +
          ln(150, 145, 150, 40, { c: "a", w: 2.4, ar: "ar-mh3-2" }) + ln(150, 145, 238, 125, { c: "b", w: 1.8, ar: "ar-mh3-2" }) + `<path d="M150 133L161 130.5L161 142.5" fill="none" stroke="currentColor"/>` +
          `<circle cx="150" cy="145" r="3"/><circle cx="240" cy="125" r="3"/>` + tx(132, 158, "A") + tx(246, 128, "R") + tx(158, 46, "n", { b: true, i: true, c: "a" }) + tx(186, 126, "r − a", { s: 11, c: "b" }) +
          tx(52, 158, "Π", { s: 13 }) + tx(200, 30, "(r − a)·n = 0", { s: 13, b: true }) + tx(200, 50, "⇔ r·n = a·n", { s: 12 }) + tx(170, 190, "n is normal to the plane", { a: "middle", s: 11 }) + "</svg>" },
      { title: "Angle between a line and a plane", caption: "Use the normal: the angle between b and n is 90° − θ, so sin θ = |b·n| / (|b||n|). Give the acute angle.",
        svg: open(340, 200, "Angle between a line and a plane", "ar-mh3-3") + `<path d="M30 170L240 170L300 110L90 110Z" fill="var(--fig-fill)" stroke="currentColor"/>` +
          ln(110, 167.3, 250, 40, { c: "a", w: 2.2 }) + ln(80, 194.5, 110, 167.3, { c: "a", w: 2.2, dash: true }) + ln(140, 140, 250, 140, { c: "m", w: 1.5, dash: true }) + ln(250, 40, 250, 140, { c: "m", w: 1.2, dash: true }) +
          ln(140, 140, 140, 45, { c: "b", w: 2, ar: "ar-mh3-3" }) + `<path d="M182 140A42 42 0 0 0 171 112" fill="none" stroke="currentColor"/>` + `<path d="M140 115A25 25 0 0 1 159 123" fill="none" stroke="var(--fig-b)"/>` +
          `<circle cx="140" cy="140" r="3"/>` + tx(122, 152, "P") + tx(188, 132, "θ", { s: 13 }) + tx(146, 108, "90° − θ", { s: 11, c: "b" }) + tx(146, 52, "n", { b: true, i: true, c: "b" }) +
          tx(258, 46, "line, direction b", { s: 11, c: "a" }) + tx(196, 160, "projection in plane", { s: 11, c: "m" }) + tx(20, 24, "sin θ = |b·n| / (|b||n|)", { s: 13, b: true }) + "</svg>" },
      { title: "Scalar product and projection", caption: "a·b = |a||b|cos θ with the vectors placed tail to tail; a·b = 0 ⇔ perpendicular. The component of b along a is (a·b)/|a|.",
        svg: open(340, 190, "Scalar product as projection", "ar-mh3-4") + ln(40, 145, 300, 145, { w: 2.2, c: "a", ar: "ar-mh3-4" }) + ln(40, 145, 200, 50, { w: 2.2, c: "b", ar: "ar-mh3-4" }) +
          ln(200, 50, 200, 145, { c: "m", dash: true }) + `<path d="M188 145V133H200" fill="none" stroke="currentColor"/>` + `<path d="M80 145A40 40 0 0 0 74 125" fill="none" stroke="currentColor"/>` +
          tx(86, 136, "θ", { s: 13 }) + tx(304, 140, "a", { b: true, i: true, c: "a" }) + tx(110, 88, "b", { b: true, i: true, c: "b" }) + tx(30, 160, "O") +
          ln(40, 162, 200, 162, { w: 1, ar: "ar-mh3-4" }) + tx(120, 178, "|b| cos θ = a·b / |a|", { a: "middle", s: 11 }) + tx(212, 40, "a·b = |a||b| cos θ", { s: 12, b: true }) + "</svg>" },
      { title: "Vector product: direction and area", caption: "a × b is perpendicular to both a and b (right-hand rule). |a × b| = |a||b| sin θ = area of the parallelogram; the triangle is half of it.",
        svg: open(340, 200, "Vector product parallelogram", "ar-mh3-5") + `<path d="M60 170L230 170L290 110L120 110Z" fill="var(--fig-a)" fill-opacity=".15" stroke="none"/>` +
          ln(60, 170, 228, 170, { w: 2.2, c: "a", ar: "ar-mh3-5" }) + ln(60, 170, 118, 112, { w: 2.2, c: "b", ar: "ar-mh3-5" }) + ln(230, 170, 290, 110, { c: "m", dash: true }) + ln(120, 110, 290, 110, { c: "m", dash: true }) +
          ln(120, 110, 230, 170, { c: "m", w: 1 }) + ln(60, 170, 60, 30, { w: 2.4, c: "d", ar: "ar-mh3-5" }) + `<path d="M84 170A24 24 0 0 0 77 153" fill="none" stroke="currentColor"/>` +
          tx(88, 162, "θ", { s: 12 }) + tx(232, 186, "a", { b: true, i: true, c: "a" }) + tx(78, 120, "b", { b: true, i: true, c: "b" }) + tx(68, 38, "a × b", { b: true, c: "d" }) +
          tx(150, 156, "½|a × b|", { s: 11 }) + tx(196, 128, "area |a × b|", { s: 11 }) + tx(170, 40, "|a × b| = |a||b| sin θ", { s: 12, b: true }) + tx(170, 60, "b × a = −(a × b)", { s: 11 }) + "</svg>" },
      { title: "Shortest distance from a point to a line", caption: "F = a + λb is the foot of the perpendicular: solve PF·b = 0 for λ, then distance = |PF|. (Alternative: |AP × b| / |b|.)",
        svg: open(340, 190, "Shortest distance from point to line", "ar-mh3-6") + ln(20, 150, 330, 63, { c: "a", w: 2 }) + ln(130, 40, 150.6, 113.3, { c: "b", w: 1.8, dash: true }) +
          `<path d="M147.8 103.2L157.7 100.4L160.5 110.5" fill="none" stroke="currentColor"/>` + ln(60, 138.8, 100, 127.6, { w: 2.4, c: "a", ar: "ar-mh3-6" }) +
          `<circle cx="130" cy="40" r="3.5"/><circle cx="150.6" cy="113.3" r="3.5"/><circle cx="60" cy="138.8" r="3"/>` + tx(118, 36, "P") + tx(154, 130, "F") + tx(54, 158, "A") + tx(84, 122, "b", { b: true, i: true, c: "a" }) +
          tx(146, 74, "shortest", { s: 11, c: "b" }) + tx(200, 150, "PF · b = 0", { s: 13, b: true }) + tx(200, 170, "distance = |PF|", { s: 12 }) + "</svg>" },
      { title: "Two lines in 3D: intersecting, parallel or skew", caption: "Skew lines are not parallel and do not meet (they lie in different planes). Test: direction vectors not multiples AND the equations a₁ + λb₁ = a₂ + μb₂ have no solution.",
        svg: open(380, 150, "Intersecting parallel and skew lines") + ln(15, 30, 105, 100, { c: "a", w: 2 }) + ln(15, 100, 105, 30, { c: "b", w: 2 }) + `<circle cx="60" cy="65" r="3.5"/>` + tx(60, 125, "intersecting", { a: "middle" }) + tx(60, 140, "one common point", { a: "middle", s: 11 }) +
          ln(140, 40, 230, 80, { c: "a", w: 2 }) + ln(140, 70, 230, 110, { c: "b", w: 2 }) + tx(185, 125, "parallel", { a: "middle" }) + tx(185, 140, "b₁ = k b₂", { a: "middle", s: 11 }) +
          `<path d="M260 50H330V105H260Z M290 25H360V80H290Z M260 50L290 25 M330 50L360 25 M330 105L360 80 M260 105L290 80" fill="none" stroke="var(--fig-muted)" stroke-dasharray="3 3"/>` +
          ln(260, 50, 330, 50, { c: "a", w: 2.6 }) + ln(360, 25, 360, 80, { c: "b", w: 2.6 }) + tx(310, 125, "skew", { a: "middle" }) + tx(310, 140, "not parallel, never meet", { a: "middle", s: 11 }) + "</svg>" },
    ],
    frames: [
      { title: "Sketch y = sec x (or cosec / cot) with asymptotes and state the range", star: true, paper: "P1", where: "Paper 1 · 4–5 marks · no GDC",
        q: "(a) Sketch the graph of y = sec x for −π ≤ x ≤ π, showing any asymptotes and the coordinates of any turning points. (b) State the range of y = sec x. (c) Solve sec x = 2 for −π ≤ x ≤ π.",
        marks: [["A1", "branch between −π/2 and π/2 opening upwards with minimum (0, 1)"], ["A1", "vertical __asymptotes__ x = −π/2 and x = π/2 shown (dashed)"], ["A1", "outer branches below the axis, ending at (−π, −1) and (π, −1)"], ["A1", "range y ≤ −1 or y ≥ 1"], ["A1", "cos x = ½ ⇒ x = ±π/3"]],
        diagram: { title: "y = sec x for −π ≤ x ≤ π", x: [-3.4, 3.4], y: [-4.5, 4.5], xLabel: "x", yLabel: "y", grid: false, curves: branches((x) => 1 / Math.cos(x), [-PI / 2, PI / 2], -PI - 0.02, PI + 0.02, "a"), vlines: [{ x: -PI / 2, label: "x = −π/2" }, { x: PI / 2, label: "x = π/2" }], points: [{ at: [0, 1], label: "(0, 1)" }, { at: [-PI, -1], label: "(−π, −1)" }, { at: [PI, -1], label: "(π, −1)" }] },
        model: "(a) sec x = 1/cos x: where cos x = 0 (x = ±π/2) there are vertical asymptotes. Between them cos x ∈ (0, 1] so sec x ≥ 1 with minimum (0, 1). For π/2 < |x| ≤ π, cos x ∈ [−1, 0) so sec x ≤ −1, reaching (±π, −1). (b) y ≤ −1 or y ≥ 1. (c) cos x = 1/2, x = −π/3 or π/3.",
        accept: "range written as ]−∞, −1] ∪ [1, ∞[; asymptotes labelled by equation",
        reject: "curve crossing an asymptote; branches touching the x-axis; range −1 ≤ y ≤ 1 (that is cos x)",
        tip: "先畫 cos x 做輔助線：cos x = 0 嘅位就係 sec x 嘅漸近線；cos x 最大/最小 (±1) 嘅位就係 sec x 嘅轉向點。" },
      { title: "Sketch y = arcsin x and y = arccos x; find where they meet", paper: "P1", where: "Paper 1 · 4–5 marks",
        q: "(a) On the same axes sketch y = arcsin x and y = arccos x, stating the coordinates of their end points. (b) Find the exact coordinates of the point of intersection.",
        marks: [["A1", "arcsin: increasing from (−1, −π/2) through O to (1, π/2)"], ["A1", "arccos: decreasing from (−1, π) to (1, 0) through (0, π/2)"], ["A1", "both drawn __only for −1 ≤ x ≤ 1__"], ["M1", "arcsin x = arccos x ⇒ sin θ = cos θ with θ ∈ [0, π/2] ⇒ θ = π/4"], ["A1", "(√2/2, π/4)"]],
        diagram: { title: "arcsin x (accent) and arccos x (blue) meet at (√2/2, π/4)", x: [-1.6, 1.6], y: [-1.8, 3.4], xLabel: "x", yLabel: "y", grid: false, curves: [{ f: Math.asin, domain: [-1, 1], color: "a" }, { f: Math.acos, domain: [-1, 1], color: "b" }], points: [{ at: [Math.SQRT1_2, PI / 4], label: "(√2/2, π/4)" }, { at: [-1, PI], label: "(−1, π)" }, { at: [1, PI / 2], label: "(1, π/2)" }, { at: [-1, -PI / 2], label: "(−1, −π/2)" }] },
        model: "(a) arcsin: domain [−1, 1], range [−π/2, π/2], end points (−1, −π/2), (1, π/2). arccos: domain [−1, 1], range [0, π], end points (−1, π), (1, 0). (b) Let θ = arcsin x = arccos x. Then x = sin θ = cos θ, so tan θ = 1 and θ = π/4; x = sin(π/4) = √2/2. Point (√2/2, π/4).",
        accept: "1/√2 for √2/2; use of arcsin x + arccos x = π/2 giving 2 arcsin x = π/2",
        reject: "graphs extended beyond x = ±1; arccos drawn through the origin",
        tip: "Inverse trig 嘅 domain 同 range 係互換：arcsin 範圍 [−π/2, π/2]、arccos [0, π]、arctan (−π/2, π/2) 開區間，有水平漸近線。" },
      { title: "Sketch a transformed arctan graph with its asymptotes", paper: "P1", where: "Paper 1 · 3–4 marks",
        q: "Sketch y = 2 arctan(x − 1) for x ∈ ℝ, stating the equations of the asymptotes and the coordinates of the point where the curve crosses the x-axis.",
        marks: [["A1", "increasing S-shape through (1, 0)"], ["A1", "horizontal asymptotes y = π and y = −π"], ["A1", "curve approaches but never reaches the asymptotes; y-intercept −π/2 indicated or consistent"]],
        diagram: { title: "y = 2 arctan(x − 1): asymptotes y = ±π, through (1, 0) and (0, −π/2)", x: [-6, 8], y: [-4, 4], xLabel: "x", yLabel: "y", grid: false, curves: [{ f: (x) => 2 * Math.atan(x - 1), domain: [-6, 8], color: "a" }], hlines: [{ y: PI, label: "y = π" }, { y: -PI, label: "y = −π" }], points: [{ at: [1, 0], label: "(1, 0)" }, { at: [0, -PI / 2], label: "(0, −π/2)" }] },
        model: "Horizontal translation 1 right and vertical stretch factor 2 of y = arctan x. Asymptotes y = ±2 × π/2 = ±π. Crosses the x-axis at (1, 0); y-intercept 2 arctan(−1) = −π/2.",
        accept: "asymptotes drawn dashed and labelled", reject: "vertical asymptotes; asymptotes y = ±π/2 (stretch not applied)",
        tip: "arctan 冇垂直漸近線，只有水平：y = a arctan(...) + d 嘅漸近線係 y = d ± aπ/2。" },
    ],
    concepts: [
      { h: "Graphs of reciprocal and inverse trig functions (sketch facts)", b: "<p><strong>sec x</strong>: asymptotes where cos x = 0, period 2π, range y ≤ −1 or y ≥ 1, turning points where cos x = ±1. <strong>cosec x</strong>: asymptotes at x = kπ, period 2π, same range. <strong>cot x</strong>: asymptotes at x = kπ, zeros at π/2 + kπ, period π, always decreasing. <strong>arcsin</strong>: [−1, 1] → [−π/2, π/2], odd. <strong>arccos</strong>: [−1, 1] → [0, π], decreasing. <strong>arctan</strong>: ℝ → (−π/2, π/2), horizontal asymptotes y = ±π/2. Each inverse graph is the reflection in y = x of the restricted trig graph. Useful identity: arcsin x + arccos x = π/2.</p>" },
    ],
  },

  // ======================= 4.1-4.4, 4.10 Statistics =======================
  "math-9": {
    diagrams: [
      { title: "Strong positive linear correlation (r close to +1)", x: [0, 10.5], y: [0, 10.5], xLabel: "x", yLabel: "y", grid: false,
        points: [[1, 1.6], [1.8, 2.1], [2.5, 3.2], [3.1, 3.0], [3.9, 4.5], [4.6, 4.4], [5.2, 5.9], [6.0, 5.8], [6.8, 7.1], [7.5, 7.0], [8.3, 8.4], [9.1, 8.9]].map((p) => ({ at: p })) },
      { title: "Strong negative linear correlation (r close to −1)", x: [0, 10.5], y: [0, 10.5], xLabel: "x", yLabel: "y", grid: false,
        points: [[1, 9.2], [1.7, 8.4], [2.6, 8.1], [3.2, 7.0], [4.0, 6.6], [4.8, 5.5], [5.5, 5.3], [6.1, 4.2], [7.0, 3.8], [7.7, 2.9], [8.4, 2.5], [9.2, 1.4]].map((p) => ({ at: p })) },
      { title: "No correlation (r close to 0)", x: [0, 10.5], y: [0, 10.5], xLabel: "x", yLabel: "y", grid: false,
        points: [[1, 5.2], [1.6, 8.3], [2.4, 2.1], [3.1, 6.7], [3.7, 3.9], [4.5, 9.0], [5.2, 1.6], [5.8, 5.9], [6.6, 7.8], [7.2, 3.1], [8.1, 6.2], [8.8, 2.6], [9.4, 8.6]].map((p) => ({ at: p })) },
      { title: "Clear non-linear relationship but r ≈ 0: r only measures LINEAR correlation", x: [0, 10.5], y: [0, 10.5], xLabel: "x", yLabel: "y", grid: false,
        points: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({ at: [x, 9.6 - 0.45 * (x - 5) ** 2 + (x % 2 ? 0.3 : -0.3)] })) },
      { title: "Frequency histogram (equal class widths, no gaps, continuous scale)", x: [0, 55], y: [0, 17], xLabel: "t (min)", yLabel: "frequency", grid: true,
        lines: [[0, 10, 4], [10, 20, 9], [20, 30, 15], [30, 40, 8], [40, 50, 4]].flatMap(([a, b, f]) => [{ from: [a, 0], to: [a, f] }, { from: [a, f], to: [b, f] }, { from: [b, f], to: [b, 0] }]) },
      { title: "Cumulative frequency curve (n = 80): read Q₁, median, Q₃ at n/4, n/2, 3n/4", x: [0, 105], y: [0, 88], xLabel: "x", yLabel: "cf", grid: false,
        curves: [{ f: (x) => 80 / (1 + Math.exp(-(x - 50) / 9)) - 80 / (1 + Math.exp(50 / 9)), domain: [0, 100], color: "a" }],
        lines: [{ from: [0, 20], to: [40.3, 20], dash: true, color: "b" }, { from: [40.3, 20], to: [40.3, 0], dash: true, color: "b", label: "Q₁", labelAt: "start" }, { from: [0, 40], to: [50.1, 40], dash: true, color: "b" }, { from: [50.1, 40], to: [50.1, 0], dash: true, color: "b", label: "median", labelAt: "start" }, { from: [0, 60], to: [60, 60], dash: true, color: "b" }, { from: [60, 60], to: [60, 0], dash: true, color: "b", label: "Q₃", labelAt: "start" }],
        texts: [{ at: [2, 22], text: "20" }, { at: [2, 42], text: "40" }, { at: [2, 62], text: "60" }] },
    ],
    figures: [
      { title: "Anatomy of a box-and-whisker diagram", caption: "Outlier: below Q₁ − 1.5 × IQR or above Q₃ + 1.5 × IQR. The whisker stops at the largest (smallest) value that is NOT an outlier; outliers are marked with a cross.",
        svg: open(380, 175, "Labelled box and whisker diagram") + `<rect x="120" y="55" width="76" height="36" fill="var(--fig-a)" fill-opacity=".15" stroke="currentColor" stroke-width="1.6"/>` +
          ln(158, 55, 158, 91, { w: 2.4, c: "b" }) + ln(63, 73, 120, 73) + ln(196, 73, 272, 73) + ln(63, 63, 63, 83) + ln(272, 63, 272, 83) + ln(310, 30, 310, 105, { c: "d", dash: true, w: 1.2 }) +
          `<path d="M334 69l9 9m0 -9l-9 9" stroke="currentColor" stroke-width="1.8"/>` +
          tx(63, 47, "min", { a: "middle", s: 11 }) + tx(120, 47, "Q₁", { a: "middle", s: 11 }) + tx(158, 47, "median", { a: "middle", s: 11, c: "b" }) + tx(196, 47, "Q₃", { a: "middle", s: 11 }) + tx(262, 52, "max non-outlier", { a: "middle", s: 11 }) + tx(345, 61, "outlier", { a: "middle", s: 11 }) +
          tx(306, 24, "Q₃ + 1.5·IQR", { a: "middle", s: 11, c: "d" }) + ln(120, 100, 196, 100, { w: 1 }) + ln(120, 96, 120, 104, { w: 1 }) + ln(196, 96, 196, 104, { w: 1 }) + tx(158, 114, "IQR = Q₃ − Q₁", { a: "middle", s: 11 }) +
          ln(25, 140, 360, 140, { w: 1.2 }) + [0, 5, 10, 15, 20, 25, 30, 35].map((v) => ln(25 + v * 9.5, 136, 25 + v * 9.5, 144, { w: 1 }) + tx(25 + v * 9.5, 158, v, { a: "middle", s: 11 })).join("") +
          tx(190, 172, "Here: Q₁ = 10, Q₃ = 18, IQR = 8, upper fence 30, so 33 is an outlier", { a: "middle", s: 11 }) + "</svg>" },
      { title: "Shape of a distribution and its box plot (skewness)", caption: "Positive skew: tail to the right, median nearer Q₁, longer right whisker, mean > median. Negative skew is the mirror image.",
        svg: open(380, 168, "Symmetric and skewed distributions with box plots") +
          skewPanel(5, (u) => Math.exp(-(((u - 0.5) / 0.15) ** 2) / 2), [0.1, 0.4, 0.5, 0.6, 0.9], ["symmetric", "mean ≈ median"]) +
          skewPanel(132, (u) => (u / 0.22) * Math.exp(1 - u / 0.22), [0.04, 0.17, 0.29, 0.46, 0.95], ["positive skew", "mean > median"]) +
          skewPanel(259, (u) => ((1 - u) / 0.22) * Math.exp(1 - (1 - u) / 0.22), [0.05, 0.54, 0.71, 0.83, 0.96], ["negative skew", "mean < median"]) + "</svg>" },
      { title: "Regression line passes through the mean point (x̄, ȳ)", caption: "Use y on x to predict y from x and x on y to predict x from y; both lines pass through (x̄, ȳ). Only interpolate.",
        svg: G({ label: "Scatter with regression line through mean point", x: [0, 10], y: [0, 10], xl: "x", yl: "y", O: true,
          dots: [[1, 2.2], [2, 2.6], [3, 4.1], [4, 4.0], [5, 5.6], [6, 5.9], [7, 7.3], [8, 7.6], [9, 9.0]].map((p) => ({ p, c: "b" })).concat([{ p: [5, 5.37], c: "d" }]),
          curves: [{ f: (x) => 0.85 * x + 1.12, d: [0.5, 9.6], c: "a" }], vl: [{ x: 5, from: 0, to: 5.37 }], hl: [{ y: 5.37, from: 0, to: 5 }],
          texts: [{ p: [5, 5.37], t: "(x̄, ȳ)", dx: 6, dy: 14, c: "d" }, { p: [7.6, 8.2], t: "y = ax + b", c: "a", dx: -40 }, { p: [9.6, 0.4], t: "interpolate within 1 ≤ x ≤ 9", a: "end" }] }) },
    ],
    frames: [
      { title: "Draw a cumulative frequency graph from a grouped table", star: true, paper: "P1", where: "Paper 1 / 2 · 4–5 marks · graph paper given",
        q: "The heights, h cm, of 60 plants are: 140 < h ≤ 150: 6; 150 < h ≤ 160: 14; 160 < h ≤ 170: 22; 170 < h ≤ 180: 13; 180 < h ≤ 190: 5. (a) Write down the cumulative frequencies. (b) Draw the cumulative frequency graph. (c) Use it to estimate the median height.",
        marks: [["A1", "cumulative frequencies 6, 20, 42, 55, 60"], ["A1", "points plotted at the __upper class boundaries__ (150, 6), (160, 20), (170, 42), (180, 55), (190, 60)"], ["A1", "curve (or line segments) starting at (140, 0), axes labelled with scale"], ["(M1)", "reading across from 30"], ["A1", "median ≈ 164.5 cm"]],
        diagram: { title: "Cumulative frequency of 60 plant heights; median read at 30", x: [135, 195], y: [0, 65], xLabel: "h (cm)", yLabel: "cf", grid: true,
          lines: [[140, 0, 150, 6], [150, 6, 160, 20], [160, 20, 170, 42], [170, 42, 180, 55], [180, 55, 190, 60]].map(([a, b, c, d]) => ({ from: [a, b], to: [c, d] })).concat([{ from: [135, 30], to: [164.5, 30], dash: true, color: "b" }, { from: [164.5, 30], to: [164.5, 0], dash: true, color: "b", label: "≈164.5", labelAt: "start" }]),
          points: [[140, 0], [150, 6], [160, 20], [170, 42], [180, 55], [190, 60]].map((p) => ({ at: p })) },
        model: "(a) 6, 20, 42, 55, 60. (b) Plot (140, 0), (150, 6), (160, 20), (170, 42), (180, 55), (190, 60) and join with a smooth increasing curve. (c) n/2 = 30; reading across from 30 gives h ≈ 164.5 cm (between 160 and 170).",
        accept: "a smooth curve or straight line segments; median 163–166 if read from a curve",
        reject: "points plotted at mid-interval values (155, 165, …); curve not starting at (140, 0); bar chart",
        tip: "累積頻數一定畫喺每組嘅「上限」(upper boundary)，同埋要由第一組下限、頻數 0 開始。" },
      { title: "Compare two distributions using parallel box plots", star: true, paper: "P2", where: "Paper 2 · 4–5 marks",
        q: "Test scores: Class A has min 32, Q₁ 45, median 58, Q₃ 66, max 80; Class B has min 40, Q₁ 52, median 61, Q₃ 70, max 92. (a) Draw both box plots on the same scale. (b) Compare the two distributions.",
        marks: [["A1", "both boxes and whiskers correct on one common scale"], ["A1", "medians marked at 58 and 61"], ["R1", "Class B has the __higher median__ (61 > 58), so B generally scored higher"], ["R1", "Class A has the larger __IQR__ (21 vs 18), so A's middle 50% is more spread out"]],
        svg: open(380, 150, "Parallel box plots of two classes") +
          [[32, 45, 58, 66, 80, 30, "A"], [40, 52, 61, 70, 92, 80, "B"]].map(([a, b, c, d, e, y, n]) => { const X = (v) => 20 + (v - 30) * 5.5; return tx(10, y + 22, n, { b: true }) + `<rect x="${X(b)}" y="${y + 8}" width="${X(d) - X(b)}" height="26" fill="var(--fig-a)" fill-opacity=".15" stroke="currentColor" stroke-width="1.5"/>` + ln(X(c), y + 8, X(c), y + 34, { c: "b", w: 2.4 }) + ln(X(a), y + 21, X(b), y + 21) + ln(X(d), y + 21, X(e), y + 21) + ln(X(a), y + 14, X(a), y + 28) + ln(X(e), y + 14, X(e), y + 28); }).join("") +
          ln(20, 128, 370, 128, { w: 1.2 }) + [30, 40, 50, 60, 70, 80, 90].map((v) => ln(20 + (v - 30) * 5.5, 124, 20 + (v - 30) * 5.5, 132, { w: 1 }) + tx(20 + (v - 30) * 5.5, 145, v, { a: "middle", s: 11 })).join("") + "</svg>",
        model: "(b) The median score of Class B (61) is higher than that of Class A (58), so on average Class B performed better. The IQR of Class A (66 − 45 = 21) is greater than that of Class B (70 − 52 = 18), so the middle half of Class A's scores is more spread out (although B has the larger range, 52 vs 48).",
        accept: "comparison of range as well as IQR; any valid comparison of a measure of centre AND a measure of spread, in context",
        reject: "listing values without comparing; \"B is better\" with no statistic quoted; comparing only maxima",
        tip: "比較兩組數據：一句講中心 (median)、一句講分佈 (IQR)，每句都要有數字同埋 context（例如「分數」）。" },
      { title: "Draw a frequency histogram", paper: "P1", where: "Paper 1 · 2–3 marks",
        q: "The times, t minutes, of 40 runners are: 0 ≤ t < 10: 4; 10 ≤ t < 20: 9; 20 ≤ t < 30: 15; 30 ≤ t < 40: 8; 40 ≤ t < 50: 4. Draw a frequency histogram.",
        marks: [["A1", "continuous horizontal scale with labelled axes (t, frequency)"], ["A1", "five bars of equal width touching each other (__no gaps__)"], ["A1", "heights 4, 9, 15, 8, 4"]],
        diagram: { title: "Histogram of 40 running times", x: [0, 55], y: [0, 17], xLabel: "t (min)", yLabel: "frequency", grid: true, lines: [[0, 10, 4], [10, 20, 9], [20, 30, 15], [30, 40, 8], [40, 50, 4]].flatMap(([a, b, f]) => [{ from: [a, 0], to: [a, f] }, { from: [a, f], to: [b, f] }, { from: [b, f], to: [b, 0] }]) },
        model: "Horizontal axis t from 0 to 50 with a continuous scale, vertical axis frequency 0 to 15. Adjacent bars on [0, 10), [10, 20), … with heights 4, 9, 15, 8, 4. The distribution is roughly symmetric with modal class 20 ≤ t < 30.",
        accept: "bars shaded or outlined", reject: "gaps between bars (bar chart); bars centred on mid-points labelled as categories",
        tip: "Histogram = 連續數據，棒與棒之間冇空隙；AA 只考等組距，所以高度 = 頻數。" },
    ],
    concepts: [
      { h: "Reading shape from graphs: histograms, box plots and skew", b: "<p>Histograms are for continuous data: adjacent bars, no gaps (AA uses equal class widths, so height = frequency). A <strong>positively skewed</strong> distribution has a long tail to the right: on the box plot the median is nearer Q₁ and the right whisker is longer, and usually mean &gt; median. Negative skew is the reverse. For skewed data or data with outliers, the median and IQR are better summaries than the mean and standard deviation. Box plots drawn on the same scale are used to compare data sets: compare a centre (median) and a spread (IQR or range), in context.</p>" },
    ],
  },

  // ======================= 4.5-4.6, 4.11 Probability =======================
  "math-10": {
    figures: [
      { title: "Two-set Venn diagram: the four regions", caption: "n(A ∪ B) = n(A) + n(B) − n(A ∩ B) and P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Fill the overlap first.",
        svg: (() => { const P = vennPaths(95, 165, 85, 55); return open(260, 165, "Two set Venn diagram regions") + `<path d="${P.lens}" fill="var(--fig-a)" fill-opacity=".25"/>` + `<rect x="10" y="10" width="240" height="145" fill="none" stroke="currentColor"/><circle cx="95" cy="85" r="55" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="165" cy="85" r="55" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
          tx(18, 26, "U") + tx(55, 38, "A", { i: true, s: 13 }) + tx(205, 38, "B", { i: true, s: 13 }) + tx(75, 90, "A ∩ B′", { a: "middle", s: 11 }) + tx(130, 90, "A ∩ B", { a: "middle", s: 11 }) + tx(186, 90, "A′ ∩ B", { a: "middle", s: 11 }) + tx(244, 150, "(A ∪ B)′", { a: "end", s: 11 }) + "</svg>"; })() },
      { title: "Shading set notation on Venn diagrams", caption: "A′ is everything outside A. A ∩ B′ is 'A only'. (A ∪ B)′ = A′ ∩ B′ is 'neither'.",
        svg: open(390, 215, "Shaded Venn diagrams") + vennPanel(8, 8, 118, 76, "A∪B") + vennPanel(136, 8, 118, 76, "A∩B") + vennPanel(264, 8, 118, 76, "A′") +
          vennPanel(8, 112, 118, 76, "A∩B′", "A ∩ B′ (A only)") + vennPanel(136, 112, 118, 76, "(A∪B)′", "(A ∪ B)′ neither") + vennPanel(264, 112, 118, 76, "A∪B′") + "</svg>" },
      { title: "Three-set Venn diagram: 8 regions", caption: "Fill from the centre outwards: A∩B∩C first, then each 'pair only' (subtract the centre), then each 'one set only', then the outside.",
        svg: open(300, 235, "Three set Venn diagram") + `<circle cx="150" cy="148" r="62" fill="var(--fig-a)" fill-opacity=".06" stroke="currentColor" stroke-width="1.5"/><circle cx="120" cy="96" r="62" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="180" cy="96" r="62" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
          `<rect x="8" y="8" width="284" height="220" fill="none" stroke="currentColor"/>` + tx(16, 24, "U") + tx(60, 42, "A", { i: true, s: 13 }) + tx(240, 42, "B", { i: true, s: 13 }) + tx(222, 206, "C", { i: true, s: 13 }) +
          tx(88, 90, "A only", { a: "middle", s: 11 }) + tx(212, 90, "B only", { a: "middle", s: 11 }) + tx(150, 186, "C only", { a: "middle", s: 11 }) + tx(150, 72, "A∩B", { a: "middle", s: 11 }) +
          tx(117, 140, "A∩C", { a: "middle", s: 11 }) + tx(183, 140, "B∩C", { a: "middle", s: 11 }) + tx(150, 118, "A∩B∩C", { a: "middle", s: 11, c: "a", b: true }) + tx(286, 222, "none", { a: "end", s: 11 }) + "</svg>" },
      { title: "Mutually exclusive, subset and independent events", caption: "Mutually exclusive: P(A ∩ B) = 0 (disjoint circles). Independence cannot be seen from the picture: test P(A ∩ B) = P(A)P(B) (or P(A | B) = P(A)).",
        svg: open(380, 140, "Mutually exclusive subset and overlapping events") + `<rect x="5" y="8" width="118" height="90" fill="none" stroke="currentColor"/><circle cx="38" cy="53" r="26" fill="none" stroke="currentColor"/><circle cx="90" cy="53" r="26" fill="none" stroke="currentColor"/>` +
          tx(38, 57, "A", { a: "middle", i: true }) + tx(90, 57, "B", { a: "middle", i: true }) + tx(64, 116, "mutually exclusive", { a: "middle", s: 11 }) + tx(64, 131, "P(A∩B) = 0", { a: "middle", s: 11 }) +
          `<rect x="131" y="8" width="118" height="90" fill="none" stroke="currentColor"/><circle cx="190" cy="53" r="38" fill="none" stroke="currentColor"/><circle cx="200" cy="60" r="17" fill="var(--fig-a)" fill-opacity=".2" stroke="currentColor"/>` +
          tx(166, 40, "A", { a: "middle", i: true }) + tx(200, 64, "B", { a: "middle", i: true }) + tx(190, 116, "B ⊂ A", { a: "middle", s: 11 }) + tx(190, 131, "A∩B = B, P(B) ≤ P(A)", { a: "middle", s: 11 }) +
          `<rect x="257" y="8" width="118" height="90" fill="none" stroke="currentColor"/><circle cx="300" cy="53" r="28" fill="none" stroke="currentColor"/><circle cx="332" cy="53" r="28" fill="none" stroke="currentColor"/>` +
          tx(290, 57, "A", { a: "middle", i: true }) + tx(344, 57, "B", { a: "middle", i: true }) + tx(316, 116, "independent?", { a: "middle", s: 11 }) + tx(316, 131, "test P(A∩B) = P(A)P(B)", { a: "middle", s: 11 }) + "</svg>" },
      { title: "Tree diagram: multiply along branches, add the end results", caption: "Second-stage branches are conditional probabilities. Each pair of branches from one point sums to 1. 'Without replacement' changes the second-stage numbers.",
        svg: tree(420, 190, [[22, 95], [140, 50, "A"], [140, 140, "A′"], [262, 25, "B"], [262, 75, "B′"], [262, 115, "B"], [262, 165, "B′"]],
          [[0, 1, "P(A)"], [0, 2, "1 − P(A)"], [1, 3, "P(B | A)"], [1, 4, "P(B′ | A)"], [2, 5, "P(B | A′)"], [2, 6, "P(B′ | A′)"]], "", "Tree diagram",
          tx(282, 29, "P(A ∩ B) = P(A)P(B | A)", { s: 11 }) + tx(282, 79, "P(A ∩ B′)", { s: 11 }) + tx(282, 119, "P(A′ ∩ B)", { s: 11 }) + tx(282, 169, "P(A′ ∩ B′)", { s: 11 }) + `<circle cx="22" cy="95" r="3"/>`) },
      { title: "Sample space diagram: total of two fair dice", caption: "36 equally likely outcomes. P(total = 7) = 6/36 = 1/6 (shaded diagonal).",
        svg: open(250, 240, "Sample space for two dice") + (() => { let s = ""; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const v = r + c + 2; s += `<rect x="${40 + c * 32}" y="${40 + r * 30}" width="32" height="30" fill="${v === 7 ? "var(--fig-a)" : "none"}" fill-opacity=".3" stroke="currentColor" stroke-width=".8"/>` + tx(56 + c * 32, 60 + r * 30, v, { a: "middle" }); }
          for (let i = 0; i < 6; i++) s += tx(56 + i * 32, 32, i + 1, { a: "middle", b: true }) + tx(26, 60 + i * 30, i + 1, { a: "middle", b: true }); return s; })() + tx(136, 14, "die 2", { a: "middle", s: 11 }) + tx(8, 238, "die 1 (rows)", { s: 11 }) + "</svg>" },
    ],
    frames: [
      { title: "Complete a three-set Venn diagram from given totals", star: true, paper: "P1", where: "Paper 1 / 2 · 5–6 marks",
        q: "In a group of 50 students, 22 study Biology (B), 25 Chemistry (C) and 20 Physics (P). 8 study B and C, 7 study B and P, 9 study C and P, and 3 study all three. (a) Complete a Venn diagram. (b) Find the number who study none. (c) Find P(exactly one subject). (d) Find P(P | C).",
        marks: [["(M1)", "starting with 3 in the centre and subtracting it from each pair: 5, 4, 6"], ["A1", "one-subject regions 10 (B), 11 (C), 7 (P)"], ["A1", "none = 50 − 46 = 4"], ["A1", "P(exactly one) = 28/50 = 14/25"], ["M1", "denominator n(C) = 25"], ["A1", "P(P | C) = 9/25"]],
        svg: open(300, 235, "Completed three set Venn diagram") + `<rect x="8" y="8" width="284" height="220" fill="none" stroke="currentColor"/><circle cx="120" cy="96" r="62" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="180" cy="96" r="62" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="150" cy="148" r="62" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
          tx(16, 24, "U = 50") + tx(60, 42, "B", { i: true, s: 13 }) + tx(240, 42, "C", { i: true, s: 13 }) + tx(222, 206, "P", { i: true, s: 13 }) + [[88, 90, 10], [212, 90, 11], [150, 186, 7], [150, 72, 5], [117, 140, 4], [183, 140, 6]].map(([x, y, v]) => tx(x, y, v, { a: "middle", s: 13 })).join("") +
          tx(150, 118, "3", { a: "middle", s: 13, b: true, c: "a" }) + tx(280, 222, "4", { a: "end", s: 13 }) + "</svg>",
        model: "Centre 3. B∩C only = 8 − 3 = 5, B∩P only = 7 − 3 = 4, C∩P only = 9 − 3 = 6. B only = 22 − 5 − 4 − 3 = 10, C only = 25 − 5 − 6 − 3 = 11, P only = 20 − 4 − 6 − 3 = 7. Total in at least one = 46, so none = 4. (c) 10 + 11 + 7 = 28, so 28/50 = 14/25. (d) Of the 25 Chemistry students, 6 + 3 = 9 also do Physics: 9/25.",
        accept: "0.56 and 0.36", reject: "putting 8, 7, 9 in the pair regions without subtracting the centre; denominator 50 in (d)",
        tip: "三圈 Venn：由中間開始填，每個「兩科」區要減走中間嗰個數，最後先計外面。條件概率分母係「已知」嗰個圈嘅總數。" },
      { title: "Shade a region described in set notation", paper: "P1", where: "Paper 1 · 1–2 marks",
        q: "On a Venn diagram showing events A and B in U, shade the region A ∪ B′.",
        marks: [["A1", "all of circle A shaded"], ["A1", "the region outside both circles shaded; B-only region left unshaded"]],
        svg: open(160, 115, "Shaded A union B complement") + vennPanel(10, 8, 140, 85, "A∪B′", "A ∪ B′") + "</svg>",
        model: "B′ is everything outside B; its union with A adds the overlap A ∩ B. So shade everything except the region 'B only' (A′ ∩ B).",
        accept: "any clear shading/hatching", reject: "shading only A ∩ B′; leaving the outside region unshaded",
        tip: "唔肯定就逐個區（4 個）問：呢區喺唔喺 A？喺唔喺 B′？用 ∪ 就係「其中一個成立」就塗。" },
      { title: "Tree diagram without replacement, then a reverse conditional", star: true, paper: "P1", where: "Paper 1 · 5–6 marks",
        q: "A bag has 5 red and 3 blue counters. Two are taken at random without replacement. (a) Draw a tree diagram. (b) Find P(both the same colour). (c) Given that both are the same colour, find the probability that both are red.",
        marks: [["A1", "first-stage branches 5/8 and 3/8"], ["A1", "second-stage branches 4/7, 3/7 and 5/7, 2/7"], ["M1", "(5/8)(4/7) + (3/8)(2/7)"], ["A1", "26/56 = 13/28"], ["M1", "(20/56) ÷ (26/56)"], ["A1", "10/13"]],
        svg: tree(400, 190, [[22, 95], [140, 50, "R"], [140, 140, "B"], [262, 25, "R"], [262, 75, "B"], [262, 115, "R"], [262, 165, "B"]], [[0, 1, "5/8"], [0, 2, "3/8"], [1, 3, "4/7"], [1, 4, "3/7"], [2, 5, "5/7"], [2, 6, "2/7"]], "", "Tree without replacement",
          tx(282, 29, "RR: 20/56", { s: 12, c: "c" }) + tx(282, 79, "RB: 15/56", { s: 12 }) + tx(282, 119, "BR: 15/56", { s: 12 }) + tx(282, 169, "BB: 6/56", { s: 12, c: "c" }) + `<circle cx="22" cy="95" r="3"/>`),
        model: "(b) P(RR) = (5/8)(4/7) = 20/56, P(BB) = (3/8)(2/7) = 6/56, total 26/56 = 13/28. (c) P(RR | same) = (20/56)/(26/56) = 10/13.",
        accept: "0.464, 0.769", reject: "second-stage 5/8 and 3/8 again (that is with replacement)",
        tip: "Without replacement：第二層分母減 1，抽走嗰種顏色分子都減 1。反向條件 = 想要嗰條路 ÷ 所有符合條件嘅路。" },
    ],
    concepts: [
      { h: "Venn diagrams with three sets", b: "<p>A three-set Venn diagram has 8 regions. Always fill from the centre: n(A ∩ B ∩ C), then each pair-only region n(A ∩ B) − n(A ∩ B ∩ C), then each single-set region, then the outside (total minus everything inside). Check with n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C). For P(X | Y) the denominator is the total of the region Y only.</p>" },
    ],
  },

  // ======================= 4.7-4.9, 4.12 Distributions =======================
  "math-11": {
    diagrams: [
      { title: "Normal curve X ~ N(μ, σ²): symmetric about μ; about 68%, 95%, 99.7% within 1, 2, 3 σ", x: [-3.6, 3.6], y: [0, 0.48], xLabel: "x", yLabel: "", grid: false, origin: false, shade: { from: -1, to: 1 },
        curves: [{ f: npdf(0, 1), domain: [-3.6, 3.6], color: "a" }], vlines: [{ x: -2 }, { x: -1 }, { x: 0, label: "μ" }, { x: 1 }, { x: 2 }],
        texts: [{ at: [0, 0.18], text: "68%", anchor: "middle" }, { at: [-1, 0.02], text: "μ−σ", anchor: "middle" }, { at: [1, 0.02], text: "μ+σ", anchor: "middle" }, { at: [-2, 0.02], text: "μ−2σ", anchor: "middle" }, { at: [2, 0.02], text: "μ+2σ", anchor: "middle" }] },
      { title: "Same mean, different σ: larger σ gives a lower, wider curve (total area = 1 for both)", x: [-6, 6], y: [0, 0.45], xLabel: "x", yLabel: "", grid: false, origin: false,
        curves: [{ f: npdf(0, 1), color: "a", label: "σ = 1", labelX: 0.9 }, { f: npdf(0, 2), color: "b", label: "σ = 2", labelX: 2.8 }], vlines: [{ x: 0, label: "μ" }] },
      { title: "Same σ, different means: the curve is translated horizontally", x: [-4, 9], y: [0, 0.45], xLabel: "x", yLabel: "", grid: false, origin: false,
        curves: [{ f: npdf(0, 1), color: "a", label: "μ = 0", labelX: 0.9 }, { f: npdf(5, 1), color: "b", label: "μ = 5", labelX: 5.9 }] },
      { title: "Standard normal Z ~ N(0, 1): P(Z < z) is the area to the LEFT of z (shaded: z = 1.2, area 0.885)", x: [-3.6, 3.6], y: [0, 0.45], xLabel: "z", yLabel: "", grid: false, origin: false, shade: { from: -3.6, to: 1.2 },
        curves: [{ f: npdf(0, 1), color: "a" }], vlines: [{ x: 1.2, label: "z = 1.2" }] },
      { title: "Binomial B(10, 0.2): positively skewed, mode 2, E(X) = np = 2", x: [-0.8, 10.8], y: [0, 0.36], xLabel: "x", yLabel: "P(X = x)", grid: false, origin: false, lines: bars(bin(10, 0.2)), texts: [0, 2, 4, 6, 8, 10].map((k) => ({ at: [k, -0.025], text: String(k), anchor: "middle" })) },
      { title: "Binomial B(10, 0.5): symmetric about E(X) = 5", x: [-0.8, 10.8], y: [0, 0.3], xLabel: "x", yLabel: "P(X = x)", grid: false, origin: false, lines: bars(bin(10, 0.5), "b"), texts: [0, 2, 4, 6, 8, 10].map((k) => ({ at: [k, -0.02], text: String(k), anchor: "middle" })) },
    ],
    figures: [
      { title: "Normal areas: left tail, right tail, between - and inverse normal", caption: "Draw the curve, mark μ and the value(s), shade the region. Inverse normal: give the area to the LEFT (or set the tail on the GDC).",
        svg: open(390, 120, "Three shaded normal curves") + [[0, "P(X < a)", -9, -0.5, "", "a"], [130, "P(X > b)", 0.8, 9, "b", ""], [260, "P(a < X < b)", -0.7, 1, "a", "b"]].map(([ox, cap, a, b, na, nb]) => {
          const X = (z) => ox + 63 + z * 19, Y = (y) => 90 - y * 170; let d = "", f = "";
          for (let i = 0; i <= 60; i++) { const z = -3.2 + (6.4 * i) / 60; d += (i ? "L" : "M") + X(z).toFixed(1) + " " + Y(npdf(0, 1)(z)).toFixed(1); }
          const lo = Math.max(a, -3.2), hi = Math.min(b, 3.2); for (let i = 0; i <= 30; i++) { const z = lo + ((hi - lo) * i) / 30; f += "L" + X(z).toFixed(1) + " " + Y(npdf(0, 1)(z)).toFixed(1); }
          return `<path d="M${X(lo).toFixed(1)} 90${f}L${X(hi).toFixed(1)} 90Z" fill="var(--fig-a)" fill-opacity=".35"/><path d="${d}" fill="none" stroke="var(--fig-a)" stroke-width="2"/>` + ln(ox + 2, 90, ox + 124, 90, { w: 1 }) + ln(X(0), 90, X(0), 22, { c: "m", dash: "3 3", w: 1 }) + tx(X(0), 102, "μ", { a: "middle", s: 11 }) +
            (na ? tx(X(a), 102, na, { a: "middle", s: 11, i: true }) : "") + (nb ? tx(X(b), 102, nb, { a: "middle", s: 11, i: true }) : "") + tx(ox + 63, 116, cap, { a: "middle", s: 12 });
        }).join("") + "</svg>" },
    ],
    frames: [
      { title: "Sketch a normal curve, shade the region, then find a probability and an inverse-normal value", star: true, paper: "P2", where: "Paper 2 · 4–5 marks",
        q: "The masses of eggs are X ~ N(70, 8²) grams. (a) Sketch the distribution and shade the region representing P(X > 82). (b) Find P(X > 82). (c) Find k such that P(X < k) = 0.9.",
        marks: [["A1", "bell-shaped curve symmetric about a labelled mean 70"], ["A1", "82 marked to the right of 70 and the __right tail__ shaded"], ["A1", "P(X > 82) = 0.0668"], ["(M1)", "inverse normal with area 0.9 to the left"], ["A1", "k = 80.3 g"]],
        svg: G({ label: "N(70, 8²) with P(X > 82) shaded", x: [42, 98], y: [0, 0.056], xl: "mass (g)", yl: "", ax: 42, O: false, curves: [{ f: npdf(70, 8), c: "a" }], fills: [{ f: npdf(70, 8), d: [82, 98], c: "a", op: 0.4 }], vl: [{ x: 70, to: npdf(70, 8)(70) }, { x: 82, to: npdf(70, 8)(82) }], xt: [[70, "70"], [82, "82"]], texts: [{ p: [88, 0.012], t: "0.0668", c: "a" }] }),
        model: "(b) P(X > 82) = 0.0668 (GDC normalcdf with lower 82, upper 10⁹⁹, μ = 70, σ = 8). (c) invNorm(0.9, 70, 8) = 80.25…, k ≈ 80.3 g.",
        accept: "0.0668072…; k = 80.25", reject: "shading the left side; standard deviation 64 entered into the GDC",
        tip: "Sketch 要有：鐘形、μ 喺中間、數值標喺正確嗰邊、塗啱區域。Inverse normal 要諗清楚畀嘅係「左邊」定「右邊」面積。" },
    ],
  },

  // ======================= AHL 4.13-4.14 Bayes and continuous RVs =======================
  "math-h5": {
    diagrams: [
      { title: "Continuous uniform pdf on [2, 6]: f(x) = 1/4; mean = median = 4, no unique mode", x: [0, 8], y: [0, 0.4], xLabel: "x", yLabel: "f(x)", grid: false,
        lines: [{ from: [2, 0.25], to: [6, 0.25] }, { from: [2, 0], to: [2, 0.25], dash: true }, { from: [6, 0], to: [6, 0.25], dash: true }, { from: [0, 0], to: [2, 0], color: "a" }, { from: [6, 0], to: [8, 0], color: "a" }], texts: [{ at: [4, 0.28], text: "f(x) = 1/4", anchor: "middle" }, { at: [2, 0.015], text: "2", anchor: "end" }, { at: [6, 0.015], text: "6" }] },
      { title: "f(x) = 2x on [0, 1]: mode at the end point x = 1, median 1/√2 ≈ 0.707, mean 2/3", x: [-0.2, 1.4], y: [0, 2.3], xLabel: "x", yLabel: "f(x)", grid: false,
        curves: [{ f: (x) => 2 * x, domain: [0, 1], color: "a" }], vlines: [{ x: 1 }], points: [{ at: [1, 2], label: "mode x = 1" }, { at: [Math.SQRT1_2, 0], label: "median" }] },
      { title: "Symmetric pdf f(x) = (3/4)x(2 − x) on [0, 2]: mode = median = mean = 1 (f′(1) = 0)", x: [-0.3, 2.5], y: [0, 0.95], xLabel: "x", yLabel: "f(x)", grid: false,
        curves: [{ f: (x) => 0.75 * x * (2 - x), domain: [0, 2], color: "a" }], vlines: [{ x: 1, label: "x = 1" }], points: [{ at: [1, 0.75], label: "max (1, 3/4)" }] },
      { title: "Linear transformation: Y = 2X + 1 (blue) - E(Y) = 2E(X) + 1, Var(Y) = 4Var(X); the curve stretches and halves in height", x: [-0.3, 5.6], y: [0, 0.95], xLabel: "x", yLabel: "f", grid: false,
        curves: [{ f: (x) => 0.75 * x * (2 - x), domain: [0, 2], color: "a", label: "X", labelX: 0.6 }, { f: (y) => 0.375 * ((y - 1) / 2) * (2 - (y - 1) / 2), domain: [1, 5], color: "b", label: "Y", labelX: 3.6 }], vlines: [{ x: 1 }, { x: 3 }] },
    ],
    figures: [
      { title: "Positively skewed pdf: mode < median < mean", caption: "f(x) = x e^(−x), x ≥ 0: mode 1 (where f′ = 0), median ≈ 1.68 (half the area each side, shaded = 0.5), mean 2. The mean is pulled towards the long tail.",
        svg: G({ label: "Skewed pdf with mode median mean", x: [0, 6.5], y: [0, 0.44], xl: "x", yl: "f(x)", curves: [{ f: (x) => x * Math.exp(-x), d: [0, 6.5], c: "a" }], fills: [{ f: (x) => x * Math.exp(-x), d: [0, 1.678], c: "a", op: 0.3 }],
          vl: [{ x: 1, to: Math.exp(-1), c: "b" }, { x: 1.678, to: 1.678 * Math.exp(-1.678), c: "c" }, { x: 2, to: 2 * Math.exp(-2), c: "d" }], xt: [[1, "1"], [2, "2"], [4, "4"], [6, "6"]],
          texts: [{ p: [1, 0.4], t: "mode", a: "middle", c: "b" }, { p: [1.678, 0.33], t: "median", dx: 4, c: "c" }, { p: [2.2, 0.27], t: "mean", c: "d" }, { p: [0.95, 0.06], t: "0.5", a: "middle" }] }) },
      { title: "Median and quartiles of a continuous random variable", caption: "∫ from the lower end to m of f(x) dx = 0.5. For Q₁ and Q₃ use 0.25 and 0.75. P(X = a) = 0 so < and ≤ give the same probability.",
        svg: G({ label: "pdf split into quarters", x: [0, 2.3], y: [0, 0.95], xl: "x", yl: "f(x)", curves: [{ f: (x) => 0.75 * x * (2 - x), d: [0, 2], c: "a" }],
          fills: [{ f: (x) => 0.75 * x * (2 - x), d: [0, 0.6527], c: "a", op: 0.15 }, { f: (x) => 0.75 * x * (2 - x), d: [0.6527, 1], c: "a", op: 0.35 }, { f: (x) => 0.75 * x * (2 - x), d: [1, 1.3473], c: "b", op: 0.35 }, { f: (x) => 0.75 * x * (2 - x), d: [1.3473, 2], c: "b", op: 0.15 }],
          xt: [[0.6527, "Q₁"], [1, "m"], [1.3473, "Q₃"], [2, "2"]], texts: [0.38, 0.84, 1.16, 1.62].map((x) => ({ p: [x, 0.12], t: "0.25", a: "middle", s: 11 })) }) },
      { title: "Bayes' theorem on a tree diagram (three causes)", caption: "P(Bᵢ | A) = P(Bᵢ)P(A | Bᵢ) / [P(B₁)P(A | B₁) + P(B₂)P(A | B₂) + P(B₃)P(A | B₃)]: the chosen 'A' path divided by all the 'A' paths.",
        svg: tree(400, 220, [[22, 110], [130, 35, "B₁"], [130, 110, "B₂"], [130, 185, "B₃"], [250, 18, "A"], [250, 52, "A′"], [250, 93, "A"], [250, 127, "A′"], [250, 168, "A"], [250, 202, "A′"]],
          [[0, 1, "P(B₁)"], [0, 2, "P(B₂)"], [0, 3, "P(B₃)"], [1, 4, "P(A|B₁)"], [1, 5, ""], [2, 6, "P(A|B₂)"], [2, 7, ""], [3, 8, "P(A|B₃)"], [3, 9, ""]], "", "Bayes tree",
          tx(270, 22, "P(B₁)P(A|B₁)", { s: 11, c: "c" }) + tx(270, 97, "P(B₂)P(A|B₂)", { s: 11, c: "c" }) + tx(270, 172, "P(B₃)P(A|B₃)", { s: 11, c: "c" }) + tx(270, 214, "sum of green = P(A)", { s: 11 }) + `<circle cx="22" cy="110" r="3"/>`) },
    ],
    frames: [
      { title: "Sketch a pdf, then find k, the mode, the median and compare with the mean", star: true, paper: "P2", where: "Paper 1 / 2 · 6–8 marks",
        q: "X has pdf f(x) = k(4 − x²) for 0 ≤ x ≤ 2, and 0 otherwise. (a) Find k. (b) Sketch y = f(x). (c) Write down the mode. (d) Find the median m. (e) Given E(X) = 3/4, comment on the shape of the distribution.",
        marks: [["M1", "k∫₀² (4 − x²) dx = 1 ⇒ k(16/3) = 1"], ["A1", "k = 3/16"], ["A1", "sketch: decreasing curve from (0, 3/4) to (2, 0), zero outside [0, 2]"], ["A1", "mode = 0"], ["M1", "(3/16)(4m − m³/3) = 0.5"], ["A1", "m = 0.695"], ["R1", "mode < median < mean, so the distribution is __positively skewed__"]],
        svg: G({ label: "pdf k(4 − x²) with median shaded", x: [-0.3, 2.6], y: [0, 0.9], xl: "x", yl: "f(x)", curves: [{ f: (x) => (3 / 16) * (4 - x * x), d: [0, 2], c: "a" }, { f: () => 0, d: [2, 2.5], c: "a" }], fills: [{ f: (x) => (3 / 16) * (4 - x * x), d: [0, 0.6946], c: "a", op: 0.3 }],
          dots: [{ p: [0, 0.75], c: "a" }], xt: [[0.6946, "m"], [2, "2"]], yt: [[0.75, "3/4"]], vl: [{ x: 0.75, to: (3 / 16) * (4 - 0.5625), c: "d" }], texts: [{ p: [0.32, 0.25], t: "0.5", a: "middle" }, { p: [0.75, 0.73], t: "mean", c: "d", dx: 4 }] }),
        model: "(a) ∫₀² (4 − x²) dx = 8 − 8/3 = 16/3, so k = 3/16. (b) Downward parabola section from (0, 3/4) to (2, 0). (c) f is decreasing on [0, 2], so the mode is 0. (d) ∫₀ᵐ (3/16)(4 − x²) dx = 0.5 ⇒ m³ − 12m + 8 = 0 ⇒ m = 0.695 (GDC, root in [0, 2]). (e) mode 0 < median 0.695 < mean 0.75: positively skewed.",
        accept: "m = 0.6946", reject: "mode = 3/4 (that is the maximum VALUE of f, not the x-value); roots of the cubic outside [0, 2]",
        tip: "Mode 係令 f(x) 最大嘅 x 值（可以喺端點），唔係 f 嘅最大值。Median 解方程要揀喺定義域入面嗰個根。" },
    ],
  },

  // ======================= 5.1-5.3, 5.6-5.8 Differentiation =======================
  "math-12": {
    diagrams: [
      { title: "Secants PQ approach the tangent at P(1, 1) on y = x²: gradient → f′(1) = 2", x: [-0.5, 2.6], y: [-1.2, 5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => x * x, domain: [-0.5, 2.2], color: "a" }, { f: (x) => 2 * x - 1, domain: [-0.1, 2.5], color: "b", label: "tangent", labelX: 2.3 }, { f: (x) => 3 * x - 2, domain: [0.2, 2.3], color: "muted", dash: true }, { f: (x) => 2.5 * x - 1.5, domain: [0.1, 2.4], color: "muted", dash: true }],
        points: [{ at: [1, 1], label: "P" }, { at: [2, 4], label: "Q₁ (m = 3)" }, { at: [1.5, 2.25], label: "Q₂ (m = 2.5)" }] },
      { title: "f(x) = x³ − 3x (accent) and f′(x) = 3x² − 3 (blue): f′ = 0 at the turning points, f′ < 0 where f decreases", x: [-2.6, 2.6], y: [-4, 6], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => x ** 3 - 3 * x, color: "a", label: "f", labelX: 2.15 }, { f: (x) => 3 * x * x - 3, color: "b", label: "f′", labelX: 1.6 }], vlines: [{ x: -1 }, { x: 1 }], points: [{ at: [-1, 2], label: "max" }, { at: [1, -2], label: "min" }, { at: [-1, 0] }, { at: [1, 0] }] },
      { title: "f(x) = x³ − 3x and f″(x) = 6x (green): f″ = 0 and changes sign at the point of inflexion (0, 0)", x: [-2.6, 2.6], y: [-6, 6], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => x ** 3 - 3 * x, color: "a", label: "f", labelX: 2.2 }, { f: (x) => 6 * x, domain: [-1, 1], color: "c", label: "f″", labelX: 0.7 }],
        points: [{ at: [0, 0], label: "inflexion" }], texts: [{ at: [-2.3, -5], text: "concave down (f″ < 0)" }, { at: [0.3, 5], text: "concave up (f″ > 0)" }] },
      { title: "Tangent and normal to y = x² at (1, 1): tangent y = 2x − 1, normal y = −x/2 + 3/2 (gradients multiply to −1)", x: [-1, 3], y: [-0.3, 2.4], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => x * x, domain: [-1, 1.55], color: "a" }, { f: (x) => 2 * x - 1, domain: [0.4, 1.7], color: "b", label: "tangent", labelX: 1.45 }, { f: (x) => -x / 2 + 1.5, domain: [-0.8, 2.8], color: "c", label: "normal", labelX: 2.3 }], points: [{ at: [1, 1] }] },
      { title: "Stationary point of inflexion: y = x³ at O has f′(0) = 0 but f′ does not change sign (f′ = 3x² ≥ 0)", x: [-2, 2], y: [-4, 6], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => x ** 3, color: "a", label: "x³", labelX: 1.5 }, { f: (x) => 3 * x * x, domain: [-1.4, 1.4], color: "b", dash: true, label: "f′ = 3x²", labelX: 0.75 }], points: [{ at: [0, 0] }] },
      { title: "d/dx sin x = cos x: the gradient of sin x (accent) at each x equals the value of cos x (blue)", x: [-0.3, 6.6], y: [-1.5, 1.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.sin, color: "a", label: "sin x", labelX: 1.2 }, { f: Math.cos, color: "b", label: "cos x", labelX: 5.6 }], vlines: [{ x: PI / 2, label: "π/2" }, { x: 1.5 * PI, label: "3π/2" }] },
      { title: "d/dx ln x = 1/x: ln x (accent) is increasing with decreasing gradient; d/dx eˣ = eˣ (blue)", x: [-2, 4], y: [-2.5, 5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.log, domain: [0.05, 4], color: "a", label: "ln x", labelX: 3.2 }, { f: (x) => 1 / x, domain: [0.2, 4], color: "a", dash: true, label: "1/x", labelX: 3.3 }, { f: Math.exp, domain: [-2, 1.6], color: "b", label: "eˣ", labelX: 1.3 }], points: [{ at: [1, 0] }, { at: [0, 1] }] },
    ],
    figures: [
      { title: "Sign diagram for f′(x) = (x + 1)(x − 3)", caption: "Put the zeros of f′ in order; test the sign of each factor in each interval. + then − gives a maximum, − then + a minimum.",
        svg: signTable(390, "Sign table for derivative", ["x < −1", "−1", "−1 < x < 3", "3", "x > 3"], [["x + 1", "−", "0", "+", "+", "+"], ["x − 3", "−", "−", "−", "0", "+"], ["f′(x)", "+", "0", "−", "0", "+"], ["f(x)", "↗", "max", "↘", "min", "↗"]], 64, 62) },
      { title: "First-derivative test: nature of a stationary point", caption: "A stationary point of inflexion has f′ = 0 with NO change of sign. Second-derivative test: f″ < 0 max, f″ > 0 min, f″ = 0 inconclusive.",
        svg: open(390, 125, "Four types of stationary point") + [[0, "M10 70Q45 5 80 70", "local max", "+ 0 −"], [97, "M10 25Q45 90 80 25", "local min", "− 0 +"], [194, "M10 80C25 45 35 45 45 45C55 45 65 45 80 10", "inflexion (rising)", "+ 0 +"], [291, "M10 10C25 45 35 45 45 45C55 45 65 45 80 80", "inflexion (falling)", "− 0 −"]].map(([ox, d, t, sg]) =>
          `<g transform="translate(${ox + 5} 4)"><path d="${d}" fill="none" stroke="var(--fig-a)" stroke-width="2.2"/><circle cx="45" cy="${t === "local max" ? 37.5 : t === "local min" ? 57.5 : 45}" r="3"/></g>` + tx(ox + 50, 104, t, { a: "middle", s: 11 }) + tx(ox + 50, 119, "f′: " + sg, { a: "middle", s: 11 })).join("") + "</svg>" },
      { title: "Optimisation set-up: open box from a square sheet", caption: "Cut squares of side x from each corner of an a × a sheet: V = x(a − 2x)² for 0 < x < a/2. Solve dV/dx = 0 and justify the maximum.",
        svg: open(380, 180, "Open box optimisation", "ar-m12-1") + `<rect x="20" y="20" width="140" height="140" fill="var(--fig-fill)" stroke="currentColor"/>` + [[20, 20], [135, 20], [20, 135], [135, 135]].map(([x, y]) => `<rect x="${x}" y="${y}" width="25" height="25" fill="none" stroke="var(--fig-d)" stroke-dasharray="4 3"/>`).join("") +
          tx(32, 15, "x", { a: "middle", i: true, c: "d" }) + tx(12, 36, "x", { a: "middle", i: true, c: "d" }) + ln(45, 172, 135, 172, { w: 1, ar: "ar-m12-1" }) + ln(135, 172, 45, 172, { w: 1, ar: "ar-m12-1" }) + tx(90, 168, "a − 2x", { a: "middle", s: 11 }) + tx(90, 95, "a", { a: "middle", i: true }) +
          `<path d="M210 130L300 130L350 100L260 100Z" fill="var(--fig-a)" fill-opacity=".15" stroke="currentColor"/><path d="M210 130V80H300V130 M300 80L350 50V100 M210 80L260 50H350" fill="none" stroke="currentColor"/><path d="M260 100V50" stroke="currentColor" stroke-dasharray="3 3"/>` +
          tx(196, 108, "x", { i: true, c: "d" }) + tx(255, 146, "a − 2x", { a: "middle", s: 11 }) + tx(340, 130, "a − 2x", { s: 11 }) + tx(280, 30, "V = x(a − 2x)²", { a: "middle", s: 13, b: true }) + "</svg>" },
      { title: "Optimisation set-up: closed cylinder", caption: "Use the constraint to eliminate h, e.g. V = πr²h fixed ⇒ h = V/(πr²) ⇒ A(r) = 2πr² + 2V/r, then solve A′(r) = 0.",
        svg: open(300, 170, "Cylinder optimisation", "ar-m12-2") + `<ellipse cx="90" cy="35" rx="55" ry="14" fill="var(--fig-fill)" stroke="currentColor"/><path d="M35 35V135A55 14 0 0 0 145 135V35" fill="none" stroke="currentColor"/><path d="M35 135A55 14 0 0 1 145 135" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>` +
          ln(90, 35, 143, 35, { c: "a", w: 1.6 }) + tx(116, 30, "r", { a: "middle", i: true, c: "a" }) + ln(160, 37, 160, 133, { w: 1, ar: "ar-m12-2" }) + ln(160, 133, 160, 37, { w: 1, ar: "ar-m12-2" }) + tx(168, 90, "h", { i: true, c: "a" }) +
          tx(185, 60, "V = πr²h", { s: 13 }) + tx(185, 85, "A = 2πr² + 2πrh", { s: 12 }) + tx(185, 108, "(open top: πr² + 2πrh)", { s: 11 }) + "</svg>" },
    ],
    frames: [
      { title: "Sketch the graph of f′ from the graph of f", star: true, paper: "P1", where: "Paper 1 · 3–4 marks · graph of f given",
        q: "The graph of f(x) = x³ − 3x has a local maximum at (−1, 2), a local minimum at (1, −2) and a point of inflexion at (0, 0). On the same axes sketch the graph of y = f′(x).",
        marks: [["A1", "f′ crosses the x-axis at x = −1 and x = 1 (the __stationary points__ of f)"], ["A1", "f′ < 0 for −1 < x < 1 and f′ > 0 outside"], ["A1", "minimum of f′ at x = 0 (the __inflexion__ of f)"], ["A1", "parabola shape, symmetric about x = 0"]],
        diagram: { title: "f (accent) and f′ (blue): zeros of f′ at the turning points of f; minimum of f′ at the inflexion", x: [-2.6, 2.6], y: [-4, 6], xLabel: "x", yLabel: "y", grid: false, curves: [{ f: (x) => x ** 3 - 3 * x, color: "a", label: "f" , labelX: 2.15 }, { f: (x) => 3 * x * x - 3, color: "b", label: "f′", labelX: 1.6 }], points: [{ at: [-1, 0] }, { at: [1, 0] }, { at: [0, -3], label: "(0, −3)" }] },
        model: "Stationary points of f at x = ±1 become the x-intercepts of f′. f decreases between them, so f′ is negative there; f increases outside, so f′ is positive. The inflexion of f at x = 0 is where the gradient is least, so f′ has its minimum there (f′(0) = −3). f′ is a quadratic opening upwards.",
        accept: "minimum value not labelled if the shape and x-position are correct", reject: "f′ with turning points at x = ±1; f′ crossing the axis at x = 0",
        tip: "f 嘅「轉向點」→ f′ 嘅「零點」；f 嘅「拐點」→ f′ 嘅「轉向點」；f 上升嘅地方 f′ 喺 x 軸上面。" },
      { title: "Sketch a curve from given derivative information", paper: "P1", where: "Paper 1 · 4 marks",
        q: "A cubic f satisfies f′(1) = f′(5) = 0, f′(x) > 0 for x < 1 and x > 5, f′(x) < 0 for 1 < x < 5, f″(3) = 0, f(1) = 6, f(5) = −2 and f(0) = 4.25. Sketch y = f(x), labelling the turning points and the point of inflexion.",
        marks: [["A1", "local maximum at (1, 6) and local minimum at (5, −2)"], ["A1", "increasing before 1 and after 5, decreasing between"], ["A1", "point of inflexion at x = 3 (at (3, 2), midway for a cubic) where concavity changes"], ["A1", "y-intercept 4.25"]],
        diagram: { title: "f(x) = x³/4 − 9x²/4 + 15x/4 + 17/4: max (1, 6), inflexion (3, 2), min (5, −2)", x: [-1, 7], y: [-5, 9], xLabel: "x", yLabel: "y", grid: false, curves: [{ f: (x) => x ** 3 / 4 - (9 * x * x) / 4 + (15 * x) / 4 + 17 / 4, domain: [-0.8, 6.8], color: "a" }], points: [{ at: [1, 6], label: "max (1, 6)" }, { at: [3, 2], label: "inflexion (3, 2)" }, { at: [5, -2], label: "min (5, −2)" }, { at: [0, 4.25], label: "4.25" }] },
        model: "f′ changes from + to − at x = 1 (maximum (1, 6)) and from − to + at x = 5 (minimum (5, −2)). f″(3) = 0 with concave down for x < 3 and concave up for x > 3, giving the inflexion at x = 3. The curve passes through (0, 4.25).",
        accept: "inflexion at x = 3 shown without its y-value", reject: "a smooth curve with corners at the turning points; the maximum lower than the minimum",
        tip: "由導數資料畫圖：先標 turning points，再用 f′ 正負決定升跌，用 f″ 決定彎向 (concave up/down)。" },
    ],
    concepts: [
      { h: "Reading f, f′ and f″ from each other's graphs", b: "<p>Stationary points of f ↔ zeros of f′. f increasing ↔ f′ &gt; 0 (graph of f′ above the x-axis). Points of inflexion of f ↔ turning points of f′ ↔ zeros of f″ where f″ changes sign. <strong>Concave up</strong> (f″ &gt; 0): gradient increasing, curve lies above its tangents. <strong>Concave down</strong> (f″ &lt; 0): gradient decreasing. A stationary point of inflexion has f′ = 0 with no change of sign of f′ (e.g. y = x³ at O). f″ = 0 alone does not prove an inflexion (e.g. y = x⁴ at O is a minimum).</p>" },
    ],
  },

  // ======================= 5.4-5.5, 5.10-5.11 Integration =======================
  "math-13": {
    diagrams: [
      { title: "Family of antiderivatives F(x) + C: ∫2x dx = x² + C - same gradient at each x, shifted vertically", x: [-2.6, 2.6], y: [-3, 7], xLabel: "x", yLabel: "y", grid: false,
        curves: [-2, 0, 2, 4].map((c, i) => ({ f: (x) => x * x + c, color: ["muted", "a", "b", "c"][i], label: `C = ${c}`, labelX: 2 - 0.3 * i })) },
    ],
    figures: [
      { title: "Definite integral = area between the curve and the x-axis (curve above the axis)", caption: "Area = ∫ₐᵇ f(x) dx = F(b) − F(a) when f(x) ≥ 0 on [a, b]. Here ∫₀⁴ (4x − x²) dx = 32/3.",
        svg: G({ label: "Area under a curve", x: [-0.5, 5], y: [-0.8, 5], xl: "x", yl: "y", curves: [{ f: (x) => 4 * x - x * x, d: [-0.3, 4.4], c: "a" }], fills: [{ f: (x) => 4 * x - x * x, d: [0, 4], c: "a", op: 0.28 }], xt: [[4, "4"]], texts: [{ p: [2, 1.6], t: "A = 32/3", a: "middle" }, { p: [3.3, 4.2], t: "y = 4x − x²", c: "a" }] }) },
      { title: "Region below the x-axis gives a negative integral", caption: "f(x) = x(x − 1)(x − 3): ∫₀¹ f = 5/12 (above), ∫₁³ f = −8/3 (below). Area = 5/12 + 8/3 = 37/12, but ∫₀³ f = −9/4. On a GDC use ∫|f(x)| dx.",
        svg: G({ label: "Region above and below the axis", x: [-0.4, 3.5], y: [-2.4, 1.4], xl: "x", yl: "y", curves: [{ f: (x) => x * (x - 1) * (x - 3), d: [-0.25, 3.35], c: "a" }], fills: [{ f: (x) => x * (x - 1) * (x - 3), d: [0, 1], c: "c" }, { f: (x) => x * (x - 1) * (x - 3), d: [1, 3], c: "d" }], xt: [[1, "1"], [3, "3"]],
          texts: [{ p: [0.5, 0.25], t: "+", a: "middle", s: 14 }, { p: [2, -0.8], t: "− (negative integral)", a: "middle" }] }) },
      { title: "Area between two curves = ∫ (upper − lower) dx between the intersections", caption: "y = 4 − x² and y = x + 2 meet at x = −2 and x = 1: A = ∫₋₂¹ (4 − x² − (x + 2)) dx = 9/2. Position relative to the x-axis does not matter.",
        svg: G({ label: "Area between two curves", x: [-3, 2.3], y: [-1.5, 5], xl: "x", yl: "y", curves: [{ f: (x) => 4 - x * x, d: [-2.4, 2.2], c: "a" }, { f: (x) => x + 2, d: [-2.9, 2], c: "b" }], fills: [{ f: (x) => 4 - x * x, g: (x) => x + 2, d: [-2, 1], c: "a", op: 0.3 }],
          dots: [{ p: [-2, 0] }, { p: [1, 3] }], texts: [{ p: [1.4, 1.2], t: "y = 4 − x²", c: "a" }, { p: [1.2, 4.3], t: "y = x + 2", c: "b" }, { p: [-2, 0], t: "(−2, 0)", dx: -6, dy: 14, a: "end" }, { p: [1, 3], t: "(1, 3)", dx: 6, dy: -6 }] }) },
      { title: "Curves that cross: split at each intersection (or integrate |f − g|)", caption: "sin x and cos x cross at π/4: area from 0 to π/2 = ∫₀^(π/4)(cos x − sin x) dx + ∫_(π/4)^(π/2)(sin x − cos x) dx = 2√2 − 2.",
        svg: G({ label: "Crossing curves", x: [-0.2, 2], y: [-0.3, 1.25], xl: "x", yl: "y", curves: [{ f: Math.sin, d: [0, 1.9], c: "a" }, { f: Math.cos, d: [0, 1.9], c: "b" }], fills: [{ f: Math.cos, g: Math.sin, d: [0, PI / 4], c: "b", op: 0.25 }, { f: Math.sin, g: Math.cos, d: [PI / 4, PI / 2], c: "a", op: 0.25 }],
          vl: [{ x: PI / 2, from: 0, to: 1 }], xt: [[PI / 4, "π/4"], [PI / 2, "π/2"]], texts: [{ p: [1.62, 1.04], t: "sin x", c: "a" }, { p: [1.62, 0.18], t: "cos x", c: "b" }] }) },
      { title: "Area as the limit of a sum of rectangles", caption: "Left-endpoint rectangles under an increasing curve underestimate the area; as the width → 0 the sum → ∫ₐᵇ f(x) dx.",
        svg: G({ label: "Rectangles under a curve", x: [-0.3, 4.6], y: [-0.4, 9.5], xl: "x", yl: "y", curves: [{ f: (x) => 0.5 * x * x + 1, d: [0, 4.1], c: "a" }],
          polys: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].map((a) => ({ pts: [[a, 0], [a, 0.5 * a * a + 1], [a + 0.5, 0.5 * a * a + 1], [a + 0.5, 0]], close: true, c: "b", fc: "b", op: 0.18, w: 1 })), xt: [[4, "b"]], texts: [{ p: [1.6, 6.5], t: "y = f(x)", c: "a" }] }) },
    ],
    frames: [
      { title: "Shade the region and find its area when part is below the axis", star: true, paper: "P1", where: "Paper 1 · 6–7 marks",
        q: "Let f(x) = x³ − 4x² + 3x. (a) Find the x-intercepts. (b) Sketch y = f(x) for 0 ≤ x ≤ 3 and shade the region enclosed by the curve and the x-axis. (c) Find the total area of the shaded region.",
        marks: [["A1", "x(x − 1)(x − 3) = 0 ⇒ x = 0, 1, 3"], ["A1", "cubic sketch, above the axis on (0, 1) and below on (1, 3)"], ["M1", "splitting the integral at x = 1"], ["A1", "∫₀¹ f dx = 5/12"], ["A1", "∫₁³ f dx = −8/3"], ["A1", "area = 5/12 + 8/3 = 37/12"]],
        svg: G({ label: "Shaded regions of a cubic", x: [-0.4, 3.5], y: [-2.4, 1.4], xl: "x", yl: "y", curves: [{ f: (x) => x * (x - 1) * (x - 3), d: [-0.25, 3.35], c: "a" }], fills: [{ f: (x) => x * (x - 1) * (x - 3), d: [0, 1], c: "c" }, { f: (x) => x * (x - 1) * (x - 3), d: [1, 3], c: "d" }], xt: [[1, "1"], [3, "3"]], texts: [{ p: [0.5, 0.2], t: "5/12", a: "middle" }, { p: [2, -0.8], t: "8/3", a: "middle" }] }),
        model: "(a) f(x) = x(x − 1)(x − 3), so x = 0, 1, 3. (c) F(x) = x⁴/4 − 4x³/3 + 3x²/2. ∫₀¹ f = 1/4 − 4/3 + 3/2 = 5/12. ∫₁³ f = F(3) − F(1) = −9/4 − 5/12 = −8/3. Total area = 5/12 + 8/3 = 37/12 (≈ 3.08).",
        accept: "37/12 ≈ 3.08; −∫₁³ f dx written as the area", reject: "∫₀³ f dx = −9/4 given as the area; a negative area",
        tip: "面積一定係正數！曲線過 x 軸就要喺交點斬開，x 軸下面嗰part 取絕對值再加。" },
      { title: "Area enclosed between two curves (find the limits first)", paper: "P1", where: "Paper 1 · 5–6 marks",
        q: "The curves y = 4 − x² and y = x + 2 intersect at A and B. (a) Find the x-coordinates of A and B. (b) Write down an integral for the area enclosed between the curves and evaluate it.",
        marks: [["M1", "4 − x² = x + 2 ⇒ x² + x − 2 = 0"], ["A1", "x = −2, x = 1"], ["M1", "∫₋₂¹ [(4 − x²) − (x + 2)] dx (upper − lower)"], ["A1", "[2x − x²/2 − x³/3] from −2 to 1"], ["A1", "area = 9/2"]],
        svg: G({ label: "Region between parabola and line", x: [-3, 2.3], y: [-1.5, 5], xl: "x", yl: "y", curves: [{ f: (x) => 4 - x * x, d: [-2.4, 2.2], c: "a" }, { f: (x) => x + 2, d: [-2.9, 2], c: "b" }], fills: [{ f: (x) => 4 - x * x, g: (x) => x + 2, d: [-2, 1], c: "a", op: 0.3 }], dots: [{ p: [-2, 0] }, { p: [1, 3] }], texts: [{ p: [-2, 0], t: "A", dx: -12, dy: -4 }, { p: [1, 3], t: "B", dx: 6, dy: -6 }] }),
        model: "(a) (x + 2)(x − 1) = 0 so x = −2, 1. (b) On (−2, 1) the parabola is above the line, so A = ∫₋₂¹ (2 − x − x²) dx = [2x − x²/2 − x³/3]₋₂¹ = 7/6 − (−10/3) = 9/2.",
        accept: "4.5", reject: "(x + 2) − (4 − x²) giving −9/2 reported as the area; limits 0 to 1",
        tip: "兩曲線之間嘅面積：上面減下面，上下限係交點；同 x 軸位置冇關。" },
    ],
  },

  // ======================= 5.9 Kinematics =======================
  "math-14": {
    diagrams: [
      { title: "s = t³ − 6t² + 9t (accent), v = 3(t − 1)(t − 3) (blue), a = 6t − 12 (green): v = 0 at the turning points of s; a = 0 at the minimum of v", x: [0, 4.6], y: [-13, 13], xLabel: "t", yLabel: "", grid: false,
        curves: [{ f: (t) => t ** 3 - 6 * t * t + 9 * t, domain: [0, 4.3], color: "a", label: "s", labelX: 4.1 }, { f: (t) => 3 * t * t - 12 * t + 9, domain: [0, 4.3], color: "b", label: "v", labelX: 3.8 }, { f: (t) => 6 * t - 12, domain: [0, 4.3], color: "c", label: "a", labelX: 3.4 }],
        vlines: [{ x: 1, label: "t = 1" }, { x: 2 }, { x: 3, label: "t = 3" }] },
      { title: "Speeding up when v and a have the same sign (shaded: 1 < t < 2 and t > 3)", x: [0, 4.6], y: [-13, 13], xLabel: "t", yLabel: "", grid: false, shade: { from: 1, to: 2 },
        curves: [{ f: (t) => 3 * t * t - 12 * t + 9, domain: [0, 4.3], color: "b", label: "v", labelX: 4.0 }, { f: (t) => 6 * t - 12, domain: [0, 4.3], color: "c", label: "a", labelX: 3.4 }], vlines: [{ x: 3 }], texts: [{ at: [3.6, -8], text: "also t > 3" }] },
    ],
    figures: [
      { title: "Velocity–time graph: area = displacement, gradient = acceleration", caption: "v = 8 − 2t: area above the axis (0 ≤ t ≤ 4) = 16, below (4 ≤ t ≤ 6) = 4. Displacement = 16 − 4 = 12; distance = 16 + 4 = 20.",
        svg: G({ label: "Velocity time graph areas", x: [-0.3, 7], y: [-5.5, 9.5], xl: "t", yl: "v", curves: [{ f: (t) => 8 - 2 * t, d: [0, 6], c: "a" }], fills: [{ f: (t) => 8 - 2 * t, d: [0, 4], c: "c" }, { f: (t) => 8 - 2 * t, d: [4, 6], c: "d" }], xt: [[4, "4"], [6, "6"]], yt: [[8, "8"], [-4, "−4"]],
          texts: [{ p: [1.3, 2.3], t: "+16", a: "middle", s: 13 }, { p: [5.2, -1.6], t: "−4", a: "middle", s: 13 }, { p: [2.2, 6.6], t: "gradient = a = −2", c: "a" }] }) },
      { title: "Speed and distance: graph of |v|", caption: "Distance travelled = ∫ |v| dt = area under the |v| graph (reflect the parts below the axis). Speed = |v|.",
        svg: G({ label: "Graph of absolute velocity", x: [-0.3, 7], y: [-1, 9.5], xl: "t", yl: "|v|", curves: [{ f: (t) => Math.abs(8 - 2 * t), d: [0, 6], c: "a" }], fills: [{ f: (t) => Math.abs(8 - 2 * t), d: [0, 6], c: "a", op: 0.22 }], xt: [[4, "4"], [6, "6"]], texts: [{ p: [3.2, 6], t: "distance = 16 + 4 = 20" }] }) },
      { title: "Motion of the particle along a line, s = t³ − 6t² + 9t (0 ≤ t ≤ 4)", caption: "At rest (v = 0) at t = 1 (s = 4) and t = 3 (s = 0): it changes direction each time. Distance = 4 + 4 + 4 = 12; final displacement = 4.",
        svg: open(390, 160, "Particle path on a line", "ar-m14-1") + ln(100, 40, 316, 40, { c: "a", w: 2, ar: "ar-m14-1" }) + ln(320, 70, 104, 70, { c: "b", w: 2, ar: "ar-m14-1" }) + ln(100, 100, 316, 100, { c: "c", w: 2, ar: "ar-m14-1" }) +
          `<circle cx="100" cy="40" r="3"/><circle cx="320" cy="40" r="3"/><circle cx="100" cy="70" r="3"/><circle cx="320" cy="100" r="3"/>` + tx(100, 30, "t = 0", { a: "middle", s: 11 }) + tx(320, 30, "t = 1, v = 0", { a: "middle", s: 11 }) + tx(94, 74, "t = 3, v = 0", { a: "end", s: 11 }) + tx(326, 104, "t = 4", { s: 11 }) +
          ln(80, 132, 385, 132, { w: 1.2 }) + [0, 1, 2, 3, 4, 5].map((v) => ln(100 + v * 55, 128, 100 + v * 55, 136, { w: 1 }) + tx(100 + v * 55, 150, v, { a: "middle", s: 11 })).join("") + tx(30, 150, "s (m)", { i: true }) + "</svg>" },
      { title: "Sign table for v and a: at rest, direction, speeding up/slowing down", caption: "Speeding up when v and a have the same sign; slowing down when opposite. Maximum speed in 1 < t < 3 at t = 2 where a = 0.",
        svg: signTable(400, "Sign table for velocity and acceleration", ["(0, 1)", "1", "(1, 2)", "2", "(2, 3)", "3", "t &gt; 3"], [["v", "+", "0", "−", "−", "−", "0", "+"], ["a", "−", "−", "−", "0", "+", "+", "+"], ["motion", "slows", "rest", "speeds", "max", "slows", "rest", "speeds"]], 48, 56) },
    ],
    frames: [
      { title: "Sketch v against t, find when at rest, and the distance travelled", star: true, paper: "P2", where: "Paper 2 · 5–6 marks",
        q: "A particle moves with v(t) = t² − 5t + 4 m s⁻¹ for 0 ≤ t ≤ 5. (a) Sketch the graph of v against t. (b) Find when the particle is at rest. (c) Find the total distance travelled and the displacement.",
        marks: [["A1", "parabola through (0, 4), (1, 0), (4, 0), (5, 4) with minimum at (2.5, −2.25)"], ["A1", "at rest at t = 1 and t = 4"], ["(M1)", "∫₀⁵ |v| dt or splitting at t = 1 and t = 4"], ["A1", "distance = 49/6 ≈ 8.17 m"], ["A1", "displacement = −5/6 ≈ −0.833 m"]],
        svg: G({ label: "v = t² − 5t + 4", x: [-0.3, 5.8], y: [-3, 5], xl: "t", yl: "v", curves: [{ f: (t) => t * t - 5 * t + 4, d: [0, 5], c: "a" }], fills: [{ f: (t) => t * t - 5 * t + 4, d: [0, 1], c: "c" }, { f: (t) => t * t - 5 * t + 4, d: [1, 4], c: "d" }, { f: (t) => t * t - 5 * t + 4, d: [4, 5], c: "c" }], xt: [[1, "1"], [4, "4"], [5, "5"]], yt: [[4, "4"]], dots: [{ p: [2.5, -2.25] }], texts: [{ p: [2.5, -2.25], t: "(2.5, −2.25)", dy: 14, a: "middle" }] }),
        model: "(b) (t − 1)(t − 4) = 0 ⇒ t = 1 s and t = 4 s. (c) ∫₀¹ v = 11/6, ∫₁⁴ v = −9/2, ∫₄⁵ v = 11/6. Distance = 11/6 + 9/2 + 11/6 = 49/6 ≈ 8.17 m. Displacement = ∫₀⁵ v dt = −5/6 m.",
        accept: "8.17 m from fnInt(|v|); −0.833 m", reject: "∫₀⁵ v dt given as the distance; distance negative",
        tip: "Distance 用 ∫|v|dt，displacement 用 ∫v dt；sketch 要標 v = 0 嘅時間同埋起點終點。" },
      { title: "Describe the motion from a displacement–time graph", paper: "P1", where: "Paper 1 · 3–4 marks",
        q: "The displacement of a particle is s = t³ − 6t² + 9t for 0 ≤ t ≤ 4 (graph given). (a) Write down the times when the particle is at rest. (b) State the time intervals when it moves in the negative direction. (c) Find the total distance travelled.",
        marks: [["R1", "at rest where the gradient of the s–t graph is 0: t = 1 and t = 3"], ["A1", "negative direction for 1 < t < 3 (s decreasing)"], ["M1", "|s(1) − s(0)| + |s(3) − s(1)| + |s(4) − s(3)|"], ["A1", "4 + 4 + 4 = 12"]],
        diagram: { title: "s = t³ − 6t² + 9t: at rest at t = 1 and t = 3", x: [0, 4.4], y: [-1, 5.5], xLabel: "t", yLabel: "s", grid: false, curves: [{ f: (t) => t ** 3 - 6 * t * t + 9 * t, domain: [0, 4], color: "a" }], points: [{ at: [1, 4], label: "(1, 4)" }, { at: [3, 0], label: "(3, 0)" }, { at: [4, 4], label: "(4, 4)" }] },
        model: "(a) v = ds/dt = 3(t − 1)(t − 3) = 0 at t = 1, 3. (b) s decreases for 1 < t < 3. (c) s(0) = 0, s(1) = 4, s(3) = 0, s(4) = 4: distance = 4 + 4 + 4 = 12 (displacement only 4).",
        accept: "using ∫₀⁴ |v| dt = 12", reject: "distance = s(4) − s(0) = 4",
        tip: "s–t 圖：斜率 = 速度；水平切線 = 靜止；向下 = 負方向。距離要逐段加，唔可以直接終點減起點。" },
    ],
    concepts: [
      { h: "Reading motion graphs", b: "<p><strong>s–t graph</strong>: gradient = velocity; horizontal tangent = at rest; decreasing = moving in the negative direction. <strong>v–t graph</strong>: gradient = acceleration; signed area = displacement; area of |v| = distance; crossing the t-axis = change of direction. <strong>a–t graph</strong>: signed area = change in velocity. Maximum or minimum velocity occurs where a = 0 (or at an end point).</p>" },
    ],
  },

  // ======================= AHL 5.12-5.19 Further calculus =======================
  "math-h4": {
    diagrams: [
      { title: "Euler's method for dy/dx = y, y(0) = 1, h = 0.5: estimate 5.06 vs true y(2) = e² ≈ 7.39 (underestimate: curve concave up)", x: [-0.2, 2.4], y: [0, 8], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.exp, domain: [0, 2.05], color: "a", label: "y = eˣ", labelX: 1.7 }],
        lines: [[0, 1, 0.5, 1.5], [0.5, 1.5, 1, 2.25], [1, 2.25, 1.5, 3.375], [1.5, 3.375, 2, 5.0625]].map(([a, b, c, d]) => ({ from: [a, b], to: [c, d], color: "b" })),
        points: [[0, 1], [0.5, 1.5], [1, 2.25], [1.5, 3.375], [2, 5.0625]].map((p) => ({ at: p, color: "b" })).concat([{ at: [2, Math.exp(2)], label: "e²" }]) },
      { title: "Maclaurin approximations of sin x: x (green), x − x³/6 (blue), x − x³/6 + x⁵/120 (dashed) - better near 0 with more terms", x: [-4.5, 4.5], y: [-2.5, 2.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.sin, color: "a" }, { f: (x) => x, color: "c" }, { f: (x) => x - x ** 3 / 6, color: "b" }, { f: (x) => x - x ** 3 / 6 + x ** 5 / 120, color: "muted", dash: true }] },
      { title: "Maclaurin approximations of eˣ: 1 + x (green), 1 + x + x²/2 (blue)", x: [-2.5, 2.5], y: [-1, 7], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: Math.exp, color: "a", label: "eˣ", labelX: 1.7 }, { f: (x) => 1 + x, color: "c" }, { f: (x) => 1 + x + x * x / 2, color: "b" }], points: [{ at: [0, 1] }] },
      { title: "Continuous but not differentiable: y = |x − 1| + 1 has a corner at x = 1 (left gradient −1, right gradient +1)", x: [-2, 4], y: [-0.5, 4.5], xLabel: "x", yLabel: "y", grid: false,
        curves: [{ f: (x) => Math.abs(x - 1) + 1, domain: [-2, 4], color: "a" }], points: [{ at: [1, 1], label: "(1, 1)" }] },
    ],
    figures: [
      { title: "Volume of revolution about the x-axis", caption: "Each slice is a disc of radius y and thickness δx: V = π∫ₐᵇ y² dx. Between two curves (washer): V = π∫ₐᵇ (y₁² − y₂²) dx.",
        svg: G({ label: "Solid of revolution about x axis", x: [-0.3, 5], y: [-2.6, 2.6], xl: "x", yl: "y", O: false, curves: [{ f: Math.sqrt, d: [1, 4], c: "a" }, { f: (x) => -Math.sqrt(x), d: [1, 4], c: "a", dash: true }], fills: [{ f: Math.sqrt, d: [1, 4], c: "a", op: 0.2 }],
          raw: (X, Y) => `<ellipse cx="${X(1)}" cy="${Y(0)}" rx="5" ry="${(Y(-1) - Y(0)).toFixed(1)}" fill="none" stroke="currentColor" stroke-dasharray="3 3"/><ellipse cx="${X(4)}" cy="${Y(0)}" rx="9" ry="${(Y(-2) - Y(0)).toFixed(1)}" fill="none" stroke="currentColor"/>` +
            `<ellipse cx="${X(2.5)}" cy="${Y(0)}" rx="7" ry="${(Y(-Math.sqrt(2.5)) - Y(0)).toFixed(1)}" fill="var(--fig-b)" fill-opacity=".3" stroke="var(--fig-b)"/>` + ln(X(2.5), Y(0), X(2.5), Y(Math.sqrt(2.5)), { c: "b", w: 1.6 }),
          xt: [[1, "a"], [4, "b"]], texts: [{ p: [2.5, 0.8], t: "y", dx: 4, c: "b" }, { p: [1.6, 2.1], t: "y = f(x)", c: "a" }, { p: [3.1, -2.4], t: "V = π∫ y² dx" }] }) },
      { title: "Volume of revolution about the y-axis", caption: "Rewrite as x in terms of y; horizontal discs of radius x and thickness δy: V = π∫_c^d x² dy, with y-limits.",
        svg: G({ label: "Solid of revolution about y axis", x: [-2.8, 2.8], y: [-0.3, 4.8], xl: "x", yl: "y", curves: [{ f: (x) => x * x, d: [1, 2], c: "a" }, { f: (x) => x * x, d: [-2, -1], c: "a", dash: true }], fills: [{ poly: Array.from({ length: 31 }, (_, i) => { const y = 1 + (3 * i) / 30; return [Math.sqrt(y), y]; }).concat([[0, 4], [0, 1]]), c: "a", op: 0.2 }],
          raw: (X, Y) => `<ellipse cx="${X(0)}" cy="${Y(4)}" rx="${(X(2) - X(0)).toFixed(1)}" ry="7" fill="none" stroke="currentColor"/><ellipse cx="${X(0)}" cy="${Y(1)}" rx="${(X(1) - X(0)).toFixed(1)}" ry="4" fill="none" stroke="currentColor" stroke-dasharray="3 3"/>` +
            `<ellipse cx="${X(0)}" cy="${Y(2.5)}" rx="${(X(Math.sqrt(2.5)) - X(0)).toFixed(1)}" ry="5" fill="var(--fig-b)" fill-opacity=".3" stroke="var(--fig-b)"/>` + ln(X(0), Y(2.5), X(Math.sqrt(2.5)), Y(2.5), { c: "b", w: 1.6 }),
          yt: [[1, "c"], [4, "d"]], texts: [{ p: [0.6, 2.5], t: "x", dy: -5, c: "b" }, { p: [1.6, 1.4], t: "y = x²", c: "a" }, { p: [-2.6, 4.5], t: "V = π∫ x² dy" }] }) },
      { title: "Area between a curve and the y-axis", caption: "A = ∫_c^d x dy with x written in terms of y. Here x = y² from y = 1 to y = 2: A = 7/3.",
        svg: G({ label: "Area with respect to y", x: [-0.5, 4.8], y: [-0.3, 2.6], xl: "x", yl: "y", curves: [{ f: Math.sqrt, d: [0, 4.6], c: "a" }], fills: [{ poly: Array.from({ length: 31 }, (_, i) => { const y = 1 + i / 30; return [y * y, y]; }).concat([[0, 2], [0, 1]]), c: "a", op: 0.3 }],
          hl: [{ y: 1, from: 0, to: 1 }, { y: 2, from: 0, to: 4 }], yt: [[1, "1"], [2, "2"]], texts: [{ p: [3.4, 1.65], t: "x = y²", c: "a" }, { p: [0.9, 1.45], t: "A = ∫₁² y² dy" }] }) },
      { title: "Discontinuities: jump and removable", caption: "f is continuous at a if lim f(x) as x → a exists and equals f(a). Differentiable at a ⇒ continuous at a (not conversely). Open circle = point not included.",
        svg: open(380, 150, "Jump and removable discontinuity") + (() => { const p = (ox) => ln(ox + 10, 120, ox + 170, 120, { w: 1 }) + ln(ox + 20, 130, ox + 20, 15, { w: 1 }); return p(0) + `<path d="M25 110L90 70" stroke="var(--fig-a)" stroke-width="2.2"/><circle cx="90" cy="70" r="3.5" fill="none" stroke="var(--fig-a)" stroke-width="1.5"/><path d="M90 40L160 25" stroke="var(--fig-a)" stroke-width="2.2"/><circle cx="90" cy="40" r="3.5" fill="var(--fig-a)"/>` + ln(90, 120, 90, 25, { c: "m", dash: "3 3", w: 1 }) + tx(90, 134, "a", { a: "middle", i: true, s: 11 }) + tx(95, 147, "jump: left and right limits differ", { a: "middle", s: 11 }) +
          p(195) + `<path d="M220 105Q285 20 355 80" fill="none" stroke="var(--fig-a)" stroke-width="2.2"/><circle cx="285" cy="56.5" r="3.5" fill="var(--fig-fill)" stroke="var(--fig-a)" stroke-width="1.5"/><circle cx="285" cy="95" r="3.5" fill="var(--fig-a)"/>` + ln(285, 120, 285, 60, { c: "m", dash: "3 3", w: 1 }) + tx(285, 134, "a", { a: "middle", i: true, s: 11 }) + tx(290, 147, "removable: limit ≠ f(a)", { a: "middle", s: 11 }); })() + "</svg>" },
      { title: "Related rates: a sliding ladder", caption: "Write the relation for any time (x² + y² = 25), differentiate with respect to t, THEN substitute the instant's values. dy/dt < 0 as the top slides down.",
        svg: open(340, 190, "Ladder against a wall", "ar-mh4-1") + ln(60, 20, 60, 170, { w: 3 }) + ln(40, 170, 320, 170, { w: 3 }) + ln(60, 50, 220, 170, { c: "a", w: 3 }) + `<path d="M60 158H72V170" fill="none" stroke="currentColor"/>` +
          tx(46, 115, "y", { i: true, a: "end" }) + tx(140, 186, "x", { i: true, a: "middle" }) + tx(150, 100, "5 m", { c: "a" }) + ln(228, 160, 280, 160, { w: 1.5, c: "b", ar: "ar-mh4-1" }) + tx(232, 152, "dx/dt", { s: 11, c: "b" }) + ln(74, 40, 74, 80, { w: 1.5, c: "d", ar: "ar-mh4-1" }) + tx(80, 62, "dy/dt", { s: 11, c: "d" }) +
          tx(170, 36, "x² + y² = 25", { s: 13 }) + tx(170, 56, "2x dx/dt + 2y dy/dt = 0", { s: 12 }) + "</svg>" },
      { title: "Implicit differentiation: tangent to a circle", caption: "x² + y² = 25 ⇒ 2x + 2y dy/dx = 0 ⇒ dy/dx = −x/y. At (3, 4): gradient −3/4, tangent y = −3x/4 + 25/4 (perpendicular to the radius).",
        svg: G({ label: "Circle with tangent", w: 300, h: 300, x: [-7, 8], y: [-6.5, 8.5], xl: "x", yl: "y", curves: [{ f: (x) => Math.sqrt(Math.max(0, 25 - x * x)), d: [-5, 5], c: "a", n: 300 }, { f: (x) => -Math.sqrt(Math.max(0, 25 - x * x)), d: [-5, 5], c: "a", n: 300 }, { f: (x) => (-3 * x) / 4 + 25 / 4, d: [-1, 7.5], c: "b" }],
          segs: [{ p: [0, 0], q: [3, 4], c: "m", dash: true }], dots: [{ p: [3, 4] }], texts: [{ p: [3, 4], t: "(3, 4)", dx: 6, dy: -6 }, { p: [5, 2.6], t: "m = −3/4", c: "b" }] }) },
    ],
    frames: [
      { title: "Sketch the region and set up a volume integral (washer)", star: true, paper: "P1", where: "Paper 1 / 2 · 5–6 marks",
        q: "The region R is enclosed by y = √x and y = x/2. (a) Find the points of intersection and sketch R. (b) R is rotated through 2π about the x-axis. Find the exact volume of the solid formed.",
        marks: [["A1", "√x = x/2 ⇒ x = 0, x = 4; points (0, 0) and (4, 2)"], ["A1", "sketch with √x above the line on 0 < x < 4 and R shaded"], ["M1", "V = π∫₀⁴ ((√x)² − (x/2)²) dx (outer² − inner²)"], ["A1", "π[x²/2 − x³/12]₀⁴"], ["A1", "8π/3"]],
        svg: G({ label: "Region between root x and x over 2", x: [-0.4, 5], y: [-0.4, 2.8], xl: "x", yl: "y", curves: [{ f: Math.sqrt, d: [0, 4.8], c: "a" }, { f: (x) => x / 2, d: [0, 4.8], c: "b" }], fills: [{ f: Math.sqrt, g: (x) => x / 2, d: [0, 4], c: "a", op: 0.3 }], dots: [{ p: [4, 2] }], texts: [{ p: [4, 2], t: "(4, 2)", dx: 6, dy: 14 }, { p: [1.2, 1.55], t: "y = √x", c: "a" }, { p: [3.4, 1.25], t: "y = x/2", c: "b" }, { p: [1.6, 1.0], t: "R" }] }),
        model: "(a) x = x²/4 ⇒ x(x − 4) = 0, so (0, 0) and (4, 2). (b) V = π∫₀⁴ (x − x²/4) dx = π[x²/2 − x³/12]₀⁴ = π(8 − 16/3) = 8π/3.",
        accept: "≈ 8.38 if exact not required", reject: "π∫(√x − x/2)² dx (squaring the difference); answer 8π (rotating only the curve)",
        tip: "Washer 係「外半徑² − 內半徑²」，唔係「(外 − 內)²」！先搵交點做上下限。" },
      { title: "Euler's method: estimate, then over- or underestimate?", paper: "P2", where: "Paper 2 · 5–6 marks",
        q: "dy/dx = x + y with y(0) = 1. (a) Use Euler's method with h = 0.1 to estimate y(0.3). (b) The exact solution is y = 2eˣ − x − 1. Find the percentage error. (c) Explain, with reference to the graph, why the estimate is an underestimate.",
        marks: [["M1", "yₙ₊₁ = yₙ + 0.1(xₙ + yₙ)"], ["A1", "y₁ = 1.1, y₂ = 1.22"], ["A1", "y₃ = 1.362"], ["A1", "exact y(0.3) = 1.39972, error ≈ 2.69%"], ["R1", "d²y/dx² = 1 + dy/dx = 1 + x + y > 0, so the curve is __concave up__ and each tangent step lies below the curve"]],
        diagram: { title: "Euler steps (blue) lie below the concave-up solution y = 2eˣ − x − 1", x: [-0.05, 0.36], y: [0.9, 1.45], xLabel: "x", yLabel: "y", grid: false, origin: false, curves: [{ f: (x) => 2 * Math.exp(x) - x - 1, domain: [0, 0.32], color: "a", label: "exact", labelX: 0.12 }], lines: [[0, 1, 0.1, 1.1], [0.1, 1.1, 0.2, 1.22], [0.2, 1.22, 0.3, 1.362]].map(([a, b, c, d]) => ({ from: [a, b], to: [c, d], color: "b" })), points: [{ at: [0, 1] }, { at: [0.1, 1.1], color: "b" }, { at: [0.2, 1.22], color: "b" }, { at: [0.3, 1.362], color: "b", label: "1.362" }] },
        model: "(a) y₁ = 1 + 0.1(0 + 1) = 1.1; y₂ = 1.1 + 0.1(0.1 + 1.1) = 1.22; y₃ = 1.22 + 0.1(0.2 + 1.22) = 1.362. (b) Exact 2e^0.3 − 1.3 = 1.39972; error = (1.39972 − 1.362)/1.39972 × 100 ≈ 2.69%. (c) y″ = 1 + x + y > 0 for these values, so the solution curve is concave up; Euler follows the tangent at the start of each step, which lies below the curve, so it underestimates.",
        accept: "a smaller step size h improves the estimate", reject: "\"because h is too big\" alone as the reason it is an UNDER-estimate",
        tip: "判斷 Euler 偏高定偏低：睇 y″ 嘅正負。concave up (y″ > 0) → 切線喺曲線下面 → 低估。" },
    ],
    concepts: [
      { h: "Geometry behind volumes, Euler's method and differentiability", b: "<p><strong>Volumes</strong>: about the x-axis V = π∫y² dx (x-limits); about the y-axis V = π∫x² dy (y-limits). For a region between two curves use outer² − inner² (washer), never (outer − inner)². <strong>Euler's method</strong> follows tangents: if the solution is concave up (y″ &gt; 0) the estimates are too small; concave down gives overestimates; a smaller h reduces the error. <strong>Differentiability</strong>: f is differentiable at a only if it is continuous there and the left and right derivatives are equal - corners (|x|), cusps, jumps and vertical tangents fail.</p>" },
    ],
  },

  }});
})();
