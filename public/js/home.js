IB.page = function () {
  const app = IB.qs("#app");
  const data = IB.store.get();
  const subs = IB.subjectList();
  const totalQ = IB.allQuestions().length;
  const totalT = subs.reduce((n, s) => n + s.topics.length, 0);
  const recent = data.attempts.slice(-1)[0];
  const recentTopic = recent && IB.topic(recent.t);

  // revision streak (consecutive days with at least one attempt)
  const dayKey = (ts) => new Date(ts).toISOString().slice(0, 10);
  const days = new Set(data.attempts.map((a) => dayKey(a.at)));
  let streak = 0;
  for (let i = 0; ; i++) {
    if (days.has(dayKey(Date.now() - i * 86400000))) streak++;
    else if (i > 0) break;
  }

  app.innerHTML = `
  <section class="band">
    <div class="hero">
      <div class="hero-copy">
        <span class="eyebrow">IB Diploma · Econ · Chem · Geo · Maths AA (SL)</span>
        <h1>Every topic. Every paper. <span class="hl">Marked like the real thing.</span></h1>
        <p class="lead">Notes by syllabus topic, an exam-style question bank and mock papers, with an AI examiner that marks your answers against the markscheme.</p>
        <div class="btn-row">
          <a class="btn primary" href="practice.html">Start a quiz</a>
          ${recentTopic ? `<a class="btn" href="notes.html?subject=${recentTopic.subject}&topic=${recentTopic.id}">Continue: ${IB.esc(recentTopic.title)} →</a>` : `<a class="btn" href="notes.html">Browse notes →</a>`}
        </div>
      </div>
      <div class="hero-demo" aria-label="Example of AI marking">
        <div class="btn-row" style="justify-content:space-between">
          <span class="pill econ">Econ SL · Paper 2</span>
          <span class="mono" style="font-weight:700">[4 marks]</span>
        </div>
        <div style="font-size:1.05rem;line-height:1.5;font-weight:500">Using a diagram, explain how a severe drought in Brazil is likely to affect the world price of coffee.</div>
        <div class="answer">Drought reduces crop yields, so supply shifts left from S₁ to S₂. At the old price there is a shortage, so the price rises to P₂…</div>
        <div class="verdict demo-anim">
          <div style="display:flex;align-items:center;gap:12px"><span class="big"><span data-count="3">3</span>/4</span><span class="pill" style="background:#DDF3E6;color:#155E34">AI examiner</span></div>
          <div><strong style="color:#155E34">✓</strong> Supply shifts left · <strong style="color:#155E34">✓</strong> Shortage → price rises · <strong style="color:#155E34">✓</strong> Diagram</div>
          <div><strong style="color:#B42318">✗</strong> Missing: label the new equilibrium Q₂</div>
        </div>
      </div>
    </div>
  </section>

  <section class="grid grid-4" style="margin-top:40px" aria-label="Site statistics">
    <div class="card stat-tile"><span class="stat-big" data-count="${totalT}">${totalT}</span><span class="muted">syllabus topics with notes</span></div>
    <div class="card stat-tile"><span class="stat-big" data-count="${totalQ}">${totalQ}</span><span class="muted">exam-style questions with markschemes</span></div>
    <div class="card stat-tile"><span class="stat-big">∞</span><span class="muted">fresh calculation questions</span></div>
    <div class="card stat-tile accent"><span class="stat-big">${streak} day${streak === 1 ? "" : "s"}</span><span class="muted">your revision streak</span></div>
  </section>

  <div class="btn-row" style="justify-content:space-between;align-items:flex-end;margin-top:56px">
    <h2 style="margin:0">Your subjects</h2>
    <span class="muted small">Mastery from your last 20 attempts per topic</span>
  </div>
  <section class="grid grid-4" id="subjects" style="margin-top:20px"></section>

  <h2 style="margin-top:56px">Three ways to revise</h2>
  <section class="grid grid-3">
    <a class="card section-card" href="notes.html" style="color:inherit">
      <span class="num">01 · LEARN</span><h3>Topic notes</h3>
      <p class="muted" style="margin:0">Key concepts, definitions to learn word-for-word, exam skills and worked examples for every syllabus topic.</p>
      <span style="font-weight:700;color:var(--primary)">Browse notes →</span>
    </a>
    <a class="card section-card" href="questionbank.html" style="color:inherit">
      <span class="num">02 · PRACTISE</span><h3>Question bank</h3>
      <p class="muted" style="margin:0">Filter by topic, paper and difficulty. Calculation topics generate new numbers every time, marked instantly. Add your own past papers too.</p>
      <span style="font-weight:700;color:var(--primary)">Open the bank →</span>
    </a>
    <a class="card section-card inkcard" href="practice.html?mode=mock">
      <span class="num eyebrow">03 · TEST YOURSELF</span><h3>Mocks + AI examiner</h3>
      <p style="margin:0">Timed papers in the real structure, marked against the markscheme, with a grade estimate and what to fix next.</p>
      <span style="font-weight:700">Sit a mock paper →</span>
    </a>
  </section>`;

  const grid = IB.qs("#subjects");
  subs.forEach((s) => {
    const qs = IB.allQuestions(s.id);
    const rows = s.topics.map((t) => IB.mastery(t.id, data));
    const tried = rows.filter((m) => m !== null);
    const pct = tried.length ? Math.round(rows.reduce((n, m) => n + (m ?? 0), 0) / rows.length) : 0;
    const next = s.topics.map((t, i) => ({ t, m: rows[i] })).sort((a, b) => (a.m ?? -1) - (b.m ?? -1))[0].t;
    grid.appendChild(
      IB.el(`<a class="card subject-card" href="notes.html?subject=${s.id}" style="--c:${s.color}">
        <div class="stripe"></div>
        <div class="body">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
            <div><h3>${s.name}</h3><div class="stats">${s.topics.length} topics · ${qs.length} questions</div></div>
            <span class="grade" style="width:48px;height:48px;font-size:1.5rem" title="Estimated grade">${tried.length ? IB.grade(pct, s.id) : "–"}</span>
          </div>
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div style="display:flex;justify-content:space-between;gap:8px;font-size:.9rem"><span class="muted">Next: ${IB.esc(next.title)}</span><strong class="mono">${tried.length ? pct + "%" : "new"}</strong></div>
        </div>
      </a>`)
    );
  });
};
