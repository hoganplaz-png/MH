/* Markscheme frames: for every recurring question type in a topic, what the examiner must see (M1, M2 ...),
   a model answer, what is accepted / not accepted and a 廣東話 tip - plus MC speed skills per topic and, per
   subject, universal frameworks, mark-losing phrases and an exam-day checklist.
   Data files call IB.addExamFrames(subjectId, { universal, phrases, checklist, topics: { topicId: { frames, mc, concepts } } }).
   Each frame's exam question (f.q) and each MC skill's question (m.q) also join the question bank, marked by the
   built-in marker against the frame's marking points. */
(function () {
  "use strict";
  const IB = window.IB;
  IB.examFrames = IB.examFrames || {};

  // "__keyword__" marks an essential keyword (underlined in the markscheme: no keyword, no mark).
  const kw = (s) => String(s ?? "").replace(/__(.+?)__/g, '<u class="kw">$1</u>');
  const plain = (s) => String(s ?? "").replace(/__(.+?)__/g, "$1");
  IB.kw = kw;

  // A marking row is "text", [label, text] or [label, text, marks].
  const rows = (f) => (f.marks || []).map((r, i) => (Array.isArray(r) ? { l: r[0], t: r[1], m: r[2] || 1 } : { l: `M${i + 1}`, t: r, m: 1 }));
  IB.frameRows = rows;
  const total = (f) => f.total || rows(f).reduce((n, r) => n + r.m, 0);

  IB.addExamFrames = function (subjectId, data) {
    const s = IB.subjects[subjectId];
    if (!s) return;
    const E = (IB.examFrames[subjectId] = IB.examFrames[subjectId] || { universal: [], phrases: [], checklist: [] });
    if (data.universal) E.universal.push(...data.universal);
    if (data.phrases) E.phrases.push(...data.phrases);
    if (data.checklist) E.checklist.push(...data.checklist);
    Object.entries(data.topics || {}).forEach(([id, add]) => {
      const t = s.allTopics.find((x) => x.id === id);
      if (!t) return console.warn(`examframes: unknown topic ${id}`);
      t.mframes = (t.mframes || []).concat(add.frames || []);
      t.mc = (t.mc || []).concat(add.mc || []);
      if (add.concepts) t.concepts = t.concepts.concat(add.concepts);
      if (add.terms) t.terms = (t.terms || []).concat(add.terms);
      if (add.diagrams) t.diagrams = (t.diagrams || []).concat(add.diagrams);
      if (add.figures) t.figures = (t.figures || []).concat(add.figures);
      const qs = [];
      (add.frames || []).forEach((f) => {
        if (!f.q || f.bank === false) return;
        const r = rows(f);
        const q = {
          sec: "frames", fromFrame: true, paper: f.paper, diff: f.diff || 2,
          type: f.type || (total(f) >= 8 ? "extended" : "short"),
          marks: total(f), q: f.q,
          ms: r.map((x) => `${plain(x.t)} [${x.m > 1 ? x.m : x.l}]`).concat(f.msExtra || []),
        };
        if (f.numeric) q.numeric = f.numeric;
        if (f.hl) q.hl = true;
        qs.push(q);
      });
      (add.mc || []).forEach((m) => {
        if (!m.q) return;
        qs.push({ sec: "frames", fromFrame: true, paper: m.paper || s.mcPaper || Object.keys(s.allPapers)[0], diff: m.diff || 2, marks: 1, q: m.q, options: m.options, answer: m.answer, ms: [`${"ABCD"[m.answer]} - ${m.why || ""}`.trim()], hl: m.hl });
      });
      if (qs.length) IB.addQuestions(subjectId, { [id]: qs });
    });
  };

  // ---------- rendering (shared by the notes page, HTML downloads and the PDF booklet) ----------
  const ZH = (sid) => sid === "chia";
  IB.frameCardHtml = function (f, n, opts = {}) {
    const r = rows(f);
    const pin = [f.where || [f.paper, `${total(f)} mark${total(f) > 1 ? "s" : ""}`].filter(Boolean).join(" · ")].filter(Boolean).join("");
    const acc = f.accept ? `<div class="mf-acc"><b>✔ Accept 接受</b>${kw(f.accept)}</div>` : "";
    const rej = f.reject ? `<div class="mf-rej"><b>✘ Do not accept 唔接受</b>${kw(f.reject)}</div>` : "";
    const q = f.q && opts.showQ !== false ? `<div class="mf-q"><b>Exam-style question</b> ${f.q} <span class="mf-m">[${total(f)}]</span></div>` : "";
    return `<article class="mframe${f.hl ? " is-ahl" : ""}">
      <header class="mf-head"><div class="mf-title"><span class="mf-n">F${n}</span> ${f.title}${f.hl ? ' <span class="ahl-badge">AHL</span>' : ""}${f.star ? ' <span class="mf-star" title="Asked very often">★★★</span>' : ""}</div>${pin ? `<div class="mf-where">📍 ${pin}</div>` : ""}</header>
      <div class="mf-body">${q}
        <table class="mf-table"><thead><tr><th>Mark</th><th>${ZH(opts.sid) ? "考官要見到 What the examiner must see" : "What the examiner must see 考官要見到"}</th></tr></thead>
        <tbody>${r.map((x) => `<tr><th scope="row"><span class="mf-lab">${x.l}</span>${x.m > 1 ? `<small>${x.m} marks</small>` : ""}</th><td>${kw(x.t)}</td></tr>`).join("")}</tbody></table>
        ${f.diagram && IB.plot ? `<div class="mf-diagram"><b>Expected sketch</b>${IB.plot(f.diagram)}</div>` : ""}
        ${f.svg ? `<div class="mf-diagram"><b>Expected diagram</b>${IB.figureHtml({ svg: f.svg, caption: f.svgCaption })}</div>` : ""}
        ${f.model ? `<div class="mf-model"><b>📝 Model answer 標準答案</b><div>${kw(f.model)}</div></div>` : ""}
        ${acc || rej ? `<div class="mf-ar${acc && rej ? "" : " one"}">${acc}${rej}</div>` : ""}
        ${f.tip ? `<p class="mf-tip" lang="zh-HK">💡 ${f.tip}</p>` : ""}
      </div></article>`;
  };
  // Hand-drawn SVG figures (orbital boxes, spectra, structures, cells, circuits...). SVGs use currentColor and
  // the --fig-* colours so they work in light and dark mode and in the PDF.
  IB.figureHtml = function (x) {
    return `<figure class="fig">${x.svg}${x.caption || x.title ? `<figcaption>${x.title ? `<strong>${x.title}</strong>${x.caption ? " · " : ""}` : ""}${x.caption || ""}</figcaption>` : ""}</figure>`;
  };
  IB.mcSkillsHtml = function (t) {
    return `<ol class="mc-skills">${t.mc.map((m) => `<li>${m.skill}${m.q ? `<details class="mc-eg"><summary>Try it</summary><div>${m.q}<ol type="A">${m.options.map((o) => `<li>${o}</li>`).join("")}</ol><p><b>Answer ${"ABCD"[m.answer]}.</b> ${m.why || ""}</p></div></details>` : ""}</li>`).join("")}</ol>`;
  };

  const LEGEND = `<p class="small muted mf-legend">Each row = one marking point the examiner ticks (一行 = 一分). <u class="kw">Underlined</u> words are essential: no keyword, no mark. Accept / Do not accept show what markschemes typically allow or reject. Frames are written in the style of IB markschemes from recurring question patterns; they are not copies of official markschemes.</p>`;
  IB.examFrameSections = function (t) {
    const out = [];
    const fr = (t.mframes || []).filter((f) => IB.showItem(t.subject, f));
    if (fr.length) out.push(["mframes", "Markscheme frames", `<section class="card mframes-sec" id="sec-mframes" data-reveal><h3 class="section-title">答題框架 & markschemes · ${fr.length} question types</h3>${LEGEND}<div class="mframes">${fr.map((f, i) => IB.frameCardHtml(f, i + 1, { sid: t.subject })).join("")}</div></section>`]);
    const mc = (t.mc || []).filter((m) => IB.showItem(t.subject, m));
    if (mc.length) out.push(["mc", "MC speed skills", `<section class="callout method mc-sec" id="sec-mc" data-reveal><h3 class="callout-title">MC speed skills · 選擇題快速技巧</h3>${IB.mcSkillsHtml({ mc })}</section>`]);
    return out;
  };

  // Subject overview: universal frameworks, mark-losing phrases and the exam-day checklist.
  IB.examFrameOverviewHtml = function (sid) {
    const E = IB.examFrames[sid];
    if (!E) return "";
    let h = "";
    if (E.universal.length) h += `<h2>Universal answer frameworks · 萬用答題框架</h2>${E.universal.map((u) => `<section class="card mf-universal" data-reveal><h3 class="section-title">${u.title}</h3>${u.html}</section>`).join("")}`;
    if (E.phrases.length) h += `<h2>Mark-losing phrases → full-mark fixes · 失分句子 vs 滿分寫法</h2><div class="card" data-reveal><div class="table-wrap"><table class="compare mf-phrases"><tr><th>❌ Loses marks</th><th>✅ Full-mark version</th></tr>${E.phrases.map(([a, b]) => `<tr><td>${a}</td><td>${kw(b)}</td></tr>`).join("")}</table></div></div>`;
    if (E.checklist.length) h += `<section class="callout terms" data-reveal><h3 class="callout-title">Exam-day checklist · 考試當日清單</h3><ul class="mf-check">${E.checklist.map((c) => `<li>✅ ${c}</li>`).join("")}</ul></section>`;
    return h;
  };
})();
