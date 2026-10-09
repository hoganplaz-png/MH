/* Data-response case studies for Economics: Paper 2 practice by topic (see IB.addCases in js/app.js).
   Every case follows the SL Paper 2 shape (40 marks): two 2-mark definitions, short calculations,
   three or four 4-mark "using a diagram / using information from the text, explain" parts and a final
   15-mark evaluation that must use the text and data. All texts, places and figures are invented for practice. */
IB.addCases("econ", [
  {
    id: "econ-c5a",
    topic: "econ-5",
    paper: "P2",
    title: "Text A — Sugar tax and city buses in Veridia",
    text: `<p><b>[1]</b> Veridia, a middle-income economy, introduced an excise tax on sugar-sweetened drinks in 2024 to reduce obesity. The tax added $0.30 to the price of a 500 ml bottle, which rose from $1.50 to $1.80. In the first year, sales of taxed drinks fell from 120 million to 108 million bottles. Bottled water sales rose sharply.</p>
<p><b>[2]</b> The finance ministry welcomed the revenue: the tax raised more than expected because consumers, especially low-income households, kept buying their favourite brands. Health groups argued that a larger tax was needed because the <b>price elasticity of demand</b> for these drinks is low.</p>
<p><b>[3]</b> At the same time, the city of Port Aren cut bus fares from $2.00 to $1.60 to reduce traffic congestion. Daily journeys increased from 400 000 to 440 000. Bus operators complained that their total revenue fell, and they asked for a <b>subsidy</b>.</p>
<p><b>[4]</b> Economists noted that bus travel is an <b>inferior good</b> for many households: as incomes in Veridia rose by 5% in 2024, bus journeys outside the fare-cut city fell by 2%. Car sales, in contrast, rose by 9%.</p>
<p><b>[5]</b> Food producers responded to the sugar tax by reformulating drinks with less sugar. They said that supply in the long run is more price elastic because firms can change recipes, switch factories and find substitutes for sugar.</p>`,
    data: [
      {
        caption: "Table 1: Selected data for Veridia, 2023–2024",
        head: ["Indicator", "2023", "2024"],
        rows: [
          ["Price of 500 ml sugary drink ($)", "1.50", "1.80"],
          ["Sales of taxed drinks (million bottles)", "120", "108"],
          ["Port Aren bus fare ($)", "2.00", "1.60"],
          ["Port Aren daily bus journeys", "400 000", "440 000"],
          ["Average household income (index)", "100", "105"],
        ],
      },
    ],
    parts: [
      { n: "(a)(i)", marks: 2, diff: 1, q: "Define the term <i>price elasticity of demand</i> indicated in bold in the text (paragraph [2]).", ms: ["A measure of the responsiveness of quantity demanded of a good [1]", "to a change in its own price (ceteris paribus) [1]"] },
      { n: "(a)(ii)", marks: 2, diff: 1, q: "Define the term <i>subsidy</i> indicated in bold in the text (paragraph [3]).", ms: ["A payment by the government to producers [1]", "per unit of output, which lowers costs and increases supply [1]"] },
      { n: "(b)(i)", marks: 2, diff: 2, numeric: { value: -0.5, tol: 0.02 }, q: "Using information from Table 1, calculate the price elasticity of demand for sugar-sweetened drinks.", ms: ["%ΔQd = (108 − 120)/120 × 100 = −10%; %ΔP = (1.80 − 1.50)/1.50 × 100 = +20% [M1]", "PED = −10/20 = −0.5 (accept 0.5) [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 2, numeric: { value: 32.4, tol: 0.05 }, q: "Using information from paragraph [1] and Table 1, calculate the tax revenue from the sugar tax in 2024 (in $ million).", ms: ["$0.30 × 108 million = $32.4 million [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: -0.4, tol: 0.02 }, q: "Using information from paragraph [4], calculate the income elasticity of demand for bus journeys outside Port Aren.", ms: ["YED = %ΔQd / %ΔY = −2% / 5% [M1]", "= −0.4 [A1] (negative, so an inferior good)"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain why the sugar tax raised “more than expected” (paragraph [2]).", ms: ["Diagram: correctly labelled axes (P, Q), steep (inelastic) demand curve, supply shifts up/left by the tax (S + tax) [1]", "New equilibrium shows a small fall in quantity and tax revenue area = tax per unit × new quantity [1]", "Explanation: demand is price inelastic (PED = 0.5), few close substitutes / habit [1]", "So quantity falls proportionally less than price; the tax base stays large and revenue is high [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [3], explain why the bus operators’ total revenue fell after the fare cut.", ms: ["%ΔQ = +10%, %ΔP = −20%, so PED = −0.5: demand is price inelastic [1]", "With inelastic demand, a fall in price causes a proportionally smaller rise in quantity [1]", "TR before = 2.00 × 400 000 = $800 000; TR after = 1.60 × 440 000 = $704 000 [1]", "So total revenue fell by $96 000 (the gain from extra journeys is smaller than the loss on existing journeys) [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a demand diagram, explain the effect of the rise in household income on the market for bus journeys outside Port Aren (paragraph [4]).", ms: ["Diagram: demand curve shifts left from D₁ to D₂ (at each price, fewer journeys) [1]", "Correct labels and lower quantity at the given fare [1]", "Bus travel is an inferior good: YED = −0.4 is negative [1]", "As income rises consumers switch to normal-good substitutes such as cars, so demand for bus journeys falls [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a diagram, explain why the supply of sugar-sweetened drinks may be more price elastic in the long run than in the short run (paragraph [5]).", ms: ["Diagram: steeper short-run supply curve and flatter long-run supply curve from the same point [1]", "Labels: S(SR) and S(LR), axes P and Q [1]", "PES depends on time: in the short run firms cannot change factory capacity or recipes quickly [1]", "In the long run firms can reformulate, switch factories and find substitutes for sugar, so quantity supplied responds more to price [1]"] },
      {
        n: "(g)",
        marks: 15,
        diff: 3,
        type: "extended",
        q: "Using information from the text/data and your knowledge of economics, evaluate the use of an excise tax to reduce the consumption of sugar-sweetened drinks in Veridia.",
        ms: [
          "Level 5 (13-15): balanced evaluation, clearly linked to the text/data; relevant terms defined; theory and a diagram used effectively throughout",
          "Level 4 (10-12): evaluation supported by the text/data, but not fully balanced or synthesised",
          "Level 3 (7-9): some evaluation; theory and text used but with gaps or limited application",
          "Level 2 (4-6): understanding shown with little evaluation; limited use of the text",
          "Level 1 (1-3): little understanding; mostly description",
          "Theory: excise tax shifts supply left (S + tax); price rises, quantity falls; negative consumption externality / demerit good; diagram showing MSB < MPB and the tax moving output towards the socially optimal level",
          "Text/data: quantity fell 10% (120 m → 108 m); PED = 0.5 so demand is inelastic; revenue $32.4 m that could fund health care; switch to bottled water [1]; reformulation [5]",
          "For: reduces consumption and obesity-related external costs; raises revenue; encourages reformulation; signals health risk",
          "Against: inelastic demand means a small fall in consumption; regressive (low-income households pay a larger share of income) [2]; possible substitution to untaxed sugary foods; information failure not corrected",
          "Evaluation: effectiveness depends on PED (larger tax needed); short run vs long run (reformulation and habits change over time); stakeholders (consumers, firms, government, health system); combine with education, labelling or regulation; use revenue to offset regressiveness",
        ],
      },
    ],
  },
]);
