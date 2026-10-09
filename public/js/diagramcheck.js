/* "Your diagram" panel for Economics questions: upload a photo or screenshot of a hand-drawn diagram, check it
   against the diagram markscheme for its type (js/data/econ-diagrams.js) and let the marker credit the diagram marks.
   - The checklist is ticked by the student (self-check) or, where the site runs with Claude switched on, by the AI.
   - Images stay in this browser (IndexedDB); they are never uploaded to the cloud sync. */
(function () {
  "use strict";
  const IB = window.IB;
  const E = () => IB.econDiagrams;
  const esc = (s) => IB.esc(String(s ?? ""));

  // ---------- storage (IndexedDB, falls back to memory) ----------
  const mem = {};
  let dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((res) => {
      try {
        const r = indexedDB.open("ib-diagrams", 1);
        r.onupgradeneeded = () => r.result.createObjectStore("d");
        r.onsuccess = () => res(r.result);
        r.onerror = () => res(null);
      } catch (e) {
        res(null);
      }
    });
    return dbp;
  }
  async function load(id) {
    const d = await db();
    if (!d) return mem[id] || null;
    return new Promise((res) => {
      try {
        const g = d.transaction("d").objectStore("d").get(id);
        g.onsuccess = () => res(g.result || null);
        g.onerror = () => res(null);
      } catch (e) {
        res(mem[id] || null);
      }
    });
  }
  async function save(id, v) {
    mem[id] = v;
    const d = await db();
    if (!d) return;
    try {
      const tx = d.transaction("d", "readwrite").objectStore("d");
      if (v) tx.put(v, id);
      else tx.delete(id);
    } catch (e) {}
  }

  // Shrink a photo to at most 1400 px on its long side as a JPEG data URL (keeps storage and AI requests small).
  function shrink(file) {
    return new Promise((res, rej) => {
      if (!file || !/^image\//.test(file.type)) return rej(new Error("Choose an image file (photo or screenshot)."));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 1400 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        const g = c.getContext("2d");
        g.fillStyle = "#fff";
        g.fillRect(0, 0, c.width, c.height);
        g.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        rej(new Error("That image couldn't be opened. Try a JPG or PNG."));
      };
      img.src = url;
    });
  }

  function lightbox(src) {
    const box = IB.el(`<div class="dg-lightbox" role="dialog" aria-label="Your diagram"><img alt="Your diagram" src="${src}"><button class="btn small" type="button">Close</button></div>`);
    const close = () => box.remove();
    box.onclick = (e) => { if (e.target === box || e.target.tagName === "BUTTON") close(); };
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", k); } });
    document.body.appendChild(box);
  }

  // ---------- AI check (server with ANTHROPIC_API_KEY: POST /api/mark-diagram) ----------
  if (IB.ai) {
    IB.ai.markDiagram = async function (q, typeId, dataUrl) {
      const d = E().types[typeId];
      const r = await IB.apiFetch("/api/mark-diagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: String(q.stem || q.q).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
          ms: (q.ms || []).map((p) => String(p).replace(/<[^>]+>/g, " ")),
          diagram: d.name,
          items: d.items.map((it) => it.t + (it.key ? " (essential)" : "")),
          errors: d.errors,
          image: dataUrl,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "AI diagram check failed");
      return { items: Array.isArray(j.items) ? j.items : [], summary: String(j.summary || "") };
    };
  }

  // ---------- panel ----------
  IB.diagramPanel = function (q) {
    const D = E();
    if (!D || q.subject !== "econ" || q.type === "mcq" || q.numeric) return null;
    const expected = D.expected(q);
    const pts = D.points(q);
    const ranked = D.rank(q).map(([id]) => id);
    const order = [D.best(q)].concat(ranked, Object.keys(D.types)).filter((id, i, a) => a.indexOf(id) === i);
    const state = { type: order[0], ticks: [], notes: [], img: null, ai: false };

    const worth = pts.length ? `<span class="pill warn">Diagram: ${pts.length} markscheme point${pts.length > 1 ? "s" : ""}</span>` : q.type === "extended" ? `<span class="pill">Diagram counts towards the level</span>` : "";
    const el = IB.el(`<details class="dg-panel"${expected ? " open" : ""}>
      <summary><span class="dg-ico" aria-hidden="true">📈</span> <strong>${expected ? "Your diagram" : "Add a diagram (optional)"}</strong> ${worth}</summary>
      <div class="dg-body">
        <div class="dg-shot">
          <div class="dg-drop" tabindex="0">
            <p><strong>Upload a photo or screenshot of your diagram</strong></p>
            <p class="small muted">Draw it on paper or a tablet, then add it here. You can also paste (Ctrl+V) or drag the image in.</p>
            <label class="btn small primary dg-pick">📷 Choose image<input type="file" accept="image/*" hidden></label>
          </div>
          <figure class="dg-fig" hidden><img alt="Your uploaded diagram"><figcaption class="btn-row"><button type="button" class="btn small dg-zoom">Enlarge</button><label class="btn small">Replace<input type="file" accept="image/*" hidden></label><button type="button" class="btn small dg-del">Remove</button></figcaption></figure>
        </div>
        <div class="dg-check">
          <label class="dg-type small"><span class="muted">Diagram markscheme for</span> <select aria-label="Diagram type">${order.map((id) => `<option value="${id}">${esc(D.types[id].name)}</option>`).join("")}</select></label>
          <div class="dg-items"></div>
          <div class="dg-score small"></div>
          <div class="btn-row dg-ai-row" hidden><button type="button" class="btn small mark dg-ai">✦ Check my diagram with AI</button><span class="small muted dg-ai-msg"></span></div>
          <details class="dg-more"><summary class="small">Common errors that lose the diagram mark</summary><ul class="small dg-errors"></ul></details>
          <details class="dg-more dg-model-wrap"><summary class="small">Show a model diagram</summary><div class="dg-model"></div></details>
        </div>
      </div>
    </details>`);

    const sel = IB.qs("select", el);
    const items = IB.qs(".dg-items", el);
    const scoreEl = IB.qs(".dg-score", el);
    const drop = IB.qs(".dg-drop", el);
    const fig = IB.qs(".dg-fig", el);
    const img = IB.qs("img", fig);
    const aiRow = IB.qs(".dg-ai-row", el);
    const aiBtn = IB.qs(".dg-ai", el);
    const aiMsg = IB.qs(".dg-ai-msg", el);

    const persist = () => save(q.id, state.img ? { img: state.img, type: state.type, ticks: state.ticks, notes: state.notes, ai: state.ai, ts: Date.now() } : null);

    function renderScore() {
      const d = D.types[state.type];
      const got = d.items.filter((_, i) => state.ticks[i]).length;
      const n = d.items.filter((it, i) => !D.optional(it) || state.ticks[i]).length;
      const earned = D.score(state.type, state.ticks, pts.length);
      const keyMiss = d.items.some((it, i) => it.key && !state.ticks[i]);
      scoreEl.innerHTML = !state.img
        ? `<span class="muted">Upload your diagram to have it marked. Until then, use the checklist as a guide while you draw.</span>`
        : `<strong>${got}/${n}</strong> checklist points${pts.length ? ` → <strong>${earned}/${pts.length}</strong> diagram mark${pts.length > 1 ? "s" : ""}` : ""}${keyMiss ? ` <span class="dg-warn">· an essential point is missing</span>` : ""}${state.ai ? ` <span class="pill good">checked by AI</span>` : ` <span class="pill">self-checked</span>`}`;
    }
    function renderType() {
      const d = D.types[state.type];
      items.innerHTML = d.items.map((it, i) => `<label class="dg-item${it.key ? " dg-essential" : ""}"><input type="checkbox" data-i="${i}"${state.ticks[i] ? " checked" : ""}${state.img ? "" : " disabled"}><span>${esc(it.t)}${it.key ? ` <em class="dg-key">essential</em>` : ""}${D.optional(it) ? ` <em class="dg-opt">only if the question needs it</em>` : ""}${it.tip ? `<small class="muted"> ${esc(it.tip)}</small>` : ""}${state.notes[i] ? `<small class="dg-note">${esc(state.notes[i])}</small>` : ""}</span></label>`).join("");
      IB.qs(".dg-errors", el).innerHTML = d.errors.map((x) => `<li>${esc(x)}</li>`).join("");
      const mw = IB.qs(".dg-model-wrap", el);
      mw.hidden = !(d.model && IB.plot);
      IB.qs(".dg-model", el).innerHTML = "";
      mw.ontoggle = () => { if (mw.open && d.model) IB.qs(".dg-model", el).innerHTML = IB.plot(d.model); };
      if (mw.open && d.model) IB.qs(".dg-model", el).innerHTML = IB.plot(d.model);
      renderScore();
    }
    function showImage() {
      drop.hidden = !!state.img;
      fig.hidden = !state.img;
      if (state.img) img.src = state.img;
      IB.qsa(".dg-item input", el).forEach((c) => (c.disabled = !state.img));
      renderScore();
    }
    async function take(file) {
      try {
        state.img = await shrink(file);
        state.ai = false;
        state.notes = [];
        el.open = true;
        renderType();
        showImage();
        persist();
        IB.toast("Diagram added. Tick what it shows, then mark your answer.");
      } catch (e) {
        IB.toast(e.message);
      }
    }

    sel.onchange = () => {
      state.type = sel.value;
      state.ticks = [];
      state.notes = [];
      state.ai = false;
      renderType();
      persist();
    };
    items.addEventListener("change", (e) => {
      const i = +e.target.dataset.i;
      if (!isFinite(i)) return;
      state.ticks[i] = e.target.checked;
      state.ai = false;
      renderScore();
      persist();
    });
    IB.qsa('input[type="file"]', el).forEach((inp) => (inp.onchange = () => { if (inp.files[0]) take(inp.files[0]); inp.value = ""; }));
    IB.qs(".dg-zoom", el).onclick = () => lightbox(state.img);
    img.onclick = () => lightbox(state.img);
    IB.qs(".dg-del", el).onclick = () => {
      state.img = null;
      state.ticks = [];
      state.notes = [];
      state.ai = false;
      renderType();
      showImage();
      persist();
    };
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", (e) => { const f = e.dataTransfer && e.dataTransfer.files[0]; if (f) take(f); });
    el.addEventListener("paste", (e) => {
      const f = Array.from((e.clipboardData && e.clipboardData.files) || []).find((x) => /^image\//.test(x.type));
      if (f) { e.preventDefault(); take(f); }
    });

    // AI check: only where the site's own server has Claude switched on.
    (async () => {
      try {
        if (IB.ai && IB.ai.markDiagram && !IB.hosted && (await IB.ai.available())) aiRow.hidden = false;
      } catch (e) {}
    })();
    aiBtn.onclick = async () => {
      if (!state.img) return IB.toast("Upload your diagram first.");
      aiBtn.disabled = true;
      aiMsg.textContent = "Checking your diagram…";
      try {
        const r = await IB.ai.markDiagram(q, state.type, state.img);
        const d = D.types[state.type];
        state.ticks = d.items.map((_, i) => !!(r.items[i] && r.items[i].ok));
        state.notes = d.items.map((_, i) => (r.items[i] && r.items[i].note) || "");
        state.ai = true;
        renderType();
        persist();
        aiMsg.textContent = r.summary || "";
      } catch (e) {
        aiMsg.textContent = e.message;
      }
      aiBtn.disabled = false;
    };

    load(q.id).then((v) => {
      if (v && v.img) {
        Object.assign(state, { img: v.img, type: D.types[v.type] ? v.type : state.type, ticks: v.ticks || [], notes: v.notes || [], ai: !!v.ai });
        sel.value = state.type;
        el.open = true;
      }
      renderType();
      showImage();
    });
    renderType();

    return {
      el,
      // What the marker needs; null when nothing was uploaded.
      state: () => (state.img ? { type: state.type, ticks: state.ticks.slice(), uploaded: true, ai: state.ai } : null),
      // One line for the AI text marker, so it knows how the diagram was judged.
      describe() {
        if (!state.img) return "";
        const d = D.types[state.type];
        const yes = d.items.filter((_, i) => state.ticks[i]).map((it) => it.t);
        const no = d.items.filter((_, i) => !state.ticks[i]).map((it) => it.t);
        return `\n\n[Diagram submitted separately (${d.name}), checked against the diagram markscheme${state.ai ? " by AI" : " by the student"}. Shown: ${yes.join("; ") || "none"}. Not shown: ${no.join("; ") || "none"}.]`;
      },
    };
  };
})();
