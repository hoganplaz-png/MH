/* Claude IA & EE Coach: examiner-style grading of a draft against the criteria, a supervisor chat that
   knows the draft (coaches, never ghostwrites), and a history of graded drafts. */
IB.page = async function () {
  IB.config.ai = true; // this page is built around Claude; available() still checks the server / claude.ai
  const app = IB.qs("#app");
  const st = () => IB.store.get().coach || {};
  const upd = (fn) => IB.store.update((d) => { d.coach = d.coach || {}; fn(d.coach); });
  const saved = st();
  let kind = saved.kind || "ia";
  let sid = saved.sid && IB.ia[saved.sid] ? saved.sid : "econ";
  let tab = IB.param("tab") || "grade";
  const messages = [];
  const ai = await IB.ai.available();

  const iaSubjects = Object.keys(IB.ia).filter((k) => IB.subjects[k]);
  const eeSubjects = IB.subjectList().map((s) => [s.id, s.name]).concat([["history", "History"], ["tok", "World Studies / interdisciplinary"], ["other", "Other subject"]]);
  const spec = () => (kind === "ee" ? IB.ee : IB.ia[sid]);
  const crit = () => spec().criteria.concat(spec().extra ? [spec().extra] : []);
  const maxTotal = () => crit().reduce((n, c) => n + c.max, 0);
  const subjName = () => (kind === "ee" ? (eeSubjects.find(([k]) => k === sid) || [, "IB"])[1] : IB.subjects[sid].name);
  const draftKey = () => `${kind}:${sid}`;
  const words = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

  app.innerHTML = `<h1 style="margin-bottom:.2em">Claude IA &amp; EE Coach</h1>
    <p class="muted" style="margin-top:0">Upload or paste your Internal Assessment or Extended Essay draft. Claude marks it against every criterion like an IB moderator, shows the evidence it used, and then coaches you as a supervisor. It never writes your coursework for you, so your work stays your own.</p>
    ${ai ? "" : IB.hosted
      ? `<div class="notice warn small"><strong>Claude isn't connected in this view.</strong> Open the site from its claude.ai link while signed in, and allow AI if the page asks.</div>`
      : `<div class="notice warn small"><strong>Claude is offline on this copy of the site.</strong> Start the server with an Anthropic API key (<code>ANTHROPIC_API_KEY=… npm start</code>) to switch on grading and the supervisor chat. Meanwhile, use the self-assessment on the <a href="ia.html">IA &amp; EE page</a>.</div>`}
    <div class="card">
      <div class="filters">
        <label class="field">Coursework<select id="cKind"><option value="ia">Internal assessment</option><option value="ee">Extended Essay</option></select></label>
        <label class="field">Subject<select id="cSub"></select></label>
        <label class="field" style="flex:2">Title / research question<input id="cRq" type="text" placeholder="e.g. To what extent did…"></label>
      </div>
      <p class="small muted" id="cSpec" style="margin-bottom:0"></p>
    </div>
    <div class="card">
      <div class="btn-row"><input type="file" id="cFile" accept=".pdf,.txt,.md,application/pdf,text/plain" aria-label="Upload draft"><span class="small muted" id="cStatus"></span></div>
      <textarea id="cDraft" rows="12" placeholder="Paste your draft here…" style="margin-top:8px"></textarea>
      <p class="small muted" id="cWords" style="margin:6px 0 0"></p>
    </div>
    <div class="tabs" id="cTabs"><button data-t="grade">✦ Grade my draft</button><button data-t="chat">Supervisor chat</button><button data-t="history">Draft history</button></div>
    <div id="cBody"></div>`;

  const kindSel = IB.qs("#cKind"), subSel = IB.qs("#cSub"), rq = IB.qs("#cRq"), draft = IB.qs("#cDraft"), body = IB.qs("#cBody");

  function fillSubjects() {
    const list = kind === "ee" ? eeSubjects : iaSubjects.map((k) => [k, IB.subjects[k].name]);
    subSel.innerHTML = list.map(([k, n]) => `<option value="${k}">${IB.esc(n)}</option>`).join("");
    if (!list.some(([k]) => k === sid)) sid = list[0][0];
    subSel.value = sid;
    const s = spec();
    IB.qs("#cSpec").textContent = `${s.title} · ${maxTotal()} marks · ${s.length}. ${s.note || ""}`;
    const d = (st().drafts || {})[draftKey()] || {};
    draft.value = d.text || "";
    rq.value = d.rq || "";
    countWords();
  }
  function countWords() {
    const n = words(draft.value);
    const limit = Number((spec().length.match(/Max ([\d,]+) words/) || [])[1]?.replace(",", "")) || 0;
    IB.qs("#cWords").innerHTML = `${n.toLocaleString()} words${limit ? ` · limit ${limit.toLocaleString()}${n > limit ? ` <strong style="color:var(--bad, #c92a2a)">- over the limit; examiners stop reading at the limit</strong>` : ""}` : ""}`;
  }
  let saveT;
  const persist = () => {
    clearTimeout(saveT);
    saveT = setTimeout(() => upd((c) => { c.kind = kind; c.sid = sid; c.drafts = c.drafts || {}; c.drafts[draftKey()] = { text: draft.value.slice(0, 80000), rq: rq.value.slice(0, 500) }; }), 400);
  };
  kindSel.value = kind;
  kindSel.onchange = () => { kind = kindSel.value; fillSubjects(); persist(); render(); };
  subSel.onchange = () => { sid = subSel.value; fillSubjects(); persist(); render(); };
  draft.oninput = () => { countWords(); persist(); };
  rq.oninput = persist;
  fillSubjects();

  IB.qs("#cFile").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const status = IB.qs("#cStatus");
    status.textContent = "Reading file…";
    try {
      if (/\.pdf$/i.test(f.name)) {
        if (!window.pdfjsLib) throw new Error("PDF reader unavailable - paste the text instead.");
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdfjs/pdf.worker.min.js";
        const pdf = await window.pdfjsLib.getDocument({ data: await f.arrayBuffer() }).promise;
        let t = "";
        for (let p = 1; p <= pdf.numPages; p++) t += (await (await pdf.getPage(p)).getTextContent()).items.map((i) => i.str).join(" ") + "\n\n";
        draft.value = t.trim();
      } else draft.value = await f.text();
      status.textContent = `Loaded ${f.name}.`;
      countWords();
      persist();
    } catch (err) {
      status.textContent = "";
      IB.toast(err.message);
    }
  };

  IB.qsa("#cTabs button").forEach((b) => (b.onclick = () => { tab = b.dataset.t; render(); }));

  const ring = (val, max, label) => {
    const p = max ? val / max : 0, C = 2 * Math.PI * 52;
    return `<div class="ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="ring-bg"/><circle cx="60" cy="60" r="52" class="ring-fg" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - p)}"/></svg><div class="ring-txt"><strong>${val}</strong><span>/ ${max}</span><em>${IB.esc(label || "")}</em></div></div>`;
  };
  const gradeLabel = (total, max) => {
    if (kind === "ee") {
      const g = IB.ee.grades.find(([, lo, hi]) => total >= lo && total <= hi);
      return "EE grade " + (g ? g[0] : "-");
    }
    return `${Math.round((100 * total) / max)}% of IA marks`;
  };

  // ---------- grading ----------
  function gradeView() {
    body.innerHTML = `<div class="card"><p class="small muted" style="margin-top:0">Claude reads the whole draft, decides the best-fit level for each criterion, quotes the evidence, and lists the changes that would raise your mark most. It's a prediction for feedback - your teacher's and the IB's marks can differ.</p>
      <div class="btn-row"><button class="btn primary" id="gBtn">✦ Grade my draft</button><span class="small muted" id="gStat"></span></div></div><div id="gOut"></div>`;
    const last = (st().history || []).find((h) => h.key === draftKey() && h.full);
    if (last) showReport(last.full, true);
    IB.qs("#gBtn").onclick = grade;
  }

  async function grade() {
    const text = draft.value.trim();
    if (words(text) < 150) return IB.toast("Paste or upload at least a few pages of your draft first.");
    if (!(await IB.ai.available())) return IB.toast("Claude isn't connected here - see the note at the top of the page.");
    const btn = IB.qs("#gBtn"), stat = IB.qs("#gStat");
    btn.disabled = true;
    stat.textContent = "Claude is marking every criterion… (about a minute)";
    const rubric = crit().map((c) => `${c.k} (max ${c.max}):\n` + c.levels.map((l) => `  ${l[0]}: ${l[1]}`).join("\n")).join("\n\n");
    const prompt = `You are a senior IB ${kind === "ee" ? "Extended Essay examiner" : "internal assessment moderator"} for ${subjName()}. Mark the student's draft against these criteria (level descriptors paraphrased from the IB guide):

${rubric}

${spec().note || ""}
Stated title / research question: ${rq.value.trim() || "(not given - judge from the draft)"}
Word count: ${words(text)} (${spec().length})

Rules:
- Use best-fit marking: pick the level that best matches the whole draft, then the mark within it. Be realistic; most drafts are not top band.
- For each criterion quote 1-3 short phrases from the draft as evidence (exact words, under 25 words each).
- Feedback must coach, not rewrite: describe what to change and why, but do not write replacement paragraphs for the student.
- Flag academic-integrity risks you notice (missing citations, unreferenced data or figures, over the word limit) in "integrity".

<draft>
${text.slice(0, 60000)}
</draft>

Reply with only a JSON object:
{"criteria":[{"k":"<criterion name exactly as given>","mark":<integer>,"evidence":["..."],"why":"1-2 sentences","improve":"the single most valuable change"}],
 "strengths":["..."],"priorities":["top 3 actions, highest mark gain first"],"integrity":["..."],"rq_feedback":"one or two sentences on the research question","summary":"2-3 sentences"}`;
    try {
      const r = await IB.ai.json(prompt);
      const out = { criteria: [], strengths: r.strengths || [], priorities: r.priorities || [], integrity: r.integrity || [], rq: r.rq_feedback || "", summary: r.summary || "" };
      crit().forEach((c) => {
        const m = (r.criteria || []).find((x) => x.k === c.k) || (r.criteria || []).find((x) => String(x.k).startsWith(c.k.split(":")[0]));
        out.criteria.push({ k: c.k, max: c.max, mark: m ? Math.max(0, Math.min(c.max, Math.round(Number(m.mark) || 0))) : 0, evidence: (m && m.evidence) || [], why: (m && m.why) || "Not assessed.", improve: (m && m.improve) || "" });
      });
      out.total = out.criteria.reduce((n, c) => n + c.mark, 0);
      out.max = maxTotal();
      upd((c) => {
        c.history = c.history || [];
        c.history.unshift({ key: draftKey(), kind, sid, subject: subjName(), rq: rq.value.slice(0, 200), words: words(text), total: out.total, max: out.max, at: Date.now(), full: out });
        c.history = c.history.slice(0, 30);
      });
      stat.textContent = "";
      showReport(out, false);
    } catch (e) {
      stat.textContent = "";
      IB.toast(e.message);
    }
    btn.disabled = false;
    btn.textContent = "✦ Grade again";
  }

  function showReport(r, isOld) {
    const prev = (st().history || []).filter((h) => h.key === draftKey())[1];
    const delta = prev && !isOld ? r.total - prev.total : null;
    IB.qs("#gOut").innerHTML = `<section class="card">
      <div class="ia-hero" style="--c:var(--primary)"><div><span class="eyebrow">${isOld ? "Last grading" : "Claude's prediction"} · ${IB.esc(subjName())}</span>
        <h2>${r.total} / ${r.max}${delta !== null ? ` <span class="small muted">(${delta >= 0 ? "+" : ""}${delta} since last draft)</span>` : ""}</h2><p>${IB.esc(r.summary)}</p>
        ${r.rq ? `<p class="small"><strong>Research question:</strong> ${IB.esc(r.rq)}</p>` : ""}</div>${ring(r.total, r.max, gradeLabel(r.total, r.max))}</div>
      ${r.criteria.map((c) => `<div class="card" style="margin:12px 0 0">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline"><h4 style="margin:0">${IB.esc(c.k)}</h4><span class="mono">${c.mark} / ${c.max}</span></div>
        <div class="bar" style="height:8px;border-radius:4px;background:var(--surface-2);margin:8px 0"><div style="height:100%;width:${(100 * c.mark) / c.max}%;border-radius:4px;background:var(--primary)"></div></div>
        <p class="small" style="margin:6px 0">${IB.esc(c.why)}</p>
        ${c.evidence.length ? `<p class="small muted" style="margin:6px 0">Evidence: ${c.evidence.map((q) => `“${IB.esc(q)}”`).join(" · ")}</p>` : ""}
        ${c.improve ? `<p class="small" style="margin:6px 0"><strong>To gain marks:</strong> ${IB.esc(c.improve)}</p>` : ""}</div>`).join("")}
      ${r.priorities.length ? `<h4>Do these next</h4><ol class="small">${r.priorities.map((x) => `<li>${IB.esc(x)}</li>`).join("")}</ol>` : ""}
      ${r.strengths.length ? `<h4>Strengths</h4><ul class="small">${r.strengths.map((x) => `<li>${IB.esc(x)}</li>`).join("")}</ul>` : ""}
      ${r.integrity.length ? `<div class="notice warn small"><strong>Academic integrity checks</strong><ul>${r.integrity.map((x) => `<li>${IB.esc(x)}</li>`).join("")}</ul></div>` : ""}
      <div class="btn-row"><button class="btn small" id="gAsk">Discuss this feedback with Claude</button></div></section>`;
    IB.qs("#gAsk").onclick = () => {
      tab = "chat";
      render();
      IB.qs("#msg").value = `You predicted ${r.total}/${r.max}. My weakest criterion seems to be ${r.criteria.slice().sort((a, b) => a.mark / a.max - b.mark / b.max)[0].k}. What should I work on first, and how?`;
    };
  }

  // ---------- supervisor chat ----------
  function chatView() {
    body.innerHTML = `<div class="card">
      <p class="small muted" style="margin-top:0">Claude acts as your supervisor: it has read the draft above and helps you think, plan and improve, without writing your ${kind === "ee" ? "essay" : "IA"} for you.</p>
      <div class="chat" id="chat" aria-live="polite"></div>
      <div class="suggestions" id="sugg"></div>
      <div class="chat-input"><textarea id="msg" placeholder="Ask your supervisor…  (Enter to send, Shift+Enter for a new line)"></textarea><button class="btn primary" id="send">Send</button></div>
      <div class="btn-row" style="margin-top:8px"><button class="btn small" id="clear">New conversation</button></div></div>`;
    const chat = IB.qs("#chat"), input = IB.qs("#msg");
    const bubble = (role, html) => {
      const el = IB.el(`<div class="msg ${role}"></div>`);
      if (role === "user") el.textContent = html;
      else el.innerHTML = html;
      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
      return el;
    };
    if (!messages.length) bubble("assistant", IB.md(`Hi! I'm your ${kind === "ee" ? "Extended Essay" : subjName() + " IA"} supervisor. ${words(draft.value) > 50 ? "I've read your draft." : "Paste your draft above and I'll read it - or we can start from your topic idea."} What would you like to work on?`));
    messages.forEach((m) => bubble(m.role, m.role === "user" ? m.content : IB.md(m.content)));
    IB.math(chat);
    const sugg = kind === "ee"
      ? ["Is my research question focused enough?", "How can I make my argument more critical (criterion C)?", "Help me plan my RPPF reflection", "Check my structure and referencing"]
      : ["Is my research question focused enough?", "Which criterion is my weakest and why?", "How do I evaluate my method properly?", "What should my conclusion include?"];
    IB.qs("#sugg").innerHTML = sugg.map((x) => `<button class="btn small">${IB.esc(x)}</button>`).join("");
    IB.qsa("#sugg button").forEach((b) => (b.onclick = () => { input.value = b.textContent; send(); }));
    let busy = false;
    async function send() {
      const text = input.value.trim();
      if (!text || busy) return;
      if (!(await IB.ai.available())) return IB.toast("Claude isn't connected here - see the note at the top of the page.");
      busy = true;
      input.value = "";
      messages.push({ role: "user", content: text });
      bubble("user", text);
      const out = bubble("assistant", `<span class="muted">Thinking…</span>`);
      let acc = "";
      try {
        const rubric = crit().map((c) => `${c.k} (max ${c.max}): top level - ${c.levels[c.levels.length - 1][1]}`).join("\n");
        const context = `Coursework: ${kind === "ee" ? "Extended Essay" : "Internal assessment"} in ${subjName()}\nTitle / RQ: ${rq.value.trim() || "(not given)"}\nWord count: ${words(draft.value)} (${spec().length})\nCriteria:\n${rubric}\n\nDraft:\n${draft.value.trim().slice(0, 50000) || "(no draft yet)"}`;
        await IB.ai.tutor({ mode: "iaee", context, messages }, (d) => {
          acc += d;
          out.innerHTML = IB.md(acc);
          chat.scrollTop = chat.scrollHeight;
        });
        messages.push({ role: "assistant", content: acc });
        IB.math(out);
      } catch (e) {
        out.innerHTML = `<span class="muted">${IB.esc(e.message)}</span>`;
        messages.pop();
      }
      busy = false;
    }
    IB.qs("#send").onclick = send;
    input.onkeydown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };
    IB.qs("#clear").onclick = () => { messages.length = 0; chatView(); };
  }

  // ---------- history ----------
  function historyView() {
    const h = st().history || [];
    body.innerHTML = `<div class="card">${h.length
      ? `<p class="small muted" style="margin-top:0">Every graded draft is saved here (marks only, not the text), so you can see your progress between drafts.</p>
        <div class="table-wrap"><table class="compare small"><tr><th>Date</th><th>Coursework</th><th>Title / RQ</th><th>Words</th><th>Mark</th><th></th></tr>
        ${h.map((x, i) => `<tr><td>${new Date(x.at).toLocaleDateString()}</td><td>${x.kind === "ee" ? "EE" : "IA"} · ${IB.esc(x.subject)}</td><td>${IB.esc(x.rq || "-")}</td><td class="mono">${x.words}</td><td class="mono">${x.total}/${x.max}</td><td><button class="btn small" data-i="${i}">View</button></td></tr>`).join("")}</table></div>
        <div class="btn-row" style="margin-top:10px"><button class="btn small" id="hClear">Clear history</button></div>`
      : `<p class="muted" style="margin:0">No graded drafts yet. Grade a draft and it will appear here.</p>`}</div><div id="gOut"></div>`;
    IB.qsa("button[data-i]", body).forEach((b) => (b.onclick = () => {
      const x = h[+b.dataset.i];
      kind = x.kind; sid = x.sid; kindSel.value = kind; fillSubjects();
      tab = "grade"; render(); showReport(x.full, true);
    }));
    const clr = IB.qs("#hClear");
    if (clr) clr.onclick = () => { if (confirm("Delete all saved gradings?")) { upd((c) => { c.history = []; }); historyView(); } };
  }

  function render() {
    IB.qsa("#cTabs button").forEach((b) => b.classList.toggle("active", b.dataset.t === tab));
    if (tab === "chat") chatView();
    else if (tab === "history") historyView();
    else gradeView();
  }
  render();
};
