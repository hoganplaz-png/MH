/* Geography - diagrams and graphs to know (original). Models, systems diagrams, landform cross-sections,
   relationship graphs and "draw / sketch / annotate" frames for every geo topic. */
(function () {
  // ---------- small SVG kit (currentColor + --fig-* variables only) ----------
  const C = (c) => (c ? `var(--fig-${c})` : "currentColor");
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.s || 12}" text-anchor="${o.a || "middle"}" fill="${C(o.c)}"${o.b ? ' font-weight="700"' : ""}${o.i ? ' font-style="italic"' : ""}${o.r ? ` transform="rotate(${o.r} ${x} ${y})"` : ""}>${s}</text>`;
  const TM = (x, y, s, o = {}) => String(s).split("|").map((l, i) => T(x, y + i * (o.lh || 14), l, o)).join("");
  const fillOf = (f, op) => (f === "none" ? 'fill="none"' : `fill="${f ? `var(--fig-${f})` : "var(--fig-fill)"}"${op ? ` fill-opacity="${op}"` : ""}`);
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 4}" ${fillOf(o.f, o.op)} stroke="${o.c === "none" ? "none" : C(o.c)}" stroke-width="${o.w || 1.3}"${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const BOX = (x, y, w, h, s, o = {}) => {
    const n = String(s).split("|").length, lh = o.lh || 14;
    return R(x, y, w, h, o) + TM(x + w / 2, y + h / 2 + 4 - ((n - 1) * lh) / 2, s, { s: o.s || 12, c: o.tc, b: o.b, lh });
  };
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const P = (d, o = {}) => `<path d="${d}" ${o.f ? fillOf(o.f, o.op) : 'fill="none"'} stroke="${o.c === "none" ? "none" : C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""}${o.lc ? ' stroke-linecap="round" stroke-linejoin="round"' : ""}/>`;
  const CI = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${o.f ? fillOf(o.f, o.op) : 'fill="none"'} stroke="${o.c === "none" ? "none" : C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const EL = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${o.f ? fillOf(o.f, o.op) : 'fill="none"'} stroke="${o.c === "none" ? "none" : C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const pt = (cx, cy, r, deg) => [+(cx + r * Math.cos((deg * Math.PI) / 180)).toFixed(1), +(cy + r * Math.sin((deg * Math.PI) / 180)).toFixed(1)];
  // annular wedge between radii r1..r2 and angles a1..a2 (degrees, clockwise from east)
  const wedge = (cx, cy, r1, r2, a1, a2, o = {}) => {
    const [x1, y1] = pt(cx, cy, r1, a1), [x2, y2] = pt(cx, cy, r2, a1), [x3, y3] = pt(cx, cy, r2, a2), [x4, y4] = pt(cx, cy, r1, a2);
    const big = a2 - a1 > 180 ? 1 : 0;
    return P(`M${x1} ${y1}L${x2} ${y2}A${r2} ${r2} 0 ${big} 1 ${x3} ${y3}L${x4} ${y4}` + (r1 > 0 ? `A${r1} ${r1} 0 ${big} 0 ${x1} ${y1}Z` : "Z"), o);
  };
  const ring = (cx, cy, r1, r2, o) => wedge(cx, cy, r1, r2, -90, 90, o) + wedge(cx, cy, r1, r2, 90, 270, o);
  // figure builder: arrows get per-figure markers (id "ar-<id>[-colour]")
  const fig = (id, w, h, label, fn) => {
    const used = new Set();
    const mk = (c) => { used.add(c || ""); return `url(#ar-${id}${c ? "-" + c : ""})`; };
    const A = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""} marker-end="${mk(o.c)}"${o.both ? ` marker-start="${mk(o.c)}"` : ""}/>`;
    const AP = (d, o = {}) => `<path d="${d}" fill="none" stroke="${C(o.c)}" stroke-width="${o.w || 1.5}"${o.d ? ' stroke-dasharray="4 3"' : ""} marker-end="${mk(o.c)}"${o.both ? ` marker-start="${mk(o.c)}"` : ""}/>`;
    const body = fn({ A, AP });
    const defs = [...used].map((c) => `<marker id="ar-${id}${c ? "-" + c : ""}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C(c)}"/></marker>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${defs ? `<defs>${defs}</defs>` : ""}${body}</svg>`;
  };
  // four-box feedback / cycle loop (clockwise)
  const loop = (id, label, items, centre, col) => fig(id, 400, 236, label, ({ A }) =>
    BOX(120, 6, 160, 44, items[0], { s: 11, lh: 13 }) + BOX(240, 96, 156, 44, items[1], { s: 11, lh: 13 }) +
    BOX(120, 186, 160, 44, items[2], { s: 11, lh: 13 }) + BOX(4, 96, 156, 44, items[3], { s: 11, lh: 13 }) +
    A(282, 30, 318, 92, { c: col, w: 2 }) + A(318, 142, 282, 206, { c: col, w: 2 }) + A(118, 206, 82, 142, { c: col, w: 2 }) + A(82, 94, 118, 30, { c: col, w: 2 }) +
    TM(200, 112, centre, { s: 12, b: true, c: col, lh: 15 }));
  // horizontal process chain, wrapping onto a second row
  const flow = (id, label, items, o = {}) => {
    const per = o.per || 3, bw = o.bw || 128, bh = o.bh || 54, gx = o.gx || 24, gy = o.gy || 30;
    const rows = Math.ceil(items.length / per), W = per * bw + (per - 1) * gx + 8, H = rows * bh + (rows - 1) * gy + 8 + (o.foot ? 22 : 0);
    return fig(id, W, H, label, ({ A }) => items.map((s, i) => {
      const r = Math.floor(i / per), c = i % per, x = 4 + c * (bw + gx), y = 4 + r * (bh + gy);
      let g = BOX(x, y, bw, bh, s, { s: 11, lh: 13, f: (o.hi || []).includes(i) ? "a" : undefined, op: (o.hi || []).includes(i) ? 0.18 : undefined });
      if (i < items.length - 1) g += c < per - 1 ? A(x + bw + 2, y + bh / 2, x + bw + gx - 3, y + bh / 2, { c: o.col }) : A(x + bw / 2, y + bh + 2, 4 + bw / 2, y + bh + gy - 3, { c: o.col });
      return g;
    }).join("") + (o.foot ? T(W / 2, H - 6, o.foot, { s: 11, c: o.footC }) : ""));
  };
  // population pyramid: male / female half-widths per band (bottom = youngest)
  const pyr = (cx, base, bh, m, f, o = {}) => {
    const d = (arr, sgn) => arr.map((w, i) => `M${cx} ${base - (i + 1) * bh}h${sgn * w}v${bh - 1}h${-sgn * w}z`).join("");
    return P(d(m, -1), { f: o.mf || "b", op: 0.55, c: "none" }) + P(d(f, 1), { f: o.ff || "d", op: 0.45, c: "none" }) + L(cx, base, cx, base - m.length * bh, { w: 1 });
  };
  // triangle of three linked nodes with outside edge labels (nexus / flows)
  const tri = (id, label, names, left, right, bottom) => fig(id, 480, 270, label, ({ A }) =>
    CI(240, 38, 32, { f: "b", op: 0.18 }) + CI(110, 200, 32, { f: "a", op: 0.18 }) + CI(370, 200, 32, { f: "c", op: 0.18 }) +
    T(240, 42, names[0], { b: true }) + T(110, 204, names[1], { b: true }) + T(370, 204, names[2], { b: true }) +
    A(220, 66, 130, 172, { w: 2, both: true }) + A(260, 66, 350, 172, { w: 2, both: true }) + A(146, 200, 334, 200, { w: 2, both: true }) +
    TM(8, 92, left, { s: 11, a: "start", lh: 13 }) + TM(472, 92, right, { s: 11, a: "end", lh: 13 }) + TM(240, 250, bottom, { s: 11, lh: 13 }));
  const lin = (pts) => (x) => {
    if (x <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [a, b] = pts[i - 1], [c, d] = pts[i]; return b + ((d - b) * (x - a)) / (c - a); }
    return pts[pts.length - 1][1];
  };
  const sig = (x, m, k) => 1 / (1 + Math.exp(-(x - m) * k));

  // ---------- shared figures ----------
  const pyrAnatomy = fig("g1-1", 480, 250, "Annotated population pyramid", ({ A }) => {
    const m = [70, 62, 55, 48, 40, 33, 26, 18, 11, 5], f = [69, 61, 55, 48, 41, 34, 27, 20, 13, 7];
    const ages = ["0-9", "", "20-29", "", "40-49", "", "60-69", "", "80-89", ""];
    return pyr(250, 215, 18, m, f) + ages.map((a, i) => (a ? T(174, 215 - i * 18 - 5, a, { s: 11, a: "end" }) : "")).join("") +
      T(215, 22, "Males", { c: "b", b: true }) + T(285, 22, "Females", { c: "d", b: true }) +
      L(180, 218, 320, 218, { w: 1 }) + T(250, 234, "% of total population", { s: 11 }) + T(174, 30, "Age", { s: 11, a: "end" }) +
      A(335, 40, 262, 40, { c: "muted", w: 1 }) + TM(340, 38, "Narrow top: few elderly,|low life expectancy", { s: 11, a: "start", lh: 13 }) +
      A(335, 122, 294, 122, { c: "muted", w: 1 }) + TM(340, 116, "Concave, steep sides:|high death rates at all|ages (short lives)", { s: 11, a: "start", lh: 13 }) +
      A(335, 200, 322, 200, { c: "muted", w: 1 }) + TM(340, 196, "Wide base: high birth|rate (youthful)", { s: 11, a: "start", lh: 13 }) +
      TM(8, 70, "Also read:|bulge = baby boom|or in-migration;|notch = war, famine,|low births, out-|migration;|sex ratio of elderly", { s: 11, a: "start", lh: 13 });
  });
  const corePeri = fig("g1-2", 430, 230, "Core-periphery model", ({ A }) =>
    CI(120, 115, 105, { f: "muted", op: 0.12 }) + CI(120, 115, 68, { f: "b", op: 0.15 }) + CI(120, 115, 34, { f: "a", op: 0.35 }) +
    T(120, 119, "Core", { b: true }) + T(120, 66, "Semi-periphery", { s: 11 }) + T(120, 30, "Periphery", { s: 11 }) +
    A(40, 190, 92, 140, { c: "d", w: 2 }) + A(150, 92, 205, 40, { c: "c", w: 2 }) +
    TM(240, 26, "Spread (trickle-down) effects:|investment, technology, ideas,|demand for goods move outward", { s: 11, a: "start", lh: 13, c: "c" }) +
    TM(240, 100, "Backwash effects: young migrants,|capital, raw materials and talent|flow into the core", { s: 11, a: "start", lh: 13, c: "d" }) +
    TM(240, 168, "Cumulative causation: the core|grows faster, the periphery|loses people (Friedmann, Myrdal)", { s: 11, a: "start", lh: 13 }));
  const stagePyr = (cx, w) => pyr(cx, 140, 13, w, w);
  const pyrStages = fig("g2-1", 470, 190, "Pyramid shapes by DTM stage", () =>
    [[40, 30, 22, 16, 11, 7, 4, 2], [40, 34, 28, 23, 18, 13, 8, 4], [30, 30, 27, 24, 20, 15, 10, 5], [24, 25, 25, 25, 24, 22, 17, 10], [17, 19, 21, 23, 25, 25, 21, 14]]
      .map((w, i) => stagePyr(47 + 94 * i, w) + T(47 + 94 * i, 160, "Stage " + (i + 1), { b: true }) +
        TM(47 + 94 * i, 175, ["High fluctuating", "Expanding", "Narrowing base", "Stationary", "Contracting"][i], { s: 11 })).join("") +
    T(235, 20, "Wide triangular base → straight-sided → narrower base than middle", { s: 11, c: "muted" }));
  const pyrStage5 = fig("g2-2", 420, 210, "Contracting pyramid of a stage 5 country", ({ A }) =>
    pyr(170, 190, 16, [17, 19, 21, 23, 25, 27, 27, 24, 18, 10], [16, 18, 20, 22, 24, 26, 27, 26, 22, 15]) +
    T(150, 22, "Males", { c: "b", b: true, a: "end" }) + T(190, 22, "Females", { c: "d", b: true, a: "start" }) +
    A(230, 182, 192, 182, { c: "muted", w: 1 }) + TM(236, 180, "Narrow base: CBR below CDR,|TFR ~1.3 (e.g. Japan, Italy)", { s: 11, a: "start", lh: 13 }) +
    A(230, 92, 200, 92, { c: "muted", w: 1 }) + TM(236, 90, "Widest at 50-69: ageing|baby-boom cohorts", { s: 11, a: "start", lh: 13 }) +
    A(230, 36, 188, 36, { c: "muted", w: 1 }) + TM(236, 34, "Wide top, more women: high|life expectancy (women live longer)", { s: 11, a: "start", lh: 13 }) +
    T(170, 206, "Cohorts in 10-year bands (bottom 0-9, top 90+)", { s: 11, c: "muted" }));
  const leeModel = fig("g3-1", 430, 210, "Lee's migration model", ({ AP }) => {
    const sy = (x, y, s) => T(x, y, s, { s: 14, b: true, c: s === "+" ? "c" : s === "−" ? "d" : "muted" });
    const o = [[60, 85, "−"], [90, 75, "−"], [70, 110, "+"], [105, 105, "−"], [50, 125, "0"], [85, 135, "−"], [115, 130, "0"]];
    const d = [[315, 85, "+"], [345, 75, "+"], [325, 110, "−"], [360, 105, "+"], [305, 125, "0"], [340, 135, "+"], [370, 128, "+"]];
    return CI(85, 105, 55, { f: "fill" }) + CI(340, 105, 55, { f: "fill" }) + o.concat(d).map(([x, y, s]) => sy(x, y, s)).join("") +
      T(85, 178, "Origin", { b: true }) + T(340, 178, "Destination", { b: true }) +
      P("M158 150L178 112L192 132L210 92L230 132L246 108L268 150", { c: "muted", w: 2 }) + T(212, 168, "Intervening obstacles", { s: 11 }) +
      T(212, 182, "(distance, cost, borders, visas)", { s: 11, c: "muted" }) +
      AP("M120 52Q212 4 305 52", { w: 2, c: "a" }) + T(212, 40, "Migration", { s: 11, c: "a" }) +
      T(215, 203, "+ pull (attracts)   − push (repels)   0 neutral; plus personal factors", { s: 11 });
  });
  const pyrLabour = fig("g3-2", 430, 210, "Pyramid distorted by labour in-migration", ({ A }) =>
    pyr(170, 190, 16, [20, 18, 17, 42, 50, 40, 22, 9, 4, 2], [19, 17, 16, 18, 17, 14, 10, 6, 3, 2]) +
    T(150, 22, "Males", { c: "b", b: true, a: "end" }) + T(190, 22, "Females", { c: "d", b: true, a: "start" }) +
    A(236, 118, 124, 118, { c: "muted", w: 1 }) +
    TM(240, 110, "Large male surplus aged 30-59:|in-migrant construction and|oil workers (e.g. Qatar, UAE)", { s: 11, a: "start", lh: 13 }) +
    TM(240, 170, "Small base and few elderly:|migrants come without families|and return home when older", { s: 11, a: "start", lh: 13 }) +
    T(170, 206, "10-year age bands (bottom 0-9)", { s: 11, c: "muted" }));
  const migTypes = fig("g3-3", 430, 170, "Types of migration", () =>
    R(110, 30, 155, 26, { f: "b", op: 0.15 }) + T(187, 48, "Voluntary (choice)", { b: true }) + R(270, 30, 155, 26, { f: "d", op: 0.15 }) + T(347, 48, "Forced", { b: true }) +
    BOX(4, 60, 102, 50, "Internal|(within a country)", { s: 11, b: true }) + BOX(4, 114, 102, 50, "International|(across borders)", { s: 11, b: true }) +
    BOX(110, 60, 155, 50, "rural-urban for jobs; urban-|rural (counter-urbanisation)", { s: 11, lh: 13 }) +
    BOX(270, 60, 155, 50, "internally displaced persons|(IDPs): conflict, floods, dams", { s: 11, lh: 13 }) +
    BOX(110, 114, 155, 50, "economic migrants, students,|retirees, family reunion", { s: 11, lh: 13 }) +
    BOX(270, 114, 155, 50, "refugees and asylum seekers;|trafficked people", { s: 11, lh: 13 }) +
    T(215, 18, "Also: temporary vs permanent; step, chain and return migration", { s: 11, c: "muted" }));

  const ghEffect = fig("g4-1", 440, 250, "Natural and enhanced greenhouse effect", ({ A }) =>
    CI(30, 30, 18, { f: "a", op: 0.6 }) + T(30, 62, "Sun", { s: 11 }) +
    R(4, 92, 246, 46, { f: "muted", op: 0.15, c: "muted" }) + TM(8, 112, "GHG|layer", { s: 11, a: "start", lh: 13 }) +
    R(4, 214, 246, 30, { f: "c", op: 0.18, c: "none" }) + L(4, 214, 250, 214) + T(127, 234, "Earth's surface", { s: 11 }) +
    A(46, 44, 86, 212, { c: "a", w: 2.4 }) + T(40, 88, "1", { b: true, c: "a" }) +
    A(94, 212, 134, 18, { c: "b", w: 2, d: true }) + T(146, 74, "2", { b: true, c: "b" }) +
    A(162, 212, 192, 14, { c: "d", w: 1.6 }) + T(196, 70, "3", { b: true, c: "d" }) +
    A(206, 212, 216, 116, { c: "d", w: 2.4 }) + A(226, 116, 236, 210, { c: "d", w: 2.4 }) + T(242, 176, "4", { b: true, c: "d" }) +
    TM(260, 16, "1 Incoming short-wave solar|radiation (visible, UV)|2 ~30% reflected by clouds,|ice, aerosols (albedo)|3 Some long-wave (infrared)|radiation escapes to space|4 Long-wave absorbed by CO₂,|CH₄, H₂O, N₂O and re-emitted,|partly back to the surface", { s: 11, a: "start", lh: 14 }) +
    TM(260, 158, "Natural effect: mean ~15 °C|(about −18 °C without it).|Enhanced effect: more GHGs|from human activity → more|long-wave trapped → warming", { s: 11, a: "start", lh: 14, c: "d" }));
  const albedoLoop = loop("g4-2", "Ice-albedo positive feedback loop", ["Global temperature rises", "Sea ice and snow|cover melt", "Lower albedo: dark ocean|and land exposed", "More solar radiation|absorbed"], "Positive|feedback|(amplifies)", "d");
  const permaLoop = loop("g4-3", "Permafrost methane positive feedback loop", ["Arctic warming", "Permafrost thaws", "Microbes decompose|organic matter", "CO₂ and CH₄ released|(more greenhouse gas)"], "Positive|feedback", "d");
  const cloudLoop = loop("g4-4", "Low-cloud negative feedback loop", ["Surface warming", "More evaporation|(warm air holds more H₂O)", "More low cloud reflects|incoming solar radiation", "Less solar energy|reaches the surface"], "Negative|feedback|(dampens)", "b");
  const milank = fig("g4-5", 450, 180, "Milankovitch cycles", () => {
    const tilt = (cx, cy, deg, o) => { const r = 44, s = Math.sin((deg * Math.PI) / 180), c = Math.cos((deg * Math.PI) / 180); return L(+(cx - r * s).toFixed(1), +(cy + r * c).toFixed(1), +(cx + r * s).toFixed(1), +(cy - r * c).toFixed(1), o); };
    return EL(75, 75, 64, 40, { d: true, c: "a" }) + CI(75, 75, 46, { c: "b" }) + CI(85, 75, 5, { f: "a" }) + T(75, 136, "Eccentricity", { b: true }) + TM(75, 152, "orbit circular ↔ elliptical|~100,000 years", { s: 11, lh: 13 }) +
      CI(225, 75, 26, { f: "b", op: 0.2 }) + L(170, 75, 280, 75, { c: "muted", d: true, w: 1 }) + L(225, 25, 225, 125, { c: "muted", w: 1 }) + tilt(225, 75, 22.1, { c: "b", w: 2 }) + tilt(225, 75, 24.5, { c: "d", w: 2 }) +
      T(250, 30, "22.1°-24.5°", { s: 11, a: "start" }) + T(225, 136, "Obliquity (axial tilt)", { b: true }) + TM(225, 152, "more tilt = stronger seasons|~41,000 years", { s: 11, lh: 13 }) +
      CI(375, 85, 26, { f: "b", op: 0.2 }) + tilt(375, 85, 23.4, { c: "b", w: 2 }) + EL(392, 45, 16, 5, { c: "d", w: 1.4 }) + EL(358, 125, 16, 5, { c: "d", w: 1.4, d: true }) +
      T(375, 136, "Precession (wobble)", { b: true }) + TM(375, 152, "axis traces a circle|~26,000 years", { s: 11, lh: 13 });
  });
  const carbonCycle = fig("g4-6", 440, 236, "Carbon cycle stores and flows", ({ A }) =>
    BOX(150, 6, 140, 40, "Atmosphere|≈ 870 Gt C", { s: 11, f: "b", op: 0.15 }) + BOX(6, 100, 124, 40, "Land plants|≈ 450-650 Gt C", { s: 11, f: "c", op: 0.18 }) +
    BOX(6, 188, 124, 40, "Soils|≈ 1,500-2,400 Gt C", { s: 11 }) + BOX(310, 100, 124, 40, "Oceans|≈ 38,000 Gt C", { s: 11, f: "b", op: 0.25 }) +
    BOX(160, 188, 130, 40, "Fossil fuels|≈ 1,000 Gt C", { s: 11, f: "muted", op: 0.25 }) +
    A(150, 34, 84, 98, { c: "c" }) + T(8, 58, "photosynthesis", { s: 11, a: "start", c: "c" }) +
    A(104, 98, 168, 48) + T(140, 86, "respiration", { s: 11, a: "start" }) +
    A(290, 30, 352, 98, { c: "b" }) + A(376, 98, 300, 22, { c: "b" }) + TM(372, 54, "ocean-air|exchange", { s: 11, a: "start", lh: 13, c: "b" }) +
    A(68, 142, 68, 186) + T(76, 168, "litter, death", { s: 11, a: "start" }) +
    A(225, 186, 225, 50, { c: "d", w: 2.2 }) + TM(232, 150, "combustion|≈ 10 Gt C/yr", { s: 11, a: "start", lh: 13, c: "d" }) +
    A(130, 196, 186, 50, { d: true, c: "muted" }));

  const riskEq = fig("g5-1", 430, 150, "Risk equation", () =>
    BOX(6, 30, 80, 44, "RISK", { b: true, f: "d", op: 0.18 }) + T(98, 58, "=", { s: 14, b: true }) +
    BOX(110, 30, 90, 44, "Hazard|(exposure)", { s: 11 }) + T(212, 58, "×", { s: 14, b: true }) +
    BOX(224, 30, 90, 44, "Vulnerability", { s: 11 }) + T(328, 58, "÷", { s: 14, b: true }) +
    BOX(340, 30, 86, 44, "Capacity|(resilience)", { s: 11, f: "c", op: 0.18 }) +
    TM(155, 96, "frequency, magnitude:|drought, storm surge,|sea-level rise", { s: 11, lh: 13, c: "muted" }) +
    TM(269, 96, "poverty, age, gender,|location, health,|dependence on farming", { s: 11, lh: 13, c: "muted" }) +
    TM(383, 96, "wealth, insurance,|early warnings,|good governance", { s: 11, lh: 13, c: "muted" }) +
    T(215, 16, "Raise capacity or cut vulnerability and risk falls even if the hazard is unchanged", { s: 11 }));
  const emitVuln = fig("g5-2", 420, 242, "Emissions per capita vs vulnerability", ({ A }) => {
    const p = (x, y, s, c, an) => CI(x, y, 4, { f: c, c: "none" }) + T(x + (an === "end" ? -7 : 7), y + 4, s, { s: 11, a: an || "start" });
    return A(40, 200, 410, 200, { w: 1.4 }) + A(40, 200, 40, 14, { w: 1.4 }) + L(225, 20, 225, 200, { c: "muted", d: true, w: 1 }) + L(40, 110, 405, 110, { c: "muted", d: true, w: 1 }) +
      T(400, 216, "CO₂ emissions per person →", { s: 11, a: "end" }) + T(16, 110, "Vulnerability →", { s: 11, r: -90 }) +
      TM(132, 36, "Low emitters, high vulnerability:|'climate injustice'", { s: 11, lh: 13, c: "d", b: true }) +
      T(304, 190, "High emitters, more capacity to adapt", { s: 11, c: "b", b: true }) +
      p(70, 68, "Chad", "d") + p(95, 92, "Bangladesh", "d") + p(60, 104, "Tuvalu", "d") + p(140, 140, "India", "a") +
      p(262, 132, "China", "a") + p(300, 166, "Netherlands", "b", "end") + p(340, 150, "USA", "b") + p(372, 128, "Australia", "b", "end") + p(398, 160, "Qatar", "b", "end") +
      T(225, 234, "Schematic placement (cf. ND-GAIN and per-capita CO₂ data)", { s: 11, c: "muted" });
  });
  const slrChain = fig("g5-3", 492, 190, "Causes and impacts of sea-level rise", ({ A }) =>
    BOX(4, 70, 84, 44, "Global|warming", { s: 11, b: true, f: "d", op: 0.15 }) +
    BOX(110, 20, 120, 50, "Thermal expansion|of warmer|seawater", { s: 11, lh: 13 }) + BOX(110, 116, 120, 50, "Melting glaciers and|Greenland/Antarctic|ice sheets", { s: 11, lh: 13 }) +
    BOX(250, 68, 84, 50, "Sea-level|rise ≈ 4 mm|per year", { s: 11, lh: 13, b: true, f: "b", op: 0.18 }) +
    BOX(354, 4, 134, 52, "Coastal flooding,|storm surges reach|further inland", { s: 11, lh: 13 }) + BOX(354, 66, 134, 52, "Salinisation of|soils and aquifers|(crops fail)", { s: 11, lh: 13 }) +
    BOX(354, 128, 134, 56, "Erosion, loss of land|and displacement|(e.g. Tuvalu, Bangladesh)", { s: 11, lh: 13 }) +
    A(90, 84, 108, 50) + A(90, 100, 108, 136) + A(232, 46, 248, 84) + A(232, 140, 248, 104) +
    A(336, 84, 352, 32) + A(336, 92, 352, 92) + A(336, 100, 352, 152) +
    T(172, 186, "Melting sea ice does not raise sea level (already floating)", { s: 11, c: "muted" }));

  const mitAdapt = fig("g6-1", 430, 210, "Mitigation vs adaptation", () =>
    BOX(6, 6, 205, 30, "MITIGATION: tackle the causes", { b: true, f: "c", op: 0.2 }) + BOX(219, 6, 205, 30, "ADAPTATION: live with impacts", { b: true, f: "b", op: 0.2 }) +
    TM(12, 56, "reduce GHG emissions or|increase carbon sinks|• renewables, nuclear, efficiency|• carbon pricing (EU ETS, taxes)|• reforestation, protect peatland|• carbon capture and storage|• geoengineering (proposed)", { s: 11, a: "start", lh: 14 }) +
    TM(225, 56, "reduce vulnerability, build|resilience to change|• sea walls, managed retreat|• drought-resistant crops|• early-warning systems|• water storage, flood insurance|• migration, cooling centres", { s: 11, a: "start", lh: 14 }) +
    L(215, 40, 215, 160, { c: "muted", w: 1 }) +
    TM(215, 178, "Mitigation: global, long-term benefit (shared). Adaptation: local, immediate|benefit. LICs often prioritise adaptation; both are needed.", { s: 11, lh: 14 }));
  const ccs = fig("g6-2", 440, 236, "Carbon capture and storage", ({ A }) =>
    R(20, 60, 64, 50, { f: "muted", op: 0.25 }) + R(64, 20, 12, 40, { f: "muted", op: 0.25 }) + TM(52, 82, "Power|plant", { s: 11 }) +
    A(86, 85, 150, 85) + BOX(152, 64, 110, 42, "CO₂ captured|and compressed", { s: 11 }) +
    L(264, 85, 300, 85, { w: 3, c: "b" }) + L(300, 85, 300, 110, { w: 3, c: "b" }) + T(282, 78, "pipeline", { s: 11, c: "b" }) +
    L(0, 112, 440, 112, { w: 1.4 }) + T(436, 106, "ground surface", { s: 11, a: "end" }) +
    R(0, 160, 440, 16, { f: "muted", op: 0.5, c: "none", rx: 0 }) + T(8, 172, "impermeable caprock", { s: 11, a: "start" }) +
    R(0, 176, 440, 34, { f: "b", op: 0.18, c: "none", rx: 0 }) + A(300, 112, 300, 192, { c: "b", w: 3 }) +
    TM(8, 190, "porous rock: depleted gas field|or saline aquifer (>800 m deep)", { s: 11, a: "start", lh: 13 }) +
    TM(8, 134, "Captures up to ~90% of a plant's CO₂;|costly, energy-intensive, risk of leaks", { s: 11, a: "start", lh: 14 }) +
    T(220, 228, "Not to scale", { s: 11, c: "muted" }));
  const capTrade = fig("g6-3", 400, 230, "Cap-and-trade emissions trading", ({ A }) =>
    L(40, 200, 330, 200, { w: 1.4 }) + L(40, 200, 40, 30, { w: 1.4 }) + T(30, 200, "0", { s: 11, a: "end" }) +
    R(80, 130, 70, 70, { f: "c", op: 0.4, c: "none", rx: 0 }) + R(210, 70, 70, 130, { f: "d", op: 0.35, c: "none", rx: 0 }) +
    L(60, 100, 300, 100, { c: "a", w: 2, d: true }) + T(306, 104, "cap: 100 permits", { s: 11, a: "start", c: "a" }) + T(306, 118, "each", { s: 11, a: "start", c: "a" }) +
    T(115, 218, "Firm A emits 70", { s: 11 }) + T(245, 218, "Firm B emits 130", { s: 11 }) +
    R(80, 100, 70, 30, { f: "none", c: "c", d: true, rx: 0 }) + T(115, 119, "30 spare", { s: 11, c: "c" }) + T(245, 90, "30 short", { s: 11, c: "d" }) +
    A(150, 115, 208, 86, { w: 2 }) + TM(180, 50, "A sells 30 permits to B", { s: 11 }) +
    TM(306, 150, "Total emissions|fixed by the cap;|cap lowered|each year", { s: 11, a: "start", lh: 13 }));

  const nexus = tri("g7-1", "Water-food-energy nexus", ["Water", "Energy", "Food"],
    "Water → energy: cooling,|hydropower, fracking|Energy → water: pumping,|desalination, treatment",
    "Water → food: irrigation|(~70% of withdrawals)|Food → water: fertiliser|runoff, aquifer depletion",
    "Energy → food: fuel, fertiliser, machinery, cold chains|Food → energy: biofuels (maize ethanol, sugar cane) compete for land");
  const circular = fig("g7-2", 430, 262, "Linear vs circular economy", ({ A, AP }) => {
    const top = ["Take", "Make", "Use", "Dispose"];
    let g = T(8, 18, "Linear economy", { b: true, a: "start" }) + top.map((s, i) => BOX(8 + i * 106, 26, 86, 28, s, { s: 11 }) + (i < 3 ? A(96 + i * 106, 40, 112 + i * 106, 40) : "")).join("");
    g += T(8, 86, "Circular economy", { b: true, a: "start", c: "c" });
    const n = ["Design (durable,|repairable)", "Produce", "Use / share", "Repair, reuse,|remanufacture", "Recycle|materials"], cx = 260, cy = 168, r = 46;
    n.forEach((s, i) => { const a = -90 + i * 72, [x, y] = pt(cx, cy, r + 30, a); g += TM(x + (x > cx + 10 ? 18 : x < cx - 10 ? -18 : 0), y + (y < cy ? -2 : 6), s, { s: 11, lh: 12 }); });
    for (let i = 0; i < 5; i++) { const [x1, y1] = pt(cx, cy, r, -90 + i * 72 + 12), [x2, y2] = pt(cx, cy, r, -90 + i * 72 + 60); g += AP(`M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`, { c: "c", w: 2 }); }
    return g + TM(cx, cy - 2, "waste|designed out", { s: 11, lh: 13, c: "muted" }) + TM(8, 120, "Keeps materials|in use; cuts|resource demand|and waste", { s: 11, a: "start", lh: 13 });
  });

  // ---------- freshwater ----------
  const basinSys = fig("g8-1", 500, 296, "Drainage basin system", ({ A }) =>
    BOX(150, 4, 140, 30, "INPUT: precipitation", { s: 11, b: true, f: "b", op: 0.2 }) +
    BOX(150, 52, 140, 30, "Interception (vegetation)", { s: 11 }) + BOX(150, 108, 140, 30, "Surface storage", { s: 11 }) +
    BOX(150, 164, 140, 30, "Soil water", { s: 11 }) + BOX(150, 220, 140, 30, "Groundwater (rock)", { s: 11 }) +
    BOX(360, 112, 104, 72, "Channel|storage", { s: 11 }) + BOX(360, 4, 104, 40, "OUTPUT: channel|discharge (runoff)", { s: 11, lh: 13, b: true, f: "d", op: 0.15 }) +
    BOX(4, 52, 112, 40, "OUTPUT:|evaporation", { s: 11, lh: 13, b: true, f: "d", op: 0.15 }) + BOX(4, 164, 112, 40, "OUTPUT:|transpiration", { s: 11, lh: 13, b: true, f: "d", op: 0.15 }) +
    A(220, 36, 220, 50, { c: "b" }) + A(220, 84, 220, 106) + T(228, 99, "throughfall, stemflow", { s: 11, a: "start" }) +
    A(220, 140, 220, 162) + T(228, 155, "infiltration", { s: 11, a: "start" }) + A(220, 196, 220, 218) + T(228, 211, "percolation", { s: 11, a: "start" }) +
    A(292, 123, 358, 126) + T(325, 117, "overland flow", { s: 11 }) + A(292, 179, 358, 172) + T(325, 194, "throughflow", { s: 11 }) +
    A(292, 235, 400, 186) + T(330, 250, "groundwater flow (baseflow)", { s: 11, a: "start" }) + A(412, 110, 412, 46, { c: "d" }) +
    A(148, 67, 118, 70, { c: "d" }) + A(150, 116, 100, 94, { c: "d" }) + A(148, 179, 118, 182, { c: "d" }) +
    T(250, 274, "Stores = boxes · flows (transfers) = black arrows · inputs blue · outputs red", { s: 11, c: "muted" }) +
    T(250, 290, "Open system at basin scale; closed system at global scale (hydrological cycle)", { s: 11, c: "muted" }));
  const bradshaw = fig("g8-2", 440, 210, "Bradshaw model of downstream change", ({ A }) => {
    const rows = [["Discharge", 1], ["Channel width", 1], ["Channel depth", 1], ["Mean velocity", 1], ["Load quantity", 1], ["Load particle size", 0], ["Channel bed roughness", 0], ["Gradient (slope)", 0]];
    return T(150, 18, "Upstream (source)", { s: 11, a: "start", b: true }) + T(432, 18, "Downstream (mouth)", { s: 11, a: "end", b: true }) + A(250, 14, 320, 14) +
      rows.map(([s, up], i) => { const y = 40 + i * 21; return T(8, y + 4, s, { s: 11, a: "start" }) + P(up ? `M160 ${y}L430 ${y - 8}L430 ${y + 8}Z` : `M160 ${y - 8}L430 ${y}L160 ${y + 8}Z`, { f: up ? "c" : "d", op: 0.45, c: "none" }); }).join("") +
      T(220, 205, "Green wedge = increases downstream · red wedge = decreases downstream", { s: 11, c: "muted" });
  });
  const meanderX = fig("g8-3", 430, 210, "Cross-section of a meander", ({ AP }) =>
    P("M126 85L135 150Q150 160 165 152L339 85Z", { f: "b", op: 0.25, c: "none" }) +
    P("M8 60L120 60L135 150Q150 160 165 152L380 70L422 70", { w: 2.2 }) + L(126, 85, 339, 85, { c: "b", w: 1.4 }) +
    [190, 215, 240, 265, 290, 315].map((x, i) => CI(x, 145 - i * 11.4, 3, { f: "a", c: "none" })).join("") +
    AP("M240 100Q190 95 170 120Q190 140 230 120", { c: "b", w: 1.4 }) + CI(150, 140, 4, { f: "d", c: "none" }) +
    TM(8, 30, "Outer bank: river cliff|fast flow → erosion", { s: 11, a: "start", lh: 13, c: "d" }) +
    TM(422, 30, "Inner bank: slip-off slope /|point bar, slow flow → deposition", { s: 11, a: "end", lh: 13, c: "a" }) +
    TM(70, 120, "Thalweg (fastest,|deepest flow)", { s: 11, lh: 13 }) + L(108, 128, 145, 140, { w: 1, c: "muted" }) +
    TM(320, 120, "Helicoidal flow carries|sediment across the bed", { s: 11, lh: 13, c: "b" }) +
    T(215, 196, "Asymmetric channel: deep and steep outside, shallow and gentle inside", { s: 11, c: "muted" }));
  const oxbow = fig("g8-4", 470, 212, "Formation of an ox-bow lake", () => {
    const loopPath = (ox, gap) => `M${ox + 40} 8L${ox + 40} ${70 - gap}C${ox + 40} 22 ${ox + 108} 22 ${ox + 108} 70C${ox + 108} 118 ${ox + 40} 118 ${ox + 40} ${70 + gap}L${ox + 40} 136`;
    const cap = ["1 Erosion on the outer|bends narrows the|meander neck", "2 Neck very narrow;|banks almost meet", "3 Flood: river cuts|through the neck|(shorter, steeper)", "4 Deposition seals|the old loop:|ox-bow lake"];
    let g = P(loopPath(0, 22), { c: "b", w: 6, lc: true }) + P(loopPath(117, 7), { c: "b", w: 6, lc: true });
    g += P(`M274 8L274 136`, { c: "b", w: 6, lc: true }) + P(`M274 58C274 22 342 22 342 70C342 118 274 118 274 82`, { c: "b", w: 6, lc: true });
    g += P(`M391 8L391 136`, { c: "b", w: 6, lc: true }) + P(`M403 60C403 26 459 26 459 70C459 114 403 114 403 80`, { c: "b", w: 6, lc: true, op: 0.6 });
    g += [398, 398].map((x, i) => CI(x + 2, i ? 82 : 58, 3.5, { f: "a", c: "none" })).join("") + T(430, 74, "ox-bow", { s: 11 });
    g += P("M108 60l7 4M108 80l7 -4", { c: "d", w: 1.6 }) + T(118, 52, "erosion", { s: 11, c: "d", a: "start" });
    return g + cap.map((s, i) => TM(58 + i * 117, 160, s, { s: 11, lh: 13 })).join("");
  });
  const waterfall = fig("g8-5", 430, 252, "Formation of a waterfall and gorge", ({ A }) =>
    P("M8 85L215 85L215 172Q255 205 300 162L422 162L422 216L8 216Z", { f: "fill", c: "muted", w: 1 }) +
    P("M8 60L240 60L240 85L8 85Z", { f: "muted", op: 0.45, c: "muted", w: 1 }) +
    P("M8 50L240 50", { c: "b", w: 2 }) + P("M240 52Q258 60 262 172", { c: "b", w: 3 }) + P("M218 168Q255 196 298 162", { f: "b", op: 0.3, c: "none" }) +
    P("M300 150L422 150", { c: "b", w: 2 }) +
    T(110, 77, "Hard, resistant rock (caprock)", { s: 11 }) + T(110, 196, "Soft, less resistant rock", { s: 11 }) +
    TM(260, 26, "Overhang of hard rock|collapses when unsupported", { s: 11, lh: 13, a: "start" }) + L(258, 30, 240, 62, { w: 1, c: "muted" }) +
    TM(205, 116, "Undercutting by|splashback, hydraulic|action, abrasion", { s: 11, a: "end", lh: 13, c: "d" }) +
    TM(300, 232, "Plunge pool: deepened by hydraulic|action and abrasion (swirling rocks)", { s: 11, lh: 13 }) +
    A(200, 30, 120, 30, { c: "d", w: 2 }) + T(160, 22, "retreats upstream → gorge", { s: 11, c: "d" }));
  const levees = fig("g8-6", 430, 180, "Floodplain and levees", () =>
    P("M8 30L80 110L160 110L182 95L196 140L244 140L258 95L280 110L350 110L422 30", { w: 2 }) +
    P("M188 112L252 112L244 140L196 140Z", { f: "b", op: 0.3, c: "none" }) + L(188, 112, 252, 112, { c: "b" }) +
    [118, 126, 134].map((y) => L(88, y, 168, y, { c: "muted", d: true, w: 1 }) + L(272, y, 342, y, { c: "muted", d: true, w: 1 })).join("") +
    TM(150, 60, "Levee: coarse sediment|dropped first at the channel|edge as flood water slows", { s: 11, lh: 13 }) + L(180, 76, 184, 94, { w: 1, c: "muted" }) +
    TM(312, 150, "Floodplain: layers of fine|silt and clay (alluvium)", { s: 11, lh: 13 }) + L(310, 138, 310, 120, { w: 1, c: "muted" }) +
    TM(40, 128, "Bluff /|valley side", { s: 11, lh: 13 }) + T(220, 168, "River channel", { s: 11, c: "b" }));
  const aquifer = fig("g8-7", 440, 226, "Aquifer and artesian basin", ({ A }) =>
    P("M10 55Q220 255 430 55L430 80Q220 280 10 80Z", { f: "b", op: 0.28, c: "none" }) +
    P("M10 50Q220 170 430 50", { w: 2 }) + P("M10 55Q220 255 430 55", { w: 1.2 }) + P("M10 80Q220 280 430 80", { w: 1.2 }) +
    L(10, 40, 430, 40, { c: "b", d: true }) + T(425, 34, "potentiometric surface (water pressure level)", { s: 11, a: "end", c: "b" }) +
    L(220, 110, 220, 158, { w: 3 }) + A(220, 110, 220, 64, { c: "b", w: 2 }) + TM(228, 76, "Artesian well: water|rises under pressure", { s: 11, a: "start", lh: 13 }) +
    A(30, 30, 30, 50, { c: "b" }) + A(410, 30, 410, 50, { c: "b" }) + TM(30, 18, "recharge", { s: 11, c: "b" }) + T(410, 18, "recharge", { s: 11, c: "b" }) +
    TM(360, 94, "Impermeable|rock (clay)", { s: 11, lh: 13 }) + T(90, 214, "Impermeable rock below", { s: 11 }) +
    TM(330, 196, "Aquifer: permeable, saturated|rock (sandstone, chalk)", { s: 11, lh: 13 }) + L(330, 184, 300, 156, { w: 1, c: "muted" }));
  const eutro = flow("g8-8", "Eutrophication sequence", ["Fertiliser runoff and|sewage add nitrates|and phosphates", "Algal bloom on|the surface", "Light blocked; plants|below cannot|photosynthesise, die", "Bacteria decompose|dead matter, using|dissolved oxygen", "Hypoxia: very low|dissolved O₂", "Fish die: 'dead|zone' (e.g. Gulf|of Mexico)"], { per: 3, hi: [5] });

  // ---------- hazards ----------
  const convergent = fig("g9-1", 440, 240, "Ocean-continent convergent plate boundary", ({ A }) =>
    P("M10 60L215 60L215 66L200 98L185 80L10 80Z", { f: "b", op: 0.25, c: "none" }) +
    P("M10 80L185 80Q240 85 320 210L295 215Q225 112 180 105L10 105Z", { f: "muted", op: 0.45, c: "currentColor", w: 1.2 }) +
    P("M215 62L430 62L430 140L280 140Z", { f: "a", op: 0.22, c: "currentColor", w: 1.2 }) +
    P("M275 62L302 22L312 22L338 62", { f: "a", op: 0.4, c: "currentColor", w: 1.2 }) + P("M352 62L366 48L380 62L395 44L410 62", { w: 1.4 }) +
    P("M292 190Q298 120 306 26", { c: "d", w: 2.2, d: true }) +
    [[223, 94], [248, 115], [275, 146], [297, 175]].map(([x, y]) => CI(x, y, 4, { f: "d", c: "none" })).join("") +
    T(55, 75, "Ocean", { s: 11, c: "b" }) + T(90, 97, "Oceanic plate (denser basalt)", { s: 11 }) + T(360, 105, "Continental plate", { s: 11 }) + T(360, 119, "(less dense granite)", { s: 11 }) +
    T(300, 14, "Composite volcano", { s: 11, a: "end" }) + T(390, 36, "Fold mountains", { s: 11 }) +
    T(200, 52, "Trench", { s: 11, a: "end" }) + L(202, 54, 200, 90, { w: 1, c: "muted" }) +
    A(30, 122, 80, 122, { w: 2 }) + A(425, 158, 375, 158, { w: 2 }) +
    TM(110, 152, "Earthquake foci|(Benioff zone)", { s: 11, a: "start", lh: 13, c: "d" }) + L(178, 150, 244, 117, { w: 1, c: "muted" }) +
    TM(335, 184, "Partial melting|at ~100 km;|magma rises", { s: 11, a: "start", lh: 13, c: "d" }) +
    T(8, 210, "Mantle (asthenosphere)", { s: 11, a: "start", c: "muted" }) + T(8, 228, "Slab pull drags the oceanic plate down", { s: 11, a: "start", c: "muted" }));
  const divergent = fig("g9-2", 420, 214, "Divergent plate boundary (mid-ocean ridge)", ({ A, AP }) =>
    P("M10 30L410 30L410 75L250 55L220 45L210 58L200 45L170 55L10 75Z", { f: "b", op: 0.2, c: "none" }) + L(10, 30, 410, 30, { c: "b" }) +
    P("M10 75L170 55L200 45L210 58L220 45L250 55L410 75L410 97L250 77L222 70L198 70L170 77L10 97Z", { f: "muted", op: 0.45, c: "currentColor", w: 1.2 }) +
    EL(210, 112, 28, 14, { f: "d", op: 0.4, c: "d" }) + A(210, 98, 210, 64, { c: "d", w: 2 }) +
    AP("M196 170Q120 140 40 172", { c: "muted", w: 1.6 }) + AP("M224 170Q300 140 380 172", { c: "muted", w: 1.6 }) + A(210, 192, 210, 162, { c: "muted", w: 1.6 }) +
    A(150, 18, 80, 18, { w: 2 }) + A(270, 18, 340, 18, { w: 2 }) + T(210, 22, "plates move apart", { s: 11 }) +
    T(258, 46, "Rift valley", { s: 11, a: "start" }) + T(100, 92, "New oceanic crust (basalt)", { s: 11 }) +
    TM(250, 116, "Decompression melting:|magma rises, erupts as|fissure / shield volcanoes", { s: 11, a: "start", lh: 13, c: "d" }) +
    T(210, 210, "Mantle convection; ridge push + slab pull move the plates", { s: 11, c: "muted" }));
  const transform = fig("g9-3", 400, 190, "Transform (conservative) plate boundary", ({ A }) =>
    R(20, 20, 360, 60, { f: "a", op: 0.15 }) + R(20, 86, 360, 60, { f: "b", op: 0.15 }) + L(14, 83, 386, 83, { c: "d", w: 3 }) +
    A(260, 50, 150, 50, { w: 2.4 }) + A(140, 116, 250, 116, { w: 2.4 }) + T(200, 38, "Plate A", { s: 11 }) + T(200, 140, "Plate B", { s: 11 }) +
    T(386, 102, "fault", { s: 11, a: "end", c: "d" }) +
    T(200, 164, "Plates slide past each other: no crust made or destroyed, no volcanoes;", { s: 11 }) +
    T(200, 180, "friction locks the fault → stress released as shallow earthquakes (San Andreas)", { s: 11 }));
  const quake = fig("g9-4", 460, 250, "Earthquake focus and epicentre", ({ A }) =>
    R(0, 50, 460, 160, { f: "a", op: 0.08, c: "none", rx: 0 }) + L(0, 50, 460, 50, { w: 2 }) +
    L(160, 195, 265, 50, { c: "d", w: 2 }) + T(272, 66, "fault", { s: 11, a: "start", c: "d" }) +
    [24, 46, 68].map((r) => CI(200, 140, r, { c: "muted", d: true, w: 1 })).join("") + CI(200, 140, 5, { f: "d", c: "none" }) + CI(200, 50, 5, { f: "a", c: "none" }) +
    L(200, 50, 200, 135, { c: "muted", w: 1 }) + T(206, 40, "Epicentre: on the surface directly above the focus", { s: 11, a: "start" }) +
    T(214, 158, "Focus (hypocentre): rupture point", { s: 11, a: "start", c: "d" }) +
    A(110, 52, 110, 138, { both: true, w: 1.2 }) + TM(104, 90, "focal|depth", { s: 11, a: "end", lh: 13 }) +
    TM(8, 228, "P waves: compressional, fastest · S waves: shear, not through liquids|Surface waves: slowest, most damage · shallow focus (<70 km) = more damage", { s: 11, a: "start", lh: 14 }));
  const volcTypes = fig("g9-5", 440, 200, "Shield vs composite volcano", () =>
    P("M10 140L80 112L104 106L128 112L198 140Z", { f: "a", op: 0.25, c: "currentColor" }) + P("M40 128L104 116L168 128M24 134L104 124L184 134", { c: "muted", w: 1 }) +
    L(104, 106, 104, 160, { c: "d", w: 2 }) + EL(104, 166, 22, 7, { f: "d", op: 0.4, c: "d" }) +
    P("M240 140L306 40L322 40L392 140Z", { f: "a", op: 0.25, c: "currentColor" }) +
    P("M262 108L314 66L366 108M252 124L314 86L380 124", { c: "muted", w: 1.2, d: true }) + L(314, 40, 314, 160, { c: "d", w: 2 }) + EL(314, 166, 22, 7, { f: "d", op: 0.4, c: "d" }) +
    T(104, 96, "gentle slopes", { s: 11 }) + T(330, 30, "steep, layered ash + lava", { s: 11 }) +
    TM(104, 186, "Shield (e.g. Mauna Loa): basaltic,|runny lava, effusive; hotspots, divergent", { s: 11, lh: 13 }) +
    TM(316, 186, "Composite (e.g. Mt St Helens): andesitic,|viscous, gas-rich, explosive; convergent", { s: 11, lh: 13 }));
  const hotspot = fig("g9-6", 430, 210, "Hotspot volcanic chain", ({ A }) =>
    R(0, 60, 430, 30, { f: "muted", op: 0.4, c: "none", rx: 0 }) + L(0, 46, 430, 46, { c: "b" }) + T(424, 40, "sea level", { s: 11, a: "end", c: "b" }) +
    P("M300 60L325 20L340 20L365 60Z", { f: "a", op: 0.45, c: "currentColor" }) + P("M210 60L235 34L255 60Z", { f: "a", op: 0.3, c: "currentColor" }) +
    P("M130 60L150 42L170 60Z", { f: "a", op: 0.2, c: "currentColor" }) + P("M50 60L68 52L86 60Z", { f: "a", op: 0.15, c: "currentColor" }) +
    P("M318 200L318 130Q300 110 320 92L345 92Q365 110 347 130L347 200Z", { f: "d", op: 0.35, c: "d" }) + L(332, 92, 332, 22, { c: "d", w: 2 }) +
    A(260, 76, 170, 76, { w: 2 }) + T(215, 104, "plate moves over a stationary hotspot", { s: 11 }) +
    T(332, 14, "Active (e.g. Kīlauea)", { s: 11 }) + T(232, 26, "extinct", { s: 11 }) + T(150, 36, "eroded", { s: 11 }) + T(68, 40, "seamount", { s: 11 }) +
    TM(232, 156, "Mantle plume|(hotspot)", { s: 11, lh: 13, a: "end", c: "d" }) + A(160, 130, 30, 130, { c: "muted" }) + T(95, 122, "older islands", { s: 11, c: "muted" }) + T(95, 146, "age increases away from the plume", { s: 11, c: "muted" }));
  const parModel = fig("g9-7", 520, 210, "Pressure and Release (PAR) model", ({ A }) => {
    const col = (x, h, s) => BOX(x, 40, 100, 30, h, { s: 11, b: true, f: "d", op: 0.12 }) + R(x, 70, 100, 122, { f: "none" }) + TM(x + 50, 90, s, { s: 11, lh: 14 });
    return T(165, 20, "Progression of vulnerability →", { b: true, s: 12, c: "d" }) +
      col(4, "Root causes", "poverty; limited|access to power,|structures and|resources;|ideologies") +
      col(114, "Dynamic|pressures", "lack of education,|training, local|investment; rapid|urbanisation,|deforestation") +
      col(224, "Unsafe|conditions", "fragile buildings|on unsafe sites;|low incomes; no|warning system or|disaster plan") +
      BOX(336, 86, 76, 50, "DISASTER|R = H × V", { s: 11, b: true, f: "d", op: 0.3 }) +
      BOX(424, 40, 92, 30, "Hazard", { s: 11, b: true, f: "a", op: 0.2 }) + R(424, 70, 92, 122, { f: "none" }) + TM(470, 90, "earthquake,|volcanic eruption,|tsunami,|landslide", { s: 11, lh: 14 }) +
      A(106, 112, 112, 112, { c: "d" }) + A(216, 112, 222, 112, { c: "d" }) + A(326, 112, 334, 112, { c: "d", w: 2 }) + A(422, 112, 414, 112, { c: "a", w: 2 }) +
      T(260, 206, "'Release' = reduce vulnerability at each stage to lower disaster risk", { s: 11, c: "muted" });
  });
  const hazCycle = loop("g9-8", "Hazard management cycle", ["Mitigation: zoning,|building codes", "Preparedness: warnings,|drills, evacuation plans", "Response: rescue, shelter,|medical aid (first hours-days)", "Recovery: rebuild,|'build back better'"], "Hazard|event|→", "a");
  const degg = fig("g9-9", 380, 200, "Degg's disaster model", () =>
    CI(140, 95, 80, { f: "a", op: 0.18 }) + CI(240, 95, 80, { f: "b", op: 0.18 }) + T(100, 90, "Natural", { b: true }) + T(100, 106, "hazard", { b: true }) +
    T(280, 90, "Vulnerable", { b: true }) + T(280, 106, "population", { b: true }) + T(190, 92, "DISASTER", { b: true, c: "d", s: 11 }) + T(190, 106, "(overlap)", { s: 11, c: "d" }) +
    T(190, 192, "A hazard with no exposed or vulnerable people is not a disaster", { s: 11, c: "muted" }));
  const massMove = fig("g9-10", 440, 220, "Forces on a slope (mass movement)", ({ A }) =>
    P("M20 200L340 40L340 200Z", { f: "a", op: 0.12, c: "none" }) + L(20, 200, 340, 40, { w: 2 }) +
    `<rect x="150" y="90" width="60" height="30" fill="var(--fig-muted)" fill-opacity="0.45" stroke="currentColor" stroke-width="1.2" transform="rotate(-26.57 180 120)"/>` +
    A(173, 107, 173, 180, { w: 2 }) + T(166, 192, "Weight (gravity)", { s: 11, a: "end" }) +
    A(173, 107, 111, 138, { c: "d", w: 2 }) + TM(106, 150, "Shear stress|(downslope pull)", { s: 11, a: "end", lh: 13, c: "d" }) +
    A(173, 107, 236, 76, { c: "c", w: 2 }) + TM(228, 50, "Shear strength|(friction, cohesion)", { s: 11, a: "end", lh: 13, c: "c" }) +
    P("M60 200A40 40 0 0 0 56 182", { w: 1.2 }) + T(66, 192, "θ", { s: 12 }) +
    TM(240, 128, "Failure when shear stress|> shear strength.|↑ stress: steeper slope, extra|weight (rain, buildings), quakes.|↓ strength: saturation (pore-|water pressure), weathering,|vegetation loss", { s: 11, a: "start", lh: 13 }));

  // ---------- urban ----------
  const keyList = (x, y, items, lh = 17) => items.map(([n, s, f, op], i) => R(x, y + i * lh - 10, 14, 12, { f, op, c: "currentColor", w: 0.8, rx: 1 }) + T(x + 20, y + i * lh, `${n} ${s}`, { s: 11, a: "start" })).join("");
  const burgess = fig("g10-1", 440, 224, "Burgess concentric zone model", () => {
    const z = [[0, 18, "a", 0.7], [18, 40, "d", 0.3], [40, 62, "muted", 0.35], [62, 84, "b", 0.25], [84, 104, "c", 0.25]];
    return z.map(([r1, r2, f, op]) => (r1 ? ring(112, 112, r1, r2, { f, op, c: "currentColor", w: 0.8 }) : CI(112, 112, r2, { f, op, c: "currentColor", w: 0.8 }))).join("") +
      [1, 2, 3, 4, 5].map((n, i) => T(i ? 112 + (z[i][0] + z[i][1]) / 2 : 112, 116, n, { s: 11, b: true })).join("") +
      T(232, 22, "Burgess (1925, Chicago)", { b: true, a: "start" }) +
      keyList(232, 46, [[1, "CBD", "a", 0.7], [2, "Zone in transition: factories,", "d", 0.3], ["", "  old housing, recent migrants", "none"], [3, "Low-class (inner-city) housing", "muted", 0.35], [4, "Middle-class housing", "b", 0.25], [5, "Commuter zone", "c", 0.25]]) +
      TM(232, 160, "Land value and density fall away|from the CBD; wealth rises outward;|zones grow by invasion and succession", { s: 11, a: "start", lh: 13, c: "muted" });
  });
  const hoyt = fig("g10-2", 440, 224, "Hoyt sector model", () => {
    const fills = { 2: ["d", 0.35], 3: ["muted", 0.35], 4: ["b", 0.25], 5: ["c", 0.3] };
    const sec = [[-150, -110, 3], [-110, -70, 2], [-70, -30, 3], [-30, 20, 4], [20, 70, 5], [70, 120, 4], [120, 160, 3], [160, 210, 4]];
    return sec.map(([a1, a2, z]) => wedge(112, 112, 18, 100, a1, a2, { f: fills[z][0], op: fills[z][1], c: "currentColor", w: 0.8 }) + T(...pt(112, 116, 62, (a1 + a2) / 2), z, { s: 11, b: true })).join("") +
      CI(112, 112, 18, { f: "a", op: 0.7, c: "currentColor", w: 0.8 }) + T(112, 116, "1", { s: 11, b: true }) +
      L(...pt(112, 112, 18, -90), ...pt(112, 112, 108, -90), { c: "currentColor", d: true, w: 1 }) +
      T(232, 22, "Hoyt (1939)", { b: true, a: "start" }) +
      keyList(232, 46, [[1, "CBD", "a", 0.7], [2, "Wholesale, light manufacturing", "d", 0.35], [3, "Low-class housing", "muted", 0.35], [4, "Middle-class housing", "b", 0.25], [5, "High-class housing", "c", 0.3]]) +
      TM(232, 140, "Sectors grow outward along transport|routes (dashed); industry follows|railways/rivers, low-class housing next|to it, high-class away from it", { s: 11, a: "start", lh: 13, c: "muted" });
  });
  const licCity = fig("g10-3", 440, 230, "Model of a city in an LIC/MIC (Latin American)", () => {
    const sp = [-115, -65], ind = [10, 35];
    const ringsExcl = (r1, r2, f, op) => [[-65, 10], [35, 245]].map(([a, b]) => wedge(115, 115, r1, r2, a, b, { f, op, c: "currentColor", w: 0.8 })).join("");
    return ringsExcl(16, 45, "b", 0.3) + ringsExcl(45, 76, "muted", 0.3) + ringsExcl(76, 106, "d", 0.25) +
      wedge(115, 115, 16, 106, sp[0], sp[1], { f: "c", op: 0.35, c: "currentColor", w: 0.8 }) + wedge(115, 115, 16, 106, ind[0], ind[1], { f: "a", op: 0.25, c: "currentColor", w: 0.8 }) +
      CI(115, 115, 16, { f: "a", op: 0.7, c: "currentColor", w: 0.8 }) + T(115, 119, "1", { s: 11, b: true }) +
      T(...pt(115, 119, 60, -90), "2", { s: 11, b: true }) + T(...pt(115, 119, 30, 150), "3", { s: 11, b: true }) + T(...pt(115, 119, 60, 150), "4", { s: 11, b: true }) +
      T(...pt(115, 119, 91, 150), "5", { s: 11, b: true }) + T(...pt(115, 119, 60, 22), "6", { s: 11, b: true }) +
      T(240, 18, "After Griffin and Ford (1980)", { b: true, a: "start" }) +
      keyList(240, 42, [[1, "CBD", "a", 0.7], [2, "Commercial spine + elite housing", "c", 0.35], [3, "Zone of maturity (older, good)", "b", 0.3], [4, "Zone of in situ accretion", "muted", 0.3], ["", "  (self-built, being improved)", "none"], [5, "Peripheral squatter settlements", "d", 0.25], [6, "Industrial sector", "a", 0.25]]) +
      TM(240, 170, "Wealth falls with distance from the|centre (opposite to Burgess); newest|informal housing on the edge", { s: 11, a: "start", lh: 13, c: "muted" });
  });
  const urbCycle = loop("g10-4", "Cycle of urban change", ["Urbanisation: rural-urban|migration, growth of core", "Suburbanisation: move to|outer suburbs (cars, transport)", "Counter-urbanisation:|move to small towns, rural", "Re-urbanisation:|regeneration, gentrification"], "Stages|of urban|change", "a");
  const deindLoop = loop("g10-5", "Deindustrialisation negative multiplier", ["Factories close (global|shift, automation)", "Job losses; lower|incomes and spending", "Shops, services close;|lower local tax base", "Out-migration of skilled;|dereliction, deprivation"], "Negative|multiplier|(spiral)", "d");

  // ---------- food and health ----------
  const diffusion = fig("g11-1", 460, 196, "Types of disease diffusion", ({ A }) => {
    let g = CI(75, 70, 7, { f: "d", c: "none" });
    for (let i = 0; i < 6; i++) { const [x, y] = pt(75, 70, 24, i * 60); g += CI(x, y, 5, { f: "d", op: 0.6, c: "none" }); }
    for (let i = 0; i < 12; i++) { const [x, y] = pt(75, 70, 48, i * 30 + 15); g += CI(x, y, 4, { f: "d", op: 0.3, c: "none" }); }
    g += CI(230, 30, 12, { f: "d", c: "none" }) + [[196, 78], [264, 78]].map(([x, y]) => CI(x, y, 8, { f: "d", op: 0.6, c: "none" }) + A(230, 42, x + (x < 230 ? 4 : -4), y - 9)).join("") +
      [[176, 122], [208, 122], [250, 122], [282, 122]].map(([x, y], i) => CI(x, y, 5, { f: "d", op: 0.35, c: "none" }) + A(i < 2 ? 196 : 264, 86, x, y - 6, { w: 1 })).join("");
    [[345, 50], [355, 62], [337, 64], [350, 40]].forEach(([x, y]) => (g += CI(x, y, 4, { f: "d", op: 0.3, c: "none" })));
    [[415, 110], [425, 122], [407, 124], [420, 98]].forEach(([x, y]) => (g += CI(x, y, 4, { f: "d", c: "none" })));
    g += A(360, 68, 402, 100, { w: 2 }) + T(346, 30, "time 1", { s: 11, c: "muted" }) + T(440, 96, "time 2", { s: 11, c: "muted" });
    return g + TM(75, 146, "Contagious (expansion):|spreads to neighbours by|contact; distance decay", { s: 11, lh: 13, b: false }) +
      TM(230, 146, "Hierarchical: down the|urban hierarchy, from|cities to towns (air hubs)", { s: 11, lh: 13 }) +
      TM(385, 146, "Relocation: carriers|move to a new area|(migrants, travellers)", { s: 11, lh: 13 }) +
      T(75, 186, "darker = earlier", { s: 11, c: "muted" }) + T(305, 186, "Network diffusion: along transport and social links", { s: 11, c: "muted" });
  });
  const epiTri = fig("g11-2", 380, 220, "Epidemiological triangle", () =>
    P("M190 30L60 180L320 180Z", { f: "d", op: 0.08 }) + T(190, 22, "AGENT", { b: true }) + T(60, 200, "HOST", { b: true }) + T(320, 200, "ENVIRONMENT", { b: true }) +
    T(190, 130, "Disease", { b: true, c: "d" }) +
    TM(250, 50, "pathogen: virus,|bacterium, parasite", { s: 11, a: "start", lh: 13 }) +
    TM(8, 110, "age, immunity,|nutrition,|behaviour", { s: 11, a: "start", lh: 13 }) +
    TM(372, 110, "climate, water,|sanitation, crowding,|vectors (mosquitoes)", { s: 11, a: "end", lh: 13 }) +
    T(190, 216, "Break any side to stop transmission", { s: 11, c: "muted" }));
  const foodChain = flow("g11-3", "Food supply chain with losses and waste", ["Inputs: seed,|fertiliser, water,|machinery", "Farm production|(agribusiness or|smallholder)", "Processing and|packaging", "Distribution: storage,|transport, cold chain", "Retail:|supermarkets,|markets", "Consumers"], { per: 3, bw: 140, foot: "≈13% lost from harvest to retail (FAO); ≈19% wasted in shops, food service, homes (UNEP)", footC: "d" });

  // ---------- skills ----------
  const climGraph = (id) => fig(id, 430, 250, "Climate graph", () => {
    const rain = [1, 1, 0, 1, 15, 520, 840, 520, 310, 60, 10, 2], temp = [24, 25, 27, 28, 30, 29, 28, 27, 28, 29, 28, 26], mo = "JFMAMJJASOND";
    const x0 = 50, bw = 24, base = 210, top = 30, ry = (v) => base - (v / 900) * (base - top), ty = (v) => base - (v / 36) * (base - top);
    let g = L(x0, base, x0 + 12 * bw + 6, base) + L(x0, base, x0, top) + L(x0 + 12 * bw + 6, base, x0 + 12 * bw + 6, top);
    [0, 300, 600, 900].forEach((v) => (g += T(x0 + 12 * bw + 10, ry(v) + 4, v, { s: 11, a: "start", c: "b" })));
    [0, 12, 24, 36].forEach((v) => (g += T(x0 - 4, ty(v) + 4, v, { s: 11, a: "end", c: "d" })));
    rain.forEach((v, i) => (g += R(x0 + 3 + i * bw, ry(v), bw - 4, base - ry(v), { f: "b", op: 0.5, c: "none", rx: 0 }) + T(x0 + 3 + i * bw + (bw - 4) / 2, base + 14, mo[i], { s: 11 })));
    g += P("M" + temp.map((v, i) => `${x0 + 3 + i * bw + (bw - 4) / 2} ${ty(v).toFixed(1)}`).join("L"), { c: "d", w: 2 }) + temp.map((v, i) => CI(x0 + 3 + i * bw + (bw - 4) / 2, +ty(v).toFixed(1), 2.5, { f: "d", c: "none" })).join("");
    g += T(16, 120, "Temperature (°C)", { s: 11, r: -90, c: "d" }) + T(420, 120, "Precipitation (mm)", { s: 11, r: 90, c: "b" });
    g += T(200, 14, "Mumbai, India (approximate normals)", { s: 11, b: true }) + T(115, 180, "dry season", { s: 11, c: "muted" }) + T(310, 120, "monsoon", { s: 11, c: "b" }) + T(310, 134, "Jun-Sep", { s: 11, c: "b" }) +
      T(200, 244, "Total ≈ 2,280 mm · max 30 °C (May) · annual range 30 − 24 = 6 °C", { s: 11 });
    return g;
  });
  const triGraph = fig("g12-2", 380, 300, "Reading a triangular graph", () => {
    const Ap = [60, 265], Bp = [320, 265], Cp = [190, 39.8];
    const b = (p, s, t) => [+(p * Cp[0] + s * Bp[0] + t * Ap[0]).toFixed(1), +(p * Cp[1] + s * Bp[1] + t * Ap[1]).toFixed(1)];
    let g = P(`M${Ap}L${Bp}L${Cp}Z`, { w: 1.6 });
    [0.2, 0.4, 0.6, 0.8].forEach((v) => {
      g += L(...b(v, 1 - v, 0), ...b(v, 0, 1 - v), { c: "muted", w: 0.8 }) + L(...b(1 - v, v, 0), ...b(0, v, 1 - v), { c: "muted", w: 0.8 }) + L(...b(1 - v, 0, v), ...b(0, 1 - v, v), { c: "muted", w: 0.8 });
      const pr = b(v, 1 - v, 0), sc = b(0, v, 1 - v), te = b(1 - v, 0, v);
      g += T(pr[0] + 8, pr[1] + 4, v * 100, { s: 11, a: "start", c: "a" }) + T(sc[0], sc[1] + 16, v * 100, { s: 11, c: "b" }) + T(te[0] - 8, te[1] + 4, v * 100, { s: 11, a: "end", c: "c" });
    });
    const Pp = b(0.2, 0.3, 0.5);
    g += L(...Pp, ...b(0.2, 0.8, 0), { c: "a", d: true, w: 1.6 }) + L(...Pp, ...b(0, 0.3, 0.7), { c: "b", d: true, w: 1.6 }) + L(...Pp, ...b(0.5, 0, 0.5), { c: "c", d: true, w: 1.6 }) + CI(...Pp, 5, { f: "d", c: "none" });
    g += T(Pp[0] + 6, Pp[1] - 8, "P", { b: true, c: "d", a: "start" });
    g += T(190, 28, "Primary 100%", { s: 11, b: true, c: "a" }) + T(4, 297, "Tertiary 100%", { s: 11, b: true, c: "c", a: "start" }) + T(376, 297, "Secondary 100%", { s: 11, b: true, c: "b", a: "end" });
    return g + TM(8, 20, "P = 20% primary|+ 30% secondary|+ 50% tertiary|(must total 100%)", { s: 11, a: "start", lh: 13 });
  });
  const crossSec = fig("g12-3", 420, 300, "Drawing a cross-section from contours", () => {
    const rx = [150, 110, 70, 35], ry = [50, 37, 24, 12], h = [100, 150, 200, 250];
    let g = rx.map((r, i) => EL(200, 65, r, ry[i], { c: "a", w: 1.2 }) + T(200, 65 - ry[i] - 3, h[i], { s: 11, c: "a" })).join("");
    g += L(30, 65, 370, 65, { w: 1.4 }) + T(24, 69, "A", { b: true, a: "end" }) + T(376, 69, "B", { b: true, a: "start" });
    const hy = (v) => 285 - (v - 50) * 0.6, xs = [50, 90, 130, 165, 235, 270, 310, 350], hs = [100, 150, 200, 250, 250, 200, 150, 100];
    g += xs.map((x, i) => L(x, 65, x, hy(hs[i]), { c: "muted", d: true, w: 0.8 }) + CI(x, hy(hs[i]), 3, { f: "d", c: "none" })).join("");
    g += P("M30 267C40 262 45 258 50 255C70 240 80 232 90 225C110 210 120 202 130 195C148 180 156 170 165 165C185 152 215 152 235 165C244 170 252 180 270 195C280 202 290 210 310 225C320 232 330 240 350 255C355 258 360 262 370 267", { c: "d", w: 2 });
    g += L(30, 285, 370, 285) + L(30, 285, 30, 150) + [100, 150, 200, 250].map((v) => T(26, hy(v) + 4, v, { s: 11, a: "end" })).join("") + T(8, 140, "Height (m)", { s: 11, a: "start" });
    return g;
  });
  const mapTypes = fig("g12-4", 460, 190, "Choropleth, proportional symbol and isoline maps", () => {
    const sh = [0.15, 0.4, 0.7, 0.4, 0.7, 0.95, 0.15, 0.4, 0.7];
    let g = sh.map((op, i) => R(30 + (i % 3) * 32, 20 + Math.floor(i / 3) * 32, 32, 32, { f: "a", op, c: "currentColor", w: 0.8, rx: 0 })).join("");
    g += [[180, 50, 18], [230, 40, 8], [205, 95, 12], [265, 85, 5], [250, 120, 10]].map(([x, y, r]) => CI(x, y, r, { f: "b", op: 0.4, c: "b" })).join("") + R(160, 16, 130, 120, { f: "none", c: "muted", w: 1 });
    g += P("M320 120C330 60 380 40 430 70", { c: "c" }) + P("M340 125C350 85 385 70 425 95", { c: "c" }) + P("M362 128C370 108 392 100 420 115", { c: "c" }) +
      T(332, 92, "10", { s: 11, c: "c" }) + T(358, 106, "20", { s: 11, c: "c" }) + T(380, 120, "30", { s: 11, c: "c" });
    return g + TM(78, 140, "Choropleth: shading|= rate per area (density,|%); assumes uniformity", { s: 11, lh: 13 }) +
      TM(225, 150, "Proportional symbols:|area ∝ total value", { s: 11, lh: 13 }) +
      TM(380, 150, "Isolines: join equal|values (isotherms,|contours, isobars)", { s: 11, lh: 13 });
  });

  // ---------- HL global interactions ----------
  const worldSys = fig("gh1-1", 450, 214, "Core, semi-periphery and periphery (world-systems)", ({ A }) =>
    BOX(140, 10, 150, 46, "CORE|USA, EU, Japan", { s: 11, b: true, f: "a", op: 0.3 }) +
    BOX(100, 76, 230, 46, "SEMI-PERIPHERY|China, India, Brazil, Mexico", { s: 11, b: true, f: "b", op: 0.2 }) +
    BOX(60, 142, 310, 46, "PERIPHERY|many LICs in sub-Saharan Africa (e.g. Chad, DRC)", { s: 11, b: true, f: "muted", op: 0.2 }) +
    A(20, 165, 20, 36, { c: "d", w: 2 }) + TM(8, 206, "raw materials, cheap labour, profits, talent →", { s: 11, a: "start", c: "d" }) +
    A(440, 36, 440, 165, { c: "c", w: 2 }) + TM(432, 48, "capital,|technology,|high-value|goods,|services,|aid", { s: 11, a: "end", lh: 13, c: "c" }) +
    TM(28, 70, "unequal|exchange", { s: 11, a: "start", lh: 13, c: "d" }));
  const flowsTri = tri("gh1-2", "Global flows between country groups", ["HICs", "EMEs", "LICs"],
    "HIC → EME: FDI, technology|EME → HIC: manufactured goods,|students, profits of EME TNCs",
    "HIC → LIC: aid (ODA), FDI,|remittances (from diasporas)|LIC → HIC: migrants, raw|materials, debt repayments",
    "EME → LIC: loans and infrastructure (e.g. China's Belt and Road), goods|LIC → EME: oil, minerals and food; data flows link all three");
  const tncNet = fig("gh1-3", 450, 210, "TNC global production network", ({ A, AP }) =>
    BOX(4, 60, 100, 60, "HQ (HIC): R&D,|design, marketing|e.g. California", { s: 11, lh: 13, f: "a", op: 0.2 }) +
    BOX(124, 10, 100, 60, "Components:|chips, screens|Taiwan, S. Korea", { s: 11, lh: 13 }) +
    BOX(124, 112, 100, 60, "Raw materials:|cobalt, lithium|DRC, Chile", { s: 11, lh: 13 }) +
    BOX(244, 60, 96, 60, "Assembly:|low-cost labour|China, Vietnam", { s: 11, lh: 13 }) +
    BOX(360, 60, 86, 60, "Global|markets", { s: 11, lh: 13, f: "c", op: 0.2 }) +
    A(106, 80, 122, 50) + A(226, 40, 252, 58) + A(226, 142, 252, 122) + A(342, 90, 358, 90) +
    AP("M403 122L403 186L54 186L54 124", { c: "a", d: true }) + T(230, 204, "profits flow back to HQ; outsourcing and offshoring", { s: 11, c: "a" }));
  const powerSpec = fig("gh1-4", 440, 130, "Hard, smart and soft power", ({ A }) =>
    A(20, 40, 420, 40, { both: true, w: 2 }) + T(20, 24, "HARD POWER (coerce)", { b: true, a: "start", c: "d" }) + T(420, 24, "SOFT POWER (attract)", { b: true, a: "end", c: "b" }) +
    T(220, 24, "smart power = mix", { s: 11, c: "muted" }) +
    TM(20, 64, "military force, alliances,|economic sanctions, tariffs,|control of resources", { s: 11, a: "start", lh: 13 }) +
    TM(420, 64, "culture (K-pop, Hollywood), values,|education, aid, diplomacy, sport|(Olympics, World Cup)", { s: 11, a: "end", lh: 13 }));
  const hdiFig = fig("gh2-1", 430, 150, "How HDI is calculated", ({ A }) =>
    BOX(4, 10, 130, 44, "Health: life|expectancy at birth", { s: 11, lh: 13, f: "c", op: 0.2 }) + BOX(150, 10, 130, 44, "Education: mean +|expected schooling", { s: 11, lh: 13, f: "b", op: 0.2 }) +
    BOX(296, 10, 130, 44, "Income: GNI per|capita (PPP $, log)", { s: 11, lh: 13, f: "a", op: 0.2 }) +
    A(69, 56, 190, 92) + A(215, 56, 215, 90) + A(361, 56, 240, 92) +
    BOX(95, 94, 240, 32, "HDI = ∛(I_health × I_edu × I_income)", { s: 11, b: true }) +
    T(215, 144, "Each index scaled 0-1; geometric mean; ≥0.800 = very high", { s: 11, c: "muted" }));
  const cultFig = fig("gh2-2", 440, 180, "Outcomes of cultural diffusion", ({ A }) =>
    BOX(150, 6, 140, 40, "Global cultural flows|(media, TNCs, migrants)", { s: 11, lh: 13, f: "a", op: 0.18 }) +
    BOX(4, 96, 136, 76, "Homogenisation:|places become alike|(global brands,|English, fast food)", { s: 11, lh: 13 }) +
    BOX(152, 96, 136, 76, "Hybridisation /|glocalisation: blend|of global + local|(McAloo Tikki, K-pop)", { s: 11, lh: 13 }) +
    BOX(300, 96, 136, 76, "Heterogenisation /|resistance: protect|local culture (French|film quotas)", { s: 11, lh: 13 }) +
    A(190, 48, 80, 94) + A(220, 48, 220, 94) + A(250, 48, 366, 94));
  const riskMat = fig("gh3-1", 420, 250, "Global risk matrix", () => {
    let g = "";
    const op = [[0.1, 0.18, 0.3], [0.18, 0.3, 0.45], [0.3, 0.45, 0.6]];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) g += R(70 + i * 100, 20 + (2 - j) * 62, 100, 62, { f: "d", op: op[i][j], c: "currentColor", w: 0.8, rx: 0 });
    const p = (x, y, s) => CI(x, y, 4, { f: "d", c: "none" }) + T(x + 7, y + 4, s, { s: 11, a: "start" });
    g += p(285, 36, "Extreme weather") + p(248, 64, "Biodiversity loss") + p(190, 52, "Pandemic") + p(270, 112, "Misinformation") + p(178, 98, "Cyberattack") + p(82, 70, "Nuclear war") + p(165, 162, "Asset bubble") + p(78, 180, "Space weather");
    g += T(220, 226, "Likelihood →", { s: 11 }) + T(40, 113, "Impact →", { s: 11, r: -90 }) + ["low", "medium", "high"].map((s, i) => T(120 + i * 100, 212, s, { s: 11, c: "muted" })).join("");
    return g + T(220, 244, "Illustrative placements (cf. WEF Global Risks Report)", { s: 11, c: "muted" });
  });
  const contagion = flow("gh3-2", "Financial contagion in 2007-09", ["US subprime mortgage|defaults (2007)", "Toxic mortgage-backed|securities held by|banks worldwide", "Lehman Brothers|collapses (Sept 2008);|credit crunch", "Bank bailouts in EU,|UK; Iceland's banks fail", "Global recession:|world trade volume|fell ~12% in 2009", "LICs hit: falling|exports, remittances,|FDI and aid"], { per: 3, hi: [0] });
  const commons = loop("gh3-3", "Tragedy of the commons", ["Open-access commons|(high seas, atmosphere)", "Each user maximises|own gain (more boats)", "Costs of overuse are|shared by everyone", "Depletion or collapse|(e.g. Grand Banks cod)"], "Tragedy|of the|commons", "d");

  const F = (title, caption, svg) => ({ title, caption, svg });
  const G = (o) => Object.assign({ grid: false, origin: false }, o);

  IB.addExamFrames("geo", { topics: {
    "geo-1": {
      diagrams: [
        G({ title: "J-curve (exponential) vs S-curve (logistic) population growth", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "Population",
          curves: [{ f: (x) => 0.4 * Math.exp(0.32 * x), label: "J-curve", labelX: 8.6, color: "a" }, { f: (x) => 8.6 * sig(x, 5, 1.1) + 0.3, label: "S-curve", labelX: 5.4, color: "b", dash: true }],
          hlines: [{ y: 8.9, label: "carrying capacity" }] }),
        G({ title: "Doubling time ≈ 70 ÷ growth rate (%)", x: [0, 4], y: [0, 150], xLabel: "Growth rate (% per year)", yLabel: "Doubling time (years)",
          curves: [{ f: (r) => 70 / r, domain: [0.5, 4] }],
          points: [{ at: [1, 70], label: "1% → 70 yrs" }, { at: [2, 35], label: "2% → 35 yrs" }, { at: [3.5, 20], label: "3.5% → 20 yrs" }] }),
        G({ title: "Urban share of population: HICs urbanised first, LICs now urbanising fastest", x: [1800, 2050], y: [0, 100], xLabel: "Year", yLabel: "% urban",
          curves: [{ f: (x) => 8 + 74 * sig(x, 1900, 0.04), label: "HICs", labelX: 1990 }, { f: (x) => 4 + 64 * sig(x, 2015, 0.035), label: "LICs/MICs", labelX: 2010, color: "b" }],
          vlines: [{ x: 2007, label: "50% (2007)" }] }),
      ],
      figures: [
        F("Annotated population pyramid", "Males left, females right; each bar = % of total population in a 10-year age band", pyrAnatomy),
        F("Core-periphery model", "Applies at national (e.g. São Paulo vs north-east Brazil) and global scales", corePeri),
      ],
      frames: [
        { title: "Draw and annotate the core-periphery model", paper: "P2", where: "Paper 2 · 4 marks · annotated diagram",
          q: "Using an annotated diagram, explain how core-periphery patterns of population can develop within a country.",
          marks: ["diagram shows a __core__ region with surrounding semi-periphery / periphery, correctly labelled",
            "arrow + annotation: __backwash__ - young, skilled migrants, capital and resources move from periphery to core",
            "arrow + annotation: __spread__ (trickle-down) effects of investment and ideas from core to periphery (weaker)",
            "explanation of __cumulative causation__: core gains jobs, services and higher density; periphery loses population (example, e.g. Shanghai vs western China)"],
          svg: corePeri,
          model: "The core (e.g. the Pearl River Delta) attracts investment; jobs pull young migrants from the periphery (backwash), which loses labour and skills. The multiplier effect makes the core grow faster (cumulative causation), while spread effects - investment, technology, demand - reach the periphery more slowly, so population density diverges.",
          accept: "concentric or map-style sketch if correctly labelled",
          reject: "an unlabelled circle; arrows with no annotation",
          tip: "箭咀一定要寫字：backwash 向核心、spread 向外圍，冇 annotation 就冇分。" },
        { title: "Sketch J-curve and S-curve population growth", paper: "P2", where: "Paper 2 · 3 marks · sketch graph",
          q: "Sketch and label graphs to show exponential (J-curve) and logistic (S-curve) population growth.",
          marks: ["axes labelled: time (x), population (y)", "J-curve rising ever more steeply (__exponential__)", "S-curve levelling off at a labelled __carrying capacity__ (or ceiling)"],
          diagram: { title: "J vs S growth", x: [0, 10], y: [0, 10], grid: false, origin: false, xLabel: "Time", yLabel: "Population",
            curves: [{ f: (x) => 0.4 * Math.exp(0.32 * x), label: "J", labelX: 8.6, color: "a" }, { f: (x) => 8.6 * sig(x, 5, 1.1) + 0.3, label: "S", labelX: 5.4, color: "b" }], hlines: [{ y: 8.9, label: "carrying capacity" }] },
          model: "The J-curve shows exponential growth at a constant percentage rate with no limit. The S-curve starts exponentially, then growth slows as resources limit it and levels off at the carrying capacity.",
          tip: "S-curve 頂部要畫一條 carrying capacity 線。" },
      ],
    },
    "geo-2": {
      diagrams: [
        G({ title: "DTM with total population (birth rate solid, death rate dashed, total population green)", x: [0, 10], y: [0, 10], xLabel: "Stages 1 → 5", yLabel: "Rate per 1000 / population",
          curves: [{ f: lin([[0, 8.6], [4, 8.4], [6, 4.4], [8, 2], [10, 1.4]]), label: "CBR", labelX: 4.3 }, { f: (x) => lin([[0, 8.2], [0.5, 8.9], [1, 7.9], [1.5, 8.7], [2, 8.2], [4, 4], [6, 2], [8, 1.8], [10, 2.3]])(x), dash: true, color: "b", label: "CDR", labelX: 2.6 },
            { f: (x) => 0.5 + 6.5 * sig(x, 5, 1.0) - (x > 8 ? 0.25 * (x - 8) : 0), color: "c", label: "total population", labelX: 6.4 }],
          vlines: [{ x: 2, label: "2" }, { x: 4, label: "3" }, { x: 6, label: "4" }, { x: 8, label: "5" }],
          texts: [{ at: [0.4, 9.6], text: "1" }] }),
        G({ title: "Demographic dividend: working-age share peaks as fertility falls", x: [0, 10], y: [40, 75], xLabel: "Time (stages 2 → 5)", yLabel: "% aged 15-64",
          curves: [{ f: (x) => 52 + 16 * Math.exp(-((x - 5.5) ** 2) / 6) }], vlines: [{ x: 4, label: "window opens" }, { x: 7.2, label: "closes (ageing)" }] }),
        G({ title: "Total fertility rate falls as female education rises (schematic)", x: [0, 14], y: [0, 8], xLabel: "Mean years of schooling (women)", yLabel: "TFR",
          curves: [{ f: (x) => 1.5 + 6 * Math.exp(-0.25 * x) }],
          points: [{ at: [1.5, 5.9] }, { at: [2.5, 4.8] }, { at: [4, 3.9] }, { at: [6, 2.7] }, { at: [8, 2.4] }, { at: [10, 2.1] }, { at: [12, 1.5] }, { at: [13, 1.8] }],
          hlines: [{ y: 2.1, label: "replacement level 2.1" }] }),
        G({ title: "Dependency ratio = (0-14 + 65+) ÷ (15-64) × 100: high when youthful or ageing", x: [0, 10], y: [30, 100], xLabel: "DTM stage 1 → 5", yLabel: "Dependency ratio",
          curves: [{ f: (x) => 52 + 38 * Math.exp(-((x - 2) ** 2) / 4) + 30 * sig(x, 9, 1.5) }], texts: [{ at: [1.2, 94], text: "young dependants" }, { at: [7.6, 80], text: "elderly dependants" }] }),
      ],
      figures: [
        F("Population pyramid shapes through the DTM", "Stage 1-2 expanding (wide base, concave sides), stage 3 narrowing base, stage 4 stationary (straight sides), stage 5 contracting (base narrower than middle)", pyrStages),
        F("Stage 5 contracting pyramid", "e.g. Japan: median age ~49, TFR ~1.2-1.3", pyrStage5),
      ],
      frames: [
        { title: "Sketch the pyramid shape for a given DTM stage", star: true, paper: "P2", where: "Paper 2 · 3-4 marks · sketch",
          q: "Draw an annotated population pyramid for a country in stage 5 of the demographic transition model.",
          marks: ["correct axes: males and females either side; age bands (cohorts) vertical; % or numbers horizontal",
            "__narrow base__ (fewer children than adults) annotated as low birth rate / TFR below replacement",
            "wide upper middle and wide top annotated: large ageing cohorts and __high life expectancy__",
            "more females than males at the oldest ages (annotated)"],
          svg: pyrStage5,
          model: "A stage 5 (contracting) pyramid is narrower at the base than in the middle because the birth rate has fallen below the death rate (TFR ~1.3). The bulge at 50-69 is ageing baby-boom cohorts, and the wide top - with more women - reflects high life expectancy.",
          accept: "a sketch shape with annotations; stage 4 drawn as straight-sided if asked",
          reject: "a triangular (expanding) pyramid for stage 5",
          tip: "Stage 5 = 底部窄過中間（倒三角傾向）；記得標 axes 同 male/female。" },
        { title: "Sketch the DTM and label birth rate, death rate and total population", paper: "P2", where: "Paper 2 · 4 marks · sketch graph",
          q: "Sketch the demographic transition model, labelling the birth rate, death rate and total population for each stage.",
          marks: ["five stages marked; CBR and CDR both high and fluctuating in stage 1", "CDR falls first (stage 2) while CBR stays high: widest gap = fastest __natural increase__",
            "CBR falls in stage 3; both low in stage 4", "total population rises in an S-shape, levels in stage 4 and may fall in stage 5 (CBR < CDR)"],
          diagram: { title: "DTM", x: [0, 10], y: [0, 10], grid: false, origin: false, xLabel: "Stages", yLabel: "Rate",
            curves: [{ f: lin([[0, 8.6], [4, 8.4], [6, 4.4], [8, 2], [10, 1.4]]), label: "CBR", labelX: 4.3 }, { f: lin([[0, 8.4], [2, 8.4], [4, 4], [6, 2], [8, 1.8], [10, 2.3]]), dash: true, color: "b", label: "CDR", labelX: 2.6 }, { f: (x) => 0.5 + 6.5 * sig(x, 5, 1.0) - (x > 8 ? 0.25 * (x - 8) : 0), color: "c", label: "population", labelX: 6.4 }],
            vlines: [{ x: 2 }, { x: 4 }, { x: 6 }, { x: 8 }] },
          model: "Stage 1: CBR and CDR high, fluctuating; population low. Stage 2: CDR falls (sanitation, vaccines) but CBR stays high, so population grows rapidly. Stage 3: CBR falls (contraception, female education, urbanisation). Stage 4: both low; population high and stable. Stage 5: CBR below CDR; population declines.",
          tip: "Total population 條線要喺 Stage 2-3 最斜，Stage 5 微跌。" },
      ],
    },
    "geo-3": {
      diagrams: [
        G({ title: "Distance decay: number of migrants falls with distance (Ravenstein)", x: [0, 10], y: [0, 10], xLabel: "Distance from destination", yLabel: "Number of migrants",
          curves: [{ f: (x) => 9 * Math.exp(-0.4 * x) + 0.3 }], points: [{ at: [6, 9 * Math.exp(-2.4) + 2.4], label: "big city: anomaly" }] }),
        G({ title: "Remittance inflows have overtaken aid (ODA) to LMICs (schematic, US$ bn)", x: [1990, 2023], y: [0, 700], xLabel: "Year", yLabel: "US$ bn",
          curves: [{ f: lin([[1990, 30], [2000, 75], [2008, 290], [2010, 330], [2015, 440], [2019, 550], [2020, 545], [2023, 656]]), label: "remittances", labelX: 2012 },
            { f: lin([[1990, 55], [2000, 50], [2008, 120], [2015, 145], [2020, 185], [2023, 220]]), color: "b", dash: true, label: "ODA", labelX: 2016 }] }),
      ],
      figures: [
        F("Lee's migration model (1966)", "Each place has positive, negative and neutral factors; obstacles and personal factors filter who moves", leeModel),
        F("Pyramid shaped by labour in-migration", "Gulf states: about 2-3× as many males as females at working ages", pyrLabour),
        F("Classifying migration", "Two questions: does it cross a border? was it a free choice?", migTypes),
      ],
      frames: [
        { title: "Draw an annotated diagram of Lee's migration model", paper: "P2", where: "Paper 2 · 4 marks · diagram",
          q: "With the help of a diagram, explain how push factors, pull factors and intervening obstacles affect migration.",
          marks: ["origin and destination drawn with __+ / − / 0__ factors (pull, push, neutral)", "__intervening obstacles__ shown between them (e.g. distance, cost, visas, borders)",
            "explains that migration happens when perceived pull + push outweigh obstacles", "personal factors (age, family, information) explain why only some people move"],
          svg: leeModel,
          model: "Lee's model shows positive (pull), negative (push) and neutral factors at the origin and destination. A move happens when the perceived benefits outweigh the intervening obstacles such as cost, distance and immigration rules, filtered by personal factors - so young, educated adults are most likely to migrate.",
          tip: "記住 Lee 有三樣：+/−/0 因素、intervening obstacles、personal factors。" },
      ],
    },
    "geo-4": {
      diagrams: [
        G({ title: "Warming rises almost linearly with cumulative CO₂ emissions (≈0.45 °C per 1000 Gt CO₂)", x: [0, 4000], y: [0, 2], xLabel: "Cumulative CO₂ since 1850 (Gt)", yLabel: "Warming (°C)",
          curves: [{ f: (x) => 0.00045 * x }], points: [{ at: [2500, 1.13], label: "~2020: ~1.1 °C" }], hlines: [{ y: 1.5, label: "1.5 °C" }] }),
        G({ title: "Seasonal 'sawtooth' in CO₂: falls in northern summer (photosynthesis), rises in winter", x: [0, 36], y: [410, 426], xLabel: "Months (3 years)", yLabel: "CO₂ (ppm)",
          curves: [{ f: (m) => 413 + 0.2 * m + 3 * Math.cos(((m - 4.5) * 2 * Math.PI) / 12) }] }),
      ],
      figures: [
        F("Natural and enhanced greenhouse effect", "Short-wave in, long-wave out; greenhouse gases absorb and re-emit long-wave radiation", ghEffect),
        F("Ice-albedo positive feedback", "Fresh snow/ice albedo ~0.8-0.9; open ocean ~0.06", albedoLoop),
        F("Permafrost carbon feedback", "Permafrost stores ~1,400-1,700 Gt C, about twice the atmosphere", permaLoop),
        F("A negative feedback", "Clouds both cool (reflect sunlight) and warm (trap long-wave); the net cloud feedback is thought to be slightly positive", cloudLoop),
        F("Milankovitch cycles (natural forcing)", "Orbital changes drive glacial-interglacial cycles over 10,000s of years", milank),
        F("Carbon cycle: main stores", "Stores in gigatonnes of carbon (approximate, IPCC AR6); dashed arrow = decomposition (soil respiration)", carbonCycle),
      ],
      frames: [
        { title: "Draw an annotated diagram of the enhanced greenhouse effect", star: true, paper: "P2", where: "Paper 2 · 4 marks · annotated diagram",
          q: "Using an annotated diagram, explain the enhanced greenhouse effect.",
          marks: ["incoming __short-wave__ solar radiation reaches and heats the surface (arrow labelled)", "part reflected by clouds/ice (albedo); surface emits __long-wave__ (infrared) radiation",
            "greenhouse gases (CO₂, CH₄, N₂O, H₂O) __absorb and re-emit__ long-wave radiation back towards the surface", "human activity raises GHG concentrations (e.g. CO₂ 280 → ~420 ppm) so more long-wave is trapped → global warming"],
          svg: ghEffect,
          model: "Short-wave solar radiation passes through the atmosphere and warms the surface, which emits long-wave infrared radiation. Greenhouse gases absorb and re-emit some of this, warming the lower atmosphere. Burning fossil fuels, deforestation and farming have raised CO₂ from ~280 to ~420 ppm and methane, so more long-wave radiation is retained - the enhanced greenhouse effect.",
          reject: "'the ozone hole lets in more heat'; 'gases trap the sun's rays'",
          tip: "一定要分 short-wave 入、long-wave 出；唔好將 ozone hole 同 greenhouse effect 混淆。" },
        { title: "Draw a feedback loop diagram", paper: "P2", where: "Paper 2 · 3 marks · loop diagram",
          q: "Draw a labelled diagram to show one positive feedback loop linked to climate change.",
          marks: ["a closed __loop__ of at least three linked stages with arrows", "each stage correctly linked by cause and effect (e.g. warming → ice melts → lower albedo → more absorption)", "loop returns to and __amplifies__ the original warming (labelled positive)"],
          svg: albedoLoop,
          model: "Warming melts sea ice and snow; darker ocean and land have a lower albedo, so more solar radiation is absorbed, which causes further warming - a positive feedback loop that amplifies the initial change.",
          accept: "permafrost thaw (CH₄), forest dieback, wildfire loops",
          tip: "Loop 要返去起點，同埋寫明 positive = amplifies。" },
      ],
      concepts: [
        { h: "Carbon stores and fluxes", b: "<p>Approximate stores (Gt C): atmosphere ~870 (≈590 before industrialisation), land vegetation ~450-650, soils ~1,500-2,400, permafrost ~1,400-1,700, oceans ~38,000 (mostly deep ocean), fossil fuel reserves ~1,000. Human emissions are ~10 Gt C (~37 Gt CO₂) per year from fossil fuels plus ~1 Gt C from land-use change; about half stays in the atmosphere, the rest is absorbed by ocean and land sinks. 1 Gt C = 3.67 Gt CO₂. The seasonal sawtooth in the Keeling curve is northern-hemisphere photosynthesis in summer.</p>" },
      ],
    },
    "geo-5": {
      diagrams: [
        G({ title: "'Peak water': glacier meltwater rises, then falls as the glacier shrinks", x: [0, 10], y: [0, 10], xLabel: "Time (decades of warming)", yLabel: "Meltwater discharge",
          curves: [{ f: (x) => 2 + 2.8 * x * Math.exp(-x / 3.5) }], vlines: [{ x: 3.5, label: "peak water" }],
          texts: [{ at: [0.6, 8.6], text: "more runoff, floods (GLOFs)" }, { at: [5.8, 8.6], text: "then shortages" }] }),
        G({ title: "Global mean sea level since 1993 (satellite, schematic): ~10 cm, accelerating", x: [1993, 2024], y: [0, 120], xLabel: "Year", yLabel: "mm vs 1993",
          curves: [{ f: (x) => 2.1 * (x - 1993) + 0.04 * (x - 1993) ** 2 }], texts: [{ at: [1994, 104], text: "~2 mm/yr in the 1990s → ~4.5 mm/yr now" }] }),
        G({ title: "Coral bleaching: sea-surface temperature exceeds the threshold", x: [0, 24], y: [26, 31], xLabel: "Months", yLabel: "SST (°C)",
          curves: [{ f: (m) => 28 + 1.3 * Math.sin(((m - 3) * 2 * Math.PI) / 12) + (m > 12 ? 0.08 * (m - 12) : 0) }],
          hlines: [{ y: 29.8, label: "bleaching threshold (~1 °C above usual summer max)" }] }),
      ],
      figures: [
        F("Risk equation", "Risk depends on people's vulnerability and capacity as much as on the hazard", riskEq),
        F("Emissions vs vulnerability", "Those who emit least are often most vulnerable", emitVuln),
        F("Sea-level rise: causes and impacts", "Recently roughly one-third thermal expansion, two-thirds ice melt", slrChain),
      ],
      frames: [
        { title: "Sketch and explain the 'peak water' curve", paper: "P2", where: "Paper 2 · 4 marks · sketch graph",
          q: "Sketch a graph to show how meltwater from a glacier changes as climate warms, and explain its shape.",
          marks: ["axes: time (x), meltwater discharge (y)", "rising limb: warming increases melt and river flow at first",
            "a labelled __peak__ ('peak water')", "falling limb: glacier volume shrinks so less meltwater - __water insecurity__ downstream (e.g. Indus, Andes: Lima)"],
          diagram: { title: "Peak water", x: [0, 10], y: [0, 10], grid: false, origin: false, xLabel: "Time", yLabel: "Meltwater", curves: [{ f: (x) => 2 + 2.8 * x * Math.exp(-x / 3.5) }], vlines: [{ x: 3.5, label: "peak water" }] },
          model: "As temperatures rise, glaciers melt faster and river discharge increases, with more floods and GLOF risk. Once the glacier has shrunk enough, meltwater peaks ('peak water') and then declines, so dry-season flow falls - threatening irrigation and drinking water for communities such as those dependent on the Indus.",
          tip: "先升後跌，記得標 peak water；後半段 = 缺水。" },
      ],
    },
    "geo-6": {
      diagrams: [
        G({ title: "Global GHG emission pathways (schematic, Gt CO₂e per year)", x: [2010, 2100], y: [-10, 90], xLabel: "Year", yLabel: "Gt CO₂e",
          curves: [{ f: lin([[2010, 50], [2020, 55], [2050, 72], [2100, 85]]), color: "a", label: "no policy", labelX: 2080 },
            { f: lin([[2010, 50], [2020, 55], [2030, 54], [2060, 45], [2100, 38]]), color: "a", dash: true, label: "current policies (~2.7 °C)", labelX: 2052 },
            { f: lin([[2010, 50], [2020, 55], [2030, 33], [2050, 8], [2070, 0], [2100, -5]]), color: "c", label: "1.5 °C: net zero CO₂ ~2050", labelX: 2032 }],
          hlines: [{ y: 0, label: "net zero" }] }),
      ],
      figures: [
        F("Mitigation vs adaptation", "Mitigation reduces the causes; adaptation reduces the impacts", mitAdapt),
        F("Carbon capture and storage (CCS)", "A mitigation technology; direct air capture removes CO₂ already in the air", ccs),
        F("Cap-and-trade", "A market-based mitigation tool; a carbon tax fixes the price instead of the quantity", capTrade),
      ],
      frames: [
        { title: "Draw an annotated diagram of carbon capture and storage", paper: "P2", where: "Paper 2 · 3 marks · annotated diagram",
          q: "Using an annotated diagram, outline how carbon capture and storage reduces greenhouse gas emissions.",
          marks: ["CO₂ __captured__ at a large point source (power plant, cement works) before release", "compressed and transported by pipeline", "__injected__ deep underground into porous rock (depleted oil/gas field, saline aquifer) beneath an impermeable caprock"],
          svg: ccs,
          model: "CO₂ is captured from flue gases at a power station, compressed and piped to a storage site, then injected more than 800 m underground into porous rock such as a depleted gas field, where an impermeable caprock traps it (e.g. Sleipner, Norway).",
          tip: "三步：capture → transport → store（caprock 封住）。" },
      ],
    },
    "geo-7": {
      diagrams: [
        G({ title: "Boserup: population pressure triggers innovation, so food supply steps up ahead", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "Amount",
          curves: [{ f: (x) => 1.5 * Math.exp(0.17 * x), color: "a", label: "population", labelX: 8.4 }, { f: (x) => 2.4 + 1.6 * Math.floor((x + 0.6) / 2), color: "c", label: "food supply", labelX: 8.2 }],
          texts: [{ at: [0.3, 9.4], text: "each step = innovation" }, { at: [0.3, 8.8], text: "(irrigation, Green Revolution)" }] }),
        G({ title: "Limits to Growth (1972): overshoot and collapse", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "Level",
          curves: [{ f: (x) => 1 + 7 * Math.exp(-((x - 5.5) ** 2) / 4), color: "a", label: "population", labelX: 6 }, { f: (x) => 9.5 - 8 * sig(x, 4.5, 1), color: "b", dash: true, label: "resources", labelX: 2.2 }],
          hlines: [{ y: 5, label: "carrying capacity" }] }),
        G({ title: "Hubbert curve: production of a finite resource peaks then declines", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "Production",
          curves: [{ f: (x) => 0.2 + 8.5 * Math.exp(-((x - 5) ** 2) / 3.5) }], vlines: [{ x: 5, label: "peak (≈ half extracted)" }] }),
        G({ title: "Environmental Kuznets curve: pollution first rises, then falls with income", x: [0, 10], y: [0, 10], xLabel: "GDP per capita", yLabel: "Pollution per person",
          curves: [{ f: (x) => 1 + 7.5 * Math.exp(-((x - 4.5) ** 2) / 5) }], texts: [{ at: [0.4, 9.3], text: "industrialisation" }, { at: [6.4, 9.3], text: "services, regulation" }] }),
      ],
      figures: [
        F("Water-food-energy nexus", "Using more of one resource affects the security of the other two", nexus),
        F("Linear vs circular economy", "Circular systems keep products and materials in use (e.g. EU right-to-repair rules)", circular),
      ],
      frames: [
        { title: "Draw and annotate the water-food-energy nexus", star: true, paper: "P2", where: "Paper 2 · 4 marks · annotated diagram",
          q: "Using an annotated diagram, explain the interactions within the water-food-energy nexus.",
          marks: ["three resources linked by two-way arrows", "water ↔ energy annotated (cooling, hydropower; pumping, desalination)", "water ↔ food annotated (irrigation ~70% of freshwater withdrawals; fertiliser pollution)", "energy ↔ food annotated (fuel, fertiliser; __biofuels__ competing for land), with one named example"],
          svg: nexus,
          model: "Food production needs water for irrigation (~70% of withdrawals) and energy for machinery and fertiliser. Energy needs water for cooling and hydropower, while water supply needs energy for pumping and desalination. Biofuels turn food crops into energy - e.g. ~40% of US maize goes to ethanol - so pressure on one resource spreads to the others.",
          tip: "三條雙向箭咀，每條兩邊都要寫例子。" },
      ],
      concepts: [
        { h: "Environmental Kuznets curve and resource peaks", b: "<p>The <strong>environmental Kuznets curve</strong> suggests pollution per person rises during industrialisation, then falls as incomes rise (cleaner technology, service economies, regulation, public pressure). It fits local pollutants (SO₂ smog) better than CO₂, and rich countries partly 'export' pollution by importing manufactured goods. A <strong>Hubbert curve</strong> shows production of a finite resource rising to a peak (when about half is extracted) and then declining; new technology (e.g. US shale oil from fracking after ~2008) can shift the peak.</p>" },
      ],
    },

    "geo-8": {
      diagrams: [
        G({ title: "River long profile: concave, steep near the source, gentle near the mouth", x: [0, 10], y: [0, 10], xLabel: "Distance from source", yLabel: "Height",
          curves: [{ f: (x) => (9.4 * (Math.exp(-0.32 * x) - Math.exp(-3.2))) / (1 - Math.exp(-3.2)) }],
          vlines: [{ x: 2.5 }, { x: 6.5 }], texts: [{ at: [0.4, 9.6], text: "upper" }, { at: [3.4, 9.6], text: "middle" }, { at: [7.4, 9.6], text: "lower course" }, { at: [7.4, 1.4], text: "base level (sea)" }] }),
        G({ title: "Annual regime of a snowmelt-fed river (schematic)", x: [1, 12], y: [0, 10], xLabel: "Month (Jan → Dec)", yLabel: "Mean discharge",
          curves: [{ f: lin([[1, 1.4], [3, 1.6], [4, 3], [5, 6.5], [6, 8.8], [7, 7.4], [8, 5.2], [9, 3.4], [10, 2.6], [11, 2], [12, 1.5]]) }], texts: [{ at: [5.6, 9.6], text: "spring-summer snowmelt peak" }] }),
        G({ title: "Flood frequency: bigger floods are rarer (recurrence interval on a log scale)", x: [0, 2.2], y: [0, 500], xLabel: "log₁₀ recurrence interval (years)", yLabel: "Peak Q (m³ s⁻¹)",
          curves: [{ f: (x) => 120 + 160 * x }], points: [{ at: [1, 280], label: "1-in-10-yr flood" }, { at: [2, 440], label: "1-in-100-yr" }] }),
        G({ title: "Flashy vs subdued hydrograph shapes", x: [0, 48], y: [0, 100], xLabel: "Hours", yLabel: "Discharge",
          curves: [{ f: (t) => 10 + 75 * Math.exp(-((t - 12) ** 2) / (t < 12 ? 10 : 40)), label: "flashy (urban, steep)", labelX: 15 }, { f: (t) => 10 + 28 * Math.exp(-((t - 24) ** 2) / (t < 24 ? 60 : 160)), color: "b", dash: true, label: "subdued (forested)", labelX: 31 }] }),
      ],
      figures: [
        F("Drainage basin hydrological system", "Inputs → stores → flows → outputs; learn every term in the boxes and on the arrows", basinSys),
        F("Bradshaw model", "How channel characteristics change from source to mouth", bradshaw),
        F("Meander cross-section", "Erosion on the outer bank, deposition on the inner bank", meanderX),
        F("Ox-bow lake formation", "Plan view; flow from top to bottom", oxbow),
        F("Waterfall and gorge", "Differential erosion where hard rock overlies soft rock (e.g. Niagara)", waterfall),
        F("Floodplain and levees", "Valley cross-section in the lower course", levees),
        F("Aquifer and artesian basin", "Groundwater stored in permeable rock; over-abstraction lowers the water table", aquifer),
        F("Eutrophication", "Agricultural impact on water quality", eutro),
      ],
      frames: [
        { title: "Draw and label the drainage basin as a system", star: true, paper: "P1", where: "Paper 1 · 4 marks · systems diagram",
          q: "Draw a labelled systems diagram of a drainage basin, showing its inputs, stores, flows and outputs.",
          marks: ["input: __precipitation__", "at least three stores correctly placed (interception, surface, soil water, groundwater, channel)",
            "flows linking stores in the right order (throughfall/stemflow, __infiltration__, percolation, throughflow, overland flow, groundwater flow)", "outputs: evaporation, transpiration (evapotranspiration) and channel discharge"],
          svg: basinSys,
          model: "Precipitation (input) is intercepted by vegetation, reaching the surface by throughfall and stemflow. Water infiltrates into the soil and percolates into groundwater; overland flow, throughflow and groundwater flow carry it to the channel, which discharges it at the mouth. Evaporation and transpiration are outputs.",
          reject: "infiltration and percolation swapped; 'runoff' used for every flow",
          tip: "Infiltration = 入泥土；percolation = 由泥土落岩石。" },
        { title: "Draw an annotated cross-section of a meander", paper: "P1", where: "Paper 1 · 3-4 marks · annotated diagram",
          q: "Draw an annotated cross-section of a river meander.",
          marks: ["asymmetric channel: deep and steep on the outer bank, shallow and gentle on the inner bank", "outer bank: __river cliff__, fastest flow/thalweg → lateral erosion (hydraulic action, abrasion)",
            "inner bank: __slip-off slope / point bar__, slower flow → deposition", "helicoidal flow shown moving sediment from outer to inner bank"],
          svg: meanderX,
          model: "The channel is asymmetric. On the outer bank the thalweg (fastest, deepest flow) erodes laterally by hydraulic action and abrasion, forming a steep river cliff. On the inner bank slower water deposits sediment as a gently sloping point bar (slip-off slope). Helicoidal flow carries eroded material from the outer bank across the bed to the inner bank.",
          tip: "外深內淺：river cliff vs point bar。" },
        { title: "Sketch the Bradshaw model", paper: "P1", where: "Paper 1 · 3 marks · diagram",
          q: "Draw a diagram to show how channel characteristics change downstream according to the Bradshaw model.",
          marks: ["discharge, width, depth, velocity and load quantity shown __increasing__ downstream", "particle size, bed roughness and __gradient__ shown decreasing", "upstream and downstream ends labelled"],
          svg: bradshaw,
          reject: "velocity decreasing downstream (it increases on average because the channel is more efficient)",
          model: "Downstream, discharge, channel width, depth, mean velocity and load quantity increase as tributaries add water and the channel becomes more efficient. Load particle size, bed roughness and gradient decrease as attrition and abrasion wear the load down.",
          tip: "Velocity 下游係增加！因為 hydraulic radius 大、roughness 細。" },
      ],
      concepts: [
        { h: "Bradshaw model and downstream change", b: "<p>The <strong>Bradshaw model</strong> summarises downstream change: <em>discharge, occupied channel width, depth, mean velocity and load quantity increase</em>; <em>load particle size, channel bed roughness and gradient decrease</em>. Velocity increases despite the gentler gradient because the channel is more efficient - a larger <strong>hydraulic radius</strong> (cross-sectional area ÷ wetted perimeter) and smoother bed mean proportionally less energy is lost to friction. Particle size falls because attrition and abrasion round and break up the load.</p>" },
        { h: "Flood frequency and recurrence intervals", b: "<p><strong>Recurrence interval</strong> = (n + 1) ÷ m, where n = years of record and m = rank of the flood (largest = 1). A '1-in-100-year flood' has a 1% chance of happening in any one year - it can occur in consecutive years. Plotted on log paper, peak discharge rises roughly linearly with log recurrence interval, so planners can estimate the design flood for levees and land-use zoning. Urbanisation and climate change make big floods more frequent, so old records under-estimate risk.</p>" },
      ],
    },
    "geo-9": {
      diagrams: [
        G({ title: "Magnitude-frequency: about 10× fewer earthquakes for each +1 magnitude", x: [2, 9], y: [-1, 6], xLabel: "Magnitude (Mw)", yLabel: "log₁₀ events per year",
          curves: [{ f: (m) => 8 - m, label: "Gutenberg-Richter (b ≈ 1)", labelX: 3 }], points: [{ at: [8, 0], label: "~1 M8+ per year" }, { at: [6, 2], label: "~100 M6+" }] }),
        G({ title: "Hazard risk over time: deaths falling, losses and exposure rising (schematic)", x: [1970, 2020], y: [0, 10], xLabel: "Year", yLabel: "Index",
          curves: [{ f: (x) => 1 + 8 * sig(x, 2000, 0.09), label: "economic losses", labelX: 2010 }, { f: (x) => 8 - 4 * sig(x, 1995, 0.08) + 1.4 * Math.exp(-((x - 2005) ** 2) / 6), color: "b", dash: true, label: "deaths (spikes)", labelX: 1975 }] }),
      ],
      figures: [
        F("Ocean-continent convergent (destructive) boundary", "e.g. Nazca plate under South American plate: Andes, Peru-Chile trench", convergent),
        F("Divergent (constructive) boundary", "e.g. Mid-Atlantic Ridge, Iceland", divergent),
        F("Transform (conservative) boundary", "Plan view", transform),
        F("Earthquake focus, epicentre and seismic waves", "Cross-section", quake),
        F("Shield vs composite volcano", "Lava viscosity (silica content) controls shape and explosivity", volcTypes),
        F("Hotspot chain", "e.g. Hawaiian-Emperor chain: islands get older to the north-west", hotspot),
        F("Pressure and Release (PAR) model", "Blaikie et al.: disaster where rising vulnerability meets a hazard", parModel),
        F("Hazard management cycle", "Before (mitigation, preparedness) and after (response, recovery) an event", hazCycle),
        F("Degg's model", "A disaster needs both a hazard and vulnerable people", degg),
        F("Forces acting on a slope", "Mass movement (landslides, mudflows) when the balance tips", massMove),
      ],
      frames: [
        { title: "Draw an annotated diagram of an ocean-continent convergent boundary", star: true, paper: "P1", where: "Paper 1 · 4 marks · annotated diagram",
          q: "Using an annotated diagram, explain the formation of volcanoes at a convergent plate boundary.",
          marks: ["denser __oceanic plate subducts__ beneath the less dense continental plate; trench shown", "slab heats and releases water at ~100 km, causing __partial melting__ of the mantle",
            "buoyant, silica-rich (andesitic) magma rises through the crust to form a composite volcano", "earthquake foci shown along the subducting slab (Benioff zone) and/or fold mountains"],
          svg: convergent,
          model: "Where the denser oceanic Nazca plate meets the South American plate it subducts, forming the Peru-Chile trench. At about 100 km depth water released from the slab lowers the melting point of the mantle above, causing partial melting. The silica-rich, viscous andesitic magma rises to form explosive composite volcanoes in the Andes, while friction on the slab produces earthquakes along the Benioff zone.",
          reject: "'the plate melts because of friction'; volcanoes drawn on the oceanic side",
          tip: "Oceanic plate 因為密度大先會俯衝；火山喺 continental 嗰邊。" },
        { title: "Draw and explain the Pressure and Release model", star: true, paper: "P1", where: "Paper 1 · 4 marks · diagram",
          q: "With the help of a diagram, explain how the Pressure and Release (PAR) model accounts for a disaster.",
          marks: ["__root causes__ → __dynamic pressures__ → __unsafe conditions__ shown as a progression of vulnerability", "hazard shown as the second pressure", "disaster at the point where vulnerability and hazard meet", "named example linking a stage to a real place (e.g. Haiti 2010: poverty, no building codes, informal housing)"],
          svg: parModel,
          model: "The PAR model sees a disaster as the meeting of two pressures. Vulnerability builds from root causes (poverty, unequal power) through dynamic pressures (rapid urbanisation, lack of training) to unsafe conditions (unreinforced buildings on steep slopes). When a hazard - e.g. the M7.0 Haiti earthquake in 2010 - strikes these conditions, a disaster results. Reducing vulnerability 'releases' the pressure.",
          tip: "三格 vulnerability + 一格 hazard，中間撞埋 = disaster。" },
      ],
      concepts: [
        { h: "Degg's model, magnitude-frequency and the hazard management cycle", b: "<p><strong>Degg's model</strong>: a disaster happens only where a hazard overlaps a vulnerable population; uninhabited areas experience hazard events, not disasters. <strong>Magnitude-frequency</strong>: small events are common and large ones rare - globally ~1 earthquake of M8+ and ~15 of M7-7.9 a year (Gutenberg-Richter: about 10× fewer per +1 magnitude). Each +1 magnitude ≈ 32× more energy. The <strong>hazard management cycle</strong>: mitigation (zoning, codes) → preparedness (warnings, drills) → event → response (search and rescue, first 72 hours critical) → recovery (rebuilding, ideally 'build back better') → mitigation again.</p>" },
      ],
    },
    "geo-10": {
      diagrams: [
        G({ title: "Urban heat island profile across a city: cliff, plateau, peak (park = dip)", x: [0, 10], y: [0, 8], xLabel: "Rural → suburbs → CBD → park → rural", yLabel: "°C above rural",
          curves: [{ f: lin([[0, 0.6], [1.6, 0.8], [2.4, 3.4], [3.6, 4], [4.4, 6.2], [5, 6.6], [5.6, 5.2], [6, 4.4], [6.5, 5.8], [7.6, 3.8], [8.4, 3.4], [9, 1], [10, 0.7]]) }],
          texts: [{ at: [1.2, 3.6], text: "cliff" }, { at: [2.8, 5], text: "plateau" }, { at: [4.4, 7.4], text: "peak (CBD)" }, { at: [5.6, 3.4], text: "park" }] }),
        G({ title: "Population density gradient (Clark): steep in LICs, flatter with a CBD 'crater' in HICs", x: [0, 10], y: [0, 10], xLabel: "Distance from city centre", yLabel: "Residential density",
          curves: [{ f: (x) => 9.5 * Math.exp(-0.45 * x), label: "LIC city / HIC in 1900", labelX: 2.4 }, { f: (x) => 5.2 * Math.exp(-0.16 * x) * (1 - 0.7 * Math.exp(-x * 1.2)), color: "b", dash: true, label: "HIC city today", labelX: 6.4 }] }),
      ],
      figures: [
        F("Burgess concentric zone model", "Based on 1920s Chicago; assumes flat land and one centre", burgess),
        F("Hoyt sector model", "Sectors follow transport routes", hoyt),
        F("City in an LIC/MIC (Latin American model)", "Elite housing near the centre along a spine; squatter settlements on the periphery", licCity),
        F("Stages of urban change", "Not every city passes through every stage", urbCycle),
        F("Deindustrialisation spiral", "e.g. Detroit: population fell from ~1.85 m (1950) to ~0.64 m (2020)", deindLoop),
      ],
      frames: [
        { title: "Draw and label a model of urban land use", paper: "P1", where: "Paper 1 · 4 marks · labelled model",
          q: "Draw and label a model of urban land use for a city in a high-income country, and explain one weakness of the model.",
          marks: ["CBD at the centre", "at least three further zones correctly placed and labelled (transition, low-class, middle-class, commuter / sectors along transport routes)",
            "land value and density fall outward (bid-rent) explained", "one weakness: e.g. ignores relief, multiple nuclei, out-of-town retail, gentrification, cities in LICs"],
          svg: burgess,
          model: "In the Burgess model the CBD lies at the centre, surrounded by the zone in transition (factories, old housing), low-class inner-city housing, middle-class housing and the commuter zone. Bid-rent explains the pattern: land is most expensive at the accessible centre, so density falls and wealth rises outward. A weakness is that it assumes one centre and flat land, ignoring out-of-town retail parks, gentrified inner areas and cities in LICs where the wealthy live near the centre.",
          tip: "畫完記得寫 weakness：multiple nuclei、gentrification、LIC 城市相反。" },
        { title: "Sketch an urban heat island temperature profile", paper: "P1", where: "Paper 1 · 3 marks · sketch graph",
          q: "Sketch a temperature profile across a city to show an urban heat island.",
          marks: ["temperature rises sharply at the urban edge (__cliff__)", "gradual rise across the suburbs (__plateau__)", "maximum over the CBD (__peak__), with a dip over a park or river"],
          diagram: { title: "UHI profile", x: [0, 10], y: [0, 8], grid: false, origin: false, xLabel: "Distance across city", yLabel: "Temperature",
            curves: [{ f: lin([[0, 0.6], [1.6, 0.8], [2.4, 3.4], [3.6, 4], [4.4, 6.2], [5, 6.6], [5.6, 5.2], [6, 4.4], [6.5, 5.8], [7.6, 3.8], [8.4, 3.4], [9, 1], [10, 0.7]]) }] },
          model: "Temperature rises steeply at the rural-urban fringe, increases slowly across the suburbs, peaks over the dense CBD and dips over green space - often 4-8 °C warmer than the countryside on calm, clear nights.",
          tip: "Cliff → plateau → peak，公園有個 dip。" },
      ],
      concepts: [
        { h: "Urban models and density gradients", b: "<p><strong>Burgess</strong> (concentric) and <strong>Hoyt</strong> (sectors along transport routes) describe HIC cities; the <strong>multiple nuclei</strong> model (Harris and Ullman) adds secondary centres. In many LIC/MIC cities (the <strong>Latin American model</strong>, Griffin and Ford) the pattern is reversed: elite housing near the CBD along a commercial spine, with informal squatter settlements on the periphery. <strong>Clark's density gradient</strong>: residential density falls exponentially from the centre; over time HIC gradients flatten (suburbanisation) and develop a 'crater' at the CBD where offices replace homes. <strong>Urban change sequence</strong>: urbanisation → suburbanisation → counter-urbanisation → re-urbanisation.</p>" },
      ],
    },
    "geo-11": {
      diagrams: [
        G({ title: "Epidemiological transition: deaths shift from infectious to non-communicable disease", x: [0, 10], y: [0, 100], xLabel: "Development / time", yLabel: "% of deaths",
          curves: [{ f: (x) => 8 + 64 * (1 - sig(x, 4.5, 1)), label: "communicable", labelX: 1 }, { f: (x) => 18 + 66 * sig(x, 4.5, 1), color: "b", dash: true, label: "non-communicable (NCDs)", labelX: 6.2 }],
          texts: [{ at: [0.2, 96], text: "famine, pestilence" }, { at: [3.9, 96], text: "receding pandemics" }, { at: [7.6, 96], text: "degenerative" }] }),
        G({ title: "'Flattening the curve': same epidemic spread out below health-care capacity", x: [0, 20], y: [0, 10], xLabel: "Time since first case", yLabel: "New cases",
          curves: [{ f: (t) => 9 * Math.exp(-((t - 6) ** 2) / 6), label: "no intervention", labelX: 7.2 }, { f: (t) => 3.6 * Math.exp(-((t - 9) ** 2) / 26), color: "b", dash: true, label: "with measures", labelX: 14 }],
          hlines: [{ y: 4.2, label: "health-care capacity" }] }),
        G({ title: "Nutrition transition: undernourishment falls, obesity rises with income ('double burden' between)", x: [0, 10], y: [0, 45], xLabel: "GNI per capita (log)", yLabel: "% of adults",
          curves: [{ f: (x) => 40 * Math.exp(-0.45 * x), label: "undernourished", labelX: 1 }, { f: (x) => 3 + 32 * sig(x, 5, 0.9), color: "b", dash: true, label: "obese", labelX: 8 }],
          vlines: [{ x: 4.2, label: "double burden" }] }),
        G({ title: "Cumulative cases follow an S-curve as a disease diffuses", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "Cumulative cases",
          curves: [{ f: (x) => 9 * sig(x, 5, 1.2) }], texts: [{ at: [0.3, 2], text: "slow start" }, { at: [5.2, 5], text: "rapid spread" }, { at: [6.8, 9.6], text: "saturation / control" }] }),
      ],
      figures: [
        F("Types of disease diffusion", "Most epidemics combine several types (e.g. COVID-19: relocation by air, then contagious locally)", diffusion),
        F("Epidemiological triangle", "Disease results from agent, host and environment interacting", epiTri),
        F("Food supply chain", "Food losses are higher in LICs (storage, transport); waste is higher in HICs (shops, homes)", foodChain),
      ],
      frames: [
        { title: "Sketch and annotate the epidemiological transition", paper: "P1", where: "Paper 1 · 4 marks · sketch graph",
          q: "Sketch a graph to show the epidemiological transition and annotate the main changes.",
          marks: ["axes: time / development (x), % of deaths or mortality (y)", "communicable (infectious) disease share falls (vaccination, sanitation, antibiotics)",
            "__non-communicable__ share rises (ageing, diet, smoking, inactivity)", "stages or crossover point labelled (e.g. pestilence/famine → receding pandemics → degenerative diseases)"],
          diagram: { title: "Epidemiological transition", x: [0, 10], y: [0, 100], grid: false, origin: false, xLabel: "Development", yLabel: "% of deaths",
            curves: [{ f: (x) => 8 + 64 * (1 - sig(x, 4.5, 1)), label: "infectious", labelX: 1 }, { f: (x) => 18 + 66 * sig(x, 4.5, 1), color: "b", dash: true, label: "NCDs", labelX: 7 }] },
          model: "As countries develop, the share of deaths from communicable diseases falls because of vaccination, clean water, sanitation and antibiotics, while the share from non-communicable diseases (heart disease, cancers, diabetes) rises because people live longer and diets and lifestyles change. The lines cross as countries move from the age of receding pandemics to the age of degenerative diseases.",
          tip: "兩條線交叉：傳染病跌、NCD 升；標返原因。" },
        { title: "Draw diagrams to show types of disease diffusion", paper: "P1", where: "Paper 1 · 4 marks · diagrams",
          q: "Using diagrams, distinguish between contagious (expansion), hierarchical and relocation diffusion of a disease.",
          marks: ["contagious: spread outward to neighbours with __distance decay__", "hierarchical: spread down the __urban hierarchy__ (large city → towns), skipping places between",
            "relocation: carriers move to a new area, leaving the origin", "a named example for at least one (e.g. COVID-19 via air hubs; cholera in Haiti 2010)"],
          svg: diffusion,
          model: "In contagious diffusion a disease spreads to neighbouring people by direct contact, so it weakens with distance (distance decay). In hierarchical diffusion it moves down the urban hierarchy, from large, well-connected cities to smaller towns, skipping places in between - e.g. COVID-19 spreading through air hubs in 2020. In relocation diffusion infected people carry it to a new area, as when cholera reached Haiti in 2010.",
          tip: "三種：鄰近擴散、等級擴散、遷移擴散，每種要有圖同例子。" },
      ],
    },
    "geo-12": {
      diagrams: [
        G({ title: "Scatter graph with line of best fit and an outlier", x: [0, 10], y: [0, 10], xLabel: "Variable x (e.g. GNI per capita)", yLabel: "Variable y",
          curves: [{ f: (x) => 1 + 0.8 * x, label: "best fit", labelX: 8.4 }],
          points: [{ at: [1, 2.2] }, { at: [2, 2.4] }, { at: [3, 3.6] }, { at: [4, 4] }, { at: [5, 5.4] }, { at: [6, 5.6] }, { at: [7, 6.9] }, { at: [8, 7.1] }, { at: [9, 8.5] }, { at: [6.5, 2], label: "outlier" }] }),
        G({ title: "Spearman's rank: critical value falls as sample size rises (0.05 level, two-tailed)", x: [5, 30], y: [0, 1], xLabel: "n (number of pairs)", yLabel: "Critical rs",
          curves: [{ f: lin([[5, 1], [6, 0.886], [8, 0.738], [10, 0.648], [12, 0.591], [15, 0.525], [20, 0.45], [25, 0.4], [30, 0.364]]), label: "significant above the line", labelX: 14 }] }),
      ],
      figures: [
        F("Climate graph", "Temperature as a line (left axis), precipitation as bars (right axis)", climGraph("g12-1")),
        F("Triangular graph", "Read each variable along its own grid lines; the three values add to 100%", triGraph),
        F("Cross-section from contours", "Vertical exaggeration = vertical scale ÷ horizontal scale", crossSec),
        F("Choropleth, proportional symbol and isoline maps", "Choose the map for the data: rates, totals or continuous values", mapTypes),
      ],
      frames: [
        { title: "Complete or draw a climate graph", star: true, paper: "P2", where: "Paper 2 · 2-4 marks · graph construction",
          q: "Using the data provided, complete the climate graph by plotting July rainfall (840 mm) and the temperature for May (30 °C), then state the annual temperature range.",
          marks: ["July rainfall bar drawn to the correct height (840 mm) on the precipitation axis", "May temperature point plotted at 30 °C and joined to the line", "range = max − min = 30 − 24 = __6 °C__ (with units)"],
          svg: climGraph("g12-5"),
          numeric: { value: 6, tol: 0.1 },
          model: "The July bar is drawn to 840 mm; May is plotted at 30 °C on the temperature line; the annual range is 30 − 24 = 6 °C.",
          reject: "temperature drawn as bars or rainfall as a line; range without units",
          tip: "溫度 = 線，雨量 = 柱；range 要減埋同寫 °C。" },
        { title: "Construct a cross-section from a contour map", paper: "P1", where: "Paper 1 / fieldwork · 3 marks · construction",
          q: "Construct a cross-section from A to B on the contour map and describe the relief.",
          marks: ["contour crossings transferred accurately to the horizontal axis", "heights plotted at the correct scale and joined with a smooth curve (not straight-line steps)", "relief described: e.g. a symmetrical hill rising to ~270 m, steepest where contours are closest"],
          svg: crossSec,
          model: "Each point where a contour crosses A-B is marked on the edge of a strip of paper and moved onto the horizontal axis. The heights are plotted at the chosen vertical scale and joined with a smooth curve. The section shows a roughly symmetrical hill rising from about 80 m to about 270 m, steepest where the contours are closest together.",
          tip: "Contour 密 = 斜；記得用 smooth curve。" },
      ],
    },
    "geo-h1": {
      diagrams: [
        G({ title: "'Smile curve': value added is highest at the start and end of a production network", x: [0, 10], y: [0, 10], xLabel: "R&D, design → manufacturing, assembly → marketing, services", yLabel: "Value added",
          curves: [{ f: (x) => 2 + 0.28 * (x - 5) ** 2 }], texts: [{ at: [0.2, 9.4], text: "HIC HQ" }, { at: [4, 2.8], text: "assembly (EME/LIC)" }, { at: [8.2, 9.4], text: "HIC brand" }] }),
      ],
      figures: [
        F("World-systems: core, semi-periphery, periphery", "After Wallerstein; countries can move between tiers (e.g. South Korea, China)", worldSys),
        F("Global flows", "Flows of capital, goods, people and data link country groups", flowsTri),
        F("A TNC's global production network", "e.g. a smartphone: designed in the USA, components from East Asia, assembled in China/India", tncNet),
        F("Hard, smart and soft power", "After Joseph Nye", powerSpec),
      ],
    },
    "geo-h2": {
      diagrams: [
        G({ title: "HDI rises steeply with income at first, then levels off (diminishing returns)", x: [0, 10], y: [0.3, 1], xLabel: "GNI per capita (log)", yLabel: "HDI",
          curves: [{ f: (x) => 0.35 + 0.6 * (1 - Math.exp(-0.32 * x)) }], points: [{ at: [3, 0.35 + 0.6 * (1 - Math.exp(-0.96))], label: "outliers: Cuba above, oil states below" }] }),
        G({ title: "Kuznets curve: inequality first rises, then falls as income grows", x: [0, 10], y: [0, 10], xLabel: "Income per capita", yLabel: "Inequality (Gini)",
          curves: [{ f: (x) => 2 + 6.5 * Math.exp(-((x - 4.5) ** 2) / 6) }], texts: [{ at: [6.4, 9.2], text: "contested in many HICs" }] }),
        G({ title: "Clark-Fisher model: employment shifts from primary to secondary to tertiary (and quaternary)", x: [0, 10], y: [0, 100], xLabel: "Development / time", yLabel: "% of workforce",
          curves: [{ f: (x) => 4 + 76 * (1 - sig(x, 3.5, 1)), label: "primary", labelX: 0.5 }, { f: (x) => 8 + 32 * Math.exp(-((x - 5) ** 2) / 5), color: "b", label: "secondary", labelX: 4.2 }, { f: (x) => 12 + 66 * sig(x, 5.5, 0.9), color: "c", dash: true, label: "tertiary + quaternary", labelX: 7 }] }),
      ],
      figures: [
        F("How the Human Development Index is built", "UNDP; inequality-adjusted (IHDI) and gender (GII) versions also exist", hdiFig),
        F("Outcomes of cultural diffusion", "Global flows can homogenise, hybridise or provoke resistance", cultFig),
      ],
    },
    "geo-h3": {
      diagrams: [
        G({ title: "Resilience after a shock: collapse, bounce back or 'build back better'", x: [0, 10], y: [0, 10], xLabel: "Time", yLabel: "System performance",
          curves: [{ f: () => 7, domain: [0, 2] }, { f: (x) => 3 + 5.5 * (1 - Math.exp(-(x - 2.3) / 1.4)), domain: [2.3, 10], color: "c", label: "build back better", labelX: 7.6 },
            { f: (x) => 3 + 4 * (1 - Math.exp(-(x - 2.3) / 1.8)), domain: [2.3, 10], color: "b", dash: true, label: "bounce back", labelX: 6.4 },
            { f: (x) => 3 - 1.2 * (1 - Math.exp(-(x - 2.3) / 2)), domain: [2.3, 10], color: "muted", label: "collapse", labelX: 8 }],
          lines: [{ from: [2, 7], to: [2.3, 3], color: "a" }], vlines: [{ x: 2, label: "shock" }] }),
      ],
      figures: [
        F("Global risk matrix", "Risks are judged by likelihood and impact; many are interconnected", riskMat),
        F("Financial contagion (2007-09)", "Interconnection spreads a local shock through global networks", contagion),
        F("Tragedy of the commons", "Hardin (1968); solutions: quotas, property rights, international agreements", commons),
      ],
    },
  }});

  // ---------- oceans and coasts ----------
  const oceanFloor = fig("gh4-1", 460, 220, "Ocean floor profile", () =>
    P("M48 50L130 70L170 150L220 165L260 170L280 140L292 112L304 140L324 170L352 170L378 200L396 150L440 45L440 50Z", { f: "b", op: 0.18, c: "none" }) +
    L(48, 50, 440, 50, { c: "b" }) + P("M4 40L48 50L130 70L170 150L220 165L260 170L280 140L292 112L304 140L324 170L352 170L378 200L396 150L440 45L456 40", { w: 2 }) +
    TM(70, 92, "Continental shelf|(to ~200 m)", { s: 11, lh: 13 }) + TM(124, 126, "Slope", { s: 11, a: "end" }) + TM(180, 176, "Rise", { s: 11, a: "end" }) +
    TM(240, 192, "Abyssal plain|(~4,000-6,000 m)", { s: 11, lh: 13 }) + TM(292, 100, "Mid-ocean ridge", { s: 11 }) +
    TM(380, 214, "Trench (to ~11,000 m)", { s: 11 }) + T(300, 44, "sea level", { s: 11, c: "b" }) + T(20, 32, "land", { s: 11 }) +
    T(230, 18, "Vertical scale greatly exaggerated", { s: 11, c: "muted" }));
  const ensoPanel = (A, y0, el) => {
    let g = R(4, y0 + 58, 34, 70, { f: "a", op: 0.3, c: "none" }) + R(422, y0 + 58, 34, 70, { f: "a", op: 0.3, c: "none" }) + L(38, y0 + 70, 422, y0 + 70, { c: "b" });
    g += T(2, y0 + 140, "Indonesia,", { s: 11, a: "start" }) + T(2, y0 + 152, "Australia", { s: 11, a: "start" }) + T(439, y0 + 140, "Peru", { s: 11 });
    if (!el) {
      g += P(`M38 ${y0 + 70}L422 ${y0 + 70}L422 ${y0 + 82}L38 ${y0 + 122}Z`, { f: "d", op: 0.3, c: "none" }) + L(38, y0 + 122, 422, y0 + 82, { d: true }) + T(160, y0 + 125, "thermocline", { s: 11, a: "start" });
      g += A(390, y0 + 62, 100, y0 + 62, { w: 2 }) + T(245, y0 + 57, "strong easterly trade winds", { s: 11 }) + A(80, y0 + 56, 80, y0 + 22) + A(92, y0 + 16, 380, y0 + 16) + A(392, y0 + 22, 392, y0 + 54);
      g += EL(70, y0 + 28, 26, 10, { f: "muted", op: 0.5, c: "none" }) + T(130, y0 + 40, "rising air, heavy rain", { s: 11, a: "start" }) + T(388, y0 + 40, "sinking dry air", { s: 11, a: "end" });
      g += A(405, y0 + 118, 405, y0 + 80, { c: "c", w: 2 }) + T(400, y0 + 112, "cold upwelling, rich fishing", { s: 11, a: "end", c: "c" }) + T(100, y0 + 98, "warm pool", { s: 11, c: "d" });
    } else {
      g += P(`M38 ${y0 + 70}L422 ${y0 + 70}L422 ${y0 + 100}L38 ${y0 + 106}Z`, { f: "d", op: 0.3, c: "none" }) + L(38, y0 + 106, 422, y0 + 100, { d: true }) + T(60, y0 + 120, "thermocline flattens", { s: 11, a: "start" });
      g += A(140, y0 + 62, 300, y0 + 62, { w: 2 }) + T(220, y0 + 57, "trade winds weaken or reverse", { s: 11 }) + A(340, y0 + 56, 340, y0 + 22) + A(330, y0 + 16, 90, y0 + 16) + A(80, y0 + 22, 80, y0 + 54);
      g += EL(370, y0 + 28, 26, 10, { f: "muted", op: 0.5, c: "none" }) + T(350, y0 + 48, "rain, floods", { s: 11, a: "start" }) + T(92, y0 + 40, "sinking air: drought, fires", { s: 11, a: "start" });
      g += T(300, y0 + 88, "warm water spreads east; upwelling stops, fish decline", { s: 11, c: "d" });
    }
    return g;
  };
  const enso = fig("gh4-2", 460, 330, "Normal conditions vs El Niño", ({ A }) =>
    T(230, 12, "Normal (Walker circulation)", { b: true }) + ensoPanel(A, 4, false) + T(230, 176, "El Niño (every ~2-7 years)", { b: true }) + ensoPanel(A, 168, true));
  const thermohaline = fig("gh4-3", 430, 210, "Thermohaline circulation", ({ A }) =>
    A(60, 50, 360, 50, { c: "d", w: 3 }) + A(380, 66, 380, 140, { c: "b", w: 3 }) + A(360, 158, 60, 158, { c: "b", w: 3 }) + A(40, 140, 40, 66, { c: "d", w: 3 }) +
    T(210, 40, "Warm surface currents (e.g. Gulf Stream → North Atlantic Drift)", { s: 11, c: "d" }) + T(210, 176, "Cold, dense deep water flows south and into the Indian and Pacific", { s: 11, c: "b" }) +
    TM(372, 88, "Sinking near Greenland|and Antarctica: cold +|salty (sea ice leaves|salt) = dense", { s: 11, a: "end", lh: 13 }) +
    TM(52, 88, "Upwelling: deep water|rises and warms in the|Indian and Pacific", { s: 11, a: "start", lh: 13 }) +
    T(210, 200, "One circuit takes ~1,000 years; fresh meltwater may weaken it", { s: 11, c: "muted" }));
  const waveTypes = fig("gh4-4", 460, 190, "Constructive vs destructive waves", ({ A }) => {
    const panel = (x0, con) => {
      let g = P(`M${x0 + 4} 140L${x0 + 216} 70L${x0 + 216} 150L${x0 + 4} 150Z`, { f: "a", op: 0.25, c: "currentColor", w: 1.2 });
      g += con ? P(`M${x0 + 4} 120Q${x0 + 30} 110 ${x0 + 56} 120Q${x0 + 82} 110 ${x0 + 108} 118`, { c: "b", w: 2 }) : P(`M${x0 + 4} 122Q${x0 + 20} 84 ${x0 + 44} 92Q${x0 + 60} 70 ${x0 + 80} 104`, { c: "b", w: 2 });
      g += con ? A(x0 + 110, 104, x0 + 196, 76, { c: "c", w: 3 }) + A(x0 + 160, 102, x0 + 128, 112, { c: "d", w: 1.2 }) : A(x0 + 110, 104, x0 + 140, 94, { c: "c", w: 1.2 }) + A(x0 + 190, 80, x0 + 96, 112, { c: "d", w: 3 });
      return g + T(x0 + 110, 18, con ? "Constructive" : "Destructive", { b: true }) +
        TM(x0 + 110, 166, con ? "low, long wavelength, 6-8 a minute;|swash > backwash: builds beach" : "high, steep, plunging, 10-14 a minute;|backwash > swash: erodes beach", { s: 11, lh: 13 }) +
        T(x0 + (con ? 150 : 120), con ? 70 : 90, "swash", { s: 11, c: "c" }) + T(x0 + (con ? 160 : 150), con ? 120 : 124, "backwash", { s: 11, c: "d", a: "start" });
    };
    return panel(4, true) + panel(236, false);
  });
  const lsd = fig("gh4-5", 440, 220, "Longshore drift and spit formation", ({ A }) => {
    let g = P("M0 0L440 0L440 18L330 18L300 70L0 70Z", { f: "c", op: 0.2, c: "currentColor", w: 1.2 }) + R(0, 70, 300, 8, { f: "a", op: 0.4, c: "none", rx: 0 });
    g += P("M300 76Q370 82 410 86Q432 86 426 62", { c: "a", w: 9, lc: true }) + T(360, 104, "Spit", { s: 12, b: true }) + T(398, 46, "recurved end", { s: 11, a: "end" });
    g += T(345, 66, "salt marsh", { s: 11, c: "c" }) + T(150, 40, "Land", { s: 12 }) + T(436, 32, "estuary / bay", { s: 11, a: "end", c: "b" });
    let z = "M40 90";
    for (let x = 40; x < 280; x += 30) z += `L${x + 22} 80L${x + 22} 92`;
    g += P(z, { c: "d", w: 1.4 }) + A(250, 100, 296, 100, { c: "d", w: 2 }) + T(200, 116, "net movement of sediment", { s: 11, c: "d" });
    g += [[30, 150], [80, 150], [130, 150], [180, 150]].map(([x, y]) => L(x, y + 20, x + 40, y - 20, { c: "b", w: 1.2 })).join("") + A(220, 176, 264, 132, { w: 2 }) + T(272, 144, "prevailing wind and waves", { s: 11, a: "start" });
    return g + TM(8, 196, "Swash moves up the beach at the angle of the waves;|backwash returns straight down (gravity) → zig-zag", { s: 11, a: "start", lh: 14 });
  });
  const headland = fig("gh4-6", 460, 190, "Crack, cave, arch, stack, stump", () =>
    R(0, 130, 460, 40, { f: "b", op: 0.2, c: "none", rx: 0 }) + L(0, 130, 460, 130, { c: "b" }) +
    P("M10 130L10 40L215 40L215 130L195 130L195 104Q177 82 160 104L160 130Z", { f: "muted", op: 0.4, c: "currentColor", w: 1.2 }) +
    P("M70 130L70 112Q82 100 95 112L95 130Z", { f: "fill", c: "currentColor", w: 1 }) + P("M40 130L42 104L39 88", { w: 1.6 }) +
    P("M255 130L256 56L284 52L290 130Z", { f: "muted", op: 0.4, c: "currentColor", w: 1.2 }) + P("M340 130L342 117L364 115L368 130Z", { f: "muted", op: 0.4, c: "currentColor", w: 1.2 }) +
    [[34, "Crack", "joint"], [84, "Cave", "abrasion"], [177, "Arch", "caves meet"], [272, "Stack", "roof falls"], [354, "Stump", "eroded"]]
      .map(([x, a, b]) => T(x, 150, a, { s: 11, b: true }) + T(x, 164, b, { s: 11 })).join("") +
    T(112, 30, "Headland of resistant rock", { s: 11 }) + T(420, 110, "sea", { s: 11, c: "b" }) +
    T(230, 184, "Erosion by hydraulic action, abrasion, solution; weathering weakens the roof", { s: 11, c: "muted" }));
  const refraction = fig("gh4-7", 400, 230, "Wave refraction at a headland", ({ AP }) => {
    const coast = (x) => 50 + 80 * Math.exp(-(((x - 200) / 70) ** 2));
    let land = "M0 0L400 0", cr = [];
    for (let x = 400; x >= 0; x -= 10) land += `L${x} ${coast(x).toFixed(1)}`;
    let g = P(land + "Z", { f: "c", op: 0.2, c: "currentColor", w: 1.4 });
    for (let k = 1; k <= 6; k++) {
      let d = "";
      for (let x = 0; x <= 400; x += 10) d += (x ? "L" : "M") + x + " " + (50 + 24 * k + 80 * Math.max(0, 1 - k / 6) * Math.exp(-(((x - 200) / 70) ** 2))).toFixed(1);
      cr.push(P(d, { c: "b", w: 1.2 }));
    }
    g += cr.join("") + AP("M200 228L200 136", { c: "d", w: 1.6 }) + AP("M160 228Q160 170 182 132", { c: "d", w: 1.6 }) + AP("M240 228Q240 170 218 132", { c: "d", w: 1.6 }) +
      AP("M60 228Q60 120 48 56", { c: "d", w: 1.6 }) + AP("M340 228Q340 120 352 56", { c: "d", w: 1.6 });
    return g + TM(200, 70, "Headland:|energy|concentrated", { s: 11, lh: 14 }) + T(54, 20, "Bay: energy spread", { s: 11 }) + T(54, 34, "→ deposition (beach)", { s: 11 }) +
      T(346, 20, "Bay", { s: 11 });
  });
  const unclos = fig("gh4-8", 460, 200, "UNCLOS maritime zones", ({ A }) =>
    R(0, 30, 30, 60, { f: "c", op: 0.3, c: "none", rx: 0 }) + T(15, 22, "Land", { s: 11 }) +
    R(30, 30, 85, 40, { f: "b", op: 0.45, rx: 0 }) + R(115, 30, 85, 40, { f: "b", op: 0.3, rx: 0 }) + R(200, 30, 145, 40, { f: "b", op: 0.18, rx: 0 }) + R(345, 30, 110, 40, { f: "muted", op: 0.15, rx: 0 }) +
    T(115, 84, "12 nm", { s: 11 }) + T(200, 84, "24 nm", { s: 11 }) + T(345, 84, "200 nm", { s: 11 }) + T(30, 84, "baseline", { s: 11, a: "start" }) +
    TM(72, 104, "Territorial sea|full sovereignty;|innocent passage", { s: 11, lh: 13 }) + TM(157, 104, "Contiguous zone|customs, immig-|ration, pollution", { s: 11, lh: 13 }) +
    TM(272, 104, "Exclusive Economic Zone|sovereign rights to fish,|oil, gas, wind; others|may sail and fly over", { s: 11, lh: 13 }) + TM(400, 104, "High seas|open to all;|seabed: ISA", { s: 11, lh: 13 }) +
    A(30, 172, 450, 172, { c: "a" }) + T(240, 166, "Continental shelf rights: to 200 nm, or up to 350 nm if the shelf extends", { s: 11, c: "a" }) +
    T(230, 194, "Not to scale · 1 nautical mile = 1.852 km · disputes: South China Sea", { s: 11, c: "muted" }));
  const sedCell = flow("gh4-9", "Sediment cell", ["SOURCES: cliff|erosion, rivers,|offshore bars", "TRANSFERS:|longshore drift,|onshore/offshore", "SINKS: beaches,|spits, dunes,|offshore banks"], { per: 3, bw: 136, bh: 58, foot: "Cells bounded by headlands; England and Wales have 11 major cells", footC: "muted" });
  const thermo = fig("gh4-10", 320, 270, "Ocean temperature with depth", () =>
    L(40, 40, 300, 40) + L(40, 40, 40, 250) + [0, 5, 10, 15, 20, 25].map((t) => T(40 + t * 10, 32, t, { s: 11 })).join("") + T(170, 14, "Temperature (°C)", { s: 11 }) +
    [[40, "0"], [60, "100"], [150, "1000"], [250, "4000"]].map(([y, s]) => T(36, y + 4, s, { s: 11, a: "end" })).join("") + T(12, 150, "Depth (m)", { s: 11, r: -90 }) +
    R(41, 41, 258, 19, { f: "d", op: 0.12, c: "none", rx: 0 }) + R(41, 60, 258, 90, { f: "b", op: 0.1, c: "none", rx: 0 }) +
    P("M260 40L260 60C255 100 110 130 90 150C75 165 62 200 60 248", { c: "d", w: 2.4 }) +
    T(150, 54, "mixed surface layer", { s: 11 }) + TM(200, 110, "thermocline:|rapid cooling", { s: 11, lh: 13 }) + TM(170, 210, "deep water ~0-4 °C,|dark, cold, dense", { s: 11, lh: 13 }) +
    T(170, 266, "Tropical ocean; depth axis not to scale", { s: 11, c: "muted" }));

  IB.addExamFrames("geo", { topics: {
    "geo-h4": {
      diagrams: [
        G({ title: "Ocean acidification: surface pH falls as CO₂ dissolves (≈8.2 → ≈8.1)", x: [1850, 2025], y: [8, 8.25], xLabel: "Year", yLabel: "Surface pH",
          curves: [{ f: (x) => 8.2 - 0.12 * ((x - 1850) / 175) ** 2.5 }], texts: [{ at: [1860, 8.06], text: "~30% more H⁺ ions" }] }),
        G({ title: "Oceans have absorbed ~90% of the extra heat from global warming (schematic heat content)", x: [1960, 2025], y: [0, 10], xLabel: "Year", yLabel: "Ocean heat content",
          curves: [{ f: (x) => 0.5 + 8 * ((x - 1960) / 65) ** 1.8 }] }),
      ],
      figures: [
        F("Ocean floor profile", "Main features from coast to trench", oceanFloor),
        F("Normal conditions vs El Niño (ENSO)", "La Niña is an intensified version of normal conditions", enso),
        F("Thermohaline circulation", "Driven by differences in temperature (thermo) and salinity (haline)", thermohaline),
        F("Ocean temperature profile", "The thermocline separates warm surface water from the cold deep ocean", thermo),
        F("Constructive vs destructive waves", "Swash vs backwash strength decides whether the beach gains or loses sediment", waveTypes),
        F("Longshore drift and spit", "Plan view (e.g. Spurn Head, England)", lsd),
        F("Headland erosion sequence", "Side view", headland),
        F("Wave refraction", "Plan view: crests (blue) slow in shallow water and bend; orthogonals (red) converge on the headland and diverge in bays", refraction),
        F("UNCLOS maritime zones", "UN Convention on the Law of the Sea (1982)", unclos),
        F("Sediment cell", "A closed system in theory: sediment stays within the cell", sedCell),
      ],
      frames: [
        { title: "Draw an annotated sequence of headland erosion", star: true, paper: "P1", where: "Paper 1 · 4 marks · annotated diagrams",
          q: "With the help of annotated diagrams, explain the formation of a stack.",
          marks: ["weakness (joint/fault) in a headland eroded by __hydraulic action__ and abrasion", "crack widens into a cave", "caves on either side meet to form an __arch__", "arch roof collapses (weathering + undercutting), leaving an isolated stack, later a stump"],
          svg: headland,
          model: "Waves attack lines of weakness in a resistant headland by hydraulic action and abrasion, widening joints into a cave. Caves on opposite sides join to form an arch. Waves undercut the arch while weathering weakens its roof until it collapses, leaving a stack, which is eroded further into a stump (e.g. Old Harry, Dorset).",
          tip: "Crack → cave → arch → stack → stump，每個階段寫 process。" },
        { title: "Draw diagrams of normal and El Niño conditions", star: true, paper: "P1", where: "Paper 1 · 4 marks · two diagrams",
          q: "Using diagrams, explain how El Niño conditions differ from normal conditions in the Pacific Ocean.",
          marks: ["normal: strong easterly __trade winds__ push warm water west; rising air and rain over Indonesia/Australia (Walker circulation)", "normal: cold __upwelling__ off Peru; thermocline shallow in the east",
            "El Niño: trade winds weaken/reverse; warm water spreads east; thermocline flattens; upwelling stops", "impacts: drought and fires in Australia/Indonesia; heavy rain and floods in Peru; fish stocks fall"],
          svg: enso,
          model: "Normally strong easterly trade winds push warm surface water west, so the thermocline is deep in the west and shallow in the east. Air rises over Indonesia, bringing heavy rain, and cold, nutrient-rich water upwells off Peru. During El Niño the trade winds weaken or reverse, warm water spreads east and the thermocline flattens, so upwelling stops. Rain moves to Peru, causing floods, while Indonesia and Australia have drought and fires, and Peru's anchovy catch collapses.",
          tip: "兩幅圖：風向、暖水位置、thermocline、upwelling 都要變。" },
        { title: "Draw an annotated diagram of longshore drift", paper: "P1", where: "Paper 1 · 3 marks · diagram",
          q: "Draw an annotated diagram to show how longshore drift transports sediment and forms a spit.",
          marks: ["waves approach at an angle driven by the __prevailing wind__", "swash moves sediment up the beach at that angle; __backwash__ returns it straight down under gravity", "zig-zag net movement along the coast; deposition where the coast changes direction forms a spit (recurved end, salt marsh behind)"],
          svg: lsd,
          model: "Waves approach the beach at an angle set by the prevailing wind. Swash carries sediment up the beach at that angle and backwash drags it straight back down under gravity, so sediment moves along the coast in a zig-zag. Where the coastline changes direction, sediment keeps being deposited out into open water, forming a spit. Changing winds curve its tip, and a salt marsh forms in the sheltered water behind it.",
          tip: "Swash 跟風斜上，backwash 垂直落；轉角位沉積成 spit。" },
      ],
      concepts: [
        { h: "Ocean layers, the seabed and sediment cells", b: "<p><strong>Vertical structure</strong>: a warm, wind-mixed <strong>surface layer</strong> (top ~100-200 m); the <strong>thermocline</strong>, where temperature falls rapidly (to ~1,000 m); and cold (~0-4 °C), dense <strong>deep water</strong>. A strong thermocline limits mixing of nutrients upward, so the tropical open ocean is low in productivity while upwelling zones (Peru, Benguela) are rich. <strong>Seabed</strong>: continental shelf (to ~200 m depth; most fishing and oil), slope, rise, abyssal plain (~4,000-6,000 m), ridges and trenches (Mariana ~11,000 m). <strong>Sediment cells</strong>: stretches of coast where sediment moves from sources (cliffs, rivers) via transfers (longshore drift) to sinks (beaches, spits, dunes); interrupting one part (e.g. groynes) starves beaches downdrift.</p>" },
      ],
    },
  }});
})();
