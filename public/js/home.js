IB.page = function () {
  const app = IB.qs("#app");
  const data = IB.store.get();
  const subs = IB.subjectList();
  const totalQ = IB.allQuestions().length;
  const totalT = subs.reduce((n, s) => n + s.topics.length, 0);
  const recent = data.attempts.slice(-1)[0];
  const recentTopic = recent && IB.topic(recent.t);

  const streak = IB.streak(data).days;

  app.innerHTML = `
  <section class="band home-band">
    <div class="hero">
      <div class="hero-copy">
        <h1>Write the answer. See where the marks went.</h1>
        <p class="lead">Notes with 答題框架, an exam-style question bank and IB-style papers for eight Diploma subjects at SL and HL. Every answer is marked against the markscheme, point by point.</p>
        <div class="btn-row">
          <a class="btn primary" href="practice.html">Start a quiz</a>
          ${recentTopic ? `<a class="btn" href="notes.html?subject=${recentTopic.subject}&topic=${recentTopic.id}">Continue ${IB.esc(recentTopic.title)}</a>` : `<a class="btn" href="notes.html">Browse the notes</a>`}
        </div>
        <p class="hero-facts"><strong>${totalT} syllabus topics</strong> with notes, <strong>${totalQ.toLocaleString()} questions</strong> with markschemes, and fresh calculation questions whenever you want more.</p>
      </div>
      <figure class="script" aria-label="Example: a 4-mark Economics answer marked against the markscheme, scoring 3 out of 4">
        <div class="script-q" aria-hidden="true">
          <span class="qn">3.</span>
          <span><span class="script-src">Economics SL, Paper 2</span>Using a diagram, explain how a severe drought in Brazil is likely to affect the world price of coffee.</span>
          <span class="marks">[4]</span>
        </div>
        <ol class="script-lines" aria-hidden="true">
          <li><span class="tick" style="--i:0"><svg viewBox="0 0 28 24" width="26" height="22"><path d="M2.5 13.5c2.6 1.4 4.6 4 6.4 7.2C12 13 17.4 6.2 25.5 2.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Drought cuts yields, so supply shifts left from S₁ to S₂.</li>
          <li><span class="tick" style="--i:1"><svg viewBox="0 0 28 24" width="26" height="22"><path d="M2.5 13.5c2.6 1.4 4.6 4 6.4 7.2C12 13 17.4 6.2 25.5 2.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>At the old price P₁ there is now a shortage.</li>
          <li><span class="tick" style="--i:2"><svg viewBox="0 0 28 24" width="26" height="22"><path d="M2.5 13.5c2.6 1.4 4.6 4 6.4 7.2C12 13 17.4 6.2 25.5 2.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>The price rises to P₂ until the market clears.</li>
          <li><span class="tick" style="--i:3"><svg viewBox="0 0 28 24" width="26" height="22"><path d="M2.5 13.5c2.6 1.4 4.6 4 6.4 7.2C12 13 17.4 6.2 25.5 2.2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Diagram: demand, S₁, S₂, P₁ and P₂ shown.</li>
          <li><span class="tick miss" style="--i:4">Q₂?</span>&nbsp;</li>
        </ol>
        <p class="script-note" aria-hidden="true">Clear chain of reasoning. Label the new equilibrium quantity for the last mark.</p>
        <span class="script-total" aria-hidden="true">3/4</span>
      </figure>
    </div>
  </section>

  <div style="margin-top:8px">${IB.gamePanel(data, { compact: true })}</div>

  <div class="section-head">
    <h2>Your subjects</h2>
    <span class="muted small">Grades are estimated from your last 20 attempts on each topic.</span>
  </div>
  <section class="subject-grid" id="subjects"></section>

  <div class="section-head"><h2>What you can do here</h2></div>
  <ul class="contents" id="features">
    ${[
      ["notes.html", "Topic notes and PDFs", "Concepts, fastest methods, common traps and worked examples, with a four-colour highlight key. Download any topic or a whole subject as a PDF booklet.", "Browse the notes"],
      ["questionbank.html", `${totalQ.toLocaleString()} practice questions`, "Exam-style questions, calculations, worked-example replays, explain-the-concept, key-term drills and spot-the-mistake for every topic.", "Open the question bank"],
      ["practice.html?mode=mock", "Quizzes and mock papers", "Timed papers in the real structure, unit quizzes, and smart quizzes that target your weakest topics, all marked as soon as you finish.", "Sit a mock"],
      ["skills.html", "Answer frameworks", "A framework for every command term and question type, sentence starters, top-band checklists and the markscheme explained band by band.", "Learn the frameworks"],
      ["ia.html", "IA and EE predictor", "Score your coursework on each criterion against the official descriptors and see your predicted grade and core points.", "Predict my grade"],
      ["mistakes.html", "Mistakes notebook", "Every question you get wrong is saved here. Retry it until you get it right and it leaves the notebook.", "Open my mistakes"],
    ].map(([href, title, text, cta]) => `<li><a href="${href}"><h3>${title}</h3><p>${text}</p><span class="go">${cta}</span></a></li>`).join("")}
  </ul>`;

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
          <div class="sc-top">
            <div><h3>${s.name}</h3><div class="stats">${s.topics.length} topics, ${qs.length.toLocaleString()} questions</div></div>
            <span class="sc-ring${tried.length ? "" : " none"}" title="${tried.length ? "Estimated grade " + IB.grade(pct, s.id) : "Not started yet"}"><b>${tried.length ? IB.grade(pct, s.id) : "new"}</b></span>
          </div>
          <div class="sc-next"><span class="muted">Next up</span><span>${IB.esc(next.title)}</span><strong class="mono">${tried.length ? pct + "%" : ""}</strong></div>
        </div>
      </a>`)
    );
  });
};
