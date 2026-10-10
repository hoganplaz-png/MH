/* Economics SL - Paper 1 essay bank in the current IB format (first exams 2022).
   Each Paper 1 question has part (a) [10 marks: explain / analyse, AO2] and part (b) [15 marks: "Using real-world
   examples", evaluate / discuss / examine / to what extent, AO3]. Questions are original, modelled on the wording and
   topic spread of recent IB papers. Markband summaries follow the published SL Paper 1 markbands. */
(function () {
  const A = ["Level 5 (9-10): relevant knowledge; key terms defined; diagram(s) accurate, labelled and fully explained; effective analysis",
    "Level 3-4 (5-8): mostly relevant; some terms defined; diagram with minor errors or partly explained; some analysis"];
  const B = ["Level 5 (13-15): balanced, effective evaluation backed by appropriate real-world example(s) explicitly linked to theory; terms defined; diagrams fully explained",
    "Level 3-4 (7-12): some evaluation, may be unbalanced; real-world example(s) present but not fully linked; some theory"];
  const EV = "Evaluation (CLASP): short vs long run, stakeholders affected, assumptions (ceteris paribus), priorities (efficiency vs equity), conclusion with a justified judgement";
  const out = {};
  const add = (topic, pairs) => {
    out[topic] = [];
    for (const [qa, ma, qb, mb] of pairs) {
      out[topic].push({ id: `${topic}-p1-${out[topic].length / 2 + 1}a`, paper: "P1", type: "extended", marks: 10, diff: 2, q: "<strong>(a)</strong> " + qa + " [10]", ms: [A[0], ...ma, A[1]] });
      out[topic].push({ id: `${topic}-p1-${(out[topic].length - 1) / 2 + 1}b`, paper: "P1", type: "extended", marks: 15, diff: 3, q: "<strong>(b)</strong> Using real-world examples, " + qb + " [15]", ms: [B[0], ...mb, EV, B[1]] });
    }
  };

  add("econ-1", [
    ["Using a production possibilities curve (PPC) diagram, explain how scarcity leads to choice and opportunity cost.",
      ["Define scarcity, choice and opportunity cost", "Diagram: PPC with two goods on the axes, points on, inside and outside the curve", "Moving along the PPC: producing more of one good means giving up some of the other (opportunity cost)", "Bowed-out shape: increasing opportunity cost as resources are not equally suited to both goods", "Points inside: unemployed resources; points outside: unattainable with current resources"],
      "evaluate the view that economic growth is necessary for economic development.",
      ["Define economic growth (rise in real GDP) and economic development (broader rise in well-being: health, education, freedom)", "Diagram: outward shift of the PPC or LRAS", "For: growth raises incomes and tax revenue to fund health and education", "Against: growth may be unequal, environmentally unsustainable, or not reach the poor", "Example, e.g. China's growth cut extreme poverty; Equatorial Guinea high GDP but low HDI", "Development can come from redistribution or social policy without high growth, e.g. Kerala, Costa Rica"]],
    ["Explain the difference between positive and normative economics, using examples.",
      ["Define positive statements (testable, factual) and normative statements (value judgements, 'should')", "Example of each, e.g. 'unemployment is 5%' vs 'the government should cut unemployment'", "Role of positive economics in building and testing models (ceteris paribus)", "Role of normative economics in policy choices and priorities", "Link to the central concepts: efficiency vs equity"],
      "discuss the extent to which behavioural economics challenges the assumptions of rational consumer choice.",
      ["Define rational consumer choice: consistent preferences, utility maximisation, perfect information", "Biases: rules of thumb, anchoring, framing, availability bias", "Bounded rationality, bounded self-control, bounded selfishness", "Example, e.g. nudges such as default pension enrolment (UK auto-enrolment), sugar labelling", "Rational model still useful for predicting aggregate behaviour", "Behavioural results vary by context; policy implications uncertain"]],
  ]);

  add("econ-2", [
    ["Using a diagram, explain the difference between a change in demand and a change in quantity demanded.",
      ["Define demand and the law of demand", "Diagram: movement along a demand curve from a change in price", "Diagram: shift of the demand curve from a change in a non-price determinant", "Non-price determinants: income, price of substitutes/complements, tastes, population, expectations", "Clear link from diagram to explanation"],
      "evaluate the effects of a significant increase in the price of a key input (such as energy) on different stakeholders.",
      ["Diagram: supply shifts left, higher equilibrium price, lower quantity", "Consumers: higher prices, lower real income, regressive effect", "Producers: higher costs and lower profits; some pass costs on depending on PED", "Workers: possible job losses in energy-intensive industries", "Government: pressure for subsidies or price controls; tax revenue effects", "Example, e.g. 2022 European gas price spike after the war in Ukraine"]],
    ["Using a diagram, explain how the price mechanism allocates resources through signalling and incentives.",
      ["Define price mechanism, signalling and incentive functions", "Diagram: increase in demand creating a shortage at the original price", "Rising price signals scarcity to producers and consumers", "Incentive for firms to supply more (profit) and for consumers to ration (buy less)", "New equilibrium where shortage is eliminated"],
      "discuss the view that markets are the most efficient way to allocate scarce resources.",
      ["Define allocative efficiency (MSB = MSC; social surplus maximised)", "Diagram: competitive equilibrium with consumer and producer surplus", "For: price signals, consumer sovereignty, innovation", "Against: market failure (externalities, public goods, information asymmetry) and inequality", "Example, e.g. vaccine distribution in COVID-19 or housing markets", "Most economies are mixed; depends on government effectiveness"]],
  ]);

  add("econ-3", [
    ["Explain why the price elasticity of demand (PED) for some goods is more elastic than for others.",
      ["Define PED and give the formula", "Determinants: number and closeness of substitutes", "Necessity vs luxury; habit-forming goods", "Proportion of income spent on the good", "Time period: more elastic in the long run", "Diagram: relatively elastic vs inelastic demand curves"],
      "evaluate the importance of price elasticity of demand for firms and governments.",
      ["Define PED; link to total revenue", "Diagram: elastic vs inelastic demand and total revenue rectangles", "Firms: pricing decisions, e.g. raising price of inelastic goods raises revenue", "Government: indirect tax revenue is higher and burden falls on consumers when PED is inelastic", "Example, e.g. tobacco or fuel taxes", "Limits: PED estimates are difficult, change over time and vary across income groups"]],
    ["Using a diagram, explain why the price elasticity of supply of primary commodities tends to be lower than that of manufactured goods.",
      ["Define PES and give the formula", "Diagram: steep (inelastic) supply curve for a primary good vs flatter supply for manufactured goods", "Time lags in agriculture (growing season) and mining (new mines)", "Storage difficulties for perishable goods", "Manufactured goods: spare capacity, stocks and mobile factors"],
      "discuss the consequences of low price elasticities of demand and supply for producers of primary commodities.",
      ["Define PED and PES; primary commodities have low PED and PES", "Diagram: a supply shock with inelastic curves causing large price changes", "Price volatility makes incomes of farmers/miners unstable", "Difficult planning and investment; export revenue volatility for developing countries", "Example, e.g. coffee or cocoa price swings, Côte d'Ivoire/Ghana 2024", "Responses: buffer stocks, diversification, futures markets; effectiveness varies"]],
  ]);

  add("econ-4", [
    ["Using a diagram, explain how a unit tax affects producers and consumers in a market.",
      ["Define indirect (unit/specific) tax", "Diagram: supply shifts up by the amount of the tax", "New price paid by consumers and price received by producers; tax incidence", "Government revenue rectangle and welfare loss triangle", "Incidence depends on PED and PES"],
      "evaluate the use of price ceilings (maximum prices) to help low-income consumers.",
      ["Define price ceiling, set below equilibrium", "Diagram: shortage at the maximum price; welfare loss", "Benefits: lower price for those who get the good, e.g. rent control", "Costs: shortages, black markets, lower quality, non-price rationing (queues)", "Example, e.g. rent controls in Berlin or Stockholm; bread price controls in Egypt", "Alternatives: subsidies or direct income transfers may target better"]],
    ["Using a diagram, explain the effects of a price floor (minimum price) in an agricultural market.",
      ["Define price floor, set above equilibrium", "Diagram: surplus between quantity supplied and quantity demanded", "Government buys the surplus; cost to taxpayers", "Consumers pay higher prices; producers' revenue rises", "Allocative inefficiency: overallocation and welfare loss"],
      "evaluate the effectiveness of subsidies as a method of government intervention.",
      ["Define subsidy; reasons: lower prices, raise output, support producers, positive externalities", "Diagram: supply shifts down; price falls, quantity rises; cost to government", "Benefits: cheaper essentials, support for strategic or green industries", "Costs: opportunity cost of spending, inefficiency, dependency, international trade distortion", "Example, e.g. EU CAP, US Inflation Reduction Act green subsidies, fuel subsidies in Indonesia", "Effectiveness depends on PED/PES, targeting and time period"]],
  ]);

  add("econ-5", [
    ["Using a diagram, explain why a negative externality of production leads to market failure.",
      ["Define negative production externality and market failure", "Diagram: MSC above MPC; Qm > Qopt", "Firms ignore external costs such as pollution", "Overallocation of resources and welfare loss triangle", "Example of a polluting industry"],
      "evaluate the use of carbon taxes to reduce the negative externalities associated with fossil fuel use.",
      ["Define carbon tax", "Diagram: tax shifts MPC towards MSC, output falls towards Qopt", "Advantages: internalises externality, raises revenue, incentive for clean technology", "Disadvantages: hard to measure external cost, regressive, inelastic demand, carbon leakage", "Example, e.g. Sweden's carbon tax, Canada's carbon pricing", "Compare with cap and trade (EU ETS) and regulation"]],
    ["Using a diagram, explain why merit goods are underprovided in a free market.",
      ["Define merit good and positive consumption externality", "Diagram: MSB above MPB; Qm < Qopt", "Imperfect information: consumers underestimate benefits", "Underallocation and welfare loss", "Example, e.g. vaccinations or education"],
      "evaluate government responses to the underconsumption of merit goods.",
      ["Diagram: subsidy or direct provision increasing quantity to Qopt", "Policies: subsidies, direct provision, legislation, information campaigns/nudges", "Benefits: higher consumption, positive externalities, equity", "Costs: opportunity cost, government failure, taxpayers' burden", "Example, e.g. free school meals in the UK, free vaccines, Finland's education system", "Judgement depends on the good, the size of the externality and budget constraints"]],
    ["Explain why common pool resources are threatened with depletion.",
      ["Define common pool resources: rivalrous, non-excludable", "Tragedy of the commons: individuals act in self-interest", "Diagram: negative production externality (MSC > MPC) from overuse", "Examples: fisheries, forests, groundwater", "Unsustainable use and loss for future generations"],
      "discuss the effectiveness of international cooperation in addressing climate change.",
      ["Define climate change as a global negative externality and a threat to sustainability", "International agreements, e.g. Paris Agreement, COP summits", "Strengths: shared targets, technology transfer, climate finance", "Weaknesses: free rider problem, non-binding targets, conflict between growth and emissions", "Example, e.g. EU carbon border adjustment, US withdrawal and re-entry to Paris", "Other approaches: domestic policies, collective self-governance (Ostrom)"]],
  ]);

  add("econ-6", [
    ["Explain why public goods will not be provided by a free market.",
      ["Define public good: non-rivalrous and non-excludable", "Free rider problem: consumers will not pay", "Firms cannot earn revenue, so there is missing market", "Example, e.g. street lighting, national defence, flood defences", "Result: market failure and need for government provision"],
      "evaluate the view that the government should provide public goods.",
      ["Define public goods and the free rider problem", "For: otherwise missing market; welfare gains; equity", "Against: opportunity cost; government may misjudge demand; inefficiency", "Alternatives: public-private partnerships, contracting out, crowdfunding", "Example, e.g. lighthouses, flood barriers in the Netherlands, public broadcasting", "Judgement depends on the good and fiscal capacity"]],
  ]);

  add("econ-7", [
    ["Using a diagram, explain how asymmetric information can lead to market failure.",
      ["Define asymmetric information", "Adverse selection, e.g. used cars, insurance", "Moral hazard, e.g. insurance and banking", "Diagram: demand or supply misjudged; quantity not at the social optimum", "Welfare loss and resource misallocation"],
      "evaluate the use of regulation to correct market failure caused by asymmetric information.",
      ["Define asymmetric information and regulation", "Policies: licensing, mandatory disclosure, consumer protection, standards", "Benefits: protects consumers, increases trust and market participation", "Costs: compliance costs, regulatory capture, enforcement difficulty", "Example, e.g. financial regulation after 2008, food labelling, doctor licensing", "Alternatives: signalling and screening by firms; information provision"]],
  ]);

  add("econ-8", [
    ["Using a diagram, explain why a monopoly may lead to allocative inefficiency.",
      ["Define monopoly; barriers to entry", "Diagram: MR, AR, MC, AC; profit max at MC = MR", "Price above MC, output below the allocatively efficient level", "Welfare loss; consumer surplus transferred to producer", "Comparison with competitive market"],
      "evaluate government policies to regulate firms with significant market power.",
      ["Define market power", "Policies: competition (antitrust) law, price regulation, breaking up firms, nationalisation", "Benefits: lower prices, higher output, more choice", "Costs: lost economies of scale, less R&D, regulatory capture, enforcement cost", "Example, e.g. EU fines on Google, US case against Apple, UK utility regulators", "Natural monopolies may need regulation rather than break-up"]],
  ]);

  add("econ-9", [
    ["Explain the difference between GDP and GNI as measures of economic activity.",
      ["Define GDP: value of final output produced within a country", "Define GNI: GDP plus net income from abroad", "Real vs nominal; per capita measures", "Example where they differ, e.g. Ireland (GDP >> GNI) due to multinational profits", "Implications for comparing living standards"],
      "evaluate the use of GDP per capita as a measure of living standards.",
      ["Define GDP per capita; real and PPP adjustment", "Strengths: easy to measure, widely available, comparable", "Limits: inequality, informal economy, environmental costs, leisure, quality of life", "Alternatives: HDI, GNH, HPI, OECD Better Life Index", "Example, e.g. Qatar vs Norway; Bhutan's GNH", "Judgement: useful but should be combined with other indicators"]],
    ["Using a business cycle diagram, explain the phases of the business cycle.",
      ["Define business cycle and potential output", "Diagram: actual output fluctuating around a long-term growth trend", "Phases: expansion, peak, contraction (recession), trough", "Output gaps: positive (inflationary) and negative (recessionary)", "Link to unemployment and inflation"],
      "discuss whether higher economic growth always leads to higher living standards.",
      ["Define economic growth and standard of living", "Diagram: AD/AS or PPC showing growth", "For: higher incomes, jobs, tax revenue for public services", "Against: inequality, pollution, resource depletion, long working hours", "Example, e.g. China's growth and pollution; Norway sovereign fund", "Depends on how growth is distributed and sustained"]],
  ]);

  add("econ-10", [
    ["Using an AD/AS diagram, explain the factors that could shift aggregate demand to the right.",
      ["Define aggregate demand: C + I + G + (X - M)", "Diagram: AD shifts right; price level and real GDP rise", "Consumption: higher confidence, wealth, lower interest rates, lower tax", "Investment: business confidence, interest rates, technology", "Government spending and net exports (exchange rates, foreign incomes)"],
      "discuss the view that an economy will always return to full employment equilibrium without government intervention.",
      ["Define full employment level of output", "Diagram: monetarist/new classical LRAS model with self-correction", "Diagram: Keynesian AS with recessionary gap that can persist", "Wage flexibility vs sticky wages and prices", "Example, e.g. 2008-09 recession and slow recovery; COVID-19 recovery", "Judgement: speed of adjustment and social costs of waiting"]],
    ["Using a diagram, explain how a fall in short-run aggregate supply can cause stagflation.",
      ["Define SRAS and stagflation", "Diagram: SRAS shifts left; price level rises and real GDP falls", "Causes: higher costs of energy, raw materials, wages", "Cost-push inflation and rising unemployment", "Example, e.g. 1970s oil shocks or 2022 energy prices"],
      "evaluate the effects of an increase in long-run aggregate supply on an economy.",
      ["Define LRAS and potential output", "Diagram: LRAS shifts right; higher real GDP, lower price level", "Benefits: non-inflationary growth, lower unemployment, competitiveness", "Possible costs: structural unemployment from technology, inequality, environment", "Example, e.g. productivity growth from technology or education in South Korea", "Depends on time lags and what caused the shift"]],
  ]);

  add("econ-11", [
    ["Using a diagram, explain the causes of demand-pull inflation.",
      ["Define inflation and demand-pull inflation", "Diagram: AD shifts right near full employment; price level rises", "Causes: rising consumption, investment, government spending, net exports", "Excess demand in the economy", "Example, e.g. post-COVID spending boom 2021"],
      "evaluate the consequences of a high rate of inflation for an economy.",
      ["Define inflation; how CPI is measured", "Costs: reduced purchasing power, uncertainty, lower investment", "Redistribution: hurts savers and fixed-income earners, helps borrowers", "Lower international competitiveness; menu and shoe leather costs", "Example, e.g. Argentina, Turkey, Zimbabwe; UK 2022", "Depends on whether inflation is anticipated and on indexing of wages"]],
    ["Explain the costs of deflation for an economy.",
      ["Define deflation (fall in the average price level)", "Delayed consumption; falling AD; deflationary spiral", "Real value of debt rises", "Lower profits and investment, unemployment", "Example, e.g. Japan's lost decades"],
      "discuss the difficulties of measuring inflation using a consumer price index.",
      ["Define CPI, weights and base year", "Different consumption patterns across income groups", "Changes in quality and new products", "Substitution bias and changing weights", "Example, e.g. housing costs and CPI vs CPIH in the UK", "Despite limits, CPI useful for policy (inflation targeting)"]],
    ["Explain the possible causes of unemployment.",
      ["Define unemployment and the unemployment rate", "Cyclical (demand-deficient) unemployment: AD/AS diagram", "Structural unemployment: mismatch of skills or location", "Frictional and seasonal unemployment", "Example of each"],
      "evaluate the costs of high unemployment for an economy.",
      ["Define unemployment and how it is measured", "Economic costs: lost output, lower tax revenue, higher welfare spending", "Personal costs: lower income, loss of skills, health problems", "Social costs: crime, inequality", "Example, e.g. youth unemployment in Spain or South Africa", "Severity depends on duration, type and support systems"]],
  ]);

  add("econ-12", [
    ["Explain the difference between equality and equity in the distribution of income.",
      ["Define equality and equity", "Lorenz curve and Gini coefficient", "Diagram: Lorenz curve and line of perfect equality", "Causes of inequality: education, wealth, discrimination", "Example of countries with different Gini coefficients"],
      "evaluate the use of progressive taxation to reduce income inequality.",
      ["Define progressive, proportional and regressive taxes", "Diagram: Lorenz curve moving towards the line of equality", "Benefits: redistribution, funds public services, reduces poverty", "Costs: disincentive to work/invest, tax avoidance, capital flight", "Example, e.g. Nordic countries vs US tax systems", "Effectiveness depends on enforcement and how revenue is spent"]],
    ["Explain how poverty may be measured.",
      ["Define absolute and relative poverty", "Measures: international poverty line ($2.15 a day)", "Relative poverty: share below a % of median income", "Multidimensional Poverty Index", "Limits of each measure"],
      "discuss the effectiveness of policies to reduce poverty.",
      ["Define poverty", "Policies: transfer payments, minimum wage, education/health spending, conditional cash transfers", "Benefits: raises living standards, breaks poverty cycle", "Costs: opportunity cost, dependency, unemployment from minimum wages", "Example, e.g. Brazil's Bolsa Família, Mexico's Prospera", "Depends on targeting and funding"]],
  ]);

  add("econ-13", [
    ["Using an AD/AS diagram, explain how expansionary monetary policy can reduce unemployment.",
      ["Define monetary policy and interest rates", "Diagram: AD shifts right, real GDP rises", "Transmission: lower interest rates raise consumption and investment", "Exchange rate depreciation raises net exports", "Fall in cyclical unemployment"],
      "evaluate the effectiveness of monetary policy in controlling inflation.",
      ["Define monetary policy and inflation targeting", "Diagram: contractionary policy shifts AD left", "Strengths: central bank independence, quick to implement, incremental", "Weaknesses: time lags, ineffective against cost-push inflation, slows growth", "Example, e.g. US Fed 2022-23 rate rises, ECB", "Depends on type of inflation and confidence"]],
    ["Using an AD/AS diagram, explain how expansionary fiscal policy can close a recessionary gap.",
      ["Define fiscal policy and recessionary gap", "Diagram: AD shifts right to full employment output", "Tools: increased government spending, lower taxes", "Multiplier effect", "Example of a fiscal stimulus"],
      "evaluate the use of fiscal policy to promote economic growth.",
      ["Define fiscal policy and economic growth", "Diagram: AD and LRAS shift right (e.g. infrastructure spending)", "Strengths: targeted, multiplier, can raise potential output", "Weaknesses: time lags, crowding out, budget deficits and debt", "Example, e.g. US CARES Act, China's infrastructure spending", "Effectiveness depends on size of output gap and debt levels"]],
  ]);

  add("econ-14", [
    ["Using a diagram, explain how supply-side policies can increase long-run aggregate supply.",
      ["Define supply-side policies", "Diagram: LRAS shifts right", "Interventionist: education, infrastructure, R&D", "Market-based: deregulation, privatisation, labour market reform", "Lower price level and higher output potential"],
      "evaluate the effectiveness of market-based supply-side policies.",
      ["Define market-based supply-side policies", "Diagram: LRAS shifts right", "Benefits: efficiency, competition, lower costs", "Costs: inequality, job losses, reduced worker protection", "Example, e.g. UK privatisation, labour market reforms in Germany (Hartz)", "Long time lags; depends on institutions"]],
  ]);

  add("econ-15", [
    ["Using a diagram, explain the effects of a tariff on domestic producers and consumers.",
      ["Define tariff", "Diagram: world price and tariff-inclusive price", "Domestic producers gain; consumers pay more", "Government revenue; welfare loss", "Imports fall"],
      "evaluate the view that free trade benefits all countries.",
      ["Define free trade and comparative advantage", "Diagram: welfare gain from removing a tariff", "Benefits: lower prices, more choice, efficiency", "Costs: job losses in some industries, inequality", "Example, e.g. US-China trade war, NAFTA/USMCA", "Depends on the country's economic structure"]],
  ]);

  add("econ-16", [
    ["Using a diagram, explain how a currency depreciation could affect a country's current account.",
      ["Define depreciation and current account", "Diagram: exchange rate supply and demand", "Exports cheaper, imports dearer", "Current account improves if demand is elastic", "Marshall-Lerner condition and J-curve"],
      "evaluate the consequences of a depreciating currency for an economy.",
      ["Define depreciation", "Benefits: export competitiveness, growth, employment", "Costs: imported inflation, higher import costs", "Debt in foreign currencies becomes more costly", "Example, e.g. Turkish lira, Japanese yen 2022-24", "Depends on PED of exports/imports and stage of development"]],
  ]);

  add("econ-17", [
    ["Explain the causes of a current account deficit.",
      ["Define current account deficit", "High domestic demand for imports", "Lack of competitiveness, strong exchange rate", "Net income outflows", "Example, e.g. UK or US deficits"],
      "evaluate the methods of correcting a persistent current account deficit.",
      ["Define current account deficit", "Expenditure-switching: tariffs, depreciation", "Expenditure-reducing: contractionary fiscal/monetary policy", "Supply-side policies for competitiveness", "Example, e.g. Greece post-2010", "Trade-offs between growth, employment and inflation"]],
  ]);

  add("econ-18", [
    ["Explain the barriers to economic development faced by developing countries.",
      ["Define economic development", "Barriers: poverty cycle, weak institutions, corruption", "Lack of infrastructure, low human capital", "Overdependence on primary commodities", "Example"],
      "evaluate the role of foreign direct investment in promoting economic development.",
      ["Define FDI", "Benefits: capital, technology, jobs, tax", "Costs: profit repatriation, exploitation, environment", "Example, e.g. Vietnam, Ethiopia", "Depends on regulation and linkages", "Compare with aid and trade"]],
  ]);

  IB.addQuestions("econ", out);
})();
