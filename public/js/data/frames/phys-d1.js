/* Physics - diagrams and graphs to know, A.1-C.2 (phys-1 ... phys-12) (original). */
(function () {
  // ---------- tiny SVG helpers (strings only) ----------
  let N = 0, cur = "";
  const C = { k: "currentColor", a: "var(--fig-a)", b: "var(--fig-b)", c: "var(--fig-c)", d: "var(--fig-d)", m: "var(--fig-muted)" };
  const svg = (w, h, label, body) => {
    cur = "ar-pd1-" + ++N;
    const mk = Object.entries(C).map(([k, v]) => `<marker id="${cur}${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${v}"/></marker>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="sans-serif" font-size="12"><defs>${mk}</defs>${body()}</svg>`;
  };
  const ln = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[o.c || "k"]}" stroke-width="${o.w || 1.6}"${o.d ? ' stroke-dasharray="5 4"' : ""}${o.a ? ` marker-end="url(#${cur}${o.c || "k"})"` : ""}${o.s ? ` marker-start="url(#${cur}${o.c || "k"})"` : ""}/>`;
  const ar = (x1, y1, x2, y2, c = "k", w = 2) => ln(x1, y1, x2, y2, { a: 1, c, w });
  const tx = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${C[o.c || "k"]}" font-size="${o.s || 12}"${o.a ? ` text-anchor="${o.a}"` : ""}${o.b ? ' font-weight="bold"' : ""}${o.i ? ' font-style="italic"' : ""}>${s}</text>`;
  const rc = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 0}" fill="${o.f ? C[o.f] || o.f : "none"}" stroke="${C[o.c || "k"]}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="5 4"' : ""}/>`;
  const ci = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f ? C[o.f] || o.f : "none"}" stroke="${o.c === "none" ? "none" : C[o.c || "k"]}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const pa = (d, o = {}) => `<path d="${d}" fill="${o.f ? C[o.f] || o.f : "none"}" stroke="${C[o.c || "k"]}" stroke-width="${o.w || 1.6}"${o.d ? ' stroke-dasharray="5 4"' : ""}${o.a ? ` marker-end="url(#${cur}${o.c || "k"})"` : ""}/>`;
  const FILL = "var(--fig-fill)";
  // circuit parts
  const res = (x, y, v, lab, ly) => (v ? rc(x - 6, y - 16, 12, 32, { f: FILL }) : rc(x - 16, y - 6, 32, 12, { f: FILL })) + (lab ? tx(v ? x + 12 : x, v ? y + 4 : y - (ly || 12), lab, { a: v ? "start" : "middle" }) : "");
  const meter = (x, y, L) => ci(x, y, 11, { f: FILL }) + tx(x, y + 4, L, { a: "middle", b: 1 });
  const lamp = (x, y) => ci(x, y, 11, { f: FILL }) + ln(x - 7.8, y - 7.8, x + 7.8, y + 7.8) + ln(x - 7.8, y + 7.8, x + 7.8, y - 7.8);
  const cellH = (x, y) => ln(x - 4, y - 14, x - 4, y + 14, { w: 1.6 }) + ln(x + 4, y - 7, x + 4, y + 7, { w: 4 }); // long (+) left, short (−) right; wire gap x-4..x+4

  // ---------- figures ----------
  const projFig = () => svg(390, 300, "Velocity components of a projectile", () => {
    const P = [[30, 190, 60], [105, 77.5, 30], [180, 40, 0], [255, 77.5, -30], [330, 190, -60]];
    let s = ln(15, 190, 370, 190, { c: "m" }) + pa("M30 190 Q180 -110 330 190", { c: "m", d: 1 });
    P.forEach(([x, y, vy]) => {
      s += ar(x, y, x + 38, y, "b");
      if (vy) s += ar(x, y, x, y - vy, "d");
      s += ci(x, y, 3.5, { f: "currentColor", c: "none" });
    });
    s += tx(180, 28, "top: vᵧ = 0, v = vₓ", { a: "middle" }) + ar(362, 50, 362, 95, "c") + tx(356, 112, "a = g", { a: "end", c: "c" }) + tx(356, 126, "(down, always)", { a: "end", c: "c", s: 11 });
    s += tx(20, 266, "vₓ (blue): same length everywhere - no horizontal force", { c: "b", s: 11 }) + tx(20, 280, "vᵧ (red): decreases by g each second, zero at top, then grows downwards", { c: "d", s: 11 }) + tx(20, 294, "path symmetric (no air resistance); speed at landing = launch speed", { s: 11 });
    return s;
  });

  const fbdPanel = (ox, oy, title, forces, obj) => {
    let s = tx(ox + 85, oy + 16, title, { a: "middle", b: 1, s: 12 });
    const cx = ox + 85, cy = oy + 100;
    s += obj ? obj(cx, cy) : rc(cx - 15, cy - 15, 30, 30, { f: FILL });
    forces.forEach(([dx, dy, lab, c, sx, sy]) => { s += ar(cx + (sx || 0), cy + (sy || 0), cx + (sx || 0) + dx, cy + (sy || 0) + dy, c); s += dx ? tx(cx + (sx || 0) + dx * 0.6, cy + (sy || 0) - 8, lab, { c, a: "middle" }) : tx(cx + 8, cy + (sy || 0) + dy * 0.8, lab, { c }); });
    return s;
  };
  const fbdFig = () => svg(350, 370, "Four free-body diagrams", () =>
    fbdPanel(0, 0, "Book at rest on a table", [[0, -45, "N", "b", 0, -15], [0, 45, "W = mg", "d", 0, 15]]) + tx(85, 175, "N = W (resultant zero)", { a: "middle", s: 11 }) +
    fbdPanel(175, 0, "Lift accelerating upwards", [[0, -50, "T", "b", 0, -15], [0, 32, "W", "d", 0, 15]]) + tx(260, 175, "T > W, resultant upwards", { a: "middle", s: 11 }) +
    fbdPanel(0, 185, "Skydiver at terminal speed", [[0, -45, "drag", "b", 0, -15], [0, 45, "W", "d", 0, 15]], (x, y) => ci(x, y, 14, { f: FILL })) + tx(85, 362, "drag = W, a = 0, v constant", { a: "middle", s: 11 }) +
    fbdPanel(175, 185, "Car accelerating", [[0, -45, "N", "b", 0, -12], [0, 45, "W", "d", 0, 12], [50, 0, "driving", "c", 22, 0], [-36, 0, "drag", "m", -22, 0]], (x, y) => rc(x - 22, y - 12, 44, 24, { f: FILL, r: 4 })) + tx(260, 362, "driving force > drag", { a: "middle", s: 11 }) +
    ln(175, 10, 175, 360, { c: "m", d: 1, w: 1 }) + ln(10, 185, 340, 185, { c: "m", d: 1, w: 1 }));

  const circFig = () => svg(380, 230, "Circular motion directions and a conical pendulum", () => {
    let s = ci(95, 115, 70, { c: "m", d: 1 }) + ci(95, 115, 3, { f: "currentColor", c: "none" }) + tx(95, 132, "centre", { a: "middle", s: 11 });
    s += ci(95, 45, 7, { f: FILL }) + ar(102, 45, 165, 45, "b") + tx(150, 37, "v (tangent)", { c: "b" }) + ar(95, 52, 95, 95, "d") + tx(101, 80, "a, F", { c: "d" });
    s += ci(165, 115, 7, { f: FILL }) + ar(165, 108, 165, 50, "b") + ar(158, 115, 118, 115, "d") + tx(95, 205, "speed constant, velocity changes:", { a: "middle", s: 11 }) + tx(95, 220, "a = v²/r towards the centre", { a: "middle", s: 11 });
    // conical pendulum
    s += ln(240, 20, 340, 20, { w: 3 }) + ln(290, 20, 290, 175, { c: "m", d: 1, w: 1 }) + ln(290, 20, 340, 140) + `<ellipse cx="290" cy="140" rx="50" ry="10" fill="none" stroke="${C.m}" stroke-dasharray="4 3"/>` + ci(340, 140, 7, { f: FILL });
    s += ar(340, 140, 320, 92, "b") + tx(312, 88, "T", { c: "b", a: "end" }) + ar(340, 140, 340, 192, "d") + tx(346, 192, "W", { c: "d" }) + ar(333, 150, 297, 150, "c") + tx(296, 166, "resultant", { c: "c", s: 11 }) + tx(296, 179, "(to centre)", { c: "c", s: 11 });
    s += tx(290, 215, "T cos θ = mg ; T sin θ = mv²/r", { a: "middle", s: 11 }) + `<path d="M290 50 A30 30 0 0 0 301.5 47.7" fill="none" stroke="currentColor"/>` + tx(296, 64, "θ", { s: 11 });
    return s;
  });

  const vertCircFig = () => svg(300, 280, "Forces at the top and bottom of a vertical circle", () => { let o = "";
    let s = ci(150, 145, 80, { c: "m", d: 1 }) + ci(150, 145, 3, { f: "currentColor", c: "none" }) + ln(150, 145, 150, 65, { c: "m" }) + ln(150, 145, 150, 225, { c: "m" });
    s += ci(150, 65, 8, { f: FILL }) + ar(144, 73, 144, 110, "b") + tx(138, 105, "T", { c: "b", a: "end" }) + ar(156, 73, 156, 120, "d") + tx(162, 117, "W", { c: "d" });
    s += ci(150, 225, 8, { f: FILL }) + ar(144, 217, 144, 155, "b") + tx(138, 165, "T", { c: "b", a: "end" }) + ar(156, 233, 156, 261, "d") + tx(162, 257, "W", { c: "d" });
    s += tx(10, 20, "top: T + mg = mv²/r", { s: 12 }) + tx(10, 36, "(slowest; string slack if v² < gr)", { s: 11 }) + tx(295, 200, "bottom:", { a: "end" }) + tx(295, 215, "T − mg = mv²/r", { a: "end" }) + tx(295, 230, "(T largest)", { a: "end", s: 11 });
    return s;
  });

  const thirdLawFig = () => svg(340, 200, "Newton's third-law pair: Earth and apple", () => {
    let s = pa("M20 200 A230 230 0 0 1 320 200", { f: FILL }) + tx(170, 188, "Earth", { a: "middle", b: 1 }) + ci(170, 60, 14, { f: FILL }) + tx(192, 50, "apple");
    s += ar(170, 74, 170, 118, "d") + tx(176, 108, "pull of Earth on apple (W)", { c: "d", s: 11 }) + ar(160, 150, 160, 106, "b") + tx(154, 142, "pull of apple on Earth", { c: "b", a: "end", s: 11 });
    s += tx(10, 20, "Pair: equal size, opposite direction, same type (gravity),", { s: 11 }) + tx(10, 34, "acting on DIFFERENT bodies. N and W on a book are NOT a pair.", { s: 11 });
    return s;
  });

  const sankeyFig = () => svg(400, 265, "Sankey diagram for a car engine", () => {
    let s = pa("M20 40 H320 V30 L345 55 L320 80 V70 H150 A110 110 0 0 1 260 180 V230 H270 L215 255 L160 230 H170 V180 A20 20 0 0 0 150 160 H20 Z", { f: FILL });
    s += tx(28, 96, "100 J", { b: 1 }) + tx(28, 112, "chemical", { s: 11 }) + tx(28, 125, "(fuel) in", { s: 11 }) + tx(230, 59, "25 J kinetic (useful)", { a: "middle", s: 11 }) + tx(276, 205, "75 J thermal") + tx(276, 219, "(wasted, to surroundings)", { s: 11 });
    s += tx(20, 182, "width ∝ energy;", { s: 11 }) + tx(20, 196, "outputs add to input", { s: 11 }) + tx(20, 216, "efficiency", { b: 1 }) + tx(20, 231, "= 25/100 = 25 %", { b: 1 });
    return s;
  });

  const workFig = () => svg(360, 230, "Work done by a force at an angle", () => {
    let s = `<g transform="translate(0,60)">` + ln(10, 120, 350, 120, { c: "m" }) + rc(60, 80, 60, 40, { f: FILL }) + ar(120, 100, 200, 54, "a") + tx(205, 52, "F", { c: "a", b: 1 }) + ln(120, 100, 200, 100, { c: "m", d: 1, w: 1 }) + ar(120, 100, 200, 100, "b") + tx(160, 114, "F cos θ", { c: "b", a: "middle", s: 11 });
    s += `<path d="M150 100 A30 30 0 0 0 146 85" fill="none" stroke="currentColor"/>` + tx(152, 92, "θ", { s: 11 }) + ar(60, 145, 260, 145, "c") + tx(160, 162, "displacement s", { c: "c", a: "middle" }) + "</g>";
    s += tx(10, 18, "W = Fs cos θ", { b: 1 }) + tx(10, 34, "only the component along s does work;", { s: 11 }) + tx(10, 48, "F ⊥ s (e.g. N, weight on level) → W = 0", { s: 11 });
    return s;
  });

  const pendEnergyFig = () => svg(340, 200, "Energy changes of a swinging pendulum", () => {
    let s = ln(120, 15, 220, 15, { w: 3 }) + ln(170, 15, 90, 110) + ln(170, 15, 170, 140, { c: "m", d: 1 }) + ln(170, 15, 250, 110, { c: "m", d: 1 }) + pa("M90 110 Q170 175 250 110", { c: "m", d: 1 });
    s += ci(90, 110, 9, { f: FILL }) + ci(170, 140, 9, { f: FILL }) + ci(250, 110, 9, { f: FILL }) + tx(84, 114, "A", { a: "end", b: 1 }) + tx(170, 168, "B", { a: "middle", b: 1 }) + tx(262, 114, "C", { b: 1 });
    s += tx(10, 135, "A, C: Eₚ max, Eₖ = 0", { s: 11 }) + tx(10, 150, "(momentarily at rest)", { s: 11 }) + tx(170, 188, "B: Eₖ max, Eₚ min", { a: "middle", s: 11 }) + ln(300, 110, 300, 140, { s: 1, a: 1, c: "c" }) + tx(306, 128, "Δh", { c: "c" });
    s += tx(330, 30, "½mv²(B) = mgΔh", { a: "end" }) + tx(330, 46, "v = √(2gΔh)", { a: "end" });
    return s;
  });

  const torqueFig = () => svg(360, 260, "Torque and perpendicular distance", () => {
    let s = ln(60, 140, 300, 140, { w: 5, c: "m" }) + ci(60, 140, 6, { f: FILL }) + tx(52, 132, "O (pivot)", { a: "end", s: 11 }) + ar(300, 140, 340, 70.7, "a") + tx(344, 70, "F", { c: "a", b: 1 });
    s += ln(300, 140, 240, 243.9, { c: "m", d: 1, w: 1 }) + ln(60, 140, 240, 243.9, { c: "b", d: 1 }) + tx(130, 210, "r⊥ = r sin θ", { c: "b", a: "middle" }) + tx(180, 160, "r", { a: "middle", b: 1 });
    s += `<path d="M330 140 A30 30 0 0 0 315 114" fill="none" stroke="currentColor"/>` + tx(320, 136, "θ", { s: 11 }) + ln(300, 140, 345, 140, { c: "m", d: 1, w: 1 });
    s += tx(20, 30, "τ = Fr sin θ = F × perpendicular distance", { b: 1 }) + tx(20, 46, "from the pivot to the line of action of F", { s: 11 }) + tx(20, 60, "F through the pivot (θ = 0) → τ = 0", { s: 11 });
    return s;
  });

  const rollFig = () => svg(340, 205, "Velocities of points on a rolling wheel", () => {
    let s = ln(10, 170, 330, 170, { c: "m" }) + ci(130, 110, 60, { f: FILL }) + ci(130, 110, 3, { f: "currentColor", c: "none" }) + ln(130, 50, 130, 170, { c: "m", d: 1, w: 1 });
    s += ar(130, 50, 250, 50, "d") + tx(254, 54, "2v (top)", { c: "d" }) + ar(130, 110, 190, 110, "b") + tx(194, 114, "v (centre)", { c: "b" }) + ci(130, 170, 4, { f: C.c, c: "none" }) + tx(140, 186, "contact point: v = 0", { c: "c", s: 11 }) + tx(140, 199, "(instantaneously at rest)", { c: "c", s: 11 });
    s += pa("M95 70 A50 50 0 0 1 165 70", { a: 1, c: "m" }) + tx(130, 80, "ω", { a: "middle" }) + tx(330, 100, "no slipping:", { a: "end", s: 11 }) + tx(330, 114, "v = ωr", { a: "end", b: 1 }) + tx(330, 128, "Eₖ = ½mv² + ½Iω²", { a: "end", s: 11 });
    return s;
  });

  const inertiaFig = () => svg(360, 170, "Moment of inertia: ring compared with disc", () => {
    let s = ci(70, 75, 45, { w: 6 }) + ci(70, 75, 2, { f: "currentColor", c: "none" }) + tx(70, 140, "ring/hoop", { a: "middle", b: 1 }) + tx(70, 156, "I = MR²", { a: "middle" });
    s += ci(180, 75, 45, { f: FILL }) + ci(180, 75, 2, { f: "currentColor", c: "none" }) + tx(180, 140, "solid disc/cylinder", { a: "middle", b: 1 }) + tx(180, 156, "I = ½MR²", { a: "middle" });
    s += ln(180, 75, 225, 75, { c: "m" }) + tx(203, 70, "R", { a: "middle", s: 11 });
    s += tx(250, 40, "same M, R:", { s: 11 }) + tx(250, 56, "mass further from", { s: 11 }) + tx(250, 70, "the axis → larger I", { s: 11 }) + tx(250, 92, "I = Σmr²", { b: 1 }) + tx(250, 110, "larger I rolls", { s: 11 }) + tx(250, 124, "down a slope", { s: 11 }) + tx(250, 138, "more slowly", { s: 11 });
    return s;
  });

  const beamFig = () => svg(380, 200, "Beam in equilibrium on two supports", () => {
    let s = rc(30, 92, 320, 12, { f: FILL }) + pa("M70 104 L58 128 H82 Z") + pa("M310 104 L298 128 H322 Z");
    s += ar(70, 170, 70, 108, "b") + tx(76, 165, "R₁", { c: "b" }) + ar(310, 170, 310, 108, "b") + tx(316, 165, "R₂", { c: "b" }) + ar(190, 104, 190, 160, "d") + tx(196, 156, "W (beam, at centre)", { c: "d", s: 11 }) + ar(260, 40, 260, 90, "d") + tx(266, 50, "load", { c: "d" });
    s += ln(70, 80, 190, 80, { c: "m", s: 1, a: 1, w: 1 }) + tx(130, 75, "d₁", { a: "middle", s: 11 }) + ln(70, 64, 260, 64, { c: "m", s: 1, a: 1, w: 1 }) + tx(165, 59, "d₂", { a: "middle", s: 11 });
    s += tx(10, 22, "Equilibrium: ΣF = 0 (R₁ + R₂ = W + load) and Στ = 0 about any point", { s: 11 }) + tx(10, 194, "moments about R₁: R₂ × 240 = W × d₁ + load × d₂ (eliminates R₁)", { s: 11 });
    return s;
  });

  const worldFig = () => svg(380, 275, "Spacetime diagram with worldlines and light cone", () => {
    let s = pa("M190 220 L40 70 V30 H340 V70 Z", { f: FILL, c: "m", w: 0.1 }) + ar(30, 220, 360, 220) + tx(360, 236, "x", { a: "end" }) + ar(190, 240, 190, 15) + tx(196, 22, "ct");
    s += ln(190, 220, 40, 70, { c: "a", d: 1 }) + ln(190, 220, 340, 70, { c: "a", d: 1 }) + tx(302, 132, "light (45°)", { c: "a", s: 11 }) + tx(40, 62, "light", { c: "a", s: 11 });
    s += ln(110, 220, 110, 30, { c: "b" }) + tx(106, 44, "object at rest", { c: "b", a: "end", s: 11 }) + ln(190, 220, 280, 40, { c: "c" }) + tx(250, 52, "v = 0.5c", { c: "c", s: 11, a: "end" });
    s += pa("M190 220 Q190 160 240 60", { c: "d" }) + tx(246, 66, "accelerating", { c: "d", s: 11 }) + ci(230, 140, 3.5, { f: "currentColor", c: "none" }) + tx(236, 148, "event", { s: 11 });
    s += tx(190, 250, "shaded cone: events the origin can affect;", { a: "middle", s: 11 }) + tx(190, 266, "worldlines always steeper than 45° (v < c)", { a: "middle", s: 11 });
    return s;
  });

  const lightClockFig = () => svg(380, 200, "Light clock and time dilation", () => {
    let s = ln(20, 30, 80, 30, { w: 3 }) + ln(20, 150, 80, 150, { w: 3 }) + ar(50, 148, 50, 34, "a") + tx(56, 95, "L", { b: 1 }) + tx(50, 175, "clock at rest:", { a: "middle", s: 11 }) + tx(50, 190, "Δt₀ = 2L/c", { a: "middle", s: 11 });
    [140, 220, 300].forEach((x) => (s += ln(x - 25, 30, x + 25, 30, { w: 3, c: "m" }) + ln(x - 25, 150, x + 25, 150, { w: 3, c: "m" })));
    s += ar(140, 148, 218, 34, "a") + ar(222, 34, 300, 148, "a") + ln(140, 150, 220, 150, { c: "b", d: 1 }) + ln(220, 150, 220, 30, { c: "m", d: 1 }) + tx(180, 168, "vΔt/2", { c: "b", a: "middle" }) + tx(226, 100, "L", { b: 1 }) + tx(168, 80, "cΔt/2", { c: "a", a: "end" });
    s += ar(320, 15, 370, 15, "b") + tx(310, 19, "v", { c: "b", a: "end" }) + tx(250, 192, "(cΔt/2)² = L² + (vΔt/2)² ⇒ Δt = γΔt₀", { a: "middle", s: 11 });
    return s;
  });

  const twinFig = () => svg(300, 230, "Twin paradox on a spacetime diagram", () => {
    let s = ar(30, 210, 280, 210) + tx(280, 225, "x", { a: "end" }) + ar(60, 220, 60, 15) + tx(66, 22, "ct");
    s += ln(60, 210, 60, 30, { c: "b", w: 2.5 }) + tx(56, 120, "Earth twin", { c: "b", a: "end", s: 11 }) + pa("M60 210 L120 120 L60 30", { c: "d", w: 2.5 }) + ci(120, 120, 4, { f: C.d, c: "none" }) + tx(128, 116, "turnaround", { c: "d", s: 11 }) + tx(128, 130, "(changes frame)", { c: "d", s: 11 });
    s += tx(100, 175, "traveller (v = 0.67c)", { c: "d", s: 11 }) + tx(290, 40, "traveller ages less:", { a: "end", s: 11 }) + tx(290, 54, "shorter proper time", { a: "end", s: 11 });
    return s;
  });

  const galFig = () => svg(360, 190, "Galilean transformation between frames S and S′", () => {
    let s = ar(20, 160, 340, 160) + tx(338, 176, "x", { a: "end" }) + ar(30, 170, 30, 30) + tx(36, 36, "S");
    s += ar(130, 150, 340, 150, "b") + ar(140, 160, 140, 40, "b") + tx(146, 50, "S′", { c: "b" }) + ar(150, 70, 200, 70, "b") + tx(204, 74, "v", { c: "b" });
    s += ci(280, 100, 5, { f: C.a, c: "none" }) + tx(286, 96, "event (x, t)", { c: "a", s: 11 }) + ln(30, 120, 280, 120, { c: "m", s: 1, a: 1, w: 1 }) + tx(85, 115, "x", { s: 11 }) + ln(140, 135, 280, 135, { c: "b", s: 1, a: 1, w: 1 }) + tx(210, 130, "x′", { c: "b", s: 11 }) + ln(30, 180, 140, 180, { c: "m", s: 1, a: 1, w: 1 }) + tx(85, 176, "vt", { s: 11, a: "middle" });
    s += tx(340, 20, "x′ = x − vt,  t′ = t", { a: "end", b: 1 }) + tx(340, 36, "u′ = u − v", { a: "end" });
    return s;
  });

  const particlesFig = () => svg(390, 160, "Particle model of solid, liquid and gas", () => {
    let s = "";
    const box = (ox, name, pts, note) => { s += rc(ox, 20, 110, 100); pts.forEach(([x, y]) => (s += ci(ox + x, 20 + y, 7, { f: FILL }))); s += tx(ox + 55, 138, name, { a: "middle", b: 1 }) + tx(ox + 55, 153, note, { a: "middle", s: 11 }); };
    const sol = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) sol.push([12 + c * 17, 15 + r * 17]);
    box(10, "solid", sol, "fixed lattice, vibrate");
    box(140, "liquid", [[12, 88], [27, 85], [42, 88], [58, 86], [74, 89], [90, 87], [18, 72], [34, 70], [50, 72], [66, 71], [83, 73], [26, 56], [42, 56], [60, 56], [78, 57], [96, 72], [12, 41], [96, 55]], "close, move past");
    box(270, "gas", [[15, 20], [70, 15], [40, 50], [92, 45], [20, 85], [60, 80], [95, 88]], "far apart, random");
    return s;
  });

  const shcRigFig = () => svg(380, 250, "Electrical method for specific heat capacity", () => {
    let s = rc(35, 95, 130, 115, { d: 1, c: "m" }) + tx(100, 226, "insulation (lagging)", { a: "middle", s: 11, c: "m" }) + rc(50, 110, 100, 85, { f: FILL }) + tx(100, 188, "metal block, mass m", { a: "middle", s: 11 });
    s += rc(72, 70, 10, 100, { f: C.d, c: "d" }) + tx(66, 84, "heater", { a: "end", s: 11, c: "d" }) + rc(118, 62, 8, 108, { r: 4 }) + ci(122, 166, 6, { f: C.d, c: "d" }) + tx(132, 74, "thermometer", { s: 11 });
    s += pa("M74 70 V15 H246 M254 15 H330 V89 M330 111 V235 H200 V50 H80 V70") + ln(246, 3, 246, 27) + ln(254, 8, 254, 22, { w: 4 }) + tx(250, 40, "supply", { a: "middle", s: 11 }) + meter(330, 100, "A");
    s += ln(160, 15, 160, 21) + meter(160, 32, "V") + ln(160, 43, 160, 50) + ci(160, 15, 2.5, { f: "currentColor", c: "none" }) + ci(160, 50, 2.5, { f: "currentColor", c: "none" });
    s += tx(215, 140, "E = VIt", { b: 1 }) + tx(215, 158, "c = VIt / (mΔT)") + tx(215, 176, "(or a joulemeter)", { s: 11 }) + tx(215, 194, "plot T against t", { s: 11 });
    return s;
  });

  const condFig = () => svg(360, 170, "Thermal conduction through a slab", () => {
    let s = rc(130, 20, 70, 120, { f: FILL }) + tx(120, 80, "T_H", { a: "end", c: "d", b: 1 }) + tx(210, 80, "T_C", { c: "b", b: 1 }) + ar(60, 100, 300, 100, "d") + tx(300, 118, "ΔQ/Δt", { a: "end", c: "d" });
    s += ln(130, 150, 200, 150, { s: 1, a: 1, w: 1, c: "m" }) + tx(165, 165, "Δx", { a: "middle", s: 11 }) + tx(165, 14, "area A, conductivity k", { a: "middle", s: 11 });
    s += tx(350, 40, "ΔQ/Δt = kA ΔT/Δx", { a: "end", b: 1 }) + tx(350, 56, "hot → cold;", { a: "end", s: 11 }) + tx(350, 70, "rate ∝ A, ΔT, 1/Δx", { a: "end", s: 11 });
    return s;
  });

  const energyBalFig = () => svg(390, 250, "Simple energy balance of Earth with an atmosphere", () => {
    let s = rc(10, 205, 370, 35, { f: FILL }) + tx(195, 228, "Earth's surface (T ≈ 288 K)", { a: "middle" }) + rc(10, 95, 370, 40, { f: FILL, c: "m", d: 1 }) + tx(370, 120, "atmosphere (CO₂, H₂O, CH₄, N₂O)", { a: "end", s: 11 });
    s += ar(40, 20, 90, 203, "a") + tx(20, 18, "incoming solar ≈ 340 W m⁻² (S/4)", { c: "a", s: 11 });
    s += ar(95, 200, 140, 30, "m") + tx(146, 34, "reflected ≈ 100 (albedo ≈ 0.3)", { c: "m", s: 11 }) + tx(52, 155, "short λ", { c: "a", s: 11 }) + tx(52, 168, "(visible)", { c: "a", s: 11 });
    s += ar(230, 203, 230, 118, "d") + tx(236, 175, "IR from surface", { c: "d", s: 11 }) + ar(300, 112, 300, 30, "d") + tx(306, 40, "IR to space", { c: "d", s: 11 }) + ar(330, 118, 330, 203, "d") + tx(336, 160, "back-", { c: "d", s: 11 }) + tx(336, 173, "radiated", { c: "d", s: 11 });
    s += tx(236, 88, "absorbed, re-emitted in all directions", { s: 11, a: "end" }).replace('x="236"', 'x="290"');
    return s;
  });

  const co2Fig = () => svg(400, 200, "Vibration modes of carbon dioxide", () => {
    let s = "";
    const mol = (y, aO1, aC, aO2, name, note, c) => {
      s += ln(50, y, 210, y, { w: 3, c: "m" }) + ci(50, y, 13, { f: FILL }) + ci(130, y, 10, { f: FILL }) + ci(210, y, 13, { f: FILL }) + tx(50, y + 4, "O", { a: "middle", s: 11 }) + tx(130, y + 4, "C", { a: "middle", s: 11 }) + tx(210, y + 4, "O", { a: "middle", s: 11 });
      [[50, aO1], [130, aC], [210, aO2]].forEach(([x, [dx, dy]]) => { if (dx || dy) s += ar(x + (dx ? Math.sign(dx) * 14 : 0), y + (dy ? Math.sign(dy) * 14 : 0), x + (dx ? Math.sign(dx) * 14 : 0) + dx, y + (dy ? Math.sign(dy) * 14 : 0) + dy, "b"); });
      s += tx(245, y - 4, name, { b: 1, s: 12 }) + tx(245, y + 12, note, { s: 11, c });
    };
    mol(35, [-20, 0], [0, 0], [20, 0], "symmetric stretch", "IR inactive (no dipole change)", "m");
    mol(100, [16, 0], [-16, 0], [16, 0], "asymmetric stretch", "dipole changes: absorbs IR", "d");
    mol(165, [0, -18], [0, 18], [0, -18], "bending", "dipole changes: absorbs IR", "d");
    return s;
  });

  const s4Fig = () => svg(360, 170, "Why mean intensity on Earth is S/4", () => {
    let s = "";
    [40, 60, 80, 100, 120].forEach((y) => (s += ar(10, y, 120, y, "a")));
    s += ci(180, 80, 50, { f: FILL }) + `<ellipse cx="130" cy="80" rx="8" ry="50" fill="none" stroke="${C.b}" stroke-width="2"/>` + tx(130, 150, "intercepts πR²", { a: "middle", c: "b", s: 11 }) + tx(12, 30, "solar constant S", { c: "a", s: 11 });
    s += tx(350, 60, "spread over the", { a: "end", s: 11 }) + tx(350, 74, "whole surface 4πR²", { a: "end", s: 11 }) + tx(350, 100, "mean = SπR²/4πR²", { a: "end" }) + tx(350, 116, "= S/4", { a: "end", b: 1 });
    return s;
  });

  const wallFig = () => svg(360, 180, "Momentum change of a gas molecule hitting a wall", () => {
    let s = rc(300, 20, 20, 140, { f: FILL }) + tx(310, 175, "wall", { a: "middle", s: 11 }) + ci(240, 60, 9, { f: FILL }) + ar(140, 60, 228, 60, "b") + tx(150, 52, "+v (before)", { c: "b", s: 11 });
    s += ci(240, 110, 9, { f: FILL }) + ar(228, 110, 140, 110, "d") + tx(150, 128, "−v (after, elastic)", { c: "d", s: 11 }) + ar(322, 85, 352, 85, "c") + tx(330, 78, "F", { c: "c", b: 1 });
    s += tx(10, 30, "Δp(molecule) = −2mv", { b: 1 }) + tx(10, 150, "wall feels +2mv each hit;", { s: 11 }) + tx(10, 164, "many hits per second → F; p = F/A", { s: 11 });
    return s;
  });

  const constVFig = () => svg(360, 200, "Constant-volume gas apparatus", () => {
    let s = rc(30, 70, 150, 110, { f: FILL, c: "b" }) + tx(105, 195, "water bath (heated)", { a: "middle", s: 11, c: "b" }) + ci(90, 125, 28) + tx(90, 129, "air", { a: "middle", s: 11 });
    s += ln(90, 97, 90, 40) + ln(90, 40, 230, 40) + ci(250, 40, 20, { f: FILL }) + ar(250, 40, 262, 28) + tx(250, 74, "pressure gauge", { a: "middle", s: 11 }) + rc(148, 20, 8, 140, { r: 4 }) + ci(152, 160, 6, { f: C.d, c: "d" }) + tx(160, 20, "thermometer", { s: 11 });
    s += tx(350, 110, "fixed V and n;", { a: "end", s: 11 }) + tx(350, 124, "short narrow tube,", { a: "end", s: 11 }) + tx(350, 138, "flask fully immersed;", { a: "end", s: 11 }) + tx(350, 152, "stir, wait for equilibrium", { a: "end", s: 11 });
    return s;
  });

  const engineFig = (pump) => svg(320, 230, pump ? "Heat pump or refrigerator energy flow" : "Heat engine energy flow", () => {
    let s = rc(80, 10, 160, 34, { f: FILL, c: "d" }) + tx(160, 32, pump ? "hot reservoir (room) T_H" : "hot reservoir T_H", { a: "middle", c: "d" }) + rc(80, 186, 160, 34, { f: FILL, c: "b" }) + tx(160, 208, pump ? "cold reservoir (inside) T_C" : "cold reservoir T_C", { a: "middle", c: "b" }) + ci(160, 115, 28, { f: FILL }) + tx(160, 119, pump ? "pump" : "engine", { a: "middle", s: 11, b: 1 });
    if (!pump) s += ar(160, 44, 160, 85, "d") + tx(166, 70, "Q_H", { c: "d" }) + ar(160, 143, 160, 184, "b") + tx(166, 168, "Q_C (wasted)", { c: "b" }) + ar(188, 115, 280, 115, "c") + tx(234, 108, "W", { c: "c", b: 1 }) + tx(10, 100, "Q_H = W + Q_C", { s: 11 }) + tx(10, 116, "η = W/Q_H", { s: 11 }) + tx(10, 132, "η_Carnot = 1 − T_C/T_H", { s: 11 });
    else s += ar(160, 85, 160, 46, "d") + tx(166, 70, "Q_H", { c: "d" }) + ar(160, 184, 160, 145, "b") + tx(166, 168, "Q_C (removed)", { c: "b" }) + ar(280, 115, 190, 115, "c") + tx(234, 108, "W in", { c: "c", b: 1 }) + tx(10, 100, "Q_H = Q_C + W", { s: 11 }) + tx(10, 116, "work must be done to", { s: 11 }) + tx(10, 130, "move energy cold → hot", { s: 11 });
    return s;
  });

  const firstLawFig = () => svg(360, 170, "First law sign convention for a gas in a cylinder", () => {
    let s = pa("M40 40 H200 M40 140 H200 M40 40 V140", { w: 2.5 }) + rc(150, 42, 14, 96, { f: C.m, c: "m" }) + ln(164, 90, 230, 90, { w: 4, c: "m" }) + tx(95, 95, "gas", { a: "middle" });
    s += ar(95, 168, 95, 142, "d").replace('y1="168"', 'y1="166"') + tx(103, 162, "Q in (+)", { c: "d", s: 11 }) + ar(235, 70, 285, 70, "c") + tx(240, 62, "W by gas (+)", { c: "c", s: 11 });
    s += tx(350, 110, "Q = ΔU + W", { a: "end", b: 1 }) + tx(350, 126, "W = pΔV (constant p)", { a: "end", s: 11 }) + tx(350, 140, "ΔU = (3/2)nRΔT (monatomic)", { a: "end", s: 11 }) + tx(10, 22, "expansion: W > 0; compression: W < 0", { s: 11 });
    return s;
  });

  const symbolsFig = () => svg(390, 300, "Circuit symbols from the data booklet", () => {
    let s = "";
    const cellAt = (x, y) => ln(x - 22, y, x - 4, y) + ln(x + 4, y, x + 22, y) + cellH(x, y);
    const items = [
      ["cell", (x, y) => cellAt(x, y)],
      ["battery", (x, y) => ln(x - 26, y, x - 12, y) + cellH(x - 8, y) + ln(x - 4, y, x + 4, y, { d: 1, w: 1 }) + cellH(x + 8, y) + ln(x + 12, y, x + 26, y)],
      ["dc supply", (x, y) => ln(x - 26, y, x - 12, y) + ci(x - 8, y, 4) + ci(x + 8, y, 4) + ln(x + 12, y, x + 26, y) + tx(x - 8, y - 8, "+", { a: "middle", s: 11 }) + tx(x + 8, y - 8, "−", { a: "middle", s: 11 })],
      ["ac supply", (x, y) => ln(x - 26, y, x - 12, y) + ci(x, y, 12) + pa(`M${x - 7} ${y} q3.5 -7 7 0 t7 0`) + ln(x + 12, y, x + 26, y)],
      ["switch (open)", (x, y) => ln(x - 26, y, x - 10, y) + ci(x - 10, y, 2) + ln(x - 10, y, x + 10, y - 10) + ci(x + 10, y, 2) + ln(x + 10, y, x + 26, y)],
      ["resistor", (x, y) => ln(x - 28, y, x - 16, y) + res(x, y) + ln(x + 16, y, x + 28, y)],
      ["variable resistor", (x, y) => ln(x - 28, y, x - 16, y) + res(x, y) + ln(x + 16, y, x + 28, y) + ln(x - 14, y + 12, x + 16, y - 14, { a: 1 })],
      ["potentiometer", (x, y) => ln(x - 28, y, x - 16, y) + res(x, y) + ln(x + 16, y, x + 28, y) + ln(x, y - 20, x, y - 8, { a: 1 })],
      ["LDR", (x, y) => ln(x - 28, y, x - 16, y) + res(x, y) + ln(x + 16, y, x + 28, y) + ln(x - 14, y - 24, x - 6, y - 10, { a: 1, w: 1.2 }) + ln(x - 4, y - 24, x + 4, y - 10, { a: 1, w: 1.2 })],
      ["thermistor", (x, y) => ln(x - 28, y, x - 16, y) + res(x, y) + ln(x + 16, y, x + 28, y) + pa(`M${x - 18} ${y + 12} L${x - 10} ${y + 12} L${x + 14} ${y - 12}`)],
      ["lamp", (x, y) => ln(x - 26, y, x - 11, y) + lamp(x, y) + ln(x + 11, y, x + 26, y)],
      ["heating element", (x, y) => ln(x - 28, y, x - 16, y) + rc(x - 16, y - 6, 32, 12) + ln(x - 8, y - 6, x - 8, y + 6, { w: 1 }) + ln(x, y - 6, x, y + 6, { w: 1 }) + ln(x + 8, y - 6, x + 8, y + 6, { w: 1 }) + ln(x + 16, y, x + 28, y)],
      ["ammeter (series)", (x, y) => ln(x - 26, y, x - 11, y) + meter(x, y, "A") + ln(x + 11, y, x + 26, y)],
      ["voltmeter (parallel)", (x, y) => ln(x - 26, y, x - 11, y) + meter(x, y, "V") + ln(x + 11, y, x + 26, y)],
      ["junction", (x, y) => ln(x - 26, y, x + 26, y) + ln(x, y, x, y + 16) + ci(x, y, 3, { f: "currentColor", c: "none" })],
    ];
    items.forEach(([name, draw], i) => { const x = 65 + (i % 3) * 130, y = 40 + Math.floor(i / 3) * 56; s += draw(x, y) + tx(x, y + 26, name, { a: "middle", s: 11 }); });
    return s;
  });

  const ivRigFig = () => svg(380, 230, "Circuit to measure an I–V characteristic", () => {
    let s = pa("M40 40 H156 M164 40 H320 V170 H196 M164 170 H40 V40") + ln(156, 28, 156, 52) + ln(164, 33, 164, 47, { w: 4 }) + tx(160, 22, "supply", { a: "middle", s: 11 });
    s += res(180, 170) + ar(180, 140, 180, 162) + tx(186, 152, "slider", { s: 11 });
    s += pa("M180 140 V100 H199 M221 100 H244 M276 100 H300 V170") + meter(210, 100, "A") + lamp(260, 100) + ci(300, 170, 2.5, { f: "currentColor", c: "none" });
    s += pa("M240 100 V70 H249 M271 70 H280 V100") + meter(260, 70, "V") + ci(240, 100, 2.5, { f: "currentColor", c: "none" }) + ci(280, 100, 2.5, { f: "currentColor", c: "none" });
    s += tx(190, 200, "potentiometer: pd across the lamp can be varied from 0 V", { a: "middle", s: 11 }) + tx(190, 216, "ammeter in series, voltmeter in parallel with the component", { a: "middle", s: 11 });
    return s;
  });

  const potDivFig = () => svg(360, 220, "Potential divider with an LDR", () => {
    let s = ln(60, 20, 60, 60) + ln(60, 68, 60, 200) + `<g transform="rotate(90 60 64)">${cellH(60, 64)}</g>` + tx(48, 68, "V_in", { a: "end" });
    s += ln(60, 20, 180, 20) + ln(180, 20, 180, 54) + res(180, 70, 1) + ln(180, 86, 180, 134) + res(180, 150, 1) + ln(180, 166, 180, 200) + ln(60, 200, 180, 200);
    s += ln(166, 50, 172, 60, { a: 1, w: 1.2 }).replace('x1="166" y1="50"', 'x1="150" y1="44"') + ln(150, 60, 166, 70, { a: 1, w: 1.2 }) + tx(196, 60, "LDR", { s: 11 }).replace('x="196"', 'x="196"');
    s += ln(180, 110, 280, 110) + ln(180, 200, 280, 200) + ci(280, 110, 3) + ci(280, 200, 3) + ar(290, 195, 290, 115, "a") + tx(298, 158, "V_out", { c: "a" }) + tx(196, 158, "R (fixed)", { s: 11 });
    s += tx(350, 30, "V_out = V_in R/(R + R_LDR)", { a: "end", b: 1 }).replace('x="350"', 'x="352"') + tx(350, 214, "brighter → R_LDR falls → V_out rises", { a: "end", s: 11 });
    return s;
  });

  const intResFig = () => svg(360, 220, "Cell with internal resistance", () => {
    let s = rc(70, 75, 150, 50, { d: 1, c: "m" }) + tx(145, 140, "real cell", { a: "middle", s: 11, c: "m" }) + pa("M30 100 H96 M104 100 H134 M166 100 H260") + ln(96, 86, 96, 114) + ln(104, 93, 104, 107, { w: 4 }) + res(150, 100, 0, "r", 10) + tx(100, 90, "ε", { a: "middle", b: 1 }).replace('y="90"', 'y="72"');
    s += ci(30, 100, 3, { f: "currentColor", c: "none" }) + ci(260, 100, 3, { f: "currentColor", c: "none" }) + pa("M30 100 V30 H134 M156 30 H260 V100") + meter(145, 30, "V") + tx(145, 14, "terminal pd V", { a: "middle", s: 11 });
    s += pa("M30 100 V170 H129 M161 170 H260 V100") + res(145, 170, 0, "R (load)", 12);
    s += tx(350, 200, "ε = I(R + r);  V = ε − Ir", { a: "end", b: 1 }) + tx(350, 215, "lost volts Ir; V = ε only when I = 0", { a: "end", s: 11 });
    return s;
  });

  const seriesParFig = () => svg(380, 170, "Resistors in series and in parallel", () => {
    let s = ln(10, 60, 34, 60) + res(50, 60, 0, "R₁") + ln(66, 60, 94, 60) + res(110, 60, 0, "R₂") + ln(126, 60, 150, 60) + tx(80, 100, "series: R = R₁ + R₂", { a: "middle", b: 1, s: 11 }) + tx(80, 116, "same I; pds add", { a: "middle", s: 11 });
    s += ln(210, 60, 230, 60) + ln(230, 35, 230, 85) + ln(230, 35, 274, 35) + res(290, 35, 0, "R₁", 10) + ln(306, 35, 350, 35) + ln(230, 85, 274, 85) + res(290, 85, 0, "R₂", 10) + ln(306, 85, 350, 85) + ln(350, 35, 350, 85) + ln(350, 60, 370, 60);
    s += tx(290, 120, "parallel: 1/R = 1/R₁ + 1/R₂", { a: "middle", b: 1, s: 11 }) + tx(290, 136, "same pd; currents add (I = I₁ + I₂)", { a: "middle", s: 11 }) + tx(190, 162, "parallel total R is smaller than the smallest branch", { a: "middle", s: 11 });
    return s;
  });

  const springFig = () => svg(400, 245, "Mass-spring oscillator: displacement, velocity and acceleration", () => {
    let s = ln(10, 20, 390, 20, { w: 3 }) + ln(10, 165, 390, 165, { c: "m", d: 1, w: 1 }) + tx(12, 158, "equilibrium", { s: 11, c: "m" });
    const coil = (x, y2) => { let d = `M${x} 20 V30`; const n = 8, h = (y2 - 40) / n; for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? -8 : 8)} ${30 + h * (i + 0.5)}`; d += ` L${x} ${y2 - 10} V${y2}`; return pa(d, { w: 1.3 }); };
    [[60, 125, "+x₀ (top)", "v = 0", "a max, down", 30], [180, 165, "x = 0", "v max", "a = 0", 0], [300, 205, "−x₀ (bottom)", "v = 0", "a max, up", -30]].forEach(([x, y, lab, v, a, acc]) => {
      s += coil(x, y - 10) + rc(x - 14, y - 10, 28, 20, { f: FILL }) + tx(x + 20, y - 26, lab, { s: 11 }) + tx(x + 20, y - 12, v, { s: 11, c: "b" }) + tx(x + 20, y + 2, a, { s: 11, c: "d" });
      if (acc) s += ar(x - 24, y, x - 24, y + acc, "d");
    });
    s += tx(10, 240, "a = −ω²x : a always towards equilibrium, ∝ displacement", { s: 11 });
    return s;
  });

  const pendFig = () => svg(340, 230, "Forces on a simple pendulum", () => {
    let s = ln(60, 20, 200, 20, { w: 3 }) + ln(130, 20, 130, 200, { c: "m", d: 1, w: 1 }) + ln(130, 20, 202, 145) + ci(202, 145, 9, { f: FILL });
    s += `<path d="M130 60 A40 40 0 0 0 150 54.6" fill="none" stroke="currentColor"/>` + tx(138, 76, "θ", { s: 11 });
    s += ar(202, 145, 202, 215, "d") + tx(208, 214, "mg", { c: "d" }) + ar(202, 145, 172, 93, "b") + tx(166, 98, "T", { c: "b", a: "end" }) + ar(202, 145, 167, 165, "c") + tx(162, 180, "mg sin θ", { c: "c", a: "end", s: 11 }) + tx(162, 193, "(restoring)", { c: "c", a: "end", s: 11 });
    s += tx(330, 40, "small θ (< ~10°):", { a: "end", s: 11 }) + tx(330, 54, "sin θ ≈ θ = x/l", { a: "end", s: 11 }) + tx(330, 70, "a = −(g/l)x → SHM", { a: "end" }) + tx(330, 88, "T = 2π√(l/g)", { a: "end", b: 1 });
    return s;
  });

  const waveTypesFig = () => svg(390, 235, "Transverse and longitudinal waves", () => {
    let d = "M20 60"; for (let x = 20; x <= 300; x += 4) d += ` L${x} ${(60 - 25 * Math.sin(((x - 20) / 140) * 2 * Math.PI)).toFixed(1)}`;
    let s = tx(20, 16, "Transverse: particles oscillate ⊥ to energy transfer", { b: 1, s: 12 }) + pa(d) + ar(310, 60, 370, 60, "a") + tx(340, 52, "wave", { c: "a", a: "middle", s: 11 }) + ar(55, 48, 55, 22, "b").replace("y1=\"48\"", "y1=\"48\"") + ar(55, 72, 55, 98, "b") + tx(62, 100, "particle", { c: "b", s: 11 });
    s += ln(160, 100, 300, 100, { c: "m", s: 1, a: 1, w: 1 }) + tx(230, 114, "λ", { a: "middle" }) + ln(90, 60, 90, 35, { c: "m", s: 1, a: 1, w: 1 }).replace('x1="90"', 'x1="95"').replace('x2="90"', 'x2="95"') + tx(100, 46, "A", { s: 11 });
    s += tx(20, 140, "Longitudinal (sound): oscillation ∥ to energy transfer", { b: 1, s: 12 });
    for (let i = 0; i < 40; i++) { const x0 = 20 + i * 7.5, x = x0 + 6 * Math.sin((x0 - 20) / 140 * 2 * Math.PI + Math.PI); s += ln(x.toFixed(1), 155, x.toFixed(1), 195, { w: 1.2 }); }
    s += tx(90, 212, "R", { a: "middle", b: 1 }) + tx(160, 212, "C", { a: "middle", b: 1 }) + tx(230, 212, "R", { a: "middle", b: 1 }) + tx(363, 216, "particle", { c: "b", s: 11, a: "middle" }) + tx(20, 226, "C = compression (high p), R = rarefaction (low p); λ = C to next C", { s: 11 }).replace('x="20"', 'x="10"') + ar(310, 175, 370, 175, "a") + ln(345, 200, 380, 200, { c: "b", s: 1, a: 1 });
    return s;
  });

  const wavefrontFig = () => svg(380, 180, "Wavefronts and rays", () => {
    let s = tx(10, 16, "plane wavefronts", { b: 1, s: 12 });
    [40, 70, 100, 130].forEach((x) => (s += ln(x, 30, x, 140, { c: "b" })));
    s += ar(20, 85, 165, 85, "a") + tx(160, 100, "ray", { c: "a", s: 11, a: "end" }) + ln(40, 150, 70, 150, { c: "m", s: 1, a: 1, w: 1 }) + tx(55, 164, "λ", { a: "middle" });
    s += tx(215, 16, "circular (point source)", { b: 1, s: 12 });
    [18, 36, 54].forEach((r) => (s += ci(280, 90, r, { c: "b" })));
    s += ci(280, 90, 3, { f: "currentColor", c: "none" }) + ar(280, 90, 360, 90, "a") + ar(280, 90, 280, 160, "a") + ar(280, 90, 226, 48, "a") + tx(375, 172, "rays ⊥ wavefronts", { a: "end", s: 11, c: "a" });
    return s;
  });

  const emFig = () => svg(390, 126, "The electromagnetic spectrum", () => {
    const b = [["radio", "> 1 m"], ["micro", "~1 cm"], ["IR", "~10 μm"], ["vis", "0.4–0.7 μm"], ["UV", "~100 nm"], ["X-ray", "~1 nm"], ["gamma", "< 1 pm"]];
    let s = "";
    b.forEach(([n, l], i) => { const x = 10 + i * 53; s += rc(x, 30, 53, 30, { f: n === "vis" ? C.c : FILL }) + tx(x + 26.5, 50, n, { a: "middle", s: 11, b: 1 }) + tx(x + 26.5, i % 2 ? 90 : 76, l, { a: "middle", s: 11 }); });
    s += ln(10, 102, 380, 102, { s: 1, a: 1, c: "a" }) + tx(195, 118, "← longer λ, lower f, lower photon energy   ·   higher f, higher E →", { a: "middle", s: 11, c: "a" }) + tx(195, 20, "all travel at c = 3.00 × 10⁸ m s⁻¹ in a vacuum; transverse", { a: "middle", s: 11 });
    return s;
  });

  // ---------- helpers for plots ----------
  const bounceV = (t) => { if (t < 1) return -10 * t; let t0 = 1, v0 = 8; while (t > t0 + v0 / 5) { t0 += v0 / 5; v0 *= 0.8; } return v0 - 10 * (t - t0); };
  const bounceH = (t) => { if (t < 1) return 5 - 5 * t * t; let t0 = 1, v0 = 8; while (t > t0 + v0 / 5) { t0 += v0 / 5; v0 *= 0.8; } const u = t - t0; return v0 * u - 5 * u * u; };
  const carS = (t) => (t <= 4 ? t * t : t <= 8 ? 16 + 8 * (t - 4) : 48 + 8 * (t - 8) - (t - 8) * (t - 8));
  const planck = (T) => { const lm = 2898 / T, B = (l) => 1 / (Math.pow(l, 5) * (Math.exp(14388 / (l * T)) - 1)), Bm = B(lm); return (l) => (l <= 0 ? 0 : B(l) / Bm); };
  const sun = planck(5800), earth = planck(288);
  // Carnot cycle (monatomic, γ = 5/3): A(1,5) B(2,2.5) C(5.657,0.442) D(2.828,0.884)
  const g53 = 5 / 3;

  IB.addExamFrames("phys", { topics: {
    // ================= A.1 KINEMATICS =================
    "phys-1": {
      diagrams: [
        { title: "s–t shapes: constant velocity (a), at rest (b), uniform acceleration from rest (c)", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "s", grid: false,
          curves: [{ f: (x) => 0.8 * x, domain: [0, 10], color: "a", label: "v constant" }, { f: () => 3, domain: [0, 10], color: "b", label: "at rest", labelX: 7.5 }, { f: (x) => 0.1 * x * x, domain: [0, 10], color: "c", label: "accelerating", labelX: 6.5 }] },
        { title: "v–t shapes: uniform acceleration (a), constant velocity (b), uniform deceleration (c)", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "v", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "a > 0" }, { f: () => 5, domain: [0, 10], color: "b", label: "a = 0", labelX: 7.8 }, { f: (x) => 9 - 0.9 * x, domain: [0, 10], color: "c", label: "a < 0", labelX: 8.5 }] },
        { title: "a–t for uniform acceleration: horizontal line; area under graph = Δv", x: [0, 10], y: [0, 5], xLabel: "t / s", yLabel: "a / m s⁻²", grid: false,
          curves: [{ f: () => 3, domain: [0, 10], color: "a", label: "a = 3 m s⁻²" }], lines: [{ from: [2, 0], to: [2, 3], color: "muted", dash: true }, { from: [7, 0], to: [7, 3], color: "muted", dash: true }], texts: [{ at: [4.5, 1.5], text: "area = Δv = 15 m s⁻¹", anchor: "middle" }] },
        { title: "Ball dropped and bouncing: v–t (up positive); every flight segment has gradient −g", x: [0, 5.5], y: [-11, 9], xLabel: "t / s", yLabel: "v / m s⁻¹", grid: false,
          curves: [{ f: bounceV, domain: [0, 5.4], color: "a" }], texts: [{ at: [0.55, -8], text: "falling", anchor: "middle" }, { at: [1.3, 7.8], text: "bounce: v reverses", anchor: "start" }] },
        { title: "Ball dropped and bouncing: height–time (parabolic arcs, each lower)", x: [0, 5.5], y: [0, 6], xLabel: "t / s", yLabel: "h / m", grid: false,
          curves: [{ f: bounceH, domain: [0, 5.4], color: "b" }] },
        { title: "Projectile (no air resistance): vertical velocity vᵧ (a) and horizontal velocity vₓ (b)", x: [0, 4], y: [-12, 12], xLabel: "t / s", yLabel: "v / m s⁻¹", grid: false,
          curves: [{ f: (x) => 10 - 5 * x, domain: [0, 4], color: "a", label: "vᵧ, gradient −g", labelX: 2.3 }, { f: () => 8, domain: [0, 4], color: "b", label: "vₓ", labelX: 3.4 }], points: [{ at: [2, 0], label: "top" }] },
        { title: "s–t for a journey: accelerate (curve up), constant v (straight), decelerate (flattens)", x: [0, 13], y: [0, 70], xLabel: "t / s", yLabel: "s / m", grid: false,
          curves: [{ f: carS, domain: [0, 12], color: "a" }, { f: () => 64, domain: [12, 13], color: "a" }], vlines: [{ x: 4 }, { x: 8 }] },
      ],
      figures: [
        { title: "Velocity components along a projectile's path", caption: "Horizontal component constant; vertical component changes by g per second; acceleration g downwards at every point (including the top).", svg: projFig() },
      ],
      frames: [
        { title: "Sketch the velocity–time graph of a bouncing ball", paper: "P2", where: "Paper 2 · 3 marks · sketch on axes given",
          q: "A ball is dropped from rest and bounces several times on hard ground. Air resistance is negligible. Taking upwards as positive, sketch a graph showing how the velocity of the ball varies with time for the first two bounces.",
          marks: ["straight lines of __the same negative gradient (−g)__ for every flight, starting at v = 0", "at each bounce velocity __changes sign abruptly__ (negative → positive) in a very short time", "each rebound speed __smaller__ than the impact speed (energy lost), so each section is shorter"],
          model: "From the origin the line slopes down with gradient −9.81 m s⁻². At impact the velocity jumps almost vertically from a negative value to a smaller positive value. The line then slopes down again with the same gradient, crossing zero at the top of the bounce and reaching a negative value equal in size to the rebound speed at the next impact. Each cycle is shorter and smaller.",
          diagram: { title: "Expected answer: parallel sloping segments, each smaller", x: [0, 5.5], y: [-11, 9], xLabel: "t", yLabel: "v", grid: false, curves: [{ f: bounceV, domain: [0, 5.4], color: "a" }] },
          accept: "downwards as positive (graph reflected); vertical jumps at the bounces",
          reject: "curved segments; gradient changing between bounces; velocity returning to the same magnitude each time",
          tip: "彈波 v–t：每段斜率都係 −g（平行直線），撞地瞬間速度反方向，反彈速度逐次變細。" },
        { title: "Sketch a displacement–time graph from a description of the motion", paper: "P2", where: "Paper 2 · 3 marks",
          q: "A car accelerates uniformly from rest for 4.0 s, travels at constant velocity for 4.0 s, then decelerates uniformly to rest in 4.0 s. Sketch the displacement–time graph for the journey.",
          marks: ["first section __curves upwards__ (gradient increasing) from the origin", "middle section a __straight line__ with gradient equal to the final gradient of section 1 (no kinks)", "last section __curves and flattens__ to zero gradient at 12 s, then horizontal"],
          model: "Displacement rises as a parabola (s ∝ t²) for the first 4 s, then as a straight line whose gradient equals the constant velocity, then as an upside-down parabola whose gradient falls smoothly to zero at 12 s. The curve stays smooth at 4 s and 8 s because velocity has no sudden jump.",
          diagram: { title: "Expected answer: smooth curve, straight, flattening", x: [0, 13], y: [0, 70], xLabel: "t / s", yLabel: "s / m", grid: false, curves: [{ f: carS, domain: [0, 12], color: "a" }, { f: () => 64, domain: [12, 13], color: "a" }] },
          accept: "values marked: 16 m, 48 m, 64 m",
          reject: "s decreasing during deceleration; sharp corners at the joins",
          tip: "減速唔等於後退：位移仲係增加，只係斜率（速度）慢慢變零。" },
      ],
      concepts: [
        { h: "Reading graph shapes", b: "<ul><li>s–t: <strong>gradient = velocity</strong>; a curve bending up means speeding up; a horizontal line means at rest.</li><li>v–t: gradient = acceleration; area = displacement (area below the axis counts as negative displacement).</li><li>a–t: area = change in velocity.</li><li>For any object in free fall (thrown up, dropped, bouncing) the v–t graph is a straight line of gradient −g between contacts, and the a–t graph is a horizontal line at −g.</li></ul>" },
      ],
    },
    // ================= A.2 FORCES AND MOMENTUM =================
    "phys-2": {
      diagrams: [
        { title: "Friction against applied force: static friction rises to μₛN, then kinetic friction μₖN (smaller, constant)", x: [0, 12], y: [0, 8], xLabel: "applied force", yLabel: "friction", grid: false,
          curves: [{ f: (x) => x, domain: [0, 6], color: "a", label: "static", labelX: 2.6 }, { f: () => 4.5, domain: [6, 12], color: "b", label: "kinetic", labelX: 9.5 }], lines: [{ from: [6, 6], to: [6, 4.5], color: "muted", dash: true }], hlines: [{ y: 6, label: "μₛN" }], points: [{ at: [6, 6], label: "starts to slide" }] },
        { title: "Sphere falling in a fluid: weight − buoyancy constant (b), drag 6πηrv rising (a) until equal", x: [0, 6], y: [0, 8], xLabel: "t", yLabel: "force", grid: false,
          curves: [{ f: () => 6, domain: [0, 6], color: "b", label: "W − B", labelX: 4.8 }, { f: (x) => 6 * (1 - Math.exp(-1.2 * x)), domain: [0, 6], color: "a", label: "drag", labelX: 1.2 }] },
        { title: "Stokes' law: drag ∝ speed (small sphere, laminar flow)", x: [0, 10], y: [0, 10], xLabel: "v", yLabel: "F_d", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "gradient = 6πηr" }] },
        { title: "Momentum–time: gradient = resultant force (constant force (a), decreasing force (b))", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "p", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "F constant" }, { f: (x) => 8 * (1 - Math.exp(-0.4 * x)), domain: [0, 10], color: "b", label: "F → 0", labelX: 8 }] },
        { title: "Centripetal force against v² (m, r constant): straight line, gradient m/r", x: [0, 10], y: [0, 10], xLabel: "v²", yLabel: "F", grid: false,
          curves: [{ f: (x) => 0.8 * x, domain: [0, 10], color: "a" }] },
      ],
      figures: [
        { title: "Free-body diagrams for four common situations", caption: "Arrow lengths show relative sizes; only forces acting ON the object.", svg: fbdFig() },
        { title: "Circular motion and the conical pendulum", caption: "Velocity is tangential; acceleration and resultant force point to the centre. There is no separate 'centripetal force' arrow on a free-body diagram.", svg: circFig() },
        { title: "Vertical circle: forces at the top and bottom", caption: "Resultant force (towards the centre) = mv²/r at both points.", svg: vertCircFig() },
        { title: "Newton's third law pair", caption: "Third-law forces act on different bodies, so they never cancel.", svg: thirdLawFig() },
      ],
      frames: [
        { title: "Draw the forces on a conical pendulum bob and identify the centripetal force", paper: "P2", where: "Paper 2 · 3 marks · draw on the diagram",
          q: "A small mass on a string moves in a horizontal circle at constant speed (a conical pendulum). Draw the forces acting on the mass and explain what provides the centripetal force.",
          marks: ["__weight__ vertically downwards and __tension__ along the string towards the pivot; no other forces", "the vertical component of tension __balances the weight__ (T cos θ = mg)", "the __horizontal component of tension__ (T sin θ) is the resultant force, directed towards the __centre of the circle__"],
          model: "Only two forces act: the weight mg downwards and the tension T along the string. Vertically there is no acceleration, so T cos θ = mg. The horizontal component T sin θ is unbalanced and points to the centre of the circle, so it provides the centripetal force: T sin θ = mv²/r.",
          svg: circFig(),
          accept: "resultant shown as a dashed arrow towards the centre",
          reject: "an extra 'centripetal force' or 'centrifugal force' arrow; tension drawn horizontally",
          tip: "向心力唔係額外嘅力：圓錐擺入面係張力嘅水平分量提供。" },
        { title: "Sketch the friction force as the applied force is increased", paper: "P2", where: "Paper 2 · 2–3 marks · sketch",
          q: "A horizontal force on a block resting on a rough floor is increased steadily from zero until the block slides. Sketch a graph of the frictional force against the applied force.",
          marks: ["friction __equals the applied force__ (straight line through origin, gradient 1) while the block is at rest", "maximum at __μₛN__ when sliding starts", "then __drops__ to a constant lower value __μₖN__ (μₖ < μₛ)"],
          model: "While the block is stationary, static friction matches the applied force, so the graph is a straight line through the origin. When the applied force reaches μₛN the block starts to move and friction falls to the kinetic value μₖN, which stays constant as the applied force increases further.",
          diagram: { title: "Expected answer", x: [0, 12], y: [0, 8], xLabel: "applied force", yLabel: "friction", grid: false, curves: [{ f: (x) => x, domain: [0, 6], color: "a" }, { f: () => 4.5, domain: [6, 12], color: "b" }], lines: [{ from: [6, 6], to: [6, 4.5], color: "muted", dash: true }], hlines: [{ y: 6, label: "μₛN" }, { y: 4.5, label: "μₖN" }] },
          reject: "friction increasing after sliding begins; friction constant from zero",
          tip: "靜摩擦力會「跟住」外力變大，最大係 μₛN；郁咗之後變成較細嘅 μₖN。" },
      ],
      concepts: [
        { h: "Static and dynamic friction", b: "<p>Static friction adjusts to whatever value prevents sliding, up to a maximum \\(F_f \\le \\mu_s F_N\\). Once sliding, dynamic (kinetic) friction \\(F_f = \\mu_d F_N\\) is roughly constant and \\(\\mu_d < \\mu_s\\). Friction always opposes the relative motion (or the tendency to move) of the surfaces.</p>" },
      ],
    },
    // ================= A.3 WORK, ENERGY AND POWER =================
    "phys-3": {
      diagrams: [
        { title: "Falling object (no air resistance): Eₚ (b), Eₖ (a), total (c) against height", x: [0, 10], y: [0, 12], xLabel: "height h", yLabel: "E", grid: false,
          curves: [{ f: (x) => x, domain: [0, 10], color: "b", label: "Eₚ = mgh", labelX: 7 }, { f: (x) => 10 - x, domain: [0, 10], color: "a", label: "Eₖ", labelX: 1 }, { f: () => 10, domain: [0, 10], color: "c", label: "total", labelX: 4.5 }] },
        { title: "Falling object against time: Eₖ ∝ t² (a), Eₚ (b), total constant (c)", x: [0, 3.4], y: [0, 12], xLabel: "t", yLabel: "E", grid: false,
          curves: [{ f: (x) => x * x, domain: [0, 3.16], color: "a", label: "Eₖ", labelX: 2.6 }, { f: (x) => 10 - x * x, domain: [0, 3.16], color: "b", label: "Eₚ", labelX: 2.3 }, { f: () => 10, domain: [0, 3.16], color: "c", label: "total", labelX: 0.6 }] },
        { title: "With constant air resistance: energies against distance fallen (total falls linearly)", x: [0, 10], y: [0, 12], xLabel: "distance fallen", yLabel: "E", grid: false,
          curves: [{ f: (x) => 10 - x, domain: [0, 10], color: "b", label: "Eₚ", labelX: 1 }, { f: (x) => 0.75 * x, domain: [0, 10], color: "a", label: "Eₖ", labelX: 8.5 }, { f: (x) => 10 - 0.25 * x, domain: [0, 10], color: "c", label: "total", labelX: 4 }], texts: [{ at: [8, 9.2], text: "gap = work against drag", anchor: "middle" }] },
        { title: "Kinetic energy against speed: Eₖ = ½mv² (parabola); Eₖ against v² is a straight line", x: [0, 10], y: [0, 10], xLabel: "v", yLabel: "Eₖ", grid: false,
          curves: [{ f: (x) => 0.1 * x * x, domain: [0, 10], color: "a" }] },
        { title: "Power against speed at constant driving force: P = Fv (straight line, gradient F)", x: [0, 10], y: [0, 10], xLabel: "v", yLabel: "P", grid: false,
          curves: [{ f: (x) => 0.85 * x, domain: [0, 10], color: "a" }] },
      ],
      figures: [
        { title: "Sankey diagram: car engine", caption: "Arrow widths to scale; useful output continues straight, wasted energy branches off.", svg: sankeyFig() },
        { title: "Work done by a force at an angle", caption: "Only the component of force along the displacement does work.", svg: workFig() },
        { title: "Energy interchange in a pendulum", caption: "Ignoring air resistance, total energy is constant.", svg: pendEnergyFig() },
      ],
      frames: [
        { title: "Sketch energy against height for a falling object, with and without air resistance", paper: "P2", where: "Paper 2 · 3 marks · sketch",
          q: "An object is released from rest at height H. On the same axes, sketch how its gravitational potential energy and kinetic energy vary with distance fallen (a) with no air resistance and (b) with a constant air-resistance force.",
          marks: ["Eₚ: straight line __decreasing linearly__ from mgH to zero (same in both cases)", "no air resistance: Eₖ straight line increasing to __mgH__, so Eₖ + Eₚ = constant", "with air resistance: Eₖ line __less steep__, ending below mgH; the gap = work done against drag"],
          model: "Eₚ = mg(H − d) falls linearly with distance fallen d. Without air resistance Eₖ = mgd rises linearly and the two always add to mgH. With a constant drag force F, Eₖ = (mg − F)d: still a straight line but with a smaller gradient, and the total energy falls linearly by Fd.",
          diagram: { title: "Expected answer (b dashed = with drag)", x: [0, 10], y: [0, 12], xLabel: "distance fallen", yLabel: "E", grid: false, curves: [{ f: (x) => 10 - x, domain: [0, 10], color: "b", label: "Eₚ", labelX: 1 }, { f: (x) => x, domain: [0, 10], color: "a", label: "Eₖ", labelX: 8.4 }, { f: (x) => 0.75 * x, domain: [0, 10], color: "a", dash: true, label: "Eₖ (drag)", labelX: 7.5 }] },
          accept: "curved Eₖ line if drag increases with speed, clearly below the no-drag line",
          reject: "Eₖ and Eₚ curves when plotted against distance with no drag",
          tip: "對「距離」畫係直線；對「時間」畫先係拋物線。睇清楚 x 軸！" },
        { title: "Draw a Sankey diagram from given energy values", paper: "P2", where: "Paper 2 · 2–3 marks · draw",
          q: "A car engine converts 100 J of chemical energy into 25 J of useful kinetic energy; the rest is transferred as thermal energy to the surroundings. Draw a labelled Sankey diagram and calculate the efficiency.",
          marks: ["one input arrow labelled __100 J chemical__", "useful 25 J and wasted __75 J thermal__ arrows with __widths in proportion__ (1 : 3), adding to the input", "efficiency = 25/100 = __25 %__"],
          model: "A wide input arrow (100 J) splits into a narrow 25 J kinetic-energy arrow continuing forwards and a wider 75 J thermal-energy arrow bending away. Efficiency = useful output/total input = 25/100 = 0.25 = 25 %.",
          svg: sankeyFig(),
          reject: "arrow widths not to scale; output arrows not summing to the input",
          tip: "Sankey：闊度 ∝ 能量，輸出相加 = 輸入，浪費嗰支彎走。" },
      ],
      concepts: [
        { h: "Energy graphs: against distance or against time?", b: "<p>For free fall, \\(E_p = mg(H-d)\\) and \\(E_k = mgd\\) are <strong>linear in distance</strong> d, but because \\(d = \\tfrac12 gt^2\\) they are <strong>quadratic in time</strong>. A constant resistive force F removes energy at a constant rate per metre (work = Fd), so the total-energy line against distance has gradient −F.</p>" },
      ],
    },
    // ================= A.4 RIGID BODY MECHANICS (AHL) =================
    "phys-4": {
      diagrams: [
        { title: "Uniform angular acceleration from rest: θ–t is a parabola (θ = ½αt²)", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "θ", grid: false,
          curves: [{ f: (x) => 0.1 * x * x, domain: [0, 10], color: "a" }] },
        { title: "Angular momentum against time under constant torque: gradient = τ = ΔL/Δt", x: [0, 10], y: [0, 10], xLabel: "t", yLabel: "L", grid: false,
          curves: [{ f: (x) => 2 + 0.7 * x, domain: [0, 10], color: "a", label: "gradient = τ" }, { f: () => 2, domain: [0, 10], color: "b", dash: true, label: "τ = 0: L constant", labelX: 6 }] },
        { title: "Spinning skater (L = Iω constant): ω against I is a hyperbola", x: [0, 10], y: [0, 10], xLabel: "I", yLabel: "ω", grid: false,
          curves: [{ f: (x) => 12 / x, domain: [1.2, 10], color: "a", label: "Iω = L" }], points: [{ at: [6, 2], label: "arms out" }, { at: [2, 6], label: "arms in" }] },
        { title: "Resultant torque against angular acceleration: straight line through origin, gradient = I", x: [0, 10], y: [0, 10], xLabel: "α", yLabel: "τ", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "small I", labelX: 8 }, { f: (x) => 0.45 * x, domain: [0, 10], color: "b", label: "smaller gradient = smaller I", labelX: 4 }] },
      ],
      figures: [
        { title: "Torque: force × perpendicular distance", caption: "τ = Fr sin θ, where θ is the angle between r and F.", svg: torqueFig() },
        { title: "Beam in rotational and translational equilibrium", caption: "Take moments about a support to eliminate the unknown force there.", svg: beamFig() },
        { title: "Rolling without slipping", caption: "Relative to the ground: top 2v, centre v, contact point 0.", svg: rollFig() },
        { title: "Moment of inertia depends on mass distribution", caption: "Formulae for standard shapes are given when needed; know the trend.", svg: inertiaFig() },
      ],
      frames: [
        { hl: true, title: "Sketch angular velocity against moment of inertia for a spinning skater", paper: "P2", where: "Paper 2 · 2 marks · AHL · sketch",
          q: "An ice skater spins with negligible external torque and pulls in her arms. Sketch a graph of her angular velocity against her moment of inertia and explain its shape.",
          marks: ["no external torque so __angular momentum L = Iω is conserved__", "ω ∝ 1/I: a __hyperbola__ (decreasing curve, not reaching the axes); smaller I → larger ω"],
          model: "With no external torque, L = Iω stays constant. So ω = L/I: as she pulls her arms in, I decreases and ω increases, giving an inverse-proportion curve. Her rotational kinetic energy L²/2I increases; the extra energy comes from the work done by her muscles.",
          diagram: { title: "Expected answer: ω ∝ 1/I", x: [0, 10], y: [0, 10], xLabel: "I", yLabel: "ω", grid: false, curves: [{ f: (x) => 12 / x, domain: [1.2, 10], color: "a" }] },
          reject: "straight line with negative gradient; claiming kinetic energy is conserved",
          tip: "L 守恆 → ω = L/I 係反比曲線；動能其實增加咗（手臂做功）。" },
        { hl: true, title: "Show the velocities of points on a rolling wheel", paper: "P2", where: "Paper 2 · 2 marks · AHL · draw arrows",
          q: "A wheel of radius r rolls without slipping with its centre moving at speed v. On a diagram, show the velocity of the point at the top of the wheel, the centre and the point in contact with the ground.",
          marks: ["centre: v forwards; __top: 2v__ forwards (arrow twice as long)", "contact point: __instantaneously at rest__ (v = 0) because v = ωr exactly cancels"],
          model: "Every point has the translational velocity v plus a rotational velocity ωr tangent to the rim. With no slipping, ωr = v. At the top both add (2v forwards); at the contact point they cancel (0); at the centre only v remains.",
          svg: rollFig(),
          reject: "all points moving at v; contact point moving backwards",
          tip: "滾動唔打滑：頂 2v、中心 v、接觸點 0（v = ωr）。" },
      ],
      concepts: [
        { h: "Conditions for equilibrium of a rigid body", b: "<p>A rigid body is in equilibrium when <strong>both</strong> the resultant force is zero (no linear acceleration) <strong>and</strong> the resultant torque about any axis is zero (no angular acceleration). A <strong>couple</strong> (two equal, opposite, non-collinear forces) has zero resultant force but a non-zero torque = F × separation.</p>" },
      ],
    },
    // ================= A.5 RELATIVITY (AHL) =================
    "phys-5": {
      diagrams: [
        { title: "Lorentz factor γ against v/c: γ = 1 at low speed, → ∞ as v → c", x: [0, 1.1], y: [0, 8], xLabel: "v/c", yLabel: "γ", grid: false,
          curves: [{ f: (x) => 1 / Math.sqrt(1 - x * x), domain: [0, 0.993], color: "a" }], hlines: [{ y: 1, label: "γ = 1" }], vlines: [{ x: 1, label: "v = c" }], points: [{ at: [0.866, 2], label: "0.866c: γ = 2" }] },
        { title: "Length contraction: L/L₀ = 1/γ against v/c", x: [0, 1.1], y: [0, 1.2], xLabel: "v/c", yLabel: "L/L₀", grid: false,
          curves: [{ f: (x) => Math.sqrt(1 - x * x), domain: [0, 1], color: "b" }], vlines: [{ x: 1 }] },
        { title: "Relativistic (a) vs Galilean (b) velocity addition for u′ = 0.8c in a frame moving at v", x: [0, 1], y: [0, 2], xLabel: "v/c", yLabel: "u/c", grid: false,
          curves: [{ f: (x) => (0.8 + x) / (1 + 0.8 * x), domain: [0, 1], color: "a", }, { f: (x) => 0.8 + x, domain: [0, 1], color: "b", dash: true, label: "Galilean", labelX: 0.7 }], hlines: [{ y: 1, label: "c" }], texts: [{ at: [0.45, 0.7], text: "relativistic (a): never exceeds c", anchor: "middle" }] },
      ],
      figures: [
        { title: "Spacetime diagram: worldlines and the light cone", caption: "Same scale on x and ct, so light travels at 45°.", svg: worldFig() },
        { title: "Light clock: deriving time dilation", caption: "The moving clock's light travels further at the same speed c, so it ticks slower: Δt = γΔt₀.", svg: lightClockFig() },
        { title: "Twin paradox", caption: "The travelling twin's worldline is bent (acceleration), so the situation is not symmetric.", svg: twinFig() },
        { title: "Galilean transformation", caption: "Valid only for v ≪ c; it predicts light speed c ± v, contradicting the second postulate.", svg: galFig() },
      ],
      frames: [
        { hl: true, title: "Draw worldlines on a spacetime diagram", paper: "P2", where: "Paper 2 · 3 marks · AHL · draw on axes",
          q: "On a spacetime diagram (x horizontal, ct vertical, same scale), draw the worldlines of (i) an object at rest at x = 2 m, (ii) an object leaving the origin at 0.5c, and (iii) a light pulse emitted from the origin in the +x direction.",
          marks: ["(i) __vertical line__ at x = 2 m", "(ii) straight line from origin at angle θ to the ct axis with __tan θ = v/c = 0.5__ (steeper than 45°)", "(iii) line at __45°__ to both axes"],
          model: "An object at rest has constant x, so its worldline is vertical. An object at 0.5c moves 0.5 m of x per 1 m of ct, so its worldline is a straight line making an angle tan⁻¹(0.5) = 27° with the ct axis. Light moves 1 m of x per 1 m of ct, so its worldline is at 45°.",
          svg: worldFig(),
          reject: "worldline of the moving object below the light line (v > c); angle measured from the wrong axis",
          tip: "世界線同 ct 軸夾角 tan θ = v/c；光係 45°，物體一定比光陡。" },
        { hl: true, title: "Sketch the Lorentz factor against speed", paper: "P2", where: "Paper 1A / Paper 2 · 2 marks · AHL",
          q: "Sketch a graph showing how the Lorentz factor γ varies with v/c from 0 to just below 1.",
          marks: ["starts at __γ = 1 when v = 0__ and stays close to 1 at low speeds", "increases ever more steeply, __tending to infinity__ as v → c (vertical asymptote at v = c)"],
          model: "γ = 1/√(1 − v²/c²). At v = 0, γ = 1 and it barely changes until about 0.3c (γ = 1.05). It then rises steeply, reaching 2 at 0.866c, and grows without limit as v approaches c.",
          diagram: { title: "Expected answer", x: [0, 1.1], y: [0, 8], xLabel: "v/c", yLabel: "γ", grid: false, curves: [{ f: (x) => 1 / Math.sqrt(1 - x * x), domain: [0, 0.993], color: "a" }], hlines: [{ y: 1 }], vlines: [{ x: 1 }] },
          reject: "curve starting at γ = 0; curve crossing v = c",
          tip: "γ 由 1 開始，唔係 0；v → c 時 γ → ∞。" },
      ],
      concepts: [
        { h: "Reading a spacetime diagram", b: "<ul><li>Worldline of an inertial object: straight line; angle θ to the ct axis with \\(\\tan\\theta = v/c\\).</li><li>Events on a line parallel to the x axis are simultaneous in S; events on a line parallel to the x′ axis are simultaneous in S′.</li><li>Proper time is measured by a clock present at both events (its worldline passes through both).</li></ul>" },
      ],
    },
    // ================= B.1 THERMAL ENERGY TRANSFERS =================
    "phys-6": {
      diagrams: [
        { title: "Cooling curve of a liquid that solidifies: plateau at the freezing point (latent heat released)", x: [0, 24], y: [0, 100], xLabel: "t / min", yLabel: "T / °C", grid: false,
          curves: [{ f: (t) => (t < 3.73 ? 20 + 70 * Math.exp(-0.15 * t) : t < 10 ? 60 : 20 + 40 * Math.exp(-0.2 * (t - 10))), domain: [0, 24], color: "a" }], hlines: [{ y: 20, label: "room temperature" }], texts: [{ at: [7, 66], text: "freezing (liquid + solid)", anchor: "middle" }, { at: [1.5, 92], text: "liquid", anchor: "start" }, { at: [15, 40], text: "solid", anchor: "start" }] },
        { title: "Temperature against energy supplied (ice → water → steam, not to scale): gradient = 1/(mc), plateau length = mL", x: [0, 40], y: [-30, 120], xLabel: "Q", yLabel: "T / °C", grid: false,
          curves: [{ f: (q) => (q < 2 ? -20 + 10 * q : q < 8 ? 0 : q < 28 ? 5 * (q - 8) : 100), domain: [0, 40], color: "a" }], texts: [{ at: [5, 8], text: "melting", anchor: "middle" }, { at: [34, 108], text: "boiling", anchor: "middle" }, { at: [19, 70], text: "water: smaller gradient (larger c)", anchor: "end" }] },
        { title: "Same power to two masses of the same material: mass m (a) heats twice as fast as 2m (b)", x: [0, 10], y: [0, 70], xLabel: "t", yLabel: "T / °C", grid: false,
          curves: [{ f: (t) => 20 + 4.5 * t, domain: [0, 10], color: "a", label: "m" }, { f: (t) => 20 + 2.25 * t, domain: [0, 10], color: "b", label: "2m" }] },
        { title: "Temperature profile through a two-layer wall: steeper gradient in the poorer conductor", x: [0, 8], y: [0, 24], xLabel: "position x", yLabel: "T / °C", grid: false,
          lines: [{ from: [0, 20], to: [4, 17], color: "a", label: "brick (high k)", labelAt: "start" }, { from: [4, 17], to: [8, 2], color: "b", label: "insulation" }, { from: [4, 0], to: [4, 22], color: "muted", dash: true }] },
        { title: "Wien's law: λ_max against 1/T is a straight line through the origin (gradient 2.9 × 10⁻³ m K)", x: [0, 10], y: [0, 10], xLabel: "1/T", yLabel: "λ_max", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a" }] },
        { title: "Stefan–Boltzmann: power radiated against T (∝ T⁴); P against T⁴ is a straight line", x: [0, 10], y: [0, 10], xLabel: "T", yLabel: "P", grid: false,
          curves: [{ f: (x) => 0.0009 * x ** 4, domain: [0, 10], color: "a" }] },
      ],
      figures: [
        { title: "Particle model of the three phases", caption: "Melting/boiling: energy goes into breaking bonds (potential energy rises), temperature (mean kinetic energy) constant.", svg: particlesFig() },
        { title: "Measuring specific heat capacity electrically", caption: "Insulate the block, use oil in the thermometer hole for contact, and plot T against t to find the gradient.", svg: shcRigFig() },
        { title: "Conduction through a slab", caption: "Data booklet: ΔQ/Δt = kA ΔT/Δx.", svg: condFig() },
      ],
      frames: [
        { title: "Sketch and explain a cooling curve", paper: "P2", where: "Paper 2 · 3 marks · sketch + explain",
          q: "Molten wax cools in a room until it becomes solid. Sketch a graph of temperature against time and explain the horizontal section.",
          marks: ["temperature falls with __decreasing gradient__ (cooling rate falls as T approaches room temperature)", "__horizontal section__ at the melting/freezing point", "during freezing, __latent heat is released__ as bonds form: potential energy falls while mean kinetic energy (temperature) stays constant"],
          model: "The liquid cools quickly at first and more slowly as its temperature approaches room temperature. At the freezing point the temperature stays constant while the wax solidifies, because the energy lost to the surroundings is supplied by the latent heat released as intermolecular bonds form; the mean kinetic energy of the particles does not change. Once all the wax is solid it continues to cool towards room temperature.",
          diagram: { title: "Expected answer", x: [0, 24], y: [0, 100], xLabel: "t", yLabel: "T", grid: false, curves: [{ f: (t) => (t < 3.73 ? 20 + 70 * Math.exp(-0.15 * t) : t < 10 ? 60 : 20 + 40 * Math.exp(-0.2 * (t - 10))), domain: [0, 24], color: "a" }], hlines: [{ y: 20, label: "room T" }] },
          reject: "straight-line cooling; the curve dropping below room temperature; 'no energy is lost during freezing'",
          tip: "凝固平台：溫度唔變係因為釋放潛熱，粒子平均動能不變、勢能下降。" },
        { title: "Sketch the temperature profile across a composite wall", paper: "P2", where: "Paper 2 · 2 marks · sketch",
          q: "A wall consists of a layer of brick and a layer of insulating foam of equal thickness. The inside is warmer than the outside. Sketch how temperature varies across the wall in the steady state.",
          marks: ["temperature __decreases linearly__ through each layer (two straight lines meeting at the boundary)", "the __foam has the steeper gradient__ (rate of flow the same in both, so ΔT/Δx ∝ 1/k)"],
          model: "In the steady state the same energy per second passes through both layers. From ΔQ/Δt = kA ΔT/Δx, the temperature gradient is inversely proportional to k, so the line through the foam (low k) is much steeper than the line through the brick, and most of the temperature drop occurs across the foam.",
          diagram: { title: "Expected answer", x: [0, 8], y: [0, 24], xLabel: "x", yLabel: "T", grid: false, lines: [{ from: [0, 20], to: [4, 17], color: "a", label: "brick", labelAt: "start" }, { from: [4, 17], to: [8, 2], color: "b", label: "foam" }, { from: [4, 0], to: [4, 22], color: "muted", dash: true }] },
          reject: "same gradient in both layers; a step at the boundary",
          tip: "穩態下兩層熱流一樣：k 細嗰層溫度梯度大（斜啲）。" },
      ],
      concepts: [
        { h: "Cooling curves", b: "<p>A hot object loses energy faster when it is much hotter than its surroundings, so a cooling curve gets less steep with time and levels off at room temperature. Plateaus occur at phase changes (freezing/condensing), where latent heat is released at constant temperature.</p>" },
      ],
    },
    // ================= B.2 GREENHOUSE EFFECT =================
    "phys-7": {
      diagrams: [
        { title: "Normalised black-body spectra: Sun ≈ 5800 K (a, peak 0.5 μm) and Earth ≈ 288 K (b, peak ≈ 10 μm); CO₂ band ≈ 15 μm shaded", x: [0, 30], y: [0, 1.2], xLabel: "λ / μm", yLabel: "relative intensity", grid: false,
          shade: { from: 13, to: 17, color: "muted" },
          curves: [{ f: sun, domain: [0.05, 4], color: "a", label: "Sun (visible)", labelX: 1.2 }, { f: earth, domain: [1, 30], color: "b", label: "Earth (infrared)", labelX: 18 }] },
        { title: "Equilibrium temperature (e = 1, no atmosphere) against albedo: T = [(1 − α)S/4σ]^¼", x: [0, 1], y: [0, 320], xLabel: "albedo α", yLabel: "T / K", grid: false,
          curves: [{ f: (a) => Math.pow(((1 - a) * 1361) / (4 * 5.67e-8), 0.25), domain: [0, 0.95], color: "a" }], points: [{ at: [0.3, 255], label: "α = 0.3: 255 K" }] },
      ],
      figures: [
        { title: "Energy balance of the Earth–atmosphere system", caption: "Short-wavelength radiation passes through; long-wavelength IR from the surface is absorbed by greenhouse gases and partly re-radiated back down.", svg: energyBalFig() },
        { title: "Vibration modes of CO₂", caption: "A molecule absorbs IR only if the vibration changes its dipole moment, at its resonant frequency.", svg: co2Fig() },
        { title: "Why the mean incoming intensity is S/4", caption: "Earth intercepts a disc πR² but radiates from and averages over 4πR².", svg: s4Fig() },
      ],
      frames: [
        { title: "Draw and label an energy-balance diagram for Earth", paper: "P2", where: "Paper 2 · 3 marks · draw",
          q: "Draw a labelled diagram showing the main energy flows that determine the mean surface temperature of the Earth, including the role of greenhouse gases.",
          marks: ["incoming __short-wavelength__ solar radiation; part __reflected__ (albedo ≈ 0.3)", "surface emits __long-wavelength infrared__ radiation upwards", "greenhouse gases __absorb IR and re-emit in all directions__, part back to the surface"],
          model: "Incoming solar radiation (mean S/4 ≈ 340 W m⁻²) is mostly visible; about 30 % is reflected by clouds, ice and the surface. The rest is absorbed and the surface, at about 288 K, emits infrared. Greenhouse gases (CO₂, H₂O, CH₄, N₂O) absorb some of this infrared and re-radiate it in all directions, so part returns to the surface, raising its equilibrium temperature.",
          svg: energyBalFig(),
          reject: "greenhouse gases 'trapping' or 'reflecting' heat; ozone hole as the cause",
          tip: "關鍵字：短波入、長波（紅外）出；溫室氣體吸收再向各方向輻射。" },
        { title: "Explain how CO₂ absorbs infrared using its vibration modes", paper: "P2", where: "Paper 2 · 2 marks",
          q: "Outline why carbon dioxide absorbs infrared radiation but not visible light.",
          marks: ["the bending and asymmetric stretching vibrations have __natural frequencies in the infrared__; IR photons of these frequencies cause __resonance__", "visible light frequencies do not match these vibrational frequencies (and these vibrations change the molecule's dipole)"],
          model: "The bonds in CO₂ vibrate (bending and asymmetric stretching) with natural frequencies in the infrared. Infrared radiation at these frequencies drives the vibrations at resonance and is absorbed. Visible-light frequencies are much higher and do not match, so visible light passes through.",
          svg: co2Fig(),
          reject: "CO₂ 'reflects' IR",
          tip: "共振：IR 頻率 = 分子振動嘅固有頻率先會被吸收。" },
      ],
      concepts: [
        { h: "Molecular explanation of greenhouse absorption", b: "<p>Greenhouse gas molecules have vibrational modes (bending, asymmetric stretching) whose natural frequencies lie in the infrared. Infrared photons at these frequencies are absorbed by <strong>resonance</strong>, and the energy is re-emitted in random directions. Symmetric diatomic gases (N₂, O₂) have no such IR-active modes, which is why they are not greenhouse gases.</p>" },
      ],
    },
    // ================= B.3 GAS LAWS =================
    "phys-8": {
      diagrams: [
        { title: "Boyle's law: p against 1/V is a straight line through the origin (T, n constant)", x: [0, 10], y: [0, 10], xLabel: "1/V", yLabel: "p", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "T₂", labelX: 8 }, { f: (x) => 0.55 * x, domain: [0, 10], color: "b", label: "T₁ < T₂", labelX: 8.5 }] },
        { title: "pV against p (or against V) is a horizontal line for a fixed mass at constant T; higher T, higher line", x: [0, 10], y: [0, 10], xLabel: "p", yLabel: "pV", grid: false,
          curves: [{ f: () => 7, domain: [0, 10], color: "a", label: "T₂", labelX: 8.5 }, { f: () => 4, domain: [0, 10], color: "b", label: "T₁", labelX: 8.5 }] },
        { title: "Charles's law: V against T (kelvin) through the origin; lower pressure gives a steeper line", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "V", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "p₁", labelX: 8 }, { f: (x) => 0.5 * x, domain: [0, 10], color: "b", label: "p₂ > p₁", labelX: 8.5 }] },
        { title: "V against θ in °C: straight line meeting V = 0 at −273 °C (absolute zero)", x: [-300, 150], y: [0, 10], xLabel: "θ / °C", yLabel: "V", grid: false,
          curves: [{ f: (x) => 6 * (x + 273) / 273, domain: [-273, 150], color: "a" }], points: [{ at: [-273, 0], label: "−273 °C" }], lines: [{ from: [-273, 0], to: [-150, 2.7], color: "muted", dash: true }] },
        { title: "Pressure law: p against T (kelvin) through the origin; smaller volume gives a steeper line", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "p", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "V₁", labelX: 8 }, { f: (x) => 0.5 * x, domain: [0, 10], color: "b", label: "V₂ > V₁", labelX: 8.5 }] },
        { title: "p against n (V, T constant): straight line through the origin", x: [0, 10], y: [0, 10], xLabel: "n", yLabel: "p", grid: false,
          curves: [{ f: (x) => 0.85 * x, domain: [0, 10], color: "a" }] },
        { title: "Density against pressure (T constant): ρ = pM/RT, straight line through the origin", x: [0, 10], y: [0, 10], xLabel: "p", yLabel: "ρ", grid: false,
          curves: [{ f: (x) => 0.85 * x, domain: [0, 10], color: "a" }] },
        { title: "Density against volume (fixed mass): ρ = m/V, hyperbola", x: [0, 10], y: [0, 10], xLabel: "V", yLabel: "ρ", grid: false,
          curves: [{ f: (x) => 9 / x, domain: [0.9, 10], color: "a" }] },
        { title: "Density against T in kelvin (p constant): ρ ∝ 1/T, hyperbola", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "ρ", grid: false,
          curves: [{ f: (x) => 9 / x, domain: [0.9, 10], color: "b" }] },
        { title: "Mean kinetic energy ∝ T (a, straight line through origin); rms speed ∝ √T (b)", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "Ē_k, v_rms", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "Ē_k = (3/2)k_BT", labelX: 4.3 }, { f: (x) => 2.6 * Math.sqrt(x), domain: [0, 10], color: "b", label: "v_rms", labelX: 8.4 }] },
        { title: "pV against T (kelvin): straight line through origin, gradient = nR (= Nk_B)", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "pV", grid: false,
          curves: [{ f: (x) => 0.8 * x, domain: [0, 10], color: "a", label: "gradient nR" }] },
        { title: "Real gas: pV/(nRT) against p - ideal value 1 (b); real gases deviate at high p and low T (a, illustrative)", x: [0, 10], y: [0, 2], xLabel: "p", yLabel: "pV/nRT", grid: false,
          curves: [{ f: () => 1, domain: [0, 10], color: "b", dash: true, label: "ideal", labelX: 8.5 }, { f: (x) => 1 - 0.06 * x + 0.012 * x * x, domain: [0, 10], color: "a", label: "real", labelX: 8.5 }] },
      ],
      figures: [
        { title: "Molecule colliding elastically with a container wall", caption: "Basis of the kinetic model: pressure is the rate of change of momentum per unit area.", svg: wallFig() },
        { title: "Constant-volume apparatus (pressure law / absolute zero)", caption: "Plot p against θ and extrapolate to p = 0.", svg: constVFig() },
      ],
      frames: [
        { title: "Sketch gas-law graphs: p against 1/V and V against θ (°C)", paper: "P2", where: "Paper 2 · 3 marks · sketch",
          q: "For a fixed mass of ideal gas, sketch (a) pressure against 1/volume at constant temperature and (b) volume against temperature in °C at constant pressure. Label any intercept.",
          marks: ["(a) __straight line through the origin__ (p ∝ 1/V)", "(b) __straight line__ with positive gradient, __not through the origin__", "(b) extrapolated line meets V = 0 at __−273 °C__ (0 K)"],
          model: "(a) pV = nRT with T constant gives p = (nRT)·(1/V): a straight line through the origin with gradient nRT. (b) V = (nR/p)T with T = θ + 273, so V is linear in θ with a positive intercept on the V axis; extended backwards the line reaches V = 0 at θ = −273 °C.",
          diagram: { title: "(b) Expected answer", x: [-300, 150], y: [0, 10], xLabel: "θ / °C", yLabel: "V", grid: false, curves: [{ f: (x) => 6 * (x + 273) / 273, domain: [-273, 150], color: "a" }], points: [{ at: [-273, 0], label: "−273 °C" }] },
          reject: "(b) line through the origin of a °C axis; (a) a hyperbola",
          tip: "用攝氏度做橫軸就唔經原點；延長到 −273 °C 先係零。" },
        { title: "Sketch density against temperature and against pressure", paper: "P2", where: "Paper 1A / Paper 2 · 2 marks",
          q: "For a fixed mass of ideal gas, sketch how the density varies with (a) pressure at constant temperature and (b) kelvin temperature at constant pressure.",
          marks: ["(a) ρ = pM/(RT): __straight line through the origin__", "(b) ρ ∝ 1/T: __decreasing curve (hyperbola)__, not reaching the axes"],
          model: "Density ρ = m/V and pV = nRT give ρ = pM/(RT), where M is the molar mass. At constant T, ρ ∝ p (straight line through the origin). At constant p, ρ ∝ 1/T, so the graph is an inverse-proportion curve.",
          diagram: { title: "(b) Expected answer: ρ ∝ 1/T", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "ρ", grid: false, curves: [{ f: (x) => 9 / x, domain: [0.9, 10], color: "b" }] },
          reject: "(b) a straight line with negative gradient",
          tip: "ρ = pM/RT：同 p 成正比、同 T 成反比。" },
      ],
      concepts: [
        { h: "Gas-law graphs to know (fixed mass of ideal gas)", b: "<ul><li>Straight lines through the origin: p–1/V (T const), V–T and p–T (in kelvin), p–n, ρ–p, pV–T, Ē_k–T.</li><li>Hyperbolas (inverse): p–V (T const), ρ–V, ρ–T (p const).</li><li>Horizontal lines: pV against p or V at constant T.</li><li>With θ in °C the V–θ and p–θ lines have a positive intercept and extrapolate to zero at −273 °C.</li><li>v_rms ∝ √T (curve, not a line).</li></ul>" },
      ],
    },
    // ================= B.4 THERMODYNAMICS (AHL) =================
    "phys-9": {
      diagrams: [
        { title: "Isobaric (a, horizontal: W = pΔV) and isochoric (b, vertical: W = 0) changes on a p–V diagram", x: [0, 10], y: [0, 10], xLabel: "V", yLabel: "p", grid: false,
          lines: [{ from: [2, 6], to: [8, 6], color: "a", label: "isobaric" }, { from: [8, 6], to: [8, 2], color: "b", label: "isochoric" }, { from: [2, 0], to: [2, 6], color: "muted", dash: true }, { from: [8, 0], to: [8, 2], color: "muted", dash: true }],
          texts: [{ at: [5, 3], text: "area = W = pΔV", anchor: "middle" }] },
        { title: "Carnot cycle (monatomic gas): A→B isothermal at T_H, B→C adiabatic, C→D isothermal at T_C, D→A adiabatic", x: [0, 6.5], y: [0, 5.5], xLabel: "V", yLabel: "p", grid: false,
          curves: [{ f: (v) => 5 / v, domain: [1, 2], color: "a" }, { f: (v) => 2.5 * Math.pow(2, g53) / Math.pow(v, g53), domain: [2, 5.657], color: "b" }, { f: (v) => 2.5 / v, domain: [2.828, 5.657], color: "c" }, { f: (v) => 5 / Math.pow(v, g53), domain: [1, 2.828], color: "b" }],
          points: [{ at: [1, 5], label: "A" }, { at: [2, 2.5], label: "B" }, { at: [5.657, 0.442], label: "C" }, { at: [2.828, 0.884], label: "D" }] },
        { title: "Internal energy of an ideal monatomic gas: U = (3/2)nRT, straight line through the origin", x: [0, 10], y: [0, 10], xLabel: "T / K", yLabel: "U", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a" }] },
        { title: "Carnot efficiency against T_C/T_H: η = 1 − T_C/T_H", x: [0, 1.1], y: [0, 1.1], xLabel: "T_C / T_H", yLabel: "η", grid: false,
          curves: [{ f: (x) => 1 - x, domain: [0, 1], color: "a" }] },
      ],
      figures: [
        { title: "Heat engine", caption: "No engine can convert all of Q_H into work (second law, Kelvin form).", svg: engineFig(false) },
        { title: "Heat pump / refrigerator", caption: "Energy flows cold → hot only when work is done (second law, Clausius form). COP is not required; know the energy flows.", svg: engineFig(true) },
        { title: "First law sign convention", caption: "IB data booklet form: Q = ΔU + W, with W the work done BY the gas.", svg: firstLawFig() },
      ],
      frames: [
        { hl: true, title: "Sketch and label a Carnot cycle on a p–V diagram", paper: "P2", where: "Paper 2 · 3 marks · AHL · sketch",
          q: "Sketch a Carnot cycle for an ideal gas on a p–V diagram. Label the isothermal and adiabatic stages and indicate where thermal energy is absorbed.",
          marks: ["four stages: __two isotherms joined by two adiabats__, adiabats __steeper__ than isotherms", "cycle drawn __clockwise__ (net work done by the gas = enclosed area)", "Q absorbed during the __isothermal expansion at T_H__ (top curve); released during isothermal compression at T_C; Q = 0 on adiabats"],
          model: "A→B: isothermal expansion at T_H (energy Q_H absorbed, ΔU = 0, Q = W). B→C: adiabatic expansion (Q = 0, temperature falls to T_C). C→D: isothermal compression at T_C (Q_C released). D→A: adiabatic compression back to T_H. The adiabats are steeper than the isotherms and the enclosed area is the net work per cycle.",
          diagram: { title: "Expected answer", x: [0, 6.5], y: [0, 5.5], xLabel: "V", yLabel: "p", grid: false, curves: [{ f: (v) => 5 / v, domain: [1, 2], color: "a" }, { f: (v) => 2.5 * Math.pow(2, g53) / Math.pow(v, g53), domain: [2, 5.657], color: "b" }, { f: (v) => 2.5 / v, domain: [2.828, 5.657], color: "c" }, { f: (v) => 5 / Math.pow(v, g53), domain: [1, 2.828], color: "b" }], points: [{ at: [1, 5], label: "A" }, { at: [2, 2.5], label: "B" }, { at: [5.657, 0.442], label: "C" }, { at: [2.828, 0.884], label: "D" }] },
          reject: "rectangular cycle; adiabats less steep than isotherms; anticlockwise cycle for an engine",
          tip: "Carnot：兩條等溫 + 兩條較陡嘅絕熱線，順時針；只喺等溫段有熱量交換。" },
        { hl: true, title: "Draw an energy-flow diagram for a heat engine and state its efficiency", paper: "P2", where: "Paper 2 · 2 marks · AHL",
          q: "Draw a labelled diagram showing the energy flows in a heat engine operating between a hot and a cold reservoir, and write an expression for its efficiency.",
          marks: ["Q_H from __hot reservoir__ into engine; __W out__; Q_C rejected to the __cold reservoir__, with Q_H = W + Q_C", "η = W/Q_H = 1 − Q_C/Q_H (≤ 1 − T_C/T_H)"],
          model: "Thermal energy Q_H flows from the hot reservoir into the engine. Part is converted to useful work W and the rest, Q_C, is rejected to the cold reservoir, so Q_H = W + Q_C. Efficiency η = W/Q_H; its maximum (Carnot) value is 1 − T_C/T_H with temperatures in kelvin.",
          svg: engineFig(false),
          reject: "no cold reservoir; temperatures in °C in the Carnot formula",
          tip: "熱機一定要有冷庫：Q_H = W + Q_C；Carnot 效率用開爾文。" },
      ],
      concepts: [
        { h: "Recognising processes on a p–V diagram", b: "<ul><li>Isobaric: horizontal line, W = pΔV.</li><li>Isochoric (isovolumetric): vertical line, W = 0 so Q = ΔU.</li><li>Isothermal: hyperbola pV = constant, ΔU = 0 so Q = W.</li><li>Adiabatic: steeper curve pV^(5/3) = constant (monatomic), Q = 0 so W = −ΔU.</li><li>Cycle: clockwise = net work done by the gas (engine); anticlockwise = net work done on the gas (refrigerator/heat pump). Over a full cycle ΔU = 0.</li></ul>" },
      ],
    },
    // ================= B.5 CURRENT AND CIRCUITS =================
    "phys-10": {
      diagrams: [
        { title: "NTC thermistor: resistance falls (non-linearly) as temperature rises", x: [0, 100], y: [0, 10], xLabel: "T / °C", yLabel: "R / kΩ", grid: false,
          curves: [{ f: (t) => 9 * Math.exp(-0.03 * t), domain: [0, 100], color: "a" }] },
        { title: "LDR: resistance falls as light intensity increases", x: [0, 10], y: [0, 10], xLabel: "light intensity", yLabel: "R", grid: false,
          curves: [{ f: (x) => 8 / (x + 0.8), domain: [0, 10], color: "a" }] },
        { title: "Resistance of a wire: R ∝ L (a, line through origin) and R ∝ 1/A (b, hyperbola)", x: [0, 10], y: [0, 10], xLabel: "L (a) or A (b)", yLabel: "R", grid: false,
          curves: [{ f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "R–L: gradient ρ/A", labelX: 3.5 }, { f: (x) => 6 / x, domain: [0.65, 10], color: "b", label: "R–A", labelX: 8 }] },
        { title: "Terminal pd against load resistance (ε = 6 V, r = 2 Ω): V = εR/(R + r), approaches ε", x: [0, 30], y: [0, 7], xLabel: "R / Ω", yLabel: "V / V", grid: false,
          curves: [{ f: (R) => (6 * R) / (R + 2), domain: [0, 30], color: "a" }], hlines: [{ y: 6, label: "ε" }] },
        { title: "Power delivered to the load against R: maximum when R = r (ε = 6 V, r = 2 Ω)", x: [0, 14], y: [0, 5.5], xLabel: "R / Ω", yLabel: "P / W", grid: false,
          curves: [{ f: (R) => (36 * R) / ((R + 2) * (R + 2)), domain: [0, 14], color: "a" }], points: [{ at: [2, 4.5], label: "R = r" }], vlines: [{ x: 2 }] },
        { title: "Discharge characteristic of a cell: quick small drop, long flat plateau, then rapid fall", x: [0, 22], y: [0, 1.8], xLabel: "time / h", yLabel: "terminal pd / V", grid: false,
          curves: [{ f: (t) => 1.6 - 0.1 * (1 - Math.exp(-3 * t)) - 0.012 * t - 0.6 * Math.exp((t - 20) / 1.2), domain: [0, 20.9], color: "a" }], texts: [{ at: [9, 1.62], text: "nearly constant", anchor: "middle" }] },
        { title: "I–V characteristic of an NTC thermistor: gradient increases as it heats up (R falls)", x: [0, 10], y: [0, 10], xLabel: "V", yLabel: "I", grid: false,
          curves: [{ f: (v) => 0.4 * v + 0.07 * v * v, domain: [0, 9.2], color: "a" }] },
      ],
      figures: [
        { title: "Circuit symbols", caption: "Use these exact symbols; ammeters in series, voltmeters in parallel.", svg: symbolsFig() },
        { title: "Measuring an I–V characteristic", caption: "A potential divider (potentiometer) lets the pd be varied from zero; reverse the supply for negative values.", svg: ivRigFig() },
        { title: "Potential divider with a sensor", caption: "Swap the LDR for a thermistor to make a temperature sensor.", svg: potDivFig() },
        { title: "Emf and internal resistance", caption: "The terminal pd is less than the emf whenever current flows.", svg: intResFig() },
        { title: "Series and parallel combinations", caption: "", svg: seriesParFig() },
      ],
      frames: [
        { title: "Draw a potential divider circuit for a light sensor and explain its output", paper: "P2", where: "Paper 2 · 3 marks · draw circuit",
          q: "Draw a potential divider containing a fixed resistor and an LDR connected to a battery, with the output across the fixed resistor. Explain what happens to the output pd when the light intensity increases.",
          marks: ["correct circuit: LDR and fixed resistor __in series__ across the supply, output taken __across the fixed resistor__", "brighter → __R_LDR decreases__ → total resistance falls / LDR takes a smaller share of the pd", "so the pd across the fixed resistor (V_out) __increases__"],
          model: "The LDR and fixed resistor R are in series, so the supply pd is shared in proportion to their resistances: V_out = V_in R/(R + R_LDR). As light intensity increases, R_LDR falls, so the fixed resistor takes a larger share of the pd and V_out rises.",
          svg: potDivFig(),
          reject: "LDR in parallel with the resistor; 'more current so more voltage' with no ratio argument",
          tip: "分壓器：電阻愈大分到嘅電壓愈多；講明 V_out 係量邊個元件。" },
        { title: "Sketch the resistance–temperature graph for an NTC thermistor", paper: "P2", where: "Paper 1A / Paper 2 · 2 marks",
          q: "Sketch a graph showing how the resistance of an NTC thermistor varies with temperature, and explain the shape.",
          marks: ["resistance __decreases non-linearly__ as temperature increases (curve, gradient decreasing in magnitude)", "higher temperature releases __more charge carriers__ (semiconductor), so resistance falls"],
          model: "An NTC thermistor is a semiconductor. Raising its temperature frees more charge carriers, so its resistance falls. The decrease is steep at low temperatures and levels off at higher temperatures (roughly exponential).",
          diagram: { title: "Expected answer", x: [0, 100], y: [0, 10], xLabel: "T", yLabel: "R", grid: false, curves: [{ f: (t) => 9 * Math.exp(-0.03 * t), domain: [0, 100], color: "a" }] },
          reject: "a straight line; resistance increasing (that is a metal wire)",
          tip: "NTC：溫度升，電阻跌（曲線）；同金屬導線相反。" },
      ],
      concepts: [
        { h: "Cells: emf, internal resistance and discharge", b: "<p>A real cell has emf ε and internal resistance r, so the terminal pd \\(V = \\varepsilon - Ir\\). The power to the load is greatest when R = r. During discharge the terminal pd stays almost constant for most of the cell's life and then falls rapidly. Primary cells are single-use; secondary cells are rechargeable. <strong>Charge capacity</strong> (in A h) is the total charge the cell can deliver.</p>" },
      ],
    },
    // ================= C.1 SIMPLE HARMONIC MOTION =================
    "phys-11": {
      diagrams: [
        { title: "Energies against time (released from +x₀): Eₖ (a) and Eₚ (b) vary at TWICE the oscillation frequency; total (c) constant", x: [0, 1.05], y: [0, 1.25], xLabel: "t / T", yLabel: "E / E_T", grid: false,
          curves: [{ f: (t) => Math.sin(2 * Math.PI * t) ** 2, domain: [0, 1], color: "a", label: "Eₖ", labelX: 0.22 }, { f: (t) => Math.cos(2 * Math.PI * t) ** 2, domain: [0, 1], color: "b", label: "Eₚ", labelX: 0.47 }, { f: () => 1, domain: [0, 1], color: "c", label: "total", labelX: 0.85 }] },
        { title: "Velocity against displacement in SHM: an ellipse, v = ±ω√(x₀² − x²)", x: [-1.3, 1.3], y: [-1.3, 1.3], xLabel: "x", yLabel: "v", grid: false,
          curves: [{ f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), domain: [-1, 1], color: "a" }, { f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), domain: [-1, 1], color: "a" }], points: [{ at: [0, 1], label: "v_max = ωx₀" }] },
        { title: "Period of a pendulum T ∝ √l (and of a mass–spring T ∝ √m): T² against l or m is a straight line", x: [0, 10], y: [0, 10], xLabel: "l or m", yLabel: "T", grid: false,
          curves: [{ f: (x) => 3 * Math.sqrt(x), domain: [0, 10], color: "a" }] },
        { title: "Restoring force against displacement: F = −kx (straight line through origin, negative gradient)", x: [-5, 5], y: [-5, 5], xLabel: "x", yLabel: "F", grid: false,
          curves: [{ f: (x) => -0.8 * x, domain: [-5, 5], color: "a" }] },
      ],
      figures: [
        { title: "Mass–spring system at three positions", caption: "Acceleration is always directed towards the equilibrium position.", svg: springFig() },
        { title: "Forces on a simple pendulum", caption: "The tangential component of weight is the restoring force.", svg: pendFig() },
      ],
      frames: [
        { title: "Sketch kinetic and potential energy against time for an oscillator", paper: "P2", where: "Paper 2 · 3 marks · sketch",
          q: "A mass–spring system is released from rest at maximum displacement and oscillates with period T and total energy E. On the same axes, sketch the kinetic energy and the potential energy against time from t = 0 to t = T.",
          marks: ["Eₚ starts at __E__ and Eₖ at __zero__", "both oscillate with period __T/2__ (two peaks each in one period), always positive", "Eₖ + Eₚ = E at all times (curves are mirror images; cross at E/2)"],
          model: "At t = 0 the mass is at rest at maximum displacement, so all the energy is potential. Eₖ is maximum at t = T/4 and 3T/4 (passing through equilibrium) and zero at T/2 and T. The two curves are sin² and cos² shapes, each with period T/2, and their sum is always E.",
          diagram: { title: "Expected answer", x: [0, 1.05], y: [0, 1.25], xLabel: "t / T", yLabel: "E", grid: false, curves: [{ f: (t) => Math.sin(2 * Math.PI * t) ** 2, domain: [0, 1], color: "a", label: "Eₖ", labelX: 0.22 }, { f: (t) => Math.cos(2 * Math.PI * t) ** 2, domain: [0, 1], color: "b", label: "Eₚ", labelX: 0.47 }] },
          reject: "energy going negative; energies with period T",
          tip: "能量對時間：一個週期有兩個高峰（頻率 2f），永遠唔係負數。" },
        { title: "Show that a pendulum performs SHM for small angles", paper: "P2", where: "Paper 2 · 3 marks · \"Show that\" · diagram",
          q: "Using a diagram of the forces on a pendulum bob, show that the bob performs simple harmonic motion for small amplitudes.",
          marks: ["restoring force = component of weight along the arc = __−mg sin θ__", "for small θ, __sin θ ≈ θ = x/l__ so F ≈ −(mg/l)x", "a = −(g/l)x: acceleration ∝ displacement and opposite in direction → SHM with __ω² = g/l__"],
          model: "The tension is perpendicular to the path, so the restoring force is the component of weight along the arc, −mg sin θ. For small angles sin θ ≈ θ = x/l, giving a = −(g/l)x. Acceleration is proportional to displacement and directed towards equilibrium, which defines SHM, with ω = √(g/l) and T = 2π√(l/g).",
          svg: pendFig(),
          reject: "using tension as the restoring force; omitting the small-angle condition",
          tip: "記住寫「small angle: sin θ ≈ θ」先得最後一分。" },
      ],
      concepts: [
        { h: "Phase relationships in SHM", b: "<p>Velocity leads displacement by π/2 and acceleration is in antiphase with displacement (a = −ω²x). Kinetic and potential energy each vary at <strong>twice</strong> the oscillation frequency. On a v–x graph the motion traces an ellipse; on an a–x graph it is a straight line of gradient −ω².</p>" },
      ],
    },
    // ================= C.2 WAVE MODEL =================
    "phys-12": {
      diagrams: [
        { title: "At constant wave speed: λ against f is a hyperbola (b); f against 1/λ is a straight line with gradient v (a)", x: [0, 10], y: [0, 10], xLabel: "f (b) or 1/λ (a)", yLabel: "λ (b) or f (a)", grid: false,
          curves: [{ f: (x) => 8 / x, domain: [0.8, 10], color: "b", label: "λ–f", labelX: 8 }, { f: (x) => 0.9 * x, domain: [0, 10], color: "a", label: "f–1/λ", labelX: 7 }] },
        { title: "Displacement–distance (a) and displacement–time (b) look alike: read λ from (a), T from (b)", x: [0, 2.1], y: [-1.5, 1.5], xLabel: "x (a) or t (b)", yLabel: "y", grid: false,
          curves: [{ f: (x) => Math.sin(2 * Math.PI * x), domain: [0, 2], color: "a" }], lines: [{ from: [0.25, 1.15], to: [1.25, 1.15], color: "muted", dash: true, label: "λ or T" }] },
      ],
      figures: [
        { title: "Transverse and longitudinal waves", caption: "Sound is longitudinal; EM waves and waves on strings are transverse.", svg: waveTypesFig() },
        { title: "Wavefronts and rays", caption: "Wavefronts join points in phase, one wavelength apart; rays show the direction of energy transfer.", svg: wavefrontFig() },
        { title: "The electromagnetic spectrum", caption: "Orders of magnitude of wavelength in a vacuum.", svg: emFig() },
      ],
      frames: [
        { title: "Draw wavefronts and rays for a plane wave and a point source", paper: "P2", where: "Paper 2 · 2 marks · draw",
          q: "Draw diagrams showing the wavefronts and rays for (a) a plane wave and (b) a wave spreading out from a point source.",
          marks: ["(a) __parallel straight wavefronts__, equally spaced (one λ apart), rays __perpendicular__ to them, parallel to each other", "(b) __concentric circles__ around the source, rays radiating outwards perpendicular to the wavefronts"],
          model: "Wavefronts are lines joining points of the same phase (e.g. crests), separated by one wavelength. For a plane wave they are parallel straight lines with parallel rays at right angles. For a point source they are concentric circles and the rays point radially outwards.",
          svg: wavefrontFig(),
          reject: "rays parallel to wavefronts; uneven spacing in a uniform medium",
          tip: "波前同射線一定垂直；波前之間相隔一個 λ。" },
        { title: "Label a longitudinal wave: compressions, rarefactions, wavelength and particle motion", paper: "P2", where: "Paper 2 · 3 marks · annotate",
          q: "A sound wave travels through air. Draw a diagram of the air particles and label a compression, a rarefaction and one wavelength. State the direction in which the particles oscillate.",
          marks: ["__compression__ (particles close together, high pressure) and __rarefaction__ (far apart, low pressure) labelled", "wavelength = distance between __two adjacent compressions__ (or rarefactions)", "particles oscillate __parallel__ to the direction of energy transfer (back and forth about fixed positions)"],
          model: "Draw rows of particles with regions bunched together (compressions) and spread apart (rarefactions). One wavelength is from the centre of one compression to the centre of the next. The particles vibrate backwards and forwards along the direction of travel; they do not travel with the wave.",
          svg: waveTypesFig(),
          reject: "wavelength from a compression to the next rarefaction; particles moving along with the wave",
          tip: "λ = 一個 compression 去下一個 compression；粒子只係前後振動。" },
      ],
      concepts: [
        { h: "Wavefronts and rays", b: "<p>A <strong>wavefront</strong> is a surface (line) joining neighbouring points that are in phase; adjacent wavefronts are one wavelength apart. A <strong>ray</strong> shows the direction of energy transfer and is always perpendicular to the wavefronts. Waves transfer energy, not matter: each particle only oscillates about its equilibrium position.</p>" },
      ],
    },
  }});
})();
