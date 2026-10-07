/* Biology (part 2: C1.2 AHL to D4) - diagrams and graphs to know (original). */
(function () {
  // ---------- tiny SVG helpers (colours via currentColor and --fig-* variables only) ----------
  const S = (w, h, label, body, mk) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" fill="none" stroke="currentColor" stroke-width="1.5" font-family="sans-serif" font-size="12">${mk ? `<defs><marker id="${mk}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor" stroke="none"/></marker></defs>` : ""}${body}</svg>`;
  const T = (x, y, s, a, o = {}) => `<text x="${x}" y="${y}"${a ? ` text-anchor="${a}"` : ""} fill="${o.c || "currentColor"}" stroke="none"${o.fs ? ` font-size="${o.fs}"` : ""}${o.b ? ' font-weight="bold"' : ""}${o.i ? ' font-style="italic"' : ""}>${s}</text>`;
  const L = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${o.c ? ` stroke="${o.c}"` : ""}${o.w ? ` stroke-width="${o.w}"` : ""}${o.d ? ' stroke-dasharray="4 3"' : ""}${o.m ? ` marker-end="url(#${o.m})"` : ""}/>`;
  const P = (d, o = {}) => `<path d="${d}"${o.f ? ` fill="${o.f}"` : ""}${o.fo ? ` fill-opacity="${o.fo}"` : ""}${o.c ? ` stroke="${o.c}"` : ""}${o.w ? ` stroke-width="${o.w}"` : ""}${o.d ? ' stroke-dasharray="4 3"' : ""}${o.m ? ` marker-end="url(#${o.m})"` : ""}/>`;
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 4}"${o.f ? ` fill="${o.f}"` : ""}${o.fo ? ` fill-opacity="${o.fo}"` : ""}${o.c ? ` stroke="${o.c}"` : ""}${o.w ? ` stroke-width="${o.w}"` : ""}${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const C = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}"${o.f ? ` fill="${o.f}"` : ""}${o.fo ? ` fill-opacity="${o.fo}"` : ""}${o.c ? ` stroke="${o.c}"` : ""}${o.w ? ` stroke-width="${o.w}"` : ""}${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  const E = (x, y, rx, ry, o = {}) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${o.f ? ` fill="${o.f}"` : ""}${o.fo ? ` fill-opacity="${o.fo}"` : ""}${o.c ? ` stroke="${o.c}"` : ""}${o.w ? ` stroke-width="${o.w}"` : ""}${o.d ? ' stroke-dasharray="4 3"' : ""}/>`;
  // leader line from a structure (x1,y1) to its label at (x2,y2)
  const lab = (x1, y1, x2, y2, s, a) => L(x1, y1, x2, y2, { w: 0.8 }) + T(x2 + (a === "end" ? -3 : a === "middle" ? 0 : 3), y2 + (a === "middle" ? (y2 < y1 ? -4 : 12) : 4), s, a);
  // box with centred lines of text
  const B = (x, y, w, h, lines, o = {}) => R(x, y, w, h, { f: o.f || "var(--fig-fill)", c: o.c, r: o.r ?? 6 }) + lines.map((s, i) => T(x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * (o.lh || 14) + 4, s, "middle", { fs: o.fs, b: o.b && i === 0 })).join("");
  const A = (m, x1, y1, x2, y2, c) => L(x1, y1, x2, y2, { m, c });
  const F = "var(--fig-fill)", CA = "var(--fig-a)", CB = "var(--fig-b)", CC = "var(--fig-c)", CD = "var(--fig-d)", CM = "var(--fig-muted)";
  const gauss = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s));

  // ======================================================== bio-h2 (C1.2-1.3 AHL)
  const ell = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0z`;
  const MITO = (() => {
    const cx = 240, cy = 105;
    let b = `<path d="${ell(cx, cy, 140, 72)}${ell(cx, cy, 128, 60)}" fill-rule="evenodd" fill="${F}"/>`;
    const iy = (x, s) => cy + s * 60 * Math.sqrt(1 - ((x - cx) / 128) ** 2);
    [[180, -1], [240, -1], [300, -1], [210, 1], [270, 1]].forEach(([x, s]) => {
      const y0 = iy(x, s).toFixed(1), y1 = s < 0 ? 95 : 117;
      b += P(`M${x - 5} ${y0}L${x - 5} ${y1}A5 5 0 0 ${s < 0 ? 0 : 1} ${x + 5} ${y1}L${x + 5} ${y0}`, { f: F });
      b += R(x - 4, (y0 - 2.5).toFixed(1), 8, 5, { f: F, r: 0, c: "none" });
    });
    [[138, 96], [150, 112], [140, 125], [160, 92], [338, 128], [345, 92]].forEach(([x, y]) => (b += C(x, y, 2.2, { f: "currentColor", c: "none" })));
    b += E(330, 108, 13, 8, { c: CA, w: 2 });
    b += lab(300, 41, 360, 18, "outer membrane") + lab(352, 76, 395, 58, "inner membrane") + lab(374, 108, 400, 108, "intermembrane space");
    b += lab(242, 70, 215, 14, "crista (fold of inner membrane)", "end");
    b += lab(130, 108, 88, 100, "matrix", "end") + lab(141, 125, 88, 145, "70S ribosomes", "end") + lab(330, 116, 330, 192, "naked circular DNA", "middle");
    return S(530, 210, "Labelled diagram of a mitochondrion", b);
  })();

  const CHLORO = (() => {
    const cx = 250, cy = 105;
    let b = `<path d="${ell(cx, cy, 150, 70)}${ell(cx, cy, 143, 63)}" fill-rule="evenodd" fill="${CM}" fill-opacity=".25"/>` + P(ell(cx, cy, 150, 70)) + P(ell(cx, cy, 143, 63), { f: F });
    const gr = [[165, 82], [250, 108], [335, 86]];
    b += L(183, 100, 232, 120, { c: CC, w: 2 }) + L(268, 116, 317, 98, { c: CC, w: 2 }) + L(147, 96, 115, 112, { c: CC, w: 2 }) + L(353, 92, 385, 110, { c: CC, w: 2 });
    gr.forEach(([x, y]) => { for (let i = 0; i < 6; i++) b += R(x - 18, y - 21 + i * 7, 36, 5, { f: CC, fo: ".45", c: CC, w: 1, r: 2 }); });
    b += E(205, 148, 15, 8, { f: CM, fo: ".35" }) + C(300, 145, 5, { f: "currentColor", fo: ".6", c: "none" }) + C(312, 152, 4, { f: "currentColor", fo: ".6", c: "none" });
    [[372, 125], [380, 135], [365, 138]].forEach(([x, y]) => (b += C(x, y, 2.2, { f: "currentColor", c: "none" })));
    b += E(130, 128, 12, 7, { c: CA, w: 2 });
    b += lab(330, 42, 380, 20, "double membrane (envelope)") + lab(353, 82, 405, 70, "granum (stack)") + lab(160, 63, 140, 30, "thylakoid", "end") + lab(369, 101, 412, 100, "lamella") ;
    b += lab(372, 130, 412, 132, "70S ribosomes") + lab(306, 150, 330, 194, "lipid droplets") + lab(205, 156, 190, 194, "starch grain", "end");
    b += lab(118, 128, 84, 140, "DNA", "end") + lab(120, 90, 84, 92, "stroma", "end");
    return S(545, 210, "Labelled diagram of a chloroplast", b);
  })();

  const ETC = (() => {
    const m = "ar-bh2-etc";
    let b = R(10, 95, 490, 40, { f: F, r: 0, c: "none" }) + L(10, 95, 500, 95) + L(10, 135, 500, 135);
    b += R(55, 82, 45, 66, { f: CB, fo: ".3", r: 8 }) + T(70, 120, "I", "middle", { b: 1 });
    b += R(125, 108, 32, 40, { f: CB, fo: ".3", r: 8 }) + T(141, 132, "II", "middle", { b: 1 });
    b += C(187, 116, 9, { f: F }) + T(187, 120, "Q", "middle", { fs: 10 });
    b += R(212, 82, 45, 66, { f: CB, fo: ".3", r: 8 }) + T(228, 120, "III", "middle", { b: 1 });
    b += C(283, 88, 9, { f: F }) + T(283, 92, "c", "middle", { fs: 11 });
    b += R(307, 82, 45, 66, { f: CB, fo: ".3", r: 8 }) + T(322, 120, "IV", "middle", { b: 1 });
    b += R(432, 82, 28, 66, { f: CC, fo: ".35", r: 6 }) + C(446, 170, 20, { f: CC, fo: ".35" });
    b += `<polyline points="100,128 178,119 196,114 212,108 257,100 274,92 292,92 307,104" stroke="${CD}" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#${m})"/>`;
    b += T(160, 108, "e⁻", "middle", { c: CD, b: 1 });
    [92, 249, 344].forEach((x) => (b += L(x, 150, x, 70, { c: CA, w: 2, m }) + T(x, 63, "H⁺", "middle", { c: CA, b: 1 })));
    b += L(446, 62, 446, 145, { c: CA, w: 2, m }) + T(470, 60, "H⁺", "middle", { c: CA, b: 1 });
    b += T(150, 40, "H⁺   H⁺   H⁺   H⁺", "middle", { c: CA }) + T(380, 40, "H⁺   H⁺   H⁺", "middle", { c: CA });
    b += T(12, 18, "intermembrane space: high [H⁺] (proton gradient)", "", { b: 1 }) + T(12, 228, "matrix", "", { b: 1 }) + T(392, 158, "inner", "middle", { fs: 11 }) + T(392, 170, "membrane", "middle", { fs: 11 });
    b += T(77, 166, "NADH → NAD⁺", "middle", { fs: 11 }) + T(150, 186, "FADH₂ → FAD", "middle", { fs: 11 }) + T(329, 188, "½O₂ + 2H⁺ + 2e⁻ → H₂O", "middle", { fs: 11 });
    b += T(446, 206, "ADP + Pi → ATP", "middle", { fs: 11 }) + T(446, 222, "ATP synthase", "middle", { fs: 11, b: 1 });
    return S(510, 235, "Electron transport chain and chemiosmosis in the inner mitochondrial membrane", b, m);
  })();

  const RESP = (() => {
    const m = "ar-bh2-resp";
    let b = "";
    const bx = [[5, "Glycolysis", "cytoplasm"], [135, "Link reaction", "matrix"], [265, "Krebs cycle", "matrix"], [395, "ETC + chemiosmosis", "inner membrane"]];
    bx.forEach(([x, a, c], i) => { b += B(x, 30, 118, 44, [a, c], { b: 1, fs: 11 }); if (i < 3) b += A(m, x + 119, 52, x + 133, 52); });
    b += T(64, 18, "glucose (6C) →", "middle", { fs: 11 }) + T(194, 18, "2 pyruvate (3C) →", "middle", { fs: 11 }) + T(324, 18, "2 acetyl CoA (2C) →", "middle", { fs: 11 }) + T(454, 18, "NADH, FADH₂ →", "middle", { fs: 11 });
    const out = [["net 2 ATP", "2 NADH", "no O₂ needed"], ["2 CO₂", "2 NADH", ""], ["4 CO₂, 2 ATP", "6 NADH", "2 FADH₂"], ["most of the ATP", "O₂ = final e⁻", "acceptor → H₂O"]];
    out.forEach((o, i) => o.forEach((s, j) => s && (b += T(64 + 130 * i, 92 + j * 14, s, "middle", { fs: 11 }))));
    b += T(260, 145, "per glucose: the link reaction and Krebs cycle run twice", "middle", { fs: 11, c: CM });
    b += A(m, 64, 135, 64, 160) + B(5, 162, 505, 40, ["No O₂ (anaerobic): pyruvate → lactate (animals) or ethanol + CO₂ (yeast)", "this regenerates NAD⁺ so glycolysis can continue (net 2 ATP per glucose)"], { fs: 11 });
    return S(515, 208, "Overview of the stages of cell respiration", b, m);
  })();

  // cycle helper: arc from angle a1 to a2 (degrees clockwise from top) on circle (cx, cy, r)
  const pt = (cx, cy, r, a) => [+(cx + r * Math.sin(a * Math.PI / 180)).toFixed(1), +(cy - r * Math.cos(a * Math.PI / 180)).toFixed(1)];
  const arc = (cx, cy, r, a1, a2, m, c) => { const [x1, y1] = pt(cx, cy, r, a1), [x2, y2] = pt(cx, cy, r, a2); return P(`M${x1} ${y1}A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`, { m, c, w: 2 }); };

  const KREBS = (() => {
    const m = "ar-bh2-krebs", cx = 200, cy = 140, r = 75;
    let b = "";
    [[14, 76], [104, 166], [194, 256], [284, 346]].forEach(([a, z]) => (b += arc(cx, cy, r, a, z, m)));
    [[0, "4C"], [90, "6C"], [180, "5C"], [270, "4C"]].forEach(([a, s]) => { const [x, y] = pt(cx, cy, r, a); b += C(x, y, 15, { f: F }) + T(x, y + 4, s, "middle", { b: 1 }); });
    b += A(m, 318, 46, 262, 84) + T(320, 40, "acetyl group (2C)", "", { fs: 11 }) + T(320, 54, "from acetyl CoA", "", { fs: 11 });
    b += A(m, 256, 196, 300, 228) + T(305, 240, "CO₂ + NADH", "middle", { fs: 11, b: 1 });
    b += A(m, 144, 196, 100, 228) + T(95, 240, "CO₂ + NADH + ATP", "middle", { fs: 11, b: 1 });
    b += A(m, 144, 84, 100, 52) + T(95, 44, "FADH₂ + NADH", "middle", { fs: 11, b: 1 });
    b += T(cx, cy - 6, "per turn:", "middle", { fs: 11 }) + T(cx, cy + 8, "2 CO₂, 3 NADH,", "middle", { fs: 11 }) + T(cx, cy + 22, "1 FADH₂, 1 ATP", "middle", { fs: 11 });
    b += T(10, 18, "Krebs cycle (mitochondrial matrix)", "", { b: 1 });
    return S(420, 255, "Simplified Krebs cycle", b, m);
  })();

  const CALVIN = (() => {
    const m = "ar-bh2-calvin", cx = 220, cy = 140, r = 80;
    let b = arc(cx, cy, r, 22, 68, m) + arc(cx, cy, r, 112, 158, m) + arc(cx, cy, r, 202, 338, m);
    b += B(cx - 40, cy - r - 11, 80, 22, ["RuBP (5C)"], { b: 1 }) + B(cx + r - 36, cy - 11, 72, 22, ["2 GP (3C)"], { b: 1 }) + B(cx - 62, cy + r - 11, 124, 22, ["triose phosphate"], { b: 1 });
    b += A(m, 318, 50, 280, 82) + T(322, 46, "CO₂", "", { b: 1 }) + T(256, 100, "rubisco", "end", { i: 1, fs: 11 }) + T(256, 113, "(carboxylation)", "end", { fs: 10 });
    b += A(m, 318, 196, 282, 196) + T(322, 188, "ATP → ADP + Pi", "", { fs: 11 }) + T(322, 202, "NADPH → NADP⁺", "", { fs: 11 }) + T(322, 216, "(reduction)", "", { fs: 10 });
    b += T(130, 128, "ATP → ADP + Pi", "end", { fs: 11 }) + T(130, 142, "regeneration", "end", { fs: 10 }) + T(130, 154, "of RuBP", "end", { fs: 10 });
    b += A(m, cx, cy + r + 12, cx, cy + r + 34) + T(cx, cy + r + 48, "some triose phosphate → glucose, sucrose, starch, amino acids, lipids", "middle", { fs: 11 });
    b += T(10, 18, "Calvin cycle (stroma)", "", { b: 1 });
    return S(470, 280, "Calvin cycle", b, m);
  })();

  const THYL = (() => {
    const m = "ar-bh2-thyl";
    let b = R(10, 95, 540, 40, { f: F, r: 0, c: "none" }) + L(10, 95, 550, 95) + L(10, 135, 550, 135);
    b += R(50, 82, 52, 66, { f: CC, fo: ".35", r: 8 }) + T(76, 120, "PSII", "middle", { b: 1 });
    b += C(135, 115, 9, { f: F }) + T(135, 119, "PQ", "middle", { fs: 9 });
    b += R(165, 82, 50, 66, { f: CB, fo: ".3", r: 8 }) + T(184, 113, "cyt", "middle", { fs: 11, b: 1 }) + T(184, 126, "b₆f", "middle", { fs: 11, b: 1 });
    b += C(245, 150, 9, { f: F }) + T(245, 154, "PC", "middle", { fs: 9 });
    b += R(275, 82, 52, 66, { f: CC, fo: ".35", r: 8 }) + T(301, 120, "PSI", "middle", { b: 1 });
    b += R(491, 82, 28, 66, { f: CB, fo: ".3", r: 6 }) + C(505, 62, 20, { f: CB, fo: ".3" });
    b += `<polyline points="90,108 128,113 142,113 168,140 200,142 238,148 252,148 280,130 314,100 345,70" stroke="${CD}" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#${m})"/>` + T(118, 104, "e⁻", "middle", { c: CD, b: 1 });
    b += P("M40 20l12 18l-6 0l12 18", { c: CA, w: 2, m }) + T(20, 18, "light", "", { c: CA, fs: 11 }) + P("M262 20l12 18l-6 0l12 18", { c: CA, w: 2, m }) + T(280, 18, "light", "", { c: CA, fs: 11 });
    b += T(76, 172, "H₂O → ½O₂ + 2H⁺ + 2e⁻", "middle", { fs: 11 }) + T(76, 186, "(photolysis)", "middle", { fs: 10 });
    b += L(206, 70, 206, 160, { c: CA, w: 2, m }) + T(206, 64, "H⁺", "middle", { c: CA, b: 1 });
    b += T(322, 58, "NADP⁺ + 2e⁻ + H⁺ → NADPH", "", { fs: 11 });
    b += L(505, 165, 505, 90, { c: CA, w: 2, m }) + T(505, 180, "H⁺", "middle", { c: CA, b: 1 }) + T(505, 34, "ADP + Pi → ATP", "middle", { fs: 11 });
    b += T(330, 186, "H⁺  H⁺  H⁺  H⁺", "middle", { c: CA }) + T(420, 112, "thylakoid", "middle", { fs: 11 }) + T(420, 125, "membrane", "middle", { fs: 11 });
    b += T(12, 75, "stroma", "", { b: 1, fs: 11 }) + T(12, 215, "thylakoid space (lumen): high [H⁺]", "", { b: 1 }) + T(550, 215, "ATP synthase", "end", { fs: 11, b: 1 });
    return S(560, 225, "Light-dependent reactions in the thylakoid membrane", b, m);
  })();

  const H2 = {
    diagrams: [
      { title: "Calvin cycle: CO₂ concentration lowered at 10 min (light constant) - RuBP rises, GP falls", hl: true, x: [0, 20], y: [0, 10], xLabel: "Time / min", yLabel: "Concentration", grid: false, origin: false,
        curves: [
          { f: (x) => (x < 10 ? 4 : 4 + 4 * (1 - Math.exp(-(x - 10) / 2))), color: "b", label: "RuBP", labelX: 16 },
          { f: (x) => (x < 10 ? 7 : 7 - 4.5 * (1 - Math.exp(-(x - 10) / 2))), color: "a", label: "GP", labelX: 16 },
        ],
        vlines: [{ x: 10, label: "CO₂ lowered" }] },
      { title: "O₂ concentration in a suspension of respiring mitochondria: cyanide added at 8 min stops O₂ uptake", hl: true, x: [0, 16], y: [0, 10], xLabel: "Time / min", yLabel: "[O₂]", grid: false, origin: false,
        curves: [{ f: (x) => (x < 8 ? 9 - 0.6 * x : 4.2), color: "a" }],
        vlines: [{ x: 8, label: "cyanide" }],
        texts: [{ at: [1.2, 3.6], text: "slope = rate of O₂ uptake" }, { at: [9, 5], text: "flat: ETC blocked" }] },
    ],
    figures: [
      { title: "Mitochondrion", hl: true, caption: "Adaptations: cristae give a large surface area for the ETC and ATP synthase; small intermembrane space so a proton gradient builds quickly; matrix holds the Krebs cycle enzymes.", svg: MITO },
      { title: "Chloroplast", hl: true, caption: "Thylakoids (grana) = light-dependent reactions, large membrane area with photosystems; small thylakoid space for a steep H⁺ gradient; stroma = Calvin cycle enzymes (rubisco).", svg: CHLORO },
      { title: "Overview of cell respiration (per glucose)", hl: true, caption: "Learn the location and the products of each stage. Only glycolysis happens without oxygen.", svg: RESP },
      { title: "Krebs cycle (simplified)", hl: true, caption: "Two decarboxylations (6C → 5C → 4C) release CO₂; oxidations reduce NAD and FAD; one ATP by substrate-level phosphorylation per turn; the 4C compound is regenerated.", svg: KREBS },
      { title: "Electron transport chain and chemiosmosis", hl: true, caption: "Electrons (red) pass from carrier to carrier, releasing energy to pump H⁺ into the intermembrane space. H⁺ diffuse back through ATP synthase, which phosphorylates ADP.", svg: ETC },
      { title: "Light-dependent reactions (non-cyclic photophosphorylation)", hl: true, caption: "Photolysis supplies electrons to PSII; carriers pump H⁺ into the thylakoid space; PSI re-excites electrons to reduce NADP; H⁺ flow back through ATP synthase into the stroma.", svg: THYL },
      { title: "Calvin cycle", hl: true, caption: "Carboxylation (rubisco) → reduction of GP using ATP and NADPH → regeneration of RuBP using ATP. 6 turns fix 6 CO₂ to make one hexose.", svg: CALVIN },
    ],
    frames: [
      { title: "Draw and label a mitochondrion (with adaptations)", hl: true, star: true,
        paper: "P2", where: "Paper 2 · 4–5 marks · draw / label / annotate",
        q: "Draw a labelled diagram of a mitochondrion as seen in an electron micrograph and annotate it to show how its structure is adapted to its function.",
        marks: [
          "__outer membrane__ and __inner membrane__ shown as a double membrane, correctly labelled",
          "__cristae__ drawn as folds of the inner membrane; annotated as giving a __large surface area__ for the electron transport chain / ATP synthase",
          "__intermembrane space__ labelled; annotated as small so a __proton gradient__ builds up quickly",
          "__matrix__ labelled; annotated as containing the __enzymes of the Krebs cycle__ / link reaction",
          "__70S ribosomes__ and / or __naked circular DNA__ shown in the matrix",
        ],
        svg: MITO, svgCaption: "Cristae must be continuous with the inner membrane; ribosomes and DNA go in the matrix.",
        model: "The diagram shows a double membrane: a smooth outer membrane and an inner membrane folded into cristae. The cristae give a large surface area for the electron transport chain and ATP synthase. The intermembrane space between the membranes is small, so a proton gradient builds up quickly. The matrix contains the enzymes of the Krebs cycle and link reaction, plus 70S ribosomes and naked circular DNA.",
        accept: "\"inter-membrane space\"; mitochondrial DNA; ATP synthase shown as knobs on the cristae",
        reject: "cristae drawn as separate structures not joined to the inner membrane; ribosomes on the outer membrane; \"cytoplasm\" for matrix",
        tip: "畫 cristae 一定要同內膜連住，係內膜嘅摺疊。每個標籤加一句功能 = annotate。" },
      { title: "Annotate a diagram of the light-dependent reactions", hl: true,
        paper: "P2", where: "Paper 2 · 4–6 marks · thylakoid membrane diagram given or drawn",
        q: "Annotate a diagram of a thylakoid membrane to explain how light energy is used to produce ATP and reduced NADP.",
        marks: [
          "light excites electrons in __photosystem II__; electrons are replaced by __photolysis__ of water, releasing __oxygen__",
          "excited electrons pass along __electron carriers__ (PQ, cytochrome b₆f, PC) in the thylakoid membrane",
          "energy released is used to __pump protons into the thylakoid space__",
          "electrons are re-excited at __photosystem I__ and used to __reduce NADP__ in the stroma",
          "protons diffuse back into the stroma through __ATP synthase__, producing ATP (__chemiosmosis / photophosphorylation__)",
        ],
        svg: THYL,
        model: "Light excites electrons in photosystem II; these electrons are replaced by photolysis of water, which releases oxygen and protons. The excited electrons pass along electron carriers in the thylakoid membrane (plastoquinone, cytochrome b₆f, plastocyanin), and the energy released pumps protons into the thylakoid space. Electrons are re-excited at photosystem I and are used to reduce NADP to NADPH in the stroma. Protons diffuse back into the stroma through ATP synthase, producing ATP by chemiosmosis (photophosphorylation).",
        accept: "lumen for thylakoid space; NADPH / reduced NADP; H⁺ for protons",
        reject: "protons pumped into the stroma; \"photolysis at PSI\"; ATP made in the thylakoid space",
        tip: "方向：H⁺ 泵入 thylakoid space（lumen），再經 ATP 合酶返去 stroma。NADPH 同 ATP 都喺 stroma 嗰邊出。" },
      { title: "Sketch GP and RuBP changes when CO₂ is lowered", hl: true,
        paper: "P1B", where: "Paper 1B · 2–3 marks · sketch on the axes given",
        q: "An alga is kept in constant bright light. At 10 minutes the CO₂ concentration is suddenly lowered. Sketch the changes in RuBP and GP concentration and explain them.",
        marks: [
          "sketch: __RuBP rises__ and __GP falls__ after 10 min, levelling off",
          "less CO₂ for __carboxylation__ by rubisco, so less RuBP is used up / less GP formed",
          "light-dependent reactions continue, so ATP and NADPH still __regenerate RuBP__ / GP is still converted to triose phosphate",
        ],
        diagram: { title: "CO₂ lowered at 10 min", x: [0, 20], y: [0, 10], xLabel: "Time / min", yLabel: "Concentration", grid: false, origin: false,
          curves: [{ f: (x) => (x < 10 ? 4 : 4 + 4 * (1 - Math.exp(-(x - 10) / 2))), color: "b", label: "RuBP", labelX: 16 }, { f: (x) => (x < 10 ? 7 : 7 - 4.5 * (1 - Math.exp(-(x - 10) / 2))), color: "a", label: "GP", labelX: 16 }],
          vlines: [{ x: 10, label: "CO₂ lowered" }] },
        model: "After the CO₂ concentration is lowered, RuBP rises and GP falls, then both level off. Less CO₂ is available for carboxylation by rubisco, so less RuBP is used up and less GP is formed. The light-dependent reactions continue, so ATP and NADPH are still used to convert GP to triose phosphate and to regenerate RuBP.",
        accept: "glycerate-3-phosphate; \"RuBP accumulates\"",
        reject: "both curves the same direction; changes starting before 10 min",
        tip: "同熄燈題相反：減 CO₂ → RuBP 升、GP 跌。曲線要喺 10 分鐘先開始變。" },
    ],
    concepts: [],
  };
  // ======================================================== bio-11 (C2.2, C3.1)
  const NEURON = (() => {
    const m = "ar-b11-neu";
    let b = ["M50 66L30 40L18 32", "M30 40L28 22", "M46 100L24 120L10 124", "M24 120L22 140", "M62 60L60 30", "M58 110L52 140", "M92 72L110 50"].map((d) => P(d, { w: 2 })).join("");
    b += C(70, 85, 26, { f: F }) + C(66, 82, 9, { f: CM, fo: ".4" });
    b += L(96, 80, 432, 80) + L(96, 90, 432, 90);
    [115, 173, 231, 289, 347].forEach((x) => (b += R(x, 72, 50, 26, { f: CC, fo: ".25", r: 11 })));
    b += P("M432 80L470 58M432 85L474 85M432 90L470 112", { w: 2 }) + [[474, 56], [480, 85], [474, 114]].map(([x, y]) => C(x, y, 5, { f: CA, c: CA })).join("");
    b += R(487, 40, 32, 92, { f: CD, fo: ".15", r: 6 }) + T(503, 146, "muscle", "middle", { fs: 11 });
    b += A(m, 290, 125, 400, 125) + T(345, 142, "direction of impulse", "middle", { fs: 11 });
    b += lab(22, 138, 30, 158, "dendrites") + lab(82, 62, 100, 26, "cell body") + lab(70, 90, 100, 150, "nucleus");
    b += lab(169, 90, 190, 158, "node of Ranvier") + lab(227, 80, 240, 26, "axon") + lab(320, 72, 330, 26, "myelin sheath (Schwann cell)") + lab(474, 114, 455, 158, "motor end plates", "middle");
    return S(545, 175, "Labelled diagram of a motor neuron", b, m);
  })();

  const SYNAPSE = (() => {
    const m = "ar-b11-syn";
    let g = P("M150 0L150 60Q100 80 102 130Q104 170 220 172Q336 170 338 130Q340 80 290 60L290 0", { f: F });
    g += R(80, 200, 280, 70, { f: CB, fo: ".08", r: 0, c: "none" }) + L(80, 200, 360, 200, { w: 2 });
    g += E(150, 80, 18, 9, { f: CM, fo: ".3" }) + P("M138 80q6 -6 12 0t12 0", { w: 1 });
    [[170, 112], [200, 92], [232, 120], [262, 98], [200, 140], [282, 135]].forEach(([x, y]) => (g += C(x, y, 10, { f: CA, fo: ".12", c: CA }) + C(x - 3, y - 2, 1.8, { f: CA, c: "none" }) + C(x + 3, y + 2, 1.8, { f: CA, c: "none" }) + C(x + 2, y - 4, 1.8, { f: CA, c: "none" })));
    g += P("M236 167A10 10 0 1 1 256 167", { c: CA });
    [[238, 180], [248, 186], [258, 178], [266, 189], [276, 183], [228, 188]].forEach(([x, y]) => (g += C(x, y, 2, { f: CA, c: "none" })));
    [180, 215, 250, 285].forEach((x) => (g += R(x - 7, 196, 14, 10, { f: CB, fo: ".45", c: CB, r: 2 })));
    g += A(m, 220, 4, 220, 50) + T(228, 22, "action potential arrives", "", { fs: 11 });
    g += A(m, 60, 160, 101, 150, CD) + T(56, 164, "Ca²⁺ in", "end", { c: CD, fs: 11 }) + A(m, 382, 120, 340, 124, CD) + T(386, 124, "Ca²⁺", "", { c: CD, fs: 11 });
    g += L(285, 206, 285, 245, { c: CA, w: 2, m }) + T(292, 250, "Na⁺ in → depolarisation", "", { fs: 11, c: CA });
    g += lab(150, 30, 60, 25, "presynaptic neuron", "end") + lab(132, 80, 60, 70, "mitochondrion", "end") + lab(160, 112, 60, 118, "synaptic vesicle", "end");
    g += lab(130, 200, 100, 238, "postsynaptic membrane", "end") + lab(272, 182, 380, 160, "neurotransmitter") + lab(330, 188, 380, 190, "synaptic cleft") + lab(292, 200, 380, 215, "receptor");
    g += T(220, 262, "postsynaptic neuron", "middle", { fs: 11, b: 1 }) + T(246, 162, "exocytosis", "end", { fs: 9 });
    return S(565, 280, "Labelled diagram of a chemical synapse", `<g transform="translate(70,6)">${g}</g>`, m);
  })();

  const RESTING = (() => {
    const m = "ar-b11-rest";
    let b = R(10, 85, 440, 40, { f: F, r: 0, c: "none" }) + L(10, 85, 450, 85) + L(10, 125, 450, 125);
    b += R(118, 70, 54, 70, { f: CB, fo: ".3", r: 8 }) + T(145, 102, "Na⁺/K⁺", "middle", { fs: 10, b: 1 }) + T(145, 114, "pump", "middle", { fs: 10, b: 1 });
    b += L(130, 150, 130, 58, { c: CD, w: 2, m }) + T(126, 56, "3 Na⁺ out", "end", { c: CD, fs: 11 }) + L(160, 56, 160, 150, { c: CB, w: 2, m }) + T(166, 162, "2 K⁺ in", "", { c: CB, fs: 11 });
    b += T(145, 182, "ATP → ADP + Pi (active transport)", "middle", { fs: 11 });
    b += R(292, 70, 14, 70, { f: CC, fo: ".35", r: 3 }) + R(320, 70, 14, 70, { f: CC, fo: ".35", r: 3 }) + L(313, 150, 313, 58, { c: CB, w: 2, m }) + T(320, 56, "K⁺ leaks out (diffusion)", "", { c: CB, fs: 11 });
    b += T(312, 162, "K⁺ channel", "middle", { fs: 10 });
    b += T(230, 78, "+   +   +", "middle", { b: 1 }) + T(400, 78, "+   +   +", "middle", { b: 1 }) + T(230, 142, "−   −   −", "middle", { b: 1 }) + T(400, 142, "−   −   −", "middle", { b: 1 });
    b += T(12, 20, "outside: high [Na⁺], positive", "", { b: 1, fs: 11 }) + T(12, 205, "inside axon: high [K⁺], negative (proteins⁻)", "", { b: 1, fs: 11 }) + T(448, 205, "resting potential ≈ −70 mV", "end", { fs: 11, c: CA, b: 1 });
    return S(460, 215, "Resting potential: sodium-potassium pump and potassium leak channels", b, m);
  })();

  const SALT = (() => {
    const m = "ar-b11-salt";
    let b = L(10, 85, 490, 85) + L(10, 95, 490, 95);
    [[20, 90], [120, 90], [220, 90], [320, 90], [420, 70]].forEach(([x, w]) => (b += R(x, 72, w, 36, { f: CC, fo: ".25", r: 12 })));
    [115, 215, 315].forEach((x, i) => (b += P(`M${x + 3} 66Q${x + 50} 28 ${x + 97} 66`, { c: CA, w: 2, m }) + L(x, 128, x, 100, { c: CD, w: 1.5, m }) + T(x + 5, 124, "Na⁺", "", { c: CD, fs: 10 })));
    b += T(250, 18, "impulse 'jumps' from node to node = saltatory conduction (faster)", "middle", { fs: 11, b: 1 });
    b += lab(70, 108, 30, 140, "myelin sheath (insulates)") + lab(417, 92, 490, 140, "node of Ranvier: only site of depolarisation", "end");
    return S(500, 152, "Saltatory conduction along a myelinated axon", b, m);
  })();

  const REFLEX = (() => {
    const m = "ar-b11-ref";
    let b = E(330, 120, 90, 70, { f: F }) + P("M298 68Q330 102 362 68Q352 120 378 176Q330 146 282 176Q308 120 298 68Z", { f: CM, fo: ".35" }) + C(330, 120, 3);
    b += P("M40 62L192 55", { c: CA, w: 2 }) + E(210, 56, 18, 11, { f: CA, fo: ".15", c: CA }) + C(210, 56, 5, { f: CA, c: CA }) + P("M228 57Q292 60 320 86", { c: CA, w: 2, m });
    b += P("M322 92L318 148", { c: CC, w: 2, m }) + C(320, 118, 4.5, { f: CC, c: CC });
    b += C(342, 158, 6, { f: CB, c: CB }) + P("M336 160Q280 180 230 194L80 204", { c: CB, w: 2, m });
    b += E(52, 207, 30, 14, { f: CD, fo: ".2", c: CD }) + C(36, 62, 6, { f: CA, fo: ".3", c: CA });
    b += A(m, 90, 40, 140, 38) + T(115, 28, "sensory neuron", "middle", { fs: 11, c: CA, b: 1 });
    b += T(36, 45, "receptor (skin)", "middle", { fs: 11 }) + T(52, 236, "effector (muscle)", "middle", { fs: 11 }) + T(150, 218, "motor neuron", "middle", { fs: 11, c: CB, b: 1 });
    b += lab(210, 45, 210, 14, "dorsal root ganglion (cell bodies)", "middle") + lab(318, 132, 440, 140, "relay neuron", "") + lab(365, 160, 440, 175, "motor neuron cell body") + lab(390, 80, 430, 58, "white matter") + lab(352, 100, 430, 100, "grey matter");
    b += T(330, 210, "spinal cord (cross-section)", "middle", { fs: 11 });
    return S(585, 245, "Reflex arc for a pain withdrawal reflex", b, m);
  })();

  const PHOTOTROP = (() => {
    const m = "ar-b11-pt";
    let b = "";
    [70, 100, 130].forEach((y) => (b += A(m, 8, y, 52, y, CA)));
    b += P("M70 190L70 70Q85 40 100 70L100 190", { f: CC, fo: ".15", c: CC, w: 2 });
    [[92, 80], [93, 100], [94, 120], [93, 140], [92, 160]].forEach(([x, y]) => (b += C(x, y, 2.5, { f: CD, c: "none" })));
    b += A(m, 76, 70, 92, 72, CD) + T(105, 70, "auxin moves to the", "", { fs: 11 }) + T(105, 84, "shaded side", "", { fs: 11 });
    b += T(105, 120, "cells on the shaded side", "", { fs: 11 }) + T(105, 134, "elongate more", "", { fs: 11 }) + T(85, 208, "light from one side", "middle", { fs: 11 });
    [70, 100, 130].forEach((y) => (b += A(m, 236, y, 270, y, CA)));
    b += P("M300 190L300 135Q300 98 276 78Q284 50 298 62Q330 92 330 135L330 190", { f: CC, fo: ".15", c: CC, w: 2 });
    [[324, 100], [328, 120], [329, 145], [329, 170]].forEach(([x, y]) => (b += C(x, y, 2.5, { f: CD, c: "none" })));
    b += T(315, 208, "shoot bends towards the light", "middle", { fs: 11 }) + T(10, 18, "Phototropism in a shoot (auxin = red dots)", "", { b: 1, fs: 12 });
    return S(420, 215, "Phototropism: auxin redistribution in a shoot lit from one side", b, m);
  })();

  const EPSP = (t, t0, A) => (t > t0 ? A * ((t - t0) / 0.4) * Math.exp(1 - (t - t0) / 0.4) : 0);
  const SUMV = (t) => Math.max(-80, Math.min(40, -70 + EPSP(t, 1, 8) + (t < 5 ? EPSP(t, 4, 10) + EPSP(t, 4.5, 10) : 15 * Math.exp(-(t - 5) * 4) + 95 * Math.exp(-((t - 5.35) ** 2) / 0.02) - 8 * Math.exp(-((t - 6.1) ** 2) / 0.15))));
  const SPEED = { title: "Conduction speed vs axon diameter", x: [0, 20], y: [0, 120], xLabel: "Axon diameter / µm", yLabel: "Speed / m s⁻¹", grid: false,
    curves: [{ f: (x) => 5.5 * x, color: "a", label: "myelinated", labelX: 12 }, { f: (x) => 2 * Math.sqrt(x), color: "b" }], texts: [{ at: [11, 20], text: "unmyelinated" }] };

  const T11 = {
    diagrams: [
      { title: "Membrane permeability during an action potential: Na⁺ channels open first, then K⁺ channels", x: [0, 4], y: [0, 11], xLabel: "Time / ms", yLabel: "Permeability", grid: false, origin: false,
        curves: [{ f: (x) => 10 * gauss(x, 1, 0.15), color: "a", label: "Na⁺", labelX: 0.72 }, { f: (x) => 7 * gauss(x, 1.8, 0.4), color: "b", label: "K⁺", labelX: 2.1 }],
        texts: [{ at: [1.3, 9.5], text: "depolarisation = Na⁺ in" }, { at: [2.4, 5.5], text: "repolarisation = K⁺ out" }] },
      Object.assign({}, SPEED, { title: "Conduction speed: faster with myelination and with larger diameter" }),
      { title: "Summation (HL): one EPSP stays below threshold; EPSPs summed reach threshold → action potential", hl: true, x: [0, 9], y: [-80, 40], xLabel: "Time / ms", yLabel: "mV", grid: false, origin: false,
        curves: [{ f: SUMV, color: "a" }], hlines: [{ y: -55, label: "threshold −55" }, { y: -70, label: "resting −70" }],
        texts: [{ at: [0.3, -45], text: "single EPSP" }, { at: [3.2, -35], text: "summation" }] },
    ],
    figures: [
      { title: "Motor neuron", caption: "Dendrites → cell body → axon (myelinated, with nodes of Ranvier) → motor end plates on a muscle fibre.", svg: NEURON },
      { title: "Chemical synapse", caption: "Arrival of action potential → Ca²⁺ in → vesicles release neurotransmitter by exocytosis → diffuses across the cleft → binds receptors → Na⁺ in → depolarisation. Neurotransmitter is then broken down (acetylcholinesterase) or reabsorbed.", svg: SYNAPSE },
      { title: "Resting potential", caption: "The Na⁺/K⁺ pump uses ATP to move 3 Na⁺ out for every 2 K⁺ in; K⁺ also leaks out, so the inside is negative (about −70 mV).", svg: RESTING },
      { title: "Saltatory conduction", caption: "Myelin insulates the axon, so depolarisation only occurs at the nodes; local currents jump between nodes, making conduction much faster.", svg: SALT },
      { title: "Reflex arc (pain withdrawal)", caption: "Receptor → sensory neuron (cell body in dorsal root ganglion) → relay neuron (grey matter) → motor neuron → effector muscle. The brain is not needed, so the response is fast.", svg: REFLEX },
      { title: "Phototropism (auxin)", hl: true, caption: "Auxin is moved to the shaded side by PIN proteins; it stimulates H⁺ pumping that loosens cell walls, so shaded-side cells elongate more and the shoot bends towards light.", svg: PHOTOTROP },
    ],
    frames: [
      { title: "Draw and label a motor neuron", star: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · drawing",
        q: "Draw a labelled diagram of a motor neuron.",
        marks: [
          "__dendrites__ shown as branched extensions of the cell body",
          "__cell body__ with a __nucleus__",
          "long __axon__ with a __myelin sheath__ in sections, separated by __nodes of Ranvier__",
          "branched __axon terminals / motor end plates__ (synaptic knobs) at the end of the axon",
        ],
        svg: NEURON,
        model: "The drawing shows branched dendrites on a cell body containing a nucleus. A long axon leaves the cell body and is covered by a myelin sheath in sections (Schwann cells), separated by gaps called nodes of Ranvier. The axon ends in branched axon terminals forming motor end plates on a muscle fibre. An arrow shows the impulse travelling from the cell body towards the terminals.",
        accept: "terminal buttons / synaptic knobs / end plates; Schwann cells for myelin",
        reject: "myelin drawn as one continuous sheath with no nodes; nucleus in the axon",
        tip: "Motor neuron：細胞體喺一端，軸突好長，髓鞘一段段，中間係 node of Ranvier。加個箭咀講衝動方向更穩陣。" },
      { title: "Label a diagram of a synapse", star: true,
        paper: "P1B", where: "Paper 1B / 2 · 3–4 marks · diagram given",
        q: "Label the presynaptic neuron, synaptic vesicle, synaptic cleft, receptor and postsynaptic membrane on a diagram of a synapse, and state the role of calcium ions.",
        marks: [
          "__presynaptic neuron__ (knob) and __postsynaptic membrane__ correctly identified",
          "__synaptic vesicles__ containing neurotransmitter in the presynaptic knob",
          "__synaptic cleft__ = the gap between the two membranes",
          "__receptors__ on the postsynaptic membrane",
          "Ca²⁺ diffuse in when the action potential arrives, causing __vesicles to fuse__ with the membrane / __exocytosis__ of neurotransmitter",
        ],
        svg: SYNAPSE,
        model: "The presynaptic neuron ends in a knob containing synaptic vesicles filled with neurotransmitter and mitochondria to supply ATP. The synaptic cleft is the narrow gap between the presynaptic membrane and the postsynaptic membrane, which carries receptor proteins. When an action potential arrives, voltage-gated channels open and Ca²⁺ diffuse into the knob, causing the vesicles to fuse with the presynaptic membrane and release neurotransmitter by exocytosis.",
        accept: "acetylcholine for neurotransmitter; ligand-gated ion channel for receptor",
        reject: "receptors on the presynaptic membrane; vesicles in the cleft; \"the impulse jumps the gap\"",
        tip: "囊泡喺突觸前，受體喺突觸後。Ca²⁺ 係「入」突觸前末梢，觸發胞吐。" },
      { title: "Sketch conduction speed against axon diameter", 
        paper: "P1B", where: "Paper 1B · 2–3 marks · graph sketch or data interpretation",
        q: "Sketch graphs to show how the speed of nerve impulses varies with axon diameter in myelinated and unmyelinated axons, and explain the difference.",
        marks: [
          "both lines show speed __increasing with diameter__",
          "myelinated line __much steeper / higher__ at every diameter",
          "myelin insulates, so depolarisation only at __nodes of Ranvier__ / __saltatory conduction__",
          "larger diameter = __less resistance__ to the local currents (ions flow more easily)",
        ],
        diagram: SPEED,
        model: "Both curves rise: speed increases with axon diameter because a wider axon offers less resistance to the local currents. The myelinated curve is much steeper and higher at every diameter, because myelin insulates the axon so that depolarisation only occurs at the nodes of Ranvier and the impulse jumps from node to node (saltatory conduction).",
        accept: "\"jumps between nodes\"; lower internal resistance",
        reject: "\"myelin conducts the impulse\"; speed decreasing with diameter",
        tip: "兩條線都升；有髓鞘條線斜好多。解釋要講 saltatory conduction 同大直徑阻力細。" },
      { title: "Label a reflex arc", 
        paper: "P1B", where: "Paper 1B · 2–3 marks · diagram of a spinal reflex given",
        q: "Identify the structures of a pain withdrawal reflex arc on a diagram of the spinal cord and state the role of the relay neuron.",
        marks: [
          "__receptor__ (pain receptor in the skin) → __sensory neuron__ entering the spinal cord through the dorsal root",
          "__relay neuron__ in the __grey matter__ of the spinal cord connects the sensory neuron to the motor neuron",
          "__motor neuron__ leaves the spinal cord to the __effector__ (muscle), which contracts",
        ],
        svg: REFLEX,
        model: "A pain receptor in the skin stimulates a sensory neuron, which carries impulses into the spinal cord through the dorsal root; its cell body is in the dorsal root ganglion. In the grey matter a relay neuron passes the impulse to a motor neuron. The motor neuron carries the impulse out through the ventral root to the effector muscle, which contracts to withdraw the limb. The brain is not involved, so the response is rapid.",
        accept: "interneuron for relay neuron; skeletal muscle as effector",
        reject: "sensory neuron going directly to the effector; relay neuron in the white matter",
        tip: "次序：receptor → sensory → relay（灰質）→ motor → effector。唔經大腦所以快。" },
      { title: "Sketch and explain summation of EPSPs", hl: true,
        paper: "P2", where: "Paper 2 · 3 marks · membrane potential graph",
        q: "Sketch a graph of postsynaptic membrane potential to show how summation of excitatory postsynaptic potentials can trigger an action potential.",
        marks: [
          "a single EPSP is a __small depolarisation__ that stays __below the threshold__ (−55 mV) and fades",
          "several EPSPs arriving close together (temporal) or from several synapses (spatial) __add together__",
          "when the summed depolarisation __reaches threshold__, an __action potential__ is fired (all-or-nothing)",
        ],
        diagram: { title: "EPSPs and summation", x: [0, 9], y: [-80, 40], xLabel: "Time / ms", yLabel: "mV", grid: false, origin: false, curves: [{ f: SUMV, color: "a" }], hlines: [{ y: -55, label: "threshold" }, { y: -70, label: "resting" }] },
        model: "A single excitatory postsynaptic potential is a small depolarisation that stays below the threshold of about −55 mV and fades back to the resting potential of −70 mV. When several EPSPs arrive close together in time (temporal summation) or from several presynaptic neurons at once (spatial summation), their depolarisations add together. Once the summed depolarisation reaches the threshold, voltage-gated Na⁺ channels open and an all-or-nothing action potential is fired.",
        accept: "\"add up\" for summation; −50 to −55 mV for threshold",
        reject: "a single EPSP drawn reaching +30 mV; threshold drawn above 0 mV",
        tip: "單一個 EPSP 唔夠 threshold，疊加先夠。分 temporal（時間）同 spatial（空間）。" },
    ],
  };
  // ======================================================== bio-12 (C3.2)
  const ANTIBODY = (() => {
    const W = (d, c) => `<path d="${d}" stroke="${c || "currentColor"}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    const mir = (pts) => pts.map(([x, y]) => [400 - x, y]);
    const pl = (pts) => "M" + pts.map((p) => p.join(" ")).join("L");
    let b = "";
    const hv = [[192, 230], [192, 130], [130, 62]], lt = [[170.9, 130.6], [118, 73]];
    [hv, mir(hv)].forEach((p) => (b += W(pl(p))));
    [lt, mir(lt)].forEach((p) => (b += W(pl(p), CM)));
    [[[151.7, 85.8], [130, 62]], [[139.9, 96.6], [118, 73]]].forEach((p) => (b += W(pl(p), CA) + W(pl(mir(p)), CA)));
    b += L(192, 140, 208, 140, { c: CD, w: 2 }) + L(192, 150, 208, 150, { c: CD, w: 2 }) + L(173, 110, 162, 120, { c: CD, w: 2 }) + L(227, 110, 238, 120, { c: CD, w: 2 });
    b += `<polygon points="96,46 118,36 116,58" fill="${CD}" fill-opacity=".35" stroke="${CD}"/>`;
    b += lab(105, 42, 70, 22, "antigen", "end") + lab(122, 68, 70, 92, "antigen-binding site", "end") + lab(192, 190, 130, 200, "heavy chain", "end");
    b += lab(285, 77, 320, 50, "variable region") + lab(258, 105, 320, 105, "light chain") + lab(208, 145, 260, 160, "disulfide bonds") + lab(208, 215, 260, 215, "constant region");
    return S(500, 245, "Structure of an antibody", `<g transform="translate(55,0)">${b}</g>`);
  })();

  const CLOT = (() => {
    const m = "ar-b12-clot";
    const rows = [["Damage to a blood vessel wall"], ["Platelets and damaged cells release clotting factors"], ["Prothrombin → thrombin (active enzyme)"], ["Fibrinogen (soluble) → fibrin (insoluble fibres)"], ["Fibrin mesh traps platelets and red blood cells → clot"], ["Clot seals the wound: stops blood loss and pathogen entry"]];
    let b = "";
    rows.forEach((r, i) => { b += B(25, 5 + i * 46, 370, 30, r, { f: i === 3 ? CA : F }); if (i) b += A(m, 210, i * 46 - 10, 210, i * 46 + 4); });
    return S(420, 275, "Blood clotting cascade", b.replace(`fill="${CA}"`, `fill="${CA}" fill-opacity=".2"`), m);
  })();

  const CLONAL = (() => {
    const m = "ar-b12-clon";
    let b = B(5, 15, 155, 44, ["Macrophage engulfs pathogen", "and presents its antigen"], { fs: 11 }) + A(m, 162, 37, 186, 37);
    b += B(190, 15, 160, 44, ["Helper T cell with matching", "receptor is activated"], { fs: 11 }) + A(m, 352, 37, 381, 37) + T(270, 76, "releases cytokines", "middle", { fs: 10, c: CM });
    b += B(385, 15, 150, 44, ["B cell with matching", "antibody is activated"], { fs: 11 }) + A(m, 460, 61, 460, 96);
    b += B(385, 100, 150, 44, ["B cell divides by mitosis", "(clonal expansion)"], { fs: 11 }) + A(m, 430, 146, 352, 188) + A(m, 475, 146, 475, 188);
    b += B(270, 190, 140, 44, ["Plasma cells: secrete", "many antibodies"], { fs: 11 }) + B(420, 190, 115, 44, ["Memory cells:", "long-term immunity"], { fs: 11 });
    b += T(10, 120, "Specific: only the clone that", "", { fs: 11 }) + T(10, 134, "matches the antigen is selected", "", { fs: 11 }) + T(10, 160, "(clonal selection)", "", { fs: 11, b: 1 });
    return S(540, 240, "Activation of B cells and clonal selection", b, m);
  })();

  const PHAGO = (() => {
    let b = "";
    const bact = (x, y) => R(x - 9, y - 5, 18, 10, { f: CD, fo: ".5", c: CD, r: 5 });
    [55, 185, 315, 445].forEach((cx, i) => {
      b += C(cx, 70, 40, { f: F }) + E(cx - 14, 82, 10, 6, { f: CM, fo: ".45" });
      if (i === 0) b += bact(cx + 52, 34);
      if (i === 1) b += P(`M${cx + 24} 40Q${cx + 30} 20 ${cx + 50} 26M${cx + 36} 58Q${cx + 58} 56 ${cx + 58} 42`, { w: 2 }) + bact(cx + 42, 40);
      if (i === 2) b += C(cx + 12, 58, 13, { c: CB }) + bact(cx + 12, 58);
      if (i === 3) b += C(cx + 12, 58, 13, { c: CB }) + C(cx + 12, 54, 3, { f: CD, fo: ".5", c: "none" }) + C(cx + 17, 62, 2.5, { f: CD, fo: ".5", c: "none" }) + C(cx - 4, 44, 5, { f: CC, fo: ".5", c: CC }) + C(cx + 28, 44, 5, { f: CC, fo: ".5", c: CC });
    });
    ["1 recognises pathogen", "2 engulfs it (pseudopodia)", "3 inside a phagosome", "4 lysosomes fuse: digested"].forEach((s, i) => (b += T(55 + 130 * i, 128, s, "middle", { fs: 10.5 })));
    return S(520, 135, "Stages of phagocytosis", b);
  })();

  const T12 = {
    diagrams: [
      { title: "Herd immunity threshold = 1 − 1/R₀: more infectious diseases need higher vaccination coverage", x: [1, 16], y: [0, 100], xLabel: "R₀", yLabel: "% immune needed", grid: false, origin: false,
        curves: [{ f: (x) => 100 * (1 - 1 / x), color: "a" }], points: [{ at: [3, 66.7], label: "R₀ = 3: 67%" }, { at: [15, 93.3] }], texts: [{ at: [10.5, 84], text: "measles ≈ 93%" }] },
      { title: "Epidemic curve: control measures (isolation, vaccination) lower and delay the peak", x: [0, 100], y: [0, 10], xLabel: "Time / days", yLabel: "New cases", grid: false, origin: false,
        curves: [{ f: (x) => 9 * gauss(x, 35, 9), color: "a", label: "no measures", labelX: 40 }, { f: (x) => 4 * gauss(x, 55, 16), color: "b", label: "with measures", labelX: 70 }],
        hlines: [{ y: 5, label: "healthcare capacity" }] },
      { title: "Antibiotic resistance: % resistant bacteria rises when an antibiotic is used widely (selection)", x: [0, 20], y: [0, 100], xLabel: "Years of antibiotic use", yLabel: "% resistant", grid: false, origin: false,
        curves: [{ f: (x) => 100 / (1 + Math.exp(-(x - 9) / 1.8)), color: "a" }], texts: [{ at: [0.5, 15], text: "rare mutation" }, { at: [11.5, 60], text: "resistant survive, reproduce" }] },
    ],
    figures: [
      { title: "Antibody (immunoglobulin)", caption: "Four polypeptide chains (2 heavy, 2 light) held by disulfide bonds. The variable regions form two identical antigen-binding sites; the constant region binds phagocytes.", svg: ANTIBODY },
      { title: "Blood clotting", caption: "Clotting factors trigger a cascade; thrombin is the enzyme that converts soluble fibrinogen into insoluble fibrin.", svg: CLOT },
      { title: "Antibody production (clonal selection)", caption: "Antigen presentation → helper T cell → B cell activation → clonal expansion → plasma cells (antibodies) + memory cells.", svg: CLONAL },
      { title: "Phagocytosis (innate immunity)", caption: "Non-specific: phagocytes engulf any recognised pathogen by endocytosis and digest it with lysosomal enzymes.", svg: PHAGO },
    ],
    frames: [
      { title: "Draw and label the structure of an antibody", star: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · drawing",
        q: "Draw a labelled diagram of an antibody molecule.",
        marks: [
          "__Y-shaped__ molecule made of __two heavy chains and two light chains__",
          "__variable regions__ at the tips of the arms forming two __antigen-binding sites__",
          "__constant region__ (stem and lower arms) shown",
          "__disulfide bonds__ holding the chains together",
        ],
        svg: ANTIBODY,
        model: "An antibody is a Y-shaped protein made of four polypeptides: two long heavy chains and two shorter light chains, held together by disulfide bonds. The tips of both arms are variable regions whose shape differs between antibodies; they form two identical antigen-binding sites complementary to one antigen. The rest of the molecule is the constant region, which is the same in all antibodies of a class and binds to phagocytes.",
        accept: "immunoglobulin; \"binding site\" for antigen-binding site; S–S bridges",
        reject: "antigen drawn binding to the stem / constant region; only one binding site",
        tip: "Y 形、4 條鏈（2 重 2 輕）、兩個相同嘅 antigen-binding site 喺手臂尖。" },
      { title: "Sketch the spread of antibiotic resistance", 
        paper: "P1B", where: "Paper 1B · 3 marks · graph of % resistant bacteria",
        q: "Sketch the change in the percentage of resistant bacteria in a population exposed to an antibiotic over many years, and explain the shape of the curve.",
        marks: [
          "curve starts __low__ (resistance arises by a rare __random mutation__) then rises in an __S-shape__ towards 100%",
          "the antibiotic kills __susceptible__ bacteria; __resistant bacteria survive__ and reproduce",
          "resistance alleles are passed on (and by __plasmids / horizontal gene transfer__), so their frequency increases (__natural selection__)",
        ],
        diagram: { title: "% resistant bacteria", x: [0, 20], y: [0, 100], xLabel: "Years of antibiotic use", yLabel: "% resistant", grid: false, origin: false, curves: [{ f: (x) => 100 / (1 + Math.exp(-(x - 9) / 1.8)), color: "a" }] },
        model: "The curve starts low, because resistance first arises by a rare random mutation, then rises in an S-shape towards 100%. The antibiotic kills susceptible bacteria, while resistant bacteria survive and reproduce with less competition. Resistance alleles are passed on to offspring and to other bacteria on plasmids by horizontal gene transfer, so their frequency increases by natural selection.",
        accept: "sigmoid / logistic curve; \"selection pressure\"",
        reject: "\"bacteria become resistant because they are exposed\"; \"antibiotic causes the mutation\"",
        tip: "抗生素唔會「製造」突變，只係篩選已經存在嘅抗藥突變。" },
    ],
    concepts: [
      { h: "Antibody structure", b: "<p>Antibodies (immunoglobulins) are Y-shaped proteins of <strong>four polypeptide chains</strong> (2 heavy, 2 light) held by <strong>disulfide bonds</strong> - an example of quaternary structure. The <strong>variable regions</strong> at the arm tips form two identical <strong>antigen-binding sites</strong> with a shape complementary to one specific antigen; the <strong>constant region</strong> is recognised by phagocytes. Antibodies act by agglutination (clumping pathogens), neutralising toxins, opsonisation (marking for phagocytes) and activating complement.</p>" },
    ],
  };
  // ======================================================== bio-13 (C4.2)
  const PYR_E = (() => {
    let b = T(230, 18, "Pyramid of energy (kJ m⁻² yr⁻¹)", "middle", { b: 1 });
    [["producers", "21 000", 300], ["primary consumers", "1 900", 190], ["secondary consumers", "160", 100], ["tertiary consumers", "14", 40]].forEach(([n, v, w], i) => {
      const y = 150 - i * 38;
      b += R(230 - w / 2, y, w, 32, { f: i ? CA : CC, fo: (0.15 + i * 0.1).toFixed(2), r: 2 }) + T(230 - w / 2 - 6, y + 20, n, "end", { fs: 11 }) + T(230 + w / 2 + 6, y + 20, v, "", { fs: 11, b: 1 });
    });
    return S(460, 190, "Pyramid of energy", b);
  })();

  const FLOW = (() => {
    const m = "ar-b13-flow";
    let b = C(24, 60, 16, { f: CA, fo: ".3", c: CA }) + T(24, 30, "Sun", "middle", { fs: 11 }) + A(m, 42, 60, 58, 60);
    const bx = [[60, "producers"], [200, "primary", "consumers"], [340, "secondary", "consumers"], [470, "tertiary", "consumers"]];
    bx.forEach(([x, ...t], i) => {
      const w = i === 3 ? 70 : 100;
      b += B(x, 40, w, 40, t, { fs: 11 });
      if (i < 3) b += A(m, x + w + 1, 60, bx[i + 1][0] - 2, 60);
      b += L(x + 25, 82, x + 25, 112, { c: CD, w: 2, m }) + T(x + 25, 126, "heat (R)", "middle", { fs: 10, c: CD });
      b += L(x + w - 20, 82, x + w - 20, 171, { d: 1, m });
    });
    b += B(60, 173, 480, 34, ["dead organisms, faeces → decomposers (saprotrophs) → heat lost in respiration"], { fs: 11 });
    b += T(300, 236, "Energy flows in one direction and is lost as heat; it is not recycled.", "middle", { fs: 11, b: 1 });
    return S(545, 245, "Energy flow through a food chain", b, m);
  })();

  const CCYCLE = (() => {
    const m = "ar-b13-cc";
    let b = B(180, 8, 180, 34, ["CO₂ in the atmosphere"], { b: 1 }) + B(50, 130, 110, 36, ["producers"]) + B(210, 130, 120, 36, ["consumers"]) + B(400, 130, 130, 36, ["dead matter /", "decomposers"], { fs: 11, lh: 13 });
    b += B(400, 250, 130, 44, ["fossil fuels", "(coal, oil, gas, peat)"], { fs: 11 }) + B(10, 250, 150, 44, ["oceans: dissolved", "CO₂ / HCO₃⁻"], { fs: 11 });
    b += A(m, 195, 44, 98, 127, CC) + T(138, 92, "photosynthesis", "end", { fs: 11, c: CC });
    b += A(m, 128, 128, 222, 46, CD) + A(m, 270, 128, 270, 46, CD) + A(m, 460, 128, 345, 46, CD);
    b += T(180, 100, "respiration", "", { fs: 10, c: CD }) + T(274, 95, "respiration", "", { fs: 10, c: CD }) + T(410, 88, "respiration", "", { fs: 10, c: CD });
    b += A(m, 160, 148, 208, 148) + T(184, 140, "feeding", "middle", { fs: 10 }) + A(m, 330, 148, 398, 148) + T(364, 128, "death,", "middle", { fs: 10 }) + T(364, 140, "faeces", "middle", { fs: 10 });
    b += P("M110 168Q260 230 410 168", { m }) + T(260, 214, "death", "middle", { fs: 10 });
    b += A(m, 465, 168, 465, 248) + T(458, 215, "fossilisation", "end", { fs: 10 }) + T(458, 228, "(no decay)", "end", { fs: 10 });
    b += P("M525 250L525 25L362 25", { c: CD, m }) + T(518, 112, "combustion", "end", { fs: 10, c: CD });
    b += P("M25 248L25 20L178 20", { m }) + P("M178 36L40 36L40 248", { m }) + T(46, 215, "diffusion", "", { fs: 10 });
    return S(540, 300, "The carbon cycle", b, m);
  })();

  const WEB = (() => {
    const m = "ar-b13-web";
    const n = { grass: [280, 205], rabbit: [170, 145], grasshopper: [280, 145], mouse: [390, 145], fox: [170, 85], frog: [280, 85], snake: [330, 25], hawk: [440, 25] };
    let b = "";
    [["grass", "rabbit"], ["grass", "grasshopper"], ["grass", "mouse"], ["grasshopper", "frog"], ["rabbit", "fox"], ["mouse", "fox"], ["frog", "snake"], ["mouse", "snake"], ["mouse", "hawk"]].forEach(([a, z]) => (b += A(m, n[a][0], n[a][1] - 11, n[z][0] + (n[z][0] - n[a][0]) * 0, n[z][1] + 12)));
    b += A(m, 370, 25, 398, 25);
    Object.entries(n).forEach(([k, [x, y]]) => (b += B(x - 40, y - 11, 80, 22, [k], { fs: 11, f: k === "grass" ? CC : F })));
    ["producer", "primary consumers", "secondary consumers", "tertiary consumers"].forEach((s, i) => (b += T(5, 209 - i * 60, s, "", { fs: 10, c: CM })));
    b += T(5, 240, "Arrows point from food to feeder: the direction of energy flow.", "", { fs: 11, b: 1 });
    return S(490, 248, "Food web with trophic levels", b.replace(`fill="${CC}"`, `fill="${CC}" fill-opacity=".25"`), m);
  })();

  const PYR_N = (() => {
    let b = T(190, 16, "Pyramid of numbers (inverted)", "middle", { b: 1 });
    [["1 oak tree", 24], ["5 000 caterpillars", 300], ["60 birds", 120]].forEach(([n, w], i) => {
      const y = 110 - i * 36;
      b += R(190 - w / 2, y, w, 30, { f: i ? CA : CC, fo: ".25", r: 2 }) + T(i === 0 ? 190 + w / 2 + 8 : 190, y + 19, n, i === 0 ? "" : "middle", { fs: 11 });
    });
    return S(380, 150, "Inverted pyramid of numbers", b);
  })();

  const T13 = {
    diagrams: [
      { title: "Annual CO₂ cycle (Northern Hemisphere): falls in summer (photosynthesis > respiration), rises in winter", x: [0, 12], y: [404, 421], xLabel: "Month", yLabel: "CO₂ / ppm", grid: false, origin: false,
        curves: [{ f: (x) => 412.5 + 3.5 * Math.cos((2 * Math.PI * (x - 4.5)) / 12), color: "a" }],
        texts: [{ at: [3, 417.5], text: "max ≈ May" }, { at: [8.6, 408.2], text: "min ≈ Sep–Oct" }] },
    ],
    figures: [
      { title: "Pyramid of energy", caption: "Each bar = energy per unit area per year. Always a true pyramid: only ~10% (typically 5–20%) passes to the next level. Draw bars to scale when values are given.", svg: PYR_E },
      { title: "Energy flow diagram", caption: "Energy enters as light, is lost as heat from respiration at every level, and passes to decomposers in dead matter and faeces.", svg: FLOW },
      { title: "Carbon cycle", caption: "Know each flux: photosynthesis, respiration, feeding, death, decomposition, fossilisation, combustion and diffusion between air and oceans.", svg: CCYCLE },
      { title: "Food web", caption: "An organism can occupy more than one trophic level (e.g. a fox eating rabbits and mice is a secondary consumer; a hawk eating mice and snakes is tertiary and quaternary).", svg: WEB },
      { title: "Inverted pyramid of numbers", caption: "Numbers pyramids can be inverted (one large producer); energy pyramids cannot.", svg: PYR_N },
    ],
    frames: [
      { title: "Draw an energy flow diagram for a food chain", star: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · diagram",
        q: "Draw a diagram to show the flow of energy through a food chain of three trophic levels.",
        marks: [
          "boxes for __producers → primary consumers → secondary consumers__ with arrows in the direction of energy flow",
          "__light / sunlight__ shown as the energy source entering producers",
          "__heat lost by respiration__ shown from every trophic level",
          "energy passing to __decomposers / saprotrophs__ in dead organisms and faeces",
          "arrows / boxes become __smaller__ at each level (less energy passed on)",
        ],
        svg: FLOW,
        model: "Sunlight enters the producers, which pass energy as chemical energy to primary consumers and then to secondary consumers, with arrows in the direction of energy flow. Every trophic level loses energy as heat from respiration, shown by arrows leaving each box. Dead organisms and faeces pass energy to decomposers, which also lose heat. The arrows get narrower along the chain because only a small fraction of energy passes to the next level.",
        accept: "saprotrophs / detritivores; R for respiration",
        reject: "energy arrows looping back to producers (energy is not recycled); arrows pointing from eater to food",
        tip: "能量唔會循環！箭咀由被食者指去食者，每層都有「熱能 (respiration)」離開。" },
      { title: "Construct a carbon cycle diagram", star: true,
        paper: "P2", where: "Paper 2 · 4 marks · diagram",
        q: "Construct a diagram of the carbon cycle showing the processes that transfer carbon between the atmosphere, organisms and fossil fuels.",
        marks: [
          "__photosynthesis__: atmospheric CO₂ → producers",
          "__respiration__: producers, consumers and decomposers → atmospheric CO₂",
          "__feeding__ (producers → consumers) and __death / decomposition__ to decomposers",
          "__fossilisation__ of incompletely decomposed matter and __combustion__ of fossil fuels returning CO₂",
          "__diffusion__ of CO₂ between the atmosphere and the oceans",
        ],
        svg: CCYCLE,
        model: "Atmospheric CO₂ is fixed by producers in photosynthesis. Carbon passes to consumers by feeding, and to decomposers when organisms die or egest faeces. Producers, consumers and decomposers all return CO₂ to the atmosphere by respiration. Where decomposition is incomplete (e.g. waterlogged, acidic soils) organic matter forms peat and fossil fuels, whose combustion releases CO₂. CO₂ also diffuses between the atmosphere and the oceans, where it dissolves and forms hydrogencarbonate ions.",
        accept: "carbon sink / store for boxes; \"burning\" for combustion",
        reject: "arrow from atmosphere to consumers; \"respiration absorbs CO₂\"",
        tip: "每條箭咀都要寫過程名。記得 decomposers 都有 respiration。" },
    ],
  };
  // ======================================================== bio-14 (D1.1-1.3)
  const rungs = (x1, x2, y1, y2, step) => { let s = ""; for (let x = x1; x <= x2; x += step) s += L(x, y1, x, y2, { w: 1, c: CM }); return s; };
  const REPL = (() => {
    const m = "ar-b14-rep";
    let b = rungs(340, 490, 92, 108, 12) + L(330, 92, 495, 92, { w: 2 }) + L(330, 108, 495, 108, { w: 2 });
    b += P("M330 92Q305 52 280 50L20 50", { w: 2 }) + P("M330 108Q305 148 280 150L20 150", { w: 2 });
    b += rungs(30, 270, 50, 64, 12) + rungs(50, 270, 136, 150, 12) + L(20, 64, 272, 64, { c: CA, w: 2.5, m }) + L(272, 136, 50, 136, { c: CA, w: 2.5 });
    b += E(334, 100, 13, 22, { f: CB, fo: ".3", c: CB }) + E(262, 66, 18, 11, { f: CC, fo: ".3", c: CC });
    [[300, 120, "A"], [312, 132, "T"], [295, 170, "G"], [318, 165, "C"]].forEach(([x, y, s]) => (b += C(x, y, 7, { c: CA, w: 1 }) + T(x, y + 4, s, "middle", { fs: 9, c: CA })));
    b += T(12, 46, "3′", "", { fs: 10 }) + T(12, 75, "5′", "", { fs: 10 }) + T(12, 133, "3′", "", { fs: 10 }) + T(12, 162, "5′", "", { fs: 10 }) + T(498, 88, "5′", "", { fs: 10 }) + T(498, 116, "3′", "", { fs: 10 });
    b += lab(334, 78, 360, 30, "helicase: breaks H-bonds") + lab(262, 72, 230, 92, "DNA polymerase", "end") + lab(318, 165, 360, 150, "free nucleotides");
    b += lab(120, 50, 110, 24, "template (old) strand", "end") + lab(150, 64, 160, 24, "new strand") + T(20, 192, "Each daughter molecule = one old + one new strand (semi-conservative).", "", { fs: 11, b: 1 });
    return S(570, 200, "DNA replication at a replication fork", `<g transform="translate(45,0)">${b}</g>`, m);
  })();

  const MESELSON = (() => {
    let b = "";
    const band = (x, y, lbl) => R(x - 20, y - 3, 40, 6, { f: CA, c: CA, r: 2 });
    [[80, [140], "0 (all ¹⁵N)"], [220, [110], "1 generation in ¹⁴N"], [360, [110, 80], "2 generations in ¹⁴N"]].forEach(([x, ys, t]) => {
      b += R(x - 25, 40, 50, 140, { f: F, r: 14 }) + ys.map((y) => band(x, y)).join("") + T(x, 28, t, "middle", { fs: 11, b: 1 });
    });
    b += L(410, 80, 430, 80, { w: 0.8 }) + T(434, 84, "light (¹⁴N/¹⁴N)", "", { fs: 11 }) + L(410, 110, 430, 110, { w: 0.8 }) + T(434, 114, "hybrid (¹⁵N/¹⁴N)", "", { fs: 11 }) + L(410, 140, 430, 140, { w: 0.8, d: 1 }) + T(434, 144, "heavy (¹⁵N/¹⁵N)", "", { fs: 11 });
    b += P("M18 60L18 165", { m: "ar-b14-ms" }) + T(26, 196, "density increases down the tube (CsCl gradient)", "", { fs: 11 });
    return S(540, 205, "Meselson-Stahl results after centrifugation", b, "ar-b14-ms");
  })();

  const GEL = (() => {
    let b = R(60, 30, 330, 190, { f: F, r: 2 }) + T(48, 44, "−", "middle", { b: 1, fs: 16 }) + T(48, 216, "+", "middle", { b: 1, fs: 16 });
    const lanes = [[110, "ladder", [55, 80, 105, 135, 170, 200]], [180, "crime scene", [75, 120, 165]], [250, "suspect 1", [68, 130, 190]], [320, "suspect 2", [75, 120, 165]]];
    lanes.forEach(([x, t, ys]) => { b += R(x - 16, 34, 32, 6, { f: "currentColor", r: 1 }) + T(x, 24, t, "middle", { fs: 11 }) + ys.map((y) => R(x - 18, y - 3, 36, 6, { f: CA, c: "none", r: 2 })).join(""); });
    b += T(320, 236, "matches crime scene", "middle", { fs: 11, b: 1, c: CA });
    b += P("M410 55L410 200", { m: "ar-b14-gel" }) + T(420, 110, "DNA (−) moves", "", { fs: 11 }) + T(420, 124, "towards +;", "", { fs: 11 }) + T(420, 138, "small fragments", "", { fs: 11 }) + T(420, 152, "move furthest", "", { fs: 11 });
    return S(520, 245, "Gel electrophoresis DNA profile", b, "ar-b14-gel");
  })();

  const TRANSCR = (() => {
    const m = "ar-b14-tx";
    let b = E(262, 102, 82, 46, { f: CB, fo: ".12", c: CB, d: 1 });
    b += rungs(28, 186, 92, 108, 12) + rungs(340, 476, 92, 108, 12);
    b += P("M20 92L190 92Q262 50 334 92L480 92", { w: 2 }) + P("M20 108L190 108Q262 140 334 108L480 108", { w: 2 });
    b += P("M306 122L240 124Q200 126 170 145L110 175", { c: CA, w: 2.5 }) + rungs(246, 300, 113, 123, 12);
    [[360, 150, "U"], [380, 162, "A"], [400, 148, "G"]].forEach(([x, y, s]) => (b += C(x, y, 7, { c: CA, w: 1 }) + T(x, y + 4, s, "middle", { fs: 9, c: CA })));
    b += A(m, 220, 30, 320, 30) + T(270, 22, "RNA polymerase moves this way", "middle", { fs: 11 });
    b += T(12, 88, "5′", "", { fs: 10 }) + T(12, 120, "3′", "", { fs: 10 }) + T(484, 88, "3′", "", { fs: 10 }) + T(484, 120, "5′", "", { fs: 10 }) + T(98, 186, "5′", "", { fs: 10, c: CA }) + T(312, 126, "3′", "", { fs: 10, c: CA });
    b += lab(90, 92, 90, 60, "coding strand", "middle") + lab(420, 108, 400, 140, "template strand") + lab(330, 75, 380, 58, "RNA polymerase") + lab(150, 155, 150, 190, "mRNA (5′ → 3′)") + lab(400, 155, 450, 175, "free RNA nucleotides", "middle");
    return S(510, 200, "Transcription by RNA polymerase", b, m);
  })();

  const TRANSL = (() => {
    const m = "ar-b14-tl";
    let b = E(220, 112, 112, 46, { f: CM, fo: ".18" }) + E(220, 196, 100, 13, { f: CM, fo: ".25" });
    b += L(20, 162, 480, 162, { c: CA, w: 2.5 }) + T(14, 166, "5′", "end", { fs: 10 }) + T(484, 166, "3′", "", { fs: 10 });
    [[70, "AUG"], [130, "UUC"], [190, "GGA"], [250, "CAU"], [310, "UAA"]].forEach(([x, s]) => (b += T(x, 179, s, "middle", { fs: 11, b: 1, c: CA }) + L(x + 28, 165, x + 28, 159, { c: CA, w: 1 })));
    [[190, "CCU"], [250, "GUA"]].forEach(([x, s]) => (b += P(`M${x - 14} 150L${x - 14} 115L${x - 22} 105L${x + 22} 105L${x + 14} 115L${x + 14} 150Z`, { f: CB, fo: ".2", c: CB }) + T(x, 148, s, "middle", { fs: 10, b: 1, c: CB })));
    b += C(190, 88, 10, { f: CC, fo: ".3", c: CC }) + C(165, 66, 10, { f: CC, fo: ".3", c: CC }) + C(140, 46, 10, { f: CC, fo: ".3", c: CC }) + L(183, 81, 172, 73) + L(158, 59, 147, 53);
    b += C(250, 88, 10, { f: CC, fo: ".3", c: CC }) + L(200, 88, 240, 88, { d: 1, c: CD, w: 2 }) + T(220, 80, "peptide bond", "middle", { fs: 9, c: CD });
    b += T(190, 92, "Gly", "middle", { fs: 8 }) + T(250, 92, "His", "middle", { fs: 8 }) + T(165, 70, "Phe", "middle", { fs: 8 }) + T(140, 50, "Met", "middle", { fs: 8 });
    b += lab(130, 46, 60, 30, "polypeptide", "end") + lab(262, 88, 380, 70, "amino acid on tRNA") + lab(264, 130, 380, 115, "tRNA") + lab(250, 148, 380, 140, "anticodon (GUA)");
    b += lab(130, 176, 120, 214, "codon (UUC)", "end") + lab(320, 100, 380, 40, "large subunit") + lab(300, 200, 380, 214, "small subunit") + A(m, 360, 250 - 20, 450, 230) + T(380, 245, "ribosome moves 5′ → 3′", "", { fs: 10 });
    return S(540, 250, "Translation at a ribosome", `<g transform="translate(30,0)">${b}</g>`, m);
  })();

  const MUT = (() => {
    const rows = [["original", "AUG GCA UUC GGA", "Met-Ala-Phe-Gly", ""], ["substitution", "AUG GC<tspan fill=\"var(--fig-d)\">C</tspan> UUC GGA", "Met-Ala-Phe-Gly", "silent (same amino acid)"], ["substitution", "AUG GCA U<tspan fill=\"var(--fig-d)\">C</tspan>C GGA", "Met-Ala-Ser-Gly", "missense"], ["insertion", "AUG GCA <tspan fill=\"var(--fig-d)\">A</tspan>UU CGG A…", "Met-Ala-Ile-Arg…", "frameshift"], ["deletion", "AUG GCA UCG GA…", "Met-Ala-Ser-…", "frameshift (U lost)"]];
    let b = "";
    rows.forEach(([a, s, p, n], i) => { const y = 22 + i * 28; b += T(8, y, a, "", { fs: 11, b: 1 }) + `<text x="100" y="${y}" fill="currentColor" stroke="none" font-family="monospace" font-size="12">${s}</text>` + T(272, y, p, "", { fs: 11 }) + T(272, y + 12, n, "", { fs: 10, c: CM }); });
    return S(470, 160, "Effects of base substitutions, insertions and deletions on mRNA codons", b);
  })();

  const PCRT = (x) => { const t = x % 2.1; return t < 0.5 ? 95 : t < 0.6 ? 95 - 400 * (t - 0.5) : t < 1.1 ? 55 : t < 1.2 ? 55 + 170 * (t - 1.1) : t < 2.0 ? 72 : 72 + 230 * (t - 2.0); };
  const PCRSPEC = { title: "PCR temperature cycle", x: [0, 4.2], y: [40, 100], xLabel: "Time / min", yLabel: "Temperature / °C", grid: false, origin: false,
    curves: [{ f: PCRT, color: "a" }], texts: [{ at: [0.05, 98], text: "95 denature" }, { at: [0.6, 51], text: "55 anneal" }, { at: [1.25, 75.5], text: "72 extend" }] };

  const T14 = {
    diagrams: [
      Object.assign({}, PCRSPEC, { title: "PCR: 95 °C separates strands → 55 °C primers anneal → 72 °C Taq polymerase extends (2 cycles)" }),
      { title: "PCR: DNA copies double each cycle (exponential) until primers / nucleotides run out (plateau)", x: [0, 40], y: [0, 110], xLabel: "Cycle number", yLabel: "Amount of DNA", grid: false, origin: false,
        curves: [{ f: (x) => 100 / (1 + Math.exp(-(x - 22) / 1.6)), color: "a" }], texts: [{ at: [4, 15], text: "copies = 2ⁿ" }, { at: [27, 104], text: "plateau" }] },
    ],
    figures: [
      { title: "Replication fork", caption: "Helicase unwinds the double helix and breaks hydrogen bonds; DNA polymerase adds free nucleotides by complementary base pairing, always 5′ → 3′. Strands are antiparallel.", svg: REPL },
      { title: "Meselson–Stahl results", caption: "After one generation in ¹⁴N all DNA is hybrid (rules out conservative); after two generations half hybrid, half light (rules out dispersive).", svg: MESELSON },
      { title: "Gel electrophoresis profile", caption: "DNA is negatively charged (phosphate groups) so it moves towards the anode (+); shorter fragments move further. A match needs every band to align.", svg: GEL },
      { title: "Transcription", caption: "RNA polymerase unwinds DNA and assembles RNA nucleotides complementary to the template strand (U pairs with A), 5′ → 3′. The mRNA has the same sequence as the coding strand, with U for T.", svg: TRANSCR },
      { title: "Translation", caption: "tRNA anticodons pair with mRNA codons; the ribosome forms a peptide bond between the amino acids; the ribosome moves along mRNA one codon at a time until a stop codon.", svg: TRANSL },
      { title: "Types of gene mutation", caption: "Substitutions change at most one amino acid (or none, because the code is degenerate); insertions and deletions shift the reading frame and change every codon after them.", svg: MUT },
    ],
    frames: [
      { title: "Draw a labelled diagram of translation", star: true,
        paper: "P2", where: "Paper 2 · 4–5 marks · drawing",
        q: "Draw a labelled diagram to show translation at a ribosome.",
        marks: [
          "__mRNA__ passing between the __small and large subunits__ of the ribosome",
          "__codons__ on mRNA paired with complementary __anticodons__ on tRNA",
          "__tRNA__ molecules each carrying a specific __amino acid__",
          "__peptide bond__ forming between adjacent amino acids / growing __polypeptide__ attached to a tRNA",
          "direction of ribosome movement along mRNA (__5′ → 3′__)",
        ],
        svg: TRANSL,
        model: "The diagram shows mRNA running between the small and large subunits of a ribosome. Two tRNA molecules sit in the ribosome, each with an anticodon complementary to a codon on the mRNA and each carrying a specific amino acid. A peptide bond forms between the adjacent amino acids, adding to the growing polypeptide attached to one tRNA. An arrow shows the ribosome moving along the mRNA in the 5′ → 3′ direction.",
        accept: "triplet for codon; polypeptide chain / protein",
        reject: "anticodons drawn on mRNA; DNA in the ribosome; \"amino acids pair with codons\"",
        tip: "Codon 喺 mRNA，anticodon 喺 tRNA。核糖體有大細兩個 subunit，記得標方向 5′→3′。" },
      { title: "Sketch the temperature changes in one cycle of PCR",
        paper: "P1B", where: "Paper 1B · 3 marks · sketch / interpret a thermocycler trace",
        q: "Sketch the temperature changes during two cycles of the polymerase chain reaction and state what happens at each temperature.",
        marks: [
          "about __95 °C__: hydrogen bonds break and the DNA strands __separate (denature)__",
          "about __55 °C__: __primers anneal__ (bind) to complementary sequences at each end of the target",
          "about __72 °C__: __Taq polymerase__ extends the primers, building complementary strands; the cycle then repeats",
        ],
        diagram: PCRSPEC,
        model: "The trace is a repeating step pattern. At about 95 °C the hydrogen bonds between bases break and the DNA strands separate. The temperature is lowered to about 55 °C so that primers anneal to complementary sequences at each end of the target region. It is then raised to about 72 °C, the optimum for Taq polymerase, which extends the primers by adding free nucleotides. The cycle then repeats, doubling the DNA each time.",
        accept: "90–98 °C; 50–65 °C; 68–75 °C",
        reject: "\"Taq denatures at 95 °C\"; helicase in PCR; primers anneal at 95 °C",
        tip: "高→低→中：95（分開）→55（primer 黏）→72（Taq 延長）。Taq 耐熱，所以 95 °C 唔會變性。" },
    ],
  };
  // ======================================================== bio-h3 (D1.2-1.3, D2.2 AHL)
  const LAGGING = (() => {
    const m = "ar-bh3-lag";
    let b = rungs(350, 535, 105, 120, 12) + L(340, 105, 540, 105, { w: 2 }) + L(340, 120, 540, 120, { w: 2 });
    b += P("M340 105Q315 62 290 60L20 60", { w: 2 }) + P("M340 120Q315 163 290 165L20 165", { w: 2 });
    b += L(20, 72, 272, 72, { c: CA, w: 2.5, m }) + E(285, 72, 14, 9, { f: CC, fo: ".35", c: CC });
    const frag = (x1, x2, primer) => L(x2, 153, x1, 153, { c: CA, w: 2.5, m }) + (primer ? L(x2, 153, x2 + 12, 153, { c: CD, w: 4 }) : "");
    b += frag(30, 110, false) + frag(118, 188, true) + frag(210, 268, true) + L(292, 158, 302, 158, { c: CD, w: 4 });
    b += E(114, 153, 9, 7, { f: CB, fo: ".35", c: CB }) + E(196, 153, 10, 8, { f: CM, fo: ".4" }) + E(300, 168, 10, 7, { f: CD, fo: ".25", c: CD });
    b += E(338, 112, 12, 20, { f: CB, fo: ".3", c: CB }) + E(470, 112, 14, 14, { f: CC, fo: ".25", c: CC }) + A(m, 400, 22, 470, 22) + T(395, 26, "fork moves", "end", { fs: 11 });
    b += T(10, 56, "3′", "end", { fs: 10 }) + T(10, 76, "5′", "end", { fs: 10 }) + T(10, 157, "3′", "end", { fs: 10 }) + T(10, 169, "5′", "end", { fs: 10 }) + T(548, 102, "5′", "", { fs: 10 }) + T(548, 124, "3′", "", { fs: 10 });
    b += lab(120, 72, 120, 92, "leading strand (continuous)", "") + lab(285, 63, 255, 38, "DNA pol III", "end");
    b += lab(70, 153, 40, 128, "lagging strand: Okazaki fragments (away from fork)") + lab(275, 156, 290, 200, "RNA primer") + lab(114, 160, 30, 200, "DNA ligase seals the gap") + lab(196, 161, 170, 215, "DNA pol I replaces primer with DNA");
    b += lab(305, 174, 380, 185, "primase lays primer") + lab(345, 96, 380, 70, "helicase") + lab(470, 98, 450, 50, "gyrase (relieves supercoiling)", "middle");
    return S(580, 225, "Leading and lagging strand synthesis at a replication fork", `<g transform="translate(14,0)">${b}</g>`, m);
  })();

  const SPLICE = (() => {
    const m = "ar-bh3-spl";
    const ex = (x, w, y, s) => R(x, y, w, 20, { f: CA, fo: ".3", c: CA, r: 2 }) + T(x + w / 2, y + 14, s, "middle", { fs: 11, b: 1 });
    const intr = (x, w, y) => R(x, y + 5, w, 10, { f: CM, fo: ".25", c: CM, r: 2 }) + T(x + w / 2, y - 3, "intron", "middle", { fs: 10, c: CM });
    let b = T(10, 22, "pre-mRNA", "", { b: 1, fs: 11 }) + ex(90, 60, 30, "exon 1") + intr(150, 60, 30) + ex(210, 60, 30, "exon 2") + intr(270, 60, 30) + ex(330, 60, 30, "exon 3");
    b += A(m, 240, 58, 240, 88) + T(250, 77, "introns removed, exons spliced; 5′ cap and poly-A tail added", "", { fs: 10 });
    b += T(10, 112, "mature mRNA", "", { b: 1, fs: 11 }) + C(100, 110, 7, { f: CB, fo: ".4", c: CB }) + T(100, 132, "5′ cap", "middle", { fs: 10 }) + ex(108, 60, 100, "exon 1") + ex(168, 60, 100, "exon 2") + ex(228, 60, 100, "exon 3") + T(292, 115, "AAAAAAA", "", { fs: 11, c: CB }) + T(315, 132, "poly-A tail", "middle", { fs: 10 });
    b += T(10, 172, "alternative splicing", "", { b: 1, fs: 11 }) + C(150, 170, 7, { f: CB, fo: ".4", c: CB }) + ex(158, 60, 160, "exon 1") + ex(218, 60, 160, "exon 3") + T(282, 175, "AAAAAAA", "", { fs: 11, c: CB }) + T(10, 200, "Different exon combinations → different polypeptides from one gene.", "", { fs: 11 });
    return S(520, 210, "Post-transcriptional modification of mRNA", b, m);
  })();

  const NUCLEO = (() => {
    let b = R(150, 50, 100, 90, { f: CB, fo: ".18", c: CB, r: 0 }) + E(200, 50, 50, 12, { f: CB, fo: ".25", c: CB }) + P("M150 140A50 12 0 0 0 250 140", { c: CB });
    b += P("M30 168L150 132", { c: CA, w: 5 }) + P("M150 132Q200 150 250 118", { c: CA, w: 5 }) + P("M250 118Q200 92 150 100", { c: CA, w: 3, d: 1 }) + P("M150 100Q200 116 250 84", { c: CA, w: 5 }) + P("M250 84L370 52", { c: CA, w: 5 });
    b += C(150, 118, 8, { f: CD, fo: ".4", c: CD });
    b += P("M180 40q-6 -12 2 -22M215 40q6 -12 -2 -24M235 46q10 -6 12 -20", { w: 1.5, c: CB });
    b += lab(225, 70, 285, 135, "histone octamer") + lab(80, 153, 60, 120, "linker DNA", "middle") + lab(144, 118, 90, 92, "H1 histone", "end") + lab(320, 66, 330, 95, "DNA wraps ~2 turns") + lab(214, 18, 250, 14, "histone tails (acetylation, methylation)");
    return S(470, 180, "Structure of a nucleosome", b);
  })();

  const SITES = (() => {
    const m = "ar-bh3-site";
    let b = R(110, 40, 270, 100, { f: CM, fo: ".18", r: 40 }) + E(245, 175, 140, 14, { f: CM, fo: ".25" });
    [[155, "E"], [225, "P"], [295, "A"]].forEach(([x, s]) => (b += R(x - 30, 55, 60, 85, { c: CM, d: 1, r: 6 }) + T(x, 52 + 0, "", "middle") + T(x, 72, s, "middle", { b: 1, fs: 14 })));
    b += L(20, 152, 480, 152, { c: CA, w: 2.5 }) + T(16, 156, "5′", "end", { fs: 10 }) + T(484, 156, "3′", "", { fs: 10 });
    [[85, "AUG"], [155, "CCA"], [225, "GCU"], [295, "UUC"], [365, "GGA"]].forEach(([x, s]) => (b += T(x, 168, s, "middle", { fs: 11, b: 1, c: CA })));
    const trna = (x, y, s, tilt) => `<g transform="rotate(${tilt || 0} ${x} ${y})">` + P(`M${x - 12} ${y}L${x - 12} ${y - 32}L${x - 20} ${y - 42}L${x + 20} ${y - 42}L${x + 12} ${y - 32}L${x + 12} ${y}Z`, { f: CB, fo: ".2", c: CB }) + T(x, y - 4, s, "middle", { fs: 10, b: 1, c: CB }) + "</g>";
    b += trna(225, 148, "CGA") + trna(295, 148, "AAG") + trna(150, 132, "GGU", -25);
    b += C(225, 96, 9, { f: CC, fo: ".35", c: CC }) + C(205, 76, 9, { f: CC, fo: ".35", c: CC }) + C(185, 22, 9, { f: CC, fo: ".35", c: CC }) + L(219, 89, 211, 83) + P("M199 69Q185 50 185 31", {}) + C(295, 96, 9, { f: CC, fo: ".35", c: CC });
    b += A(m, 300, 200, 390, 200) + T(290, 215, "ribosome moves 5′ → 3′, one codon at a time", "", { fs: 10 });
    b += T(395, 70, "E: exit site", "", { fs: 11 }) + T(395, 88, "P: holds tRNA with", "", { fs: 11 }) + T(395, 102, "growing polypeptide", "", { fs: 11 }) + T(395, 120, "A: new tRNA enters", "", { fs: 11 });
    b += lab(185, 22, 120, 18, "polypeptide", "end") + lab(85, 162, 70, 205, "start codon", "middle");
    return S(520, 222, "Ribosome A, P and E sites during translation", b, m);
  })();

  const LAC = (() => {
    const m = "ar-bh3-lac";
    const dna = (y) => L(20, y, 500, y, { w: 2 }) + R(20, y - 8, 50, 16, { f: CM, fo: ".25", r: 2 }) + R(120, y - 8, 50, 16, { f: CC, fo: ".3", r: 2 }) + R(170, y - 8, 36, 16, { f: CD, fo: ".25", r: 2 }) + R(206, y - 8, 90, 16, { f: CA, fo: ".25", r: 2 }) + R(296, y - 8, 80, 16, { f: CA, fo: ".25", r: 2 }) + R(376, y - 8, 70, 16, { f: CA, fo: ".25", r: 2 }) + [[45, "lacI"], [145, "P"], [188, "O"], [251, "lacZ"], [336, "lacY"], [411, "lacA"]].map(([x, s]) => T(x, y + 4, s, "middle", { fs: 10, b: 1 })).join("");
    let b = T(10, 18, "Lactose absent: repressor binds operator → no transcription", "", { b: 1, fs: 11 }) + dna(70);
    b += P("M172 61L172 44Q188 34 204 44L204 61Z", { f: CB, fo: ".35", c: CB }) + T(188, 32, "repressor", "middle", { fs: 10 }) + E(135, 52, 18, 10, { f: CC, fo: ".2", c: CC, d: 1 }) + T(118, 40, "RNA polymerase blocked", "end", { fs: 10 });
    b += A(m, 45, 80, 45, 96) + T(52, 96, "regulator gene makes repressor", "", { fs: 10 });
    b += T(10, 128, "Lactose present: lactose binds repressor, which changes shape and leaves", "", { b: 1, fs: 11 }) + dna(180);
    b += P("M172 156L172 139Q188 129 204 139L204 156Z", { f: CB, fo: ".35", c: CB }) + `<polygon points="186,150 196,150 191,158" fill="${CD}" stroke="none"/>` + T(214, 146, "repressor + lactose", "", { fs: 10 });
    b += E(300, 165, 22, 10, { f: CC, fo: ".25", c: CC }) + A(m, 325, 165, 360, 165) + P("M290 196Q330 210 400 204", { c: CA, w: 2 }) + T(405, 208, "mRNA → enzymes", "", { fs: 10, c: CA });
    return S(520, 220, "The lac operon of E. coli", b, m);
  })();

  const INSULIN = (() => {
    const m = "ar-bh3-ins";
    let b = R(20, 20, 40, 18, { f: CD, fo: ".3", c: CD, r: 2 }) + R(60, 20, 90, 18, { f: CB, fo: ".25", c: CB, r: 2 }) + R(150, 20, 80, 18, { f: CM, fo: ".25", c: CM, r: 2 }) + R(230, 20, 60, 18, { f: CA, fo: ".25", c: CA, r: 2 });
    [[40, "signal"], [105, "B chain"], [190, "C peptide"], [260, "A chain"]].forEach(([x, s]) => (b += T(x, 33, s, "middle", { fs: 10 })));
    b += T(300, 33, "preproinsulin", "", { fs: 11, b: 1 }) + A(m, 120, 44, 120, 64) + T(128, 58, "signal peptide removed in RER", "", { fs: 10 });
    b += L(40, 80, 140, 80, { c: CB, w: 4 }) + P("M140 80Q200 70 200 98Q200 126 140 115", { c: CM, w: 4 }) + L(140, 115, 60, 115, { c: CA, w: 4 }) + L(70, 82, 70, 113, { c: CD, w: 2 }) + L(120, 82, 120, 113, { c: CD, w: 2 });
    b += T(215, 100, "proinsulin (folded, S–S bonds)", "", { fs: 11, b: 1 }) + A(m, 120, 128, 120, 148) + T(128, 142, "C peptide cut out (Golgi / vesicles)", "", { fs: 10 });
    b += L(40, 162, 140, 162, { c: CB, w: 4 }) + L(60, 190, 140, 190, { c: CA, w: 4 }) + L(70, 164, 70, 188, { c: CD, w: 2 }) + L(120, 164, 120, 188, { c: CD, w: 2 });
    b += T(150, 166, "B chain", "", { fs: 10 }) + T(150, 194, "A chain", "", { fs: 10 }) + T(215, 180, "active insulin: 2 chains joined by disulfide bonds", "", { fs: 11, b: 1 });
    return S(520, 205, "Modification of preproinsulin to insulin", b, m);
  })();

  const H3 = {
    diagrams: [
      { title: "lac operon: β-galactosidase is made only while lactose is present", hl: true, x: [0, 14], y: [0, 10], xLabel: "Time / h", yLabel: "β-galactosidase", grid: false, origin: false,
        curves: [{ f: (x) => (x < 2 ? 0.3 : x < 8 ? 0.3 + 8.5 * (1 - Math.exp(-(x - 2) / 1.2)) : 0.3 + 8.5 * (1 - Math.exp(-6 / 1.2)) * Math.exp(-(x - 8) / 1.5)), color: "a" }],
        vlines: [{ x: 2, label: "lactose added" }, { x: 8, label: "removed" }] },
    ],
    figures: [
      { title: "Leading and lagging strands", hl: true, caption: "DNA polymerase III only adds nucleotides to a 3′ end, so the lagging strand is made away from the fork in Okazaki fragments, each starting from an RNA primer laid by primase.", svg: LAGGING },
      { title: "mRNA processing", hl: true, caption: "In eukaryotes, introns are removed and exons spliced; a 5′ cap and poly-A tail protect the mRNA. Alternative splicing lets one gene code for several polypeptides.", svg: SPLICE },
      { title: "Nucleosome", hl: true, caption: "DNA wraps around 8 histones and is held by H1. Acetylation of histone tails loosens packing (gene expressed); methylation of DNA / histones usually tightens it (gene silenced).", svg: NUCLEO },
      { title: "Ribosome binding sites", hl: true, caption: "Initiation: small subunit binds mRNA and moves to AUG; initiator tRNA (Met) sits in the P site; large subunit joins. Each new tRNA enters A, the chain is transferred to it, then the ribosome translocates (P → E → exit).", svg: SITES },
      { title: "lac operon", hl: true, caption: "Example of transcription regulated by a protein binding a specific DNA base sequence (the operator).", svg: LAC },
      { title: "Insulin processing", hl: true, caption: "Polypeptides are often modified after translation: signal peptide removed, folding, disulfide bonds, cleavage of part of the chain.", svg: INSULIN },
    ],
    frames: [
      { title: "Draw replication of the leading and lagging strands", hl: true, star: true,
        paper: "P2", where: "Paper 2 · 4–5 marks · drawing / annotated diagram",
        q: "Draw an annotated diagram of a replication fork to show how the leading and lagging strands are synthesised.",
        marks: [
          "template strands shown __antiparallel__ with 5′ and 3′ ends labelled; __helicase__ at the fork",
          "__leading strand__ made __continuously__ towards the fork by __DNA polymerase III__",
          "__lagging strand__ made __discontinuously__ away from the fork as __Okazaki fragments__",
          "each fragment starts from an __RNA primer__ made by __primase__",
          "__DNA polymerase I__ replaces primers with DNA and __DNA ligase__ joins the fragments",
        ],
        svg: LAGGING,
        model: "The two template strands are antiparallel and are separated at the fork by helicase. DNA polymerase III can only add nucleotides to a 3′ end, so the leading strand is made continuously towards the fork. The lagging strand is made discontinuously, away from the fork, as Okazaki fragments. Each fragment starts from a short RNA primer laid down by primase. DNA polymerase I later removes the primers and replaces them with DNA, and DNA ligase seals the sugar-phosphate backbone between fragments.",
        accept: "\"sticks together\" not accepted for ligase - must be joins / seals; phosphodiester bonds",
        reject: "both strands drawn continuous; polymerase adding to the 5′ end; ligase making the primers",
        tip: "最易錯：5′/3′ 標錯。新鏈永遠 5′→3′ 延長；lagging strand 背住 fork 一段段做。" },
      { title: "Label the A, P and E sites of a ribosome", hl: true,
        paper: "P1B", where: "Paper 1B · 3 marks · ribosome diagram",
        q: "On a diagram of a ribosome during elongation, identify the A, P and E sites and state the role of each.",
        marks: [
          "__A site__: where a new __tRNA carrying an amino acid__ binds to the next codon",
          "__P site__: holds the tRNA attached to the __growing polypeptide__; peptide bond forms between it and the amino acid in A",
          "__E site__: the __deacylated tRNA exits__ the ribosome",
        ],
        svg: SITES,
        model: "The A site is where a new tRNA carrying an amino acid binds to the codon that has just entered the ribosome. The P site holds the tRNA carrying the growing polypeptide; a peptide bond forms between the polypeptide and the amino acid in the A site, transferring the chain to the A-site tRNA. After translocation the now empty tRNA moves to the E site and exits the ribosome. The sites are in the order E, P, A from the 5′ end, as the ribosome moves 5′ → 3′.",
        accept: "aminoacyl / peptidyl / exit sites; \"free tRNA leaves\"",
        reject: "order A–P–E in the direction of movement; amino acids entering the E site",
        tip: "次序 E–P–A（由 5′ 睇），新 tRNA 入 A，出 E。記 \"APE\" 倒轉讀。" },
    ],
    concepts: [
      { h: "Ribosome sites and initiation (AHL)", b: "<p>The ribosome has three tRNA binding sites. <strong>A (aminoacyl)</strong>: incoming tRNA with its amino acid; <strong>P (peptidyl)</strong>: tRNA holding the growing chain; <strong>E (exit)</strong>: tRNA leaves. <strong>Initiation</strong>: the small subunit binds the 5′ end of mRNA and moves to the <strong>start codon AUG</strong>; the initiator tRNA (methionine) binds in the P site and the large subunit joins. <strong>Elongation</strong>: tRNA enters A → peptide bond formed (catalysed by rRNA of the large subunit) → ribosome moves one codon 5′ → 3′ (translocation). <strong>Termination</strong>: a stop codon in A binds a release factor, not a tRNA.</p>", hl: true },
      { h: "Nucleosomes and chromatin (AHL)", b: "<p>A <strong>nucleosome</strong> = DNA wound about twice around a core of <strong>eight histone proteins</strong>, held by an <strong>H1 histone</strong>, joined to the next by linker DNA. Nucleosomes allow DNA to be supercoiled (condensed) and regulate access for transcription: <strong>acetylation</strong> of histone tails loosens packing (euchromatin, transcribed); <strong>methylation</strong> of cytosine in DNA and some histone methylation tightens it (heterochromatin, silenced).</p>", hl: true },
    ],
  };
  // ======================================================== bio-15 (D2.1, D3.1-3.2)
  const ctd = (x, y, len, c, c2) => `<line x1="${x}" y1="${y - len / 2}" x2="${x}" y2="${y + len / 2}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` + (c2 ? `<line x1="${x}" y1="${y - len / 2}" x2="${x}" y2="${(y - len / 2 + len * 0.4).toFixed(1)}" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>` : "");
  const chr = (x, y, len, c, rot, c2) => `<g transform="rotate(${rot || 0} ${x} ${y})">${ctd(x - 3, y, len, c)}${ctd(x + 3, y, len, c, c2)}${C(x, y, 2.4, { f: "currentColor", c: "none" })}</g>`;
  const CA2 = CB; // second homologue colour
  const cellMit = (stage, cx, cy) => {
    let b = "";
    if (stage === "pro") {
      b += C(cx, cy, 55, { f: F }) + C(cx, cy, 36, { d: 1, c: CM });
      b += chr(cx - 14, cy - 12, 22, CA, 25) + chr(cx + 14, cy + 12, 22, CA2, -35) + chr(cx - 12, cy + 16, 12, CA, 70) + chr(cx + 16, cy - 16, 12, CA2, -10);
    } else if (stage === "meta") {
      b += C(cx, cy, 55, { f: F }) + L(cx, cy - 50, cx, cy + 50, { d: 1, c: CM, w: 1 });
      [[-33, 16, CA], [-13, 10, CA2], [7, 16, CA2], [27, 10, CA]].forEach(([dy, l, c]) => (b += L(cx - 46, cy, cx - 3, cy + dy, { w: 0.7, c: CM }) + L(cx + 46, cy, cx + 3, cy + dy, { w: 0.7, c: CM }) + chr(cx, cy + dy, l, c)));
    } else if (stage === "ana") {
      b += C(cx, cy, 55, { f: F });
      [[-33, 14, CA], [-12, 9, CA2], [9, 14, CA2], [30, 9, CA]].forEach(([dy, l, c]) => [-1, 1].forEach((s) => {
        const ax = cx + s * 34, y = cy + dy;
        b += L(cx + s * 46, cy, ax, y, { w: 0.7, c: CM }) + `<path d="M${ax - s * 12} ${y - l / 2}L${ax} ${y}L${ax - s * 12} ${y + l / 2}" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
      }));
    } else {
      b += P(`M${cx} ${cy - 30}Q${cx - 60} ${cy - 62} ${cx - 56} ${cy}Q${cx - 60} ${cy + 62} ${cx} ${cy + 30}Q${cx + 60} ${cy + 62} ${cx + 56} ${cy}Q${cx + 60} ${cy - 62} ${cx} ${cy - 30}Z`, { f: F });
      [-1, 1].forEach((s) => (b += C(cx + s * 30, cy, 17, { d: 1, c: CM }) + P(`M${cx + s * 30 - 8} ${cy - 6}q4 -6 8 0t8 0M${cx + s * 30 - 6} ${cy + 6}q4 -5 8 0`, { c: CA, w: 1.5 })));
    }
    return b;
  };
  const MITOSIS = (() => {
    let b = "";
    [["pro", "prophase", "chromosomes condense;", "nuclear membrane breaks"], ["meta", "metaphase", "line up at equator;", "spindle on centromeres"], ["ana", "anaphase", "sister chromatids pulled", "to opposite poles"], ["telo", "telophase", "nuclei reform;", "cytokinesis begins"]].forEach(([s, n, l1, l2], i) => {
      const cx = 68 + 132 * i;
      b += cellMit(s, cx, 64) + T(cx, 138, n, "middle", { b: 1, fs: 12 }) + T(cx, 153, l1, "middle", { fs: 10 }) + T(cx, 166, l2, "middle", { fs: 10 });
    });
    return S(530, 172, "Stages of mitosis in a cell with 2n = 4", b);
  })();
  const ANAPHASE = S(220, 150, "A cell in anaphase of mitosis, 2n = 4", cellMit("ana", 110, 65) + T(110, 140, "anaphase (2n = 4)", "middle", { b: 1, fs: 11 }) + T(48, 14, "pole", "middle", { fs: 10 }) + T(172, 14, "pole", "middle", { fs: 10 }));

  const MEIOSIS = (() => {
    const m = "ar-b15-mei";
    let b = C(60, 100, 50, { f: F }) + chr(45, 90, 26, CA) + chr(57, 90, 26, CA2) + chr(70, 120, 14, CA) + chr(82, 120, 14, CA2) + T(60, 168, "2n = 4", "middle", { fs: 11, b: 1 }) + T(60, 182, "(bivalents)", "middle", { fs: 10 });
    b += A(m, 112, 85, 168, 58) + A(m, 112, 115, 168, 142) + T(140, 100, "meiosis I", "middle", { fs: 11, b: 1 });
    b += C(210, 55, 38, { f: F }) + chr(200, 50, 26, CA, 0, CA2) + chr(222, 60, 14, CA2);
    b += C(210, 145, 38, { f: F }) + chr(200, 140, 26, CA2, 0, CA) + chr(222, 150, 14, CA);
    b += T(210, 198, "n = 2 (still 2 chromatids)", "middle", { fs: 10 });
    [[25, 55, 0, CA, null, CA2], [75, 55, 1, CA, CA2, CA2], [125, 145, 0, CA2, CA, CA], [175, 145, 1, CA2, null, CA]].forEach(([y, py, k, c, c2, cs]) => {
      b += A(m, 250, py, 330, y) + C(355, y, 22, { f: F }) + ctd(348, y, 24, c, c2) + ctd(363, y + 2, 12, cs);
    });
    b += T(296, 100, "meiosis II", "middle", { fs: 11, b: 1 });
    b += T(390, 90, "4 haploid cells,", "", { fs: 11, b: 1 }) + T(390, 105, "genetically different", "", { fs: 11 }) + T(390, 120, "(crossing over +", "", { fs: 10 }) + T(390, 133, "random orientation)", "", { fs: 10 });
    return S(530, 205, "Overview of meiosis", b, m);
  })();

  const CROSSOVER = (() => {
    const m = "ar-b15-co";
    let b = ctd(56, 85, 110, CA) + ctd(96, 85, 110, CB);
    b += P("M70 30L70 75L82 95L82 140", { c: CA, w: 4 }) + P("M82 30L82 75L70 95L70 140", { c: CB, w: 4 }) + C(63, 85, 3, { f: "currentColor", c: "none" }) + C(89, 85, 3, { f: "currentColor", c: "none" });
    [[44, 48, "A"], [44, 125, "B"], [108, 48, "a"], [108, 125, "b"]].forEach(([x, y, s]) => (b += T(x, y, s, "middle", { b: 1, i: 1 })));
    b += lab(76, 85, 130, 85, "chiasma") + T(76, 18, "bivalent in prophase I", "middle", { fs: 11, b: 1 }) + A(m, 200, 85, 240, 85);
    [[260, CA, null, "A", "B", "parental"], [320, CA, CB, "A", "b", "recombinant"], [380, CB, CA, "a", "B", "recombinant"], [440, CB, null, "a", "b", "parental"]].forEach(([x, c, c2, t, u, n]) => {
      b += `<line x1="${x}" y1="30" x2="${x}" y2="${c2 ? 85 : 140}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` + (c2 ? `<line x1="${x}" y1="85" x2="${x}" y2="140" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>` : "");
      b += T(x + 12, 52, t, "middle", { b: 1, i: 1 }) + T(x + 12, 125, u, "middle", { b: 1, i: 1 }) + T(x, 160, n, "middle", { fs: 10 });
    });
    b += T(350, 18, "chromatids after meiosis", "middle", { fs: 11, b: 1 });
    return S(480, 170, "Crossing over at a chiasma produces recombinant chromatids", b, m);
  })();

  const cross = (label, lines, g1, g2, cells, res, hi) => {
    let b = lines.map(([a, z], i) => T(10, 20 + i * 18, a, "", { fs: 11, b: 1 }) + T(150, 20 + i * 18, z, "", { fs: 12 })).join("");
    const x0 = 120, y0 = 80, w = 70, h = 34;
    b += T(x0 - 8, y0 - 6, "gametes", "end", { fs: 10, c: CM });
    g1.forEach((g, i) => (b += B(x0 + w * (i + 1), y0, w, 26, [g], { f: CB, b: 1 })));
    g2.forEach((g, i) => (b += B(x0, y0 + 26 + h * i, w, h, [g], { f: CB, b: 1 })));
    cells.forEach((r, i) => r.forEach((c, j) => (b += B(x0 + w * (j + 1), y0 + 26 + h * i, w, h, [c], { f: hi && hi(c) ? CA : F }))));
    b += T(10, y0 + 26 + h * 2 + 26, res, "", { fs: 11, b: 1 });
    return S(400, y0 + 26 + h * 2 + 36, label, b.split(`fill="${CB}"`).join(`fill="${CB}" fill-opacity=".15"`).split(`fill="${CA}"`).join(`fill="${CA}" fill-opacity=".25"`));
  };
  const MONO = cross("Monohybrid cross Tt × Tt in a Punnett grid", [["Parental phenotypes:", "tall × tall"], ["Parental genotypes:", "Tt × Tt"], ["Gametes:", "T, t  ×  T, t"]], ["T", "t"], ["T", "t"], [["TT", "Tt"], ["Tt", "tt"]], "Offspring: 1 TT : 2 Tt : 1 tt → 3 tall : 1 short", (c) => c === "tt");
  const SEXL = cross("Sex-linked cross between a carrier female and an unaffected male", [["Parental phenotypes:", "carrier female × normal male"], ["Parental genotypes:", "XᴴXʰ × XᴴY"], ["Gametes:", "Xᴴ, Xʰ  ×  Xᴴ, Y"]], ["Xᴴ", "Xʰ"], ["Xᴴ", "Y"], [["XᴴXᴴ", "XᴴXʰ"], ["XᴴY", "XʰY"]], "Daughters: all unaffected (½ carriers); sons: ½ affected (XʰY)", (c) => c === "XʰY");

  const PEDIGREE = (() => {
    const sq = (x, y, f) => R(x - 11, y - 11, 22, 22, { r: 0, f: f ? "currentColor" : F });
    const ci = (x, y, f) => C(x, y, 11, { f: f ? "currentColor" : F });
    let b = T(10, 44, "I", "", { b: 1 }) + T(10, 124, "II", "", { b: 1 }) + T(10, 204, "III", "", { b: 1 });
    b += sq(70, 40) + ci(140, 40) + L(81, 40, 129, 40) + L(105, 40, 105, 90) + L(50, 90, 200, 90) + L(50, 90, 50, 109) + L(105, 90, 105, 109) + L(200, 90, 200, 109);
    b += ci(50, 120) + sq(105, 120, 1) + sq(200, 120) + ci(260, 120) + L(211, 120, 249, 120) + L(230, 120, 230, 170) + L(200, 170, 260, 170) + L(200, 170, 200, 189) + L(260, 170, 260, 189);
    b += ci(200, 200, 1) + sq(260, 200);
    [[70, 40, 1], [140, 40, 2], [50, 120, 1], [105, 120, 2], [200, 120, 3], [260, 120, 4], [200, 200, 1], [260, 200, 2]].forEach(([x, y, n]) => (b += T(x, y + 26, n, "middle", { fs: 9 })));
    const kx = 320;
    b += T(kx, 20, "Key", "", { b: 1 }) + sq(kx + 11, 42) + T(kx + 30, 46, "unaffected male", "", { fs: 11 }) + ci(kx + 11, 72) + T(kx + 30, 76, "unaffected female", "", { fs: 11 });
    b += sq(kx + 11, 102, 1) + T(kx + 30, 106, "affected male", "", { fs: 11 }) + ci(kx + 11, 132, 1) + T(kx + 30, 136, "affected female", "", { fs: 11 });
    b += L(kx, 160, kx + 24, 160) + T(kx + 30, 164, "mating", "", { fs: 11 }) + L(kx + 12, 176, kx + 12, 196) + T(kx + 30, 190, "offspring", "", { fs: 11 });
    b += T(10, 232, "I-1 × I-2 unaffected, II-2 affected → recessive allele (parents are carriers)", "", { fs: 10.5 });
    return S(470, 240, "Pedigree chart with symbols", b);
  })();

  const FEMALE = (() => {
    let g = P("M150 70L270 70Q276 140 228 176L228 200L192 200L192 176Q144 140 150 70Z", { f: CD, fo: ".1" }) + P("M168 84L252 84Q250 130 212 160L208 160Q170 130 168 84Z", { f: CD, fo: ".28", c: CD });
    g += P("M195 200L190 250M225 200L230 250");
    g += P("M150 78Q110 52 82 74Q66 88 78 104", { w: 3 }) + P("M270 78Q310 52 338 74Q354 88 342 104", { w: 3 });
    g += P("M78 104l-8 6M78 104l-2 9M78 104l5 8M342 104l8 6M342 104l2 9M342 104l-5 8", { w: 1.2 });
    g += E(98, 128, 22, 13, { f: CA, fo: ".3", c: CA }) + E(322, 128, 22, 13, { f: CA, fo: ".3", c: CA }) + C(92, 126, 3.5, { c: CA }) + C(328, 130, 3, { c: CA });
    g += lab(110, 60, 70, 30, "oviduct", "end") + lab(70, 110, 30, 110, "fimbriae", "end") + lab(84, 134, 40, 160, "ovary", "end") + lab(266, 110, 360, 175, "uterus wall (muscle)");
    g += lab(244, 100, 360, 60, "endometrium") + lab(228, 188, 300, 205, "cervix") + lab(229, 235, 300, 240, "vagina") + lab(338, 120, 370, 100, "follicle in ovary", "");
    return S(500, 255, "Female reproductive system, front view", `<g transform="translate(30,0)">${g}</g>`);
  })();

  const MALE = (() => {
    let g = E(240, 48, 40, 28, { f: CB, fo: ".12", c: CB }) + C(240, 102, 17, { f: CM, fo: ".35" });
    g += P("M228 126L228 222Q240 236 252 222L252 126", { f: F }) + L(240, 76, 240, 228, { c: CB, w: 2 });
    g += P("M150 185Q150 262 240 256Q330 262 330 185", { d: 1 });
    g += E(178, 216, 17, 24, { f: CA, fo: ".25", c: CA }) + E(302, 216, 17, 24, { f: CA, fo: ".25", c: CA });
    g += P("M168 196Q156 210 164 232", { w: 5, c: CC }) + P("M312 196Q324 210 316 232", { w: 5, c: CC });
    g += P("M166 194Q130 130 156 72Q176 40 210 68L230 96", { w: 2 }) + P("M314 194Q350 130 324 72Q304 40 270 68L250 96", { w: 2 });
    g += `<ellipse cx="206" cy="88" rx="13" ry="6" transform="rotate(35 206 88)" fill="${CC}" fill-opacity=".3" stroke="${CC}"/><ellipse cx="274" cy="88" rx="13" ry="6" transform="rotate(-35 274 88)" fill="${CC}" fill-opacity=".3" stroke="${CC}"/>`;
    g += lab(270, 40, 360, 22, "bladder") + lab(196, 80, 120, 40, "seminal vesicle", "end") + lab(254, 108, 360, 110, "prostate gland") + lab(140, 140, 100, 140, "sperm duct", "end");
    g += lab(240, 160, 360, 150, "urethra") + lab(250, 210, 360, 190, "penis") + lab(162, 222, 110, 220, "epididymis", "end") + lab(302, 226, 360, 238, "testis") + lab(200, 256, 160, 274, "scrotum", "end");
    return S(470, 282, "Male reproductive system, front view (schematic)", `<g transform="translate(15,0)">${g}</g>`);
  })();

  const FLOWER = (() => {
    let b = P("M200 232L200 278", { w: 3, c: CC }) + P("M172 232Q200 214 228 232Z", { f: CC, fo: ".25", c: CC });
    b += P("M180 214Q92 204 86 112Q140 140 186 206Z", { f: CD, fo: ".15", c: CD }) + P("M220 214Q308 204 314 112Q260 140 214 206Z", { f: CD, fo: ".15", c: CD });
    b += P("M178 226Q128 240 112 208Q150 214 182 220Z", { f: CC, fo: ".3", c: CC }) + P("M222 226Q272 240 288 208Q250 214 218 220Z", { f: CC, fo: ".3", c: CC });
    b += E(200, 192, 20, 26, { f: CC, fo: ".2", c: CC }) + C(196, 184, 4, { f: F }) + C(204, 198, 4, { f: F }) + C(195, 205, 4, { f: F });
    b += L(200, 166, 200, 96, { w: 2.5 }) + E(200, 90, 12, 6, { f: CA, fo: ".5", c: CA });
    b += L(186, 212, 154, 112, { w: 1.5 }) + L(214, 212, 246, 112, { w: 1.5 }) + `<ellipse cx="152" cy="104" rx="7" ry="12" transform="rotate(-18 152 104)" fill="${CA}" fill-opacity=".45" stroke="${CA}"/><ellipse cx="248" cy="104" rx="7" ry="12" transform="rotate(18 248 104)" fill="${CA}" fill-opacity=".45" stroke="${CA}"/>`;
    b += lab(206, 88, 300, 40, "stigma") + lab(200, 130, 300, 70, "style") + lab(217, 186, 330, 180, "ovary") + lab(204, 198, 330, 200, "ovule") + lab(250, 96, 330, 100, "anther") + lab(234, 170, 330, 140, "filament");
    b += lab(100, 150, 60, 150, "petal", "end") + lab(125, 222, 60, 225, "sepal", "end") + lab(185, 234, 120, 262, "receptacle", "end");
    b += T(330, 22, "carpel = stigma + style + ovary", "", { fs: 10, c: CM }) + T(330, 250, "stamen = anther + filament", "", { fs: 10, c: CM });
    return S(500, 280, "Half-flower of an insect-pollinated plant", b);
  })();

  const CYCLE = (() => {
    const cx = 150, cy = 125, r = 80;
    const wedge = (a1, a2, c) => { const [x1, y1] = pt(cx, cy, r, a1), [x2, y2] = pt(cx, cy, r, a2); return P(`M${cx} ${cy}L${x1} ${y1}A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}Z`, { f: c, fo: ".3" }); };
    let b = wedge(0, 140, CC) + wedge(140, 230, CA) + wedge(230, 300, CB) + wedge(300, 345, CD) + wedge(345, 360, CM);
    [[70, "G₁", "growth"], [185, "S", "DNA replicated"], [265, "G₂", "prepares"], [322, "M", ""]].forEach(([a, s, t]) => { const [x, y] = pt(cx, cy, 52, a); b += T(x, y, s, "middle", { b: 1 }) + (t ? T(x, y + 13, t, "middle", { fs: 9 }) : ""); });
    const [ix1, iy1] = pt(cx, cy, 92, 5), [ix2, iy2] = pt(cx, cy, 92, 295);
    b += P(`M${ix1} ${iy1}A92 92 0 1 1 ${ix2} ${iy2}`, { c: CM, w: 1, d: 1 }) + T(cx + 30, cy + 113, "interphase (G₁ + S + G₂)", "middle", { fs: 10, c: CM });
    b += lab(...pt(cx, cy, 76, 330), 60, 20, "mitosis", "end") + lab(...pt(cx, cy, 76, 352), 190, 20, "cytokinesis");
    b += A("ar-b15-cyc", ...pt(cx, cy, 82, 60), ...pt(cx, cy, 112, 60)) + T(...pt(cx, cy, 116, 70), "G₀ (non-dividing)", "", { fs: 10 });
    return S(370, 245, "The cell cycle", b, "ar-b15-cyc");
  })();

  const step = (pts) => (x) => { for (let i = pts.length - 1; i >= 0; i--) if (x >= pts[i][0]) { const n = pts[i + 1]; if (!n) return pts[i][1]; return pts[i][1] + (pts[i][2] ? (n[1] - pts[i][1]) * (x - pts[i][0]) / (n[0] - pts[i][0]) : 0); } return pts[0][1]; };
  const DNAMEI = { title: "DNA content per cell during meiosis", x: [0, 10], y: [0, 5], xLabel: "Time", yLabel: "DNA per cell (units)", grid: false, origin: false,
    curves: [{ f: (x) => (x < 2 ? 2 : x < 4 ? 2 + (x - 2) : x < 6 ? 4 : x < 8.5 ? 2 : 1), color: "a" }],
    texts: [{ at: [2.3, 3.6], text: "S phase" }, { at: [5.2, 4.3], text: "meiosis I" }, { at: [7.6, 2.3], text: "meiosis II" }] };

  const T15 = {
    diagrams: [
      { title: "DNA content per cell in the mitotic cell cycle: doubles in S phase, halves at cytokinesis", x: [0, 10], y: [0, 5], xLabel: "Time", yLabel: "DNA per cell (units)", grid: false, origin: false,
        curves: [{ f: (x) => (x < 2 ? 2 : x < 4 ? 2 + (x - 2) : x < 8 ? 4 : 2), color: "a" }],
        texts: [{ at: [0.2, 2.3], text: "G₁" }, { at: [2.3, 3.6], text: "S" }, { at: [4.5, 4.3], text: "G₂ + mitosis" }, { at: [8.2, 2.3], text: "G₁" }] },
      Object.assign({}, DNAMEI, { title: "DNA content per cell in meiosis: 2 → 4 (S) → 2 (meiosis I) → 1 (meiosis II, haploid gametes)" }),
    ],
    figures: [
      { title: "Stages of mitosis (2n = 4)", caption: "Draw chromosomes as two sister chromatids joined at a centromere until anaphase; spindle microtubules attach at centromeres.", svg: MITOSIS },
      { title: "Meiosis overview", caption: "Meiosis I separates homologous chromosomes (reduction division); meiosis II separates sister chromatids. Colours show maternal and paternal chromosomes.", svg: MEIOSIS },
      { title: "Crossing over", caption: "Non-sister chromatids of a bivalent exchange segments at a chiasma in prophase I, giving new combinations of linked alleles.", svg: CROSSOVER },
      { title: "Genetics layout: monohybrid cross", caption: "Write every step: parental phenotypes, genotypes, gametes (circled or in the grid), Punnett grid, offspring genotypes and phenotypes with ratio.", svg: MONO },
      { title: "Sex-linked cross", caption: "Always write sex-linked alleles as superscripts on X; Y carries no allele.", svg: SEXL },
      { title: "Pedigree chart symbols", caption: "Generations are Roman numerals, individuals numbered left to right.", svg: PEDIGREE },
      { title: "Female reproductive system", caption: "Ovaries make eggs, oestradiol and progesterone; oviducts carry the egg (fertilisation site); endometrium is where the embryo implants.", svg: FEMALE },
      { title: "Male reproductive system", caption: "Testes make sperm and testosterone; sperm mature in the epididymis; seminal vesicles and prostate add fluid; sperm duct and urethra carry semen.", svg: MALE },
      { title: "Half-flower (insect-pollinated)", caption: "Pollen from the anther lands on the stigma; a pollen tube grows down the style to an ovule in the ovary, where fertilisation occurs.", svg: FLOWER },
      { title: "Cell cycle", hl: true, caption: "Interphase (G₁, S, G₂) is the longest part; mitosis and cytokinesis are short. Cyclins control the progression between phases.", svg: CYCLE },
    ],
    frames: [
      { title: "Draw a cell in anaphase of mitosis", star: true,
        paper: "P2", where: "Paper 2 · 2–3 marks · drawing (diploid number given)",
        q: "Draw a diagram of an animal cell with a diploid number of 4 during anaphase of mitosis.",
        marks: [
          "__4 chromatids moving to each pole__ (8 in total), each pole receiving one of each type",
          "chromatids drawn as __single strands__ (V-shapes) with the __centromere leading__ towards the pole",
          "__spindle microtubules__ attached to the centromeres, running from the poles",
        ],
        svg: ANAPHASE,
        model: "The drawing shows a cell with spindle microtubules running from each pole to the centromeres. Sister chromatids have separated, so four single chromatids (two long, two short) are moving to each pole, drawn as V-shapes with the centromere leading. Each pole receives an identical set of chromosomes.",
        accept: "\"chromosomes\" for separated chromatids; spindle fibres",
        reject: "X-shaped chromosomes in anaphase; homologues (instead of chromatids) separating; different numbers at each pole",
        tip: "Anaphase：每邊 4 條單 chromatid（2n = 4），centromere 行頭向住兩極。X 形 = 未分開，唔啱。" },
      { title: "Draw and label the female reproductive system", star: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · drawing",
        q: "Draw a labelled diagram of the female reproductive system.",
        marks: [
          "__ovaries__ shown at the ends of the __oviducts__",
          "__uterus__ with a thick muscular wall and the __endometrium__ (lining) labelled",
          "__cervix__ at the base of the uterus leading to the __vagina__",
          "oviducts entering the upper corners of the uterus (with fimbriae near the ovary)",
        ],
        svg: FEMALE,
        model: "The diagram shows two ovaries, each beside the funnel-shaped end of an oviduct (Fallopian tube) with fimbriae. The oviducts lead into the upper corners of the uterus, which has a thick muscular wall and an inner lining, the endometrium. The narrow cervix at the base of the uterus opens into the vagina.",
        accept: "Fallopian tube for oviduct; womb for uterus",
        reject: "ovaries joined directly to the uterus; oviducts drawn opening into the vagina",
        tip: "最少 5 個標籤：ovary, oviduct, uterus, endometrium, cervix, vagina。" },
      { title: "Draw and label a half-flower",
        paper: "P2", where: "Paper 2 · 3–4 marks · drawing",
        q: "Draw a labelled diagram of a half-view of an insect-pollinated flower.",
        marks: [
          "__stamen__: __anther__ on a __filament__",
          "__carpel__: __stigma__, __style__ and __ovary__ containing __ovules__",
          "__petals__ (large, coloured) and __sepals__ below them",
          "parts correctly positioned on the receptacle (carpel central, stamens around it)",
        ],
        svg: FLOWER,
        model: "The half-flower shows a central carpel made of a stigma at the top, a style and an ovary containing ovules. Around it are stamens, each an anther on a filament. Large coloured petals surround the stamens and smaller green sepals lie below them, all attached to the receptacle at the top of the stem.",
        accept: "pistil for carpel; nectary at the base of the petals",
        reject: "ovules drawn in the anther; stigma below the anthers labelled as ovary",
        tip: "雌：stigma–style–ovary（ovule 喺入面）；雄：anther + filament。" },
      { title: "Sketch DNA content per cell during meiosis",
        paper: "P1B", where: "Paper 1B · 2–3 marks · graph",
        q: "Sketch a graph of the DNA content per cell from a diploid cell in G₁ through meiosis to the gametes.",
        marks: [
          "DNA content __doubles__ (2 → 4 units) during __S phase__ of interphase",
          "__halves__ (4 → 2) at the end of __meiosis I__",
          "__halves again__ (2 → 1) at the end of __meiosis II__ - gametes have half the G₁ content",
        ],
        diagram: DNAMEI,
        model: "The DNA content starts at 2 units in G₁ and doubles to 4 units during S phase, when DNA is replicated. It halves to 2 units at the end of meiosis I, when homologous chromosomes separate into two cells, and halves again to 1 unit at the end of meiosis II, when sister chromatids separate. Each gamete therefore has half the DNA of a G₁ cell.",
        accept: "vertical drops drawn as steps; any consistent units",
        reject: "a single halving; DNA rising in meiosis II",
        tip: "Meiosis 嘅 DNA 圖：升一次（S）、跌兩次（I 同 II）。最後係原本嘅一半。" },
    ],
    concepts: [
      { h: "Reproductive anatomy (draw and label)", b: "<p><strong>Female:</strong> ovary (eggs, oestradiol, progesterone) → oviduct with fimbriae (site of fertilisation) → uterus (muscular wall; endometrium for implantation) → cervix → vagina. <strong>Male:</strong> testis in scrotum (sperm, testosterone) → epididymis (sperm mature) → sperm duct (vas deferens) → urethra in the penis; seminal vesicles and prostate gland add fluid with nutrients (fructose) and alkali.</p>" },
      { h: "Flower structure and pollination", b: "<p><strong>Stamen</strong> = anther (makes pollen) + filament. <strong>Carpel</strong> = stigma (receives pollen) + style + ovary (contains ovules). Insect-pollinated flowers have large coloured petals, scent and nectar; sepals protect the bud. Pollination → pollen tube grows down the style → male gamete fertilises the egg in the ovule → seed; ovary → fruit. Self-incompatibility promotes cross-pollination and genetic variation.</p>" },
      { h: "Crossing over and random orientation", b: "<p>In prophase I homologous chromosomes pair as <strong>bivalents</strong>; non-sister chromatids exchange segments at <strong>chiasmata</strong> (crossing over), producing <strong>recombinant</strong> chromatids. In metaphase I bivalents line up with <strong>random orientation</strong>, giving 2ⁿ combinations (2²³ in humans). With random fertilisation these make every gamete genetically different.</p>" },
      { h: "Cell cycle (AHL)", hl: true, b: "<p><strong>Interphase</strong>: G₁ (growth, organelles made), S (DNA replication), G₂ (preparation for division) - a very active phase, not a resting one. Then <strong>mitosis</strong> and <strong>cytokinesis</strong>. Cells may leave to <strong>G₀</strong> (non-dividing, e.g. neurons). Progression is controlled by <strong>cyclins</strong> that activate cyclin-dependent kinases at checkpoints; mutations in proto-oncogenes / tumour-suppressor genes cause uncontrolled division (tumours). Mitotic index = cells in mitosis ÷ total cells.</p>" },
    ],
  };
  // ======================================================== bio-h4 (D3.2 AHL)
  const DIHYB = (() => {
    const g = ["AB", "Ab", "aB", "ab"], x0 = 70, y0 = 50, w = 70, h = 34;
    const geno = (p, q) => [p[0], q[0]].sort().join("") + [p[1], q[1]].sort().join("");
    const cls = (s) => (s.includes("A") ? (s.includes("B") ? 0 : 1) : s.includes("B") ? 2 : 3);
    const fills = [CA, CB, CM, CD], fo = [".18", ".22", ".25", ".3"];
    let b = T(10, 20, "AaBb × AaBb (genes unlinked)", "", { b: 1 }) + T(x0 - 6, y0 - 6, "gametes", "end", { fs: 10, c: CM });
    g.forEach((q, i) => (b += B(x0 + w * (i + 1), y0, w, 26, [q], { b: 1 }) + B(x0, y0 + 26 + h * i, w, h, [q], { b: 1 })));
    g.forEach((p, i) => g.forEach((q, j) => { const s = geno(p, q), k = cls(s); b += R(x0 + w * (j + 1), y0 + 26 + h * i, w, h, { f: fills[k], fo: fo[k], r: 0 }) + T(x0 + w * (j + 1) + w / 2, y0 + 26 + h * i + 21, s, "middle"); }));
    const yl = y0 + 26 + h * 4 + 24;
    [["9 A_B_", CA, ".18"], ["3 A_bb", CB, ".22"], ["3 aaB_", CM, ".25"], ["1 aabb", CD, ".3"]].forEach(([s, c, o], i) => (b += R(10 + i * 105, yl - 12, 16, 16, { f: c, fo: o, r: 2 }) + T(32 + i * 105, yl + 1, s, "", { fs: 11, b: 1 })));
    return S(440, yl + 12, "Dihybrid cross Punnett grid showing a 9:3:3:1 ratio", b);
  })();

  const LINKED = (() => {
    const m = "ar-bh4-lnk";
    const bar = (x, top, bot, a1, a2, c1, c2) => `<line x1="${x}" y1="30" x2="${x}" y2="${c2 ? 75 : 120}" stroke="${c1}" stroke-width="6" stroke-linecap="round"/>` + (c2 ? `<line x1="${x}" y1="75" x2="${x}" y2="120" stroke="${c2}" stroke-width="6" stroke-linecap="round"/>` : "") + T(x + 12, 48, a1, "", { b: 1, i: 1 }) + T(x + 12, 110, a2, "", { b: 1, i: 1 });
    let b = T(10, 18, "parent AaBb (A and B linked)", "", { fs: 11, b: 1 }) + bar(50, 0, 0, "A", "B", CA) + bar(90, 0, 0, "a", "b", CB);
    b += T(70, 145, "written  AB / ab", "middle", { fs: 11 }) + A(m, 140, 75, 185, 75) + T(162, 65, "meiosis", "middle", { fs: 10 });
    b += bar(215, 0, 0, "A", "B", CA) + bar(260, 0, 0, "a", "b", CB) + bar(330, 0, 0, "A", "b", CA, CB) + bar(375, 0, 0, "a", "B", CB, CA);
    b += T(245, 145, "parental gametes", "middle", { fs: 11, b: 1 }) + T(245, 160, "(most common)", "middle", { fs: 10 }) + T(360, 145, "recombinant gametes", "middle", { fs: 11, b: 1 }) + T(360, 160, "(crossing over: rare)", "middle", { fs: 10 });
    return S(440, 170, "Gametes from a parent heterozygous for two linked genes", b, m);
  })();

  const TESTBAR = (() => {
    let b = T(110, 16, "unlinked: 1 : 1 : 1 : 1", "middle", { fs: 11, b: 1 }) + T(340, 16, "linked: parentals ≫ recombinants", "middle", { fs: 11, b: 1 });
    const bars = (x0, vals) => vals.map(([v, s, rec], i) => R(x0 + i * 50, 150 - v, 34, v, { f: rec ? CD : CA, fo: ".35", c: rec ? CD : CA, r: 1 }) + T(x0 + i * 50 + 17, 166, s, "middle", { fs: 10 })).join("");
    b += L(20, 150, 210, 150) + L(240, 150, 440, 150) + bars(25, [[60, "AaBb"], [60, "Aabb"], [60, "aaBb"], [60, "aabb"]]) + bars(245, [[110, "AaBb"], [12, "Aabb", 1], [12, "aaBb", 1], [110, "aabb"]]);
    b += T(230, 186, "Test cross AaBb × aabb: offspring phenotype counts (red = recombinants)", "middle", { fs: 10.5 });
    return S(460, 192, "Test cross offspring for unlinked and linked genes", b);
  })();

  const H4 = {
    figures: [
      { title: "Dihybrid cross (unlinked genes)", hl: true, caption: "Four gamete types in equal proportions (independent assortment) give a 16-square grid and a 9:3:3:1 phenotype ratio.", svg: DIHYB },
      { title: "Linked genes and recombinants", hl: true, caption: "Linked genes on the same chromosome are inherited together unless crossing over separates them; recombinant gametes are therefore fewer.", svg: LINKED },
      { title: "Test-cross results", hl: true, caption: "A 1:1:1:1 ratio means unlinked genes; a large excess of parental types with few recombinants means linkage.", svg: TESTBAR },
    ],
    frames: [
      { title: "Complete a dihybrid Punnett grid", hl: true,
        paper: "P2", where: "Paper 2 · 4 marks · full genetics layout",
        q: "Two plants heterozygous for two unlinked genes (AaBb) are crossed. Use a Punnett grid to deduce the expected ratio of phenotypes in the offspring.",
        marks: [
          "gametes __AB, Ab, aB, ab__ from each parent (independent assortment)",
          "a correct __4 × 4 Punnett grid__ with 16 genotypes",
          "phenotype classes identified: __A_B_, A_bb, aaB_, aabb__",
          "ratio __9 : 3 : 3 : 1__",
        ],
        svg: DIHYB,
        model: "Because the genes are unlinked, each AaBb parent produces four types of gamete in equal proportions: AB, Ab, aB and ab. A 4 × 4 Punnett grid of these gametes gives 16 genotypes. Grouping them by phenotype gives 9 with at least one dominant allele of each gene (A_B_), 3 A_bb, 3 aaB_ and 1 aabb, a ratio of 9 : 3 : 3 : 1.",
        accept: "phenotype names instead of genotype classes; 9/16 : 3/16 : 3/16 : 1/16",
        reject: "gametes containing two alleles of the same gene (e.g. Aa); a 3:1 ratio",
        tip: "配子每個基因得一個等位基因：AB, Ab, aB, ab。冇 Aa 呢種配子！" },
      { title: "Use chromosome diagrams to explain recombinants", hl: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · diagram + explanation",
        q: "Genes A and B are linked. Using chromosome diagrams, explain why a test cross of AB/ab × ab/ab produces mainly parental phenotypes and a small number of recombinants.",
        marks: [
          "linked genes are on the __same chromosome__, so A and B / a and b are usually __inherited together__",
          "parent AB/ab produces mostly __parental gametes AB and ab__",
          "__crossing over__ between the loci in prophase I produces __recombinant gametes Ab and aB__",
          "crossing over between the two loci is __infrequent__, so recombinants are __fewer__ (especially if the loci are close)",
        ],
        svg: LINKED,
        model: "Linked genes are on the same chromosome, so the alleles A and B (and a and b) are usually inherited together. The parent AB/ab therefore produces mostly parental gametes, AB and ab. Crossing over between the two loci during prophase I can exchange segments of non-sister chromatids, producing recombinant gametes Ab and aB. Crossing over between the loci happens in only a minority of meioses, so recombinant offspring are much fewer than parental ones, especially if the loci are close together.",
        accept: "chiasma formation; \"exchange of alleles between homologous chromosomes\"",
        reject: "\"recombinants come from independent assortment\"; equal numbers of all four phenotypes",
        tip: "畫兩條同源染色體，標好 A–B / a–b；講 crossing over 先有 Ab、aB，所以少。" },
    ],
  };
  // ======================================================== bio-16 (D2.3, D3.3)
  const PLANTCELLS = (() => {
    let b = "";
    const wall = (x) => R(x, 30, 120, 90, { r: 4, w: 3, c: CC });
    // turgid
    b += wall(20) + R(25, 35, 110, 80, { f: CC, fo: ".12", r: 3 }) + R(40, 48, 80, 54, { f: CB, fo: ".2", c: CB, r: 10 }) + C(118, 44, 5, { f: CM, fo: ".5" });
    // flaccid
    b += wall(180) + R(186, 37, 108, 76, { f: CC, fo: ".12", r: 8 }) + R(205, 52, 70, 46, { f: CB, fo: ".2", c: CB, r: 10 }) + C(277, 44, 5, { f: CM, fo: ".5" });
    // plasmolysed
    b += wall(340) + R(343, 33, 114, 84, { f: CD, fo: ".08", c: "none", r: 3 }) + P("M375 50Q360 75 378 100Q400 112 425 100Q442 75 425 50Q400 38 375 50Z", { f: CC, fo: ".15" }) + E(400, 75, 18, 14, { f: CB, fo: ".2", c: CB }) + C(428, 62, 4, { f: CM, fo: ".5" });
    b += T(80, 140, "turgid", "middle", { b: 1 }) + T(80, 155, "hypotonic solution", "middle", { fs: 10 }) + T(240, 140, "flaccid", "middle", { b: 1 }) + T(240, 155, "isotonic solution", "middle", { fs: 10 }) + T(400, 140, "plasmolysed", "middle", { b: 1 }) + T(400, 155, "hypertonic solution", "middle", { fs: 10 });
    b += lab(60, 75, 10, 178, "large vacuole presses membrane on wall") + lab(368, 75, 470, 178, "membrane pulled away from wall", "end") + lab(450, 40, 470, 15, "external solution fills gap", "end");
    return S(480, 192, "Plant cells in hypotonic, isotonic and hypertonic solutions", b);
  })();

  const RBC = (() => {
    let b = C(80, 70, 40, { f: CD, fo: ".2", c: CD }) + P("M200 70Q200 38 240 38Q280 38 280 70Q280 102 240 102Q200 102 200 70Z", { f: CD, fo: ".2", c: CD }) + E(240, 70, 16, 12, { f: CD, fo: ".12", c: CD, d: 1 });
    b += P("M380 40l8 8l10 -6l6 10l12 0l-4 12l10 8l-10 8l4 12l-12 0l-6 10l-10 -6l-8 8l-6 -10l-12 0l4 -12l-10 -8l10 -8l-4 -12l12 0z", { f: CD, fo: ".2", c: CD });
    b += T(80, 135, "hypotonic: swells, may burst (lysis)", "middle", { fs: 10.5 }) + T(240, 135, "isotonic: normal (biconcave)", "middle", { fs: 10.5 }) + T(390, 135, "hypertonic: shrinks (crenated)", "middle", { fs: 10.5 });
    [[30, 70, 8, 70], [130, 70, 152, 70]].forEach(([a, c, d, e]) => (b += A("ar-b16-rbc", a < 80 ? a - 20 : d + 10, 70, a < 80 ? a - 2 : d - 10, 70)));
    b += A("ar-b16-rbc", 420, 70, 445, 70) + T(80, 20, "water in", "middle", { fs: 10, c: CB }) + T(395, 20, "water out", "middle", { fs: 10, c: CB });
    return S(480, 145, "Red blood cells in hypotonic, isotonic and hypertonic solutions", b, "ar-b16-rbc");
  })();

  const NEGFB = (() => {
    const m = "ar-b16-nfb";
    let b = B(170, 10, 140, 34, ["set point (norm)"], { b: 1, f: CC }) + B(340, 70, 130, 40, ["stimulus: change", "from set point"], { fs: 11 }) + B(340, 160, 130, 40, ["receptor detects", "the change"], { fs: 11 });
    b += B(175, 215, 130, 40, ["control centre", "(e.g. hypothalamus)"], { fs: 11 }) + B(10, 160, 130, 40, ["effector", "(muscle / gland)"], { fs: 11 }) + B(10, 70, 130, 40, ["response reverses", "the change"], { fs: 11 });
    b += A(m, 300, 45, 360, 68) + A(m, 405, 112, 405, 158) + A(m, 360, 202, 307, 225) + A(m, 173, 225, 120, 202) + A(m, 75, 158, 75, 112) + A(m, 120, 68, 180, 45);
    b += T(240, 125, "negative feedback:", "middle", { fs: 11, b: 1 }) + T(240, 140, "returns the variable", "middle", { fs: 11 }) + T(240, 154, "to the set point", "middle", { fs: 11 });
    return S(480, 262, "Negative feedback loop", b.replace(`fill="${CC}"`, `fill="${CC}" fill-opacity=".25"`), m);
  })();

  const GLUCOSE = (() => {
    const m = "ar-b16-glu";
    let b = B(190, 110, 140, 40, ["blood glucose", "set point ≈ 5 mmol dm⁻³"], { b: 1, fs: 11 });
    b += B(10, 10, 150, 34, ["blood glucose rises", "(after a meal)"], { fs: 11 }) + B(190, 10, 140, 34, ["pancreas β cells", "secrete insulin"], { fs: 11, f: CB }) + B(360, 10, 150, 50, ["liver and muscle take up", "glucose; glucose →", "glycogen (glycogenesis)"], { fs: 10.5, lh: 13 });
    b += B(10, 216, 150, 34, ["blood glucose falls", "(fasting, exercise)"], { fs: 11 }) + B(190, 216, 140, 34, ["pancreas α cells", "secrete glucagon"], { fs: 11, f: CD }) + B(360, 206, 150, 50, ["liver: glycogen →", "glucose (glycogenolysis),", "released into blood"], { fs: 10.5, lh: 13 });
    b += A(m, 162, 27, 188, 27) + A(m, 332, 27, 358, 27) + A(m, 435, 62, 335, 118) + A(m, 162, 233, 188, 233) + A(m, 332, 233, 358, 233) + A(m, 435, 204, 335, 142);
    b += A(m, 190, 120, 85, 46) + A(m, 190, 140, 85, 214) + T(10, 130, "negative feedback", "", { fs: 11, b: 1 }) + T(445, 95, "glucose falls", "", { fs: 10 }) + T(445, 175, "glucose rises", "", { fs: 10 });
    return S(520, 258, "Control of blood glucose by insulin and glucagon", b.split(`fill="${CB}"`).join(`fill="${CB}" fill-opacity=".2"`).split(`fill="${CD}"`).join(`fill="${CD}" fill-opacity=".18"`), m);
  })();

  const THERMO = (() => {
    const m = "ar-b16-th";
    let b = B(175, 105, 170, 44, ["hypothalamus", "(thermoreceptor input)"], { b: 1, fs: 11 }) + B(195, 20, 130, 30, ["core temp ≈ 37 °C"], { fs: 11, f: CC });
    b += B(10, 10, 150, 22, ["TOO HOT"], { b: 1, f: CD }) + B(360, 10, 150, 22, ["TOO COLD"], { b: 1, f: CB });
    ["vasodilation of skin", "arterioles → more heat lost", "sweating → evaporation", "hair erector muscles relax", "less metabolic heat"].forEach((s, i) => (b += T(12, 52 + i * 15, s, "", { fs: 10.5 })));
    ["vasoconstriction → less", "blood to skin surface", "shivering (muscle heat)", "hairs raised (insulation)", "brown fat / thyroxine:", "more metabolic heat"].forEach((s, i) => (b += T(362, 52 + i * 15, s, "", { fs: 10.5 })));
    b += A(m, 175, 120, 140, 100) + A(m, 345, 120, 380, 100) + A(m, 260, 103, 260, 52) + T(260, 175, "receptors in skin and blood → hypothalamus → effectors", "middle", { fs: 10.5 });
    return S(520, 185, "Thermoregulation by negative feedback", b.split(`fill="${CB}"`).join(`fill="${CB}" fill-opacity=".2"`).split(`fill="${CD}"`).join(`fill="${CD}" fill-opacity=".18"`).split(`fill="${CC}"`).join(`fill="${CC}" fill-opacity=".2"`), m);
  })();

  const PSI = (() => {
    const m = "ar-b16-psi";
    let b = R(20, 30, 150, 90, { f: CC, fo: ".15", w: 2.5, c: CC }) + R(250, 30, 150, 90, { f: CC, fo: ".15", w: 2.5, c: CC });
    b += T(95, 70, "cell X", "middle", { b: 1 }) + T(95, 88, "ψ = −0.3 MPa", "middle", { fs: 11 }) + T(325, 70, "cell Y", "middle", { b: 1 }) + T(325, 88, "ψ = −0.7 MPa", "middle", { fs: 11 });
    b += A(m, 175, 75, 245, 75, CB) + T(210, 64, "water", "middle", { fs: 11, c: CB });
    b += T(210, 145, "water moves from higher (less negative) ψ to lower (more negative) ψ", "middle", { fs: 10.5 }) + T(210, 160, "ψ = ψs + ψp   (pure water ψ = 0)", "middle", { fs: 11, b: 1 });
    return S(420, 168, "Water movement down a water potential gradient", b, m);
  })();

  const T16 = {
    diagrams: [
      { title: "Negative feedback: body temperature fluctuates narrowly about the set point", x: [0, 24], y: [35.5, 38.5], xLabel: "Time / h", yLabel: "Core temp / °C", grid: false, origin: false,
        curves: [{ f: (x) => 37 + 0.35 * Math.sin(x * 1.3) * Math.exp(-0.02 * x), color: "a" }], hlines: [{ y: 37, label: "set point 37 °C" }] },
      { title: "Plant cell (HL): ψ, ψs and ψp against relative cell volume - ψp = 0 at incipient plasmolysis, ψ = 0 at full turgor", hl: true, x: [1, 1.32], y: [-1.4, 1.2], xLabel: "Relative volume", yLabel: "MPa", grid: false,
        curves: [{ f: (v) => -1.2 / v, color: "b", label: "ψs", labelX: 1.24, domain: [1, 1.3] }, { f: (v) => 0.923 * ((v - 1) / 0.3) ** 1.6, color: "muted", label: "ψp", labelX: 1.24, domain: [1, 1.3] }, { f: (v) => -1.2 / v + 0.923 * ((v - 1) / 0.3) ** 1.6, color: "a", label: "ψ", labelX: 1.2, domain: [1, 1.3] }],
        vlines: [{ x: 1.3 }], texts: [{ at: [1.22, 1.1], text: "full turgor →" }] },
    ],
    figures: [
      { title: "Plant cells and osmosis", caption: "The cellulose wall stops plant cells bursting: in hypotonic solution they become turgid; in hypertonic solution the protoplast shrinks (plasmolysis).", svg: PLANTCELLS },
      { title: "Animal cells and osmosis", caption: "With no cell wall, animal cells burst in hypotonic and shrink in hypertonic solutions - so tissue fluid and medical solutions (e.g. for organ transport) must be isotonic.", svg: RBC },
      { title: "Negative feedback loop", caption: "Any homeostasis answer: stimulus → receptor → control centre → effector → response that reverses the change.", svg: NEGFB },
      { title: "Blood glucose control", caption: "Insulin lowers and glucagon raises blood glucose; both act mainly on the liver. Type 1 diabetes: no insulin made (autoimmune); type 2: target cells less responsive.", svg: GLUCOSE },
      { title: "Thermoregulation", caption: "Effectors for temperature: skin arterioles, sweat glands, hair erector muscles, skeletal muscle (shivering), brown adipose tissue, thyroxine.", svg: THERMO },
      { title: "Water potential", hl: true, caption: "Solutes make ψs negative; pressure from the wall makes ψp positive. Water always moves towards the more negative water potential.", svg: PSI },
    ],
    frames: [
      { title: "Draw turgid and plasmolysed plant cells", star: true,
        paper: "P2", where: "Paper 2 · 3 marks · drawing",
        q: "Draw labelled diagrams of a plant cell placed in a hypotonic solution and in a hypertonic solution.",
        marks: [
          "hypotonic: __turgid__ cell with a __large vacuole__ and the __plasma membrane pressed against the cell wall__",
          "hypertonic: __plasmolysed__ cell with the __plasma membrane / cytoplasm pulled away from the wall__ and a small vacuole",
          "cell wall unchanged in both; gap between wall and membrane filled with __external solution__",
        ],
        svg: PLANTCELLS,
        model: "In a hypotonic solution the cell is turgid: water has entered by osmosis, the vacuole is large and the plasma membrane is pressed against the cell wall, which stops the cell bursting. In a hypertonic solution the cell is plasmolysed: water has left by osmosis, the vacuole has shrunk and the plasma membrane and cytoplasm have pulled away from the cell wall. The cell wall keeps its shape and the gap is filled with external solution, because the wall is fully permeable.",
        accept: "protoplast for cytoplasm and membrane; \"freely permeable\" wall",
        reject: "the cell wall drawn shrunken; a burst plant cell; gap labelled as air or vacuum",
        tip: "質壁分離：細胞壁唔變，膜同細胞質縮離細胞壁，空位係外面溶液。" },
      { title: "Construct a flow diagram for blood glucose control", star: true,
        paper: "P2", where: "Paper 2 · 4–6 marks · flow diagram / extended response",
        q: "Construct a flow diagram to show how blood glucose concentration is returned to normal after it rises and after it falls.",
        marks: [
          "rise detected by the __pancreas__; __β cells__ secrete __insulin__",
          "insulin causes __liver and muscle__ cells to take up glucose and convert it to __glycogen__",
          "fall detected; __α cells__ secrete __glucagon__",
          "glucagon causes the liver to break down __glycogen to glucose__ and release it",
          "loop shown back to the set point = __negative feedback__",
        ],
        svg: GLUCOSE,
        model: "When blood glucose rises above the set point, the change is detected by the pancreas and its β cells secrete insulin. Insulin causes liver and muscle cells to take up glucose and convert it to glycogen, so blood glucose falls back to normal. When blood glucose falls, α cells secrete glucagon, which causes liver cells to break down glycogen into glucose and release it, so blood glucose rises back to normal. Both arrows return the concentration to the set point, which is negative feedback.",
        accept: "islets of Langerhans; glycogenesis / glycogenolysis",
        reject: "\"glucagon converts glucose to glycogen\"; insulin from the liver; confusing glucagon with glycogen",
        tip: "Glucagon（激素）≠ glycogen（儲存多醣）。β → insulin，α → glucagon。" },
    ],
  };
  // ======================================================== bio-h5 (B3.3, C2.1, D3.3 AHL)
  const sarc = (y, zL, zR) => {
    let b = L(zL, y - 44, zL, y + 44, { w: 3 }) + L(zR, y - 44, zR, y + 44, { w: 3 });
    [-32, -8, 8, 32].forEach((d) => (b += L(zL, y + d, zL + 80, y + d, { c: CB, w: 2 }) + L(zR - 80, y + d, zR, y + d, { c: CB, w: 2 })));
    [-20, 20].forEach((d) => { b += L(105, y + d, 215, y + d, { c: CD, w: 5 }); for (let x = 110; x <= 210; x += 10) if (Math.abs(x - 160) > 6) b += L(x, y + d - 5, x + (x < 160 ? -3 : 3), y + d - 9, { c: CD, w: 1.2 }) + L(x, y + d + 5, x + (x < 160 ? -3 : 3), y + d + 9, { c: CD, w: 1.2 }); });
    return b;
  };
  const brk = (x1, x2, y, s) => P(`M${x1} ${y + 5}L${x1} ${y}L${x2} ${y}L${x2} ${y + 5}`, { w: 1 }) + T((x1 + x2) / 2, y - 4, s, "middle", { fs: 10 });
  const SARC = (() => {
    let b = T(10, 14, "relaxed", "", { b: 1 }) + sarc(80, 40, 280) + brk(40, 280, 26, "sarcomere (Z line to Z line)") + brk(105, 215, 136, "A band") + brk(120, 200, 146, "H zone").replace(/y="142"/, 'y="160"');
    b += brk(40, 105, 136, "I band (½)");
    b += T(10, 186, "contracted", "", { b: 1 }) + sarc(240, 70, 250) + brk(105, 215, 296, "A band (same)") + brk(70, 105, 296, "I") + brk(150, 170, 186, "H");
    b += T(300, 70, "Z line", "", { fs: 10 }) + L(282, 66, 298, 66, { w: 0.8 }) + T(300, 90, "actin (thin)", "", { fs: 10, c: CB }) + T(300, 104, "myosin (thick,", "", { fs: 10, c: CD }) + T(300, 116, "with heads)", "", { fs: 10, c: CD });
    b += T(300, 236, "I band and H zone", "", { fs: 10 }) + T(300, 249, "shorten; filaments", "", { fs: 10 }) + T(300, 262, "do not shorten", "", { fs: 10 });
    return S(420, 305, "Sarcomere relaxed and contracted", b);
  })();

  const XBRIDGE = (() => {
    const m = "ar-bh5-xb";
    const st = [["Ca²⁺ binds troponin;", "tropomyosin moves,", "exposing binding sites"], ["myosin head binds", "actin: cross-bridge"], ["power stroke: head", "pivots, actin slides", "to sarcomere centre;", "ADP + Pi released"], ["ATP binds: head", "detaches from actin"], ["ATP hydrolysed:", "head re-cocked"]];
    const pos = [[10, 10], [190, 10], [370, 10], [280, 140], [100, 140]];
    let b = "";
    st.forEach((s, i) => (b += B(pos[i][0], pos[i][1], 150, s.length > 2 ? 64 : 44, s, { fs: 10.5, lh: 13 })));
    b += A(m, 162, 32, 188, 32) + A(m, 342, 32, 368, 32) + A(m, 430, 78, 380, 138) + A(m, 278, 162, 252, 162) + A(m, 175, 138, 240, 58);
    b += T(10, 220, "repeats while Ca²⁺ and ATP are present", "", { fs: 11, b: 1 });
    return S(530, 228, "Cross-bridge cycle in muscle contraction", b, m);
  })();

  const NEPHRON = (() => {
    let b = L(0, 140, 420, 140, { d: 1, c: CM }) + T(415, 132, "cortex", "end", { fs: 10, c: CM }) + T(415, 154, "medulla", "end", { fs: 10, c: CM });
    b += L(10, 62, 62, 66, { c: CD, w: 4 }) + L(62, 76, 10, 82, { c: CD, w: 2 }) + C(74, 71, 13, { f: CD, fo: ".3", c: CD });
    b += P("M56 52A28 28 0 1 1 56 90", { w: 2.5 }) + P("M62 59A18 18 0 1 1 62 83", { w: 1.2 });
    b += P("M101 71C120 40 140 100 160 70C175 50 192 70 192 95L192 290Q207 312 222 290L222 110C222 90 242 80 257 95C272 110 287 70 302 80C317 88 327 90 332 98L332 318", { c: CA, w: 4 });
    b += lab(80, 80, 120, 125, "glomerulus") + lab(60, 46, 30, -8, "Bowman's capsule") + lab(30, 63, -35, 35, "afferent arteriole (wide)") + lab(30, 80, -35, 110, "efferent arteriole (narrow)");
    b += lab(160, 70, 170, 30, "proximal convoluted tubule") + lab(192, 220, 140, 220, "descending limb", "end") + lab(222, 250, 260, 250, "ascending limb") + lab(207, 304, 160, 318, "loop of Henle", "end");
    b += lab(300, 80, 330, 55, "distal convoluted tubule") + lab(332, 220, 350, 200, "collecting duct");
    return S(530, 350, "Structure of a nephron", `<g transform="translate(40,20)">${b}</g>`);
  })();

  const JOINT = (() => {
    let b = P("M150 62Q108 125 150 188L230 188Q272 125 230 62Z", { f: CB, fo: ".15", c: "none" });
    b += P("M138 30Q96 125 138 220M242 30Q284 125 242 220", { c: CM, w: 5 });
    b += P("M150 62Q108 125 150 188M230 62Q272 125 230 188", { w: 3 }) + P("M152 74Q124 125 152 176M228 74Q256 125 228 176", { d: 1, c: CB });
    b += P("M152 10L152 88Q152 116 190 116Q228 116 228 88L228 10", { f: CM, fo: ".2" }) + P("M152 86Q152 116 190 116Q228 116 228 86Q226 106 190 106Q154 106 152 86Z", { f: CC, fo: ".45", c: CC });
    b += P("M152 250L152 142Q190 130 228 142L228 250", { f: CM, fo: ".2" }) + P("M152 142Q190 130 228 142L228 152Q190 140 152 152Z", { f: CC, fo: ".45", c: CC });
    b += lab(200, 40, 300, 30, "bone") + lab(215, 110, 300, 85, "cartilage (reduces friction)") + lab(200, 124, 300, 125, "synovial fluid (lubricates)") + lab(250, 140, 300, 160, "synovial membrane (secretes fluid)");
    b += lab(240, 185, 300, 200, "joint capsule") + lab(250, 205, 300, 232, "ligament (bone to bone)");
    return S(510, 255, "Structure of a synovial joint", b);
  })();

  const ARM = (() => {
    let b = P("M60 60L212 128", { c: CM, w: 9 }) + P("M218 132L340 60", { c: CM, w: 7 }) + P("M218 140L336 72", { c: CM, w: 4 }) + C(214, 132, 9, { f: F });
    b += `<ellipse cx="135" cy="72" rx="62" ry="15" transform="rotate(24 135 72)" fill="${CD}" fill-opacity=".3" stroke="${CD}"/><ellipse cx="128" cy="116" rx="58" ry="12" transform="rotate(24 128 116)" fill="${CB}" fill-opacity=".25" stroke="${CB}"/>`;
    b += P("M78 46L64 52M190 98L238 114", { w: 2 }) + P("M75 94L62 70M180 140L204 146", { w: 2 });
    b += lab(140, 60, 150, 22, "biceps contracts → forearm raised (flexion)") + lab(130, 125, 110, 175, "triceps relaxes (antagonist)", "end") + lab(100, 78, 40, 110, "humerus", "end");
    b += lab(290, 88, 330, 120, "radius and ulna") + lab(220, 110, 280, 150, "tendon") + lab(214, 140, 230, 180, "elbow (synovial joint)");
    return S(470, 195, "Antagonistic muscles at the elbow", `<g transform="translate(50,0)">${b}</g>`);
  })();

  const GPCR = (() => {
    const m = "ar-bh5-gp";
    let b = R(10, 70, 500, 30, { f: F, r: 0, c: "none" }) + L(10, 70, 510, 70) + L(10, 100, 510, 100);
    b += P("M70 62L76 108L82 62L88 108L94 62L100 108L106 62L112 108", { c: CB, w: 2.5 }) + `<polygon points="80,30 100,30 90,48" fill="${CD}" fill-opacity=".4" stroke="${CD}"/>` + T(110, 40, "epinephrine (adrenaline)", "", { fs: 11 });
    b += C(160, 118, 12, { f: CC, fo: ".35", c: CC }) + C(182, 114, 9, { f: CC, fo: ".2", c: CC }) + T(160, 122, "α", "middle", { fs: 10 }) + T(160, 150, "G protein: GDP → GTP", "middle", { fs: 10 });
    b += R(250, 60, 44, 50, { f: CA, fo: ".3", c: CA, r: 8 }) + T(272, 52, "adenylyl cyclase", "middle", { fs: 10 }) + A(m, 172, 118, 246, 104) + T(272, 135, "ATP → cAMP", "middle", { fs: 11, b: 1 });
    b += A(m, 272, 142, 272, 166) + B(212, 168, 120, 30, ["protein kinase A"], { fs: 11 }) + A(m, 334, 183, 360, 183) + B(362, 160, 150, 46, ["enzyme cascade:", "glycogen → glucose"], { fs: 11 });
    b += T(12, 20, "outside cell", "", { fs: 11, b: 1 }) + T(12, 218, "cytoplasm", "", { fs: 11, b: 1 }) + T(90, 128, "receptor", "middle", { fs: 10 }) + T(400, 92, "plasma membrane", "middle", { fs: 10 }) + T(160, 168, "cAMP = second messenger", "middle", { fs: 10, c: CM });
    return S(520, 225, "Epinephrine signalling through a G-protein-coupled receptor", b, m);
  })();

  const TYRK = (() => {
    const m = "ar-bh5-tk";
    let b = R(10, 80, 500, 30, { f: F, r: 0, c: "none" }) + L(10, 80, 510, 80) + L(10, 110, 510, 110);
    b += R(80, 40, 22, 120, { f: CB, fo: ".25", c: CB, r: 8 }) + R(108, 40, 22, 120, { f: CB, fo: ".25", c: CB, r: 8 }) + `<polygon points="98,14 112,14 118,26 112,38 98,38 92,26" fill="${CD}" fill-opacity=".4" stroke="${CD}"/>`;
    [[70, 135], [70, 155], [140, 135], [140, 155]].forEach(([x, y]) => (b += C(x, y, 7, { f: CA, fo: ".35", c: CA }) + T(x, y + 4, "P", "middle", { fs: 9, b: 1 })));
    b += T(124, 22, "insulin binds", "", { fs: 11 }) + T(105, 182, "tyrosines phosphorylated", "middle", { fs: 10 }) + T(105, 194, "(autophosphorylation)", "middle", { fs: 10 });
    b += A(m, 150, 150, 220, 160) + B(222, 145, 100, 34, ["relay proteins"], { fs: 11 }) + A(m, 324, 160, 352, 160);
    b += C(380, 165, 18, { f: CC, fo: ".15", c: CC }) + R(374, 154, 12, 22, { f: CC, fo: ".5", c: CC, r: 2 }) + A(m, 380, 145, 380, 118) + T(405, 170, "vesicles with GLUT4", "", { fs: 10 }) + T(405, 182, "fuse with membrane", "", { fs: 10 });
    b += R(440, 74, 14, 42, { f: CC, fo: ".5", c: CC, r: 2 }) + A(m, 447, 50, 447, 128) + T(447, 44, "glucose in", "middle", { fs: 10 }) + T(12, 20, "outside cell", "", { fs: 11, b: 1 }) + T(12, 214, "cytoplasm", "", { fs: 11, b: 1 });
    return S(520, 220, "Insulin signalling through a tyrosine kinase receptor", b, m);
  })();

  const H5 = {
    diagrams: [
      { title: "Solute concentration of filtrate along the nephron (with ADH: concentrated urine; dashed: no ADH)", hl: true, x: [0, 10], y: [0, 1400], xLabel: "Position along nephron", yLabel: "mOsm", grid: false, origin: false,
        curves: [
          { f: (x) => (x < 2 ? 300 : x < 4 ? 300 + 450 * (x - 2) : x < 6 ? 1200 - 550 * (x - 4) : x < 7.5 ? 100 + 33 * (x - 6) : 150 + 420 * (x - 7.5)), color: "a" },
          { f: (x) => (x < 7.5 ? NaN : 150 - 20 * (x - 7.5)), color: "b", dash: true, domain: [7.5, 10] },
        ],
        texts: [{ at: [0.1, 380], text: "PCT" }, { at: [2.1, 1000], text: "desc." }, { at: [4.6, 900], text: "asc." }, { at: [6.1, 330], text: "DCT" }, { at: [7.4, 1250], text: "collecting duct" }] },
      { title: "Along the PCT: glucose falls to zero (all reabsorbed actively); urea concentration rises as water is reabsorbed", hl: true, x: [0, 10], y: [0, 10], xLabel: "Distance along PCT", yLabel: "Concentration", grid: false, origin: false,
        curves: [{ f: (x) => 5 * Math.exp(-x / 1.8), color: "a", label: "glucose", labelX: 3 }, { f: (x) => 2 + 0.6 * x, color: "b", label: "urea", labelX: 8 }] },
    ],
    figures: [
      { title: "Sarcomere", hl: true, caption: "Contraction: actin slides over myosin towards the M line; sarcomere, I band and H zone shorten; A band (length of myosin) stays the same.", svg: SARC },
      { title: "Cross-bridge cycle", hl: true, caption: "Ca²⁺ from the sarcoplasmic reticulum starts contraction; ATP is needed to detach and re-cock myosin heads.", svg: XBRIDGE },
      { title: "Nephron", hl: true, caption: "Ultrafiltration in the glomerulus (high pressure: afferent wider than efferent) → selective reabsorption in the PCT → loop of Henle makes the medulla hypertonic → ADH controls water reabsorption in the collecting duct.", svg: NEPHRON },
      { title: "Synovial joint", hl: true, caption: "Cartilage and synovial fluid reduce friction; the capsule and ligaments hold the bones together and limit movement.", svg: JOINT },
      { title: "Antagonistic muscles (elbow)", hl: true, caption: "Muscles can only pull: biceps flexes and triceps extends the elbow. When one contracts the other relaxes and is stretched.", svg: ARM },
      { title: "G-protein-coupled receptor (epinephrine)", hl: true, caption: "Ligand binds outside → G protein activated (GTP) → adenylyl cyclase makes cAMP → protein kinase cascade amplifies the signal.", svg: GPCR },
      { title: "Tyrosine kinase receptor (insulin)", hl: true, caption: "Insulin binding causes phosphorylation of tyrosines in the receptor; relay proteins trigger GLUT4 insertion, so glucose uptake increases.", svg: TYRK },
    ],
    frames: [
      { title: "Draw and label a sarcomere (relaxed and contracted)", hl: true, star: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · drawing",
        q: "Draw labelled diagrams of a sarcomere in a relaxed and a contracted state.",
        marks: [
          "__Z lines__ at each end of the sarcomere",
          "thin __actin__ filaments attached to the Z lines; thick __myosin__ filaments with heads in the centre, overlapping actin",
          "__A band__ (length of myosin), __I band__ and __H zone__ labelled",
          "contracted: __sarcomere, I band and H zone shorter__, A band __unchanged__",
        ],
        svg: SARC,
        model: "Each sarcomere is bounded by Z lines. Thin actin filaments are attached to the Z lines and extend towards the centre, where they overlap thick myosin filaments with protruding heads. The A band is the length of the myosin filaments, the I band contains only actin and the H zone contains only myosin. In the contracted sarcomere the actin has slid further over the myosin, so the sarcomere, I band and H zone are shorter, while the A band stays the same length because neither filament shortens.",
        accept: "Z discs; thin / thick filaments",
        reject: "myosin attached to Z lines; filaments drawn shorter in the contracted state; A band shortening",
        tip: "收縮時：sarcomere、I band、H zone 縮短；A band 長度不變。肌絲本身唔縮。" },
      { title: "Draw and label a nephron", hl: true, star: true,
        paper: "P2", where: "Paper 2 · 4 marks · drawing",
        q: "Draw a labelled diagram of a nephron, including its blood supply to the glomerulus.",
        marks: [
          "__glomerulus__ inside __Bowman's capsule__, with __afferent__ (wider) and __efferent__ arterioles",
          "__proximal convoluted tubule__ leading to the __loop of Henle__ (descending and ascending limbs) in the medulla",
          "__distal convoluted tubule__ joining a __collecting duct__",
          "cortex / medulla positions correct (glomerulus and convoluted tubules in the cortex; loop and collecting duct in the medulla)",
        ],
        svg: NEPHRON,
        model: "The nephron begins with a glomerulus, a knot of capillaries supplied by a wide afferent arteriole and drained by a narrower efferent arteriole, enclosed by Bowman's capsule in the cortex. The capsule leads into the proximal convoluted tubule, then the loop of Henle, whose descending and ascending limbs dip into the medulla. The ascending limb leads to the distal convoluted tubule in the cortex, which joins a collecting duct running down through the medulla.",
        accept: "renal capsule for Bowman's capsule; loop of Henle drawn as a U",
        reject: "glomerulus in the medulla; loop of Henle directly connected to the capsule",
        tip: "次序：Bowman's capsule → PCT → loop of Henle → DCT → collecting duct。標埋 afferent（闊）/ efferent（窄）。" },
      { title: "Annotate a diagram of a synovial joint", hl: true,
        paper: "P1B", where: "Paper 1B / 2 · 3 marks · elbow or hip diagram",
        q: "Annotate a diagram of a synovial joint to give the function of the cartilage, synovial fluid and joint capsule.",
        marks: [
          "__cartilage__ covers the bone ends and __reduces friction__ / absorbs shock",
          "__synovial fluid__ __lubricates__ the joint (secreted by the synovial membrane)",
          "__joint capsule__ (and ligaments) __holds the bones together__ / seals the joint",
        ],
        svg: JOINT,
        model: "Smooth cartilage covers the ends of the bones, reducing friction and absorbing shock. Synovial fluid, secreted by the synovial membrane, fills the cavity and lubricates the joint. The fibrous joint capsule encloses the joint and, with the ligaments, holds the bones together and limits the range of movement.",
        accept: "\"prevents bones rubbing\"; \"stabilises the joint\"",
        reject: "ligaments joining muscle to bone (that is a tendon); cartilage producing synovial fluid",
        tip: "Ligament 連骨同骨；tendon 連肌同骨。滑液係潤滑，cartilage 係減磨擦。" },
    ],
    concepts: [
      { h: "Synovial joints and antagonistic muscles (AHL)", hl: true, b: "<p>A <strong>synovial joint</strong> (elbow, knee = hinge; hip, shoulder = ball and socket) has cartilage on the bone ends, a joint capsule lined by synovial membrane, synovial fluid and ligaments. Muscles are attached to bones by <strong>tendons</strong> and can only contract (pull), so they work in <strong>antagonistic pairs</strong>: biceps flexes and triceps extends the elbow; internal and external intercostal muscles move the ribs in breathing. Range of motion of a joint can be measured with a goniometer or from images.</p>" },
    ],
  };
  // ======================================================== bio-17 (D4.1-4.3)
  const flowV = (m, items, w, label) => {
    let b = "";
    items.forEach((s, i) => { b += B(10, 8 + i * 48, w, 36, s, { fs: 11 }); if (i) b += A(m, 10 + w / 2, i * 48 - 3, 10 + w / 2, i * 48 + 6); });
    return S(w + 20, items.length * 48 + 6, label, b, m);
  };
  const EUTRO = flowV("ar-b17-eu", [["fertiliser / sewage runoff adds nitrates", "and phosphates to water"], ["rapid growth of algae (algal bloom)"], ["light blocked: submerged plants", "cannot photosynthesise and die"], ["algae and plants die; saprotrophic", "bacteria decompose them"], ["bacterial aerobic respiration uses O₂:", "high biochemical oxygen demand (BOD)"], ["dissolved O₂ falls: fish and other", "aerobic animals die"]], 300, "Eutrophication flow chart");
  const NATSEL = flowV("ar-b17-ns", [["variation in a population (mutation,", "meiosis, fertilisation)"], ["more offspring than the environment", "can support → competition"], ["individuals with better-adapted traits", "survive and reproduce more"], ["they pass on their heritable alleles"], ["allele frequencies change over", "generations = evolution"]], 300, "Natural selection flow chart");

  const GREEN = (() => {
    const m = "ar-b17-gh";
    let b = R(0, 180, 460, 40, { f: CC, fo: ".2", r: 0, c: "none" }) + L(0, 180, 460, 180) + R(0, 60, 460, 30, { f: CM, fo: ".15", r: 0, c: "none" }) + T(455, 80, "greenhouse gases: CO₂, CH₄, H₂O, N₂O", "end", { fs: 10.5 });
    b += C(40, 30, 20, { f: CA, fo: ".3", c: CA }) + T(40, 34, "Sun", "middle", { fs: 10 });
    b += P("M60 40L100 70L120 100L140 130L160 178", { c: CA, w: 2, m }) + T(150, 128, "short-wave radiation", "", { fs: 10.5, c: CA }) + T(150, 141, "passes through", "", { fs: 10.5, c: CA });
    b += P("M220 178q8 -10 16 -20t16 -20t16 -20t16 -20t10 -14", { c: CD, w: 2, m }) + T(300, 120, "Earth re-emits", "", { fs: 10.5, c: CD }) + T(300, 133, "long-wave infrared", "", { fs: 10.5, c: CD });
    b += P("M300 82q10 10 20 20t20 20t20 20t20 36", { c: CD, w: 2, d: 1, m }) + T(380, 150, "absorbed and", "", { fs: 10.5, c: CD }) + T(380, 163, "re-radiated back", "", { fs: 10.5, c: CD });
    b += P("M300 60L330 10", { c: CD, w: 1.5, m }) + T(336, 18, "some escapes to space", "", { fs: 10 }) + T(10, 205, "Earth's surface absorbs light and warms", "", { fs: 11 });
    return S(475, 222, "The greenhouse effect", b, m);
  })();

  const MESO = (() => {
    let b = P("M100 40L100 200Q100 215 115 215L265 215Q280 215 280 200L280 40", { w: 2.5 }) + R(92, 28, 196, 14, { f: CM, fo: ".4", r: 3 });
    b += R(102, 120, 176, 93, { f: CB, fo: ".15", r: 0, c: "none" }) + L(102, 120, 278, 120, { c: CB, d: 1 }) + R(102, 195, 176, 18, { f: CM, fo: ".35", r: 0, c: "none" });
    b += P("M140 195q-6 -30 4 -60M145 165q10 -8 14 -18M200 195q4 -36 -6 -60M220 195q-4 -26 6 -50", { c: CC, w: 2 }) + E(240, 160, 8, 4, { f: "currentColor", fo: ".5", c: "none" }) + C(170, 175, 3, { f: "currentColor", c: "none" });
    b += C(330, 40, 16, { f: CA, fo: ".3", c: CA }) + P("M318 54L290 80M330 58L310 90", { c: CA, w: 1.5 });
    b += lab(190, 35, 190, 10, "sealed lid: no matter enters or leaves", "middle") + lab(278, 100, 310, 120, "air") + lab(278, 150, 310, 160, "water") + lab(160, 150, 40, 140, "aquatic plants", "end") + lab(240, 160, 310, 190, "consumers (e.g. snails)") + lab(150, 204, 40, 200, "gravel + soil (decomposers)", "end") + T(350, 30, "light: energy enters", "", { fs: 10.5 });
    return S(560, 235, "A sealed mesocosm", `<g transform="translate(110,10)">${b}</g>`);
  })();

  const POSFB = (() => {
    const m = "ar-b17-pf", cx = 220, cy = 120, r = 80;
    let b = arc(cx, cy, r, 25, 65, m) + arc(cx, cy, r, 115, 155, m) + arc(cx, cy, r, 205, 245, m) + arc(cx, cy, r, 295, 335, m);
    b += B(cx - 60, cy - r - 14, 120, 28, ["global warming"], { b: 1, f: CD }) + B(cx + r - 30, cy - 14, 120, 28, ["ice and snow melt"], { fs: 11 }) + B(cx - 75, cy + r - 14, 150, 28, ["lower albedo: darker", ], { fs: 11 }) + B(cx - r - 90, cy - 14, 120, 28, ["more heat absorbed"], { fs: 11 });
    b += T(cx, cy - 4, "positive feedback:", "middle", { fs: 10, b: 1 }) + T(cx, cy + 10, "change amplified", "middle", { fs: 10 });
    b += T(cx, 232, "Also: thawing permafrost → decomposition releases CO₂ and CH₄ → more warming", "middle", { fs: 10.5 });
    return S(440, 240, "Positive feedback in climate change", b.replace(`fill="${CD}"`, `fill="${CD}" fill-opacity=".18"`), m);
  })();

  const T17 = {
    diagrams: [
      { title: "Stabilising selection (HL): extremes selected against - mean unchanged, variation reduced", hl: true, x: [0, 20], y: [0, 12], xLabel: "Phenotype (e.g. birth mass)", yLabel: "Frequency", grid: false, origin: false,
        curves: [{ f: (x) => 6 * gauss(x, 10, 3), color: "b", dash: true, label: "before", labelX: 14.5 }, { f: (x) => 10 * gauss(x, 10, 1.6), color: "a", label: "after", labelX: 11.5 }] },
      { title: "Disruptive selection (HL): both extremes favoured - two peaks, intermediates selected against", hl: true, x: [0, 20], y: [0, 12], xLabel: "Phenotype (e.g. beak size)", yLabel: "Frequency", grid: false, origin: false,
        curves: [{ f: (x) => 7 * gauss(x, 10, 3), color: "b", dash: true, label: "before", labelX: 10.5 }, { f: (x) => 6 * gauss(x, 5, 1.6) + 6 * gauss(x, 15, 1.6), color: "a", label: "after", labelX: 15.5 }] },
      { title: "Hardy–Weinberg (HL): genotype frequencies p², 2pq, q² against the frequency of allele a (q)", hl: true, x: [0, 1], y: [0, 1], xLabel: "q", yLabel: "Frequency", grid: false,
        curves: [{ f: (q) => (1 - q) ** 2, color: "a", label: "AA (p²)", labelX: 0.08 }, { f: (q) => 2 * q * (1 - q), color: "b", label: "Aa (2pq)", labelX: 0.42 }, { f: (q) => q * q, color: "muted", label: "aa (q²)", labelX: 0.8 }],
        vlines: [{ x: 0.5, label: "2pq max 0.5" }] },
      { title: "Phenology mismatch: warming moves the caterpillar peak earlier, but chicks still hatch at the old time", x: [0, 60], y: [0, 10], xLabel: "Day of year (from 1 April)", yLabel: "Abundance", grid: false, origin: false,
        curves: [{ f: (x) => 8 * gauss(x, 28, 5), color: "b", dash: true, label: "food (past)", labelX: 30 }, { f: (x) => 8 * gauss(x, 18, 5), color: "muted", label: "food (now)", labelX: 8 }, { f: (x) => 6 * gauss(x, 30, 4), color: "a", label: "chick demand", labelX: 36 }] },
      { title: "Succession (HL): biomass, diversity and soil depth increase towards a climax community", hl: true, x: [0, 100], y: [0, 10], xLabel: "Time / years", yLabel: "Amount", grid: false, origin: false,
        curves: [{ f: (x) => 9 / (1 + Math.exp(-(x - 40) / 9)), color: "a", label: "biomass", labelX: 70 }, { f: (x) => 6 / (1 + Math.exp(-(x - 25) / 8)), color: "b", label: "diversity", labelX: 80 }, { f: (x) => 4 * (1 - Math.exp(-x / 35)), color: "c", label: "soil depth", labelX: 60 }],
        texts: [{ at: [2, 9.5], text: "pioneers → … → climax" }] },
      { title: "Downstream of a sewage outfall: dissolved O₂ sags as bacteria decompose organic matter (high BOD)", x: [0, 20], y: [0, 10], xLabel: "Distance downstream / km", yLabel: "Level", grid: false, origin: false,
        curves: [{ f: (x) => 8.5 - 6 * (x / 4) * Math.exp(1 - x / 4), color: "a", label: "dissolved O₂", labelX: 15 }, { f: (x) => 1 + 7 * Math.exp(-x / 4), color: "b", label: "BOD / bacteria", labelX: 9 }],
        vlines: [{ x: 0, label: "outfall" }] },
    ],
    figures: [
      { title: "Natural selection", caption: "Use the sequence: variation → overproduction → competition → differential survival and reproduction → inheritance → change in allele frequency.", svg: NATSEL },
      { title: "Eutrophication", caption: "Leaching of nutrients → algal bloom → death → decomposition → oxygen depletion. Biomagnification is a separate process (toxins concentrating up food chains).", svg: EUTRO },
      { title: "Greenhouse effect", caption: "Greenhouse gases absorb long-wave radiation re-emitted by the Earth. More CO₂ and CH₄ (combustion, deforestation, cattle, rice) → enhanced greenhouse effect → global warming.", svg: GREEN },
      { title: "Positive feedback in climate change", caption: "Positive feedback amplifies a change and can push an ecosystem past a tipping point (e.g. Amazon rainforest dieback, Arctic sea ice).", svg: POSFB },
      { title: "Mesocosm", caption: "Sealed mesocosms test ecosystem sustainability: energy (light) enters, but matter must be recycled. Change one variable (e.g. light, number of consumers) and keep the rest constant.", svg: MESO },
    ],
    frames: [
      { title: "Sketch stabilising and disruptive selection", hl: true,
        paper: "P2", where: "Paper 2 · 3–4 marks · sketch distributions",
        q: "Sketch frequency distributions before and after (a) stabilising selection and (b) disruptive selection, and explain the difference.",
        marks: [
          "stabilising: after curve __narrower and taller__ with the __same mean__",
          "stabilising: individuals with __extreme phenotypes__ are selected against (e.g. human birth mass)",
          "disruptive: after curve has __two peaks__ at the extremes; intermediates selected against",
          "disruptive may lead to __speciation__ / two forms if the extremes become reproductively isolated",
        ],
        diagram: { title: "Stabilising (green) - before dashed", x: [0, 20], y: [0, 12], xLabel: "Phenotype", yLabel: "Frequency", grid: false, origin: false, curves: [{ f: (x) => 6 * gauss(x, 10, 3), color: "b", dash: true }, { f: (x) => 10 * gauss(x, 10, 1.6), color: "a" }, { f: (x) => 6 * gauss(x, 4, 1.4) + 6 * gauss(x, 16, 1.4), color: "c", label: "disruptive", labelX: 16.5 }] },
        model: "In stabilising selection the curve after selection is narrower and taller but has the same mean, because individuals with extreme phenotypes are selected against, as with very low and very high human birth masses. In disruptive selection the curve after selection has two peaks at the extremes, because intermediate phenotypes are selected against. Disruptive selection can lead to two distinct forms and possibly speciation if the extremes become reproductively isolated.",
        accept: "\"variance decreases\"; bimodal distribution",
        reject: "stabilising curve with a shifted mean; disruptive curve with a single peak",
        tip: "三種：stabilising（中間收窄）、directional（平均值移）、disruptive（變兩個峰）。" },
      { title: "Construct a flow chart for eutrophication", star: true,
        paper: "P2", where: "Paper 2 · 4–5 marks",
        q: "Construct a flow chart to explain how fertiliser runoff can lead to the death of fish in a lake.",
        marks: [
          "fertiliser adds __nitrates / phosphates__ to the water",
          "__algal bloom__: algae grow rapidly and block light, so submerged plants die",
          "dead algae and plants are decomposed by __saprotrophic bacteria__",
          "bacteria use oxygen in aerobic respiration: __high BOD__",
          "__dissolved oxygen falls__ and fish / aerobic organisms die",
        ],
        svg: EUTRO,
        model: "Fertiliser runoff adds nitrates and phosphates to the lake. These nutrients cause rapid growth of algae, an algal bloom, which blocks light so that submerged plants cannot photosynthesise and die. The dead algae and plants are decomposed by saprotrophic bacteria, whose numbers rise. The bacteria use oxygen for aerobic respiration, so the biochemical oxygen demand is high and the dissolved oxygen concentration falls, causing fish and other aerobic organisms to die.",
        accept: "leaching; nutrient enrichment; \"oxygen used by decomposers\"",
        reject: "\"algae use up all the oxygen\" without decomposition; fish poisoned by fertiliser",
        tip: "氧氣唔夠係因為「分解者呼吸」，唔係藻類本身。記得寫 BOD。" },
      { title: "Sketch a Hardy–Weinberg graph", hl: true,
        paper: "P1B", where: "Paper 1B · 2–3 marks · graph sketch / reading",
        q: "Sketch how the frequencies of the genotypes AA, Aa and aa vary with the frequency of allele a (q), assuming Hardy–Weinberg equilibrium.",
        marks: [
          "__q²__ (aa) rises from 0 to 1 as an upward curve; __p²__ (AA) falls from 1 to 0",
          "__2pq__ (Aa) is a symmetrical curve with a __maximum of 0.5 at q = 0.5__",
          "at every q the three frequencies __add up to 1__ (p² + 2pq + q² = 1)",
        ],
        diagram: { title: "Genotype frequencies against q", x: [0, 1], y: [0, 1], xLabel: "q", yLabel: "Frequency", grid: false, curves: [{ f: (q) => (1 - q) ** 2, color: "a", label: "p²", labelX: 0.1 }, { f: (q) => 2 * q * (1 - q), color: "b", label: "2pq", labelX: 0.45 }, { f: (q) => q * q, color: "muted", label: "q²", labelX: 0.85 }] },
        model: "The frequency of aa (q²) rises from 0 to 1 as a curve that is shallow at first, and the frequency of AA (p², where p = 1 − q) falls from 1 to 0 as the mirror image. The heterozygote frequency 2pq is a symmetrical arch with a maximum of 0.5 when q = 0.5. At every value of q the three frequencies add up to 1, because p² + 2pq + q² = 1.",
        accept: "parabola for 2pq",
        reject: "straight lines for p² or q²; 2pq maximum above 0.5",
        tip: "2pq 最高只係 0.5（q = 0.5）。罕見隱性病：大部分隱性等位基因藏喺雜合子入面。" },
    ],
    concepts: [
      { h: "Patterns of selection and Hardy–Weinberg (AHL)", hl: true, b: "<p><strong>Stabilising</strong>: extremes selected against, mean unchanged, variation falls (birth mass). <strong>Directional</strong>: one extreme favoured, mean shifts (antibiotic resistance, peppered moth). <strong>Disruptive</strong>: both extremes favoured, may split a population. <strong>Hardy–Weinberg</strong>: p + q = 1 and p² + 2pq + q² = 1; allele frequencies stay constant only with a large population, random mating, no mutation, no migration and no selection. A deviation shows that evolution is happening.</p>" },
      { h: "Succession (AHL)", hl: true, b: "<p><strong>Primary succession</strong> starts on bare rock with no soil (lava, retreating glacier): pioneers (lichens, mosses) weather rock and build soil. <strong>Secondary succession</strong> starts where soil remains (after fire, abandoned farmland) and is faster. Through the seres, biomass, species diversity, soil depth, humus, water retention and food-web complexity increase until a <strong>climax community</strong> is reached; arrested succession (e.g. grazing) gives a plagioclimax.</p>" },
    ],
  };
  IB.addExamFrames("bio", { topics: {
    "bio-h2": H2,
    "bio-11": T11,
    "bio-12": T12,
    "bio-13": T13,
    "bio-14": T14,
    "bio-h3": H3,
    "bio-15": T15,
    "bio-h4": H4,
    "bio-16": T16,
    "bio-h5": H5,
    "bio-17": T17,
  }});
})();
