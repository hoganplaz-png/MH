/* Biology - diagrams and graphs to know (original). Topics bio-1 ... bio-10 (incl. bio-h1). */
(function () {
  // ---------- tiny SVG helpers (all colours via currentColor / CSS variables) ----------
  const A = "var(--fig-a)", B = "var(--fig-b)", G = "var(--fig-c)", D = "var(--fig-d)", MU = "var(--fig-muted)", F = "var(--fig-fill)";
  const svg = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-size="12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;
  const anc = (a) => (a === "m" ? ' text-anchor="middle"' : a === "e" ? ' text-anchor="end"' : "");
  const T = (x, y, s, a, o) => { o = (o || "").replace(/\s*stroke="none"/g, ""); return `<text x="${x}" y="${y}"${anc(a)}${/fill=/.test(o) ? "" : ' fill="currentColor"'} stroke="none"${o ? " " + o.trim() : ""}>${s}</text>`; };
  const Ts = (x, y, s, a, c) => `<text x="${x}" y="${y}"${anc(a)} fill="${c || "currentColor"}" stroke="none" font-size="11">${s}</text>`;
  const ln = (x1, y1, x2, y2, o) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${o ? " " + o : ""}/>`;
  const dash = (x1, y1, x2, y2, c) => ln(x1, y1, x2, y2, `stroke-dasharray="3 3"${c ? ` stroke="${c}"` : ""}`);
  const C = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}"${o ? " " + o : ""}/>`;
  const E = (x, y, rx, ry, o) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${o ? " " + o : ""}/>`;
  const R = (x, y, w, h, o) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${o ? " " + o : ""}/>`;
  const P = (d, o) => `<path d="${d}"${o ? " " + o : ""}/>`;
  const fill = (c) => `fill="${c}"`;
  // label with a ruled leader line from the structure (x1,y1) to the text at (x2,y2)
  const lab = (x1, y1, x2, y2, s) => ln(x1, y1, x2, y2, 'stroke-width="0.8"') + T(x2 + (x2 >= x1 ? 3 : -3), y2 + 4, s, x2 >= x1 ? "" : "e");
  const mk = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor" stroke="none"/></marker></defs>`;
  const ar = (x1, y1, x2, y2, id, o) => ln(x1, y1, x2, y2, `marker-end="url(#${id})"${o ? " " + o : ""}`);
  const box = (x, y, w, h, lines, o) => R(x, y, w, h, `rx="5" ${o || fill(F)}`) + lines.map((s, i) => T(x + w / 2, y + h / 2 + 4 + (i - (lines.length - 1) / 2) * 14, s, "m")).join("");
  const poly = (pts, o) => `<polygon points="${pts.map((p) => p.map((v) => +v.toFixed(1)).join(",")).join(" ")}"${o ? " " + o : ""}/>`;
  const ngon = (cx, cy, r, n, rot) => Array.from({ length: n }, (_, i) => { const a = (rot + (360 * i) / n) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });

  // Haworth projection of glucose; (x,y) = top-left of ring; skip = substituent keys to omit ("1d", "4d" ...)
  const glucose = (x, y, alpha, skip = [], num = true) => {
    const v = { 4: [0, 25], 5: [30, 0], O: [80, 0], 1: [110, 25], 2: [80, 50], 3: [30, 50] };
    const p = (k) => [x + v[k][0], y + v[k][1]];
    let s = P(`M${p(5)}L${x + 73},${y} M${x + 87},${y}L${p(1)}`) + P(`M${p(1)}L${p(2)}L${p(3)}L${p(4)}L${p(5)}`) + P(`M${p(1)}L${p(2)}L${p(3)}L${p(4)}`, 'stroke-width="3"') + T(x + 80, y + 4, "O", "m");
    const sub = (k, up, txt, len = 18) => {
      if (skip.includes(k + (up ? "u" : "d"))) return "";
      const [a, b] = p(k), e = up ? b - len : b + len;
      return ln(a, b, a, e) + T(a, up ? e - 3 : e + 11, txt, "m", 'font-size="11"');
    };
    s += sub(1, true, alpha ? "H" : "OH") + sub(1, false, alpha ? "OH" : "H");
    s += sub(2, true, "H", 14) + sub(2, false, "OH") + sub(3, true, "OH", 14) + sub(3, false, "H") + sub(4, true, "H") + sub(4, false, "OH") + sub(5, true, "CH₂OH");
    if (num) s += [[1, 9, -3], [2, 8, 4], [3, -12, 4], [4, -10, 12], [5, -12, -4]].map(([k, dx, dy]) => Ts(p(k)[0] + dx, p(k)[1] + dy, String(k), "m", MU)).join("") + Ts(x + 37, y - 8, "6", "m", MU);
    return s;
  };
  // Haworth pentose: deoxy = true gives deoxyribose
  const pentose = (x, y, deoxy) => {
    const v = { 4: [0, 20], O: [40, 0], 1: [80, 20], 2: [64, 50], 3: [16, 50] };
    const p = (k) => [x + v[k][0], y + v[k][1]];
    let s = P(`M${p(4)}L${x + 33},${y + 3.5} M${x + 47},${y + 3.5}L${p(1)}`) + P(`M${p(1)}L${p(2)}L${p(3)}L${p(4)}`, 'stroke-width="3"') + T(x + 40, y + 4, "O", "m");
    const sub = (k, up, txt, len = 16) => { const [a, b] = p(k), e = up ? b - len : b + len; return ln(a, b, a, e) + T(a, up ? e - 3 : e + 11, txt, "m", 'font-size="11"'); };
    s += sub(4, true, "CH₂OH") + sub(1, true, "OH") + sub(2, false, deoxy ? "H" : "OH") + sub(3, false, "OH");
    s += Ts(p(1)[0] + 8, p(1)[1] + 4, "1′", "", MU) + Ts(p(2)[0] + 8, p(2)[1] + 2, "2′", "", MU) + Ts(p(3)[0] - 8, p(3)[1] + 2, "3′", "e", MU) + Ts(p(4)[0] - 6, p(4)[1] + 12, "4′", "e", MU) + Ts(p(4)[0] - 30, p(4)[1] - 20, "5′", "", MU);
    return s;
  };
  // schematic nucleotide: phosphate circle - pentagon sugar - base rectangle
  const nucleotide = (cx, cy, baseTxt, baseCol) => {
    const pg = ngon(cx, cy, 16, 5, -90);
    return poly(pg, fill(F)) + ln(pg[4][0], pg[4][1], cx - 30, cy - 22) + C(cx - 38, cy - 28, 10, fill(F)) + T(cx - 38, cy - 24, "P", "m") +
      ln(pg[1][0], pg[1][1], cx + 30, cy - 5) + R(cx + 30, cy - 15, 44, 20, `rx="3" ${fill(F)} stroke="${baseCol || A}"`) + T(cx + 52, cy - 1, baseTxt, "m") +
      Ts(cx - 38, cy - 44, "phosphate", "m") + Ts(cx - 14, cy - 22, "C5′", "", MU) + Ts(cx + 15, cy - 11, "C1′", "", MU);
  };

  const fig = {}; // figures keyed by topic
  const frames = {};
  const diagrams = {};
  const concepts = {};

  // =====================================================================================
  // bio-1 Water and nucleic acids
  // =====================================================================================
  const water = (ox, oy, h1, h2) => ln(ox, oy, h1[0], h1[1]) + ln(ox, oy, h2[0], h2[1]) + C(ox, oy, 13, fill(F)) + T(ox, oy + 4, "O", "m") +
    C(h1[0], h1[1], 8, fill(F)) + T(h1[0], h1[1] + 4, "H", "m", 'font-size="11"') + C(h2[0], h2[1], 8, fill(F)) + T(h2[0], h2[1] + 4, "H", "m", 'font-size="11"');
  const waterSvg = svg(360, 170, "Hydrogen bonding between three water molecules",
    water(80, 60, [58, 84], [104, 84]) + water(170, 120, [192, 100], [190, 146]) + water(282, 70, [262, 92], [306, 92]) +
    dash(110, 90, 158, 114, A) + dash(198, 94, 270, 74, A) +
    Ts(80, 38, "δ−", "m", D) + Ts(44, 80, "δ+", "m", B) + Ts(104, 106, "δ+", "m", B) + Ts(150, 128, "δ−", "m", D) +
    lab(134, 102, 150, 30, "hydrogen bond (dashed)") + ln(150, 34, 230, 82, 'stroke-width="0.8"') +
    ln(68, 72, 30, 132, 'stroke-width="0.8"') + T(8, 146, "polar covalent O–H bond", "") +
    Ts(80, 100, "104.5°", "m", MU) + T(290, 150, "δ+ H attracted to δ− O", "m"));
  fig["bio-1"] = [
    { title: "Hydrogen bonds between water molecules", caption: "Oxygen is more electronegative, so O is δ− and H is δ+; a hydrogen bond is the weak attraction between the δ+ H of one molecule and the δ− O of another (each molecule can form up to four). These bonds explain cohesion, high specific heat capacity and high latent heat of vaporisation.", svg: waterSvg },
    { title: "Cohesion and adhesion in a narrow tube (capillary action)", caption: "Adhesion: H-bonds between water and the hydrophilic wall (e.g. cellulose/lignin in xylem) pull water up the sides, forming a concave meniscus. Cohesion: H-bonds between water molecules pull the rest of the column along. Together they give capillary action; cohesion also lets transpiration pull a continuous column up xylem under tension.",
      svg: svg(420, 170, "Water rising in a narrow tube by capillary action", R(20, 120, 160, 40, fill(F)) + ln(20, 120, 180, 120, `stroke="${B}"`) +
        ln(70, 30, 70, 150) + ln(90, 30, 90, 150) + ln(120, 80, 120, 150) + ln(150, 80, 150, 150) +
        P("M70 60 Q80 72 90 60", `stroke="${B}"`) + R(71, 66, 18, 54, `fill="${B}" opacity=".18" stroke="none"`) + P("M120 105 Q135 113 150 105", `stroke="${B}"`) + R(121, 109, 28, 11, `fill="${B}" opacity=".18" stroke="none"`) +
        lab(72, 60, 200, 40, "adhesion: water–wall H-bonds") + lab(80, 66, 200, 62, "concave meniscus") + lab(80, 95, 200, 92, "cohesion: water–water H-bonds") +
        Ts(80, 24, "narrow", "m") + Ts(135, 74, "wide", "m") + T(200, 130, "narrower tube → water rises higher", "") + T(200, 146, "(xylem vessels are very narrow)", "")) },
    { title: "Nucleotides of DNA and RNA", caption: "A nucleotide = phosphate + pentose + base. Phosphate is linked to C5′ and the base to C1′ of the sugar. DNA: deoxyribose, bases A, T, C, G. RNA: ribose (extra –OH on C2′), bases A, U, C, G. Covalent bonds hold the three parts together.",
      svg: svg(400, 130, "DNA nucleotide compared with RNA nucleotide", nucleotide(90, 75, "base") + nucleotide(290, 75, "base", G) +
        Ts(90, 106, "deoxyribose", "m") + Ts(290, 106, "ribose", "m") + Ts(142, 95, "A, T, C or G", "m") + Ts(342, 95, "A, U, C or G", "m") + T(100, 126, "DNA nucleotide", "m") + T(300, 126, "RNA nucleotide", "m")) },
    { title: "Ribose and deoxyribose (Haworth rings)", caption: "Both are pentoses (5 carbons: four in the ring with the O, C5′ in the CH₂OH). Deoxyribose has H instead of OH on C2′ - 'deoxy' = one oxygen fewer (C₅H₁₀O₄ vs C₅H₁₀O₅).",
      svg: svg(360, 140, "Haworth projections of ribose and deoxyribose", pentose(55, 40, false) + pentose(235, 40, true) + T(95, 134, "ribose (RNA)", "m") + T(275, 134, "deoxyribose (DNA)", "m") + Ts(275, 14, "H instead of OH on C2′", "m", D) + C(299, 108, 12, `stroke="${D}"`)) },
    { title: "Complementary base pairing: purines with pyrimidines", caption: "Adenine and guanine are purines (two rings); thymine, cytosine and uracil are pyrimidines (one ring). A pairs with T (U in RNA) by 2 hydrogen bonds; G pairs with C by 3. A purine always pairs with a pyrimidine, so the helix has a constant width.",
      svg: svg(370, 120, "Base pairs A with T by two hydrogen bonds and G with C by three", R(20, 20, 120, 30, `rx="4" ${fill(F)} stroke="${A}"`) + T(80, 40, "A (purine, 2 rings)", "m") + R(170, 20, 100, 30, `rx="4" ${fill(F)} stroke="${B}"`) + T(220, 40, "T (pyrimidine)", "m") +
        dash(140, 30, 170, 30) + dash(140, 40, 170, 40) + R(20, 70, 120, 30, `rx="4" ${fill(F)} stroke="${A}"`) + T(80, 90, "G (purine, 2 rings)", "m") + R(170, 70, 100, 30, `rx="4" ${fill(F)} stroke="${B}"`) + T(220, 90, "C (pyrimidine)", "m") +
        dash(140, 77, 170, 77) + dash(140, 85, 170, 85) + dash(140, 93, 170, 93) + T(278, 39, "2 H-bonds", "") + T(278, 89, "3 H-bonds", "") + Ts(180, 114, "same total width for every base pair", "m", MU)) },
  ];
  // DNA double strand: four base pairs, antiparallel
  {
    const pairs = [["A", "T", 2], ["C", "G", 3], ["G", "C", 3], ["T", "A", 2]];
    let s = mk("ar-bio1-dna");
    pairs.forEach(([l, r, h], i) => {
      const y = 45 + i * 48, L = l === "A" || l === "G" ? 155 : 125;
      // left strand: P above sugar (5' at top)
      s += C(40, y - 24, 9, fill(F)) + T(40, y - 20, "P", "m", 'font-size="10"') + ln(46, y - 18, 64, y - 6) + poly(ngon(75, y, 12, 5, -90), fill(F));
      if (i < 3) s += ln(70, y + 10, 46, y + 18);
      // right strand: sugar with P below (5' at bottom)
      s += poly(ngon(285, y, 12, 5, -90), fill(F)) + ln(294, y + 6, 314, y + 18) + C(320, y + 24, 9, fill(F)) + T(320, y + 28, "P", "m", 'font-size="10"');
      if (i > 0) s += ln(290, y - 10, 314, y - 18);
      s += R(87, y - 9, L - 87, 18, `rx="3" ${fill(F)} stroke="${A}"`) + T((87 + L) / 2, y + 4, l, "m") + R(L + 18, y - 9, 273 - L - 18, 18, `rx="3" ${fill(F)} stroke="${B}"`) + T((L + 18 + 273) / 2, y + 4, r, "m");
      for (let k = 0; k < h; k++) s += dash(L, y - 5 + (k * 10) / (h - 1), L + 18, y - 5 + (k * 10) / (h - 1));
    });
    s += T(60, 18, "5′", "m") + T(75, 222, "3′", "m") + T(285, 25, "3′", "m") + T(320, 238, "5′", "m") + ar(14, 30, 14, 200, "ar-bio1-dna") + ar(346, 200, 346, 30, "ar-bio1-dna");
    fig["bio-1"].push({ title: "Section of a DNA molecule (four base pairs)", caption: "Sugar–phosphate backbones (covalent bonds) on the outside; complementary bases inside, joined by hydrogen bonds (2 for A–T, 3 for C–G). The strands are antiparallel: one runs 5′→3′ downwards, the other 5′→3′ upwards. The phosphate of one nucleotide links to the C3′ of the next sugar (3′–5′ link).", svg: svg(360, 244, "Section of double-stranded DNA with four antiparallel base pairs", s) });
  }
  fig["bio-1"].push(
    { title: "Hershey–Chase experiment (AHL)", caption: "Phages labelled with ³⁵S (in protein, not DNA) or ³²P (in DNA, not protein) infect E. coli; blending removes phage coats, centrifuging pellets the heavier bacteria. ³²P is found in the pellet (DNA entered the cells), ³⁵S in the supernatant (protein stayed outside) → DNA is the genetic material.",
      svg: svg(400, 190, "Hershey and Chase experiment flow with sulfur-35 and phosphorus-32", mk("ar-bio1-hc") +
        box(10, 25, 110, 42, ["phage protein coat", "labelled with ³⁵S"]) + box(10, 115, 110, 42, ["phage DNA", "labelled with ³²P"]) +
        ar(122, 46, 150, 46, "ar-bio1-hc") + ar(122, 136, 150, 136, "ar-bio1-hc") + box(152, 25, 100, 42, ["infect E. coli,", "blend, centrifuge"]) + box(152, 115, 100, 42, ["infect E. coli,", "blend, centrifuge"]) +
        ar(254, 46, 278, 46, "ar-bio1-hc") + ar(254, 136, 278, 136, "ar-bio1-hc") +
        P("M285 10 L285 70 Q297 82 309 70 L309 10") + R(286, 10, 22, 45, `fill="${D}" opacity=".3" stroke="none"`) + C(297, 66, 5, fill(MU)) + P("M285 100 L285 160 Q297 172 309 160 L309 100") + C(297, 156, 6, `fill="${D}" opacity=".8"`) +
        Ts(316, 30, "supernatant", "") + Ts(316, 44, "radioactive", "", D) + Ts(316, 66, "pellet: little", "") + Ts(316, 120, "supernatant: little", "") + Ts(316, 156, "pellet (bacteria)", "") + Ts(316, 170, "radioactive", "", D) +
        T(200, 186, "protein stays outside the cell; DNA enters the bacterium", "m")) },
    { title: "Nucleosome (AHL)", caption: "In eukaryotes DNA (negatively charged phosphates) wraps about twice around a core of eight histone proteins (positively charged) to form a nucleosome; an H1 histone holds it in place and linker DNA joins neighbouring nucleosomes. This supercoils chromosomes and helps regulate transcription.",
      svg: svg(380, 130, "Two nucleosomes joined by linker DNA", [100, 260].map((x) => C(x, 62, 30, fill(F)) + T(x, 58, "8 histones", "m", 'font-size="11"') + T(x, 72, "(octamer)", "m", 'font-size="11"') + C(x, 62, 35, `stroke="${A}" stroke-width="3"`) + C(x, 62, 39, `stroke="${A}" stroke-width="3" stroke-dasharray="40 8"`) + C(x + 30, 97, 6, fill(MU))).join("") +
        P("M10 100 Q40 100 70 92", `stroke="${A}" stroke-width="3"`) + P("M130 92 Q180 112 230 92", `stroke="${A}" stroke-width="3"`) + P("M290 92 Q330 104 370 100", `stroke="${A}" stroke-width="3"`) +
        lab(180, 102, 180, 124, "linker DNA") + lab(118, 30, 170, 14, "DNA wound ~2 turns") + lab(290, 97, 300, 122, "H1 histone")) },
  );
  frames["bio-1"] = [
    { title: "Draw and label a single DNA nucleotide", star: true, paper: "P2", where: "Paper 2 · 2–3 marks · drawing", bank: false,
      q: "Draw a labelled diagram of a DNA nucleotide.",
      marks: ["__phosphate__ (circle) linked by a line to the sugar", "pentose sugar (pentagon) labelled __deoxyribose__", "__base__ (rectangle) attached to the sugar on the opposite side from the phosphate (C1′), named as A, T, C or G"],
      svg: fig["bio-1"][2].svg, svgCaption: "Expected: phosphate on C5′, base on C1′ (left nucleotide).",
      model: "A circle labelled phosphate joined to the upper left corner (C5′) of a pentagon labelled deoxyribose; a rectangle labelled nitrogenous base (adenine, thymine, cytosine or guanine) joined to the right corner (C1′) of the pentagon.",
      accept: "simple shapes as long as each is labelled; base named as \"nitrogenous base\"",
      reject: "base attached to the phosphate; sugar labelled ribose for DNA; uracil in a DNA nucleotide",
      tip: "Phosphate 喺 C5′、base 喺 C1′，兩樣唔可以掛喺同一個角；DNA 一定寫 deoxyribose。" },
    { title: "Draw hydrogen bonding between water molecules", paper: "P2", where: "Paper 2 · 2–3 marks · drawing", bank: false,
      q: "Draw a diagram to show how hydrogen bonds form between water molecules. Include partial charges.",
      marks: ["at least two water molecules drawn with a __bent__ shape (O with two H)", "partial charges shown: __δ− on O__, __δ+ on H__", "__hydrogen bond__ drawn as a dashed line between the H of one molecule and the O of another, and labelled"],
      svg: waterSvg, model: "Two or three bent H–O–H molecules; δ− written beside each O and δ+ beside each H; a dashed line from an H of one molecule to the O of the next, labelled \"hydrogen bond\"; the solid O–H lines labelled \"polar covalent bond\".",
      accept: "H-bond drawn as dots or dashes", reject: "H-bond drawn between two H atoms or between H and O of the same molecule; a solid line for the hydrogen bond",
      tip: "Hydrogen bond 一定係虛線，由一粒分子嘅 δ+ H 去另一粒分子嘅 δ− O；同一粒分子入面嗰條實線係 covalent bond。" },
  ];

  // =====================================================================================
  // bio-2 Cell structure
  // =====================================================================================
  const prokSvg = svg(520, 200, "Prokaryotic cell ultrastructure", '<g transform="translate(70 0)">' +
    R(80, 60, 240, 90, `rx="45" ${fill(F)}`) + R(87, 67, 226, 76, 'rx="38"') + R(72, 52, 256, 106, `rx="53" stroke="${MU}" stroke-dasharray="4 3"`) +
    P("M150 100 q8 -18 20 -4 q10 14 22 -6 q12 -16 22 4 q8 14 20 -2 q8 -10 -4 12 q-14 18 -28 4 q-14 -10 -30 6 q-14 8 -22 -14", `stroke="${A}"`) +
    C(270, 90, 9, `stroke="${G}"`) + C(258, 118, 6, `stroke="${G}"`) + [[110, 95], [120, 120], [135, 80], [225, 80], [240, 125], [205, 128], [125, 105], [290, 112]].map(([x, y]) => C(x, y, 2.2, 'fill="currentColor"')).join("") +
    P("M320 105 q14 -14 26 0 t26 0 t24 0") + [110, 160, 210, 260].map((x) => ln(x, 60, x - 4, 44)).join("") +
    lab(96, 66, 40, 30, "cell wall") + lab(95, 80, 40, 60, "plasma membrane") + lab(73, 120, 40, 140, "capsule (some)") + lab(120, 120, 40, 175, "70S ribosomes") + lab(160, 92, 160, 22, "nucleoid (naked circular DNA)") +
    lab(262, 122, 290, 180, "plasmid") + lab(256, 57, 330, 30, "pili") + lab(366, 105, 380, 140, "flagellum") + lab(200, 140, 200, 188, "cytoplasm") + "</g>");
  const animalSvg = svg(540, 250, "Animal cell ultrastructure as seen with an electron microscope", '<g transform="translate(50 0)">' +
    E(210, 125, 125, 95, fill(F)) + C(185, 125, 40) + C(185, 125, 36, `stroke-dasharray="14 3"`) + C(178, 120, 12, `fill="${MU}" opacity=".6"`) +
    P("M232 98 q18 0 22 -12 M236 108 q22 0 28 -14 M238 120 q24 0 32 -16", `stroke="${B}"`) + [[245, 92], [254, 84], [252, 104], [263, 96], [256, 114], [270, 108]].map(([x, y]) => C(x, y, 1.8, 'fill="currentColor"')).join("") +
    P("M270 150 q15 -10 30 0 M268 160 q17 -10 34 0 M270 170 q15 -10 30 0", `stroke="${G}" stroke-width="2"`) + C(306, 142, 4, `stroke="${G}"`) +
    E(130, 185, 26, 12) + P("M110 185 l6 -8 l6 12 l6 -12 l6 12 l6 -12 l6 12 l6 -8", 'stroke-width="1"') +
    C(150, 68, 8, `fill="${D}" opacity=".35"`) + C(262, 196, 5) + C(240, 205, 4) + R(118, 112, 4, 12, fill(F)) + R(126, 116, 12, 4, fill(F)) +
    [[110, 150], [230, 190], [160, 200], [290, 125]].map(([x, y]) => C(x, y, 1.8, 'fill="currentColor"')).join("") +
    lab(205, 89, 240, 14, "nuclear envelope (pores)") + lab(178, 120, 75, 100, "nucleolus") + lab(152, 140, 75, 125, "nucleus (chromatin)") + lab(150, 68, 75, 60, "lysosome") +
    lab(122, 118, 75, 150, "centrioles") + lab(130, 197, 75, 222, "mitochondrion") + lab(110, 150, 75, 178, "free ribosomes (80S)") +
    lab(262, 92, 352, 60, "rough ER (ribosomes)") + lab(300, 160, 360, 160, "Golgi apparatus") + lab(306, 142, 360, 130, "vesicle") + lab(262, 196, 352, 205, "cytoplasm") + lab(330, 105, 360, 95, "plasma membrane") + "</g>");
  const plantSvg = svg(600, 250, "Plant cell ultrastructure", '<g transform="translate(100 0)">' +
    R(90, 25, 240, 200, `rx="6" stroke-width="5" stroke="${G}" opacity=".5"`) + R(90, 25, 240, 200, 'rx="6"') + R(97, 32, 226, 186, `rx="4" ${fill(F)}`) +
    R(140, 70, 140, 110, 'rx="30"') + T(210, 130, "vacuole (cell sap)", "m") + C(125, 60, 18) + C(122, 57, 6, `fill="${MU}" opacity=".6"`) +
    E(300, 80, 16, 9, `stroke="${G}"`) + E(130, 190, 16, 9, `stroke="${G}"`) + E(300, 175, 16, 9, `stroke="${G}"`) + [[300, 80], [130, 190], [300, 175]].map(([x, y]) => [-7, 0, 7].map((d) => R(x + d - 2, y - 4, 4, 8, 'stroke-width="0.8"')).join("")).join("") +
    E(205, 205, 14, 7) + P("M194 205 l4 -4 l4 8 l4 -8 l4 8 l4 -8 l4 4", 'stroke-width="0.8"') + E(308, 176, 4, 3, fill(MU)) + R(205, 22, 8, 10, 'fill="currentColor" stroke="none" opacity=".0"') + ln(210, 22, 210, 35, 'stroke-width="2"') +
    lab(92, 40, 60, 30, "cell wall (cellulose)") + lab(98, 100, 60, 100, "plasma membrane") + lab(125, 46, 60, 65, "nucleus") + lab(142, 125, 60, 140, "tonoplast") +
    lab(130, 199, 60, 200, "chloroplast") + lab(205, 210, 250, 242, "mitochondrion") + lab(210, 28, 270, 12, "plasmodesma") + lab(300, 71, 370, 55, "chloroplast (grana)") + lab(322, 120, 370, 120, "cytoplasm") + lab(310, 178, 370, 190, "starch grain") + "</g>");
  fig["bio-2"] = [
    { title: "Prokaryotic cell (electron micrograph drawing)", caption: "No nucleus or membrane-bound organelles. Naked circular DNA in a nucleoid region, plasmids, 70S ribosomes, peptidoglycan cell wall; pili, flagella and capsule are present in some species only.", svg: prokSvg },
    { title: "Animal cell (eukaryotic) ultrastructure", caption: "Nucleus with double nuclear envelope and pores, 80S ribosomes (free and on rough ER), Golgi apparatus with vesicles, mitochondria, lysosomes, centrioles; no cell wall, no large central vacuole.", svg: animalSvg },
    { title: "Plant cell ultrastructure", caption: "Cellulose cell wall with plasmodesmata, large permanent vacuole bounded by the tonoplast, chloroplasts with grana and starch grains; nucleus pushed to the edge. No centrioles in most plant cells.", svg: plantSvg },
    { title: "Atypical eukaryotic cells", caption: "Exceptions to cell theory or the 'typical' cell: red blood cells have no nucleus; skeletal muscle fibres are multinucleate (one cell, many nuclei); aseptate fungal hyphae have many nuclei and no cross walls; phloem sieve tube members have no nucleus and depend on a companion cell.",
      svg: svg(420, 150, "Red blood cell, muscle fibre, aseptate hypha and sieve tube",
        P("M20 50 q0 -14 20 -14 q20 0 20 8 q0 -8 20 -8 q20 0 20 14 q0 14 -20 14 q-20 0 -20 -8 q0 8 -20 8 q-20 0 -20 -14z", fill(F)) + T(60, 90, "red blood cell", "m") + Ts(60, 104, "no nucleus, biconcave", "m", MU) +
        R(130, 35, 140, 30, `rx="12" ${fill(F)}`) + [150, 185, 220, 252].map((x) => E(x, 42, 7, 4, fill(MU))).join("") + [160, 170, 200, 210, 235, 245].map((x) => ln(x, 47, x, 63, 'stroke-width="0.7"')).join("") + T(200, 90, "skeletal muscle fibre", "m") + Ts(200, 104, "multinucleate, striated", "m", MU) +
        P("M290 40 h120 M290 60 h120") + [305, 335, 360, 390].map((x) => E(x, 50, 5, 4, fill(MU))).join("") + T(350, 90, "aseptate hypha", "m") + Ts(350, 104, "no septa, many nuclei", "m", MU) +
        R(140, 112, 70, 34, fill(F)) + [175].map((x) => ln(x, 112, x, 146, 'stroke-dasharray="2 2"')).join("") + R(210, 118, 22, 28, fill(F)) + E(221, 132, 4, 4, fill(MU)) + Ts(250, 128, "sieve tube (no nucleus) +", "") + Ts(250, 142, "companion cell (nucleus)", "")) },
    { title: "Calculating magnification and actual size", caption: "Magnification = image size ÷ actual size. Convert to the same units first (1 mm = 1000 µm). Use the scale bar: measure the bar with a ruler, divide by the length it represents to get the magnification.",
      svg: svg(400, 140, "Measuring image size and scale bar", E(110, 60, 80, 32, fill(F)) + C(90, 60, 12) + ln(30, 105, 190, 105) + ln(30, 100, 30, 110) + ln(190, 100, 190, 110) + T(110, 122, "image length = 80 mm", "m") +
        ln(30, 132, 70, 132, 'stroke-width="3"') + Ts(78, 136, "10 µm (bar = 20 mm)", "") +
        T(220, 40, "M = bar length ÷ bar value", "") + T(220, 58, "= 20 000 µm ÷ 10 µm = ×2000", "") + T(220, 86, "actual size = image ÷ M", "") + T(220, 104, "= 80 000 µm ÷ 2000 = 40 µm", "")) },
    { title: "Calibrating an eyepiece graticule", caption: "Line up the eyepiece graticule with a stage micrometer (known divisions, e.g. 1 division = 10 µm) at the magnification you will use. Here 40 eyepiece units = 100 µm, so 1 eyepiece unit = 2.5 µm. Recalibrate whenever the objective lens is changed.",
      svg: svg(400, 110, "Eyepiece graticule lined up with a stage micrometer", ln(20, 40, 380, 40) + Array.from({ length: 41 }, (_, i) => ln(40 + i * 8, 40, 40 + i * 8, i % 10 ? 33 : 26, 'stroke-width="0.8"')).join("") + T(20, 18, "eyepiece graticule: 40 units", "") +
        R(40, 60, 320, 16, fill(F)) + Array.from({ length: 11 }, (_, i) => ln(40 + i * 32, 60, 40 + i * 32, 76, `stroke="${A}"`)).join("") + T(20, 96, "stage micrometer: 10 divisions × 10 µm = 100 µm  →  1 unit = 2.5 µm", "")) },
    { title: "Endosymbiotic origin of mitochondria and chloroplasts (AHL)", caption: "A larger cell engulfed an aerobic prokaryote (→ mitochondrion) and, in the plant line, a photosynthetic prokaryote (→ chloroplast) without digesting it. Evidence: double membranes, own circular naked DNA, 70S ribosomes, division by binary fission, similar size to bacteria.",
      svg: svg(420, 122, "Endosymbiosis sequence", mk("ar-bio2-endo") + C(50, 55, 34, fill(F)) + C(50, 55, 12) + E(110, 55, 14, 8, `stroke="${B}"`) + Ts(120, 25, "aerobic prokaryote", "m") + ar(126, 55, 156, 55, "ar-bio2-endo") +
        C(200, 55, 38, fill(F)) + C(190, 50, 12) + E(214, 66, 12, 7, `stroke="${B}"`) + E(214, 66, 15, 10, 'stroke-dasharray="3 2"') + Ts(200, 104, "engulfed, not digested", "m") + Ts(200, 117, "(double membrane)", "m") + ar(242, 55, 272, 55, "ar-bio2-endo") +
        C(330, 55, 38, fill(F)) + C(318, 48, 12) + E(342, 72, 12, 7, `stroke="${B}"`) + E(346, 38, 12, 7, `stroke="${G}"`) + Ts(330, 104, "eukaryote with mitochondria", "m") + Ts(330, 117, "(+ chloroplasts in plants)", "m")) },
  ];
  frames["bio-2"] = [
    { title: "Draw an animal cell as seen in an electron micrograph", star: true, paper: "P2", where: "Paper 2 · 3–4 marks · drawing", bank: false,
      q: "Draw a labelled diagram of the ultrastructure of a liver (animal) cell.",
      marks: ["__nucleus__ with a double __nuclear envelope__ (pores) and nucleolus", "__rough endoplasmic reticulum__ with ribosomes drawn as dots on membranes", "__Golgi apparatus__ (stack of curved cisternae) with vesicles", "__mitochondrion__ with a double membrane and cristae", "plasma membrane, cytoplasm and free (80S) ribosomes / lysosome; __no cell wall__"],
      svg: animalSvg, model: "Irregular outline (plasma membrane) enclosing cytoplasm; a large nucleus with double envelope, pores and nucleolus; rough ER beside the nucleus with ribosome dots; a Golgi stack budding vesicles; several mitochondria with cristae; lysosomes and free ribosomes. All parts labelled with ruled lines.",
      accept: "any 4 correctly drawn and labelled organelles for 4 marks", reject: "cell wall, chloroplast or large vacuole in an animal cell; ribosomes drawn larger than mitochondria",
      tip: "Animal cell 唔好畫 cell wall 同 chloroplast；mitochondria 一定要有 cristae，RER 要有 ribosome 點點。" },
    { title: "Draw a plant cell", paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw a labelled diagram of a palisade mesophyll cell as seen with an electron microscope.",
      marks: ["__cell wall__ outside a separate __plasma membrane__", "large central __vacuole__ bounded by the __tonoplast__", "__chloroplasts__ shown with internal membranes (grana)", "nucleus, mitochondrion, cytoplasm labelled"],
      svg: plantSvg, model: "A rectangular cell: thick cellulose cell wall with plasmodesmata, plasma membrane inside it, a large vacuole with tonoplast, many chloroplasts showing grana and starch grains, a nucleus near the edge and mitochondria in the thin layer of cytoplasm.",
      accept: "cell wall and membrane drawn as two lines close together", reject: "cell wall and membrane drawn as one line with two labels; centrioles drawn",
      tip: "Cell wall 同 plasma membrane 要畫兩條線；vacuole 外面嗰層叫 tonoplast。" },
  ];

  // =====================================================================================
  // bio-3 Diversity, species and evolution
  // =====================================================================================
  {
    let k = "";
    const chrom = (x, base, h) => `M${x} ${(base - h + 3).toFixed(1)}V${(base - h * 0.64 - 2).toFixed(1)}M${x} ${(base - h * 0.64 + 3).toFixed(1)}V${base - 3}`;
    const rows = [[1, 5, 62], [6, 12, 124], [13, 18, 178], [19, 22, 240]];
    let d = "", nums = "";
    rows.forEach(([a, b, base]) => {
      for (let i = a; i <= b; i++) {
        const x = 24 + (i - a) * 50, h = 54 - i * 1.9;
        d += chrom(x, base, h) + chrom(x + 11, base, h);
        nums += Ts(x + 5, base + 12, String(i), "m");
      }
    });
    k += P(d, 'stroke-width="7"') + P(chrom(236, 240, 40), `stroke-width="7" stroke="${A}"`) + P(chrom(286, 240, 16), `stroke-width="7" stroke="${B}"`) + nums + Ts(236, 252, "X", "m") + Ts(286, 252, "Y", "m");
    k += T(375, 210, "XY → male", "") + Ts(375, 226, "(female: XX)", "", MU) + [ "22 pairs of", "autosomes,", "ordered by size", "and centromere", "position"].map((t, i) => Ts(375, 30 + i * 14, t, "")).join("");
    fig["bio-3"] = [{ title: "Human karyogram (male)", caption: "Chromosomes photographed at metaphase and arranged in homologous pairs by decreasing length and centromere position: 22 pairs of autosomes + sex chromosomes (XX female, XY male), 2n = 46. Down syndrome shows three copies of chromosome 21 (trisomy 21, 47 chromosomes).", svg: svg(470, 258, "Schematic human male karyogram", k) }];
  }
  const keySvg = svg(440, 200, "Dichotomous key for five invertebrates", [
    ["1", "a", "Jointed legs present", "go to 2"], ["", "b", "No jointed legs", "go to 4"],
    ["2", "a", "Three pairs of legs", "beetle"], ["", "b", "More than three pairs of legs", "go to 3"],
    ["3", "a", "Four pairs of legs", "spider"], ["", "b", "One or two pairs of legs per segment", "centipede"],
    ["4", "a", "Shell present", "snail"], ["", "b", "No shell; body in ring-like segments", "earthworm"],
  ].map(([n, l, t, g], i) => { const y = 22 + i * 22 + Math.floor(i / 2) * 6; return T(14, y, n, "") + T(30, y, l, "") + T(46, y, t, "") + ln(270, y - 4, 330, y - 4, `stroke-dasharray="1 3" stroke="${MU}"`) + T(336, y, g, "", g.startsWith("go") ? "" : `font-weight="bold"`); }).join(""));
  fig["bio-3"].push(
    { title: "Dichotomous key (numbered couplets)", caption: "Each step offers two mutually exclusive choices based on clearly visible features (not colour or size that varies); each choice leads to a name or to the next numbered couplet. n organisms need n − 1 couplets.", svg: keySvg },
    { title: "Pentadactyl limb: homologous structure", caption: "Same bone pattern (one upper bone, two lower bones, wrist bones, five digits) in human arm, bat wing, whale flipper, bird wing and frog forelimb, adapted for different functions → evidence of common ancestry and adaptive radiation (divergent evolution).",
      svg: svg(360, 270, "Generalised pentadactyl forelimb", '<g transform="translate(40 0)">' + R(66, 10, 20, 70, `rx="8" ${fill(F)}`) + R(56, 86, 12, 62, `rx="5" ${fill(F)}`) + R(84, 86, 12, 62, `rx="5" ${fill(F)}`) +
        [[50, 154], [64, 152], [78, 152], [92, 154], [54, 166], [68, 166], [82, 166], [96, 166]].map(([x, y]) => R(x, y, 11, 9, `rx="3" ${fill(F)}`)).join("") +
        [40, 56, 72, 88, 104].map((x, i) => R(x, 180, 8, 28, `rx="3" ${fill(F)} stroke="${B}"`) + Array.from({ length: i ? 3 : 2 }, (_, j) => R(x, 212 + j * 17, 8, 14, `rx="3" ${fill(F)} stroke="${A}"`)).join("")).join("") +
        lab(86, 40, 150, 40, "humerus (1 bone)") + lab(56, 118, 20, 118, "radius") + lab(96, 125, 150, 125, "ulna") + lab(107, 162, 150, 160, "carpals (wrist)") + lab(112, 194, 150, 194, "metacarpals") + lab(112, 230, 150, 230, "phalanges (digits 1–5)") + Ts(150, 258, "same plan, different functions", "", MU) + "</g>") },
    { title: "Allopatric and sympatric speciation", caption: "Speciation needs reproductive isolation of a population followed by differential natural selection (and drift). Allopatric = geographical separation; sympatric = isolation in the same area (behavioural, temporal or polyploidy). Gene pools diverge until the groups can no longer interbreed to produce fertile offspring.",
      svg: svg(460, 230, "Flow of allopatric and sympatric speciation", mk("ar-bio3-sp") + T(115, 14, "Allopatric", "m", 'font-weight="bold"') + T(345, 14, "Sympatric", "m", 'font-weight="bold"') +
        [["one population, one gene pool"], ["geographical barrier (river,", "mountain, sea) → no gene flow"], ["different selection pressures,", "mutations and genetic drift"], ["reproductive isolation →", "two species"]].map((l, i) => box(15, 22 + i * 52, 200, 38, l) + (i < 3 ? ar(115, 60 + i * 52, 115, 73 + i * 52, "ar-bio3-sp") : "")).join("") +
        [["one population, same area"], ["behavioural / temporal isolation", "or polyploidy (plants)"], ["no gene flow between groups;", "gene pools diverge"], ["reproductive isolation →", "two species"]].map((l, i) => box(245, 22 + i * 52, 200, 38, l) + (i < 3 ? ar(345, 60 + i * 52, 345, 73 + i * 52, "ar-bio3-sp") : "")).join("")) },
    { title: "Adaptive radiation (e.g. Galápagos finches)", caption: "One ancestral species diversifies into many species, each adapted to a different niche (here beak shapes for different foods). The beak/limb structures are homologous; divergence follows differential selection in different niches.",
      svg: svg(440, 170, "Adaptive radiation from one ancestor", P("M220 160 L220 120 M220 120 L60 40 M220 120 L170 40 M220 120 L270 40 M220 120 L380 40", `stroke="${A}" stroke-width="2"`) + C(220, 120, 4, 'fill="currentColor"') + T(232, 150, "ancestral species", "") +
        [[60, "large ground finch", "thick beak: seeds"], [170, "warbler finch", "thin beak: insects"], [270, "cactus finch", "long beak: cactus"], [380, "woodpecker finch", "tool use: grubs"]].map(([x, a, b]) => T(x, 18, a, "m") + Ts(x, 32, b, "m", MU)).join("")) },
  );
  frames["bio-3"] = [
    { title: "Construct a dichotomous key", star: true, paper: "P1B", where: "Paper 1B / Paper 2 · 3–4 marks", bank: false,
      q: "Using visible features, construct a dichotomous key to identify the five invertebrates: beetle, spider, centipede, snail and earthworm.",
      marks: ["key set out as __numbered pairs__ (couplets) of __alternative / contrasting__ statements", "each statement uses an __observable__ feature (legs, shell, segments), not behaviour or habitat", "each statement leads to __a name or the next number__", "all five organisms correctly identified with __four couplets__ (n − 1)"],
      svg: keySvg, model: "1a jointed legs → 2; 1b no jointed legs → 4. 2a three pairs of legs → beetle; 2b more than three pairs → 3. 3a four pairs of legs → spider; 3b one or two pairs per segment → centipede. 4a shell present → snail; 4b no shell, segmented body → earthworm.",
      accept: "a branching (tree) layout with yes/no questions", reject: "features such as colour, size, 'dangerous' or habitat; three options at one step",
      tip: "每一步只可以有兩個相反嘅選擇，用睇得到嘅特徵（腳、殼、分節）；5 個生物要 4 對 couplet。" },
    { title: "Draw and annotate allopatric speciation", paper: "P2", where: "Paper 2 · 4 marks · annotated diagram", bank: false,
      q: "Using an annotated diagram, explain how allopatric speciation can occur.",
      marks: ["one population with a shared gene pool is split by a __geographical barrier__", "__no gene flow__ between the two populations", "__different selection pressures__ / mutations / genetic drift change allele frequencies", "populations become __reproductively isolated__: cannot interbreed to produce __fertile offspring__ even if the barrier is removed → new species"],
      svg: fig["bio-3"][3].svg, svgCaption: "Left column = allopatric speciation.", model: "A population of one species is divided by a geographical barrier such as a mountain range, so there is no gene flow. Each population experiences different environmental conditions and therefore different selection pressures; random mutation and genetic drift also differ. Allele frequencies diverge over many generations until the populations can no longer interbreed to produce fertile offspring - they are separate species.",
      accept: "named example such as Kaibab and Abert squirrels either side of the Grand Canyon", reject: "\"the animals adapt because they need to\"; omitting reproductive isolation",
      tip: "關鍵字：geographical barrier → no gene flow → different selection pressures → reproductive isolation。冇最後嗰步唔算 speciation。" },
  ];

  // =====================================================================================
  // bio-h1 Origins of cells, viruses and cladistics (AHL)
  // =====================================================================================
  const phageSvg = svg(400, 250, "Bacteriophage T4 structure", poly(ngon(110, 55, 38, 6, -90), fill(F)) + P("M95 40 q10 -10 18 2 q8 12 -6 16 q-14 4 -4 14 q10 8 20 -4", `stroke="${A}"`) +
    R(100, 93, 20, 7, fill(F)) + R(103, 100, 14, 78, fill(F)) + [110, 122, 134, 146, 158, 170].map((y) => ln(103, y, 117, y, 'stroke-width="0.8"')).join("") + R(90, 178, 40, 7, fill(F)) +
    P("M92 185 L66 205 L72 240 M128 185 L154 205 L148 240 M100 185 L86 210 L94 238 M120 185 L134 210 L126 238") +
    lab(140, 30, 190, 22, "head / capsid (protein coat)") + lab(110, 55, 190, 50, "DNA (genetic material)") + lab(120, 96, 190, 92, "collar") + lab(117, 140, 190, 135, "tail sheath (contractile)") + lab(130, 182, 190, 182, "base plate") + lab(152, 215, 190, 220, "tail fibres (attach to host)"));
  const cladeSvg = svg(440, 230, "Annotated cladogram of five taxa", R(178, 92, 200, 112, `rx="8" fill="${A}" opacity=".10" stroke="none"`) +
    P("M30 67 H70 M70 30 V105 M70 30 H340 M70 105 H130 M130 70 V140 M130 70 H340 M130 140 H190 M190 110 V170 M190 110 H340 M190 170 H250 M250 150 V190 M250 150 H340 M250 190 H340", `stroke-width="2"`) +
    ["A", "B", "C", "D", "E"].map((t, i) => T(348, [34, 74, 114, 154, 194][i], "species " + t, "")).join("") +
    C(130, 105, 4, 'fill="currentColor"') + C(190, 140, 4, 'fill="currentColor"') + C(250, 170, 4, 'fill="currentColor"') + C(70, 67, 4, 'fill="currentColor"') +
    lab(30, 67, 40, 92, "root") + lab(190, 140, 160, 190, "node = common ancestor") + lab(300, 70, 280, 50, "terminal branch") + T(375, 222, "clade C–E (shaded)", "m", `fill="${A}" stroke="none"`) + Ts(196, 24, "outgroup", "", MU) + Ts(196, 64, "", "") );
  fig["bio-h1"] = [
    { title: "Miller–Urey apparatus", caption: "Simulated early-Earth conditions: water boiled (ocean) to give vapour; a reducing atmosphere of CH₄, NH₃ and H₂ with no O₂; electric sparks (lightning) provided energy; a condenser cooled the gases (rain). After a week, amino acids and other organic compounds collected in the trap → organic molecules can form abiotically.",
      svg: svg(570, 240, "Miller and Urey apparatus", mk("ar-bioh1-mu") + '<g transform="translate(110 0)">' + C(70, 180, 24, fill(F)) + R(64, 140, 12, 18) + P("M70 140 V60 H192") + ar(110, 60, 140, 60, "ar-bioh1-mu") +
        C(230, 70, 40, fill(F)) + ln(212, 18, 220, 58, 'stroke-width="2"') + ln(248, 18, 240, 58, 'stroke-width="2"') + P("M220 60 l5 -6 l4 8 l5 -8 l6 6", `stroke="${D}"`) + Ts(230, 82, "CH₄, NH₃,", "m") + Ts(230, 95, "H₂, H₂O", "m") +
        P("M230 110 V200") + R(220, 125, 20, 55, `rx="4" stroke="${B}"`) + ar(254, 172, 241, 172, "ar-bioh1-mu", `stroke="${B}"`) + ar(241, 132, 254, 132, "ar-bioh1-mu", `stroke="${B}"`) +
        C(230, 208, 9, `fill="${A}" opacity=".35"`) + P("M221 210 H110 L90 195") + P("M58 222 l12 -16 l12 16", `stroke="${D}"`) +
        lab(48, 180, 20, 140, "boiling water (‘ocean’)") + lab(82, 214, 110, 230, "heat") + lab(250, 30, 300, 20, "electrodes: sparks (‘lightning’)") + lab(270, 70, 300, 64, "gases: early atmosphere") + Ts(306, 79, "(reducing, no O₂)", "", MU) +
        lab(256, 150, 300, 150, "condenser (cooling water)") + lab(239, 208, 300, 205, "trap: samples taken") + Ts(306, 220, "amino acids found", "", A) + "</g>") },
    { title: "Bacteriophage (T4) structure", caption: "Viruses are acellular: genetic material (here DNA) inside a protein capsid, no cytoplasm or metabolism, replicate only inside a host cell. T4 attaches to E. coli by its tail fibres and injects DNA through the tail.", svg: phageSvg },
    { title: "Enveloped RNA virus (HIV)", caption: "HIV: two copies of single-stranded RNA and reverse transcriptase inside a cone-shaped protein capsid, surrounded by a lipid envelope (taken from the host cell membrane) studded with glycoproteins that bind CD4 receptors on helper T-cells.",
      svg: svg(410, 220, "Structure of HIV", Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180, x1 = 110 + 72 * Math.cos(a), y1 = 110 + 72 * Math.sin(a), x2 = 110 + 86 * Math.cos(a), y2 = 110 + 86 * Math.sin(a); return ln(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), `stroke="${G}" stroke-width="2"`) + C(x2.toFixed(1), y2.toFixed(1), 4, `fill="${G}" stroke="none"`); }).join("") +
        C(110, 110, 72, fill(F)) + C(110, 110, 66) + poly([[94, 64], [126, 64], [146, 156], [74, 156]]) + P("M98 80 q8 10 0 20 q-8 10 0 20 q8 10 0 20 M118 80 q8 10 0 20 q-8 10 0 20 q8 10 0 20", `stroke="${A}" stroke-width="1.8"`) + C(108, 146, 3, `fill="${D}" stroke="none"`) + C(124, 140, 3, `fill="${D}" stroke="none"`) +
        lab(186, 66, 230, 40, "glycoproteins (gp120)") + lab(178, 110, 230, 80, "lipid envelope (from host)") + lab(140, 124, 230, 120, "capsid (protein)") + lab(118, 100, 230, 155, "RNA (2 strands)") + lab(124, 140, 230, 185, "reverse transcriptase")) },
  ];
  {
    const id = "ar-bioh1-ly";
    fig["bio-h1"].push({ title: "Lytic and lysogenic cycles of a bacteriophage", caption: "Lytic: attach → inject DNA → host machinery copies viral DNA and makes capsid proteins → assembly → lysis releases many phages (host killed). Lysogenic (e.g. phage λ): viral DNA integrates into the host chromosome as a prophage and is copied every time the cell divides; a trigger (e.g. UV) induces it to leave and enter the lytic cycle.",
      svg: svg(490, 260, "Flow of lytic and lysogenic cycles", mk(id) + T(416, 84, "LYTIC", "", `font-weight="bold" fill="${D}" stroke="none"`) + T(240, 252, "LYSOGENIC", "m", `font-weight="bold" fill="${B}" stroke="none"`) +
        box(10, 10, 130, 44, ["1 attachment of tail", "fibres to receptors"]) + ar(140, 32, 172, 32, id) + box(174, 10, 130, 44, ["2 injection of", "phage DNA"]) + ar(304, 32, 336, 32, id) +
        box(338, 6, 142, 56, ["3 phage DNA copied;", "capsid proteins made", "by host machinery"]) + ar(409, 62, 409, 96, id) + box(338, 98, 142, 40, ["4 assembly of", "new phages"]) + ar(409, 138, 409, 166, id) + box(338, 168, 142, 44, ["5 lysis: cell bursts,", "phages released"]) +
        P("M409 212 V232 H75 V56", `marker-end="url(#${id})"`) + Ts(250, 228, "new phages infect other cells", "m", MU) +
        ar(239, 54, 239, 82, id, `stroke="${B}"`) + box(174, 84, 130, 56, ["phage DNA integrates", "into host chromosome", "(prophage)"], `${fill(F)} stroke="${B}"`) + ar(239, 140, 239, 160, id, `stroke="${B}"`) +
        box(174, 162, 130, 44, ["cell divides: prophage", "copied to daughters"], `${fill(F)} stroke="${B}"`) + P("M174 184 H150 V112 H172", `stroke="${B}" marker-end="url(#${id})"`) +
        P("M304 112 H322 V40 H336", `stroke="${B}" marker-end="url(#${id})"`) + `<text x="316" y="76" transform="rotate(-90 316 76)" text-anchor="middle" fill="${B}" stroke="none" font-size="11">induction (UV)</text>`) });
  }
  fig["bio-h1"].push(
    { title: "Cladogram: root, nodes, clades and terminal branches", caption: "Each node is a hypothetical common ancestor where a lineage split; a clade is a common ancestor and ALL its descendants; the root is the common ancestor of every species shown. Species sharing a more recent node (D and E) are more closely related. Rotating branches about a node does not change the relationships.", svg: cladeSvg },
    { title: "Three-domain classification", caption: "Based on rRNA base sequences (Woese): Bacteria, Archaea and Eukarya. Archaea share a more recent common ancestor with Eukarya than with Bacteria (e.g. histones, introns in some genes, similar RNA polymerase), despite both prokaryote groups lacking a nucleus.",
      svg: svg(440, 190, "Three-domain tree", P("M220 180 V140 M220 140 L90 60 M220 140 L300 100 M300 100 L240 60 M300 100 L360 60", `stroke="${A}" stroke-width="2"`) + C(220, 140, 4, 'fill="currentColor"') + C(300, 100, 4, 'fill="currentColor"') +
        T(90, 20, "Bacteria", "m", 'font-weight="bold"') + Ts(90, 34, "peptidoglycan walls", "m") + Ts(90, 47, "no histones", "m") +
        T(230, 20, "Archaea", "m", 'font-weight="bold"') + Ts(230, 34, "no peptidoglycan", "m") + Ts(230, 47, "ether-linked lipids", "m") +
        T(370, 20, "Eukarya", "m", 'font-weight="bold"') + Ts(370, 34, "nucleus, organelles", "m") + Ts(370, 47, "80S ribosomes", "m") + Ts(232, 176, "universal common ancestor (LUCA)", "", MU)) },
  );
  diagrams["bio-h1"] = [
    { title: "Molecular clock: sequence differences increase steadily with time since divergence", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time since divergence", yLabel: "Base differences",
      curves: [{ f: (t) => 0.85 * t, domain: [0, 10] }], texts: [{ at: [5.5, 3.2], text: "approx. constant mutation rate" }] },
  ];
  frames["bio-h1"] = [
    { title: "Draw a labelled bacteriophage", paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw a labelled diagram of the structure of a bacteriophage.",
      marks: ["__capsid__ / protein coat (polyhedral head) labelled", "__nucleic acid / DNA__ shown inside the head", "__tail__ (sheath) with base plate and __tail fibres__ labelled"],
      svg: phageSvg, model: "Hexagonal (icosahedral) head labelled capsid (protein coat), containing a coiled line labelled DNA; a collar below it; a straight tail sheath; a base plate; several jointed tail fibres extending downward.",
      accept: "nucleic acid / genetic material for DNA", reject: "cell membrane, ribosomes or cytoplasm drawn in the virus",
      tip: "病毒冇細胞結構：只畫 capsid + DNA + tail，唔好畫 ribosome 或 cytoplasm。" },
    { title: "Annotate a cladogram", star: true, paper: "P1B", where: "Paper 1B · 2–4 marks", bank: false,
      q: "On the cladogram, label a node, the root and a clade, and state which species is most closely related to species D.",
      marks: ["__node__ labelled at a branching point (represents a hypothetical common ancestor)", "__root__ labelled at the base of the tree", "a __clade__ circled that includes a common ancestor and __all__ of its descendants", "species __E__ is most closely related to D (they share the most recent common ancestor)"],
      svg: cladeSvg, model: "Node: any branch point, e.g. where C splits from the D–E lineage. Root: the start of the tree on the left. Clade: C, D and E with their common ancestor (shaded). D is most closely related to E because they share the most recent common ancestor.",
      accept: "any correct clade (e.g. D + E, or B–E)", reject: "a group that leaves out one descendant of the ancestor (paraphyletic), e.g. B + C only",
      tip: "Clade 一定要包晒個 ancestor 下面所有後代；邊兩個最近親 = 共用最近嘅 node，唔係睇邊個排得近。" },
  ];

  // =====================================================================================
  // bio-4 Biodiversity, populations and communities
  // =====================================================================================
  diagrams["bio-4"] = [
    { title: "Exponential (J) growth vs logistic (S) growth", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time", yLabel: "Population size",
      curves: [{ f: (t) => 0.3 * Math.exp(0.75 * t), domain: [0, 4.65], color: "b", label: "J: unlimited resources", labelX: 4.2 }, { f: (t) => 7 / (1 + 22.33 * Math.exp(-0.75 * t)), domain: [0, 10], label: "S: resources limited", labelX: 6.4 }],
      hlines: [{ y: 7, label: "K (carrying capacity)" }] },
    { title: "Interspecific competition (Gause): species grown together", x: [0, 20], y: [0, 10], origin: false, grid: false, xLabel: "Time / days", yLabel: "Population density",
      curves: [{ f: (t) => 8 / (1 + Math.exp(-0.6 * (t - 7))), label: "P. aurelia", labelX: 15 }, { f: (t) => (3.6 / (1 + Math.exp(-0.7 * (t - 4)))) * Math.exp(-0.012 * Math.max(0, t - 6) ** 2), color: "b", label: "P. caudatum", labelX: 12 }],
    },
    { title: "Species–sampling effort curve: sample until the curve plateaus", x: [0, 20], y: [0, 10], origin: false, grid: false, xLabel: "Number of quadrats sampled", yLabel: "Cumulative species",
      curves: [{ f: (n) => 8 * (1 - Math.exp(-n / 4)) }], vlines: [{ x: 14, label: "enough samples" }] },
  ];
  {
    // kite diagram
    const sp = [["Species X", [8, 7, 6, 4, 2, 0, 0, 0, 0, 0, 0], A], ["Species Y", [0, 1, 3, 6, 8, 7, 5, 3, 1, 0, 0], B], ["Species Z", [0, 0, 0, 0, 1, 2, 4, 6, 8, 8, 7], G]];
    let k = "";
    sp.forEach(([n, v, c], j) => {
      const y0 = 40 + j * 55, xs = v.map((_, i) => 90 + i * 30);
      k += ln(90, y0, 390, y0, `stroke="${MU}" stroke-width="0.8"`) + poly(xs.map((x, i) => [x, y0 - v[i] * 2.6]).concat(xs.map((x, i) => [x, y0 + v[i] * 2.6]).reverse()), `fill="${c}" fill-opacity=".35" stroke="${c}"`) + T(80, y0 + 4, n, "e");
    });
    k += ln(90, 200, 390, 200) + Array.from({ length: 11 }, (_, i) => ln(90 + i * 30, 200, 90 + i * 30, 205) + Ts(90 + i * 30, 217, String(i * 5), "m")).join("") + T(240, 234, "Distance along transect / m", "m") + ln(400, 20, 400, 41, `stroke-width="2"`) + Ts(404, 34, "= 8", "");
    var kiteSvg = svg(440, 242, "Kite diagram of three species along a transect", k);
  }
  fig["bio-4"] = [
    { title: "Random quadrat sampling", caption: "Lay two tape measures at right angles; use random numbers to give coordinates; place the quadrat (e.g. 1 m²) at each and count individuals or estimate percentage cover. Mean per quadrat × total area = population estimate. Suitable for sessile or slow-moving organisms in a uniform area.",
      svg: svg(400, 210, "Grid with randomly placed quadrats", R(40, 20, 240, 160, fill(F)) + ln(40, 180, 290, 180, 'stroke-width="2"') + ln(40, 180, 40, 10, 'stroke-width="2"') + [[70, 40], [150, 60], [210, 30], [100, 120], [230, 130], [175, 150]].map(([x, y]) => R(x, y, 20, 20, `stroke="${A}" stroke-width="2"`)).join("") +
        [[60, 70], [120, 90], [200, 100], [250, 70], [80, 160], [140, 40]].map(([x, y]) => C(x, y, 3, `fill="${G}" stroke="none"`)).join("") + T(160, 198, "tape measure (x coordinate)", "m") + `<text x="26" y="100" transform="rotate(-90 26 100)" text-anchor="middle" fill="currentColor" stroke="none">tape (y)</text>` +
        lab(250, 140, 300, 140, "quadrat at random") + T(303, 158, "coordinates", "") + T(300, 40, "e.g. (7, 3)", "") + T(300, 56, "from random", "") + T(300, 72, "number table", "")) },
    { title: "Transect sampling along an environmental gradient", caption: "A line transect records organisms touching the line at fixed intervals; a belt transect places quadrats at regular intervals along the line. Used where conditions change across a habitat (e.g. shore, woodland edge, sand-dune succession), with an abiotic factor measured at each point.",
      svg: svg(470, 150, "Belt transect with quadrats at intervals", P("M10 110 Q120 90 210 70 T410 30", fill(F)) + ln(20, 100, 400, 40, 'stroke-dasharray="6 4" stroke-width="1.6"') + [0, 1, 2, 3, 4, 5].map((i) => { const x = 30 + i * 70, y = 98 - i * 11; return R(x - 10, y - 10, 20, 20, `stroke="${A}" stroke-width="2"`); }).join("") +
        Ts(20, 130, "sea / open ground", "") + Ts(400, 20, "woodland / older dunes", "e") + lab(240, 64, 280, 120, "quadrat every 5 m") + lab(330, 51, 330, 100, "tape (transect line)") + Ts(210, 146, "measure an abiotic factor (light, pH, salinity) at each quadrat", "m", MU)) },
    { title: "Kite diagram from a transect", caption: "Each species has its own baseline; the kite's width at each sampling point is proportional to abundance (drawn equally above and below the line). A scale bar shows the width for a given count or % cover. Here X dominates near the start, Z at the end - zonation along the gradient.", svg: kiteSvg },
    { title: "Capture–mark–release–recapture (Lincoln index)", caption: "Assumptions: marks are not lost and do not affect survival or recapture; marked animals mix fully; no births, deaths or migration between samples; sampling methods are the same both times.",
      svg: svg(440, 150, "Steps of capture mark release recapture", mk("ar-bio4-cmr") + box(10, 20, 95, 50, ["1 capture M", "and mark"]) + ar(105, 45, 120, 45, "ar-bio4-cmr") + box(122, 20, 95, 50, ["2 release;", "allow to mix"]) + ar(217, 45, 232, 45, "ar-bio4-cmr") +
        box(234, 20, 95, 50, ["3 recapture n", "count marked m"]) + ar(329, 45, 344, 45, "ar-bio4-cmr") + box(346, 20, 86, 50, ["4 estimate N"], `fill="${F}" stroke="${A}"`) + T(220, 108, "N = (M × n) ÷ m", "m", 'font-size="14" font-weight="bold"') + Ts(220, 130, "e.g. M = 40, n = 50, m = 10 → N = 2000 ÷ 10 = 200", "m")) },
    { title: "Chi-squared test for association: contingency table", caption: "Presence/absence of two species in the same quadrats. Expected = (row total × column total) ÷ grand total. χ² = Σ (O − E)² ÷ E; degrees of freedom = (rows − 1)(columns − 1) = 1; critical value at p = 0.05 is 3.84. χ² > 3.84 → reject H₀ (species are associated).",
      svg: svg(440, 150, "Two by two contingency table with observed and expected values", [0, 1, 2, 3].map((i) => ln(20, 20 + i * 32, 420, 20 + i * 32)).join("") + [20, 130, 250, 370, 420].map((x) => ln(x, 20, x, 116)).join("") +
        T(190, 40, "B present", "m") + T(310, 40, "B absent", "m") + T(395, 40, "total", "m") + T(75, 72, "A present", "m") + T(75, 104, "A absent", "m") +
        T(190, 72, "O = 30 (E = 20)", "m") + T(310, 72, "O = 10 (E = 20)", "m") + T(395, 72, "40", "m") + T(190, 104, "O = 20 (E = 30)", "m") + T(310, 104, "O = 40 (E = 30)", "m") + T(395, 104, "60", "m") +
        T(190, 136, "total 50", "m") + T(310, 136, "total 50", "m") + T(395, 136, "100", "m") + Ts(20, 136, "E(A,B) = 40×50÷100 = 20", "")) },
  ];
  frames["bio-4"] = [
    { title: "Draw a kite diagram from transect data", paper: "P1B", where: "Paper 1B · 3 marks · data-based", bank: false,
      q: "Using the transect data (abundance of three species at 5 m intervals), draw a kite diagram.",
      marks: ["x-axis = __distance along the transect__ with units; a separate __baseline__ for each species, labelled", "kite width at each point __proportional to abundance__, drawn __symmetrically__ above and below the baseline", "points plotted at the correct distances and joined; __scale/key__ for width given"],
      svg: kiteSvg, model: "Three horizontal baselines labelled X, Y and Z over a shared x-axis (distance / m, 0–50). At each 5 m point half the abundance is drawn above and half below the baseline (here 2.6 units per individual each side) and the points are joined to form kites; a scale bar shows the width that equals 8 individuals.",
      accept: "percentage cover instead of number", reject: "drawing the kite only above the baseline (that is a line graph); species stacked on one baseline",
      tip: "Kite 係上下對稱，闊度代表數量；每個 species 一條 baseline，記得畫 scale bar。" },
    { title: "Sketch the outcome of interspecific competition", paper: "P2", where: "Paper 2 · 3 marks · sketch", bank: false,
      q: "Two species of Paramecium that feed on the same bacteria are grown separately and then together. Sketch the expected population curves when grown together and explain them.",
      marks: ["both populations increase at first (resources plentiful)", "one species (P. aurelia) reaches a __plateau / carrying capacity__", "the other species __declines to zero__ - __competitive exclusion__", "explanation: same __niche__ / same limiting resource; the better competitor obtains more food and reproduces faster"],
      diagram: { title: "Competitive exclusion when grown together", x: [0, 20], y: [0, 10], origin: false, grid: false, xLabel: "Time / days", yLabel: "Population density",
        curves: [{ f: (t) => 8 / (1 + Math.exp(-0.6 * (t - 7))), label: "P. aurelia", labelX: 15 }, { f: (t) => (3.6 / (1 + Math.exp(-0.7 * (t - 4)))) * Math.exp(-0.012 * Math.max(0, t - 6) ** 2), color: "b", label: "P. caudatum", labelX: 12 }] },
      model: "Both curves rise from the start. P. aurelia follows a sigmoid curve and levels off at its carrying capacity. P. caudatum rises to a lower peak and then falls to zero. Both species occupy the same niche, so they compete for the same limited food; P. aurelia is the better competitor, so P. caudatum is excluded (competitive exclusion principle).",
      accept: "the opposite species winning if justified", reject: "both species levelling off at the same density",
      tip: "同一個 niche 唔可以有兩個物種長期共存：一條 S-curve，一條升完跌到零。" },
  ];

  // =====================================================================================
  // bio-5 Carbohydrates, lipids and proteins
  // =====================================================================================
  // simple atom/bond drawing
  const at = (x, y, s, c) => T(x, y + 4, s, "m", c ? `fill="${c}"` : "");
  const bd = (x1, y1, x2, y2, dbl, c) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), g = 9, ux = dx / L, uy = dy / L; const a = [x1 + ux * g, y1 + uy * g, x2 - ux * g, y2 - uy * g].map((v) => +v.toFixed(1)); let s = ln(a[0], a[1], a[2], a[3], c ? `stroke="${c}" stroke-width="2.4"` : ""); if (dbl) s += ln(a[0] + uy * 3, a[1] - ux * 3, a[2] + uy * 3, a[3] - ux * 3); return s; };
  // zigzag hydrocarbon tail; returns {d, pts}
  const zz = (x, y, n, ang, kinkAt, kinkDeg) => {
    const pts = [[x, y]]; let a = ang;
    for (let i = 0; i < n; i++) { if (i === kinkAt) a += kinkDeg || 0; const t = (a + (i % 2 ? -30 : 30)) * Math.PI / 180; const [px, py] = pts[i]; pts.push([px + 14 * Math.cos(t), py + 14 * Math.sin(t)]); }
    return pts;
  };
  const zzPath = (pts, dbl) => { let s = P("M" + pts.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join("L")); if (dbl != null) { const [a, b] = [pts[dbl], pts[dbl + 1]]; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); s += ln((a[0] - dy / L * 4 + dx * 0.15).toFixed(1), (a[1] + dx / L * 4 + dy * 0.15).toFixed(1), (b[0] - dy / L * 4 - dx * 0.15).toFixed(1), (b[1] + dx / L * 4 - dy * 0.15).toFixed(1), `stroke="${D}"`); } return s; };
  const glucSvg = svg(400, 150, "Alpha and beta glucose ring structures", glucose(40, 50, true) + glucose(240, 50, false) + T(95, 144, "α-glucose: OH on C1 below the ring", "m") + T(295, 144, "β-glucose: OH on C1 above the ring", "m") +
    C(150, 100, 13, `stroke="${D}"`) + C(350, 50, 13, `stroke="${D}"`));
  const aaSvg = svg(420, 140, "General structure of an amino acid", at(40, 70, "H") + bd(40, 70, 75, 70) + at(75, 70, "N") + bd(75, 70, 75, 35) + at(75, 35, "H") + bd(75, 70, 130, 70) + at(130, 70, "C") + bd(130, 70, 130, 35) + at(130, 35, "H") + bd(130, 70, 130, 105) + at(130, 105, "R", A) +
    bd(130, 70, 185, 70) + at(185, 70, "C") + bd(185, 70, 185, 35, true) + at(185, 35, "O") + bd(185, 70, 230, 70) + at(230, 70, "O") + bd(230, 70, 262, 70) + at(262, 70, "H") +
    P("M30 112 H92", `stroke="${B}"`) + Ts(61, 126, "amine group", "m", B) + P("M172 112 H272", `stroke="${G}"`) + Ts(222, 126, "carboxyl group", "m", G) + lab(140, 108, 290, 100, "R group (side chain)") + Ts(293, 116, "varies: 20 types", "") + lab(138, 64, 160, 20, "") + Ts(163, 22, "central (α) carbon", ""));
  const tgSvg = (() => {
    let s = "";
    [0, 1, 2].forEach((i) => {
      const y = 45 + i * 40;
      s += at(40, y, i === 1 ? "HC" : "H₂C") + (i < 2 ? ln(40, y + 9, 40, y + 31) : "") + bd(40, y, 80, y) + at(80, y, "O", D) + bd(80, y, 118, y, false, D) + at(118, y, "C") + bd(118, y, 118, y - 24, true) + at(118, y - 24, "O") + bd(118, y, 152, y) + zzPath(zz(146, y, 8, 0, i === 2 ? 3 : -1, 0), i === 2 ? null : null);
    });
    return svg(400, 180, "Triglyceride formed from glycerol and three fatty acids", s + R(64, 12, 66, 118, `rx="6" stroke="${D}" stroke-dasharray="4 3"`) + Ts(97, 148, "ester bonds", "m", D) + Ts(36, 148, "glycerol", "m") + Ts(280, 156, "3 fatty acid tails (hydrocarbon)", "m") + Ts(280, 172, "condensation releases 3 H₂O", "m", MU));
  })();
  fig["bio-5"] = [
    { title: "α-glucose and β-glucose", caption: "Both C₆H₁₂O₆, hexose ring of five carbons and one oxygen (C6 in the CH₂OH). They differ only at C1: OH below the ring in α, above in β. Numbering goes clockwise from C1 (right of the ring oxygen).", svg: glucSvg },
    { title: "Condensation of two α-glucose → maltose (1,4-glycosidic bond)", caption: "OH on C1 of one glucose and OH on C4 of the next react: water is removed (condensation) and an α-1,4-glycosidic bond forms. Hydrolysis adds water to break it. The same reaction links glucose in starch and glycogen; β-1,4 links (alternate glucose inverted) form cellulose.",
      svg: svg(480, 150, "Two alpha glucose rings joined by a 1,4 glycosidic bond", glucose(20, 50, true, ["1d"]) + glucose(200, 50, true, ["4d"]) + P(`M130 75 L165 102 L200 75`, `stroke="${D}" stroke-width="2"`) + T(165, 116, "O", "m", `fill="${D}" stroke="none"`) +
        lab(170, 106, 180, 140, "") + Ts(184, 144, "1,4-glycosidic bond", "", D) + T(420, 85, "+ H₂O", "m", 'font-size="14"') + Ts(420, 102, "(removed)", "m", MU)) },
    { title: "Starch, glycogen and cellulose", caption: "Amylose: unbranched α-1,4 chains that coil into a helix (compact). Amylopectin: α-1,4 chains with α-1,6 branches. Glycogen: like amylopectin but more branched (many ends for rapid hydrolysis). Cellulose: straight β-1,4 chains; parallel chains are held by hydrogen bonds into strong microfibrils.",
      svg: (() => {
        const dots = (pts, c) => P("M" + pts.map((q) => q.join(" ")).join("L"), 'stroke-width="1"') + `<g fill="${c || A}" stroke="none">` + pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join("") + "</g>";
        const row = (x, y, n, dx, dy) => Array.from({ length: n }, (_, i) => [x + i * dx, y + i * dy]);
        let s = dots(Array.from({ length: 11 }, (_, i) => [24 + i * 15, +(52 + 10 * Math.sin(i * 1.2)).toFixed(1)])) + T(100, 22, "amylose: α-1,4, coiled helix", "m");
        s += dots(row(220, 45, 10, 16, 0)) + dots([[268, 45]].concat(row(280, 57, 4, 14, 8))) + dots([[332, 45]].concat(row(344, 57, 3, 14, 8))) + T(300, 22, "amylopectin: α-1,6 branches", "m");
        s += dots(row(30, 145, 9, 16, 0)) + [[62, 1], [110, -1], [94, 1], [142, -1], [46, -1]].map(([x, d]) => dots([[x, 145]].concat(row(x + 10, 145 + d * 12, 3, 12, d * 8)))).join("") + dots([[124, 165]].concat(row(134, 177, 2, 12, 6))) + T(100, 112, "glycogen: very highly branched", "m");
        s += [0, 1, 2].map((j) => dots(row(222, 140 + j * 20, 10, 16, 0), G) + (j < 2 ? Array.from({ length: 10 }, (_, i) => dash(222 + i * 16, 144 + j * 20, 222 + i * 16, 156 + j * 20, MU)).join("") : "")).join("") + T(300, 112, "cellulose: β-1,4, straight, H-bonded", "m");
        return svg(400, 200, "Schematic polysaccharide structures", s);
      })() },
    { title: "Fatty acids: saturated, cis- and trans-unsaturated", caption: "Saturated: no C=C, straight chains pack closely → solid at room temperature (animal fats). Cis-unsaturated: H atoms on the same side of C=C → bend in the chain, loose packing → liquid oils. Trans: H on opposite sides, chain stays straight → packs like saturated fat. Monounsaturated = one C=C; polyunsaturated = more than one.",
      svg: svg(420, 190, "Skeletal formulas of saturated cis and trans fatty acids", T(10, 34, "HOOC", "") + zzPath(zz(46, 30, 12, 0)) + Ts(240, 18, "saturated: straight", "", MU) +
        T(10, 94, "HOOC", "") + zzPath(zz(46, 90, 12, 0, 6, 40), 5) + Ts(240, 82, "cis-unsaturated: kink at C=C", "", D) +
        T(10, 164, "HOOC", "") + zzPath(zz(46, 160, 12, 0), 5) + Ts(240, 150, "trans-unsaturated: straight", "", MU)) },
    { title: "Triglyceride: glycerol + three fatty acids", caption: "Condensation between the three –OH groups of glycerol and the –COOH groups of three fatty acids forms three ester bonds and releases three water molecules. Triglycerides store energy and insulate (adipose tissue).", svg: tgSvg },
    { title: "Phospholipid and its arrangement in a bilayer", caption: "One glycerol bonded to two fatty acids and a phosphate group. The phosphate head is hydrophilic (polar); the two fatty acid tails are hydrophobic (non-polar) → amphipathic. In water they form a bilayer with heads facing the water on both sides.",
      svg: svg(460, 170, "Phospholipid structure and bilayer", C(60, 40, 18, `fill="${B}" fill-opacity=".25" stroke="${B}"`) + Ts(60, 44, "head", "m") + ln(52, 58, 52, 140, `stroke-width="2"`) + P("M68 58 V95 L80 112 V140", `stroke-width="2"`) +
        lab(78, 36, 120, 26, "phosphate + glycerol: hydrophilic") + lab(52, 110, 120, 110, "2 fatty acid tails: hydrophobic") + lab(80, 116, 120, 130, "kink = cis C=C") +
        Array.from({ length: 8 }, (_, i) => { const x = 330 + i * 14; return C(x, 60, 6, `fill="${B}" fill-opacity=".25" stroke="${B}"`) + ln(x - 2, 66, x - 2, 90, 'stroke-width="1"') + ln(x + 2, 66, x + 2, 90, 'stroke-width="1"') + C(x, 128, 6, `fill="${B}" fill-opacity=".25" stroke="${B}"`) + ln(x - 2, 98, x - 2, 122, 'stroke-width="1"') + ln(x + 2, 98, x + 2, 122, 'stroke-width="1"'); }).join("") +
        Ts(379, 40, "water", "m", MU) + Ts(379, 156, "water", "m", MU)) },
    { title: "Steroid skeleton", caption: "Steroids (cholesterol, testosterone, oestradiol, progesterone) are lipids with four fused carbon rings: three six-membered and one five-membered. They are largely non-polar, so steroid hormones diffuse through the phospholipid bilayer.",
      svg: (() => { const s0 = 22, w = s0 * Math.sqrt(3), hx = (cx, cy) => poly(ngon(cx, cy, s0, 6, 30)); const cx = 60, cy = 90; const c = [cx + 1.5 * w, cy - 1.5 * s0];
        const tl = [c[0] + w / 2, c[1] - s0 / 2], bl = [c[0] + w / 2, c[1] + s0 / 2]; const v3 = [bl[0] + s0 * 0.951, bl[1] + s0 * 0.309], v4 = [v3[0] + s0 * 0.588, v3[1] - s0 * 0.809], v5 = [v4[0] - s0 * 0.588, v4[1] - s0 * 0.809];
        return svg(380, 140, "Four fused rings of a steroid", hx(cx, cy) + hx(cx + w, cy) + hx(c[0], c[1]) + poly([tl, bl, v3, v4, v5]) + [["A", cx, cy], ["B", cx + w, cy], ["C", c[0], c[1]], ["D", (tl[0] + v4[0]) / 2 + 2, c[1]]].map(([t, x, y]) => Ts(x, y + 4, t, "m", MU)).join("") +
          T(220, 50, "3 six-carbon rings", "") + T(220, 68, "+ 1 five-carbon ring", "") + Ts(220, 90, "e.g. cholesterol, testosterone,", "", MU) + Ts(220, 104, "oestradiol: identify by the", "", MU) + Ts(220, 118, "four fused rings", "", MU)); })() },
    { title: "General structure of an amino acid", caption: "A central (alpha) carbon bonded to an amine group (–NH₂), a carboxyl group (–COOH), a hydrogen atom and a variable R group. The 20 R groups differ in size, polarity and charge, giving proteins their diversity.", svg: aaSvg },
    { title: "Condensation of two amino acids: dipeptide and peptide bond", caption: "The –OH of the carboxyl group of one amino acid and an –H of the amine group of the next are removed as water; a peptide bond (C–N) forms between the carbonyl carbon and the nitrogen. Hydrolysis reverses it. Polypeptides have a free amine (N-terminal) end and a free carboxyl (C-terminal) end.",
      svg: svg(400, 150, "Dipeptide with peptide bond highlighted", at(15, 70, "H") + bd(15, 70, 45, 70) + at(45, 70, "N") + bd(45, 70, 45, 38) + at(45, 38, "H") + bd(45, 70, 85, 70) + at(85, 70, "C") + bd(85, 70, 85, 38) + at(85, 38, "H") + bd(85, 70, 85, 102) + at(85, 102, "R₁", A) +
        bd(85, 70, 125, 70) + at(125, 70, "C") + bd(125, 70, 125, 38, true) + at(125, 38, "O") + bd(125, 70, 165, 70, false, D) + at(165, 70, "N") + bd(165, 70, 165, 102) + at(165, 102, "H") + bd(165, 70, 205, 70) + at(205, 70, "C") + bd(205, 70, 205, 38) + at(205, 38, "H") + bd(205, 70, 205, 102) + at(205, 102, "R₂", A) +
        bd(205, 70, 245, 70) + at(245, 70, "C") + bd(245, 70, 245, 38, true) + at(245, 38, "O") + bd(245, 70, 280, 70) + at(280, 70, "O") + bd(280, 70, 305, 70) + at(305, 70, "H") +
        lab(145, 74, 145, 130, "peptide bond (C–N)") + Ts(340, 66, "+ H₂O", "") + Ts(340, 80, "released", "", MU) + R(108, 22, 76, 92, `rx="6" stroke="${D}" stroke-dasharray="4 3"`)) },
    { title: "Levels of protein structure", caption: "Primary: sequence of amino acids (peptide bonds). Secondary: α-helix or β-pleated sheet held by hydrogen bonds between C=O and N–H of the backbone. Tertiary: 3D folding from R-group interactions (H-bonds, ionic bonds, disulfide bridges, hydrophobic interactions). Quaternary: two or more polypeptides (e.g. haemoglobin: 4 chains + haem groups; collagen: 3 chains).",
      svg: svg(440, 150, "Primary secondary tertiary and quaternary protein structure", Array.from({ length: 8 }, (_, i) => C(18 + i * 12, 60, 5, fill(F)) ).join("") + T(60, 110, "primary", "m") + Ts(60, 124, "sequence", "m", MU) +
        P("M130 30 " + Array.from({ length: 6 }, (_, i) => `q12 ${i % 2 ? -14 : 14} 0 ${12}`).join(" "), `stroke="${A}" stroke-width="2"`) + P("M160 30 l14 8 l-14 8 l14 8 l-14 8 l14 8 l-14 8", `stroke="${B}" stroke-width="2"`) + T(152, 110, "secondary", "m") + Ts(152, 124, "α-helix, β-sheet", "m", MU) +
        P("M215 60 c10 -40 50 -30 40 0 s-40 40 -10 40 s40 -20 30 -50 s-30 -10 -40 30", `stroke="${A}" stroke-width="2"`) + T(245, 110, "tertiary", "m") + Ts(245, 124, "3D fold", "m", MU) +
        [[320, 45, A], [360, 45, B], [320, 80, B], [360, 80, A]].map(([x, y, c]) => C(x, y, 17, `stroke="${c}" stroke-width="2" ${fill(F)}`) + R(x - 4, y - 4, 8, 8, `fill="${D}" stroke="none"`)).join("") + T(340, 120, "quaternary", "m") + Ts(340, 134, "haemoglobin: 4 chains + haem", "m", MU)) },
  ];
  frames["bio-5"] = [
    { title: "Draw the ring structure of β-glucose", paper: "P2", where: "Paper 2 · 2–3 marks · drawing", bank: false,
      q: "Draw the structure of a molecule of β-glucose.",
      marks: ["hexagonal ring containing __one oxygen__ and five carbons", "__CH₂OH__ (C6) attached to C5 above the ring; OH and H on carbons 2, 3 and 4 in the correct positions (OH down on 2 and 4, up on 3)", "__OH above the ring on C1__ (β), H below"],
      svg: glucSvg, svgCaption: "Right-hand ring = β-glucose.", model: "Haworth ring with O at the back right; C1 to its right carries OH up and H down; C2: H up, OH down; C3: OH up, H down; C4: H up, OH down; C5 carries CH₂OH up.",
      accept: "H atoms omitted if all OH groups are correctly placed", reject: "OH below the ring on C1 (that is α-glucose); five-membered ring",
      tip: "α 同 β 淨係 C1 唔同：β 嘅 OH 喺上面（同 CH₂OH 同一邊），α 喺下面。" },
    { title: "Draw the general structure of an amino acid", star: true, paper: "P2", where: "Paper 2 · 2 marks · drawing", bank: false,
      q: "Draw the generalized structure of an amino acid and label its groups.",
      marks: ["central carbon bonded to __H__ and an __R group__", "__amine group (NH₂)__ and __carboxyl group (COOH)__ drawn and labelled, with C=O double bond shown"],
      svg: aaSvg, model: "H₂N–C(H)(R)–COOH drawn with all bonds: the central carbon has H above and R below; the amine group on the left; the carboxyl group on the right with C=O and O–H.",
      accept: "NH₃⁺ / COO⁻ (ionised forms)", reject: "R group attached to the nitrogen; missing double bond in the carboxyl group",
      tip: "中間個 C 連四樣：NH₂、COOH、H、R。COOH 記得畫 C=O 雙鍵。" },
    { title: "Draw the formation of a triglyceride", paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw a diagram to show how a triglyceride is formed from glycerol and fatty acids.",
      marks: ["__glycerol__ drawn as a 3-carbon chain, each carbon bonded to an O", "__three fatty acids__ (hydrocarbon chain ending in C=O) joined to the glycerol oxygens by __ester bonds__ (labelled)", "__condensation__ shown: __3 H₂O__ released"],
      svg: tgSvg, model: "Glycerol (H₂C–OH, HC–OH, H₂C–OH) reacts with three fatty acids (R–COOH); each OH of glycerol and the OH of a carboxyl group are removed as water, leaving –O–C(=O)–R ester linkages: H₂C–O–CO–R, HC–O–CO–R, H₂C–O–CO–R + 3H₂O.",
      accept: "fatty acid chains shown as R or as zigzag lines", reject: "glycosidic or peptide bond named; water added instead of removed",
      tip: "Triglyceride = 1 glycerol + 3 fatty acids，三條 ester bond，放出 3 粒水（condensation）。" },
  ];

  // =====================================================================================
  // bio-6 Membranes, organelles and specialisation
  // =====================================================================================
  diagrams["bio-6"] = [
    { title: "Rate of uptake vs concentration gradient: simple vs facilitated diffusion", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Concentration difference", yLabel: "Rate of diffusion",
      curves: [{ f: (c) => 0.85 * c, domain: [0, 10], color: "b", label: "simple", labelX: 8.4 }, { f: (c) => 6 * (1 - Math.exp(-c / 1.8)), label: "facilitated", labelX: 1.6 }] },
    { title: "Active transport: rate rises with O₂ (aerobic ATP) then plateaus (all pumps in use)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Oxygen concentration", yLabel: "Rate of uptake",
      curves: [{ f: (c) => 1 + 7 * (1 - Math.exp(-c / 1.8)) }] },
    { title: "Surface area : volume ratio of cubes falls as size increases (SA:V = 6/L)", x: [0, 10], y: [0, 7], origin: false, grid: false, xLabel: "Side length L / cm", yLabel: "SA : V",
      curves: [{ f: (L) => 6 / L, domain: [0.9, 10] }], points: [{ at: [1, 6], label: "1 cm: 6:1" }, { at: [2, 3], label: "2 cm: 3:1" }, { at: [6, 1], label: "6 cm: 1:1" }] },
  ];
  {
    // fluid mosaic model
    let s = "", heads = [];
    for (let x = 24; x <= 436; x += 12) {
      if ((x > 110 && x < 168) || (x > 244 && x < 306)) continue;
      heads.push(x);
    }
    s += `<g fill="${B}" fill-opacity=".25" stroke="${B}">` + heads.map((x) => `<circle cx="${x}" cy="70" r="5"/><circle cx="${x}" cy="150" r="5"/>`).join("") + "</g>";
    s += '<g stroke-width="0.9">' + heads.map((x) => `<path d="M${x - 2} 75V106M${x + 2} 75V106M${x - 2} 114V145M${x + 2} 114V145"/>`).join("") + "</g>";
    s += P("M118 58 Q112 110 120 162 Q140 172 160 162 Q168 110 162 58 Q140 48 118 58Z", `fill="${A}" fill-opacity=".3" stroke="${A}"`);
    s += P("M248 60 Q244 110 250 160 L268 160 Q264 110 268 60Z M282 60 Q286 110 280 160 L300 160 Q306 110 300 60Z", `fill="${A}" fill-opacity=".3" stroke="${A}"`);
    s += E(380, 166, 22, 10, `fill="${G}" fill-opacity=".35" stroke="${G}"`);
    s += P("M140 52 V30 M140 40 L128 26 M140 40 L152 26 M140 30 L134 16", `stroke="${G}" stroke-width="2"`) + P("M204 64 V44 L196 32 M204 44 L212 32", `stroke="${G}" stroke-width="2"`);
    s += R(62, 80, 5, 22, `fill="${D}" fill-opacity=".5" stroke="${D}"`) + R(338, 80, 5, 22, `fill="${D}" fill-opacity=".5" stroke="${D}"`);
    s = `<g transform="translate(0 40)">${s}</g>`;
    s += lab(24, 105, 40, 34, "phosphate head") + lab(140, 56, 140, 14, "glycoprotein") + lab(204, 78, 214, 34, "glycolipid") + lab(274, 140, 300, 14, "channel protein") + Ts(456, 34, "outside", "e", MU) +
      lab(64, 132, 70, 222, "cholesterol") + lab(96, 160, 110, 240, "hydrophobic tails") + lab(160, 150, 175, 222, "integral protein") + lab(380, 216, 330, 240, "peripheral protein") + Ts(456, 222, "cytoplasm", "e", MU);
    var fmSvg = svg(460, 250, "Fluid mosaic model of a plasma membrane", s);
  }
  const mitoSvg = (() => {
    let cr = "";
    [-100, -60, -20, 20, 60, 100].forEach((dx, i) => {
      const x = 210 + dx, half = 62 * Math.sqrt(Math.max(0, 1 - (dx / 150) ** 2)), top = i % 2 ? 105 + half : 105 - half, dir = i % 2 ? -1 : 1;
      cr += P(`M${x - 5} ${top.toFixed(1)}v${dir * 44}q5 ${dir * 8} 10 0v${-dir * 44}`);
    });
    return svg(570, 205, "Mitochondrion ultrastructure", '<g transform="translate(60 0)">' + E(210, 105, 170, 75, fill(F)) + E(210, 105, 158, 64, `stroke="${A}"`) + `<g stroke="${A}">${cr}</g>` +
      C(150, 108, 9, `stroke="${D}"`) + [[120, 92], [290, 120], [250, 92], [175, 130]].map(([x, y]) => C(x, y, 2, 'fill="currentColor"')).join("") + C(330, 110, 5, fill(MU)) +
      lab(210, 30, 170, 10, "outer membrane") + lab(110, 55, 40, 30, "inner membrane") + lab(170, 60, 262, 10, "cristae") + lab(310, 52, 380, 24, "intermembrane space") +
      lab(240, 120, 300, 194, "matrix") + lab(150, 117, 100, 194, "circular DNA") + lab(290, 120, 380, 172, "70S ribosomes") + "</g>");
  })();
  const chloroSvg = (() => {
    let g = "";
    [[120, 80], [200, 120], [280, 78], [330, 125]].forEach(([x, y]) => { for (let k = 0; k < 5; k++) g += R(x - 16, y - 18 + k * 7, 32, 6, `rx="2" fill="${G}" fill-opacity=".35" stroke="${G}"`); });
    return svg(570, 200, "Chloroplast ultrastructure", '<g transform="translate(70 0)">' + E(220, 100, 180, 75, fill(F)) + E(220, 100, 172, 68, `stroke="${G}"`) + g + P("M136 86 L184 118 M216 116 L264 82 M296 82 L314 120", `stroke="${G}" stroke-width="1.5"`) +
      E(170, 150, 18, 9, fill(MU)) + C(380, 90, 8, `stroke="${D}"`) + [[230, 70], [250, 150], [120, 120]].map(([x, y]) => C(x, y, 2, 'fill="currentColor"')).join("") + C(300, 160, 5, `fill="${A}" fill-opacity=".5"`) +
      lab(220, 25, 220, 10, "double membrane (envelope)") + lab(104, 80, 30, 50, "granum") + lab(160, 102, 30, 100, "lamella") + lab(240, 140, 200, 192, "stroma") +
      lab(170, 150, 30, 170, "starch grain") + lab(388, 90, 420, 70, "circular DNA") + lab(250, 150, 330, 192, "70S ribosomes") + lab(298, 62, 420, 30, "thylakoid") + lab(305, 160, 420, 150, "lipid droplet") + "</g>");
  })();
  fig["bio-6"] = [
    { title: "Fluid mosaic model of the plasma membrane", caption: "Phospholipid bilayer (hydrophilic phosphate heads facing water, hydrophobic tails inside) with proteins floating in it: integral proteins span the bilayer (channels, carriers, pumps), peripheral proteins sit on the surface. Cholesterol between phospholipids regulates fluidity; glycoproteins and glycolipids on the outer surface act in cell recognition.", svg: fmSvg },
    { title: "Membrane transport: simple diffusion, channel, carrier and pump", caption: "Passive (no ATP, down the concentration gradient): simple diffusion of small non-polar molecules (O₂, CO₂) between phospholipids; facilitated diffusion of ions through channel proteins and of larger polar molecules (glucose) via carrier proteins that change shape. Active transport: pump proteins use ATP to move particles against the gradient.",
      svg: svg(460, 210, "Four membrane transport mechanisms", mk("ar-bio6-tr") + R(10, 80, 440, 50, fill(F)) + Ts(225, 24, "high concentration", "m") + Ts(225, 160, "low concentration", "m") +
        ar(60, 50, 60, 165, "ar-bio6-tr", `stroke="${B}" stroke-width="2"`) + Ts(60, 190, "simple diffusion", "m") + Ts(60, 203, "O₂, CO₂", "m", MU) +
        R(150, 76, 14, 58, `rx="3" fill="${A}" fill-opacity=".3" stroke="${A}"`) + R(176, 76, 14, 58, `rx="3" fill="${A}" fill-opacity=".3" stroke="${A}"`) + ar(170, 50, 170, 165, "ar-bio6-tr", `stroke="${B}" stroke-width="2"`) + Ts(170, 190, "channel protein", "m") + Ts(170, 203, "ions, e.g. K⁺", "m", MU) +
        P("M260 74 Q300 66 300 105 Q300 140 260 136 Q250 105 260 74Z", `fill="${A}" fill-opacity=".3" stroke="${A}"`) + ar(280, 50, 280, 165, "ar-bio6-tr", `stroke="${B}" stroke-width="2"`) + Ts(280, 190, "carrier protein", "m") + Ts(280, 203, "glucose", "m", MU) +
        P("M370 74 Q410 66 410 105 Q410 140 370 136 Q360 105 370 74Z", `fill="${D}" fill-opacity=".25" stroke="${D}"`) + ar(390, 165, 390, 50, "ar-bio6-tr", `stroke="${D}" stroke-width="2"`) + Ts(420, 150, "ATP", "", D) + Ts(390, 190, "pump (active)", "m") + Ts(390, 203, "against gradient", "m", MU)) },
    { title: "Sodium–potassium pump", caption: "One cycle: 3 Na⁺ bind inside → ATP phosphorylates the pump → shape change releases 3 Na⁺ outside → 2 K⁺ bind outside → phosphate released → pump returns to its original shape, releasing 2 K⁺ inside. Builds Na⁺ and K⁺ gradients (resting potential, cotransport).",
      svg: svg(420, 200, "Sodium potassium pump moving three sodium out and two potassium in", mk("ar-bio6-nak") + R(10, 70, 400, 60, fill(F)) + P("M170 64 Q210 54 250 64 L252 136 Q210 146 168 136Z", `fill="${D}" fill-opacity=".2" stroke="${D}"`) +
        ar(190, 150, 190, 40, "ar-bio6-nak") + ar(230, 40, 230, 150, "ar-bio6-nak") + [0, 1, 2].map((i) => C(40 + i * 22, 25, 9, `fill="${A}" fill-opacity=".3" stroke="${A}"`) + Ts(40 + i * 22, 29, "Na⁺", "m")).join("") + [0, 1].map((i) => C(300 + i * 24, 175, 9, `fill="${B}" fill-opacity=".3" stroke="${B}"`) + Ts(300 + i * 24, 179, "K⁺", "m")).join("") +
        T(100, 30, "3 Na⁺ out", "") + T(345, 180, "2 K⁺ in", "") + T(20, 55, "outside: high Na⁺", "") + T(20, 160, "inside: high K⁺", "") + T(130, 180, "ATP → ADP + Pᵢ", "m", `fill="${D}"`) + T(400, 100, "membrane", "e")) },
    { title: "Endocytosis and exocytosis", caption: "Both rely on membrane fluidity and use ATP. Endocytosis: membrane folds inwards around material and pinches off a vesicle (phagocytosis of solids, pinocytosis of fluid). Exocytosis: a vesicle (e.g. from Golgi) moves to and fuses with the plasma membrane, releasing its contents (e.g. digestive enzymes, neurotransmitter).",
      svg: svg(460, 190, "Endocytosis and exocytosis steps", mk("ar-bio6-ex") + P("M10 40 H60 Q60 90 85 90 Q110 90 110 40 H200", `stroke-width="3"`) + C(85, 62, 6, fill(G)) + C(85, 140, 26, `stroke-width="3"`) + C(85, 140, 6, fill(G)) + ar(85, 100, 85, 112, "ar-bio6-ex") + Ts(160, 176, "endocytosis:", "") + Ts(160, 189, "membrane folds in", "") + Ts(10, 30, "outside", "", MU) +
        P("M250 150 H340 Q340 110 365 110 Q390 110 390 150 H450", `stroke-width="3"`) + C(365, 62, 24, `stroke-width="3"`) + C(365, 62, 6, fill(G)) + [345, 365, 385].map((x, i) => C(x, 170 + (i % 2) * 8, 4, fill(G))).join("") + ar(365, 88, 365, 104, "ar-bio6-ex") + Ts(300, 14, "exocytosis: vesicle fuses with", "m") + Ts(300, 27, "membrane, contents released", "m") + Ts(450, 185, "outside", "e", MU)) },
    { title: "Mitochondrion", caption: "Double membrane; inner membrane folded into cristae (large area for the electron transport chain and ATP synthase); small intermembrane space for a steep proton gradient; matrix contains Krebs cycle enzymes, 70S ribosomes and naked circular DNA.", svg: mitoSvg },
    { title: "Chloroplast", caption: "Double membrane; thylakoids stacked into grana (large area of photosystems and ATP synthase for the light-dependent reactions); stroma holds Calvin cycle enzymes (RuBisCO), starch grains, lipid droplets, 70S ribosomes and naked circular DNA.", svg: chloroSvg },
    { title: "Sodium-dependent glucose cotransporter (AHL)", caption: "Indirect active transport: the Na⁺/K⁺ pump keeps Na⁺ low inside the cell; Na⁺ then diffuses back in through the cotransporter, carrying glucose with it against glucose's own gradient (e.g. small intestine epithelium, kidney proximal tubule).",
      svg: svg(440, 160, "Sodium glucose cotransport driven by the sodium potassium pump", mk("ar-bio6-sg") + R(10, 50, 420, 50, fill(F)) + P("M120 46 Q150 38 180 46 V104 Q150 112 120 104Z", `fill="${A}" fill-opacity=".25" stroke="${A}"`) + P("M300 46 Q330 38 360 46 V104 Q330 112 300 104Z", `fill="${D}" fill-opacity=".2" stroke="${D}"`) +
        ar(140, 20, 140, 130, "ar-bio6-sg") + ar(160, 20, 160, 130, "ar-bio6-sg", `stroke="${G}"`) + Ts(118, 18, "Na⁺", "e") + Ts(166, 18, "glucose", "", G) + Ts(150, 150, "cotransporter", "m") +
        ar(320, 130, 320, 20, "ar-bio6-sg") + ar(340, 20, 340, 130, "ar-bio6-sg", `stroke="${B}"`) + Ts(316, 18, "3 Na⁺ out", "e") + Ts(346, 150, "2 K⁺ in", "", B) + Ts(330, 150, "", "") + Ts(400, 125, "ATP", "", D) + Ts(10, 40, "lumen: Na⁺ high", "", MU) + Ts(10, 125, "cell: Na⁺ low", "", MU)) },
  ];
  frames["bio-6"] = [
    { title: "Draw a mitochondrion", star: true, paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw and label a diagram of a mitochondrion as seen in an electron micrograph.",
      marks: ["__double membrane__: outer membrane and inner membrane both labelled", "inner membrane folded into __cristae__", "__matrix__ labelled (and intermembrane space)", "__70S ribosomes__ / __naked circular DNA__ in the matrix"],
      svg: mitoSvg, model: "An oval outline drawn as two lines (outer and inner membrane); the inner membrane folded inwards as finger-like cristae; the space inside labelled matrix with a small circle of DNA and dots for ribosomes; the narrow gap between the membranes labelled intermembrane space.",
      accept: "cristae drawn as zigzags if clearly continuous with the inner membrane", reject: "cristae drawn as separate lines not joined to the inner membrane; single membrane",
      tip: "Cristae 係 inner membrane 摺入去，一定要同 inner membrane 連住；兩層膜要畫兩條線。" },
    { title: "Draw a chloroplast", paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw a labelled diagram of the ultrastructure of a chloroplast.",
      marks: ["__double membrane__ (envelope) shown and labelled", "__grana__ drawn as stacks of __thylakoids__, joined by lamellae", "__stroma__ labelled", "__starch grain__ / 70S ribosomes / circular DNA"],
      svg: chloroSvg, model: "An oval with two outer lines (double membrane); inside several stacks of flat discs (thylakoids) forming grana, linked by intergranal lamellae; the fluid around them labelled stroma, with a starch grain, ribosomes and a loop of DNA.",
      accept: "lamellae labelled as 'thylakoid membranes'", reject: "grana drawn as single discs with no stacking; cristae drawn in a chloroplast",
      tip: "Chloroplast 入面係 grana（一疊疊 thylakoid）同 stroma；唔好同 mitochondria 嘅 cristae 搞亂。" },
    { title: "Sketch rate vs concentration for diffusion and facilitated diffusion", paper: "P2", where: "Paper 2 · 3 marks · sketch", bank: false,
      q: "Sketch graphs to show how the rate of simple diffusion and of facilitated diffusion change with concentration gradient, and explain the difference.",
      marks: ["simple diffusion: __straight line__ through the origin (rate ∝ concentration gradient)", "facilitated diffusion: rises then __plateaus__", "plateau because all __channel/carrier proteins__ are in use (__saturated__) - the number of proteins limits the rate"],
      diagram: diagrams["bio-6"][0], model: "Simple diffusion increases linearly with the concentration difference because molecules pass directly through the bilayer. Facilitated diffusion increases at first but levels off, because there is a fixed number of channel or carrier proteins; when they are all occupied, increasing the gradient further cannot increase the rate.",
      accept: "'carriers saturated'", reject: "plateau explained by ATP running out (facilitated diffusion is passive)",
      tip: "Facilitated diffusion 平咗係因為 carrier/channel 全部用緊（saturated），唔關 ATP 事。" },
  ];

  // =====================================================================================
  // bio-7 Gas exchange and transport
  // =====================================================================================
  const spiro = (t) => (t < 10 ? 3 + 0.5 * Math.sin((2 * Math.PI * t) / 3.3) : t < 12 ? 3 + 2.6 * Math.sin((Math.PI * (t - 10)) / 4) : t < 14.5 ? 5.6 - 4.4 * Math.sin((Math.PI * (t - 12)) / 5) : 1.2 + 1.8 * Math.sin((Math.PI * (t - 14.5)) / 3.6));
  diagrams["bio-7"] = [
    { title: "Spirometer trace: tidal volume, then maximal breath in and out (vital capacity)", x: [0, 20], y: [0, 7], origin: false, grid: false, xLabel: "Time / s", yLabel: "Lung volume / dm³",
      curves: [{ f: spiro, domain: [0, 18] }], lines: [{ from: [7.4, 2.5], to: [7.4, 3.5], color: "b" }, { from: [16.5, 1.2], to: [16.5, 5.6], color: "b" }, { from: [12, 5.6], to: [16.5, 5.6], color: "muted", dash: true }], hlines: [{ y: 1.2 }],
      texts: [{ at: [4.6, 4.1], text: "tidal volume ≈ 0.5 dm³" }, { at: [16.7, 3.4], text: "VC" }, { at: [15, 0.6], text: "residual volume" }] },
    { title: "Transpiration rate vs environmental factors", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Factor", yLabel: "Rate of transpiration",
      curves: [{ f: (h) => 9 - 0.8 * h, domain: [0, 10], color: "b", label: "humidity ↑", labelX: 8 }, { f: (w) => 7.5 * (1 - Math.exp(-w / 2.2)), label: "wind / temperature ↑", labelX: 6.5 }] },
    { title: "Blood pressure through the systemic circulation", x: [0, 10], y: [0, 130], origin: false, grid: false, xLabel: "aorta → arteries → arterioles → capillaries → veins", yLabel: "Pressure / mmHg",
      curves: [{ f: (x) => (x < 3 ? 100 - 4 * x + 20 * Math.sin(x * 9) : x < 5 ? 88 - 26 * (x - 3) + 8 * Math.sin(x * 9) * (5 - x) / 2 : x < 7 ? 36 - 10 * (x - 5) : Math.max(4, 16 - 5 * (x - 7))), domain: [0, 10] }],
      vlines: [{ x: 3 }, { x: 5 }, { x: 7 }], texts: [{ at: [0.3, 125], text: "pulsatile" }, { at: [7.3, 30], text: "low, steady" }] },
    { title: "Pressure changes in the left side of the heart (cardiac cycle, AHL)", x: [0, 0.8], y: [0, 130], origin: false, grid: false, xLabel: "Time / s", yLabel: "Pressure / mmHg",
      curves: [
        { f: (t) => (t < 0.1 ? 2 + 8 * (t / 0.1) : t < 0.15 ? 10 + 70 * ((t - 0.1) / 0.05) : t < 0.4 ? 80 + 40 * Math.sin((Math.PI * (t - 0.15)) / 0.25) : t < 0.47 ? 80 - 77 * ((t - 0.4) / 0.07) : 3 + 2 * ((t - 0.47) / 0.33)), color: "a", label: "ventricle", labelX: 0.43 },
        { f: (t) => (t < 0.15 ? 84 - 4 * (t / 0.15) : t < 0.4 ? Math.max(80, 78 + 40 * Math.sin((Math.PI * (t - 0.15)) / 0.25)) : t < 0.42 ? 80 - 6 * ((t - 0.4) / 0.02) : t < 0.45 ? 74 + 12 * ((t - 0.42) / 0.03) : 86 - 2 * ((t - 0.45) / 0.35)), color: "b", label: "aorta", labelX: 0.6 },
        { f: (t) => (t < 0.1 ? 2 + 6 * Math.sin((Math.PI * t) / 0.1) : t < 0.4 ? 2 + 6 * ((t - 0.1) / 0.3) : t < 0.47 ? 8 - 5 * ((t - 0.4) / 0.07) : 3 + 2 * ((t - 0.47) / 0.33)), color: "muted", dash: true, label: "atrium", labelX: 0.68 }],
      vlines: [{ x: 0.1 }, { x: 0.15 }, { x: 0.4 }, { x: 0.47 }],
      texts: [{ at: [0.02, 30], text: "AV shuts" }, { at: [0.155, 50], text: "SL opens" }, { at: [0.33, 112], text: "SL shuts" }, { at: [0.48, 30], text: "AV opens" }] },
  ];
  const heartSvg = svg(560, 310, "Internal structure of the mammalian heart", mk("ar-bio7-h") + '<g transform="translate(80 0)">' +
    P("M100 80 Q100 62 120 62 H190 V150 H250 V62 H320 Q340 62 340 80 V170 Q340 240 220 290 Q100 240 100 170Z", fill(F)) +
    R(110, 72, 74, 74, `rx="10" fill="${B}" fill-opacity=".12" stroke="${B}"`) + R(256, 72, 74, 74, `rx="10" fill="${D}" fill-opacity=".12" stroke="${D}"`) +
    P("M112 158 H212 V262 Q160 240 116 196Z", `fill="${B}" fill-opacity=".12" stroke="${B}"`) + P("M228 158 H318 V178 Q314 222 228 266Z", `fill="${D}" fill-opacity=".12" stroke="${D}"`) +
    R(193, 10, 20, 146, `fill="${B}" fill-opacity=".15" stroke="${B}"`) + P("M203 10 Q203 0 190 0", "") + R(228, 30, 20, 126, `fill="${D}" fill-opacity=".15" stroke="${D}"`) +
    P("M118 146 L134 170 L150 146 M150 146 L166 170 L182 146", `stroke-width="2"`) + P("M264 146 L282 172 L300 146 M300 146 L318 172 L322 146", `stroke-width="2"`) + P("M134 170 L140 215 M166 170 L170 215 M282 172 L276 220 M318 172 L300 220", 'stroke-width="0.8"') +
    P("M196 156 Q203 148 210 156 M231 156 Q238 148 245 156", `stroke-width="2"`) + R(130, 30, 22, 42, `fill="${B}" fill-opacity=".15" stroke="${B}"`) + R(290, 30, 22, 42, `fill="${D}" fill-opacity=".15" stroke="${D}"`) +
    ln(220, 160, 220, 286, 'stroke-width="4"') +
    lab(141, 34, 80, 20, "vena cava") + lab(203, 20, 150, 8, "pulmonary artery") + lab(240, 36, 300, 8, "aorta") + lab(305, 40, 360, 28, "pulmonary veins") +
    lab(112, 100, 60, 100, "right atrium") + lab(330, 100, 370, 100, "left atrium") + lab(134, 162, 60, 150, "tricuspid (AV) valve") + lab(300, 160, 370, 150, "bicuspid (mitral) valve") + lab(205, 152, 150, 300, "semilunar valves") +
    lab(116, 220, 60, 230, "right ventricle") + lab(318, 200, 370, 205, "left ventricle") + Ts(375, 219, "(thicker wall)", "", MU) + lab(220, 250, 260, 296, "septum") + lab(156, 214, 60, 266, "chordae tendineae") + "</g>");
  const vesselSvg = svg(500, 175, "Cross-sections of an artery, a vein and a capillary",
    C(80, 80, 55, fill(F)) + C(80, 80, 46, `fill="${D}" fill-opacity=".15" stroke="${D}"`) + C(80, 80, 22, fill(F)) + C(80, 80, 18) + Ts(80, 84, "lumen", "m") + T(80, 156, "artery", "m") + Ts(80, 170, "thick wall, narrow lumen", "m", MU) +
    P("M180 60 Q200 30 250 36 Q300 42 300 80 Q300 122 250 126 Q200 130 185 108 Q170 90 180 60Z", fill(F)) + P("M190 64 Q206 40 250 44 Q292 50 292 80 Q292 116 250 118 Q206 122 192 104 Q180 88 190 64Z", `fill="${D}" fill-opacity=".1" stroke="${D}"`) + P("M196 68 Q210 48 250 50 Q286 55 286 80 Q286 110 250 112 Q210 116 198 100 Q188 86 196 68Z", fill(F)) + Ts(242, 84, "wide lumen", "m") + T(240, 156, "vein", "m") + Ts(240, 168, "thin wall, little muscle; valves", "m", MU) +
    C(390, 80, 16, fill(F)) + C(390, 80, 12) + E(390, 80, 9, 4, `fill="${D}" fill-opacity=".4" stroke="${D}"`) + T(390, 156, "capillary", "m") + Ts(390, 168, "one cell thick, ~7 µm", "m", MU) +
    lab(124, 50, 140, 20, "tunica externa") + lab(118, 98, 150, 140, "tunica media") + lab(398, 72, 420, 40, "endothelium") + lab(390, 80, 420, 120, "red blood cell"));
  fig["bio-7"] = [
    { title: "Mammalian heart (internal structure)", caption: "Drawn as seen from the front, so the right side of the heart is on the left of the page. Deoxygenated blood: vena cava → right atrium → tricuspid valve → right ventricle → semilunar valve → pulmonary artery → lungs. Oxygenated blood: pulmonary veins → left atrium → bicuspid valve → left ventricle (thicker muscular wall, higher pressure) → semilunar valve → aorta.", svg: heartSvg },
    { title: "Alveolus and capillary: adaptations for gas exchange", caption: "Large total surface area (many alveoli); walls of type I pneumocytes one cell thick and capillary endothelium one cell thick → short diffusion distance (~0.5 µm); type II pneumocytes secrete surfactant (reduces surface tension, stops alveoli collapsing) and keep a moist lining for gases to dissolve; dense capillary network and ventilation maintain the concentration gradients.",
      svg: svg(600, 220, "Alveolus with surrounding capillary and gas exchange", mk("ar-bio7-alv") + '<g transform="translate(90 0)">' + R(130, 0, 40, 50, fill(F)) + C(150, 120, 75, fill(F)) + C(150, 120, 70, `stroke="${B}" stroke-dasharray="2 3"`) + T(150, 100, "air", "m") +
      P("M210 60 Q260 90 250 150 Q240 205 170 205", `stroke="${D}" stroke-width="18" stroke-opacity=".2"`) + P("M210 60 Q260 90 250 150 Q240 205 170 205", `stroke="${D}" stroke-width="1"`) + E(242, 110, 6, 4, `fill="${D}"`) + E(236, 170, 6, 4, `fill="${D}"`) +
      ar(200, 120, 238, 132, "ar-bio7-alv", `stroke="${B}"`) + Ts(186, 118, "O₂", "e", B) + ar(234, 150, 196, 140, "ar-bio7-alv", `stroke="${MU}"`) + Ts(186, 150, "CO₂", "e") + E(96, 175, 12, 8, `fill="${A}" fill-opacity=".35" stroke="${A}"`) +
      lab(160, 25, 300, 20, "bronchiole") + lab(224, 70, 300, 50, "capillary (blood flow)") + lab(220, 115, 300, 90, "type I pneumocyte: thin wall") + lab(96, 175, 60, 210, "type II pneumocyte") + lab(103, 70, 60, 40, "moist lining") + lab(236, 170, 300, 190, "red blood cell") + "</g>") },
    { title: "Ventilation: inspiration and expiration", caption: "Inspiration: external intercostal muscles contract (ribs up and out) and the diaphragm contracts and flattens → thorax volume increases → pressure falls below atmospheric → air flows in. Expiration (at rest, passive): muscles relax, diaphragm domes up, elastic recoil → volume decreases, pressure rises → air flows out; forced expiration uses internal intercostals and abdominal muscles. Antagonistic muscle pairs.",
      svg: svg(460, 200, "Thorax during inspiration and expiration", mk("ar-bio7-v") + P("M70 40 L40 150 M150 40 L180 150", 'stroke-width="2"') + P("M40 150 Q110 145 180 150", `stroke="${A}" stroke-width="3"`) + E(85, 100, 22, 34, fill(F)) + E(135, 100, 22, 34, fill(F)) + P("M110 10 V60 M110 60 L88 72 M110 60 L132 72", 'stroke-width="2"') +
        ar(110, 30, 110, 55, "ar-bio7-v", `stroke="${B}"`) + ar(40, 120, 22, 112, "ar-bio7-v") + ar(180, 120, 198, 112, "ar-bio7-v") + ar(110, 162, 110, 176, "ar-bio7-v", `stroke="${A}"`) + T(110, 194, "inspiration", "m", 'font-weight="bold"') + Ts(196, 30, "air in", "", B) +
        P("M310 40 L290 150 M390 40 L410 150", 'stroke-width="2"') + P("M290 150 Q350 95 410 150", `stroke="${A}" stroke-width="3"`) + E(328, 92, 18, 28, fill(F)) + E(372, 92, 18, 28, fill(F)) + P("M350 10 V58 M350 58 L332 68 M350 58 L368 68", 'stroke-width="2"') +
        ar(350, 50, 350, 22, "ar-bio7-v", `stroke="${B}"`) + ar(290, 120, 306, 116, "ar-bio7-v") + ar(410, 120, 394, 116, "ar-bio7-v") + T(350, 194, "expiration", "m", 'font-weight="bold"') + Ts(358, 30, "air out", "", B) +
        Ts(10, 168, "diaphragm contracts, flattens", "", A) + Ts(250, 168, "diaphragm relaxes, domes", "", A) + Ts(230, 64, "ribs up/out ↑V ↓p", "m") + Ts(230, 80, "ribs down/in ↓V ↑p", "m")) },
    { title: "Artery, vein and capillary in cross-section", caption: "Arteries: thick tunica media of smooth muscle and elastic fibres to withstand and even out high, pulsing pressure; narrow round lumen. Veins: thin wall, wide lumen, little muscle; pocket valves prevent backflow of low-pressure blood. Capillaries: wall one endothelial cell thick, often with pores (fenestrated) for exchange; lumen just wide enough for a red blood cell.", svg: vesselSvg },
    { title: "Xylem vessel (longitudinal view)", caption: "Dead cells joined end to end with no end walls → continuous hollow tube; walls thickened with lignin (rings or spirals) so they resist collapse under the tension of transpiration pull; pits allow lateral movement of water.",
      svg: svg(420, 170, "Xylem vessel with lignin thickening and no end walls", R(80, 20, 70, 140, fill(F)) + Array.from({ length: 9 }, (_, i) => P(`M80 ${30 + i * 15} q35 8 70 -4`, `stroke="${A}" stroke-width="2.5"`)).join("") + dash(80, 90, 150, 90) + R(150, 50, 4, 10, fill(MU)) + R(76, 110, 4, 10, fill(MU)) +
        lab(150, 37, 200, 30, "lignin thickening (spiral/rings)") + lab(130, 90, 200, 80, "no end wall (former cell boundary)") + lab(154, 55, 200, 120, "pit") + lab(115, 150, 200, 150, "hollow lumen: no cytoplasm") + ar(30, 150, 30, 30, "ar-bio7-x") + mk("ar-bio7-x") + Ts(30, 165, "water", "m", B)) },
    { title: "Plan diagram: transverse section of a dicotyledonous leaf", caption: "Plan diagram: tissue boundaries only, no individual cells. From top: waxy cuticle, upper epidermis, palisade mesophyll (most chloroplasts), spongy mesophyll (air spaces), lower epidermis with stomata and guard cells; vascular bundle with xylem towards the upper surface and phloem below.",
      svg: svg(460, 190, "Plan diagram of a leaf transverse section", R(20, 20, 300, 4, fill(MU)) + R(20, 24, 300, 14) + R(20, 38, 300, 50, `fill="${G}" fill-opacity=".15"`) + R(20, 88, 300, 60) + R(20, 148, 300, 14) + R(20, 162, 300, 3, fill(MU)) + R(198, 148, 14, 17, 'fill="none" stroke="none"') +
        E(140, 100, 40, 24, fill(F)) + P("M100 100 H180") + Ts(140, 96, "xylem", "m") + Ts(140, 114, "phloem", "m") + E(200, 155, 7, 7, fill(F)) + E(216, 155, 7, 7, fill(F)) +
        lab(320, 22, 340, 14, "waxy cuticle") + lab(320, 31, 340, 34, "upper epidermis") + lab(320, 62, 340, 60, "palisade mesophyll") + lab(320, 118, 340, 110, "spongy mesophyll") + lab(320, 155, 340, 150, "lower epidermis") + lab(216, 160, 340, 180, "stoma + guard cells") + lab(180, 104, 220, 120, "") + Ts(222, 124, "vascular bundle", "")) },
    { title: "Plan diagrams: dicot stem and root (transverse sections)", caption: "Stem: vascular bundles in a ring near the edge (phloem outside, xylem inside, cambium between) around a central pith, with cortex outside - supports bending. Root: central vascular tissue (xylem as an X/star with phloem between its arms) inside the endodermis, wide cortex, epidermis with root hairs - resists pulling.",
      svg: svg(520, 210, "Plan diagrams of dicot stem and root", C(100, 100, 85, fill(F)) + C(100, 100, 80) + Array.from({ length: 8 }, (_, i) => { const a = (i * 45 * Math.PI) / 180, x = 100 + 55 * Math.cos(a), y = 100 + 55 * Math.sin(a), r = (a * 180) / Math.PI; return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r + 90})"><path d="M-10 -12 Q0 -16 10 -12 L7 12 Q0 15 -7 12Z" fill="${A}" fill-opacity=".2" stroke="${A}"/><line x1="-9" y1="-3" x2="9" y2="-3" stroke-width="0.8"/></g>`; }).join("") +
        Ts(100, 104, "pith", "m") + lab(160, 86, 200, 40, "") + Ts(204, 40, "vascular bundle:", "") + Ts(204, 53, "phloem (outer),", "") + Ts(204, 66, "xylem (inner)", "") + lab(176, 130, 200, 150, "cortex") + lab(180, 110, 200, 128, "epidermis") + T(100, 204, "stem", "m", 'font-weight="bold"') +
        C(360, 100, 70, fill(F)) + C(360, 100, 34, `stroke="${B}"`) + P("M360 72 V128 M332 100 H388", `stroke="${A}" stroke-width="7"`) + [[343, 83], [377, 83], [343, 117], [377, 117]].map(([x, y]) => C(x, y, 5, `fill="${G}" fill-opacity=".4" stroke="${G}"`)).join("") +
        P("M300 64 l-14 -10 M296 140 l-16 10 M420 70 l14 -10", 'stroke-width="1"') + Ts(360, 204, "root", "m", 'font-weight="bold"') + lab(388, 100, 440, 110, "xylem") + lab(343, 117, 300, 190, "phloem") + lab(392, 116, 440, 140, "endodermis") + lab(376, 40, 420, 22, "cortex") + lab(296, 140, 280, 165, "root hair")) },
    { title: "Potometer", caption: "Measures the rate of water uptake by a cut shoot (≈ transpiration rate). Cut and assemble under water so no air enters the xylem; seal joints; record the distance the air bubble moves along the capillary per unit time; the reservoir resets the bubble. Rate = distance × cross-sectional area of the capillary ÷ time.",
      svg: svg(460, 180, "Potometer with leafy shoot and capillary tube", mk("ar-bio7-p") + P("M70 20 Q50 10 40 24 Q60 30 70 20 M70 34 Q95 22 104 36 Q86 44 70 34 M70 50 Q48 42 40 56 Q60 62 70 50", `stroke="${G}"`) + ln(70, 10, 70, 90, `stroke="${G}" stroke-width="2"`) + R(60, 80, 20, 14, fill(MU)) +
        P("M64 94 V130 H380 M76 94 V120 H380", `stroke-width="1.6"`) + R(65, 121, 314, 8, `fill="${B}" fill-opacity=".2" stroke="none"`) + R(280, 120, 14, 10, `fill="${F}" stroke="currentColor"`) + Array.from({ length: 11 }, (_, i) => ln(180 + i * 18, 136, 180 + i * 18, 142, 'stroke-width="0.8"')).join("") +
        P("M150 120 V60 H180 V120", fill(F)) + R(151, 70, 28, 50, `fill="${B}" fill-opacity=".2" stroke="none"`) + ln(140, 96, 190, 96, 'stroke-width="3"') + ar(300, 158, 220, 158, "ar-bio7-p") + Ts(260, 172, "bubble moves towards the shoot", "m") +
        lab(80, 87, 110, 74, "seal") + lab(180, 70, 220, 40, "reservoir") + lab(190, 96, 220, 70, "tap") + lab(294, 125, 330, 100, "air bubble") + lab(360, 139, 390, 160, "scale / capillary tube") + Ts(20, 18, "leafy shoot", "")) },
    { title: "Single (fish) and double (mammal) circulation", caption: "Fish: heart → gills → body → heart; blood passes the heart once per circuit and pressure is low after the gill capillaries. Mammals: the right side pumps blood to the lungs (pulmonary circulation) and the left side pumps the oxygenated blood returning from the lungs to the body (systemic circulation) at high pressure.",
      svg: svg(460, 200, "Single and double circulation loops", mk("ar-bio7-c") + box(60, 10, 100, 30, ["gills"]) + box(45, 85, 130, 30, ["heart (2 chambers)"]) + box(60, 160, 100, 30, ["body"]) + ar(150, 85, 150, 42, "ar-bio7-c", `stroke="${B}"`) + ar(150, 40, 150, 40, "ar-bio7-c") + P("M70 40 Q20 100 70 160", `stroke="${D}" marker-end="url(#ar-bio7-c)"`) + ar(150, 160, 150, 117, "ar-bio7-c", `stroke="${B}"`) + Ts(110, 74, "single", "m", MU) +
        box(300, 10, 120, 30, ["lungs"]) + box(300, 85, 55, 30, ["R"]) + box(365, 85, 55, 30, ["L"]) + box(300, 160, 120, 30, ["body"]) + ar(320, 85, 320, 42, "ar-bio7-c", `stroke="${B}"`) + ar(400, 42, 400, 85, "ar-bio7-c", `stroke="${D}"`) + ar(400, 117, 400, 158, "ar-bio7-c", `stroke="${D}"`) + ar(320, 158, 320, 117, "ar-bio7-c", `stroke="${B}"`) +
        Ts(440, 66, "pulmonary", "e", MU) + Ts(440, 140, "systemic", "e", MU) + Ts(360, 74, "double", "m", MU)) },
  ];
  frames["bio-7"] = [
    { title: "Draw and label the internal structure of the heart", star: true, paper: "P2", where: "Paper 2 · 4–5 marks · drawing", bank: false,
      q: "Draw a labelled diagram of the internal structure of the mammalian heart, including the blood vessels attached to it.",
      marks: ["four chambers: __right and left atria__ and __right and left ventricles__, with the right side on the left of the drawing", "__left ventricle wall thicker__ than the right; __septum__", "__AV valves__ (tricuspid, bicuspid) between atria and ventricles and __semilunar valves__ at the bases of the arteries", "__vena cava__ into the right atrium and __pulmonary veins__ into the left atrium", "__pulmonary artery__ from the right ventricle and __aorta__ from the left ventricle"],
      svg: heartSvg, model: "Four chambers with the right side on the viewer's left. Vena cava enters the right atrium; tricuspid valve leads to the right ventricle; semilunar valve and pulmonary artery leave the right ventricle. Pulmonary veins enter the left atrium; bicuspid valve leads to the left ventricle, which has the thickest wall; aorta with its semilunar valve leaves the left ventricle. Septum between the ventricles.",
      accept: "atrioventricular valves labelled without names; coronary arteries as an extra", reject: "aorta connected to the right ventricle; ventricle walls equal thickness; valves pointing the wrong way",
      tip: "畫心臟係「對住人」：佢嘅右邊喺你左邊。左心室壁最厚；aorta 一定出自 left ventricle。" },
    { title: "Draw an artery and a vein in transverse section", paper: "P2", where: "Paper 2 · 3 marks · drawing", bank: false,
      q: "Draw labelled diagrams to show the structure of an artery and a vein as seen in transverse section.",
      marks: ["artery: __thick__ wall with a thick __tunica media__ (smooth muscle and elastic fibres)", "artery: __narrow, round lumen__; vein: __wide__, often irregular lumen", "vein: __thin__ wall with little muscle/elastic tissue", "layers labelled: tunica externa, tunica media, endothelium (tunica intima)"],
      svg: vesselSvg, model: "Artery: a circle with a thick middle layer labelled tunica media, an outer tunica externa and an inner endothelium surrounding a small round lumen. Vein: a larger, flattened outline with a thin wall and a large lumen, same three layers but the media much thinner.",
      accept: "valves noted for veins (seen in longitudinal section)", reject: "artery lumen wider than the vein's; vein wall drawn thicker",
      tip: "Artery：壁厚、lumen 細又圓；Vein：壁薄、lumen 大又唔規則。關鍵係 tunica media 厚定薄。" },
    { title: "Sketch and annotate a spirometer trace", paper: "P1B", where: "Paper 1B · 2–3 marks · data-based", bank: false,
      q: "Sketch a spirometer trace showing normal breathing followed by a maximal inspiration and maximal expiration. Label tidal volume and vital capacity.",
      marks: ["regular small oscillations labelled __tidal volume__ (≈ 0.5 dm³ at rest)", "one large rise and fall; __vital capacity__ = maximum inspiration to maximum expiration", "trace never reaches zero: __residual volume__ remains"],
      diagram: diagrams["bio-7"][0], model: "At rest the trace oscillates evenly; the height of one breath is the tidal volume. A deep breath in goes to the top of the trace and a forced breath out goes to the bottom; the vertical distance between them is the vital capacity. Some air (residual volume) always stays in the lungs.",
      accept: "ventilation rate = breaths per minute from the trace", reject: "vital capacity measured from zero",
      tip: "Tidal volume 係一次普通呼吸嘅高度；vital capacity 係最大吸氣去最大呼氣，唔係由 0 計。" },
  ];

  // =====================================================================================
  // bio-8 Adaptation and ecological niches
  // =====================================================================================
  diagrams["bio-8"] = [
    { title: "Range of tolerance: optimum, zones of stress, limits of tolerance", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Abiotic factor (e.g. temperature)", yLabel: "Population size",
      curves: [{ f: (x) => 8.5 * Math.exp(-((x - 5) ** 2) / 3.2), domain: [1, 9] }], vlines: [{ x: 1.6 }, { x: 3.4 }, { x: 6.6 }, { x: 8.4 }],
      texts: [{ at: [4.3, 9.3], text: "optimum" }, { at: [2, 6], text: "stress" }, { at: [7, 6], text: "stress" }, { at: [0.1, 1.2], text: "absent" }, { at: [8.6, 1.2], text: "absent" }] },
    { title: "Fundamental vs realised niche (AHL): competition narrows the range actually occupied", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Environmental gradient (e.g. shore height)", yLabel: "Abundance",
      curves: [{ f: (x) => 7 * Math.exp(-((x - 5) ** 2) / 6), domain: [0, 10], color: "b", dash: true, label: "fundamental", labelX: 1.6 }, { f: (x) => (7 * Math.exp(-((x - 5) ** 2) / 6)) / (1 + Math.exp(-3 * (x - 6))), domain: [3, 10], label: "realised", labelX: 7.6 }] },
  ];
  const climSvg = (() => {
    const rain = [150, 160, 180, 220, 260, 240, 230, 240, 250, 230, 200, 170], temp = [26, 27, 27, 27, 26, 26, 25, 25, 26, 26, 26, 26];
    const x = (i) => 70 + i * 26, yr = (v) => 180 - v * 0.55, yt = (v) => 180 - v * 5;
    let s = rain.map((v, i) => R(x(i) - 10, yr(v).toFixed(1), 20, (v * 0.55).toFixed(1), `fill="${B}" fill-opacity=".35" stroke="${B}"`)).join("") + P("M" + temp.map((v, i) => `${x(i)} ${yt(v)}`).join("L"), `stroke="${D}" stroke-width="2"`) + temp.map((v, i) => C(x(i), yt(v), 2.5, `fill="${D}" stroke="none"`)).join("");
    s += ln(55, 180, 375, 180) + ln(55, 180, 55, 20) + ln(375, 180, 375, 20) + "JFMAMJJASOND".split("").map((m, i) => Ts(x(i), 194, m, "m")).join("");
    s += [0, 100, 200, 280].map((v) => Ts(50, yr(v) + 4, String(v), "e")).join("") + [0, 10, 20, 30].map((v) => Ts(380, yt(v) + 4, String(v), "")).join("");
    s += `<text x="16" y="100" transform="rotate(-90 16 100)" text-anchor="middle" fill="${B}" stroke="none" font-size="11">rainfall / mm (bars)</text><text x="408" y="100" transform="rotate(90 408 100)" text-anchor="middle" fill="${D}" stroke="none" font-size="11">temperature / °C (line)</text>`;
    return svg(420, 205, "Climograph of a tropical rainforest", s + Ts(215, 14, "tropical rainforest: hot all year, high rainfall", "m"));
  })();
  fig["bio-8"] = [
    { title: "Climograph (tropical rainforest example)", caption: "Monthly mean rainfall as bars (left axis) and mean temperature as a line (right axis). Rainforest: ~25–28 °C all year with little variation and >2000 mm rain per year. Desert: very low rainfall with high daytime temperatures; tundra: long cold season, low precipitation; temperate forest: seasonal temperature with moderate rain.", svg: climSvg },
    { title: "Biomes by temperature and rainfall (Whittaker-style)", caption: "Mean annual temperature and precipitation largely determine the biome. Hot and wet → tropical rainforest; hot and dry → hot desert; intermediate rain → savanna/grassland; cool and wet → temperate/boreal forest (taiga); very cold → tundra.",
      svg: svg(440, 220, "Biome positions on temperature and rainfall axes", ln(60, 190, 420, 190) + ln(60, 190, 60, 15) + T(240, 212, "mean annual temperature →", "m") + `<text x="20" y="100" transform="rotate(-90 20 100)" text-anchor="middle" fill="currentColor" stroke="none">annual rainfall →</text>` +
        [[80, 150, 90, 35, "tundra", MU], [150, 120, 100, 50, "boreal forest", G], [190, 60, 110, 55, "temperate forest", G], [250, 135, 80, 50, "grassland", A], [320, 150, 95, 35, "hot desert", D], [315, 95, 100, 45, "savanna", A], [310, 25, 105, 60, "tropical rainforest", G]]
          .map(([x, y, w, h, t, c]) => R(x, y, w, h, `rx="14" fill="${c}" fill-opacity=".18" stroke="${c}"`) + Ts(x + w / 2, y + h / 2 + 4, t, "m")).join("")) },
    { title: "Zonation on a rocky shore", caption: "Species occupy bands (zones) along the gradient from low to high shore according to their tolerance of exposure (desiccation, temperature, salinity) - upper limits often set by abiotic factors, lower limits by competition and predation. Investigated with a transect.",
      svg: svg(440, 190, "Zonation bands from low to high shore", P("M20 170 L420 30 L420 175 L20 175Z", fill(F)) + P("M20 140 H420", `stroke="${B}" stroke-dasharray="6 4"`) + Ts(424, 136, "low tide", "e", B) + P("M20 60 H420", `stroke="${B}" stroke-dasharray="6 4"`) + Ts(24, 54, "high tide", "", B) +
        [[60, "kelp / red seaweed", "lower shore"], [160, "wracks, mussels", "middle shore"], [260, "barnacles, limpets", "upper shore"], [360, "lichens, periwinkles", "splash zone"]].map(([x, a, b], i) => Ts(x, 160 - i * 34, a, "m") + Ts(x, 173 - i * 34, b, "m", MU)).join("")) },
  ];
  frames["bio-8"] = [
    { title: "Sketch and label a range-of-tolerance curve", paper: "P2", where: "Paper 2 · 3 marks · sketch", bank: false,
      q: "Sketch a graph to show how the population size of a species varies along an abiotic gradient, labelling the optimum range, zones of stress and limits of tolerance.",
      marks: ["bell-shaped curve with the __optimum range__ at the peak (largest population)", "__zones of physiological stress__ on both sides (few individuals)", "__limits of tolerance__ / zones of intolerance at both ends where the species is absent"],
      diagram: diagrams["bio-8"][0], model: "A symmetrical bell curve of population size against the abiotic factor. The central peak is the optimum range; on each side population falls through zones of stress; beyond the limits of tolerance the species cannot survive and is absent.",
      accept: "an asymmetrical curve", reject: "a curve that never reaches zero", tip: "鐘形曲線：中間 optimum，兩邊 stress，最外面 intolerance（數量 = 0）。" },
    { title: "Draw a climograph from monthly data", paper: "P1B", where: "Paper 1B · 3 marks · graph", bank: false,
      q: "Using the monthly mean temperature and rainfall data provided, construct a climograph and deduce the biome.",
      marks: ["rainfall plotted as __bars__ against the __left__ y-axis (mm)", "temperature plotted as a __line graph__ against the __right__ y-axis (°C)", "months on the x-axis; both axes labelled with units; biome deduced with reasons (e.g. constant high temperature + high rainfall → tropical rainforest)"],
      svg: climSvg, model: "Twelve bars of rainfall (left axis, mm) and a joined line of temperature (right axis, °C). Temperature stays at 25–27 °C all year and rainfall exceeds 150 mm every month, so the biome is tropical rainforest.",
      accept: "temperature line points plotted at the middle of each month", reject: "both variables on a single axis without separate scales", tip: "雨量用棒形圖（左軸），溫度用線（右軸），兩條軸都要單位。" },
  ];

  // =====================================================================================
  // bio-9 Enzymes and metabolism
  // =====================================================================================
  diagrams["bio-9"] = [
    { title: "Rate vs enzyme concentration (substrate in excess): proportional", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Enzyme concentration", yLabel: "Initial rate",
      curves: [{ f: (e) => 0.85 * e, domain: [0, 10] }], texts: [{ at: [4.5, 2], text: "more active sites available" }] },
    { title: "Product formed vs time: initial rate = gradient of the tangent at t = 0", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time / min", yLabel: "Product formed",
      curves: [{ f: (t) => 8 * (1 - Math.exp(-t / 2.5)) }], lines: [{ from: [0, 0], to: [2.9, 9.3], color: "b", dash: true, label: "tangent", labelAt: "end" }],
      texts: [{ at: [6, 6.6], text: "plateau: substrate used up" }] },
    { title: "Product vs time at different temperatures: high temperature fast at first, then stops (denaturation)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time / min", yLabel: "Product formed",
      curves: [{ f: (t) => 8 * (1 - Math.exp(-t / 4)), color: "a", label: "40 °C", labelX: 8.6 }, { f: (t) => 8 * (1 - Math.exp(-t / 9)), color: "b", label: "25 °C", labelX: 8.6 }, { f: (t) => 3.6 * (1 - Math.exp(-t / 1.2)), color: "muted", label: "70 °C", labelX: 8.6 }] },
  ];
  const enzR = (x, o) => P(`M${x} 70 H${x + 25} V90 H${x + 55} V70 H${x + 80} V130 H${x}Z`, o || `fill="${A}" fill-opacity=".2" stroke="${A}"`);
  const subR = (x, y, c) => R(x, y, 30, 20, `rx="2" fill="${c || G}" fill-opacity=".35" stroke="${c || G}"`);
  const fitSvg = svg(540, 170, "Lock and key compared with induced fit", mk("ar-bio9-if") +
    enzR(20) + subR(45, 30) + ar(60, 52, 60, 66, "ar-bio9-if") + T(60, 155, "lock and key", "m") + Ts(60, 22, "substrate", "m", G) + Ts(60, 145, "rigid, exact-fit active site", "m", MU) +
    P("M170 70 H190 L202 90 H218 L230 70 H250 V130 H170Z", `fill="${A}" fill-opacity=".2" stroke="${A}"`) + subR(195, 30) + ar(210, 52, 210, 68, "ar-bio9-if") + Ts(210, 22, "substrate approaches", "m") + ar(262, 100, 292, 100, "ar-bio9-if") +
    P("M300 62 H322 V90 H358 V62 H380 V130 H300Z", `fill="${A}" fill-opacity=".2" stroke="${A}"`) + subR(325, 70) + T(275, 160, "induced fit", "m") + Ts(210, 145, "enzyme", "m", A) +
    Ts(392, 60, "active site changes", "") + Ts(392, 73, "shape to fit closely", "") + Ts(392, 86, "(E–S complex); bonds", "") + Ts(392, 99, "strained → Ea lowered", ""));
  fig["bio-9"] = [
    { title: "Enzyme–substrate binding: lock-and-key vs induced fit", caption: "Specificity: the substrate's shape and chemical properties complement the active site. Induced fit model: binding causes a conformational change in the active site (and the substrate), giving a tighter fit and straining bonds, which lowers the activation energy. Both the enzyme and substrate move - successful collisions are needed.", svg: fitSvg },
    { title: "Competitive and non-competitive inhibition (AHL)", caption: "Competitive inhibitor: similar shape to the substrate, binds the active site and blocks it; overcome by raising substrate concentration (Vmax unchanged), e.g. relenza / statins. Non-competitive inhibitor: binds an allosteric site, changes the shape of the active site so the substrate cannot bind; not overcome by more substrate (Vmax lower), e.g. cyanide on cytochrome oxidase.",
      svg: svg(460, 170, "Competitive inhibitor in active site; non-competitive at allosteric site", enzR(30) + R(55, 70, 30, 20, `rx="2" fill="${D}" fill-opacity=".4" stroke="${D}"`) + subR(130, 30) + Ts(145, 64, "substrate", "m", G) + Ts(145, 76, "blocked", "m", G) + Ts(70, 62, "inhibitor", "m", D) + Ts(100, 152, "competitive: inhibitor in active site", "m") +
      P("M270 70 H295 L310 88 L325 70 H350 V130 H322 Q310 116 298 130 H270Z", `fill="${A}" fill-opacity=".2" stroke="${A}"`) + C(310, 128, 9, `fill="${D}" fill-opacity=".4" stroke="${D}"`) + subR(370, 30) + Ts(385, 64, "cannot bind", "m", G) + lab(318, 132, 360, 120, "allosteric site") + Ts(330, 160, "non-competitive: active site shape changed", "m")) },
    { title: "End-product (feedback) inhibition of a metabolic pathway (AHL)", caption: "The end product of a pathway (e.g. isoleucine) is a non-competitive (allosteric) inhibitor of the enzyme catalysing the first step (threonine deaminase). As end product accumulates the pathway slows; as it is used up inhibition is released - negative feedback that avoids wasting resources and intermediates.",
      svg: svg(460, 140, "Feedback inhibition loop from end product to first enzyme", mk("ar-bio9-fb") + box(10, 30, 80, 32, ["threonine"]) + ar(90, 46, 120, 46, "ar-bio9-fb") + box(122, 30, 60, 32, ["A"]) + ar(182, 46, 212, 46, "ar-bio9-fb") + box(214, 30, 60, 32, ["B"]) + ar(274, 46, 304, 46, "ar-bio9-fb") + box(306, 30, 70, 32, ["…"]) + ar(376, 46, 400, 46, "ar-bio9-fb") + box(380, 80, 76, 32, ["isoleucine"]) +
      Ts(105, 24, "enzyme 1", "m", A) + P("M418 112 V128 H105 V54", `stroke="${D}" stroke-dasharray="5 3"`) + ln(97, 58, 113, 58, `stroke="${D}" stroke-width="3"`) + Ts(260, 124, "end product inhibits enzyme 1 (allosteric site)", "m", D)) },
    { title: "Metabolism: anabolism and catabolism", caption: "Metabolism = all enzyme-catalysed reactions in a cell, arranged in chains and cycles. Anabolism builds macromolecules from monomers by condensation (needs energy, e.g. protein synthesis, photosynthesis, glycogen formation). Catabolism breaks macromolecules into monomers by hydrolysis (releases energy, e.g. digestion, cell respiration).",
      svg: svg(460, 120, "Anabolism builds, catabolism breaks down", mk("ar-bio9-ab") + box(5, 40, 145, 40, ["monomers", "(glucose, amino acids)"]) + box(310, 40, 140, 40, ["macromolecules", "(starch, proteins)"]) + ar(150, 50, 308, 50, "ar-bio9-ab", `stroke="${G}" stroke-width="2"`) + ar(308, 72, 152, 72, "ar-bio9-ab", `stroke="${D}" stroke-width="2"`) +
        Ts(230, 30, "anabolism: condensation (energy in)", "m", G) + Ts(230, 96, "catabolism: hydrolysis (energy out)", "m", D)) },
  ];
  frames["bio-9"] = [
    { title: "Sketch product formed against time and find the initial rate", paper: "P1B", where: "Paper 1B · 3 marks · graph skills", bank: false,
      q: "Sketch a graph of product formed against time for an enzyme-catalysed reaction and show how the initial rate is determined. Explain the shape.",
      marks: ["curve steepest at the start then levels off (__plateau__)", "__tangent__ drawn at t = 0; initial rate = __gradient__ (Δproduct ÷ Δtime) with units", "rate falls because __substrate concentration decreases__ (fewer collisions); plateau when substrate is used up"],
      diagram: diagrams["bio-9"][1], model: "The curve rises steeply from the origin and gradually flattens to a plateau. A straight tangent drawn at the origin gives the initial rate as its gradient. The rate decreases because substrate is being used up, so there are fewer enzyme–substrate collisions; the plateau is reached when all substrate has been converted.",
      accept: "rate from the first linear section", reject: "plateau explained by the enzyme being used up", tip: "Initial rate = t=0 條切線嘅斜率；平咗係因為 substrate 用晒，唔係 enzyme 用晒。" },
    { title: "Draw an annotated diagram of the induced-fit model", paper: "P2", where: "Paper 2 · 3 marks · annotated diagram", bank: false,
      q: "Using an annotated diagram, explain the induced-fit model of enzyme action.",
      marks: ["enzyme with an __active site__ and a complementary substrate drawn and labelled", "the active site __changes shape__ as the substrate binds (conformational change) - __enzyme–substrate complex__", "bonds in the substrate are strained / __activation energy lowered__; products released and enzyme unchanged"],
      svg: fitSvg, model: "Before binding, the active site is not a perfect fit. As the substrate binds, the enzyme changes shape so the active site fits more closely around it, forming an enzyme–substrate complex; this stresses bonds in the substrate, lowering the activation energy. Products are released and the enzyme returns to its original shape.",
      accept: "'conformational change'", reject: "active site described as rigid (lock and key) for this question", tip: "Induced fit 重點：substrate 入咗先令 active site 變形 → 貼得更實 → Ea 降低。" },
  ];

  // =====================================================================================
  // bio-10 Cell respiration and photosynthesis
  // =====================================================================================
  diagrams["bio-10"] = [
    { title: "Limiting factor: CO₂ concentration (light high vs low)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "CO₂ concentration", yLabel: "Rate of photosynthesis",
      curves: [{ f: (c) => 8.5 * (1 - Math.exp(-c / 2.2)), label: "high light", labelX: 7.5 }, { f: (c) => 4.5 * (1 - Math.exp(-c / 1.6)), color: "b", label: "low light", labelX: 7.5 }] },
    { title: "Effect of temperature on photosynthesis: optimum, then enzymes (RuBisCO) denature", x: [0, 50], y: [0, 10], origin: false, grid: false, xLabel: "Temperature / °C", yLabel: "Rate of photosynthesis",
      curves: [{ f: (T) => (T < 30 ? 8.5 * Math.pow(T / 30, 1.5) : Math.max(0, 8.5 - 0.06 * (T - 30) ** 2)), domain: [0, 42] }], points: [{ at: [30, 8.5], label: "optimum" }] },
    { title: "Respirometer reading: O₂ uptake over time at two temperatures", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time / min", yLabel: "Distance moved by drop / mm",
      curves: [{ f: (t) => 0.9 * t, label: "25 °C", labelX: 8.5 }, { f: (t) => 0.45 * t, color: "b", label: "15 °C", labelX: 8.5 }] },
  ];
  const chromSvg = svg(420, 220, "Paper chromatogram of photosynthetic pigments", R(60, 10, 70, 200, fill(F)) + dash(50, 180, 140, 180) + Ts(146, 184, "origin (pencil line)", "") + R(60, 196, 70, 14, `fill="${B}" fill-opacity=".25" stroke="none"`) + Ts(146, 207, "solvent", "", B) +
    dash(50, 30, 140, 30, B) + Ts(146, 34, "solvent front", "", B) + E(95, 42, 12, 5, `fill="${A}" fill-opacity=".5" stroke="none"`) + E(95, 70, 12, 5, `fill="${A}" fill-opacity=".3" stroke="none"`) + E(95, 95, 12, 5, `fill="${G}" fill-opacity=".8" stroke="none"`) + E(95, 120, 12, 5, `fill="${G}" fill-opacity=".45" stroke="none"`) +
    Ts(146, 46, "carotene (orange)", "") + Ts(146, 74, "xanthophyll (yellow)", "") + Ts(146, 99, "chlorophyll a (blue-green)", "") + Ts(146, 124, "chlorophyll b (yellow-green)", "") +
    ln(40, 180, 40, 70, `stroke="${D}"`) + ln(28, 180, 28, 30, `stroke="${B}"`) + Ts(36, 66, "x", "e", D) + Ts(24, 26, "y", "e", B) + T(320, 160, "Rf = x ÷ y", "m", 'font-size="14" font-weight="bold"') + Ts(320, 180, "= pigment distance ÷", "m") + Ts(320, 194, "solvent distance", "m"));
  fig["bio-10"] = [
    { title: "Structure of ATP and the ATP–ADP cycle", caption: "ATP = adenine + ribose + three phosphate groups (a nucleotide). Hydrolysis of the terminal phosphate (ATP → ADP + Pᵢ) releases energy for active transport, movement and synthesis; energy from respiration (or light, in photosynthesis) re-phosphorylates ADP. ATP is a short-term, easily released energy currency.",
      svg: svg(460, 190, "ATP structure and cycle", mk("ar-bio10-atp") + R(20, 30, 60, 30, `rx="4" ${fill(F)}`) + Ts(50, 49, "adenine", "m") + ln(80, 45, 100, 60) + poly(ngon(118, 66, 18, 5, -90), fill(F)) + Ts(118, 70, "ribose", "m") +
      [0, 1, 2].map((i) => ln(136 + i * 40, 66, 150 + i * 40, 66) + C(162 + i * 40, 66, 12, `fill="${i === 2 ? D : B}" fill-opacity=".25" stroke="${i === 2 ? D : B}"`) + Ts(162 + i * 40, 70, "P", "m")).join("") + lab(222, 54, 250, 24, "terminal phosphate") +
      box(60, 125, 90, 34, ["ATP"]) + box(300, 125, 120, 34, ["ADP + Pᵢ"]) + P("M150 130 Q225 100 298 130", `stroke="${D}" marker-end="url(#ar-bio10-atp)"`) + P("M298 155 Q225 185 152 155", `stroke="${G}" marker-end="url(#ar-bio10-atp)"`) +
      Ts(225, 108, "hydrolysis: energy released for cell work", "m", D) + Ts(225, 186, "respiration / photosynthesis: energy in", "m", G)) },
    { title: "Cell respiration overview: aerobic and anaerobic", caption: "Glycolysis (cytoplasm, no O₂ needed): glucose → 2 pyruvate, small yield of ATP. With O₂, pyruvate enters the mitochondrion for further oxidation → CO₂ + H₂O and a large ATP yield. Without O₂: in humans pyruvate → lactate; in yeast/plants → ethanol + CO₂; small ATP yield only (from glycolysis).",
      svg: svg(460, 200, "Flow chart of aerobic and anaerobic respiration", mk("ar-bio10-r") + box(170, 8, 120, 30, ["glucose"]) + ar(230, 38, 230, 64, "ar-bio10-r") + Ts(240, 55, "glycolysis (cytoplasm): small ATP yield", "") + box(170, 66, 120, 30, ["2 pyruvate"]) +
        ar(200, 96, 90, 130, "ar-bio10-r", `stroke="${MU}"`) + ar(260, 96, 360, 130, "ar-bio10-r", `stroke="${MU}"`) + Ts(100, 108, "no O₂", "m", MU) + Ts(360, 108, "O₂ present", "m", MU) +
        box(10, 132, 95, 44, ["lactate", "(humans)"]) + box(115, 132, 105, 44, ["ethanol + CO₂", "(yeast)"]) + box(290, 132, 160, 44, ["mitochondrion:", "CO₂ + H₂O, large ATP yield"]) + Ts(115, 194, "anaerobic: only 2 ATP per glucose", "m", MU) + Ts(370, 194, "aerobic: ~30+ ATP per glucose", "m", MU)) },
    { title: "Photosynthesis overview", caption: "Light-dependent reactions (thylakoid membranes): light absorbed by chlorophyll; photolysis of water releases O₂ (by-product), and ATP and reduced NADP are produced. Light-independent reactions / Calvin cycle (stroma): CO₂ is fixed and reduced to carbohydrate (triose phosphate → glucose) using ATP and reduced NADP. 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
      svg: svg(460, 190, "Light dependent and light independent reactions linked by ATP and NADPH", mk("ar-bio10-p") + box(20, 50, 150, 70, ["light-dependent", "reactions", "(thylakoids)"], `fill="${G}" fill-opacity=".15" stroke="${G}"`) + box(290, 50, 150, 70, ["Calvin cycle", "(light-independent)", "(stroma)"], `fill="${A}" fill-opacity=".12" stroke="${A}"`) +
        ar(172, 70, 288, 70, "ar-bio10-p") + Ts(230, 64, "ATP + reduced NADP", "m") + ar(288, 102, 172, 102, "ar-bio10-p") + Ts(230, 116, "ADP + Pᵢ + NADP⁺", "m") +
        ar(60, 10, 70, 48, "ar-bio10-p", `stroke="${A}"`) + Ts(60, 12, "light", "e", A) + ar(130, 10, 120, 48, "ar-bio10-p", `stroke="${B}"`) + Ts(134, 14, "H₂O", "", B) + ar(95, 122, 95, 160, "ar-bio10-p", `stroke="${B}"`) + Ts(100, 174, "O₂ released (photolysis)", "", B) +
        ar(365, 12, 365, 48, "ar-bio10-p") + Ts(372, 22, "CO₂", "") + ar(365, 122, 365, 160, "ar-bio10-p", `stroke="${G}"`) + Ts(370, 174, "sugars (glucose)", "", G)) },
    { title: "Chromatography of photosynthetic pigments", caption: "Pigment spot on a pencil origin line above the solvent; the solvent carries pigments different distances according to solubility and attraction to the paper/TLC plate. Rf = distance moved by pigment ÷ distance moved by solvent front (always < 1, no units). Typical order from the top: carotene, xanthophyll, chlorophyll a, chlorophyll b (order varies with solvent).", svg: chromSvg },
    { title: "Simple respirometer", caption: "Germinating seeds or small invertebrates in a sealed tube with soda lime / KOH (absorbs CO₂). O₂ uptake reduces gas volume, so the coloured drop moves towards the organisms; distance per minute = rate of O₂ consumption. Control tube with glass beads of equal volume; keep temperature constant in a water bath.",
      svg: svg(460, 160, "Respirometer with organisms, soda lime and capillary", mk("ar-bio10-rm") + R(30, 40, 120, 70, `rx="10" ${fill(F)}`) + R(36, 90, 108, 16, `fill="${MU}" fill-opacity=".4" stroke="none"`) + ln(36, 86, 144, 86, 'stroke-dasharray="3 2"') + [55, 75, 95, 115].map((x) => E(x, 70, 7, 5, `fill="${G}" fill-opacity=".5" stroke="${G}"`)).join("") +
        P("M150 70 H420 M150 78 H420", "") + R(300, 70, 12, 8, `fill="${D}" stroke="none"`) + Array.from({ length: 10 }, (_, i) => ln(200 + i * 22, 84, 200 + i * 22, 90, 'stroke-width="0.8"')).join("") + ar(290, 110, 220, 110, "ar-bio10-rm") +
        lab(75, 64, 110, 18, "germinating seeds") + lab(60, 98, 110, 140, "soda lime: absorbs CO₂") + lab(306, 70, 330, 40, "coloured liquid drop") + Ts(255, 126, "drop moves towards seeds as O₂ is used", "m") + lab(400, 86, 410, 140, "scale / mm")) },
  ];
  frames["bio-10"] = [
    { title: "Annotate a chromatogram and calculate Rf", paper: "P1B", where: "Paper 1B · 3 marks · practical", bank: false,
      q: "A pigment travelled 4.2 cm and the solvent front 7.0 cm. Annotate a chromatogram to show these distances and calculate the Rf value.",
      marks: ["distances measured from the __origin (start line)__ to the __centre of the pigment spot__ and to the __solvent front__", "Rf = 4.2 ÷ 7.0 = __0.60__ (no units)", "pigment identified by comparison with known Rf values"],
      svg: chromSvg, numeric: { value: 0.6, tol: 0.01 }, model: "Both distances are measured from the pencil origin line: x to the middle of the spot, y to the solvent front. Rf = 4.2 ÷ 7.0 = 0.60.",
      accept: "0.6", reject: "Rf greater than 1; measuring from the paper edge", tip: "兩個距離都由 origin 計；Rf 冇單位、一定少過 1。" },
    { title: "Sketch the effect of temperature on the rate of photosynthesis", paper: "P2", where: "Paper 2 · 3 marks · sketch", bank: false,
      q: "Sketch and explain the effect of temperature on the rate of photosynthesis when light and CO₂ are not limiting.",
      marks: ["rate __increases__ with temperature up to an __optimum__ (more kinetic energy, more enzyme–substrate collisions)", "above the optimum rate __falls steeply__", "because enzymes of the Calvin cycle (e.g. __RuBisCO__) __denature__ / stomata close"],
      diagram: diagrams["bio-10"][1], model: "The rate rises gradually as temperature increases because molecules have more kinetic energy and collide more often with the enzymes of the light-independent reactions. It reaches a maximum at the optimum (about 25–35 °C for many plants) and then falls steeply because enzymes such as RuBisCO denature.",
      accept: "light-dependent reactions are less temperature-sensitive", reject: "enzymes 'killed'", tip: "溫度影響嘅係 Calvin cycle 嘅 enzyme：升到 optimum，之後 denature 急跌。" },
  ];
  concepts["bio-10"] = [{ h: "Diagrams to know: ATP, respiration and photosynthesis", b: "<p>Be ready to draw ATP as adenine + ribose + three phosphates, a flow chart of glycolysis → aerobic/anaerobic pathways (with locations and relative ATP yields), and the link between the light-dependent reactions (thylakoids: photolysis, ATP, reduced NADP, O₂) and the Calvin cycle (stroma: CO₂ fixation using ATP and reduced NADP). Limiting-factor graphs: the factor on the x-axis limits on the rising section; another factor limits on the plateau.</p>" }];
  concepts["bio-9"] = [{ h: "Enzyme graphs to sketch", b: "<p>Rate vs [enzyme] (substrate in excess): straight line through the origin. Product vs time: steep start, tangent at t = 0 gives the initial rate, plateau when substrate is used up. At high temperature product formation starts fast then stops early because the enzyme denatures. Competitive inhibition: same maximum rate reached at high [S]; non-competitive: lower maximum (AHL).</p>" }];

  // ---------- register ----------
  const topics = {};
  new Set([...Object.keys(fig), ...Object.keys(frames), ...Object.keys(diagrams), ...Object.keys(concepts)]).forEach((id) => {
    topics[id] = {};
    if (diagrams[id]) topics[id].diagrams = diagrams[id];
    if (fig[id]) topics[id].figures = fig[id];
    if (frames[id]) topics[id].frames = frames[id];
    if (concepts[id]) topics[id].concepts = concepts[id];
  });
  IB.addExamFrames("bio", { topics });
})();
