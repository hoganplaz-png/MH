// Validates all subject data and question generators.  Run: npm run check
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "js");
const ctx = { console, Math, Date, JSON, Number, String, Array, Object, Set, isFinite, parseFloat, parseInt, URLSearchParams };
ctx.window = ctx;
ctx.document = { addEventListener() {}, documentElement: { dataset: {} } };
ctx.localStorage = { getItem: () => null, setItem() {} };
vm.createContext(ctx);
for (const f of ["app.js", "data/econ.js", "data/chem.js", "data/geo.js", "data/math.js", "data/bio.js", "data/engb.js", "data/chia.js", "data/econ-plus.js", "data/chem-plus.js", "data/geo-plus.js", "data/math-plus.js", "data/bio-plus.js", "data/engb-plus.js", "data/chia-plus.js", "data/econ-bank.js", "data/chem-bank.js", "data/geo-bank.js", "data/math-bank.js", "data/bio-bank.js", "data/engb-bank.js", "data/chia-bank.js", "data/phys.js", "data/phys2.js", "data/phys-bank.js", "data/econ-hl.js", "data/chem-hl.js", "data/math-hl.js", "data/bio-hl.js", "data/geo-hl.js", "data/hl-bank.js", "data/frameworks.js", "examframes.js", ...fs.readdirSync(path.join(root, "data/frames")).filter((f) => f.endsWith(".js")).sort().map((f) => "data/frames/" + f), "data/yue.js", "fastnotes.js", "data/cases/econ.js", "data/cases/econ-micro.js", "data/cases/econ-macro.js", "data/cases/chia.js", ...fs.readdirSync(path.join(root, "data/fast")).filter((f) => f.endsWith(".js")).sort().map((f) => "data/fast/" + f), "data/markdb.js", "data/econ-diagrams.js", "marker.js", "game.js", "generators.js", "bankbuild.js", "plot.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
}
const IB = ctx.IB;
const errors = [];
const ids = new Set();
let total = 0;

for (const s of IB.subjectList()) {
  for (const t of s.allTopics) {
    if (!t.concepts?.length) errors.push(`${t.id}: no concepts`);
    for (const q of t.questions) {
      total++;
      if (ids.has(q.id)) errors.push(`duplicate id ${q.id}`);
      ids.add(q.id);
      if (!(q.marks > 0)) errors.push(`${q.id}: bad marks`);
      if (!q.ms?.length) errors.push(`${q.id}: empty markscheme`);
      if (q.type === "mcq" && (!Array.isArray(q.options) || q.options.length !== 4 || !(q.answer >= 0 && q.answer < 4)))
        errors.push(`${q.id}: bad mcq options/answer`);
      if (q.type === "mcq" && new Set(q.options.map((o) => String(o).trim())).size !== q.options.length) errors.push(`${q.id}: duplicate mcq options`);
      if (q.numeric && !IB.checkNumeric(q, String(q.numeric.value))) errors.push(`${q.id}: numeric self-check failed`);
      if (q.numeric && !IB.checkNumeric(q, q.ms.join(" ")))
        errors.push(`${q.id}: numeric answer ${q.numeric.value} not found in markscheme`);
    }
  }
}

// every topic should now have the exam-focused extras, and every diagram must render
for (const s of IB.subjectList()) {
  if (!s.gameplan) errors.push(`${s.id}: no game plan`);
  for (const t of s.allTopics) {
    if (!t.traps?.length) errors.push(`${t.id}: no traps`);
    if (!(t.methods?.length || t.skills?.length)) errors.push(`${t.id}: no methods`);
    if (!t.tips?.length) errors.push(`${t.id}: no exam tips`);
    for (const d of t.diagrams || []) {
      const svg = IB.plot(d);
      if (/NaN|undefined/.test(svg)) errors.push(`${t.id}: diagram "${d.title}" has NaN/undefined`);
    }
  }
}

// every topic needs markscheme frames (question types with marking points) and MC speed skills
for (const s of IB.subjectList()) {
  for (const t of s.allTopics) {
    const fr = t.mframes || [];
    if (fr.length < 4) errors.push(`${t.id}: only ${fr.length} markscheme frames`);
    if ((t.mc || []).length < 3) errors.push(`${t.id}: only ${(t.mc || []).length} MC speed skills`);
    fr.forEach((f, i) => {
      const where = `${t.id} frame ${i + 1} "${String(f.title).slice(0, 40)}"`;
      if (!f.title || !(f.marks || []).length || !f.model || !f.tip) errors.push(`${where}: needs title, marks, model and tip`);
      if (f.q && !f.paper) errors.push(`${where}: question without paper`);
      if (f.paper && !s.allPapers[f.paper] && !["P1A", "P1B", "P2", "P1", "P3", "IO"].includes(f.paper)) errors.push(`${where}: unknown paper ${f.paper}`);
      if (f.diagram && /NaN|undefined/.test(IB.plot(f.diagram))) errors.push(`${where}: diagram has NaN/undefined`);
      if (/undefined|NaN/.test(IB.frameCardHtml(f, i + 1))) errors.push(`${where}: renders undefined`);
    });
    (t.figures || []).concat(fr.filter((f) => f.svg)).forEach((x, i) => {
      const svg = x.svg || "";
      if (!/^\s*<svg[^>]*viewBox=/.test(svg) || !/<\/svg>\s*$/.test(svg)) errors.push(`${t.id} figure ${i + 1} "${String(x.title || "").slice(0, 30)}": svg must start with <svg viewBox=...> and end with </svg>`);
      if (/undefined|NaN|<script|on\w+=/.test(svg)) errors.push(`${t.id} figure ${i + 1}: svg contains undefined/NaN/script`);
    });
    (t.mc || []).forEach((m, i) => {
      if (!m.skill) errors.push(`${t.id} mc ${i + 1}: no skill text`);
      if (m.q && !(Array.isArray(m.options) && m.options.length === 4 && m.answer >= 0 && m.answer < 4)) errors.push(`${t.id} mc ${i + 1}: bad example question`);
    });
  }
}

// ⏱ 10-minute fast notes: every SL topic needs a complete sheet that renders cleanly
const FAST_KINDS = ["key", "rhyme", "table", "eg", "trap", "note"];
for (const s of IB.subjectList()) {
  for (const t of s.allTopics) {
    const f = IB.fast[t.id];
    if (!f) { if (!t.hl) errors.push(`${t.id}: no 10-minute fast notes`); continue; }
    if (!f.title || !(f.parts || []).length) { errors.push(`${t.id} fast notes: needs title and parts`); continue; }
    if (f.parts.length < 2) errors.push(`${t.id} fast notes: only ${f.parts.length} part(s)`);
    f.parts.forEach((p, i) => {
      if (!p.h || !(p.min > 0) || !(p.blocks || []).length) errors.push(`${t.id} fast part ${i + 1}: needs h, min and blocks`);
      (p.blocks || []).forEach((b, j) => {
        if (!FAST_KINDS.includes(b[0])) errors.push(`${t.id} fast part ${i + 1} block ${j + 1}: unknown kind ${b[0]}`);
        if (b[0] === "table" && !(Array.isArray(b[1]) && Array.isArray(b[2]) && b[2].every((r) => Array.isArray(r) && r.length === b[1].length))) errors.push(`${t.id} fast part ${i + 1} block ${j + 1}: table rows must match the header`);
        if (b[0] === "trap" && !(Array.isArray(b[1]) && b[1].length)) errors.push(`${t.id} fast part ${i + 1} block ${j + 1}: trap needs a list`);
        if (b[0] === "eg" && !Array.isArray(b[2])) errors.push(`${t.id} fast part ${i + 1} block ${j + 1}: example needs steps`);
        if (b[0] === "rhyme" && !(b[1] && b[2])) errors.push(`${t.id} fast part ${i + 1} block ${j + 1}: rhyme needs label and phrase`);
      });
    });
    if ((f.summary || []).length < 3) errors.push(`${t.id} fast notes: summary needs at least 3 lines`);
    if ((f.practice || []).length < 3) errors.push(`${t.id} fast notes: needs at least 3 practice questions`);
    (f.practice || []).forEach((q, i) => { if (!q.q || !(q.m > 0) || !q.a) errors.push(`${t.id} fast practice ${i + 1}: needs q, m and a`); });
    const minutes = IB.fastMinutes(f);
    if (minutes > 15) errors.push(`${t.id} fast notes: ${minutes} minutes is too long for a 10-minute sheet`);
    if (/undefined|NaN|\[object Object\]/.test(IB.fastHtml(t) + IB.fastHtml(t, { static: true }))) errors.push(`${t.id} fast notes render undefined/NaN`);
  }
}

// data-response case studies (Economics Paper 2 by topic): whole questions on one extract, two per SL topic
let nCases = 0;
for (const c of Object.values(IB.cases)) {
  nCases++;
  const s = IB.subjects[c.subject];
  const t = s && s.allTopics.find((x) => x.id === c.topic);
  if (!t) { errors.push(`case ${c.id}: unknown topic ${c.topic}`); continue; }
  if (!c.title || !(c.text || (c.data || []).length)) errors.push(`case ${c.id}: needs a title and a text or data`);
  if (!c.paper) errors.push(`case ${c.id}: needs a paper`);
  if ((c.parts || []).length < 3) errors.push(`case ${c.id}: needs at least 3 parts`);
  (c.data || []).forEach((d, i) => { if (!(d.head && d.rows && d.rows.every((r) => r.length === d.head.length))) errors.push(`case ${c.id} table ${i + 1}: rows must match the header`); });
  const total = c.parts.reduce((n, p) => n + p.marks, 0);
  if (c.subject === "econ" && c.paper === "P2" && total !== 40) errors.push(`case ${c.id}: Economics SL Paper 2 cases total 40 marks (has ${total})`);
  if (/undefined|NaN/.test(IB.caseSource(c))) errors.push(`case ${c.id}: renders undefined/NaN`);
}
for (const s of IB.subjectList()) {
  for (const t of s.allTopics) {
    if (t.hl || s.id !== "econ") continue;
    const n = Object.values(IB.cases).filter((c) => c.topic === t.id).length;
    const need = 2;
    if (n < need) errors.push(`${t.id}: ${n} data-response case(s), needs ${need}`);
  }
}

let gens = 0;
for (const tid of IB.generatorTopics()) {
  if (!IB.topic(tid)) errors.push(`generator for unknown topic ${tid}`);
  for (let i = 0; i < 300; i++) {
    const q = IB.generate(tid);
    gens++;
    if (!q.numeric || !isFinite(q.numeric.value)) { errors.push(`${tid}: non-finite answer in "${q.q.slice(0, 60)}"`); break; }
    if (/NaN|undefined|Infinity/.test(q.q + q.ms.join(""))) { errors.push(`${tid}: NaN/undefined in text "${q.q.slice(0, 80)}"`); break; }
    if (!IB.checkNumeric(q, String(q.numeric.value))) { errors.push(`${tid}: self-check failed (${q.numeric.value})`); break; }
    const m = IB.asMcq(q);
    if (!(m.answer >= 0) || new Set(m.options).size !== m.options.length) { errors.push(`${tid}: bad MCQ conversion ${JSON.stringify(m.options)}`); break; }
  }
}

// the built-in marker: markscheme-quality answers must score high, irrelevant answers ~0, reversed directions must lose marks
{
  const junk = "I really like football and pizza. My favourite holiday was in Spain where the weather was nice and sunny.";
  const pad = " As the diagram shows, this happens because of that, which means the outcome changes. For example, in 2022 in France the figure rose by 6%. However, in the long run this depends on stakeholders. In conclusion, on balance the argument holds to a large extent. ";
  const agg = {};
  for (const s of IB.subjectList()) for (const t of s.allTopics) for (const q of t.questions) {
    if (q.type === "mcq") continue;
    const model = q.numeric ? q.ms.join(" ") : q.ms.map((p) => p.replace(/\[[^\]]*\]/g, "")).join(". ");
    const ext = q.type === "extended";
    const a = agg[s.id] = agg[s.id] || { n: 0, good: 0, junk: 0 };
    const r = IB.offlineMark(q, ext ? (model + pad).repeat(4) : model);
    const j = IB.offlineMark(q, ext ? (junk + pad).repeat(4) : junk);
    a.n++; a.good += r.score / r.max; a.junk += j.score / j.max;
  }
  for (const [sid, a] of Object.entries(agg)) {
    if (a.good / a.n < 0.9) errors.push(`marker: ${sid} model answers average only ${(a.good / a.n).toFixed(2)}`);
    if (a.junk / a.n > 0.1) errors.push(`marker: ${sid} irrelevant answers average ${(a.junk / a.n).toFixed(2)}`);
  }
  const q = { id: "t", subject: "econ", topic: "econ-2", marks: 2, ms: ["Goods consumed together [1]", "A rise in the price of one leads to a fall in demand for the other [1]"] };
  if (IB.offlineMark(q, "Goods used together, so a fall in the price of one leads to a fall in demand for the other").score !== 1) errors.push("marker: reversed direction was not penalised");
  if (IB.offlineMark(q, "They are consumed together; when the price of one rises, demand for the other falls.").score !== 2) errors.push("marker: equivalent wording (OWTTE) was not accepted");
}

// Economics diagrams: every diagram question maps to a diagram markscheme, every model diagram renders,
// a full diagram checklist earns the diagram points, and realistic student answers are marked fairly.
{
  const E = IB.econDiagrams;
  for (const [id, d] of Object.entries(E.types)) {
    if (d.items.length < 4 || !d.items.some((it) => it.key) || !d.errors.length) errors.push(`diagram ${id}: needs 4+ checklist points, a key point and common errors`);
    if (d.model && /NaN|undefined/.test(IB.plot(d.model))) errors.push(`diagram ${id}: model diagram has NaN/undefined`);
  }
  const econ = IB.subjects.econ.allTopics.flatMap((t) => t.questions);
  const byId = Object.fromEntries(econ.map((q) => [q.id, q]));
  let asked = 0, lost = 0, back = 0;
  for (const q of econ) {
    if (!E.asks(q)) continue;
    asked++;
    const type = E.best(q);
    if (!E.types[type]) { errors.push(`${q.id}: no diagram markscheme`); continue; }
    if (q.type === "extended") continue;
    const explain = q.ms.filter((p, i) => !E.isPoint(p, i)).map((p) => p.replace(/\[[^\]]*\]/g, "")).join(". ");
    const full = { type, ticks: E.types[type].items.map(() => true), uploaded: true };
    const a = IB.offlineMark(q, explain).score, b = IB.offlineMark(q, explain, { diagram: full }).score;
    lost += q.marks - a; back += b - a;
  }
  if (asked < 200) errors.push(`only ${asked} Economics diagram questions found`);
  if (back < lost * 0.9) errors.push(`diagram checklist restores only ${back} of ${lost} diagram marks`);
  const fair = [
    ["econ-7-q14", 3, "Steel production creates air pollution which is a cost to third parties such as people living nearby who get breathing problems. So the social cost is higher than the private cost, the MSC curve is above the MPC curve. Firms only look at their own private costs so they produce at Qm where MPB = MPC, which is more than the socially optimal Qopt where MSB = MSC. Too much steel is made, there is overallocation of resources and a welfare loss."],
    ["econ-13-q10", 3, "Contractionary monetary policy means the central bank raises the interest rate. Borrowing becomes more expensive so households spend less on consumption and firms invest less. Aggregate demand falls from AD1 to AD2, so the average price level falls and demand-pull inflation is reduced, although real GDP also falls."],
    ["econ-15-q4", 3, "A tariff is a tax on imports. It raises the domestic price from Pw to Pw + t. Domestic producers can now supply more because the price is higher, so domestic production rises. Consumers pay a higher price and buy less, so consumer surplus falls. Imports fall."],
    ["econ-6-q16", 2, "A maximum price below the equilibrium means landlords supply fewer flats, while more people want to rent at the lower rent. This creates a shortage (excess demand). Some people cannot find a flat, so there may be waiting lists and black markets, and the quality of flats may fall."],
    ["econ-10-q5", 3, "When consumers are less confident they spend less and save more. Consumption is a component of AD so AD shifts left. Real GDP falls below the full employment level, creating a recessionary gap with higher unemployment, and the price level falls."],
    ["econ-c11a-7", 2, "Paragraph 3 says wages rose and oil import costs rose. Firms' costs of production increase so SRAS shifts to the left. The average price level rises - this is cost-push inflation - and real output falls."],
  ];
  for (const [id, min, ans] of fair) if (byId[id] && IB.offlineMark(byId[id], ans).score < min) errors.push(`marker: fair student answer to ${id} scored below ${min}`);
  const wrong = [
    ["econ-7-q14", "Steel production is a negative production externality so the MSC is below the MPC. The free market underproduces steel compared with the social optimum, so there is underproduction."],
    ["econ-13-q10", "Contractionary monetary policy increases aggregate demand, AD shifts right, so the price level rises."],
    ["econ-c11a-7", "Higher oil costs mean aggregate demand shifts left, price level falls."],
  ];
  for (const [id, ans] of wrong) if (byId[id] && IB.offlineMark(byId[id], ans).score > 1) errors.push(`marker: wrong diagram answer to ${id} scored more than 1`);
}

console.log(`${IB.subjectList().length} subjects, ${IB.subjectList().reduce((n, s) => n + s.allTopics.length, 0)} topics, ${total} bank questions, ${IB.generatorTopics().length} generator topics (${gens} samples checked)`);
for (const s of IB.subjectList()) console.log(`  ${s.name}: ${s.allTopics.length} topics, ${IB.allQuestions(s.id).length} questions`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n - ` + errors.join("\n - "));
  process.exit(1);
}
console.log("All checks passed.");
