/* Economics Paper 2 case studies (micro topics). Format: see js/data/cases/econ.js.
   All texts, places, firms and figures are invented for practice. */
(function () {
  const LV = [
    "Level 5 (13-15): balanced evaluation, clearly linked to the text/data; relevant terms defined; theory and a diagram used effectively throughout",
    "Level 4 (10-12): evaluation supported by the text/data, but not fully balanced or synthesised",
    "Level 3 (7-9): some evaluation; theory and text used but with gaps or limited application",
    "Level 2 (4-6): understanding shown with little evaluation; limited use of the text",
    "Level 1 (1-3): little understanding; mostly description",
  ];
  const ext = (q, pts) => ({ n: "(g)", marks: 15, diff: 3, type: "extended", q, ms: LV.concat(pts) });
  const def = (n, term, para, ms) => ({ n, marks: 2, diff: 1, q: `Define the term <i>${term}</i> indicated in bold in the text (paragraph [${para}]).`, ms });

  IB.addCases("econ", [
  /* ---------------- econ-1 ---------------- */
  {
    id: "econ-c1a", topic: "econ-1", paper: "P2",
    title: "Text B — Choices on the farm and in the factory in Kalora",
    text: `<p><b>[1]</b> Kalora is a low-income, landlocked economy where most people work in agriculture. Like every economy it faces <b>scarcity</b>: its land, labour and capital are limited while the wants of its 14 million people are not. The government must decide what to produce, how to produce it and for whom.</p>
<p><b>[2]</b> The planning ministry has estimated Kalora's production possibilities for food and textiles (Table 1). Moving workers and land from farming into textile workshops is not easy: hill farmers lack sewing skills, and lowland fields suited to rice are poorly suited to factories.</p>
<p><b>[3]</b> In 2025 Kalora produced 28 million tonnes of food and 15 million units of textiles. Drought closed many farms and 1.5 million of the 12 million people in the labour force were unemployed.</p>
<p><b>[4]</b> The government wants to expand textile production for export. Critics say the <b>opportunity cost</b> is too high when one in four children is undernourished.</p>
<p><b>[5]</b> A foreign-funded irrigation scheme and a vocational training programme are due to start in 2026. The finance minister says these will "let Kalora have more of both goods". To fund its share, however, the government will reduce spending on consumer goods such as subsidised cooking oil for three years.</p>`,
    data: [
      { caption: "Table 1: Production possibilities for Kalora (per year)", head: ["Point", "Food (million tonnes)", "Textiles (million units)"], rows: [["A", "40", "0"], ["B", "36", "10"], ["C", "30", "20"], ["D", "20", "30"], ["E", "0", "40"]] },
    ],
    parts: [
      def("(a)(i)", "scarcity", 1, ["The situation where resources (factors of production) are limited/finite [1]", "relative to unlimited wants/needs, so choices must be made [1]"]),
      def("(a)(ii)", "opportunity cost", 4, ["The value of the next best alternative [1]", "that is given up/forgone when a choice is made [1]"]),
      { n: "(b)(i)", marks: 2, diff: 2, numeric: { value: 0.6, tol: 0.01 }, q: "Using Table 1, calculate the opportunity cost of one unit of textiles when Kalora moves from point B to point C (in tonnes of food).", ms: ["Food given up = 36 − 30 = 6 million tonnes for 10 million extra textile units [M1]", "Opportunity cost = 6/10 = 0.6 tonnes of food per unit of textiles [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 1, tol: 0.01 }, q: "Using Table 1, calculate the opportunity cost of one unit of textiles when Kalora moves from point C to point D (in tonnes of food).", ms: ["(30 − 20)/10 = 1 tonne of food per unit of textiles [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 1, numeric: { value: 12.5, tol: 0.05 }, q: "Using information from paragraph [3], calculate Kalora's unemployment rate in 2025.", ms: ["Unemployment rate = unemployed / labour force × 100 = 1.5/12 × 100 [M1]", "= 12.5% [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a production possibilities curve (PPC) diagram, explain Kalora's position in 2025 (paragraph [3]).", ms: ["Diagram: axes labelled food and textiles, concave PPC through the Table 1 points [1]", "2025 output (28, 15) plotted as a point inside the PPC [1]", "Resources are unemployed/under-used (1.5 million unemployed, idle farms after drought) [1]", "So Kalora is productively inefficient: it could produce more of both goods without any opportunity cost by moving to the curve [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [2] and Table 1, explain why the opportunity cost of textiles increases as Kalora produces more of them.", ms: ["Opportunity cost rises from 0.4 (A→B) to 0.6 (B→C), 1 (C→D) and 2 tonnes (D→E) per unit [1]", "This gives a concave (bowed-out) PPC [1]", "Resources are not equally suited to all uses: hill farmers lack sewing skills, rice land is poorly suited to factories [1]", "As more textiles are produced, increasingly unsuitable resources are moved, so more food must be given up for each extra unit [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a PPC diagram, explain how the irrigation scheme and training programme could “let Kalora have more of both goods” (paragraph [5]).", ms: ["Diagram: PPC shifts outward from PPC₁ to PPC₂ [1]", "Axes labelled; possibly a bigger shift on the food axis (irrigation mainly raises farm output) [1]", "Irrigation raises the quantity/quality of land and capital; training raises labour quality (human capital) [1]", "This increases productive capacity (potential output/growth), so combinations previously unattainable become attainable [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a PPC diagram for capital goods and consumer goods, explain the choice described in the last sentence of paragraph [5].", ms: ["Diagram: axes capital goods and consumer goods; movement along the PPC towards more capital goods [1]", "A larger future outward shift of the PPC shown compared with keeping more consumer goods [1]", "Opportunity cost today: fewer consumer goods (cooking-oil subsidy cut), lower current living standards [1]", "Benefit: more capital (irrigation) raises future productive capacity and future consumption [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the government's plan to move resources from food production into textile production in Kalora.", [
        "Theory: scarcity and choice; opportunity cost; PPC with increasing opportunity cost; movement along vs shift; actual vs potential growth",
        "Text/data: opportunity cost rises from 0.6 to 1 tonne of food per textile unit [Table 1]; 12.5% unemployment and output inside the PPC [3]; undernourishment [4]; irrigation and training [5]",
        "For: unemployed resources can be used first with no opportunity cost (move to the PPC); exports earn foreign exchange; diversification away from drought-prone agriculture; training reduces the mismatch of skills",
        "Against: increasing opportunity cost means each extra unit of textiles costs more food; food security and child nutrition (normative judgement: equity, development); export markets may be weak",
        "Evaluation: short run vs long run (training and irrigation shift the PPC later); stakeholders (farmers, workers, children, government); priorities (the 'for whom' question); a moderate shift to textiles while using idle resources may be best",
      ]),
    ],
  },
  {
    id: "econ-c1b", topic: "econ-1", paper: "P2",
    title: "Text C — Growth and green power in Nordhavn",
    text: `<p><b>[1]</b> Nordhavn is a high-income economy with an ageing population. Economists at the central bank use a model of the <b>circular flow of income</b> to track how money moves between households, firms, the government, the financial sector and the rest of the world.</p>
<p><b>[2]</b> In 2025, planned injections into the economy rose because the government increased spending on wind farms and export demand for Nordhavn's machinery grew. Leakages were smaller: households saved less after interest rates fell (Table 1).</p>
<p><b>[3]</b> Energy policy dominates political debate. One minister stated: "Renewables supplied 42 TWh of Nordhavn's 120 TWh of electricity in 2025." Another argued: "The government should close all coal power stations by 2030, whatever the cost."</p>
<p><b>[4]</b> Closing coal plants quickly would move workers, land and capital out of fossil-fuel power. In the short run some engineers and miners may struggle to find new jobs, and electricity prices may rise.</p>
<p><b>[5]</b> Supporters argue that <b>sustainability</b> requires the change: burning coal damages air quality today and the climate for future generations. Investment in battery technology and grid storage, they say, will raise the economy's capacity to produce all goods in the long run.</p>`,
    data: [
      { caption: "Table 1: Selected flows in Nordhavn, 2025 ($ billion)", head: ["Injections", "$ bn", "Leakages", "$ bn"], rows: [["Investment", "50", "Saving", "40"], ["Government spending", "100", "Taxes", "90"], ["Exports", "110", "Imports", "120"]] },
    ],
    parts: [
      def("(a)(i)", "circular flow of income", 1, ["A model showing the flows of money (income/expenditure) and real goods/factors [1]", "between households and firms (and government, financial sector, foreign sector), with injections and leakages [1]"]),
      def("(a)(ii)", "sustainability", 5, ["Meeting the needs of the present generation [1]", "without compromising the ability of future generations to meet their own needs (e.g. not depleting/damaging resources) [1]"]),
      { n: "(b)(i)", marks: 1, diff: 1, numeric: { value: 260, tol: 0.5 }, q: "Using Table 1, calculate total injections in 2025.", ms: ["50 + 100 + 110 = $260 bn [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 2, numeric: { value: 10, tol: 0.05 }, q: "Using Table 1, calculate the difference between total injections and total leakages, and state what it implies for national income.", ms: ["Leakages = 40 + 90 + 120 = $250 bn; injections − leakages = 260 − 250 = $10 bn [A1]", "Injections exceed leakages, so national income will rise [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 1, numeric: { value: 35, tol: 0.05 }, q: "Using information from paragraph [3], calculate the percentage of Nordhavn's electricity supplied by renewables in 2025.", ms: ["42 / 120 × 100 [M1]", "= 35% [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a circular flow diagram, explain why national income in Nordhavn is likely to rise (paragraph [2]).", ms: ["Diagram: households and firms with income and expenditure flows [1]", "Injections (I, G, X) entering and leakages (S, T, M) leaving correctly labelled [1]", "Government spending on wind farms and higher exports add spending to the flow; lower saving reduces leakages [1]", "With injections ($260 bn) > leakages ($250 bn), the size of the flow (national income/output) increases until they are equal [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [3], explain the difference between positive and normative economic statements.", ms: ["A positive statement is factual and can be tested/verified against evidence [1]", "e.g. \"Renewables supplied 42 TWh of 120 TWh\" - can be checked using data [1]", "A normative statement contains a value judgement about what ought to be [1]", "e.g. \"The government <i>should</i> close all coal power stations… whatever the cost\" - cannot be proved true or false [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a PPC diagram, explain the short-run effect of closing coal power stations quickly (paragraph [4]).", ms: ["Diagram: PPC with an initial point on the curve and a new point inside it [1]", "Axes labelled (e.g. electricity and other goods) [1]", "Workers and capital leaving coal cannot immediately be re-employed (skills mismatch / structural unemployment) [1]", "So resources are unemployed and actual output falls: the economy moves inside its PPC (productive inefficiency) [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a PPC diagram, explain how investment in battery technology could affect Nordhavn's production possibilities in the long run (paragraph [5]).", ms: ["Diagram: outward shift of the PPC [1]", "Correct labels PPC₁ → PPC₂ [1]", "New technology / more capital improves productivity of resources [1]", "Raising potential output (long-term growth), so more of all goods can be produced [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the view that economic growth and sustainability are compatible in Nordhavn.", [
        "Theory: circular flow and injections/leakages; PPC (actual vs potential growth); opportunity cost; sustainability and intergenerational equity; positive vs normative judgements",
        "Text/data: injections exceed leakages by $10 bn [Table 1]; renewables 35% of electricity [3]; short-run job losses and higher electricity prices [4]; battery investment and air quality [5]",
        "Compatible: green investment is itself an injection that raises income; technology shifts the PPC out; cleaner air raises well-being; reduced fossil fuel dependence",
        "Not compatible / trade-offs: short-run unemployment and output inside the PPC; higher energy prices raise firms' costs; opportunity cost of public spending; growth in consumption still uses resources",
        "Evaluation: short run vs long run; depends on speed of transition (\"whatever the cost\" is normative); stakeholders (miners, consumers, future generations); retraining support; high-income Nordhavn can better afford the transition than poorer countries",
      ]),
    ],
  },
  /* ---------------- econ-2 ---------------- */
  {
    id: "econ-c2a", topic: "econ-2", paper: "P2",
    title: "Text D — Avocado prices in Ostria",
    text: `<p><b>[1]</b> Ostria is a high-income economy that imports almost all of its avocados. In 2025 the average price of avocados rose from $4 to $5 per kilogram, while the quantity bought stayed at 340 000 kg per week.</p>
<p><b>[2]</b> <b>Demand</b> has been rising. Social-media influencers promote avocados as a healthy food, average incomes grew by 3%, and a popular café chain added avocado toast to every breakfast menu. Prices of bread, often eaten with avocado, also fell.</p>
<p><b>[3]</b> At the same time, a drought in the main exporting country reduced harvests, and the cost of refrigerated shipping rose by 18%. Several farms switched land from avocados to more profitable blueberries.</p>
<p><b>[4]</b> Table 1 shows estimates of weekly demand and <b>supply</b> before and after these changes. Supermarkets report that, for some weeks, shelves were empty because they kept prices at the old level.</p>
<p><b>[5]</b> Some shoppers have switched to frozen guacamole and to other fruit. Exporting farmers enjoy higher prices but have smaller harvests, while Ostrian cafés say rising costs threaten their profits.</p>`,
    data: [
      { caption: "Table 1: Weekly market for avocados in Ostria (thousand kg)", head: ["Price ($/kg)", "Qd 2024", "Qs 2024", "Qd 2025", "Qs 2025"], rows: [["2", "500", "180", "580", "100"], ["3", "420", "260", "500", "180"], ["4", "340", "340", "420", "260"], ["5", "260", "420", "340", "340"], ["6", "180", "500", "260", "420"]] },
    ],
    parts: [
      def("(a)(i)", "demand", 2, ["The quantity of a good that consumers are willing and able to buy [1]", "at each possible price over a given time period, ceteris paribus [1]"]),
      def("(a)(ii)", "supply", 4, ["The quantity of a good that producers are willing and able to offer for sale [1]", "at each possible price over a given time period, ceteris paribus [1]"]),
      { n: "(b)(i)", marks: 1, diff: 1, numeric: { value: 25, tol: 0.05 }, q: "Using paragraph [1], calculate the percentage increase in the price of avocados.", ms: ["(5 − 4)/4 × 100 = 25% [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 2, numeric: { value: 160, tol: 0.5 }, q: "Using Table 1, calculate the shortage in 2025 if supermarkets keep the price at $4 per kg.", ms: ["At $4 in 2025: Qd = 420, Qs = 260 (thousand kg) [M1]", "Shortage (excess demand) = 420 − 260 = 160 thousand kg per week [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 340, tol: 0.5 }, q: "Using Table 1, calculate the change in weekly consumer spending on avocados between the 2024 and 2025 equilibria (in $ thousand).", ms: ["2024: $4 × 340 = $1360 thousand; 2025: $5 × 340 = $1700 thousand [M1]", "Increase = $340 thousand per week [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the effect of the factors in paragraph [2] on the market for avocados.", ms: ["Diagram: demand shifts right D₁ → D₂, higher equilibrium price and quantity (other things equal) [1]", "Axes P and Q labelled, initial and new equilibria shown [1]", "Non-price determinants: tastes/preferences (influencers), higher income (normal good), more consumers via cafés [1]", "Fall in price of a complement (bread) also raises demand; at the old price there is excess demand, pushing price up [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the effect of the factors in paragraph [3] on the market for avocados.", ms: ["Diagram: supply shifts left S₁ → S₂, higher price and lower quantity (other things equal) [1]", "Correct labels and equilibria [1]", "Drought is a supply shock; higher shipping costs raise costs of production [1]", "Farmers switching land to blueberries (competitive supply, a more profitable alternative) reduces supply at every price [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using Table 1 and a diagram, explain why the price rose but the equilibrium quantity did not change in 2025.", ms: ["Diagram showing both demand shifting right and supply shifting left [1]", "Equilibrium moves from ($4, 340) to ($5, 340): price rises, quantity unchanged [1]", "Both shifts raise price, so the effect on price is clear [1]", "Demand increase raises quantity, supply decrease lowers it; here the shifts are of equal size (80 thousand kg at each price), so quantity is unchanged [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraphs [4] and [5], explain the role of the price mechanism in the market for avocados.", ms: ["At the old price of $4 there is excess demand (empty shelves) [1]", "Rationing function: a higher price allocates the scarce avocados to those most willing and able to pay; some buyers switch to substitutes (frozen guacamole, other fruit) [1]", "Signalling function: the higher price signals scarcity to producers and consumers [1]", "Incentive function: higher price encourages farmers to supply more (movement up the supply curve) until a new equilibrium is reached [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the impact of the changes in the avocado market on different stakeholders.", [
        "Theory: demand and supply determinants; shifts vs movements; equilibrium; price mechanism (signal, incentive, ration); consumer and producer surplus",
        "Text/data: price +25%, quantity unchanged at 340 thousand kg [Table 1]; spending up $340 thousand per week; shortage of 160 thousand kg at $4 [4]; café costs [5]",
        "Consumers: pay more, lower consumer surplus; switch to substitutes; low-income households hit hardest",
        "Producers: higher price but smaller harvests - revenue effect ambiguous for drought-hit farmers; farms switching to blueberries gain; Ostrian cafés face higher costs and lower profits",
        "Evaluation: short run vs long run (new orchards take years; drought may be temporary); depends on size of shifts and elasticities; supermarkets' price-holding causes shortages; overall the price mechanism reallocates resources efficiently but not necessarily equitably",
      ]),
    ],
  },
  {
    id: "econ-c2b", topic: "econ-2", paper: "P2",
    title: "Text E — Ride-hailing and taxis in Taranesia",
    text: `<p><b>[1]</b> Taranesia is a lower-middle-income economy whose capital, Sabu City, has 9 million people. Five years ago most journeys were made by licensed taxis or crowded buses. Ride-hailing apps have changed the <b>market</b> for urban transport.</p>
<p><b>[2]</b> Cheaper smartphones and a fall in the price of second-hand cars allowed more people to work as ride-hailing drivers. The number of registered drivers rose from 12 000 to 18 000 in 2025, and app companies cut the commission they charge drivers.</p>
<p><b>[3]</b> Taxis and ride-hailing are close <b>substitutes</b>. As ride-hailing fares fell, daily taxi trips dropped from 80 000 to 62 000. Taxi owners also face a rise in the price of fuel caused by the removal of a fuel subsidy.</p>
<p><b>[4]</b> Most passengers are young office workers. A survey found that when fares fall, people take more trips because each trip now costs a smaller part of their budget and because ride-hailing becomes cheaper relative to buses.</p>
<p><b>[5]</b> Taxi drivers have protested, saying their incomes have collapsed. The city government is considering whether to limit the number of ride-hailing licences.</p>`,
    data: [
      { caption: "Table 1: Urban transport in Sabu City", head: ["Indicator", "2024", "2025"], rows: [["Registered ride-hailing drivers", "12 000", "18 000"], ["Average ride-hailing fare ($)", "3.80", "3.20"], ["Ride-hailing trips per day", "110 000", "150 000"], ["Average taxi fare ($)", "4.50", "4.70"], ["Taxi trips per day", "80 000", "62 000"]] },
    ],
    parts: [
      def("(a)(i)", "market", 1, ["Any place or arrangement/institution [1]", "where buyers and sellers interact to exchange goods or services (determining price) [1]"]),
      def("(a)(ii)", "substitutes", 3, ["Goods that can be used in place of each other / satisfy the same want [1]", "so a fall in the price of one reduces demand for the other [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: -22.5, tol: 0.05 }, q: "Using Table 1, calculate the percentage change in the number of taxi trips per day between 2024 and 2025.", ms: ["(62 000 − 80 000)/80 000 × 100 [M1]", "= −22.5% [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 50, tol: 0.05 }, q: "Using Table 1, calculate the percentage increase in registered ride-hailing drivers.", ms: ["(18 000 − 12 000)/12 000 × 100 = 50% [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 480000, tol: 1 }, q: "Using Table 1, calculate total daily spending on ride-hailing trips in 2025.", ms: ["$3.20 × 150 000 trips [M1]", "= $480000 per day [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the effect of the changes in paragraph [2] on the market for ride-hailing trips.", ms: ["Diagram: supply shifts right S₁ → S₂; price falls and quantity rises [1]", "Axes labelled; consistent with fare $3.80 → $3.20 and trips 110 000 → 150 000 [1]", "Non-price determinants of supply: more producers (drivers 12 000 → 18 000); lower input costs (cheaper phones, cars) [1]", "Lower commission raises drivers' net earnings per trip, so more is supplied at each fare; excess supply at the old fare pushes the fare down [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the effect of the changes in paragraph [3] on the market for taxi trips.", ms: ["Diagram: demand shifts left (fall in price of a substitute) and supply shifts left (higher fuel cost) [1]", "Quantity falls clearly (80 000 → 62 000); price effect depends on the relative shifts [1]", "Cheaper ride-hailing (substitute) reduces demand for taxis at every fare [1]", "Removal of fuel subsidy raises costs of production, reducing supply; the fare rise ($4.50 → $4.70) suggests the supply effect on price dominated [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain why the demand curve for ride-hailing trips slopes downward.", ms: ["Law of demand: as price falls, quantity demanded rises, ceteris paribus (movement along the curve) [1]", "Income effect: a lower fare raises real income/purchasing power, so passengers can afford more trips [1]", "Substitution effect: ride-hailing becomes cheaper relative to buses/taxis, so consumers switch towards it [1]", "Diminishing marginal utility: extra trips give less extra satisfaction, so consumers buy more only at lower prices [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a diagram, explain the likely effect on the ride-hailing market of limiting the number of licences (paragraph [5]).", ms: ["Diagram: supply shifts left (or becomes vertical at the licence limit) [1]", "Higher fare and fewer trips than without the limit [1]", "Fewer drivers allowed reduces quantity supplied at each fare [1]", "Passengers pay more and some switch back to taxis, raising demand for taxi trips [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the impact of the growth of ride-hailing on stakeholders in Sabu City.", [
        "Theory: supply and demand determinants, substitutes, law of demand (income/substitution effects), equilibrium changes",
        "Text/data: drivers +50%; ride-hailing fare down 16% and trips 110 000 → 150 000; taxi trips −22.5%; spending $480 000 per day [Table 1]; fuel subsidy removal [3]; protests [5]",
        "Gainers: passengers (lower fares, more trips, convenience); new drivers (jobs in a lower-middle-income economy); app firms",
        "Losers: taxi drivers (lower demand plus higher fuel costs - falling incomes); possibly bus operators; congestion/pollution as trips rise",
        "Evaluation: drivers' incomes may fall as supply keeps rising; licensing limits protect taxis but raise fares; short run vs long run (taxi firms may adopt apps); informal workers lack protection; overall net benefit depends on weighting of stakeholders",
      ]),
    ],
  },
  /* ---------------- econ-3 ---------------- */
  {
    id: "econ-c3a", topic: "econ-3", paper: "P2",
    title: "Text F — Fish, tourists and surplus in Marisol",
    text: `<p><b>[1]</b> Marisol is a small upper-middle-income island economy. Its fish market in the port of Cala Verde sets prices daily as fishing boats sell to local households, restaurants and hotels.</p>
<p><b>[2]</b> Before the tourist season the market was in <b>equilibrium</b> at a price of $12 per kg, with 8000 kg sold each day. Economists estimated that no buyer would pay more than $20 per kg and no fisher would sell below $6 per kg (Table 1).</p>
<p><b>[3]</b> In the tourist season, hotels buy far more fish. On the first morning, traders kept the old price and ran out of fish within an hour; the next day prices rose sharply.</p>
<p><b>[4]</b> Fishers responded by staying at sea longer and hiring extra crew. Some local families stopped buying fish and switched to chicken.</p>
<p><b>[5]</b> The tourism minister argued that the free market achieves <b>allocative efficiency</b>: "Fish goes to the people who value it most." A community leader replied that local families, not wealthy tourists, should come first.</p>`,
    data: [
      { caption: "Table 1: Daily fish market in Cala Verde, before the tourist season", head: ["Indicator", "Value"], rows: [["Equilibrium price ($ per kg)", "12"], ["Equilibrium quantity (kg per day)", "8000"], ["Highest price any buyer will pay ($ per kg)", "20"], ["Lowest price any seller will accept ($ per kg)", "6"]] },
    ],
    parts: [
      def("(a)(i)", "equilibrium", 2, ["A situation where quantity demanded equals quantity supplied [1]", "so there is no tendency for price to change (market clears) [1]"]),
      def("(a)(ii)", "allocative efficiency", 5, ["Producing the combination of goods most wanted by society / where resources are allocated to maximise social surplus [1]", "where marginal benefit equals marginal cost (MB = MC) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 2, numeric: { value: 32000, tol: 1 }, q: "Assuming straight-line demand and supply curves, use Table 1 to calculate daily consumer surplus before the tourist season.", ms: ["CS = ½ × 8000 × (20 − 12) [M1]", "= $32000 [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 2, numeric: { value: 24000, tol: 1 }, q: "Assuming straight-line curves, use Table 1 to calculate daily producer surplus before the tourist season.", ms: ["PS = ½ × 8000 × (12 − 6) [M1]", "= $24000 [A1]"] },
      { n: "(b)(iii)", marks: 1, diff: 1, numeric: { value: 56000, tol: 1 }, q: "Calculate social (community) surplus before the tourist season.", ms: ["$32 000 + $24 000 = $56000 [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain why the price of fish rose in the tourist season (paragraph [3]).", ms: ["Diagram: demand shifts right D₁ → D₂ [1]", "At the old price $12, excess demand (Qd > Qs) shown [1]", "Hotels' demand rises; traders who keep the old price run out of fish (shortage) [1]", "Buyers compete/bid up the price until a new higher equilibrium where Qd = Qs [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain the signalling and incentive functions of price in the fish market.", ms: ["Signalling: the higher price tells fishers that fish is scarce/more highly valued [1]", "Incentive: the higher price makes extra output profitable, so fishers stay at sea longer and hire crew [1]", "This is a movement up the supply curve (quantity supplied rises) [1]", "Consumers receive the signal too: some families switch to chicken (substitute), reducing quantity demanded - resources are reallocated [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain why the free-market equilibrium in paragraph [2] is allocatively efficient.", ms: ["Diagram: demand = MB and supply = MC, equilibrium at Pe, Qe [1]", "Consumer surplus and producer surplus areas labelled [1]", "At Qe, MB = MC: the value of the last kg to buyers equals the cost of producing it [1]", "Social surplus ($56 000) is maximised; producing more or less would create a welfare loss [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraphs [4] and [5], explain the rationing function of price.", ms: ["When fish is scarce, price rises to ration the limited supply [1]", "Only buyers willing and able to pay the higher price obtain fish [1]", "Hotels and tourists with greater purchasing power outbid local families [1]", "So price allocates by willingness/ability to pay, not by need - the families switch to chicken [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the tourism minister's view that the free market gives the best allocation of fish in Marisol (paragraph [5]).", [
        "Theory: equilibrium; price mechanism (signal, incentive, ration); consumer/producer surplus; allocative efficiency (MB = MC, maximum social surplus)",
        "Text/data: CS $32 000, PS $24 000, social surplus $56 000 [Table 1]; shortage when price held [3]; fishers' response and families switching [4]",
        "For: market clears, no shortages; maximises social surplus; producers respond quickly; tourism income benefits fishers",
        "Against: efficiency is not equity - willingness to pay depends on income; locals' nutrition/culture; higher fishing effort may overfish (common pool resource, external costs ignored so MSC ≠ MPC); assumes competitive market and perfect information",
        "Evaluation: positive vs normative ('best' is a value judgement); short vs long run (fish stocks); stakeholders (fishers, tourists, hotels, families); options such as quotas to protect stocks or support for low-income households",
      ]),
    ],
  },
  {
    id: "econ-c3b", topic: "econ-3", paper: "P2",
    title: "Text G — The coffee price slump in Kafundi",
    text: `<p><b>[1]</b> Kafundi is a low-income economy where coffee provides 40% of export earnings and supports 600 000 small farms. Coffee is traded in a competitive world market where no single country can set the price.</p>
<p><b>[2]</b> Two years of excellent weather and new plantations in several countries increased supply. When the price was $4.00 per kg in 2025, there was <b>excess supply</b>: warehouses filled up with unsold beans (Table 1).</p>
<p><b>[3]</b> The world price fell to $2.80 per kg, its lowest in a decade. Kafundi's farmers received far less for each bag, even though more coffee was sold worldwide.</p>
<p><b>[4]</b> Agricultural advisers report that some Kafundi farmers are planting cocoa between their coffee bushes, because cocoa prices are high. "The <b>price mechanism</b> is telling us what to grow," said one farmer.</p>
<p><b>[5]</b> A new chain of cafés in fast-growing Asian cities has raised demand for coffee, and some traders expect prices to recover. However, the Kafundi government is under pressure to support farmers who cannot pay for school fees.</p>`,
    data: [
      { caption: "Table 1: World coffee market, 2025 (million tonnes per year)", head: ["Price ($ per kg)", "Quantity demanded", "Quantity supplied"], rows: [["2.00", "2.7", "1.7"], ["2.80", "2.3", "2.3"], ["3.40", "2.0", "2.6"], ["4.00", "1.7", "2.9"]] },
      { caption: "Table 2: World coffee market outcomes", head: ["Year", "Price ($ per kg)", "Quantity traded (million tonnes)"], rows: [["2024", "4.00", "2.0"], ["2025", "2.80", "2.3"]] },
    ],
    parts: [
      def("(a)(i)", "excess supply", 2, ["A situation where quantity supplied is greater than quantity demanded [1]", "at a given price (above the equilibrium price) [1]"]),
      def("(a)(ii)", "price mechanism", 4, ["The system in which the forces of demand and supply determine prices [1]", "and prices signal/ration/give incentives to allocate scarce resources [1]"]),
      { n: "(b)(i)", marks: 1, diff: 1, numeric: { value: -30, tol: 0.05 }, q: "Using Table 2, calculate the percentage change in the world price of coffee between 2024 and 2025.", ms: ["(2.80 − 4.00)/4.00 × 100 = −30% [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 1, numeric: { value: 1.2, tol: 0.01 }, q: "Using Table 1, calculate the excess supply at a price of $4.00 per kg.", ms: ["Qs − Qd = 2.9 − 1.7 [M1]", "= 1.2 million tonnes [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: -1.56, tol: 0.01 }, q: "Using Table 2, calculate the change in total world revenue from coffee sales between 2024 and 2025 (in $ billion).", ms: ["2024: 4.00 × 2.0 = $8.0 bn; 2025: 2.80 × 2.3 = $6.44 bn [M1]", "Change = −1.56 ($ bn) [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain how the world coffee market moved to a new equilibrium (paragraphs [2] and [3]).", ms: ["Diagram: supply shifts right S₁ → S₂ [1]", "Excess supply at $4.00 shown; new equilibrium at $2.80 and 2.3 million tonnes [1]", "Good weather and new plantations increased supply; at the old price unsold stocks build up [1]", "Sellers cut prices to sell stocks; as price falls Qd rises and Qs falls until Qd = Qs [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain how the price mechanism reallocates resources in Kafundi.", ms: ["Signalling: low coffee prices and high cocoa prices signal changes in relative scarcity/value [1]", "Incentive: cocoa is now relatively more profitable than coffee [1]", "Farmers move land and labour from coffee to cocoa [1]", "Over time coffee supply falls and cocoa supply rises, so resources follow consumer demand (resource allocation) [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain the effect of the fall in price on consumer surplus and producer surplus in the coffee market.", ms: ["Diagram: original and new equilibria with consumer surplus area shown [1]", "Consumer surplus increases (larger area under demand above the lower price) [1]", "Producer surplus: farmers receive a lower price on each unit; existing producers lose surplus [1]", "Explanation: consumers gain from lower prices; producers in Kafundi lose income (world revenue fell $1.56 bn) [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the likely effect of the new Asian cafés on the world coffee price (paragraph [5]).", ms: ["Diagram: demand shifts right D₁ → D₂ [1]", "Higher equilibrium price and quantity [1]", "Rising incomes and tastes in Asian cities increase demand at every price [1]", "Excess demand at $2.80 bids price up, so prices may recover as traders expect [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the view that Kafundi's coffee farmers should be left to the free market.", [
        "Theory: equilibrium and excess supply; price mechanism functions; consumer/producer surplus; allocative efficiency",
        "Text/data: price −30%; excess supply 1.2 m tonnes at $4.00; world revenue −$1.56 bn [Tables]; 40% of export earnings and 600 000 farms [1]; switch to cocoa [4]; Asian demand and school fees [5]",
        "For the market: prices signal oversupply and push resources to cocoa; consumers worldwide gain; government intervention (price floors, buying stocks) is costly for a low-income government",
        "Against: farmers' incomes are volatile and many are poor; resources are slow to move (bushes take years), so adjustment is painful; school dropouts harm development; switching all to cocoa may cause the same problem there",
        "Evaluation: short vs long run (Asian demand may restore prices); diversification and training; support targeted at poor households rather than fixing prices; stakeholders (farmers, consumers, government, exporters)",
      ]),
    ],
  },
  /* ---------------- econ-4 ---------------- */
  {
    id: "econ-c4a", topic: "econ-4", paper: "P2",
    title: "Text H — Saving for old age in Brevania",
    text: `<p><b>[1]</b> Brevania is a high-income economy with 2.4 million private-sector employees. Traditional economic theory assumes workers are rational: they have perfect information and consistent preferences, and they save enough during their careers to maximise lifetime utility.</p>
<p><b>[2]</b> In practice only 48% of employees joined a workplace pension when they had to sign up themselves. Surveys show many intended to join "next year" but never did - an example of <b>bounded self-control</b>. Others found the forms and choice of 60 funds confusing.</p>
<p><b>[3]</b> In 2023 the government changed the <b>choice architecture</b>: employees are now enrolled automatically, with 3% of salary saved, unless they opt out. Participation rose to 89%.</p>
<p><b>[4]</b> Most new members stayed in the default fund and at the default rate, even though a higher contribution would be in their interest. The average salary of new members is $40 000 per year.</p>
<p><b>[5]</b> Pension providers now send messages framed as "You could lose $90 000 of retirement income by opting out" rather than "Joining gives you $90 000 more". Critics say the state is being paternalistic, while low-paid workers argue they need the money today.</p>`,
    data: [
      { caption: "Table 1: Workplace pension participation in Brevania", head: ["Indicator", "Before 2023 (opt-in)", "2025 (auto-enrolment)"], rows: [["Participation rate (%)", "48", "89"], ["Employees who choose the default fund (%)", "n/a", "92"], ["Default contribution (% of salary)", "none", "3"]] },
    ],
    parts: [
      def("(a)(i)", "bounded self-control", 2, ["The idea that individuals have limited self-control [1]", "so they may make choices that are not in their long-term interest, e.g. putting off saving (present bias) [1]"]),
      def("(a)(ii)", "choice architecture", 3, ["The way choices are designed/presented to consumers [1]", "which influences the decisions they make (e.g. default, restricted or mandated choices) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 2.136, tol: 0.001 }, q: "Using paragraph [1] and Table 1, calculate the number of employees in a workplace pension in 2025 (in millions).", ms: ["2.4 million × 0.89 [M1]", "= 2.136 million [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 41, tol: 0.05 }, q: "Using Table 1, calculate the change in the participation rate in percentage points.", ms: ["89 − 48 = 41 percentage points [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 1, numeric: { value: 1200, tol: 0.5 }, q: "Using paragraph [4] and Table 1, calculate the annual default contribution of an employee earning the average salary.", ms: ["3% × $40 000 [M1]", "= $1200 per year [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using information from paragraphs [1] and [2], explain two assumptions of the rational consumer choice model that may not hold in Brevania.", ms: ["Perfect information: assumes consumers know all options and outcomes [1]", "But 60 funds and complex forms mean imperfect information/bounded rationality - workers cannot process all choices [1]", "Consistent preferences/rational self-interest: assumes people act on their long-term interest [1]", "But workers delay joining (\"next year\") - bounded self-control/present bias, so actual saving is below their own plans [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraphs [3] and [4], explain how a default option acts as a nudge.", ms: ["Nudge: changing how a choice is presented to alter behaviour without banning options or significantly changing incentives [1]", "Default: employees are enrolled unless they act to opt out [1]", "Inertia/status quo bias: most people do not change the default (participation 48% → 89%; 92% stay in the default fund) [1]", "Freedom of choice is kept (opt-out possible), so it is libertarian paternalism [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain the concept of diminishing marginal utility and how it relates to the rational consumer.", ms: ["Diagram: marginal utility on the vertical axis, quantity on the horizontal; downward-sloping MU curve [1]", "Each extra unit consumed adds less additional satisfaction than the previous one [1]", "Rational consumers aim to maximise utility, allocating income where the extra utility per dollar is equal across uses (e.g. consumption now vs later) [1]", "Falling MU explains why consumers buy more only at lower prices and spread spending/saving across time [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraph [5], explain how framing may influence workers' decisions.", ms: ["Framing: the way information is presented affects choices even if the content is the same [1]", "Both messages describe the same $90 000 [1]", "Loss aversion: people feel losses more strongly than equal gains [1]", "So a 'lose $90 000' frame makes opting out less attractive and raises participation [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the use of nudges to increase retirement saving in Brevania.", [
        "Theory: rational consumer choice (assumptions, utility maximisation) vs behavioural economics (bounded rationality, bounded self-control, biases); choice architecture, default, framing, nudge theory",
        "Text/data: participation 48% → 89% (+41 percentage points) [Table 1]; 2.136 million members; 92% in default fund; $1200 per year default contribution [4]; framing [5]",
        "For: large effect at low cost to government; keeps freedom of choice; corrects present bias; reduces future old-age poverty and pressure on state pensions",
        "Against: 3% default may be too low (people anchor on it); default fund may not suit everyone; paternalism; low-paid workers face a real trade-off with present needs; framing could be manipulative",
        "Evaluation: compare with alternatives (compulsory saving, tax incentives, education); effectiveness depends on default level; long run outcomes uncertain; stakeholders (workers, firms paying contributions, government, providers)",
      ]),
    ],
  },
  {
    id: "econ-c4b", topic: "econ-4", paper: "P2",
    title: "Text I — Healthy choices at FreshWay supermarkets in Selvaria",
    text: `<p><b>[1]</b> Selvaria is an upper-middle-income economy where obesity rates have doubled in 20 years. FreshWay, the country's second-largest supermarket chain, says it wants to help customers eat better while staying profitable.</p>
<p><b>[2]</b> In 2025 FreshWay moved fruit to the checkouts, where sweets used to be, and placed water at eye level in drinks fridges. Weekly fruit sales at pilot stores rose from 3200 to 4400 units. FreshWay calls this a <b>nudge</b> because nothing was banned and prices did not change.</p>
<p><b>[3]</b> FreshWay also labels products "Was $8, now $5". Behavioural economists point out that the "was" price acts as an anchor, making shoppers feel they have a bargain, and that people use simple rules of thumb when shopping quickly.</p>
<p><b>[4]</b> FreshWay's annual report states that revenue was $12.0 billion and total costs were $10.8 billion. The chief executive says the firm is not trying to maximise short-run profit: it aims for "a fair profit, a growing market share and a strong record of <b>corporate social responsibility</b>".</p>
<p><b>[5]</b> Shareholders are divided. Some fear that sweets earn higher margins than fruit and that the policy will cut profits; others argue that customers increasingly reward ethical firms. The government is considering making checkout sweet bans compulsory for all large supermarkets.</p>`,
    data: [
      { caption: "Table 1: FreshWay selected data, 2025", head: ["Indicator", "Value"], rows: [["Weekly fruit sales at pilot stores before change (units)", "3200"], ["Weekly fruit sales at pilot stores after change (units)", "4400"], ["Annual revenue ($ bn)", "12.0"], ["Annual total costs ($ bn)", "10.8"], ["Market share (%)", "24"]] },
    ],
    parts: [
      def("(a)(i)", "nudge", 2, ["A way of influencing people's behaviour/choices through the way options are presented [1]", "without restricting choice or significantly changing economic incentives [1]"]),
      def("(a)(ii)", "corporate social responsibility", 4, ["When a firm takes into account / acts in the interest of society and the environment [1]", "beyond its legal obligations and narrow profit objectives (ethical behaviour) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 37.5, tol: 0.05 }, q: "Using Table 1, calculate the percentage increase in weekly fruit sales at the pilot stores.", ms: ["(4400 − 3200)/3200 × 100 [M1]", "= 37.5% [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 1.2, tol: 0.01 }, q: "Using Table 1, calculate FreshWay's profit in 2025 (in $ billion).", ms: ["Profit = TR − TC = 12.0 − 10.8 = $1.2 bn [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 10, tol: 0.05 }, q: "Using Table 1, calculate FreshWay's profit as a percentage of revenue.", ms: ["1.2 / 12.0 × 100 [M1]", "= 10% [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using information from paragraph [2], explain how changing choice architecture can influence consumer behaviour.", ms: ["Choice architecture: the way choices are presented [1]", "Placing fruit at checkouts/water at eye level makes the healthy option the easy, salient one [1]", "Consumers with bounded rationality/limited attention choose what is convenient (impulse purchases) [1]", "Fruit sales rose 37.5% without bans or price changes, showing the effect of the nudge [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [3], explain how anchoring and rules of thumb affect consumer decisions.", ms: ["Anchoring: people rely heavily on the first piece of information they see [1]", "The \"was $8\" price makes $5 look like a bargain, raising willingness to buy [1]", "Rules of thumb (heuristics): mental shortcuts used to decide quickly [1]", "Shoppers in a hurry may buy 'offers' without comparing value, so decisions are not fully rational [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain why a firm may not aim to maximise profit.", ms: ["Traditional model assumes firms maximise profit [1]", "Market share: growth in sales may give long-run power and economies of scale, even at lower short-run profit [1]", "Corporate social responsibility: improves reputation and customer loyalty, may raise long-run profit [1]", "Satisficing: managers aim for a 'fair'/satisfactory profit to keep shareholders content while pursuing other goals [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraph [5], explain the difference between a nudge and compulsory regulation.", ms: ["A nudge keeps all options available (sweets still sold elsewhere in the store) [1]", "It changes behaviour by presentation, at low cost, with consumer freedom kept [1]", "Regulation is a legal rule, e.g. a compulsory ban on checkout sweets for all large supermarkets [1]", "It applies to all firms (no competitive disadvantage for FreshWay) but restricts choice and needs enforcement [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the effectiveness of nudges in improving diets in Selvaria.", [
        "Theory: rational choice vs behavioural economics; biases (anchoring, rules of thumb, availability, bounded rationality/self-control); choice architecture; nudge theory; business objectives (CSR, market share, satisficing)",
        "Text/data: fruit sales +37.5% [2]; profit $1.2 bn, 10% of revenue; 24% market share [Table 1]; anchoring [3]; shareholders' concerns [5]",
        "For: cheap, quick, keeps freedom of choice; measurable effect; firms can gain from CSR reputation",
        "Against: pilot results may not last or spread; consumers may buy sweets elsewhere; firms use nudges (anchoring) to raise sales of unhealthy goods too; profit motive may limit voluntary action; obesity has many causes (income, information, habits)",
        "Evaluation: nudges work best combined with regulation (compulsory checkout rules), taxes and education; short vs long run; stakeholders (consumers, FreshWay, shareholders, health system); depends on market-wide adoption",
      ]),
    ],
  },
  /* ---------------- econ-5 ---------------- */
  {
    id: "econ-c5b", topic: "econ-5", paper: "P2",
    title: "Text J — Tea, incomes and elasticity in Nyasso",
    text: `<p><b>[1]</b> Nyasso is a low-income economy where tea makes up 35% of exports. Like many <b>primary commodities</b>, tea is subject to large price swings on world markets.</p>
<p><b>[2]</b> In 2025 the world price of tea rose from $2.50 to $3.00 per kg after floods in a rival exporting country. Nyasso's tea output only rose from 500 to 520 thousand tonnes, because new bushes take about four years to produce leaves and land suitable for tea is limited.</p>
<p><b>[3]</b> Economists explain this using <b>price elasticity of supply</b>. They expect output to respond more strongly by 2029, when new estates planted in 2025 begin to produce.</p>
<p><b>[4]</b> Over the past decade, average incomes in Nyasso's main export markets rose by 10%, but their spending on tea rose by only 4%. Meanwhile Nyasso's imports of smartphones grew by 12% as Nyasso's own average income rose by 8%.</p>
<p><b>[5]</b> The Nyasso government earns revenue from an indirect tax on mobile data, which consumers regard as essential. It is considering raising this tax rather than taxing restaurant meals, which have many substitutes.</p>`,
    data: [
      { caption: "Table 1: Selected data for Nyasso", head: ["Indicator", "2024", "2025"], rows: [["World tea price ($ per kg)", "2.50", "3.00"], ["Nyasso tea output (thousand tonnes)", "500", "520"], ["Tea share of exports (%)", "33", "35"]] },
      { caption: "Table 2: Income and spending changes (%)", head: ["Indicator", "% change"], rows: [["Average income in main tea export markets (decade)", "+10"], ["Spending on tea in those markets (decade)", "+4"], ["Nyasso average income (2025)", "+8"], ["Nyasso smartphone imports (2025)", "+12"]] },
    ],
    parts: [
      def("(a)(i)", "primary commodities", 1, ["Raw materials/goods from the primary sector (agriculture, mining, fishing, forestry) [1]", "that are unprocessed and traded, often in competitive world markets (e.g. tea) [1]"]),
      def("(a)(ii)", "price elasticity of supply", 3, ["A measure of the responsiveness of quantity supplied [1]", "to a change in the good's price (%ΔQs / %ΔP) [1]"]),
      { n: "(b)(i)", marks: 1, diff: 1, numeric: { value: 20, tol: 0.05 }, q: "Using Table 1, calculate the percentage increase in the world price of tea.", ms: ["(3.00 − 2.50)/2.50 × 100 = 20% [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 2, numeric: { value: 0.2, tol: 0.01 }, q: "Using Table 1, calculate the price elasticity of supply of tea in Nyasso.", ms: ["%ΔQs = (520 − 500)/500 × 100 = 4%; %ΔP = 20% [M1]", "PES = 4/20 = 0.2 (inelastic) [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 1.5, tol: 0.01 }, q: "Using Table 2, calculate the income elasticity of demand for smartphones in Nyasso.", ms: ["YED = %ΔQd / %ΔY = 12/8 [M1]", "= 1.5 (income elastic, a luxury/normal good) [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a diagram, explain why the price elasticity of supply of tea is low in the short run (paragraphs [2] and [3]).", ms: ["Diagram: steep (inelastic) supply curve; price rise from $2.50 to $3.00 causes a small rise in quantity [1]", "Labels P, Q; possibly a flatter long-run supply curve [1]", "Time lag: new bushes take about four years to produce; limited suitable land [1]", "So in the short run quantity supplied responds proportionally less than price (PES = 0.2 < 1); by 2029 PES will be higher [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain why prices of primary commodities such as tea tend to be volatile.", ms: ["Diagram: steep/inelastic demand and supply curves [1]", "A shift in supply (e.g. floods in a rival country) causes a large change in price [1]", "Supply is inelastic (time lags, weather shocks); demand is inelastic (few substitutes, small share of income) [1]", "With both inelastic, small shifts lead to large price swings, so export earnings are unstable [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain the significance of income elasticity of demand for Nyasso's tea producers.", ms: ["YED for tea = 4/10 = 0.4: positive but less than 1, a necessity (income inelastic) [1]", "As world incomes grow, spending on tea grows proportionally less than income [1]", "So tea producers' share of world income falls over time (Engel's law / primary sector shrinks relative to manufacturing and services) [1]", "Compared with smartphones (YED 1.5), Nyasso benefits less from global growth - suggests diversification [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a diagram, explain why the government prefers to raise the tax on mobile data rather than on restaurant meals (paragraph [5]).", ms: ["Diagram: steep (inelastic) demand with supply shifting up by the tax; small fall in quantity, large revenue area [1]", "Contrast with elastic demand (restaurant meals): larger fall in quantity, smaller revenue [1]", "Mobile data is seen as essential, few substitutes, so PED is low [1]", "So the tax raises more revenue with less fall in consumption; burden falls mainly on consumers [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the significance of the low price elasticity of supply and low income elasticity of demand of tea for Nyasso's economy.", [
        "Theory: PES and its determinants (time, spare capacity, storage); YED (necessity vs luxury); primary commodity price volatility; Engel's law; diagrams of inelastic D and S",
        "Text/data: PES = 0.2 [Table 1]; price +20%; tea 35% of exports [1]; YED for tea 0.4 vs smartphones 1.5 [Table 2]; new estates by 2029 [3]",
        "Problems: volatile export earnings and farmer incomes; cannot respond quickly to high prices; falling share of world spending as incomes grow; import demand (YED 1.5) rises faster than export demand - trade pressure",
        "Mitigating factors: higher prices raise revenue in the short run because quantity barely changes; PES rises in the long run; buffer stocks, insurance, value-added processing; diversification into higher-YED goods",
        "Evaluation: short run vs long run; dependence on one commodity is the core issue; stakeholders (farmers, government, consumers); the size of the problem depends on world conditions",
      ]),
    ],
  },
  /* ---------------- econ-6 ---------------- */
  {
    id: "econ-c6a", topic: "econ-6", paper: "P2",
    title: "Text K — Rent control in Arvenna",
    text: `<p><b>[1]</b> Arvenna is the capital of a high-income country. Rapid job growth has pushed the equilibrium rent for a standard flat to $1200 per month, and many young workers and nurses say they cannot afford to live in the city.</p>
<p><b>[2]</b> In 2025 the city council introduced a <b>price ceiling</b>: landlords may charge no more than $900 per month for a standard flat. Table 1 shows estimates of the monthly market for flats.</p>
<p><b>[3]</b> Within a year, some landlords sold their flats or turned them into short-stay tourist rentals, which are not controlled. Waiting lists for flats grew, and spending on repairs fell.</p>
<p><b>[4]</b> Housing charities report a growing <b>parallel market</b>: some tenants pay illegal "key money" of several thousand dollars to secure a controlled flat.</p>
<p><b>[5]</b> Opposition councillors propose an alternative: abolish the ceiling and give a subsidy to builders of new rental flats, plus a housing allowance for low-income tenants.</p>`,
    data: [
      { caption: "Table 1: Monthly market for standard flats in Arvenna (thousand flats)", head: ["Rent ($ per month)", "Quantity demanded", "Quantity supplied"], rows: [["900", "62", "38"], ["1000", "58", "42"], ["1100", "54", "46"], ["1200", "50", "50"], ["1300", "46", "54"]] },
    ],
    parts: [
      def("(a)(i)", "price ceiling", 2, ["A maximum price set by the government [1]", "below the equilibrium price, which sellers cannot legally exceed [1]"]),
      def("(a)(ii)", "parallel market", 4, ["An illegal/unofficial market [1]", "in which goods are sold at prices above the legal maximum (black market) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 24, tol: 0.05 }, q: "Using Table 1, calculate the shortage of flats at the maximum rent (in thousands).", ms: ["At $900: Qd = 62, Qs = 38 [M1]", "Shortage = 62 − 38 = 24 thousand flats [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: -24, tol: 0.05 }, q: "Using Table 1, calculate the percentage change in the quantity of flats supplied compared with the equilibrium.", ms: ["(38 − 50)/50 × 100 = −24% [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: -25.8, tol: 0.05 }, q: "Using Table 1, calculate the change in landlords' total monthly rental income caused by the price ceiling (in $ million).", ms: ["Before: $1200 × 50 000 = $60 m; after: $900 × 38 000 = $34.2 m [M1]", "Change = −25.8 ($ million per month) [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a demand and supply diagram, explain the effect of the price ceiling on the market for flats.", ms: ["Diagram: ceiling drawn below equilibrium at $900 [1]", "Qd (62) and Qs (38) marked, shortage of 24 thousand shown [1]", "Lower rent raises quantity demanded and lowers quantity supplied (less profitable) [1]", "Excess demand persists because price cannot rise: waiting lists, non-price rationing [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a diagram, explain the effect of the price ceiling on consumer surplus, producer surplus and welfare.", ms: ["Diagram: CS and PS areas before and after; welfare loss triangle between Qs = 38 and Qe = 50 [1]", "Producer surplus falls (lower price, lower quantity) [1]", "Consumer surplus: tenants who get flats gain (transfer from landlords); those without flats lose [1]", "Net welfare (deadweight) loss because fewer flats are rented than at the allocatively efficient output (MB > MC) [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using information from paragraphs [3] and [4], explain two unintended consequences of the price ceiling.", ms: ["Fewer flats supplied: landlords sell or switch to uncontrolled tourist rentals; lower spending on repairs reduces quality [1]", "Explained by lower rent reducing the incentive to supply/maintain [1]", "Parallel market: tenants pay illegal key money [1]", "Because those with unmet demand are willing to pay more than $900, so the true cost of housing rises for some [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a diagram, explain how a subsidy to builders of rental flats could affect the market (paragraph [5]).", ms: ["Diagram: supply shifts right (S → S + subsidy) [1]", "Lower rent and higher quantity of flats; subsidy per unit shown as vertical distance [1]", "Subsidy lowers costs, so more flats are built/rented at every rent [1]", "Unlike the ceiling, it increases quantity (reduces shortage) but has a fiscal (opportunity) cost to government [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the use of a price ceiling to make housing affordable in Arvenna.", [
        "Theory: price ceiling, shortage, non-price rationing, parallel markets, welfare loss; consequences for stakeholders; alternatives (subsidy, direct provision, housing allowance)",
        "Text/data: shortage 24 thousand flats; supply −24%; landlords' income −$25.8 m per month [Table 1]; sold flats, tourist rentals, repairs [3]; key money [4]",
        "For: immediate fall in rent for tenants who have flats; equity for key workers; no direct government spending",
        "Against: shortage worsens over time (PES larger in the long run); lower quality; parallel market; welfare loss; flats may go to the well-connected rather than the poorest",
        "Evaluation: depends on PED/PES and level of the ceiling; short vs long run; alternatives have costs (subsidy/allowance funded by tax, allowances may raise rents if supply is inelastic); a combined approach (build more homes) best addresses the root cause",
      ]),
    ],
  },
  {
    id: "econ-c6b", topic: "econ-6", paper: "P2",
    title: "Text L — Guaranteed wheat prices in Dovaria",
    text: `<p><b>[1]</b> Dovaria is a lower-middle-income economy in which 40% of workers are farmers. After several years of low world prices, rural incomes fell and many young people left for the cities.</p>
<p><b>[2]</b> In 2025 the government introduced a <b>price floor</b> for wheat of $300 per tonne, above the market equilibrium price of $250. The state grain agency buys any wheat that farmers cannot sell at this price (Table 1).</p>
<p><b>[3]</b> The agency's warehouses are now full. Some stored wheat has rotted, and the agency has sold part of its stock abroad at low prices, angering farmers in neighbouring countries.</p>
<p><b>[4]</b> Urban households complain that bread prices have risen. Poor families spend up to a third of their income on food.</p>
<p><b>[5]</b> The agriculture minister also proposes a <b>subsidy</b> on fertiliser, saying it would raise yields and lower costs. The finance ministry warns that the total cost of farm support is already larger than the education budget.</p>`,
    data: [
      { caption: "Table 1: Wheat market in Dovaria, 2025", head: ["Indicator", "Free market", "With price floor"], rows: [["Price ($ per tonne)", "250", "300"], ["Quantity demanded (million tonnes)", "9.0", "8.0"], ["Quantity supplied (million tonnes)", "9.0", "10.5"]] },
    ],
    parts: [
      def("(a)(i)", "price floor", 2, ["A minimum price set by the government [1]", "above the equilibrium price, below which the good cannot legally be sold [1]"]),
      def("(a)(ii)", "subsidy", 5, ["A payment from the government to producers [1]", "per unit of output (or to lower costs), increasing supply [1]"]),
      { n: "(b)(i)", marks: 1, diff: 1, numeric: { value: 2.5, tol: 0.01 }, q: "Using Table 1, calculate the surplus of wheat with the price floor.", ms: ["10.5 − 8.0 = 2.5 million tonnes [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 2, numeric: { value: 750, tol: 0.5 }, q: "Using Table 1, calculate the cost to the government of buying the surplus (in $ million).", ms: ["$300 × 2.5 million tonnes [M1]", "= $750 million [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 900, tol: 0.5 }, q: "Using Table 1, calculate the change in farmers' total revenue as a result of the price floor (in $ million).", ms: ["Before: 250 × 9.0 m = $2250 m; after: 300 × 10.5 m = $3150 m (including sales to the agency) [M1]", "Increase = $900 million [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a diagram, explain the effect of the price floor on the wheat market.", ms: ["Diagram: price floor at $300 above equilibrium $250 [1]", "Qd = 8.0, Qs = 10.5 marked; surplus of 2.5 m tonnes shown and the government purchase area (Pmin × surplus) [1]", "Higher price raises quantity supplied and lowers quantity demanded [1]", "Surplus must be bought and stored by the state agency, otherwise the price would fall [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraphs [3] and [4], explain two consequences of the price floor for stakeholders other than farmers.", ms: ["Consumers: pay higher price ($300 vs $250) and buy less; bread prices rise [1]", "Regressive impact: poor families spend up to a third of income on food [1]", "Foreign producers: surplus dumped abroad at low prices lowers world prices and their incomes [1]", "Government/taxpayers: $750 m cost plus storage; waste (rotting) - opportunity cost e.g. education [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain the likely effect of a fertiliser subsidy on the wheat market (paragraph [5]).", ms: ["Diagram: supply of wheat shifts right/down [1]", "Lower market price and higher quantity [1]", "Fertiliser subsidy lowers costs of production and raises yields [1]", "Consumers pay less; but with the floor still in place the surplus would grow, increasing the cost of the scheme [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using a diagram, explain why the price floor causes allocative inefficiency.", ms: ["Diagram: welfare loss area shown [1]", "At Qs = 10.5 m, MC exceeds MB (overproduction beyond Qe = 9.0 m) [1]", "Resources are used to produce wheat that consumers do not value at its cost (stored or wasted) [1]", "Social surplus is lower than in the free market, so there is a welfare (deadweight) loss [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the Dovarian government's use of a price floor to support farmers.", [
        "Theory: price floor, surplus, government purchase, allocative inefficiency, welfare loss; subsidy; consequences for stakeholders",
        "Text/data: surplus 2.5 m tonnes, cost $750 m, farm revenue +$900 m [Table 1]; rotting and dumping [3]; bread prices and poor families [4]; cost exceeds education budget [5]",
        "For: raises and stabilises farm incomes in an economy where 40% of workers farm; may slow rural-urban migration; food security",
        "Against: higher food prices hurt poor households (regressive); large fiscal and storage costs; waste and overproduction; dumping harms neighbours; opportunity cost (education)",
        "Evaluation: alternatives - direct income support, subsidies for productivity, investment in rural infrastructure; depends on the size of the floor relative to equilibrium; short vs long run (surpluses accumulate); stakeholders' weighting",
      ]),
    ],
  },
  /* ---------------- econ-7 ---------------- */
  {
    id: "econ-c7a", topic: "econ-7", paper: "P2",
    title: "Text M — Cleaning up cement in Industria",
    text: `<p><b>[1]</b> Industria is an upper-middle-income economy whose rapid building boom depends on cement. Cement kilns release large amounts of carbon dioxide and fine dust, which damage the health of nearby residents.</p>
<p><b>[2]</b> These costs are not paid by cement producers or their customers, so the industry creates a <b>negative externality of production</b>. Hospitals near the plants report rising cases of asthma.</p>
<p><b>[3]</b> In 2024 the government introduced a carbon tax of $25 per tonne of CO₂. Emissions from the industry fell from 6.0 million tonnes in 2023 to 4.8 million tonnes in 2025, and cement prices rose by 6%.</p>
<p><b>[4]</b> Industry groups argue that a system of <b>tradable permits</b> would be better. The government would issue 4.0 million permits, each allowing one tonne of CO₂, and firms could buy and sell them. Pilot trading suggests a permit price of about $32.</p>
<p><b>[5]</b> Environmental groups want the number of permits to fall by 5% a year. Builders fear higher costs will slow housing construction, while the finance ministry would like to use the tax revenue to fund cleaner kilns.</p>`,
    data: [
      { caption: "Table 1: Cement industry emissions in Industria", head: ["Indicator", "2023", "2025"], rows: [["CO₂ emissions (million tonnes)", "6.0", "4.8"], ["Carbon tax ($ per tonne)", "0", "25"], ["Cement price index", "100", "106"]] },
    ],
    parts: [
      def("(a)(i)", "negative externality of production", 2, ["A situation where the production of a good creates external costs for third parties [1]", "not reflected in the price, so marginal social cost is greater than marginal private cost (MSC > MPC) [1]"]),
      def("(a)(ii)", "tradable permits", 4, ["Permits issued by the government allowing firms to emit a certain quantity of pollution [1]", "which can be bought and sold between firms (cap and trade) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 120, tol: 0.5 }, q: "Using Table 1, calculate the carbon tax revenue from the cement industry in 2025 (in $ million).", ms: ["$25 × 4.8 million tonnes [M1]", "= $120 million [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: -20, tol: 0.05 }, q: "Using Table 1, calculate the percentage change in emissions between 2023 and 2025.", ms: ["(4.8 − 6.0)/6.0 × 100 = −20% [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 3.8, tol: 0.01 }, q: "Using paragraph [4], calculate the number of permits that would be issued after one year if the total falls by 5% (in millions).", ms: ["4.0 × (1 − 0.05) [M1]", "= 3.8 million permits [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using a diagram, explain why the free market leads to overproduction of cement (paragraphs [1] and [2]).", ms: ["Diagram: MSC above MPC; MPB = MSB; Qm where MPC = MPB and Qopt where MSC = MSB [1]", "Welfare loss triangle between Qopt and Qm, pointing to Qopt [1]", "Producers ignore external costs (health damage, CO₂) so MSC > MPC [1]", "Market output Qm > socially optimal Qopt: over-allocation of resources, market failure [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a diagram, explain how the carbon tax could correct the market failure (paragraph [3]).", ms: ["Diagram: MPC shifts up by the tax towards MSC [1]", "Output falls towards Qopt; price rises [1]", "Tax internalises the externality: producers pay for (part of) the external cost [1]", "Higher costs/price (cement price +6%) reduce quantity; emissions fell 20% and firms have an incentive to adopt cleaner kilns [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain how a market for tradable permits would determine the permit price (paragraph [4]).", ms: ["Diagram: vertical supply of permits at 4.0 million; downward-sloping demand; price $32 [1]", "Axes: price of permits and quantity of permits [1]", "The government caps total emissions; firms that can cut emissions cheaply sell permits, high-cost abaters buy [1]", "Cutting permits (e.g. to 3.8 million) shifts supply left, raising the permit price and the incentive to reduce pollution [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraph [5], explain how correcting the externality may affect two stakeholders.", ms: ["Builders/consumers: higher cement costs raise construction costs; fewer houses built in the short run [1]", "Because the tax/permit cost is partly passed on in higher prices (depends on PED) [1]", "Residents/society: less dust and CO₂ improve health, lower asthma treatment costs [1]", "Government: $120 m revenue can fund cleaner kilns or compensate low-income households [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate whether tradable permits would be more effective than the carbon tax in reducing pollution from Industria's cement industry.", [
        "Theory: negative production externality (MSC > MPC, welfare loss); carbon tax (internalising, Pigouvian); tradable permits (cap and trade); regulation as an alternative",
        "Text/data: emissions −20% (6.0 → 4.8 m t); tax revenue $120 m; price +6% [Table 1]; 4.0 m permits at $32 [4]; 5% annual cut to 3.8 m [5]",
        "Permits: certainty about quantity of emissions; market finds lowest-cost abatement; can tighten cap over time; but price uncertainty, need monitoring, risk of lobbying for too many permits, possible windfalls if given free",
        "Tax: certainty about price/cost; raises revenue; simple; but hard to know the external cost so set at the right level; emissions outcome uncertain if demand is inelastic",
        "Evaluation: both face measurement and enforcement problems; impact on housing costs and competitiveness; could combine with subsidies for clean technology; depends on administrative capacity in an upper-middle-income economy",
      ]),
    ],
  },
  {
    id: "econ-c7b", topic: "econ-7", paper: "P2",
    title: "Text N — Empty nets and plastic bags in Lagosa",
    text: `<p><b>[1]</b> Lagosa is a low-income coastal economy where 1500 small boats fish the waters of Sardine Bay. The fish stock is a <b>common pool resource</b>: anyone with a boat can fish, and each tonne taken leaves less for others.</p>
<p><b>[2]</b> As more boats used larger nets, the estimated fish stock fell from 800 000 tonnes in 2015 to 520 000 tonnes in 2025. The total annual catch was 210 000 tonnes in 2025, and catches per trip are falling.</p>
<p><b>[3]</b> Each fisher reasons that if they fish less, others will simply catch the fish instead. Scientists warn that the stock could collapse within a decade.</p>
<p><b>[4]</b> The government is considering annual catch quotas, a ban on fishing during the breeding season, and handing control of the bay to local fishing communities. Enforcement is difficult because the coast guard has only four patrol boats.</p>
<p><b>[5]</b> Meanwhile plastic bags dumped by shoppers block drains and harm marine life - a <b>negative externality of consumption</b>. A $0.10 levy on each bag cut use in the capital from 40 million to 12 million bags a year.</p>`,
    data: [
      { caption: "Table 1: Sardine Bay fishery and plastic bags in Lagosa", head: ["Indicator", "Earlier year", "2025"], rows: [["Estimated fish stock (thousand tonnes)", "800 (2015)", "520"], ["Number of boats", "900 (2015)", "1500"], ["Total catch (thousand tonnes)", "150 (2015)", "210"], ["Plastic bags used in capital (million per year)", "40 (2023)", "12"]] },
    ],
    parts: [
      def("(a)(i)", "common pool resource", 1, ["A resource that is non-excludable (no one can be prevented from using it) [1]", "and rivalrous (use by one reduces the amount available to others) [1]"]),
      def("(a)(ii)", "negative externality of consumption", 5, ["The consumption of a good creates external costs for third parties [1]", "so marginal social benefit is less than marginal private benefit (MSB < MPB) [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: -35, tol: 0.05 }, q: "Using Table 1, calculate the percentage change in the estimated fish stock between 2015 and 2025.", ms: ["(520 − 800)/800 × 100 [M1]", "= −35% [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 140, tol: 0.5 }, q: "Using Table 1, calculate the average catch per boat in 2025 (in tonnes).", ms: ["210 000 / 1500 = 140 tonnes per boat [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 1, numeric: { value: 1.2, tol: 0.01 }, q: "Using paragraph [5], calculate the revenue from the plastic bag levy in the capital after the levy (in $ million).", ms: ["$0.10 × 12 million bags [M1]", "= $1.2 million per year [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using information from paragraphs [1] to [3], explain why the free market leads to overfishing in Sardine Bay.", ms: ["The fish stock is non-excludable: anyone with a boat can fish [1]", "And rivalrous: each tonne caught reduces fish for others [1]", "Each fisher acts in self-interest, ignoring the cost to others and to future stocks (tragedy of the commons) [1]", "So the stock is depleted (−35%) - unsustainable; boats rose from 900 to 1500 [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a diagram, explain the market failure caused by plastic bags (paragraph [5]).", ms: ["Diagram: MSB below MPB; MPC = MSC; Qm where MPB = MPC, Qopt where MSB = MSC [1]", "Welfare loss triangle between Qopt and Qm, pointing to Qopt [1]", "Shoppers ignore external costs of blocked drains and harm to marine life [1]", "So Qm > Qopt: overconsumption, over-allocation of resources [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a diagram, explain how the plastic bag levy reduced bag use (paragraph [5]).", ms: ["Diagram: indirect tax shifts supply up by $0.10 (or reduces MPB effectively), new Q lower [1]", "Quantity falls towards Qopt (40 m → 12 m) [1]", "Higher price makes consumers face (part of) the external cost [1]", "Reusable bags are close substitutes, so demand is elastic and use fell by 70% [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraph [4], explain two possible government responses to overfishing.", ms: ["Quotas: legal limit on catch keeps it within sustainable yield [1]", "But need monitoring; only four patrol boats so cheating is likely [1]", "Community management: local fishers own/control access, so they have an incentive to conserve (collective self-governance) [1]", "Breeding-season ban protects reproduction; cheap to state but also hard to enforce [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the measures the Lagosa government could use to achieve sustainable use of Sardine Bay.", [
        "Theory: common pool resources (rivalrous, non-excludable), tragedy of the commons, sustainability; government responses: quotas, legislation, taxes, permits, collective self-governance, international cooperation",
        "Text/data: stock −35%; 1500 boats, 140 tonnes each; catch rising while stock falls [Table 1]; four patrol boats [4]; levy success shows price incentives work [5]",
        "Quotas/bans: directly limit catch but costly to enforce; reduce incomes of poor fishers in the short run",
        "Community management: low cost, uses local knowledge, builds trust; may fail if outsiders fish or communities disagree",
        "Evaluation: short-run hardship vs long-run survival of the fishery; low-income country with weak enforcement; alternative jobs/aquaculture; may need aid or regional agreements; combination of measures most likely to work",
      ]),
    ],
  },
  /* ---------------- econ-8 ---------------- */
  {
    id: "econ-c8a", topic: "econ-8", paper: "P2",
    title: "Text O — Flood defences in the Ravana delta",
    text: `<p><b>[1]</b> Ravana is a low-income country whose most populated region lies in a river delta. Rising sea levels and stronger storms have made floods more frequent; in 2024 flooding destroyed 60 000 homes.</p>
<p><b>[2]</b> Engineers propose a 120 km embankment that would protect 1.5 million households. Once built, it protects every household behind it, and protecting one more household does not reduce the protection of others. It is a <b>public good</b>.</p>
<p><b>[3]</b> No private firm has offered to build it. A survey found that only 30% of households would voluntarily pay a $60 contribution. Many said, "If my neighbours pay, I will be protected anyway" - the <b>free rider problem</b>.</p>
<p><b>[4]</b> The project would cost $90 million, equal to a large share of the government's $1200 million annual budget. Building it would mean postponing two new hospitals.</p>
<p><b>[5]</b> An international development bank has offered a low-interest loan. Some officials suggest a toll on a road built on top of the embankment, to recover part of the cost from the users of the road.</p>`,
    data: [
      { caption: "Table 1: Ravana flood embankment project", head: ["Indicator", "Value"], rows: [["Cost ($ million)", "90"], ["Households protected (million)", "1.5"], ["Households willing to pay voluntarily (%)", "30"], ["Voluntary contribution per household ($)", "60"], ["Government annual budget ($ million)", "1200"]] },
    ],
    parts: [
      def("(a)(i)", "public good", 2, ["A good that is non-rivalrous (consumption by one does not reduce the amount available to others) [1]", "and non-excludable (people cannot be prevented from consuming it) [1]"]),
      def("(a)(ii)", "free rider problem", 3, ["When people benefit from a good without paying for it [1]", "because they cannot be excluded, so private firms cannot charge and the good is under-provided/not provided [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 60, tol: 0.05 }, q: "Using Table 1, calculate the cost of the embankment per household protected.", ms: ["$90 million / 1.5 million households [M1]", "= $60 per household [A1]"] },
      { n: "(b)(ii)", marks: 1, diff: 1, numeric: { value: 7.5, tol: 0.05 }, q: "Using Table 1, calculate the cost of the project as a percentage of the government's annual budget.", ms: ["90 / 1200 × 100 = 7.5% [A1]"] },
      { n: "(b)(iii)", marks: 2, diff: 2, numeric: { value: 63, tol: 0.5 }, q: "Using Table 1, calculate the funding shortfall if the project relied only on voluntary contributions (in $ million).", ms: ["Contributions = 0.30 × 1.5 m × $60 = $27 m [M1]", "Shortfall = 90 − 27 = $63 million [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using information from paragraph [2], explain why the flood embankment is a public good.", ms: ["Non-rivalrous: protecting one more household does not reduce the protection for others [1]", "The marginal cost of an extra household protected is zero [1]", "Non-excludable: once built it protects every household behind it; non-payers cannot be excluded [1]", "Hence it has both characteristics of a pure public good [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using information from paragraph [3], explain why the free market will fail to provide the embankment.", ms: ["Because it is non-excludable, people can benefit without paying (free riding) [1]", "Only 30% would pay, raising $27 m of the $90 m needed [1]", "Private firms cannot charge enough to cover costs and make a profit [1]", "So there is a missing market: the good is not provided even though society values it - market failure [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using a production possibilities curve diagram, explain the opportunity cost to the government of building the embankment (paragraph [4]).", ms: ["Diagram: PPC with axes flood defences and other public goods/services (e.g. hospitals) [1]", "Movement along the PPC towards more flood defences and fewer hospitals [1]", "Scarce budget ($1200 m) means $90 m spent on the embankment cannot be used elsewhere [1]", "The opportunity cost is the next best alternative forgone: two new hospitals [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraph [5], explain how a toll road changes the nature of the good provided.", ms: ["A toll makes the road excludable: non-payers can be kept off [1]", "The road is non-rivalrous until congestion, so it is a quasi-public good [1]", "Excludability allows a price to be charged and part of the cost recovered [1]", "But the flood protection itself remains non-excludable, so tolls cannot fund the whole project [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the options for providing flood defences in Ravana.", [
        "Theory: public goods (non-rival, non-excludable); free rider problem; missing market; direct provision; contracting out/public-private partnership; opportunity cost and PPC; quasi-public goods",
        "Text/data: cost $90 m = 7.5% of budget; $60 per household; voluntary scheme short by $63 m [Table 1]; hospitals postponed [4]; loan and toll [5]",
        "Direct government provision: overcomes free riding, protects all; but opportunity cost (hospitals) and limited tax revenue in a low-income country",
        "Loan/foreign aid: spreads cost over time; but debt servicing and conditions; tolls recover part of cost but may exclude the poor",
        "Evaluation: large external benefits (homes, lives, farmland) may exceed costs; climate change makes need growing; priorities and stakeholders; a mix of government funding, development loan and limited tolls is likely",
      ]),
    ],
  },
  {
    id: "econ-c8b", topic: "econ-8", paper: "P2",
    title: "Text P — Streetlights, science and broadcasting in Halvik",
    text: `<p><b>[1]</b> Halvik is a city of 620 000 people in a high-income country. The city council spends $18.6 million a year on street lighting. Lighting a street for one more passer-by costs nothing extra, so street lighting is <b>non-rivalrous</b>, and no one can be stopped from benefiting from it.</p>
<p><b>[2]</b> The national government funds basic scientific research at universities. Discoveries are soon freely available to everyone, so private firms invest little in this kind of research.</p>
<p><b>[3]</b> The public broadcaster is funded by an annual licence fee of $150, paid by households that own a television. Of the 2.5 million households in the country, 2.2 million paid in 2025.</p>
<p><b>[4]</b> Streaming technology now makes it easy to block people who do not pay. Some politicians argue that the broadcaster should become a subscription service, like private streaming platforms.</p>
<p><b>[5]</b> Supporters of public broadcasting argue that it provides impartial news and educational programmes that private firms would under-provide, and that <b>direct provision</b> by the state is still justified.</p>`,
    data: [
      { caption: "Table 1: Selected public spending data", head: ["Indicator", "Value"], rows: [["Halvik street lighting spending ($ million per year)", "18.6"], ["Halvik population", "620 000"], ["Licence fee per household ($)", "150"], ["Households in the country (million)", "2.5"], ["Households paying the fee, 2025 (million)", "2.2"]] },
    ],
    parts: [
      def("(a)(i)", "non-rivalrous", 1, ["A characteristic of a good where consumption by one person [1]", "does not reduce the amount available for others to consume (zero marginal cost of an extra user) [1]"]),
      def("(a)(ii)", "direct provision", 5, ["When the government supplies a good or service itself [1]", "funded by taxes/public money, often free at the point of use [1]"]),
      { n: "(b)(i)", marks: 2, diff: 1, numeric: { value: 30, tol: 0.05 }, q: "Using Table 1, calculate the annual cost of street lighting per resident of Halvik.", ms: ["$18.6 million / 620 000 [M1]", "= $30 per resident [A1]"] },
      { n: "(b)(ii)", marks: 2, diff: 1, numeric: { value: 330, tol: 0.5 }, q: "Using Table 1, calculate the licence fee revenue in 2025 (in $ million).", ms: ["$150 × 2.2 million [M1]", "= $330 million [A1]"] },
      { n: "(b)(iii)", marks: 1, diff: 1, numeric: { value: 12, tol: 0.05 }, q: "Using Table 1, calculate the percentage of households that did not pay the licence fee.", ms: ["(2.5 − 2.2)/2.5 × 100 = 12% [A1]"] },
      { n: "(c)", marks: 4, diff: 2, q: "Using information from paragraph [1], explain why street lighting would not be provided by the free market.", ms: ["Non-rivalrous: an extra user costs nothing extra and does not reduce lighting for others [1]", "Non-excludable: impossible to stop non-payers from benefiting [1]", "Free rider problem: people will not pay voluntarily if they benefit anyway [1]", "Firms cannot earn revenue, so there is a missing market; the council provides it from taxes ($30 per resident) [1]"] },
      { n: "(d)", marks: 4, diff: 2, q: "Using a diagram, explain why basic scientific research is under-provided by the free market (paragraph [2]).", ms: ["Diagram: positive externality - MSB above MPB (or MSC below MPC); Qm < Qopt [1]", "Welfare loss triangle between Qm and Qopt, pointing to Qopt [1]", "Discoveries spread freely: firms cannot capture all the benefits (non-excludable, non-rival knowledge) [1]", "So private investment is below the socially optimal level - under-allocation; the government funds research [1]"] },
      { n: "(e)", marks: 4, diff: 2, q: "Using information from paragraphs [3] and [4], explain how technology has changed the nature of broadcasting as a good.", ms: ["Traditional broadcasts were non-excludable: anyone with a TV could watch, so 12% avoided the fee (free riding) [1]", "Broadcasting is non-rivalrous: one more viewer does not reduce viewing for others [1]", "Streaming makes it excludable: non-payers can be blocked [1]", "So it becomes a club/quasi-public good that private firms can sell by subscription [1]"] },
      { n: "(f)", marks: 4, diff: 2, q: "Using information from paragraphs [1] and [5], explain the opportunity cost of direct provision of public goods by government.", ms: ["Government resources (tax revenue) are scarce [1]", "Money spent on street lighting ($18.6 m) or broadcasting cannot be spent on other services [1]", "Opportunity cost: next best alternative forgone, e.g. schools, health care, or lower taxes [1]", "Taxation to fund it also reduces households' disposable income and private consumption [1]"] },
      ext("Using information from the text/data and your knowledge of economics, evaluate the view that the public broadcaster in Halvik's country should become a subscription service.", [
        "Theory: public goods (non-rival, non-excludable); free rider problem; quasi-public/club goods; positive externalities and merit-good aspects of information; direct provision; opportunity cost",
        "Text/data: licence fee revenue $330 m; 12% of households did not pay [Table 1]; streaming allows exclusion [4]; impartial news and education [5]",
        "For subscription: technology removes non-excludability; ends free riding; consumers pay according to use; frees public funds (opportunity cost)",
        "Against: news and education create external benefits (informed citizens, democracy) that would be under-consumed; low-income households might be excluded; private firms may under-provide minority/educational content; zero marginal cost means excluding viewers is allocatively inefficient",
        "Evaluation: hybrid funding (fee for some content, public funding for news); depends on whether the broadcaster's content differs from private platforms; stakeholders (viewers, taxpayers, private competitors); value judgements about the role of the state",
      ]),
    ],
  },
  ]);
})();
