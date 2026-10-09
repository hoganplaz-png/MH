/* Economics diagram markscheme database, used by the "Your diagram" panel (js/diagramcheck.js) and the marker.
   Each diagram type lists what an IB examiner checks before awarding the diagram mark(s):
   - items: checklist points. key: true marks the point an examiner treats as essential (e.g. the shift goes the
     right way); missing it caps the diagram marks.
   - errors: common mistakes that lose the diagram mark.
   - kw / topics: how a question is matched to a diagram type (question wording first, then its topic).
   - model: an IB.plot spec for the model diagram (optional).
   Labels follow the IB Economics guide (first assessment 2022): P/Q for markets, "Average price level" and
   "Real GDP" for macro, MSC/MPC/MSB/MPB for externalities. */
(function () {
  const ax = (title, extra) => Object.assign({ title, x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity (Q)", yLabel: "Price (P)" }, extra);
  const dash = (from, to, label, at) => ({ from, to, dash: true, color: "muted", label, labelAt: at || "start" });
  const macro = (title, extra) => ax(title, Object.assign({ xLabel: "Real GDP (Y)", yLabel: "Average price level" }, extra));

  const SD_AXES = { t: "Axes labelled Price (P) and Quantity (Q) (with units or the good named)" };
  const MACRO_AXES = { t: "Axes labelled Average price level (APL) and Real GDP / real output (Y) - not P and Q" };
  const EXT_AXES = { t: "Axes labelled Costs, benefits (or Price) and Quantity (Q)" };
  const REFER = { t: "Diagram is referred to in the written explanation (e.g. \"as shown, S₁ shifts to S₂ …\")" };

  const T = {
    /* ---------------- foundations ---------------- */
    ppc: {
      name: "Production possibilities curve (PPC)", topics: ["econ-1", "econ-8", "econ-11", "econ-18"],
      kw: [/\bppc\b|production possibilit/i, /opportunity cost/i, /actual (and|vs\.?) potential|potential output|capital goods|consumer goods/i],
      items: [
        { t: "Axes labelled with two goods (or capital goods / consumer goods)" },
        { t: "PPC drawn concave (bowed out) to the origin, labelled PPC", tip: "Straight line only if the question says constant opportunity cost." },
        { t: "Points labelled correctly: on the curve = efficient, inside = unemployed/inefficient, outside = unattainable" },
        { t: "The change asked about is shown: movement along the PPC, movement from inside to the curve, or an outward/inward shift PPC₁ → PPC₂ with an arrow", key: true },
        { t: "Opportunity cost / change in output shown with dashed lines to both axes (e.g. Q₁ → Q₂)" },
        REFER,
      ],
      errors: ["Calling a move from inside the PPC to the curve 'potential growth' (it is actual growth)", "Drawing the PPC convex to the origin", "Shifting the PPC out for a fall in unemployment"],
      model: ax("PPC: A → B actual growth, PPC₁ → PPC₂ potential growth", { xLabel: "Consumer goods", yLabel: "Capital goods", curves: [{ f: (x) => (x <= 7 ? 7 * Math.sqrt(1 - (x / 7) ** 2) : NaN), label: "PPC₁", labelX: 5.6 }, { f: (x) => (x <= 9 ? 9 * Math.sqrt(1 - (x / 9) ** 2) : NaN), color: "b", label: "PPC₂", labelX: 7.6 }], points: [{ at: [3, 3], label: "A" }, { at: [4.2, 5.6], label: "B" }] }),
    },
    circular: {
      name: "Circular flow of income", topics: ["econ-1", "econ-9"],
      kw: [/circular flow/i, /injections?|leakages?|withdrawals?/i],
      items: [
        { t: "Households and firms as the two main boxes" },
        { t: "Real flows (factors of production, goods and services) and money flows (incomes, expenditure) shown in opposite directions", key: true },
        { t: "Factor market and product (goods & services) market labelled" },
        { t: "Leakages shown: saving (S) to the financial sector, taxes (T) to government, imports (M) to the foreign sector" },
        { t: "Injections shown: investment (I), government spending (G), exports (X)" },
        { t: "The change asked about is marked (e.g. exports fall → injections < leakages → national income falls)", key: true },
        REFER,
      ],
      errors: ["Arrows for money and real flows in the same direction", "Saving shown as an injection or investment as a leakage"],
    },
    cycle: {
      name: "Business cycle", topics: ["econ-9", "econ-10", "econ-11"],
      kw: [/business cycle|trade cycle|economic cycle/i, /\b(peak|trough|recession|boom|expansion|contraction)\b/i],
      items: [
        { t: "Axes labelled Real GDP (vertical) and Time (horizontal)" },
        { t: "Fluctuating line of actual output, labelled" },
        { t: "Upward-sloping long-term growth trend (potential output) through the middle", key: true },
        { t: "Phases labelled: peak, contraction/recession, trough, expansion/recovery" },
        { t: "Output gaps shown: above trend = inflationary (positive) gap, below trend = deflationary/recessionary (negative) gap" },
        { t: "The country/phase in the question is marked on the cycle", key: true },
        REFER,
      ],
      errors: ["Horizontal trend line (trend output grows over time)", "Calling any fall in the growth rate a recession (a recession is two consecutive quarters of falling real GDP)"],
      model: { title: "Business cycle around the long-term growth trend", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Time", yLabel: "Real GDP", curves: [{ f: (x) => 2 + 0.6 * x, color: "muted", dash: true, label: "trend", labelX: 8.6 }, { f: (x) => 2 + 0.6 * x + 1.3 * Math.sin(x * 1.25), label: "actual", labelX: 6.2 }], texts: [{ at: [1.1, 5.0], text: "peak" }, { at: [3.6, 2.6], text: "trough" }] },
    },

    povcycle: {
      name: "Poverty cycle (poverty trap)", topics: ["econ-18", "econ-12"],
      kw: [/poverty (cycle|trap)/i],
      items: [
        { t: "Circular chain drawn with arrows: low incomes → low saving → low investment (physical and human capital) → low productivity → low incomes", key: true },
        { t: "Each stage labelled with the economic term (saving, investment, human capital, productivity)" },
        { t: "The intervention asked about (e.g. foreign aid, microcredit, education) is marked where it breaks the cycle", key: true },
        { t: "Link to growth and development: higher productivity raises incomes and lets saving and investment continue" },
        REFER,
      ],
      errors: ["A list instead of a cycle (the arrows must return to low incomes)"],
    },

    /* ---------------- markets ---------------- */
    sd: {
      name: "Demand and supply (shift)", topics: ["econ-2", "econ-3", "econ-5", "econ-15"],
      kw: [/demand and supply|supply and demand/i, /\b(shift|increase|decrease|rise|fall) in (demand|supply)\b|demand (curve )?shift|supply (curve )?shift/i, /drought|harvest|technology|income|substitute|complement|taste|population|cost of production|world price of/i],
      items: [
        SD_AXES,
        { t: "Downward-sloping demand (D) and upward-sloping supply (S) curves, labelled" },
        { t: "Initial equilibrium P₁, Q₁ marked with dashed lines to both axes" },
        { t: "The correct curve shifts in the correct direction (D₁ → D₂ or S₁ → S₂), with an arrow", key: true },
        { t: "New equilibrium P₂, Q₂ marked; the changes in P and Q match the explanation" },
        REFER,
      ],
      errors: ["Shifting the demand curve for a change in the good's own price (that is a movement along it)", "Shifting the wrong curve (e.g. demand for a change in costs of production)", "Unlabelled new equilibrium"],
      model: ax("Increase in demand: D₁ → D₂, P and Q rise", { lines: [{ from: [1, 9], to: [9, 1], label: "D₁" }, { from: [2.5, 9.5], to: [9.5, 2.5], label: "D₂", color: "b" }, { from: [1, 1], to: [9, 9], label: "S", color: "c" }, dash([0, 5], [5, 5], "P₁"), dash([0, 6], [6, 6], "P₂"), dash([5, 0], [5, 5], "Q₁"), dash([6, 0], [6, 6], "Q₂")], points: [{ at: [5, 5] }, { at: [6, 6] }] }),
    },
    diseq: {
      name: "Excess demand / excess supply (price mechanism)", topics: ["econ-3"],
      kw: [/price mechanism|excess (demand|supply)|shortage|surplus in a market|eliminat\w* (a )?(surplus|shortage)|signall?ing|rationing|incentive function/i],
      items: [
        SD_AXES,
        { t: "D and S curves labelled with equilibrium Pe, Qe" },
        { t: "A price above Pe (surplus) or below Pe (shortage) drawn as a horizontal line", key: true },
        { t: "Qd and Qs at that price marked; the gap labelled excess supply (Qs − Qd) or excess demand (Qd − Qs)", key: true },
        { t: "Arrows show price moving back to Pe (extension/contraction along the curves)" },
        REFER,
      ],
      errors: ["Shifting a curve to remove the surplus (the price mechanism works by movements along the curves)", "Labelling the gap on the price axis instead of the quantity axis"],
      model: ax("Price above equilibrium: excess supply Qs − Qd", { lines: [{ from: [1, 9], to: [9, 1], label: "D" }, { from: [1, 1], to: [9, 9], label: "S", color: "c" }, { from: [0, 7], to: [7.6, 7], color: "b", label: "P₁", labelAt: "start" }, dash([0, 5], [5, 5], "Pe"), dash([3, 0], [3, 7], "Qd"), dash([7, 0], [7, 7], "Qs")], texts: [{ at: [4.1, 7.4], text: "excess supply" }] }),
    },
    welfare: {
      name: "Consumer and producer surplus (allocative efficiency)", topics: ["econ-3", "econ-6"],
      kw: [/consumer surplus|producer surplus|community surplus|social surplus|allocative(ly)? effic|welfare/i, /\bmsb\s*=\s*msc|marginal benefit equals marginal cost/i],
      items: [
        SD_AXES,
        { t: "D (= MB) and S (= MC) curves labelled; equilibrium P*, Q* marked" },
        { t: "Consumer surplus shaded/labelled: area below D and above P*, up to Q*", key: true },
        { t: "Producer surplus shaded/labelled: area above S and below P*, up to Q*", key: true },
        { t: "Allocative efficiency stated at Q* where MB = MC (community surplus maximised); any welfare loss triangle shown if output differs from Q*" },
        REFER,
      ],
      errors: ["Swapping consumer and producer surplus", "Shading surplus beyond Q*"],
      model: ax("Consumer surplus above P*, producer surplus below P*", { areas: [{ pts: [[1, 9], [5, 5], [0, 5], [0, 9.0]], color: "a", label: "CS", at: [1.6, 6.2] }, { pts: [[0, 1], [1, 1], [5, 5], [0, 5]], color: "c", label: "PS", at: [1.6, 3.6] }], lines: [{ from: [1, 9], to: [9, 1], label: "D = MB" }, { from: [1, 1], to: [9, 9], label: "S = MC", color: "c" }, dash([0, 5], [5, 5], "P*"), dash([5, 0], [5, 5], "Q*")], points: [{ at: [5, 5] }] }),
    },
    utility: {
      name: "Diminishing marginal utility", topics: ["econ-4"],
      kw: [/marginal utility|total utility|\butility\b/i],
      items: [
        { t: "Axes labelled Utility (or MU) and Quantity consumed (Q)" },
        { t: "Marginal utility curve falling as Q rises (and/or total utility rising at a decreasing rate)", key: true },
        { t: "MU = 0 where total utility is at its maximum, if both are drawn" },
        { t: "Link to the downward-sloping demand curve (consumers buy more only at a lower price)" },
        REFER,
      ],
      errors: ["Total utility drawn falling while MU is still positive"],
      model: { title: "Marginal utility falls with each extra unit", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity consumed", yLabel: "Marginal utility", lines: [{ from: [0.5, 9], to: [9, 0.5], label: "MU" }] },
    },

    /* ---------------- elasticities ---------------- */
    "ped-tr": {
      name: "PED and total revenue", topics: ["econ-5"],
      kw: [/total revenue|revenue (rises|falls|increase|decrease)|bumper harvest|raise (its )?price|cut (its )?price|price-?(in)?elastic demand/i],
      items: [
        SD_AXES,
        { t: "Demand curve drawn steep (inelastic) or flat (elastic) to match the case, labelled D (e.g. \"PED < 1\")", key: true },
        { t: "Two prices P₁, P₂ and the matching quantities Q₁, Q₂ marked with dashed lines" },
        { t: "Revenue gained and revenue lost shown as rectangles (P × Q)", key: true },
        { t: "Conclusion about total revenue (rises/falls) matches the PED" },
        REFER,
      ],
      errors: ["Saying demand 'does not change' when it is inelastic", "Using slope to describe elasticity on a linear curve without care (PED varies along a straight line)"],
      model: ax("Inelastic demand: price rise, small fall in Q, TR rises", { areas: [{ pts: [[3.55, 3], [4.45, 3], [4.45, 0], [3.55, 0]], color: "c", label: "lost", at: [3.6, 1.4] }, { pts: [[0, 7], [3.55, 7], [3.55, 3], [0, 3]], color: "b", label: "TR gained", at: [0.6, 5] }], lines: [{ from: [3, 9.5], to: [5, 0.5], label: "D (PED < 1)" }, dash([0, 3], [4.45, 3], "P₁"), dash([0, 7], [3.55, 7], "P₂"), dash([4.45, 0], [4.45, 3], "Q₁"), dash([3.55, 0], [3.55, 7], "Q₂")] }),
    },
    "ped-linear": {
      name: "PED along a straight-line demand curve", topics: ["econ-5"], hl: false,
      kw: [/straight-line demand|linear demand|along a (straight|linear)|unit(ary)? elastic|equal to 1 at every point|rectangular hyperbola|ar and mr|mr and ped/i],
      items: [
        SD_AXES,
        { t: "Straight-line demand curve, with the midpoint marked", key: true },
        { t: "Upper half labelled PED > 1 (elastic), midpoint PED = 1, lower half PED < 1 (inelastic)", key: true },
        { t: "If revenue is asked: MR drawn twice as steep, cutting Q at the midpoint (TR is maximised where MR = 0, PED = 1)" },
        { t: "For unit elasticity at every point: a rectangular hyperbola where every P × Q rectangle has the same area" },
        REFER,
      ],
      errors: ["Saying a straight-line demand curve has a constant PED"],
      model: ax("Linear demand: PED > 1 above the midpoint, < 1 below", { lines: [{ from: [0, 9], to: [9, 0], label: "D = AR" }, { from: [0, 9], to: [4.5, 0], label: "MR", color: "b" }, dash([0, 4.5], [4.5, 4.5], "", "start")], texts: [{ at: [1.4, 7.0], text: "PED > 1" }, { at: [4.7, 4.9], text: "PED = 1" }, { at: [6.6, 2.0], text: "PED < 1" }] }),
    },
    pes: {
      name: "Price elasticity of supply (PES)", topics: ["econ-5"],
      kw: [/elasticity of supply|\bpes\b|supply .*(more|less) (price )?elastic|long run than in the short run|three straight-line supply|commodit(y|ies)|agricultur|volatil/i],
      items: [
        SD_AXES,
        { t: "Supply curve(s) with the right steepness: steep/inelastic (short run, agriculture) vs flat/elastic (long run, manufactures), labelled", key: true },
        { t: "For straight lines through the origin: PES = 1; cutting the price axis: PES > 1; cutting the quantity axis: PES < 1" },
        { t: "If a demand shift is shown: D₁ → D₂ with the price and quantity changes marked on both supply curves" },
        { t: "Large price change / small quantity change identified for inelastic supply" },
        REFER,
      ],
      errors: ["Judging PES by steepness alone for straight lines through the origin (all have PES = 1)"],
      model: ax("Short run (inelastic) vs long run (elastic) supply", { lines: [{ from: [1, 9], to: [9, 1], label: "D₁" }, { from: [2.5, 9.5], to: [9.5, 2.5], label: "D₂", color: "b" }, { from: [4.2, 1], to: [5.6, 9], label: "S(SR)", color: "c" }, { from: [1, 3.7], to: [9, 6.3], label: "S(LR)", color: "c", dash: false }] }),
    },

    /* ---------------- government intervention ---------------- */
    tax: {
      name: "Indirect tax (specific / ad valorem)", topics: ["econ-6", "econ-7", "econ-5"],
      kw: [/indirect tax|excise|specific tax|ad valorem|sugar tax|carbon tax|tax (on|per unit)|tax incidence|burden of (the )?tax|tax revenue/i],
      items: [
        SD_AXES,
        { t: "Original D and S₁ with equilibrium P₁, Q₁" },
        { t: "Supply shifts up/left to S₁ + tax: parallel for a specific tax, pivoting (diverging) for an ad valorem tax", key: true },
        { t: "Price paid by consumers (Pc) and price received by producers (Pp) marked; vertical gap = tax per unit; new quantity Q₂", key: true },
        { t: "Government revenue rectangle (Pc − Pp) × Q₂ shown, split into consumer and producer incidence" },
        { t: "Welfare (deadweight) loss triangle between Q₂ and Q₁ shaded" },
        REFER,
      ],
      errors: ["Shifting demand for a tax", "Making the whole tax fall on consumers (Pc rising by the full tax) unless demand is perfectly inelastic", "Drawing the tax revenue rectangle up to Q₁ instead of Q₂"],
      model: ax("Specific tax: consumers pay Pc, producers receive Pp", { areas: [{ pts: [[0, 6], [4, 6], [4, 4], [0, 4]], color: "b", label: "tax revenue", at: [0.5, 5] }, { pts: [[4, 6], [5, 5], [4, 4]], color: "c", label: "", at: [4.2, 5] }], lines: [{ from: [1, 9], to: [9, 1], label: "D" }, { from: [1, 1], to: [9, 9], label: "S₁", color: "c" }, { from: [1, 3], to: [8, 10], label: "S₁ + tax", color: "b" }, dash([0, 6], [4, 6], "Pc"), dash([0, 4], [4, 4], "Pp"), dash([4, 0], [4, 6], "Q₂"), dash([5, 0], [5, 5], "Q₁")] }),
    },
    subsidy: {
      name: "Subsidy", topics: ["econ-6", "econ-7", "econ-15"],
      kw: [/subsid/i],
      items: [
        SD_AXES,
        { t: "Original D and S with equilibrium P₁, Q₁" },
        { t: "Supply shifts down/right to S + subsidy, with the vertical gap = subsidy per unit", key: true },
        { t: "New lower price paid by consumers (Pc), price received by producers (Pp = Pc + subsidy) and higher quantity Q₂ marked", key: true },
        { t: "Cost to government rectangle (Pp − Pc) × Q₂ shown" },
        { t: "Welfare loss shown if the market was efficient before (over-allocation), or welfare gain if correcting a positive externality" },
        REFER,
      ],
      errors: ["Shifting demand for a producer subsidy", "Drawing the government cost rectangle with Q₁"],
      model: ax("Subsidy: S₁ → S₁ − subsidy, Pc falls, Q rises", { areas: [{ pts: [[0, 7], [5, 7], [5, 5], [0, 5]], color: "b", label: "cost to govt", at: [0.4, 6] }], lines: [{ from: [1, 9], to: [9, 1], label: "D" }, { from: [1, 3], to: [8, 10], label: "S₁", color: "c" }, { from: [1, 1], to: [9, 9], label: "S₁ − subsidy", color: "b" }, dash([0, 7], [5, 7], "Pp"), dash([0, 5], [5, 5], "Pc"), dash([5, 0], [5, 7], "Q₂"), dash([4, 0], [4, 6], "Q₁")] }),
    },
    ceiling: {
      name: "Price ceiling (maximum price)", topics: ["econ-6"],
      kw: [/price ceiling|maximum price|rent control|price cap/i],
      items: [
        SD_AXES,
        { t: "D and S with equilibrium Pe, Qe" },
        { t: "Ceiling drawn as a horizontal line BELOW equilibrium, labelled Pmax", key: true },
        { t: "Qs and Qd at Pmax marked; shortage (excess demand) Qd − Qs labelled", key: true },
        { t: "Welfare loss triangle (between Qs and Qe) and/or changes in consumer and producer surplus shown if asked" },
        REFER,
      ],
      errors: ["Drawing the ceiling above equilibrium", "Labelling the shortage on the price axis"],
      model: ax("Maximum price below equilibrium: shortage Qd − Qs", { lines: [{ from: [1, 9], to: [9, 1], label: "D" }, { from: [1, 1], to: [9, 9], label: "S", color: "c" }, { from: [0, 3], to: [9, 3], color: "b", label: "Pmax", labelAt: "start" }, dash([0, 5], [5, 5], "Pe"), dash([3, 0], [3, 3], "Qs"), dash([7, 0], [7, 3], "Qd")], texts: [{ at: [3.6, 2.3], text: "shortage" }] }),
    },
    floor: {
      name: "Price floor (minimum price)", topics: ["econ-6"],
      kw: [/price floor|minimum price|price support|guaranteed price|buys? (up )?the surplus/i],
      items: [
        SD_AXES,
        { t: "D and S with equilibrium Pe, Qe" },
        { t: "Floor drawn as a horizontal line ABOVE equilibrium, labelled Pmin", key: true },
        { t: "Qd and Qs at Pmin marked; surplus (excess supply) Qs − Qd labelled", key: true },
        { t: "If the government buys the surplus: cost to government rectangle Pmin × (Qs − Qd); welfare loss shown" },
        REFER,
      ],
      errors: ["Drawing the floor below equilibrium", "Forgetting the cost of buying and storing the surplus"],
      model: ax("Minimum price above equilibrium: surplus Qs − Qd", { areas: [{ pts: [[3, 7], [7, 7], [7, 0], [3, 0]], color: "b", label: "govt spending", at: [3.6, 3] }], lines: [{ from: [1, 9], to: [9, 1], label: "D" }, { from: [1, 1], to: [9, 9], label: "S", color: "c" }, { from: [0, 7], to: [9, 7], color: "b", label: "Pmin", labelAt: "start" }, dash([0, 5], [5, 5], "Pe")], texts: [{ at: [3.4, 7.5], text: "surplus" }] }),
    },
    minwage: {
      name: "Labour market / minimum wage", topics: ["econ-6", "econ-11", "econ-14"],
      kw: [/minimum wage|labour market|labor market|structural unemployment|wage rate|real-wage|demand for labour/i],
      items: [
        { t: "Axes labelled Wage rate (W) and Quantity of labour (QL)" },
        { t: "Demand for labour (DL) and supply of labour (SL) labelled; equilibrium We, Qe" },
        { t: "The change is shown: minimum wage line ABOVE We, or DL shifting left in a declining industry", key: true },
        { t: "Unemployment / excess supply of labour marked (QS − QD at the minimum wage, or the fall in employment)", key: true },
        { t: "Workers who keep jobs (higher wage) vs workers who lose jobs identified" },
        REFER,
      ],
      errors: ["Swapping the labour demand and supply curves (firms demand labour)", "Minimum wage drawn below the equilibrium wage"],
      model: ax("Minimum wage above We: unemployment QS − QD", { xLabel: "Quantity of labour", yLabel: "Wage rate", lines: [{ from: [1, 9], to: [9, 1], label: "DL" }, { from: [1, 1], to: [9, 9], label: "SL", color: "c" }, { from: [0, 7], to: [9, 7], color: "b", label: "Wmin", labelAt: "start" }, dash([0, 5], [5, 5], "We"), dash([3, 0], [3, 7], "QD"), dash([7, 0], [7, 7], "QS")], texts: [{ at: [3.4, 7.5], text: "unemployment" }] }),
    },

    /* ---------------- market failure ---------------- */
    "ext-np": {
      name: "Negative production externality", topics: ["econ-7"],
      kw: [/negative (production )?externalit(y|ies) of production|negative production externalit|pollut|carbon|emission|coal|factory|overproduc|over-produc|external costs? of production/i],
      items: [
        EXT_AXES,
        { t: "MPB = MSB (demand) and MPC (supply) labelled" },
        { t: "MSC drawn ABOVE MPC (vertical gap = external cost)", key: true },
        { t: "Free-market output Qm (MPB = MPC) and socially optimal Qopt (MSB = MSC) marked, with Qm > Qopt", key: true },
        { t: "Welfare loss triangle between Qopt and Qm, pointing towards Qopt, shaded" },
        { t: "If a policy is asked: tax shifts MPC up to MSC (or regulation cuts Q to Qopt)" },
        REFER,
      ],
      errors: ["Drawing MSC below MPC", "Welfare loss triangle pointing the wrong way (it points to Qopt)", "Labelling curves S and D only"],
      model: ax("Negative production externality: Qm > Qopt", { xLabel: "Quantity (Q)", yLabel: "Costs, benefits", areas: [{ pts: [[4.1, 5.9], [5.27, 7.05], [5.27, 4.73]], color: "b", label: "welfare loss", at: [5.5, 6.4] }], lines: [{ from: [1, 9], to: [9, 1], label: "MPB = MSB" }, { from: [1, 1], to: [9, 8], label: "MPC", color: "c" }, { from: [1, 3], to: [8.5, 10], label: "MSC", color: "b" }, dash([4.1, 0], [4.1, 5.9], "Qopt"), dash([5.27, 0], [5.27, 4.73], "Qm")] }),
    },
    "ext-nc": {
      name: "Negative consumption externality", topics: ["econ-7"],
      kw: [/negative consumption externalit|externalit(y|ies) of consumption|demerit|smok|cigarett|alcohol|sugar|plastic bags?|second-hand smoke|overconsum|over-consum/i],
      items: [
        EXT_AXES,
        { t: "MPC = MSC (supply) and MPB (demand) labelled" },
        { t: "MSB drawn BELOW MPB (vertical gap = external cost)", key: true },
        { t: "Qm (MPB = MPC) and Qopt (MSB = MSC) marked, with Qm > Qopt", key: true },
        { t: "Welfare loss triangle between Qopt and Qm, pointing towards Qopt, shaded" },
        { t: "If a policy is asked: tax / advertising / regulation moves output to Qopt" },
        REFER,
      ],
      errors: ["Drawing MSB above MPB", "Shifting MSC instead of MSB for a consumption externality"],
      model: ax("Negative consumption externality: Qm > Qopt", { xLabel: "Quantity (Q)", yLabel: "Costs, benefits", areas: [{ pts: [[4, 4], [5, 5], [5, 3]], color: "b", label: "", at: [5, 4] }], lines: [{ from: [1, 9], to: [9, 1], label: "MPB" }, { from: [1, 7], to: [8, 0], label: "MSB", color: "b" }, { from: [1, 1], to: [9, 9], label: "MPC = MSC", color: "c" }, dash([4, 0], [4, 4], "Qopt"), dash([5, 0], [5, 5], "Qm")] }),
    },
    "ext-pp": {
      name: "Positive production externality", topics: ["econ-7", "econ-8"],
      kw: [/positive production externalit|externalit(y|ies) of production.*positive|training|research and development|\br&d\b|scientific research|bees|beekeep/i],
      items: [
        EXT_AXES,
        { t: "MPB = MSB (demand) and MPC (supply) labelled" },
        { t: "MSC drawn BELOW MPC (vertical gap = external benefit)", key: true },
        { t: "Qm (MPB = MPC) and Qopt (MSB = MSC) marked, with Qm < Qopt (under-production)", key: true },
        { t: "Welfare loss triangle between Qm and Qopt, pointing towards Qopt, shaded" },
        { t: "If a policy is asked: subsidy shifts MPC down to MSC, or direct provision" },
        REFER,
      ],
      errors: ["Drawing MSC above MPC", "Showing over-production for a positive externality"],
      model: ax("Positive production externality: Qm < Qopt", { xLabel: "Quantity (Q)", yLabel: "Costs, benefits", areas: [{ pts: [[4, 6], [4, 4], [5, 5]], color: "b", label: "", at: [5, 5] }], lines: [{ from: [1, 9], to: [9, 1], label: "MPB = MSB" }, { from: [0, 2], to: [8, 10], label: "MPC", color: "c" }, { from: [1, 1], to: [9, 9], label: "MSC", color: "b" }, dash([4, 0], [4, 6], "Qm"), dash([5, 0], [5, 5], "Qopt")] }),
    },
    "ext-pc": {
      name: "Positive consumption externality (merit good)", topics: ["econ-7", "econ-8"],
      kw: [/positive consumption externalit|merit good|vaccin|educat|health ?care|immunis|immuniz|under-?consum|external benefits? of consumption/i],
      items: [
        EXT_AXES,
        { t: "MPC = MSC (supply) and MPB (demand) labelled" },
        { t: "MSB drawn ABOVE MPB (vertical gap = external benefit)", key: true },
        { t: "Qm (MPB = MPC) and Qopt (MSB = MSC) marked, with Qm < Qopt (under-consumption)", key: true },
        { t: "Welfare loss triangle between Qm and Qopt, pointing towards Qopt, shaded" },
        { t: "If a policy is asked: subsidy, advertising or legislation moves output to Qopt" },
        REFER,
      ],
      errors: ["Drawing MSB below MPB", "Shifting MSC for a consumption externality"],
      model: ax("Positive consumption externality: Qm < Qopt", { xLabel: "Quantity (Q)", yLabel: "Costs, benefits", areas: [{ pts: [[4, 8], [4, 6], [5, 7]], color: "b", label: "", at: [5, 6] }], lines: [{ from: [1, 9], to: [9, 1], label: "MPB" }, { from: [2, 10], to: [10, 2], label: "MSB", color: "b" }, { from: [0, 2], to: [8, 10], label: "MPC = MSC", color: "c" }, dash([4, 0], [4, 6], "Qm"), dash([5, 0], [5, 7], "Qopt")] }),
    },
    permits: {
      name: "Tradable permits (cap and trade)", topics: ["econ-7"],
      kw: [/tradable permit|tradeable permit|cap.and.trade|pollution permit|emissions? trading|permit price/i],
      items: [
        { t: "Axes labelled Price of permits and Quantity of permits (or pollution)" },
        { t: "Supply of permits drawn VERTICAL at the cap set by the government, labelled", key: true },
        { t: "Demand for permits downward sloping, labelled; equilibrium permit price marked", key: true },
        { t: "The change asked about is shown (demand rises → price rises; cap cut → supply shifts left → price rises)" },
        REFER,
      ],
      errors: ["Upward-sloping permit supply curve (the quantity is fixed by the cap)"],
      model: ax("Tradable permits: fixed supply (cap); demand sets the price", { xLabel: "Quantity of permits", yLabel: "Price of permits", lines: [{ from: [5, 0.5], to: [5, 9.5], label: "S (cap)", color: "c" }, { from: [1, 9], to: [9, 1], label: "D₁" }, { from: [2, 10], to: [10, 2], label: "D₂", color: "b" }, dash([0, 5], [5, 5], "P₁"), dash([0, 7], [5, 7], "P₂")] }),
    },
    public: {
      name: "Public good (missing market)", topics: ["econ-8"],
      kw: [/public goods?|free.rider|non-?excludab|non-?rival|missing market/i],
      items: [
        EXT_AXES,
        { t: "MSB (demand/benefit to society) and MSC (supply) labelled" },
        { t: "Free-market quantity shown as zero or very low (no private firm supplies it: free riders)", key: true },
        { t: "Socially optimal quantity Qopt where MSB = MSC marked", key: true },
        { t: "Welfare loss shown between the market quantity and Qopt; government provision moves output to Qopt" },
        REFER,
      ],
      errors: ["Defining a public good by who provides it (it is non-rival and non-excludable)"],
    },

    /* ---------------- theory of the firm (HL) ---------------- */
    cost: {
      name: "Cost curves (HL)", topics: ["econ-h1"], hl: true,
      kw: [/cost curves?|average (total )?cost|\batc\b|\bavc\b|\bafc\b|total fixed cost|long-run average cost|\blrac\b|economies of scale|diseconomies/i],
      items: [
        { t: "Axes labelled Costs / revenue ($) and Output (Q)" },
        { t: "Short run: MC cuts AVC and ATC at their minimum points", key: true },
        { t: "ATC − AVC gap (= AFC) narrows as output rises; TFC horizontal, TVC and TC parallel (if totals drawn)" },
        { t: "Long run: LRAC U-shaped, economies of scale on the falling part, diseconomies on the rising part, minimum efficient scale marked", opt: true },
        REFER,
      ],
      errors: ["MC not passing through the minimum of ATC/AVC", "AVC and ATC drawn converging into one curve"],
    },
    pc: {
      name: "Perfect competition (HL)", topics: ["econ-h2"], hl: true,
      kw: [/perfect(ly)? competit|price taker|monopolistic competition/i, /normal profit|shut.down|break.even/i],
      items: [
        { t: "Two panels: industry (S and D) and firm (MC, ATC, horizontal D = AR = MR), price carried across", key: true },
        { t: "Firm produces where MC = MR (profit maximisation)", key: true },
        { t: "Profit/loss rectangle between AR and ATC at the profit-maximising output shaded" },
        { t: "Long-run adjustment: entry/exit shifts industry supply until P = minimum ATC (normal profit)", opt: true },
        { t: "For monopolistic competition: downward-sloping AR/MR, LR tangency of AR with ATC" },
        REFER,
      ],
      errors: ["Firm demand curve downward sloping in perfect competition", "Producing where AR = ATC instead of MC = MR"],
    },
    monopoly: {
      name: "Monopoly (HL)", topics: ["econ-h2"], hl: true,
      kw: [/\bmonopol(y|ies|ist|ists)\b(?! competition)|natural monopoly|oligopol|kinked demand|market power/i, /revenue.maximi|profit.maximising monopol/i],
      items: [
        { t: "Axes labelled Costs / revenue and Output (Q)" },
        { t: "Downward-sloping AR = D and MR (twice as steep), MC and ATC labelled", key: true },
        { t: "Profit-maximising output where MC = MR; price read up to the AR curve", key: true },
        { t: "Abnormal profit rectangle (AR − ATC) × Q shaded" },
        { t: "Welfare loss vs the allocatively efficient output (P = MC) shown if asked; natural monopoly: LRAC still falling where it meets demand" },
        REFER,
      ],
      errors: ["Reading the price off the MR curve", "MC not cutting ATC at its minimum"],
      model: ax("Monopoly: MC = MR at Qm, price from AR", { xLabel: "Output (Q)", yLabel: "Costs, revenue", lines: [{ from: [0, 9], to: [9, 0], label: "AR = D" }, { from: [0, 9], to: [4.5, 0], label: "MR", color: "b" }, { from: [1, 1], to: [7, 9], label: "MC", color: "c" }, dash([3, 0], [3, 6], "Qm"), dash([0, 6], [3, 6], "Pm")] }),
    },

    /* ---------------- macro ---------------- */
    ad: {
      name: "AD/AS: change in aggregate demand", topics: ["econ-10", "econ-11", "econ-13", "econ-h3", "econ-9"],
      kw: [/\bad\/as\b|ad-as|aggregate demand/i, /demand-pull|recession|confidence|investment|consumer spending|expansionary|contractionary|monetary policy|fiscal policy|interest rates?|multiplier|recessionary gap|deflationary gap|inflationary gap|government spending/i],
      items: [
        MACRO_AXES,
        { t: "AD, SRAS and LRAS (or Keynesian AS) labelled; initial equilibrium at APL₁, Y₁" },
        { t: "AD shifts in the correct direction (AD₁ → AD₂), with an arrow", key: true },
        { t: "New equilibrium APL₂, Y₂ marked with dashed lines" },
        { t: "Potential output (Yp / Yf at LRAS) marked, with any recessionary or inflationary gap identified" },
        REFER,
      ],
      errors: ["Axes labelled P and Q", "Shifting SRAS for a change in spending", "Drawing LRAS as upward sloping"],
      model: macro("AD falls: recessionary gap below potential output Yp", { lines: [{ from: [1, 9], to: [9, 1], label: "AD₁" }, { from: [0.5, 7.5], to: [7.5, 0.5], label: "AD₂", color: "b" }, { from: [1, 1.5], to: [9, 9], label: "SRAS", color: "c" }, { from: [4.87, 0], to: [4.87, 9.5], label: "LRAS", color: "muted" }, dash([3.84, 0], [3.84, 4.16], "Y₂")], texts: [{ at: [5.05, 0.4], text: "Yp" }] }),
    },
    sras: {
      name: "AD/AS: change in short-run aggregate supply", topics: ["econ-10", "econ-11"],
      kw: [/\bsras\b|short-run aggregate supply|cost-push|stagflation|oil price|price of oil|energy prices?|raw material|wage costs?|supply shock/i],
      items: [
        MACRO_AXES,
        { t: "AD, SRAS₁ (and LRAS) labelled; initial equilibrium APL₁, Y₁" },
        { t: "SRAS shifts in the correct direction (SRAS₁ → SRAS₂, left for higher costs), with an arrow", key: true },
        { t: "New equilibrium: higher APL₂ and lower Y₂ for a cost increase (stagflation)", key: true },
        { t: "Gap between Y₂ and potential output identified" },
        REFER,
      ],
      errors: ["Shifting LRAS for a short-run cost change", "Showing output rising after a cost increase"],
      model: macro("Cost-push: SRAS₁ → SRAS₂, APL rises, real GDP falls", { lines: [{ from: [1, 9], to: [9, 1], label: "AD" }, { from: [1, 1], to: [9, 9], label: "SRAS₁", color: "c" }, { from: [0, 2], to: [8, 10], label: "SRAS₂", color: "b" }, dash([0, 5], [5, 5], "APL₁"), dash([0, 6], [4, 6], "APL₂"), dash([5, 0], [5, 5], "Y₁"), dash([4, 0], [4, 6], "Y₂")] }),
    },
    lras: {
      name: "AD/AS: long-run aggregate supply / potential output", topics: ["econ-10", "econ-14", "econ-18", "econ-11"],
      kw: [/\blras\b|long-run aggregate supply|potential output|supply-side|productive capacity|full employment level|immigration|automation|infrastructure|productivity|good deflation|long-run (macroeconomic )?equilibrium|monetarist|new classical|return to its potential/i],
      items: [
        MACRO_AXES,
        { t: "Vertical LRAS at potential output (Yp / Yfe), AD and SRAS labelled", key: true },
        { t: "The change asked about: LRAS₁ → LRAS₂ shifting right (with SRAS), or the economy returning to Yp as SRAS adjusts", key: true },
        { t: "New equilibrium with higher real GDP; APL stable or lower if AD is unchanged" },
        { t: "Output gap closing / potential growth identified" },
        REFER,
      ],
      errors: ["Drawing LRAS upward sloping in the monetarist/new classical model", "Shifting AD for a supply-side policy"],
      model: macro("Supply-side growth: LRAS₁ → LRAS₂", { lines: [{ from: [1, 9], to: [9, 1], label: "AD" }, { from: [4, 0.5], to: [4, 9.5], label: "LRAS₁", color: "c" }, { from: [6, 0.5], to: [6, 9.5], label: "LRAS₂", color: "b" }, dash([0, 6], [4, 6], "APL₁"), dash([0, 4], [6, 4], "APL₂")] }),
    },
    keynes: {
      name: "Keynesian AD/AS", topics: ["econ-10", "econ-13"],
      kw: [/keynesian/i],
      items: [
        MACRO_AXES,
        { t: "Keynesian AS with three sections: horizontal (spare capacity), upward sloping, vertical at Yf", key: true },
        { t: "AD shift drawn in the section the question needs (e.g. horizontal: real GDP rises with no inflation)", key: true },
        { t: "Initial and new equilibrium APL and Y marked; full-employment output Yf labelled" },
        { t: "Deflationary/recessionary gap or inflationary pressure identified" },
        REFER,
      ],
      errors: ["Missing the horizontal section", "Showing an equilibrium beyond Yf"],
      model: { title: "Keynesian AS: horizontal, rising, vertical at Yf", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Real GDP (Y)", yLabel: "Average price level", curves: [{ f: (x) => (x <= 4 ? 2 : x < 7.6 ? 2 + 0.3 * (x - 4) ** 2 : NaN), color: "c", label: "AS", labelX: 7 }], lines: [{ from: [7.6, 5.9], to: [7.6, 9.8], color: "c" }, { from: [0.5, 5.5], to: [5.5, 0.5], label: "AD₁" }, { from: [2.5, 7.5], to: [7.5, 2.5], label: "AD₂", color: "b" }], texts: [{ at: [7.7, 0.5], text: "Yf" }] },
    },
    deflation: {
      name: "AD/AS: deflation (good vs bad)", topics: ["econ-11"],
      kw: [/deflation/i],
      items: [
        MACRO_AXES,
        { t: "Bad deflation: AD shifts left, APL falls AND real GDP falls", key: true },
        { t: "Good deflation: SRAS/LRAS shift right, APL falls while real GDP rises", key: true },
        { t: "Both equilibria labelled (APL₁ → APL₂, Y₁ → Y₂), two diagrams or clearly separated shifts" },
        { t: "Link: falling output → unemployment (bad) vs productivity gains (good)" },
        REFER,
      ],
      errors: ["Showing only one cause when the question asks to distinguish"],
    },
    lorenz: {
      name: "Lorenz curve", topics: ["econ-12"],
      kw: [/lorenz|gini/i],
      items: [
        { t: "Axes labelled Cumulative % of population and Cumulative % of income, both 0-100" },
        { t: "45° line of perfect equality, labelled", key: true },
        { t: "Lorenz curve(s) bowed below the line of equality, labelled (e.g. before/after tax, year 1/year 2)", key: true },
        { t: "Shift in the right direction: towards the diagonal = less inequality, away = more" },
        { t: "Gini = A / (A + B) shown with areas A and B labelled, if asked" },
        REFER,
      ],
      errors: ["Lorenz curve drawn above the line of equality", "Gini computed as B / A"],
      model: { title: "Lorenz curve: closer to the diagonal = more equal", x: [0, 100], y: [0, 100], origin: false, grid: false, xLabel: "Cumulative % of population", yLabel: "Cumulative % of income", lines: [{ from: [0, 0], to: [100, 100], label: "line of equality", color: "muted" }], curves: [{ f: (x) => 100 * Math.pow(x / 100, 2.2), label: "Lorenz₁", labelX: 72 }, { f: (x) => 100 * Math.pow(x / 100, 1.5), color: "b", dash: true, label: "Lorenz₂", labelX: 55 }] },
    },
    phillips: {
      name: "Phillips curve (HL)", topics: ["econ-h3", "econ-11"], hl: true,
      kw: [/phillips|\bsrpc\b|\blrpc\b|natural rate of unemployment|\bnrfu\b|\bnru\b/i],
      items: [
        { t: "Axes labelled Inflation rate (%) and Unemployment rate (%)" },
        { t: "Downward-sloping SRPC labelled", key: true },
        { t: "Vertical LRPC at the natural rate of unemployment (NRU), labelled", key: true },
        { t: "Movement along SRPC and shift SRPC₁ → SRPC₂ as inflation expectations change, if asked" },
        REFER,
      ],
      errors: ["Upward-sloping Phillips curve", "LRPC drawn anywhere other than the NRU"],
      model: { title: "Short-run and long-run Phillips curves", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Unemployment rate (%)", yLabel: "Inflation rate (%)", curves: [{ f: (x) => 1 + 8 / (x + 0.2), label: "SRPC₁", labelX: 8 }, { f: (x) => 3 + 8 / (x + 0.2), color: "b", label: "SRPC₂", labelX: 7.2 }], lines: [{ from: [4, 0.3], to: [4, 9.8], label: "LRPC", color: "c" }], texts: [{ at: [4.1, 0.4], text: "NRU" }] },
    },
    money: {
      name: "Money market (interest rates)", topics: ["econ-13"],
      kw: [/money market|money supply|demand for money|open market operation|central bank.*interest/i],
      items: [
        { t: "Axes labelled Interest rate (i) and Quantity of money (Qm)" },
        { t: "Money supply (Sm) vertical, demand for money (Dm) downward sloping, labelled", key: true },
        { t: "Shift of Sm (central bank action) or Dm in the right direction; new interest rate i₂ marked", key: true },
        { t: "Link to AD: lower i → more C and I → AD rises (or the reverse)" },
        REFER,
      ],
      errors: ["Upward-sloping money supply curve"],
      model: { title: "Money market: Sm₁ → Sm₂ lowers the interest rate", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity of money", yLabel: "Interest rate", lines: [{ from: [1, 9], to: [9, 1], label: "Dm" }, { from: [4, 0.5], to: [4, 9.5], label: "Sm₁", color: "c" }, { from: [6, 0.5], to: [6, 9.5], label: "Sm₂", color: "b" }, dash([0, 6], [4, 6], "i₁"), dash([0, 4], [6, 4], "i₂")] },
    },

    /* ---------------- international ---------------- */
    tariff: {
      name: "Tariff", topics: ["econ-15"],
      kw: [/tariff|import (tax|duty)/i],
      items: [
        SD_AXES,
        { t: "Domestic D and domestic S labelled; world price Pw drawn horizontal below the domestic equilibrium" },
        { t: "Pw + tariff drawn above Pw, labelled", key: true },
        { t: "Quantities Q₁-Q₄ marked: domestic supply rises (Q₁ → Q₂), demand falls (Q₄ → Q₃), imports fall from Q₁Q₄ to Q₂Q₃", key: true },
        { t: "Tariff revenue rectangle and the two welfare loss triangles shaded" },
        REFER,
      ],
      errors: ["Shifting the domestic supply curve for a tariff", "Tariff revenue drawn across the whole quantity demanded"],
      model: ax("Tariff: Pw → Pw + t, imports fall", { lines: [{ from: [1, 9], to: [9, 1], label: "D dom" }, { from: [1, 1], to: [9, 9], label: "S dom", color: "c" }, { from: [0, 2.5], to: [10, 2.5], label: "Pw", color: "b" }, { from: [0, 4], to: [10, 4], label: "Pw + t", color: "b", dash: true }, dash([2.5, 0], [2.5, 2.5], "Q₁"), dash([4, 0], [4, 4], "Q₂"), dash([6, 0], [6, 4], "Q₃"), dash([7.5, 0], [7.5, 2.5], "Q₄")] }),
    },
    quota: {
      name: "Import quota", topics: ["econ-15"],
      kw: [/quota|import restrictions?/i],
      items: [
        SD_AXES,
        { t: "Domestic D and S with world price Pw below domestic equilibrium" },
        { t: "Supply curve S dom + quota drawn parallel to S dom, starting where imports equal the quota", key: true },
        { t: "New higher price Pq and quantities marked; imports limited to the quota", key: true },
        { t: "Quota rent (gain to importers/foreign firms) and welfare loss areas shaded" },
        REFER,
      ],
      errors: ["Showing government revenue for a quota (there is none unless licences are auctioned)"],
    },
    "trade-sub": {
      name: "Production subsidy / free trade gains", topics: ["econ-15", "econ-16"],
      kw: [/free trade|world price|gains from trade|production subsidy.*(domestic|import)|export subsid|dumping|trade creation|trade diversion/i],
      items: [
        SD_AXES,
        { t: "Domestic D and S with the world price Pw marked" },
        { t: "The change asked about drawn correctly (e.g. free trade at Pw: imports = Qd − Qs; subsidy shifts domestic S right; trade creation lowers the price)", key: true },
        { t: "Quantities produced domestically, consumed and imported labelled before and after", key: true },
        { t: "Changes in consumer/producer surplus, government cost or welfare loss shaded" },
        REFER,
      ],
      errors: ["Forgetting that the world price stays the same for a small economy"],
    },
    exrate: {
      name: "Exchange rate (currency market)", topics: ["econ-17"],
      kw: [/exchange.rate|currency|apprecia|deprecia|devalu|revalu|forex|foreign exchange/i],
      items: [
        { t: "Axes labelled Price of currency X in terms of currency Y (e.g. USD per EUR) and Quantity of currency X" },
        { t: "Demand for and supply of the currency labelled (D€, S€)" },
        { t: "The correct curve shifts in the correct direction (e.g. higher interest rates → demand for the currency rises)", key: true },
        { t: "New exchange rate marked; appreciation or depreciation named correctly", key: true },
        { t: "For intervention: the central bank buying/selling the currency shown as the shift" },
        REFER,
      ],
      errors: ["Axes labelled P and Q only", "Calling a rise in the currency's price a depreciation"],
      model: { title: "Demand for the currency rises: appreciation", x: [0, 10], y: [0, 10], origin: false, grid: false, xLabel: "Quantity of €", yLabel: "$ per €", lines: [{ from: [1, 9], to: [9, 1], label: "D€₁" }, { from: [2.5, 9.5], to: [9.5, 2.5], label: "D€₂", color: "b" }, { from: [1, 1], to: [9, 9], label: "S€", color: "c" }, dash([0, 5], [5, 5], "ER₁"), dash([0, 6], [6, 6], "ER₂")], points: [{ at: [5, 5] }, { at: [6, 6] }] },
    },
    jcurve: {
      name: "J-curve (HL)", topics: ["econ-h4", "econ-17"], hl: true,
      kw: [/j-curve|j curve|marshall-lerner/i],
      items: [
        { t: "Axes labelled Current account balance (+/−) and Time; depreciation marked at a point in time" },
        { t: "Current account worsens first (dip), then improves above the starting level", key: true },
        { t: "Explanation: PED for exports/imports is low in the short run, higher in the long run (Marshall-Lerner: PEDx + PEDm > 1)", key: true },
        REFER,
      ],
      errors: ["Showing an immediate improvement after a depreciation"],
      model: { title: "J-curve after a depreciation", x: [0, 10], y: [-5, 5], origin: true, grid: false, xLabel: "Time", yLabel: "Current account", curves: [{ f: (x) => (x < 2 ? -1 : -1 - 3 * (x - 2) * Math.exp(2 - x) + 0.6 * (x - 2)), label: "CA", labelX: 9 }], vlines: [{ x: 2, label: "depreciation" }] },
    },
    compadv: {
      name: "Comparative advantage (HL)", topics: ["econ-h4", "econ-15"], hl: true,
      kw: [/comparative advantage|absolute advantage|specialis|specializ/i],
      items: [
        { t: "Two PPCs (one per country) on the same axes, two goods labelled" },
        { t: "Different slopes show different opportunity costs", key: true },
        { t: "Each country specialises in the good with the lower opportunity cost", key: true },
        { t: "Trading possibilities / consumption beyond each PPC shown" },
        REFER,
      ],
      errors: ["Confusing absolute advantage (more output) with comparative advantage (lower opportunity cost)"],
    },
  };

  // A diagram mark is earned by drawing it; written answers rarely say all of this, so the marker hands these
  // markscheme points to the diagram checklist when a student uploads a diagram.
  const DIAGRAM_POINT = /^\s*(diagram|labels?|correct(ly)? label|labelled|axes|graph)\b|\b(diagram|labell?ed|axes)\b|\b(shaded|identified|marked|drawn)\b.*\b(curve|area|line|axis|axes|rectangle|triangle|ppc)\b|\b(curve|ppc|lorenz curve|rectangle|triangle)\b.*\b(shaded|identified|marked|drawn|labell?ed)\b/i;
  const GEOMETRY = /\b(MSC|MSB|MPC|MPB|AR|MR|MC|ATC|AVC|LRAC|SRAS|LRAS|AD|AS|PPC|Dm|Sm|SRPC|LRPC|D|S|D₁|S₁|DL|SL|MP|AP)\b[^.]{0,60}(above|below|shifts?|shifting|→|tangent|cutting|through|parallel|diverging|vertical|downward|upward|with|and)\b/;
  const ASKS = /\b(diagram|draw|sketch|illustrate|graph)\b/i;

  // Questions whose wording would mislead the keyword ranking.
  const OVERRIDE = {
    "econ-10-q15": "sras", "econ-10-q16": "lras", "econ-10-q25": "lras", "econ-10-q26": "keynes", "econ-14-q3": "lras",
    "econ-c10b-7": "lras", "econ-c12b-8": "lras", "econ-c13b-9": "lras", "econ-c17a-8": "ad", "econ-c17b-8": "quota",
    "econ-c18a-6": "ext-np", "econ-h4-q19": "sd", "econ-18-q23": "povcycle", "econ-h1-q17": "monopoly", "econ-h1-q24": "pc",
    "econ-h1-q25": "cost", "econ-5-q25": "ped-linear", "econ-15-q14": "trade-sub", "econ-h2-q12": "monopoly",
    "econ-c5a-6": "tax", "econ-c5b-7": "pes", "econ-7-q18": "permits", "econ-c15b-6": "sd", "econ-9-q23": "cycle",
  };
  const strip = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
  // Rank diagram types for a question: wording in the question counts most, then the markscheme, then the topic.
  function rank(q) {
    const stem = strip(q.stem || q.q);
    const ms = strip((q.ms || []).join(" "));
    return Object.entries(T)
      .map(([id, d]) => {
        let s = 0;
        d.kw.forEach((re, i) => { if (re.test(stem)) s += i === 0 ? 6 : 3; if (re.test(ms)) s += 1; });
        if (d.topics.includes(q.topic)) s += d.topics[0] === q.topic ? 2 : 1;
        if (d.hl && !/^econ-h/.test(q.topic || "")) s -= 1;
        return [id, s];
      })
      .filter(([, s]) => s > 0)
      .sort((a, b) => b[1] - a[1]);
  }

  IB.econDiagrams = {
    types: T,
    // Does this question ask for a diagram (or is a diagram expected, as in Paper 1 essays)?
    asks(q) {
      if (!q || q.subject !== "econ" || q.type === "mcq" || q.numeric) return false;
      return ASKS.test(strip(q.stem || q.q)) || (q.ms || []).some((p) => /^\s*diagram\b/i.test(strip(p)));
    },
    expected(q) {
      return this.asks(q) || (q && q.subject === "econ" && q.type === "extended");
    },
    rank,
    best(q) {
      if (q.diagram && T[q.diagram]) return q.diagram;
      if (OVERRIDE[q.id]) return OVERRIDE[q.id];
      const r = rank(q);
      return r.length ? r[0][0] : "sd";
    },
    // A markscheme point that a drawn diagram earns: it names the diagram, its labels or areas, or (as the first
    // point of a "using a diagram" question) describes the curves. Method/accuracy points ([M1], [A1]) never are.
    isPoint(p, i) {
      const t = strip(p);
      if (/\[(M|A)\d?\]/.test(t) || /^\s*(text|data|explanation|theory|evaluation|for|against)\s*[:/]/i.test(t)) return false;
      if (/^\s*(draw|sketch|plot)\b/i.test(t) || DIAGRAM_POINT.test(t)) return true;
      return i === 0 && (GEOMETRY.test(t) || /\b(curves?|(supply|demand|d|s) shifts?|households and firms|permit market)\b/i.test(t));
    },
    // Markscheme points that a drawn diagram earns (none for essays: there the diagram feeds the level descriptors).
    points(q) {
      if (!this.asks(q) || q.type === "extended") return [];
      return (q.ms || []).filter((p, i) => this.isPoint(p, i));
    },
    // Diagram marks from a checklist: ticked/total of the checklist, capped when a key point is missing.
    // Points that only apply to some questions ("If a policy is asked: …") count only when ticked.
    optional: (it) => it.opt !== undefined ? it.opt : /^(if|for|where)\b/i.test(it.t),
    score(typeId, ticks, k) {
      const d = T[typeId];
      if (!d || !k) return 0;
      const n = d.items.filter((it, i) => !this.optional(it) || ticks[i]).length;
      const got = d.items.filter((_, i) => ticks[i]).length;
      let earned = Math.min(k, Math.floor((k * got) / n + 0.4));
      if (d.items.some((it, i) => it.key && !ticks[i])) earned = Math.min(earned, Math.floor(k / 2));
      return earned;
    },
  };
})();
