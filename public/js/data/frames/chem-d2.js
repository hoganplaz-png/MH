/* Chemistry - diagrams and graphs to know (original). Reactivity 1 (HL) to Reactivity 3. */
(function () {
  // ---------- SVG helpers (local to this closure) ----------
  const mk = (id, col = "currentColor", half = false) =>
    `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="${half ? "M0 0L10 5L0 5z" : "M0 0L10 5L0 10z"}" fill="${col}"/></marker>`;
  const S = (vb, label, defs, body) =>
    `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-size="12" fill="currentColor"><defs>${defs}</defs>${body}</svg>`;
  const t = (x, y, s, a = "middle", ex = "") => `<text x="${x}" y="${y}" text-anchor="${a}" ${ex}>${s}</text>`;
  const ln = (x1, y1, x2, y2, ex = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.5" ${ex}/>`;
  const ar = (x1, y1, x2, y2, id, col = "currentColor", ex = "") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.6" marker-end="url(#${id})" ${ex}/>`;
  const cv = (d, id, col = "var(--fig-d)") => `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.6" marker-end="url(#${id})"/>`;
  const rect = (x, y, w, h, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="1.5" ${ex}/>`;
  const beaker = (x, y, w, h, liq) =>
    `<rect x="${x + 2}" y="${y + h - liq}" width="${w - 4}" height="${liq - 2}" fill="var(--fig-fill)"/><path d="M${x} ${y}V${y + h}H${x + w}V${y}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const hex = (cx, cy, r, ring = true) => {
    const p = [0, 1, 2, 3, 4, 5].map((i) => [cx + r * Math.cos(Math.PI / 6 + (i * Math.PI) / 3), cy + r * Math.sin(Math.PI / 6 + (i * Math.PI) / 3)].map((v) => v.toFixed(1)).join(" "));
    return `<path d="M${p.join("L")}z" fill="none" stroke="currentColor" stroke-width="1.5"/>${ring ? `<circle cx="${cx}" cy="${cy}" r="${(r * 0.55).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.3"/>` : ""}`;
  };
  // energy-level (Born–Haber style) diagram: levels [{y,label}], steps [{y1,y2,x,label,col}]
  const levels = (id, vb, label, L, steps) =>
    S(vb, label, mk(id) + mk(id + "a", "var(--fig-a)") + mk(id + "b", "var(--fig-b)") + mk(id + "d", "var(--fig-d)"),
      L.map((l) => ln(20, l.y, l.x2 || 300, l.y) + t(24, l.y - 4, l.label, "start", 'font-size="11"')).join("") +
      steps.map((s) => ar(s.x, s.y1, s.x, s.y2, id + (s.c || ""), s.c ? `var(--fig-${s.c})` : "currentColor") + t(s.x + 5, (s.y1 + s.y2) / 2 + 4, s.label, "start", `font-size="11"${s.c ? ` fill="var(--fig-${s.c})"` : ""}`)).join(""));

  // ---------- function helpers for plots ----------
  const sig = (x, c, k) => 1 / (1 + Math.exp(-(x - c) * k));
  const profile = (R, P, H, c = 5, w = 1.1) => (x) => R + (P - R) * sig(x, c, 2.2) + H * Math.exp(-((x - c) ** 2) / w);
  const MB = (T, A = 10) => (E) => (E <= 0 ? 0 : (A * Math.sqrt(E) * Math.exp(-E / T)) / T ** 1.5);
  // pH during a titration of a monoprotic acid (Ka) and base (Kb); Ka/Kb = 1e9 means "strong"; solved from the charge balance
  const Kw = 1e-14;
  const pHcurve = (o) => (v) => {
    const Vt = o.V0 + v;
    // titrant may be base (into acid) or acid (into base)
    const ca = (o.into === "acid" ? o.C0 * o.V0 : o.Ct * v) / Vt, cb = (o.into === "acid" ? o.Ct * v : o.C0 * o.V0) / Vt;
    let lo = 0, hi = 14;
    for (let i = 0; i < 60; i++) {
      const p = (lo + hi) / 2, h = 10 ** -p;
      const A = (ca * o.Ka) / (o.Ka + h), BH = cb * ((o.Kb * h) / Kw) / (1 + (o.Kb * h) / Kw);
      const f = h + BH - Kw / h - A; // >0 means too much H+ -> pH must rise
      if (f > 0) lo = p; else hi = p;
    }
    return (lo + hi) / 2;
  };
  const peak = (f) => { let m = -1e9; for (let i = 0; i <= 400; i++) m = Math.max(m, f(i / 40)); return +m.toFixed(2); };
  const endo = profile(2.5, 6, 3.2), endoTop = peak(endo), sn2 = profile(5, 2.5, 4);
  const piece = (t0, a, b, k) => (x) => (x < t0 ? a : b + (a - b) * Math.exp(-k * (x - t0)));

  // =====================================================================
  IB.addExamFrames("chem", { topics: {
    // -------------------------------------------------------------- R1 HL
    "chem-h3": {
      diagrams: [
        { title: "Standard entropy of one substance against temperature: S rises with T, vertical jumps at the melting point and (much larger) boiling point", x: [0, 10], y: [0, 10], grid: false, xLabel: "T / K", yLabel: "S",
          curves: [{ f: (x) => 0.35 * Math.sqrt(x) * 1.6, domain: [0, 3], color: "a" }, { f: (x) => 2.3 + 0.35 * (x - 3), domain: [3, 6], color: "a" }, { f: (x) => 7.4 + 0.25 * (x - 6), domain: [6, 9.6], color: "a" }],
          lines: [{ from: [3, 0.97], to: [3, 2.3], color: "a" }, { from: [6, 3.35], to: [6, 7.4], color: "a" }],
          vlines: [{ x: 3, label: "mp" }, { x: 6, label: "bp" }], texts: [{ at: [1, 2], text: "solid" }, { at: [3.6, 4], text: "liquid" }, { at: [7, 8.9], text: "gas" }] },
        { title: "ΔG = ΔH − TΔS (intercept ΔH, gradient −ΔS). A: ΔH<0, ΔS>0 always spontaneous; B: ΔH>0, ΔS>0 spontaneous above T = ΔH/ΔS; C: ΔH<0, ΔS<0 spontaneous below T = ΔH/ΔS; D: ΔH>0, ΔS<0 never", x: [0, 10], y: [-6, 6], grid: false, xLabel: "T", yLabel: "ΔG",
          curves: [
            { f: (x) => -2 - 0.35 * x, color: "c", label: "A", labelX: 9 },
            { f: (x) => 3 - 0.6 * x, color: "b", label: "B", labelX: 9 },
            { f: (x) => -3 + 0.55 * x, color: "a", label: "C", labelX: 9 },
            { f: (x) => 4 + 0.15 * x, color: "muted", label: "D", labelX: 9 },
          ], hlines: [{ y: 0, label: "ΔG = 0" }] },
      ],
      figures: [
        { title: "Born–Haber cycle for NaCl (kJ mol⁻¹)", caption: "Upward arrows endothermic, downward exothermic. ΔHf = +107 + 122 + 496 − 349 − 787 = −411, so ΔH(lattice) = +787 kJ mol⁻¹ (drawn upwards: solid → gaseous ions).",
          svg: levels("ar-chh3-1", "0 0 440 340", "Born-Haber cycle for sodium chloride", [
            { y: 40, label: "Na⁺(g) + e⁻ + Cl(g)" }, { y: 127, label: "Na⁺(g) + Cl⁻(g)", x2: 360 }, { y: 164, label: "Na(g) + Cl(g)" },
            { y: 194, label: "Na(g) + ½Cl₂(g)" }, { y: 221, label: "Na(s) + ½Cl₂(g)  (elements: 0)" }, { y: 323, label: "NaCl(s)", x2: 360 }],
          [{ x: 190, y1: 221, y2: 196, label: "atomisation Na +107" }, { x: 190, y1: 194, y2: 166, label: "atomisation ½Cl₂ +122" },
           { x: 190, y1: 164, y2: 42, label: "IE₁ Na +496", c: "d" }, { x: 255, y1: 40, y2: 125, label: "EA Cl −349", c: "b" },
           { x: 255, y1: 221, y2: 321, label: "ΔHf −411", c: "b" }, { x: 345, y1: 323, y2: 129, label: "lattice", c: "a" }]) },
        { title: "Born–Haber cycle for MgO (not to scale, kJ mol⁻¹)", caption: "Two ionisation energies; the second electron affinity of O is endothermic (+753: electron added to a negative ion). ΔH(lattice) = 148 + 249 + 738 + 1451 − 141 + 753 + 602 = +3800 kJ mol⁻¹.",
          svg: levels("ar-chh3-2", "0 0 450 360", "Born-Haber cycle for magnesium oxide", [
            { y: 30, label: "Mg²⁺(g) + O²⁻(g)", x2: 400 }, { y: 92, label: "Mg²⁺(g) + O(g) + 2e⁻" }, { y: 132, label: "Mg²⁺(g) + O⁻(g) + e⁻" },
            { y: 190, label: "Mg⁺(g) + O(g) + e⁻" }, { y: 240, label: "Mg(g) + O(g)" }, { y: 268, label: "Mg(g) + ½O₂(g)" },
            { y: 294, label: "Mg(s) + ½O₂(g)" }, { y: 345, label: "MgO(s)", x2: 400 }],
          [{ x: 180, y1: 294, y2: 270, label: "+148" }, { x: 180, y1: 268, y2: 242, label: "+249 (½O₂ → O)" }, { x: 180, y1: 240, y2: 192, label: "IE₁ +738", c: "d" },
           { x: 180, y1: 190, y2: 94, label: "IE₂ +1451", c: "d" }, { x: 290, y1: 92, y2: 130, label: "EA₁ −141", c: "b" }, { x: 290, y1: 132, y2: 32, label: "EA₂ +753", c: "d" },
           { x: 290, y1: 294, y2: 343, label: "ΔHf −602", c: "b" }, { x: 385, y1: 345, y2: 32, label: "lattice", c: "a" }]) },
        { title: "Entropy increases: solid → liquid → gas", caption: "More ways to arrange particles and their energy. Gases have by far the highest S; ΔS is decided mainly by the change in the number of moles of gas.",
          svg: S("0 0 420 140", "Particle arrangements in solid, liquid and gas", mk("ar-chh3-3"),
            rect(10, 15, 110, 95) + [0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3].map((j) => `<circle cx="${25 + i * 20}" cy="${30 + j * 20}" r="8" fill="var(--fig-b)" opacity=".7"/>`).join("")).join("") +
            rect(155, 15, 110, 95) + [[170, 100], [188, 98], [206, 101], [224, 99], [242, 100], [178, 83], [198, 82], [217, 84], [236, 82], [253, 86], [172, 66], [192, 65], [231, 66], [212, 67]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="var(--fig-b)" opacity=".7"/>`).join("") +
            rect(300, 15, 110, 95) + [[320, 35], [370, 30], [345, 70], [390, 90], [318, 95]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="var(--fig-b)" opacity=".7"/>`).join("") +
            ar(128, 62, 148, 62, "ar-chh3-3") + ar(273, 62, 293, 62, "ar-chh3-3") +
            t(65, 128, "solid: lowest S") + t(210, 128, "liquid") + t(355, 128, "gas: highest S")) },
      ],
      frames: [
        { title: "Construct (draw) a Born–Haber cycle", star: true, hl: true, paper: "P2", where: "Paper 2 · 3–4 marks · blank or partly completed cycle",
          q: "Draw a Born–Haber cycle for sodium chloride, labelling each species with state symbols and each enthalpy change.",
          marks: ["elements in standard states, Na(s) + ½Cl₂(g), with NaCl(s) __below__ them (exothermic ΔHf)",
            "atomisation of Na and of ½Cl₂ to Na(g) and Cl(g) shown as upward steps",
            "ionisation Na(g) → Na⁺(g) + e⁻ up; electron affinity Cl(g) + e⁻ → Cl⁻(g) __down__",
            "lattice enthalpy linking NaCl(s) and Na⁺(g) + Cl⁻(g), all ions with __(g)__"],
          svg: levels("ar-chh3-f1", "0 0 440 340", "Born-Haber cycle answer", [
            { y: 40, label: "Na⁺(g) + e⁻ + Cl(g)" }, { y: 127, label: "Na⁺(g) + Cl⁻(g)", x2: 360 }, { y: 164, label: "Na(g) + Cl(g)" },
            { y: 194, label: "Na(g) + ½Cl₂(g)" }, { y: 221, label: "Na(s) + ½Cl₂(g)" }, { y: 323, label: "NaCl(s)", x2: 360 }],
          [{ x: 190, y1: 221, y2: 196, label: "ΔH(at) Na" }, { x: 190, y1: 194, y2: 166, label: "ΔH(at) Cl" }, { x: 190, y1: 164, y2: 42, label: "IE₁(Na)", c: "d" },
           { x: 255, y1: 40, y2: 125, label: "EA(Cl)", c: "b" }, { x: 255, y1: 221, y2: 321, label: "ΔHf", c: "b" }, { x: 345, y1: 323, y2: 129, label: "ΔH(latt)", c: "a" }]),
          model: "Levels from the bottom: NaCl(s); Na(s) + ½Cl₂(g) (ΔHf down to NaCl); Na(g) + ½Cl₂(g) (atomisation of Na); Na(g) + Cl(g) (atomisation of Cl); Na⁺(g) + e⁻ + Cl(g) (first IE); down to Na⁺(g) + Cl⁻(g) (electron affinity); lattice enthalpy from NaCl(s) up to Na⁺(g) + Cl⁻(g).",
          accept: "ΔH(lattice) arrow drawn downwards if labelled as −ΔH(lattice); energy-level or triangle (Hess) style; the atomisation steps in either order",
          reject: "Cl₂(g) instead of ½Cl₂(g); missing state symbols; the electron left out of the ionisation level; ions shown as (s) or (aq)",
          tip: "每一層都要寫 state symbols，電子 e⁻ 都要寫埋！EA 箭咀向下，IE 向上。" },
        { title: "Sketch how entropy changes with temperature", hl: true, paper: "P2", where: "Paper 1A / 2 · 2 marks",
          q: "Sketch a graph showing how the entropy of a pure substance changes as it is heated from 0 K, through melting and boiling. Explain the shape.",
          marks: ["S increases gradually with T in each state, starting near __zero at 0 K__", "__vertical__ increases at the melting point and boiling point, the jump at boiling being __much larger__ (liquid → gas gives greatest increase in disorder)"],
          diagram: { title: "S against T", x: [0, 10], y: [0, 10], grid: false, xLabel: "T / K", yLabel: "S",
            curves: [{ f: (x) => 0.56 * Math.sqrt(x), domain: [0, 3], color: "a" }, { f: (x) => 2.3 + 0.35 * (x - 3), domain: [3, 6], color: "a" }, { f: (x) => 7.4 + 0.25 * (x - 6), domain: [6, 9.6], color: "a" }],
            lines: [{ from: [3, 0.97], to: [3, 2.3], color: "a" }, { from: [6, 3.35], to: [6, 7.4], color: "a" }], vlines: [{ x: 3, label: "mp" }, { x: 6, label: "bp" }] },
          model: "Entropy rises steadily as temperature increases because particles gain more ways of distributing energy. At the melting point and boiling point S rises vertically at constant temperature; the jump on boiling is much larger because a gas is far more disordered than a liquid.",
          accept: "curved or straight rising sections",
          reject: "S decreasing with T; no vertical sections; equal jumps for melting and boiling",
          tip: "兩條垂直線：沸騰嗰條一定長過熔化嗰條。" },
      ],
      concepts: [
        { h: "Reading ΔG–T graphs", b: "<p>Plot of ΔG° against T is a straight line: <strong>y-intercept = ΔH°</strong>, <strong>gradient = −ΔS°</strong>. The reaction is spontaneous where the line is below ΔG = 0; it crosses zero at \\(T = \\Delta H^\\circ/\\Delta S^\\circ\\) (convert ΔS from J K⁻¹ mol⁻¹ to kJ K⁻¹ mol⁻¹ first). A change of slope in a real ΔG–T line happens where a reactant or product changes state (ΔS changes).</p>" },
      ],
    },

    // -------------------------------------------------------------- R2.1
    "chem-8": {
      diagrams: [
        { title: "Mass of precipitate against volume of solution added: rises, then levels off when the other reactant becomes limiting", x: [0, 50], y: [0, 6], grid: false, xLabel: "V added / cm³", yLabel: "mass / g",
          curves: [{ f: (x) => (x < 25 ? 0.2 * x : 5), domain: [0, 48], color: "a" }], vlines: [{ x: 25, label: "stoichiometric point" }],
          texts: [{ at: [4, 4.4], text: "added solution limiting" }, { at: [30, 4.4], text: "other reactant limiting" }] },
        { title: "Volume of H₂ against mass of Mg added to a fixed amount of acid: straight line through the origin, then horizontal once the acid is used up", x: [0, 1], y: [0, 120], grid: false, xLabel: "mass Mg / g", yLabel: "V(H₂) / cm³",
          curves: [{ f: (x) => Math.min(x * 200, 100), domain: [0, 0.95], color: "b" }], hlines: [{ y: 100, label: "acid limiting" }] },
        { title: "Continuous variation: temperature rise against volume of A (total volume fixed); the peak gives the mole ratio", x: [0, 50], y: [0, 10], grid: false, xLabel: "V(A) / cm³", yLabel: "ΔT / K",
          curves: [{ f: (x) => (x < 25 ? 0.36 * x : 0.36 * (50 - x)), domain: [0, 50], color: "a" }], vlines: [{ x: 25, label: "1 : 1 ratio" }] },
      ],
      figures: [
        { title: "The mole map", caption: "Convert everything to moles first, use the mole ratio from the balanced equation, then convert back. Molar volume of an ideal gas at STP (273 K, 100 kPa) = 22.7 dm³ mol⁻¹.",
          svg: S("0 0 420 200", "Mole conversion map", mk("ar-ch8-1"),
            `<rect x="160" y="80" width="100" height="40" rx="8" fill="var(--fig-fill)" stroke="var(--fig-a)" stroke-width="2"/>` + t(210, 105, "moles, n", "middle", 'font-weight="bold"') +
            rect(10, 10, 120, 34, 'rx="6"') + t(70, 32, "mass m / g") + rect(290, 10, 120, 34, 'rx="6"') + t(350, 32, "particles N") +
            rect(10, 156, 120, 34, 'rx="6"') + t(70, 178, "solution: c, V") + rect(290, 156, 120, 34, 'rx="6"') + t(350, 178, "gas volume V") +
            ar(110, 44, 168, 82, "ar-ch8-1") + t(118, 72, "÷ M", "end") + ar(310, 44, 252, 82, "ar-ch8-1") + t(305, 72, "÷ Nₐ", "start") +
            ar(110, 156, 168, 118, "ar-ch8-1") + t(118, 145, "× V(dm³)", "end") + ar(310, 156, 252, 118, "ar-ch8-1") + t(305, 145, "÷ 22.7 dm³", "start") +
            t(210, 62, "n = m/M = N/Nₐ") + t(210, 142, "n = cV = V(gas)/Vm")) },
        { title: "Titration apparatus and reading a burette", caption: "Read the bottom of the meniscus at eye level; burette readings to ±0.05 cm³ (two decimal places, ending in 0 or 5). Rinse burette with titrant and pipette with the solution it delivers.",
          svg: S("0 0 420 260", "Burette over a conical flask on a white tile, with meniscus detail", mk("ar-ch8-2"),
            rect(80, 10, 18, 150) + `<rect x="82" y="40" width="14" height="118" fill="var(--fig-fill)"/>` + [30, 50, 70, 90, 110, 130].map((y) => ln(80, y, 88, y, 'stroke-width="1"')).join("") +
            `<path d="M84 160h10l-2 14h-6z" fill="none" stroke="currentColor" stroke-width="1.5"/>` + rect(76, 162, 26, 6) + ln(89, 176, 89, 186, 'stroke="var(--fig-b)" stroke-dasharray="2 3"') +
            `<path d="M70 190h38l22 50h-82z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M57 225h64l7 15h-78z" fill="var(--fig-fill)"/>` + rect(30, 240, 120, 8, 'fill="var(--fig-fill)"') +
            t(104, 26, "burette (titrant)", "start") + t(110, 168, "tap", "start") + t(140, 222, "conical flask + indicator", "start") + t(160, 256, "white tile", "start") +
            rect(270, 30, 50, 130) + `<path d="M272 90 Q295 104 318 90 V158 H272z" fill="var(--fig-fill)"/>` + `<path d="M272 90 Q295 104 318 90" fill="none" stroke="var(--fig-b)" stroke-width="1.8"/>` +
            ln(250, 97, 340, 97, 'stroke="var(--fig-d)" stroke-dasharray="4 3"') + t(345, 94, "eye level:", "start", 'font-size="11"') + t(345, 108, "read bottom", "start", 'font-size="11"') + t(345, 122, "of meniscus", "start", 'font-size="11"') +
            t(295, 22, "meniscus") + ln(320, 60, 312, 60) + t(325, 64, "22.30", "start", 'font-size="11"')) },
        { title: "Measuring the volume of gas produced", caption: "Gas syringe (more precise) or collection over water in an inverted measuring cylinder (not for gases that are soluble, e.g. CO₂ slightly, NH₃, HCl).",
          svg: S("0 0 440 170", "Gas syringe and collection over water", mk("ar-ch8-3"),
            `<path d="M20 60h70v80h-70z" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="22" y="110" width="66" height="28" fill="var(--fig-fill)"/>` + rect(40, 48, 30, 12) +
            `<path d="M55 48V30h50" fill="none" stroke="currentColor" stroke-width="1.5"/>` + rect(105, 20, 110, 20) + rect(150, 24, 105, 12) + ln(255, 30, 270, 30) + [125, 145, 165, 185, 205].map((x) => ln(x, 20, x, 26, 'stroke-width="1"')).join("") +
            t(160, 60, "gas syringe") + t(55, 158, "reaction flask") +
            `<path d="M260 100h170v60h-170z" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="262" y="112" width="166" height="46" fill="var(--fig-fill)"/>` +
            `<path d="M360 150V20h30v130" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="362" y="70" width="26" height="80" fill="var(--fig-fill)"/>` + t(395, 45, "gas", "start") +
            `<path d="M300 92V136h66" fill="none" stroke="currentColor" stroke-width="1.5"/>` + t(300, 86, "from flask") + t(385, 12, "inverted measuring cylinder", "end", 'font-size="11"')) },
      ],
      frames: [
        { title: "Deduce the stoichiometric ratio from a graph", paper: "P1B", where: "Paper 1B · 2–3 marks · data-based graph",
          q: "Different volumes of 0.500 mol dm⁻³ Pb(NO₃)₂ were added to 20.0 cm³ of 1.00 mol dm⁻³ KI and the mass of PbI₂ precipitate measured. The graph rises linearly then becomes horizontal at 20.0 cm³. Sketch the graph and deduce the mole ratio Pb²⁺ : I⁻.",
          marks: ["straight line through the origin that becomes __horizontal__ (sharp change at 20.0 cm³)", "n(Pb²⁺) at the break = 0.500 × 0.0200 = 0.0100 mol; n(I⁻) = 1.00 × 0.0200 = 0.0200 mol", "ratio Pb²⁺ : I⁻ = __1 : 2__ (Pb²⁺ + 2I⁻ → PbI₂)"],
          diagram: { title: "Mass of PbI₂ against volume of Pb(NO₃)₂", x: [0, 40], y: [0, 6], grid: false, xLabel: "V / cm³", yLabel: "mass / g", curves: [{ f: (x) => Math.min(0.2305 * x, 4.61), domain: [0, 38], color: "a" }], vlines: [{ x: 20, label: "20.0 cm³" }] },
          model: "Before 20.0 cm³, Pb²⁺ is limiting so the mass increases in proportion to volume; after it, I⁻ is used up and the mass stays constant. At the break: 0.0100 mol Pb²⁺ reacts with 0.0200 mol I⁻, so the ratio is 1 : 2.",
          accept: "line of best fit through the points with the intersection used", reject: "a smooth curve with no break; reading the ratio from volumes without using concentrations",
          tip: "轉折點 = 兩樣啱啱好反應晒，用嗰點計 mol 比。" },
      ],
      concepts: [
        { h: "Gas law graphs to remember", b: "<p>At fixed n and T: \\(pV\\) = constant, so V against p is a curve (hyperbola) and V against 1/p is a straight line through the origin. At fixed p and n: V ∝ T(K) - a straight line through 0 K (extrapolates to −273 °C). Molar volume at STP (273 K, 100 kPa) is 22.7 dm³ mol⁻¹ (data booklet). Convert cm³ → m³ (× 10⁻⁶) and kPa → Pa (× 10³) in \\(pV = nRT\\).</p>" },
      ],
    },

    // -------------------------------------------------------------- R2.2
    "chem-9": {
      diagrams: [
        { title: "Maxwell–Boltzmann: a catalyst lowers Ea, so more particles have E ≥ Ea(cat) (curve unchanged)", x: [0, 10], y: [0, 4.5], grid: false, xLabel: "Kinetic energy", yLabel: "Number of particles",
          curves: [{ f: MB(1.5), domain: [0, 10], color: "a" }], vlines: [{ x: 4, label: "Ea(cat)" }, { x: 6.5, label: "Ea" }] },
        { title: "Endothermic energy profile: products above reactants; Ea measured from reactants to the top", x: [0, 10], y: [0, 11], grid: false, origin: false, xLabel: "Reaction progress", yLabel: "Enthalpy",
          curves: [{ f: endo, domain: [0.3, 9.7], color: "a" }],
          lines: [{ from: [3, 2.5], to: [3, endoTop], dash: true, color: "b" }, { from: [3, endoTop], to: [5.3, endoTop], dash: true, color: "muted" }, { from: [8.5, 2.5], to: [8.5, 6], dash: true, color: "c" }, { from: [3, 2.5], to: [8.5, 2.5], dash: true, color: "muted" }],
          texts: [{ at: [2.2, 5], text: "Ea", anchor: "end" }, { at: [8.7, 4.1], text: "ΔH > 0" }, { at: [0.5, 3.1], text: "reactants" }, { at: [7.2, 6.6], text: "products" }] },
        { title: "Concentration against time: reactant falls and product rises, both levelling off; the gradient (rate) decreases", x: [0, 10], y: [0, 1.1], grid: false, xLabel: "Time", yLabel: "Concentration",
          curves: [{ f: (x) => Math.exp(-0.45 * x), color: "a", label: "reactant", labelX: 7 }, { f: (x) => 1 - Math.exp(-0.45 * x), color: "b", label: "product", labelX: 7 }] },
        { title: "Mass of flask (CaCO₃ + HCl, CO₂ escapes) against time: falls and levels off", x: [0, 10], y: [0, 1.1], grid: false, xLabel: "Time", yLabel: "Mass",
          curves: [{ f: (x) => 0.55 + 0.4 * Math.exp(-0.5 * x), color: "a" }] },
        { title: "Volume of gas: original (solid); half the amount of limiting reactant (dashed): slower start and HALF the final volume", x: [0, 200], y: [0, 80], grid: false, xLabel: "Time / s", yLabel: "Volume / cm³",
          curves: [{ f: (x) => 70 * (1 - Math.exp(-x / 35)), color: "a" }, { f: (x) => 35 * (1 - Math.exp(-x / 45)), color: "b", dash: true }] },
        { title: "Rate against time: highest at the start, decreases as reactants are used up", x: [0, 10], y: [0, 1.1], grid: false, xLabel: "Time", yLabel: "Rate",
          curves: [{ f: (x) => Math.exp(-0.45 * x), color: "a" }] },
        { title: "Rate against temperature: rises steeply (exponentially); a rough rule is that rate doubles per 10 K", x: [280, 340], y: [0, 10], grid: false, origin: false, xLabel: "T / K", yLabel: "Rate",
          curves: [{ f: (x) => 0.5 * 2 ** ((x - 290) / 10), domain: [282, 338], color: "a" }] },
      ],
      figures: [
        { title: "Collision theory: a successful collision", caption: "Particles must collide with E ≥ Ea AND with the correct orientation (geometry). Most collisions are not successful.",
          svg: S("0 0 420 140", "Successful and unsuccessful collision orientations", mk("ar-ch9-1"),
            `<circle cx="40" cy="40" r="14" fill="var(--fig-b)" opacity=".75"/><circle cx="66" cy="40" r="11" fill="var(--fig-d)" opacity=".75"/>` + ar(80, 40, 115, 40, "ar-ch9-1") +
            `<circle cx="150" cy="40" r="14" fill="var(--fig-c)" opacity=".75"/>` + t(200, 44, "correct orientation, E ≥ Ea → reaction", "start") +
            `<circle cx="66" cy="100" r="14" fill="var(--fig-b)" opacity=".75"/><circle cx="40" cy="100" r="11" fill="var(--fig-d)" opacity=".75"/>` + ar(82, 100, 115, 100, "ar-ch9-1") +
            `<circle cx="150" cy="100" r="14" fill="var(--fig-c)" opacity=".75"/>` + t(200, 104, "wrong end hits, or E < Ea → bounce off", "start")) },
        { title: "Following rate by mass loss", caption: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). Cotton wool lets CO₂ out but stops acid spray. Works best for dense gases (CO₂), poorly for H₂.",
          svg: S("0 0 300 170", "Conical flask with cotton wool on a balance", mk("ar-ch9-2"),
            `<path d="M120 40h20v30l35 70h-90l35-70z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M100 120h60l15 20h-90z" fill="var(--fig-fill)"/>` +
            `<rect x="118" y="30" width="24" height="12" rx="5" fill="var(--fig-muted)" opacity=".6"/>` + rect(60, 140, 140, 20) + t(130, 155, "123.45 g", "middle", 'font-size="11"') +
            t(150, 26, "cotton wool", "start") + t(185, 122, "acid + marble chips", "start") + t(205, 155, "balance", "start")) },
      ],
      frames: [
        { title: "Sketch a Maxwell–Boltzmann curve to show the effect of a catalyst", star: true, paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch a Maxwell–Boltzmann distribution and use it to explain how a catalyst increases the rate of reaction.",
          marks: ["axes labelled __number of particles__ / probability against __kinetic energy__; curve starts at the origin, is asymmetric and does not touch the x-axis at high E",
            "Ea(cat) marked at a __lower__ energy than Ea on the __same__ curve",
            "a greater number/proportion of particles have E ≥ Ea(cat) (larger area) so more __successful collisions per unit time__"],
          diagram: { title: "Same curve, two activation energies", x: [0, 10], y: [0, 4.5], grid: false, xLabel: "Kinetic energy", yLabel: "Number of particles", curves: [{ f: MB(1.5), color: "a" }], vlines: [{ x: 4, label: "Ea(cat)" }, { x: 6.5, label: "Ea" }] },
          model: "A catalyst provides an alternative pathway with a lower activation energy. The distribution curve is unchanged, but the area under the curve to the right of Ea(cat) is larger than to the right of Ea, so a greater proportion of collisions have enough energy to react, increasing the frequency of successful collisions.",
          accept: "shading of the area beyond each Ea; 'alternative reaction pathway'",
          reject: "drawing a second, shifted curve for the catalyst; 'catalyst gives particles more energy'; curve touching the x-axis at high energy",
          tip: "催化劑唔會改條曲線！只係將 Ea 條線移去左邊。" },
        { title: "Sketch and label an endothermic energy profile", paper: "P1B", where: "Paper 1A / 2 · 2–3 marks",
          q: "Sketch an energy profile for an endothermic reaction, labelling the activation energy, Ea, and the enthalpy change, ΔH.",
          marks: ["products drawn __higher__ than reactants", "Ea shown from the __reactant__ level to the top of the curve", "ΔH shown from reactants to products (positive / upward arrow)"],
          diagram: { title: "Endothermic profile", x: [0, 10], y: [0, 11], grid: false, origin: false, xLabel: "Reaction progress", yLabel: "Enthalpy", curves: [{ f: endo, domain: [0.3, 9.7], color: "a" }],
            lines: [{ from: [3, 2.5], to: [3, endoTop], dash: true, color: "b" }, { from: [3, endoTop], to: [5.3, endoTop], dash: true, color: "muted" }, { from: [8.5, 2.5], to: [8.5, 6], dash: true, color: "c" }, { from: [3, 2.5], to: [8.5, 2.5], dash: true, color: "muted" }],
            texts: [{ at: [2.8, 5], text: "Ea", anchor: "end" }, { at: [8.7, 4.1], text: "ΔH" }] },
          model: "Reactants on the left, products at a higher enthalpy on the right; a single hump between them. Ea is the height from reactants to the maximum; ΔH is the vertical distance from reactants up to products.",
          accept: "y-axis labelled energy or potential energy", reject: "Ea measured from products; ΔH arrow pointing down for an endothermic reaction; y-axis 'temperature'",
          tip: "吸熱 = 生成物高過反應物；Ea 一定由反應物量起。" },
        { title: "Sketch the effect of changing the amount or concentration on a gas-volume graph", star: true, paper: "P1B", where: "Paper 1A / 1B · 2 marks",
          q: "Excess magnesium ribbon reacts with 50 cm³ of 1.0 mol dm⁻³ HCl. Sketch the volume of H₂ against time, and on the same axes sketch the curve for 50 cm³ of 0.50 mol dm⁻³ HCl.",
          marks: ["second curve has a __less steep initial gradient__ (lower rate)", "second curve levels off at __half__ the final volume (half the moles of the limiting reactant, HCl)"],
          diagram: { title: "1.0 mol dm⁻³ (solid) and 0.50 mol dm⁻³ (dashed)", x: [0, 200], y: [0, 80], grid: false, xLabel: "Time / s", yLabel: "V(H₂) / cm³", curves: [{ f: (x) => 70 * (1 - Math.exp(-x / 35)), color: "a" }, { f: (x) => 35 * (1 - Math.exp(-x / 45)), color: "b", dash: true }] },
          model: "Lower concentration means fewer collisions per unit time, so the initial gradient is smaller. HCl is limiting, and there is half as much, so the final volume is halved.",
          accept: "curve taking longer to level off", reject: "same final volume when the limiting reagent is reduced; dashed curve above the original",
          tip: "先問：邊個係 limiting？佢少咗，最終體積先會少；只係改變速率 (溫度、催化劑、表面積) 最終體積唔變。" },
      ],
      concepts: [
        { h: "Graph-shape rules for rate questions", b: "<p>Faster reaction → <strong>steeper initial gradient</strong>, levels off sooner. Final amount of product changes <strong>only</strong> if the amount of the limiting reactant changes (temperature, catalyst and surface area do not change it). Rate at any time = gradient of the tangent; the initial rate = gradient of the tangent at t = 0. Changing T changes the Maxwell–Boltzmann curve (flatter, peak lower and to the right, same area); a catalyst does not change the curve, only the position of Ea.</p>" },
      ],
    },

    // -------------------------------------------------------------- R2.3
    "chem-10": {
      diagrams: [
        { title: "N₂O₄ ⇌ 2NO₂: N₂O₄ added at t₁ - jump in [N₂O₄], then both readjust (NO₂ rises twice as much as N₂O₄ falls)", x: [0, 10], y: [0, 1.2], grid: false, xLabel: "Time", yLabel: "Concentration",
          curves: [{ f: piece(4, 0.9, 0.781, 1.2), domain: [4, 10], color: "a" }, { f: () => 0.4, domain: [0, 4], color: "a", label: "[N₂O₄]", labelX: 0.5 }, { f: piece(4, 0.6, 0.838, 1.2), domain: [0, 10], color: "b", label: "[NO₂]", labelX: 0.5 }],
          lines: [{ from: [4, 0.4], to: [4, 0.9], color: "a" }], vlines: [{ x: 4, label: "t₁" }] },
        { title: "N₂O₄ ⇌ 2NO₂: volume halved (pressure increased) at t₁ - both concentrations double instantly, then shift towards fewer gas moles (N₂O₄)", x: [0, 10], y: [0, 1.4], grid: false, xLabel: "Time", yLabel: "Concentration",
          curves: [{ f: () => 0.4, domain: [0, 4], color: "a", label: "[N₂O₄]", labelX: 0.5 }, { f: piece(4, 0.8, 0.94, 1.2), domain: [4, 10], color: "a" }, { f: () => 0.6, domain: [0, 4], color: "b", label: "[NO₂]", labelX: 0.5 }, { f: piece(4, 1.2, 0.92, 1.2), domain: [4, 10], color: "b" }],
          lines: [{ from: [4, 0.4], to: [4, 0.8], color: "a" }, { from: [4, 0.6], to: [4, 1.2], color: "b" }], vlines: [{ x: 4, label: "t₁" }] },
        { title: "N₂O₄ ⇌ 2NO₂ (ΔH > 0): temperature raised at t₁ - no jump; gradual shift to the right, K increases", x: [0, 10], y: [0, 1], grid: false, xLabel: "Time", yLabel: "Concentration",
          curves: [{ f: piece(4, 0.4, 0.3, 0.9), color: "a", label: "[N₂O₄]", labelX: 8 }, { f: piece(4, 0.6, 0.8, 0.9), color: "b", label: "[NO₂]", labelX: 8 }], vlines: [{ x: 4, label: "t₁" }] },
        { title: "Catalyst: equilibrium reached sooner (dashed) but the same equilibrium concentrations", x: [0, 10], y: [0, 1], grid: false, xLabel: "Time", yLabel: "[product]",
          curves: [{ f: (x) => 0.7 * (1 - Math.exp(-0.5 * x)), color: "a", label: "no catalyst", labelX: 2.6 }, { f: (x) => 0.7 * (1 - Math.exp(-1.6 * x)), color: "b", dash: true, label: "catalyst", labelX: 0.7 }] },
        { title: "Exothermic reaction with fewer gas moles on the right (Haber): equilibrium yield falls with T, is higher at higher p", x: [300, 700], y: [0, 100], grid: false, origin: false, xLabel: "T / °C", yLabel: "% NH₃ at equilibrium",
          curves: [{ f: (x) => 100 / (1 + Math.exp((x - 520) / 55)), domain: [310, 690], color: "a", label: "400 atm", labelX: 560 }, { f: (x) => 100 / (1 + Math.exp((x - 430) / 55)), domain: [310, 690], color: "b", label: "100 atm", labelX: 450 }] },
        { title: "Value of K against temperature: K decreases for an exothermic forward reaction, increases for an endothermic one", x: [0, 10], y: [0, 10], grid: false, xLabel: "T", yLabel: "K",
          curves: [{ f: (x) => 9 * Math.exp(-0.35 * x), domain: [0.5, 9.5], color: "a", label: "exothermic", labelX: 6 }, { f: (x) => 0.4 * Math.exp(0.32 * x), domain: [0.5, 9.5], color: "b", label: "endothermic", labelX: 7 }] },
      ],
      figures: [
        { title: "Dynamic equilibrium in a closed system", caption: "Forward rate = reverse rate; macroscopic properties (colour, pressure, concentrations) are constant, but both reactions continue.",
          svg: S("0 0 380 130", "Sealed syringe containing N2O4 and NO2 molecules", mk("ar-ch10-1") + mk("ar-ch10-1b", "var(--fig-b)"),
            rect(20, 30, 200, 70, 'rx="6"') + rect(220, 50, 60, 30) + ln(280, 65, 300, 65) +
            [[45, 50], [80, 75], [130, 48], [170, 80], [195, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="var(--fig-d)" opacity=".7"/>`).join("") +
            [[60, 82], [110, 70], [150, 60]].map(([x, y]) => `<circle cx="${x - 6}" cy="${y}" r="6" fill="var(--fig-muted)"/><circle cx="${x + 6}" cy="${y}" r="6" fill="var(--fig-muted)"/>`).join("") +
            t(120, 20, "sealed: nothing enters or leaves") + t(120, 120, "N₂O₄ (pale, pairs) ⇌ 2NO₂ (brown)") +
            ar(305, 50, 365, 50, "ar-ch10-1") + t(335, 42, "forward") + ar(365, 80, 305, 80, "ar-ch10-1b", "var(--fig-b)") + t(335, 96, "reverse") + t(335, 68, "equal rates", "middle", 'font-size="11"')) },
      ],
      frames: [
        { title: "Sketch how concentrations respond to a disturbance", star: true, paper: "P1B", where: "Paper 1B / 2 · 3 marks · graph to complete",
          q: "The system N₂O₄(g) ⇌ 2NO₂(g) is at equilibrium. At time t₁ more N₂O₄ is added at constant volume and temperature. Complete the concentration–time graph for both gases after t₁.",
          marks: ["[N₂O₄] rises __vertically__ at t₁ and then __decreases gradually__ to a new constant value higher than before",
            "[NO₂] shows __no jump__ at t₁ but increases gradually to a new constant value",
            "change in [NO₂] is __twice__ the decrease in [N₂O₄] after t₁, and both level off at the same time"],
          diagram: { title: "N₂O₄ added at t₁", x: [0, 10], y: [0, 1.2], grid: false, xLabel: "Time", yLabel: "Concentration",
            curves: [{ f: () => 0.4, domain: [0, 4], color: "a", label: "[N₂O₄]", labelX: 0.5 }, { f: piece(4, 0.9, 0.781, 1.2), domain: [4, 10], color: "a" }, { f: piece(4, 0.6, 0.838, 1.2), color: "b", label: "[NO₂]", labelX: 0.5 }],
            lines: [{ from: [4, 0.4], to: [4, 0.9], color: "a" }], vlines: [{ x: 4, label: "t₁" }] },
          model: "At t₁ [N₂O₄] jumps up. By Le Chatelier's principle the position of equilibrium shifts right: [N₂O₄] then falls gradually and [NO₂] rises gradually (by twice as much) until both level off. Kc is unchanged.",
          accept: "any sensible new values provided the shape and 2 : 1 ratio of change are correct",
          reject: "a jump in [NO₂]; [N₂O₄] returning to its original value; lines levelling off at different times",
          tip: "加入嘅嗰樣先會垂直跳；另一樣慢慢變。溫度改變就冇垂直跳。" },
        { title: "Sketch equilibrium yield against temperature at two pressures", paper: "P2", where: "Paper 2 · 2 marks",
          q: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −92 kJ, sketch the percentage of NH₃ at equilibrium against temperature at 100 atm and at 400 atm.",
          marks: ["both curves __decrease__ with increasing temperature (exothermic forward reaction)", "the 400 atm curve lies __above__ the 100 atm curve at every temperature (fewer moles of gas on the right)"],
          diagram: { title: "% NH₃ against T", x: [300, 700], y: [0, 100], grid: false, origin: false, xLabel: "T / °C", yLabel: "% NH₃",
            curves: [{ f: (x) => 100 / (1 + Math.exp((x - 520) / 55)), domain: [310, 690], color: "a", label: "400 atm", labelX: 560 }, { f: (x) => 100 / (1 + Math.exp((x - 430) / 55)), domain: [310, 690], color: "b", label: "100 atm", labelX: 450 }] },
          model: "Increasing temperature shifts the exothermic equilibrium to the left, so yield falls; higher pressure favours the side with fewer gas molecules (2 vs 4), so the higher-pressure curve is always higher.",
          accept: "straight or curved decreasing lines", reject: "curves crossing; the yield rising with temperature",
          tip: "放熱 → 溫度高產率低；氣體 mol 少嗰邊 → 壓力高產率高。" },
      ],
    },

    // -------------------------------------------------------------- R2.2–2.3 HL
    "chem-h4": {
      diagrams: [
        { title: "First order: [A] against time has a constant half-life (here t½ = 2 units each time)", x: [0, 9], y: [0, 1.1], grid: false, xLabel: "Time", yLabel: "[A]",
          curves: [{ f: (x) => Math.exp((-Math.LN2 / 2) * x), color: "a" }],
          points: [{ at: [2, 0.5], label: "t½" }, { at: [4, 0.25], label: "2t½" }, { at: [6, 0.125], label: "3t½" }],
          lines: [{ from: [0, 0.5], to: [2, 0.5], dash: true, color: "muted" }, { from: [2, 0], to: [2, 0.5], dash: true, color: "muted" }, { from: [0, 0.25], to: [4, 0.25], dash: true, color: "muted" }, { from: [4, 0], to: [4, 0.25], dash: true, color: "muted" }] },
        { title: "Same starting [A] and initial rate: zero order (straight line), first order, second order (rate falls off most as [A] drops, so the longest tail)", x: [0, 10], y: [0, 1.1], grid: false, xLabel: "Time", yLabel: "[A]",
          curves: [{ f: (x) => Math.max(0, 1 - 0.3 * x), color: "muted", label: "zero", labelX: 2.2 }, { f: (x) => Math.exp(-0.3 * x), color: "a", label: "first", labelX: 6 }, { f: (x) => 1 / (1 + 0.3 * x), color: "b", label: "second", labelX: 7.5 }] },
        { title: "Rate constant against temperature: k = Ae^(−Ea/RT) rises exponentially", x: [280, 360], y: [0, 10], grid: false, origin: false, xLabel: "T / K", yLabel: "k",
          curves: [{ f: (x) => 1e9 * Math.exp(-6400 / x), domain: [282, 358], color: "a" }] },
        { title: "Gibbs energy against extent of reaction: G is a minimum at equilibrium; ΔG° < 0 so equilibrium lies to the right (K > 1)", x: [0, 1], y: [0, 13], grid: false, xLabel: "Extent: reactants → products", yLabel: "G",
          curves: [{ f: (x) => 12 - 4 * x + 6 * (x * Math.log(Math.max(x, 1e-9)) + (1 - x) * Math.log(Math.max(1 - x, 1e-9))), domain: [0, 1], color: "a" }],
          vlines: [{ x: 0.66, label: "equilibrium (min G)" }] },
      ],
      figures: [
        { title: "Transition state vs intermediate", caption: "A transition state (‡) is at an energy maximum and cannot be isolated; an intermediate sits in a minimum between two steps. The step with the highest transition state above its starting point (largest Ea) is rate-determining.",
          svg: S("0 0 420 220", "Two-step energy profile labelling transition states and intermediate", mk("ar-chh4-1"),
            ln(30, 200, 30, 15) + ln(30, 200, 410, 200) + t(220, 216, "reaction progress") + t(36, 18, "energy", "start") +
            `<path d="M40 150 H80 C120 150 120 40 150 40 C180 40 175 110 205 110 C235 110 240 75 265 75 C290 75 300 175 340 175 H400" fill="none" stroke="var(--fig-a)" stroke-width="2.4"/>` +
            t(150, 32, "TS1 ‡") + t(265, 67, "TS2 ‡") + t(205, 128, "intermediate") + t(60, 143, "reactants") + t(370, 168, "products") +
            ln(95, 150, 95, 40, 'stroke="var(--fig-b)" stroke-dasharray="4 3"') + t(91, 95, "Ea(1)", "end", 'fill="var(--fig-b)"')) },
      ],
      frames: [
        { title: "Use half-life to show a reaction is first order", hl: true, paper: "P1B", where: "Paper 1B / 2 · 2–3 marks · concentration–time graph",
          q: "The graph shows [A] against time for the decomposition of A. Show that the reaction is first order with respect to A and calculate k if t½ = 40 s.",
          marks: ["read at least two successive half-lives from the graph and show they are __equal / constant__", "constant half-life → __first order__", "k = ln 2 / t½ = 0.693 / 40 = __0.017 s⁻¹__ (1.7 × 10⁻² s⁻¹)"],
          numeric: { value: 0.0173, tol: 3 },
          diagram: { title: "Constant half-life", x: [0, 160], y: [0, 1.1], grid: false, xLabel: "t / s", yLabel: "[A] / mol dm⁻³", curves: [{ f: (x) => Math.exp((-Math.LN2 / 40) * x), color: "a" }], points: [{ at: [40, 0.5], label: "40 s" }, { at: [80, 0.25], label: "80 s" }, { at: [120, 0.125], label: "120 s" }] },
          model: "[A] falls from 1.0 to 0.50 in 40 s and from 0.50 to 0.25 in a further 40 s: the half-life is constant, which is characteristic of a first-order reaction. k = ln 2 / t½ = 0.693/40 = 1.7 × 10⁻² s⁻¹.",
          accept: "0.0173 s⁻¹", reject: "units of mol dm⁻³ s⁻¹ for k; only one half-life read",
          tip: "至少讀兩個 t½ 證明相同；k 單位 s⁻¹。" },
        { title: "Sketch Gibbs energy against extent of reaction", hl: true, paper: "P2", where: "Paper 2 · 2 marks",
          q: "Sketch how the Gibbs energy of a reaction mixture varies with the extent of reaction for a reaction with ΔG° < 0, and mark the equilibrium position.",
          marks: ["curve with a __minimum__; equilibrium marked at the minimum", "pure products drawn __lower__ than pure reactants (ΔG° < 0) so the minimum lies nearer the products (K > 1)"],
          diagram: { title: "G against extent", x: [0, 1], y: [0, 13], grid: false, xLabel: "Extent of reaction", yLabel: "G", curves: [{ f: (x) => 12 - 4 * x + 6 * (x * Math.log(Math.max(x, 1e-9)) + (1 - x) * Math.log(Math.max(1 - x, 1e-9))), color: "a" }], vlines: [{ x: 0.66, label: "equilibrium" }] },
          model: "G falls from pure reactants to a minimum and rises again towards pure products. Because ΔG° (products − reactants) is negative, the products end lies lower and the minimum (the equilibrium mixture) is closer to the products, so K > 1.",
          accept: "ΔG° labelled as the difference between the two ends", reject: "minimum drawn at either end; equilibrium marked at a maximum",
          tip: "平衡 = G 最低點。ΔG° 負 → 最低點近生成物 → K > 1。" },
      ],
      concepts: [
        { h: "Half-life", b: "<p>For a first-order reaction the half-life is constant and independent of the initial concentration: \\(t_{1/2} = \\dfrac{\\ln 2}{k}\\) (data booklet). Read two or more successive half-lives from a concentration–time graph to test for first order. Radioactive decay is first order.</p>" },
      ],
    },

    // -------------------------------------------------------------- R3.1
    "chem-11": {
      diagrams: [
        { title: "0.100 mol dm⁻³ HCl added to 25.0 cm³ of 0.100 mol dm⁻³ NaOH: starts at pH 13, sharp fall at 25.0 cm³ through pH 7", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "Volume of HCl / cm³", yLabel: "pH",
          curves: [{ f: pHcurve({ into: "base", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1e9, Kb: 1e9 }), domain: [0, 50], color: "a" }], vlines: [{ x: 25, label: "equivalence, pH 7" }] },
        { title: "Thermometric titration: temperature rises to a maximum at the equivalence point (exothermic neutralisation), then falls as cooler solution is added", x: [0, 50], y: [18, 30], grid: false, origin: false, xLabel: "Volume of acid added / cm³", yLabel: "T / °C",
          curves: [{ f: (x) => (x < 25 ? 20 + 0.26 * x : 26.5 - 0.09 * (x - 25)), domain: [0, 48], color: "a" }], vlines: [{ x: 25, label: "equivalence" }] },
        { title: "pH against [H⁺]: pH = −log₁₀[H⁺]; a tenfold change in [H⁺] changes pH by 1", x: [0, 0.13], y: [0, 4], grid: false, xLabel: "[H⁺] / mol dm⁻³", yLabel: "pH",
          curves: [{ f: (x) => -Math.log10(x), domain: [0.0001, 0.1], color: "a" }], points: [{ at: [0.01, 2], label: "0.010 → pH 2" }, { at: [0.1, 1], label: "pH 1" }] },
      ],
      figures: [
        { title: "Brønsted–Lowry conjugate pairs", caption: "An acid donates H⁺ to a base. Each acid becomes its conjugate base; conjugate pairs differ by exactly one H⁺.",
          svg: S("0 0 440 130", "Proton transfer from ethanoic acid to water with conjugate pairs", mk("ar-ch11-1", "var(--fig-d)"),
            t(55, 70, "CH₃COOH") + t(118, 70, "+") + t(160, 70, "H₂O") + t(210, 70, "⇌") + t(270, 70, "CH₃COO⁻") + t(330, 70, "+") + t(380, 70, "H₃O⁺") +
            t(55, 92, "acid", "middle", 'font-size="11"') + t(160, 92, "base", "middle", 'font-size="11"') + t(270, 92, "conj. base", "middle", 'font-size="11"') + t(380, 92, "conj. acid", "middle", 'font-size="11"') +
            cv("M70 52 Q115 22 155 52", "ar-ch11-1") + t(112, 30, "H⁺", "middle", 'fill="var(--fig-d)"') +
            `<path d="M55 100V115H270V100" fill="none" stroke="var(--fig-a)" stroke-width="1.5"/>` + `<path d="M160 100V124H380V100" fill="none" stroke="var(--fig-b)" stroke-width="1.5"/>` +
            t(430, 118, "pairs", "end", 'font-size="11"')) },
        { title: "The pH scale (25 °C)", caption: "pH + pOH = 14.00 at 298 K; [H⁺][OH⁻] = Kw = 1.00 × 10⁻¹⁴. Neutral = 7 only at 25 °C.",
          svg: S("0 0 450 110", "pH scale from 0 to 14 with examples", "",
            [...Array(15).keys()].map((i) => `<rect x="${10 + i * 28}" y="30" width="28" height="26" fill="${i < 7 ? "var(--fig-d)" : i > 7 ? "var(--fig-b)" : "var(--fig-c)"}" opacity="${(0.25 + Math.abs(i - 7) * 0.09).toFixed(2)}"/>` + t(24 + i * 28, 48, i, "middle", 'font-size="11"')).join("") +
            t(24, 22, "acidic", "start") + t(220, 22, "neutral") + t(430, 22, "alkaline", "end") +
            t(24, 76, "HCl 1 M", "middle", 'font-size="11"') + t(108, 76, "vinegar", "middle", 'font-size="11"') + t(220, 76, "pure water", "middle", 'font-size="11"') + t(332, 76, "NH₃(aq)", "middle", 'font-size="11"') + t(416, 76, "NaOH 1 M", "middle", 'font-size="11"') +
            t(220, 100, "[H⁺]: 1 → 10⁻⁷ → 10⁻¹⁴ mol dm⁻³")) },
      ],
      frames: [
        { title: "Sketch the pH curve when a strong acid is added to a strong base", paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch the pH curve for the addition of 0.100 mol dm⁻³ HCl to 25.0 cm³ of 0.100 mol dm⁻³ NaOH, labelling the initial pH and the equivalence point.",
          marks: ["starts at __pH 13__ and decreases slowly", "__vertical__ section around 25.0 cm³ with equivalence point at __pH 7__", "levels off at about pH 1–2 (approaching the pH of the acid)"],
          diagram: { title: "HCl into NaOH", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "V(HCl) / cm³", yLabel: "pH", curves: [{ f: pHcurve({ into: "base", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1e9, Kb: 1e9 }), color: "a" }], vlines: [{ x: 25, label: "pH 7" }] },
          model: "pH starts at 13 (pOH = 1) and decreases gradually, then drops steeply from about 11 to 3 at 25.0 cm³ (equivalence, pH 7), then levels off just above pH 1.",
          accept: "vertical section between about pH 3 and 11", reject: "curve rising; equivalence at a volume other than 25.0 cm³; levelling off below pH 1",
          tip: "鹼入面加酸 → 條線由高跌落低；先計起點 pH 同 equivalence volume。" },
        { title: "Find the equivalence point from a thermometric titration", paper: "P1B", where: "Paper 1B · 2 marks · data-based",
          q: "In a thermometric titration, HCl was added to 25.0 cm³ of NaOH. The temperature rose to a maximum and then fell. Explain how the graph is used to find the equivalence volume and why the temperature falls afterwards.",
          marks: ["draw best-fit straight lines through the rising and falling points; the __intersection__ gives the equivalence volume", "after equivalence no more neutralisation occurs (no more heat released) and the added acid at lower temperature __cools__ the mixture / heat loss to surroundings"],
          diagram: { title: "Temperature against volume", x: [0, 50], y: [18, 30], grid: false, origin: false, xLabel: "V(HCl) / cm³", yLabel: "T / °C", curves: [{ f: (x) => (x < 25 ? 20 + 0.26 * x : 26.5 - 0.09 * (x - 25)), domain: [0, 48], color: "a" }], vlines: [{ x: 25, label: "intersection" }] },
          model: "Extrapolate the two straight-line sections; where they cross is the equivalence volume (maximum temperature). Beyond this, all the base has reacted, so no more heat is produced and the cooler acid added, plus heat loss, lowers the temperature.",
          accept: "the maximum temperature as an estimate", reject: "taking the last highest data point without extrapolation when points are scattered",
          tip: "兩條直線延長相交 = 終點。" },
      ],
    },

    // -------------------------------------------------------------- R3.2
    "chem-12": {
      figures: [
        { title: "Primary (voltaic) cell: Zn | Zn²⁺ ‖ Cu²⁺ | Cu", caption: "Electrons flow through the external wire from the anode (Zn, oxidation, negative) to the cathode (Cu, reduction, positive). In the salt bridge (e.g. KNO₃) anions move towards the anode half-cell and cations towards the cathode half-cell.",
          svg: S("0 0 440 250", "Zinc copper voltaic cell with salt bridge and voltmeter", mk("ar-ch12-1", "var(--fig-b)") + mk("ar-ch12-1b", "var(--fig-d)"),
            beaker(30, 110, 130, 120, 85) + beaker(280, 110, 130, 120, 85) + `<rect x="80" y="70" width="18" height="140" fill="var(--fig-muted)" opacity=".6"/><rect x="342" y="70" width="18" height="140" fill="var(--fig-d)" opacity=".45"/>` +
            `<path d="M89 70V40H190M250 40H351V70" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="220" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/>` + t(220, 45, "V") +
            `<path d="M120 190V120H320V190" fill="none" stroke="var(--fig-a)" stroke-width="10" opacity=".35"/>` + t(220, 100, "salt bridge (KNO₃(aq))") +
            ar(110, 28, 180, 28, "ar-ch12-1", "var(--fig-b)") + t(110, 20, "e⁻ flow", "start", 'fill="var(--fig-b)"') +
            ar(240, 140, 160, 140, "ar-ch12-1b", "var(--fig-d)") + t(200, 156, "NO₃⁻", "middle", 'fill="var(--fig-d)" font-size="11"') +
            t(89, 64, "Zn", "middle", 'font-weight="bold"') + t(351, 64, "Cu", "middle", 'font-weight="bold"') +
            t(95, 222, "Zn²⁺(aq)") + t(345, 222, "Cu²⁺(aq)") + t(10, 100, "anode (−)", "start") + t(430, 100, "cathode (+)", "end") +
            t(95, 246, "Zn → Zn²⁺ + 2e⁻ (oxidation)", "middle", 'font-size="11"') + t(345, 246, "Cu²⁺ + 2e⁻ → Cu (reduction)", "middle", 'font-size="11"')) },
        { title: "Electrolytic cell: molten NaCl", caption: "A d.c. supply forces a non-spontaneous reaction. Cathode (connected to −): reduction, Na⁺ + e⁻ → Na(l). Anode (+): oxidation, 2Cl⁻ → Cl₂(g) + 2e⁻. Ions move in the melt; electrons move only in the external circuit.",
          svg: S("0 0 400 240", "Electrolysis of molten sodium chloride with inert electrodes", mk("ar-ch12-2", "var(--fig-b)"),
            beaker(70, 100, 260, 120, 90) + `<rect x="120" y="70" width="16" height="130" fill="var(--fig-muted)" opacity=".6"/><rect x="264" y="70" width="16" height="130" fill="var(--fig-muted)" opacity=".6"/>` +
            `<path d="M128 70V40H185M215 40H272V70" fill="none" stroke="currentColor" stroke-width="1.5"/>` + ln(190, 33, 190, 47, 'stroke-width="2.5"') + ln(204, 28, 204, 52, 'stroke-width="2.5"') +
            t(184, 22, "−", "middle") + t(212, 22, "+", "middle") + t(197, 70, "d.c. supply") +
            ar(178, 34, 140, 34, "ar-ch12-2", "var(--fig-b)") + ar(268, 34, 225, 34, "ar-ch12-2", "var(--fig-b)") + t(128, 28, "e⁻", "middle", 'fill="var(--fig-b)"') +
            t(200, 170, "molten NaCl(l): Na⁺, Cl⁻") + ar(220, 150, 150, 150, "ar-ch12-2", "var(--fig-d)") + t(186, 145, "Na⁺", "middle", 'font-size="11"') + ar(180, 190, 250, 190, "ar-ch12-2", "var(--fig-d)") + t(215, 205, "Cl⁻", "middle", 'font-size="11"') +
            t(60, 92, "cathode (−) graphite", "start") + t(340, 92, "anode (+)", "end") + t(128, 236, "Na(l) forms") + t(272, 236, "Cl₂(g) bubbles")) },
        { title: "Hydrogen–oxygen fuel cell (acidic electrolyte)", caption: "Anode (−): H₂ → 2H⁺ + 2e⁻. Cathode (+): O₂ + 4H⁺ + 4e⁻ → 2H₂O. Overall 2H₂ + O₂ → 2H₂O. Alkaline version: H₂ + 2OH⁻ → 2H₂O + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻. Reactants are supplied continuously.",
          svg: S("0 0 420 200", "Hydrogen oxygen fuel cell", mk("ar-ch12-3") + mk("ar-ch12-3b", "var(--fig-b)"),
            rect(110, 50, 200, 120) + `<rect x="110" y="50" width="22" height="120" fill="var(--fig-muted)" opacity=".5"/><rect x="288" y="50" width="22" height="120" fill="var(--fig-muted)" opacity=".5"/><rect x="132" y="52" width="156" height="116" fill="var(--fig-fill)"/>` +
            ar(30, 80, 105, 80, "ar-ch12-3") + t(30, 72, "H₂ in", "start") + ar(390, 80, 315, 80, "ar-ch12-3") + t(390, 72, "O₂ in", "end") + ar(315, 145, 390, 145, "ar-ch12-3") + t(390, 162, "H₂O out", "end") +
            t(210, 105, "electrolyte") + t(210, 121, "H⁺ moves →") + `<path d="M121 50V20H299V50" fill="none" stroke="currentColor" stroke-width="1.5"/>` + ar(170, 20, 250, 20, "ar-ch12-3b", "var(--fig-b)") + t(210, 14, "e⁻ (load)", "middle", 'fill="var(--fig-b)"') +
            t(121, 190, "anode (−)") + t(299, 190, "cathode (+)")) },
      ],
      frames: [
        { title: "Draw and label an electrolytic cell", star: true, paper: "P2", where: "Paper 2 · 3–4 marks · labelled diagram",
          q: "Draw a labelled diagram of the apparatus used to electrolyse molten lead(II) bromide. Show the direction of electron flow and give the half-equation at each electrode.",
          marks: ["d.c. power supply with two (inert, e.g. graphite) electrodes dipping into __molten__ PbBr₂", "electrodes labelled anode (+) and cathode (−) with __electron flow__ in the external wire towards the cathode",
            "cathode: __Pb²⁺ + 2e⁻ → Pb__", "anode: __2Br⁻ → Br₂ + 2e⁻__"],
          svg: S("-70 0 540 230", "Electrolysis of molten lead bromide", mk("ar-ch12-f1", "var(--fig-b)"),
            beaker(70, 100, 260, 110, 80) + `<rect x="120" y="70" width="16" height="125" fill="var(--fig-muted)" opacity=".6"/><rect x="264" y="70" width="16" height="125" fill="var(--fig-muted)" opacity=".6"/>` +
            `<path d="M128 70V40H185M215 40H272V70" fill="none" stroke="currentColor" stroke-width="1.5"/>` + ln(190, 33, 190, 47, 'stroke-width="2.5"') + ln(204, 28, 204, 52, 'stroke-width="2.5"') + t(184, 22, "−") + t(212, 22, "+") +
            ar(178, 34, 140, 34, "ar-ch12-f1", "var(--fig-b)") + ar(268, 34, 225, 34, "ar-ch12-f1", "var(--fig-b)") + t(200, 160, "molten PbBr₂(l)") + t(200, 225, "heat ↑") +
            t(60, 92, "cathode (−)", "start") + t(340, 92, "anode (+)", "end") + t(60, 125, "Pb²⁺ + 2e⁻ → Pb", "end", 'font-size="11"') + t(340, 125, "2Br⁻ → Br₂ + 2e⁻", "start", 'font-size="11"')),
          svgCaption: "Molten PbBr₂ with graphite electrodes",
          model: "A beaker of molten PbBr₂ (heated) with two graphite electrodes connected to a d.c. supply. Electrons flow from the negative terminal to the cathode, and from the anode back to the positive terminal. Cathode: Pb²⁺ + 2e⁻ → Pb(l); anode: 2Br⁻ → Br₂(g) + 2e⁻.",
          accept: "carbon or platinum electrodes; brown vapour at the anode",
          reject: "aqueous solution; electrons shown flowing through the electrolyte; anode labelled negative in an electrolytic cell",
          tip: "電解池：陽極 (+) 氧化，陰極 (−) 還原；電子只係喺電線行，唔會行入溶液。" },
        { title: "Label a voltaic cell diagram", paper: "P1B", where: "Paper 1A / 2 · 3 marks · diagram given",
          q: "A voltaic cell is made from Mg | Mg²⁺ and Cu | Cu²⁺ half-cells. On a diagram, label the anode and the direction of electron flow, and state the purpose of the salt bridge.",
          marks: ["__Mg__ is the anode (more reactive; oxidised, Mg → Mg²⁺ + 2e⁻)", "electrons flow in the external circuit __from Mg to Cu__", "salt bridge __completes the circuit__ / allows ions to move to maintain electrical neutrality in each half-cell"],
          model: "Magnesium is higher in the activity series, so it is oxidised and is the negative anode; electrons travel through the wire from Mg to Cu, where Cu²⁺ is reduced. The salt bridge allows ions to flow between the half-cells, balancing charge and completing the circuit.",
          accept: "'keeps solutions neutral'", reject: "'electrons flow through the salt bridge'; Cu as anode",
          tip: "較活潑嘅金屬 = 陽極 (−)；鹽橋行離子，唔係電子。" },
      ],
    },

    // -------------------------------------------------------------- R3.1–3.2 HL
    "chem-h5": {
      diagrams: [
        { title: "Weak acid–strong base with indicator ranges: phenolphthalein (8.3–10.0) falls inside the steep part; methyl orange (3.1–4.4) does not", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "Volume of NaOH / cm³", yLabel: "pH",
          curves: [{ f: pHcurve({ into: "acid", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1.8e-5, Kb: 1e9 }), domain: [0, 50], color: "a" }],
          hlines: [{ y: 8.3, label: "" }, { y: 10, label: "phenolphthalein" }, { y: 3.1, label: "" }, { y: 4.4, label: "methyl orange" }] },
        { title: "Strong acid–weak base (HCl into NH₃): starts ≈ pH 11, equivalence below 7 (≈ pH 5); half-equivalence pH = pKa of NH₄⁺ (9.25)", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "Volume of HCl / cm³", yLabel: "pH",
          curves: [{ f: pHcurve({ into: "base", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1e9, Kb: 1.8e-5 }), domain: [0, 50], color: "a" }], vlines: [{ x: 12.5, label: "½ eq." }, { x: 25, label: "eq." }], points: [{ at: [12.5, 9.25], label: "pKa" }] },
        { title: "Weak acid–weak base (CH₃COOH with NH₃): no sharp vertical section, so no indicator gives a clear end point", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "Volume of NH₃ / cm³", yLabel: "pH",
          curves: [{ f: pHcurve({ into: "acid", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1.8e-5, Kb: 1.8e-5 }), domain: [0, 50], color: "a" }], vlines: [{ x: 25, label: "eq. ≈ pH 7" }] },
        { title: "Buffer region and half-equivalence (weak acid–strong base): pH = pKa when V = ½V(eq)", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "Volume of NaOH / cm³", yLabel: "pH",
          curves: [{ f: pHcurve({ into: "acid", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1.8e-5, Kb: 1e9 }), domain: [0, 50], color: "a" }],
          shade: { from: 5, to: 20, color: "c" }, points: [{ at: [12.5, 4.74], label: "pH = pKa = 4.74" }], vlines: [{ x: 25, label: "eq. pH ≈ 8.7" }], texts: [{ at: [6, 7], text: "buffer region" }] },
      ],
      figures: [
        { title: "Standard hydrogen electrode (SHE)", caption: "E° = 0.00 V by definition: H₂(g) at 100 kPa bubbling over a platinum (black) electrode in 1.00 mol dm⁻³ H⁺(aq) at 298 K. Connected by a salt bridge and high-resistance voltmeter to the half-cell being measured.",
          svg: S("0 0 440 250", "Standard hydrogen electrode connected to a copper half-cell", mk("ar-chh5-1"),
            beaker(30, 110, 140, 120, 85) + beaker(270, 110, 140, 120, 85) + `<path d="M85 40V170h30V40" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
            `<rect x="92" y="175" width="16" height="22" fill="var(--fig-muted)"/>` + ln(100, 60, 100, 175) + ar(60, 52, 84, 52, "ar-chh5-1") + t(84, 26, "H₂(g), 100 kPa", "middle", 'font-size="11"') +
            [[95, 160], [104, 148], [96, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="currentColor"/>`).join("") +
            `<rect x="332" y="70" width="16" height="140" fill="var(--fig-d)" opacity=".45"/>` + `<path d="M100 60V30H198M242 30H340V70" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="220" cy="30" r="17" fill="none" stroke="currentColor" stroke-width="1.5"/>` + t(220, 35, "V") +
            `<path d="M140 190V125H300V190" fill="none" stroke="var(--fig-a)" stroke-width="10" opacity=".35"/>` + t(220, 118, "salt bridge") +
            t(112, 210, "Pt (platinum black)", "start", 'font-size="11"') + t(100, 245, "1.00 mol dm⁻³ H⁺(aq), 298 K") + t(340, 245, "1.00 mol dm⁻³ Cu²⁺(aq)") + t(352, 64, "Cu", "start", 'font-weight="bold"')) },
        { title: "Electroplating an object with copper", caption: "Object to be plated = cathode (−): Cu²⁺ + 2e⁻ → Cu. Pure copper = anode (+): Cu → Cu²⁺ + 2e⁻. Electrolyte contains Cu²⁺ (CuSO₄(aq)); its concentration and colour stay constant.",
          svg: S("0 0 400 220", "Electroplating cell", mk("ar-chh5-2", "var(--fig-b)"),
            beaker(70, 90, 260, 115, 85) + `<rect x="115" y="65" width="18" height="125" fill="var(--fig-d)" opacity=".45"/><path d="M270 120a14 14 0 1 0 0.1 0" fill="var(--fig-muted)" opacity=".7"/>` + ln(270, 60, 270, 106) +
            `<path d="M124 65V35H185M215 35H270V60" fill="none" stroke="currentColor" stroke-width="1.5"/>` + ln(190, 23, 190, 47, 'stroke-width="2.5"') + ln(204, 28, 204, 42, 'stroke-width="2.5"') + t(184, 17, "+") + t(212, 17, "−") +
            t(200, 170, "CuSO₄(aq)") + t(60, 82, "anode (+): pure Cu", "start") + t(340, 82, "cathode (−): object", "end") + t(124, 216, "Cu → Cu²⁺ + 2e⁻", "middle", 'font-size="11"') + t(280, 216, "Cu²⁺ + 2e⁻ → Cu", "middle", 'font-size="11"')) },
        { title: "Electrochemical series: reading E° values", caption: "More positive E° = stronger oxidising agent (left side, top of this list is reduced most easily). More negative E° = stronger reducing agent (right side). A reaction is spontaneous when E°cell = E°(cathode) − E°(anode) > 0.",
          svg: S("0 0 420 230", "Ladder of standard electrode potentials", mk("ar-chh5-3", "var(--fig-d)") + mk("ar-chh5-3b", "var(--fig-b)"),
            [["F₂ + 2e⁻ ⇌ 2F⁻", "+2.87"], ["Cl₂ + 2e⁻ ⇌ 2Cl⁻", "+1.36"], ["Ag⁺ + e⁻ ⇌ Ag", "+0.80"], ["Cu²⁺ + 2e⁻ ⇌ Cu", "+0.34"], ["2H⁺ + 2e⁻ ⇌ H₂", "0.00"], ["Zn²⁺ + 2e⁻ ⇌ Zn", "−0.76"], ["Mg²⁺ + 2e⁻ ⇌ Mg", "−2.37"], ["Li⁺ + e⁻ ⇌ Li", "−3.04"]]
              .map(([e, v], i) => t(90, 30 + i * 25, e, "start") + t(300, 30 + i * 25, v + " V", "end")).join("") +
            ar(60, 205, 60, 25, "ar-chh5-3", "var(--fig-d)") + t(52, 120, "stronger oxidising agent", "middle", 'transform="rotate(-90 52 120)" fill="var(--fig-d)" font-size="11"') +
            ar(340, 25, 340, 205, "ar-chh5-3b", "var(--fig-b)") + t(354, 115, "stronger reducing", "middle", 'transform="rotate(90 354 115)" fill="var(--fig-b)" font-size="11"') + t(372, 115, "agent", "middle", 'transform="rotate(90 372 115)" fill="var(--fig-b)" font-size="11"')) },
      ],
      frames: [
        { title: "Determine pKa from a titration curve", star: true, hl: true, paper: "P1B", where: "Paper 1B / 2 · 2–3 marks · pH curve given",
          q: "25.0 cm³ of a weak acid HA was titrated with 0.100 mol dm⁻³ NaOH; the equivalence point is at 25.0 cm³. Explain how the curve is used to find pKa, and state pKa if pH = 4.74 at 12.5 cm³.",
          marks: ["at __half-equivalence__ (12.5 cm³) [HA] = [A⁻]", "so Ka = [H⁺] / pH = pKa (from Ka = [H⁺][A⁻]/[HA])", "pKa = __4.74__ (Ka = 1.8 × 10⁻⁵)"],
          numeric: { value: 4.74, tol: 1 },
          diagram: { title: "Half-equivalence point", x: [0, 50], y: [0, 14], grid: false, origin: false, xLabel: "V(NaOH) / cm³", yLabel: "pH", curves: [{ f: pHcurve({ into: "acid", C0: 0.1, V0: 25, Ct: 0.1, Ka: 1.8e-5, Kb: 1e9 }), color: "a" }], vlines: [{ x: 12.5, label: "½V(eq)" }, { x: 25, label: "V(eq)" }], points: [{ at: [12.5, 4.74], label: "pKa" }] },
          model: "Half of the HA has been neutralised at 12.5 cm³, so [HA] = [A⁻] and Ka = [H⁺]; hence pKa = pH at half-equivalence = 4.74.",
          accept: "pKa read from the graph to ±0.1", reject: "pH at the equivalence point taken as pKa; pH at 0 cm³",
          tip: "pKa 喺一半 equivalence volume 讀，唔係喺 equivalence point！" },
        { title: "Draw a standard hydrogen electrode", hl: true, paper: "P2", where: "Paper 2 · 3 marks · labelled diagram",
          q: "Draw a labelled diagram of a standard hydrogen electrode and state the standard conditions.",
          marks: ["__hydrogen gas__ bubbled over a __platinum__ electrode", "in __1.00 mol dm⁻³ H⁺(aq)__ (e.g. HCl)", "__100 kPa__ H₂ and __298 K__"],
          svg: S("0 0 260 220", "Standard hydrogen electrode", mk("ar-chh5-f1"),
            beaker(40, 90, 150, 115, 80) + `<path d="M100 30V160h30V30" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="107" y="165" width="16" height="22" fill="var(--fig-muted)"/>` + ln(115, 15, 115, 165) +
            ar(70, 45, 99, 45, "ar-chh5-f1") + t(68, 40, "H₂, 100 kPa", "end", 'font-size="11"') + t(128, 182, "Pt", "start") + t(115, 216, "1.00 mol dm⁻³ H⁺(aq), 298 K") + t(140, 12, "to salt bridge / voltmeter →", "start", 'font-size="11"') +
            [[110, 150], [119, 140], [111, 128]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="currentColor"/>`).join("")),
          model: "Hydrogen gas at 100 kPa is bubbled over a platinum electrode (coated with platinum black) dipping into 1.00 mol dm⁻³ H⁺(aq) at 298 K. Its potential is defined as 0.00 V.",
          accept: "1 bar; 25 °C", reject: "1 mol dm⁻³ H₂SO₄ (gives 2 mol dm⁻³ H⁺); copper or carbon electrode; 1 atm when the question asks for IB standard values",
          tip: "三樣：Pt、1.00 mol dm⁻³ H⁺、100 kPa + 298 K。" },
      ],
      concepts: [
        { h: "Choosing an indicator from the curve", b: "<p>The indicator's colour-change range (≈ pKa(In) ± 1) must lie inside the <strong>vertical section</strong> of the pH curve. Strong acid–strong base: almost any (methyl orange, bromothymol blue, phenolphthalein). Weak acid–strong base (equivalence ≈ pH 8–9): <strong>phenolphthalein</strong>. Strong acid–weak base (equivalence ≈ pH 5): <strong>methyl orange</strong>. Weak–weak: no sharp end point, no suitable indicator.</p>" },
      ],
    },

    // -------------------------------------------------------------- R3.3–3.4
    "chem-13": {
      figures: [
        { title: "Homolytic and heterolytic fission", caption: "Half-headed (fish-hook) arrow = movement of ONE electron; full-headed arrow = movement of an electron PAIR. Homolytic fission gives two radicals; heterolytic fission gives a cation and an anion.",
          svg: S("0 0 440 150", "Fish-hook arrows for homolytic fission and full arrow for heterolytic fission", mk("ar-ch13-1", "var(--fig-d)", true),
            t(30, 60, "Cl", "middle", 'font-size="14"') + ln(42, 55, 72, 55) + t(84, 60, "Cl", "middle", 'font-size="14"') +
            cv("M57 52 Q45 25 32 45", "ar-ch13-1") + cv("M57 52 Q69 25 82 45", "ar-ch13-1") + t(115, 60, "→ 2Cl•", "start", 'font-size="14"') + t(95, 100, "homolytic: UV light, radicals") +
            `<defs>${mk("ar-ch13-1b", "var(--fig-d)")}</defs>` + t(260, 60, "H", "middle", 'font-size="14"') + ln(270, 55, 300, 55) + t(312, 60, "Cl", "middle", 'font-size="14"') +
            cv("M285 52 Q300 25 312 44", "ar-ch13-1b") + t(330, 60, "→ H⁺ + Cl⁻", "start", 'font-size="14"') + t(330, 100, "heterolytic: ions") + t(220, 140, "δ+ / δ− : the more electronegative atom takes the pair", "middle", 'font-size="11"')) },
        { title: "Radical substitution: CH₄ + Cl₂ (UV)", caption: "Initiation makes radicals; propagation uses and regenerates a radical (chain reaction); termination joins two radicals. Further substitution gives CH₂Cl₂, CHCl₃, CCl₄, so a mixture forms.",
          svg: S("0 0 420 190", "Initiation, propagation and termination steps", "",
            `<rect x="10" y="10" width="400" height="44" rx="6" fill="var(--fig-fill)"/>` + t(20, 28, "Initiation", "start", 'font-weight="bold" fill="var(--fig-a)"') + t(20, 46, "Cl₂ → 2Cl•   (UV light, homolytic fission)", "start") +
            `<rect x="10" y="62" width="400" height="60" rx="6" fill="var(--fig-fill)"/>` + t(20, 80, "Propagation", "start", 'font-weight="bold" fill="var(--fig-a)"') + t(20, 98, "CH₄ + Cl• → CH₃• + HCl", "start") + t(20, 115, "CH₃• + Cl₂ → CH₃Cl + Cl•", "start") +
            `<rect x="10" y="130" width="400" height="56" rx="6" fill="var(--fig-fill)"/>` + t(20, 148, "Termination", "start", 'font-weight="bold" fill="var(--fig-a)"') + t(20, 166, "Cl• + Cl• → Cl₂;   CH₃• + Cl• → CH₃Cl;", "start") + t(20, 182, "CH₃• + CH₃• → C₂H₆", "start")) },
        { title: "Nucleophilic substitution: OH⁻ + bromoethane", caption: "The nucleophile's lone pair attacks the δ+ carbon; the C–Br bond pair moves to Br, which leaves as Br⁻. Arrows start at a lone pair or a bond and end at an atom.",
          svg: S("0 0 460 140", "Curly arrows for hydroxide attacking bromoethane", mk("ar-ch13-3", "var(--fig-d)"),
            t(40, 74, "HO", "middle", 'font-size="14"') + t(56, 66, "⁻", "middle") + `<circle cx="50" cy="58" r="1.6"/><circle cx="56" cy="58" r="1.6"/>` +
            t(140, 74, "C", "middle", 'font-size="14"') + ln(140, 60, 140, 40) + t(140, 34, "H", "middle") + ln(140, 80, 140, 100) + t(140, 114, "CH₃", "middle") + ln(130, 69, 110, 69) + t(103, 74, "H", "middle") +
            ln(150, 69, 190, 69) + t(204, 74, "Br", "middle", 'font-size="14"') + t(150, 60, "δ+", "start", 'font-size="11"') + t(200, 58, "δ−", "middle", 'font-size="11"') +
            cv("M54 54 Q95 18 130 58", "ar-ch13-3") + cv("M170 72 Q190 98 205 84", "ar-ch13-3") +
            t(250, 74, "→", "middle", 'font-size="16"') + t(330, 74, "CH₃CH₂OH  +  Br⁻", "middle", 'font-size="14"')) },
        { title: "Electrophilic addition: Br₂ + ethene", caption: "The C=C π electrons induce a dipole in Br₂ and attack Brδ+; heterolytic fission gives a carbocation and Br⁻, which then attacks C⁺. Product: 1,2-dibromoethane.",
          svg: S("0 0 460 170", "Mechanism of bromine adding to ethene", mk("ar-ch13-4", "var(--fig-d)"),
            t(40, 114, "H₂C", "middle", 'font-size="14"') + ln(56, 106, 94, 106) + ln(56, 112, 94, 112) + t(112, 114, "CH₂", "middle", 'font-size="14"') +
            t(75, 80, "Br", "middle", 'font-size="14"') + t(92, 80, "δ+", "start", 'font-size="11"') + ln(75, 64, 75, 46) + t(75, 40, "Br", "middle", 'font-size="14"') + t(60, 38, "δ−", "end", 'font-size="11"') +
            cv("M68 104 Q56 92 66 82", "ar-ch13-4") + cv("M78 56 Q100 48 88 34", "ar-ch13-4") +
            t(160, 100, "→", "middle", 'font-size="16"') +
            t(215, 114, "H₂C", "middle", 'font-size="14"') + ln(231, 109, 265, 109) + t(283, 114, "CH₂", "middle", 'font-size="14"') + t(299, 102, "+", "middle", 'font-size="14"') + ln(215, 100, 215, 82) + t(215, 76, "Br", "middle", 'font-size="14"') +
            t(300, 54, "Br", "middle", 'font-size="14"') + t(311, 50, "⁻", "middle") + `<circle cx="296" cy="62" r="1.6"/><circle cx="302" cy="62" r="1.6"/>` + cv("M297 66 Q290 80 286 98", "ar-ch13-4") +
            t(250, 150, "carbocation + Br⁻") + t(340, 114, "→ BrCH₂CH₂Br", "start", 'font-size="13"')) },
      ],
      frames: [
        { title: "Draw fish-hook arrows for homolytic fission", paper: "P2", where: "Paper 2 · 2 marks",
          q: "Using appropriate curly arrows, show the homolytic fission of a chlorine molecule and state the condition needed.",
          marks: ["__two half-headed (fish-hook)__ arrows, each from the Cl–Cl bond to one Cl atom", "condition: __UV light__ (or high temperature); products 2Cl• shown with a dot"],
          svg: S("0 0 260 100", "Homolytic fission of chlorine", mk("ar-ch13-f1", "var(--fig-d)", true),
            t(40, 60, "Cl", "middle", 'font-size="14"') + ln(52, 55, 92, 55) + t(104, 60, "Cl", "middle", 'font-size="14"') + cv("M72 52 Q58 22 42 44", "ar-ch13-f1") + cv("M72 52 Q86 22 102 44", "ar-ch13-f1") +
            t(130, 60, "→ Cl• + Cl•", "start", 'font-size="14"') + t(130, 90, "UV light", "start")),
          model: "Cl–Cl → 2Cl•: one fish-hook arrow from the bond to each chlorine atom; each atom takes one electron of the bonding pair. Requires UV light.",
          accept: "'sunlight'", reject: "full-headed arrows (these show heterolytic fission); ions as products",
          tip: "一個電子 = 半箭咀 (魚鈎)；兩個電子 = 全箭咀。" },
      ],
    },

    // -------------------------------------------------------------- R3.4 HL
    "chem-h6": {
      diagrams: [
        { title: "SN2 energy profile: one step, a single transition state, no intermediate", x: [0, 10], y: [0, 10], grid: false, origin: false, xLabel: "Reaction progress", yLabel: "Energy",
          curves: [{ f: profile(5, 2.5, 4), domain: [0.3, 9.7], color: "a" }], hlines: [{ y: 5, label: "RX + OH⁻" }, { y: 2.5, label: "ROH + X⁻" }], texts: [{ at: [5.3, 8.6], text: "transition state ‡" }] },
      ],
      figures: [
        { title: "SN2: OH⁻ + bromomethane (inversion)", caption: "Primary halogenoalkane. One concerted step; rate = k[RBr][OH⁻]. The nucleophile attacks from the side opposite Br (backside attack), the transition state is five-coordinate, and the configuration is inverted.",
          svg: S("0 0 480 160", "SN2 mechanism with transition state", mk("ar-chh6-1", "var(--fig-d)"),
            t(30, 84, "HO", "middle", 'font-size="14"') + t(46, 76, "⁻", "middle") + `<circle cx="40" cy="68" r="1.6"/><circle cx="46" cy="68" r="1.6"/>` +
            t(110, 84, "C", "middle", 'font-size="14"') + ln(118, 79, 150, 79) + t(164, 84, "Br", "middle", 'font-size="14"') +
            ln(110, 70, 110, 50) + t(110, 44, "H", "middle") + ln(104, 88, 90, 108) + t(86, 120, "H", "middle") + ln(116, 88, 130, 108) + t(134, 120, "H", "middle") +
            cv("M44 64 Q75 40 100 70", "ar-chh6-1") + cv("M134 82 Q150 104 166 92", "ar-chh6-1") +
            t(196, 84, "→", "middle", 'font-size="16"') +
            `<path d="M215 30V130M355 30V130" fill="none" stroke="currentColor" stroke-width="1.3"/>` + ln(215, 30, 222, 30) + ln(215, 130, 222, 130) + ln(348, 30, 355, 30) + ln(348, 130, 355, 130) + t(362, 30, "‡ ⁻", "start") +
            t(238, 84, "HO", "middle") + ln(252, 79, 275, 79, 'stroke-dasharray="3 3"') + t(285, 84, "C", "middle", 'font-size="14"') + ln(295, 79, 318, 79, 'stroke-dasharray="3 3"') + t(334, 84, "Br", "middle") +
            ln(285, 70, 285, 50) + t(285, 44, "H", "middle") + ln(280, 88, 268, 106) + t(264, 118, "H", "middle") + ln(290, 88, 302, 106) + t(306, 118, "H", "middle") +
            t(390, 84, "→", "middle", 'font-size="16"') + t(420, 76, "HO–CH₃", "start", 'font-size="13"').replace('x="420"', 'x="405"') + t(405, 96, "+ Br⁻", "start", 'font-size="13"') + t(285, 152, "transition state (H's planar)")) },
        { title: "SN1: tertiary halogenoalkane", caption: "Step 1 (slow, rate-determining): C–Br breaks heterolytically to a planar tertiary carbocation. Step 2 (fast): OH⁻ attacks either face. rate = k[RBr]. Tertiary carbocations are stabilised by the positive inductive effect of three alkyl groups.",
          svg: S("0 0 480 150", "SN1 mechanism via a carbocation", mk("ar-chh6-2", "var(--fig-d)"),
            t(60, 84, "(CH₃)₃C", "middle", 'font-size="14"') + ln(90, 79, 120, 79) + t(136, 84, "Br", "middle", 'font-size="14"') + cv("M105 76 Q120 50 138 68", "ar-chh6-2") +
            t(175, 70, "slow", "middle", 'font-size="11"') + t(175, 84, "→", "middle", 'font-size="16"') +
            t(240, 84, "(CH₃)₃C⁺", "middle", 'font-size="14"') + t(240, 112, "carbocation (planar)", "middle", 'font-size="11"') + t(300, 84, "+ Br⁻", "start", 'font-size="13"') +
            t(240, 40, "HO", "middle", 'font-size="14"') + t(256, 32, "⁻", "middle") + cv("M240 46 Q236 58 240 70", "ar-chh6-2") +
            t(360, 70, "fast", "middle", 'font-size="11"') + t(360, 84, "→", "middle", 'font-size="16"') + t(380, 84, "(CH₃)₃COH", "start", 'font-size="14"')) },
        { title: "Markovnikov addition: HBr + propene", caption: "H adds to the carbon that already has more H atoms; the more stable secondary carbocation forms (two alkyl groups push electron density), so 2-bromopropane is the major product.",
          svg: S("0 0 470 150", "Two possible carbocations from propene and HBr", mk("ar-chh6-3"),
            t(60, 78, "CH₃CH=CH₂", "middle", 'font-size="14"') + t(60, 98, "+ HBr", "middle") + ar(115, 70, 180, 35, "ar-chh6-3") + ar(115, 82, 180, 115, "ar-chh6-3") +
            t(190, 38, "CH₃–C⁺H–CH₃", "start", 'font-size="13"') + t(190, 54, "secondary: more stable", "start", 'font-size="11" fill="var(--fig-c)"') + ar(335, 34, 360, 34, "ar-chh6-3") + t(365, 38, "CH₃CHBrCH₃", "start") + t(365, 54, "major", "start", 'font-size="11" fill="var(--fig-c)"') +
            t(190, 118, "CH₃–CH₂–C⁺H₂", "start", 'font-size="13"') + t(190, 134, "primary: less stable", "start", 'font-size="11" fill="var(--fig-d)"') + ar(335, 114, 360, 114, "ar-chh6-3") + t(365, 118, "CH₃CH₂CH₂Br", "start") + t(365, 134, "minor", "start", 'font-size="11" fill="var(--fig-d)"')) },
        { title: "Nitration of benzene (electrophilic substitution)", caption: "Electrophile formed: HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻. The ring's delocalised electrons attack NO₂⁺; the intermediate has a positive charge spread over a horseshoe of five carbons; loss of H⁺ restores the aromatic ring. Conditions: conc. HNO₃ + conc. H₂SO₄, about 50 °C.",
          svg: S("0 0 480 160", "Nitration of benzene mechanism", mk("ar-chh6-4", "var(--fig-d)"),
            hex(60, 85, 34) + t(130, 40, "NO₂⁺", "middle", 'font-size="14"') + cv("M70 72 Q96 30 116 38", "ar-chh6-4") + t(160, 90, "→", "middle", 'font-size="16"') +
            hex(240, 85, 34, false) + `<path d="M250 67.7 A20 20 0 1 1 230 67.7" fill="none" stroke="currentColor" stroke-width="1.3"/>` + t(240, 90, "+", "middle", 'font-size="14"') +
            ln(240, 51, 225, 30) + t(220, 26, "H", "middle") + ln(240, 51, 258, 30) + t(268, 26, "NO₂", "middle") + cv("M232 42 Q250 60 244 74", "ar-chh6-4") +
            t(320, 90, "→", "middle", 'font-size="16"') + hex(390, 85, 34) + ln(390, 51, 390, 32) + t(390, 26, "NO₂", "middle") + t(440, 92, "+ H⁺", "start")) },
        { title: "Benzene is more stable than 'cyclohexa-1,3,5-triene'", caption: "Hydrogenation: cyclohexene −120 kJ mol⁻¹, so three C=C would release −360; benzene releases only about −208. The ≈152 kJ mol⁻¹ difference is the delocalisation (resonance) energy, which is why benzene prefers substitution (keeps the ring) to addition.",
          svg: levels("ar-chh6-5", "0 0 440 230", "Enthalpy level diagram for hydrogenation of benzene", [
            { y: 30, label: "Kekulé triene + 3H₂ (hypothetical)" }, { y: 80, label: "benzene + 3H₂", x2: 300 }, { y: 210, label: "cyclohexane", x2: 380 }],
          [{ x: 340, y1: 30, y2: 208, label: "−360", c: "d" }, { x: 200, y1: 80, y2: 208, label: "−208", c: "b" }, { x: 140, y1: 32, y2: 78, label: "≈152 stabilisation", c: "a" }]) },
        { title: "Lewis acid–base: coordination bond", caption: "A Lewis base donates an electron pair (NH₃ lone pair); a Lewis acid accepts it (BF₃, electron-deficient B). The coordination (dative) bond is shown as an arrow from donor to acceptor. Nucleophiles are Lewis bases; electrophiles are Lewis acids.",
          svg: S("0 0 420 120", "Ammonia donating a lone pair to boron trifluoride", mk("ar-chh6-6", "var(--fig-d)") + mk("ar-chh6-6b"),
            t(50, 64, "H₃N", "middle", 'font-size="14"') + `<circle cx="66" cy="50" r="1.6"/><circle cx="72" cy="50" r="1.6"/>` + t(110, 64, "+", "middle") + t(160, 64, "BF₃", "middle", 'font-size="14"') +
            cv("M70 46 Q110 18 150 48", "ar-chh6-6") + t(50, 92, "Lewis base", "middle", 'font-size="11"') + t(160, 92, "Lewis acid", "middle", 'font-size="11"') +
            t(210, 64, "→", "middle", 'font-size="16"') + t(250, 64, "H₃N", "middle", 'font-size="14"') + ar(268, 59, 312, 59, "ar-chh6-6b") + t(330, 64, "BF₃", "middle", 'font-size="14"') + t(290, 92, "coordination bond", "middle", 'font-size="11"')) },
      ],
      frames: [
        { title: "Sketch the energy profiles of SN1 and SN2", hl: true, paper: "P2", where: "Paper 2 · 2–3 marks",
          q: "Sketch an energy profile for the SN2 reaction of bromomethane with hydroxide ions and state how it differs from the profile for an SN1 reaction.",
          marks: ["SN2: __one hump__ (single transition state), no intermediate", "SN1: __two humps__ with a carbocation intermediate in the dip between them", "SN1: first hump higher (step 1, ionisation, is __rate-determining__)"],
          diagram: { title: "SN2: single transition state", x: [0, 10], y: [0, 10], grid: false, origin: false, xLabel: "Reaction progress", yLabel: "Energy", curves: [{ f: profile(5, 2.5, 4), domain: [0.3, 9.7], color: "a" }], texts: [{ at: [5.3, 8.6], text: "‡" }] },
          model: "SN2 is a single concerted step, so the profile has one maximum (the transition state) between reactants and products. SN1 has two steps: a higher first maximum for the slow heterolysis to a carbocation, a minimum for the intermediate, then a lower second maximum.",
          accept: "either exothermic or endothermic drawn if consistent", reject: "an intermediate shown for SN2",
          tip: "SN2 一個山，SN1 兩個山 + 中間有 carbocation。" },
      ],
    },
  }});
})();
