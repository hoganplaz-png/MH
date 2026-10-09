/* ⏱ 10-minute fast notes · Geography SL (format: see js/fastnotes.js).
   Core = Paper 2 (geo-1 … geo-7), options = Paper 1 (geo-8 … geo-11, geo-h4), skills = geo-12.
   Case-study numbers are rounded, quotable figures; check your teacher's preferred sources. */
IB.addFast({
  "geo-1": {
    title: "Population distribution · Megacities · Core-periphery",
    intro: "Paper 2 core Unit 1。記住：describe 要有數據，explain 要 physical + human 兩邊。",
    parts: [
      {
        h: "Distribution 人口分佈：點解咁唔平均？",
        min: 3,
        blocks: [
          ["key", "<b>Physical factors</b>：climate, relief, water, soils, natural resources, hazards<br><b>Human factors</b>：economic opportunities (jobs), accessibility, government policy, history, conflict"],
          ["rhyme", "口訣 1", "天地水土定上限，錢路政史定分佈", "Physical 決定邊度<b>住唔住得</b>；human 解釋邊度<b>多人住</b>、點解會變。"],
          ["table", ["Case study", "Key stat（可以 quote）", "用嚟講"], [
            ["Egypt – Nile valley", "~95% 人口住喺 ~5% 土地", "water + fertile alluvial soil（physical）"],
            ["Brazil – Brasília", "1960 新首都，吸人去內陸", "government policy（human）"],
            ["Indonesia – Nusantara", "新首都計劃，減輕 Jakarta 壓力（Java 擠迫 + 地陷）", "policy 重新分佈人口"],
            ["China – Hu Line", "東南 ~94% 人口住喺 ~43% 土地", "climate/relief + economic core"],
          ]],
          ["trap", ["淨係講 physical factors —— 高分要講 human factors 同埋<b>隨時間變化</b>。", "Describe 地圖冇 quote 地名同數字 = 冇分。用 GSA：General pattern → Specific data → Anomaly。"]],
        ],
      },
      {
        h: "Megacities 同 Core-periphery",
        min: 3,
        blocks: [
          ["key", "<b>Megacity</b> = urban agglomeration &gt; <b>10 million</b>。增長 = <b>rural-urban migration</b> + <b>natural increase</b>（年輕移民生得多）。"],
          ["table", ["Megacity", "Population（約）", "特點"], [
            ["Tokyo", "~37 m", "HIC，已經停止增長／開始減少"],
            ["Delhi", "~33 m", "增長最快之一，空氣污染"],
            ["Lagos", "~15–20 m", "Africa 快速增長，informal settlements"],
            ["Dhaka", "~23 m", "rural-urban migration + climate migrants"],
          ]],
          ["rhyme", "口訣 2", "核心食晒周邊，之後先至分返", "Core-periphery：core 吸走周邊嘅人同錢（<b>backwash effects</b>），之後 growth 先擴散返出去（<b>spread / trickle-down effects</b>）— Myrdal cumulative causation, Friedmann。"],
          ["eg", "Explain one reason why core regions keep growing. [2]", ["Core 有 jobs、infrastructure、services → 吸引 young migrants from periphery（<b>backwash</b>）", "更多人 → 更大市場 + 更多投資 → 再吸更多人 = <b>cumulative causation</b>（例：Brazil 南部 São Paulo–Rio）"]],
        ],
      },
      {
        h: "Demographic indicators 計數",
        min: 2.5,
        blocks: [
          ["table", ["指標", "公式／定義", "記住"], [
            ["CBR / CDR", "per 1000 per year", "natural increase = CBR − CDR"],
            ["NIR (%)", "(CBR − CDR) ÷ 10", "22 − 7 = 15‰ = 1.5%"],
            ["TFR", "每個女人平均生幾多個", "replacement ≈ <b>2.1</b>"],
            ["Dependency ratio", "(0–14 + 65+) ÷ (15–64) × 100", "越高 → 每個 worker 養越多人"],
            ["Doubling time", "≈ 70 ÷ growth rate (%)", "2% → ~35 年"],
          ]],
          ["eg", "0–14: 18 m, 65+: 12 m, 15–64: 50 m. Calculate the dependency ratio. [2]", ["(18 + 12) ÷ 50 × 100 [M1]", "= <b>60</b> [A1]（即每 100 個 worker 養 60 個 dependants）"]],
          ["trap", ["Dependency ratio 冇單位但係 per 100 — 唔好寫 60%。", "NIR 由 ‰ 轉 % 要 ÷ 10，唔係 ÷ 100。"]],
        ],
      },
    ],
    summary: [
      "天地水土定上限，錢路政史定分佈",
      "Describe = GSA：pattern → data → anomaly",
      "Megacity > 10 million：migration + natural increase",
      "核心食晒周邊（backwash），之後先至分返（spread）",
      "Dependency = (0–14 + 65+) ÷ (15–64) × 100",
      "Replacement 2.1；NIR % = (CBR − CDR) ÷ 10",
    ],
    practice: [
      { q: "Define <em>megacity</em>.", m: 1, a: "An urban agglomeration with a population of <b>more than 10 million</b>." },
      { q: "A country has CBR 31 per 1000 and CDR 9 per 1000. Calculate the natural increase rate as a percentage.", m: 2, a: "(31 − 9) ÷ 10 [M1] = <b>2.2%</b> [A1]" },
      { q: "Explain two human factors that cause population to be concentrated in core regions.", m: 4, a: "Economic opportunities/jobs and services attract migrants [1] → cumulative causation, e.g. São Paulo [1]; accessibility/infrastructure (ports, transport hubs) lowers costs [1] → firms and people cluster, e.g. coastal China [1]." },
      { q: "Explain two reasons for the rapid growth of megacities in low- and middle-income countries.", m: 4, a: "Rural-urban migration – push (rural poverty, land shortage) and pull (perceived jobs, services) [1+1]; natural increase – migrants are young adults of reproductive age, and urban death rates are lower [1+1]; e.g. Lagos/Dhaka." },
    ],
  },

  "geo-2": {
    title: "DTM · Ageing & youthful populations · Population policies",
    intro: "Paper 2 core。Policy 題一定要 evaluate：數據前後比較 + 副作用 + 其他因素。",
    parts: [
      {
        h: "Demographic transition model (DTM)",
        min: 2.5,
        blocks: [
          ["table", ["Stage", "CBR / CDR", "增長", "例子"], [
            ["1", "高 / 高（波動）", "低", "今日冇國家（偏遠部落）"],
            ["2", "高 / <b>急跌</b>", "急升", "Niger, Afghanistan"],
            ["3", "<b>跌</b> / 低", "減慢", "India, Bangladesh"],
            ["4", "低 / 低", "穩定", "USA, France"],
            ["5", "低過 CDR", "natural decrease", "Japan, Italy"],
          ]],
          ["rhyme", "口訣 3", "死先跌，生後跌", "Stage 2 CDR 先跌（sanitation, healthcare, food）；Stage 3 CBR 先跟住跌（women's education, contraception, urbanisation, lower infant mortality）。"],
          ["trap", ["DTM limitations 一定要識：based on <b>European</b> experience；<b>冇 migration</b>；LICs transition 快好多或者卡住；policies（China）可以跳 stage。"]],
        ],
      },
      {
        h: "Youthful vs ageing populations",
        min: 2.5,
        blocks: [
          ["table", ["", "Youthful（e.g. Niger, TFR ~6）", "Ageing（e.g. Japan, ~29% 65+）"], [
            ["Challenges", "schools, jobs, healthcare for mothers/children", "pensions, healthcare, labour shortage, ↑ dependency"],
            ["Opportunities", "<b>demographic dividend</b> if jobs exist", "<b>silver economy</b>, grandparents' childcare"],
            ["Responses", "education for girls, family planning", "raise retirement age, immigration, automation"],
          ]],
          ["key", "<b>Demographic dividend</b>：fertility 跌之後 working-age share 大 → 有潛力經濟增長（例：East Asian Tigers 1960s–90s）。<b>只係潛力</b>：要有 jobs + education 先兌現。"],
        ],
      },
      {
        h: "Population policies 政策 case studies",
        min: 3,
        blocks: [
          ["table", ["Policy", "Type", "Key stats", "Evaluation"], [
            ["China one-child (1980–2015)", "anti-natalist", "TFR ~2.7 → ~1.6；sex ratio at birth peak ~118–120 boys:100 girls；two-child 2016, three-child 2021", "fertility 跌咗，但 ageing、gender imbalance、human rights；經濟發展本身都令 fertility 跌"],
            ["France", "pro-natalist", "family allowances, tax breaks, cheap childcare；TFR ~1.8–2.0（2010s）→ ~1.6（2024）", "EU 之中較成功，但近年都跌"],
            ["Singapore", "pro-natalist", "Baby Bonus；TFR ~1.0（2023 &lt; 1）", "錢太少 vs 養仔成本 + 樓價 + career"],
            ["South Korea", "pro-natalist", "TFR ~0.7（世界最低）", "大筆投資但幾乎冇效"],
          ]],
          ["rhyme", "口訣 4", "派錢買唔到BB", "Pro-natalist policies 多數只係影響<b>生育時間</b>，唔係<b>總數</b>；深層原因係樓價、childcare、女性 career、文化。"],
          ["trap", ["將 China fertility 下跌<b>全部</b>歸功 one-child policy —— 1970s 已經有 'later, longer, fewer' campaign，TFR 1970–1980 已經由 ~5.8 跌到 ~2.7。", "Gender policies 都係 syllabus：女性教育、反人口販賣（anti-trafficking）、gender equality laws。"]],
        ],
      },
    ],
    summary: [
      "死先跌（Stage 2），生後跌（Stage 3）",
      "DTM 冇 migration、based on Europe",
      "年輕 → 學校工作；老 → 長俸醫療",
      "Demographic dividend 只係潛力，要有 jobs",
      "派錢買唔到BB（Singapore ~1.0, Korea ~0.7）",
      "China：TFR 2.7 → 1.6，但 ageing + 118 男:100 女",
    ],
    practice: [
      { q: "Describe the changes in birth and death rates in stage 3 of the DTM.", m: 2, a: "Birth rate <b>falls rapidly</b> [1]; death rate continues to fall slowly / remains low, so natural increase slows [1]." },
      { q: "Explain two reasons why birth rates fall as countries develop.", m: 4, a: "Women's education and employment → marry later, opportunity cost of children [1+1]; lower infant mortality / access to contraception / urbanisation (children cost more, less needed as farm labour) [1+1]." },
      { q: "Outline one limitation of the demographic transition model.", m: 2, a: "Based on the experience of European countries [1]; may not apply to LICs, which transition faster/differently, and it ignores migration [1]." },
      { q: "Evaluate the success of one named anti-natalist policy.", m: 6, a: "China one-child: TFR ~2.7 → ~1.6, ~400 m births claimed averted (disputed) [2]; negatives – sex ratio ~118:100, '4-2-1' ageing, human rights, policy reversed 2016/2021 [2]; other factors (economic growth, urbanisation) also reduced fertility, so success only partial [2]." },
    ],
  },

  "geo-3": {
    title: "Migration: causes, types, consequences",
    intro: "Paper 2 core。高分 = source + destination 兩邊、positive + negative、唔同 stakeholders。",
    parts: [
      {
        h: "Types and causes 類型同原因",
        min: 2.5,
        blocks: [
          ["table", ["Term", "Meaning"], [
            ["Voluntary", "自願：jobs, family, education, lifestyle"],
            ["Forced", "被迫：conflict, persecution, disaster, development projects（dams）"],
            ["Refugee", "<b>跨國界</b>逃避 persecution / conflict（1951 UN Convention）"],
            ["IDP", "被迫離開，但<b>留喺本國</b>"],
            ["Asylum seeker", "申請緊 refugee status 嘅人"],
          ]],
          ["rhyme", "口訣 5", "推、拉、中間有阻礙", "Lee's model：push factors + pull factors + <b>intervening obstacles</b>（distance, cost, border controls, legal barriers），仲有 personal factors。"],
          ["trap", ["將所有 migrants 叫做 refugees —— refugee 一定係<b>跨境 + 被迫</b>。"]],
        ],
      },
      {
        h: "Case studies 數據",
        min: 3,
        blocks: [
          ["table", ["Case", "Type", "Key stats"], [
            ["Syria (since 2011)", "forced, international + internal", "~6 m refugees abroad（Türkiye host 最多 ~3 m），~7 m IDPs"],
            ["Philippines → Gulf / world", "voluntary, labour", "~10 m Filipinos abroad；remittances ~9% of GDP"],
            ["Mexico → USA", "voluntary, economic", "~11 m Mexican-born in USA；remittances ~US$60 bn+/yr"],
            ["India（全球最大收款國）", "voluntary, labour", "remittances ~US$100–125 bn/yr"],
            ["China rural-urban", "internal, voluntary", "~290 m rural migrant workers；hukou system 限制 services"],
          ]],
          ["eg", "Explain one positive consequence of migration for the source country. [2]", ["<b>Remittances</b> increase household income → spent on education, health, housing [1]", "Large share of GDP (e.g. Nepal ~25%, Tajikistan ~45%) → foreign exchange [1]"]],
        ],
      },
      {
        h: "Consequences：用 2×2 表諗 essay",
        min: 2.5,
        blocks: [
          ["table", ["", "Source（輸出地）", "Destination（接收地）"], [
            ["+", "remittances, less unemployment, return migrants' skills", "fills labour shortages, younger workforce, taxes, diversity"],
            ["−", "<b>brain drain</b>, ageing, gender imbalance, rural depopulation", "pressure on housing/services, tension, exploitation of migrants"],
          ]],
          ["rhyme", "口訣 6", "兩地兩面兩群人", "Source + destination；positive + negative；migrants + 留低嘅人／政府／僱主。四格填滿先寫 conclusion。"],
          ["trap", ["只寫 destination 嘅問題 —— 好多 essay 問 'for both'。", "Conclusion 要講 '<b>depends on</b>'：skill level, scale, time（短期 vs 長期）, policy。"]],
        ],
      },
    ],
    summary: [
      "Refugee 跨境，IDP 留國內",
      "推、拉、中間有阻礙（Lee）",
      "Syria：~6 m refugees + ~7 m IDPs",
      "Philippines remittances ~9% GDP；India ~US$100 bn+",
      "兩地兩面兩群人",
      "Brain drain vs remittances：影響視乎技能同時間",
    ],
    practice: [
      { q: "Distinguish between a refugee and an internally displaced person.", m: 2, a: "Both are forced migrants; a refugee <b>crosses an international border</b> [1], an IDP remains <b>within their own country</b> [1]." },
      { q: "Explain two negative consequences of international migration for a destination country.", m: 4, a: "Pressure on housing/services (schools, health) in areas of concentration [1+1]; social tension / wage competition in low-skill sectors / exploitation of migrants [1+1]; named example e.g. Türkiye hosting Syrians." },
      { q: "Explain how intervening obstacles can affect migration.", m: 3, a: "Obstacles between origin and destination – distance, cost, border controls/visas, physical barriers [1]; they reduce or redirect flows [1]; e.g. stricter EU border control after 2015 shifted routes / poorer migrants can't afford to move [1]." },
      { q: "Examine the consequences of migration for one named source country.", m: 10, a: "Level 5: e.g. Philippines – remittances ~9% GDP fund education/housing; reduced unemployment; but brain drain of nurses, family separation, dependency on remittances; evaluate over time and scale, conclude that net effect depends on skills lost vs money and skills returned." },
    ],
  },

  "geo-4": {
    title: "Causes of climate change: energy balance · carbon cycle · feedbacks",
    intro: "Paper 2 core Unit 2。要識 named gases、數字（ppm、°C）同 feedback loop diagram。",
    parts: [
      {
        h: "Energy balance 同 greenhouse effect",
        min: 3,
        blocks: [
          ["key", "Incoming <b>short-wave</b> solar radiation → 部分 reflected（<b>albedo</b>）、部分 absorbed → Earth emits <b>long-wave (infrared)</b> → greenhouse gases absorb + re-emit → warming。<br>Natural greenhouse effect：令地球暖 ~<b>33 °C</b>。Enhanced = 人類排放加強。"],
          ["table", ["Surface", "Albedo（約）"], [
            ["Fresh snow", "0.8–0.9"],
            ["Sea ice", "0.5–0.7"],
            ["Forest", "0.1–0.2"],
            ["Ocean", "~0.06"],
          ]],
          ["table", ["Gas", "主要來源"], [
            ["CO₂", "fossil fuels, deforestation, cement — 總貢獻最大"],
            ["CH₄（每粒強好多）", "livestock, rice paddies, landfill, permafrost"],
            ["N₂O", "nitrogen fertilisers"],
          ]],
          ["rhyme", "口訣 7", "短波入，長波出，溫室氣體夾住佢", "唔好將 greenhouse effect 同 <b>ozone hole</b> 混為一談 —— 臭氧層係擋 UV，唔係同一回事。"],
        ],
      },
      {
        h: "Carbon cycle + natural vs human causes",
        min: 2.5,
        blocks: [
          ["table", ["", "Cause", "Evidence / stat"], [
            ["Human", "fossil fuels, deforestation, agriculture", "CO₂ ~280 ppm（pre-industrial）→ ~420+ ppm；warming ~1.1–1.2 °C"],
            ["Natural（長期）", "Milankovitch cycles", "10,000–100,000 年 timescale → ice ages"],
            ["Natural（短期）", "volcanic eruptions", "Pinatubo 1991 → global cooling ~0.5 °C for ~2 years"],
            ["Natural", "solar output", "1950s 至今大致平穩 → 解釋唔到近年變暖"],
          ]],
          ["key", "IPCC (2021)：human influence on warming is '<b>unequivocal</b>'。"],
        ],
      },
      {
        h: "Feedback loops 同 tipping points",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 8", "正反饋越滾越大，負反饋拉返落嚟", "<b>Positive</b> amplifies，<b>negative</b> dampens。"],
          ["eg", "Explain the ice-albedo feedback. [3]", ["Warming melts Arctic sea ice (high albedo ~0.6) [1]", "exposes dark ocean (albedo ~0.06) → absorbs more solar radiation [1]", "→ more warming → more melting = <b>positive feedback</b>; Arctic September ice ↓ ~13% per decade since 1979 [1]"]],
          ["table", ["Positive (+)", "Negative (−)"], [
            ["ice-albedo；permafrost thaw → CH₄；forest dieback/fires → CO₂", "more low cloud reflects sunlight；CO₂ fertilisation → more plant growth"],
          ]],
          ["trap", ["寫 'pollution causes global warming' 冇分 —— 要講<b>邊種 gas</b>、<b>咩 process</b>。", "Tipping point = threshold 過咗就 self-sustaining / irreversible（Greenland ice sheet, Amazon dieback）。"]],
        ],
      },
    ],
    summary: [
      "短波入，長波出，溫室氣體夾住佢",
      "自然溫室 +33 °C；enhanced = 人為",
      "CO₂ 280 → 420+ ppm；+1.1–1.2 °C",
      "Pinatubo 1991 冷 0.5 °C 兩年 = 短期自然因素",
      "正反饋越滾越大，負反饋拉返落嚟",
      "IPCC：human influence 'unequivocal'",
    ],
    practice: [
      { q: "Define <em>albedo</em>.", m: 1, a: "The proportion of incoming solar radiation <b>reflected</b> by a surface." },
      { q: "Distinguish between the natural and the enhanced greenhouse effect.", m: 2, a: "Natural: GHGs absorb/re-emit long-wave radiation, keeping Earth ~33 °C warmer [1]; enhanced: additional warming from increased human emissions of GHGs [1]." },
      { q: "Explain how thawing permafrost could accelerate global warming.", m: 3, a: "Permafrost stores large amounts of organic carbon [1]; thawing allows decomposition releasing CO₂ and methane [1]; more GHGs → more warming → more thaw (positive feedback) [1]." },
      { q: "To what extent is recent climate change caused by human activity?", m: 10, a: "Level 5: human causes with data (ppm, fossil fuels, deforestation), natural causes and their timescales (Milankovitch, solar, volcanic), feedbacks amplifying forcing; conclusion – natural factors cause variability but recent warming is predominantly anthropogenic (IPCC)." },
    ],
  },

  "geo-5": {
    title: "Consequences of climate change · Vulnerability · Resilience",
    intro: "Paper 2 core。高分 = 唔同 scale + 唔同 group 嘅 disparities，加 named example。",
    parts: [
      {
        h: "Impacts 影響（分類記）",
        min: 3,
        blocks: [
          ["table", ["Impact", "Process", "Named example / stat"], [
            ["Sea-level rise", "thermal expansion + ice melt", "~20 cm since 1900，加速中；Maldives 平均 ~1–1.5 m above sea level"],
            ["Extreme weather", "heatwaves, drought, heavy rain", "Europe heatwave 2022 ~60,000 deaths；Pakistan floods 2022 ~1/3 國土浸、~1,700 deaths"],
            ["Ecosystems", "coral bleaching, range shifts", "Great Barrier Reef 多次 mass bleaching（2016, 2017, 2020, 2022, 2024）"],
            ["Water", "glacier retreat", "Andes / Himalaya glaciers → future water supply"],
            ["Food", "lower tropical yields, salinisation", "Sahel drought；Bangladesh salinisation"],
            ["Health", "vector-borne disease spread", "malaria, dengue 擴到高海拔/高緯度"],
          ]],
          ["rhyme", "口訣 9", "海升天怒生態變，水糧健康都受牽", "六大類 impacts，essay 每段揀一兩個加 example。"],
        ],
      },
      {
        h: "Vulnerability 同 resilience",
        min: 3,
        blocks: [
          ["key", "<b>Vulnerability = exposure × sensitivity ÷ adaptive capacity</b><br><b>Resilience</b> = ability to absorb, recover and adapt（wealth, infrastructure, insurance, education, early warning）"],
          ["table", ["Factor", "點樣↑ vulnerability"], [
            ["Poverty / informal housing", "冇錢 prepare、屋唔堅固"],
            ["Dependence on agriculture", "收入直接受天氣影響"],
            ["Gender", "女性較少 land rights、教育、資訊"],
            ["Age", "老人 heat stress；小朋友"],
            ["Indigenous / remote", "冇 services，依賴 local ecosystem"],
            ["Governance", "弱政府 → 慢 response"],
          ]],
          ["eg", "Bangladesh：點樣由 vulnerable 變 more resilient？", ["Exposure：大部分 &lt;10 m above sea level，Ganges-Brahmaputra delta，cyclones + storm surge", "Sensitivity：~1,300 people/km²，rice farming", "Bhola cyclone 1970 ~300,000+ deaths → Amphan 2020 只係幾十人死（cyclone shelters + early warnings + volunteers）= adaptive capacity ↑"]],
        ],
      },
      {
        h: "Disparities 同 climate justice",
        min: 2,
        blocks: [
          ["rhyme", "口訣 10", "排得最少，受得最多", "Sub-Saharan Africa 只佔 ~3% historical CO₂ emissions，但 vulnerability 最高 = <b>climate justice</b>。COP27（2022）同意 <b>loss and damage fund</b>。"],
          ["trap", ["將整個國家當係一樣 vulnerable —— 要講國內差異（rich/poor, urban/rural, men/women）。", "Counter-argument 要識：HICs 都受害（Australia bushfires 2019–20、Europe 2022）；some high latitudes 可能 benefit（longer growing season）。"]],
        ],
      },
    ],
    summary: [
      "海升天怒生態變，水糧健康都受牽",
      "Vulnerability = exposure × sensitivity ÷ adaptive capacity",
      "Bangladesh：Bhola 1970 ~300,000 → Amphan 2020 幾十人",
      "排得最少，受得最多（Africa ~3%）",
      "國內都唔平等：貧、女、老、原住民",
      "COP27 loss & damage fund",
    ],
    practice: [
      { q: "State two causes of sea-level rise.", m: 2, a: "<b>Thermal expansion</b> of warming oceans [1]; <b>melting of land ice</b> (glaciers, ice sheets) [1]. (Sea-ice melt does not count.)" },
      { q: "Distinguish between exposure and vulnerability.", m: 2, a: "Exposure: people/assets located in places that could be affected by a hazard [1]; vulnerability: susceptibility to harm, also depending on sensitivity and (lack of) adaptive capacity [1]." },
      { q: "Explain two reasons why women may be more vulnerable to climate change than men in some low-income countries.", m: 4, a: "Less access to land, credit and resources to adapt [1+1]; less access to education/warnings, caring roles limit evacuation, social restrictions [1+1]." },
      { q: "Discuss the view that the impacts of climate change will be felt most by those least responsible for it.", m: 10, a: "Level 5: support (SIDS, Sahel, Bangladesh; low emissions; climate justice), counter (HIC impacts, emerging economies now big emitters, poor within rich countries), scale; conclusion with loss & damage." },
    ],
  },

  "geo-6": {
    title: "Responding to climate change: mitigation · adaptation · governance",
    intro: "Paper 2 core。Mitigation 治本（causes），adaptation 治標（impacts）—— 分錯即刻冇分。",
    parts: [
      {
        h: "Mitigation vs adaptation vs geoengineering",
        min: 3,
        blocks: [
          ["rhyme", "口訣 11", "減排係治本，適應係止血", "Mitigation = reduce emissions / increase sinks。Adaptation = reduce vulnerability to impacts。"],
          ["table", ["Type", "Strategies", "Named example"], [
            ["Mitigation", "renewables, carbon pricing, EVs, reforestation, CCS", "EU ETS（cap-and-trade, since 2005）；Costa Rica ~98% renewable electricity；Norway ~90% new cars EV"],
            ["Adaptation", "sea walls, flood barriers, drought-resistant crops, early warning, managed retreat", "Netherlands Delta Works；Thames Barrier；Bangladesh cyclone shelters + floating gardens；Ahmedabad Heat Action Plan"],
            ["Geoengineering – SRM", "stratospheric aerosols, marine cloud brightening", "未大規模實施；風險：termination shock, governance"],
            ["Geoengineering – CDR", "direct air capture, enhanced weathering", "Orca plant, Iceland（每年只 ~4,000 t CO₂ — 規模太細）"],
          ]],
          ["trap", ["Sea wall = <b>adaptation</b>，唔係 mitigation。種樹 = mitigation（carbon sink）。", "Geoengineering 嘅問題：<b>moral hazard</b>（大家唔減排）、side effects 唔知、冇國際規管。"]],
        ],
      },
      {
        h: "Global governance 國際協議",
        min: 3,
        blocks: [
          ["table", ["Agreement", "Key points"], [
            ["UNFCCC (1992)", "Rio Earth Summit；CBDR 原則"],
            ["Kyoto Protocol (1997)", "只有 developed countries 有 <b>binding</b> targets；USA 冇 ratify"],
            ["Paris Agreement (2015)", "well below 2 °C, pursue 1.5 °C；<b>所有國家</b>交 NDCs（voluntary, 每 5 年更新）"],
            ["COP26 Glasgow (2021)", "'phase down' coal"],
            ["COP27 Sharm el-Sheikh (2022)", "loss and damage fund"],
            ["COP28 Dubai (2023)", "'transition away from fossil fuels'"],
          ]],
          ["key", "現有 NDCs 估計導致 ~<b>2.5–2.9 °C</b> warming → 唔夠。Challenges：free-rider problem、冇 enforcement、finance（US$100 bn/yr pledge 遲咗先達到）、USA withdrawals。"],
          ["rhyme", "口訣 12", "京都分貧富，巴黎人人交功課", "Kyoto binding 但只限發達國；Paris 人人有 NDC 但唔 binding。"],
        ],
      },
      {
        h: "其他 stakeholders + 點樣 evaluate",
        min: 2,
        blocks: [
          ["table", ["Actor", "Example"], [
            ["Cities", "C40 network（~100 cities）"],
            ["Civil society / NGOs", "Fridays for Future, Greenpeace"],
            ["Corporations", "net-zero pledges（小心 greenwashing）"],
            ["Individuals", "diet, transport choices"],
          ]],
          ["eg", "Evaluate 嘅 criteria（essay 每段用一個）", ["Effectiveness：減咗幾多排放／救咗幾多命？", "Cost + who pays？Equity（LICs 有冇錢 adapt）", "Scale + speed；unintended consequences；political feasibility"]],
        ],
      },
    ],
    summary: [
      "減排係治本，適應係止血",
      "Sea wall = adaptation；種樹 = mitigation",
      "京都分貧富，巴黎人人交功課",
      "NDCs → ~2.5–2.9 °C：唔夠 1.5",
      "Geoengineering：moral hazard + 冇規管",
      "Evaluate：效果、成本、公平、規模、副作用",
    ],
    practice: [
      { q: "Distinguish between mitigation and adaptation.", m: 2, a: "Mitigation reduces the <b>causes</b> – cutting GHG emissions or increasing sinks [1]; adaptation reduces the <b>impacts</b>/vulnerability by adjusting to actual or expected change [1]." },
      { q: "Outline one difference between the Kyoto Protocol and the Paris Agreement.", m: 2, a: "Kyoto: legally binding targets for developed countries only [1]; Paris: all countries submit voluntary NDCs [1]." },
      { q: "Explain two disadvantages of solar radiation management.", m: 4, a: "Unknown side effects, e.g. changes to monsoon rainfall [1+1]; does not reduce CO₂ (ocean acidification continues) / termination shock / moral hazard / no global governance [1+1]." },
      { q: "Evaluate the effectiveness of global agreements in responding to climate change.", m: 10, a: "Level 5: Kyoto (limited – USA out, no LIC targets), Paris (universal, but NDCs insufficient ~2.5–2.9 °C, no enforcement), COP27 fund; role of other actors; conclusion: necessary framework but insufficient alone." },
    ],
  },

  "geo-7": {
    title: "Resource consumption & security · Nexus · Circular economy",
    intro: "Paper 2 core Unit 3（常出 infographic）。記住三大 security 同 nexus 雙向連繫。",
    parts: [
      {
        h: "Consumption trends 同 theories",
        min: 3,
        blocks: [
          ["table", ["Concept", "Key stat / idea"], [
            ["Global middle class", "~2 bn（2009）→ ~4 bn+（2020s），主要喺 Asia → more meat, energy, cars"],
            ["Poverty reduction", "extreme poverty（&lt;$2.15/day）~38%（1990）→ &lt;10%（2019）"],
            ["Ecological footprint", "humanity uses ~<b>1.7 Earths</b>；Earth Overshoot Day ~late July/early Aug"],
            ["Unequal footprint", "USA ~5 Earths if everyone lived like it；India ~0.8"],
            ["Energy mix", "fossil fuels ~80% of primary energy；solar + wind 增長最快"],
          ]],
          ["table", ["Malthus（1798）", "Boserup（1965）"], [
            ["population geometric, food arithmetic → famine, disease, war（checks）", "'necessity is the mother of invention' → 人口壓力推動 innovation（Green Revolution）"],
            ["Neo-Malthusian：Club of Rome <i>Limits to Growth</i>（1972）", "Resource optimist：Julian Simon"],
          ]],
          ["rhyme", "口訣 13", "馬悲觀，波樂觀，兩個都要評", "淨係介紹唔評 = 失分：Malthus 低估 technology；Boserup 忽略 environmental limits（groundwater、soil、climate）。"],
        ],
      },
      {
        h: "Water–food–energy nexus",
        min: 3,
        blocks: [
          ["key", "<b>Water security</b>（Falkenmark：&lt;1,700 m³/person/yr = stress；&lt;1,000 = scarcity）｜<b>Food security</b>（availability, access, utilisation, stability）｜<b>Energy security</b>（reliable, affordable supply）"],
          ["table", ["Link", "Example"], [
            ["Water → Food", "agriculture uses ~<b>70%</b> of freshwater withdrawals"],
            ["Energy → Water", "pumping, desalination（Middle East），water treatment"],
            ["Water → Energy", "HEP, cooling power stations"],
            ["Energy ↔ Food", "biofuels compete for land（US corn ~1/3 → ethanol）；fertiliser needs natural gas"],
          ]],
          ["eg", "Explain one interaction within the nexus. [3]", ["India: subsidised electricity for farm pumps [1]", "→ over-pumping groundwater, water tables falling (Punjab) [1]", "→ threatens future food production + more coal power demand [1]"]],
          ["trap", ["Nexus 題要寫<b>雙向</b> link 同 trade-off，唔係三樣分開講。", "Energy security 例子：Europe 2022 前依賴 Russian gas（EU ~40% of gas imports）。"]],
        ],
      },
      {
        h: "Sustainable futures（resource stewardship）",
        min: 2,
        blocks: [
          ["table", ["Strategy", "Example"], [
            ["Circular economy", "reduce, reuse, repair, recycle；Netherlands target fully circular by 2050；EU right-to-repair"],
            ["SDGs", "SDG 6 water, 7 energy, 12 responsible consumption"],
            ["Cut food waste", "~1/3 of food produced is lost or wasted"],
            ["Water recycling", "Singapore NEWater（可滿足 up to ~40% demand）"],
          ]],
          ["rhyme", "口訣 14", "一條直線變個圈", "Linear 'take-make-dispose' → circular。Limits：唔係所有 material 可回收、要能源、rebound effect、LICs uptake 低。"],
        ],
      },
    ],
    summary: [
      "中產多咗 → 肉、電、車多咗",
      "1.7 個地球；USA ~5，India ~0.8",
      "馬悲觀，波樂觀，兩個都要評",
      "農業用 70% 淡水；nexus 要講雙向",
      "Falkenmark：<1,700 stress，<1,000 scarcity",
      "一條直線變個圈（circular economy）",
    ],
    practice: [
      { q: "Define <em>ecological footprint</em>.", m: 2, a: "The area of biologically productive land and water [1] needed to produce the resources a population consumes and absorb its wastes [1]." },
      { q: "Explain one way that energy security and food security are linked.", m: 2, a: "Biofuel crops (e.g. US corn for ethanol) use land that could grow food [1], raising food prices / reducing food availability [1]. (Or fertiliser production needs natural gas.)" },
      { q: "Explain two reasons why Malthus's predictions have not come true at the global scale.", m: 4, a: "Technological innovation (Green Revolution HYVs, fertilisers, irrigation) increased food output faster than population [1+1]; fertility has fallen with development / trade redistributes food [1+1]." },
      { q: "Discuss the view that the circular economy is the most effective way to achieve resource security.", m: 10, a: "Level 5: define both; benefits with examples (Netherlands, NEWater, EU repair); limits (energy, cost, rebound, LIC uptake); alternatives (technology, reducing consumption, renewables, cooperation); conclusion – important but part of a wider strategy." },
    ],
  },

  "geo-8": {
    title: "Freshwater: drainage basins · hydrographs · water management",
    intro: "Paper 1 option。Hydrograph 計 lag time 必出；essay 多數係 dams / IDBM / scarcity。",
    parts: [
      {
        h: "Drainage basin system + hydrographs",
        min: 3,
        blocks: [
          ["table", ["Inputs", "Stores", "Flows（transfers）", "Outputs"], [
            ["precipitation", "interception, surface, soil water, groundwater, channel", "throughfall, stemflow, infiltration, percolation, overland flow, throughflow, groundwater flow", "evapotranspiration, channel discharge (runoff)"],
          ]],
          ["key", "<b>Lag time</b> = <b>peak rainfall → peak discharge</b>。Discharge 單位 = <b>cumecs</b>（m³ s⁻¹）。"],
          ["rhyme", "口訣 15", "斜、硬、濕、城、光 → 洪峰快又高", "Steep slopes, impermeable rock, saturated soil, urbanisation, deforestation（光禿禿）→ short lag, high peak（'flashy'）。"],
          ["eg", "Peak rainfall 14:00 Monday, peak discharge 02:00 Tuesday. Lag time? [1]", ["14:00 → 24:00 = 10 h；24:00 → 02:00 = 2 h", "Lag time = <b>12 hours</b>"]],
          ["trap", ["Lag time 由 <b>peak</b> rainfall 計，唔係由開始落雨計。", "Describe hydrograph 要 quote 數字 + 單位（e.g. 'peak 45 cumecs at 18:00'）。"]],
        ],
      },
      {
        h: "Floods, scarcity, water quality",
        min: 2.5,
        blocks: [
          ["table", ["Issue", "Key idea", "Named example"], [
            ["Flood management", "hard（dams, levees, channelisation）vs soft（afforestation, floodplain zoning, wetlands, warnings）", "Mississippi levees（2005 Katrina failure, New Orleans）"],
            ["Physical scarcity", "demand &gt; supply（arid, over-use）", "Middle East / North Africa"],
            ["Economic scarcity", "有水但冇錢起 infrastructure", "much of sub-Saharan Africa（Uganda, Ethiopia）"],
            ["Eutrophication", "nitrates/phosphates → algal bloom → O₂ depletion → fish die", "Lake Erie；Baltic dead zones"],
            ["Salinisation", "over-irrigation → water table ↑ → evaporation leaves salt", "Aral basin, Indus"],
            ["Groundwater depletion", "abstraction &gt; recharge", "Ogallala aquifer (USA)；Punjab (India)"],
          ]],
          ["note", "<b>Wetlands</b>：store floodwater, filter pollutants, biodiversity → protected by <b>Ramsar Convention (1971)</b>。"],
        ],
      },
      {
        h: "Dams 同 IDBM case studies",
        min: 3,
        blocks: [
          ["table", ["Case", "Key stats", "Evaluation"], [
            ["Three Gorges Dam, China（2012 full operation）", "~22.5 GW HEP（世界最大）；~1.3 m displaced；flood control on Yangtze", "sediment trapping, heritage lost, landslides, reservoir pollution"],
            ["GERD, Ethiopia（Blue Nile, filling from 2020, inaugurated 2025）", "~5 GW；Africa 最大 HEP", "transboundary tension：Egypt 依賴 Nile ~90%+ 淡水"],
            ["Aral Sea, Central Asia", "Soviet cotton irrigation（Amu Darya, Syr Darya）→ 縮細 ~90%", "fishing collapsed, salt/dust storms, health；Kok-Aral Dam (2005) partly 救返 North Aral"],
            ["Murray-Darling Basin Plan, Australia（2012）", "IDBM：return ~2,750 GL/yr to environment；4 states + ACT", "farmers vs environment，water buybacks 有爭議"],
          ]],
          ["rhyme", "口訣 16", "壩有電有灌溉，代價係人同泥", "Benefits：HEP, irrigation, flood control, water supply, navigation。Costs：displacement、sediment trapping（下游 erosion）、ecology、跨境衝突。"],
        ],
      },
    ],
    summary: [
      "Lag time：peak 雨 → peak 流量",
      "斜、硬、濕、城、光 → 洪峰快又高",
      "Physical vs economic scarcity",
      "Eutrophication：肥料 → 藻 → 缺氧 → 魚死",
      "壩有電有灌溉，代價係人同泥",
      "Three Gorges 22.5 GW / 1.3 m；Aral −90%；GERD vs Egypt",
    ],
    practice: [
      { q: "Peak rainfall was at 09:00 and peak discharge at 21:30. Calculate the lag time.", m: 1, a: "<b>12.5 hours</b>." },
      { q: "Explain two ways in which deforestation affects a storm hydrograph.", m: 4, a: "Less interception → more rain reaches the ground quickly [1] → shorter lag time [1]; less infiltration/evapotranspiration, more overland flow [1] → higher peak discharge [1]." },
      { q: "Explain the process of eutrophication.", m: 3, a: "Nitrate/phosphate run-off from fertilisers/sewage enters water [1]; rapid algal growth (bloom) blocks light [1]; decomposition of dead algae by bacteria uses up oxygen → fish die [1]." },
      { q: "Evaluate the costs and benefits of large multi-purpose dams.", m: 10, a: "Level 5: benefits (Three Gorges HEP 22.5 GW, flood control, irrigation), costs (1.3 m displaced, sediment, ecology), geopolitics (GERD–Egypt); scale and stakeholders; conclusion depends on governance, compensation, alternatives (IDBM)." },
    ],
  },

  "geo-9": {
    title: "Geophysical hazards: plates · hazards · risk & resilience",
    intro: "Paper 1 option。Essay 永遠係 'physical vs vulnerability' —— HIC/LIC case study 對比要記熟數字。",
    parts: [
      {
        h: "Plate boundaries 同 hazard types",
        min: 2.5,
        blocks: [
          ["table", ["Boundary", "Process", "Hazards", "Example"], [
            ["Divergent", "plates move apart, magma rises", "effusive basaltic eruptions, small quakes", "Mid-Atlantic Ridge, Iceland"],
            ["Convergent – subduction", "denser oceanic plate sinks", "explosive andesitic volcanoes, <b>megathrust</b> quakes, tsunamis", "Japan, Chile, Indonesia"],
            ["Convergent – collision", "two continental plates", "large shallow quakes, landslides", "Himalayas（Nepal 2015）"],
            ["Transform", "plates slide past", "shallow earthquakes, 冇火山", "San Andreas Fault"],
            ["Hotspot", "mantle plume", "shield volcanoes", "Hawaii"],
          ]],
          ["key", "Volcanic hazards：lava, <b>pyroclastic flows</b>, tephra, gases, <b>lahars</b>（VEI 量度）<br>Earthquake hazards：shaking, <b>liquefaction</b>, landslides, tsunamis。Moment magnitude 每 +1 ≈ <b>32× energy</b>（10× amplitude）"],
        ],
      },
      {
        h: "Risk 同 vulnerability：case studies",
        min: 3.5,
        blocks: [
          ["key", "<b>Risk = (Hazard × Vulnerability) ÷ Capacity to cope</b>"],
          ["table", ["Event", "Magnitude", "Deaths", "點解"], [
            ["Haiti 2010", "Mw 7.0", "~100,000–300,000（estimates vary）", "unreinforced concrete, weak governance, shallow & 近 Port-au-Prince"],
            ["Chile 2010", "Mw 8.8", "~500", "strict building codes, preparedness"],
            ["Christchurch NZ 2011", "Mw 6.2", "185", "shallow, liquefaction, 舊 CTV building collapse"],
            ["Tōhoku, Japan 2011", "Mw 9.0", "~18,000（mostly tsunami）", "HIC 都頂唔順；Fukushima nuclear disaster；~US$235 bn damage"],
            ["Nepal 2015", "Mw 7.8", "~9,000", "landslides, remote villages, poverty"],
            ["Türkiye–Syria 2023", "Mw 7.8", "~59,000", "building codes 冇 enforce（construction amnesties）"],
            ["Nevado del Ruiz, Colombia 1985", "VEI 3（細）", "~23,000", "lahar buried Armero；warnings ignored"],
          ]],
          ["rhyme", "口訣 17", "震級唔殺人，塌樓先殺人", "同樣 magnitude 死亡差好遠 → vulnerability（building quality, governance, preparedness, density, time of day）。"],
          ["trap", ["寫 'LICs are poor so more people die' 唔夠 —— 要講<b>機制</b>：unreinforced buildings、codes not enforced、slow emergency response。", "Counter-argument：Tōhoku 顯示極端 physical event 都可以 overwhelm 最 prepared 嘅 HIC。"]],
        ],
      },
      {
        h: "Building resilience",
        min: 2,
        blocks: [
          ["table", ["Stage", "Strategy"], [
            ["Before（prediction / preparation）", "monitoring volcanoes（seismometers, tiltmeters/GPS, SO₂ gas）；building codes（base isolators, cross-bracing）；land-use zoning；drills（Japan 1 Sept Disaster Prevention Day）；early warning"],
            ["During / after", "emergency response, aid, insurance, reconstruction ('build back better')"],
          ]],
          ["note", "<b>Park model</b>（disaster response curve）：quality of life 跌 → relief → rehabilitation → reconstruction。<b>Hazard perception</b>：fatalism vs adaptation — 影響人會唔會 prepare / evacuate。地震暫時<b>唔可以 predict</b>，只可以 forecast probability。"],
        ],
      },
    ],
    summary: [
      "Subduction = 爆炸火山 + megathrust + tsunami",
      "Mw +1 ≈ 32× energy",
      "Risk = Hazard × Vulnerability ÷ Capacity",
      "震級唔殺人，塌樓先殺人",
      "Haiti 7.0 → 100k+；Chile 8.8 → ~500",
      "Tōhoku 9.0 → 18k：極端事件 overwhelm HIC",
      "火山可以 monitor，地震只可以 forecast",
    ],
    practice: [
      { q: "Define <em>lahar</em>.", m: 1, a: "A volcanic <b>mudflow</b> of ash, debris and water." },
      { q: "An earthquake of Mw 8.0 releases approximately how many times more energy than one of Mw 6.0?", m: 1, a: "32 × 32 ≈ <b>1,000 times</b>." },
      { q: "Explain why explosive volcanic eruptions occur at subduction zones.", m: 3, a: "Oceanic plate subducts and partially melts [1]; magma is silica-rich (andesitic), viscous [1]; gases trapped → pressure builds → explosive eruption [1]." },
      { q: "'Vulnerability is more important than the physical characteristics of a hazard in determining its impact.' Discuss.", m: 10, a: "Level 5: Haiti vs Chile 2010 (vulnerability), Türkiye 2023 enforcement; physical factors (magnitude, depth, secondary hazards – Tōhoku tsunami, Armero lahar); conclusion: vulnerability usually decisive, but extreme events overwhelm resilience." },
    ],
  },

  "geo-10": {
    title: "Urban environments: processes · stresses · sustainable cities",
    intro: "Paper 1 option。Essay 要用 economic / social / environmental 三方面 evaluate。",
    parts: [
      {
        h: "Urban processes 同 land use",
        min: 2.5,
        blocks: [
          ["table", ["Process", "Meaning", "例子"], [
            ["Urbanisation", "% living in urban areas ↑", "world ~57% urban → ~68% by 2050"],
            ["Suburbanisation", "人搬去市郊", "post-war USA/UK"],
            ["Counter-urbanisation", "由城市搬去 rural areas", "UK 1970s–80s, remote working post-COVID"],
            ["Re-urbanisation", "人返入 inner city（often <b>gentrification</b>）", "London Docklands, Shoreditch"],
          ]],
          ["rhyme", "口訣 18", "入城、出郊、返鄉、回城", "四個 process 順序記。"],
          ["key", "<b>Bid-rent theory</b>：CBD 最 accessible → 地價最高 → 高層 offices/retail；越出越平 → housing → 郊區。LIC 城市：富人近 CBD，<b>informal settlements</b> 喺 periphery / 危險地（斜坡、河邊）。"],
        ],
      },
      {
        h: "Urban stresses 壓力",
        min: 3,
        blocks: [
          ["table", ["Stress", "Cause", "Named example / stat"], [
            ["Informal settlements", "rapid migration, no affordable housing", "Dharavi, Mumbai：~1 m people in ~2.1 km²；recycling economy"],
            ["Air pollution", "traffic, industry, crop burning", "Delhi winter PM2.5 often &gt;10× WHO guideline"],
            ["Traffic congestion", "car ownership ↑, poor public transport", "Jakarta, Lagos"],
            ["Urban heat island", "low albedo surfaces, less vegetation, waste heat, urban canyons", "cities several °C warmer, esp. at night"],
            ["Deprivation / segregation", "inequality, gated communities", "Rio favelas vs Barra"],
          ]],
          ["eg", "Explain two causes of the urban heat island. [4]", ["Concrete/asphalt: low albedo + high heat capacity → absorb by day, release at night [1+1]", "Less vegetation → less evapotranspiration cooling；waste heat from cars/AC [1+1]"]],
        ],
      },
      {
        h: "Sustainable & resilient cities",
        min: 2.5,
        blocks: [
          ["table", ["Strategy", "Example", "Evaluation"], [
            ["BRT", "Curitiba, Brazil（1974）", "high ridership, cheap vs metro；而家 overcrowded"],
            ["Congestion charge", "Singapore ERP（1998）；London (2003)", "traffic ↓ ~15–30%；被批評 regressive"],
            ["Low emission zone", "London ULEZ", "NO₂ ↓ in central London；cost to poorer drivers"],
            ["Slum upgrading", "Favela-Bairro, Rio（1994–）", "services, roads；但 gentrification / displacement"],
            ["Eco-city", "Masdar, UAE", "target 50,000 residents，只有幾千人住 → limited"],
          ]],
          ["rhyme", "口訣 19", "錢、人、地球，三條都要問", "Economic / social / environmental sustainability — evaluate 每個 strategy 用三條 criteria。"],
          ["trap", ["只 describe strategy 冇講<b>證據</b>佢 work（數字！）。", "忘記講 who benefits vs who loses（gentrification 趕走窮人）。"]],
        ],
      },
    ],
    summary: [
      "入城、出郊、返鄉、回城",
      "Bid-rent：CBD 地價最高",
      "Dharavi ~1 m 人 / ~2 km²",
      "UHI：黑面、冇樹、廢熱、峽谷",
      "Curitiba BRT、Singapore ERP、London ULEZ",
      "錢、人、地球，三條都要問",
    ],
    practice: [
      { q: "Define <em>counter-urbanisation</em>.", m: 1, a: "The movement of people <b>from urban areas to rural areas</b> (beyond the city)." },
      { q: "Explain two reasons why informal settlements develop in cities in low-income countries.", m: 4, a: "Rapid rural-urban migration exceeds formal housing supply [1+1]; migrants cannot afford formal housing/land, so build on unused/hazardous land [1+1]." },
      { q: "Explain how gentrification can lead to social problems.", m: 3, a: "Higher-income groups renovate housing [1]; rents and prices rise [1]; original lower-income residents displaced / community broken up [1]." },
      { q: "Evaluate the success of strategies used to reduce traffic congestion in cities.", m: 10, a: "Level 5: Singapore ERP, London charge, Curitiba BRT – data on traffic/ridership; social equity, cost, rebound; conclusion – most effective as integrated packages with good public transport." },
    ],
  },

  "geo-11": {
    title: "Food and health: measuring · production · disease diffusion",
    intro: "Paper 1 option。記住 food insecurity 多數係 access 問題（Sen），唔只係 supply。",
    parts: [
      {
        h: "Measuring food and health",
        min: 2.5,
        blocks: [
          ["key", "<b>Food security</b>（FAO 1996）：all people, at all times, physical and economic access to sufficient, safe, nutritious food。四條 pillars：availability, access, utilisation, stability。"],
          ["table", ["Indicator", "意思", "數據"], [
            ["% undernourished", "calorie intake 唔夠", "~9% of world (~700 m+)"],
            ["Stunting", "low height for age（chronic undernutrition）", "~22% of under-5s"],
            ["HALE", "health-adjusted life expectancy（健康地活嘅年數）", "通常比 life expectancy 少 ~8–10 年"],
            ["DALY", "disability-adjusted life years lost", "用嚟比較 disease burden"],
          ]],
          ["rhyme", "口訣 20", "窮病傳染，富病食出嚟", "<b>Epidemiological transition</b>：infectious diseases（malaria, cholera, TB）→ non-communicable diseases（heart disease, type 2 diabetes, obesity）。"],
        ],
      },
      {
        h: "Food production 同 nutrition transition",
        min: 3,
        blocks: [
          ["table", ["Approach", "Key stats", "Evaluation"], [
            ["Green Revolution（India, 1960s+）", "HYVs + fertiliser + irrigation；wheat output ~4× 1965–1990", "famine avoided；但 Punjab groundwater depletion、debt、benefits larger farmers"],
            ["GM crops", "Bt cotton India（~90%+ of cotton area）；Golden Rice（Philippines 2021 approved）", "yields ↑ / pesticides ↓；but seed costs, corporate control, public opposition"],
            ["Agroecology / organic", "lower inputs", "sustainable 但 yields 通常較低"],
            ["Vertical farming", "Singapore（'30 by 30' target）", "land-efficient 但 energy-intensive"],
          ]],
          ["eg", "Explain why obesity is rising in emerging economies. [3]", ["Rising incomes + urbanisation → <b>nutrition transition</b> to processed, sugary, fatty food [1]", "TNC fast food/soft drink marketing；sedentary jobs + cars [1]", "e.g. Mexico ~36% adults obese → sugar tax 2014（~10%） [1]"]],
          ["trap", ["假設 food insecurity 只係 supply 問題 —— Sen's entitlement theory：Bengal famine 1943 有糧但人<b>買唔起</b>。", "Food aid 有正反：emergency 救命，但長期可以壓低 local farmers 價錢。"]],
        ],
      },
      {
        h: "Disease diffusion + management",
        min: 2.5,
        blocks: [
          ["table", ["Diffusion type", "點傳", "Example"], [
            ["Expansion – contagious", "由源頭向外擴散（距離決定）", "early cholera spread, Ebola West Africa 2014"],
            ["Relocation", "人帶住疾病搬去新地方", "Haiti cholera 2010（UN peacekeepers）"],
            ["Hierarchical", "大城市 → 細城市（urban hierarchy）", "COVID-19 via global air hubs"],
          ]],
          ["note", "<b>Barriers</b>：distance, quarantine, vaccination, natural immunity。<b>Management</b>：malaria – bed nets, spraying, RTS,S + R21 vaccines（Africa rollout 2023–24）；smallpox eradicated 1980；WHO, Gavi, MSF。"],
        ],
      },
    ],
    summary: [
      "Food security 四柱：有、買到、用到、穩定",
      "窮病傳染，富病食出嚟",
      "Green Revolution：產量 ↑ 但地下水 ↓、貧富 ↑",
      "Sen：有糧都會餓死 —— 係 access 問題",
      "擴散三式：向外、跟人走、由大到細",
      "Mexico sugar tax 2014；malaria vaccines 2023–24",
    ],
    practice: [
      { q: "Define <em>stunting</em>.", m: 1, a: "Low <b>height for age</b> in children, indicating chronic undernutrition." },
      { q: "Distinguish between relocation and hierarchical diffusion.", m: 2, a: "Relocation: disease carried by people moving to a new area, leaving the origin [1]; hierarchical: spreads from larger to smaller places through the urban hierarchy [1]." },
      { q: "Explain two disadvantages of the Green Revolution.", m: 4, a: "Environmental – groundwater depletion/salinisation, pesticide pollution (Punjab) [1+1]; social – costs of seeds/fertiliser favoured richer farmers, debt, inequality [1+1]." },
      { q: "To what extent is food insecurity caused by human rather than physical factors?", m: 10, a: "Level 5: physical (drought – Sahel, climate change, pests); human (poverty/access – Sen, conflict – Yemen, Sudan, waste, price spikes, governance); interaction; conclusion – human factors usually decisive, physical as triggers." },
    ],
  },

  "geo-h4": {
    title: "Oceans and coastal margins: ocean-atmosphere · coasts · management",
    intro: "Paper 1 option（SL 都可以揀）。ENSO 同 coastal management essay 最常出。",
    parts: [
      {
        h: "Ocean-atmosphere interactions",
        min: 3,
        blocks: [
          ["table", ["Feature", "Key idea"], [
            ["Thermohaline circulation（conveyor belt）", "冷 + 鹹 → 密度高 → North Atlantic 下沉，全球重新分配熱量"],
            ["Normal / La Niña", "strong trade winds 吹暖水去西 → Australia/Indonesia 多雨；Peru coast upwelling 冷水 + 多 nutrients（anchovy）"],
            ["El Niño", "trade winds weaken → 暖水向東 → Peru floods + fishery collapse；Australia/Indonesia drought + bushfires"],
            ["Ocean as carbon sink", "absorbs ~25% of human CO₂ → <b>ocean acidification</b>（pH ↓ ~0.1 since pre-industrial）→ coral, shellfish 受害"],
          ]],
          ["rhyme", "口訣 21", "El Niño 風弱暖水東，秘魯浸水澳洲乾", "La Niña 就反轉：更強 trade winds，Australia 水浸（2010–11 Queensland floods）。"],
          ["trap", ["El Niño 同 La Niña 效果撈亂 —— 記住 El Niño = <b>東暖</b>（Peru 暖）。"]],
        ],
      },
      {
        h: "Coastal processes 同 landforms",
        min: 2.5,
        blocks: [
          ["table", ["Process", "Landform"], [
            ["Erosion：hydraulic action, abrasion, solution, attrition", "cliffs, wave-cut platforms, headlands & bays, caves → arches → stacks → stumps"],
            ["Longshore drift（波浪斜角 swash，垂直 backwash）", "transports sediment along coast"],
            ["Deposition", "beaches, spits, bars, tombolos"],
          ]],
          ["eg", "Explain the formation of a spit. [4]", ["Longshore drift moves sediment along the coast [1]", "Coast changes direction (e.g. river mouth) → sediment deposited out into the sea [1]", "Spit grows over time [1]", "Changing wind/wave direction → recurved (hooked) end；salt marsh forms behind [1] — e.g. Spurn Head, Holderness"]],
        ],
      },
      {
        h: "Managing coasts and oceans",
        min: 2.5,
        blocks: [
          ["table", ["Strategy", "Example", "Evaluation"], [
            ["Hard：sea wall, groynes, rock armour", "Holderness coast, UK（Mappleton rock groynes 1991）—— erosion ~1.5–2 m/yr，Europe 最快之一", "保護 Mappleton，但 terminal groyne effect → 下游 Cowden erosion 加快"],
            ["Soft：beach nourishment, managed retreat, mangroves", "Sand Engine, Netherlands（2011, ~21 m m³ sand）", "natural, adaptable；要定期 renew"],
            ["Mangrove restoration", "Indian Ocean tsunami 2004 → mangroves reduced damage", "cheap, carbon sink, nurseries for fish"],
            ["ICZM", "整個 coastal zone 一齊管理，balance stakeholders", "需要合作，時間長"],
          ]],
          ["note", "<b>UNCLOS</b>：territorial sea 12 nm；<b>EEZ 200 nm</b>（South China Sea 爭議）。Ocean futures：overfishing（~1/3 stocks overfished）、plastics（Great Pacific Garbage Patch）。"],
          ["rhyme", "口訣 22", "硬工程救自己害鄰居，軟工程慢但長命", "Evaluate：cost、effectiveness、environmental impact、impact on other places（down-drift）。"],
        ],
      },
    ],
    summary: [
      "El Niño 風弱暖水東，秘魯浸水澳洲乾",
      "Oceans 吸 ~25% CO₂ → acidification",
      "Longshore drift → spit → hook + salt marsh",
      "硬工程救自己害鄰居（Mappleton → Cowden）",
      "軟工程：Sand Engine、mangroves、managed retreat",
      "EEZ 200 nm；territorial sea 12 nm",
    ],
    practice: [
      { q: "State the extent of an exclusive economic zone.", m: 1, a: "<b>200 nautical miles</b> from the coastal baseline." },
      { q: "Explain two effects of an El Niño event.", m: 4, a: "Drought/bushfires in Australia/Indonesia – warm water and rising air shift east [1+1]; flooding in Peru and fishery collapse – reduced upwelling of cold nutrient-rich water [1+1]." },
      { q: "Explain how ocean acidification occurs and one impact.", m: 3, a: "Oceans absorb CO₂ [1] forming carbonic acid, lowering pH [1]; less carbonate for shells/coral skeletons → coral reefs and shellfish decline [1]." },
      { q: "Evaluate the effectiveness of hard engineering in managing coastal erosion.", m: 10, a: "Level 5: sea walls/groynes/rock armour with examples (Mappleton), strengths (short-term protection), limits (cost, terminal groyne effect, ecology); compare soft/ICZM; conclusion." },
    ],
  },

  "geo-12": {
    title: "Geographical skills: graphs · statistics · 10-mark essays",
    intro: "跨 Paper 1 + 2 + IA。Describe 用 GSA；10-mark essay 用 PEEL + conclusion。",
    parts: [
      {
        h: "Graphs 同 maps",
        min: 2.5,
        blocks: [
          ["table", ["Type", "用嚟", "Limitation"], [
            ["Choropleth", "area values（shading）", "assumes uniform within area；boundaries arbitrary"],
            ["Proportional symbols", "totals at points", "symbols overlap"],
            ["Isoline", "continuous data（temperature, contours）", "interpolation between points"],
            ["Flow-line", "movement（migration, trade）", "cluttered"],
            ["Scatter graph", "relationship 兩個 variables", "correlation ≠ causation"],
            ["Triangular graph", "3 components adding to 100%", "difficult to read"],
          ]],
          ["rhyme", "口訣 23", "G-S-A：大勢、數據、例外", "<b>G</b>eneral trend → <b>S</b>pecific data（數字 + 單位 + 地名）→ <b>A</b>nomaly。"],
          ["eg", "Map：slope rises from 120 m to 320 m over 2.5 km. Gradient? [2]", ["Vertical interval = 320 − 120 = 200 m；horizontal = 2,500 m [M1]", "Gradient = 200 ÷ 2,500 = <b>0.08</b>（1 in 12.5）[A1]"]],
        ],
      },
      {
        h: "Statistics（IA + Paper 2）",
        min: 2.5,
        blocks: [
          ["key", "<b>Spearman's rank</b>：\\(r_s = 1 - \\frac{6\\sum d^2}{n(n^2-1)}\\)，range −1 to +1；check significance vs critical value。"],
          ["eg", "n = 10, Σd² = 33. Calculate r<sub>s</sub>. [2]", ["6 × 33 = 198；10 × (100 − 1) = 990 [M1]", "1 − 198/990 = 1 − 0.2 = <b>0.80</b> → strong positive [A1]"]],
          ["table", ["Measure", "用途"], [
            ["Mean / median / mode", "central tendency（skewed data 用 median）"],
            ["Range / IQR", "spread（IQR 唔受 outliers 影響）"],
            ["% change", "(new − old) ÷ old × 100"],
          ]],
          ["trap", ["Correlation ≠ causation —— 一定要寫。", "% change 除 <b>old</b> value，唔係 new。"]],
        ],
      },
      {
        h: "10-mark extended response",
        min: 3,
        blocks: [
          ["table", ["Section", "內容"], [
            ["Intro（2–3 句）", "define key terms + line of argument + scale"],
            ["3–4 paragraphs", "<b>P</b>oint → <b>E</b>vidence（named, located example + data）→ <b>E</b>xplain → <b>L</b>ink back to question"],
            ["Perspectives", "stakeholders, places, scales, timescales（short vs long term）"],
            ["Conclusion", "judgement 答 command term：'to a large extent, because…' + 'it depends on…'"],
          ]],
          ["rhyme", "口訣 24", "定義、論點、例子、數、觀點、結論", "Level 5（9–10）：well-structured, detailed located examples, evaluation <b>throughout</b>，唔係淨係最尾。"],
          ["trap", ["冇 conclusion 或者 conclusion 冇答 'to what extent' —— 直接封頂 Level 3–4。", "Examples 要 named + located + dated，'a city in Africa' 冇分。"]],
        ],
      },
    ],
    summary: [
      "G-S-A：大勢、數據、例外",
      "Gradient = vertical ÷ horizontal（同單位）",
      "r_s = 1 − 6Σd² ÷ n(n² − 1)",
      "Correlation ≠ causation",
      "% change ÷ old value",
      "定義、論點、例子、數、觀點、結論",
    ],
    practice: [
      { q: "State one limitation of a choropleth map.", m: 1, a: "Assumes values are <b>uniform</b> within each area / hides internal variation / sudden changes at boundaries." },
      { q: "A town's population grows from 40,000 to 52,000. Calculate the percentage increase.", m: 2, a: "(52,000 − 40,000) ÷ 40,000 × 100 [M1] = <b>30%</b> [A1]" },
      { q: "For 8 paired values, Σd² = 21. Calculate Spearman's rank correlation coefficient.", m: 2, a: "1 − (6 × 21)/(8 × 63) = 1 − 126/504 [M1] = <b>0.75</b> [A1]" },
      { q: "Describe the relationship shown by a scatter graph of GDP per capita against life expectancy with r = +0.78 and two anomalies below the trend line.", m: 3, a: "Positive relationship – higher GDP per capita, higher life expectancy [1]; fairly strong but not perfect (+0.78) [1]; anomalies have lower life expectancy than expected for their income, e.g. due to inequality/disease/conflict [1]." },
    ],
  },
});
