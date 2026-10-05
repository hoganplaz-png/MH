IB.page = function () {
  const app = IB.qs("#app");
  let subjectId = IB.param("subject") || "econ";
  if (!IB.subjects[subjectId]) subjectId = "econ";
  let topicId = IB.param("topic");

  app.innerHTML = `<h1 style="margin-bottom:.2em">Topic notes</h1>
    <p class="muted" style="margin-top:0">Concepts, key terms, exam skills and worked examples for every syllabus topic. Download any topic or the whole subject.</p>
    <div class="subject-tabs" id="subTabs"></div>
    <div class="notes-layout"><aside class="side card" id="side"></aside><section id="content"></section></div>`;

  const go = (sid, tid) => {
    subjectId = sid;
    topicId = tid || null;
    history.replaceState(null, "", `notes.html?subject=${sid}${tid ? "&topic=" + tid : ""}`);
    render();
    window.scrollTo({ top: 0 });
  };

  function render() {
    const s = IB.subjects[subjectId];
    const data = IB.store.get();
    document.body.style.setProperty("--c", s.color);
    IB.qs("#subTabs").innerHTML = IB.subjectList()
      .map((x) => `<button data-s="${x.id}" class="${x.id === subjectId ? "active" : ""}" style="--c:${x.color}">${x.name}</button>`)
      .join("");
    IB.qsa("#subTabs button").forEach((b) => (b.onclick = () => go(b.dataset.s)));

    // sidebar grouped by unit
    let side = `<a href="#" data-t="" class="btn small" style="width:100%;margin-bottom:10px;justify-content:center">${s.name} overview</a>`;
    let unit = "";
    s.topics.forEach((t) => {
      if (t.unit !== unit) {
        if (unit) side += "</ul>";
        unit = t.unit;
        side += `<div class="small muted" style="font-weight:700;margin:12px 4px 4px">${IB.esc(unit)}</div><ul class="topic-list">`;
      }
      side += `<li><a href="#" data-t="${t.id}" class="${t.id === topicId ? "active" : ""}"><span class="code">${IB.esc(t.code)}</span><span>${IB.esc(t.title)}</span>${data.read[t.id] ? '<span class="done" title="Revised">✓</span>' : ""}</a></li>`;
    });
    side += "</ul>";
    IB.qs("#side").innerHTML = side;
    IB.qsa("#side a").forEach((a) => (a.onclick = (e) => { e.preventDefault(); go(subjectId, a.dataset.t); }));

    const t = topicId ? s.topics.find((x) => x.id === topicId) : null;
    t ? renderTopic(s, t, data) : renderOverview(s, data);
  }

  function renderOverview(s, data) {
    const c = IB.qs("#content");
    const read = s.topics.filter((t) => data.read[t.id]).length;
    c.innerHTML = `<div class="card topic-head">
      <span class="pill ${s.id}">${s.guide}</span>
      <h1>${s.name}</h1>
      <p class="muted">${s.topics.length} topics · ${read} marked as revised</p>
      <div class="bar" style="--c:${s.color}"><span style="width:${IB.pct(read, s.topics.length)}%"></span></div>
      <div class="btn-row no-print" style="margin-top:14px">
        <button class="btn primary" id="dlAll">⬇ Download all ${s.short} notes</button>
        <button class="btn" id="dlAllQ">⬇ Notes + all practice questions</button>
      </div>
    </div>
    <div class="card"><h2 style="margin-top:0">Assessment overview</h2>
      <div class="table-wrap"><table><tr><th>Component</th><th>Time</th><th>Marks</th><th>Weight</th><th>Format</th></tr>
      ${s.assessment.map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>
      <p class="small muted">Always confirm details against the current IB subject guide and your teacher - assessment details can change between exam sessions.</p>
    </div>
    <div class="card"><h2 style="margin-top:0">Command terms you must know</h2>
      <dl>${s.commandTerms.map(([k, v]) => `<div class="keyterm"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </div>
    <div class="card"><h2 style="margin-top:0">Topics</h2><div class="grid grid-2">
      ${s.topics.map((t) => `<a href="#" data-t="${t.id}" class="card" style="color:inherit;text-decoration:none;padding:14px"><span class="pill">${IB.esc(t.code)}</span> <strong>${IB.esc(t.title)}</strong><div class="small muted">${t.summary}</div></a>`).join("")}
    </div></div>`;
    IB.qsa("#content a[data-t]").forEach((a) => (a.onclick = (e) => { e.preventDefault(); go(s.id, a.dataset.t); }));
    const dl = (withQ) => {
      const body = `<h1>${s.name} - Revision notes</h1><p class="meta">${s.guide}</p>` + s.topics.map((t) => IB.topicHtml(t, { questions: withQ })).join('<div class="page-break"></div>');
      IB.download(`IB-${s.short.replace(/\s+/g, "-")}-notes${withQ ? "-with-questions" : ""}.html`, IB.standaloneDoc(`${s.name} notes`, body));
    };
    IB.qs("#dlAll").onclick = () => dl(false);
    IB.qs("#dlAllQ").onclick = () => dl(true);
    IB.math(c);
  }

  function renderTopic(s, t, data) {
    const c = IB.qs("#content");
    const idx = s.topics.indexOf(t);
    const prev = s.topics[idx - 1], next = s.topics[idx + 1];
    const m = IB.mastery(t.id, data);
    c.innerHTML = `<div class="card topic-head">
      <div class="btn-row"><span class="pill ${s.id}">${s.name}</span><span class="pill">${IB.esc(t.unit)}</span>${m !== null ? `<span class="pill ${m >= 70 ? "good" : m >= 40 ? "warn" : "bad"}">Mastery ${m}%</span>` : ""}</div>
      <h1>${IB.esc(t.code)} ${IB.esc(t.title)}</h1>
      <p class="muted">${t.summary}</p>
      <div class="btn-row no-print">
        <button class="btn ${data.read[t.id] ? "" : "primary"}" id="readBtn">${data.read[t.id] ? "✓ Revised" : "Mark as revised"}</button>
        <button class="btn" id="dlTopic">⬇ Download notes</button>
        <button class="btn" id="dlSheet">⬇ Download worksheet + markscheme</button>
        <button class="btn" id="printBtn">🖨 Print / save as PDF</button>
        <a class="btn" href="practice.html?subject=${s.id}&topic=${t.id}">Quiz this topic</a>
        <a class="btn" href="tutor.html?subject=${s.id}&topic=${t.id}">Ask the AI tutor</a>
      </div>
    </div>
    <div class="tabs" id="tabs" style="--c:${s.color}">
      <button data-tab="concepts" class="active">Concepts</button>
      <button data-tab="terms">Key terms</button>
      <button data-tab="skills">Exam skills</button>
      <button data-tab="examples">Worked examples</button>
      <button data-tab="practice">Practice (${IB.topicQuestions(t.id).length}${IB.hasGenerator(t.id) ? "+∞" : ""})</button>
    </div>
    <div class="card" id="panels" style="--c:${s.color}">
      <div data-panel="concepts">${t.concepts.map((x) => `<div class="concept"><h3>${x.h}</h3>${x.b}</div>`).join("")}</div>
      <div data-panel="terms" class="hidden"><h3>Key terms & definitions</h3><p class="small muted">Learn these word-for-word - 2-mark "define" questions reward precise definitions.</p><dl>${(t.terms || []).map(([k, v]) => `<div class="keyterm"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
      <div data-panel="skills" class="hidden"><h3>Exam skills</h3>${(t.skills || []).map((x) => `<div class="skill"><strong>${x.h}</strong>${x.b}</div>`).join("")}
        <h3>Command terms for ${s.short}</h3><dl>${s.commandTerms.map(([k, v]) => `<div class="keyterm"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
      <div data-panel="examples" class="hidden"><h3>Worked examples</h3>${(t.examples || []).map((e, i) => `<div class="worked"><strong>Example ${i + 1}.</strong> ${e.q}<details class="sol"><summary>Show solution</summary><div>${e.a}</div></details></div>`).join("")}</div>
      <div data-panel="practice" class="hidden"><div class="btn-row no-print">${IB.hasGenerator(t.id) ? '<button class="btn primary small" id="genBtn">+ Generate a new calculation question</button>' : ""}<a class="btn small" href="questionbank.html?subject=${s.id}&topic=${t.id}">Open in question bank</a></div><div id="practiceList"></div></div>
    </div>
    <div class="btn-row no-print" style="justify-content:space-between;margin-top:16px">
      ${prev ? `<a class="btn" href="#" data-t="${prev.id}">← ${IB.esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a class="btn" href="#" data-t="${next.id}">${IB.esc(next.title)} →</a>` : ""}
    </div>`;

    IB.qsa("#tabs button").forEach((b) => (b.onclick = () => {
      IB.qsa("#tabs button").forEach((x) => x.classList.toggle("active", x === b));
      IB.qsa("[data-panel]").forEach((p) => p.classList.toggle("hidden", p.dataset.panel !== b.dataset.tab));
    }));
    const list = IB.qs("#practiceList");
    IB.topicQuestions(t.id).forEach((q, i) => list.appendChild(IB.renderQuestion(q, { number: i + 1, showTopic: false })));
    const gen = IB.qs("#genBtn");
    if (gen) gen.onclick = () => {
      const q = IB.generate(t.id);
      list.prepend(IB.renderQuestion(q, { showTopic: false }));
    };
    IB.qsa("a[data-t]", c).forEach((a) => (a.onclick = (e) => { e.preventDefault(); go(s.id, a.dataset.t); }));
    IB.qs("#readBtn").onclick = () => {
      IB.markRead(t.id, !IB.store.get().read[t.id]);
      render();
    };
    IB.qs("#dlTopic").onclick = () => IB.download(`IB-${s.short.replace(/\s+/g, "-")}-${t.code.replace(/[^\w.-]+/g, "_")}-${t.title.replace(/[^\w]+/g, "-")}.html`, IB.standaloneDoc(t.title, `<h1>${IB.esc(t.title)}</h1>` + IB.topicHtml(t)));
    IB.qs("#dlSheet").onclick = () => IB.download(`IB-${s.short.replace(/\s+/g, "-")}-${t.title.replace(/[^\w]+/g, "-")}-worksheet.html`, IB.standaloneDoc(`${t.title} worksheet`, `<h1>${IB.esc(s.name)}: ${IB.esc(t.title)}</h1>` + IB.worksheetHtml(t.questions, "Worksheet")));
    IB.qs("#printBtn").onclick = () => {
      document.body.classList.add("print-all");
      IB.qsa("details").forEach((d) => (d.open = true));
      IB.print();
      document.body.classList.remove("print-all");
    };
    IB.math(c);
  }

  render();
};
