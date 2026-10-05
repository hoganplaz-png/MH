/* IB Revision Hub - shared core: subject registry, storage, rendering, marking, AI client. */
(function () {
  "use strict";

  const IB = (window.IB = window.IB || {});
  IB.subjects = IB.subjects || {};
  IB.order = ["econ", "chem", "geo", "math"];

  IB.register = function (subject) {
    subject.topics.forEach((t) => {
      t.subject = subject.id;
      (t.questions || []).forEach((q, i) => {
        q.id = q.id || `${t.id}-q${i + 1}`;
        q.subject = subject.id;
        q.topic = t.id;
        q.type = q.type || (q.options ? "mcq" : "short");
        q.diff = q.diff || 2;
      });
    });
    IB.subjects[subject.id] = subject;
  };

  IB.subjectList = () => IB.order.map((id) => IB.subjects[id]).filter(Boolean);
  IB.topic = (topicId) => {
    for (const s of IB.subjectList()) {
      const t = s.topics.find((x) => x.id === topicId);
      if (t) return t;
    }
    return null;
  };
  IB.allQuestions = (subjectId) => {
    const subs = subjectId ? [IB.subjects[subjectId]] : IB.subjectList();
    const site = subs.filter(Boolean).flatMap((s) => s.topics.flatMap((t) => t.questions || []));
    const mine = IB.myQuestions().filter((q) => !subjectId || q.subject === subjectId);
    return site.concat(mine);
  };
  IB.topicQuestions = (topicId) => IB.allQuestions(topicId.split("-")[0]).filter((q) => q.topic === topicId);

  // ---------- "My past papers": questions the student imports from their own copies ----------
  // Stored privately in this browser inside the progress store (so backups include them).
  // Text is kept raw and escaped when converted, because it is user-supplied.
  let myCache = null;
  IB.paperOptions = {
    econ: [["P1", "Paper 1"], ["P2", "Paper 2"]],
    chem: [["P1A", "Paper 1A (MCQ)"], ["P1B", "Paper 1B"], ["P2", "Paper 2"]],
    geo: [["P1", "Paper 1"], ["P2", "Paper 2"]],
    math: [["P1", "Paper 1"], ["P2", "Paper 2"]],
  };
  IB.paperName = (subjectId, code) => ((IB.paperOptions[subjectId] || []).find(([c]) => c === code) || [code, code])[1];
  IB.mySource = (r) => [r.session, IB.paperName(r.subject, r.paper), r.qnum ? "Q" + r.qnum : ""].filter(Boolean).join(" · ");
  IB.myQuestions = function () {
    if (myCache) return myCache;
    const html = (s) => IB.esc(s).replace(/\n/g, "<br>");
    myCache = (IB.store.get().custom || [])
      .filter((r) => IB.subjects[r.subject] && IB.topic(r.topic))
      .map((r) => {
        const q = {
          id: r.id, subject: r.subject, topic: r.topic, paper: r.paper || "", marks: Math.max(1, r.marks | 0), diff: r.diff || 2,
          type: r.type === "mcq" && r.options && r.options.length >= 2 ? "mcq" : r.type === "extended" ? "extended" : "short",
          q: html(r.q), ms: (r.ms && r.ms.length ? r.ms : ["(No markscheme added yet - add it in My past papers.)"]).map(IB.esc),
          custom: true, source: IB.mySource(r), paperKey: r.subject + "|" + (r.session || "") + "|" + (r.paper || ""),
        };
        if (q.type === "mcq") Object.assign(q, { options: r.options.map(IB.esc), answer: r.answer >= 0 ? r.answer : 0, marks: 1 });
        if (r.numeric !== undefined && r.numeric !== null && r.numeric !== "" && isFinite(r.numeric)) q.numeric = { value: Number(r.numeric), tol: Math.max(Math.abs(Number(r.numeric)) * 0.01, 0.001) };
        return q;
      });
    return myCache;
  };
  IB.saveMy = function (fn) {
    IB.store.update((d) => {
      d.custom = d.custom || [];
      fn(d.custom);
    });
    myCache = null;
  };

  // Suggest the best-matching topic for a piece of question text (keyword overlap with the notes).
  IB.suggestTopic = function (subjectId, text) {
    const s = IB.subjects[subjectId];
    if (!s) return { topic: null, score: 0 };
    const tok = (x) => String(x).toLowerCase().replace(/<[^>]+>/g, " ").split(/[^a-z0-9₀-₉⁺⁻]+/).filter((w) => w.length > 3);
    const words = new Set(tok(text));
    let best = { topic: s.topics[0].id, score: 0 };
    s.topics.forEach((t) => {
      if (!t._kw) {
        const kw = {};
        const add = (str, w) => tok(str).forEach((k) => (kw[k] = Math.max(kw[k] || 0, w)));
        add(t.title, 4); add(t.summary, 2);
        (t.terms || []).forEach(([k, v]) => { add(k, 4); add(v, 1); });
        (t.concepts || []).forEach((c) => { add(c.h, 3); add(c.b, 1); });
        t._kw = kw;
      }
      let score = 0;
      words.forEach((w) => (score += t._kw[w] || 0));
      if (score > best.score) best = { topic: t.id, score };
    });
    return best;
  };
  IB.question = (id) => IB.allQuestions().find((q) => q.id === id) || (IB._generated && IB._generated[id]) || null;

  // ---------- utilities ----------
  const esc = (IB.esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]));
  IB.qs = (sel, root = document) => root.querySelector(sel);
  IB.qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  IB.el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  IB.param = (k) => new URLSearchParams(location.search).get(k);
  IB.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  IB.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  IB.fmtDate = (ts) => new Date(ts).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  IB.pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);

  IB.math = function (root) {
    if (!root || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(root, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
      });
    } catch (e) {
      /* rendering is cosmetic */
    }
  };

  // Tiny, safe markdown renderer for AI output (escapes first, then formats).
  IB.md = function (src) {
    const lines = esc(src).split("\n");
    let html = "";
    let list = null;
    const inline = (s) =>
      s
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>");
    const close = () => {
      if (list) html += `</${list}>`;
      list = null;
    };
    for (const raw of lines) {
      const line = raw.trimEnd();
      let m;
      if ((m = line.match(/^#{1,4}\s+(.*)/))) {
        close();
        html += `<h4>${inline(m[1])}</h4>`;
      } else if ((m = line.match(/^\s*[-*•]\s+(.*)/))) {
        if (list !== "ul") { close(); html += "<ul>"; list = "ul"; }
        html += `<li>${inline(m[1])}</li>`;
      } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)/))) {
        if (list !== "ol") { close(); html += "<ol>"; list = "ol"; }
        html += `<li>${inline(m[1])}</li>`;
      } else if (!line.trim()) {
        close();
      } else {
        close();
        html += `<p>${inline(line)}</p>`;
      }
    }
    close();
    return html;
  };

  // In the hosted preview (a sandboxed page) the browser blocks file downloads and printing.
  IB.hosted = !!window.IB_HOSTED;
  IB.print = function () {
    if (IB.hosted) return IB.toast("Printing isn't available in this preview. Run the full site to print or save as PDF.");
    window.print();
  };
  IB.download = function (filename, content, mime = "text/html") {
    if (IB.hosted) return IB.toast("Downloads aren't available in this preview. Run the full site to download files.");
    const blob = new Blob([content], { type: mime + ";charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  };

  // Standalone, offline-readable HTML document (used for notes/worksheet downloads).
  IB.standaloneDoc = function (title, bodyHtml) {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
 onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'\\\\(',right:'\\\\)',display:false}]})"></script>
<style>body{font:15px/1.6 system-ui,sans-serif;max-width:820px;margin:32px auto;padding:0 16px;color:#1d1d1b}
h1{font-size:1.8rem}h2{border-bottom:2px solid #ddd;padding-bottom:4px;margin-top:2em}h3{margin-top:1.4em}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:5px 8px;text-align:left;vertical-align:top}
.keyterm{display:grid;grid-template-columns:180px 1fr;gap:8px;border-bottom:1px dashed #ddd;padding:6px 0}.keyterm dt{font-weight:700}.keyterm dd{margin:0}
.skill,.ms{background:#f3f2ee;border-radius:8px;padding:8px 14px;margin:8px 0}.worked,.q{border:1px solid #ddd;border-radius:8px;padding:10px 14px;margin:10px 0;page-break-inside:avoid}
.concept{border-left:3px solid #3b5bdb;padding-left:14px;margin:16px 0}.lines{border-bottom:1px solid #bbb;height:28px}
.meta{color:#666;font-size:.85em}.page-break{page-break-before:always}@media print{body{margin:0}}</style></head>
<body>${bodyHtml}<p class="meta" style="margin-top:3em">Downloaded from IB Revision Hub · ${new Date().toLocaleDateString()} · Original IB-style material, not official IB content.</p></body></html>`;
  };

  // ---------- storage / progress ----------
  const KEY = "ibrev:v1";
  const blank = () => ({ attempts: [], read: {}, flags: {}, exams: [], custom: [], created: Date.now() });
  IB.store = {
    get() {
      try {
        const d = JSON.parse(localStorage.getItem(KEY));
        return d && d.attempts ? Object.assign(blank(), d) : blank();
      } catch (e) {
        return blank();
      }
    },
    save(d) {
      myCache = null;
      try {
        localStorage.setItem(KEY, JSON.stringify(d));
      } catch (e) {
        IB.toast("Could not save progress in this browser (storage blocked or full).");
      }
    },
    update(fn) {
      const d = this.get();
      fn(d);
      this.save(d);
      return d;
    },
  };
  IB.recordAttempt = function (q, score, max, mode = "practice") {
    IB.store.update((d) => {
      d.attempts.push({ id: q.id, s: q.subject, t: q.topic, sc: score, mx: max, m: mode, at: Date.now() });
      if (d.attempts.length > 5000) d.attempts = d.attempts.slice(-5000);
    });
  };
  IB.markRead = (topicId, val = true) => IB.store.update((d) => (val ? (d.read[topicId] = Date.now()) : delete d.read[topicId]));
  IB.toggleFlag = (qid) =>
    IB.store.update((d) => {
      if (d.flags[qid]) delete d.flags[qid];
      else d.flags[qid] = Date.now();
    });

  // Mastery per topic: recency-weighted % over the last 20 attempts.
  IB.mastery = function (topicId, data = IB.store.get()) {
    const rows = data.attempts.filter((a) => a.t === topicId).slice(-20);
    if (!rows.length) return null;
    let num = 0, den = 0;
    rows.forEach((a, i) => {
      const w = 1 + i / rows.length;
      num += w * (a.sc / a.mx);
      den += w;
    });
    return Math.round((100 * num) / den);
  };

  // Approximate IB grade from a percentage (boundaries vary by session - this is a guide only).
  const BOUNDS = {
    econ: [0, 16, 30, 42, 53, 64, 75],
    chem: [0, 18, 30, 42, 53, 64, 76],
    geo: [0, 15, 28, 40, 51, 62, 73],
    math: [0, 15, 28, 41, 54, 67, 80],
  };
  IB.grade = function (pct, subjectId) {
    const b = BOUNDS[subjectId] || BOUNDS.math;
    let g = 1;
    for (let i = 0; i < b.length; i++) if (pct >= b[i]) g = i + 1;
    return g;
  };

  // ---------- marking ----------
  const STOP = new Set(
    "the a an and or of to in on for with by is are be as at that this it its from which their there these those was were has have had will would can could may might into than then also not no more less most least such other each per using use used show shows give state award any one two both e.g. eg i.e. ie owttE owtte accept do don't allow".split(" ")
  );
  const stem = (w) => w.replace(/(ing|ed|es|s|ly)$/i, "");
  const words = (s) =>
    String(s)
      .toLowerCase()
      .replace(/\\\(|\\\)|<[^>]+>/g, " ")
      .replace(/[^a-z0-9.%\-+ ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map(stem);

  // Offline marker: credits a markscheme point when enough of its key words appear in the answer.
  IB.offlineMark = function (q, answer) {
    const ans = new Set(words(answer));
    const max = q.marks || 1;
    if (!String(answer).trim()) return { score: 0, max, awarded: [], missing: q.ms.slice(), summary: "No answer given.", offline: true };
    if (q.numeric) {
      const r = IB.checkNumeric(q, answer);
      return {
        score: r ? max : 0, max, awarded: r ? q.ms.slice() : [], missing: r ? [] : q.ms.slice(), offline: true,
        summary: r ? "Correct final answer." : `Final answer not matched (expected ≈ ${q.numeric.value}${q.numeric.unit ? " " + q.numeric.unit : ""}). Check your working against the markscheme.`,
      };
    }
    const awarded = [], missing = [];
    (q.ms || []).forEach((p) => {
      if (/^(level|band|\[?\d+\s*[-–]\s*\d+\]?\s*marks?|note|accept|do not|examiners?)/i.test(p.trim())) return;
      const kw = Array.from(new Set(words(p)));
      if (!kw.length) return;
      const hit = kw.filter((k) => ans.has(k)).length / kw.length;
      (hit >= 0.45 ? awarded : missing).push(p);
    });
    const total = awarded.length + missing.length || 1;
    let score = Math.round((awarded.length / total) * max);
    if (answer.trim().split(/\s+/).length < 6) score = Math.min(score, 1);
    return {
      score, max, awarded, missing, offline: true,
      summary: "Estimated by keyword match against the markscheme - use the markscheme to check yourself, or switch on AI marking for examiner-style feedback.",
    };
  };

  IB.checkNumeric = function (q, answer) {
    const nums = String(answer)
      .replace(/[−–]/g, "-")
      .replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
      .replace(/(\d)[, ](?=\d{3}\b)/g, "$1")
      .replace(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g, (m, a, b) => `${m} ${parseFloat(a) / parseFloat(b)}`).replace(/×\s*10\^?/g, "e").match(/-?\d*\.?\d+(e-?\d+)?/gi);
    if (!nums) return false;
    const target = q.numeric.value;
    const tol = q.numeric.tol ?? Math.max(Math.abs(target) * 0.01, 1e-9);
    // Credit the answer if the final value (or any stated value, e.g. "x = 4, so S = 48") matches.
    return nums.some((n) => Math.abs(parseFloat(n) - target) <= tol);
  };

  // ---------- AI client ----------
  IB.ai = {
    _health: null,
    async available() {
      if (this._health === null) {
        try {
          const r = await fetch("/api/health", { cache: "no-store" });
          this._health = r.ok ? (await r.json()).ai === true : false;
        } catch (e) {
          this._health = false;
        }
      }
      return this._health;
    },
    async mark(q, answer) {
      const t = IB.topic(q.topic);
      const r = await fetch("/api/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: q.subject, topic: t ? t.title : "", question: q.q.replace(/<[^>]+>/g, " ") + (q.options ? "\nOptions: " + q.options.join(" | ") : ""), ms: q.ms, marks: q.marks, answer }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "AI marking failed");
      return j;
    },
    async generate(opts) {
      const r = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(opts) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Generation failed");
      return j.questions || [];
    },
    async tutor(payload, onDelta) {
      const r = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok || !r.body) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "Tutor unavailable");
      }
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n\n")) >= 0) {
          const chunk = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          const ev = (chunk.match(/^event: (.*)$/m) || [])[1];
          const data = JSON.parse((chunk.match(/^data: (.*)$/m) || [])[1] || "{}");
          if (ev === "delta") onDelta(data.text);
          if (ev === "error") throw new Error(data.error);
        }
      }
    },
  };

  // ---------- question component ----------
  // opts: { mode: 'practice'|'exam', number, onScored(score,max), showTopic, hideActions }
  IB.renderQuestion = function (q, opts = {}) {
    const s = IB.subjects[q.subject];
    const t = IB.topic(q.topic);
    const flagged = !!IB.store.get().flags[q.id];
    const diff = ["", "Foundation", "Standard", "Challenging"][q.diff] || "";
    const card = IB.el(`<article class="q-card" data-qid="${esc(q.id)}">
      <div class="q-meta">
        ${opts.number ? `<strong>Q${opts.number}.</strong>` : ""}
        <span class="pill ${q.subject}">${esc(s ? s.short : q.subject)}</span>
        ${opts.showTopic !== false && t ? `<span class="pill">${esc(t.code)} ${esc(t.title)}</span>` : ""}
        ${q.paper ? `<span class="pill">${esc(q.paper)}</span>` : ""}
        ${diff ? `<span class="pill ${q.diff === 3 ? "bad" : q.diff === 1 ? "good" : "warn"}">${diff}</span>` : ""}
        ${q.generated ? `<span class="pill">Auto-generated</span>` : ""}
        ${q.custom ? `<span class="pill good">My past paper · ${esc(q.source)}</span>` : ""}
        <span class="marks">[${q.marks}]</span>
      </div>
      <div class="q-text rich">${q.q}</div>
      <div class="q-answer"></div>
      <div class="q-actions btn-row no-print" style="margin-top:10px"></div>
      <div class="q-result"></div>
    </article>`);
    const ansBox = IB.qs(".q-answer", card);
    const actions = IB.qs(".q-actions", card);
    const result = IB.qs(".q-result", card);
    let scored = false;

    const finish = (score, max, mode) => {
      if (scored) return;
      scored = true;
      IB.recordAttempt(q, score, max, mode || opts.mode || "practice");
      card.dataset.score = score;
      if (opts.onScored) opts.onScored(score, max);
    };

    const showMs = () => {
      if (IB.qs(".ms", result)) return;
      const ms = IB.el(`<div class="ms"><strong>Markscheme</strong><ul>${(q.ms || []).map((p) => `<li>${p}</li>`).join("")}</ul></div>`);
      result.appendChild(ms);
      IB.math(ms);
    };

    if (q.type === "mcq") {
      const name = "opt-" + q.id + "-" + Math.random().toString(36).slice(2, 6);
      ansBox.innerHTML = `<ul class="options">${q.options
        .map((o, i) => `<li><label><input type="radio" name="${name}" value="${i}"><span><strong>${"ABCD"[i]}.</strong> ${o}</span></label></li>`)
        .join("")}</ul>`;
      const check = IB.el(`<button class="btn primary small">Check answer</button>`);
      if (opts.mode !== "exam") actions.appendChild(check);
      check.onclick = () => {
        const sel = IB.qs(`input[name="${name}"]:checked`, ansBox);
        if (!sel) return IB.toast("Choose an option first.");
        const choice = +sel.value;
        IB.qsa("label", ansBox).forEach((l, i) => {
          if (i === q.answer) l.classList.add("correct");
          else if (i === choice) l.classList.add("wrong");
          IB.qs("input", l).disabled = true;
        });
        const ok = choice === q.answer;
        result.prepend(IB.el(`<div class="feedback ${ok ? "good" : "low"}"><h4>${ok ? "Correct" : "Not quite"} - ${ok ? q.marks : 0}/${q.marks}</h4><div>${q.ms && q.ms.length ? q.ms.join(" ") : ""}</div></div>`));
        IB.math(result);
        check.disabled = true;
        finish(ok ? q.marks : 0, q.marks);
      };
      card.getAnswer = () => {
        const sel = IB.qs(`input[name="${name}"]:checked`, ansBox);
        return sel ? +sel.value : null;
      };
      card.autoMark = () => {
        if (!scored) check.click();
      };
      card.giveZero = () => {
        IB.qsa("label", ansBox).forEach((l, i) => {
          if (i === q.answer) l.classList.add("correct");
          IB.qs("input", l).disabled = true;
        });
        result.prepend(IB.el(`<div class="feedback low"><h4>Not answered - 0/${q.marks}</h4></div>`));
        finish(0, q.marks, "exam");
      };
    } else {
      const rows = q.type === "extended" ? 14 : Math.min(10, 3 + q.marks);
      ansBox.innerHTML = `<textarea rows="${rows}" placeholder="${q.numeric ? "Show your working, then give your final answer…" : "Write your answer here…"}"></textarea>`;
      const ta = IB.qs("textarea", ansBox);
      const aiBtn = IB.el(`<button class="btn primary small">✦ AI mark my answer</button>`);
      const msBtn = IB.el(`<button class="btn small">Show markscheme & self-mark</button>`);
      if (!opts.hideActions && opts.mode !== "exam") {
        actions.append(aiBtn, msBtn);
      }
      const selfMark = () => {
        showMs();
        if (IB.qs(".self-mark", result) || scored) return;
        const sm = IB.el(`<div class="self-mark"><span class="small muted">Your mark:</span><input type="number" min="0" max="${q.marks}" value="0"><span class="small">/ ${q.marks}</span><button class="btn small">Save mark</button></div>`);
        result.appendChild(sm);
        IB.qs("button", sm).onclick = () => {
          const v = Math.max(0, Math.min(q.marks, parseInt(IB.qs("input", sm).value, 10) || 0));
          finish(v, q.marks, opts.mode === "exam" ? "exam" : "self");
          sm.innerHTML = `<span class="pill good">Saved ${v}/${q.marks}</span>`;
        };
      };
      msBtn.onclick = selfMark;
      const runMark = async () => {
        const answer = ta.value;
        if (!answer.trim()) return IB.toast("Write an answer first.");
        aiBtn.disabled = true;
        aiBtn.textContent = "Marking…";
        let fb;
        try {
          if (await IB.ai.available()) fb = await IB.ai.mark(q, answer);
          else fb = IB.offlineMark(q, answer);
        } catch (e) {
          IB.toast(e.message + " - using offline marker.");
          fb = IB.offlineMark(q, answer);
        }
        aiBtn.textContent = fb.offline ? "Marked (offline estimate)" : "✦ Marked by AI";
        IB.qsa(".feedback", result).forEach((n) => n.remove());
        result.prepend(IB.feedbackEl(fb));
        IB.math(result);
        finish(fb.score, fb.max, fb.offline ? "offline" : "ai");
        showMs();
        return fb;
      };
      aiBtn.onclick = runMark;
      card.getAnswer = () => ta.value;
      card.autoMark = runMark;
      card.selfMark = selfMark;
      card.giveZero = () => {
        ta.disabled = true;
        result.prepend(IB.feedbackEl({ score: 0, max: q.marks, summary: "No answer given.", offline: true }));
        showMs();
        finish(0, q.marks, "exam");
      };
    }

    if (!opts.hideActions && opts.mode !== "exam") {
      const flag = IB.el(`<button class="btn small" title="Save to your review list">${flagged ? "★ Saved" : "☆ Save for review"}</button>`);
      flag.onclick = () => {
        IB.toggleFlag(q.id);
        flag.textContent = IB.store.get().flags[q.id] ? "★ Saved" : "☆ Save for review";
      };
      const tutor = IB.el(`<a class="btn small" href="tutor.html?q=${encodeURIComponent(q.id)}">Ask the AI tutor</a>`);
      if (q.generated) tutor.href = `tutor.html?subject=${q.subject}&prompt=${encodeURIComponent("Help me with this question: " + q.q.replace(/<[^>]+>/g, " "))}`;
      actions.append(flag, tutor);
    }
    IB.math(card);
    card.q = q;
    card.isScored = () => scored;
    return card;
  };

  IB.feedbackEl = function (fb) {
    const p = fb.score / fb.max;
    const list = (title, arr) => (arr && arr.length ? `<p class="small" style="margin:.6em 0 .2em"><strong>${title}</strong></p><ul class="small">${arr.map((x) => `<li>${x}</li>`).join("")}</ul>` : "");
    return IB.el(`<div class="feedback ${p >= 0.7 ? "good" : p >= 0.4 ? "mid" : "low"}">
      <h4>${fb.score}/${fb.max}${fb.level ? ` · ${esc(fb.level)}` : ""} ${fb.offline ? '<span class="pill">offline estimate</span>' : '<span class="pill good">AI examiner</span>'}</h4>
      <div class="small">${esc(fb.summary || "")}</div>
      ${list("✓ Credited", fb.awarded)}
      ${list("✗ Missing", fb.missing)}
      ${list("How to improve", (fb.improvements || []).map(esc))}
      ${fb.model_answer ? `<details style="margin-top:6px"><summary>Model answer</summary><div class="small" style="white-space:pre-line">${esc(fb.model_answer)}</div></details>` : ""}
    </div>`);
  };

  // ---------- chrome ----------
  IB.toast = function (msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = IB.el(`<div id="toast" style="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--text);color:var(--bg);padding:10px 18px;border-radius:10px;z-index:99;font-size:.92rem;max-width:90vw;box-shadow:var(--shadow);transition:opacity .3s"></div>`);
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = 1;
    clearTimeout(t._h);
    t._h = setTimeout(() => (t.style.opacity = 0), 3200);
  };

  function chrome() {
    const page = document.body.dataset.page || "";
    const link = (href, label, id) => `<a href="${href}" class="${page === id ? "active" : ""}">${label}</a>`;
    const header = IB.el(`<header class="site-header"><div class="container nav">
      <a class="brand" href="index.html"><span class="brand-mark">IB</span>Revision Hub</a>
      <nav class="nav-links" id="navLinks">
        ${link("notes.html", "Notes", "notes")}
        ${link("questionbank.html", "Question Bank", "bank")}
        ${link("practice.html", "Quizzes & Mocks", "practice")}
        ${link("tutor.html", "AI Tutor", "tutor")}
        ${link("mypapers.html", "My Past Papers", "mypapers")}
        ${link("progress.html", "My Progress", "progress")}
      </nav>
      <button class="icon-btn" id="themeBtn" title="Toggle dark mode" aria-label="Toggle dark mode">◐</button>
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu">☰</button>
    </div></header>`);
    document.body.prepend(header);
    document.body.appendChild(
      IB.el(`<footer class="site-footer"><div class="container">
      <p><strong>IB Revision Hub</strong> · Economics SL · Chemistry SL · Geography SL · Mathematics AA SL</p>
      <p>All notes and questions are original IB-style material written for revision. They are not official IB past-paper questions and this site is not affiliated with or endorsed by the International Baccalaureate Organization. Get official past papers and markschemes from your school or the IB store.</p>
    </div></footer>`)
    );
    IB.qs("#menuBtn").onclick = () => IB.qs("#navLinks").classList.toggle("open");
    IB.qs("#themeBtn").onclick = () => {
      const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("ibrev:theme", next); } catch (e) { /* ignore */ }
    };
  }
  try {
    const th = localStorage.getItem("ibrev:theme");
    if (th) document.documentElement.dataset.theme = th;
  } catch (e) { /* ignore */ }

  // Wrap each page's opening heading + intro paragraph in the dark header band.
  function introBand() {
    const app = document.getElementById("app");
    const h1 = app && app.firstElementChild;
    if (!h1 || h1.tagName !== "H1" || h1.closest(".band")) return;
    const band = document.createElement("section");
    band.className = "band";
    band.style.paddingBlock = "8px 32px";
    app.insertBefore(band, h1);
    band.appendChild(h1);
    h1.style.marginTop = "18px";
    while (band.nextElementSibling && band.nextElementSibling.tagName === "P") band.appendChild(band.nextElementSibling);
  }

  document.addEventListener("DOMContentLoaded", () => {
    chrome();
    const ret = typeof IB.page === "function" ? IB.page() : null;
    Promise.resolve(ret).then(introBand);
  });
})();

/* Shared document builders (notes & worksheet downloads). */
IB.topicHtml = function (t, opts = {}) {
  const s = IB.subjects[t.subject];
  let h = `<h2>${IB.esc(t.code)} ${IB.esc(t.title)}</h2><p class="meta">${IB.esc(s.name)} · ${IB.esc(t.unit)}</p><p><em>${t.summary}</em></p>`;
  h += `<h3>Key concepts</h3>` + t.concepts.map((c) => `<div class="concept"><h4>${c.h}</h4>${c.b}</div>`).join("");
  if (t.terms && t.terms.length) h += `<h3>Key terms</h3><dl>` + t.terms.map(([k, v]) => `<div class="keyterm"><dt>${k}</dt><dd>${v}</dd></div>`).join("") + `</dl>`;
  if (t.skills && t.skills.length) h += `<h3>Exam skills</h3>` + t.skills.map((x) => `<div class="skill"><strong>${x.h}</strong>${x.b}</div>`).join("");
  if (t.examples && t.examples.length)
    h += `<h3>Worked examples</h3>` + t.examples.map((e, i) => `<div class="worked"><strong>Example ${i + 1}.</strong> ${e.q}<div class="sol"><strong>Solution:</strong> ${e.a}</div></div>`).join("");
  if (opts.questions) h += IB.worksheetHtml(t.questions, `Practice questions - ${t.title}`, true);
  return h;
};

IB.worksheetHtml = function (qs, title, inline) {
  let h = `<h3>${IB.esc(title)}</h3>`;
  qs.forEach((q, i) => {
    const lines = q.type === "mcq" ? "" : `<div>${'<div class="lines"></div>'.repeat(Math.min(12, 2 + q.marks))}</div>`;
    const opts = q.options ? `<ol type="A">${q.options.map((o) => `<li>${o}</li>`).join("")}</ol>` : "";
    h += `<div class="q"><strong>${i + 1}.</strong> <span class="meta">[${q.marks} mark${q.marks > 1 ? "s" : ""}${q.paper ? " · " + q.paper : ""}]</span><div>${q.q}</div>${opts}${lines}</div>`;
  });
  h += `<div class="${inline ? "" : "page-break"}"><h3>Markscheme - ${IB.esc(title)}</h3>`;
  qs.forEach((q, i) => {
    const ans = q.type === "mcq" ? `<p><strong>Answer: ${"ABCD"[q.answer]}</strong></p>` : "";
    h += `<div class="ms"><strong>${i + 1}.</strong> ${ans}<ul>${q.ms.map((p) => `<li>${p}</li>`).join("")}</ul></div>`;
  });
  return h + `</div>`;
};

