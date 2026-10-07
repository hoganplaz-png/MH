/* English B HL - layout templates, structure diagrams, strategy flowcharts and timelines to know (original). */
(function () {
  // ---------- helpers: build compact, theme-safe SVGs ----------
  const FS = 11;
  const lines = (s) => String(s || "").split("|").filter((x, i, a) => x !== "" || a.length === 1);
  const tspans = (arr, x, y0, dy) => arr.map((l, i) => `<tspan x="${x}" y="${y0 + i * dy}">${l}</tspan>`).join("");
  const marker = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  const col = (c) => `var(--fig-${c || "a"})`;

  // Annotated page layout: page on the left, labelled zones, annotations with arrows on the right.
  // rows: { t: "zone text|line 2", a: "annotation|line 2", al: "l"|"r"|"c", c: "a".."d"|"muted", gap }
  function tpl(id, label, rows, head) {
    const W = 500, px = 10, pw = 250, bx = 20, bw = 230, ax = 276;
    let y = head ? 34 : 14, body = "";
    if (head) body += `<text x="${px + pw / 2}" y="22" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">${head}</text>`;
    rows.forEach((r) => {
      const tl = lines(r.t), al = lines(r.a);
      const h = Math.max(tl.length * 14 + 10, al.length * 13 + 6, 24);
      const anchor = r.al === "r" ? "end" : r.al === "c" ? "middle" : "start";
      const tx = r.al === "r" ? bx + bw - 8 : r.al === "c" ? bx + bw / 2 : bx + 8;
      const c = col(r.c);
      body += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="4" fill="var(--fig-fill)" stroke="${c}" stroke-width="1.4"/>`;
      body += `<text font-size="${FS}" fill="currentColor" text-anchor="${anchor}">${tspans(tl, tx, y + 16, 14)}</text>`;
      if (r.a) {
        const my = y + h / 2;
        body += `<line x1="${ax - 4}" y1="${my}" x2="${bx + bw + 3}" y2="${my}" stroke="${c}" stroke-width="1.2" marker-end="url(#${id})"/>`;
        const ty = my - ((al.length - 1) * 13) / 2 + 4;
        body += `<text font-size="${FS}" fill="currentColor">${tspans(al, ax, ty, 13)}</text>`;
      }
      y += h + (r.gap == null ? 6 : r.gap);
    });
    const H = y + 8;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${marker(id)}` +
      `<rect x="${px}" y="${head ? 6 : 6}" width="${pw}" height="${H - 12}" rx="6" fill="none" stroke="currentColor" stroke-width="1.2"/>${body}</svg>`;
  }

  // Vertical flowchart with side notes. steps: { t: "box|text", n: "note|text", c, q: true (question step) }
  function flow(id, label, steps) {
    const W = 500, bx = 14, bw = 236, nx = 266;
    let y = 10, body = "";
    steps.forEach((s, i) => {
      const tl = lines(s.t), nl = lines(s.n);
      const h = Math.max(tl.length * 14 + 12, nl.length * 13 + 6, 26);
      const c = col(s.c || (s.q ? "b" : "a"));
      body += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="${s.q ? 12 : 4}" fill="var(--fig-fill)" stroke="${c}" stroke-width="1.5"${s.q ? ' stroke-dasharray="5 3"' : ""}/>`;
      body += `<text font-size="${FS}" fill="currentColor" text-anchor="middle"${s.q ? ' font-style="italic"' : ""}>${tspans(tl, bx + bw / 2, y + 17, 14)}</text>`;
      if (s.n) {
        const ty = y + h / 2 - ((nl.length - 1) * 13) / 2 + 4;
        body += `<line x1="${bx + bw}" y1="${y + h / 2}" x2="${nx - 4}" y2="${y + h / 2}" stroke="var(--fig-muted)" stroke-dasharray="2 2"/>`;
        body += `<text font-size="${FS}" fill="${s.nc ? col(s.nc) : "currentColor"}">${tspans(nl, nx, ty, 13)}</text>`;
      }
      y += h;
      if (i < steps.length - 1) {
        body += `<line x1="${bx + bw / 2}" y1="${y}" x2="${bx + bw / 2}" y2="${y + 16}" stroke="currentColor" stroke-width="1.3" marker-end="url(#${id})"/>`;
        y += 18;
      }
    });
    return `<svg viewBox="0 0 ${W} ${y + 10}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${marker(id)}${body}</svg>`;
  }

  // Horizontal timeline bar. segs: { t: "label", m: minutes, sub: "sub|label", c }
  function timeline(id, label, segs, unit, foot) {
    const W = 500, x0 = 14, x1 = 486, total = segs.reduce((s, g) => s + g.m, 0);
    let x = x0, body = "", subMax = 1;
    segs.forEach((g) => { subMax = Math.max(subMax, lines(g.sub).length); });
    segs.forEach((g) => {
      const w = ((x1 - x0) * g.m) / total, c = col(g.c);
      body += `<rect x="${x.toFixed(1)}" y="20" width="${w.toFixed(1)}" height="34" fill="var(--fig-fill)" stroke="${c}" stroke-width="1.6"/>`;
      body += `<text x="${(x + w / 2).toFixed(1)}" y="35" font-size="${FS}" font-weight="700" text-anchor="middle" fill="currentColor">${g.t}</text>`;
      body += `<text x="${(x + w / 2).toFixed(1)}" y="49" font-size="${FS}" text-anchor="middle" fill="${c}">${g.d || g.m + " " + unit}</text>`;
      body += `<text font-size="${FS}" text-anchor="middle" fill="currentColor">${tspans(lines(g.sub), +(x + w / 2).toFixed(1), 72, 13)}</text>`;
      x += w;
    });
    const H = 72 + subMax * 13 + (foot ? 18 : 2);
    if (foot) body += `<text x="${W / 2}" y="${H - 6}" font-size="${FS}" text-anchor="middle" fill="var(--fig-muted)">${foot}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">` +
      `<text x="${x0}" y="13" font-size="${FS}" fill="var(--fig-muted)">0</text><text x="${x1}" y="13" font-size="${FS}" text-anchor="end" fill="var(--fig-muted)">${total} ${unit}</text>${body}</svg>`;
  }

  // Funnel (intro) / reverse funnel (conclusion): trapezoid bands.
  function funnel(id, label, bands, reverse) {
    const W = 500, cx = 160, n = bands.length, bh = 40, top = 10;
    let body = "";
    bands.forEach((b, i) => {
      const k = reverse ? n - 1 - i : i;
      const wTop = 300 - k * 70, wBot = 300 - (k + 1) * 70 + 20;
      const yT = top + i * (bh + 4), yB = yT + bh;
      const [a, bb] = reverse ? [wBot, wTop] : [wTop, wBot];
      const c = col(b.c);
      body += `<polygon points="${cx - a / 2},${yT} ${cx + a / 2},${yT} ${cx + bb / 2},${yB} ${cx - bb / 2},${yB}" fill="var(--fig-fill)" stroke="${c}" stroke-width="1.5"/>`;
      body += `<text x="${cx}" y="${yT + 25}" font-size="${FS}" font-weight="700" text-anchor="middle" fill="currentColor">${b.t}</text>`;
      const nl = lines(b.n);
      body += `<text font-size="${FS}" fill="currentColor">${tspans(nl, 320, yT + 21 - ((nl.length - 1) * 13) / 2, 13)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${top + n * (bh + 4) + 6}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;
  }

  // Simple grid table drawn as SVG. cells: array of rows (strings, "|" = new line); first row = header.
  function grid(label, colW, rowsData, colors) {
    const W = colW.reduce((a, b) => a + b, 0) + 20;
    let y = 10, body = "";
    rowsData.forEach((r, ri) => {
      const h = Math.max(...r.map((c) => lines(c).length)) * 13 + 12;
      let x = 10;
      r.forEach((cell, ci) => {
        const c = ri === 0 ? "var(--fig-a)" : colors && colors[ri] ? col(colors[ri]) : "var(--fig-muted)";
        body += `<rect x="${x}" y="${y}" width="${colW[ci]}" height="${h}" fill="${ri === 0 ? "var(--fig-fill)" : "none"}" stroke="${c}" stroke-width="1"/>`;
        body += `<text font-size="${FS}" fill="currentColor"${ri === 0 || ci === 0 ? ' font-weight="700"' : ""}>${tspans(lines(cell), x + 6, y + 16, 13)}</text>`;
        x += colW[ci];
      });
      y += h;
    });
    return `<svg viewBox="0 0 ${W} ${y + 10}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;
  }

  // Horizontal scale (e.g. register continuum) with ticks and labels below.
  function scale(id, label, left, right, ticks) {
    const W = 500, x0 = 30, x1 = 470;
    let body = `<line x1="${x0}" y1="40" x2="${x1}" y2="40" stroke="currentColor" stroke-width="1.6" marker-start="url(#${id})" marker-end="url(#${id})"/>`;
    body += `<text x="${x0}" y="22" font-size="12" font-weight="700" fill="var(--fig-b)">${left}</text><text x="${x1}" y="22" font-size="12" font-weight="700" text-anchor="end" fill="var(--fig-d)">${right}</text>`;
    let maxL = 1;
    ticks.forEach((t) => {
      const x = x0 + (x1 - x0) * t.p;
      const tl = lines(t.t); maxL = Math.max(maxL, tl.length);
      body += `<circle cx="${x}" cy="40" r="4" fill="${col(t.c)}"/>`;
      body += `<text font-size="${FS}" text-anchor="middle" fill="currentColor">${tspans(tl, x, 60, 13)}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${60 + maxL * 13 + 4}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${marker(id)}${body}</svg>`;
  }

  // Hub-and-spoke planning web.
  function web(label, centre, spokes) {
    const W = 500, H = 270, cx = 250, cy = 135;
    let body = "";
    const n = spokes.length;
    spokes.forEach((s, i) => {
      const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const x = cx + Math.cos(ang) * 168, y = cy + Math.sin(ang) * 95;
      const tl = lines(s.t);
      const bw = 150, bh = tl.length * 13 + 10;
      body += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--fig-muted)" stroke-width="1.2"/>`;
      body += `<rect x="${(x - bw / 2).toFixed(1)}" y="${(y - bh / 2).toFixed(1)}" width="${bw}" height="${bh}" rx="6" fill="var(--fig-fill)" stroke="${col(s.c)}" stroke-width="1.4"/>`;
      body += `<text font-size="${FS}" text-anchor="middle" fill="currentColor">${tspans(tl, +x.toFixed(1), +(y - bh / 2 + 15).toFixed(1), 13)}</text>`;
    });
    const cl = lines(centre);
    body += `<ellipse cx="${cx}" cy="${cy}" rx="78" ry="${cl.length * 8 + 14}" fill="var(--fig-fill)" stroke="var(--fig-a)" stroke-width="2"/>`;
    body += `<text font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">${tspans(cl, cx, cy - ((cl.length - 1) * 14) / 2 + 4, 14)}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;
  }

  // ---------- reusable figures ----------
  const PEEL = tpl("ar-engb1-1", "PEEL body paragraph anatomy", [
    { t: "P - Point (topic sentence)|'Bilingualism gives teenagers a|wider sense of who they are.'", a: "ONE idea per paragraph;|answers the task directly|→ Criterion B relevance", c: "a" },
    { t: "E - Evidence / example|anecdote · statistic · expert quote|'My cousin switches between...'", a: "Concrete support - not|general claims → B development", c: "b" },
    { t: "E - Explain the impact|'This means... / As a result...'", a: "Longest part: HOW and WHY|the example proves the point", c: "c" },
    { t: "L - Link back|'...which is why identity is|richer, not weaker, when shared.'", a: "Return to the task question;|bridge to the next paragraph", c: "d" },
  ], "Body paragraph (≈80-120 words)");

  IB.addExamFrames("engb", { topics: {

    /* ================= THEME 1: IDENTITIES ================= */
    "engb-1": {
      figures: [
        { title: "PEEL body paragraph anatomy", caption: "Point → Evidence → Explain → Link: the unit of development for Criterion B in every Paper 1 text type", svg: PEEL },
        { title: "Planning web for a theme task (Identities)", caption: "Mix a personal angle with a wider social angle; pick 3-4 spokes = 3-4 body paragraphs",
          svg: web("Planning web for an Identities task", "Task issue:|bilingual identity", [
            { t: "Personal angle|anecdote / own experience", c: "a" },
            { t: "Wider angle|statistic, survey, expert", c: "b" },
            { t: "Counterpoint|'Some argue that...'", c: "d" },
            { t: "Impact on audience|why should THEY care?", c: "c" },
            { t: "Solution / advice|what readers can do", c: "b" },
            { t: "Topic vocabulary|heritage, belonging...", c: "muted" },
          ]) },
        { title: "Whole-text structure (opinion article / essay-like text)", caption: "Framework common to most Paper 1 text types; only the conventions at top and bottom change",
          svg: tpl("ar-engb1-2", "Whole text structure", [
            { t: "Text-type conventions (top)|headline / greeting / To-From", a: "Shows the text type at once|→ Criterion C", c: "a" },
            { t: "Introduction|hook → context → your position", a: "Engage the audience;|state purpose clearly", c: "b" },
            { t: "Body 1: strongest point (PEEL)", a: "One idea per paragraph", c: "c" },
            { t: "Body 2: second point (PEEL)", a: "Linking device at start:|'Furthermore,...'", c: "c" },
            { t: "Body 3: counterpoint + rebuttal", a: "Shows nuance → Criterion B", c: "d" },
            { t: "Conclusion|summary + call to action / reflection", a: "Matches purpose: persuade,|inform, reflect, recommend", c: "b" },
            { t: "Text-type conventions (end)|sign-off / byline / thanks", a: "Close in the same register|→ Criterion C", c: "a" },
          ], "≈ 450-600 words (HL)") },
        { title: "Introduction funnel: hook → context → position", caption: "Move from a broad, engaging start to the precise purpose of your text",
          svg: funnel("ar-engb1-3", "Introduction funnel", [
            { t: "HOOK", n: "question, surprising fact,|short anecdote, quotation", c: "a" },
            { t: "CONTEXT", n: "why this matters now, to|THIS audience", c: "b" },
            { t: "POSITION", n: "your thesis / purpose in|one clear sentence", c: "d" },
          ]) },
        { title: "Conclusion reverse funnel: restate → widen → act", caption: "Never add a new argument in the conclusion",
          svg: funnel("ar-engb1-4", "Conclusion reverse funnel", [
            { t: "RESTATE", n: "position in fresh words", c: "d" },
            { t: "SYNTHESISE", n: "pull the 2-3 key points|together", c: "b" },
            { t: "WIDEN / ACT", n: "call to action, reflection,|final memorable line", c: "a" },
          ], true) },
      ],
    },

    /* ================= THEME 2: EXPERIENCES ================= */
    "engb-2": {
      figures: [
        { title: "Diary / journal entry layout (annotated)", caption: "Personal text: informal register, first person, feelings + reflection",
          svg: tpl("ar-engb2-1", "Diary entry layout", [
            { t: "Saturday, 14 March", a: "Date (day, time optional)|top left", c: "a" },
            { t: "Dear Diary, (optional)", a: "Optional address to diary", c: "muted" },
            { t: "What happened|'I still can't believe I did it!'", a: "Past tenses; vivid hook;|contractions allowed", c: "b" },
            { t: "Feelings at the time|'My hands were shaking...'", a: "Emotive language,|sensory detail", c: "c" },
            { t: "Reflection now|'Looking back, I realise...'", a: "Shift to present; what you|learned → Criterion B depth", c: "d" },
            { t: "Look ahead|'Tomorrow I'll...'  - Mia", a: "Future plan / question to|self; name or initial", c: "a" },
          ]) },
        { title: "Narrative / reflective arc", caption: "Order for diaries, personal blogs and reflective speeches on experiences",
          svg: flow("ar-engb2-2", "Narrative reflective arc", [
            { t: "Set the scene", n: "who, where, when (past simple)" },
            { t: "Trigger event / challenge", n: "the moment that changed things", c: "d" },
            { t: "Reaction and feelings", n: "past continuous + emotive vocabulary", c: "b" },
            { t: "Outcome", n: "what finally happened" },
            { t: "Reflection and lesson", n: "present perfect: 'I have learnt...'", c: "c" },
          ]) },
        { title: "Travel / experience review layout (annotated)", caption: "Review conventions: title, details, evaluation, rating, recommendation",
          svg: tpl("ar-engb2-3", "Travel review layout", [
            { t: "Three Days in Hanoi: Worth It?", a: "Catchy title, often a|question or pun", c: "a", al: "c" },
            { t: "by Sam Lee · ★★★★☆", a: "Byline + rating", c: "muted", al: "c" },
            { t: "Details|where, when, cost, who it suits", a: "Facts the reader needs", c: "b" },
            { t: "Highlights (evaluated)", a: "Opinion + reason + example", c: "c" },
            { t: "Drawbacks (fair)", a: "Balanced → credible", c: "d" },
            { t: "Verdict + recommendation|'Perfect for budget travellers...'", a: "Who should go and why;|direct address 'you'", c: "a" },
          ]) },
        { title: "Chronological vs thematic body order", caption: "Chronological suits narratives and diaries; thematic suits articles, speeches and reviews",
          svg: grid("Chronological versus thematic paragraph order", [120, 175, 175], [
            ["", "Chronological", "Thematic"],
            ["Paragraphs", "Before → during → after", "Aspect 1 → aspect 2 → aspect 3"],
            ["Linkers", "At first, Later that day,|Eventually, Since then", "Firstly, Another benefit,|On the other hand"],
            ["Best for", "diary, personal blog,|narrative speech", "article, review, proposal,|report, speech"],
            ["Risk", "storytelling with no|reflection (B)", "list of ideas with no|development (B)"],
          ]) },
      ],
    },

    /* ================= THEME 3: HUMAN INGENUITY ================= */
    "engb-3": {
      figures: [
        { title: "Balanced argument structure (for and against)", caption: "Use for 'discuss', 'evaluate', 'to what extent' tasks; give a judgement at the end",
          svg: tpl("ar-engb3-1", "Balanced argument structure", [
            { t: "Introduction|issue + why it matters now", a: "Neutral framing:|'AI tutors divide opinion.'", c: "b" },
            { t: "For 1 (PEEL)", a: "Strongest benefit + evidence", c: "c" },
            { t: "For 2 (PEEL)", a: "'In addition,...'", c: "c" },
            { t: "Against 1 (PEEL)", a: "'However,... critics point out'", c: "d" },
            { t: "Against 2 (PEEL)", a: "'Moreover,...'", c: "d" },
            { t: "Judgement / conclusion|'On balance, ... provided that ...'", a: "Weigh the sides - a clear|reasoned verdict", c: "a" },
          ]) },
        { title: "One-sided vs balanced: which structure?", caption: "Read the purpose in the task: persuade → one-sided; discuss/evaluate → balanced",
          svg: grid("One-sided versus balanced structure", [110, 180, 180], [
            ["", "One-sided (persuasive)", "Balanced (discursive)"],
            ["Task words", "persuade, convince,|urge, campaign", "discuss, evaluate, consider,|to what extent"],
            ["Body", "3 points for + 1 counter|point refuted", "points for and against|in equal weight"],
            ["Ending", "call to action", "reasoned judgement"],
            ["Typical types", "speech, opinion column,|brochure, letter", "article, report, essay-|style blog"],
          ]) },
        { title: "Counterargument-rebuttal paragraph", caption: "Concede → refute: shows nuanced thinking for Criterion B",
          svg: flow("ar-engb3-2", "Counterargument rebuttal paragraph", [
            { t: "Concede the opposing view", n: "'Admittedly, AI can make mistakes...'", c: "d" },
            { t: "Evidence for that view", n: "be fair - give it a real example" },
            { t: "Turn", n: "'However, / Yet / Nevertheless,'", c: "b" },
            { t: "Rebut with stronger evidence", n: "why your view still holds", c: "c" },
            { t: "Link back to position", n: "'...so the benefits outweigh...'" },
          ]) },
        { title: "Review layout (film, book, app, exhibition)", caption: "Mass media review: title, details, summary without spoilers, evaluation, rating, verdict",
          svg: tpl("ar-engb3-3", "Review layout", [
            { t: "STUDYMATE: Smart or Sneaky?", a: "Headline with attitude", c: "a", al: "c" },
            { t: "Reviewed by Ana Ruiz | ★★★☆☆", a: "Byline + rating (stars / 10)", c: "muted", al: "c" },
            { t: "Key details|title, maker, price / genre", a: "Factual info box or|opening paragraph", c: "b" },
            { t: "Brief summary (no spoilers)", a: "Present tense", c: "b" },
            { t: "Strengths → weaknesses", a: "Evaluative adjectives:|intuitive, clunky, gripping", c: "c" },
            { t: "Verdict: who it is for|'Download it if you...'", a: "Recommendation to a|specific audience", c: "d" },
          ]) },
      ],
    },

    /* ================= THEME 4: SOCIAL ORGANIZATION ================= */
    "engb-4": {
      figures: [
        { title: "Proposal layout (annotated)", caption: "Formal, impersonal, headed sections; persuades a decision-maker to approve a plan",
          svg: tpl("ar-engb4-1", "Proposal layout", [
            { t: "PROPOSAL: A Student-Run Repair Café", a: "Title naming the plan", c: "a", al: "c" },
            { t: "To: Principal Ms Okafor|From: Student Council|Date: 3 May 2026|Subject: Repair café proposal", a: "Memo header block", c: "a" },
            { t: "1. Introduction / Purpose", a: "'The aim of this proposal|is to...'", c: "b" },
            { t: "2. Background / Current situation", a: "The problem + data", c: "b" },
            { t: "3. Proposal / Plan|bullet points: who, when, cost", a: "Numbered headings,|bullets, passive voice", c: "c" },
            { t: "4. Benefits", a: "Persuade with reasons", c: "c" },
            { t: "5. Recommendation / Conclusion", a: "'We therefore recommend|that...' + request approval", c: "d" },
          ]) },
        { title: "Official report layout (annotated)", caption: "Objective account of findings for an authority; ends in recommendations",
          svg: tpl("ar-engb4-2", "Report layout", [
            { t: "REPORT ON CANTEEN FOOD WASTE", a: "Clear factual title", c: "a", al: "c" },
            { t: "To / From / Date / Subject", a: "Header (memo format)", c: "a" },
            { t: "Introduction / Aim", a: "'This report examines...'", c: "b" },
            { t: "Method", a: "How info was gathered:|survey of 200 students", c: "b" },
            { t: "Findings|data, percentages, bullets", a: "Past tense, passive,|no opinion yet", c: "c" },
            { t: "Conclusions", a: "What the findings mean", c: "c" },
            { t: "Recommendations|1. ... 2. ... 3. ...", a: "'It is recommended that...'|+ name, role", c: "d" },
          ]) },
        { title: "Proposal vs report", caption: "Both formal with headings - the difference is the time focus and purpose",
          svg: grid("Proposal versus report", [110, 180, 180], [
            ["", "Proposal", "Report"],
            ["Purpose", "persuade someone to|approve a future plan", "inform about what was|found / what happened"],
            ["Time focus", "future (will, would)", "past (was found, showed)"],
            ["Key sections", "Plan, Budget, Benefits", "Method, Findings"],
            ["Ends with", "request for approval", "recommendations"],
          ]) },
        { title: "Problem-solution structure", caption: "For complaints, proposals, letters to the editor and community articles",
          svg: flow("ar-engb4-3", "Problem solution structure", [
            { t: "Situation", n: "context the reader recognises" },
            { t: "Problem", n: "what is wrong + evidence", c: "d" },
            { t: "Consequences", n: "who is affected and how", c: "d" },
            { t: "Solution(s)", n: "specific, realistic, costed", c: "c" },
            { t: "Evaluation / request", n: "why it will work; what you want done", c: "b" },
          ]) },
      ],
    },

    /* ================= THEME 5: SHARING THE PLANET ================= */
    "engb-5": {
      figures: [
        { title: "Brochure / leaflet layout (annotated)", caption: "Sections under headings, bullet points, direct address and contact details; layout sketched with words, not pictures",
          svg: tpl("ar-engb5-1", "Brochure layout", [
            { t: "GO GREEN AT LAKESIDE!", a: "Title + slogan", c: "a", al: "c" },
            { t: "'Small steps, big change'", a: "Catchy slogan / tagline", c: "a", al: "c" },
            { t: "[Image: students planting trees]", a: "Image described in|brackets (optional)", c: "muted", al: "c" },
            { t: "Why does it matter?|short paragraph + 1 statistic", a: "Sub-headings as|questions", c: "b" },
            { t: "What can YOU do?|• bring a bottle • ...", a: "Bullet points;|imperatives, 'you'", c: "c" },
            { t: "Join us! Eco-club, Fridays 4 pm|Contact: eco@lakeside.edu", a: "Call to action +|contact details", c: "d" },
          ]) },
        { title: "Persuasive text structure", caption: "Problem → impact → solutions → call to action (speech, brochure, opinion column, letter to editor)",
          svg: flow("ar-engb5-2", "Persuasive structure", [
            { t: "Hook", n: "shocking statistic / rhetorical question", c: "a" },
            { t: "Problem", n: "what is happening + evidence", c: "d" },
            { t: "Impact on the audience", n: "pathos: why YOU should care", c: "d" },
            { t: "Solutions", n: "rule of three; realistic steps", c: "c" },
            { t: "Rebut the objection", n: "'You might think... but...'", c: "b" },
            { t: "Call to action", n: "imperative: 'Sign up today.'", c: "a" },
          ]) },
        { title: "The persuasive triangle: ethos, pathos, logos", caption: "Strong persuasive texts combine all three appeals",
          svg: `<svg viewBox="0 0 500 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ethos pathos logos triangle"><polygon points="250,30 90,190 410,190" fill="var(--fig-fill)" stroke="var(--fig-a)" stroke-width="2"/><text x="250" y="140" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">PERSUASION</text><text x="250" y="20" font-size="12" font-weight="700" text-anchor="middle" fill="var(--fig-b)">ETHOS - credibility</text><text x="250" y="82" font-size="11" text-anchor="middle" fill="currentColor"><tspan x="250" dy="0">expert, own role,</tspan><tspan x="250" dy="13">fair tone</tspan></text><text x="90" y="210" font-size="12" font-weight="700" text-anchor="middle" fill="var(--fig-d)">PATHOS - emotion</text><text x="90" y="224" font-size="11" text-anchor="middle" fill="currentColor">anecdote, emotive words</text><text x="410" y="210" font-size="12" font-weight="700" text-anchor="middle" fill="var(--fig-c)">LOGOS - logic</text><text x="410" y="224" font-size="11" text-anchor="middle" fill="currentColor">statistics, cause → effect</text></svg>` },
      ],
    },

    /* ================= TEXT TYPES 1: PERSONAL & PROFESSIONAL ================= */
    "engb-6": {
      figures: [
        { title: "Formal letter layout (annotated)", caption: "Name unknown → Dear Sir or Madam … Yours faithfully; name known → Dear Mr Lee … Yours sincerely",
          svg: tpl("ar-engb6-1", "Formal letter layout", [
            { t: "Your address|12 Garden Road, Kowloon", a: "Sender's address top right|(never your name here)", c: "a", al: "r" },
            { t: "15 March 2026", a: "Date under your address", c: "a", al: "r" },
            { t: "The Manager|City Sports Centre", a: "Recipient's address left|(optional in the exam)", c: "muted" },
            { t: "Dear Sir or Madam,", a: "Formal salutation", c: "b" },
            { t: "Para 1: reason for writing|'I am writing to complain about...'", a: "Purpose in sentence one", c: "c" },
            { t: "Paras 2-3: details + evidence", a: "One issue per paragraph;|no contractions", c: "c" },
            { t: "Final para: request / action|'I would be grateful if...'", a: "Clear, polite, firm request", c: "d" },
            { t: "Yours faithfully,|Jenny Ho (Sports Captain)", a: "Matching sign-off + full|name and role", c: "b" },
          ]) },
        { title: "Informal letter / personal email layout (annotated)", caption: "Friendly register: contractions, questions, phrasal verbs - but still organised in paragraphs",
          svg: tpl("ar-engb6-2", "Informal email layout", [
            { t: "To: alex@mail.com|Subject: Can't wait to see you!", a: "Friendly subject line|(email only)", c: "a" },
            { t: "Hi Alex, / Dear Alex,", a: "First name", c: "b" },
            { t: "Opening chat|'Thanks for your message! How...'", a: "Respond / ask after them", c: "c" },
            { t: "Main paragraphs|advice, news, plans", a: "Contractions, idioms,|exclamations", c: "c" },
            { t: "Closing|'Write back soon! / Let me know...'", a: "Invitation to reply", c: "d" },
            { t: "Take care, / Love, / Best wishes,|Kim", a: "Informal sign-off +|first name only", c: "b" },
          ]) },
        { title: "Formal / professional email layout (annotated)", caption: "Same register as a formal letter, but with email header and no postal addresses",
          svg: tpl("ar-engb6-3", "Formal email layout", [
            { t: "To: m.diaz@youthfest.org|Subject: Volunteer application - Ken Wu", a: "Specific, informative|subject line", c: "a" },
            { t: "Dear Ms Diaz,", a: "Title + surname", c: "b" },
            { t: "Purpose|'I am writing to apply for...'", a: "First line = reason", c: "c" },
            { t: "Supporting details|experience, reasons, questions", a: "Short paragraphs;|polite modals (could, would)", c: "c" },
            { t: "Closing|'I look forward to hearing from you.'", a: "Standard formal close", c: "d" },
            { t: "Yours sincerely, / Kind regards,|Ken Wu, Year 12, Lakeside School", a: "Full name + role /|contact details", c: "b" },
          ]) },
        { title: "Letter of application / cover letter structure", caption: "Professional text applying for a job, place or volunteering role",
          svg: flow("ar-engb6-4", "Letter of application structure", [
            { t: "Position + where you saw it", n: "'...advertised on your website'" },
            { t: "Why you want it", n: "motivation linked to the organisation", c: "b" },
            { t: "What you offer", n: "skills + concrete experience (evidence)", c: "c" },
            { t: "Availability / practical details", n: "dates, hours, attachments (CV)" },
            { t: "Polite close", n: "'I would welcome the opportunity to...'", c: "d" },
          ]) },
        { title: "Salutation → sign-off decision flowchart", caption: "Mismatched greeting and sign-off is a common Criterion C error",
          svg: flow("ar-engb6-5", "Salutation sign off decision", [
            { t: "Is the text formal?", q: true, n: "No → Hi / Dear + first name|→ Best wishes / Take care / Love", nc: "c" },
            { t: "Do you know the reader's name?", q: true, n: "No → Dear Sir or Madam,|→ Yours faithfully,", nc: "d" },
            { t: "Dear Mr / Ms / Dr + SURNAME,", n: "never 'Dear Mr John'" },
            { t: "Yours sincerely,", n: "email: Kind regards also accepted", c: "b" },
          ]) },
        { title: "Set of instructions / guidelines layout", caption: "Numbered steps, imperatives, headings and warnings",
          svg: tpl("ar-engb6-6", "Instructions layout", [
            { t: "How to Prepare for Your First Hike", a: "Title: 'How to...' /|'Guide to...'", c: "a", al: "c" },
            { t: "Short intro: who it is for", a: "Purpose + audience", c: "b" },
            { t: "You will need:|• boots • water • map", a: "Bulleted list of items", c: "c" },
            { t: "1. Check the weather...|2. Tell someone your route...", a: "Numbered steps;|imperative verbs", c: "c" },
            { t: "⚠ Never hike alone after dark.", a: "Warning / tip box", c: "d" },
            { t: "Final tip / further info / contact", a: "Closing advice", c: "muted" },
          ]) },
      ],
      frames: [
        { title: "Lay out a letter of application", paper: "P1", where: "Paper 1 · Criterion C · professional text",
          q: "Write the opening and closing sections of a <strong>letter of application</strong> to the director of a summer science camp (Dr Patel) applying for a volunteer assistant position. Show the layout clearly. (about 120 words)",
          marks: [
            ["Layout", "sender's __address__ and __date__ at top right; recipient's name / title on the left"],
            ["Salutation", "'__Dear Dr Patel__,' (title + surname)"],
            ["Opening", "position applied for and where it was seen: '__I am writing to apply for__ the position of...'"],
            ["Body", "motivation + __concrete experience__ as evidence"],
            ["Close", "'__I look forward to hearing from you__' / availability for interview"],
            ["Sign-off", "'__Yours sincerely__,' + full name"],
          ],
          model: "8 Hill Street, Taipei<br>2 April 2026<br>Dr R. Patel, Director, Discover Science Camp<br>Dear Dr Patel,<br>I am writing to apply for the position of volunteer assistant advertised on your website. ... I am available from 1 July and would welcome the opportunity to discuss my application.<br>I look forward to hearing from you.<br>Yours sincerely,<br>Lin Chen",
          accept: "Kind regards in an emailed application; recipient's address omitted",
          reject: "Dear Sir or Madam when the name is given; Yours faithfully with a named reader; Hi Dr Patel",
          svg: tpl("ar-engb6-7", "Letter of application expected layout", [
            { t: "8 Hill Street, Taipei|2 April 2026", a: "Address + date", c: "a", al: "r" },
            { t: "Dr R. Patel, Director", a: "Recipient", c: "muted" },
            { t: "Dear Dr Patel,", a: "Title + surname", c: "b" },
            { t: "Position + motivation + evidence", a: "Body (PEEL)", c: "c" },
            { t: "I look forward to hearing from you.|Yours sincerely, Lin Chen", a: "Matching close", c: "d" },
          ]),
          svgCaption: "Expected layout",
          tip: "已知姓名 → Yours sincerely；先寫 position，再寫 why + evidence。" },
      ],
    },

    /* ================= TEXT TYPES 2: MASS MEDIA ================= */
    "engb-7": {
      figures: [
        { title: "News report: the inverted pyramid", caption: "Most important facts first; detail and background later",
          svg: funnel("ar-engb7-1", "Inverted pyramid", [
            { t: "LEAD", n: "who, what, where, when (why)|in the first 1-2 sentences", c: "d" },
            { t: "KEY DETAILS", n: "quotes from witnesses /|officials, numbers", c: "b" },
            { t: "BACKGROUND", n: "context, what happens next", c: "muted" },
          ]) },
        { title: "News report layout (annotated)", caption: "Objective, third person, past tense, reported speech and quotations",
          svg: tpl("ar-engb7-2", "News report layout", [
            { t: "FLOODS CLOSE THREE SCHOOLS", a: "Headline: present tense,|no articles", c: "a", al: "c" },
            { t: "Hundreds of pupils stay home as river bursts", a: "Sub-headline (standfirst)", c: "a", al: "c" },
            { t: "By Tom Reyes, Staff Reporter · 4 June", a: "Byline + date", c: "muted" },
            { t: "Lead: 5 Ws in one sentence", a: "Inverted pyramid", c: "d" },
            { t: "Quotes: 'We had no warning,'|said head teacher Ms Lo.", a: "Named sources = objectivity", c: "b" },
            { t: "Background + what next", a: "No personal opinion", c: "c" },
          ]) },
        { title: "Feature / magazine article layout (annotated)", caption: "Engaging, semi-formal; writer's voice allowed, unlike a news report",
          svg: tpl("ar-engb7-3", "Feature article layout", [
            { t: "Lost in Translation?", a: "Catchy headline (pun,|question, alliteration)", c: "a", al: "c" },
            { t: "Why more teens are learning their|grandparents' language", a: "Sub-heading / standfirst", c: "a", al: "c" },
            { t: "by Priya Nair", a: "Byline", c: "muted" },
            { t: "Hook paragraph|anecdote / question / statistic", a: "Draw the reader in", c: "b" },
            { t: "Sub-heading 1 → body (PEEL)", a: "Sub-headings break up|the text; quotes", c: "c" },
            { t: "Sub-heading 2 → body (PEEL)", a: "Rhetorical questions,|direct address", c: "c" },
            { t: "Ending: reflection / call to action", a: "Memorable last line", c: "d" },
          ]) },
        { title: "Blog post layout (annotated)", caption: "Personal yet public: chatty register, engagement with readers",
          svg: tpl("ar-engb7-4", "Blog post layout", [
            { t: "Mia's World Notes", a: "Blog name (optional)", c: "muted", al: "c" },
            { t: "Why I Quit Social Media for 30 Days", a: "Post title", c: "a", al: "c" },
            { t: "Posted 9 May 2026 by Mia", a: "Date + author", c: "muted" },
            { t: "Hi everyone! Opening hook", a: "Greet readers;|first person", c: "b" },
            { t: "Body: experience + opinion|(short paragraphs)", a: "Informal: contractions,|questions, humour", c: "c" },
            { t: "What do you think? Comment below!", a: "Reader interaction", c: "d" },
            { t: "Comments (2) | Share | #digitaldetox", a: "Optional features: tags,|comments", c: "muted" },
          ]) },
        { title: "Speech / talk layout (annotated)", caption: "Spoken text: address the audience, signpost, repeat, end with thanks",
          svg: tpl("ar-engb7-5", "Speech layout", [
            { t: "Good morning, Principal, teachers|and fellow students.", a: "Greeting to the actual|audience", c: "a" },
            { t: "Hook + introduce self and topic|'My name is... Today I want to...'", a: "Purpose stated", c: "b" },
            { t: "Signpost: 'I'd like to make three points.'", a: "Oral signposting", c: "b" },
            { t: "Firstly... Secondly... Finally...", a: "PEEL + rhetorical|questions, 'we', triads", c: "c" },
            { t: "Call to action|'So I ask you today to...'", a: "Repeat key message", c: "d" },
            { t: "Thank you for listening.", a: "Spoken close - no|'Yours sincerely'", c: "a" },
          ]) },
        { title: "Interview (published Q&A) layout", caption: "Introduction in prose, then labelled questions and answers",
          svg: tpl("ar-engb7-6", "Interview layout", [
            { t: "Meet the 17-Year-Old Saving Bees", a: "Headline", c: "a", al: "c" },
            { t: "Intro: who the interviewee is and why|they are interesting", a: "Third-person prose", c: "b" },
            { t: "Q: What first got you interested?|A: When I was 12, I...", a: "Q/A or names in bold;|natural spoken answers", c: "c" },
            { t: "Q: ... A: ... (5-7 exchanges)", a: "Open questions that build", c: "c" },
            { t: "Closing Q: advice for readers|+ thanks", a: "Ending + where to find|out more", c: "d" },
          ]) },
        { title: "Opinion column / editorial layout", caption: "One-sided, persuasive, the writer's (or paper's) stance",
          svg: tpl("ar-engb7-7", "Opinion column layout", [
            { t: "Homework Bans Won't Help Anyone", a: "Opinion headline", c: "a", al: "c" },
            { t: "Columnist name + photo/role", a: "Byline with credentials", c: "muted" },
            { t: "Provocative opening + stance", a: "Thesis by paragraph 1", c: "b" },
            { t: "Arguments (PEEL) + rebuttal", a: "Irony, rhetorical questions", c: "c" },
            { t: "Forceful conclusion", a: "Echo headline; call to act", c: "d" },
          ]) },
      ],
      frames: [
        { title: "Sketch the structure of a news report", paper: "P1", where: "Paper 1 · Criterion C · mass media text",
          q: "Your school newspaper asks for a <strong>news report</strong> on a charity run held last weekend. Write the headline, lead paragraph and one quotation, and show how the rest of the report would be organised.",
          marks: [
            ["Headline", "short, present tense, no articles: '__Students Run 10 km for Local Shelter__'"],
            ["Byline", "name + date"],
            ["Lead", "who, what, where, when, why in the __first sentence__"],
            ["Quotation", "named source in __direct speech__ with a reporting verb"],
            ["Order", "__inverted pyramid__: key facts → details → background"],
            ["Register", "objective third person, __past tense__, no personal opinion"],
          ],
          model: "STUDENTS RUN 10 KM FOR LOCAL SHELTER<br>By Leo Park, 12 May<br>More than 300 Lakeside students raised $8,000 for the Harbour Animal Shelter on Saturday by completing a 10 km charity run along the waterfront.<br>'The support was incredible,' said organiser Ms Tan.<br>[details of the day → background of the shelter → next event]",
          reject: "first-person opinion ('I think it was amazing'); no lead; story told in chronological order from the start",
          svg: funnel("ar-engb7-8", "Inverted pyramid expected answer", [
            { t: "LEAD", n: "300 students, $8,000, Saturday,|waterfront, for the shelter", c: "d" },
            { t: "DETAILS", n: "quotes, winners, numbers", c: "b" },
            { t: "BACKGROUND", n: "the shelter; next event", c: "muted" },
          ]),
          svgCaption: "Organisation of the report",
          tip: "News report = 客觀、第三人稱、過去式；最重要事實放第一句（inverted pyramid）。" },
      ],
    },

    /* ================= PAPER 1 ================= */
    "engb-8": {
      figures: [
        { title: "Paper 1 (HL) time plan: 1 hour 30 minutes", caption: "One task chosen from three; 450-600 words",
          svg: timeline("ar-engb8-1", "Paper 1 time plan", [
            { t: "Choose", m: 5, sub: "read all 3|tasks", c: "muted" },
            { t: "Plan", m: 10, sub: "GAP + text type,|paragraph plan", c: "b" },
            { t: "Write", m: 60, sub: "≈ 550 words|conventions top + end", c: "a" },
            { t: "Check", m: 15, sub: "tenses, agreement,|articles, register", c: "d" },
          ], "min", "Planning and proofreading time are what lift Criterion A and C") },
        { title: "Paper 1 criteria: where the 30 marks are", caption: "Language and message carry 24 of the 30 marks",
          svg: `<svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Paper 1 criteria marks bar"><rect x="14" y="20" width="189" height="40" fill="var(--fig-fill)" stroke="var(--fig-b)" stroke-width="1.6"/><rect x="203" y="20" width="189" height="40" fill="var(--fig-fill)" stroke="var(--fig-c)" stroke-width="1.6"/><rect x="392" y="20" width="94" height="40" fill="var(--fig-fill)" stroke="var(--fig-d)" stroke-width="1.6"/><text x="108" y="45" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">A Language - 12</text><text x="297" y="45" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">B Message - 12</text><text x="439" y="45" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">C - 6</text><text font-size="11" text-anchor="middle" fill="currentColor"><tspan x="108" y="78">range + accuracy of</tspan><tspan x="108" y="91">vocabulary and grammar</tspan><tspan x="297" y="78">relevance, development,</tspan><tspan x="297" y="91">organisation, cohesion</tspan><tspan x="439" y="78">conceptual: type,</tspan><tspan x="439" y="91">register, audience</tspan></text><text x="250" y="113" font-size="11" text-anchor="middle" fill="var(--fig-muted)">Total 30 marks · Paper 1 = 25% of the HL grade</text></svg>` },
        { title: "Choosing the text type: purpose + audience flowchart", caption: "Pick the type whose conventions you can show in the first three lines",
          svg: flow("ar-engb8-2", "Text type choice flowchart", [
            { t: "Underline: purpose · audience · context", n: "e.g. persuade · Year 10 · assembly" },
            { t: "Is it spoken to a live audience?", q: true, n: "Yes → speech / talk / presentation", nc: "c" },
            { t: "Is the reader one known person|or an organisation?", q: true, n: "Yes → letter / email / proposal / report|(formal if an authority)", nc: "c" },
            { t: "Is it published for the public?", q: true, n: "Yes → article / blog / review /|brochure / interview / news report", nc: "c" },
            { t: "Otherwise: personal reflection", n: "diary / journal entry" },
          ]) },
        { title: "Register continuum", caption: "Decide the point on the scale from the audience and keep it consistent",
          svg: scale("ar-engb8-3", "Register continuum", "INFORMAL", "FORMAL", [
            { p: 0.02, t: "diary", c: "b" },
            { p: 0.18, t: "email to|friend", c: "b" },
            { p: 0.36, t: "blog,|interview", c: "c" },
            { p: 0.52, t: "magazine|article", c: "c" },
            { p: 0.66, t: "speech to|school", c: "a" },
            { p: 0.82, t: "proposal,|news report", c: "d" },
            { p: 0.98, t: "formal letter,|official report", c: "d" },
          ]) },
        { title: "10-minute planning grid", caption: "Fill this before writing: it guards all three criteria",
          svg: grid("Paper 1 planning grid", [130, 340], [
            ["Box", "What to write in it"],
            ["Text type", "chosen type + 3 conventions to show (C)"],
            ["Audience / register", "who, formal or informal, 'you' or impersonal (C)"],
            ["Purpose", "persuade / inform / reflect / recommend + ending type"],
            ["Paragraph plan", "intro · 3-4 PEEL bodies · conclusion (B)"],
            ["Evidence", "1 anecdote, 1 statistic, 1 example per body (B)"],
            ["Language list", "6 topic words + 3 complex structures (A)"],
          ], { 1: "c", 2: "c", 3: "c", 4: "b", 5: "b", 6: "a" }) },
      ],
      concepts: [
        { h: "Assessment overview (English B HL)", b: "<div class=\"table-wrap\"><table class=\"compare\"><tr><th>Component</th><th>Time</th><th>Marks</th><th>Weight</th></tr><tr><td>Paper 1 - productive writing (1 task from 3, 450-600 words)</td><td>1 h 30 min</td><td>30</td><td>25%</td></tr><tr><td>Paper 2 - listening (3 audio texts)</td><td>1 h</td><td>25</td><td rowspan=\"2\">50%</td></tr><tr><td>Paper 2 - reading (3 written texts)</td><td>1 h</td><td>40</td></tr><tr><td>Individual oral (internal, moderated)</td><td>12-15 min + 20 min prep</td><td>30</td><td>25%</td></tr></table></div><p>SL for comparison: Paper 1 is 1 h 15 min with 250-400 words; the SL oral is based on a visual stimulus, not a literary extract. No dictionaries or reference material in any exam.</p>" },
        { h: "Paper 1 rules students forget", b: "<ul><li>The three tasks each offer <strong>three text types</strong>; you choose one task and one text type.</li><li>Word counts outside the range are not penalised automatically, but under 450 rarely develops ideas enough and over 600 adds errors.</li><li>Layout is shown with words (headings, To/From, greeting), not drawings; describe images in brackets if needed.</li><li>A title is part of the text type for articles, blogs, reviews, proposals, reports and brochures - but not for letters, emails or diaries.</li></ul>" },
      ],
    },

    /* ================= PAPER 2 ================= */
    "engb-9": {
      figures: [
        { title: "Paper 2 (HL) structure", caption: "Two separate sessions; answers go in the question booklet",
          svg: timeline("ar-engb9-1", "Paper 2 structure", [
            { t: "Listening", m: 60, d: "1 h · 25 marks", sub: "3 audio texts, each|played twice;|reading time first", c: "b" },
            { t: "Reading", m: 60, d: "1 h · 40 marks", sub: "3 written texts|(different text types|and themes)", c: "a" },
          ], "min", "Paper 2 = 50% of the HL grade · no dictionaries") },
        { title: "True / false with justification: strategy", caption: "1 mark only when BOTH the T/F and the justification are correct",
          svg: flow("ar-engb9-2", "True false strategy", [
            { t: "Underline key words in the statement", n: "names, numbers, quantifiers (all, never)" },
            { t: "Locate the lines (answers in text order)", n: "look for synonyms, not the same words" },
            { t: "Does the text say the same thing?", q: true, n: "Same meaning → TRUE|Opposite / different → FALSE", nc: "c" },
            { t: "Copy the SHORTEST exact phrase", n: "no paraphrase; no extra sentence", c: "d" },
            { t: "Check: does the phrase prove it alone?", q: true, n: "No → move to the precise words", nc: "d" },
          ]) },
        { title: "Multiple choice: strategy", caption: "The right option usually paraphrases; the trap repeats the text's words",
          svg: flow("ar-engb9-3", "Multiple choice strategy", [
            { t: "Read the stem; predict the answer", n: "before looking at the options" },
            { t: "Find the evidence in the text", n: "the whole paragraph, not one word" },
            { t: "Eliminate options", n: "too extreme · not mentioned ·|true but does not answer the stem", c: "d" },
            { t: "Choose the paraphrase", n: "meaning matches, words differ", c: "c" },
          ]) },
        { title: "Short answer / gap fill: strategy", caption: "Brief, exact and grammatical",
          svg: flow("ar-engb9-4", "Short answer and gap fill strategy", [
            { t: "Identify what is asked", n: "who / why / how many / which word?" },
            { t: "Gap fill: predict the word class", n: "noun? verb form? adjective? singular?", c: "b" },
            { t: "Locate and lift / adapt", n: "lifting is fine if it answers exactly" },
            { t: "Number of items asked?", q: true, n: "'Give two reasons' → exactly two;|extra wrong info can cancel the mark", nc: "d" },
            { t: "Re-read: fits grammar and meaning?", c: "c" },
          ]) },
        { title: "Matching headings / sentence endings: strategy", caption: "Work from the paragraph's main idea, not a single repeated word",
          svg: flow("ar-engb9-5", "Matching strategy", [
            { t: "Read each paragraph's first + last line", n: "main idea in your own words" },
            { t: "Match the easiest ones first", n: "cross off used options" },
            { t: "Endings: check grammar + logic", n: "subject-verb agreement, tense, article", c: "b" },
            { t: "Beware distractors", n: "extra options + same-word traps", c: "d" },
          ]) },
        { title: "Reference questions: 'What does it refer to?'", caption: "Answer with the noun (phrase) the pronoun replaces",
          svg: flow("ar-engb9-6", "Reference question strategy", [
            { t: "Find the pronoun in its line", n: "it, they, this, which, those, one" },
            { t: "Look BACK to the nearest suitable noun", n: "usually in the same / previous sentence" },
            { t: "Substitute it into the sentence", q: true, n: "Makes sense? → write that noun phrase|No → try the previous noun", nc: "c" },
          ]) },
        { title: "Listening: one audio text, step by step", caption: "Each audio text is played twice",
          svg: timeline("ar-engb9-7", "Listening procedure timeline", [
            { t: "Read Qs", m: 2, d: "reading time", sub: "underline, predict|word class", c: "muted" },
            { t: "1st play", m: 4, d: "listen", sub: "notes in order;|answer the easy", c: "b" },
            { t: "Pause", m: 1, d: "gap", sub: "check spelling,|guess blanks", c: "muted" },
            { t: "2nd play", m: 4, d: "listen", sub: "confirm + fill|remaining gaps", c: "a" },
          ], "units", "Relative time, not exact minutes · answers come in the order heard") },
      ],
      concepts: [
        { h: "Paper 2 format details", b: "<ul><li><strong>Listening (1 h, 25 marks):</strong> three audio passages of increasing difficulty; each is played twice with time to read the questions first. Spelling is not penalised if the answer is understandable and unambiguous.</li><li><strong>Reading (1 h, 40 marks):</strong> three written texts, each on a different theme and text type.</li><li>Answers are written in the question booklet; no dictionaries. A blank answer scores 0, so always attempt an answer.</li><li>Justifications and short answers must come from the correct part of the text; adding information that contradicts the text can cost the mark.</li></ul>" },
      ],
    },

    /* ================= INDIVIDUAL ORAL ================= */
    "engb-10": {
      figures: [
        { title: "HL individual oral timeline", caption: "20 minutes supervised preparation, then a 12-15 minute recorded oral",
          svg: timeline("ar-engb10-1", "IO timeline", [
            { t: "Preparation", m: 20, d: "20 min", sub: "read extract;|≤ 10 bullet|points of notes", c: "muted" },
            { t: "Presentation", m: 4, d: "3-4 min", sub: "extract +|theme link|(B1)", c: "a" },
            { t: "Discussion", m: 5, d: "4-5 min", sub: "on the|extract|(B1, C)", c: "b" },
            { t: "Conversation", m: 6, d: "5-6 min", sub: "≥ 1 other|theme|(B2, C)", c: "c" },
          ], "min", "Recorded oral: 12-15 min in total · 30 marks · 25% of the grade") },
        { title: "Presentation structure (3-4 minutes)", caption: "Order that hits Criterion B1: knowledge of the extract and its theme",
          svg: flow("ar-engb10-2", "IO presentation structure", [
            { t: "Context of the extract", n: "work, author, where it fits in the plot" },
            { t: "What happens / main ideas", n: "brief - no long retelling" },
            { t: "Techniques + quotations + effect", n: "2-3 examples: 'the simile... suggests...'", c: "b" },
            { t: "Link to a course theme", n: "'This links to Identities because...'", c: "c" },
            { t: "Personal response", n: "your interpretation / reaction", c: "d" },
          ]) },
        { title: "10-bullet note card template", caption: "Notes are keywords only - no full sentences to read aloud",
          svg: tpl("ar-engb10-3", "IO note card template", [
            { t: "1. Context: ch. 3, arrival in city", a: "Context", c: "a" },
            { t: "2. Events: alone at station, rain", a: "What happens", c: "a" },
            { t: "3-5. Technique · quote · effect|(contrast, simile, short sentences)", a: "Analysis = core of B1", c: "b" },
            { t: "6-7. Theme link: Experiences →|migration, displacement", a: "Theme + sub-topic", c: "c" },
            { t: "8. Personal response", a: "Opinion", c: "d" },
            { t: "9-10. Vocab / phrases to use", a: "Language for A", c: "muted" },
          ], "Max 10 bullet points") },
        { title: "IO criteria: 30 marks", caption: "Language is assessed throughout; B is split between the extract and the conversation",
          svg: grid("IO criteria table", [150, 230, 60], [
            ["Criterion", "What it rewards", "Marks"],
            ["A Language", "range, accuracy, pronunciation,|intonation - whole oral", "12"],
            ["B1 Message: extract", "relevant ideas on the extract,|links to the theme", "6"],
            ["B2 Message: conversation", "ideas on the other theme(s),|developed answers", "6"],
            ["C Interactive skills", "understanding, sustaining and|repairing the conversation", "6"],
          ], { 1: "b", 2: "a", 3: "c", 4: "d" }) },
        { title: "Annotated literary extract (how to mark it up)", caption: "During the 20 minutes: four marks in the margin turn into note points",
          svg: tpl("ar-engb10-4", "Annotated extract layout", [
            { t: "[1] The station was a cathedral of|strangers. [metaphor]", a: "Circle the technique;|name it in the margin", c: "b" },
            { t: "[2] Nobody looked. Nobody waited.", a: "Short repeated sentences|→ isolation", c: "b" },
            { t: "[3] She held her mother's scarf...", a: "Symbol of home →|theme: identity", c: "c" },
            { t: "[4] The rain spoke a language she|did not know.", a: "Personification → theme:|language barrier", c: "c" },
            { t: "Margin: tone shift fear → hope", a: "Structure / tone change", c: "d" },
          ], "Extract (≤ 300 words)") },
      ],
      concepts: [
        { h: "IO rules you must know (HL)", b: "<ul><li>The extract (up to about 300 words) comes from one of the <strong>two literary works</strong> studied in class; the teacher chooses it and you do not know in advance which extract you will get.</li><li>20 minutes of supervised preparation: annotate the extract and write <strong>up to 10 bullet points</strong> of notes; no other material.</li><li>You take the clean extract and your notes into the oral; the oral is recorded, marked by your teacher and moderated by the IB.</li><li>The general conversation must cover <strong>at least one theme different</strong> from the one linked to the extract.</li><li>Do not memorise a speech: over-rehearsed answers limit Criterion C (interaction).</li></ul>" },
      ],
    },

    /* ================= LANGUAGE ================= */
    "engb-11": {
      figures: [
        { title: "Sentence sophistication ladder", caption: "Climb the ladder to show 'complex structures' for Criterion A",
          svg: flow("ar-engb11-1", "Sentence sophistication ladder", [
            { t: "Simple: Tourism brings money.", n: "1 clause", c: "muted" },
            { t: "Compound: ... money, but it harms...", n: "and / but / so" },
            { t: "Complex: Although tourism brings|money, it harms local culture.", n: "subordinate clause (although, which)", c: "b" },
            { t: "Passive / conditional: If tourism|were managed better, ...", n: "second / third conditional, passive", c: "c" },
            { t: "Inversion: Not only does tourism|bring money, but it also...", n: "emphatic structure", c: "d" },
          ]) },
        { title: "Cohesive devices by function", caption: "Vary linkers and use them accurately (Criterion B cohesion, A range)",
          svg: grid("Cohesive devices by function", [110, 360], [
            ["Function", "Devices"],
            ["Adding", "furthermore, moreover, in addition, not only... but also"],
            ["Contrasting", "however, nevertheless, whereas, although, on the other hand"],
            ["Cause / effect", "as a result, consequently, therefore, due to, this leads to"],
            ["Example", "for instance, such as, a case in point is"],
            ["Sequencing", "firstly, subsequently, eventually, finally"],
            ["Concluding", "in conclusion, on balance, all things considered"],
          ], { 1: "c", 2: "d", 3: "b", 4: "a", 5: "muted", 6: "a" }) },
        { title: "Conditionals at a glance", caption: "Form + time + real/unreal meaning",
          svg: grid("Conditionals table", [70, 230, 170], [
            ["Type", "Form", "Use"],
            ["Zero", "If + present, present", "general truths"],
            ["First", "If + present, will + verb", "real future possibility"],
            ["Second", "If + past, would + verb", "unreal / unlikely present"],
            ["Third", "If + had + p.p., would have + p.p.", "unreal past (regret)"],
            ["Mixed", "If + had + p.p., would + verb", "past cause → present result"],
          ], { 1: "muted", 2: "c", 3: "b", 4: "d", 5: "a" }) },
        { title: "Tense timeline: past simple vs present perfect", caption: "Finished time → past simple; unfinished time / link to now → present perfect",
          svg: `<svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tense timeline"><defs><marker id="ar-engb11-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs><line x1="20" y1="70" x2="480" y2="70" stroke="currentColor" stroke-width="1.6" marker-end="url(#ar-engb11-2)"/><line x1="330" y1="55" x2="330" y2="85" stroke="var(--fig-d)" stroke-width="2"/><text x="330" y="100" font-size="12" font-weight="700" text-anchor="middle" fill="var(--fig-d)">NOW</text><circle cx="110" cy="70" r="6" fill="var(--fig-b)"/><text x="110" y="45" font-size="11" text-anchor="middle" fill="var(--fig-b)">past simple</text><text x="110" y="100" font-size="11" text-anchor="middle" fill="currentColor"><tspan x="110" dy="0">'I moved here in 2020.'</tspan><tspan x="110" dy="13">finished time</tspan></text><path d="M190 62 Q260 30 326 62" fill="none" stroke="var(--fig-c)" stroke-width="2" marker-end="url(#ar-engb11-2)"/><text x="258" y="28" font-size="11" text-anchor="middle" fill="var(--fig-c)">present perfect</text><text x="230" y="100" font-size="11" text-anchor="middle" fill="currentColor"><tspan x="230" dy="0">'I have lived here</tspan><tspan x="230" dy="13">since 2020 / for 6 years.'</tspan></text><text x="410" y="100" font-size="11" text-anchor="middle" fill="currentColor"><tspan x="410" dy="0">since + point</tspan><tspan x="410" dy="13">for + period</tspan></text></svg>` },
        { title: "Proofreading loop (last 10-15 minutes)", caption: "Check one error type per pass - faster and more reliable",
          svg: flow("ar-engb11-3", "Proofreading loop", [
            { t: "Pass 1: verbs", n: "tense consistency, subject-verb agreement" },
            { t: "Pass 2: nouns", n: "articles, plurals, uncountables (advice, information)", c: "b" },
            { t: "Pass 3: your error log", n: "your 3 most frequent mistakes", c: "d" },
            { t: "Pass 4: register + conventions", n: "contractions? sign-off matches greeting?", c: "c" },
          ]) },
      ],
    },
  }});
})();
