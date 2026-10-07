/* Mathematics AA - diagrams and graphs to know (original). Topics 1-3 (SL + AHL number/algebra and functions). */
(function () {
  // ---- tiny SVG helpers (currentColor + CSS variables only, so figures work in dark mode and PDF) ----
  const MK = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  const S = (w, h, label, id, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${id ? MK(id) : ""}<g stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.fs || 12}" text-anchor="${o.a || "middle"}" fill="${o.c || "currentColor"}"${o.it ? ' font-style="italic"' : ""}${o.b ? ' font-weight="bold"' : ""}>${s}</text>`;
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c || "currentColor"}" stroke-width="${o.w || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ""}${o.m ? ` marker-end="url(#${o.m})"` : ""}/>`;
  const P = (d, o = {}) => `<path d="${d}" fill="${o.f || "none"}" stroke="${o.c || "currentColor"}" stroke-width="${o.w || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ""}${o.m ? ` marker-end="url(#${o.m})"` : ""}${o.op ? ` fill-opacity="${o.op}"` : ""}/>`;
  const C = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.f || "none"}" stroke="${o.c || "currentColor"}" stroke-width="${o.w || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ""}/>`;
  const DOT = (x, y, c) => C(x, y, 3.2, { f: c || "currentColor", c: c || "currentColor", w: 1 });
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx || 0}" fill="${o.f || "none"}" stroke="${o.c || "currentColor"}" stroke-width="${o.w || 1.5}"${o.op ? ` fill-opacity="${o.op}"` : ""}/>`;
  const A = "var(--fig-a)", B = "var(--fig-b)", G = "var(--fig-c)", D = "var(--fig-d)", M = "var(--fig-muted)", F = "var(--fig-fill)";
  const r1 = (v) => Math.round(v * 10) / 10;
  const pts = (f, ns, color) => ns.map((n) => ({ at: [n, f(n)], color }));

  // ---------- math-1 figures ----------
  const figSumSquare = S(320, 170, "Unit square divided into halves, quarters, eighths: the infinite sum equals 1", "", [
    R(20, 10, 75, 150, { f: A, op: 0.28 }), T(57, 90, "½", { fs: 14 }),
    R(95, 10, 75, 75, { f: B, op: 0.25 }), T(132, 52, "¼", { fs: 14 }),
    R(95, 85, 37.5, 75, { f: G, op: 0.25 }), T(114, 127, "⅛", { fs: 13 }),
    R(132.5, 85, 37.5, 37.5, { f: A, op: 0.18 }), T(151, 108, "1/16", { fs: 11 }),
    R(132.5, 122.5, 18.75, 37.5, { f: B, op: 0.18 }), R(151.25, 122.5, 18.75, 18.75, { f: G, op: 0.18 }),
    R(20, 10, 150, 150, { w: 2 }),
    T(185, 40, "½ + ¼ + ⅛ + … fills", { a: "start" }), T(185, 56, "the whole square:", { a: "start" }),
    T(185, 84, "S∞ = u₁ / (1 − r)", { a: "start", c: A, b: 1 }), T(185, 102, "= ½ / (1 − ½) = 1", { a: "start" }),
    T(185, 130, "valid only because", { a: "start", fs: 11 }), T(185, 145, "|r| = ½ &lt; 1", { a: "start", fs: 11 }),
  ].join(""));

  const figConverge = S(320, 95, "Number line: a geometric series converges for minus 1 less than r less than 1", "", [
    L(15, 50, 305, 50), ...[-2, -1, 0, 1, 2].map((k) => L(160 + 60 * k, 45, 160 + 60 * k, 55) + T(160 + 60 * k, 72, k < 0 ? "−" + -k : String(k))),
    L(100, 50, 220, 50, { c: G, w: 5 }), C(100, 50, 5, { f: "var(--fig-fill)", c: G, w: 2 }), C(220, 50, 5, { f: "var(--fig-fill)", c: G, w: 2 }),
    T(160, 30, "converges: −1 &lt; r &lt; 1", { c: G, b: 1 }), T(50, 30, "diverges", { c: D }), T(270, 30, "diverges", { c: D }),
    T(160, 90, "r", { it: 1 }),
  ].join(""));

  // ---------- math-2 figure ----------
  const figExpLog = S(320, 95, "Exponential and logarithmic forms are equivalent", "ar-m2-1", [
    R(20, 20, 100, 36, { rx: 6, f: F }), T(70, 44, "aˣ = b", { fs: 14 }),
    R(200, 20, 100, 36, { rx: 6, f: F }), T(250, 44, "x = logₐ b", { fs: 14 }),
    L(125, 32, 195, 32, { m: "ar-m2-1" }), L(195, 44, 125, 44, { m: "ar-m2-1" }),
    T(160, 26, "take logₐ", { fs: 11 }), T(160, 60, "exponentiate", { fs: 11 }),
    T(160, 84, "conditions: a > 0, a ≠ 1, b > 0", { fs: 11, c: M }),
  ].join(""));

  // ---------- math-3 figures ----------
  const pascal = (() => {
    let body = "", row = [1];
    for (let n = 0; n <= 6; n++) {
      const y = 26 + n * 25;
      body += T(14, y, "n = " + n, { a: "start", fs: 11, c: M });
      row.forEach((v, k) => { body += T(r1(185 + (k - n / 2) * 36), y, v, { fs: 13, c: n === 4 ? A : "currentColor", b: n === 4 ? 1 : 0 }); });
      row = [1, ...row.slice(1).map((v, i) => v + row[i]), 1];
    }
    body += T(185, 200, "row n gives ⁿC₀, ⁿC₁, …, ⁿCₙ; each entry = sum of the two above", { fs: 10 });
    body += T(185, 216, "row 4: (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴", { fs: 10.5, c: A });
    return S(330, 226, "Pascal's triangle rows 0 to 6", "", body);
  })();

  const figSets = S(320, 170, "Nested number sets N inside Z inside Q inside R", "", [
    R(10, 10, 300, 150, { rx: 10, f: F }), R(25, 30, 220, 120, { rx: 10, f: B, op: 0.1 }), R(40, 50, 140, 85, { rx: 10, f: G, op: 0.12 }), R(55, 70, 70, 50, { rx: 10, f: A, op: 0.18 }),
    T(18, 26, "ℝ real", { a: "start", b: 1 }), T(33, 46, "ℚ rational", { a: "start", b: 1 }), T(48, 66, "ℤ integers", { a: "start", b: 1 }), T(60, 86, "ℕ", { a: "start", b: 1 }),
    T(90, 106, "0, 1, 2, …", { fs: 11 }), T(152, 100, "−3", { fs: 12 }), T(212, 85, "⅔", { fs: 12 }), T(212, 110, "0.25", { fs: 11 }),
    T(277, 70, "√2", { fs: 12 }), T(277, 95, "π, e", { fs: 12 }), T(277, 115, "irrational", { fs: 10, c: M }),
  ].join(""));

  const figProofBlocks = S(320, 175, "Algebraic forms used in deductive proofs", "", [
    R(10, 10, 300, 155, { rx: 6 }), L(150, 10, 150, 165, { c: M, w: 1 }),
    T(80, 30, "Statement", { b: 1 }), T(230, 30, "Write it as (n, m ∈ ℤ)", { b: 1 }), L(10, 38, 310, 38, { c: M, w: 1 }),
    ...[["even number", "2n"], ["odd number", "2n + 1"], ["consecutive integers", "n, n + 1, n + 2"], ["consecutive odd numbers", "2n + 1, 2n + 3"], ["multiple of k", "kn"], ["rational number", "p/q, q ≠ 0"]]
      .map(([a, b], i) => T(80, 58 + i * 20, a, { fs: 11 }) + T(230, 58 + i * 20, b, { fs: 12, c: A })),
  ].join(""));

  // ---------- math-h1 figures ----------
  const figArgand = S(320, 220, "Argand diagram of z = 3 + 2i, its modulus, argument and conjugate", "ar-mh1-1", [
    L(20, 120, 300, 120, { m: "ar-mh1-1" }), L(110, 210, 110, 12, { m: "ar-mh1-1" }), T(300, 136, "Re", { a: "end" }), T(118, 18, "Im", { a: "start" }),
    L(200, 60, 200, 120, { d: "4 3", c: M }), L(110, 60, 200, 60, { d: "4 3", c: M }), T(200, 134, "3"), T(102, 64, "2", { a: "end" }), T(102, 184, "−2", { a: "end" }),
    L(110, 120, 198, 61.3, { c: A, w: 2, m: "ar-mh1-1" }), DOT(200, 60, A), T(206, 52, "z = 3 + 2i", { a: "start", c: A, b: 1 }),
    T(135, 80, "r = |z| = √13", { a: "end", fs: 11, c: A }),
    P("M135 120 A25 25 0 0 0 130.8 106.1", { c: A }), T(150, 114, "θ = arg z", { a: "start", fs: 11 }),
    L(110, 120, 200, 180, { c: B, d: "5 4" }), DOT(200, 180, B), L(200, 120, 200, 180, { d: "4 3", c: M }), L(110, 180, 200, 180, { d: "4 3", c: M }),
    T(206, 186, "z* = 3 − 2i", { a: "start", c: B, b: 1 }), T(206, 201, "(reflection in Re axis)", { a: "start", c: B, fs: 10 }),
  ].join(""));

  const figAddVec = S(300, 200, "Adding complex numbers: the parallelogram rule", "ar-mh1-2", [
    L(20, 130, 290, 130, { c: M, m: "ar-mh1-2" }), L(60, 195, 60, 10, { c: M, m: "ar-mh1-2" }), T(288, 146, "Re", { a: "end" }), T(66, 18, "Im", { a: "start" }),
    L(60, 130, 99, 52, { c: A, w: 2, m: "ar-mh1-2" }), L(60, 130, 178, 169, { c: B, w: 2, m: "ar-mh1-2" }),
    L(100, 50, 220, 90, { d: "5 4", c: M }), L(180, 170, 220, 90, { d: "5 4", c: M }),
    L(60, 130, 218, 90.5, { c: G, w: 2.4, m: "ar-mh1-2" }),
    T(106, 48, "z₁ = 1 + 2i", { a: "start", c: A }), T(186, 186, "z₂ = 3 − i", { a: "start", c: B }), T(226, 86, "z₁ + z₂ = 4 + i", { a: "start", c: G, b: 1 }),
    T(130, 20, "add real parts, add imaginary parts", { a: "start", fs: 10 }),
  ].join(""));

  const figRotate = S(300, 185, "Multiplying by i rotates by 90 degrees anticlockwise", "ar-mh1-3", [
    L(20, 130, 290, 130, { c: M, m: "ar-mh1-3" }), L(150, 145, 150, 10, { c: M, m: "ar-mh1-3" }), T(288, 146, "Re", { a: "end" }), T(156, 18, "Im", { a: "start" }),
    L(150, 130, 218, 96, { c: A, w: 2, m: "ar-mh1-3" }), DOT(220, 95, A), T(226, 92, "z = 2 + i", { a: "start", c: A, b: 1 }),
    L(150, 130, 116, 62, { c: B, w: 2, m: "ar-mh1-3" }), DOT(115, 60, B), T(108, 54, "iz = −1 + 2i", { a: "end", c: B, b: 1 }),
    P("M177 116.5 A30 30 0 0 0 136.6 103.2", { c: G, m: "ar-mh1-3" }), T(168, 100, "90°", { fs: 11, c: G }),
    T(150, 158, "|z₁z₂| = |z₁||z₂|,  arg(z₁z₂) = arg z₁ + arg z₂", { fs: 11 }),
    T(150, 174, "|i| = 1, arg i = π/2 → pure rotation", { fs: 11, c: M }),
  ].join(""));

  const figCubeRoots = S(300, 215, "The three cube roots of minus 8 on a circle of radius 2", "", [
    L(20, 110, 285, 110, { c: M }), L(150, 205, 150, 10, { c: M }), T(282, 124, "Re", { a: "end" }), T(156, 20, "Im", { a: "start" }),
    C(150, 110, 80, { c: M, d: "4 4" }), T(232, 52, "|z| = 2", { a: "start", fs: 11, c: M }),
    P("M190 40.7 L70 110 L190 179.3 Z", { c: A, d: "6 4" }),
    L(150, 110, 190, 40.7, { c: A }), L(150, 110, 70, 110, { c: A }), L(150, 110, 190, 179.3, { c: A }),
    DOT(190, 40.7, A), DOT(70, 110, A), DOT(190, 179.3, A),
    T(198, 34, "2e^(iπ/3) = 1 + √3 i", { a: "start", fs: 11, c: A }), T(64, 104, "2e^(iπ) = −2", { a: "end", fs: 11, c: A }), T(198, 194, "2e^(−iπ/3) = 1 − √3 i", { a: "start", fs: 11, c: A }),
    P("M170 110 A20 20 0 0 0 160 92.7", { c: G }), T(176, 100, "π/3", { a: "start", fs: 11, c: G }),
    T(118, 160, "2π/3 apart", { fs: 11 }),
  ].join(""));

  const figUnityRoots = (() => {
    let poly = "", lab = "";
    for (let k = 0; k < 5; k++) {
      const t = (2 * Math.PI * k) / 5, x = r1(120 + 75 * Math.cos(t)), y = r1(105 - 75 * Math.sin(t));
      poly += (k ? "L" : "M") + x + " " + y;
      lab += DOT(x, y, A) + L(120, 105, x, y, { c: M, w: 1 }) + T(r1(120 + 94 * Math.cos(t)), r1(109 - 92 * Math.sin(t)), k ? "ω" + ["", "", "²", "³", "⁴"][k] : "1", { fs: 12, c: A });
    }
    return S(370, 210, "The fifth roots of unity form a regular pentagon", "", [
      L(20, 105, 205, 105, { c: M }), L(120, 200, 120, 10, { c: M }), C(120, 105, 75, { c: M, d: "4 4" }), P(poly + "Z", { c: A, w: 2 }), lab,
      T(222, 40, "zⁿ = 1 has n roots", { a: "start", fs: 11 }), T(222, 56, "ωᵏ = e^(2πik/n)", { a: "start", fs: 11, c: A }), T(222, 72, "equally spaced by 2π/n", { a: "start", fs: 11 }),
      T(222, 88, "on |z| = 1", { a: "start", fs: 11 }), T(222, 120, "sum of roots = 0:", { a: "start", fs: 11 }), T(222, 136, "1 + ω + ω² + ω³ + ω⁴ = 0", { a: "start", fs: 11, c: A }),
      T(222, 24, "n = 5:", { a: "start", fs: 11, b: 1 }),
    ].join(""));
  })();

  const figPlanes = S(400, 160, "Three planes: unique point, sheaf, triangular prism, parallel planes", "", [
    // corner of a room = one point
    P("M50 70 L50 22 L15 40 L15 90 Z", { f: A, op: 0.18, w: 1 }), P("M50 70 L50 22 L88 40 L88 90 Z", { f: B, op: 0.18, w: 1 }), P("M50 70 L15 90 L53 110 L88 90 Z", { f: G, op: 0.18, w: 1 }),
    DOT(50, 70, D), T(50, 132, "unique solution", { fs: 11, b: 1 }), T(50, 147, "(meet at a point)", { fs: 10 }),
    // sheaf (edge-on)
    L(110, 70, 190, 70, { c: A, w: 2 }), L(130, 35, 170, 105, { c: B, w: 2 }), L(130, 105, 170, 35, { c: G, w: 2 }), DOT(150, 70, D),
    T(150, 132, "infinitely many", { fs: 11, b: 1 }), T(150, 147, "(sheaf: common line)", { fs: 10 }),
    // triangular prism (edge-on)
    L(208, 100, 292, 100, { c: A, w: 2 }), L(218, 110, 258, 30, { c: B, w: 2 }), L(282, 110, 242, 30, { c: G, w: 2 }),
    T(250, 132, "no solution", { fs: 11, b: 1 }), T(250, 147, "(triangular prism)", { fs: 10 }),
    // parallel
    L(315, 45, 385, 45, { c: A, w: 2 }), L(315, 70, 385, 70, { c: B, w: 2 }), L(315, 95, 385, 95, { c: G, w: 2 }),
    T(350, 132, "no solution", { fs: 11, b: 1 }), T(350, 147, "(parallel planes)", { fs: 10 }),
    T(250, 14, "panels 2-4 viewed edge-on (each plane seen as a line)", { fs: 10, c: M }),
  ].join(""));

  const figSlots = S(330, 150, "Counting with boxes: filling positions and treating objects as a block", "", [
    T(10, 20, "Choose and arrange 3 of 5 people:", { a: "start", fs: 12, b: 1 }),
    ...[5, 4, 3].map((v, i) => R(20 + i * 56, 30, 40, 34, { rx: 4, f: F }) + T(40 + i * 56, 53, v, { fs: 14, c: A, b: 1 }) + T(40 + i * 56, 78, ["1st", "2nd", "3rd"][i], { fs: 10, c: M }) + (i < 2 ? T(68 + i * 56, 52, "×") : "")),
    T(185, 53, "= 60 = ⁵P₃ = 5!/(5 − 3)!", { a: "start", fs: 12 }),
    T(10, 106, "A and B together: glue them into one block", { a: "start", fs: 12, b: 1 }),
    R(20, 114, 52, 28, { rx: 4, f: A, op: 0.2 }), T(46, 133, "A B", { fs: 12 }), ...["C", "D", "E"].map((v, i) => R(80 + i * 34, 114, 28, 28, { rx: 4, f: F }) + T(94 + i * 34, 133, v)),
    T(190, 133, "4! × 2! = 48", { a: "start", fs: 12, c: A, b: 1 }), T(276, 133, "(×2! inside)", { a: "start", fs: 10, c: M }),
  ].join(""));

  // ---------- math-4 figures ----------
  const mapPanel = (c, arrows, cod, t1, t2, ok, id) => {
    let s = `<ellipse cx="${c - 35}" cy="65" rx="18" ry="45" fill="${F}" stroke="currentColor" stroke-width="1.3"/><ellipse cx="${c + 35}" cy="65" rx="18" ry="45" fill="${F}" stroke="currentColor" stroke-width="1.3"/>`;
    [35, 65, 95].forEach((y) => { s += DOT(c - 35, y); });
    cod.forEach((y) => { s += DOT(c + 35, y, B); });
    arrows.forEach(([a, b]) => { s += L(c - 31, a, c + 29, b, { w: 1.3, m: id }); });
    return s + T(c, 128, t1, { fs: 11, b: 1 }) + T(c, 143, t2, { fs: 10, c: ok ? G : D });
  };
  const figMapping = S(390, 150, "Mapping diagrams: one-to-one, many-to-one, one-to-many", "ar-m4-1", [
    mapPanel(65, [[35, 35], [65, 65], [95, 95]], [35, 65, 95], "one-to-one", "function; has an inverse", 1, "ar-m4-1"),
    mapPanel(195, [[35, 50], [65, 50], [95, 95]], [50, 95], "many-to-one", "function; no inverse", 1, "ar-m4-1"),
   
    `<ellipse cx="290" cy="65" rx="18" ry="45" fill="${F}" stroke="currentColor" stroke-width="1.3"/><ellipse cx="360" cy="65" rx="18" ry="45" fill="${F}" stroke="currentColor" stroke-width="1.3"/>`,
    DOT(290, 50), DOT(290, 95), DOT(360, 30, B), DOT(360, 65, B), DOT(360, 95, B),
    L(294, 50, 354, 31, { w: 1.3, m: "ar-m4-1" }), L(294, 50, 354, 64, { w: 1.3, m: "ar-m4-1" }), L(294, 95, 354, 95, { w: 1.3, m: "ar-m4-1" }),
    T(325, 128, "one-to-many", { fs: 11, b: 1 }), T(325, 143, "NOT a function", { fs: 10, c: D }),
    T(30, 12, "domain", { fs: 10, c: M }), T(100, 12, "range", { fs: 10, c: M }),
  ].join(""));

  const figMachine = S(360, 95, "Composite function machine: g is applied first, then f", "ar-m4-2", [
    T(18, 42, "x", { fs: 14, it: 1 }), L(28, 38, 66, 38, { m: "ar-m4-2" }),
    R(70, 20, 50, 36, { rx: 6, f: B, op: 0.2 }), T(95, 43, "g", { fs: 15, b: 1 }),
    L(124, 38, 206, 38, { m: "ar-m4-2" }), T(165, 30, "g(x)", { fs: 12 }),
    R(210, 20, 50, 36, { rx: 6, f: A, op: 0.2 }), T(235, 43, "f", { fs: 15, b: 1 }),
    L(264, 38, 296, 38, { m: "ar-m4-2" }), T(328, 43, "f(g(x))", { fs: 12 }),
    T(180, 78, "(f ∘ g)(x) = f(g(x)): the function written next to x acts first", { fs: 11 }),
    T(180, 92, "range of g must lie inside the domain of f", { fs: 10, c: M }),
  ].join(""));

  // ---------- math-5 figure ----------
  const figDiscGrid = (() => {
    let s = "";
    const cols = [110, 210, 310], heads = [["Δ > 0", "2 real roots"], ["Δ = 0", "1 repeated root"], ["Δ &lt; 0", "no real roots"]];
    heads.forEach(([h, sub], i) => { s += T(cols[i], 16, h, { b: 1 }) + T(cols[i], 30, sub, { fs: 10, c: M }); });
    s += T(12, 84, "a > 0", { a: "start", b: 1 }) + T(12, 174, "a &lt; 0", { a: "start", b: 1 });
    [[80, 1], [170, -1]].forEach(([ax, sg]) => {
      [18, 0, -18].forEach((off, i) => {
        const c = cols[i], vy = ax + sg * off, e = vy - sg * 32, ctl = vy + sg * 32;
        s += L(c - 45, ax, c + 45, ax, { c: M, w: 1.2 });
        s += P(`M${c - 32} ${e} Q${c} ${ctl} ${c + 32} ${e}`, { c: sg > 0 ? A : B, w: 2 });
        if (i === 0) { const dx = r1(32 * Math.sqrt(off / 32)); s += DOT(c - dx, ax, D) + DOT(c + dx, ax, D); }
        if (i === 1) s += DOT(c, ax, D);
      });
    });
    return S(370, 215, "Six cases of a quadratic graph by sign of a and of the discriminant", "", s);
  })();

  // ---------- math-6 figure ----------
  const figTransTable = S(370, 230, "Summary of graph transformations", "", [
    R(5, 5, 360, 220, { rx: 6 }), T(185, 24, "Outside f → acts on y (do what it says)", { fs: 11, b: 1, c: A }), T(185, 40, "Inside f → acts on x (do the opposite)", { fs: 11, b: 1, c: B }),
    L(5, 50, 365, 50, { c: M, w: 1 }), L(110, 50, 110, 225, { c: M, w: 1 }),
    ...[["f(x) + b", "translate by (0, b): up b", A], ["f(x − a)", "translate by (a, 0): RIGHT a", B], ["p f(x)", "vertical stretch, scale factor p", A], ["f(qx)", "horizontal stretch, scale factor 1/q", B], ["−f(x)", "reflect in the x-axis", A], ["f(−x)", "reflect in the y-axis", B]]
      .map(([a, b, c], i) => T(57, 72 + i * 26, "y = " + a, { fs: 12, c, b: 1 }) + T(120, 72 + i * 26, b, { fs: 11, a: "start" })),
   
  ].join(""));

  // ---------- math-h2 figures ----------
  const figSign = S(360, 165, "Sign diagram for (x + 2)(x − 1)(x − 3)", "", [
    L(70, 20, 350, 20, { m: "" }), ...[[120, "−2"], [210, "1"], [290, "3"]].map(([x, l]) => L(x, 14, x, 125, { c: M, d: "3 3", w: 1 }) + T(x, 12, l, { fs: 11 })),
    ...[["x + 2", "−+++"], ["x − 1", "−−++"], ["x − 3", "−−−+"], ["product", "−+−+"]].map(([lab, sg], r) =>
      T(10, 44 + r * 24, lab, { a: "start", fs: 11, b: r === 3 ? 1 : 0 }) + [...sg].map((ch, i) => T([95, 165, 250, 322][i], 44 + r * 24, ch === "+" ? "+" : "−", { fs: 14, c: r === 3 ? (ch === "+" ? G : D) : "currentColor", b: r === 3 ? 1 : 0 })).join("")),
    L(10, 106, 350, 106, { c: M, w: 1 }),
    T(180, 145, "(x + 2)(x − 1)(x − 3) ≥ 0  ⇔  −2 ≤ x ≤ 1  or  x ≥ 3", { fs: 11, c: A, b: 1 }),
    T(180, 160, "a single factor changes sign at its root; a squared factor does not", { fs: 10, c: M }),
  ].join(""));

  const figEnds = S(340, 150, "End behaviour of polynomials by degree and sign of leading coefficient", "", [
    ...[[50, "odd degree", "a > 0", "M15 90 C40 20 60 100 85 30", A], [130, "odd degree", "a &lt; 0", "M95 30 C120 100 140 20 165 90", B], [210, "even degree", "a > 0", "M175 30 C190 115 230 115 245 30", A], [290, "even degree", "a &lt; 0", "M255 90 C270 5 310 5 325 90", B]]
      .map(([c, t1, t2, d, col]) => L(c - 38, 60, c + 38, 60, { c: M, w: 1 }) + P(d, { c: col, w: 2 }) + T(c, 118, t1, { fs: 11, b: 1 }) + T(c, 134, t2, { fs: 11 })),
    T(170, 12, "the sign of the leading term aₙxⁿ decides both ends", { fs: 10, c: M }),
  ].join(""));

  // ---------- math-7 figures ----------
  const figCuboid = S(330, 205, "Cuboid with space diagonal AG and the angle between AG and the base", "", [
    P("M40 160 L200 160 L260 120 L260 40 L100 40 L40 80 Z"), L(40, 80, 200, 80), L(200, 80, 200, 160), L(200, 80, 260, 40),
    L(40, 160, 100, 120, { d: "5 4", c: M }), L(100, 120, 260, 120, { d: "5 4", c: M }), L(100, 120, 100, 40, { d: "5 4", c: M }),
    L(40, 160, 260, 120, { c: B, w: 2, d: "6 4" }), L(40, 160, 260, 40, { c: A, w: 2.4 }), L(260, 40, 260, 120, { c: A, w: 2.4 }),
    P("M252 121.5 L250.5 113.5 L258.5 112", { c: A, w: 1.2 }),
    P("M69.5 154.6 A30 30 0 0 0 66.3 145.6", { c: D, w: 2 }), T(80, 153, "θ", { fs: 13, c: D, b: 1 }),
    T(32, 172, "A"), T(205, 174, "B"), T(270, 124, "C"), T(94, 114, "D", { c: M }), T(32, 78, "E"), T(194, 76, "F"), T(268, 38, "G"), T(98, 34, "H"),
    T(175, 150, "AC (base diagonal)", { fs: 10, c: B }), T(150, 74, "AG", { fs: 11, c: A, b: 1 }),
    T(165, 196, "angle between AG and base ABCD = ∠GAC;  tan θ = GC / AC", { fs: 11 }),
  ].join(""));

  const figPyramid = S(330, 230, "Right square pyramid with height, slant height and angles to the base", "", [
    L(40, 170, 190, 170), L(190, 170, 250, 130), L(40, 170, 100, 130, { d: "5 4", c: M }), L(100, 130, 250, 130, { d: "5 4", c: M }),
    L(145, 30, 40, 170), L(145, 30, 190, 170), L(145, 30, 250, 130), L(145, 30, 100, 130, { d: "5 4", c: M }),
    L(145, 30, 145, 150, { c: A, w: 2, d: "6 4" }), L(40, 170, 145, 150, { c: B, w: 1.6, d: "4 3" }), L(145, 150, 220, 150, { c: G, w: 1.6, d: "4 3" }), L(145, 30, 220, 150, { c: G, w: 2 }),
    P("M145 142 L152 142 L152 150", { c: A, w: 1 }), DOT(145, 150, A), DOT(220, 150, G),
    T(145, 22, "V"), T(30, 180, "A"), T(196, 182, "B"), T(260, 132, "C"), T(96, 124, "D", { c: M }), T(140, 166, "M", { fs: 11 }), T(226, 164, "N", { fs: 11 }),
    T(138, 92, "h", { a: "end", c: A, it: 1, b: 1 }), T(236, 92, "slant height VN", { a: "start", fs: 10, c: G }),
    T(165, 196, "edge–base angle ∠VAM: tan = h / AM", { fs: 10.5 }), T(165, 210, "face–base angle ∠VNM: tan = h / MN", { fs: 10.5 }),
    T(165, 224, "M = centre of base; AM = half the diagonal; N = midpoint of BC", { fs: 10, c: M }),
  ].join(""));

  const figConeSphere = S(320, 205, "Cone and sphere with radius, height and slant height", "", [
    `<ellipse cx="70" cy="140" rx="50" ry="12" fill="none" stroke="currentColor" stroke-width="1.5"/>`, L(70, 25, 20, 140), L(70, 25, 120, 140),
    L(70, 25, 70, 140, { c: A, d: "5 4" }), L(70, 140, 120, 140, { c: B }), T(64, 90, "h", { a: "end", c: A, it: 1, b: 1 }), T(95, 154, "r", { c: B, it: 1, b: 1 }), T(102, 78, "l", { a: "start", c: G, it: 1, b: 1 }),
    P("M70 132 L77 132 L77 140", { w: 1 }),
    T(70, 176, "V = ⅓πr²h", { fs: 11 }), T(70, 191, "curved SA = πrl", { fs: 11 }),
    C(230, 85, 55), `<ellipse cx="230" cy="85" rx="55" ry="14" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>`, L(230, 85, 285, 85, { c: B }), DOT(230, 85), T(258, 80, "r", { c: B, it: 1, b: 1 }),
    T(230, 166, "V = (4/3)πr³", { fs: 11 }), T(230, 181, "SA = 4πr²", { fs: 11 }), T(230, 196, "hemisphere: halve, + πr² base", { fs: 10, c: M }),
  ].join(""));

  const figTriangle = S(320, 240, "Triangle labelling convention with the sine rule, cosine rule and area formula", "", [
    P("M40 160 L280 160 L170 40 Z", { f: F }),
    T(30, 170, "A", { b: 1 }), T(290, 170, "B", { b: 1 }), T(170, 30, "C", { b: 1 }),
    T(160, 178, "c", { it: 1, c: A, b: 1 }), T(236, 96, "a", { it: 1, c: A, b: 1 }), T(96, 96, "b", { it: 1, c: A, b: 1 }),
    T(160, 196, "side a is opposite angle A, etc.", { fs: 10, c: M }),
    T(160, 214, "a / sin A = b / sin B = c / sin C      a² = b² + c² − 2bc cos A", { fs: 11 }),
    T(160, 232, "Area = ½ ab sin C  (C is the angle between sides a and b)", { fs: 11 }),
  ].join(""));

  const figAmbig = S(330, 200, "Ambiguous case of the sine rule: two possible triangles", "", [
    L(15, 170, 320, 170, { c: M }),
    P("M30 170 L169.3 72.5 L108.3 170", { c: A, w: 2 }), L(169.3, 72.5, 230.3, 170, { c: B, w: 2 }),
    P("M98 176 A115 115 0 0 0 240 176", { c: M, d: "4 4", w: 1.2 }),
    DOT(108.3, 170, A), DOT(230.3, 170, B),
    T(22, 182, "A", { b: 1 }), T(160, 66, "C", { b: 1 }), T(104, 188, "B₁", { c: A, b: 1 }), T(234, 188, "B₂", { c: B, b: 1 }),
    T(90, 112, "b", { it: 1, b: 1 }), T(130, 128, "a", { it: 1, c: A, b: 1 }), T(208, 118, "a", { it: 1, c: B, b: 1 }),
    P("M60 170 A30 30 0 0 0 54.6 152.8"), T(68, 162, "A", { fs: 10, a: "start" }),
    T(190, 18, "given A, a, b with", { a: "start", fs: 11 }), T(190, 33, "b sin A &lt; a &lt; b:", { a: "start", fs: 11 }), T(190, 48, "two values of B,", { a: "start", fs: 11 }),
    T(190, 63, "B₂ = 180° − B₁ (obtuse)", { a: "start", fs: 11, c: B }),
  ].join(""));

  const figSector = S(360, 175, "Arc, sector and segment of a circle with angle theta in radians", "", [
    P("M90 150 L193.4 112.4 A110 110 0 0 0 109.1 41.7 Z", { f: B, op: 0.12 }),
    P("M193.4 112.4 A110 110 0 0 0 109.1 41.7 Z", { f: A, op: 0.3, c: A }),
    P("M193.4 112.4 A110 110 0 0 0 109.1 41.7", { c: A, w: 2.6 }),
    L(90, 150, 193.4, 112.4), L(90, 150, 109.1, 41.7), DOT(90, 150),
    P("M113.5 141.4 A25 25 0 0 0 94.3 125.4", { c: D }), T(110, 132, "θ", { c: D, b: 1 }),
    T(80, 162, "O"), T(148, 142, "r", { it: 1 }), T(92, 96, "r", { it: 1 }), T(168, 58, "l", { it: 1, c: A, b: 1 }),
    T(148, 88, "segment", { fs: 10, c: A }),
    T(215, 50, "arc length  l = rθ", { a: "start", fs: 12 }), T(215, 72, "sector area = ½ r²θ", { a: "start", fs: 12 }),
    T(215, 94, "segment = ½ r²(θ − sin θ)", { a: "start", fs: 12, c: A }), T(215, 116, "perimeter of sector = 2r + rθ", { a: "start", fs: 11 }),
    T(215, 138, "θ in RADIANS; π rad = 180°", { a: "start", fs: 11, c: M }),
  ].join(""));

  const figElev = S(320, 175, "Angles of elevation and depression are equal alternate angles", "", [
    L(20, 150, 300, 150), L(60, 40, 60, 150, { w: 2.4 }), P("M60 142 L68 142 L68 150", { w: 1 }),
    L(60, 40, 290, 40, { c: M, d: "5 4" }), L(60, 40, 260, 150, { c: A, w: 2 }), DOT(260, 150),
    P("M95 40 A35 35 0 0 1 90.7 56.9", { c: B, w: 2 }), P("M225 150 A35 35 0 0 1 229.3 133.1", { c: G, w: 2 }),
    T(100, 32, "angle of depression α", { a: "start", fs: 11, c: B }), T(290, 33, "horizontal", { a: "end", fs: 10, c: M }),
    T(255, 166, "angle of elevation α", { a: "end", fs: 11, c: G }), T(50, 36, "T", { a: "end" }), T(268, 160, "S", { a: "start" }),
    T(52, 100, "h", { a: "end", it: 1 }), T(175, 82, "line of sight", { fs: 10, c: A }),
   
  ].join(""));

  const figBearing = S(320, 205, "Bearing of B from A is 060 degrees; back bearing 240 degrees", "ar-m7-1", [
    L(90, 140, 90, 40, { m: "ar-m7-1" }), T(90, 34, "N", { b: 1 }), L(211.2, 70, 211.2, 18, { m: "ar-m7-1" }), T(211.2, 13, "N", { b: 1 }),
    L(90, 140, 211.2, 70, { c: A, w: 2 }), DOT(90, 140), DOT(211.2, 70),
    T(80, 152, "A", { b: 1 }), T(220, 76, "B", { a: "start", b: 1 }),
    P("M90 110 A30 30 0 0 1 116 125", { c: B, w: 2 }), T(110, 104, "060°", { a: "start", fs: 11, c: B }),
    P("M211.2 48 A22 22 0 1 1 192.1 81", { c: G, w: 2 }), T(238, 98, "240°", { a: "start", fs: 11, c: G }),
    T(160, 178, "measured clockwise from North, 3 figures", { fs: 11 }), T(160, 196, "back bearing = 060° + 180° = 240°", { fs: 11, c: G }),
  ].join(""));

  const fig3D = S(320, 220, "Point P(2, 4, 3) in three-dimensional coordinates", "ar-m7-2", [
    L(120, 120, 50, 175, { m: "ar-m7-2" }), L(120, 120, 300, 120, { m: "ar-m7-2" }), L(120, 120, 120, 15, { m: "ar-m7-2" }),
    T(44, 172, "x", { a: "end", it: 1 }), T(302, 134, "y", { it: 1 }), T(128, 20, "z", { a: "start", it: 1 }),
    L(84, 148, 204, 148, { c: M, d: "4 3" }), L(240, 120, 204, 148, { c: M, d: "4 3" }), L(204, 148, 204, 73, { c: M, d: "4 3" }), L(120, 45, 204, 73, { c: M, d: "4 3" }),
    DOT(84, 148, M), DOT(240, 120, M), DOT(120, 45, M), T(78, 146, "2", { a: "end", fs: 11 }), T(240, 112, "4", { fs: 11 }), T(112, 49, "3", { a: "end", fs: 11 }),
    L(120, 120, 204, 73, { c: A, w: 2.4 }), DOT(204, 73, A), T(210, 68, "P(2, 4, 3)", { a: "start", c: A, b: 1 }), T(112, 128, "O", { a: "end" }),
    T(10, 196, "OP = √(2² + 4² + 3²) = √29;  d = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)", { a: "start", fs: 10.5 }),
    T(10, 212, "midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)", { a: "start", fs: 10.5, c: M }),
  ].join(""));

  // ---------- math-8 figures ----------
  const figUnit = S(340, 230, "First quadrant of the unit circle with exact values at pi/6, pi/4, pi/3", "ar-m8-1", [
    L(40, 200, 225, 200, { m: "ar-m8-1" }), L(40, 200, 40, 15, { m: "ar-m8-1" }), P("M200 200 A160 160 0 0 0 40 40", { c: M }),
    ...[[178.6, 120, "π/6 → (√3/2, ½)", B], [153.1, 86.9, "π/4 → (√2/2, √2/2)", G], [120, 61.4, "π/3 → (½, √3/2)", A]]
      .map(([x, y, t, c]) => L(40, 200, x, y, { c, w: 1.4 }) + DOT(x, y, c) + T(x + 7, y - 4, t, { a: "start", fs: 11, c })),
    L(178.6, 120, 178.6, 200, { c: B, d: "3 3", w: 1 }), T(110, 175, "sin θ", { fs: 10, c: B }),
    T(200, 215, "(1, 0)"), T(48, 36, "(0, 1)", { a: "start" }), T(30, 212, "O", { a: "end" }),
    T(335, 20, "point at angle θ is (cos θ, sin θ)", { a: "end", fs: 11 }), T(335, 36, "tan θ = sin θ / cos θ", { a: "end", fs: 11 }), T(335, 52, "sin²θ + cos²θ = 1", { a: "end", fs: 11 }),
  ].join(""));

  const figCAST = S(300, 240, "Quadrant signs and the four related angles theta, pi minus theta, pi plus theta, 2pi minus theta", "", [
    L(40, 120, 260, 120, { c: M }), L(150, 15, 150, 225, { c: M }), C(150, 120, 90, { c: M, d: "4 4" }),
    ...[[223.7, 68.4, "θ", "start", 232, 62], [76.3, 68.4, "π − θ", "end", 68, 62], [76.3, 171.6, "π + θ", "end", 68, 186], [223.7, 171.6, "2π − θ", "start", 232, 186]]
      .map(([x, y, t, an, tx, ty]) => L(150, 120, x, y, { c: A, w: 1.8 }) + DOT(x, y, A) + T(tx, ty, t, { a: an, fs: 12, c: A, b: 1 })),
    L(223.7, 68.4, 223.7, 171.6, { c: B, d: "3 3", w: 1 }), L(76.3, 68.4, 223.7, 68.4, { c: B, d: "3 3", w: 1 }),
    T(270, 32, "All +", { a: "end", b: 1 }), T(30, 32, "sin +", { a: "start", b: 1 }), T(30, 220, "tan +", { a: "start", b: 1 }), T(270, 220, "cos +", { a: "end", b: 1 }),
    T(150, 238, "sin(π − θ) = sin θ;  cos(2π − θ) = cos θ;  tan(π + θ) = tan θ", { fs: 10 }),
  ].join(""));

  const figExactTri = S(320, 165, "Exact-value triangles: 45-45-90 with sides 1, 1, root 2 and 30-60-90 with sides 1, root 3, 2", "", [
    P("M30 130 L130 130 L30 30 Z", { f: F }), P("M30 120 L40 120 L40 130", { w: 1 }),
    T(80, 148, "1"), T(20, 84, "1", { a: "end" }), T(88, 74, "√2", { a: "start" }), T(108, 124, "45°", { fs: 11, c: A }), T(42, 56, "45°", { fs: 11, c: A, a: "start" }),
    P("M180 130 L300 130 L180 60.7 Z", { f: F }), P("M180 120 L190 120 L190 130", { w: 1 }),
    T(240, 148, "√3"), T(170, 100, "1", { a: "end" }), T(246, 86, "2", { a: "start" }), T(268, 124, "30°", { fs: 11, c: A }), T(193, 84, "60°", { fs: 11, c: A, a: "start" }),
    T(160, 14, "sin 30° = ½, cos 30° = √3/2, tan 45° = 1, tan 60° = √3", { fs: 10.5 }),
  ].join(""));

  // ---------- frame figures ----------
  const frPyr = S(330, 210, "Pyramid VABCD with base side 6 and height 4", "", [
    L(40, 170, 190, 170), L(190, 170, 250, 130), L(40, 170, 100, 130, { d: "5 4", c: M }), L(100, 130, 250, 130, { d: "5 4", c: M }),
    L(145, 30, 40, 170, { c: A, w: 2.2 }), L(145, 30, 190, 170), L(145, 30, 250, 130), L(145, 30, 100, 130, { d: "5 4", c: M }),
    L(145, 30, 145, 150, { c: A, w: 2, d: "6 4" }), L(40, 170, 145, 150, { c: A, w: 2, d: "4 3" }), L(145, 150, 220, 150, { c: G, d: "4 3" }), L(145, 30, 220, 150, { c: G, w: 1.6 }),
    P("M145 142 L152 142 L152 150", { w: 1 }), P("M67.5 164.75 A28 28 0 0 0 56.8 147.6", { c: D, w: 2 }), T(76, 160, "θ", { a: "start", c: D, b: 1 }),
    T(145, 22, "V"), T(30, 180, "A"), T(196, 182, "B"), T(260, 132, "C"), T(96, 124, "D", { c: M }), T(140, 166, "M", { fs: 11 }), T(226, 164, "N", { fs: 11 }),
    T(138, 96, "4", { a: "end", c: A, b: 1 }), T(115, 186, "6"), T(104, 152, "3√2", { fs: 11, c: A }),
    T(165, 204, "tan θ = 4 / (3√2) → θ ≈ 43.3°;  face angle ∠VNM: tan = 4/3 → 53.1°", { fs: 10.5 }),
  ].join(""));

  const frBearing = S(320, 210, "Ship route P to Q bearing 040 then Q to R bearing 130, right angle at Q", "ar-m7f-1", [
    L(60, 175, 60, 105, { m: "ar-m7f-1" }), T(60, 99, "N", { fs: 11, b: 1 }), L(137, 83, 137, 20, { m: "ar-m7f-1" }), T(137, 14, "N", { fs: 11, b: 1 }),
    L(60, 175, 137, 83, { c: A, w: 2 }), L(137, 83, 206, 141, { c: B, w: 2 }), L(60, 175, 206, 141, { c: G, w: 2, d: "6 4" }),
    DOT(60, 175), DOT(137, 83), DOT(206, 141), T(50, 188, "P", { b: 1 }), T(132, 76, "Q", { a: "end", b: 1 }), T(214, 146, "R", { a: "start", b: 1 }),
    P("M60 145 A30 30 0 0 1 79.3 152", { c: A }), T(66, 140, "40°", { a: "start", fs: 10, c: A }),
    P("M137 61 A22 22 0 0 1 153.9 97.1", { c: B }), T(160, 70, "130°", { a: "start", fs: 10, c: B }),
    P("M130.6 90.7 L138.3 97.1 L144.7 89.5", { w: 1 }),
    T(88, 124, "12", { a: "end", c: A, b: 1 }), T(178, 104, "9", { a: "start", c: B, b: 1 }), T(130, 172, "PR = 15", { c: G, b: 1 }),
    T(160, 204, "∠PQR = 220° − 130° = 90°", { fs: 11 }),
  ].join(""));

  const frRoots = S(300, 215, "Cube roots of minus 8 forming an equilateral triangle", "", [
    L(20, 110, 285, 110, { c: M }), L(150, 205, 150, 10, { c: M }), T(282, 124, "Re", { a: "end" }), T(156, 20, "Im", { a: "start" }),
    C(150, 110, 80, { c: M, d: "4 4" }), P("M190 40.7 L70 110 L190 179.3 Z", { f: A, op: 0.15, c: A, w: 2 }),
    DOT(190, 40.7, A), DOT(70, 110, A), DOT(190, 179.3, A),
    T(198, 36, "1 + √3 i", { a: "start", c: A }), T(64, 104, "−2", { a: "end", c: A }), T(198, 194, "1 − √3 i", { a: "start", c: A }),
    T(198, 128, "side 2√3", { a: "start", fs: 11 }), T(126, 92, "area 3√3", { fs: 11, b: 1 }),
  ].join(""));

  IB.addExamFrames("math", { topics: {
    "math-1": {
      diagrams: [
        { title: "Arithmetic sequence uₙ = 3n − 1: terms lie on a straight line (gradient d = 3)", x: [0, 8], y: [0, 24], xLabel: "n", yLabel: "uₙ",
          curves: [{ f: (x) => 3 * x - 1, domain: [0.5, 7.5], color: "muted", dash: true }], points: pts((n) => 3 * n - 1, [1, 2, 3, 4, 5, 6, 7]).map((p, i) => i === 0 ? { ...p, label: "u₁ = 2" } : p) },
        { title: "Geometric, r > 1: uₙ = 2ⁿ⁻¹ grows exponentially (diverges)", x: [0, 8], y: [0, 70], xLabel: "n", yLabel: "uₙ", grid: false,
          curves: [{ f: (x) => 2 ** (x - 1), domain: [0.5, 7.2], color: "muted", dash: true }], points: pts((n) => 2 ** (n - 1), [1, 2, 3, 4, 5, 6, 7]) },
        { title: "Geometric, 0 < r < 1: uₙ = 16(½)ⁿ⁻¹ decreases towards 0", x: [0, 9], y: [0, 18], xLabel: "n", yLabel: "uₙ",
          curves: [{ f: (x) => 16 * 0.5 ** (x - 1), domain: [0.7, 8.5], color: "muted", dash: true }], points: pts((n) => 16 * 0.5 ** (n - 1), [1, 2, 3, 4, 5, 6, 7, 8]) },
        { title: "Geometric, −1 < r < 0: uₙ = 8(−½)ⁿ⁻¹ alternates in sign and → 0", x: [0, 9], y: [-5, 9], xLabel: "n", yLabel: "uₙ",
          points: pts((n) => 8 * (-0.5) ** (n - 1), [1, 2, 3, 4, 5, 6, 7, 8]).map((p, i) => i === 0 ? { ...p, label: "8" } : i === 1 ? { ...p, label: "−4" } : p) },
        { title: "Geometric, r < −1: uₙ = (−2)ⁿ⁻¹ alternates and grows (diverges)", x: [0, 7], y: [-35, 35], xLabel: "n", yLabel: "uₙ", grid: false,
          points: pts((n) => (-2) ** (n - 1), [1, 2, 3, 4, 5, 6]) },
        { title: "Partial sums of 8 + 4 + 2 + … approach S∞ = 16", x: [0, 9], y: [0, 18], xLabel: "n", yLabel: "Sₙ",
          hlines: [{ y: 16, label: "S∞ = 16" }], points: pts((n) => 16 * (1 - 0.5 ** n), [1, 2, 3, 4, 5, 6, 7, 8]) },
        { title: "Simple vs compound interest: 1000 at 8 % per year (value in 1000s)", x: [0, 20], y: [0, 5], xLabel: "years", yLabel: "value",
          curves: [{ f: (t) => 1.08 ** t, label: "compound (geometric)", labelX: 13.5 }, { f: (t) => 1 + 0.08 * t, color: "b", label: "simple (arithmetic)", labelX: 15.5 }] },
        { title: "Depreciation: V = 30 000 × 0.85ⁿ (in 1000s) - never reaches 0", x: [0, 15], y: [0, 32], xLabel: "n years", yLabel: "V",
          curves: [{ f: (t) => 30 * 0.85 ** t }], points: [{ at: [0, 30], label: "(0, 30)" }, { at: [5, 30 * 0.85 ** 5], label: "(5, 13.3)" }] },
      ],
      figures: [
        { title: "Why a geometric series can have a finite sum", caption: "½ + ¼ + ⅛ + … = 1: each term fills half of what is left", svg: figSumSquare },
        { title: "Condition for S∞ to exist", caption: "the series converges only when |r| < 1; state this as the reason (R1)", svg: figConverge },
      ],
      frames: [
        { title: "Compare simple and compound growth: when does one overtake the other?", paper: "P2", where: "Paper 2 · 4 marks · GDC table or graph",
          q: "Ana invests 5000 USD at 6% simple interest per year. Ben invests 4000 USD at 7% per year compounded annually. Find the least number of complete years after which Ben's investment is worth more than Ana's.",
          marks: [
            ["M1", "Ana: __A = 5000 + 300n__ (arithmetic, d = 300)"],
            ["M1", "Ben: __B = 4000(1.07)ⁿ__ (geometric, r = 1.07)"],
            ["M1", "attempt to solve 4000(1.07)ⁿ > 5000 + 300n, e.g. table: n = 10: 7869 < 8000; n = 11: 8419 > 8300"],
            ["A1", "__n = 11__ years"],
          ],
          diagram: { title: "Ben (compound) overtakes Ana (simple) between n = 10 and 11 (values in 1000s)", x: [0, 16], y: [0, 12], xLabel: "n", yLabel: "value",
            curves: [{ f: (n) => 5 + 0.3 * n, color: "b", label: "Ana", labelX: 14 }, { f: (n) => 4 * 1.07 ** n, label: "Ben", labelX: 14.5 }], vlines: [{ x: 10.6, label: "n ≈ 10.6" }] },
          model: "Ana's value is arithmetic: 5000 + 300n. Ben's is geometric: 4000(1.07)ⁿ. Using the GDC table, after 10 years Ben has 7868.61 < 8000, after 11 years 8419.41 > 8300. So the least number of complete years is 11.",
          tip: "「完整年數」要向上取整數：寫出 n = 10 同 n = 11 兩行數字做證據，唔好淨係寫交點 10.6。" },
      ],
    },

    "math-2": {
      diagrams: [
        { title: "y = aˣ for a = 2, 3 and ½: all pass through (0, 1), asymptote y = 0", x: [-3, 3], y: [-1, 8], curves: [
          { f: (x) => 2 ** x, label: "2ˣ", labelX: 2.6 }, { f: (x) => 3 ** x, color: "b", label: "3ˣ", labelX: 1.6 }, { f: (x) => 0.5 ** x, color: "c", label: "(½)ˣ", labelX: -2.6 }],
          points: [{ at: [0, 1], label: "(0, 1)" }] },
        { title: "Growth y = eˣ and decay y = e⁻ˣ: reflections in the y-axis", x: [-3, 3], y: [-1, 8], curves: [
          { f: (x) => Math.exp(x), label: "eˣ", labelX: 1.8 }, { f: (x) => Math.exp(-x), color: "b", label: "e⁻ˣ", labelX: -2.4 }], points: [{ at: [0, 1], label: "(0, 1)" }] },
        { title: "y = logₐ x for a = 2, e, 10: all pass through (1, 0), asymptote x = 0", x: [-1, 8], y: [-3, 3.5], curves: [
          { f: (x) => Math.log2(x), domain: [0.02, 8], label: "log₂x", labelX: 6.6 }, { f: (x) => Math.log(x), domain: [0.02, 8], color: "b", label: "ln x", labelX: 6.6 },
          { f: (x) => Math.log10(x), domain: [0.02, 8], color: "c", label: "log₁₀x", labelX: 6.6 }], points: [{ at: [1, 0], label: "(1, 0)" }] },
        { title: "Base 0 < a < 1: y = log₀.₅ x is decreasing (reflection of log₂x in the x-axis)", x: [-1, 8], y: [-3.5, 3.5], curves: [
          { f: (x) => Math.log2(x), domain: [0.02, 8], color: "muted", dash: true, label: "log₂x", labelX: 6.4 }, { f: (x) => -Math.log2(x), domain: [0.02, 8], label: "log₀.₅x", labelX: 6.2 }] },
        { title: "Limited growth N = 500 − 300e^(−0.2t): starts at 200, asymptote N = 500", x: [0, 30], y: [0, 560], xLabel: "t", yLabel: "N", grid: false,
          curves: [{ f: (t) => 500 - 300 * Math.exp(-0.2 * t) }], hlines: [{ y: 500, label: "N = 500" }], points: [{ at: [0, 200], label: "(0, 200)" }] },
        { title: "Half-life: m = 80(½)^(t/5) halves every 5 years", x: [0, 22], y: [0, 90], xLabel: "t", yLabel: "m", grid: false,
          curves: [{ f: (t) => 80 * 0.5 ** (t / 5) }],
          lines: [{ from: [0, 40], to: [5, 40], color: "muted", dash: true }, { from: [5, 0], to: [5, 40], color: "muted", dash: true }, { from: [0, 20], to: [10, 20], color: "muted", dash: true }, { from: [10, 0], to: [10, 20], color: "muted", dash: true }],
          points: [{ at: [0, 80], label: "80" }, { at: [5, 40], label: "(5, 40)" }, { at: [10, 20], label: "(10, 20)" }, { at: [15, 10], label: "(15, 10)" }] },
        { title: "Cooling T = 20 + 70e^(−0.1t): T → room temperature 20 °C", x: [0, 50], y: [0, 100], xLabel: "t / min", yLabel: "T / °C", grid: false,
          curves: [{ f: (t) => 20 + 70 * Math.exp(-0.1 * t) }], hlines: [{ y: 20, label: "T = 20" }], points: [{ at: [0, 90], label: "(0, 90)" }] },
      ],
      figures: [
        { title: "Exponential ↔ logarithm", caption: "the definition used to 'un-log' an equation", svg: figExpLog },
      ],
      frames: [
        { title: "Half-life model: find k, sketch, and interpret", paper: "P1", where: "Paper 1 · 6 marks · exact answer + sketch",
          q: "The mass of a substance is \\(m = 80e^{-kt}\\) grams after t years. The mass halves every 5 years. (a) Show that \\(k = \\frac{\\ln 2}{5}\\). (b) Sketch the graph of m against t for t ≥ 0. (c) Write down what happens to m in the long term.",
          marks: [
            ["M1", "40 = 80e^(−5k) ⇒ e^(−5k) = ½"],
            ["A1", "−5k = ln ½ = −ln 2 ⇒ __k = ln2 / 5__ (AG)"],
            ["A1", "decreasing curve, concave up, through __(0, 80)__"],
            ["A1", "passes through (5, 40) and (10, 20)"],
            ["A1", "approaches the t-axis: __asymptote m = 0__, never touches"],
            ["A1", "m → 0 (the mass decays towards zero but never reaches it)"],
          ],
          diagram: { title: "m = 80e^(−(ln 2/5)t): decay towards m = 0", x: [0, 22], y: [0, 90], xLabel: "t", yLabel: "m", grid: false,
            curves: [{ f: (t) => 80 * Math.exp(-(Math.LN2 / 5) * t) }], points: [{ at: [0, 80], label: "(0, 80)" }, { at: [5, 40], label: "(5, 40)" }, { at: [10, 20], label: "(10, 20)" }] },
          model: "(a) After 5 years m = 40, so 40 = 80e^(−5k), e^(−5k) = ½, −5k = −ln 2, k = ln 2 / 5. (b) A decreasing exponential curve starting at (0, 80), passing through (5, 40) and (10, 20), approaching but never meeting the t-axis. (c) m → 0 as t → ∞.",
          tip: "ln(½) = −ln 2，負號抵銷就得到 AG。Sketch 要標 y 截距同漸近線 m = 0，唔好畫到條線掂到 t 軸。" },
      ],
      concepts: [
        { h: "Half-life and doubling time", b: "<p>For \\(A = A_0e^{kt}\\): doubling time \\(T_2 = \\frac{\\ln 2}{k}\\) (k > 0); half-life \\(T_{1/2} = \\frac{\\ln 2}{|k|}\\) (k < 0). Equivalent base-½ form: \\(A = A_0\\left(\\tfrac12\\right)^{t/T_{1/2}}\\). The graph never reaches 0: the t-axis is a horizontal asymptote. In a model \\(N = a + be^{-kt}\\) (k > 0) the long-term value is a.</p>" },
      ],
    },

    "math-3": {
      diagrams: [
        { title: "(1 + x)⁴ (curve) is close to 1 + 4x + 6x² near x = 0 - why truncated expansions approximate", x: [-1, 1], y: [-1, 5], curves: [
          { f: (x) => (1 + x) ** 4, label: "(1 + x)⁴", labelX: 0.6 }, { f: (x) => 1 + 4 * x + 6 * x * x, color: "b", dash: true, label: "1 + 4x + 6x²", labelX: -0.95 }] },
      ],
      figures: [
        { title: "Pascal's triangle", caption: "row n gives the binomial coefficients ⁿCᵣ; it is symmetric: ⁿCᵣ = ⁿCₙ₋ᵣ", svg: pascal },
        { title: "Number sets", caption: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ (in IB, ℕ includes 0); irrationals are in ℝ but not ℚ", svg: figSets },
        { title: "Algebraic forms for deductive proof", caption: "start from the general form; finish with a concluding statement", svg: figProofBlocks },
      ],
    },

    "math-h1": {
      figures: [
        { title: "Argand diagram: modulus, argument, conjugate", caption: "z = r(cos θ + i sin θ) = re^(iθ); the conjugate is the reflection in the real axis", svg: figArgand },
        { title: "Addition of complex numbers", caption: "adds like vectors: parallelogram rule", svg: figAddVec },
        { title: "Multiplication is a rotation and an enlargement", caption: "multiply moduli, add arguments; × i rotates by π/2", svg: figRotate },
        { title: "Roots of z³ = −8", caption: "n roots lie on a circle radius |w|^(1/n), spaced 2π/n apart (vertices of a regular polygon)", svg: figCubeRoots },
        { title: "nth roots of unity (n = 5)", caption: "vertices of a regular n-gon on the unit circle; they sum to 0", svg: figUnityRoots },
        { title: "Three planes / three linear equations", caption: "unique solution, infinitely many (line), or none (prism or parallel)", svg: figPlanes },
        { title: "Counting: boxes and blocks", caption: "fill positions left to right; glue objects that must be together, then arrange inside the block", svg: figSlots },
      ],
      frames: [
        { title: "Plot roots on an Argand diagram and find the area of the polygon", paper: "P1", where: "Paper 1 · 5 marks · exact area",
          q: "The roots of \\(z^3 = -8\\) are represented by the points A, B and C on an Argand diagram. Show these points on a diagram and find the exact area of triangle ABC.",
          marks: [
            ["M1", "−8 = 8e^(iπ) ⇒ z = 2e^(i(π + 2kπ)/3)"],
            ["A1", "roots __2e^(iπ/3), −2, 2e^(−iπ/3)__ i.e. 1 + √3 i, −2, 1 − √3 i"],
            ["A1", "diagram: three points on the circle |z| = 2, 2π/3 apart (equilateral triangle)"],
            ["M1", "side = |(1 + √3 i) − (1 − √3 i)| = 2√3, area = ½ × (2√3)² × sin 60°"],
            ["A1", "area = __3√3__"],
          ],
          svg: frRoots, svgCaption: "equilateral triangle inscribed in |z| = 2",
          model: "−8 = 8e^(iπ), so z = 2e^(iπ/3), 2e^(iπ) = −2 and 2e^(5iπ/3) = 1 − √3 i. The points lie on the circle of radius 2 at angles π/3 apart from each other by 2π/3, forming an equilateral triangle with side 2√3. Area = ½(2√3)² sin(π/3) = ½ × 12 × √3/2 = 3√3.",
          tip: "記得 2kπ：三個根相隔 2π/3。等邊三角形面積用 ½ab sin C，C = 60°。" },
        { title: "Show z, z* and zw on an Argand diagram; describe the transformation", paper: "P1", where: "Paper 1 · 4 marks",
          q: "Let z = 2 + i. (a) Plot z, z* and iz on an Argand diagram. (b) Describe the geometric transformation that maps z to iz.",
          marks: [
            ["A1", "z at (2, 1) and __z* = 2 − i__ at (2, −1)"],
            ["A1", "__iz = −1 + 2i__ at (−1, 2)"],
            ["A1", "rotation through __90° (π/2) anticlockwise__"],
            ["A1", "about the __origin__ (modulus unchanged since |i| = 1)"],
          ],
          svg: figRotate, svgCaption: "z → iz: rotation by π/2 about O",
          model: "z* = 2 − i is the reflection of z in the real axis. iz = 2i + i² = −1 + 2i. Since |i| = 1 and arg i = π/2, multiplying by i is a rotation of π/2 anticlockwise about the origin.",
          tip: "Transformation 要講齊：rotation、角度、方向（anticlockwise）、中心（origin）四樣。" },
      ],
    },

    "math-4": {
      diagrams: [
        { title: "y = mx + c: gradient m = rise / run, y-intercept c (here y = ½x + 2)", x: [-6, 6], y: [-2, 6], curves: [{ f: (x) => 0.5 * x + 2 }],
          lines: [{ from: [1, 2.5], to: [3, 2.5], color: "b", label: "run 2", labelAt: "end" }, { from: [3, 2.5], to: [3, 3.5], color: "c", label: "rise 1", labelAt: "end" }],
          points: [{ at: [0, 2], label: "(0, c)" }, { at: [-4, 0], label: "x-int (−4, 0)" }] },
        { title: "Perpendicular lines: m₁m₂ = −1 (y = 2x + 1 and y = −½x + 3)", x: [-6, 6], y: [-4, 4.1], curves: [{ f: (x) => 2 * x + 1, label: "m = 2", labelX: -1.8 }, { f: (x) => -0.5 * x + 3, color: "b", label: "m = −½", labelX: 3.5 }],
          points: [{ at: [0.8, 2.6], label: "(0.8, 2.6)" }] },
        { title: "Vertical line test: a circle x² + y² = 9 is NOT a function", x: [-6, 6], y: [-4.05, 4.05], curves: [
          { f: (x) => Math.sqrt(Math.max(0, 9 - x * x)), domain: [-3, 3] }, { f: (x) => -Math.sqrt(Math.max(0, 9 - x * x)), domain: [-3, 3] }],
          vlines: [{ x: 1.5, label: "x = 1.5 meets twice" }], points: [{ at: [1.5, Math.sqrt(6.75)] }, { at: [1.5, -Math.sqrt(6.75)] }] },
        { title: "Horizontal line test: y = x² is many-to-one, so it has no inverse unless the domain is restricted", x: [-4, 6], y: [-1, 8], curves: [{ f: (x) => x * x, domain: [-3, 3] }],
          hlines: [{ y: 4, label: "y = 4" }], points: [{ at: [-2, 4], label: "(−2, 4)" }, { at: [2, 4], label: "(2, 4)" }] },
        { title: "A function and its inverse meet on y = x: f(x) = x³/4 and f⁻¹(x) = ∛(4x)", x: [-6, 6], y: [-4.05, 4.05], curves: [
          { f: (x) => x ** 3 / 4, label: "f", labelX: -1.6 }, { f: (x) => Math.cbrt(4 * x), color: "b", label: "f⁻¹", labelX: 4.5 }, { f: (x) => x, color: "muted", dash: true, label: "y = x", labelX: -3.6 }],
          points: [{ at: [2, 2], label: "(2, 2)" }, { at: [-2, -2], label: "(−2, −2)" }, { at: [0, 0] }] },
        { title: "Self-inverse function y = 1/x: symmetric in y = x, so f⁻¹ = f", x: [-6, 6], y: [-4.05, 4.05], curves: [
          { f: (x) => 1 / x, domain: [0.2, 5], label: "y = 1/x", labelX: 2.5 }, { f: (x) => 1 / x, domain: [-5, -0.2] }, { f: (x) => x, color: "muted", dash: true, label: "y = x", labelX: 3.5 }] },
        { title: "Domain and range from the graph: f(x) = √(6 − 2x) + 1, domain x ≤ 3, range f(x) ≥ 1", x: [-6, 5], y: [-1, 6], curves: [{ f: (x) => Math.sqrt(Math.max(0, 6 - 2 * x)) + 1, domain: [-6, 3] }],
          vlines: [{ x: 3, label: "x ≤ 3" }], hlines: [{ y: 1, label: "y ≥ 1" }], points: [{ at: [3, 1], label: "(3, 1) end point" }] },
      ],
      figures: [
        { title: "Mapping diagrams", caption: "a function maps each x to exactly one y; only one-to-one functions have inverses", svg: figMapping },
        { title: "Composite function machine", caption: "(f ∘ g)(x): apply g first, then f", svg: figMachine },
      ],
      frames: [
        { title: "Sketch a function on a restricted domain and state its range", paper: "P1", where: "Paper 1 · 4 marks",
          q: "Let \\(f(x) = x^2 - 4x + 1\\) for \\(0 \\le x \\le 5\\). Sketch the graph of f and hence write down the range of f.",
          marks: [
            ["A1", "parabola opening up, drawn __only for 0 ≤ x ≤ 5__ (end points marked)"],
            ["A1", "vertex __(2, −3)__ (complete the square: (x − 2)² − 3)"],
            ["A1", "end points (0, 1) and (5, 6)"],
            ["A1", "range __−3 ≤ f(x) ≤ 6__"],
          ],
          diagram: { title: "f(x) = x² − 4x + 1, 0 ≤ x ≤ 5", x: [-1, 6], y: [-4, 7], curves: [{ f: (x) => x * x - 4 * x + 1, domain: [0, 5] }],
            points: [{ at: [0, 1], label: "(0, 1)" }, { at: [2, -3], label: "(2, −3)" }, { at: [5, 6], label: "(5, 6)" }] },
          model: "f(x) = (x − 2)² − 3, so the minimum is at (2, −3). f(0) = 1 and f(5) = 6. The graph is the part of the parabola from (0, 1) down to (2, −3) and up to (5, 6). Range: −3 ≤ f(x) ≤ 6.",
          tip: "Range 唔係 f(0) 同 f(5) 咁簡單：個頂點喺 domain 入面，最細值係 −3，要睇圖先答。" },
        { title: "Restrict the domain so that an inverse exists", paper: "P1", where: "Paper 1 · 5 marks",
          q: "Let \\(f(x) = (x - 1)^2 + 2\\). (a) Explain why f does not have an inverse on ℝ. (b) Given the domain is x ≥ a, find the least value of a for which f⁻¹ exists. (c) Find \\(f^{-1}(x)\\) and state its domain.",
          marks: [
            ["R1", "f is __not one-to-one__ (e.g. f(0) = f(2) = 3; a horizontal line meets it twice)"],
            ["A1", "least __a = 1__ (x-coordinate of the vertex)"],
            ["M1", "swap x and y: x = (y − 1)² + 2"],
            ["A1", "__f⁻¹(x) = 1 + √(x − 2)__ (positive root since y ≥ 1)"],
            ["A1", "domain of f⁻¹: __x ≥ 2__ (= range of f)"],
          ],
          diagram: { title: "f (x ≥ 1) and f⁻¹ are reflections in y = x", x: [-1, 8], y: [-1, 5.1], curves: [
            { f: (x) => (x - 1) ** 2 + 2, domain: [1, 3.4], label: "f", labelX: 2.6 }, { f: (x) => (x - 1) ** 2 + 2, domain: [-1, 1], color: "muted", dash: true },
            { f: (x) => 1 + Math.sqrt(Math.max(0, x - 2)), domain: [2, 8], color: "b", label: "f⁻¹", labelX: 6.5 }, { f: (x) => x, color: "muted", dash: true }],
            points: [{ at: [1, 2], label: "(1, 2)" }, { at: [2, 1], label: "(2, 1)" }] },
          model: "f is many-to-one on ℝ (f(0) = f(2)), so it has no inverse. Restricting to x ≥ 1 (right of the vertex) makes it one-to-one, so a = 1. Then x = (y − 1)² + 2 gives y = 1 + √(x − 2), taking the positive root because y ≥ 1. The domain of f⁻¹ is the range of f: x ≥ 2.",
          tip: "f⁻¹ 嘅 domain = f 嘅 range；揀 ± 號要講理由（y ≥ 1 所以取 +）。" },
      ],
    },

    "math-5": {
      diagrams: [
        { title: "Three discriminant cases: Δ > 0 (two roots), Δ = 0 (touches), Δ < 0 (no real roots)", x: [-1, 6], y: [-2, 7], curves: [
          { f: (x) => x * x - 4 * x + 3, label: "Δ > 0", labelX: 4.3 }, { f: (x) => x * x - 4 * x + 4, color: "b", label: "Δ = 0", labelX: 3.3 }, { f: (x) => x * x - 4 * x + 6, color: "c", label: "Δ < 0", labelX: 2 }],
          points: [{ at: [1, 0] }, { at: [3, 0] }, { at: [2, 0], label: "(2, 0)", color: "b" }] },
        { title: "a > 0 opens up (minimum); a < 0 opens down (maximum)", x: [-4, 4], y: [-4, 5], curves: [
          { f: (x) => x * x - 2, label: "y = x² − 2", labelX: 2.2 }, { f: (x) => -x * x + 3, color: "b", label: "y = −x² + 3", labelX: 1.4 }],
          points: [{ at: [0, -2], label: "min" }, { at: [0, 3], label: "max", color: "b" }] },
        { title: "Key features of y = x² − 2x − 3 = (x + 1)(x − 3) = (x − 1)² − 4", x: [-3, 5], y: [-5, 6], curves: [{ f: (x) => x * x - 2 * x - 3 }],
          vlines: [{ x: 1, label: "axis x = −b/2a = 1" }], points: [{ at: [-1, 0], label: "(−1, 0)" }, { at: [3, 0], label: "(3, 0)" }, { at: [0, -3], label: "(0, −3)" }, { at: [1, -4], label: "vertex (1, −4)" }] },
        { title: "Line and parabola y = x²: two points (Δ > 0), tangent (Δ = 0), no meeting (Δ < 0)", x: [-3, 3], y: [-3, 6], curves: [
          { f: (x) => x * x, color: "muted" }, { f: (x) => x + 2, label: "y = x + 2", labelX: -2.6 }, { f: (x) => 2 * x - 1, color: "b", label: "y = 2x − 1", labelX: 2.1 }, { f: (x) => x - 2, color: "c", label: "y = x − 2", labelX: 1.6 }],
          points: [{ at: [-1, 1] }, { at: [2, 4] }, { at: [1, 1], label: "tangent (1, 1)", color: "b" }] },
        { title: "Effect of a: y = ½x², y = x², y = 3x² (larger |a| = narrower)", x: [-4, 4], y: [-1, 8], curves: [
          { f: (x) => 0.5 * x * x, color: "c", label: "½x²", labelX: 3.3 }, { f: (x) => x * x, label: "x²", labelX: 2.4 }, { f: (x) => 3 * x * x, color: "b", label: "3x²", labelX: 1.4 }] },
        { title: "Quadratic inequality x² − x − 6 > 0: graph ABOVE the axis, x < −2 or x > 3", x: [-5, 6], y: [-8, 8], curves: [{ f: (x) => x * x - x - 6 }],
          points: [{ at: [-2, 0], label: "−2" }, { at: [3, 0], label: "3" }], lines: [{ from: [-5, -0.3], to: [-2, -0.3], color: "c" }, { from: [3, -0.3], to: [6, -0.3], color: "c" }] },
      ],
      figures: [
        { title: "Sign of a and Δ together", caption: "the six possible positions of a parabola relative to the x-axis; Δ = b² − 4ac", svg: figDiscGrid },
      ],
      frames: [
        { title: "Find the equation of a quadratic from its graph", paper: "P1", where: "Paper 1 · 4 marks",
          q: "The graph of \\(y = ax^2 + bx + c\\) crosses the x-axis at (−1, 0) and (4, 0) and the y-axis at (0, −8). Find a, b and c, and write down the equation of the axis of symmetry.",
          marks: [
            ["M1", "use factorised form __y = a(x + 1)(x − 4)__"],
            ["M1", "substitute (0, −8): −8 = a(1)(−4)"],
            ["A1", "a = 2 ⇒ y = 2x² − 6x − 8, so __a = 2, b = −6, c = −8__"],
            ["A1", "axis __x = 1.5__ (midpoint of the roots)"],
          ],
          diagram: { title: "y = 2(x + 1)(x − 4) = 2x² − 6x − 8", x: [-3, 6], y: [-14, 8], grid: false, curves: [{ f: (x) => 2 * (x + 1) * (x - 4) }],
            vlines: [{ x: 1.5, label: "x = 1.5" }], points: [{ at: [-1, 0], label: "(−1, 0)" }, { at: [4, 0], label: "(4, 0)" }, { at: [0, -8], label: "(0, −8)" }, { at: [1.5, -12.5], label: "(1.5, −12.5)" }] },
          model: "Roots −1 and 4 give y = a(x + 1)(x − 4). At (0, −8): −8 = −4a, a = 2. Expanding: y = 2x² − 6x − 8, so a = 2, b = −6, c = −8. Axis of symmetry is midway between the roots: x = 1.5.",
          tip: "有兩個 x 截距就用 factorised form，再用第三點搵 a；唔好假設 a = 1。" },
      ],
    },

    "math-6": {
      diagrams: [
        { title: "Translations: f(x) = x² − 2x (dashed) → f(x) + 2 (up 2) and f(x − 3) (right 3)", x: [-2, 6], y: [-2, 5], curves: [
          { f: (x) => x * x - 2 * x, color: "muted", dash: true, label: "f", labelX: -1 }, { f: (x) => x * x - 2 * x + 2, label: "f(x) + 2", labelX: 2.5 }, { f: (x) => (x - 3) ** 2 - 2 * (x - 3), color: "b", label: "f(x − 3)", labelX: 5.3 }],
          points: [{ at: [1, -1], label: "(1, −1)", color: "muted" }, { at: [1, 1], label: "(1, 1)" }, { at: [4, -1], label: "(4, −1)", color: "b" }] },
        { title: "Vertical stretch y = 2f(x), scale factor 2: x-intercepts stay fixed", x: [-2, 4], y: [-3, 4], curves: [
          { f: (x) => x * x - 2 * x, color: "muted", dash: true, label: "f", labelX: -0.6 }, { f: (x) => 2 * (x * x - 2 * x), label: "2f(x)", labelX: 2.8 }],
          points: [{ at: [0, 0], label: "(0, 0)" }, { at: [2, 0], label: "(2, 0)" }, { at: [1, -2], label: "(1, −2)" }] },
        { title: "Horizontal stretches: f(2x) (s.f. ½) and f(½x) (s.f. 2): y-intercept stays fixed", x: [-1, 5], y: [-2, 4], curves: [
          { f: (x) => x * x - 2 * x, color: "muted", dash: true, label: "f", labelX: 2.8 }, { f: (x) => 4 * x * x - 4 * x, label: "f(2x)", labelX: 1.25 }, { f: (x) => x * x / 4 - x, color: "b", label: "f(½x)", labelX: 4.6 }],
          points: [{ at: [1, 0], label: "(1, 0)" }, { at: [4, 0], label: "(4, 0)", color: "b" }, { at: [0.5, -1] }, { at: [2, -1], color: "b" }] },
        { title: "Reflections: −f(x) in the x-axis, f(−x) in the y-axis", x: [-4, 4], y: [-3, 4], curves: [
          { f: (x) => x * x - 2 * x, color: "muted", dash: true, label: "f", labelX: 3 }, { f: (x) => -(x * x - 2 * x), label: "−f(x)", labelX: 2.6 }, { f: (x) => x * x + 2 * x, color: "b", label: "f(−x)", labelX: -3.6 }],
          points: [{ at: [1, 1], label: "(1, 1)" }, { at: [-1, -1], label: "(−1, −1)", color: "b" }] },
        { title: "Order matters: 2f(x) + 1 (stretch then up 1) vs 2[f(x) + 1] (up 1 then stretch)", x: [-1.5, 3.5], y: [-2, 6], curves: [
          { f: (x) => 2 * (x * x - 2 * x) + 1, label: "2f(x) + 1", labelX: 2.6 }, { f: (x) => 2 * (x * x - 2 * x + 1), color: "b", label: "2[f(x) + 1]", labelX: -0.4 }],
          points: [{ at: [1, -1], label: "(1, −1)" }, { at: [1, 0], label: "(1, 0)", color: "b" }] },
        { title: "Reciprocal function y = 1/x: asymptotes x = 0 and y = 0, self-inverse", x: [-5, 5], y: [-5, 5], curves: [
          { f: (x) => 1 / x, domain: [0.2, 5], label: "y = 1/x", labelX: 1.4 }, { f: (x) => 1 / x, domain: [-5, -0.2] }] },
        { title: "Exponential and log transformed: y = eˣ⁻¹ + 2 (asymptote y = 2) and y = ln(x + 1) (asymptote x = −1)", x: [-3, 5], y: [-3, 7], curves: [
          { f: (x) => Math.exp(x - 1) + 2, label: "eˣ⁻¹ + 2", labelX: 2.2 }, { f: (x) => Math.log(x + 1), domain: [-0.98, 5], color: "b", label: "ln(x + 1)", labelX: 2 }],
          hlines: [{ y: 2, label: "y = 2" }], vlines: [{ x: -1, label: "x = −1" }] },
      ],
      figures: [
        { title: "Transformations summary", caption: "a point (x, y) on y = f(x) maps to (x + a, y + b), (x, py), (x/q, y), (x, −y), (−x, y)", svg: figTransTable },
      ],
      frames: [
        { title: "Given the graph of f, sketch a combined transformation", paper: "P1", where: "Paper 1 · 4 marks · map key points",
          q: "The graph of y = f(x) passes through (0, 0), has a minimum at (1, −1) and passes through (2, 0). Sketch the graph of \\(y = 2f(x - 1) + 3\\), labelling the images of these three points.",
          marks: [
            ["M1", "map (x, y) → (__x + 1__, __2y + 3__): right 1, stretch ×2 vertically, then up 3"],
            ["A1", "(0, 0) → __(1, 3)__"],
            ["A1", "(1, −1) → __(2, 1)__ (still a minimum)"],
            ["A1", "(2, 0) → __(3, 3)__; same shape, correct orientation"],
          ],
          diagram: { title: "f (dashed) and y = 2f(x − 1) + 3", x: [-1, 4], y: [-2, 5], curves: [
            { f: (x) => x * x - 2 * x, color: "muted", dash: true, label: "f", labelX: -0.6 }, { f: (x) => 2 * ((x - 1) ** 2 - 2 * (x - 1)) + 3, domain: [0.4, 3.6], label: "image", labelX: 3.3 }],
            points: [{ at: [1, 3], label: "(1, 3)" }, { at: [2, 1], label: "(2, 1)" }, { at: [3, 3], label: "(3, 3)" }] },
          model: "Each point (x, y) moves to (x + 1, 2y + 3). (0, 0) → (1, 3); (1, −1) → (2, 1); (2, 0) → (3, 3). The image is the same U shape, stretched vertically by factor 2, with minimum (2, 1).",
          tip: "y 方向：先乘（stretch）後加（translate）；x 方向入面 x − 1 係向右移。逐點計比淨係估形狀穩陣。" },
      ],
    },

    "math-h2": {
      diagrams: [
        { title: "Cubic y = (x + 2)(x − 1)(x − 3): a > 0, crosses at each single root", x: [-3, 4], y: [-12, 12], grid: false, curves: [
          { f: (x) => (x + 2) * (x - 1) * (x - 3), label: "a > 0", labelX: 3.5 }, { f: (x) => -(x + 2) * (x - 1) * (x - 3), color: "b", dash: true, label: "a < 0", labelX: 3.4 }],
          points: [{ at: [-2, 0], label: "−2" }, { at: [1, 0], label: "1" }, { at: [3, 0], label: "3" }, { at: [0, 6], label: "(0, 6)" }] },
        { title: "Repeated root touches: y = (x − 1)²(x + 2); triple root: y = (x − 1)³ (inflexion)", x: [-3, 3], y: [-6, 8], grid: false, curves: [
          { f: (x) => (x - 1) ** 2 * (x + 2), label: "(x − 1)²(x + 2)", labelX: 1.6 }, { f: (x) => (x - 1) ** 3, color: "b", label: "(x − 1)³", labelX: 2.4 }],
          points: [{ at: [1, 0], label: "(1, 0)" }, { at: [-2, 0], label: "(−2, 0)" }] },
        { title: "Quartics: (x + 2)(x + 1)(x − 1)(x − 2) (W shape) and x²(x − 2)² (touches twice)", x: [-3, 3.5], y: [-3, 6], grid: false, curves: [
          { f: (x) => (x + 2) * (x + 1) * (x - 1) * (x - 2), label: "4 single roots", labelX: -2.6 }, { f: (x) => x * x * (x - 2) ** 2, color: "b", label: "x²(x − 2)²", labelX: 2.6 }] },
        { title: "y = |f(x)|: the part below the x-axis is reflected up (f(x) = x² − 4)", x: [-4, 4], y: [-5, 6], curves: [
          { f: (x) => x * x - 4, color: "muted", dash: true, label: "f", labelX: 2.6 }, { f: (x) => Math.abs(x * x - 4), label: "|f(x)|", labelX: 2.9 }],
          points: [{ at: [-2, 0], label: "−2" }, { at: [2, 0], label: "2" }, { at: [0, 4], label: "(0, 4)" }] },
        { title: "y = f(|x|): keep x ≥ 0, reflect it in the y-axis (f(x) = x² − 4x + 3)", x: [-5, 5], y: [-2, 6], curves: [
          { f: (x) => x * x - 4 * x + 3, color: "muted", dash: true, label: "f", labelX: -0.9 }, { f: (x) => x * x - 4 * Math.abs(x) + 3, label: "f(|x|)", labelX: 4.4 }],
          points: [{ at: [-3, 0], label: "−3" }, { at: [-1, 0], label: "−1" }, { at: [1, 0], label: "1" }, { at: [3, 0], label: "3" }] },
        { title: "Even f(−x) = f(x): x⁴ − 3x² (symmetric in y-axis); odd f(−x) = −f(x): x³ − 3x (rotational symmetry about O)", x: [-3, 3], y: [-4, 4], curves: [
          { f: (x) => x ** 4 - 3 * x * x, label: "even", labelX: 1.95 }, { f: (x) => x ** 3 - 3 * x, color: "b", label: "odd", labelX: -1.5 }] },
        { title: "Self-inverse f(x) = (2x + 1)/(x − 2): symmetric in y = x, asymptotes x = 2, y = 2", x: [-4, 8], y: [-2, 6.1], curves: [
          { f: (x) => (2 * x + 1) / (x - 2), domain: [2.15, 8], label: "f", labelX: 6 }, { f: (x) => (2 * x + 1) / (x - 2), domain: [-4, 1.85] }, { f: (x) => x, color: "muted", dash: true, label: "y = x", labelX: -3.4 }],
          vlines: [{ x: 2, label: "x = 2" }], hlines: [{ y: 2, label: "y = 2" }] },
        { title: "Solve (x + 2)(x − 1)(x − 3) ≥ 0 from the graph: −2 ≤ x ≤ 1 or x ≥ 3", x: [-3, 4.5], y: [-12, 12], grid: false, curves: [{ f: (x) => (x + 2) * (x - 1) * (x - 3) }],
          lines: [{ from: [-2, -0.6], to: [1, -0.6], color: "c" }, { from: [3, -0.6], to: [4.5, -0.6], color: "c" }], points: [{ at: [-2, 0], label: "−2" }, { at: [1, 0], label: "1" }, { at: [3, 0], label: "3" }] },
      ],
      figures: [
        { title: "Sign diagram for a polynomial inequality", caption: "list critical values, test each interval; include end points for ≥", svg: figSign },
        { title: "End behaviour of polynomials", caption: "degree and the sign of the leading coefficient fix the direction of both ends", svg: figEnds },
      ],
      frames: [
        { title: "Sketch a polynomial from its factorised form (repeated roots)", paper: "P1", where: "Paper 1 · 4 marks",
          q: "Sketch the graph of \\(y = (x + 1)^2(x - 3)\\), showing the coordinates of the axis intercepts.",
          marks: [
            ["A1", "cubic shape with positive leading coefficient (bottom-left to top-right)"],
            ["A1", "__touches__ the x-axis at (−1, 0) (turning point, double root)"],
            ["A1", "__crosses__ the x-axis at (3, 0)"],
            ["A1", "y-intercept __(0, −3)__"],
          ],
          diagram: { title: "y = (x + 1)²(x − 3)", x: [-3, 4.5], y: [-12, 8], grid: false, curves: [{ f: (x) => (x + 1) ** 2 * (x - 3) }],
            points: [{ at: [-1, 0], label: "(−1, 0)" }, { at: [3, 0], label: "(3, 0)" }, { at: [0, -3], label: "(0, −3)" }] },
          model: "Leading term x³, so the curve rises from bottom-left to top-right. The squared factor (x + 1)² gives a double root: the curve touches the x-axis at (−1, 0) (a local maximum). It crosses at (3, 0). At x = 0, y = (1)(−3) = −3.",
          tip: "平方因子 → 掂一掂就彈返（turning point）；單一因子 → 穿過。y 截距記得代 x = 0。" },
        { title: "Sketch y = |f(x)| and y = f(|x|) from the graph of f", paper: "P1", where: "Paper 1 · 4 marks",
          q: "Let \\(f(x) = x^2 - 4x + 3\\). On separate axes sketch (a) \\(y = |f(x)|\\) and (b) \\(y = f(|x|)\\), labelling all intercepts.",
          marks: [
            ["A1", "(a) part between x = 1 and x = 3 reflected __above__ the x-axis; intercepts (1, 0), (3, 0), (0, 3)"],
            ["A1", "(a) local maximum at (2, 1) (image of the minimum (2, −1))"],
            ["A1", "(b) graph for x ≥ 0 kept and __reflected in the y-axis__ (symmetric)"],
            ["A1", "(b) intercepts (±1, 0), (±3, 0), (0, 3); minima (±2, −1)"],
          ],
          diagram: { title: "|f(x)| (solid) and f(|x|) (dashed) for f(x) = x² − 4x + 3", x: [-5, 5], y: [-2, 6], curves: [
            { f: (x) => Math.abs(x * x - 4 * x + 3), domain: [-0.8, 5], label: "|f(x)|", labelX: 4.3 }, { f: (x) => x * x - 4 * Math.abs(x) + 3, color: "b", dash: true, label: "f(|x|)", labelX: -4.6 }],
            points: [{ at: [2, 1], label: "(2, 1)" }, { at: [-2, -1], label: "(−2, −1)", color: "b" }, { at: [0, 3], label: "(0, 3)" }] },
          model: "f(x) = (x − 1)(x − 3), minimum (2, −1). (a) |f(x)|: the negative part between 1 and 3 is reflected up, giving a local maximum (2, 1); intercepts (1, 0), (3, 0), (0, 3). (b) f(|x|) is even: the right half of f is reflected in the y-axis, so intercepts are x = ±1, ±3, y = 3, minima at (±2, −1).",
          tip: "|f(x)| 改 y（負嘅翻上去）；f(|x|) 改 x（右邊抄去左邊）。兩樣唔好搞亂。" },
      ],
      concepts: [
        { h: "Sum and product of roots", b: "<p>For \\(a_nx^n + a_{n-1}x^{n-1} + \\dots + a_0 = 0\\): sum of roots \\(= -\\frac{a_{n-1}}{a_n}\\), product of roots \\(= \\frac{(-1)^n a_0}{a_n}\\). Quadratic: \\(\\alpha + \\beta = -\\frac{b}{a}\\), \\(\\alpha\\beta = \\frac{c}{a}\\). Complex roots of real polynomials come in conjugate pairs. A double root means the graph touches the x-axis; a single root means it crosses.</p>" },
      ],
    },

    "math-7": {
      figures: [
        { title: "Cuboid: angle between a line and a plane", caption: "project the line onto the plane (AG → AC) and use the right-angled triangle AGC", svg: figCuboid },
        { title: "Right pyramid: height, slant height and the two base angles", caption: "the apex is directly above the centre M of the base", svg: figPyramid },
        { title: "Cone and sphere", caption: "l² = r² + h²; formulas are in the booklet but you must identify r, h and l", svg: figConeSphere },
        { title: "Triangle notation and formulas", caption: "use the sine rule for a side–angle pair, the cosine rule for SAS or SSS", svg: figTriangle },
        { title: "Ambiguous case of the sine rule", caption: "when finding an angle with the sine rule, check whether 180° − B also fits (angle sum < 180°)", svg: figAmbig },
        { title: "Arc, sector and segment", caption: "θ in radians: l = rθ, A = ½r²θ; segment = sector − triangle", svg: figSector },
        { title: "Angles of elevation and depression", caption: "both measured from the horizontal; they are equal (alternate angles)", svg: figElev },
        { title: "Bearings", caption: "clockwise from North, three figures; back bearing = bearing ± 180°", svg: figBearing },
        { title: "3D coordinates and distance", caption: "distance and midpoint formulas extend to three coordinates", svg: fig3D },
      ],
      frames: [
        { title: "Draw a 3D diagram: angle between an edge (or face) and the base of a pyramid", paper: "P1", where: "Paper 1/2 · 5 marks · labelled diagram",
          q: "A right pyramid VABCD has a square base of side 6 cm and height 4 cm. M is the centre of the base and N is the midpoint of BC. (a) Find the angle between VA and the base. (b) Find the angle between the face VBC and the base.",
          marks: [
            ["M1", "AC = 6√2, so __AM = 3√2__ (half the diagonal)"],
            ["M1", "right-angled triangle VMA: tan θ = VM / AM = 4 / (3√2)"],
            ["A1", "θ = __43.3°__"],
            ["M1", "MN = 3; tan φ = VM / MN = 4/3"],
            ["A1", "φ = __53.1°__"],
          ],
          svg: frPyr, svgCaption: "the right angle is at M in both triangles",
          model: "The apex is above M. AM is half the diagonal: ½ × 6√2 = 3√2 ≈ 4.243. In triangle VMA, tan θ = 4 / 4.243, θ ≈ 43.3°. For the face VBC, use the line VN to the midpoint of BC: MN = 3, tan φ = 4/3, φ ≈ 53.1°.",
          tip: "先畫出有直角嘅三角形（VMA、VMN），標好已知邊。Edge 用對角線一半，face 用中點 N。" },
        { title: "Bearings: draw the diagram, find the distance and the bearing", paper: "P2", where: "Paper 2 · 6 marks",
          q: "A ship sails 12 km from P on a bearing of 040° to Q, then 9 km on a bearing of 130° to R. (a) Show that angle PQR = 90°. (b) Find PR. (c) Find the bearing of R from P.",
          marks: [
            ["A1", "diagram with North lines at P and Q, 40° and 130° marked"],
            ["M1", "bearing of P from Q = 220°, so ∠PQR = 220° − 130° = __90°__ (AG)"],
            ["A1", "PR = √(12² + 9²) = __15 km__"],
            ["M1", "tan(∠QPR) = 9/12 ⇒ ∠QPR = 36.9°"],
            ["A1", "bearing = 40° + 36.9° = __077°__ (76.9°)"],
          ],
          svg: frBearing, svgCaption: "back bearing at Q: 040° + 180° = 220°",
          model: "The back bearing from Q to P is 220°. The angle between QP (220°) and QR (130°) is 90°. So PR = √(144 + 81) = 15 km. ∠QPR = arctan(9/12) = 36.87°, and the bearing of R from P is 040° + 36.9° = 076.9° ≈ 077°.",
          tip: "Bearing 一定由 North 順時針、寫三位數。畫 North 線喺每個轉向點，角度先唔會計錯。" },
        { title: "Ambiguous case: find both possible triangles", paper: "P2", where: "Paper 2 · 5 marks",
          q: "In triangle ABC, A = 40°, a = 7 cm and b = 10 cm. Find the two possible values of angle B and the corresponding lengths of c.",
          marks: [
            ["M1", "sine rule: sin B = 10 sin 40° / 7 = 0.918…"],
            ["A1", "__B = 66.7°__"],
            ["A1", "or __B = 113.3°__ (180° − 66.7°, valid since 40° + 113.3° < 180°)"],
            ["M1", "C = 73.3° or 26.7°, then c = 7 sin C / sin 40°"],
            ["A1", "__c = 10.4 cm__ or __c = 4.89 cm__"],
          ],
          svg: figAmbig, svgCaption: "the arc of radius a from C cuts the base twice",
          model: "sin B = 10 sin 40° / 7 = 0.9183, so B = 66.7° or 113.3°. Both are valid because 40° + 113.3° < 180°. Then C = 73.3° giving c = 7 sin 73.3° / sin 40° = 10.4 cm, or C = 26.7° giving c = 4.89 cm.",
          tip: "用 sine rule 搵角，一定要問自己：180° − B 得唔得？b sin A < a < b 就有兩個答案。" },
      ],
      concepts: [
        { h: "Area of a segment", b: "<p>Segment = sector − triangle: \\(A = \\frac12 r^2\\theta - \\frac12 r^2\\sin\\theta = \\frac12 r^2(\\theta - \\sin\\theta)\\), θ in radians. Perimeter of a segment = arc + chord, where chord \\(= 2r\\sin\\frac{\\theta}{2}\\) (or use the cosine rule).</p>" },
      ],
    },

    "math-8": {
      diagrams: [
        { title: "y = sin x, 0 ≤ x ≤ 2π: amplitude 1, period 2π", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [{ f: Math.sin }],
          points: [{ at: [Math.PI / 2, 1], label: "(π/2, 1)" }, { at: [Math.PI, 0], label: "π" }, { at: [1.5 * Math.PI, -1], label: "(3π/2, −1)" }, { at: [2 * Math.PI, 0], label: "2π" }] },
        { title: "y = cos x, 0 ≤ x ≤ 2π: starts at its maximum (0, 1)", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [{ f: Math.cos, color: "b" }],
          points: [{ at: [0, 1], label: "(0, 1)" }, { at: [Math.PI / 2, 0], label: "π/2" }, { at: [Math.PI, -1], label: "(π, −1)" }, { at: [1.5 * Math.PI, 0], label: "3π/2" }] },
        { title: "y = tan x: period π, asymptotes x = π/2 and x = 3π/2, zeros at 0, π, 2π", x: [0, 6.6], y: [-4, 4], grid: false, curves: [{ f: Math.tan, color: "c" }],
          vlines: [{ x: Math.PI / 2, label: "π/2" }, { x: 1.5 * Math.PI, label: "3π/2" }], points: [{ at: [Math.PI / 4, 1], label: "(π/4, 1)" }, { at: [Math.PI, 0], label: "π" }] },
        { title: "y = 2 sin(2(x − π/4)) + 1: amplitude 2, period π, phase shift π/4 right, principal axis y = 1", x: [0, 6.6], y: [-2, 3.6], grid: false,
          curves: [{ f: (x) => 2 * Math.sin(2 * (x - Math.PI / 4)) + 1 }, { f: Math.sin, color: "muted", dash: true }],
          hlines: [{ y: 1, label: "y = 1 (axis)" }, { y: 3, label: "max 3" }, { y: -1, label: "min −1" }], points: [{ at: [Math.PI / 2, 3], label: "(π/2, 3)" }, { at: [Math.PI / 4, 1], label: "(π/4, 1)" }] },
        { title: "sin x = ½ for 0 ≤ x ≤ 2π: two solutions, x = π/6 and 5π/6", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [{ f: Math.sin }],
          hlines: [{ y: 0.5, label: "y = ½" }], points: [{ at: [Math.PI / 6, 0.5], label: "π/6" }, { at: [5 * Math.PI / 6, 0.5], label: "5π/6" }] },
        { title: "sin x and cos x meet at x = π/4 and 5π/4 (tan x = 1); cos x = sin(x + π/2)", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [
          { f: Math.sin, label: "sin", labelX: 2.6 }, { f: Math.cos, color: "b", label: "cos", labelX: 5.6 }], points: [{ at: [Math.PI / 4, Math.SQRT1_2], label: "π/4" }, { at: [1.25 * Math.PI, -Math.SQRT1_2], label: "5π/4" }] },
        { title: "Period changes: sin 2x (period π) vs sin(x/2) (period 4π)", x: [0, 12.6], y: [-1.5, 1.5], grid: false, curves: [
          { f: (x) => Math.sin(2 * x), label: "sin 2x", labelX: 0.5 }, { f: (x) => Math.sin(x / 2), color: "b", label: "sin(x/2)", labelX: 10.5 }] },
        { title: "Double-angle identity in pictures: cos 2x = 1 − 2sin²x (the two graphs coincide)", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [
          { f: (x) => Math.cos(2 * x), label: "cos 2x", labelX: 3.3 }, { f: (x) => 1 - 2 * Math.sin(x) ** 2, color: "b", dash: true }] },
      ],
      figures: [
        { title: "Unit circle exact values (first quadrant)", caption: "cos θ is the x-coordinate, sin θ the y-coordinate", svg: figUnit },
        { title: "Quadrant signs and related angles", caption: "'All Students Take Calculus': which ratios are positive; use symmetry to find all solutions", svg: figCAST },
        { title: "Exact-value triangles", caption: "draw these to recall sin, cos, tan of 30°, 45°, 60° (π/6, π/4, π/3) in Paper 1", svg: figExactTri },
      ],
      frames: [
        { title: "Sketch a transformed tangent graph with its asymptote", paper: "P1", where: "Paper 1 · 4 marks",
          q: "Sketch the graph of \\(y = \\tan\\left(x - \\frac{\\pi}{4}\\right)\\) for \\(0 \\le x \\le \\pi\\), showing any asymptotes and axis intercepts.",
          marks: [
            ["A1", "y-intercept __(0, −1)__ since tan(−π/4) = −1"],
            ["A1", "x-intercept __(π/4, 0)__"],
            ["A1", "vertical asymptote __x = 3π/4__ (where x − π/4 = π/2)"],
            ["A1", "correct increasing branches either side of the asymptote, ending at x = π with y = −1"],
          ],
          diagram: { title: "y = tan(x − π/4), 0 ≤ x ≤ π", x: [0, 3.4], y: [-4, 4], grid: false, curves: [{ f: (x) => Math.tan(x - Math.PI / 4), domain: [0, Math.PI] }],
            vlines: [{ x: 0.75 * Math.PI, label: "x = 3π/4" }], points: [{ at: [0, -1], label: "(0, −1)" }, { at: [Math.PI / 4, 0], label: "(π/4, 0)" }, { at: [Math.PI, -1], label: "(π, −1)" }] },
          model: "This is y = tan x translated π/4 to the right. At x = 0, y = tan(−π/4) = −1. It crosses the x-axis at x = π/4. The asymptote of tan x at π/2 moves to x = 3π/4. The curve increases from (0, −1) through (π/4, 0) towards +∞ at 3π/4, then from −∞ rises to (π, −1).",
          tip: "tan 嘅漸近線喺入面 = π/2 嘅位置；畫虛線同埋寫埋方程 x = 3π/4。" },
        { title: "Use the graph to find the number of solutions of a trig equation", paper: "P1", where: "Paper 1 · 3 marks",
          q: "Find the number of solutions of \\(\\sin 2x = 0.3\\) for \\(0 \\le x \\le 2\\pi\\), justifying your answer with a sketch.",
          marks: [
            ["M1", "sketch y = sin 2x over [0, 2π]: period π, so __two full cycles__"],
            ["M1", "draw the line y = 0.3 and count intersections"],
            ["A1", "__4 solutions__ (two per cycle)"],
          ],
          diagram: { title: "y = sin 2x meets y = 0.3 four times on [0, 2π]", x: [0, 6.6], y: [-1.5, 1.5], grid: false, curves: [{ f: (x) => Math.sin(2 * x) }],
            hlines: [{ y: 0.3, label: "y = 0.3" }], points: [0.1523, Math.PI / 2 - 0.1523, Math.PI + 0.1523, 1.5 * Math.PI - 0.1523].map((x) => ({ at: [x, 0.3] })) },
          model: "sin 2x has period π, so on 0 ≤ x ≤ 2π it completes two cycles. The line y = 0.3 cuts each cycle twice (0 < 0.3 < 1), so there are 4 solutions.",
          tip: "先計有幾多個 cycle（2π ÷ period），每個 cycle 通常 2 個交點；k = ±1 嘅時候就只得 1 個。" },
      ],
    },
  }});
})();
