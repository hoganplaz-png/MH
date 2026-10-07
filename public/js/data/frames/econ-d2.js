/* Economics (Units 3-4 and HL macro/international) - diagrams and graphs to know (original, 2022 guide). */
(function () {
  // ---------- plot helpers (IB.plot specs) ----------
  const AX = (title, xLabel, yLabel, o) => Object.assign({ title, x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel, yLabel }, o);
  const ADAS = (title, o) => AX(title, "Real GDP", "Average price level", o);
  const L = (from, to, label, color, extra) => Object.assign({ from, to }, label ? { label } : {}, color ? { color } : {}, extra || {});
  const V = (x, y) => ({ from: [x, 0], to: [x, y], dash: true, color: "muted" });
  const H = (x, y) => ({ from: [0, y], to: [x, y], dash: true, color: "muted" });
  const TX = (x, text) => ({ at: [x, -0.65], text, anchor: "middle" });
  const TY = (y, text) => ({ at: [-0.15, y - 0.15], text, anchor: "end" });
  const T = (x, y, text, anchor) => ({ at: [x, y], text, anchor: anchor || "middle" });
  const LRAS = (x, label, color) => L([x, 0], [x, 9.5], label || "LRAS", color || "muted");
  const AD = (k, label, color) => { const a = Math.max(0.5, k - 9.3), b = Math.min(9.5, k - 1.4); return L([a, k - a], [b, k - b], label, color); }; // P = k - Y
  const SRAS = (k, label, color) => L([Math.max(0.5, 0.5 - k), Math.max(0.5, 0.5 + k)], [9.3 - Math.max(0, k), 9.3 - Math.max(0, k) + k], label, color || "c"); // P = Y + k
  const KAS = (x) => (x <= 4 ? 2 : 2 + (1.2 * (x - 4)) / (8.1 - x));
  const TRADE = (title, pw, extraLines, extraTexts) => AX(title, "Quantity", "Price", {
    lines: [L([1, 9], [8.5, 1.5], "D dom", null, { labelAt: "start" }), L([0.5, 0.5], [9, 9], "S dom", "c"), L([0, pw], [10, pw], "Pw", "b")].concat(extraLines || []),
    texts: extraTexts || [],
  });
  const FX = (title, o) => AX(title, "Quantity of currency", "Price of currency (US$)", o);

  // ---------- SVG helpers ----------
  const MK = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  const BOX = (x, y, w, h, lines, o) => {
    o = o || {};
    const fs = o.fs || 13;
    const cy = y + h / 2 - ((lines.length - 1) * (fs + 2)) / 2 + fs / 3;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${o.fill || "var(--fig-fill)"}" stroke="${o.stroke || "currentColor"}" stroke-width="1.5"/>` +
      lines.map((t, i) => `<text x="${x + w / 2}" y="${cy + i * (fs + 2)}" font-size="${fs}" text-anchor="middle" fill="currentColor"${i === 0 && o.bold !== false ? ' font-weight="bold"' : ""}>${t}</text>`).join("");
  };
  const AR = (d, id, color, dash) => `<path d="${d}" fill="none" stroke="${color || "currentColor"}" stroke-width="1.8"${dash ? ' stroke-dasharray="5 4"' : ""} marker-end="url(#${id})"/>`;
  const TXT = (x, y, t, o) => { o = o || {}; return `<text x="${x}" y="${y}" font-size="${o.fs || 12}" text-anchor="${o.a || "middle"}" fill="${o.c || "currentColor"}"${o.b ? ' font-weight="bold"' : ""}>${t}</text>`; };
  const SVG = (w, h, label, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;

  // Circular flow: two-sector (money and real flows)
  const CF2 = SVG(520, 300, "Two-sector circular flow of income", MK("ar-econ9-1") +
    BOX(20, 115, 120, 70, ["Households", "(own factors)"]) + BOX(380, 115, 120, 70, ["Firms", "(produce output)"]) +
    // outer money flows (accent)
    AR("M440 115 V30 H80 V108", "ar-econ9-1", "var(--fig-a)") + TXT(260, 22, "Factor incomes: wages, rent, interest, profit (£)", { c: "var(--fig-a)" }) +
    AR("M80 185 V270 H440 V192", "ar-econ9-1", "var(--fig-a)") + TXT(260, 290, "Consumption expenditure (£)", { c: "var(--fig-a)" }) +
    // inner real flows (blue, dashed)
    AR("M110 108 V70 H410 V108", "ar-econ9-1", "var(--fig-b)", true) + TXT(260, 63, "Factors of production: land, labour, capital, enterprise", { c: "var(--fig-b)" }) +
    AR("M410 192 V230 H110 V192", "ar-econ9-1", "var(--fig-b)", true) + TXT(260, 250, "Goods and services", { c: "var(--fig-b)" }) +
    TXT(260, 140, "Factor market (top)", { c: "var(--fig-muted)" }) + TXT(260, 170, "Product market (bottom)", { c: "var(--fig-muted)" }));

  // Circular flow: five-sector (leakages and injections)
  const CF5 = SVG(600, 330, "Five-sector circular flow with leakages and injections", MK("ar-econ9-2") +
    BOX(15, 120, 115, 90, ["Households"]) + BOX(470, 120, 115, 90, ["Firms"]) +
    BOX(220, 92, 110, 38, ["Financial sector"], { fs: 12 }) + BOX(220, 146, 110, 38, ["Government"], { fs: 12 }) + BOX(220, 200, 110, 38, ["Rest of world"], { fs: 12 }) +
    AR("M527 120 V35 H72 V113", "ar-econ9-2", "var(--fig-a)") + TXT(300, 27, "Factor incomes (Y)", { c: "var(--fig-a)" }) +
    AR("M72 210 V295 H527 V217", "ar-econ9-2", "var(--fig-a)") + TXT(300, 313, "Consumption (C) on domestic output", { c: "var(--fig-a)" }) +
    AR("M130 111 H213", "ar-econ9-2", "var(--fig-d)") + TXT(172, 104, "Saving (S)", { c: "var(--fig-d)", fs: 11 }) +
    AR("M130 165 H213", "ar-econ9-2", "var(--fig-d)") + TXT(172, 158, "Taxes (T)", { c: "var(--fig-d)", fs: 11 }) +
    AR("M130 219 H213", "ar-econ9-2", "var(--fig-d)") + TXT(172, 212, "Imports (M)", { c: "var(--fig-d)", fs: 11 }) +
    AR("M330 111 H463", "ar-econ9-2", "var(--fig-c)") + TXT(397, 104, "Investment (I)", { c: "var(--fig-c)", fs: 11 }) +
    AR("M330 165 H463", "ar-econ9-2", "var(--fig-c)") + TXT(397, 158, "Govt spending (G)", { c: "var(--fig-c)", fs: 11 }) +
    AR("M330 219 H463", "ar-econ9-2", "var(--fig-c)") + TXT(397, 212, "Exports (X)", { c: "var(--fig-c)", fs: 11 }) +
    TXT(172, 262, "LEAKAGES (out)", { c: "var(--fig-d)", b: true }) + TXT(397, 262, "INJECTIONS (in)", { c: "var(--fig-c)", b: true }) +
    TXT(300, 280, "National income rises if I + G + X > S + T + M", { fs: 11 }));

  // Multiplier rounds (HL)
  const MULT = (() => {
    const vals = [100, 80, 64, 51.2, 41, 32.8, 26.2, 21];
    let b = "";
    vals.forEach((v, i) => {
      const h = v * 1.6, x = 40 + i * 42;
      b += `<rect x="${x}" y="${200 - h}" width="30" height="${h}" fill="${i === 0 ? "var(--fig-a)" : "var(--fig-b)"}" opacity="${i === 0 ? 0.9 : 0.75}"/>` + TXT(x + 15, 194 - h, String(Math.round(v)), { fs: 11 }) + TXT(x + 15, 215, i === 0 ? "ΔG" : "R" + (i + 1), { fs: 11 });
    });
    b += TXT(390, 215, "…", { fs: 13 }) + `<line x1="30" y1="200" x2="420" y2="200" stroke="currentColor" stroke-width="1.5"/>`;
    b += TXT(430, 60, "MPC = 0.8", { a: "start" }) + TXT(430, 80, "k = 1/(1 − MPC)", { a: "start" }) + TXT(430, 100, "  = 1/MPW = 5", { a: "start" }) + TXT(430, 125, "ΔY = 5 × 100", { a: "start", b: true }) + TXT(430, 145, "  = $500 m", { a: "start", b: true });
    b += TXT(230, 240, "Each round of spending = MPC × the previous round (0.2 leaks out as S + T + M)", { fs: 11 });
    return SVG(540, 250, "Multiplier rounds of induced spending", b);
  })();

  // Money creation (HL)
  const MONEY = (() => {
    const rows = [[1000, 100, 900], [900, 90, 810], [810, 81, 729]];
    let b = MK("ar-econh3-2") + TXT(70, 22, "Deposit", { b: true }) + TXT(230, 22, "Reserves kept (10%)", { b: true }) + TXT(400, 22, "Loaned out (90%)", { b: true });
    rows.forEach((r, i) => {
      const y = 40 + i * 52;
      b += BOX(20, y, 100, 32, ["$" + r[0]], { bold: false }) + BOX(180, y, 100, 32, ["$" + r[1]], { bold: false, fill: "none" }) + BOX(350, y, 100, 32, ["$" + r[2]], { bold: false });
      b += AR(`M120 ${y + 16} H173`, "ar-econh3-2") + AR(`M280 ${y + 16} H343`, "ar-econh3-2");
      if (i < 2) b += AR(`M400 ${y + 32} V${y + 42} H70 V${y + 45}`, "ar-econh3-2", "var(--fig-a)");
    });
    b += TXT(250, 215, "Re-deposited loans create new deposits: money multiplier = 1 / reserve requirement = 1/0.1 = 10", { fs: 11 });
    b += TXT(250, 233, "Maximum total deposits = 10 × $1000 = $10 000 (new money created = $9000)", { fs: 11, b: true });
    return SVG(500, 245, "Money creation by commercial banks", b);
  })();

  // Integration ladder
  const LADDER = (() => {
    const steps = [["PTA", ["lower tariffs on", "some goods"]], ["Free trade area", ["no tariffs", "between members", "(e.g. USMCA)"]], ["Customs union", ["+ common", "external tariff", "(e.g. SACU)"]], ["Common market", ["+ free movement", "of labour and", "capital"]], ["Monetary union", ["+ single currency,", "one central bank", "(e.g. eurozone)"]]];
    let b = "";
    steps.forEach((st, i) => {
      const x = 10 + i * 102, y = 200 - (i + 1) * 30 - 30;
      b += `<rect x="${x}" y="${y}" width="98" height="${200 - y}" fill="${i === 4 ? "var(--fig-a)" : "var(--fig-fill)"}" fill-opacity="${i === 4 ? 0.25 : 1}" stroke="currentColor" stroke-width="1.2"/>`;
      b += TXT(x + 49, y + 16, st[0], { fs: 11, b: true }) + st[1].map((t, k) => TXT(x + 49, y + 32 + k * 13, t, { fs: 10.5 })).join("");
    });
    b += TXT(150, 30, "Deeper integration → more shared policy,", { fs: 11, c: "var(--fig-muted)" }) + TXT(150, 45, "less national sovereignty", { fs: 11, c: "var(--fig-muted)" });
    return SVG(530, 210, "Stages of economic integration", b);
  })();

  // Balance of payments structure
  const BOP = SVG(520, 260, "Structure of the balance of payments", MK("ar-econ17-1") +
    BOX(185, 10, 150, 38, ["Balance of payments"]) +
    BOX(10, 80, 160, 40, ["Current account"]) + BOX(180, 80, 160, 40, ["Capital account"]) + BOX(350, 80, 160, 40, ["Financial account"]) +
    AR("M260 48 V64 H90 V73", "ar-econ17-1") + AR("M260 48 V73", "ar-econ17-1") + AR("M260 48 V64 H430 V73", "ar-econ17-1") +
    TXT(90, 142, "• Trade in goods", { a: "middle", fs: 11.5 }) + TXT(90, 160, "• Trade in services", { fs: 11.5 }) + TXT(90, 178, "• Primary income", { fs: 11.5 }) + TXT(90, 192, "(wages, interest, profit, dividends)", { fs: 10 }) + TXT(90, 210, "• Secondary income", { fs: 11.5 }) + TXT(90, 224, "(remittances, aid transfers)", { fs: 10 }) +
    TXT(260, 142, "• Capital transfers", { fs: 11.5 }) + TXT(260, 160, "(e.g. debt forgiveness)", { fs: 10 }) + TXT(260, 178, "• Non-produced, non-financial", { fs: 11.5 }) + TXT(260, 192, "assets (e.g. patents, land sold)", { fs: 10 }) +
    TXT(430, 142, "• Direct investment (FDI)", { fs: 11.5 }) + TXT(430, 160, "• Portfolio investment", { fs: 11.5 }) + TXT(430, 178, "• Reserve assets", { fs: 11.5 }) + TXT(430, 196, "(foreign currency, gold)", { fs: 10 }) +
    TXT(260, 250, "Current + Capital + Financial + Errors & omissions = 0", { b: true, fs: 12.5 }));

  // Poverty cycle
  const POVERTY = (() => {
    const pts = [[200, 30, "Low income"], [340, 95, "Low saving"], [300, 175, "Low investment", "(physical/human capital)"], [100, 175, "Low productivity"], [60, 95, "Low income again"]];
    let b = MK("ar-econ18-1");
    pts.forEach((p) => { b += BOX(p[0] - 70, p[1] - 18, 140, p[3] ? 44 : 36, p[3] ? [p[2], p[3]] : [p[2]], { fs: p[3] ? 11 : 12 }); });
    b = b.replace("Low income again", "Low output / growth");
    b += AR("M262 42 Q320 55 330 75", "ar-econ18-1", "var(--fig-d)") + AR("M330 114 Q330 140 315 155", "ar-econ18-1", "var(--fig-d)") + AR("M228 182 H178", "ar-econ18-1", "var(--fig-d)") +
      AR("M80 155 Q60 140 60 120", "ar-econ18-1", "var(--fig-d)") + AR("M80 75 Q100 50 128 42", "ar-econ18-1", "var(--fig-d)");
    b += TXT(200, 110, "Poverty cycle", { b: true, c: "var(--fig-d)" }) + TXT(200, 128, "(poverty trap)", { fs: 11, c: "var(--fig-d)" });
    b += TXT(200, 238, "Break it with: aid, FDI, microcredit, education/health spending, infrastructure", { fs: 11 });
    return SVG(420, 250, "The poverty cycle", b);
  })();

  // HDI
  const HDI = SVG(520, 170, "Components of the Human Development Index", MK("ar-econ18-2") +
    BOX(185, 10, 150, 40, ["HDI (0 to 1)", "geometric mean"], { fs: 12 }) +
    BOX(10, 90, 160, 70, ["Health", "Life expectancy", "at birth"], { fs: 12 }) +
    BOX(180, 90, 160, 70, ["Education", "Mean years of schooling", "Expected years of schooling"], { fs: 11.5 }) +
    BOX(350, 90, 160, 70, ["Standard of living", "GNI per capita", "(PPP US$)"], { fs: 12 }) +
    AR("M90 88 V70 H260 V55", "ar-econ18-2") + AR("M260 88 V55", "ar-econ18-2") + AR("M430 88 V70 H260 V55", "ar-econ18-2"));

  // Gini areas
  const GINI = AX("Gini coefficient = A / (A + B): 0 = perfect equality, 1 = perfect inequality", "Cumulative % of population", "Cumulative % of income", {
    x: [0, 11],
    curves: [{ f: (x) => 10 * Math.pow(x / 10, 2.3), domain: [0, 10], color: "a", label: "Lorenz curve", labelX: 9.4 }],
    lines: [L([0, 0], [10, 10], "", "b")],
    texts: [T(2.2, 4.6, "line of equality"), T(5.4, 4.1, "A"), T(8.2, 2.4, "B"), TX(5, "50"), TX(10, "100")],
  });

  IB.addExamFrames("econ", {
    topics: {
      // =====================================================================
      "econ-9": {
        figures: [
          { title: "Circular flow of income (two-sector model)", caption: "Money flows (solid) go the opposite way to real flows (dashed). Every £ of spending is someone's income, so output = income = expenditure.", svg: CF2 },
          { title: "Circular flow with leakages and injections (five-sector model)", caption: "Leakages S, T, M leave the flow; injections I, G, X enter it. Equilibrium when S + T + M = I + G + X.", svg: CF5 },
        ],
        diagrams: [
          AX("Nominal GDP grows faster than real GDP when prices rise (equal in the base year)", "Time (years)", "GDP", {
            curves: [{ f: (x) => 3 + 0.35 * x + 0.035 * x * x, domain: [0, 9.5], color: "a", label: "nominal GDP", labelX: 7.2 }, { f: (x) => 3 + 0.35 * x, domain: [0, 9.5], color: "b", label: "real GDP", labelX: 8.3 }],
            points: [{ at: [0, 3], label: "base year", color: "muted" }],
          }),
          AX("A falling but positive growth rate means real GDP is still rising (not a recession)", "Time", "Real GDP growth rate (%)", {
            x: [0, 10], y: [-3, 6], origin: true,
            curves: [{ f: (x) => 5 - 0.85 * x, domain: [0, 9.5], color: "a" }],
            texts: [T(3, 3.4, "slowing growth: GDP still rises"), T(7.6, -1.9, "negative: GDP falls")],
          }),
        ],
        frames: [
          { title: "Draw a circular flow diagram with leakages and injections", star: true, paper: "P2", where: "Paper 2 / Paper 1(a) · 4 marks · diagram",
            q: "Draw a circular flow of income diagram including the government and foreign sectors, and explain the effect of a fall in exports.",
            marks: [
              ["Diagram", "__households__ and __firms__; factor incomes from firms to households and consumption from households to firms", 1],
              ["Diagram", "leakages __S, T, M__ out of the flow and injections __I, G, X__ into it, through the financial sector, government and rest of world", 1],
              "exports are an __injection__: a fall in X means less spending enters the flow, so leakages now __exceed__ injections",
              "national income __falls__ (by a multiple of the fall, through less induced consumption) until S + T + M = I + G + X again",
            ],
            svg: CF5, svgCaption: "Five-sector circular flow",
            model: "Firms pay factor incomes to households, who spend part of it on domestic output; saving, taxes and imports leak out, while investment, government spending and exports are injected. A fall in exports reduces injections, so leakages exceed injections and the level of national income falls until a new equilibrium where injections equal leakages.",
            accept: "withdrawals for leakages; banks for the financial sector; foreign sector for rest of world",
            reject: "real and money flows drawn in the same direction; saving or imports drawn as injections",
            tip: "畫循環流向：上面係收入（廠商 → 家庭），下面係消費（家庭 → 廠商）；漏出 S T M，注入 I G X。" },
          { title: "Sketch a graph that distinguishes nominal and real GDP", paper: "P2", where: "Paper 2 · 2 marks · sketch",
            q: "Sketch a graph showing how nominal and real GDP change over time when the average price level is rising, and explain the gap between them.",
            marks: [
              ["Diagram", "both lines start __equal in the base year__; nominal GDP rises __faster/steeper__ than real GDP", 1],
              "the gap is caused by __inflation__: real GDP = nominal GDP adjusted (deflated) for price changes, so it shows only changes in output",
            ],
            diagram: AX("Nominal vs real GDP when prices are rising", "Time (years)", "GDP", {
              curves: [{ f: (x) => 3 + 0.35 * x + 0.035 * x * x, domain: [0, 9.5], color: "a", label: "nominal", labelX: 7.5 }, { f: (x) => 3 + 0.35 * x, domain: [0, 9.5], color: "b", label: "real", labelX: 8.5 }],
            }),
            model: "In the base year nominal and real GDP are equal. When the price level rises, nominal GDP grows faster than real GDP because part of its increase is due to higher prices; real GDP removes the effect of inflation and only shows the change in the volume of output.",
            tip: "基年時兩線相等；物價上升時名義 GDP 較陡。" },
        ],
      },

      // =====================================================================
      "econ-10": {
        diagrams: [
          ADAS("AD slopes down: a price-level change moves along AD; a change in C, I, G or X − M shifts it", {
            lines: [AD(10, "AD₁"), AD(12.5, "AD₂", "b"), AD(7.5, "AD₃", "b"), H(3, 7), V(3, 7), H(7, 3), V(7, 3)],
            points: [{ at: [3, 7], label: "a" }, { at: [7, 3], label: "b" }],
            texts: [TX(3, "Y₁"), TX(7, "Y₂"), TY(7, "P₁"), TY(3, "P₂")],
          }),
          ADAS("SRAS slopes up; a rise in costs (wages, raw materials, taxes) shifts SRAS left", {
            lines: [SRAS(0, "SRAS₁"), SRAS(2, "SRAS₂", "b"), SRAS(-2, "SRAS₃", "b")],
            texts: [T(7.2, 3.2, "lower costs →", "start"), T(1.2, 6.2, "← higher costs", "start")],
          }),
          ADAS("Monetarist / new classical: long-run equilibrium where AD = SRAS = LRAS at potential output", {
            lines: [LRAS(5, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS"), H(5, 5)],
            points: [{ at: [5, 5] }],
            texts: [TX(5, "Yp"), TY(5, "P₁")],
          }),
          ADAS("Short-run equilibrium below potential output: recessionary (deflationary) gap", {
            lines: [LRAS(7, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS"), V(5, 5), H(5, 5)],
            points: [{ at: [5, 5] }],
            texts: [TX(5, "Ye"), TX(7, "Yp"), T(6, 1, "gap"), TY(5, "Pe")],
          }),
          ADAS("Inflationary gap closes in the long run: higher wages shift SRAS₁ → SRAS₂, back to Yp", {
            lines: [LRAS(4, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(2, "SRAS₂", "b"), V(5, 5), H(5, 5), H(4, 6)],
            points: [{ at: [5, 5], label: "a" }, { at: [4, 6], label: "b" }],
            texts: [TX(4, "Yp"), TX(5, "Y₁"), TY(5, "P₁"), TY(6, "P₂")],
          }),
          AX("Keynesian model: equilibrium in the horizontal section, far below full-employment output Yf", "Real GDP", "Average price level", {
            curves: [{ f: KAS, domain: [0.3, 7.8], color: "c", label: "AS", labelX: 7.2 }],
            lines: [L([0.5, 4.5], [3.8, 1.2], "AD", "a"), V(3, 2), L([8.1, 0], [8.1, 9.5], "", "muted", { dash: true })],
            points: [{ at: [3, 2] }],
            texts: [TX(3, "Ye"), TX(8.1, "Yf"), T(6.0, 0.5, "recessionary gap"), TY(2, "Pe")],
          }),
          AX("Keynesian AS: three sections (spare capacity, nearing capacity, full capacity)", "Real GDP", "Average price level", {
            curves: [{ f: KAS, domain: [0.3, 7.8], color: "c", label: "AS", labelX: 7.25 }],
            lines: [L([8.1, 0], [8.1, 9.5], "", "muted", { dash: true })],
            texts: [T(2, 2.5, "I: horizontal"), T(6, 1.4, "II: rising"), T(8.9, 7, "III"), TX(8.1, "Yf")],
          }),
        ],
        frames: [
          { title: "Draw long-run equilibrium in the monetarist / new classical model", paper: "P2", where: "Paper 2 · 3 marks · AD/AS diagram",
            q: "Using an AD/AS diagram, explain long-run macroeconomic equilibrium in the monetarist/new classical model.",
            marks: [
              ["Diagram", "axes __average price level__ and __real GDP__; downward AD, upward SRAS, __vertical LRAS at Yp__", 1],
              "long-run equilibrium where __AD = SRAS = LRAS__ at potential output Yp (natural rate of unemployment)",
              "LRAS is vertical because in the long run wages and prices are __flexible__, so output does not depend on the price level",
            ],
            diagram: ADAS("Long-run equilibrium at Yp", { lines: [LRAS(5, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS"), H(5, 5)], points: [{ at: [5, 5] }], texts: [TX(5, "Yp"), TY(5, "P₁")] }),
            model: "The LRAS curve is vertical at potential output because, in the long run, money wages and other resource prices adjust fully to the price level. Long-run equilibrium occurs where AD intersects SRAS on the LRAS curve, so the economy produces Yp with unemployment at its natural rate.",
            reject: "real GDP labelled as 'quantity'; 'price' instead of average price level",
            tip: "軸要寫 average price level / real GDP，唔係 price / quantity。" },
          { title: "Draw and explain an inflationary gap closing in the long run", star: true, paper: "P2", where: "Paper 2 / Paper 1(a) · 4 marks · AD/AS diagram",
            q: "Using an AD/AS diagram, explain how, in the monetarist/new classical model, an economy with an inflationary gap returns to potential output.",
            marks: [
              ["Diagram", "AD/SRAS equilibrium at Y₁ __to the right of LRAS__ (Yp); SRAS₁ shifts left to __SRAS₂__; new equilibrium at Yp and higher price level P₂", 1],
              "at Y₁ unemployment is __below the natural rate__: labour is scarce and workers demand __higher money wages__",
              "higher wage costs shift __SRAS to the left__ until output returns to Yp",
              "in the long run output is back at potential but at a __permanently higher price level__",
            ],
            diagram: ADAS("Inflationary gap: SRAS shifts left back to Yp", { lines: [LRAS(4, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(2, "SRAS₂", "b"), V(5, 5), H(5, 5), H(4, 6)], points: [{ at: [5, 5], label: "a" }, { at: [4, 6], label: "b" }], texts: [TX(4, "Yp"), TX(5, "Y₁"), TY(5, "P₁"), TY(6, "P₂")] }),
            model: "At point a output Y₁ exceeds potential output Yp and unemployment is below its natural rate. Labour shortages push up money wages, so firms' costs rise and SRAS shifts left from SRAS₁ to SRAS₂. The economy moves to b: output returns to Yp, but the price level has risen to P₂.",
            reject: "AD shifting back on its own; LRAS shifting",
            tip: "通脹缺口自我修正 = SRAS 向左移，唔係 AD 移。" },
          { title: "Show a recessionary gap in the Keynesian model", paper: "P2", where: "Paper 2 · 4 marks · Keynesian AS diagram",
            q: "Using a Keynesian AD/AS diagram, explain why an economy can stay in equilibrium below full-employment output.",
            marks: [
              ["Diagram", "Keynesian AS with __horizontal, rising and vertical__ sections; AD crosses the horizontal section at Ye __left of Yf__", 1],
              "there is __spare capacity__ and cyclical unemployment; the gap is the recessionary (deflationary) gap Ye → Yf",
              "money wages are __sticky downwards__ (contracts, unions, minimum wages), so costs and SRAS do not fall",
              "the economy can remain at Ye unless __AD increases__ (e.g. government spending), so Keynesians support intervention",
            ],
            diagram: AX("Keynesian recessionary gap", "Real GDP", "Average price level", { curves: [{ f: KAS, domain: [0.3, 7.8], color: "c", label: "AS", labelX: 7.2 }], lines: [L([0.5, 4.5], [3.8, 1.2], "AD", "a"), V(3, 2), L([8.1, 0], [8.1, 9.5], "", "muted", { dash: true })], points: [{ at: [3, 2] }], texts: [TX(3, "Ye"), TX(8.1, "Yf"), TY(2, "Pe")] }),
            model: "In the Keynesian model the AS curve is horizontal at low output because there is spare capacity. If AD is low it intersects AS at Ye, well below full-employment output Yf, leaving a recessionary gap with high cyclical unemployment. Because wages are sticky downwards, firms' costs do not fall, so there is no automatic return to Yf; AD must rise.",
            tip: "凱恩斯：工資向下僵硬 → 經濟可以長期停喺 Ye。" },
        ],
      },

      // =====================================================================
      "econ-11": {
        diagrams: [
          ADAS("Demand-deficient (cyclical) unemployment: AD falls, real GDP falls below Yp", {
            lines: [LRAS(5, "LRAS"), AD(10, "AD₁"), AD(8, "AD₂", "b"), SRAS(0, "SRAS"), V(4, 4), H(5, 5), H(4, 4)],
            points: [{ at: [5, 5], label: "a" }, { at: [4, 4], label: "b" }],
            texts: [TX(4, "Y₂"), TX(5, "Yp"), TY(5, "P₁"), TY(4, "P₂")],
          }),
          AX("Structural unemployment: demand for labour with an outdated skill falls; sticky wage at W₁", "Quantity of labour", "Wage", {
            lines: [L([1, 9], [9, 1], "D_L1"), L([1, 7], [7, 1], "D_L2", "b"), L([1, 1], [9, 9], "S_L", "c"), L([0, 5], [10, 5], "W₁", "muted", { dash: true }), V(3, 5), V(5, 5)],
            texts: [TX(3, "Q₂"), TX(5, "Q₁"), T(4, 5.4, "unemployed")],
          }),
          ADAS("'Bad' deflation: AD falls → lower price level AND lower real GDP (more unemployment)", {
            lines: [LRAS(5, "LRAS"), AD(10, "AD₁"), AD(8, "AD₂", "b"), SRAS(0, "SRAS"), V(4, 4), H(5, 5), H(4, 4)],
            points: [{ at: [5, 5] }, { at: [4, 4] }],
            texts: [TX(4, "Y₂"), TX(5, "Y₁"), TY(5, "P₁"), TY(4, "P₂")],
          }),
          ADAS("'Good' deflation: SRAS and LRAS shift right → lower price level, higher real GDP", {
            lines: [LRAS(5, "LRAS₁"), LRAS(6.5, "LRAS₂", "b"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(-3, "SRAS₂", "b"), H(5, 5), H(6.5, 3.5)],
            points: [{ at: [5, 5] }, { at: [6.5, 3.5] }],
            texts: [TX(5, "Y₁"), TX(6.5, "Y₂"), TY(5, "P₁"), TY(3.5, "P₂")],
          }),
          ADAS("Cost-push inflation: SRAS shifts left → stagflation (higher P, lower real GDP)", {
            lines: [LRAS(5, "LRAS"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(2, "SRAS₂", "b"), V(4, 6), H(5, 5), H(4, 6)],
            points: [{ at: [5, 5] }, { at: [4, 6] }],
            texts: [TX(4, "Y₂"), TX(5, "Y₁"), TY(5, "P₁"), TY(6, "P₂")],
          }),
          AX("Disinflation (falling positive inflation rate) vs deflation (negative inflation rate)", "Time", "Inflation rate (%)", {
            x: [0, 10], y: [-3, 7], origin: true,
            curves: [{ f: (x) => 5.5 - 0.9 * x, domain: [0, 9.5], color: "a" }],
            texts: [T(4.4, 3.4, "disinflation: prices still rise"), T(7.8, -2.1, "deflation: prices fall")],
          }),
        ],
        frames: [
          { title: "Distinguish good and bad deflation using AD/AS diagrams", star: true, paper: "P1", where: "Paper 1(a) / Paper 2 · 4-10 marks · two AD/AS diagrams",
            q: "Using AD/AS diagrams, distinguish between deflation caused by a fall in aggregate demand and deflation caused by an increase in aggregate supply.",
            marks: [
              ["Diagram", "AD shifts __left__: price level falls P₁ → P₂ and __real GDP falls__ (bad deflation)", 1],
              ["Diagram", "SRAS/LRAS shift __right__: price level falls and __real GDP rises__ (good / benign deflation)", 1],
              "bad deflation brings __higher cyclical unemployment__, delayed consumption and a higher real value of debt, which can deepen recession",
              "good deflation comes from __productivity gains / lower costs__ and is consistent with growth and falling unemployment",
            ],
            diagram: ADAS("'Bad' deflation: AD₁ → AD₂", { lines: [LRAS(5, "LRAS"), AD(10, "AD₁"), AD(8, "AD₂", "b"), SRAS(0, "SRAS"), V(4, 4), H(5, 5), H(4, 4)], points: [{ at: [5, 5] }, { at: [4, 4] }], texts: [TX(4, "Y₂"), TX(5, "Y₁"), TY(5, "P₁"), TY(4, "P₂")] }),
            model: "If AD falls (e.g. falling confidence), the price level falls from P₁ to P₂ but real GDP also falls, so cyclical unemployment rises; consumers may delay spending expecting lower prices, and the real burden of debt rises, so this deflation is damaging. If instead SRAS and LRAS shift right because of new technology or lower costs, the price level falls while real GDP rises, so deflation goes with growth and is benign.",
            tip: "壞通縮 = AD 左移（產出跌）；好通縮 = AS 右移（產出升）。兩個圖都要畫。" },
          { title: "Use a labour market diagram to explain structural unemployment", paper: "P2", where: "Paper 2 · 4 marks · labour market diagram",
            q: "Using a labour market diagram, explain how structural unemployment can arise in a declining industry.",
            marks: [
              ["Diagram", "axes __wage__ and __quantity of labour__; D_L shifts left; at sticky wage W₁ labour supplied (Q₁) exceeds labour demanded (Q₂)", 1],
              "structural unemployment is caused by a __mismatch of skills / location__ with the jobs available (e.g. new technology, changing demand)",
              "demand for workers with the outdated skill __falls__; workers cannot easily move to other industries or regions (occupational / geographical immobility)",
              "unemployment Q₂Q₁ persists over the __long term__ unless workers retrain or relocate",
            ],
            diagram: AX("Structural unemployment in a declining industry", "Quantity of labour", "Wage", { lines: [L([1, 9], [9, 1], "D_L1"), L([1, 7], [7, 1], "D_L2", "b"), L([1, 1], [9, 9], "S_L", "c"), L([0, 5], [10, 5], "W₁", "muted", { dash: true }), V(3, 5), V(5, 5)], texts: [TX(3, "Q₂"), TX(5, "Q₁")] }),
            model: "When demand for a skill falls, for example because of automation, the demand for labour in that industry shifts left. If wages do not fall, employment drops to Q₂ while Q₁ workers still want work, so Q₂Q₁ are unemployed. Because these workers lack the skills or are in the wrong location for new jobs, the unemployment is long-term and structural.",
            tip: "結構性失業：技能或地點錯配，長期。" },
        ],
      },

      // =====================================================================
      "econ-12": {
        diagrams: [
          GINI,
          AX("Average tax rate against income: progressive, proportional and regressive taxes", "Income", "Average tax rate (%)", {
            curves: [
              { f: (x) => 1 + 7 * (1 - Math.exp(-x / 3.5)), domain: [0.2, 9.5], color: "a", label: "progressive", labelX: 7.8 },
              { f: () => 4.5, domain: [0.2, 9.5], color: "b", label: "proportional", labelX: 7.8 },
              { f: (x) => 1 + 7 * Math.exp(-x / 3.5), domain: [0.2, 9.5], color: "c", label: "regressive", labelX: 7.8 },
            ],
          }),
        ],
        frames: [
          { title: "Draw a Lorenz curve and show how the Gini coefficient is calculated", star: true, paper: "P2", where: "Paper 2 · 4 marks · Lorenz diagram",
            q: "Draw a Lorenz curve diagram and explain how the Gini coefficient measures income inequality.",
            marks: [
              ["Diagram", "axes __cumulative % of population__ and __cumulative % of income__ (0-100); 45° __line of equality__; Lorenz curve bowed below it", 1],
              ["Diagram", "area __A__ between the line of equality and the Lorenz curve; area __B__ under the Lorenz curve", 1],
              "Gini coefficient = __A / (A + B)__, from 0 (perfect equality) to 1 (perfect inequality)",
              "the further the Lorenz curve is from the line of equality, the __larger A__ and the higher the Gini, so the more unequal the distribution",
            ],
            diagram: GINI,
            model: "The Lorenz curve plots the cumulative percentage of income received against the cumulative percentage of the population, ranked from poorest. If income were shared equally it would be the 45° line of equality. The Gini coefficient is the area between the line of equality and the Lorenz curve (A) divided by the whole area under the line of equality (A + B). A value close to 0 means near equality; a value close to 1 means high inequality.",
            reject: "Gini = A/B; axes labelled 'income' and 'population' without 'cumulative %'",
            tip: "Gini = A ÷ (A + B)，唔係 A ÷ B。" },
        ],
        concepts: [
          { h: "Measures of poverty (exam detail)", b: "<p><strong>Absolute poverty</strong>: income below what is needed for basic needs; the World Bank international poverty line is a fixed real amount per person per day at PPP (currently US$2.15, 2017 PPP; being updated to US$3.00, 2021 PPP). <strong>Relative poverty</strong>: income below a share of median income (often 50% or 60%), so it rises with inequality. <strong>Multidimensional Poverty Index (MPI)</strong>: health, education and living standards (10 indicators); a person is poor if deprived in at least one third of weighted indicators. Use the line or index named in the text.</p>" },
        ],
      },

      // =====================================================================
      "econ-13": {
        diagrams: [
          ADAS("Expansionary monetary policy: lower interest rates raise C and I → AD shifts right, recessionary gap closes", {
            lines: [LRAS(5, "LRAS"), AD(8, "AD₁"), AD(10, "AD₂", "b"), SRAS(0, "SRAS"), V(4, 4), H(4, 4), H(5, 5)],
            points: [{ at: [4, 4] }, { at: [5, 5] }],
            texts: [TX(4, "Y₁"), TX(5, "Yp"), TY(4, "P₁"), TY(5, "P₂")],
          }),
          ADAS("Contractionary fiscal policy: higher taxes / lower G → AD shifts left, inflationary gap closes", {
            lines: [LRAS(5, "LRAS"), AD(12, "AD₁"), AD(10, "AD₂", "b"), SRAS(0, "SRAS"), V(6, 6), H(6, 6), H(5, 5)],
            points: [{ at: [6, 6] }, { at: [5, 5] }],
            texts: [TX(6, "Y₁"), TX(5, "Yp"), TY(6, "P₁"), TY(5, "P₂")],
          }),
          AX("Crowding out: government borrowing raises demand for money/loanable funds → interest rate rises", "Quantity of money", "Interest rate", {
            lines: [L([5, 0], [5, 9.5], "Sm", "c"), L([1, 9], [8, 2], "Dm₁"), L([3, 9], [9.5, 2.5], "Dm₂", "b"), H(5, 5), H(5, 7)],
            points: [{ at: [5, 5] }, { at: [5, 7] }],
            texts: [TY(5, "i₁"), TY(7, "i₂"), TX(5, "Qm")],
          }),
          AX("Money market: contractionary monetary policy - Sm shifts left → interest rate rises", "Quantity of money", "Interest rate", {
            lines: [L([5, 0], [5, 9.5], "Sm₁", "c"), L([3.5, 0], [3.5, 9.5], "Sm₂", "b"), L([1, 9], [8, 2], "Dm"), H(5, 5), H(3.5, 6.5)],
            points: [{ at: [5, 5] }, { at: [3.5, 6.5] }],
            texts: [TY(5, "i₁"), TY(6.5, "i₂"), TX(3.5, "Q₂"), TX(5, "Q₁")],
          }),
        ],
        frames: [
          { title: "Explain crowding out with a diagram", paper: "P2", where: "Paper 2 / Paper 1(a) · 4 marks · money market or AD/AS diagram",
            q: "Using a diagram, explain how expansionary fiscal policy financed by government borrowing may lead to crowding out.",
            marks: [
              ["Diagram", "interest rate against quantity of money/loanable funds; demand shifts right (Dm₁ → Dm₂); interest rate rises __i₁ → i₂__", 1],
              "to finance a budget deficit the government __borrows__, increasing the demand for funds",
              "higher interest rates __reduce private investment and consumption__ (interest-sensitive spending)",
              "so the rise in AD is __smaller__ than intended (partial crowding out) - the fiscal stimulus is weakened",
            ],
            diagram: AX("Crowding out: interest rate rises from i₁ to i₂", "Quantity of money", "Interest rate", { lines: [L([5, 0], [5, 9.5], "Sm", "c"), L([1, 9], [8, 2], "Dm₁"), L([3, 9], [9.5, 2.5], "Dm₂", "b"), H(5, 5), H(5, 7)], points: [{ at: [5, 5] }, { at: [5, 7] }], texts: [TY(5, "i₁"), TY(7, "i₂")] }),
            model: "If the government raises spending by borrowing, the demand for money/loanable funds increases from Dm₁ to Dm₂ and the interest rate rises from i₁ to i₂. Higher interest rates discourage private investment and borrowing for consumption, so part of the increase in G is offset by lower C and I. AD rises by less than the multiplier would suggest: private spending is 'crowded out'.",
            accept: "loanable funds diagram with supply and demand for loanable funds",
            tip: "排擠效應：政府借錢 → 利率上升 → 私人投資下降。" },
        ],
      },

      // =====================================================================
      "econ-h3": {
        figures: [
          { title: "The Keynesian multiplier: rounds of induced spending", caption: "An injection of $100 m with MPC = 0.8: each round is 80% of the last; total ΔY = $500 m.", svg: MULT },
          { title: "Money creation (fractional reserve banking)", caption: "With a 10% reserve requirement each new deposit allows 90% to be lent out and re-deposited.", svg: MONEY },
        ],
        diagrams: [
          AX("Supply-side policy lowers the natural rate of unemployment: LRPC and SRPC shift left", "Unemployment rate (%)", "Inflation rate (%)", {
            curves: [{ f: (x) => 14 / (x + 0.6) - 0.8, domain: [0.8, 8], color: "a", label: "SRPC₁", labelX: 1.0 }, { f: (x) => 14 / (x + 2.1) - 0.8, domain: [0.3, 5.5], color: "b", label: "SRPC₂", labelX: 0.5 }],
            lines: [L([5, 0], [5, 9.5], "LRPC₁", "muted"), L([3.5, 0], [3.5, 9.5], "LRPC₂", "b")],
            texts: [TX(5, "NRU₁"), TX(3.5, "NRU₂")],
          }),
          AX("Short-run Phillips curve: lower unemployment comes at the cost of higher inflation", "Unemployment rate (%)", "Inflation rate (%)", {
            curves: [{ f: (x) => 14 / (x + 0.6) - 0.8, domain: [0.8, 8], color: "a", label: "SRPC", labelX: 1.0 }],
            points: [{ at: [2, 14 / 2.6 - 0.8], label: "B" }, { at: [5, 14 / 5.6 - 0.8], label: "A" }],
          }),
        ],
        frames: [
          { title: "Show a fall in the natural rate of unemployment on a Phillips curve diagram", hl: true, paper: "P1", where: "Paper 1(a) / Paper 2 (HL) · 4 marks · LRPC diagram",
            q: "Using a Phillips curve diagram, explain how labour market reforms could reduce the natural rate of unemployment.",
            marks: [
              ["Diagram", "axes __inflation rate__ and __unemployment rate__; vertical LRPC shifts left from NRU₁ to NRU₂ (SRPC shifts left too)", 1],
              "the natural rate = structural + frictional (+ seasonal) unemployment, at which there is __no tendency for inflation to accelerate__",
              "reforms such as retraining, better job information or lower unemployment benefits reduce __structural/frictional__ unemployment",
              "the economy can sustain __lower unemployment without rising inflation__ (the LRPC shifts left)",
            ],
            diagram: AX("LRPC shifts left: NRU₁ → NRU₂", "Unemployment rate (%)", "Inflation rate (%)", { curves: [{ f: (x) => 14 / (x + 0.6) - 0.8, domain: [0.8, 8], color: "a", label: "SRPC₁", labelX: 1.0 }, { f: (x) => 14 / (x + 2.1) - 0.8, domain: [0.3, 5.5], color: "b", label: "SRPC₂", labelX: 0.5 }], lines: [L([5, 0], [5, 9.5], "LRPC₁", "muted"), L([3.5, 0], [3.5, 9.5], "LRPC₂", "b")], texts: [TX(5, "NRU₁"), TX(3.5, "NRU₂")] }),
            model: "The long-run Phillips curve is vertical at the natural rate of unemployment, made up of structural and frictional unemployment. Supply-side reforms such as training schemes and better job-matching reduce these types of unemployment, so the LRPC shifts left from NRU₁ to NRU₂ and the SRPC shifts left too. The economy can then have lower unemployment at any given rate of inflation.",
            tip: "LRPC 左移 = 自然失業率下降（供應面政策）。" },
          { title: "Draw the multiplier process from a change in injections", hl: true, paper: "P2", where: "Paper 2 (HL) · 4 marks · diagram or calculation",
            q: "With MPC = 0.8, explain how an increase in government spending of $100 million leads to a larger increase in real GDP.",
            marks: [
              "the extra $100 m becomes __income__ for households/firms, who spend a proportion (MPC = 0.8) of it - $80 m",
              "this becomes someone else's income, generating further rounds of __induced consumption__ ($64 m, $51.2 m, …)",
              ["Calc", "multiplier = 1/(1 − MPC) = 1/0.2 = __5__; ΔY = 5 × 100 = __$500 m__", 1],
              "each round is smaller because part of income __leaks__ as saving, taxes and imports (MPS + MPT + MPM = 0.2)",
            ],
            svg: MULT, svgCaption: "Rounds of spending with MPC = 0.8",
            numeric: { value: 500, tol: 0.5 },
            model: "Government spending of $100 m is received as income. With MPC = 0.8, $80 m is spent, which becomes income for others who spend $64 m, and so on. Each round is smaller because 20% leaks as saving, taxes and imports. The sum of all rounds is 1/(1 − 0.8) × $100 m = $500 m, so real GDP rises by five times the initial injection (assuming spare capacity).",
            tip: "乘數 = 1 / (1 − MPC) = 1 / (MPS + MPT + MPM)。" },
        ],
      },

      // =====================================================================
      "econ-14": {
        diagrams: [
          ADAS("Market-based supply-side policy: LRAS and SRAS shift right → higher Yp, lower price level", {
            lines: [LRAS(5, "LRAS₁"), LRAS(6.5, "LRAS₂", "b"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(-3, "SRAS₂", "b"), H(5, 5), H(6.5, 3.5)],
            points: [{ at: [5, 5] }, { at: [6.5, 3.5] }],
            texts: [TX(5, "Yp₁"), TX(6.5, "Yp₂"), TY(5, "P₁"), TY(3.5, "P₂")],
          }),
          AX("Supply-side policies shift the PPC outwards (increase in potential output)", "Capital goods", "Consumer goods", {
            curves: [{ f: (x) => 6 * Math.sqrt(Math.max(0, 1 - (x / 6) ** 2)), domain: [0, 6], color: "a", label: "PPC₁", labelX: 4.2 }, { f: (x) => 8 * Math.sqrt(Math.max(0, 1 - (x / 8) ** 2)), domain: [0, 8], color: "b", label: "PPC₂", labelX: 6 }],
          }),
          ADAS("Growth without inflation: AD and LRAS rise together", {
            lines: [LRAS(5, "LRAS₁"), LRAS(7, "LRAS₂", "b"), AD(10, "AD₁"), AD(12, "AD₂", "b"), SRAS(0, "SRAS₁"), SRAS(-2, "SRAS₂", "b"), H(7, 5)],
            points: [{ at: [5, 5] }, { at: [7, 5] }],
            texts: [TX(5, "Y₁"), TX(7, "Y₂"), TY(5, "P₁")],
          }),
        ],
        frames: [
          { title: "Show market-based supply-side policy on an AD/AS diagram", star: true, paper: "P2", where: "Paper 2 · 4 marks · AD/AS diagram",
            q: "Using an AD/AS diagram, explain how a cut in corporate taxes might affect potential output and the price level.",
            marks: [
              ["Diagram", "LRAS shifts __right__ (Yp₁ → Yp₂), with SRAS; new equilibrium at higher real GDP and __lower__ (or stable) price level", 1],
              "lower corporate tax increases post-tax profit, giving firms __incentives to invest__ in capital and R&D",
              "more/better capital raises __productivity__ and the economy's productive capacity",
              "potential output rises, allowing growth with __lower inflationary pressure__ (in the long run; time lags)",
            ],
            diagram: ADAS("LRAS₁ → LRAS₂ with SRAS₁ → SRAS₂", { lines: [LRAS(5, "LRAS₁"), LRAS(6.5, "LRAS₂", "b"), AD(10, "AD"), SRAS(0, "SRAS₁"), SRAS(-3, "SRAS₂", "b"), H(5, 5), H(6.5, 3.5)], points: [{ at: [5, 5] }, { at: [6.5, 3.5] }], texts: [TX(5, "Yp₁"), TX(6.5, "Yp₂"), TY(5, "P₁"), TY(3.5, "P₂")] }),
            model: "A cut in corporate tax raises firms' after-tax profits and increases the incentive to invest in new capital and technology. Over time this increases productivity and the quantity of resources, so LRAS (and SRAS) shift right from LRAS₁ to LRAS₂. Real GDP rises from Yp₁ to Yp₂ while the price level falls from P₁ to P₂, although the effect takes time and depends on firms actually investing.",
            accept: "Keynesian AS shifting right; a PPC shifting outward as a supporting diagram",
            tip: "供應面政策 → LRAS 右移；記得講時間滯後。" },
        ],
      },

      // =====================================================================
      "econ-15": {
        diagrams: [
          TRADE("Free trade (importing country): Pw below the domestic equilibrium → imports = Q₁Q₂", 2,
            [L([0, 5], [10, 5], "Pe", "muted", { dash: true }), V(2, 2), V(8, 2)],
            [TX(2, "Q₁"), TX(8, "Q₂"), T(5, 1.4, "imports")]),
          TRADE("Gains from free trade: consumer surplus rises by more than producer surplus falls; net gain = triangle between Pe, Pw, S and D", 2,
            [L([0, 5], [10, 5], "Pe", "muted", { dash: true }), V(2, 2), V(8, 2)],
            [TX(2, "Q₁"), TX(8, "Q₂"), T(5, 3, "net gain")]),
          AX("Free trade (exporting country): Pw above the domestic equilibrium → exports = Q₁Q₂", "Quantity", "Price", {
            lines: [L([1, 9], [8.5, 1.5], "D dom", null, { labelAt: "start" }), L([0.5, 0.5], [9, 9], "S dom", "c"), L([0, 7], [10, 7], "Pw", "b"), L([0, 5], [10, 5], "Pe", "muted", { dash: true }), V(3, 7), V(7, 7)],
            texts: [TX(3, "Q₁"), TX(7, "Q₂"), T(5, 7.4, "exports")],
          }),
        ],
        frames: [
          { title: "Draw a free trade diagram showing imports", paper: "P2", where: "Paper 2 · 4 marks · international trade diagram",
            q: "Using a diagram, explain how opening up to free trade affects domestic consumers, domestic producers and the quantity of imports.",
            marks: [
              ["Diagram", "domestic D and S; __horizontal world supply at Pw below Pe__; domestic production Q₁, consumption Q₂, imports __Q₁Q₂__", 1],
              "price falls from Pe to Pw: consumers buy more and __consumer surplus rises__",
              "domestic producers cut output to Q₁ and __producer surplus falls__",
              "gain in consumer surplus exceeds the loss in producer surplus: a __net welfare gain__ (allocative efficiency)",
            ],
            diagram: TRADE("Free trade: imports Q₁Q₂", 2, [L([0, 5], [10, 5], "Pe", "muted", { dash: true }), V(2, 2), V(8, 2)], [TX(2, "Q₁"), TX(8, "Q₂"), T(5, 1.4, "imports")]),
            model: "Without trade the price is Pe. With free trade the domestic price falls to the world price Pw, because foreign producers can supply any quantity at Pw. Consumers increase consumption to Q₂ and gain consumer surplus; domestic firms cut output to Q₁ and lose producer surplus; the gap Q₁Q₂ is imported. The consumers' gain is larger than the producers' loss, so there is a net welfare gain.",
            reject: "world supply drawn upward sloping without explanation; imports measured as the gap between Pe and Pw",
            tip: "進口量 = 世界價格下需求量 − 本地供應量（Q₁Q₂）。" },
        ],
      },

      // =====================================================================
      "econ-16": {
        figures: [
          { title: "Stages of economic integration", caption: "Each step keeps everything from the step before and adds one feature.", svg: LADDER },
        ],
        diagrams: [
          TRADE("Customs union: tariff removed for partner (price Pp); imports rise (trade creation) but come from a higher-cost partner (trade diversion)", 2,
            [L([0, 4], [10, 4], "Pw + t", "muted", { dash: true }), L([0, 3], [10, 3], "Pp", "c", { dash: true }), V(4, 4), V(6, 4), V(3, 3), V(7, 3)],
            [TX(3, "Q₃"), TX(4, "Q₁"), TX(6, "Q₂"), TX(7, "Q₄")]),
        ],
        frames: [
          { title: "Illustrate trade creation and trade diversion on a diagram", hl: false, paper: "P2", where: "Paper 2 · 4 marks · diagram or explanation",
            q: "Country A imported a good from the lowest-cost world producer at price Pw plus a tariff. It then joins a customs union with Country B, which can supply at Pp (above Pw). Using a diagram, explain trade creation and trade diversion.",
            marks: [
              ["Diagram", "D and S; Pw, Pw + t and Pp with __Pw < Pp < Pw + t__; imports rise from Q₁Q₂ to Q₃Q₄", 1],
              "removing the tariff for the partner lowers the domestic price from Pw + t to Pp, so __imports increase__ and inefficient domestic output falls: __trade creation__",
              "imports now come from the partner at Pp instead of the cheaper non-member at Pw: __trade diversion__ (a less efficient source)",
              "the government loses __tariff revenue__; net welfare depends on whether trade creation outweighs trade diversion",
            ],
            diagram: TRADE("Customs union: Pw + t → Pp", 2, [L([0, 4], [10, 4], "Pw + t", "muted", { dash: true }), L([0, 3], [10, 3], "Pp", "c", { dash: true }), V(4, 4), V(6, 4), V(3, 3), V(7, 3)], [TX(3, "Q₃"), TX(4, "Q₁"), TX(6, "Q₂"), TX(7, "Q₄")]),
            model: "Before joining, Country A imports Q₁Q₂ from the world producer at Pw + t. Inside the customs union the partner's goods enter tariff-free at Pp, which is below Pw + t, so the domestic price falls, consumption rises to Q₄ and domestic output falls to Q₃: imports rise to Q₃Q₄ (trade creation). But all imports now come from the partner, whose cost Pp is higher than the world price Pw, so trade has been diverted to a less efficient producer (trade diversion), and the government loses its tariff revenue.",
            tip: "貿易創造 = 由高成本本地轉向較低成本成員國；貿易轉移 = 由最低成本非成員國轉向較高成本成員國。" },
        ],
      },

      // =====================================================================
      "econ-17": {
        figures: [
          { title: "Structure of the balance of payments", caption: "A current account deficit must be matched by a net surplus on the capital and financial accounts.", svg: BOP },
        ],
        diagrams: [
          FX("Appreciation: higher foreign demand for exports (or inward FDI) shifts D right → e₁ to e₂", {
            lines: [L([1, 9], [9, 1], "D₁"), L([3, 9], [10, 2], "D₂", "b"), L([1, 1], [9, 9], "S", "c"), H(5, 5), H(6, 6), V(5, 5), V(6, 6)],
            texts: [TY(5, "e₁"), TY(6, "e₂"), TX(5, "Q₁"), TX(6, "Q₂")],
          }),
          FX("Higher relative interest rates: hot money inflows raise D, fewer outflows cut S → appreciation", {
            lines: [L([1, 9], [9, 1], "D₁"), L([3, 9], [10, 2], "D₂", "b"), L([1, 1], [9, 9], "S₁", "c"), L([0, 2], [7.5, 9.5], "S₂", "b"), H(5, 5), H(5, 7)],
            points: [{ at: [5, 5] }, { at: [5, 7] }],
            texts: [TY(5, "e₁"), TY(7, "e₂")],
          }),
          FX("Managed float: the central bank buys its currency (D₂ → D₃) to keep the rate above the lower limit", {
            lines: [L([1, 9], [9, 1], "D₁"), L([0.5, 6.5], [5.5, 1.5], "D₂", "b"), L([1, 1], [9, 9], "S", "c"), L([0, 7], [8, 7], "upper limit", "muted", { dash: true }), L([0, 4], [8, 4], "lower limit", "muted", { dash: true }), L([2, 6], [6.6, 1.4], "D₃", "muted", { dash: true, labelAt: "start" })],
            points: [{ at: [3.5, 3.5] }, { at: [4, 4] }],
          }),
          FX("Fixed rate: e₁ is above equilibrium (excess supply of the currency); devaluation lowers the peg to e₂ (revaluation raises it)", {
            lines: [L([1, 9], [8.3, 1.7], "D"), L([1, 1], [9, 9], "S", "c"), L([0, 6.5], [7.8, 6.5], "e₁ old peg", "muted", { dash: true }), L([0, 5], [7.8, 5], "e₂ new peg", "b", { dash: true })],
          }),
        ],
        frames: [
          { title: "Show the effect of a rise in interest rates on the exchange rate", star: true, paper: "P2", where: "Paper 2 · 4 marks · exchange rate diagram",
            q: "Using an exchange rate diagram, explain how an increase in the central bank's interest rate could affect the value of the currency.",
            marks: [
              ["Diagram", "axes __price of the currency in another currency__ and __quantity of the currency__; D shifts right (and/or S shifts left); rate rises __e₁ → e₂__", 1],
              "higher interest rates attract __financial capital inflows (hot money)__ from foreign savers seeking a higher return",
              "foreigners must buy the currency to deposit it, so __demand for the currency rises__; domestic savers send less money abroad, so supply falls",
              "the currency __appreciates__",
            ],
            diagram: FX("Interest rate rise: D₁ → D₂, S₁ → S₂", { lines: [L([1, 9], [9, 1], "D₁"), L([3, 9], [10, 2], "D₂", "b"), L([1, 1], [9, 9], "S₁", "c"), L([0, 2], [7.5, 9.5], "S₂", "b"), H(5, 5), H(5, 7)], points: [{ at: [5, 5] }, { at: [5, 7] }], texts: [TY(5, "e₁"), TY(7, "e₂")] }),
            model: "A higher interest rate raises the return on deposits and bonds in the country relative to abroad. Foreign investors move short-term capital into the country, which increases demand for the currency (D₁ → D₂), and domestic investors send less abroad, reducing the supply of the currency (S₁ → S₂). The exchange rate rises from e₁ to e₂: the currency appreciates.",
            accept: "showing only the demand shift",
            reject: "'price' and 'quantity' without naming the currency on the axes",
            tip: "加息 → 熱錢流入 → 對本幣需求上升 → 升值。軸要寫明貨幣。" },
          { title: "Explain how a central bank maintains a managed float / fixed rate", paper: "P2", where: "Paper 2 · 4 marks · exchange rate diagram",
            q: "Using a diagram, explain how a central bank could prevent its currency from falling below a target lower limit.",
            marks: [
              ["Diagram", "D falls (D₁ → D₂) so the free-market rate would fall below the lower limit; central bank action shifts D right (__D₃__) to keep the rate at the limit", 1],
              "the central bank __buys its own currency__ using foreign currency reserves, increasing demand",
              "or it __raises interest rates__ to attract capital inflows",
              "limitations: reserves are __finite__; higher interest rates can reduce AD and growth",
            ],
            diagram: FX("Managed float: intervention D₂ → D₃", { lines: [L([1, 9], [9, 1], "D₁"), L([0.5, 6.5], [5.5, 1.5], "D₂", "b"), L([1, 1], [9, 9], "S", "c"), L([0, 7], [8, 7], "upper limit", "muted", { dash: true }), L([0, 4], [8, 4], "lower limit", "muted", { dash: true }), L([2, 6], [6.6, 1.4], "D₃", "muted", { dash: true, labelAt: "start" })], points: [{ at: [3.5, 3.5] }, { at: [4, 4] }] }),
            model: "If demand for the currency falls from D₁ to D₂, the market rate would fall below the lower limit. To prevent this the central bank sells foreign currency reserves and buys its own currency, or raises interest rates to attract inflows, shifting demand to D₃ so the rate stays at the lower limit. This can only continue while reserves last, and higher interest rates may slow the economy.",
            tip: "央行用外匯儲備買入本幣 → 需求右移。" },
        ],
      },

      // =====================================================================
      "econ-h4": {
        diagrams: [
          AX("J-curve: after a depreciation the current account worsens first, then improves (Marshall-Lerner holds)", "Time", "Current account balance", {
            x: [0, 10], y: [-4, 4], origin: true,
            curves: [{ f: (x) => (x < 1.5 ? -1 : -1 - 3 * (x - 1.5) * Math.exp(-(x - 1.5)) + 0.6 * (x - 1.5)), domain: [0, 9.5], color: "a" }],
            points: [{ at: [1.5, -1], label: "depreciation", color: "muted" }],
            texts: [T(3, -3.2, "PED low: deficit worsens"), T(7, 3.6, "PEDx + PEDm > 1")],
          }),
          AX("Comparative advantage from PPCs: X (60 tablets or 30 shirts), Y (20 or 20) - different opportunity costs", "Shirts", "Tablets", {
            x: [0, 10], y: [0, 10],
            lines: [L([0, 8], [4, 0], "", "a"), L([0, 2.67], [2.67, 0], "", "b")],
            points: [{ at: [0, 8], label: "60" }, { at: [4, 0], label: "30" }, { at: [0, 2.67], label: "20", color: "b" }, { at: [2.67, 0], label: "20", color: "b" }],
            texts: [T(4.8, 8, "outer line: Country X", "start"), T(4.8, 7, "inner line: Country Y", "start"), T(4.8, 5.6, "OC of 1 shirt: X = 2 tablets,", "start"), T(4.8, 4.8, "Y = 1 tablet → Y: CA in shirts,", "start"), T(4.8, 4, "X: CA in tablets", "start")],
          }),
          AX("Terms of trade deterioration: world demand for the commodity export falls → export price falls", "Quantity of copper", "Price of copper", {
            lines: [L([1, 9], [9, 1], "D₁"), L([1, 7], [7, 1], "D₂", "b"), L([1, 1], [9, 9], "S", "c"), H(5, 5), H(4, 4)],
            points: [{ at: [5, 5] }, { at: [4, 4] }],
            texts: [TY(5, "P₁"), TY(4, "P₂"), T(7.2, 8.6, "ToT = (Px / Pm) × 100")],
          }),
        ],
        frames: [
          { title: "Draw and explain the J-curve", star: true, hl: true, paper: "P2", where: "Paper 2 / Paper 1(a) (HL) · 4 marks · J-curve diagram",
            q: "Using a J-curve diagram, explain why a depreciation may worsen the current account balance before improving it.",
            marks: [
              ["Diagram", "current account balance (y) against __time__ (x); after the depreciation the balance __falls first__ then rises above its original level", 1],
              "in the short run demand for exports and imports is __price inelastic__ (existing contracts, habits, time to find substitutes), so import spending rises and export revenue barely increases",
              "over time PEDs rise; the __Marshall-Lerner condition__: a depreciation improves the current account if PEDx + PEDm __> 1__",
              "the balance then improves, giving the J shape",
            ],
            diagram: AX("J-curve", "Time", "Current account balance", { x: [0, 10], y: [-4, 4], origin: true, curves: [{ f: (x) => (x < 1.5 ? -1 : -1 - 3 * (x - 1.5) * Math.exp(-(x - 1.5)) + 0.6 * (x - 1.5)), domain: [0, 9.5], color: "a" }], points: [{ at: [1.5, -1], label: "depreciation", color: "muted" }] }),
            model: "Immediately after a depreciation, the quantities of exports and imports change little because contracts are fixed and buyers need time to switch, so demand is price inelastic. Imports cost more in domestic currency while export revenue hardly rises, so the current account deficit worsens. Over time demand becomes more elastic; once PEDx + PEDm > 1 (the Marshall-Lerner condition), export revenue rises and import spending falls, so the current account improves - tracing a J shape.",
            reject: "x-axis labelled 'exchange rate'; the curve starting by rising",
            tip: "J 曲線：短期 PED 低 → 先惡化；長期 PEDx + PEDm > 1 → 改善。" },
          { title: "Explain a deterioration in the terms of trade with a diagram", hl: true, paper: "P2", where: "Paper 2 (HL) · 4 marks · commodity market diagram",
            q: "Using a diagram, explain how a global recession could cause a deterioration in the terms of trade of a copper-exporting economy.",
            marks: [
              ["Diagram", "copper market; world __demand shifts left__ D₁ → D₂; price falls P₁ → P₂", 1],
              "a global recession reduces incomes and industrial production, so __demand for copper falls__",
              "the __average export price index falls__ relative to the import price index",
              "terms of trade = (index of average export prices ÷ index of average import prices) × 100 __falls__: a deterioration - more exports needed to buy the same imports",
            ],
            diagram: AX("Copper demand falls: P₁ → P₂", "Quantity of copper", "Price of copper", { lines: [L([1, 9], [9, 1], "D₁"), L([1, 7], [7, 1], "D₂", "b"), L([1, 1], [9, 9], "S", "c"), H(5, 5), H(4, 4)], points: [{ at: [5, 5] }, { at: [4, 4] }], texts: [TY(5, "P₁"), TY(4, "P₂")] }),
            model: "In a global recession, falling industrial output cuts world demand for copper from D₁ to D₂, so its price falls from P₁ to P₂. As copper dominates the country's exports, its average export price index falls while import prices change less, so the terms of trade index (Px/Pm × 100) falls. The economy must export more to buy the same quantity of imports.",
            tip: "貿易條件 = 出口價格指數 ÷ 進口價格指數 × 100。" },
        ],
      },

      // =====================================================================
      "econ-18": {
        figures: [
          { title: "The poverty cycle (poverty trap)", caption: "Low income in one period causes low income in the next, unless an outside injection breaks the chain.", svg: POVERTY },
          { title: "The Human Development Index (HDI)", caption: "A composite indicator of development (UNDP); 0-1, higher = more developed.", svg: HDI },
        ],
        diagrams: [
          AX("Commodity price volatility: inelastic D and S mean a small supply shock causes a large price change", "Quantity of commodity", "Price of commodity", {
            lines: [L([4, 9.5], [5.8, 1.4], "D"), L([3, 0.5], [7, 9.5], "S₁", "c"), L([2, 0.5], [6, 9.5], "S₂", "b"), H(5, 5), H(4.67, 6.5)],
            points: [{ at: [5, 5] }, { at: [4.67, 6.5] }],
            texts: [TY(5, "P₁"), TY(6.5, "P₂")],
          }),
          ADAS("FDI or aid for infrastructure: AD rises now, LRAS rises later", {
            lines: [LRAS(5, "LRAS₁"), LRAS(7, "LRAS₂", "b"), AD(10, "AD₁"), AD(12, "AD₂", "b"), SRAS(0, "SRAS₁"), SRAS(-2, "SRAS₂", "b"), H(7, 5)],
            points: [{ at: [5, 5] }, { at: [7, 5] }],
            texts: [TX(5, "Y₁"), TX(7, "Y₂")],
          }),
        ],
        frames: [
          { title: "Draw a diagram to explain commodity price volatility", paper: "P2", where: "Paper 2 · 4 marks · commodity market diagram",
            q: "Using a diagram, explain why over-specialisation in primary commodities can be a barrier to development.",
            marks: [
              ["Diagram", "__steep (inelastic) D and S__; a supply shift (S₁ → S₂) causes a __large price change__ (P₁ → P₂) for a small quantity change", 1],
              "commodity demand and supply are __price inelastic__ (few substitutes; long time to change output)",
              "so export prices and revenues are __volatile__, making government revenue and investment planning uncertain",
              "and long-run prices may fall relative to manufactures (low YED), worsening the __terms of trade__",
            ],
            diagram: AX("Inelastic commodity market: supply shock S₁ → S₂", "Quantity of commodity", "Price of commodity", { lines: [L([4, 9.5], [5.8, 1.4], "D"), L([3, 0.5], [7, 9.5], "S₁", "c"), L([2, 0.5], [6, 9.5], "S₂", "b"), H(5, 5), H(4.67, 6.5)], points: [{ at: [5, 5] }, { at: [4.67, 6.5] }], texts: [TY(5, "P₁"), TY(6.5, "P₂")] }),
            model: "Demand for and supply of primary commodities are price inelastic. A shift in supply, for example from bad weather, causes only a small change in quantity but a large change in price, from P₁ to P₂. Countries that depend on one or two commodities therefore face volatile export earnings and government revenue, which makes it hard to plan investment in health, education and infrastructure. Low income elasticity of demand for commodities also tends to worsen their terms of trade over time.",
            tip: "商品供求缺乏彈性 → 價格大幅波動 → 出口收入不穩定。" },
          { title: "Draw the poverty cycle and explain how it can be broken", paper: "P2", where: "Paper 2 · 4 marks · diagram",
            q: "Using a diagram of the poverty cycle, explain how foreign aid could help a country to break out of the cycle.",
            marks: [
              ["Diagram", "a cycle: __low income → low saving → low investment (physical/human capital) → low productivity → low income__", 1],
              "with low incomes most income is consumed, so domestic __saving and investment__ are low",
              "aid supplies the missing __investment__ in infrastructure, health or education, raising productivity",
              "higher productivity raises income, which allows more saving and investment, so the cycle is broken",
            ],
            svg: POVERTY, svgCaption: "Poverty cycle",
            model: "In a poverty cycle, low incomes mean little can be saved, so investment in physical and human capital is low, productivity stays low and incomes stay low. Foreign aid can provide the investment that domestic saving cannot, for example building roads or schools. This raises productivity and income, allowing higher saving and investment in future and breaking the cycle, although results depend on governance and how the aid is used.",
            tip: "貧窮循環：低收入 → 低儲蓄 → 低投資 → 低生產力 → 低收入。" },
        ],
      },
    },
  });
})();
