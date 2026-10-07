/* Economics - diagrams and graphs to know, micro units 1-2 (original, 2022 guide). */
(function () {
  // ---------- plot-spec helpers (IB.plot, axes 0-10) ----------
  const sd = (title, o) => Object.assign({ title, x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity", yLabel: "Price" }, o);
  const ln = (x1, y1, x2, y2, label, color, dash) => {
    const l = { from: [x1, y1], to: [x2, y2] };
    if (label) l.label = label;
    if (color) l.color = color;
    if (dash) l.dash = true;
    return l;
  };
  // guide lines from a point to both axes, with axis labels; returns { lines, texts }
  const gq = (x, y, pl, ql, x0 = 0, y0 = 0, dy = 0.6) => ({
    lines: [ln(x, y0, x, y, "", "muted", true), ln(x0, y, x, y, "", "muted", true)],
    texts: [].concat(pl ? [{ at: [x0 - (x0 === 0 ? 0.12 : 0), y - 0.15], text: pl, anchor: "end" }] : [], ql ? [{ at: [x, y0 - dy], text: ql, anchor: "middle" }] : []),
  });
  // merge several { lines, texts, points, curves } parts into one spec
  const mk = (title, base, ...parts) => {
    const o = sd(title, base);
    parts.forEach((p) => ["lines", "texts", "points", "curves", "vlines", "hlines"].forEach((k) => { if (p[k]) o[k] = (o[k] || []).concat(p[k]); }));
    return o;
  };
  const circ = (rx, ry) => (x) => (x <= rx ? ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2)) : NaN);

  // ---------- hand-drawn SVG helpers ----------
  const A = "var(--fig-a)", B = "var(--fig-b)", C = "var(--fig-c)", R = "var(--fig-d)", M = "var(--fig-muted)", F = "var(--fig-fill)";
  const marker = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  const wrap = (W, H, id, label, body) => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${marker(id)}${body}</svg>`;
  // a panel maps data (0-10, 0-10) to pixels
  const panel = (ox, oy, sx, sy) => {
    const X = (x) => +(ox + x * sx).toFixed(1), Y = (y) => +(oy - y * sy).toFixed(1);
    const pts = (a) => a.map((p) => X(p[0]) + "," + Y(p[1])).join(" ");
    const samp = (f, a, b, n = 48) => { const r = []; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n, y = f(x); if (isFinite(y) && y >= -0.2 && y <= 10.4) r.push([x, y]); } return r; };
    const P = {
      X, Y,
      pl: (a, c = A, w = 2, d) => `<polyline points="${pts(a)}" fill="none" stroke="${c}" stroke-width="${w}"${d ? ' stroke-dasharray="5 4"' : ""}/>`,
      pg: (a, c, o = 0.4) => `<polygon points="${pts(a)}" fill="${c}" fill-opacity="${o}" stroke="none"/>`,
      fn: (f, a, b, c = A, w = 2, d) => P.pl(samp(f, a, b), c, w, d),
      area: (f, g, a, b, c, o = 0.4) => P.pg(samp(f, a, b, 24).concat(samp(g, a, b, 24).reverse()), c, o),
      t: (x, y, s, o = {}) => `<text x="${(X(x) + (o.dx || 0)).toFixed(1)}" y="${(Y(y) + (o.dy || 0)).toFixed(1)}" font-size="${o.s || 12}" fill="${o.c || "currentColor"}"${o.a ? ` text-anchor="${o.a}"` : ""}${o.b ? ' font-weight="bold"' : ""}>${s}</text>`,
      g: (x, y, pl, ql) => `<polyline points="${pts([[0, y], [x, y], [x, 0]])}" fill="none" stroke="${M}" stroke-width="1" stroke-dasharray="3 3"/>` +
        (pl ? P.t(0, y, pl, { dx: -4, dy: 4, a: "end" }) : "") + (ql ? P.t(x, 0, ql, { dy: 15, a: "middle" }) : ""),
      ar: (x1, y1, x2, y2, id, c = "currentColor") => `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="${c}" stroke-width="1.5" marker-end="url(#${id})" color="${c}"/>`,
      dot: (x, y, c = "currentColor") => `<circle cx="${X(x)}" cy="${Y(y)}" r="3" fill="${c}"/>`,
      ax: (xl, yl, id) => `<polyline points="${X(0)},${Y(10.7)} ${X(0)},${Y(0)} ${X(10.7)},${Y(0)}" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
        `<line x1="${X(0)}" y1="${Y(10)}" x2="${X(0)}" y2="${Y(10.7)}" stroke="currentColor" stroke-width="1.5" marker-end="url(#${id})"/><line x1="${X(10)}" y1="${Y(0)}" x2="${X(10.7)}" y2="${Y(0)}" stroke="currentColor" stroke-width="1.5" marker-end="url(#${id})"/>` +
        `<text x="${X(0) + 8}" y="${Y(10.7) + 4}" font-size="12">${yl}</text><text x="${X(10.7)}" y="${Y(0) + 30}" font-size="12" text-anchor="end">${xl}</text>`,
    };
    return P;
  };
  const one = () => panel(46, 226, 27, 20); // single panel in 360 x 264
  const fig1 = (id, label, xl, yl, draw) => { const P = one(); return wrap(360, 264, id, label, P.ax(xl, yl, id) + draw(P)); };
  // two side-by-side panels in 540 x 264
  const fig2 = (id, label, a, b) => {
    const L = panel(42, 244, 21, 20), Rt = panel(312, 244, 21, 20);
    return wrap(540, 282, id, label, L.ax(a.xl, a.yl, id) + a.draw(L) + Rt.ax(b.xl, b.yl, id) + b.draw(Rt) +
      `<text x="140" y="12" font-size="13" text-anchor="middle" font-weight="bold">${a.h}</text><text x="410" y="12" font-size="13" text-anchor="middle" font-weight="bold">${b.h}</text>`);
  };
  // boxes and arrows in pixel space
  const box = (x, y, w, h, lines, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${o.fill || F}" stroke="${o.c || "currentColor"}" stroke-width="1.3"/>` +
    lines.map((s, i) => `<text x="${x + w / 2}" y="${(y + h / 2 + (i - (lines.length - 1) / 2) * 14 + 4).toFixed(1)}" font-size="${o.s || 12}" text-anchor="middle"${i === 0 && o.bold !== false ? ' font-weight="bold"' : ""}>${s}</text>`).join("");
  const arw = (pts, id, c = "currentColor", d) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${c}" color="${c}" stroke-width="1.6"${d ? ' stroke-dasharray="4 3"' : ""} marker-end="url(#${id})"/>`;
  const tx = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.s || 12}" fill="${o.c || "currentColor"}"${o.a ? ` text-anchor="${o.a}"` : ""}${o.b ? ' font-weight="bold"' : ""}>${s}</text>`;

  // numerical helpers
  const root = (h, a, b) => { let fa = h(a); for (let i = 0; i < 60; i++) { const m = (a + b) / 2, fm = h(m); if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
  const argmin = (f, a, b) => { let best = a, v = Infinity; for (let i = 0; i <= 2000; i++) { const x = a + ((b - a) * i) / 2000, y = f(x); if (y < v) { v = y; best = x; } } return best; };
  // short-run cost family: AVC = c0 - c1 Q + c2 Q², AFC = Fc / Q
  const costs = (Fc, c0 = 6, c1 = 1.2, c2 = 0.1) => {
    const avc = (q) => c0 - c1 * q + c2 * q * q, mc = (q) => c0 - 2 * c1 * q + 3 * c2 * q * q, atc = (q) => avc(q) + Fc / q;
    return { avc, mc, atc, afc: (q) => Fc / q };
  };
  const r2 = (v) => Math.round(v * 100) / 100;

  const T = {};

  // =====================================================================
  // econ-1 Foundations
  // =====================================================================
  const ppcLin = mk("Straight-line PPC: constant opportunity cost (resources equally suited to both goods)", { xLabel: "Good X", yLabel: "Good Y", texts: [{ at: [5.6, 7.4], text: "constant slope = constant" }, { at: [5.6, 6.7], text: "opportunity cost" }], points: [{ at: [2.5, 6], label: "A" }, { at: [5, 4], label: "B" }] },
    { lines: [ln(0, 8, 9, 0.8, "PPC")] }, gq(2.5, 6, "6", "2.5"), gq(5, 4, "4", "5"));
  const f81 = circ(9, 8);
  const ppcConc = mk("Concave PPC: equal gains in X cost more and more Y (increasing opportunity cost)", { xLabel: "Good X", yLabel: "Good Y", curves: [{ f: f81, domain: [0, 9], label: "PPC", labelX: 8.4 }], points: [2, 4, 6, 8].map((x, i) => ({ at: [x, r2(f81(x))], label: "ABCD"[i] })) },
    gq(2, f81(2), "", "2"), gq(4, f81(4), "", "4"), gq(6, f81(6), "", "6"), gq(8, f81(8), "", "8"),
    { texts: [{ at: [3.6, 9.4], text: "Y forgone per 2 extra X: 0.6 → 1.2 → 2.3" }] });
  const f8 = circ(8, 8);
  const ppcPts = mk("Inside (U: unemployment / inefficiency), on (E: productively efficient) and outside (Z: unattainable) the PPC", { xLabel: "Good X", yLabel: "Good Y", curves: [{ f: f8, domain: [0, 8], label: "PPC", labelX: 7.2 }],
    points: [{ at: [3, 3], label: "U (inside)" }, { at: [4.8, 6.4], label: "E (on)" }, { at: [6.5, 7], label: "Z (outside)" }] });
  const ppcIn = mk("Inward shift PPC₁ → PPC₂: loss of factors (war, disaster, emigration)", { xLabel: "Good X", yLabel: "Good Y",
    curves: [{ f: f8, domain: [0, 8], label: "PPC₁", labelX: 7.3 }, { f: circ(5.5, 5.5), domain: [0, 5.5], color: "b", label: "PPC₂", labelX: 4.8 }], texts: [{ at: [5.6, 8.6], text: "productive capacity falls" }] });
  const ppcPiv = mk("Technology improves only in good X: the PPC pivots outwards along the X axis", { xLabel: "Good X", yLabel: "Good Y",
    curves: [{ f: circ(6, 7), domain: [0, 6], label: "PPC₁", labelX: 5.2 }, { f: circ(9.3, 7), domain: [0, 9.3], color: "b", label: "PPC₂", labelX: 8.4 }], texts: [{ at: [0.3, 7.6], text: "Y intercept unchanged" }] });

  const circFlow = wrap(540, 290, "ar-econ1-1", "Circular flow of income with leakages and injections",
    box(10, 112, 112, 56, ["Households", "(own factors)"]) + box(418, 112, 112, 56, ["Firms", "(produce output)"]) +
    arw([[66, 112], [66, 46], [474, 46], [474, 112]], "ar-econ1-1", B) + tx(270, 40, "Consumption expenditure (C) - money flow", { a: "middle", c: B }) +
    arw([[474, 112], [474, 76], [66, 76], [66, 112]], "ar-econ1-1", M, true) + tx(270, 70, "Goods and services - real flow", { a: "middle" }) +
    arw([[474, 168], [474, 238], [66, 238], [66, 168]], "ar-econ1-1", B) + tx(270, 254, "Income: wages, rent, interest, profit - money flow", { a: "middle", c: B }) +
    arw([[66, 168], [66, 208], [474, 208], [474, 168]], "ar-econ1-1", M, true) + tx(270, 202, "Factors of production - real flow", { a: "middle" }) +
    box(206, 92, 128, 24, ["Financial sector"], { s: 11 }) + box(206, 128, 128, 24, ["Government"], { s: 11 }) + box(206, 164, 128, 24, ["Foreign sector"], { s: 11 }) +
    [104, 140, 176].map((y, i) => arw([[122, y], [204, y]], "ar-econ1-1", R) + tx(163, y - 4, ["Saving (S)", "Taxes (T)", "Imports (M)"][i], { a: "middle", s: 11, c: R }) +
      arw([[334, y], [416, y]], "ar-econ1-1", C) + tx(375, y - 4, ["Invest. (I)", "Gov. (G)", "Exports (X)"][i], { a: "middle", s: 11, c: C })).join("") +
    tx(150, 282, "Leakages (withdrawals)", { a: "middle", c: R, b: true }) + tx(390, 282, "Injections", { a: "middle", c: C, b: true }));

  const ppcCap = fig2("ar-econ1-2", "Two economies: more capital goods today gives a larger outward shift of the PPC",
    { h: "Economy A: few capital goods", xl: "Consumer goods", yl: "Capital goods", draw: (P) => P.fn(circ(7, 7), 0, 7) + P.fn(circ(7.8, 7.8), 0, 7.8, B, 2, true) + P.dot(6.2, 3.25) + P.t(6.2, 3.25, "A", { dx: 5, dy: -5 }) + P.t(5.5, 7.6, "PPC future", { c: B, s: 11 }) + P.t(0.4, 1.0, "small shift", { s: 11 }) },
    { h: "Economy B: many capital goods", xl: "Consumer goods", yl: "Capital goods", draw: (P) => P.fn(circ(7, 7), 0, 7) + P.fn(circ(9.5, 9.5), 0, 9.5, B, 2, true) + P.dot(3.5, 6.06) + P.t(3.5, 6.06, "B", { dx: 5, dy: -5 }) + P.t(6.7, 8.6, "PPC future", { c: B, s: 11 }) + P.t(0.4, 1.0, "large shift", { s: 11 }) });

  T["econ-1"] = {
    diagrams: [ppcLin, ppcConc, ppcPts, ppcIn, ppcPiv],
    figures: [
      { title: "Circular flow of income: five-sector model", caption: "Inner (dashed) = real flows; outer = money flows. Leakages S, T, M leave the flow; injections I, G, X enter it. If injections > leakages, national income rises.", svg: circFlow },
      { title: "Capital goods today → growth tomorrow", caption: "Same PPC today: the economy at B sacrifices more consumer goods now (opportunity cost) but gains a bigger outward shift later.", svg: ppcCap },
    ],
    frames: [
      { title: "Diagram: unemployed resources on a PPC", paper: "P2", where: "Paper 2 · 4 marks · \"Using a PPC diagram, explain…\"",
        q: "Using a PPC diagram, explain the effect of a recession that leaves many workers unemployed.",
        marks: [
          ["Diagram", "axes labelled with two goods, a concave PPC, a point __inside the PPC__ (e.g. U) labelled as the recession position", 2],
          ["M1", "unemployment means resources are __not fully employed__, so actual output is __below the maximum__ possible"],
          ["M2", "the economy is __productively inefficient__; more of both goods could be produced with no opportunity cost by moving to the curve (actual growth)"],
        ],
        diagram: ppcPts,
        model: "A PPC shows the maximum combinations of two goods an economy can produce with all resources fully and efficiently employed. In a recession many workers are unemployed, so the economy produces at a point such as U inside the PPC. Output of both goods is below its potential and the economy is productively inefficient. Re-employing the idle workers would move the economy from U towards the curve, raising the output of both goods without any opportunity cost.",
        accept: "\"underutilisation of resources\"; any point inside the curve clearly labelled",
        reject: "shifting the PPC inwards for a recession (the capacity has not disappeared)",
        tip: "Recession = 點喺 PPC 入面，唔係 PPC 向內移；PPC 內移要真係冇咗資源（戰爭、天災）。" },
      { title: "Diagram: inward shift of the PPC", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a PPC diagram, explain the likely effect of a major earthquake that destroys factories and infrastructure.",
        marks: [
          ["Diagram", "PPC₁ and an __inward shift to PPC₂__, axes labelled with two goods, direction of shift shown", 2],
          ["M1", "the earthquake reduces the __quantity of capital__ (a factor of production) available"],
          ["M2", "so the __maximum potential output__ of both goods falls: combinations on PPC₁ are now unattainable"],
        ],
        diagram: ppcIn,
        model: "The earthquake destroys factories and infrastructure, so the quantity of capital available falls. With fewer factors of production, the maximum combinations of goods the economy can produce fall, so the PPC shifts inwards from PPC₁ to PPC₂. Points that were attainable on PPC₁ can no longer be reached: the economy's productive capacity has fallen.",
        accept: "\"loss of potential output\" / \"negative potential growth\"",
        reject: "a point moving inside the curve (that shows unemployment, not lost capacity)",
        tip: "資源真係少咗 → 成條 PPC 向內移；只係冇用盡 → 點喺入面。" },
      { title: "Draw the circular flow with leakages and injections", paper: "P2", where: "Paper 2 · 4 marks · \"Draw / Using a circular flow diagram…\"",
        q: "Using a circular flow of income diagram, explain how an increase in saving by households could affect national income.",
        marks: [
          ["Diagram", "households and firms with money flows (expenditure, income) and real flows; saving shown as a __leakage__ to the financial sector and investment as an __injection__", 2],
          ["M1", "saving is a __leakage__ from the circular flow: money not spent on domestic output"],
          ["M2", "if saving rises and injections (I, G, X) do not rise by the same amount, __leakages exceed injections__ so spending, output and __national income fall__"],
        ],
        svg: circFlow,
        model: "In the circular flow, households spend income on firms' output and firms pay households incomes for factors of production. Saving is a leakage: income that is not passed on as spending. If households save more and investment (an injection) does not rise to match, leakages exceed injections, so less spending reaches firms. Firms cut output and pay out less income, so national income falls until leakages again equal injections.",
        accept: "paradox of thrift; \"withdrawal\" for leakage",
        reject: "saying saving always raises income (only if channelled into investment)",
        tip: "三對要記熟：S↔I、T↔G、M↔X。Leakage 大過 injection → income 跌。" },
      { title: "Distinguish constant and increasing opportunity cost on a PPC", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using PPC diagrams, distinguish between constant and increasing opportunity cost.",
        marks: [
          ["Diagram", "a __straight-line PPC__ (constant) and a __concave PPC__ (increasing), axes labelled, with equal changes in one good shown", 2],
          ["M1", "straight line: resources are __equally suited__ to both goods, so each extra unit of X always costs the same amount of Y"],
          ["M2", "concave: resources are __not perfectly adaptable__, so each extra unit of X costs __more and more__ of Y"],
        ],
        diagram: ppcConc,
        model: "A straight-line PPC has a constant slope: resources are equally suited to producing both goods, so every extra unit of X costs the same quantity of Y - opportunity cost is constant. A concave (bowed-out) PPC becomes steeper: as more X is produced, resources less suited to X are transferred, so each equal increase in X (A to B, B to C, C to D) requires giving up a larger amount of Y - opportunity cost increases.",
        accept: "slope of the PPC = opportunity cost of X in terms of Y",
        reject: "a convex (bowed-in) curve for increasing opportunity cost",
        tip: "向外凸 (concave) = OC 遞增；直線 = OC 不變。記住係「資源唔係完全適合」。" },
      { title: "Explain why investing in capital goods raises future growth", paper: "P1", where: "Paper 1(a) part · diagram 4 marks",
        q: "Using PPC diagrams, explain why a country that devotes more resources to capital goods may grow faster in the future.",
        marks: [
          ["Diagram", "two PPCs (or two economies) showing a point with __more capital goods__ leading to a __larger outward shift__", 2],
          ["M1", "the __opportunity cost__ is fewer consumer goods (lower living standards) today"],
          ["M2", "more capital raises the __quantity / productivity of factors__, so potential output grows faster: the PPC shifts further out"],
        ],
        svg: ppcCap,
        model: "Both economies start on the same PPC. Economy B chooses point B with more capital goods and fewer consumer goods - the opportunity cost is lower consumption now. The extra capital increases the economy's productive capacity, so in the future B's PPC shifts outwards much further than A's. Choosing capital goods today sacrifices present consumption for faster potential growth.",
        accept: "capital vs consumer goods trade-off; \"present vs future consumption\"",
        reject: "claiming more capital goods give more consumer goods today",
        tip: "今日犧牲 consumer goods（opportunity cost），聽日 PPC 向外移得多啲。" },
    ],
    concepts: [
      { h: "PPC shapes and shifts at a glance", b: "<ul><li><strong>Concave</strong> PPC = increasing opportunity cost (resources not perfectly adaptable); <strong>straight line</strong> = constant opportunity cost.</li><li>Point <strong>inside</strong> = unemployment / inefficiency (actual growth possible); point <strong>outside</strong> = unattainable now.</li><li><strong>Outward shift</strong> = more or better factors / technology (potential growth); <strong>inward shift</strong> = loss of factors (war, disaster, emigration).</li><li>Technology in only one good → the PPC <strong>pivots</strong> out along that good's axis.</li><li>Choosing more <strong>capital goods</strong> today → a larger outward shift later.</li></ul>" },
    ],
  };

  // =====================================================================
  // econ-2 Demand and supply
  // =====================================================================
  const dCurve = mk("Law of demand: price falls P₁ → P₂, quantity demanded extends Q₁ → Q₂ (movement along D)", { points: [{ at: [3, 7], label: "A" }, { at: [6, 4], label: "B" }], texts: [{ at: [5.6, 8.6], text: "inverse P-Qd relationship" }] },
    { lines: [ln(1, 9, 9, 1, "D")] }, gq(3, 7, "P₁", "Q₁"), gq(6, 4, "P₂", "Q₂"));
  const dDec = mk("Decrease in demand D₁ → D₂ (e.g. an inferior good when incomes rise): P and Q fall", { points: [{ at: [5, 5], label: "E₁" }, { at: [4.25, 4.25], label: "E₂" }] },
    { lines: [ln(1, 9, 9, 1, "D₁"), ln(1, 7.5, 7.5, 1, "D₂", "b"), ln(1, 1, 9, 9, "S", "c")] }, gq(5, 5, "P₁", "Q₁"), gq(4.25, 4.25, "P₂", "Q₂", 0, 0, 1.2));
  const sCurve = mk("Law of supply: price rises P₁ → P₂, quantity supplied extends Q₁ → Q₂ (movement along S)", { points: [{ at: [3, 3], label: "A" }, { at: [6, 6], label: "B" }], texts: [{ at: [5.6, 2.2], text: "higher price → more profitable" }] },
    { lines: [ln(1, 1, 9, 9, "S", "c")] }, gq(3, 3, "P₁", "Q₁"), gq(6, 6, "P₂", "Q₂"));
  const sInc = mk("Increase in supply S₁ → S₂ (e.g. new technology): price falls, quantity rises", { points: [{ at: [5, 5], label: "E₁" }, { at: [5.75, 4.25], label: "E₂" }] },
    { lines: [ln(1, 9, 9, 1, "D"), ln(1, 1, 9, 9, "S₁", "c"), ln(2.5, 1, 9.5, 8, "S₂", "b")] }, gq(5, 5, "P₁", "Q₁"), gq(5.75, 4.25, "P₂", "Q₂", 0, 0, 1.2));
  const mu = { title: "HL: diminishing marginal utility - each extra unit adds less satisfaction", x: [0, 10], y: [-3, 10], grid: false, xLabel: "Quantity consumed", yLabel: "Marginal utility",
    curves: [{ f: (x) => 9 - 1.2 * x, domain: [0, 9.5], label: "MU", labelX: 4 }], points: [{ at: [7.5, 0] }], texts: [{ at: [7.5, -1.6], text: "MU = 0", anchor: "middle" }, { at: [3, 8.8], text: "MU falls as Q rises → buy more only at a lower price" }] };
  const tu = { title: "HL: total utility rises at a falling rate and peaks where MU = 0", x: [0, 10], y: [0, 40], origin: false, grid: false, xLabel: "Quantity consumed", yLabel: "Total utility",
    curves: [{ f: (x) => 9 * x - 0.6 * x * x, domain: [0, 10], label: "TU", labelX: 9 }], vlines: [{ x: 7.5, label: "TU max (MU = 0)" }] };
  const linA = { title: "HL: Qd = 20 − 2P → Qd = 28 − 2P: a larger 'a' shifts D right (parallel)", x: [0, 30], y: [0, 15], origin: false, grid: false, xLabel: "Qd", yLabel: "P",
    curves: [{ f: (q) => 10 - q / 2, domain: [0, 20], label: "Qd = 20 − 2P", labelX: 10 }, { f: (q) => 14 - q / 2, domain: [0, 28], color: "b", label: "Qd = 28 − 2P", labelX: 17 }],
    texts: [{ at: [0.3, 10.3], text: "10" }, { at: [0.3, 14.3], text: "14" }, { at: [20, -1], text: "20", anchor: "middle" }, { at: [28, -1], text: "28", anchor: "middle" }] };
  const linB = { title: "HL: Qd = 20 − 2P → Qd = 20 − 4P: a larger 'b' makes D flatter (pivots about Q = a)", x: [0, 22], y: [0, 11], origin: false, grid: false, xLabel: "Qd", yLabel: "P",
    curves: [{ f: (q) => 10 - q / 2, domain: [0, 20], label: "b = 2", labelX: 6 }, { f: (q) => 5 - q / 4, domain: [0, 20], color: "b", label: "b = 4", labelX: 12 }],
    texts: [{ at: [0.3, 10.2], text: "a/b = 10" }, { at: [0.3, 5.2], text: "a/b = 5" }, { at: [20, -0.8], text: "a = 20", anchor: "middle" }] };
  const linS = { title: "HL: Qs = c + dP. Qs = −4 + 2P meets the P axis at −c/d = 2; c rising to +2 shifts S right", x: [0, 20], y: [0, 11], origin: false, grid: false, xLabel: "Qs", yLabel: "P",
    curves: [{ f: (q) => 2 + q / 2, domain: [0, 17], color: "c", label: "Qs = −4 + 2P", labelX: 11 }, { f: (q) => q / 2 - 1, domain: [2, 20], color: "b", label: "Qs = 2 + 2P", labelX: 13.5 }],
    texts: [{ at: [0.3, 2.3], text: "2" }, { at: [8, 1], text: "c > 0: S starts on the Q axis" }] };
  const hsum = { title: "Market demand = horizontal sum of individual demands (D_A + D_B at each price)", x: [0, 14], y: [0, 9], origin: false, grid: false, xLabel: "Quantity", yLabel: "Price",
    curves: [{ f: (q) => 8 - q, domain: [0, 8], color: "b", label: "D_A", labelX: 6.5 }, { f: (q) => 6 - q, domain: [0, 6], color: "c", label: "D_B", labelX: 4 }, { f: (q) => (q <= 2 ? 8 - q : 7 - q / 2), domain: [0, 14], label: "D market", labelX: 11.5 }],
    lines: [ln(0, 4, 6, 4, "", "muted", true)], points: [{ at: [4, 4] }, { at: [2, 4] }, { at: [6, 4], label: "4 + 2 = 6" }], texts: [{ at: [-0.1, 3.8], text: "4", anchor: "end" }] };

  T["econ-2"] = {
    diagrams: [dCurve, sCurve, dDec, sInc, hsum, mu, tu, linA, linB, linS],
    frames: [
      { title: "Diagram: decrease in demand (inferior good)", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a demand and supply diagram, explain the effect of rising incomes on the market for second-hand clothes, an inferior good.",
        marks: [
          ["Diagram", "labelled axes, S and D₁, __demand shifts left__ to D₂, new equilibrium at __lower price and lower quantity__ marked on both axes", 2],
          ["M1", "for an __inferior good__, demand __falls as income rises__ (negative YED) because consumers switch to better alternatives"],
          ["M2", "at the original price there is __excess supply__, so price falls and quantity supplied __contracts__ to the new equilibrium P₂, Q₂"],
        ],
        diagram: dDec,
        model: "Second-hand clothes are an inferior good: as incomes rise consumers switch to new clothes, so demand falls at every price and D shifts left from D₁ to D₂. At the original price P₁ there is now excess supply, so sellers cut prices; as price falls quantity supplied contracts along S until the new equilibrium at the lower price P₂ and lower quantity Q₂.",
        accept: "\"contraction of supply\" / \"fall in quantity supplied\"",
        reject: "shifting supply; calling it a normal good",
        tip: "Inferior good：收入↑ → D 左移。S 唔郁，係沿 S contraction。" },
      { title: "Diagram: increase in supply (technology / lower costs)", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a demand and supply diagram, explain the effect of improved battery technology on the market for electric scooters.",
        marks: [
          ["Diagram", "labelled axes, D and S₁, __supply shifts right__ to S₂, new equilibrium at __lower price and higher quantity__ marked on both axes", 2],
          ["M1", "better technology __lowers unit costs__ / raises productivity, so firms supply more at every price"],
          ["M2", "excess supply at the original price makes price fall, and quantity demanded __extends__ to Q₂"],
        ],
        diagram: sInc,
        model: "Improved battery technology lowers the cost of producing each scooter, so firms are willing and able to supply more at every price: S shifts right from S₁ to S₂. At the original price there is excess supply, so price falls from P₁ to P₂ and quantity demanded extends along D, giving a new equilibrium at a lower price and higher quantity Q₂.",
        accept: "supply shifting \"down\" (lower cost per unit)",
        reject: "shifting demand because the product is better (unless argued separately)",
        tip: "技術進步 = 成本↓ = S 右移；P↓ Q↑。" },
      { title: "HL: diminishing marginal utility explains the demand curve", hl: true, paper: "P1", where: "Paper 1(a) part / Paper 2 · 4 marks",
        q: "Explain how the law of diminishing marginal utility can explain why demand curves slope downwards.",
        marks: [
          ["Diagram", "MU falling as quantity consumed rises (and/or TU rising at a decreasing rate)", 1],
          ["M1", "__marginal utility__ is the extra satisfaction from consuming one more unit"],
          ["M2", "MU __falls__ as more units are consumed"],
          ["M3", "so consumers are only __willing to pay less__ for each additional unit: quantity demanded rises only if price falls"],
        ],
        diagram: mu,
        model: "Marginal utility is the additional satisfaction from consuming one more unit. According to the law of diminishing marginal utility, MU falls as consumption rises (the diagram shows MU declining). A consumer will pay for another unit only if the benefit it brings is at least its price; because each extra unit gives less satisfaction, consumers will buy more only at a lower price - the demand curve slopes downwards.",
        accept: "MB as the demand curve; TU increasing at a decreasing rate",
        reject: "\"utility falls\" (total utility still rises while MU > 0)",
        tip: "MU 跌唔等於 TU 跌：TU 仲升，只係升得慢；MU = 0 時 TU 最高。" },
      { title: "HL: plot a linear demand function and show a change in 'a'", hl: true, paper: "P3", where: "Paper 3 · 3-4 marks · graph paper",
        q: "The demand for a good is Qd = 20 − 2P. (a) Plot the demand curve. (b) Following a rise in income, demand becomes Qd = 28 − 2P. Plot the new curve and explain the change.",
        marks: [
          ["Plot", "axes P (vertical) and Q (horizontal) labelled; Qd = 20 − 2P drawn from __P = 10 (Q = 0)__ to __Q = 20 (P = 0)__", 1],
          ["Plot", "Qd = 28 − 2P drawn __parallel__ from P = 14 to Q = 28", 1],
          ["M1", "a larger 'a' means a higher quantity demanded __at every price__: an increase in demand (shift right)"],
          ["M2", "'b' is unchanged, so the __slope is unchanged__ (parallel shift)"],
        ],
        diagram: linA,
        model: "Price goes on the vertical axis. For Qd = 20 − 2P: when Q = 0, P = 10; when P = 0, Q = 20. For Qd = 28 − 2P: P = 14 when Q = 0 and Q = 28 when P = 0. The new line is parallel to the old one and to its right: the rise in 'a' (from 20 to 28) means 8 more units are demanded at every price - an increase in demand caused by the rise in income. The slope, set by 'b', has not changed.",
        accept: "the change in a as \"non-price determinant\"",
        reject: "putting P on the horizontal axis; plotting only one point",
        tip: "畫 linear function：搵兩個 intercept（Q = 0 同 P = 0），P 永遠喺 y 軸。" },
      { title: "Diagram: market demand from individual demands", paper: "P2", where: "Paper 2 · 2 marks",
        q: "Using a diagram, explain how a market demand curve is derived from individual demand curves.",
        marks: [
          ["Diagram", "two individual demand curves and a market curve that is their __horizontal sum__ (quantities added at each price)", 1],
          ["M1", "at each price, market quantity demanded = the __sum of the quantities__ each consumer demands"],
        ],
        diagram: hsum,
        model: "Market demand is the sum of all individual demands. At each price we add the quantities each consumer demands: at a price of 4, A demands 4 and B demands 2, so market demand is 6. Doing this at every price gives the market demand curve, which lies to the right of each individual curve (horizontal summation).",
        accept: "\"sum of individual demands at each price\"",
        reject: "adding prices (vertical summation)",
        tip: "Private good：同一個價，數量橫向相加。" },
    ],
    concepts: [
      { h: "HL: reading linear functions on a diagram", b: "<p>Always put <strong>P on the vertical axis</strong>. For Qd = a − bP: P-intercept = a/b, Q-intercept = a; a change in <em>a</em> shifts D parallel; a larger <em>b</em> makes the curve <strong>flatter</strong> (it pivots about Q = a). For Qs = c + dP: Qs = 0 at P = −c/d; c &lt; 0 → S starts on the P axis, c &gt; 0 → S starts on the Q axis; a change in <em>c</em> shifts S parallel, a larger <em>d</em> makes it flatter.</p>" },
    ],
  };

  // =====================================================================
  // econ-3 Market equilibrium and efficiency
  // =====================================================================
  const eq = mk("Market equilibrium: Qd = Qs at Pe, Qe", { points: [{ at: [5, 5], label: "E" }], texts: [{ at: [2, 9.6], text: "above Pe: excess supply" }, { at: [2, 8.9], text: "below Pe: excess demand" }] },
    { lines: [ln(1, 9, 9, 1, "D"), ln(1, 1, 9, 9, "S", "c")] }, gq(5, 5, "Pe", "Qe"));
  const exS = mk("Price P₁ above equilibrium: excess supply Qs − Qd; price falls back to Pe", { points: [{ at: [5, 5], label: "E" }], texts: [{ at: [5, 7.3], text: "excess supply", anchor: "middle" }] },
    { lines: [ln(1, 9, 9, 1, "D"), ln(1, 1, 9, 9, "S", "c"), ln(0, 7, 7, 7, "", "muted", true)] }, gq(3, 7, "P₁", "Qd"), gq(7, 7, "", "Qs"), gq(5, 5, "Pe", "Qe"));
  const dD3 = mk("Fall in demand D₁ → D₂: excess supply at P₁, price falls, supply contracts", { points: [{ at: [5, 5], label: "E₁" }, { at: [4.25, 4.25], label: "E₂" }] },
    { lines: [ln(1, 9, 9, 1, "D₁"), ln(1, 7.5, 7.5, 1, "D₂", "b"), ln(1, 1, 9, 9, "S", "c")] }, gq(5, 5, "P₁", "Q₁"), gq(4.25, 4.25, "P₂", "Q₂", 0, 0, 1.2));
  const both = mk("D and S both rise: Q rises for sure; P falls here because S shifts more than D", { points: [{ at: [5, 5], label: "E₁" }, { at: [7, 4.5], label: "E₂" }] },
    { lines: [ln(1, 9, 9, 1, "D₁"), ln(2.5, 9, 9.5, 2, "D₂", "b"), ln(1, 1, 9, 9, "S₁", "c"), ln(3.5, 1, 9.5, 7, "S₂", "b")] }, gq(5, 5, "P₁", "Q₁"), gq(7, 4.5, "P₂", "Q₂"));
  const opp = mk("D rises, S falls: P rises for sure; Q depends on the relative shifts (unchanged here)", { points: [{ at: [5, 5], label: "E₁" }, { at: [5, 6.5], label: "E₂" }] },
    { lines: [ln(1, 9, 9, 1, "D₁"), ln(2.5, 9, 9.5, 2, "D₂", "b"), ln(1, 1, 9, 9, "S₁", "c"), ln(1, 2.5, 7.5, 9, "S₂", "b")] }, gq(5, 5, "P₁", ""), gq(5, 6.5, "P₂", "Q₁ = Q₂"));
  // SVG surplus figures: D: P = 9 − Q, S: P = 1 + Q, E (4, 5)
  const Dm = (q) => 9 - q, Sm = (q) => 1 + q;
  const baseDS = (P) => P.fn(Dm, 0, 8.2) + P.fn(Sm, 0, 8.4, C) + P.t(8.2, Dm(8.2), "D = MB", { dx: 4, dy: -4, c: A }) + P.t(8.4, Sm(8.4), "S = MC", { dx: 6, dy: 4, c: C });
  const csps = fig1("ar-econ3-1", "Consumer and producer surplus at equilibrium", "Quantity", "Price", (P) =>
    P.pg([[0, 9], [0, 5], [4, 5]], B) + P.pg([[0, 1], [0, 5], [4, 5]], C) + baseDS(P) + P.g(4, 5, "Pe", "Qe") +
    P.t(1.2, 6.2, "CS", { b: true }) + P.t(1.2, 3.6, "PS", { b: true }));
  const wlUnder = fig1("ar-econ3-2", "Welfare loss when output is below equilibrium", "Quantity", "Price", (P) =>
    P.pg([[2.5, 6.5], [2.5, 3.5], [4, 5]], R, 0.45) + baseDS(P) + P.g(4, 5, "Pe", "Qe") + P.g(2.5, 0, "", "Q₁") +
    `<line x1="${P.X(2.5)}" y1="${P.Y(0)}" x2="${P.X(2.5)}" y2="${P.Y(6.5)}" stroke="${M}" stroke-dasharray="3 3"/>` +
    P.t(2.9, 5, "WL", { b: true, c: R, s: 11 }));
  const wlOver = fig1("ar-econ3-3", "Welfare loss when output is above equilibrium", "Quantity", "Price", (P) =>
    P.pg([[4, 5], [6, 7], [6, 3]], R, 0.45) + baseDS(P) + P.g(4, 5, "Pe", "Qe") +
    `<line x1="${P.X(6)}" y1="${P.Y(0)}" x2="${P.X(6)}" y2="${P.Y(7)}" stroke="${M}" stroke-dasharray="3 3"/>` + P.t(6, 0, "Q₂", { dy: 15, a: "middle" }) +
    P.t(5.1, 5, "WL", { b: true, c: R, s: 11 }));

  T["econ-3"] = {
    diagrams: [eq, exS, dD3, both, opp],
    figures: [
      { title: "Consumer surplus and producer surplus", caption: "CS = area below D and above price; PS = area above S and below price. Their sum (community surplus) is greatest at the competitive equilibrium, where MB = MC.", svg: csps },
      { title: "Welfare loss from under-allocation (Q₁ < Qe)", caption: "Between Q₁ and Qe each unit has MB > MC; not producing them loses the red triangle of community surplus.", svg: wlUnder },
      { title: "Welfare loss from over-allocation (Q₂ > Qe)", caption: "Between Qe and Q₂ each unit costs more than it is worth (MC > MB); the red triangle is the welfare loss.", svg: wlOver },
    ],
    frames: [
      { title: "Diagram: excess supply and how the price mechanism removes it", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain how the price mechanism eliminates a surplus in a market.",
        marks: [
          ["Diagram", "D and S with a price __above equilibrium__, Qd and Qs marked, __excess supply (Qs − Qd)__ identified, Pe and Qe shown", 2],
          ["M1", "at P₁ quantity supplied exceeds quantity demanded, so unsold stock builds up and sellers __cut prices__"],
          ["M2", "as price falls, quantity demanded __extends__ and quantity supplied __contracts__ until Qd = Qs at Pe"],
        ],
        diagram: exS,
        model: "At price P₁, above equilibrium, firms want to sell Qs but consumers only buy Qd, so there is excess supply (Qs − Qd). Unsold stock gives firms an incentive to lower prices. As the price falls, quantity demanded extends along D and quantity supplied contracts along S, until the market clears at Pe, where Qd = Qs = Qe.",
        accept: "\"surplus\" for excess supply; \"rationing / signalling\" language",
        reject: "shifting D or S to remove the surplus (it is movements along the curves)",
        tip: "Surplus 係「沿住條線郁」消失，唔係條線移位。" },
      { title: "Diagram: simultaneous changes in demand and supply", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain why the equilibrium price of smartphones may fall even though demand for them has increased.",
        marks: [
          ["Diagram", "D₁ → D₂ (right) and S₁ → S₂ (right) with the __supply shift larger__, new equilibrium at a __lower price__ and higher quantity", 2],
          ["M1", "demand rises (e.g. higher income / tastes), which on its own would raise price"],
          ["M2", "supply rises __by more__ (e.g. technology, falling component costs, new entrants), so the net effect is a __lower price__ and a higher quantity"],
        ],
        diagram: both,
        model: "Higher incomes increase demand for smartphones (D₁ → D₂), which alone would raise price. At the same time falling component costs and improved technology increase supply (S₁ → S₂). Because supply has increased by more than demand, the new equilibrium E₂ is at a lower price P₂ but a much higher quantity Q₂. When both curves shift right, quantity must rise but the price change depends on the relative size of the shifts.",
        accept: "any valid cause of each shift",
        reject: "claiming price must rise because demand rose",
        tip: "兩條線同時郁：一個變數一定確定，另一個睇邊條移得多。" },
      { title: "Diagram: shade consumer and producer surplus", paper: "P2", where: "Paper 2 · 2-4 marks",
        q: "Draw a demand and supply diagram and shade consumer surplus and producer surplus at equilibrium. Explain why community surplus is maximised.",
        marks: [
          ["Diagram", "D and S, Pe and Qe, __CS shaded above Pe and below D__, __PS shaded below Pe and above S__", 2],
          ["M1", "CS = difference between what consumers are __willing to pay__ and what they pay; PS = difference between price received and the __minimum price__ firms would accept"],
          ["M2", "at Qe, __MB = MC__: any other output loses some surplus, so community surplus is __maximised__ (allocative efficiency)"],
        ],
        svg: csps,
        model: "Consumer surplus is the triangle below the demand curve and above Pe: the difference between what consumers would be willing to pay and what they actually pay. Producer surplus is the triangle above the supply curve and below Pe: the difference between the price received and the lowest price firms would accept. At Qe, MB (demand) equals MC (supply), so every unit worth more than it costs is produced and none that costs more than it is worth. Community surplus is therefore maximised - allocative efficiency.",
        accept: "\"social surplus\" for community surplus",
        reject: "shading the wrong side of the price line",
        tip: "CS 喺價錢上面、D 下面；PS 喺價錢下面、S 上面。" },
      { title: "Diagram: welfare loss when output differs from equilibrium", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain why producing less than the equilibrium quantity leads to a loss of welfare.",
        marks: [
          ["Diagram", "D (MB) and S (MC), output Q₁ < Qe, __welfare loss triangle__ between D and S from Q₁ to Qe shaded", 2],
          ["M1", "for units between Q₁ and Qe, __MB > MC__: society values them more than they cost to make"],
          ["M2", "not producing them loses that surplus: __under-allocation__ of resources / allocative inefficiency"],
        ],
        svg: wlUnder,
        model: "Demand shows marginal benefit and supply shows marginal cost. If output is Q₁, below Qe, each unit between Q₁ and Qe would have a marginal benefit greater than its marginal cost. Because these units are not produced, the community surplus they would have generated - the triangle between D and S from Q₁ to Qe - is lost. This is a welfare (deadweight) loss: resources are under-allocated to the good.",
        accept: "\"deadweight loss\"",
        reject: "shading a rectangle; the triangle on the wrong side of Qe",
        tip: "Welfare loss 三角形嘅尖角永遠喺 MB = MC 嗰點。" },
    ],
    concepts: [
      { h: "Simultaneous shifts - the four cases", b: "<ul><li>D↑ and S↑: Q rises; P ambiguous.</li><li>D↓ and S↓: Q falls; P ambiguous.</li><li>D↑ and S↓: P rises; Q ambiguous.</li><li>D↓ and S↑: P falls; Q ambiguous.</li></ul><p>The ambiguous variable depends on which curve shifts further - say so and show it on the diagram.</p>" },
    ],
  };

  // =====================================================================
  // econ-4 Rational choice and behavioural economics
  // =====================================================================
  const rcFig = wrap(540, 250, "ar-econ4-1", "Assumptions of rational consumer choice and the behavioural challenges to them",
    tx(130, 18, "Rational consumer choice assumes…", { a: "middle", b: true }) + tx(410, 18, "Behavioural economics finds…", { a: "middle", b: true }) +
    [["Consistent preferences", "Bounded rationality"], ["Utility maximisation", "Bounded self-control"], ["Perfect information", "Imperfect information"], ["Self-interest only", "Bounded selfishness"]].map((r, i) => {
      const y = 32 + i * 54, sub = [["choices are stable and logical", "limited time/info → satisfice"], ["best possible choice", "short-term temptation (e.g. snacks)"], ["know all prices and products", "biases: anchoring, framing, availability"], ["maximise own utility", "care about others / fairness"]][i];
      return box(20, y, 220, 42, [r[0], sub[0]], { s: 11 }) + box(300, y, 220, 42, [r[1], sub[1]], { s: 11 }) + arw([[244, y + 21], [296, y + 21]], "ar-econ4-1", R);
    }).join(""));
  const archFig = wrap(540, 200, "ar-econ4-2", "Choice architecture: default, restricted and mandated choice",
    box(10, 20, 165, 100, ["Default choice", "pre-set option;", "people tend to stay", "(opt-out pensions,", "organ donation)"], { s: 11 }) +
    box(187, 20, 165, 100, ["Restricted choice", "fewer options so", "decisions are easier", "(limited menu,", "3 plan options)"], { s: 11 }) +
    box(364, 20, 165, 100, ["Mandated choice", "must actively decide", "before proceeding", "(tick yes / no to", "be an organ donor)"], { s: 11 }) +
    tx(270, 150, "Choice architecture = how options are presented; a nudge alters behaviour", { a: "middle", s: 12 }) +
    tx(270, 168, "predictably WITHOUT banning options or changing incentives much", { a: "middle", s: 12 }) +
    tx(270, 190, "Opt-in (low uptake) → opt-out default (high uptake): inertia + status-quo bias", { a: "middle", s: 11, c: A }));
  const biasFig = wrap(540, 220, "ar-econ4-3", "Cognitive biases: rule of thumb, anchoring, framing, availability",
    box(10, 10, 255, 95, ["Rule of thumb (heuristic)", "a mental shortcut instead of full", "calculation, e.g. always buy the", "same brand / the mid-priced wine"], { s: 11 }) +
    box(275, 10, 255, 95, ["Anchoring", "judging value against a first", "number seen: \"was $199, now $99\"", "makes $99 feel cheap"], { s: 11 }) +
    box(10, 115, 255, 95, ["Framing", "same facts, different presentation:", "\"90% fat-free\" sells better", "than \"contains 10% fat\""], { s: 11 }) +
    box(275, 115, 255, 95, ["Availability", "judging likelihood by how easily", "examples come to mind: fear of", "flying after a crash in the news"], { s: 11 }));
  const nudgeFig = wrap(540, 140, "ar-econ4-4", "Spectrum of policies from nudges to bans",
    arw([[30, 50], [510, 50]], "ar-econ4-4") + tx(30, 30, "most freedom of choice", { s: 11 }) + tx(510, 30, "least freedom of choice", { s: 11, a: "end" }) +
    [["Nudge", "default, framing"], ["Information", "labels, campaigns"], ["Tax / subsidy", "change incentives"], ["Regulation", "limits, standards"], ["Ban", "remove option"]].map((r, i) =>
      `<circle cx="${60 + i * 105}" cy="50" r="5" fill="${[C, C, A, R, R][i]}"/>` + tx(60 + i * 105, 76, r[0], { a: "middle", b: true }) + tx(60 + i * 105, 92, r[1], { a: "middle", s: 11 })).join("") +
    tx(270, 126, "Nudges = libertarian paternalism: cheap, keeps choice, but effects may be small or fade", { a: "middle", s: 11 }));
  const objFig = wrap(540, 200, "ar-econ4-5", "Business objectives",
    box(10, 10, 160, 82, ["Profit maximisation", "output where", "MC = MR"], { s: 11 }) + box(190, 10, 160, 82, ["Revenue maximisation", "output where MR = 0", "(managers' bonuses)"], { s: 11 }) +
    box(370, 10, 160, 82, ["Growth / market share", "sell more, lower price;", "economies of scale"], { s: 11 }) +
    box(10, 106, 250, 82, ["Satisficing", "\"good enough\" profit to keep", "owners happy (bounded rationality,", "principal-agent problem)"], { s: 11 }) +
    box(280, 106, 250, 82, ["Corporate social responsibility", "act ethically towards workers,", "environment and community;", "may raise costs but build brand"], { s: 11 }));
  const vfun = { title: "Extension (not a syllabus diagram): loss aversion - a loss hurts more than an equal gain pleases", x: [-10, 10], y: [-10, 10], grid: false, xLabel: "gain ($)", yLabel: "value",
    curves: [{ f: (x) => (x >= 0 ? 2.5 * Math.sqrt(x) : NaN), domain: [0, 10], color: "c", label: "gains", labelX: 8 }, { f: (x) => (x <= 0 ? -5 * Math.sqrt(-x) : NaN), domain: [-10, 0], color: "b", label: "losses", labelX: -6 }],
    texts: [{ at: [0.8, -6], text: "losses curve steeper:" }, { at: [0.8, -7.6], text: "framing as a loss is powerful" }] };

  T["econ-4"] = {
    diagrams: [vfun],
    figures: [
      { title: "Rational consumer choice vs behavioural economics", caption: "Each assumption of the rational model and the behavioural idea that challenges it.", svg: rcFig },
      { title: "Choice architecture and nudges", caption: "Three ways of designing choices that change behaviour without removing options.", svg: archFig },
      { title: "Biases: rule of thumb, anchoring, framing, availability", caption: "Learn one example of each - Paper 2 often asks for a bias shown in the text.", svg: biasFig },
      { title: "From nudges to bans", caption: "Use the spectrum when evaluating: a nudge keeps freedom of choice but may be weaker than a tax or regulation.", svg: nudgeFig },
      { title: "Business objectives", caption: "Firms do not always maximise profit; link each objective to its output rule or motive.", svg: objFig },
    ],
    frames: [
      { title: "Explain how a default option (choice architecture) changes behaviour", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using an example, explain how changing the default option can increase the number of workers saving for a pension.",
        marks: [
          ["M1", "__choice architecture__: the way choices are presented affects decisions"],
          ["M2", "a __default__ is the option that applies if the person does nothing; switching to automatic enrolment (__opt-out__) makes saving the default"],
          ["M3", "because of __inertia / status-quo bias__ and bounded rationality, most workers stay with the default"],
          ["M4", "so participation rises, although workers keep the __freedom to opt out__ (a nudge, not a mandate)"],
        ],
        svg: archFig,
        model: "Choice architecture refers to the design of the environment in which people choose. Under an opt-in system, workers must actively join a pension scheme, and many never do because of inertia and present bias. If the government makes enrolment automatic, saving becomes the default: workers are enrolled unless they choose to opt out. Because people tend to stick with the default (status-quo bias), participation rises sharply - as in the UK's auto-enrolment - while workers remain free to leave, so this is a nudge rather than compulsion.",
        accept: "any real example of default choice (organ donation opt-out, green energy tariffs)",
        reject: "describing a tax or ban as a nudge",
        tip: "Nudge 一定要講「保留選擇自由」同「冇大改變 incentive」。" },
      { title: "Explain anchoring and framing with examples", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Explain how anchoring and framing may lead consumers to make choices that are not rational.",
        marks: [
          ["M1", "__anchoring__: decisions are influenced by an initial reference value"],
          ["M2", "example: a \"was $199, now $99\" tag makes $99 seem a bargain whatever the item's real value"],
          ["M3", "__framing__: the way information is presented changes the decision even though the facts are the same"],
          ["M4", "example: \"90% fat-free\" vs \"10% fat\" - consumers choose differently, which is inconsistent with rational choice"],
        ],
        svg: biasFig,
        model: "Anchoring occurs when people rely too heavily on the first number they see. A shop that shows \"was $199, now $99\" anchors the customer on $199, so $99 seems a bargain even if the product is only worth $70 to them. Framing occurs when the presentation of identical information changes choices: consumers prefer food labelled \"90% fat-free\" to food labelled \"contains 10% fat\". In both cases choices depend on presentation rather than on consistent preferences and full information, so they are not rational in the standard model.",
        accept: "other valid examples",
        reject: "confusing framing with advertising in general",
        tip: "每個 bias：定義 + 一個具體例子 = 2 分。" },
      { title: "Compare a nudge with a tax or ban", paper: "P1", where: "Paper 1(b) evaluation point / Paper 2 · 4 marks",
        q: "Explain one advantage and one disadvantage of using nudges rather than taxes to reduce consumption of sugary drinks.",
        marks: [
          ["M1", "nudges (e.g. placing water at eye level, smaller default cup sizes) change behaviour while __keeping freedom of choice__"],
          ["M2", "advantage: __low cost__, no regressive tax burden, no black markets, politically easier"],
          ["M3", "disadvantage: effect may be __small or temporary__ and hard to measure; no revenue raised"],
          ["M4", "a tax changes the __price incentive__ for everyone and raises revenue, but is regressive"],
        ],
        svg: nudgeFig,
        model: "A nudge such as moving sugary drinks away from checkouts or making water the default in meal deals changes behaviour without restricting choice. It is cheap to introduce, does not burden low-income households and is less likely to face political opposition. However, its effect may be small or fade over time, and unlike a sugar tax it raises no revenue. A tax gives a clear price signal to all consumers but is regressive and may be weak if demand is price inelastic.",
        accept: "evaluation via the spectrum of interventions",
        reject: "saying nudges force people to change",
        tip: "評價 nudge：便宜 + 保留自由 vs 效果細 + 難量度。" },
    ],
    concepts: [
      { h: "Where behavioural ideas appear in diagrams", b: "<p>Behavioural economics rarely needs a curve diagram; examiners reward a <strong>clear example</strong> for each bias and a named nudge type. Where a market diagram helps, a successful nudge (e.g. healthy-eating campaign) is shown as a <strong>shift of demand</strong>, for example D for sugary drinks shifting left.</p>" },
    ],
  };

  // =====================================================================
  // econ-5 Elasticities
  // =====================================================================
  const ped0 = mk("PED = 0 (perfectly inelastic): quantity demanded does not change with price", { texts: [{ at: [5.3, 8.5], text: "D (PED = 0)" }] }, { lines: [ln(5, 0.5, 5, 9.5, "", "a")] }, gq(5, 3, "P₁", "Q"), gq(5, 7, "P₂", ""));
  const pedInf = mk("PED = ∞ (perfectly elastic): any rise above P makes quantity demanded fall to zero", {}, { lines: [ln(0, 5, 7.5, 5, "D (PED = ∞)")] }, { texts: [{ at: [-0.12, 4.85], text: "P", anchor: "end" }] });
  const pedUnit = mk("PED = 1 everywhere: rectangular hyperbola, P × Q (total revenue) is constant", { curves: [{ f: (q) => 16 / q, domain: [1.7, 9.5], label: "D (PED = 1)", labelX: 7.6 }], texts: [{ at: [3.2, 8.6], text: "8 × 2 = 2 × 8 = 16" }] },
    gq(2, 8, "8", "2"), gq(8, 2, "2", "8"));
  const pedEl = mk("Elastic demand: P₁ → P₂ cuts total revenue (4 × 8 = 32 → 5 × 5 = 25)", { texts: [{ at: [5.5, 8.5], text: "%ΔQd > %ΔP" }] },
    { lines: [ln(0.5, 6.5, 9.5, 3.5, "D (elastic)")] }, gq(8, 4, "P₁", "Q₁"), gq(5, 5, "P₂", "Q₂"));
  const pedCmp = mk("Same price rise, different responses: flatter D (elastic) vs steeper D (inelastic)", { points: [{ at: [5, 5] }] },
    { lines: [ln(0.5, 6.5, 9.5, 3.5, "D elastic", "b"), ln(3.5, 9.5, 6.5, 0.5, "D inelastic")] }, gq(5, 5, "P₁", "Q₁"), gq(0.5, 6.5, "P₂", "Q el"), gq(4.5, 6.5, "", "Q in", 0, 0, 1.2));
  const trHill = { title: "Linear demand P = 10 − Q: total revenue rises while PED > 1, peaks at PED = 1, falls when PED < 1", x: [0, 10], y: [0, 28], origin: false, grid: false, xLabel: "Quantity", yLabel: "Total revenue",
    curves: [{ f: (q) => 10 * q - q * q, domain: [0, 10], label: "TR", labelX: 8.4 }], vlines: [{ x: 5, label: "PED = 1, TR max" }], texts: [{ at: [1.6, 12], text: "PED > 1" }, { at: [5.6, 12], text: "PED < 1" }] };
  const pesLines = mk("PES from straight lines: cuts P axis → PES > 1; through origin → PES = 1; cuts Q axis → PES < 1", { xLabel: "Quantity", yLabel: "Price" },
    { lines: [ln(0, 2, 5, 6, "PES > 1", "c"), ln(0, 0, 9, 9, "PES = 1", "b"), ln(3, 0, 7, 6.4, "PES < 1", "a")] });
  const pesExt = mk("PES = 0 (fixed supply, e.g. seats in a stadium) and PES = ∞ (any quantity at one price)", {},
    { lines: [ln(4, 0.5, 4, 9.5, "S (PES = 0)", "c"), ln(0, 6, 9.5, 6, "S (PES = ∞)", "b")] });
  const pesTime = mk("PES rises with time: momentary (vertical) → short run → long run (flattest)", { points: [{ at: [4, 4], label: "E" }] },
    { lines: [ln(4, 0.5, 4, 9.5, "S momentary", "muted"), ln(2.6, 0.5, 5.4, 7.5, "S short run", "b"), ln(0.5, 2.6, 9.5, 6.2, "S long run", "c")] });
  const yed = { title: "Quantity demanded vs income: luxury (YED > 1), necessity (0 < YED < 1), inferior (YED < 0)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Income", yLabel: "Qd",
    curves: [{ f: (y) => 0.25 * Math.pow(y, 1.6), domain: [0.2, 10], color: "b", label: "luxury", labelX: 8.3 }, { f: (y) => 2.2 * Math.sqrt(y), domain: [0.2, 10], color: "c", label: "necessity", labelX: 8.6 }, { f: (y) => 8 / Math.sqrt(y), domain: [1, 10], label: "inferior", labelX: 8.6 }] };
  const harvest = mk("Bumper harvest with inelastic demand: S₁ → S₂, price falls a lot, farm revenue falls (25 → 17.6)", { points: [{ at: [5, 5], label: "E₁" }, { at: [5.625, 3.125], label: "E₂" }] },
    { lines: [ln(3.5, 9.5, 6.5, 0.5, "D (inelastic)"), ln(1, 1, 9.5, 9.5, "S₁", "c"), ln(3.5, 1, 9.5, 7, "S₂", "b")] }, gq(5, 5, "P₁", "Q₁"), gq(5.625, 3.125, "P₂", "Q₂"));
  const elScale = wrap(540, 170, "ar-econ5-1", "Number lines for PED and YED values",
    tx(10, 22, "PED (absolute value)", { b: true }) + arw([[30, 50], [520, 50]], "ar-econ5-1") +
    [[40, "0", "perfectly", "inelastic"], [160, "0 < PED < 1", "inelastic", ""], [270, "1", "unit", "elastic"], [390, "PED > 1", "elastic", ""], [500, "∞", "perfectly", "elastic"]].map((r) =>
      `<line x1="${r[0]}" y1="44" x2="${r[0]}" y2="56" stroke="currentColor"/>` + tx(r[0], 40, r[1], { a: "middle", s: 11, b: true }) + tx(r[0], 72, r[2], { a: "middle", s: 11 }) + tx(r[0], 85, r[3], { a: "middle", s: 11 })).join("") +
    tx(10, 112, "YED (sign matters)", { b: true }) + arw([[30, 136], [520, 136]], "ar-econ5-1") +
    [[140, "YED < 0", "inferior"], [270, "0", ""], [340, "0 < YED < 1", "necessity"], [400, "1", ""], [470, "YED > 1", "luxury"]].map((r) =>
      `<line x1="${r[0]}" y1="130" x2="${r[0]}" y2="142" stroke="currentColor"/>` + tx(r[0], 126, r[1], { a: "middle", s: 11, b: true }) + tx(r[0], 158, r[2], { a: "middle", s: 11 })).join(""));

  T["econ-5"] = {
    diagrams: [ped0, pedInf, pedUnit, pedEl, pedCmp, trHill, pesLines, pesExt, pesTime, yed, harvest],
    figures: [{ title: "PED and YED value ranges", caption: "PED is quoted as an absolute value; for YED the sign tells you whether the good is normal (+) or inferior (−).", svg: elScale }],
    frames: [
      { title: "Diagram: extreme and unit-elastic demand curves", paper: "P2", where: "Paper 2 · 2-4 marks · \"Draw a demand curve with a PED of…\"",
        q: "Draw a demand curve with a price elasticity of demand equal to 1 at every point and explain what happens to total revenue when price changes.",
        marks: [
          ["Diagram", "a __rectangular hyperbola__ (curve, not a straight line), axes labelled, two price-quantity combinations with equal areas", 2],
          ["M1", "PED = 1 means the % change in quantity demanded __equals__ the % change in price"],
          ["M2", "so total revenue (P × Q) is __unchanged__ when price changes"],
        ],
        diagram: pedUnit,
        model: "A demand curve with unitary elasticity is a rectangular hyperbola. Along it, any percentage change in price causes an equal and opposite percentage change in quantity demanded, so total revenue P × Q stays the same: at a price of 8 the firm sells 2 (TR 16) and at a price of 2 it sells 8 (TR 16). By contrast, PED = 0 is a vertical line and PED = ∞ is a horizontal line.",
        accept: "PED = 0 vertical / PED = ∞ horizontal if those are asked",
        reject: "a straight downward-sloping line labelled PED = 1 (its PED varies)",
        tip: "PED = 1 一定係曲線（P×Q 不變），直線上 PED 會變。" },
      { title: "Diagram: total revenue and PED along a linear demand curve", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using diagrams, explain why a firm facing a linear demand curve should not always cut its price to raise revenue.",
        marks: [
          ["Diagram", "linear D with elastic upper section / inelastic lower section, or the __TR curve rising to a peak at PED = 1__ and then falling", 2],
          ["M1", "in the __elastic__ range (PED > 1) a price cut raises quantity proportionately more, so __TR rises__"],
          ["M2", "in the __inelastic__ range (PED < 1) a price cut __lowers TR__; TR is maximised where PED = 1 (midpoint)"],
        ],
        diagram: trHill,
        model: "Along a linear demand curve PED falls as price falls: demand is elastic above the midpoint, unit elastic at it and inelastic below it. Cutting price in the elastic range increases quantity demanded proportionately more, so total revenue rises. Once price falls below the midpoint, demand is inelastic and further cuts reduce total revenue. TR therefore rises to a maximum where PED = 1 and then falls, so a firm should only cut price while demand is elastic.",
        accept: "MR = 0 at the TR maximum (HL)",
        reject: "\"elasticity is the slope\"",
        tip: "Linear D：上半 elastic、下半 inelastic，中點 PED = 1、TR 最大。" },
      { title: "Diagram: PES values from straight-line supply curves", paper: "P2", where: "Paper 2 · 2-3 marks",
        q: "Draw three straight-line supply curves showing PES greater than 1, equal to 1 and less than 1.",
        marks: [
          ["Diagram", "S starting on the __price axis__ labelled PES > 1", 1],
          ["Diagram", "S passing __through the origin__ labelled PES = 1 (any slope)", 1],
          ["Diagram", "S starting on the __quantity axis__ labelled PES < 1", 1],
        ],
        diagram: pesLines,
        model: "Any straight-line supply curve through the origin has PES = 1 whatever its slope, because the percentage changes in price and quantity are always equal. A straight line that cuts the price axis has PES greater than 1 (elastic), and one that cuts the quantity axis has PES less than 1 (inelastic).",
        accept: "vertical (PES = 0) and horizontal (PES = ∞) as extra cases",
        reject: "judging PES only by steepness",
        tip: "直線 S：碰 P 軸 > 1，過原點 = 1，碰 Q 軸 < 1——唔係睇斜度！" },
      { title: "Diagram: why a good harvest can lower farmers' income", paper: "P1", where: "Paper 1(a) part / Paper 2 · 4 marks",
        q: "Using a diagram, explain why a bumper harvest may reduce farmers' total revenue.",
        marks: [
          ["Diagram", "__inelastic (steep) demand__, supply shifts right S₁ → S₂, __large fall in price__ and small rise in quantity", 2],
          ["M1", "demand for food is __price inelastic__ (necessity, few substitutes)"],
          ["M2", "so the % fall in price __exceeds__ the % rise in quantity and __total revenue falls__"],
        ],
        diagram: harvest,
        model: "A bumper harvest increases supply, shifting S₁ to S₂. Because demand for basic food is price inelastic, consumers buy only slightly more even when price falls a lot, so price falls sharply from P₁ to P₂ while quantity rises only from Q₁ to Q₂. The percentage fall in price is larger than the percentage rise in quantity, so farmers' total revenue falls (here from 25 to about 17.6).",
        accept: "price volatility / low PES as extra",
        reject: "elastic demand drawn",
        tip: "Inelastic D + S 右移 → P 大跌、TR 跌。" },
      { title: "Diagram: PES increases over time", paper: "P2", where: "Paper 2 · 3 marks",
        q: "Using a diagram, explain why the price elasticity of supply of housing is greater in the long run than in the short run.",
        marks: [
          ["Diagram", "momentary / short-run supply steep or vertical, __long-run supply flatter__ through the same initial point", 1],
          ["M1", "in the short run firms cannot quickly add capacity (land, permits, construction take time), so quantity responds little"],
          ["M2", "in the long run new factors can be employed and new firms enter, so supply is __more elastic__"],
        ],
        diagram: pesTime,
        model: "Immediately after a rise in house prices, the stock of houses is fixed, so supply is perfectly inelastic. Over the next year builders can complete existing projects, so supply becomes somewhat more responsive. In the long run new land is developed, planning permission is obtained and new firms enter, so supply is much more elastic. The supply curve therefore becomes flatter the longer the time period.",
        accept: "spare capacity, stocks, factor mobility as other determinants",
        reject: "confusing PES with PED",
        tip: "時間越長，S 越平（PES 越大）。" },
    ],
    concepts: [
      { h: "Drawing elasticities correctly", b: "<ul><li>PED is <strong>not</strong> the slope: a straight demand curve has every PED value along it (elastic above the midpoint, inelastic below).</li><li>PED = 1 everywhere is a rectangular hyperbola; PED = 0 vertical; PED = ∞ horizontal.</li><li>Any straight supply line through the origin has PES = 1.</li><li>When comparing PED or PES, draw both curves <strong>through the same starting point</strong> so the different responses are clear.</li></ul>" },
    ],
  };

  // =====================================================================
  // econ-h1 Theory of the firm (HL)
  // =====================================================================
  const tp = { title: "HL: total product rises at an increasing then decreasing rate, peaks when MP = 0", x: [0, 7], y: [0, 120], origin: false, grid: false, xLabel: "Labour (L)", yLabel: "TP",
    curves: [{ f: (L) => 9 * L * L - L ** 3, domain: [0, 7], label: "TP", labelX: 4.6 }], vlines: [{ x: 3, label: "MP max" }, { x: 6, label: "TP max" }] };
  const apmp = { title: "HL: MP and AP - diminishing marginal returns set in after L = 3; MP cuts AP at AP's maximum", x: [0, 7], y: [-10, 30], grid: false, xLabel: "Labour (L)", yLabel: "AP, MP",
    curves: [{ f: (L) => 18 * L - 3 * L * L, domain: [0, 6.6], color: "b", label: "MP", labelX: 5.2 }, { f: (L) => 9 * L - L * L, domain: [0, 7], label: "AP", labelX: 6.4 }],
    points: [{ at: [4.5, 20.25], label: "MP = AP" }], vlines: [{ x: 3, label: "diminishing returns" }] };
  const tcc = { title: "HL: TC = TFC + TVC; TFC is flat, TVC (and TC) rise at a decreasing then increasing rate", x: [0, 10], y: [0, 65], origin: false, grid: false, xLabel: "Quantity", yLabel: "Costs",
    curves: [{ f: () => 20, domain: [0, 10], color: "muted", label: "TFC", labelX: 9 }, { f: (q) => 0.1 * q ** 3 - 1.2 * q * q + 6 * q, domain: [0, 10], color: "c", label: "TVC", labelX: 9.2 }, { f: (q) => 0.1 * q ** 3 - 1.2 * q * q + 6 * q + 20, domain: [0, 10], label: "TC", labelX: 9.2 }],
    texts: [{ at: [0.3, 52], text: "vertical gap TC − TVC = TFC (constant)" }] };
  const K = costs(20);
  const qAtc = argmin(K.atc, 2, 10), qAvc = 6;
  const unitC = { title: "HL: AFC falls continuously; ATC − AVC = AFC, so the gap narrows; MC cuts AVC and ATC at their minimum", x: [0, 10], y: [0, 14], origin: false, grid: false, xLabel: "Quantity", yLabel: "Costs",
    curves: [{ f: K.afc, domain: [1.6, 10], color: "muted", label: "AFC", labelX: 9 }, { f: K.avc, domain: [0.5, 10], color: "c", label: "AVC", labelX: 9.3 }, { f: K.atc, domain: [2.2, 10], label: "ATC", labelX: 9.3 }, { f: K.mc, domain: [0.5, 9.5], color: "b", label: "MC", labelX: 9.0 }],
    points: [{ at: [qAvc, r2(K.avc(qAvc))] }, { at: [r2(qAtc), r2(K.atc(qAtc))] }] };
  const LR = (q) => 0.08 * (q - 5) ** 2 + 3, LRd = (q) => 0.16 * (q - 5);
  const sr = (qi) => (q) => LR(qi) + LRd(qi) * (q - qi) + 0.5 * (q - qi) ** 2;
  const lrac = { title: "HL: LRAC is the envelope of SRAC curves - each SRAC touches it at one output", x: [0, 10], y: [0, 8], origin: false, grid: false, xLabel: "Quantity", yLabel: "Costs per unit",
    curves: [{ f: LR, domain: [0.3, 9.7], label: "LRAC", labelX: 6.4 }, { f: sr(2), domain: [0.6, 3.6], color: "muted", label: "SRAC₁", labelX: 0.6 }, { f: sr(5), domain: [3.2, 6.8], color: "muted", label: "SRAC₂", labelX: 4.4 }, { f: sr(8), domain: [6.4, 9.6], color: "muted", label: "SRAC₃", labelX: 9 }],
    texts: [{ at: [0.6, 1.4], text: "economies of scale" }, { at: [5.4, 1.4], text: "diseconomies of scale" }], vlines: [{ x: 5, label: "MES" }] };
  const pcRev = mk("HL: perfectly competitive firm - a price taker, so P = AR = MR = D (horizontal)", { xLabel: "Quantity (firm)", yLabel: "Price, revenue" }, { lines: [ln(0, 5, 6.5, 5, "P = AR = MR = D")] }, { texts: [{ at: [-0.12, 4.85], text: "Pe", anchor: "end" }, { at: [0.5, 7], text: "price set by industry D and S" }] });
  const pcTR = { title: "HL: perfect competition - TR is a straight line from the origin (slope = price)", x: [0, 10], y: [0, 55], origin: false, grid: false, xLabel: "Quantity", yLabel: "TR", curves: [{ f: (q) => 5 * q, domain: [0, 10], label: "TR = P × Q", labelX: 7 }] };
  const arMr = { title: "HL: downward-sloping AR (= D); MR falls twice as fast and is zero where PED = 1", x: [0, 10], y: [-10, 11], grid: false, xLabel: "Quantity", yLabel: "Price, revenue",
    curves: [{ f: (q) => 10 - q, domain: [0, 10], label: "AR = D", labelX: 6.6 }, { f: (q) => 10 - 2 * q, domain: [0, 9.8], color: "b", label: "MR", labelX: 8.4 }], vlines: [{ x: 5, label: "MR = 0, PED = 1" }],
    texts: [{ at: [0.5, 2], text: "PED > 1 (MR > 0)" }, { at: [5.5, 7], text: "PED < 1 (MR < 0)" }] };
  const trtc = { title: "HL: profit is maximised where TR − TC is largest (Q = 3.75, MC = MR); revenue max where TR peaks (Q = 5, MR = 0)", x: [0, 10], y: [-8, 36], grid: false, xLabel: "Quantity", yLabel: "TR, TC, profit",
    curves: [{ f: (q) => 10 * q - q * q, domain: [0, 10], label: "TR", labelX: 8.6 }, { f: (q) => 6 + q + 0.2 * q * q, domain: [0, 10], color: "c", label: "TC", labelX: 8.8 }, { f: (q) => 9 * q - 1.2 * q * q - 6, domain: [0, 8.4], color: "b", dash: true, label: "profit", labelX: 7 }],
    vlines: [{ x: 3.75, label: "π max" }, { x: 5, label: "TR max" }] };
  const shut = { title: "HL: shut-down price = minimum AVC; break-even price = minimum ATC (normal profit)", x: [0, 10], y: [0, 12], origin: false, grid: false, xLabel: "Quantity", yLabel: "Costs, price",
    curves: [{ f: K.avc, domain: [0.5, 10], color: "c", label: "AVC", labelX: 1.5 }, { f: K.atc, domain: [2.4, 10], label: "ATC", labelX: 3.2 }, { f: K.mc, domain: [0.5, 9.2], color: "b", label: "MC", labelX: 8.8 }],
    hlines: [{ y: r2(K.avc(6)), label: "shut-down price" }, { y: r2(K.atc(qAtc)), label: "break-even price" }], points: [{ at: [6, r2(K.avc(6))] }, { at: [r2(qAtc), r2(K.atc(qAtc))] }] };

  T["econ-h1"] = {
    diagrams: [tp, apmp, tcc, unitC, lrac, pcRev, pcTR, arMr, trtc, shut],
    frames: [
      { title: "HL Diagram: law of diminishing marginal returns (TP, AP, MP)", hl: true, paper: "P1", where: "Paper 1(a) part / Paper 2 · 4 marks",
        q: "Using a diagram, explain the law of diminishing marginal returns.",
        marks: [
          ["Diagram", "MP rising then falling (and cutting AP at AP's maximum), labour on the horizontal axis; or TP rising at a decreasing rate", 2],
          ["M1", "in the __short run__ at least one factor is __fixed__ (e.g. capital)"],
          ["M2", "as more units of the variable factor are added, __MP eventually falls__ because each worker has less fixed capital to work with"],
        ],
        diagram: apmp,
        model: "In the short run the firm has a fixed quantity of capital. At first, extra workers allow specialisation, so marginal product rises. Beyond a point (here after the third worker) each additional worker has less capital to work with, so the extra output from each worker falls: marginal returns diminish. TP still rises while MP is positive, but at a decreasing rate, and peaks where MP = 0. MP cuts AP at AP's maximum.",
        accept: "\"diminishing returns to the variable factor\"",
        reject: "confusing diminishing returns (short run) with diseconomies of scale (long run)",
        tip: "Diminishing returns 一定係短期 + 有 fixed factor。" },
      { title: "HL Diagram: total cost, total fixed cost and total variable cost", hl: true, paper: "P2", where: "Paper 2 · 3 marks",
        q: "Draw a diagram showing total fixed cost, total variable cost and total cost in the short run.",
        marks: [
          ["Diagram", "TFC __horizontal__", 1],
          ["Diagram", "TVC from the origin, rising at a decreasing then increasing rate", 1],
          ["Diagram", "TC = TVC shifted up __by TFC__ (starts at TFC on the cost axis, parallel vertical gap)", 1],
        ],
        diagram: tcc,
        model: "Total fixed cost does not vary with output, so it is a horizontal line. Total variable cost starts at zero, rises at a decreasing rate while marginal returns increase and then at an increasing rate once diminishing returns set in. Total cost is TFC + TVC, so it has the same shape as TVC but starts at the level of TFC; the vertical distance between TC and TVC is always TFC.",
        accept: "straight-line TVC if the question gives constant AVC",
        reject: "TC starting at the origin",
        tip: "TC 由 TFC 起步，同 TVC 嘅垂直距離永遠 = TFC。" },
      { title: "HL Diagram: LRAC as the envelope of SRAC curves", hl: true, paper: "P1", where: "Paper 1(a) / Paper 2 · 4 marks",
        q: "Using a diagram, explain the shape of the long-run average cost curve.",
        marks: [
          ["Diagram", "U-shaped LRAC, several SRAC curves __tangent__ to it, economies and diseconomies of scale regions labelled", 2],
          ["M1", "LRAC falls due to __economies of scale__ (specialisation, bulk buying, financial, technical)"],
          ["M2", "it rises beyond the minimum efficient scale due to __diseconomies of scale__ (coordination, communication, motivation problems)"],
        ],
        diagram: lrac,
        model: "In the long run all factors are variable, so the firm can choose the plant size with the lowest average cost for each output. Each SRAC curve represents one plant size; the LRAC is the envelope that touches each SRAC. LRAC falls as output increases because of economies of scale such as specialisation, technical and bulk-buying economies; beyond minimum efficient scale it rises because of diseconomies of scale such as coordination and communication problems in very large firms.",
        accept: "\"minimum efficient scale\"",
        reject: "explaining the LRAC shape with diminishing returns",
        tip: "LRAC 形狀 = economies / diseconomies of scale；SRAC 形狀 = diminishing returns。" },
      { title: "HL Diagram: AR and MR for a firm with market power", hl: true, paper: "P2", where: "Paper 2 · 3-4 marks",
        q: "Draw AR and MR curves for a firm facing a downward-sloping demand curve and explain the relationship between MR and PED.",
        marks: [
          ["Diagram", "AR = D downward sloping; __MR below AR with twice the slope__, cutting the Q axis at half the AR intercept", 2],
          ["M1", "MR < AR because to sell another unit the firm must __lower the price on all units__"],
          ["M2", "MR > 0 where demand is __elastic__, MR = 0 where __PED = 1__ (TR max), MR < 0 where inelastic"],
        ],
        diagram: arMr,
        model: "The firm's demand curve is its average revenue curve. To sell an extra unit it must cut the price of all units, so marginal revenue is below average revenue; with linear demand MR has twice the slope and bisects the horizontal distance to AR. Where demand is elastic a price cut raises TR, so MR is positive; at PED = 1 TR is at its maximum and MR = 0; where demand is inelastic MR is negative.",
        accept: "MR = ΔTR / ΔQ",
        reject: "MR drawn parallel to AR",
        tip: "MR 斜率係 AR 嘅兩倍，喺 Q 軸中點穿過。" },
      { title: "HL Diagram: shut-down and break-even prices", hl: true, paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a cost diagram, identify a firm's short-run shut-down price and break-even price, and explain why they differ.",
        marks: [
          ["Diagram", "MC, AVC and ATC with MC through both minima; shut-down price at __min AVC__, break-even price at __min ATC__", 2],
          ["M1", "below min AVC, revenue does not even cover variable costs, so the firm minimises losses by __shutting down__ (loss = fixed costs)"],
          ["M2", "at min ATC price covers all costs: __normal profit__ (break-even); between the two the firm makes a loss but stays open in the short run"],
        ],
        diagram: shut,
        model: "The break-even price is at the minimum of ATC: at that price total revenue just covers total cost and the firm earns normal profit. The short-run shut-down price is at the minimum of AVC. Between the two prices the firm makes a loss but covers its variable costs and contributes something to fixed costs, so it keeps producing in the short run. Below min AVC it would lose more by producing than by closing, so it shuts down. In the long run it must cover ATC or leave the industry.",
        accept: "\"loss-minimising\" output",
        reject: "shutting down as soon as price < ATC in the short run",
        tip: "短期：P < AVC 先關門；長期：P < ATC 就離場。" },
      { title: "HL Diagram: profit maximisation using TR and TC", hl: true, paper: "P3", where: "Paper 3 / Paper 2 · 3 marks",
        q: "Using a diagram of total revenue and total cost, show the profit-maximising and revenue-maximising levels of output.",
        marks: [
          ["Diagram", "TR hill and TC curve; profit max where the __vertical gap TR − TC is largest__ (slopes equal: MC = MR)", 2],
          ["Diagram", "revenue max at the __peak of TR__ (MR = 0), at a higher output", 1],
        ],
        diagram: trtc,
        model: "Profit is the vertical distance between TR and TC. It is greatest where the slopes of the two curves are equal - where MR = MC (here Q = 3.75). Total revenue is maximised at the top of the TR curve, where MR = 0 (Q = 5), which is a higher output and lower price than the profit-maximising position.",
        accept: "profit curve drawn below",
        reject: "profit max where TR = TC (that is break-even)",
        tip: "TR = TC 係 break-even，唔係利潤最高！" },
    ],
    concepts: [
      { h: "HL: cost-curve drawing rules", b: "<ul><li>MC cuts AVC and ATC at their <strong>minimum points</strong> (from below).</li><li>The gap ATC − AVC = AFC, which falls as output rises, so AVC and ATC get closer together.</li><li>Minimum AVC is at a <strong>lower output</strong> than minimum ATC.</li><li>MP and MC are mirror images: when MP is rising MC is falling.</li><li>SRAC is U-shaped because of diminishing returns; LRAC because of economies then diseconomies of scale.</li></ul>" },
    ],
  };

  // =====================================================================
  // econ-h2 Market structures (HL)
  // =====================================================================
  // generic firm figure: AR = a − bQ (or horizontal), cost family; shades profit (green) or loss (red)
  const firmFig = (id, label, o) => {
    const K2 = costs(o.F, o.c0, o.c1, o.c2), ar = (q) => o.a - o.b * q, mr = (q) => o.a - 2 * o.b * q;
    const q = root((x) => K2.mc(x) - mr(x), o.lo || 3, 9.9), p = ar(q), c = K2.atc(q);
    return fig1(id, label, "Quantity", "Price, costs", (P) =>
      P.pg([[0, p], [q, p], [q, c], [0, c]], p >= c ? C : R, 0.4) +
      P.fn(K2.mc, 0.6, 10, B) + P.fn(K2.atc, 1.2, 10, A) + P.fn(ar, 0, Math.min(10, o.a / o.b), "currentColor") + P.fn(mr, 0, o.a / (2 * o.b), M) +
      P.t(root((x) => K2.mc(x) - 9.3, 4, 12), 9.3, "MC", { c: B, dx: 6 }) + P.t(10, K2.atc(10), "ATC", { dx: 2, dy: -6, a: "end" }) +
      P.t(Math.min(9.6, o.a / o.b - 0.4), ar(Math.min(9.6, o.a / o.b - 0.4)), "AR = D", { dy: -6, s: 11 }) + P.t(o.a / (2 * o.b), 0, "MR", { dx: 4, dy: -6, s: 11 }) +
      P.g(q, p, "P", "Q*") + P.g(q, c, "ATC", "") + P.dot(q, mr(q)) + P.t(q, mr(q), "MC = MR", { dx: -6, dy: 4, s: 11, a: "end" }) +
      P.t(q / 2, (p + c) / 2, p >= c ? "profit" : "loss", { a: "middle", dy: 4, s: 11, b: true }));
  };
  const monoLoss = firmFig("ar-econh2-1", "Monopoly making a short-run loss", { F: 20, a: 6, b: 0.5, lo: 4, note: "AR < ATC at MC = MR: loss (AR > AVC, so stay open)" });
  const mcSR = firmFig("ar-econh2-2", "Monopolistic competition: short-run abnormal profit", { F: 12, a: 10, b: 0.8, lo: 3, note: "short run: AR > ATC → abnormal profit attracts entry" });
  // perfect competition long-run adjustment (two panels)
  const pMin = K.atc(qAtc), P1 = 7, q1 = root((x) => K.mc(x) - P1, 4.1, 10), c1 = K.atc(q1);
  const Dind = (x) => 11.5 - x, S1 = (x) => x + 2.5, s2c = pMin - (11.5 - pMin), S2 = (x) => x + s2c;
  const pcLR = fig2("ar-econh2-3", "Perfect competition: abnormal profit attracts entry until price falls to minimum ATC",
    { h: "Industry", xl: "Q (industry)", yl: "Price", draw: (P) => P.fn(Dind, 1.5, 10) + P.fn(S1, 0, 7.5, C) + P.fn(S2, 1 - s2c, 10, B) + P.t(9.6, Dind(9.6), "D", { dy: -6 }) + P.t(7.4, 9.9, "S₁", { c: C, a: "end", dx: -4 }) + P.t(10, S2(10), "S₂", { c: B, dx: -8, dy: -6 }) +
      P.g(4.5, P1, "P₁", "Q₁") + P.g(11.5 - pMin, pMin, "P₂", "Q₂") + P.ar(5.2, 9.2, 7.2, 9.2, "ar-econh2-3") + P.t(5.2, 9.6, "entry", { s: 11 }) },
    { h: "Typical firm", xl: "q (firm)", yl: "Price, costs", draw: (P) => P.pg([[0, P1], [q1, P1], [q1, c1], [0, c1]], C, 0.4) + P.fn(K.mc, 0.6, 9.5, B) + P.fn(K.atc, 2.2, 10) +
      `<line x1="${P.X(0)}" y1="${P.Y(P1)}" x2="${P.X(10)}" y2="${P.Y(P1)}" stroke="currentColor" stroke-width="1.6"/><line x1="${P.X(0)}" y1="${P.Y(pMin)}" x2="${P.X(10)}" y2="${P.Y(pMin)}" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>` +
      P.t(10, P1, "AR₁ = MR₁", { a: "end", dy: -4, s: 11 }) + P.t(10, pMin, "AR₂ = MR₂", { a: "end", dy: 14, s: 11 }) + P.t(8.9, 10, "MC", { c: B, dy: 2 }) + P.t(10, K.atc(10), "ATC", { a: "end", dy: -6, dx: -16 }) +
      P.g(q1, P1, "", "q₁") + P.g(qAtc, pMin, "", "q₂") + P.t(2.3, (P1 + c1) / 2, "abnormal", { s: 10, dy: 4 }) });
  const pcShut = mk("HL: perfect competition - price below minimum AVC: the firm shuts down even in the short run", { xLabel: "Quantity (firm)", yLabel: "Price, costs", y: [0, 12],
    curves: [{ f: K.avc, domain: [0.5, 10], color: "c", label: "AVC", labelX: 9.3 }, { f: K.atc, domain: [2.4, 10], label: "ATC", labelX: 9.3 }, { f: K.mc, domain: [0.5, 9.2], color: "b", label: "MC", labelX: 8.8 }],
    lines: [ln(0, 2, 7, 2, "P = AR = MR")], texts: [{ at: [0.3, 0.5], text: "P < min AVC (2.4): shut down" }] });
  const monoEos = { title: "HL: monopoly with large economies of scale (MC₂ lower) can charge less and sell more than a competitive industry (MC₁)", x: [0, 20], y: [0, 10], origin: false, grid: false, xLabel: "Quantity", yLabel: "Price, costs",
    curves: [{ f: (q) => 10 - q / 2, domain: [0, 20], label: "D = AR", labelX: 15 }, { f: (q) => 10 - q, domain: [0, 10], color: "muted", label: "MR", labelX: 8.2 }],
    lines: [ln(0, 6, 13, 6, "MC₁ (competitive)", "c"), ln(0, 1, 13, 1, "MC₂ (monopoly)", "b"), ln(8, 0, 8, 6, "", "muted", true), ln(9, 0, 9, 5.5, "", "muted", true), ln(0, 5.5, 9, 5.5, "", "muted", true)],
    points: [{ at: [8, 6], label: "Pc" }, { at: [9, 5.5], label: "Pm" }], texts: [{ at: [8, -0.6], text: "Qc", anchor: "middle" }, { at: [9.4, -0.6], text: "Qm", anchor: "start" }] };
  const game = wrap(420, 250, "ar-econh2-4", "Payoff matrix for two firms choosing high or low prices (prisoner's dilemma)",
    tx(270, 18, "Firm B", { a: "middle", b: true }) + tx(195, 42, "High price", { a: "middle" }) + tx(335, 42, "Low price", { a: "middle" }) +
    `<text x="18" y="140" font-size="12" font-weight="bold" transform="rotate(-90 18 140)" text-anchor="middle">Firm A</text>` + tx(90, 95, "High price", { a: "end" }) + tx(90, 185, "Low price", { a: "end" }) +
    `<rect x="265" y="140" width="140" height="90" fill="${A}" fill-opacity="0.25"/>` +
    [[125, 50], [265, 50], [125, 140], [265, 140]].map((p) => `<rect x="${p[0]}" y="${p[1]}" width="140" height="90" fill="none" stroke="currentColor" stroke-width="1.3"/>`).join("") +
    [[195, 95, "A: 10 , B: 10"], [335, 95, "A: 2 , B: 14"], [195, 185, "A: 14 , B: 2"], [335, 185, "A: 5 , B: 5"]].map((c) => tx(c[0], c[1], c[2], { a: "middle" })).join("") +
    tx(335, 205, "Nash equilibrium", { a: "middle", s: 11, b: true }) + tx(195, 112, "best joint (collusion)", { a: "middle", s: 11 }) +
    tx(210, 246, "Low is dominant for both: 14 > 10 and 5 > 2 (profits, $m)", { a: "middle", s: 11 }));
  const spectrum = wrap(540, 190, "ar-econh2-5", "Spectrum of market structures",
    arw([[20, 30], [520, 30]], "ar-econh2-5") + tx(20, 20, "many firms, no market power", { s: 11 }) + tx(520, 20, "one firm, high market power", { s: 11, a: "end" }) +
    [["Perfect competition", "very many firms", "identical product", "no barriers", "price taker"], ["Monopolistic comp.", "many firms", "differentiated", "low barriers", "some power"], ["Oligopoly", "few large firms", "interdependent", "high barriers", "collusion?"], ["Monopoly", "single firm", "no close subs.", "very high barriers", "price maker"]].map((r, i) =>
      box(15 + i * 130, 46, 120, 136, r, { s: 11 })).join(""));

  T["econ-h2"] = {
    diagrams: [pcShut, monoEos],
    figures: [
      { title: "Perfect competition: long-run adjustment to normal profit", caption: "Abnormal profit at P₁ attracts new firms; industry supply shifts right until price equals minimum ATC (P = MC = min ATC: productively and allocatively efficient).", svg: pcLR },
      { title: "Monopoly making a loss", caption: "Output where MC = MR; price read off AR. Here AR < ATC, so the firm makes a loss (red), but as AR > AVC it continues in the short run.", svg: monoLoss },
      { title: "Monopolistic competition: short-run abnormal profit", caption: "Like monopoly in the short run; low barriers mean entry shifts each firm's AR left until AR is tangent to ATC (normal profit) in the long run.", svg: mcSR },
      { title: "Game theory payoff matrix", caption: "Whatever B does, A earns more by pricing low (and vice versa), so both choose low (5, 5) even though (10, 10) is better for both: a prisoner's dilemma that explains collusion and cheating.", svg: game },
      { title: "Spectrum of market structures", caption: "Use number of firms, product type, barriers to entry and market power to classify a market.", svg: spectrum },
    ],
    frames: [
      { title: "HL Diagram: long-run adjustment in perfect competition (industry and firm)", hl: true, paper: "P1", where: "Paper 1(a) [10] · side-by-side diagrams",
        q: "Using diagrams, explain how firms in a perfectly competitive market making abnormal profits will move to long-run equilibrium.",
        marks: [
          ["Diagram", "__two panels__: industry D and S₁ → S₂ with price falling P₁ → P₂; firm with MC, ATC and AR = MR at P₁ and P₂", 2],
          ["Diagram", "abnormal profit shaded at P₁; final position __P = min ATC__ (normal profit) at q₂", 1],
          ["M1", "abnormal profit signals profits; with __no barriers to entry__, new firms enter"],
          ["M2", "industry supply shifts right, so the market price falls, shifting each firm's AR = MR down"],
          ["M3", "entry stops when price = __minimum ATC__: normal profit; P = MC (allocative) and min ATC (productive efficiency)"],
        ],
        svg: pcLR,
        model: "At price P₁, set by industry demand and supply, each firm produces where MC = MR at q₁. Because P₁ is above ATC, firms make abnormal profit (shaded). With perfect information and no barriers to entry, new firms enter the industry, shifting industry supply from S₁ to S₂ and lowering the price to P₂. Each firm's AR = MR line falls with price. Entry continues until price equals minimum ATC, where firms earn only normal profit. In long-run equilibrium P = MC (allocative efficiency) and production is at minimum ATC (productive efficiency).",
        accept: "\"price taker\"; MC = MR at both prices",
        reject: "the individual firm's demand curve shifting because of its own decisions",
        tip: "一定要兩個圖並排：左邊 industry（S 右移）、右邊 firm（價錢跌到 min ATC）。" },
      { title: "HL Diagram: monopoly making a loss", hl: true, paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain how a monopolist could make a loss in the short run.",
        marks: [
          ["Diagram", "AR, MR, MC and ATC with output where __MC = MR__, price on AR and __ATC above AR__ at that output; loss area shaded", 2],
          ["M1", "the monopolist maximises profit / minimises loss where MC = MR and charges the price on the demand (AR) curve"],
          ["M2", "if demand is weak or costs high, ATC > AR, so loss = (ATC − AR) × Q; it continues if AR covers AVC"],
        ],
        svg: monoLoss,
        model: "A monopolist produces where MC = MR and sets the highest price consumers will pay for that output, read from the AR curve. If demand is low relative to costs - for example after a fall in demand - ATC at that output is above AR, so the firm makes a loss equal to (ATC − P) × Q, shown by the shaded rectangle. In the short run it continues to produce as long as price covers average variable cost; in the long run it would leave the market unless demand recovers or costs fall.",
        accept: "\"loss-minimising\"",
        reject: "assuming a monopoly always makes abnormal profit",
        tip: "Monopoly 都可以蝕：AR 喺 ATC 下面就係 loss。" },
      { title: "HL Diagram: monopolistic competition in the short run", hl: true, paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain the short-run equilibrium of a firm in monopolistic competition and why it will not last.",
        marks: [
          ["Diagram", "downward-sloping AR (relatively elastic), MR, MC, ATC; Q at MC = MR; __abnormal profit__ shaded", 2],
          ["M1", "product differentiation gives the firm __some price-setting power__ so AR slopes down"],
          ["M2", "low barriers mean __new firms enter__, so each firm's demand falls (AR shifts left) until AR is tangent to ATC: normal profit"],
        ],
        svg: mcSR,
        model: "Because each firm sells a differentiated product, it faces a downward-sloping, relatively elastic demand curve. It produces where MC = MR and sets the price on AR; in the short run AR is above ATC, so it earns abnormal profit. As barriers to entry are low, new firms enter with similar products, each existing firm's demand falls and becomes more elastic, and AR shifts left until it is tangent to ATC - leaving only normal profit in the long run.",
        accept: "advertising/branding as the source of differentiation",
        reject: "a horizontal AR",
        tip: "短期同 monopoly 一樣圖；長期 AR 切 ATC（tangent）。" },
      { title: "HL Diagram: monopoly vs perfect competition with economies of scale", hl: true, paper: "P1", where: "Paper 1(b) [15] evaluation diagram",
        q: "Using a diagram, explain why a monopoly may charge a lower price and produce more than a competitive industry.",
        marks: [
          ["Diagram", "D = AR and MR; competitive MC₁ with Pc, Qc where D = MC₁; monopoly __lower MC₂__ with Qm at MC₂ = MR and Pm read from AR, Pm < Pc and Qm > Qc", 2],
          ["M1", "a single large firm can exploit __economies of scale__ (or natural monopoly) so its costs are much lower"],
          ["M2", "even after restricting output to MC = MR, the price can be __below the competitive price__; also abnormal profits may fund R&D (__dynamic efficiency__)"],
        ],
        diagram: monoEos,
        model: "In a competitive industry, price and output are set where demand meets MC₁, at Pc and Qc. A monopolist produces where MC = MR, which normally means a higher price; but if its scale gives it large economies of scale, its marginal cost MC₂ is much lower. Producing where MC₂ = MR gives output Qm and a price Pm read from AR. If the cost saving is large enough, Pm is below Pc and Qm above Qc, so consumers can benefit from monopoly. Abnormal profits may also be used for research and development, giving dynamic efficiency.",
        accept: "natural monopoly argument",
        reject: "claiming monopolies are always allocatively efficient",
        tip: "評價 monopoly 必用：economies of scale + dynamic efficiency。" },
      { title: "HL Diagram: short-run shut-down in perfect competition", hl: true, paper: "P2", where: "Paper 2 · 3-4 marks",
        q: "Using a diagram, explain why a perfectly competitive firm will shut down if the price falls below minimum average variable cost.",
        marks: [
          ["Diagram", "firm's MC, AVC, ATC; P = AR = MR __below min AVC__", 2],
          ["M1", "at any output, revenue is less than variable costs, so producing adds to the loss"],
          ["M2", "shutting down limits the loss to __fixed costs__, so the firm shuts down"],
        ],
        diagram: pcShut,
        model: "When price is below minimum AVC, total revenue at every output is less than total variable cost. Producing would mean losing all fixed costs plus part of the variable costs, while shutting down limits the loss to fixed costs. So the firm minimises losses by shutting down. If price were between min AVC and min ATC, it would keep producing in the short run.",
        accept: "\"shut-down point at min AVC\"",
        reject: "shutting down whenever there is a loss",
        tip: "P < AVC → 關門；AVC < P < ATC → 照做（蝕少啲）。" },
    ],
    concepts: [
      { h: "HL: efficiency checklist for each market structure", b: "<ul><li><strong>Allocative efficiency</strong>: P = MC. <strong>Productive efficiency</strong>: output at minimum ATC.</li><li>Perfect competition long run: both achieved.</li><li>Monopoly / monopolistic competition: P > MC (allocatively inefficient) and not at min ATC (excess capacity in monopolistic competition).</li><li>Monopoly may still have <strong>dynamic efficiency</strong> (R&amp;D funded by abnormal profit) and lower costs from economies of scale.</li><li>In oligopoly, collusion makes firms act like a monopoly; game theory shows the incentive to cheat.</li></ul>" },
    ],
  };

  // =====================================================================
  // econ-6 Government intervention
  // =====================================================================
  const taxFig = fig1("ar-econ6-1", "Specific tax: incidence, government revenue and welfare loss", "Quantity", "Price", (P) =>
    P.pg([[0, 6], [3, 6], [3, 5], [0, 5]], B, 0.45) + P.pg([[0, 5], [3, 5], [3, 4], [0, 4]], C, 0.45) + P.pg([[3, 6], [3, 4], [4, 5]], R, 0.45) +
    P.fn(Dm, 0, 8.2) + P.fn(Sm, 0, 8.4, C) + P.fn((q) => 3 + q, 0, 6.6, B) + P.t(8.2, Dm(8.2), "D", { dx: 4, dy: -4 }) + P.t(8.4, Sm(8.4), "S", { dx: 4, c: C }) + P.t(6.6, 9.6, "S + tax", { dx: -6, dy: 4, a: "end", c: B }) +
    P.g(3, 6, "Pc", "Qt") + P.g(4, 5, "Pe", "Qe") + P.g(3, 4, "Pp", "") +
    P.t(1.5, 5.5, "consumers", { a: "middle", dy: 4, s: 10 }) + P.t(1.5, 4.5, "producers", { a: "middle", dy: 4, s: 10 }) + P.t(3.9, 5, "WL", { dx: -12, dy: 4, s: 10, b: true }));
  const advTax = mk("Ad valorem (%) tax: S + tax diverges from S because the tax rises with price", { points: [{ at: [4, 5], label: "E₁" }, { at: [3, 6], label: "E₂" }] },
    { lines: [ln(0, 9, 8.5, 0.5, "D"), ln(0, 1, 8.5, 9.5, "S", "c"), ln(0, 1.5, 5.7, 10, "S + tax (%)", "b")] }, gq(3, 6, "Pc", "Qt"), gq(3, 4, "Pp", ""), gq(4, 5, "Pe", "Qe"));
  const taxEl = mk("Specific tax with elastic demand: producers bear most of the tax (Pe − Pp > Pc − Pe)", { points: [{ at: [4.125, 5.125] }, { at: [1.875, 5.875] }] },
    { lines: [ln(0, 6.5, 9.5, 3.33, "D (elastic)"), ln(0, 1, 7.5, 8.5, "S", "c"), ln(0, 4, 5.5, 9.5, "S + tax", "b")] },
    gq(1.875, 5.875, "Pc", "Qt"), gq(4.125, 5.125, "Pe", "Qe"), gq(1.875, 2.875, "Pp", ""));
  const subFig = fig1("ar-econ6-2", "Subsidy: government spending and welfare loss", "Quantity", "Price", (P) =>
    P.pg([[0, 6], [5, 6], [5, 4], [0, 4]], B, 0.35) + P.pg([[4, 5], [5, 6], [5, 4]], R, 0.5) +
    P.fn(Dm, 0, 8.2) + P.fn(Sm, 0, 8.4, C) + P.fn((q) => q - 1, 1, 9.5, B) + P.t(8.2, Dm(8.2), "D", { dx: 4, dy: -4 }) + P.t(8.4, Sm(8.4), "S", { dx: 4, c: C }) + P.t(7, 6, "S − subsidy", { dx: 8, dy: 14, c: B }) +
    P.g(5, 6, "Pp", "Qs") + P.g(4, 5, "Pe", "Qe") + P.g(5, 4, "Pc", "") + P.t(2.2, 5, "gov. spending", { a: "middle", dy: 4, s: 11 }) + P.t(5.1, 5, "WL", { dy: 4, s: 10, b: true }));
  const ceilFig = fig1("ar-econ6-3", "Price ceiling: shortage and welfare loss", "Quantity", "Price", (P) =>
    P.pg([[2, 7], [2, 3], [4, 5]], R, 0.45) + P.fn(Dm, 0, 8.2) + P.fn(Sm, 0, 8.4, C) + P.t(8.2, Dm(8.2), "D", { dx: 4, dy: -4 }) + P.t(8.4, Sm(8.4), "S", { dx: 4, c: C }) +
    `<line x1="${P.X(0)}" y1="${P.Y(3)}" x2="${P.X(9.6)}" y2="${P.Y(3)}" stroke="${B}" stroke-width="2"/>` + P.t(9.6, 3, "Pmax", { a: "end", dy: -5, c: B }) +
    P.g(2, 3, "", "Qs") + P.g(6, 3, "", "Qd") + P.g(4, 5, "Pe", "Qe") + P.g(2, 7, "", "") + P.ar(2.1, 2.2, 5.9, 2.2, "ar-econ6-3") + P.ar(5.9, 2.2, 2.1, 2.2, "ar-econ6-3") + P.t(4, 1.4, "shortage", { a: "middle", s: 11 }) +
    P.t(2.5, 5, "WL", { dy: 4, s: 10, b: true }));
  const floorFig = fig1("ar-econ6-4", "Price floor: surplus bought by the government", "Quantity", "Price", (P) =>
    P.pg([[2, 7], [6, 7], [6, 0], [2, 0]], B, 0.3) + P.fn(Dm, 0, 8.2) + P.fn(Sm, 0, 8.4, C) + P.t(8.2, Dm(8.2), "D", { dx: 4, dy: -4 }) + P.t(8.4, Sm(8.4), "S", { dx: 4, c: C }) +
    `<line x1="${P.X(0)}" y1="${P.Y(7)}" x2="${P.X(9.6)}" y2="${P.Y(7)}" stroke="${R}" stroke-width="2"/>` + P.t(9.6, 7, "Pmin", { a: "end", dy: -5, c: R }) +
    P.g(2, 7, "", "Qd") + P.g(6, 7, "", "Qs") + P.g(4, 5, "Pe", "Qe") + P.ar(2.1, 7.6, 5.9, 7.6, "ar-econ6-4") + P.ar(5.9, 7.6, 2.1, 7.6, "ar-econ6-4") + P.t(4, 8, "surplus", { a: "middle", s: 11 }) +
    P.t(4, 2, "gov. spending", { a: "middle", s: 11 }) + P.t(4, 1.2, "= Pmin × (Qs − Qd)", { a: "middle", s: 11 }));

  T["econ-6"] = {
    diagrams: [advTax, taxEl],
    figures: [
      { title: "Specific tax: who pays, revenue and welfare loss", caption: "Blue = consumers' share (Pc − Pe) × Qt; green = producers' share (Pe − Pp) × Qt; together = tax revenue. Red triangle = welfare loss (if the market was efficient before).", svg: taxFig },
      { title: "Subsidy: government spending and welfare loss", caption: "Consumers pay Pc, producers receive Pp; gov. spending is the whole rectangle (Pp − Pc) × Qs. Without an externality, over-production gives the red welfare loss.", svg: subFig },
      { title: "Price ceiling (maximum price)", caption: "Set below Pe: Qd > Qs, shortage. Fewer units traded (Qs) → welfare loss between D and S from Qs to Qe.", svg: ceilFig },
      { title: "Price floor with government buying the surplus", caption: "Set above Pe: Qs > Qd. If the government buys the surplus, its spending is Pmin × (Qs − Qd), plus storage or disposal costs.", svg: floorFig },
    ],
    frames: [
      { title: "Diagram: shade tax revenue, incidence and welfare loss", paper: "P2", where: "Paper 2 · 4 marks · \"Using a diagram, explain the effect of a tax on stakeholders\"",
        q: "Using a diagram, explain the effect of a specific tax on consumers, producers and the government.",
        marks: [
          ["Diagram", "S → S + tax (parallel, vertical distance = tax), Pc, Pp, Pe, Qe, Qt; __tax revenue__ (Pc − Pp) × Qt and __welfare loss__ shaded", 2],
          ["M1", "consumers pay a higher price (Pe → Pc) and buy less; producers receive less per unit (Pe → Pp) and sell less"],
          ["M2", "government gains revenue (Pc − Pp) × Qt; society loses the __welfare loss triangle__ (if no externality)"],
        ],
        svg: taxFig,
        model: "A specific tax shifts supply vertically upward by the amount of the tax, from S to S + tax. The price paid by consumers rises from Pe to Pc and quantity falls from Qe to Qt. Producers receive Pp, the price minus the tax, which is lower than Pe. The consumers' share of the tax is (Pc − Pe) × Qt and the producers' share is (Pe − Pp) × Qt; the total, (Pc − Pp) × Qt, is government revenue. Because fewer units are traded, community surplus falls by the welfare loss triangle between Qt and Qe.",
        accept: "\"incidence\" / \"burden\"",
        reject: "Pp shown above Pe; shading revenue as a triangle",
        tip: "Revenue 長方形：高 = 稅（Pc − Pp），闊 = Qt（新數量，唔係 Qe）。" },
      { title: "Diagram: ad valorem tax", paper: "P2", where: "Paper 2 · 2-4 marks",
        q: "Draw a diagram to show the effect of an ad valorem tax and explain how it differs from a specific tax.",
        marks: [
          ["Diagram", "S + tax __diverging__ from S (gap grows as price rises), Pc, Pp, Qt marked", 2],
          ["M1", "an ad valorem tax is a __percentage of the price__, so the tax per unit is larger at higher prices"],
          ["M2", "a specific tax is a __fixed amount per unit__, giving a parallel shift"],
        ],
        diagram: advTax,
        model: "An ad valorem tax, such as VAT, is levied as a percentage of the price. Because the tax per unit is bigger at higher prices, the S + tax curve is not parallel: it diverges from S as price rises. Consumers pay Pc, producers receive Pp and quantity falls to Qt. A specific tax is a fixed amount per unit, so it shifts supply up by the same vertical distance at every quantity.",
        accept: "\"pivots\" upwards",
        reject: "a parallel shift for an ad valorem tax",
        tip: "Ad valorem = 百分比 → 越高價稅越多 → S 斜向散開。" },
      { title: "Diagram: tax incidence when demand is elastic", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain why producers bear most of an indirect tax when demand is price elastic.",
        marks: [
          ["Diagram", "relatively __flat D__, S → S + tax, Pc only slightly above Pe, Pp well below Pe", 2],
          ["M1", "with elastic demand consumers would cut purchases sharply if price rose, so producers __cannot pass on__ much of the tax"],
          ["M2", "so the price rises only a little (small consumer share) while the price producers keep falls a lot (large producer share)"],
        ],
        diagram: taxEl,
        model: "When demand is price elastic, consumers are very responsive to price rises because good substitutes exist. If producers tried to pass the whole tax on, quantity demanded would fall sharply, so the price paid by consumers rises only a little, from Pe to Pc. Most of the tax is absorbed by producers, whose price received falls from Pe to Pp. The producers' share (Pe − Pp) × Qt is larger than the consumers' share (Pc − Pe) × Qt.",
        accept: "comparison with the inelastic case",
        reject: "flat S instead of flat D",
        tip: "D 越 elastic → 生產者負擔越多；D 越 inelastic → 消費者負擔越多。" },
      { title: "Diagram: subsidy and government expenditure", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain the effects of a per-unit subsidy on consumers, producers and the government.",
        marks: [
          ["Diagram", "S → S − subsidy (down/right), Pc below Pe, Pp above Pe, Qs > Qe; __government spending__ (Pp − Pc) × Qs shaded", 2],
          ["M1", "consumers pay a lower price and buy more; producers receive more per unit and sell more"],
          ["M2", "the government pays (Pp − Pc) × Qs, which has an __opportunity cost__; over-production may cause a welfare loss"],
        ],
        svg: subFig,
        model: "A per-unit subsidy lowers firms' costs, shifting supply down by the amount of the subsidy to S − subsidy. Consumers now pay Pc, below Pe, and quantity rises to Qs. Producers receive Pc plus the subsidy, Pp, which is above Pe, so their revenue rises. The government spends (Pp − Pc) × Qs, money that could have been used elsewhere. If the market was efficient before, the extra output beyond Qe creates a welfare loss.",
        accept: "\"S shifts right\"",
        reject: "spending rectangle drawn with width Qe",
        tip: "Subsidy 開支 = 每單位補貼 × 新數量 Qs。" },
      { title: "Diagram: price ceiling - shortage and welfare loss", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain the consequences of a maximum price on rented housing.",
        marks: [
          ["Diagram", "Pmax __below Pe__, Qs and Qd marked, __shortage__ Qd − Qs, welfare loss triangle between Qs and Qe", 2],
          ["M1", "lower rent extends quantity demanded but landlords supply less, causing a __shortage__"],
          ["M2", "consequences: queues/waiting lists, __black markets__, lower quality; welfare loss as fewer units are traded"],
        ],
        svg: ceilFig,
        model: "A maximum rent Pmax set below the equilibrium makes housing cheaper for tenants who find a flat, but at that price quantity demanded (Qd) exceeds quantity supplied (Qs), so there is a shortage. Only Qs is traded, so tenants queue or use waiting lists, illegal side payments and black markets appear, and landlords have less incentive to maintain properties. Because output falls from Qe to Qs, there is a welfare loss (the triangle between D and S).",
        accept: "consumer surplus transferred from landlords to tenants",
        reject: "Pmax drawn above Pe",
        tip: "Ceiling 一定喺 Pe 下面先有效；數量睇 Qs（較細嗰個）。" },
      { title: "Diagram: price floor and government purchase of the surplus", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain the cost to the government of a minimum price scheme for wheat.",
        marks: [
          ["Diagram", "Pmin __above Pe__, Qd and Qs, surplus Qs − Qd; government spending rectangle __Pmin × (Qs − Qd)__ shaded", 2],
          ["M1", "the higher price extends supply and contracts demand, creating a __surplus__"],
          ["M2", "to keep the price at Pmin the government must __buy the surplus__, costing Pmin × (Qs − Qd) plus storage; an opportunity cost"],
        ],
        svg: floorFig,
        model: "A minimum price Pmin above equilibrium raises the price farmers receive, so quantity supplied extends to Qs while quantity demanded contracts to Qd. The resulting surplus (Qs − Qd) would push the price down, so the government must buy it. Its spending equals Pmin × (Qs − Qd), shown by the shaded rectangle, plus storage or disposal costs. This money has an opportunity cost, and surplus stock may be dumped abroad.",
        accept: "\"intervention buying\"",
        reject: "spending rectangle using Pe",
        tip: "Floor 開支 = Pmin × 剩餘量（Qs − Qd），長方形一直落到 Q 軸。" },
    ],
    concepts: [
      { h: "Areas to identify on intervention diagrams", b: "<ul><li><strong>Tax revenue</strong> = tax per unit × new quantity (Pc − Pp) × Qt.</li><li><strong>Subsidy cost</strong> = subsidy per unit × new quantity (Pp − Pc) × Qs.</li><li><strong>Price floor</strong>: government purchase = Pmin × (Qs − Qd).</li><li><strong>Welfare loss</strong> is always a triangle with its apex at the original (efficient) equilibrium.</li><li>Incidence: the more inelastic side of the market bears more of a tax and gains more from a subsidy.</li></ul>" },
    ],
  };

  // =====================================================================
  // econ-7 Externalities and common pool resources
  // =====================================================================
  const extFig = (id, label, o) => fig1(id, label, "Quantity", "Costs, benefits", (P) =>
    (o.wl ? P.pg(o.wl, R, 0.45) : "") + o.curves.map((c) => P.fn(c[0], c[1], c[2], c[3], 2, c[7]) + P.t(c[2], c[0](c[2]), c[4], { dx: c[5] || 4, dy: c[6] || 0, c: c[3], s: 11 })).join("") +
    o.g.map((g) => P.g(g[0], g[1], g[2], g[3])).join("") + (o.extra ? o.extra(P) : ""));
  const negProd = extFig("ar-econ7-1", "Negative production externality with welfare loss shaded", {
    wl: [[3, 6], [4, 7], [4, 5]], curves: [[Dm, 0, 8.4, A, "MPB = MSB"], [Sm, 0, 7.6, C, "MPC"], [(q) => 3 + q, 0, 6.6, B, "MSC"]],
    g: [[4, 5, "Pm", "Qm"], [3, 6, "Popt", "Qopt"]], extra: (P) => P.t(4.2, 6, "WL", { s: 10, b: true, c: R }) + P.t(5.2, 2.2, "MSC − MPC = external cost", { s: 11 }) });
  const carbonTax = extFig("ar-econ7-2", "Pigouvian (carbon) tax moves output to the social optimum", {
    curves: [[Dm, 0, 8.4, A, "MPB = MSB"], [Sm, 0, 7.6, C, "MPC"], [(q) => 3 + q, 0, 6.6, B, "MPC + tax = MSC"]],
    g: [[4, 5, "Pm", "Qm"], [3, 6, "Pc", "Qopt"]], extra: (P) => P.ar(6, 7.15, 6, 8.75, "ar-econ7-2") + P.t(6.15, 7.7, "tax = external cost", { s: 11 }) + P.t(4.6, 1.4, "Q falls Qm → Qopt; WL removed", { s: 11 }) });
  const posCons = extFig("ar-econ7-3", "Positive consumption externality with welfare loss shaded", {
    wl: [[3.5, 6.5], [3.5, 4.5], [4.5, 5.5]], curves: [[(q) => 8 - q, 0, 7.6, A, "MPB"], [(q) => 10 - q, 0, 9.2, B, "MSB", 4, -4], [Sm, 0, 8.4, C, "MPC = MSC", 4, 12]],
    g: [[3.5, 4.5, "Pm", "Qm"], [4.5, 5.5, "Popt", "Qopt"]], extra: (P) => P.t(3.6, 5.4, "WL", { s: 10, b: true, c: R }) });
  const vacSub = extFig("ar-econ7-4", "Subsidy corrects a positive consumption externality", {
    curves: [[(q) => 8 - q, 0, 7.6, A, "MPB"], [(q) => 10 - q, 0, 9.2, B, "MSB", 4, -4], [Sm, 0, 8.4, C, "MPC = MSC", 4, 12], [(q) => q - 1, 1, 8, C, "MPC − subsidy", 4, 12, true]],
    g: [[3.5, 4.5, "Pm", "Qm"], [4.5, 3.5, "Pc", "Qopt"]], extra: (P) => P.ar(6.4, 7.2, 6.4, 5.6, "ar-econ7-4") + P.t(6.6, 6.5, "subsidy", { s: 11 }) });
  const sugarTax = extFig("ar-econ7-5", "Negative consumption externality (demerit good) corrected by an indirect tax", {
    wl: [[3.5, 4.5], [4.5, 5.5], [4.5, 3.5]], curves: [[(q) => 10 - q, 0, 9.2, A, "MPB"], [(q) => 8 - q, 0, 7.6, B, "MSB", 4, 6], [Sm, 0, 8.4, C, "MPC = MSC", 4, 12], [(q) => 3 + q, 0, 6.6, C, "MPC + tax", 4, 4, true]],
    g: [[4.5, 5.5, "Pm", "Qm"], [3.5, 6.5, "Pc", "Qopt"]], extra: (P) => P.t(4.55, 4.5, "WL", { s: 10, b: true, c: R }) + P.t(5.3, 1.6, "tax = external cost", { s: 11 }) });
  const posProd = extFig("ar-econ7-6", "Positive production externality with welfare loss shaded", {
    wl: [[3, 6], [3, 4], [4, 5]], curves: [[Dm, 0, 8.4, A, "MPB = MSB"], [(q) => 3 + q, 0, 6.6, C, "MPC"], [Sm, 0, 8.4, B, "MSC", 4, 0]],
    g: [[3, 6, "Pm", "Qm"], [4, 5, "Popt", "Qopt"]], extra: (P) => P.t(3.1, 5, "WL", { s: 10, b: true, c: R }) });
  const info = mk("Information / education for a merit good: MPB shifts right towards MSB, Qm → Qopt", { xLabel: "Quantity", yLabel: "Costs, benefits", points: [{ at: [3.5, 4.5] }, { at: [4.5, 5.5] }] },
    { lines: [ln(0, 8, 7, 1, "MPB₁"), ln(0, 10, 8.5, 1.5, "MSB = MPB₂", "b"), ln(0, 1, 8.5, 9.5, "MPC = MSC", "c")] }, gq(3.5, 4.5, "", "Qm"), gq(4.5, 5.5, "", "Qopt"));
  const demInfo = mk("Campaign against a demerit good (e.g. smoking): MPB shifts left towards MSB, Qm → Qopt", { xLabel: "Quantity", yLabel: "Costs, benefits", points: [{ at: [4.5, 5.5] }, { at: [3.5, 4.5] }] },
    { lines: [ln(0, 10, 8.5, 1.5, "MPB₁"), ln(0, 8, 7, 1, "MSB = MPB₂", "b"), ln(0, 1, 8.5, 9.5, "MPC = MSC", "c")] }, gq(4.5, 5.5, "", "Qm"), gq(3.5, 4.5, "", "Qopt"));
  const regul = mk("Regulation: a legal limit on output at Qopt (negative production externality)", { xLabel: "Quantity", yLabel: "Costs, benefits" },
    { lines: [ln(0, 9, 7.5, 1.5, "MPB = MSB"), ln(0, 1, 7.6, 8.6, "MPC", "c"), ln(0, 3, 6.6, 9.6, "MSC", "b"), ln(3, 0, 3, 9.6, "legal limit", "muted")] }, gq(3, 6, "", "Qopt"), gq(4, 5, "", "Qm"));
  const permitD = mk("Tradable permits: cap fixes supply (vertical); rising demand for permits raises the permit price, not emissions", { xLabel: "Quantity of permits (emissions)", yLabel: "Permit price", points: [{ at: [5, 4] }, { at: [5, 6.5] }] },
    { lines: [ln(5, 0, 5, 9.5, "S = cap", "c"), ln(1, 8, 8, 1, "D₁"), ln(2, 9.5, 9.5, 2, "D₂", "b")] }, gq(5, 4, "P₁", "cap"), gq(5, 6.5, "P₂", ""));
  const cprFig = wrap(540, 210, "ar-econ7-7", "Common pool resources: why overuse happens and policy responses",
    box(10, 20, 120, 64, ["Rivalrous", "+ non-excludable", "(fish, forests)"], { s: 11 }) + arw([[132, 52], [152, 52]], "ar-econ7-7") +
    box(154, 20, 120, 64, ["Each user ignores", "the cost of", "depletion to others"], { s: 11, bold: false }) + arw([[276, 52], [296, 52]], "ar-econ7-7") +
    box(298, 20, 108, 64, ["Overuse", "(tragedy of", "the commons)"], { s: 11 }) + arw([[408, 52], [428, 52]], "ar-econ7-7") +
    box(430, 20, 100, 64, ["Unsustainable:", "future", "generations lose"], { s: 11 }) +
    tx(270, 116, "Policy responses", { a: "middle", b: true }) +
    [["Quotas / permits", "(fishing quotas, ITQs)"], ["Property rights", "assign ownership"], ["Taxes / fines", "on extraction"], ["International", "agreements"]].map((r, i) => box(10 + i * 132, 128, 124, 64, r, { s: 11 })).join(""));

  T["econ-7"] = {
    diagrams: [info, demInfo, regul, permitD],
    figures: [
      { title: "Negative production externality: welfare loss", caption: "MSC lies above MPC by the external cost. The market produces Qm (MPC = MPB) instead of Qopt (MSC = MSB). The welfare loss triangle lies between MSC and MSB from Qopt to Qm, apex at the social optimum.", svg: negProd },
      { title: "Carbon (Pigouvian) tax", caption: "A tax equal to the marginal external cost shifts MPC up to MSC: price rises to Pc, output falls to Qopt and the externality is internalised.", svg: carbonTax },
      { title: "Positive consumption externality: welfare loss", caption: "MSB lies above MPB by the external benefit. The market under-consumes at Qm; the welfare loss is between MSB and MSC from Qm to Qopt.", svg: posCons },
      { title: "Subsidy for a merit good (e.g. vaccination)", caption: "A subsidy equal to the external benefit shifts MPC down: consumers pay Pc and consumption rises to Qopt.", svg: vacSub },
      { title: "Negative consumption externality and a sugar tax", caption: "MSB lies below MPB; the market over-consumes at Qm. A tax equal to the external cost raises the price to Pc so consumption falls to Qopt.", svg: sugarTax },
      { title: "Positive production externality", caption: "MSC lies below MPC (e.g. training or R&D benefits others). The market under-produces at Qm; a subsidy to producers moves output to Qopt.", svg: posProd },
      { title: "Common pool resources", caption: "Rivalry plus non-excludability leads to overuse; responses include quotas, property rights, taxes and international cooperation.", svg: cprFig },
    ],
    frames: [
      { title: "Diagram: a carbon tax correcting a negative production externality", paper: "P1", where: "Paper 1(a) [10] / Paper 2 · 4 marks",
        q: "Using a diagram, explain how a carbon tax can reduce the overproduction of electricity from coal.",
        marks: [
          ["Diagram", "MPB = MSB, MPC and MSC above it; Qm and Qopt; tax shifts __MPC up to MSC__ (MPC + tax), new output at __Qopt__", 2],
          ["M1", "burning coal creates external costs, so MSC > MPC and the market overproduces at Qm"],
          ["M2", "a tax equal to the __marginal external cost__ raises firms' costs, __internalising the externality__, so output falls to Qopt where MSB = MSC"],
        ],
        svg: carbonTax,
        model: "Coal-fired electricity creates pollution, an external cost, so MSC lies above MPC. Firms produce where MPC = MPB at Qm, above the social optimum Qopt where MSC = MSB. A carbon tax equal to the external cost per unit raises firms' private costs, shifting MPC up to MPC + tax, which coincides with MSC. Price rises to Pc and output falls to Qopt, so the externality is internalised and the welfare loss is eliminated.",
        accept: "\"polluter pays principle\"",
        reject: "shifting demand for a production externality tax",
        tip: "Production externality 嘅稅：郁 MPC（供應），唔郁 MPB。" },
      { title: "Diagram: subsidy for a positive consumption externality", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain how a subsidy could increase the consumption of vaccinations to the socially optimal level.",
        marks: [
          ["Diagram", "MPB below MSB, MPC = MSC; Qm < Qopt; subsidy shifts __MPC down__ (MPC − subsidy) to meet MPB at __Qopt__", 2],
          ["M1", "vaccination gives __external benefits__ (less disease spread), so MSB > MPB and it is under-consumed at Qm"],
          ["M2", "a subsidy equal to the external benefit lowers the price to Pc, so consumers increase consumption to Qopt"],
        ],
        svg: vacSub,
        model: "Vaccinations protect not only the person vaccinated but also others, so MSB is above MPB. The free market consumes Qm where MPB = MPC, below the social optimum Qopt where MSB = MSC. A subsidy to providers equal to the external benefit shifts MPC down to MPC − subsidy. The price paid falls to Pc and consumption rises to Qopt, removing the welfare loss.",
        accept: "direct provision / free vaccinations as alternatives",
        reject: "showing the subsidy as a shift of MSB",
        tip: "Subsidy 郁供應（MPC 向下），令 MPB 喺 Qopt 同佢相交。" },
      { title: "Diagram: tax on a demerit good (negative consumption externality)", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain how a tax on sugary drinks could reduce the negative consumption externality they create.",
        marks: [
          ["Diagram", "MPB above MSB, MPC = MSC; Qm > Qopt; welfare loss shaded; tax shifts MPC up so it meets MPB at __Qopt__", 2],
          ["M1", "consumption creates external costs (e.g. healthcare costs paid by taxpayers), so MSB < MPB and the good is over-consumed"],
          ["M2", "the tax raises the price, consumption falls to Qopt and the welfare loss is reduced; revenue can fund healthcare"],
        ],
        svg: sugarTax,
        model: "Excess consumption of sugary drinks raises public healthcare costs, an external cost of consumption, so MSB lies below MPB. Consumers buy Qm where MPB = MPC, more than the social optimum Qopt where MSB = MSC, creating a welfare loss. A tax raises the price consumers pay to Pc, so consumption falls towards Qopt. Its effectiveness depends on PED: if demand is inelastic, consumption falls only slightly.",
        accept: "demerit good argument (imperfect information)",
        reject: "drawing MSC above MPC for a consumption externality",
        tip: "Consumption externality：MSB 同 MPB 唔同；MSC = MPC。" },
      { title: "Diagram: information campaign for a merit or demerit good", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain how an information campaign could increase the consumption of a merit good.",
        marks: [
          ["Diagram", "MPB₁ shifting right to MPB₂ (towards or equal to MSB), MPC = MSC; Qm → __Qopt__", 2],
          ["M1", "consumers __underestimate__ the private benefit because of imperfect information"],
          ["M2", "information raises their perceived benefit, so demand (MPB) increases and consumption moves towards Qopt"],
        ],
        diagram: info,
        model: "Merit goods such as education are under-consumed partly because individuals underestimate their benefits. A campaign that informs people of the benefits raises their willingness to pay, shifting MPB right towards MSB. Consumption rises from Qm towards Qopt. Campaigns are cheap and do not restrict choice, but their effect can be slow and uncertain.",
        accept: "the demerit-good version (MPB shifts left)",
        reject: "shifting MPC",
        tip: "教育 / 宣傳 → 郁 MPB（需求）。" },
      { title: "Diagram: legislation limiting output", paper: "P2", where: "Paper 2 · 3 marks",
        q: "Using a diagram, explain how regulation could be used to correct a negative production externality.",
        marks: [
          ["Diagram", "negative production externality with a __legal limit at Qopt__", 1],
          ["M1", "the government sets a maximum quantity / emission standard so firms cannot produce beyond Qopt"],
          ["M2", "this removes the overproduction (Qm − Qopt); simple to understand, but needs __monitoring__ and gives no incentive to cut below the limit"],
        ],
        diagram: regul,
        model: "Firms overproduce at Qm because they ignore the external cost. A regulation limiting output or emissions to the level consistent with Qopt prevents production beyond the social optimum. It is easy to understand and its effect is certain if enforced, but it requires monitoring and fines, generates no revenue and gives firms no incentive to reduce pollution further.",
        accept: "emissions standards; bans for extreme cases",
        reject: "showing regulation as a demand shift",
        tip: "Regulation 可以畫一條直線限制喺 Qopt。" },
    ],
    concepts: [
      { h: "Which curve does each policy move?", b: "<ul><li><strong>Tax on producers</strong> (carbon tax): MPC shifts up.</li><li><strong>Subsidy</strong> (to producers of a merit good or positive production externality): MPC shifts down.</li><li><strong>Information / education / advertising bans</strong>: MPB shifts (right for merit goods, left for demerit goods).</li><li><strong>Regulation</strong>: a quantity limit at Qopt.</li><li><strong>Tradable permits</strong>: a vertical supply of permits set by the cap; the permit price is set by demand for permits.</li></ul><p>Always label MPC, MSC, MPB, MSB, Qm and Qopt; the welfare loss triangle has its apex at MSC = MSB.</p>" },
    ],
  };

  // =====================================================================
  // econ-8 Public goods
  // =====================================================================
  const pubMkt = mk("Public good: individual MPB lies below MC, so the free market supplies nothing (Qm = 0); society's MSB meets MC at Qopt", { xLabel: "Quantity", yLabel: "Costs, benefits", points: [{ at: [0, 0], label: "Qm = 0" }, { at: [4, 6] }] },
    { lines: [ln(0, 4, 9.5, 8.75, "MC", "c"), ln(0, 3, 5, 0.5, "MPB (one user)", "muted"), ln(0, 9, 9.5, 1.875, "MSB", "b")] }, gq(4, 6, "", "Qopt"));
  const vsum = { title: "Extension: for a public good, MSB is the VERTICAL sum of individual benefits (both consume the same units)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity", yLabel: "Benefit, cost",
    curves: [{ f: (q) => 5 - 0.5 * q, domain: [0, 9], color: "b", label: "MB_A", labelX: 2.5 }, { f: (q) => 3 - 0.3 * q, domain: [0, 9], color: "muted", label: "MB_B", labelX: 7 }, { f: (q) => 8 - 0.8 * q, domain: [0, 9], label: "MSB = MB_A + MB_B", labelX: 2.4 }],
    lines: [ln(0, 4, 9.6, 4, "MC", "c"), ln(5, 0, 5, 4, "", "muted", true)], texts: [{ at: [5, -0.6], text: "Qopt", anchor: "middle" }] };
  const pubPPC = mk("PPC: providing more public goods (A → B) has an opportunity cost in private goods", { xLabel: "Public goods", yLabel: "Private goods", curves: [{ f: f8, domain: [0, 8], label: "PPC", labelX: 7.2 }], points: [{ at: [2.5, r2(f8(2.5))], label: "A" }, { at: [5, r2(f8(5))], label: "B" }] },
    gq(2.5, f8(2.5), "", ""), gq(5, f8(5), "", ""));
  const matrix = wrap(460, 270, "ar-econ8-1", "Classification of goods by rivalry and excludability",
    tx(270, 18, "Rivalrous?", { a: "middle", b: true }) + tx(190, 42, "Yes (rival)", { a: "middle" }) + tx(350, 42, "No (non-rival)", { a: "middle" }) +
    `<text x="18" y="150" font-size="12" font-weight="bold" transform="rotate(-90 18 150)" text-anchor="middle">Excludable?</text>` + tx(104, 105, "Yes", { a: "end" }) + tx(104, 205, "No", { a: "end" }) +
    `<rect x="270" y="150" width="160" height="100" fill="${A}" fill-opacity="0.22"/>` +
    [[110, 50], [270, 50], [110, 150], [270, 150]].map((p) => `<rect x="${p[0]}" y="${p[1]}" width="160" height="100" fill="none" stroke="currentColor" stroke-width="1.3"/>`).join("") +
    [[190, 88, "Private goods", "food, clothes,", "phones"], [350, 88, "Club goods", "streaming service,", "uncongested toll road"], [190, 188, "Common pool", "resources", "fish stocks, forests"], [350, 188, "Public goods", "street lighting,", "national defence"]].map((c) =>
      tx(c[0], c[1], c[2], { a: "middle", b: true }) + tx(c[0], c[1] + 16, c[3], { a: "middle", s: 11 }) + tx(c[0], c[1] + 30, c[4], { a: "middle", s: 11 })).join("") +
    tx(230, 266, "Public good = non-rival AND non-excludable → free rider problem", { a: "middle", s: 11 }));
  const freeRider = wrap(540, 170, "ar-econ8-2", "Free rider problem chain",
    box(8, 20, 120, 70, ["Non-excludable", "cannot stop", "non-payers using it"], { s: 11 }) + arw([[130, 55], [146, 55]], "ar-econ8-2") +
    box(148, 20, 120, 70, ["Free riders", "consume without", "paying"], { s: 11 }) + arw([[270, 55], [286, 55]], "ar-econ8-2") +
    box(288, 20, 120, 70, ["No revenue", "firms cannot", "make a profit"], { s: 11 }) + arw([[410, 55], [426, 55]], "ar-econ8-2") +
    box(428, 20, 104, 70, ["Missing market", "(Q = 0): market", "failure"], { s: 11 }) +
    tx(270, 120, "Solutions: direct government provision funded by taxes,", { a: "middle", s: 12 }) + tx(270, 138, "or contracting out to private firms; cost-benefit analysis decides how much", { a: "middle", s: 12 }) +
    tx(270, 160, "Problem: opportunity cost of tax revenue; hard to value benefits", { a: "middle", s: 11, c: A }));
  const purity = wrap(540, 120, "ar-econ8-3", "From pure private to pure public goods",
    arw([[20, 40], [520, 40]], "ar-econ8-3") + arw([[520, 40], [20, 40]], "ar-econ8-3") +
    [[60, "Pure private", "a sandwich"], [190, "Club / quasi-public", "toll road, park"], [350, "Quasi-public", "roads, beaches (congest)"], [475, "Pure public", "defence, lighthouse"]].map((r) =>
      `<circle cx="${r[0]}" cy="40" r="5" fill="${A}"/>` + tx(r[0], 66, r[1], { a: "middle", b: true, s: 11 }) + tx(r[0], 82, r[2], { a: "middle", s: 11 })).join("") +
    tx(270, 110, "Quasi-public goods become rivalrous when congested or excludable at low cost (tolls)", { a: "middle", s: 11 }));

  T["econ-8"] = {
    diagrams: [pubMkt, pubPPC, vsum],
    figures: [
      { title: "Rivalry and excludability: four types of goods", caption: "Rival + excludable = private; rival + non-excludable = common pool resource; non-rival + excludable = club good; non-rival + non-excludable = public good.", svg: matrix },
      { title: "The free rider problem", caption: "Non-excludability means people can benefit without paying, so private firms cannot earn revenue and the market fails to supply the good at all.", svg: freeRider },
      { title: "Pure and quasi-public goods", caption: "Many goods sit between the extremes; roads are non-rival until they become congested.", svg: purity },
    ],
    frames: [
      { title: "Diagram: why the free market fails to provide a public good", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a diagram, explain why a free market may fail to provide street lighting.",
        marks: [
          ["Diagram", "MC above any individual's MPB so __market output = 0__; MSB meets MC at a positive __Qopt__", 2],
          ["M1", "street lighting is __non-excludable__ (cannot stop non-payers benefiting) and __non-rival__"],
          ["M2", "so consumers __free ride__, firms cannot charge, and the market supplies nothing although society values it: a __missing market__"],
        ],
        diagram: pubMkt,
        model: "Street lighting is non-rival - one person's use does not reduce what is available to others - and non-excludable - non-payers cannot be prevented from benefiting. Each individual would gain only a small private benefit and can free ride on others' payments, so no individual's willingness to pay covers the cost (MPB is below MC everywhere) and private firms cannot earn revenue. The market output is zero even though the combined benefit to society (MSB) exceeds MC up to Qopt. This is a missing market, so the government usually provides street lighting financed by taxation.",
        accept: "a written explanation of the missing market if no diagram is required",
        reject: "\"public goods are goods provided by the government\" (that is not the definition)",
        tip: "Public good 定義：non-rival + non-excludable；唔係「政府提供嘅嘢」。" },
      { title: "Diagram: opportunity cost of government provision of public goods", paper: "P2", where: "Paper 2 · 4 marks",
        q: "Using a PPC diagram, explain the opportunity cost of increasing government provision of public goods.",
        marks: [
          ["Diagram", "PPC with public goods on one axis and private goods on the other; movement __A → B__ showing more public goods and fewer private goods", 2],
          ["M1", "resources are scarce, so to provide more public goods (financed by taxes) resources must be __diverted__ from private goods"],
          ["M2", "the private goods forgone are the __opportunity cost__; governments use __cost-benefit analysis__ to decide whether it is worthwhile"],
        ],
        diagram: pubPPC,
        model: "With scarce resources, an economy at full employment can only produce more public goods by producing fewer private goods. If the government raises taxes to build more flood defences, resources move from private goods to public goods, a movement from A to B along the PPC. The private goods given up are the opportunity cost. Governments therefore use cost-benefit analysis to compare the social benefits of the public good with this cost.",
        accept: "tax burden on households as the source of the trade-off",
        reject: "shifting the PPC outward",
        tip: "多咗 public goods = 沿 PPC 移動，少咗 private goods = opportunity cost。" },
      { title: "Explain the free rider problem", paper: "P2", where: "Paper 2 · 2-4 marks",
        q: "Explain the free rider problem and why it leads to market failure.",
        marks: [
          ["M1", "a free rider __benefits from a good without paying__ for it"],
          ["M2", "it arises because the good is __non-excludable__"],
          ["M3", "if many people free ride, firms receive too little revenue to cover costs"],
          ["M4", "so the good is __under-provided or not provided at all__ (missing market) although society values it"],
        ],
        svg: freeRider,
        model: "A free rider is someone who benefits from a good without paying for it. This happens with non-excludable goods such as national defence or lighthouses, because suppliers cannot stop non-payers from benefiting. Since people can enjoy the good whether or not they pay, few are willing to pay, so private firms cannot earn enough revenue and do not supply it. The result is a missing market: the good is not provided even though its social benefits exceed its costs.",
        accept: "\"missing market\" or \"under-provision\"",
        reject: "explaining free riding by non-rivalry alone",
        tip: "Free rider 嘅成因係 non-excludable，唔係 non-rival。" },
    ],
    concepts: [
      { h: "Drawing public goods", b: "<p>There is no single compulsory public-good diagram. Two acceptable approaches: (1) a written explanation of the <strong>missing market</strong> (market output = 0) with the free rider problem; (2) a diagram in which each individual's MPB lies below MC, so nothing is supplied, while MSB (the <strong>vertical</strong> sum of everyone's benefit, because all consume the same units) meets MC at Qopt. A PPC shows the opportunity cost of public provision.</p>" },
    ],
  };

  IB.addExamFrames("econ", { topics: T });
})();
