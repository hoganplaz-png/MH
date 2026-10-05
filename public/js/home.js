IB.page = function () {
  const app = IB.qs("#app");
  const data = IB.store.get();
  const subs = IB.subjectList();
  const totalQ = IB.allQuestions().length;
  const totalT = subs.reduce((n, s) => n + s.topics.length, 0);
  const attempted = new Set(data.attempts.map((a) => a.id)).size;
  const recent = data.attempts.slice(-1)[0];

  app.innerHTML = `
  <section class="hero">
    <span class="pill">Economics SL · Chemistry SL · Geography SL · Maths AA SL</span>
    <h1>Revise smarter for your IB exams.</h1>
    <p class="lead">Notes organised by syllabus topic, an exam-style question bank, unlimited quizzes and timed mock papers, and an AI tutor that guides you and marks your answers against the markscheme - with your progress tracked as you go.</p>
    <div class="btn-row">
      <a class="btn primary" href="practice.html">Start a quiz</a>
      <a class="btn" href="notes.html">Browse notes</a>
      ${recent ? `<a class="btn" href="questionbank.html?subject=${recent.s}&topic=${recent.t}">Continue: ${IB.esc((IB.topic(recent.t) || {}).title || "last topic")}</a>` : ""}
    </div>
  </section>

  <section class="grid grid-4" aria-label="Site statistics">
    <div class="card"><div class="stat-big">${totalT}</div><div class="muted small">syllabus topics with notes</div></div>
    <div class="card"><div class="stat-big">${totalQ}</div><div class="muted small">exam-style questions with markschemes</div></div>
    <div class="card"><div class="stat-big">∞</div><div class="muted small">auto-generated calculation questions</div></div>
    <div class="card"><div class="stat-big">${attempted}</div><div class="muted small">questions you've attempted</div></div>
  </section>

  <h2>Three ways to revise</h2>
  <section class="grid grid-3">
    <a class="card section-card" href="notes.html" style="color:inherit;text-decoration:none">
      <span class="num">SECTION 1</span><h3>Topic notes</h3>
      <ul class="feature-list"><li>Every syllabus topic: key concepts, definitions, diagrams to know</li><li>Exam skills & command terms for each topic</li><li>Worked example questions with model answers</li><li>Download any topic or a whole subject (HTML/PDF)</li></ul>
    </a>
    <a class="card section-card" href="questionbank.html" style="color:inherit;text-decoration:none">
      <span class="num">SECTION 2</span><h3>Question bank</h3>
      <ul class="feature-list"><li>Filter by subject, topic, paper, difficulty and status</li><li>Full markschemes with M/A mark points</li><li>Fresh calculation questions generated on demand</li><li>Download printable worksheets with answers</li></ul>
    </a>
    <a class="card section-card" href="tutor.html" style="color:inherit;text-decoration:none">
      <span class="num">SECTION 3</span><h3>AI tutor, marking & tracking</h3>
      <ul class="feature-list"><li>Ask the AI tutor for hints, explanations and feedback</li><li>AI examiner marks written answers against the markscheme</li><li>Unit quizzes and timed mock papers with grade estimates</li><li>Mastery by topic, weak-topic targeting, data export</li></ul>
    </a>
  </section>

  <h2>Subjects</h2>
  <section class="grid grid-4" id="subjects"></section>

  <h2>Why this beats a static question bank</h2>
  <section class="grid grid-2">
    <div class="card"><h3 style="margin-top:0">Never run out of practice</h3><p class="muted">Calculation topics (elasticity, moles, pH, sequences, calculus, Spearman's rank…) generate brand-new numbers every time, auto-marked instantly. With AI switched on you can also generate new written questions for any topic.</p></div>
    <div class="card"><h3 style="margin-top:0">Feedback like an examiner</h3><p class="muted">Write a full answer and get a mark out of the total, which markscheme points you hit and missed, how to improve, and a model answer - not just a reveal button.</p></div>
    <div class="card"><h3 style="margin-top:0">Targets your weak topics</h3><p class="muted">Every attempt updates a recency-weighted mastery score per topic. The "Smart quiz" pulls questions from the topics you're weakest in.</p></div>
    <div class="card"><h3 style="margin-top:0">Yours to keep</h3><p class="muted">Progress is stored in your browser - no account needed. Export a backup file any time and import it on another device.</p></div>
  </section>`;

  const grid = IB.qs("#subjects");
  subs.forEach((s) => {
    const qs = IB.allQuestions(s.id);
    const ms = s.topics.map((t) => IB.mastery(t.id, data)).filter((m) => m !== null);
    const avg = ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length) : null;
    grid.appendChild(
      IB.el(`<div class="card subject-card" style="--c:${s.color}">
        <h3>${s.name}</h3>
        <div class="stats">${s.topics.length} topics · ${qs.length} questions${avg !== null ? ` · mastery ${avg}%` : ""}</div>
        <div class="btn-row" style="margin-top:8px">
          <a class="btn small" href="notes.html?subject=${s.id}">Notes</a>
          <a class="btn small" href="questionbank.html?subject=${s.id}">Questions</a>
          <a class="btn small" href="practice.html?subject=${s.id}">Quiz</a>
        </div>
      </div>`)
    );
  });
};
