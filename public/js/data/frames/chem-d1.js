/* Chemistry - diagrams and graphs to know (original). Structure 1-2-3 and Reactivity 1 (chem-1 ... chem-7, chem-h1, chem-h2). */
(function () {
  const r1 = (n) => Math.round(n * 10) / 10;
  const mk = (id, col) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${col || "currentColor"}"/></marker>`;
  const S = (w, h, label, body, defs) =>
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="sans-serif" font-size="12">${defs ? `<defs>${defs}</defs>` : ""}${body}</svg>`;
  const subs = (s) => String(s).replace(/_([A-Za-z0-9]+)/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>');
  const T = (x, y, s, a, sz, ex) => `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${a || "middle"}" font-size="${sz || 12}" fill="currentColor"${ex ? " " + ex : ""}>${subs(s)}</text>`;
  const TC = (x, y, s, col, a, sz) => `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${a || "middle"}" font-size="${sz || 12}" fill="${col}">${subs(s)}</text>`;
  const L = (x1, y1, x2, y2, ex) => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="currentColor" stroke-width="1.5"${ex ? " " + ex : ""}/>`;
  const LC = (x1, y1, x2, y2, col, ex) => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${col}" stroke-width="1.8"${ex ? " " + ex : ""}/>`;
  const C = (x, y, r, fill, ex) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="${fill || "none"}" stroke="currentColor" stroke-width="1.2"${ex ? " " + ex : ""}/>`;
  const dot = (x, y, r) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r || 1.8}" fill="currentColor"/>`;
  const rad = (d) => (d * Math.PI) / 180;

  // ---------- orbital boxes ----------
  const box = (x, y, n) => {
    let s = `<rect x="${x}" y="${y}" width="20" height="22" fill="none" stroke="currentColor" stroke-width="1.2"/>`;
    const up = (cx) => `<path d="M${cx} ${y + 19}V${y + 3}M${cx - 3} ${y + 8}L${cx} ${y + 3}L${cx + 3} ${y + 8}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    const dn = (cx) => `<path d="M${cx} ${y + 3}V${y + 19}M${cx - 3} ${y + 14}L${cx} ${y + 19}L${cx + 3} ${y + 14}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    if (n === 1) s += up(x + 10);
    if (n === 2) s += up(x + 6) + dn(x + 14);
    return s;
  };
  const sub = (x, y, counts, label) => counts.map((n, i) => box(x + 20 * i, y, n)).join("") + (label ? T(x + 10 * counts.length, y + 35, label, "middle", 11) : "");

  // ---------- Lewis / shape helpers ----------
  const lp = (x, y, ang, d) => { // lone pair at distance d from (x,y) in direction ang (deg, 0 = right, 90 = up)
    d = d || 11; const cx = x + d * Math.cos(rad(ang)), cy = y - d * Math.sin(rad(ang));
    const px = 3.2 * Math.sin(rad(ang)), py = 3.2 * Math.cos(rad(ang));
    return dot(cx + px, cy + py) + dot(cx - px, cy - py);
  };
  const atom = (x, y, s, lps, sz) => T(x, y + 4.5, s, "middle", sz || 13, 'font-weight="600"') + (lps || []).map((a) => lp(x, y, a)).join("");
  const bond = (x1, y1, x2, y2, order, gap) => {
    gap = gap === undefined ? 9 : gap;
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const a = [x1 + ux * gap, y1 + uy * gap], b = [x2 - ux * gap, y2 - uy * gap], nx = -uy * 3, ny = ux * 3;
    if (order === 2) return L(a[0] + nx, a[1] + ny, b[0] + nx, b[1] + ny) + L(a[0] - nx, a[1] - ny, b[0] - nx, b[1] - ny);
    if (order === 3) return L(a[0], a[1], b[0], b[1]) + L(a[0] + 1.4 * nx, a[1] + 1.4 * ny, b[0] + 1.4 * nx, b[1] + 1.4 * ny) + L(a[0] - 1.4 * nx, a[1] - 1.4 * ny, b[0] - 1.4 * nx, b[1] - 1.4 * ny);
    return L(a[0], a[1], b[0], b[1]);
  };
  const wedge = (x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy * 3.5, ny = ux * 3.5;
    const ax = x1 + ux * 7, ay = y1 + uy * 7, bx = x2 - ux * 8, by = y2 - uy * 8;
    return `<polygon points="${r1(ax)},${r1(ay)} ${r1(bx + nx)},${r1(by + ny)} ${r1(bx - nx)},${r1(by - ny)}" fill="currentColor"/>`;
  };
  const dash = (x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    let s = "";
    for (let i = 1; i <= 6; i++) {
      const t = 7 + ((len - 15) * i) / 6, w = 0.6 + (2.8 * i) / 6, cx = x1 + ux * t, cy = y1 + uy * t;
      s += L(cx - uy * w, cy + ux * w, cx + uy * w, cy - ux * w, 'stroke-width="1.3"');
    }
    return s;
  };
  // 3D shape: central atom + list of [dx, dy, kind, label] kind: "p" plain, "w" wedge, "d" dash, "lp" lone pair
  const shape = (cx, cy, c, arms) => arms.map(([dx, dy, k, lab]) => {
    const x2 = cx + dx, y2 = cy + dy;
    if (k === "lp") { const ang = (Math.atan2(-dy, dx) * 180) / Math.PI; return lp(cx, cy, ang, 15) + `<ellipse cx="${r1(cx + dx * 0.55)}" cy="${r1(cy + dy * 0.55)}" rx="${r1(Math.hypot(dx, dy) * 0.42)}" ry="7" transform="rotate(${r1(-ang)} ${r1(cx + dx * 0.55)} ${r1(cy + dy * 0.55)})" fill="none" stroke="var(--fig-muted)" stroke-dasharray="3 2"/>`; }
    const b = k === "w" ? wedge(cx, cy, x2, y2) : k === "d" ? dash(cx, cy, x2, y2) : bond(cx, cy, x2, y2, 1, 8);
    return b + T(x2, y2 + 4.5, lab, "middle", 12);
  }).join("") + T(cx, cy + 4.5, c, "middle", 13, 'font-weight="600"');

  // honeycomb points (for graphite/graphene)
  const honey = (ox, oy, cols, rows, a) => {
    let s = "";
    const h = a * Math.sqrt(3);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = ox + c * 1.5 * a, y = oy + r * h + (c % 2 ? h / 2 : 0);
      const pts = [0, 60, 120, 180, 240, 300].map((d) => `${r1(x + a * Math.cos(rad(d)))},${r1(y + a * Math.sin(rad(d)))}`).join(" ");
      s += `<polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;
    }
    return s;
  };

  // mini sketch graph for "sketch the relationship" panels
  const mini = (x, y, kind, xl, yl, title) => {
    const X0 = x + 26, Y0 = y + 100, X1 = x + 128, Y1 = y + 34;
    let s = `<rect x="${x + 2}" y="${y + 2}" width="138" height="122" rx="6" fill="var(--fig-fill)" stroke="var(--fig-muted)" stroke-width=".8"/>`;
    s += T(x + 71, y + 16, title, "middle", 10, 'font-weight="600"');
    s += L(X0, Y0, X1 + 4, Y0, 'marker-end="url(#ar-chem3-g)"') + L(X0, Y0, X0, Y1 - 4, 'marker-end="url(#ar-chem3-g)"');
    s += T(X1, Y0 + 14, xl, "end", 11) + T(X0 - 4, Y1 + 2, yl, "end", 11);
    let d = "";
    if (kind === "lin") d = `M${X0} ${Y0}L${X1 - 6} ${Y1 + 6}`;
    if (kind === "inv") { for (let i = 0; i <= 40; i++) { const u = 0.12 + (i / 40) * 0.88, px = X0 + 4 + u * 96, py = Y0 - (0.1 / u) * 62; d += (i ? "L" : "M") + r1(px) + " " + r1(py); } }
    if (kind === "flat") d = `M${X0 + 2} ${Y0 - 35}L${X1 - 4} ${Y0 - 35}`;
    s += `<path d="${d}" fill="none" stroke="var(--fig-a)" stroke-width="2.4"/>`;
    return s;
  };

  // spectra / generic curve path from a function on [a,b] mapped to box
  const pathF = (f, a, b, X0, X1, mapY, n) => {
    let d = ""; n = n || 200;
    for (let i = 0; i <= n; i++) { const u = a + ((b - a) * i) / n; d += (i ? "L" : "M") + r1(X0 + ((X1 - X0) * i) / n) + " " + r1(mapY(f(u))); }
    return d;
  };

  // bar mass spectrum
  const massSpec = (label, peaks, xmin, xmax, id) => {
    const X0 = 50, X1 = 330, Y0 = 170, Y1 = 25, sx = (m) => X0 + ((m - xmin) / (xmax - xmin)) * (X1 - X0), sy = (p) => Y0 - (p / 100) * (Y0 - Y1);
    let s = L(X0, Y0, X1 + 10, Y0, `marker-end="url(#${id})"`) + L(X0, Y0, X0, Y1 - 12, `marker-end="url(#${id})"`);
    s += T(X1 + 14, Y0 + 4, "m/z", "start", 12) + T(14, 95, "Relative abundance / %", "middle", 11, 'transform="rotate(-90 14 95)"');
    [0, 25, 50, 75, 100].forEach((p) => (s += L(X0 - 4, sy(p), X0, sy(p)) + T(X0 - 7, sy(p) + 4, p, "end", 10)));
    for (let m = Math.ceil(xmin); m <= xmax; m++) if (xmax - xmin < 10 || m % 5 === 0) s += L(sx(m), Y0, sx(m), Y0 + 4) + T(sx(m), Y0 + 16, m, "middle", 11);
    peaks.forEach(([m, p, lab]) => (s += `<rect x="${r1(sx(m) - 4)}" y="${r1(sy(p))}" width="8" height="${r1(Y0 - sy(p))}" fill="var(--fig-a)"/>` + T(sx(m), sy(p) - 5, lab || p, "middle", 11)));
    return S(380, 192, label, s, mk(id));
  };

  // ======================= FIGURES =======================

  // chem-1
  const figParticles = (() => {
    let s = "";
    const panel = (x, title) => `<rect x="${x}" y="22" width="120" height="100" fill="none" stroke="currentColor" stroke-width="1.2"/>` + T(x + 60, 15, title, "middle", 12, 'font-weight="600"');
    s += panel(10, "Solid") + panel(150, "Liquid") + panel(290, "Gas");
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) s += C(30 + c * 20, 112 - r * 20, 9, "var(--fig-b)", 'fill-opacity=".45"');
    [[162, 112], [181, 113], [200, 111], [219, 112], [238, 113], [258, 111], [170, 94], [190, 93], [210, 95], [231, 92], [251, 94], [161, 76], [182, 75], [204, 77], [243, 76]].forEach(([x, y]) => (s += C(x, y, 9, "var(--fig-b)", 'fill-opacity=".45"')));
    [[310, 45], [370, 38], [395, 80], [330, 100], [355, 70], [400, 110]].forEach(([x, y]) => (s += C(x, y, 9, "var(--fig-b)", 'fill-opacity=".45"')));
    s += T(70, 140, "regular, touching,", "middle", 11) + T(70, 153, "vibrate about fixed positions", "middle", 11);
    s += T(210, 140, "touching, random,", "middle", 11) + T(210, 153, "move past each other", "middle", 11);
    s += T(350, 140, "far apart, random,", "middle", 11) + T(350, 153, "fast, straight-line motion", "middle", 11);
    return S(420, 162, "Particle arrangements in solid, liquid and gas", s);
  })();

  const figStates = (() => {
    const id = "ar-chem1-st";
    const P = { s: [70, 170], l: [330, 170], g: [200, 40] };
    let s = "";
    Object.entries({ s: "SOLID", l: "LIQUID", g: "GAS" }).forEach(([k, n]) => (s += `<rect x="${P[k][0] - 40}" y="${P[k][1] - 15}" width="80" height="30" rx="6" fill="var(--fig-fill)" stroke="currentColor"/>` + T(P[k][0], P[k][1] + 4, n, "middle", 12, 'font-weight="600"')));
    const arr = (x1, y1, x2, y2, col) => LC(x1, y1, x2, y2, col, `marker-end="url(#${id}${col.includes("d") ? "d" : "b"})"`);
    s += arr(112, 163, 288, 163, "var(--fig-d)") + arr(288, 180, 112, 180, "var(--fig-b)");
    s += TC(200, 157, "melting", "var(--fig-d)") + TC(200, 196, "freezing", "var(--fig-b)");
    s += arr(318, 154, 230, 56, "var(--fig-d)") + arr(214, 60, 300, 156, "var(--fig-b)");
    s += TC(292, 92, "vaporization", "var(--fig-d)", "start") + TC(274, 136, "condensation", "var(--fig-b)", "end");
    s += arr(82, 154, 170, 56, "var(--fig-d)") + arr(186, 60, 98, 156, "var(--fig-b)");
    s += TC(108, 92, "sublimation", "var(--fig-d)", "end") + TC(126, 136, "deposition", "var(--fig-b)", "start");
    s += TC(20, 220, "red: endothermic (absorb energy)", "var(--fig-d)", "start", 11) + TC(380, 220, "blue: exothermic (release energy)", "var(--fig-b)", "end", 11);
    return S(400, 230, "Changes of state", s, mk(id + "d", "var(--fig-d)") + mk(id + "b", "var(--fig-b)"));
  })();

  const figAtom = (() => {
    let s = "";
    s += C(100, 95, 70, "none", 'stroke-dasharray="4 3"') + C(100, 95, 40, "none", 'stroke-dasharray="4 3"');
    [[0, 0], [8, 3], [-6, 6], [3, -7], [-4, -4], [7, -5]].forEach(([dx, dy], i) => (s += C(100 + dx, 95 + dy, 5, i % 2 ? "var(--fig-d)" : "var(--fig-muted)")));
    [[140, 95], [60, 95], [100, 25], [150, 145]].forEach(([x, y]) => (s += C(x, y, 4, "var(--fig-b)") + T(x, y + 3.5, "−", "middle", 9)));
    s += L(112, 92, 210, 50) + T(214, 54, "nucleus: protons + neutrons", "start", 11);
    s += L(144, 95, 210, 95) + T(214, 99, "electron (in energy level / shell)", "start", 11);
    s += `<rect x="208" y="118" width="222" height="70" fill="var(--fig-fill)" stroke="var(--fig-muted)"/>`;
    s += T(218, 133, "particle", "start", 11, 'font-weight="600"') + T(320, 133, "rel. mass", "middle", 11, 'font-weight="600"') + T(395, 133, "rel. charge", "middle", 11, 'font-weight="600"');
    [["proton", "1", "+1"], ["neutron", "1", "0"], ["electron", "1/1836 (≈0)", "−1"]].forEach(([a, b, c], i) => (s += T(218, 150 + i * 15, a, "start", 11) + T(320, 150 + i * 15, b, "middle", 11) + T(395, 150 + i * 15, c, "middle", 11)));
    return S(440, 195, "Nuclear model of the atom", s);
  })();

  const figChrom = (() => {
    const id = "ar-chem1-ch";
    let s = `<rect x="40" y="15" width="110" height="200" fill="var(--fig-fill)" stroke="currentColor"/>`;
    s += `<rect x="25" y="195" width="140" height="30" fill="var(--fig-b)" fill-opacity=".25" stroke="currentColor"/>` + T(205, 214, "solvent", "start", 11);
    s += L(40, 185, 150, 185, 'stroke-dasharray="3 2"') + T(205, 189, "baseline (pencil), above solvent", "start", 11);
    s += L(40, 35, 150, 35, 'stroke="var(--fig-b)"') + T(205, 39, "solvent front", "start", 11);
    s += C(70, 185, 4, "var(--fig-a)") + C(120, 185, 4, "var(--fig-muted)");
    s += C(70, 95, 6, "var(--fig-a)") + C(70, 145, 6, "var(--fig-c)") + C(120, 145, 6, "var(--fig-c)");
    s += LC(172, 185, 172, 95, "var(--fig-d)", `marker-start="url(#${id})" marker-end="url(#${id})"`) + LC(192, 185, 192, 35, "var(--fig-d)", `marker-start="url(#${id})" marker-end="url(#${id})"`);
    s += L(76, 95, 168, 95, 'stroke-dasharray="2 3" stroke="var(--fig-muted)"');
    s += TC(166, 140, "a", "var(--fig-d)", "end") + TC(198, 110, "b", "var(--fig-d)", "start");
    s += T(200, 238, "R_F = a ÷ b (distances measured from the baseline)", "middle", 11);
    s += T(70, 210, "mixture", "middle", 10) + T(120, 210, "standard", "middle", 10);
    return S(400, 248, "Paper chromatogram and R_F", s, mk(id, "var(--fig-d)"));
  })();

  const figMsMg = massSpec("Mass spectrum of magnesium", [[24, 79, "79.0"], [25, 10, "10.0"], [26, 11, "11.0"]], 23, 27, "ar-chem1-ms");
  const figMsCl = massSpec("Mass spectrum of chlorine atoms", [[35, 75.8, "75.8"], [37, 24.2, "24.2"]], 34, 38, "ar-chem1-cl");

  // chem-2
  const figOrbP = (() => {
    let s = T(70, 14, "1s", "middle", 11) + T(110, 14, "2s", "middle", 11) + T(170, 14, "2p", "middle", 11);
    const rows = [["C", [2], [2], [1, 1, 0], "1s² 2s² 2p²"], ["N", [2], [2], [1, 1, 1], "1s² 2s² 2p³"], ["O", [2], [2], [2, 1, 1], "1s² 2s² 2p⁴"], ["F", [2], [2], [2, 2, 1], "1s² 2s² 2p⁵"], ["O²⁻", [2], [2], [2, 2, 2], "1s² 2s² 2p⁶"]];
    rows.forEach(([n, a, b, c, cf], i) => {
      const y = 22 + i * 32;
      s += T(30, y + 15, n, "middle", 13, 'font-weight="600"') + sub(60, y, a) + sub(100, y, b) + sub(140, y, c) + T(220, y + 15, cf, "start", 12);
    });
    s += T(10, 190, "Hund: 2p filled singly (parallel spins) before pairing · Pauli: max 2 per box, opposite spins", "start", 10.5);
    return S(440, 198, "Orbital box diagrams of C, N, O, F and O2-", s);
  })();

  const figOrbD = (() => {
    let s = T(155, 14, "3d", "middle", 11) + T(235, 14, "4s", "middle", 11);
    const rows = [["Fe", [2, 1, 1, 1, 1], [2], "[Ar] 3d⁶ 4s²"], ["Fe²⁺", [2, 1, 1, 1, 1], [0], "[Ar] 3d⁶  (4s lost first)"], ["Fe³⁺", [1, 1, 1, 1, 1], [0], "[Ar] 3d⁵"], ["Cr", [1, 1, 1, 1, 1], [1], "[Ar] 3d⁵ 4s¹  (exception)"], ["Cr³⁺", [1, 1, 1, 0, 0], [0], "[Ar] 3d³"], ["Cu", [2, 2, 2, 2, 2], [1], "[Ar] 3d¹⁰ 4s¹  (exception)"], ["Cu²⁺", [2, 2, 2, 2, 1], [0], "[Ar] 3d⁹"]];
    rows.forEach(([n, d, f4, cf], i) => {
      const y = 22 + i * 32;
      s += T(30, y + 15, n, "middle", 13, 'font-weight="600"') + T(82, y + 15, "[Ar]", "middle", 12) + sub(105, y, d) + sub(225, y, f4) + T(258, y + 15, cf, "start", 12);
    });
    s += T(10, 252, "Half-filled 3d⁵ and full 3d¹⁰ are extra stable, so Cr and Cu take one 4s electron into 3d.", "start", 10.5);
    return S(450, 260, "Orbital box diagrams of Fe, Fe2+, Fe3+, Cr, Cr3+, Cu, Cu2+", s);
  })();

  const figAufbau = (() => {
    const id = "ar-chem2-au";
    const X = (l) => 40 + l * 60, Y = (n) => 22 + (n - 1) * 28, L_ = "spdf";
    let s = "";
    for (let n = 1; n <= 7; n++) for (let l = 0; l < Math.min(n, 4); l++) if (!(n >= 6 && l === 3) && !(n === 7 && l > 1)) s += T(X(l), Y(n) + 4, `${n}${L_[l]}`, "middle", 13, 'font-weight="600"');
    for (let k = 1; k <= 8; k++) { // k = n + l
      const cells = [];
      for (let l = 3; l >= 0; l--) { const n = k - l; if (n >= 1 && n <= 7 && l < n && !(n >= 6 && l === 3) && !(n === 7 && l > 1)) cells.push([n, l]); }
      if (!cells.length) continue;
      const [na, la] = cells[0], [nb, lb] = cells[cells.length - 1];
      const x1 = X(la) + 14, y1 = Y(na) - 10, x2 = X(lb) - 14, y2 = Y(nb) + 10;
      if (cells.length === 1) s += LC(X(la) + 16, Y(na) - 8, X(la) - 10, Y(na) + 9, "var(--fig-a)", `marker-end="url(#${id})" opacity=".5"`);
      else s += LC(x1, y1, x2, y2, "var(--fig-a)", `marker-end="url(#${id})" opacity=".5"`);
    }
    s += T(300, 40, "Order of filling:", "start", 11, 'font-weight="600"') + T(300, 58, "1s 2s 2p 3s 3p", "start", 11) + T(300, 74, "4s 3d 4p 5s 4d", "start", 11) + T(300, 90, "5p 6s 4f 5d 6p", "start", 11) + T(300, 106, "7s ...", "start", 11);
    s += T(300, 130, "Follow each arrow top-right", "start", 10.5) + T(300, 144, "to bottom-left, then the next.", "start", 10.5);
    return S(450, 215, "Aufbau order diagram", s, mk(id, "var(--fig-a)"));
  })();

  const figSP = (() => {
    let s = "";
    const axes = (cx, cy) => L(cx - 40, cy, cx + 40, cy, 'stroke="var(--fig-muted)" stroke-width="1"') + L(cx, cy + 40, cx, cy - 40, 'stroke="var(--fig-muted)" stroke-width="1"') + L(cx - 26, cy + 22, cx + 26, cy - 22, 'stroke="var(--fig-muted)" stroke-width="1"') + T(cx + 44, cy + 4, "x", "start", 10) + T(cx, cy - 43, "z", "middle", 10) + T(cx + 29, cy - 24, "y", "start", 10);
    const lobe = (cx, cy, ang) => [1, -1].map((sg) => { const ex = cx + sg * 20 * Math.cos(rad(ang)), ey = cy - sg * 20 * Math.sin(rad(ang)); return `<ellipse cx="${r1(ex)}" cy="${r1(ey)}" rx="19" ry="10" transform="rotate(${-ang} ${r1(ex)} ${r1(ey)})" fill="var(--fig-a)" fill-opacity=".4" stroke="currentColor" stroke-width="1.2"/>`; }).join("");
    const cs = [50, 150, 250, 350, 450], cy = 62;
    s += axes(cs[0], cy) + C(cs[0], cy, 17, "var(--fig-b)", 'fill-opacity=".4"') + T(cs[0], 125, "1s", "middle", 12, 'font-weight="600"');
    s += axes(cs[1], cy) + C(cs[1], cy, 27, "var(--fig-b)", 'fill-opacity=".4"') + T(cs[1], 125, "2s (larger)", "middle", 12, 'font-weight="600"');
    s += axes(cs[2], cy) + lobe(cs[2], cy, 0) + T(cs[2], 125, "2pₓ", "middle", 12, 'font-weight="600"');
    s += axes(cs[3], cy) + lobe(cs[3], cy, 40) + T(cs[3], 125, "2pᵧ", "middle", 12, 'font-weight="600"');
    s += axes(cs[4], cy) + lobe(cs[4], cy, 90) + T(cs[4], 125, "2p<tspan baseline-shift=\"sub\" font-size=\"9\">z</tspan>", "middle", 12, 'font-weight="600"');
    s += T(250, 145, "s: spherical · p: dumbbell, two lobes along x, y or z (mutually perpendicular), nucleus at the node", "middle", 10.5);
    return S(500, 152, "Shapes of s and p atomic orbitals", s);
  })();

  const figHlevels = (() => {
    const yb = (n) => 30 + 260 / (n * n), ids = ["ar-chem2-hb", "ar-chem2-hc", "ar-chem2-hm"];
    let s = "";
    [1, 2, 3, 4, 5, 6].forEach((n) => (s += L(60, yb(n), 390, yb(n), n > 4 ? 'stroke-width="1"' : "")));
    s += L(60, 30, 390, 30, 'stroke-dasharray="5 3"');
    [[1, "n = 1"], [2, "n = 2"], [3, "n = 3"], [4, "n = 4"]].forEach(([n, t]) => (s += T(54, yb(n) + 4, t, "end", 11)));
    s += T(54, 26, "n = ∞", "end", 11);
    [[1, "−1312"], [2, "−328"], [3, "−146"]].forEach(([n, t]) => (s += T(396, yb(n) + 4, t, "start", 11)));
    s += T(396, 34, "0", "start", 11) + T(450, 14, "E / kJ mol⁻¹", "end", 11);
    [2, 3, 4, 5, Infinity].forEach((n, i) => { const x = 110 + i * 24; s += LC(x, n === Infinity ? 30 : yb(n), x, 288, "var(--fig-b)", `marker-end="url(#${ids[0]})"`); });
    s += TC(158, 312, "Lyman series → n = 1 (ultraviolet)", "var(--fig-b)", "middle", 11);
    [3, 4, 5, 6].forEach((n, i) => { const x = 250 + i * 24; s += LC(x, yb(n), x, 93, "var(--fig-c)", `marker-end="url(#${ids[1]})"`); });
    s += TC(286, 115, "Balmer series → n = 2 (visible)", "var(--fig-c)", "middle", 11);
    s += LC(80, 290, 80, 33, "var(--fig-muted)", `stroke-dasharray="4 3" marker-end="url(#${ids[2]})"`) + T(76, 200, "ionization (n=1 → ∞)", "middle", 10, 'transform="rotate(-90 76 200)"');
    s += T(225, 326, "Levels converge at high energy, so the lines converge at high frequency.", "middle", 10.5);
    return S(460, 334, "Hydrogen energy level diagram with Lyman and Balmer transitions", s, mk(ids[0], "var(--fig-b)") + mk(ids[1], "var(--fig-c)") + mk(ids[2], "var(--fig-muted)"));
  })();

  const figSpectra = (() => {
    const X = (lam) => 40 + ((lam - 380) / 320) * 380;
    let s = `<linearGradient id="gr-chem2-sp" x1="0" x2="1"><stop offset="0" stop-color="#7a3cff"/><stop offset=".22" stop-color="#2f6bff"/><stop offset=".38" stop-color="#19c2d6"/><stop offset=".5" stop-color="#2fbf4a"/><stop offset=".64" stop-color="#e8d42a"/><stop offset=".78" stop-color="#ff8a1f"/><stop offset="1" stop-color="#e0202a"/></linearGradient>`;
    s = `<defs>${s}</defs>`;
    s += T(40, 16, "Continuous spectrum (white light): all wavelengths, no gaps", "start", 11, 'font-weight="600"');
    s += `<rect x="40" y="22" width="380" height="34" fill="url(#gr-chem2-sp)" stroke="currentColor"/>`;
    s += T(40, 80, "Line (emission) spectrum of hydrogen, visible region (Balmer series)", "start", 11, 'font-weight="600"');
    s += `<rect x="40" y="86" width="380" height="34" fill="var(--fig-fill)" stroke="currentColor"/>`;
    [[656, "#e0202a", "656"], [486, "#19a8d6", "486"], [434, "#4a4dff", "434"], [410, "#7a3cff", "410"], [397, "#7a3cff", ""], [389, "#7a3cff", ""]].forEach(([lam, col, lab]) => (s += `<line x1="${r1(X(lam))}" y1="87" x2="${r1(X(lam))}" y2="119" stroke="${col}" stroke-width="${lab ? 3 : 1.5}"/>` + (lab ? T(X(lam), 134, lab, "middle", 10) : "")));
    s += L(40, 145, 420, 145) + [400, 500, 600, 700].map((v) => L(X(v), 145, X(v), 149) + T(X(v), 160, v, "middle", 10)).join("") + T(420, 175, "wavelength / nm", "end", 11);
    s += T(40, 175, "← lines converge (higher frequency, higher energy)", "start", 10.5);
    return S(440, 182, "Continuous spectrum compared with the hydrogen line emission spectrum", s);
  })();

  const figLyman = (() => {
    const id = "ar-chem2-ly";
    const X = (n) => 40 + ((1 - 1 / (n * n) - 0.7) / 0.3) * 360;
    let s = `<rect x="40" y="20" width="370" height="40" fill="var(--fig-fill)" stroke="currentColor"/>`;
    for (let n = 2; n <= 14; n++) s += L(X(n), 21, X(n), 59, `stroke-width="${n < 6 ? 2 : 1}"`);
    s += LC(X(1e9), 16, X(1e9), 64, "var(--fig-d)", 'stroke-dasharray="3 2"');
    [[2, "2→1"], [3, "3→1"], [4, "4→1"]].forEach(([n, t]) => (s += T(X(n), 76, t, "middle", 10)));
    s += TC(X(1e9) - 4, 76, "limit ∞→1", "var(--fig-d)", "end", 10);
    s += L(40, 92, 410, 92, `marker-end="url(#${id})"`) + T(410, 108, "frequency / energy increasing →", "end", 11);
    s += T(40, 108, "Lyman series (UV)", "start", 11, 'font-weight="600"');
    s += T(40, 126, "Convergence limit = electron removed from n = 1: gives the ionization energy (AHL).", "start", 10.5);
    return S(440, 134, "Lyman series line spectrum showing convergence", s, mk(id));
  })();

  // chem-3 frame panel grid
  const figGasGrid = S(440, 260, "Ideal gas relationship sketches", [
    mini(0, 0, "lin", "T / K", "p", "p vs T (V, n const)"),
    mini(148, 0, "inv", "V", "ρ", "ρ vs V (fixed mass)"),
    mini(296, 0, "lin", "T / K", "Mr", "Mr vs T (ρ, p const)"),
    mini(0, 130, "inv", "T / K", "c", "c = n/V vs T (p const)"),
    mini(148, 130, "inv", "p", "Vm", "Vm vs p (T const)"),
    mini(296, 130, "flat", "p", "pV", "pV vs p (T, n const)"),
  ].join(""), mk("ar-chem3-g"));

  // chem-4
  const figLewis = (() => {
    let s = "";
    const P = (i) => [(i % 4) * 120, Math.floor(i / 4) * 115];
    const put = (i, body, name) => { const [ox, oy] = P(i); return `<g transform="translate(${ox} ${oy})">${body}${T(60, 105, name, "middle", 11)}</g>`; };
    s += put(0, bond(60, 48, 30, 72) + bond(60, 48, 90, 72) + atom(60, 48, "O", [60, 120]) + atom(30, 72, "H") + atom(90, 72, "H"), "H₂O");
    s += put(1, bond(60, 45, 28, 70) + bond(60, 45, 60, 82) + bond(60, 45, 92, 70) + atom(60, 45, "N", [90]) + atom(28, 70, "H") + atom(60, 82, "H") + atom(92, 70, "H"), "NH₃");
    s += put(2, bond(22, 55, 60, 55, 2) + bond(60, 55, 98, 55, 2) + atom(22, 55, "O", [120, 240]) + atom(60, 55, "C") + atom(98, 55, "O", [60, 300]), "CO₂");
    s += put(3, bond(40, 55, 80, 55, 3) + atom(40, 55, "N", [180]) + atom(80, 55, "N", [0]), "N₂");
    s += put(4, bond(18, 55, 52, 55) + bond(52, 55, 92, 55, 3) + atom(18, 55, "H") + atom(52, 55, "C") + atom(92, 55, "N", [0]), "HCN");
    s += put(5, bond(60, 55, 60, 22) + bond(60, 55, 60, 88) + bond(60, 55, 26, 55) + bond(60, 55, 94, 55) + atom(60, 55, "C") + atom(60, 22, "H") + atom(60, 88, "H") + atom(26, 55, "H") + atom(94, 55, "H"), "CH₄");
    s += put(6, bond(60, 58, 60, 26) + bond(60, 58, 30, 76) + bond(60, 58, 90, 76) + atom(60, 58, "B") + atom(60, 26, "F", [0, 90, 180]) + atom(30, 76, "F", [120, 210, 300]) + atom(90, 76, "F", [60, 240, 330]), "BF₃ (6 e⁻ on B)");
    s += put(7, `<path d="M18 14h-6v76h6M102 14h6v76h-6" fill="none" stroke="currentColor" stroke-width="1.3"/>` + T(114, 16, "+", "start", 13) + L(60, 46, 60, 26, 'marker-end="url(#ar-chem4-co)"') + bond(60, 55, 60, 86) + bond(60, 55, 28, 55) + bond(60, 55, 92, 55) + atom(60, 55, "N") + atom(60, 20, "H") + atom(60, 86, "H") + atom(28, 55, "H") + atom(92, 55, "H"), "NH₄⁺ (N→H dative)");
    return S(480, 230, "Lewis structures", s, mk("ar-chem4-co"));
  })();

  const figVSEPR = (() => {
    let s = "";
    const P = (i) => [(i % 3) * 160, Math.floor(i / 3) * 125];
    const put = (i, body, name, ang) => { const [ox, oy] = P(i); return `<g transform="translate(${ox} ${oy})">${body}${T(80, 100, name, "middle", 11, 'font-weight="600"')}${T(80, 114, ang, "middle", 11)}</g>`; };
    s += put(0, bond(40, 52, 80, 52, 2) + bond(80, 52, 120, 52, 2) + atom(40, 52, "O") + atom(80, 52, "C") + atom(120, 52, "O"), "linear · 2 domains", "CO₂ 180°");
    s += put(1, shape(80, 55, "B", [[0, -36, "p", "F"], [-32, 20, "p", "F"], [32, 20, "p", "F"]]), "trigonal planar · 3", "BF₃ 120°");
    s += put(2, shape(80, 50, "S", [[-32, 22, "p", "O"], [32, 22, "p", "O"], [0, -30, "lp"]]), "bent · 3 (1 lone pair)", "SO₂ ≈ 117° (<120°)");
    s += put(3, shape(80, 52, "C", [[0, -36, "p", "H"], [-32, 18, "p", "H"], [26, 26, "w", "H"], [36, 6, "d", "H"]]), "tetrahedral · 4", "CH₄ 109.5°");
    s += put(4, shape(80, 50, "N", [[-32, 18, "p", "H"], [26, 26, "w", "H"], [36, 4, "d", "H"], [0, -30, "lp"]]), "trigonal pyramidal · 4 (1 lp)", "NH₃ 107°");
    s += put(5, shape(80, 50, "O", [[-30, 26, "p", "H"], [30, 26, "p", "H"], [-16, -26, "lp"], [16, -26, "lp"]]), "bent · 4 (2 lp)", "H₂O 104.5°");
    return S(480, 250, "VSEPR shapes and bond angles", s);
  })();

  const figIonic = (() => {
    const id = "ar-chem4-io";
    let s = "";
    const shell = (x, y, r, el) => C(x, y, r, "none") + el.map(([a, k]) => { const ex = x + r * Math.cos(rad(a)), ey = y - r * Math.sin(rad(a)); return k === "x" ? T(ex, ey + 4, "×", "middle", 12, 'fill="var(--fig-d)"').replace('fill="currentColor" fill=', "fill=") : dot(ex, ey, 2.3); }).join("");
    const cl7 = [[80, "o"], [100, "o"], [170, "o"], [190, "o"], [260, "o"], [280, "o"], [350, "o"]];
    s += shell(40, 60, 22, [[0, "x"]]) + T(40, 64, "Na", "middle", 13, 'font-weight="600"');
    s += T(82, 64, "+", "middle", 16);
    s += shell(130, 60, 26, cl7) + T(130, 64, "Cl", "middle", 13, 'font-weight="600"');
    s += L(170, 60, 205, 60, `marker-end="url(#${id})"`);
    s += `<path d="M222 28h-5v64h5M258 28h5v64h-5" fill="none" stroke="currentColor" stroke-width="1.3"/>` + T(240, 64, "Na", "middle", 13, 'font-weight="600"') + T(268, 32, "+", "start", 13);
    s += `<path d="M282 22h-5v76h5M358 22h5v76h-5" fill="none" stroke="currentColor" stroke-width="1.3"/>` + shell(320, 60, 26, cl7.concat([[10, "x"]])) + T(320, 64, "Cl", "middle", 13, 'font-weight="600"') + T(368, 28, "−", "start", 14);
    s += T(210, 118, "outer shells only: Na transfers one electron (×) to Cl;", "middle", 10.5) + T(210, 132, "both ions then have a noble-gas configuration", "middle", 10.5);
    return S(420, 140, "Dot-and-cross diagram for sodium chloride", s, mk(id));
  })();

  const figNaCl = (() => {
    let s = "";
    const ions = [];
    for (let z = 1; z >= 0; z--) for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) ions.push([40 + c * 46 + z * 26, 130 - r * 46 - z * 22, (r + c + z) % 2, z]);
    // bonds/lines
    ions.forEach(([x, y, , z]) => { if (x + 46 <= 40 + 92 + z * 26) s += L(x, y, x + 46, y, 'stroke="var(--fig-muted)" stroke-width="1"'); if (y - 46 >= 130 - 92 - z * 22) s += L(x, y, x, y - 46, 'stroke="var(--fig-muted)" stroke-width="1"'); if (z === 1) s += L(x, y, x - 26, y + 22, 'stroke="var(--fig-muted)" stroke-width="1"'); });
    ions.forEach(([x, y, k, z]) => (s += k ? C(x, y, 7, "var(--fig-b)", z ? 'fill-opacity=".5"' : "") : C(x, y, 12, "var(--fig-c)", z ? 'fill-opacity=".35"' : 'fill-opacity=".75"')));
    s += C(210, 40, 7, "var(--fig-b)") + T(222, 44, "Na⁺", "start", 12) + C(210, 66, 12, "var(--fig-c)", 'fill-opacity=".75"') + T(228, 70, "Cl⁻", "start", 12);
    s += T(205, 100, "Giant ionic lattice:", "start", 11, 'font-weight="600"') + T(205, 115, "each ion surrounded by 6", "start", 11) + T(205, 129, "oppositely charged ions", "start", 11) + T(205, 143, "(6:6), electrostatic attraction", "start", 11) + T(205, 157, "in all directions", "start", 11);
    return S(380, 170, "Sodium chloride lattice", s);
  })();

  const figCarbon = (() => {
    let s = "";
    // diamond: central + 4 neighbours each with 3 stubs (projection)
    const cx = 75, cy = 85, nb = [[0, -34], [-32, 14], [10, 32], [30, 4]];
    nb.forEach(([dx, dy]) => { const x = cx + dx, y = cy + dy; s += L(cx, cy, x, y, 'stroke-width="1.8"'); [[-18, -14], [18, -12], [0, 20]].forEach(([a, b]) => (s += L(x, y, x + a * (dx >= 0 ? 1 : -1) * 0.8, y + b * (dy >= 0 ? 1 : -1) * 0.8, 'stroke="var(--fig-muted)"') )); });
    [[cx, cy]].concat(nb.map(([dx, dy]) => [cx + dx, cy + dy])).forEach(([x, y]) => (s += C(x, y, 5, "var(--fig-a)")));
    s += T(75, 150, "Diamond", "middle", 12, 'font-weight="600"') + T(75, 164, "each C bonded to 4 C,", "middle", 10.5) + T(75, 177, "tetrahedral, 109.5°, sp³", "middle", 10.5);
    // graphite: three skewed layers
    for (let k = 0; k < 3; k++) s += `<g transform="matrix(1 0 0.6 0.38 ${150 - k * 0} ${28 + k * 40})">${honey(0, 0, 5, 2, 12)}</g>`;
    [[172, 38], [205, 40], [232, 42]].forEach(([x, y]) => (s += L(x, y + 6, x, y + 36, 'stroke="var(--fig-b)" stroke-dasharray="3 3"') + L(x, y + 46, x, y + 76, 'stroke="var(--fig-b)" stroke-dasharray="3 3"')));
    s += T(225, 150, "Graphite", "middle", 12, 'font-weight="600"') + T(225, 164, "hexagon layers, C bonded to 3;", "middle", 10.5) + T(225, 177, "deloc. e⁻; London forces (---)", "middle", 10.5);
    // graphene
    s += honey(330, 50, 4, 3, 12) + T(352, 150, "Graphene", "middle", 12, 'font-weight="600"') + T(365, 164, "single layer of", "middle", 10.5) + T(365, 177, "graphite", "middle", 10.5);
    return S(430, 186, "Diamond, graphite and graphene", s);
  })();

  const figSiO2Metal = (() => {
    let s = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const x = 25 + c * 40, y = 30 + r * 40;
      if (c < 3) s += L(x + 8, y, x + 32, y) + C(x + 20, y, 5, "var(--fig-d)", 'fill-opacity=".7"');
      if (r < 2) s += L(x, y + 8, x, y + 32) + C(x, y + 20, 5, "var(--fig-d)", 'fill-opacity=".7"');
      s += C(x, y, 8, "var(--fig-muted)", 'fill-opacity=".6"') + T(x, y + 3.5, "Si", "middle", 8.5);
    }
    s += C(25, 148, 8, "var(--fig-muted)", 'fill-opacity=".6"') + T(38, 152, "Si", "start", 11) + C(80, 148, 5, "var(--fig-d)", 'fill-opacity=".7"') + T(90, 152, "O", "start", 11);
    s += T(100, 172, "SiO₂: each Si bonded to 4 O,", "middle", 10.5) + T(100, 185, "each O to 2 Si (3-D, flattened)", "middle", 10.5);
    s += `<rect x="215" y="12" width="200" height="140" rx="6" fill="var(--fig-b)" fill-opacity=".14" stroke="currentColor"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += C(245 + c * 36, 38 + r * 42, 12, "var(--fig-fill)") + T(245 + c * 36, 43 + r * 42, "+", "middle", 13);
    [[262, 58], [300, 22], [335, 61], [372, 100], [228, 100], [300, 142], [392, 22], [262, 143], [355, 141], [405, 60]].forEach(([x, y]) => (s += TC(x, y, "e⁻", "var(--fig-b)", "middle", 10)));
    s += T(315, 172, "Metallic: lattice of cations in a sea of", "middle", 10.5) + T(315, 185, "delocalized electrons (electrostatic attraction)", "middle", 10.5);
    return S(430, 192, "Silicon dioxide network and metallic bonding", s);
  })();

  const figIMF = (() => {
    let s = "";
    // water dimer
    s += bond(40, 60, 22, 82) + bond(40, 60, 72, 60) + atom(40, 60, "O", [100, 160]) + atom(22, 82, "H") + atom(72, 60, "H");
    s += L(80, 60, 112, 60, 'stroke="var(--fig-b)" stroke-width="2" stroke-dasharray="3 3"') + atom(124, 60, "O", [180]) + bond(124, 60, 146, 38) + bond(124, 60, 146, 82) + atom(146, 38, "H") + atom(146, 82, "H");
    s += TC(30, 46, "δ−", "var(--fig-d)", "middle", 11) + TC(72, 46, "δ+", "var(--fig-d)", "middle", 11) + TC(126, 42, "δ−", "var(--fig-d)", "middle", 11);
    s += TC(96, 78, "H-bond", "var(--fig-b)", "middle", 11);
    s += T(88, 112, "H-bond: H on N/O/F to a", "middle", 10.5) + T(88, 125, "lone pair on N/O/F", "middle", 10.5);
    // dipole-dipole HCl
    const hcl = (x, y) => bond(x, y, x + 30, y) + atom(x, y, "H") + atom(x + 30, y, "Cl") + TC(x, y - 12, "δ+", "var(--fig-d)", "middle", 11) + TC(x + 30, y - 12, "δ−", "var(--fig-d)", "middle", 11);
    s += hcl(190, 60) + L(232, 60, 252, 60, 'stroke="var(--fig-b)" stroke-dasharray="3 3"') + hcl(262, 60);
    s += T(245, 112, "Dipole–dipole: permanent", "middle", 10.5) + T(245, 125, "δ+ attracts δ− of neighbour", "middle", 10.5);
    // London
    s += `<ellipse cx="360" cy="60" rx="20" ry="16" fill="var(--fig-fill)" stroke="currentColor"/><ellipse cx="418" cy="60" rx="20" ry="16" fill="var(--fig-fill)" stroke="currentColor"/>`;
    s += TC(350, 64, "δ+", "var(--fig-d)", "middle", 11) + TC(371, 64, "δ−", "var(--fig-d)", "middle", 11) + TC(408, 64, "δ+", "var(--fig-d)", "middle", 11) + TC(429, 64, "δ−", "var(--fig-d)", "middle", 11);
    s += T(360, 36, "instantaneous", "middle", 10) + T(418, 36, "induced", "middle", 10);
    s += T(395, 112, "London: temporary dipole", "middle", 10.5) + T(395, 125, "induces a dipole", "middle", 10.5);
    return S(470, 134, "Intermolecular forces", s);
  })();

  const figPolar = (() => {
    const id = "ar-chem4-dp";
    let s = bond(30, 50, 70, 50, 2) + bond(70, 50, 110, 50, 2) + atom(30, 50, "O") + atom(70, 50, "C") + atom(110, 50, "O");
    s += LC(62, 30, 34, 30, "var(--fig-d)", `marker-end="url(#${id})"`) + LC(78, 30, 106, 30, "var(--fig-d)", `marker-end="url(#${id})"`);
    s += T(70, 84, "CO₂: polar bonds, linear,", "middle", 10.5) + T(70, 97, "dipoles cancel → non-polar", "middle", 10.5);
    s += bond(240, 40, 210, 66) + bond(240, 40, 270, 66) + atom(240, 40, "O", [60, 120]) + atom(210, 66, "H") + atom(270, 66, "H");
    s += LC(240, 76, 240, 20, "var(--fig-d)", `marker-end="url(#${id})"`) + TC(250, 26, "net dipole", "var(--fig-d)", "start", 10.5);
    s += T(240, 92, "H₂O: bent, dipoles do not", "middle", 10.5) + T(240, 105, "cancel → polar", "middle", 10.5);
    s += T(170, 122, "arrow points to the more electronegative end (δ−)", "middle", 10.5);
    return S(340, 128, "Molecular polarity of CO2 and H2O", s, mk(id, "var(--fig-d)"));
  })();

  // chem-h1
  const figSigmaPi = (() => {
    let s = "";
    const lob = (x, y, ang, rx, ry, col) => `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${rx}" ry="${ry}" transform="rotate(${ang} ${r1(x)} ${r1(y)})" fill="${col}" fill-opacity=".35" stroke="currentColor" stroke-width="1.1"/>`;
    s += C(40, 40, 16, "var(--fig-b)", 'fill-opacity=".35"') + C(64, 40, 16, "var(--fig-b)", 'fill-opacity=".35"') + dot(40, 40) + dot(64, 40) + T(52, 78, "s + s → σ", "middle", 11);
    s += lob(140, 40, 0, 18, 9, "var(--fig-a)") + lob(166, 40, 0, 18, 9, "var(--fig-a)") + lob(112, 40, 0, 10, 6, "var(--fig-a)") + lob(194, 40, 0, 10, 6, "var(--fig-a)") + dot(124, 40) + dot(182, 40) + T(153, 78, "p + p head-on → σ", "middle", 11);
    s += lob(270, 26, 90, 14, 8, "var(--fig-c)") + lob(270, 54, 90, 14, 8, "var(--fig-c)") + lob(300, 26, 90, 14, 8, "var(--fig-c)") + lob(300, 54, 90, 14, 8, "var(--fig-c)") + dot(270, 40) + dot(300, 40);
    s += `<path d="M262 16Q285 6 308 16M262 64Q285 74 308 64" fill="none" stroke="var(--fig-c)" stroke-width="2"/>` + T(285, 92, "p + p sideways → π", "middle", 11) + T(285, 105, "(above & below the axis)", "middle", 10);
    s += T(190, 128, "single bond = σ · double = σ + π · triple = σ + 2π", "middle", 11);
    return S(380, 136, "Sigma and pi bond formation", s);
  })();

  const figHybrid = (() => {
    let s = "";
    const col = (x, title, lo, hi, loL, hiL) => T(x + 40, 14, title, "middle", 11, 'font-weight="600"') + sub(x + (80 - lo.length * 20) / 2, 80, lo) + T(x + 40, 116, loL, "middle", 11) + sub(x + (80 - hi.length * 20) / 2, 28, hi) + T(x + 40, 64, hiL, "middle", 11);
    s += col(0, "C ground", [2], [1, 1, 0], "2s²", "2p²");
    s += col(105, "promoted", [1], [1, 1, 1], "2s¹", "2p³");
    s += T(207, 115, "", "middle") + sub(220, 54, [1, 1, 1, 1]) + T(260, 90, "4 × sp³", "middle", 11) + T(260, 14, "sp³ (CH₄)", "middle", 11, 'font-weight="600"');
    s += sub(330, 54, [1, 1, 1]) + sub(340, 22, [1]) + T(360, 90, "3 × sp² + p", "middle", 11) + T(360, 14, "sp² (C₂H₄)", "middle", 11, 'font-weight="600"');
    s += sub(430, 54, [1, 1]) + sub(430, 22, [1, 1]) + T(450, 90, "2 × sp + 2p", "middle", 11) + T(450, 14, "sp (C₂H₂)", "middle", 11, 'font-weight="600"');
    s += T(250, 140, "4 domains → sp³ 109.5° · 3 domains → sp² 120° · 2 domains → sp 180°; unhybridized p orbitals form π bonds", "middle", 10.5);
    return S(500, 148, "Hybridization of carbon", s);
  })();

  const figExpanded = (() => {
    let s = "";
    const P = (i) => [(i % 4) * 120, Math.floor(i / 4) * 130];
    const put = (i, body, name, ang) => { const [ox, oy] = P(i); return `<g transform="translate(${ox} ${oy})">${body}${T(60, 104, name, "middle", 11, 'font-weight="600"')}${T(60, 118, ang, "middle", 10.5)}</g>`; };
    const tbp = [[0, -36], [0, 36], [-36, 6], [24, 20], [26, -12]], kinds = ["p", "p", "p", "w", "d"];
    const oct = [[0, -36], [0, 36], [-36, 2], [36, -2], [-16, 20], [16, -20]], okinds = ["p", "p", "p", "p", "w", "d"];
    const arms = (pos, ks, lab, lps) => pos.map((p, i) => [p[0], p[1], lps.includes(i) ? "lp" : ks[i], lab]);
    s += put(0, shape(60, 50, "P", arms(tbp, kinds, "Cl", [])), "trigonal bipyramidal", "PCl₅ 90°, 120°");
    s += put(1, shape(60, 50, "S", arms(tbp, kinds, "F", [2])), "seesaw (1 lp eq.)", "SF₄ <90°, <120°");
    s += put(2, shape(60, 50, "Cl", arms(tbp, kinds, "F", [3, 4])), "T-shaped (2 lp eq.)", "ClF₃ <90°");
    s += put(3, shape(60, 50, "Xe", arms(tbp, kinds, "F", [2, 3, 4])), "linear (3 lp eq.)", "XeF₂ 180°");
    s += put(4, shape(60, 50, "S", arms(oct, okinds, "F", [])), "octahedral", "SF₆ 90°");
    s += put(5, shape(60, 50, "Br", arms(oct, okinds, "F", [1])), "square pyramidal", "BrF₅ <90°");
    s += put(6, shape(60, 50, "Xe", arms(oct, okinds, "F", [0, 1])), "square planar", "XeF₄ 90°");
    s += `<g transform="translate(360 130)">${T(60, 30, "5 domains:", "middle", 11, 'font-weight="600"')}${T(60, 45, "lone pairs go", "middle", 10.5)}${T(60, 58, "equatorial", "middle", 10.5)}${T(60, 78, "6 domains:", "middle", 11, 'font-weight="600"')}${T(60, 93, "2 lone pairs", "middle", 10.5)}${T(60, 106, "opposite (180°)", "middle", 10.5)}</g>`;
    return S(480, 256, "Shapes with five and six electron domains", s);
  })();

  const figReson = (() => {
    const id = "ar-chem-h1-rs";
    let s = "";
    const hex = (cx, cy, r) => [30, 90, 150, 210, 270, 330].map((d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]);
    const ring = (cx, cy, dbl) => { const p = hex(cx, cy, 28); let o = ""; for (let i = 0; i < 6; i++) { const a = p[i], b = p[(i + 1) % 6]; o += L(a[0], a[1], b[0], b[1]); if (dbl.includes(i)) { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, k = 0.78; o += L(cx + (a[0] - cx) * k + (mx - cx) * 0, cy + (a[1] - cy) * k, cx + (b[0] - cx) * k, cy + (b[1] - cy) * k); } } return o; };
    s += ring(45, 55, [0, 2, 4]) + L(85, 55, 115, 55, `marker-start="url(#${id})" marker-end="url(#${id})"`) + ring(155, 55, [1, 3, 5]);
    s += T(100, 105, "benzene resonance structures", "middle", 10.5);
    s += L(198, 55, 222, 55, 'stroke-width="2"') + L(198, 59, 222, 59, 'stroke-width="2"');
    const p = hex(262, 55, 28); for (let i = 0; i < 6; i++) s += L(p[i][0], p[i][1], p[(i + 1) % 6][0], p[(i + 1) % 6][1]);
    s += C(262, 55, 16, "none") + T(262, 105, "resonance hybrid: delocalized π,", "middle", 10.5) + T(262, 118, "all C–C bonds equal (bond order 1.5)", "middle", 10.5);
    // carbonate delocalised
    const cx = 390, cy = 55, O = [[390, 22], [362, 72], [418, 72]];
    O.forEach(([x, y]) => (s += bond(cx, cy, x, y, 1, 8) + (() => { const dx = x - cx, dy = y - cy, len = Math.hypot(dx, dy), nx = (-dy / len) * 4, ny = (dx / len) * 4; return L(cx + (dx / len) * 8 + nx, cy + (dy / len) * 8 + ny, x - (dx / len) * 8 + nx, y - (dy / len) * 8 + ny, 'stroke-dasharray="3 2"'); })() + atom(x, y, "O")));
    s += atom(cx, cy, "C") + `<path d="M350 12h-5v80h5M430 12h5v80h-5" fill="none" stroke="currentColor"/>` + T(440, 16, "2−", "start", 11);
    s += T(390, 112, "CO₃²⁻: bond order 1⅓,", "middle", 10.5) + T(390, 125, "charge ⅔− on each O", "middle", 10.5);
    return S(460, 132, "Resonance and delocalization in benzene and carbonate", s, mk(id));
  })();

  // chem-5
  const figTriangle = (() => {
    const sx = (a) => 50 + ((a - 0.79) / 3.19) * 340, sy = (d) => 210 - (d / 3.2) * 170;
    let s = `<polygon points="${sx(0.79)},${sy(0)} ${r1(sx(3.98))},${sy(0)} ${r1(sx(2.385))},${r1(sy(3.19))}" fill="var(--fig-fill)" stroke="currentColor" stroke-width="1.5"/>`;
    s += L(50, 210, 410, 210) + L(50, 210, 50, 25) + T(410, 238, "average electronegativity", "end", 11) + T(14, 118, "ΔEN (electronegativity difference)", "middle", 11, 'transform="rotate(-90 14 118)"');
    [1, 2, 3, 4].forEach((v) => (s += L(sx(v), 210, sx(v), 214) + T(sx(v), 225, v, "middle", 10)));
    [0, 1, 2, 3].forEach((v) => (s += L(46, sy(v), 50, sy(v)) + T(42, sy(v) + 4, v, "end", 10)));
    const pt = (a, d, lab, anc, dx, dy) => C(sx(a), sy(d), 3.5, "var(--fig-a)") + T(sx(a) + (dx || 0), sy(d) + (dy || -7), lab, anc || "middle", 11);
    s += pt(0.79, 0, "Cs", "start", 4, -6) + pt(3.98, 0, "F₂", "end", -4, -6) + pt(2.385, 3.19, "CsF", "start", 8, 4) + pt(1.97, 2.23, "NaCl", "end", -6, 4) + pt(2.4, 1.6, "AlCl₃", "start", 7, 4) + pt(1.61, 0, "Al", "middle", 0, -7) + pt(3.16, 0, "Cl₂", "middle", 0, -7) + pt(2.7, 1.0, "HCl", "start", 7, 4);
    s += TC(sx(2.385), sy(2.7), "ionic", "var(--fig-d)", "middle", 12) + TC(sx(1.35), sy(0.25), "metallic", "var(--fig-b)", "middle", 12) + TC(sx(3.55), sy(0.22), "covalent", "var(--fig-c)", "middle", 12) + TC(sx(3.05), sy(0.55), "polar covalent", "var(--fig-c)", "end", 11);
    return S(420, 246, "Bonding triangle", s);
  })();

  const figPT = (() => {
    let s = "";
    const cell = (g, p) => { const x = 20 + (g - 1) * 22, y = 22 + (p - 1) * 20; const blk = g <= 2 ? "b" : g >= 13 ? "c" : "a"; return `<rect x="${x}" y="${y}" width="21" height="19" fill="var(--fig-${blk})" fill-opacity=".35" stroke="currentColor" stroke-width=".6"/>`; };
    s += cell(1, 1) + `<rect x="${20 + 17 * 22}" y="22" width="21" height="19" fill="var(--fig-b)" fill-opacity=".35" stroke="currentColor" stroke-width=".6"/>`;
    for (let p = 2; p <= 7; p++) for (let g = 1; g <= 18; g++) { if (g >= 3 && g <= 12 && p < 4) continue; s += cell(g, p); }
    for (let i = 0; i < 14; i++) for (let k = 0; k < 2; k++) s += `<rect x="${86 + i * 22}" y="${172 + k * 20}" width="21" height="19" fill="var(--fig-d)" fill-opacity=".3" stroke="currentColor" stroke-width=".6"/>`;
    [1, 2, 13, 14, 15, 16, 17, 18].forEach((g) => (s += T(30 + (g - 1) * 22, 16, g, "middle", 9.5)));
    for (let p = 1; p <= 7; p++) s += T(12, 36 + (p - 1) * 20, p, "middle", 9.5);
    s += TC(41, 106, "s", "currentColor", "middle", 14) + TC(173, 106, "d", "currentColor", "middle", 14) + TC(338, 82, "p", "currentColor", "middle", 14) + TC(238, 205, "f", "currentColor", "middle", 14);
    s += T(205, 228, "groups 1–2: s · 3–12: d (transition) · 13–18: p · lanthanoids/actinoids: f", "middle", 10.5);
    return S(420, 236, "Blocks of the periodic table", s);
  })();

  const figAlloy = (() => {
    let s = "";
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) s += C(25 + c * 24, 30 + r * 24, 11, "var(--fig-b)", 'fill-opacity=".35"');
    s += L(10, 66, 170, 66, 'stroke="var(--fig-d)" stroke-dasharray="4 3"') + T(90, 136, "pure metal: regular layers", "middle", 10.5) + T(90, 149, "slide easily → malleable, softer", "middle", 10.5);
    const big = [[1, 1], [3, 2], [5, 0], [2, 3]].map(([c, r]) => c + "," + r);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      const isB = big.includes(c + "," + r);
      s += C(225 + c * 24 + (isB ? 1 : 0), 30 + r * 24, isB ? 15 : 11, isB ? "var(--fig-a)" : "var(--fig-b)", isB ? 'fill-opacity=".55"' : 'fill-opacity=".35"');
    }
    s += T(290, 136, "alloy: different-sized atoms", "middle", 10.5) + T(290, 149, "distort layers → harder, stronger", "middle", 10.5);
    return S(390, 156, "Pure metal compared with an alloy", s);
  })();

  const figPolymer = (() => {
    const id = "ar-chem5-po";
    let s = T(20, 64, "n", "middle", 14);
    s += bond(50, 60, 90, 60, 2) + atom(50, 60, "C") + atom(90, 60, "C") + bond(50, 60, 35, 35) + bond(50, 60, 35, 85) + bond(90, 60, 105, 35) + bond(90, 60, 105, 85) + atom(35, 32, "H") + atom(35, 88, "H") + atom(105, 32, "H") + atom(108, 88, "CH₃");
    s += L(135, 60, 175, 60, `marker-end="url(#${id})"`) + T(155, 50, "addition", "middle", 10);
    s += `<path d="M205 20h-6v80h6M285 20h6v80h-6" fill="none" stroke="currentColor" stroke-width="1.4"/>` + T(298, 104, "n", "start", 14);
    s += L(188, 60, 216, 60) + bond(225, 60, 265, 60) + L(274, 60, 302, 60) + atom(225, 60, "C") + atom(265, 60, "C") + bond(225, 60, 225, 30) + bond(225, 60, 225, 90) + bond(265, 60, 265, 30) + bond(265, 60, 265, 90) + atom(225, 26, "H") + atom(225, 94, "H") + atom(265, 26, "H") + atom(265, 94, "CH₃");
    s += T(165, 120, "propene → poly(propene): the C=C opens;", "middle", 10.5) + T(165, 134, "continuation bonds pass through the brackets", "middle", 10.5);
    return S(330, 140, "Addition polymerization of propene", s, mk(id));
  })();

  const figSkeletal = (() => {
    let s = "";
    const P = (i) => [(i % 3) * 150, Math.floor(i / 3) * 95];
    const zig = (pts) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    const put = (i, body, name, fam) => { const [ox, oy] = P(i); return `<g transform="translate(${ox} ${oy})">${body}${T(55, 72, name, "middle", 11, 'font-weight="600"')}${T(55, 85, fam, "middle", 10)}</g>`; };
    s += put(0, zig([[15, 45], [35, 30], [55, 45], [75, 30]]), "butane", "alkane");
    s += put(1, zig([[15, 45], [35, 30], [55, 45]]) + L(55, 45, 75, 30) + L(58, 49, 78, 34), "but-1-ene", "alkene");
    s += put(2, zig([[15, 45], [35, 30], [55, 45], [72, 34]]) + T(84, 34, "OH", "middle", 12), "propan-1-ol", "alcohol");
    s += put(3, zig([[15, 45], [35, 30], [55, 45]]) + L(32, 29, 32, 12) + L(38, 29, 38, 12) + T(35, 10, "O", "middle", 12), "propanone", "ketone");
    s += put(4, L(12, 45, 30, 30) + L(27, 30, 27, 14) + L(33, 30, 33, 14) + T(30, 11, "O", "middle", 12) + L(30, 30, 43, 40) + T(48, 49, "O", "middle", 12) + L(53, 40, 66, 30) + L(66, 30, 84, 45), "ethyl ethanoate", "ester");
    s += put(5, zig([[15, 45], [35, 30], [55, 45]]) + L(55, 45, 68, 37) + T(80, 38, "NH₂", "middle", 12), "propan-1-amine", "amine");
    return S(450, 190, "Skeletal formulas", s);
  })();
  const figCarbonyl = (() => {
    let s = "";
    const zig = (pts) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    s += zig([[15, 50], [35, 35], [55, 50], [75, 35]]) + L(73, 36, 73, 16) + L(79, 36, 79, 16) + T(76, 13, "O", "middle", 12) + T(55, 78, "butanal (aldehyde)", "middle", 11, 'font-weight="600"');
    s += `<g transform="translate(120 0)">${zig([[15, 50], [35, 35], [55, 50], [75, 35]]) + L(73, 36, 73, 16) + L(79, 36, 79, 16) + T(76, 13, "O", "middle", 12) + L(75, 35, 92, 46) + T(104, 52, "OH", "middle", 12) + T(55, 78, "butanoic acid", "middle", 11, 'font-weight="600"')}</g>`;
    s += `<g transform="translate(250 0)">${zig([[15, 50], [35, 35], [55, 50]]) + L(55, 50, 70, 41) + T(80, 42, "Cl", "middle", 12) + T(48, 78, "1-chloropropane", "middle", 11, 'font-weight="600"')}</g>`;
    s += `<g transform="translate(360 0)">${zig([[15, 50], [35, 35], [55, 50]]) + L(55, 50, 70, 41) + T(80, 40, "C", "middle", 12) + L(87, 40, 100, 40) + L(87, 36, 100, 36) + L(87, 44, 100, 44) + T(108, 44, "N", "middle", 12) + T(55, 78, "butanenitrile", "middle", 11, 'font-weight="600"')}</g>`;
    return S(480, 88, "Skeletal formulas of carbonyl and other groups", s);
  })();

  const figAlcClass = (() => {
    let s = "";
    const C4 = (ox, subs, name) => {
      let o = `<g transform="translate(${ox} 0)">` + atom(60, 55, "C");
      [[60, 20], [25, 55], [95, 55], [60, 90]].forEach(([x, y], i) => (o += bond(60, 55, x, y) + atom(x, y, subs[i], [], subs[i].length > 1 ? 12 : 13)));
      return o + T(60, 116, name, "middle", 11, 'font-weight="600"') + "</g>";
    };
    s += C4(0, ["H", "R", "H", "OH"], "primary (1°)") + C4(130, ["H", "R", "R′", "OH"], "secondary (2°)") + C4(260, ["R″", "R", "R′", "OH"], "tertiary (3°)");
    s += T(190, 136, "count the C atoms bonded to the C that carries the OH (or halogen): 1, 2 or 3", "middle", 10.5);
    return S(390, 144, "Primary, secondary and tertiary alcohols", s);
  })();

  const figIR = (() => {
    const X0 = 40, X1 = 430, Y0 = 170, Y1 = 25, wn = (w) => X0 + ((4000 - w) / 3500) * (X1 - X0);
    const g = (w, c, wd, dp) => dp * Math.exp(-(((w - c) / wd) ** 2));
    const tr = (w) => 95 - g(w, 3350, 160, 70) - g(w, 2950, 45, 40) - g(w, 1050, 40, 60) - g(w, 1450, 25, 22) - g(w, 1380, 15, 18) - g(w, 880, 20, 25);
    let s = `<path d="${pathF(tr, 4000, 500, X0, X1, (t) => Y0 - (t / 100) * (Y0 - Y1), 300)}" fill="none" stroke="var(--fig-a)" stroke-width="1.8"/>`;
    s += L(X0, Y0, X1, Y0) + L(X0, Y0, X0, Y1 - 6) + [4000, 3000, 2000, 1500, 1000, 500].map((w) => L(wn(w), Y0, wn(w), Y0 + 4) + T(wn(w), Y0 + 15, w, "middle", 10)).join("");
    s += T(X1, Y0 + 30, "wavenumber / cm⁻¹", "end", 11) + T(14, 98, "Transmittance / %", "middle", 11, 'transform="rotate(-90 14 98)"');
    s += T(wn(3350), 118, "O–H (alcohol)", "middle", 10.5) + T(wn(3350), 131, "broad 3200–3600", "middle", 10) + T(wn(2950), 78, "C–H 2850–3090", "start", 10.5) + T(wn(1050), 130, "C–O", "middle", 10.5) + T(wn(1050), 143, "1050–1410", "middle", 10);
    s += T(wn(1900), 62, "no C=O at 1700–1750", "middle", 10.5) + T(wn(720), 100, "fingerprint", "middle", 10, 'fill="var(--fig-muted)"').replace('fill="currentColor" fill=', "fill=");
    return S(440, 206, "Infrared spectrum of ethanol (sketch)", s);
  })();

  const figMSorg = massSpec("Mass spectrum of ethanol", [[15, 12, "15"], [27, 20, "27"], [29, 22, "29"], [31, 100, "31 CH₂OH⁺"], [45, 50, "45"], [46, 22, "46"]], 12, 48, "ar-chem6-ms");

  const figNMRlow = (() => {
    const X0 = 40, X1 = 420, Y0 = 140, sx = (d) => X0 + ((6 - d) / 6) * (X1 - X0);
    let s = L(X0, Y0, X1, Y0) + [6, 5, 4, 3, 2, 1, 0].map((d) => L(sx(d), Y0, sx(d), Y0 + 4) + T(sx(d), Y0 + 15, d, "middle", 10)).join("") + T(X1, Y0 + 30, "chemical shift δ / ppm", "end", 11);
    [[3.7, 2, "CH₂"], [2.6, 1, "OH (variable)"], [1.2, 3, "CH₃"]].forEach(([d, n, lab]) => (s += LC(sx(d), Y0, sx(d), Y0 - n * 28, "var(--fig-a)", 'stroke-width="3"') + T(sx(d), Y0 - n * 28 - 18, lab, "middle", 10.5) + T(sx(d), Y0 - n * 28 - 6, `${n}H`, "middle", 10.5)));
    s += L(sx(0), Y0, sx(0), Y0 - 12, 'stroke="var(--fig-muted)"') + T(sx(0), Y0 - 16, "TMS", "middle", 10);
    s += T(230, 20, "3 signals = 3 H environments · integration (peak area) ratio 2 : 1 : 3", "middle", 10.5);
    return S(440, 176, "Low-resolution 1H NMR spectrum of ethanol", s);
  })();

  const figIsomers = (() => {
    let s = "";
    const zig = (pts) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    s += zig([[10, 50], [30, 35], [50, 50], [70, 35], [90, 50]]) + T(50, 80, "pentane", "middle", 11, 'font-weight="600"') + T(50, 94, "bp 36 °C", "middle", 10.5);
    s += `<g transform="translate(120 0)">${zig([[10, 50], [30, 35], [50, 50], [70, 35]]) + L(30, 35, 30, 15) + T(45, 80, "2-methylbutane", "middle", 11, 'font-weight="600"') + T(45, 94, "bp 28 °C", "middle", 10.5)}</g>`;
    s += `<g transform="translate(250 0)">${L(45, 45, 20, 45) + L(45, 45, 70, 45) + L(45, 45, 45, 20) + L(45, 45, 45, 68) + T(45, 84, "2,2-dimethylpropane", "middle", 11, 'font-weight="600"') + T(45, 98, "bp 10 °C", "middle", 10.5)}</g>`;
    s += T(185, 116, "more branching → less surface contact →", "middle", 10.5) + T(185, 130, "weaker London forces → lower bp", "middle", 10.5);
    return S(370, 136, "Structural isomers of pentane", s);
  })();

  // chem-h2
  const figDsplit = (() => {
    let s = "";
    const bx = (x, y, n) => sub(x, y, Array(n).fill(0));
    s += bx(30, 90, 5) + T(80, 128, "free ion: 5 degenerate 3d", "middle", 10.5);
    s += L(135, 101, 175, 62, 'stroke-dasharray="3 2"') + L(135, 101, 175, 132, 'stroke-dasharray="3 2"');
    s += bx(185, 50, 2) + T(260, 65, "e_g (2 orbitals, higher)", "start", 10.5) + bx(175, 120, 3) + T(260, 135, "t₂g (3 orbitals, lower)", "start", 10.5);
    s += LC(240, 118, 240, 76, "var(--fig-d)", 'marker-start="url(#ar-chem-h2-d)" marker-end="url(#ar-chem-h2-d)"') + TC(246, 102, "ΔE = hν", "var(--fig-d)", "start", 11);
    s += T(205, 20, "Octahedral complex: ligands split the 3d sublevel", "middle", 11, 'font-weight="600"');
    s += T(205, 165, "e⁻ absorbs visible light of energy ΔE (t₂g → e_g); complementary colour transmitted", "middle", 10.5);
    return S(420, 174, "Splitting of d orbitals in an octahedral complex", s, mk("ar-chem-h2-d", "var(--fig-d)"));
  })();

  const figComplex = (() => {
    let s = `<path d="M18 10h-6v104h6M152 10h6v104h-6" fill="none" stroke="currentColor" stroke-width="1.3"/>` + T(162, 16, "2+", "start", 12);
    s += shape(85, 62, "Cu", [[0, -42, "p", "OH₂"], [0, 42, "p", "OH₂"], [-50, 0, "p", "H₂O"], [50, 0, "p", "OH₂"], [-26, 26, "w", "H₂O"], [26, -26, "d", "OH₂"]]);
    s += T(95, 132, "[Cu(H₂O)₆]²⁺: octahedral, 90°;", "middle", 10.5) + T(95, 145, "6 coordination (dative) bonds O→Cu", "middle", 10.5);
    s += `<g transform="translate(200 0)">${shape(80, 62, "Cu", [[0, -38, "p", "Cl"], [-34, 18, "p", "Cl"], [26, 26, "w", "Cl"], [34, 0, "d", "Cl"]])}<path d="M28 14h-6v96h6M132 14h6v96h-6" fill="none" stroke="currentColor" stroke-width="1.3"/>${T(142, 20, "2−", "start", 12)}${T(80, 132, "[CuCl₄]²⁻: tetrahedral,", "middle", 10.5)}${T(80, 145, "109.5°, 4 coordination", "middle", 10.5)}</g>`;
    return S(380, 152, "Shapes of complex ions", s);
  })();

  const figWheel = (() => {
    const cols = [["red", "#e0202a"], ["orange", "#ff8a1f"], ["yellow", "#e8d42a"], ["green", "#2fbf4a"], ["blue", "#2f6bff"], ["violet", "#7a3cff"]];
    let s = "";
    cols.forEach(([n, c], i) => {
      const a0 = rad(90 - i * 60 - 30), a1 = rad(90 - i * 60 + 30), cx = 100, cy = 85, R = 62;
      s += `<path d="M${cx} ${cy}L${r1(cx + R * Math.cos(a0))} ${r1(cy - R * Math.sin(a0))}A${R} ${R} 0 0 0 ${r1(cx + R * Math.cos(a1))} ${r1(cy - R * Math.sin(a1))}Z" fill="${c}" fill-opacity=".8" stroke="currentColor" stroke-width=".8"/>`;
      const am = rad(90 - i * 60);
      s += T(cx + 80 * Math.cos(am), cy - 80 * Math.sin(am) + 4, n, "middle", 11);
    });
    s += T(210, 60, "Complementary colours are", "start", 10.5) + T(210, 74, "opposite each other.", "start", 10.5) + T(210, 96, "e.g. [Cu(H₂O)₆]²⁺ absorbs", "start", 10.5) + T(210, 110, "orange/red → appears blue.", "start", 10.5);
    return S(380, 172, "Colour wheel", s);
  })();

  const figCisTrans = (() => {
    let s = "";
    const alk = (ox, a, b, c, d, name) => `<g transform="translate(${ox} 0)">${bond(45, 55, 85, 55, 2)}${atom(45, 55, "C")}${atom(85, 55, "C")}${bond(45, 55, 25, 25)}${bond(45, 55, 25, 85)}${bond(85, 55, 105, 25)}${bond(85, 55, 105, 85)}${atom(20, 22, a, [], 12)}${atom(20, 88, b, [], 12)}${atom(110, 22, c, [], 12)}${atom(110, 88, d, [], 12)}${T(65, 112, name, "middle", 11, 'font-weight="600"')}</g>`;
    s += alk(0, "H₃C", "H", "CH₃", "H", "cis-but-2-ene (Z)") + alk(150, "H₃C", "H", "H", "CH₃", "trans-but-2-ene (E)");
    s += T(150, 130, "no rotation about C=C (π bond);", "middle", 10.5) + T(150, 144, "each C carries two different groups", "middle", 10.5);
    return S(300, 152, "cis and trans isomers of but-2-ene", s);
  })();

  const figEnant = (() => {
    let s = "";
    s += shape(70, 60, "C", [[0, -38, "p", "OH"], [-38, 16, "p", "CH₃"], [28, 26, "w", "H"], [46, 4, "d", "C₂H₅"]]);
    s += L(160, 10, 160, 115, 'stroke="var(--fig-muted)" stroke-dasharray="5 3"') + T(160, 128, "mirror", "middle", 10);
    s += shape(250, 60, "C", [[0, -38, "p", "OH"], [38, 16, "p", "CH₃"], [-28, 26, "w", "H"], [-46, 4, "d", "C₂H₅"]]);
    s += T(160, 146, "butan-2-ol: chiral C with 4 different groups;", "middle", 10.5) + T(160, 159, "non-superimposable mirror images", "middle", 10.5);
    return S(320, 166, "Enantiomers of butan-2-ol", s);
  })();

  const figNMRhi = (() => {
    const X0 = 30, X1 = 420, Y0 = 130, sx = (d) => X0 + ((5 - d) / 5) * (X1 - X0);
    let s = L(X0, Y0, X1, Y0) + [5, 4, 3, 2, 1, 0].map((d) => L(sx(d), Y0, sx(d), Y0 + 4) + T(sx(d), Y0 + 15, d, "middle", 10)).join("") + T(X1, Y0 + 30, "δ / ppm", "end", 11);
    const mult = (d, heights, lab) => { let o = ""; heights.forEach((h, i) => { const x = sx(d) + (i - (heights.length - 1) / 2) * 7; o += LC(x, Y0, x, Y0 - h, "var(--fig-a)", 'stroke-width="2"'); }); return o + T(sx(d), Y0 - Math.max(...heights) - 8, lab, "middle", 10.5); };
    s += mult(3.7, [12, 36, 36, 12], "CH₂ quartet (next to CH₃)") + mult(2.6, [30], "OH singlet") + mult(1.2, [40, 80, 40], "CH₃ triplet");
    s += T(225, 16, "High-resolution ¹H NMR of ethanol: n neighbouring H → n + 1 peaks", "middle", 10.5);
    return S(440, 166, "High-resolution 1H NMR of ethanol with splitting", s);
  })();

  // chem-7
  const figCalor = (() => {
    let s = "";
    // coffee cup
    s += `<path d="M30 60L40 160H110L120 60Z" fill="var(--fig-fill)" stroke="currentColor" stroke-width="1.4"/><path d="M26 60H124" stroke="currentColor" stroke-width="3"/>`;
    s += `<path d="M38 90L44 155H106L112 90Z" fill="var(--fig-b)" fill-opacity=".25"/>`;
    s += `<rect x="62" y="15" width="7" height="125" rx="3" fill="none" stroke="currentColor"/>` + C(65.5, 140, 5, "var(--fig-d)");
    s += L(92, 25, 92, 130) + L(82, 130, 102, 130) + T(150, 22, "thermometer / probe", "start", 10.5) + L(72, 20, 146, 20, 'stroke="var(--fig-muted)"') + T(150, 40, "stirrer", "start", 10.5) + L(96, 37, 146, 37, 'stroke="var(--fig-muted)"');
    s += T(150, 62, "lid", "start", 10.5) + L(124, 60, 146, 60, 'stroke="var(--fig-muted)"') + T(150, 110, "solution (known V, c)", "start", 10.5) + L(108, 110, 146, 110, 'stroke="var(--fig-muted)"');
    s += T(150, 150, "polystyrene cup (insulated)", "start", 10.5) + L(116, 148, 146, 148, 'stroke="var(--fig-muted)"');
    s += T(75, 182, "(a) Solution / neutralization", "middle", 11, 'font-weight="600"');
    // combustion
    const ox = 290;
    s += `<g transform="translate(${ox} 0)"><rect x="40" y="50" width="70" height="60" fill="var(--fig-fill)" stroke="currentColor" stroke-width="1.4"/><rect x="42" y="66" width="66" height="42" fill="var(--fig-b)" fill-opacity=".25"/>`;
    s += `<rect x="70" y="10" width="7" height="90" rx="3" fill="none" stroke="currentColor"/>`;
    s += `<path d="M75 150q-10 -14 0 -30q10 16 0 30z" fill="var(--fig-a)" fill-opacity=".6" stroke="currentColor"/><rect x="58" y="150" width="34" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    s += `<path d="M20 30V178M130 30V178" stroke="var(--fig-muted)" stroke-width="3"/>`;
    s += T(140, 22, "thermometer", "start", 10.5) + T(140, 82, "copper can", "start", 10.5) + T(140, 95, "+ water", "start", 10.5) + T(140, 140, "flame", "start", 10.5) + T(140, 172, "spirit burner", "start", 10.5) + T(140, 185, "(weigh before/after)", "start", 10.5);
    s += T(-2, 40, "draught", "end", 10) + T(-2, 52, "shield", "end", 10);
    s += `</g>` + T(ox + 75, 200, "(b) Enthalpy of combustion", "middle", 11, 'font-weight="600"');
    s += T(260, 222, "q = mcΔT (m = mass of water/solution) · ΔH = −q ÷ n · main error: heat loss to surroundings", "middle", 10.5);
    return S(520, 230, "Calorimetry apparatus", s);
  })();

  const figHess = (() => {
    const id = "ar-chem7-hs";
    let s = `<rect x="20" y="20" width="130" height="30" rx="5" fill="var(--fig-fill)" stroke="currentColor"/>` + T(85, 40, "C(s) + 2H₂(g) + 2O₂", "middle", 11.5);
    s += `<rect x="250" y="20" width="110" height="30" rx="5" fill="var(--fig-fill)" stroke="currentColor"/>` + T(305, 40, "CH₄(g) + 2O₂(g)", "middle", 11.5);
    s += `<rect x="125" y="135" width="140" height="30" rx="5" fill="var(--fig-fill)" stroke="currentColor"/>` + T(195, 155, "CO₂(g) + 2H₂O(l)", "middle", 11.5);
    s += LC(152, 35, 248, 35, "var(--fig-a)", `marker-end="url(#${id})"`) + TC(200, 28, "ΔH_f(CH₄) = ?", "var(--fig-a)", "middle", 11);
    s += L(85, 52, 160, 132, `marker-end="url(#${id})"`) + T(70, 100, "ΔH₁ = ΔH_c(C)", "middle", 10.5) + T(70, 114, "+ 2ΔH_c(H₂)", "middle", 10.5);
    s += L(305, 52, 230, 132, `marker-end="url(#${id})"`) + T(318, 100, "ΔH₂ = ΔH_c(CH₄)", "middle", 10.5);
    s += T(195, 186, "Hess: ΔH₁ = ΔH_f + ΔH₂, so ΔH_f = ΔH₁ − ΔH₂ (route independence)", "middle", 10.5);
    return S(390, 194, "Hess's law cycle using combustion data", s, mk(id));
  })();

  const figEnLevel = (() => {
    const id = "ar-chem7-el";
    let s = L(30, 20, 30, 170, `marker-start="url(#${id})"`) + T(24, 95, "H", "middle", 12, 'transform="rotate(-90 24 95)"');
    s += L(50, 60, 130, 60, 'stroke-width="2.5"') + T(90, 54, "reactants", "middle", 11) + L(50, 140, 130, 140, 'stroke-width="2.5"') + T(90, 156, "products", "middle", 11);
    s += LC(140, 62, 140, 138, "var(--fig-d)", `marker-end="url(#${id}d)"`) + TC(146, 104, "ΔH < 0", "var(--fig-d)", "start", 11) + T(95, 185, "exothermic", "middle", 11, 'font-weight="600"');
    s += L(230, 20, 230, 170, `marker-start="url(#${id})"`) + T(224, 95, "H", "middle", 12, 'transform="rotate(-90 224 95)"');
    s += L(250, 140, 330, 140, 'stroke-width="2.5"') + T(290, 156, "reactants", "middle", 11) + L(250, 60, 330, 60, 'stroke-width="2.5"') + T(290, 54, "products", "middle", 11);
    s += LC(340, 138, 340, 62, "var(--fig-b)", `marker-end="url(#${id}b)"`) + TC(346, 104, "ΔH > 0", "var(--fig-b)", "start", 11) + T(295, 185, "endothermic", "middle", 11, 'font-weight="600"');
    return S(400, 194, "Enthalpy level diagrams", s, mk(id) + mk(id + "d", "var(--fig-d)") + mk(id + "b", "var(--fig-b)"));
  })();

  const figFuelCell = (() => {
    let s = `<rect x="60" y="30" width="260" height="120" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    s += `<rect x="95" y="30" width="16" height="120" fill="var(--fig-muted)" fill-opacity=".5"/><rect x="269" y="30" width="16" height="120" fill="var(--fig-muted)" fill-opacity=".5"/>`;
    s += `<rect x="111" y="30" width="158" height="120" fill="var(--fig-b)" fill-opacity=".12"/>` + T(190, 95, "electrolyte", "middle", 11);
    s += T(103, 165, "anode (−)", "middle", 10.5) + T(277, 165, "cathode (+)", "middle", 10.5);
    s += T(30, 70, "H₂ in", "middle", 11) + T(350, 70, "O₂ in", "middle", 11) + T(350, 125, "H₂O out", "middle", 11);
    s += `<path d="M103 30V12H277V30" fill="none" stroke="currentColor"/>` + `<rect x="170" y="5" width="40" height="14" fill="var(--fig-fill)" stroke="currentColor"/>` + T(190, 16, "load", "middle", 10) + T(140, 8, "e⁻ →", "middle", 10);
    s += T(190, 186, "acidic: anode H₂ → 2H⁺ + 2e⁻ · cathode O₂ + 4H⁺ + 4e⁻ → 2H₂O", "middle", 10.5);
    s += T(190, 200, "overall 2H₂ + O₂ → 2H₂O; chemical energy → electrical energy directly", "middle", 10.5);
    return S(380, 208, "Hydrogen–oxygen fuel cell", s);
  })();

  // ======================= PLOT DIAGRAMS =======================
  const gas = (title, xl, yl, kind, extra) => Object.assign({ title, x: [0, 10], y: [0, 10], grid: false, xLabel: xl, yLabel: yl,
    curves: [kind === "inv" ? { f: (x) => 8 / x, domain: [0.8, 10], color: "a" } : kind === "flat" ? { f: () => 5, domain: [0.3, 9.6], color: "a" } : { f: (x) => 0.9 * x, domain: [0, 10], color: "a" }] }, extra || {});
  const profile = (r, p, A, x0) => (x) => r + (p - r) / (1 + Math.exp(-(x - 5) * 1.6)) + A * Math.exp(-((x - (x0 || 5)) ** 2) / 1.4);
  const seg = (pts, color) => pts.slice(1).map((p, i) => ({ from: pts[i], to: p, color }));

  const IE_Al = [578, 1817, 2745, 11577, 14842, 18379, 23326, 27465, 31853, 38473, 42647, 201266, 222316].map((v, i) => [i + 1, Math.log10(v)]);
  const IE_P3 = [["Na", 496], ["Mg", 738], ["Al", 578], ["Si", 787], ["P", 1012], ["S", 1000], ["Cl", 1251], ["Ar", 1521]].map(([s, v], i) => [11 + i, v, s]);
  const IE_20 = [1312, 2372, 520, 900, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 787, 1012, 1000, 1251, 1521, 419, 590].map((v, i) => [i + 1, v]);
  const sym20 = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"];

  const dSuccIE = { title: "Successive ionization energies of aluminium (log scale): jumps after the 3rd and 11th electrons", x: [0, 14], y: [2, 5.6], origin: false, grid: false, xLabel: "Number of electron removed", yLabel: "log₁₀(IE / kJ mol⁻¹)",
    lines: seg(IE_Al, "a"), points: IE_Al.map(([x, y]) => ({ at: [x, y], color: "a" })),
    texts: [{ at: [2.2, 2.8], text: "3s²3p¹ (3 e⁻)" }, { at: [6.5, 3.9], text: "2s²2p⁶ (8 e⁻)" }, { at: [9.6, 5.35], text: "1s² (2 e⁻)" }] };
  const dIEP3 = { title: "First ionization energy across period 3", x: [10.5, 18.5], y: [300, 1700], origin: false, grid: false, xLabel: "Atomic number", yLabel: "IE₁ / kJ mol⁻¹",
    lines: seg(IE_P3.map(([x, y]) => [x, y]), "a"), points: IE_P3.map(([x, y, s]) => ({ at: [x, y], color: "a", label: s })),
    texts: [{ at: [13.4, 400], text: "Al dip: 3p e⁻ higher in energy", anchor: "start" }, { at: [14.2, 1400], text: "S dip: paired 3p e⁻ repel", anchor: "middle" }] };
  const dIE20 = { title: "First ionization energy for Z = 1 to 20: peaks at noble gases, minima at group 1", x: [0, 21], y: [0, 2600], origin: false, grid: false, xLabel: "Atomic number", yLabel: "IE₁ / kJ mol⁻¹",
    lines: seg(IE_20, "b"), points: IE_20.map(([x, y], i) => ({ at: [x, y], color: "b", label: [0, 1, 2, 9, 10, 17, 18].includes(i) ? sym20[i] : "" })) };

  const BP = { 14: [112, 161, 185, 221], 15: [240, 185, 218, 256], 16: [373, 213, 232, 271], 17: [293, 188, 206, 238] };
  const dHydrides = { title: "Boiling points of hydrides, groups 14–17: H₂O, HF and NH₃ are anomalously high (hydrogen bonding)", x: [1.6, 5.6], y: [80, 400], origin: false, grid: false, xLabel: "Period", yLabel: "bp / K",
    lines: [].concat(...Object.entries(BP).map(([g, v], k) => seg(v.map((y, i) => [2 + i, y]), ["muted", "c", "a", "b"][k]))),
    points: [{ at: [2, 112], label: "CH₄", color: "muted" }, { at: [2, 240], label: "NH₃", color: "c" }, { at: [2, 373], label: "H₂O", color: "a" }, { at: [2, 293], label: "HF", color: "b" }, { at: [5, 221], label: "SnH₄", color: "muted" }, { at: [5, 271], label: "H₂Te", color: "a" }] };

  const dRadP3 = { title: "Atomic radius across period 3 decreases (nuclear charge rises, same shielding)", x: [10.5, 17.5], y: [80, 200], origin: false, grid: false, xLabel: "Atomic number", yLabel: "radius / pm",
    lines: seg([[11, 186], [12, 160], [13, 143], [14, 117], [15, 110], [16, 104], [17, 99]], "a"),
    points: [[11, 186, "Na"], [12, 160, "Mg"], [13, 143, "Al"], [14, 117, "Si"], [15, 110, "P"], [16, 104, "S"], [17, 99, "Cl"]].map(([x, y, l]) => ({ at: [x, y], label: l, color: "a" })) };
  const dENP3 = { title: "Electronegativity across period 3 increases", x: [10.5, 17.5], y: [0, 3.6], origin: false, grid: false, xLabel: "Atomic number", yLabel: "EN (Pauling)",
    lines: seg([[11, 0.9], [12, 1.3], [13, 1.6], [14, 1.9], [15, 2.2], [16, 2.6], [17, 3.2]], "b"),
    points: [[11, 0.9, "Na"], [12, 1.3, "Mg"], [13, 1.6, "Al"], [14, 1.9, "Si"], [15, 2.2, "P"], [16, 2.6, "S"], [17, 3.2, "Cl"]].map(([x, y, l]) => ({ at: [x, y], label: l, color: "b" })) };

  const ALK = [-162, -89, -42, -1, 36, 69, 98, 126];
  const dAlkBP = { title: "Boiling points of straight-chain alkanes rise with chain length (stronger London forces), by smaller steps", x: [0, 9], y: [-200, 160], origin: false, grid: false, xLabel: "Number of C atoms", yLabel: "bp / °C",
    lines: seg(ALK.map((y, i) => [i + 1, y]), "a"), points: ALK.map((y, i) => ({ at: [i + 1, y], color: "a", label: i === 0 ? "CH₄" : i === 7 ? "C₈H₁₈" : "" })), hlines: [{ y: 0 }] };

  const dCooling = { title: "Cooling curve: plateau at the freezing point (energy released as particles attract)", x: [0, 12], y: [0, 120], origin: false, grid: false, xLabel: "Time", yLabel: "Temperature / °C",
    lines: [{ from: [0, 110], to: [3, 60] }, { from: [3, 60], to: [7, 60] }, { from: [7, 60], to: [11.5, 20] }],
    texts: [{ at: [1.6, 95], text: "liquid" }, { at: [5, 66], text: "liquid + solid", anchor: "middle" }, { at: [9.6, 40], text: "solid" }],
    hlines: [{ y: 60, label: "freezing point" }] };
  const dKE = { title: "Average kinetic energy ∝ absolute temperature (K)", x: [0, 10], y: [0, 10], grid: false, xLabel: "T / K", yLabel: "average Eₖ", curves: [{ f: (x) => 0.9 * x, color: "a" }] };

  const dEndo = { title: "Endothermic profile with and without a catalyst (catalyst lowers Ea, ΔH unchanged)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Reaction coordinate", yLabel: "Enthalpy",
    curves: [{ f: profile(3, 6, 4.2), color: "a" }, { f: profile(3, 6, 2.4), color: "c", dash: true }],
    lines: [{ from: [0.3, 3], to: [9.7, 3], dash: true, color: "muted" }, { from: [9.3, 3], to: [9.3, 6], color: "b" }, { from: [5, 3], to: [5, 8.6], color: "a" }],
    texts: [{ at: [0.4, 2.3], text: "reactants" }, { at: [8.3, 6.6], text: "products", anchor: "middle" }, { at: [9.1, 4.4], text: "ΔH > 0", anchor: "end" }, { at: [5.15, 4.6], text: "Ea" }, { at: [5.6, 9.2], text: "uncatalysed" }, { at: [6.4, 7.1], text: "catalysed" }] };
  const dExoCat = { title: "Exothermic profile with catalyst (alternative pathway, lower Ea)", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Reaction coordinate", yLabel: "Enthalpy",
    curves: [{ f: profile(6.5, 3, 3.6), color: "a" }, { f: profile(6.5, 3, 2.2), color: "c", dash: true }],
    lines: [{ from: [9.3, 6.5], to: [9.3, 3], color: "b" }, { from: [0.3, 6.5], to: [9.7, 6.5], dash: true, color: "muted" }],
    texts: [{ at: [0.4, 7.1], text: "reactants" }, { at: [7.6, 2.3], text: "products", anchor: "middle" }, { at: [9.1, 4.6], text: "ΔH < 0", anchor: "end" }, { at: [5.4, 9.5], text: "uncatalysed" }, { at: [5.9, 7.9], text: "catalysed" }] };

  // ======================= DATA =======================
  IB.addExamFrames("chem", { topics: {
    "chem-1": {
      diagrams: [dCooling, dKE],
      figures: [
        { title: "Particle diagrams of the three states", caption: "draw particles the same size; solid touching in rows, liquid touching but irregular, gas widely spaced", svg: figParticles },
        { title: "Changes of state", caption: "solid → liquid → gas changes are endothermic; the reverse are exothermic", svg: figStates },
        { title: "The nuclear atom", caption: "tiny dense nucleus with almost all the mass; electrons occupy energy levels (not to scale)", svg: figAtom },
        { title: "Paper chromatography", caption: "baseline in pencil above the solvent level; measure to the centre of each spot", svg: figChrom },
        { title: "Mass spectrum of magnesium", caption: "Ar = (24 × 79.0 + 25 × 10.0 + 26 × 11.0) ÷ 100 = 24.3; for an element the peaks are its isotopes (singly charged ions)", svg: figMsMg },
      ],
      frames: [
        { title: "Sketch a cooling curve and identify the freezing point",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "A pure liquid is cooled from 110 °C to 20 °C. It freezes at 60 °C. Sketch the temperature–time graph and label the region where liquid and solid are both present.",
          marks: ["temperature falls, then a __horizontal plateau__ at 60 °C, then falls again", "plateau labelled liquid + solid / freezing; axes labelled temperature and time"],
          diagram: dCooling,
          model: "Temperature decreases with time, stays constant at 60 °C while the liquid freezes (energy released as attractions form balances heat lost), then decreases again once all is solid.",
          reject: "sloping plateau for a pure substance; plateau at the wrong temperature",
          tip: "純物質凝固時溫度唔變，畫一條水平線。" },
        { title: "Draw particle diagrams for solid, liquid and gas",
          paper: "P2", where: "Paper 1B / 2 · 2 marks",
          q: "Draw diagrams to show the arrangement of particles in a solid, a liquid and a gas.",
          marks: ["solid: regular arrangement, particles touching", "liquid: particles touching but irregular; gas: particles far apart and random"],
          svg: figParticles,
          model: "Solid - closely packed in a regular lattice; liquid - close together but disordered (some gaps); gas - widely spaced, random.",
          reject: "liquid particles drawn far apart; different-sized particles",
          tip: "液體粒子仍然貼近，唔好畫到好疏。" },
        { title: "Sketch the mass spectrum of an element from isotope abundances",
          paper: "P2", where: "Paper 1B / 2 · 2 marks",
          q: "Chlorine atoms exist as ³⁵Cl (75.8 %) and ³⁷Cl (24.2 %). Sketch the mass spectrum of chlorine atoms and calculate Ar.",
          marks: ["two lines at m/z 35 and 37 with heights in ratio about 3 : 1, axes m/z and relative abundance", ["A1", "Ar = (35 × 75.8 + 37 × 24.2) ÷ 100 = 35.5"]],
          svg: figMsCl, numeric: { value: 35.5, tol: 0.05 },
          model: "Vertical lines at m/z = 35 (75.8 %) and m/z = 37 (24.2 %). Ar = (35 × 75.8 + 37 × 24.2)/100 = 35.5.",
          reject: "a peak at 36; a smooth curve instead of lines",
          tip: "質譜係一條條直線，唔係曲線。" },
      ],
    },
    "chem-2": {
      figures: [
        { title: "Orbital box diagrams: C, N, O, F, O²⁻", caption: "one box per orbital; arrows show electron spin", svg: figOrbP },
        { title: "Orbital box diagrams: Fe, Fe²⁺, Fe³⁺, Cr, Cr³⁺, Cu, Cu²⁺", caption: "transition metal ions lose 4s electrons before 3d", svg: figOrbD },
        { title: "Aufbau (filling order) diagram", caption: "4s fills before 3d because it is lower in energy in the neutral atom", svg: figAufbau },
        { title: "Shapes of s and p orbitals", caption: "IB requires the s orbital and the three p orbitals (p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>)", svg: figSP },
        { title: "Hydrogen energy levels with Lyman and Balmer transitions", caption: "E = −1312/n² kJ mol⁻¹ (for reference); arrows point DOWN for emission; Paschen series (→ n = 3) is infrared", svg: figHlevels },
        { title: "Continuous vs line emission spectrum", caption: "a line spectrum shows electrons have discrete (quantized) energy levels", svg: figSpectra },
        { title: "Convergence in the Lyman series", caption: "lines get closer together at higher frequency and end at the convergence limit", svg: figLyman },
      ],
      frames: [
        { title: "Draw orbital box diagrams for a transition metal and its ion", star: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw the orbital diagram (arrows in boxes) for the 3d and 4s sublevels of an iron atom and of an Fe²⁺ ion.",
          marks: ["Fe: 3d boxes ↑↓ ↑ ↑ ↑ ↑ and 4s ↑↓", "Fe²⁺: 3d unchanged (↑↓ ↑ ↑ ↑ ↑), __4s empty__ (4s electrons removed first)"],
          svg: figOrbD,
          model: "Fe [Ar]: 3d ↑↓ ↑ ↑ ↑ ↑, 4s ↑↓. Fe²⁺ [Ar]: 3d ↑↓ ↑ ↑ ↑ ↑, 4s empty - four unpaired electrons in both.",
          accept: "half-arrows; 4s drawn before 3d",
          reject: "Fe²⁺ as [Ar]3d⁴4s²; paired electrons with the same spin",
          tip: "離子先拎走 4s，再拎 3d。Cr、Cu 係例外：3d⁵4s¹、3d¹⁰4s¹。" },
        { title: "Draw an energy level diagram with transitions", star: true,
          paper: "P2", where: "Paper 2 · 2–3 marks",
          q: "Draw an energy level diagram for the hydrogen atom showing the first four levels. Show the transition that produces the line of lowest energy in the visible spectrum and the transition corresponding to ionization.",
          marks: ["levels drawn __getting closer together__ as n increases (converging towards n = ∞)", "visible lowest-energy line: arrow __down__ from n = 3 to n = 2", "ionization: arrow from n = 1 up to n = ∞"],
          svg: figHlevels,
          model: "Horizontal lines for n = 1-4 and ∞ with gaps decreasing upwards; a downward arrow 3 → 2 (red line, 656 nm); an upward arrow from n = 1 to n = ∞ for ionization.",
          reject: "equally spaced levels; upward arrow for an emission line",
          tip: "放光一定係箭咀向下；能級越高越密。" },
        { title: "Sketch the shapes of s and p orbitals",
          paper: "P2", where: "Paper 1A / 2 · 1–2 marks",
          q: "Sketch the shape of a 1s orbital and a 2pₓ orbital, showing the axes.",
          marks: ["s: sphere centred on the nucleus", "pₓ: dumbbell with two lobes along the x-axis, nucleus at the centre"],
          svg: figSP,
          model: "1s - spherical; 2pₓ - two lobes (dumbbell) on opposite sides of the nucleus along the x-axis; the three p orbitals are mutually perpendicular.",
          tip: "p 軌域要對準指定嘅軸。" },
      ],
      concepts: [
        { h: "Drawing orbital and energy level diagrams (exam conventions)", b: "<p>Orbital diagrams: one box per orbital, sublevel labelled (e.g. 3d, 4s), half-arrows ↑↓ for opposite spins, apply Hund's rule in p and d. Energy level diagrams: levels get closer together as n increases and converge at n = ∞; <strong>emission</strong> = arrow down, <strong>absorption/excitation</strong> = arrow up. ΔE = hν = hc/λ: bigger drop → higher frequency, shorter wavelength. Transitions to n = 1 (Lyman) are UV, to n = 2 (Balmer) visible, to n = 3 (Paschen) infrared.</p>" },
      ],
    },
    "chem-3": {
      diagrams: [
        gas("p vs V (T, n constant): inverse curve, pV = constant (Boyle)", "V", "p", "inv"),
        gas("p vs 1/V (T, n constant): straight line through origin", "1/V", "p", "lin"),
        gas("pV vs p (T, n constant): horizontal line for an ideal gas", "p", "pV", "flat"),
        gas("V vs T in kelvin (p, n constant): straight line through origin (Charles)", "T / K", "V", "lin"),
        { title: "V vs T in °C (p, n constant): straight line meeting the T-axis at −273 °C", x: [-300, 300], y: [0, 10], grid: false, xLabel: "T / °C", yLabel: "V",
          curves: [{ f: (x) => (x + 273) / 60, domain: [-273, 300], color: "a" }], lines: [{ from: [-273, 0], to: [-273, 0], color: "a" }], points: [{ at: [-273, 0], label: "−273 °C", color: "a" }] },
        gas("p vs T in kelvin (V, n constant): straight line through origin (Gay-Lussac)", "T / K", "p", "lin"),
        gas("V vs n (p, T constant): straight line through origin (Avogadro)", "n", "V", "lin"),
        gas("ρ vs V for a fixed mass of gas: inverse curve (ρ = m/V)", "V", "ρ", "inv"),
        gas("ρ vs p (T constant): straight line through origin (ρ = pM/RT)", "p", "ρ", "lin"),
        gas("ρ vs T in kelvin (p constant): inverse curve (ρ = pM/RT)", "T / K", "ρ", "inv"),
        gas("Mr vs T (ρ and p constant): straight line through origin (M = ρRT/p)", "T / K", "Mr", "lin"),
        gas("c (= n/V) vs T (p constant): inverse curve (c = p/RT)", "T / K", "c", "inv"),
        gas("c (= n/V) vs p (T constant): straight line through origin (c = p/RT)", "p", "c", "lin"),
        gas("Vm vs p (T constant): inverse curve (Vm = RT/p)", "p", "Vm", "inv"),
        gas("Vm vs T in kelvin (p constant): straight line through origin (Vm = RT/p)", "T / K", "Vm", "lin"),
        { title: "pV/nRT vs p: ideal gas = 1; real gases deviate (attractions lower it, particle volume raises it at high p)", x: [0, 10], y: [0, 2], grid: false, xLabel: "p", yLabel: "pV/nRT",
          curves: [{ f: () => 1, color: "a", label: "ideal" }, { f: (x) => 1 - 0.16 * x + 0.026 * x * x, color: "b", dash: true, label: "real gas", labelX: 8.5 }] },
      ],
      frames: [
        { title: "Sketch ideal-gas relationship graphs (p–T, ρ–V, Mr–T, c–T, Vm–p)", star: true,
          paper: "P1A", where: "Paper 1A / 2 · 1 mark each",
          q: "For an ideal gas, sketch: (a) p against T (V and n constant); (b) density ρ against V for a fixed mass; (c) Mr deduced from ρ = pM/RT against T with ρ and p constant; (d) concentration c = n/V against T at constant p; (e) molar volume Vm against p at constant T.",
          marks: [["a", "p ∝ T: straight line through the origin (T in K)"], ["b", "ρ = m/V: inverse (hyperbola) curve"], ["c", "M = ρRT/p: straight line through the origin"], ["d", "c = p/RT: inverse curve"], ["e", "Vm = RT/p: inverse curve"]],
          svg: figGasGrid,
          model: "Rearrange pV = nRT for the y-variable with the constants grouped: y = k·x → straight line through origin; y = k/x → inverse curve; y = k → horizontal line. (a) p = (nR/V)T; (b) ρ = m × 1/V; (c) M = (ρR/p)T; (d) c = n/V = (p/R) × 1/T; (e) Vm = RT × 1/p. (pV against p is horizontal.)",
          reject: "inverse curves touching the axes; straight lines not through the origin when T is in K",
          tip: "先將公式寫成 y = k x（直線過原點）或 y = k/x（反比曲線）。" },
        { title: "Sketch p against V and p against 1/V (Boyle's law)",
          paper: "P2", where: "Paper 1A / 2 · 2 marks",
          q: "Sketch graphs of pressure against volume and pressure against 1/volume for a fixed mass of ideal gas at constant temperature.",
          marks: ["p vs V: inverse curve (does not touch the axes)", "p vs 1/V: straight line through the origin"],
          diagram: gas("p vs V at constant T: inverse curve", "V", "p", "inv"),
          model: "pV = constant, so p against V is a hyperbola approaching but not touching either axis, and p against 1/V is a straight line through the origin.",
          tip: "反比曲線唔可以掂到條軸。" },
        { title: "Sketch the deviation of a real gas from ideal behaviour",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Sketch pV/nRT against p for an ideal gas and for a real gas such as CO₂ at room temperature, and explain the shape of the real-gas curve at high pressure.",
          marks: ["ideal: horizontal line at pV/nRT = 1; real: dips below 1 then rises above 1", "at high p the volume of the particles is significant (not negligible), so pV/nRT > 1"],
          diagram: { title: "pV/nRT vs p: ideal vs real", x: [0, 10], y: [0, 2], grid: false, xLabel: "p", yLabel: "pV/nRT", curves: [{ f: () => 1, color: "a", label: "ideal" }, { f: (x) => 1 - 0.16 * x + 0.026 * x * x, color: "b", dash: true, label: "real", labelX: 8.5 }] },
          model: "Ideal gas: pV/nRT = 1 at all pressures. Real gas: below 1 at moderate p (intermolecular attractions reduce the pressure), above 1 at high p (particle volume becomes a significant fraction of the container volume).",
          tip: "低溫高壓最唔理想。" },
      ],
      concepts: [
        { h: "Deriving the shape of any gas-law graph", b: "<p>Rearrange \\(pV = nRT\\) (or \\(\\rho = \\frac{pM}{RT}\\), \\(c = \\frac{n}{V} = \\frac{p}{RT}\\), \\(V_m = \\frac{RT}{p}\\)) so the y-variable is alone and everything held constant is grouped as k. <strong>y = kx</strong> → straight line through the origin (p–T, V–T, V–n, ρ–p, c–p, Vm–T, Mr–T at constant ρ and p, p–1/V). <strong>y = k/x</strong> → inverse curve (p–V, ρ–V, ρ–T, c–T, Vm–p). <strong>y = k</strong> → horizontal line (pV–p, pV/T–T, Vm–n). Temperature must be in kelvin for a line through the origin; in °C the line cuts the axis at −273 °C.</p>" },
      ],
    },
    "chem-4": {
      diagrams: [dHydrides],
      figures: [
        { title: "Lewis structures", caption: "show ALL lone pairs on every atom (lines or dot/cross pairs); coordination bond as an arrow", svg: figLewis },
        { title: "VSEPR shapes and bond angles (2–4 electron domains)", caption: "lone pairs repel more than bonding pairs: each lone pair reduces the angle by about 2–2.5°", svg: figVSEPR },
        { title: "Dot-and-cross formation of NaCl", caption: "ions in square brackets with charges", svg: figIonic },
        { title: "Sodium chloride lattice", caption: "", svg: figNaCl },
        { title: "Carbon allotropes", caption: "C₆₀ fullerene: 60 C atoms in pentagons and hexagons, each bonded to 3 - a molecule, not a giant structure", svg: figCarbon },
        { title: "Silicon dioxide and metallic bonding", caption: "", svg: figSiO2Metal },
        { title: "Intermolecular forces", caption: "strength: London < dipole–dipole < hydrogen bonding (for molecules of similar mass)", svg: figIMF },
        { title: "Molecular polarity", caption: "polar bonds + asymmetric shape → polar molecule", svg: figPolar },
      ],
      frames: [
        { title: "Draw hydrogen bonding between molecules", star: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw a diagram showing a hydrogen bond between two water molecules. Include partial charges and lone pairs.",
          marks: ["hydrogen bond drawn (dashed) from an __H of one molecule to a lone pair on O__ of the other", "partial charges δ+ on H and δ− on O; O–H···O approximately linear"],
          svg: figIMF,
          model: "Two bent H₂O molecules with lone pairs on O; a dashed line from H(δ+) on one molecule to a lone pair on O(δ−) of the other, O–H···O close to 180°.",
          reject: "hydrogen bond drawn to H; drawn as an O–H covalent bond within the same molecule",
          tip: "氫鍵係分子之間，要連去另一粒分子嘅孤對電子。" },
        { title: "Draw a giant structure (NaCl, diamond, graphite, metal)",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw the structure of graphite and use it to explain why graphite conducts electricity and is soft.",
          marks: ["layers of hexagonal rings, each C covalently bonded to three others", "weak (London) forces between layers → layers slide; one delocalized electron per C → conducts"],
          svg: figCarbon,
          model: "Graphite: planar layers of hexagons, each C sp² bonded to 3 C; each C has one delocalized electron free to move along the layers (conducts); layers held by weak London forces and slide over each other (soft, lubricant).",
          reject: "ionic bonds / free ions in graphite; covalent bonds between layers",
          tip: "石墨導電係因為離域電子，唔係離子。" },
        { title: "Draw a dot-and-cross diagram for an ionic compound",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw a dot-and-cross diagram to show the formation of sodium chloride from its atoms (outer shells only).",
          marks: ["Na loses its outer electron to Cl (arrow/transfer shown)", "products [Na]⁺ and [Cl]⁻ with 8 outer electrons on Cl⁻ in brackets with charges"],
          svg: figIonic,
          model: "Na (1 outer ×) + Cl (7 outer •) → [Na]⁺ [Cl with 7 • and 1 ×]⁻.",
          reject: "shared electron pair between Na and Cl",
          tip: "離子化合物唔可以畫共用電子對。" },
        { title: "Sketch and explain boiling points of hydrides",
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch the trend in boiling points of the hydrides of group 16 (H₂O to H₂Te) and explain the position of H₂O.",
          marks: ["H₂O anomalously high; H₂S lowest; then increasing H₂Se, H₂Te", "H₂O forms __hydrogen bonds__ between molecules", "H₂S → H₂Te: more electrons → stronger London forces"],
          diagram: dHydrides,
          model: "bp rises from H₂S to H₂Te because London forces increase with the number of electrons; H₂O is far higher than expected because hydrogen bonds between molecules need more energy to overcome.",
          tip: "H₂O、HF、NH₃ 特別高 → 氫鍵。" },
      ],
    },
    "chem-h1": {
      diagrams: [dSuccIE, dIEP3, dIE20],
      figures: [
        { title: "σ and π bond formation", caption: "a π bond is weaker than a σ bond and prevents rotation", svg: figSigmaPi },
        { title: "Hybridization of carbon", caption: "", svg: figHybrid },
        { title: "Shapes with 5 and 6 electron domains", caption: "angles less than ideal when lone pairs are present", svg: figExpanded },
        { title: "Resonance and delocalization", caption: "resonance structures are not in equilibrium; the real structure is the hybrid", svg: figReson },
      ],
      frames: [
        { title: "Sketch a successive ionization energy graph", star: true, hl: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Sketch a graph of log₁₀(successive ionization energy) against the number of electrons removed for aluminium, and explain the position of the first large increase.",
          marks: ["all 13 values increase; large jumps between the 3rd/4th and the 11th/12th electrons", "4th electron removed from an inner shell (2p) closer to the nucleus / less shielded"],
          diagram: dSuccIE,
          model: "IE rises steadily, with a large jump after 3 electrons (3s²3p¹ removed, next from n = 2) and another after 11 (next from n = 1). Group 13.",
          tip: "數大跳之前有幾多粒電子 = 族數（價電子）。" },
        { title: "Sketch first ionization energy across period 3", hl: true,
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch the first ionization energies of the elements Na to Ar and explain the decrease from Mg to Al and from P to S.",
          marks: ["general increase Na → Ar with dips at Al and S", "Al: electron removed from 3p, higher in energy / further from nucleus than 3s", "S: electron removed from a doubly occupied 3p orbital - spin-pair repulsion"],
          diagram: dIEP3,
          model: "Increases across the period (nuclear charge increases, similar shielding) with dips at Al (3p¹ electron is higher in energy than 3s) and S (paired 3p electrons repel).",
          tip: "記住兩個低位：13 族同 16 族。" },
        { title: "Draw shapes with 5 or 6 electron domains", hl: true,
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Draw the 3D shape of SF₄ showing lone pairs, state its molecular geometry and predict the bond angles.",
          marks: ["5 electron domains: 4 bonding + 1 lone pair, lone pair __equatorial__", "seesaw", "angles less than 90° and 120° (about 87° and 102°/117°)"],
          svg: figExpanded,
          model: "S has 4 bonding pairs and 1 lone pair → trigonal bipyramidal domains; lone pair equatorial → seesaw; F–S–F angles slightly less than 90° and 120°.",
          tip: "五個域：孤對電子放赤道位置。" },
        { title: "Draw σ and π bonds", hl: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw diagrams to show how a σ bond and a π bond form from atomic orbitals.",
          marks: ["σ: head-on (axial) overlap, electron density along the internuclear axis", "π: sideways overlap of parallel p orbitals, electron density above and below the axis"],
          svg: figSigmaPi,
          model: "σ - end-on overlap of s/p/hybrid orbitals on the bond axis; π - sideways overlap of two parallel p orbitals, two regions above and below the axis.",
          tip: "π 鍵電子雲喺鍵軸上下。" },
      ],
    },
    "chem-5": {
      diagrams: [dRadP3, dENP3],
      figures: [
        { title: "Bonding triangle", caption: "x: average EN; y: ΔEN. Higher ΔEN → more ionic character. Values from the data booklet electronegativities", svg: figTriangle },
        { title: "Blocks of the periodic table", caption: "", svg: figPT },
        { title: "Pure metal vs alloy", caption: "", svg: figAlloy },
        { title: "Addition polymer", caption: "", svg: figPolymer },
      ],
      frames: [
        { title: "Sketch and explain a periodic trend graph",
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch how atomic radius changes from Na to Cl and explain the trend.",
          marks: ["decrease from Na to Cl", "nuclear charge increases (more protons)", "electrons added to the same shell / similar shielding, so outer electrons pulled closer"],
          diagram: dRadP3,
          model: "Atomic radius decreases across period 3 because the nuclear charge increases while the electrons enter the same energy level with similar shielding, so the attraction for the outer electrons increases.",
          tip: "同一周期：核電荷增加、屏蔽差唔多 → 半徑細。" },
        { title: "Draw the structure of an alloy",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw diagrams of a pure metal and an alloy and explain why the alloy is harder.",
          marks: ["pure metal: regular layers of identical cations; alloy: different-sized atoms in the lattice", "different-sized atoms disrupt the layers so they cannot slide easily"],
          svg: figAlloy,
          model: "In a pure metal identical cations form regular layers that slide when a force is applied; in an alloy atoms of a different size distort the layers, making it harder for them to slide.",
          tip: "大細唔同嘅原子令層唔易滑動。" },
      ],
    },
    "chem-6": {
      diagrams: [dAlkBP],
      figures: [
        { title: "Skeletal formulas", caption: "each line end or vertex is a C; H on C not shown; heteroatoms and their H written in", svg: figSkeletal },
        { title: "Skeletal formulas: aldehyde, carboxylic acid, halogenoalkane, nitrile", caption: "", svg: figCarbonyl },
        { title: "Classifying alcohols", caption: "", svg: figAlcClass },
        { title: "Structural isomers of C₅H₁₂", caption: "", svg: figIsomers },
        { title: "IR spectrum of ethanol", caption: "use the data booklet ranges; the fingerprint region is below 1500 cm⁻¹", svg: figIR },
        { title: "Mass spectrum of ethanol", caption: "molecular ion M⁺ at m/z 46; 45 = M − H; 31 = CH₂OH⁺ (loss of CH₃); 29 = C₂H₅⁺; 15 = CH₃⁺", svg: figMSorg },
        { title: "Low-resolution ¹H NMR of ethanol", caption: "", svg: figNMRlow },
      ],
      frames: [
        { title: "Sketch boiling point against number of carbon atoms",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Sketch how the boiling point of straight-chain alkanes changes from CH₄ to C₈H₁₈ and explain the trend.",
          marks: ["bp increases with chain length; increase becomes smaller", "more electrons / larger surface area → stronger London forces"],
          diagram: dAlkBP,
          model: "Boiling point rises with each extra CH₂ because larger molecules have more electrons and greater surface contact, so London forces are stronger; the relative increase gets smaller as chain length grows.",
          tip: "每多一個 CH₂，London force 強啲，沸點高啲。" },
        { title: "Draw skeletal / structural formulas of isomers",
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Draw skeletal formulas of the three structural isomers of C₅H₁₂, name them and identify the one with the lowest boiling point.",
          marks: ["pentane", "2-methylbutane", "2,2-dimethylpropane - lowest bp (most branched, least surface contact)"],
          svg: figIsomers,
          model: "Pentane (bp 36 °C), 2-methylbutane (28 °C), 2,2-dimethylpropane (10 °C, lowest because the most branched, compact molecule has the weakest London forces).",
          reject: "“3-methylbutane”; drawing a bent chain as a new isomer",
          tip: "條鏈彎咗唔係新異構體。" },
        { title: "Sketch a ¹H NMR spectrum from a structure",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Predict the low-resolution ¹H NMR spectrum of ethanol: number of signals, approximate chemical shifts and the ratio of peak areas.",
          marks: ["3 signals: CH₃ ≈ 1.2, CH₂ ≈ 3.3–3.7 (next to O), OH (variable 1–6)", "peak area ratio 3 : 2 : 1"],
          svg: figNMRlow,
          model: "Three environments: CH₃ (≈1.2 ppm, 3H), CH₂–O (≈3.7 ppm, 2H), O–H (variable, 1H); integration 3 : 2 : 1.",
          tip: "訊號數目 = H 環境數目；面積比 = H 數目比。" },
      ],
    },
    "chem-h2": {
      figures: [
        { title: "d-orbital splitting in an octahedral complex", caption: "", svg: figDsplit },
        { title: "Complex ion shapes", caption: "ligands donate lone pairs (coordination bonds) to the central metal ion", svg: figComplex },
        { title: "Colour wheel", caption: "the colour seen is complementary to the colour absorbed", svg: figWheel },
        { title: "cis–trans (E/Z) isomers", caption: "", svg: figCisTrans },
        { title: "Enantiomers", caption: "wedge = towards viewer, hashed = away; the two drawings are mirror images", svg: figEnant },
        { title: "High-resolution ¹H NMR with splitting", caption: "OH usually a singlet (rapid proton exchange)", svg: figNMRhi },
      ],
      frames: [
        { title: "Draw cis and trans isomers", hl: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw the cis and trans isomers of but-2-ene and explain why they exist.",
          marks: ["cis: both CH₃ on the same side of C=C; trans: on opposite sides (correct bond angles about 120°)", "restricted rotation about the C=C (π bond), with two different groups on each C"],
          svg: figCisTrans,
          model: "cis-but-2-ene: CH₃ groups same side; trans: opposite sides. The π bond prevents rotation about C=C, and each C carries two different groups (H and CH₃).",
          tip: "要講「π 鍵令 C=C 唔可以轉」。" },
        { title: "Draw 3D enantiomers", hl: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Draw the two enantiomers of butan-2-ol using wedge and dash bonds and identify the chiral carbon.",
          marks: ["tetrahedral 3D drawings (wedge/dash) with the four groups H, OH, CH₃, C₂H₅", "drawings are mirror images; chiral C (C-2) marked"],
          svg: figEnant,
          model: "Two tetrahedral drawings of C-2 bearing H, OH, CH₃ and C₂H₅, one the mirror image of the other (non-superimposable).",
          tip: "畫鏡像，記得用楔形同虛線。" },
        { title: "Draw d-orbital splitting and explain colour", hl: true, star: true,
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Draw a diagram showing the splitting of the 3d orbitals in an octahedral complex and use it to explain why [Cu(H₂O)₆]²⁺ is blue.",
          marks: ["five degenerate 3d orbitals split into a lower set of three and a higher set of two", "electron absorbs visible light (orange/red) of energy ΔE = hν and moves to the higher set", "complementary colour (blue) is transmitted / seen"],
          svg: figDsplit,
          model: "The ligands split the 3d orbitals into two sets separated by ΔE. An electron is promoted from the lower to the upper set by absorbing a photon of visible light; the light not absorbed (blue, the complement of orange) is seen.",
          tip: "見到嘅顏色 = 冇被吸收嘅互補色。" },
        { title: "Predict a high-resolution ¹H NMR splitting pattern", hl: true,
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Predict the splitting of each signal in the high-resolution ¹H NMR spectrum of ethanol.",
          marks: ["CH₃: triplet (2 H on adjacent C, n + 1 = 3); CH₂: quartet (3 adjacent H)", "OH: singlet"],
          svg: figNMRhi,
          model: "CH₃ (1.2 ppm) triplet, CH₂ (3.7 ppm) quartet, OH singlet; areas 3 : 2 : 1.",
          tip: "n + 1：數隔籬碳上嘅 H。" },
      ],
    },
    "chem-7": {
      diagrams: [dEndo, dExoCat],
      figures: [
        { title: "Calorimetry setups", caption: "", svg: figCalor },
        { title: "Enthalpy level diagrams", caption: "ΔH = H(products) − H(reactants)", svg: figEnLevel },
        { title: "Hess's law cycle", caption: "arrows follow the direction of each reaction; reverse an arrow → change the sign", svg: figHess },
        { title: "Hydrogen fuel cell", caption: "", svg: figFuelCell },
      ],
      frames: [
        { title: "Sketch an endothermic energy profile with a catalyst",
          paper: "P2", where: "Paper 2 · 3 marks",
          q: "Sketch an energy profile for an endothermic reaction, with and without a catalyst. Label ΔH and Ea.",
          marks: ["products __higher__ than reactants; ΔH upward from reactants to products", "Ea from reactants to the peak", "catalysed curve with a lower peak, same reactant and product levels"],
          diagram: dEndo,
          model: "Products above reactants (ΔH > 0); single hump; Ea measured from reactants to the top; catalysed pathway has a lower hump but the same ΔH.",
          reject: "catalyst changing ΔH; Ea measured from products",
          tip: "催化劑只係降低 Ea，ΔH 唔變。" },
        { title: "Draw and label calorimetry apparatus",
          paper: "P1B", where: "Paper 1B · 2 marks",
          q: "Draw labelled diagrams of the apparatus to measure (a) the enthalpy of neutralization and (b) the enthalpy of combustion of ethanol, and state one way heat loss is reduced in each.",
          marks: ["(a) polystyrene cup with lid, thermometer, solutions; (b) spirit burner under a copper can of water with thermometer", "lid / insulation; draught shield / short distance flame to can"],
          svg: figCalor,
          model: "(a) Insulated polystyrene cup + lid + thermometer + stirrer; (b) spirit burner (weighed) under a copper calorimeter of known mass of water, thermometer, draught shields.",
          tip: "記住寫「蓋」同「擋風板」減少熱流失。" },
        { title: "Construct a Hess's law cycle",
          paper: "P2", where: "Paper 2 · 2 marks",
          q: "Construct a Hess's law cycle to determine the enthalpy of formation of methane from enthalpies of combustion of carbon, hydrogen and methane.",
          marks: ["cycle: elements → CH₄ (ΔH_f) and both → CO₂ + 2H₂O via combustion arrows", "ΔH_f = ΔH_c(C) + 2ΔH_c(H₂) − ΔH_c(CH₄)"],
          svg: figHess,
          model: "C + 2H₂ (+2O₂) → CH₄ (+2O₂) is ΔH_f; both combust to CO₂ + 2H₂O. ΔH_f = [ΔH_c(C) + 2ΔH_c(H₂)] − ΔH_c(CH₄).",
          tip: "箭咀方向同反應方向一致；逆行就轉符號。" },
      ],
    },
  }});
})();
