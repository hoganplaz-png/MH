IB.page = function () {
  const app = IB.qs("#app");
  const PER_PAGE = 12;
  let page = 1;
  let extra = []; // generated / AI questions added this session

  app.innerHTML = `<h1 style="margin-bottom:.2em">Question bank</h1>
    <p class="muted" style="margin-top:0">Exam-style questions by subject and topic with full markschemes. Answer in the box and it is marked instantly against the markscheme (or self-mark). Every attempt is saved to your progress.</p>
    <div class="notice warn small">These are <strong>original IB-style questions</strong> modelled on the format, command terms and markscheme style of IB papers - official IB past papers are copyright of the IBO and are not reproduced here. Use them alongside the official past papers from your school.</div>
    <div class="card no-print">
      <div class="filters">
        <label class="field">Subject<select id="fSub"><option value="">All subjects</option>${IB.subjectList().map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}</select></label>
        <label class="field">Topic<select id="fTopic"></select></label>
        <label class="field">Paper<select id="fPaper"><option value="">Any paper</option></select></label>
        <label class="field">Type<select id="fType"><option value="">Any type</option><option value="mcq">Multiple choice</option><option value="short">Short / structured</option><option value="extended">Extended response / essay</option><option value="calc">Calculations only</option></select></label>
        <label class="field">Section<select id="fSec"><option value="">All sections</option>${IB.SECTIONS.map(([k, n]) => `<option value="${k}">${n}</option>`).join("")}</select></label>
        <label class="field">Difficulty<select id="fDiff"><option value="">Any</option><option value="1">Foundation</option><option value="2">Standard</option><option value="3">Challenging</option></select></label>
        <label class="field">Source<select id="fSource"><option value="">All questions</option><option value="site">Site questions</option><option value="mine">My past papers</option></select></label>
        <label class="field">Status<select id="fStatus"><option value="">All questions</option><option value="new">Not attempted</option><option value="weak">Scored under 60%</option><option value="saved">Saved for review</option></select></label>
        <label class="field field-wide">Search<input type="search" id="fSearch" placeholder="e.g. elasticity, pH, Spearman, tariff…"></label>
      </div>
      <div class="btn-row" style="margin-top:14px">
        <button class="btn primary" id="genBtn">+ 5 fresh calculation questions</button>
        ${IB.config.ai ? '<button class="btn" id="aiGenBtn">✦ AI: write new questions for this topic</button>' : ""}
        <button class="btn mark" id="paperBtn">⬇ IB-style PDF paper</button>
        <button class="btn" id="sheetBtn">⬇ Worksheet (HTML)</button>
        <span class="muted small" id="count"></span>
      </div>
    </div>
    <div class="card paper-opts hidden no-print" id="paperOpts">
      <strong>Export questions as an IB-style paper</strong>
      <p class="small muted" style="margin:4px 0 10px">Cover page with instructions, numbered questions with marks, lined answer boxes, and the markscheme at the end. Tick one or more topics to download every question in them, or leave them all unticked to use the filters above.</p>
      <div class="ptopics">
        <div class="ptopics-head">
          <span class="small"><strong>Topics</strong> <span class="muted" id="pTopicSum"></span></span>
          <span class="btn-row"><button class="btn small" type="button" id="pAll">Tick all</button><button class="btn small" type="button" id="pNone">Clear</button></span>
        </div>
        <div class="ptopics-list" id="pTopicList"></div>
      </div>
      <div class="filters" style="margin-top:12px">
        <label class="field">Questions<select id="pN"><option value="10">10</option><option value="20" selected>20</option><option value="30">30</option><option value="50">50</option><option value="100">100</option><option value="150">150</option><option value="200">200</option><option value="300">300</option><option value="all">All matching</option></select></label>
        <label class="field">Order<select id="pOrder"><option value="mix">Shuffle</option><option value="topic">By topic</option><option value="list">As listed</option></select></label>
        <label class="field">Paper title<input type="text" id="pTitle" placeholder="Practice paper"></label>
      </div>
      <div class="btn-row" style="margin-top:10px">
        <label class="small"><input type="checkbox" id="pMs" checked> Markscheme at the end</label>
        <label class="small"><input type="checkbox" id="pTopics"> Show topic under each question</label>
        <label class="small"><input type="checkbox" id="pExam" checked> Exam-style questions first</label>
        <span class="small muted" id="pCount" style="margin-left:auto"></span>
        <button class="btn primary" id="pGo">⬇ Create PDF</button>
      </div>
    </div>
    <div id="drillBar"></div>
    <div id="list"></div>
    <div class="pager no-print" id="pager"></div>`;

  const f = {
    sub: IB.qs("#fSub"), topic: IB.qs("#fTopic"), paper: IB.qs("#fPaper"), type: IB.qs("#fType"),
    diff: IB.qs("#fDiff"), sec: IB.qs("#fSec"), status: IB.qs("#fStatus"), source: IB.qs("#fSource"), search: IB.qs("#fSearch"),
  };
  f.sub.value = IB.param("subject") || "";
  f.source.value = IB.param("source") || "";
  f.sec.value = IB.param("sec") || "";

  function fillTopics() {
    const subs = f.sub.value ? [IB.subjects[f.sub.value]] : IB.subjectList();
    f.topic.innerHTML = `<option value="">All topics</option>` + subs.map((s) => `<optgroup label="${s.name}">${s.topics.map((t) => `<option value="${t.id}">${IB.esc(t.code)} ${IB.esc(t.title)}</option>`).join("")}</optgroup>`).join("");
    const papers = new Set(IB.allQuestions(f.sub.value || undefined).map((q) => q.paper).filter(Boolean));
    f.paper.innerHTML = `<option value="">Any paper</option>` + Array.from(papers).sort().map((p) => `<option>${p}</option>`).join("");
  }
  fillTopics();
  if (IB.param("topic")) f.topic.value = IB.param("topic");

  function filtered(topicSet) {
    const data = IB.store.get();
    const last = {};
    data.attempts.forEach((a) => (last[a.id] = a.sc / a.mx));
    const term = f.search.value.trim().toLowerCase();
    let qs = extra.concat(IB.allQuestions(f.sub.value || undefined)).filter((q) => !f.sub.value || q.subject === f.sub.value);
    return qs.filter((q) => {
      if (topicSet ? !topicSet.has(q.topic) : f.topic.value && q.topic !== f.topic.value) return false;
      if (f.paper.value && q.paper !== f.paper.value) return false;
      if (f.source.value === "mine" && !q.custom) return false;
      if (f.source.value === "site" && q.custom) return false;
      if (f.type.value === "calc" ? !q.numeric : f.type.value && q.type !== f.type.value) return false;
      if (f.diff.value && String(q.diff) !== f.diff.value) return false;
      if (f.sec.value && (q.sec || "exam") !== f.sec.value) return false;
      if (f.status.value === "new" && q.id in last) return false;
      if (f.status.value === "weak" && !(q.id in last && last[q.id] < 0.6)) return false;
      if (f.status.value === "saved" && !data.flags[q.id]) return false;
      if (term) {
        const t = IB.topic(q.topic);
        const hay = (q.q + " " + (t ? t.title : "") + " " + (q.ms || []).join(" ")).toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }

  // Topic drill: score by sub-topic, plus one random question at a time.
  let drillId = null;
  function drillBar(qs) {
    const bar = IB.qs("#drillBar");
    if (f.sec.value !== "drill") { bar.innerHTML = ""; drillId = null; return; }
    const last = {};
    IB.store.get().attempts.forEach((a) => (last[a.id] = a));
    const groups = {};
    const base = IB.allQuestions(f.sub.value || undefined).filter((q) => q.sec === "drill" && (!f.topic.value || q.topic === f.topic.value));
    base.forEach((q) => { const k = f.topic.value ? q.unitName || "Other" : (IB.topic(q.topic) || {}).code || q.topic; (groups[k] = groups[k] || []).push(q); });
    const pct = (list) => {
      const done = list.filter((q) => last[q.id]);
      if (!done.length) return "–";
      return Math.round((done.reduce((m, q) => m + last[q.id].sc, 0) / done.reduce((m, q) => m + last[q.id].mx, 0)) * 100) + "%";
    };
    const tile = (big, label) => `<div class="stat-tile" style="min-width:90px"><span class="stat-big" style="font-size:1.6rem">${big}</span><span class="small muted">${IB.esc(label)}</span></div>`;
    const marked = base.filter((q) => last[q.id]).length;
    const tp = f.topic.value && IB.topic(f.topic.value);
    bar.innerHTML = base.length ? `<div class="card no-print">
      <h3 style="margin:0 0 12px">Topic drill${tp ? `: ${IB.esc(tp.code)} ${IB.esc(tp.title)}` : ""}</h3>
      <div style="display:flex;flex-wrap:wrap;gap:12px 22px">${tile(`${marked}/${base.length}`, "questions marked")}${tile(pct(base), "of available marks")}${Object.entries(groups).slice(0, 8).map(([k, list]) => tile(pct(list), k)).join("")}</div>
      <p class="small muted" style="margin:10px 0 0">Write your answer, then mark it or open the markscheme and tap your mark. Aim for about one minute per mark, and 20-25 minutes for a 10-mark essay. Set Status to "Scored under 60%" to redo weak ones.</p>
      <div class="btn-row" style="margin-top:10px"><button class="btn primary" id="drillGo">🎲 ${drillId ? "Next random question" : "Start a random drill"}</button>${drillId ? `<button class="btn" id="drillAll">Show all questions</button>` : ""}</div>
    </div>` : "";
    const go = IB.qs("#drillGo");
    if (go) go.onclick = () => {
      const pool = qs.filter((q) => q.id !== drillId);
      if (!pool.length) return IB.toast("No questions match these filters.");
      drillId = IB.pick(pool).id;
      render();
      window.scrollTo({ top: IB.qs("#drillBar").offsetTop - 80 });
    };
    const back = IB.qs("#drillAll");
    if (back) back.onclick = () => { drillId = null; render(); };
  }

  function render() {
    let qs = filtered();
    drillBar(qs);
    if (drillId) qs = qs.filter((q) => q.id === drillId);
    const pages = Math.max(1, Math.ceil(qs.length / PER_PAGE));
    page = Math.min(page, pages);
    IB.qs("#count").textContent = `${qs.length} question${qs.length === 1 ? "" : "s"}`;
    const list = IB.qs("#list");
    list.innerHTML = qs.length ? "" : `<div class="card muted">No questions match these filters.</div>`;
    qs.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach((q, i) => list.appendChild(IB.renderQuestion(q, { number: (page - 1) * PER_PAGE + i + 1, onScored: () => f.sec.value === "drill" && drillBar(filtered()) })));
    const pager = IB.qs("#pager");
    pager.innerHTML = "";
    if (pages > 1) {
      const btn = (label, p, dis) => {
        const b = IB.el(`<button class="btn small" ${dis ? "disabled" : ""}>${label}</button>`);
        b.onclick = () => { page = p; render(); window.scrollTo({ top: IB.qs("#list").offsetTop - 80 }); };
        pager.appendChild(b);
      };
      btn("← Prev", page - 1, page === 1);
      pager.appendChild(IB.el(`<span class="muted small" style="align-self:center">Page ${page} of ${pages}</span>`));
      btn("Next →", page + 1, page === pages);
    }
  }

  Object.values(f).forEach((el) => el.addEventListener(el.tagName === "INPUT" ? "input" : "change", () => {
    if (el === f.sub) fillTopics();
    page = 1;
    drillId = null;
    history.replaceState(null, "", `questionbank.html?subject=${f.sub.value}${f.topic.value ? "&topic=" + f.topic.value : ""}${f.sec.value ? "&sec=" + f.sec.value : ""}`);
    render();
  }));

  IB.qs("#genBtn").onclick = () => {
    let topics = f.topic.value ? [f.topic.value] : IB.generatorTopics(f.sub.value || undefined);
    topics = topics.filter(IB.hasGenerator);
    if (!topics.length) return IB.toast("This topic is not calculation-based - use the question bank sections instead.");
    const fresh = Array.from({ length: 5 }, () => IB.generate(IB.pick(topics)));
    extra = fresh.concat(extra);
    f.type.value = "";
    f.status.value = "";
    page = 1;
    render();
    IB.toast("Added 5 fresh questions at the top.");
  };

  if (IB.qs("#aiGenBtn")) IB.qs("#aiGenBtn").onclick = async () => {
    const t = f.topic.value ? IB.topic(f.topic.value) : null;
    if (!t) return IB.toast("Choose a topic first.");
    if (!(await IB.ai.available())) return IB.toast("AI is not switched on for this site (see README). Use the calculation generator or the bank.");
    const b = IB.qs("#aiGenBtn");
    b.disabled = true;
    b.textContent = "✦ Writing questions…";
    try {
      const out = await IB.ai.generate({ subject: t.subject, topic: `${t.code} ${t.title}`, count: 4, style: f.type.value === "mcq" ? "mcq" : f.type.value === "extended" ? "extended" : "mixed" });
      const made = out.map((g, i) => {
        const q = { id: `ai-${t.id}-${Date.now().toString(36)}-${i}`, subject: t.subject, topic: t.id, type: g.type, marks: g.marks, q: IB.esc(g.q), ms: g.ms.map(IB.esc), diff: 2, paper: "AI", generated: true };
        if (g.type === "mcq" && g.options.length === 4 && g.answer >= 0) Object.assign(q, { options: g.options.map(IB.esc), answer: g.answer });
        else if (g.type === "mcq") q.type = "short";
        IB._generated[q.id] = q;
        return q;
      });
      extra = made.concat(extra);
      page = 1;
      f.paper.value = "";
      render();
      IB.toast(`Added ${made.length} AI-written questions.`);
    } catch (e) {
      IB.toast(e.message);
    }
    b.disabled = false;
    b.textContent = "✦ AI: write new questions for this topic";
  };

  // ---------- PDF / worksheet export: any number of questions, one or many whole topics ----------
  const picked = new Set();
  const pTopicList = IB.qs("#pTopicList");
  const topicOrder = () => {
    const ord = {};
    IB.subjectList().forEach((s, si) => s.allTopics.forEach((t, ti) => (ord[t.id] = si * 1000 + ti)));
    return ord;
  };
  function drawTopicPicker() {
    const subs = f.sub.value ? [IB.subjects[f.sub.value]] : IB.subjectList();
    const counts = {};
    filtered(new Set(subs.flatMap((s) => s.topics.map((t) => t.id)))).forEach((q) => (counts[q.topic] = (counts[q.topic] || 0) + 1));
    const visible = new Set(subs.flatMap((s) => s.topics.map((t) => t.id)));
    Array.from(picked).forEach((id) => { if (!visible.has(id)) picked.delete(id); });
    pTopicList.innerHTML = subs.map((s) => `<div class="ptopics-sub"><div class="ptopics-subh"><label><input type="checkbox" data-psub="${s.id}"> ${IB.esc(s.name)}</label></div>${s.topics.map((t) => `<label class="ptopic${counts[t.id] ? "" : " none"}" title="${IB.esc(t.code)} ${IB.esc(t.title)}"><input type="checkbox" data-ptopic="${t.id}" data-psubof="${s.id}"${picked.has(t.id) ? " checked" : ""}${counts[t.id] ? "" : " disabled"}><span>${IB.esc(t.code)} ${IB.esc(t.title)}</span><em>${counts[t.id] || 0}</em></label>`).join("")}</div>`).join("");
    syncPicker();
  }
  function syncPicker() {
    pTopicList.querySelectorAll("[data-psub]").forEach((box) => {
      const kids = Array.from(pTopicList.querySelectorAll(`[data-psubof="${box.dataset.psub}"]:not(:disabled)`));
      const on = kids.filter((k) => k.checked).length;
      box.checked = !!kids.length && on === kids.length;
      box.indeterminate = on > 0 && on < kids.length;
    });
    const qs = exportPool();
    const n = IB.qs("#pN").value === "all" ? qs.length : Math.min(qs.length, +IB.qs("#pN").value);
    IB.qs("#pTopicSum").textContent = picked.size ? `${picked.size} ticked · ${qs.length} questions` : `none ticked · using the filters above (${qs.length} questions)`;
    IB.qs("#pCount").textContent = `${n} question${n === 1 ? "" : "s"} · ${qs.slice(0, n).reduce((m, q) => m + (q.marks || 0), 0)} marks`;
  }
  // questions the export draws from: ticked topics (other filters still apply), or the filtered list
  const exportPool = () => filtered(picked.size ? picked : null);
  function exportQuestions() {
    let qs = exportPool();
    const order = IB.qs("#pOrder").value, exam = IB.qs("#pExam").checked;
    if (order === "topic") {
      const ord = topicOrder();
      qs = qs.slice().sort((a, b) => (ord[a.topic] ?? 1e9) - (ord[b.topic] ?? 1e9));
    }
    if (exam) qs = qs.filter((q) => !q.derived).concat(qs.filter((q) => q.derived));
    if (order === "mix") {
      const head = qs.filter((q) => !q.derived), tail = qs.filter((q) => q.derived);
      qs = exam ? IB.shuffle(head).concat(IB.shuffle(tail)) : IB.shuffle(qs);
    }
    const n = IB.qs("#pN").value;
    return n === "all" ? qs : qs.slice(0, +n);
  }
  function exportTitle(sub) {
    const ts = picked.size ? Array.from(picked).map(IB.topic).filter(Boolean) : f.topic.value ? [IB.topic(f.topic.value)] : [];
    const ord = topicOrder();
    ts.sort((a, b) => ord[a.id] - ord[b.id]);
    if (ts.length === 1) return `${ts[0].code} ${ts[0].title}`;
    if (ts.length > 1) return ts.length <= 4 ? `Topics ${ts.map((t) => t.code).join(", ")}` : `Topics ${ts.slice(0, 3).map((t) => t.code).join(", ")} + ${ts.length - 3} more`;
    return f.paper.value ? IB.paperName(sub, f.paper.value) : "Practice paper";
  }

  pTopicList.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.ptopic) t.checked ? picked.add(t.dataset.ptopic) : picked.delete(t.dataset.ptopic);
    if (t.dataset.psub) pTopicList.querySelectorAll(`[data-psubof="${t.dataset.psub}"]:not(:disabled)`).forEach((k) => { k.checked = t.checked; t.checked ? picked.add(k.dataset.ptopic) : picked.delete(k.dataset.ptopic); });
    if (picked.size) IB.qs("#pN").value = "all"; // ticking a topic means "give me the whole topic"
    IB.qs("#pTopics").checked = picked.size > 1;
    syncPicker();
  });
  IB.qs("#pAll").onclick = () => { pTopicList.querySelectorAll("[data-ptopic]:not(:disabled)").forEach((k) => { k.checked = true; picked.add(k.dataset.ptopic); }); IB.qs("#pN").value = "all"; IB.qs("#pTopics").checked = picked.size > 1; syncPicker(); };
  IB.qs("#pNone").onclick = () => { picked.clear(); pTopicList.querySelectorAll("[data-ptopic]").forEach((k) => (k.checked = false)); IB.qs("#pN").value = "20"; IB.qs("#pTopics").checked = false; syncPicker(); };
  IB.qs("#pN").onchange = syncPicker;
  Object.values(f).forEach((el) => el.addEventListener(el.tagName === "INPUT" ? "input" : "change", () => { if (!IB.qs("#paperOpts").classList.contains("hidden")) el === f.sub ? drawTopicPicker() : syncPicker(); }));

  IB.qs("#paperBtn").onclick = () => {
    const box = IB.qs("#paperOpts");
    box.classList.toggle("hidden");
    if (box.classList.contains("hidden")) return;
    if (f.topic.value && !picked.size) { picked.add(f.topic.value); IB.qs("#pN").value = "all"; }
    drawTopicPicker();
  };
  IB.qs("#pGo").onclick = (ev) => {
    const qs = exportQuestions();
    if (!qs.length) return IB.toast("No questions match - tick a topic or loosen the filters.");
    if (qs.length > 400 && !confirm(`This paper has ${qs.length} questions, so the PDF will be long and can take a few minutes to build. Continue?`)) return;
    const sub = f.sub.value || (new Set(qs.map((q) => q.subject)).size === 1 ? qs[0].subject : null);
    const b = ev.currentTarget;
    b.disabled = true;
    IB.paperPdf({
      title: IB.qs("#pTitle").value.trim() || exportTitle(sub),
      subject: sub, questions: qs, markscheme: IB.qs("#pMs").checked, showTopics: IB.qs("#pTopics").checked, paper: f.paper.value,
    }).catch(() => {}).finally(() => (b.disabled = false));
  };
  IB.qs("#sheetBtn").onclick = () => {
    const open = !IB.qs("#paperOpts").classList.contains("hidden");
    const qs = open ? exportQuestions() : filtered();
    if (!qs.length) return IB.toast("Nothing to download.");
    const sub = f.sub.value || (new Set(qs.map((q) => q.subject)).size === 1 ? qs[0].subject : null);
    const title = open ? IB.qs("#pTitle").value.trim() || exportTitle(sub) : f.topic.value ? IB.topic(f.topic.value).title : f.sub.value ? IB.subjects[f.sub.value].name : "Mixed";
    IB.download(`IB-worksheet-${title.replace(/[^\w]+/g, "-")}.html`, IB.standaloneDoc(`${title} worksheet`, `<h1>${IB.esc(title)} - practice worksheet</h1><p class="meta">${qs.length} questions · total ${qs.reduce((n, q) => n + q.marks, 0)} marks</p>` + IB.worksheetHtml(qs, "Questions")));
  };

  render();
};
