/* ⏱ 10-minute fast notes · Economics SL (format: see js/fastnotes.js). Guide: first assessment 2022. */
IB.addFast({
  "econ-1": {
    title: "Scarcity · Opportunity cost · PPC · Economic systems",
    parts: [
      {
        h: "Scarcity & opportunity cost 稀缺同機會成本",
        min: 2.5,
        blocks: [
          ["key", "<b>Scarcity</b> = limited resources vs unlimited wants → 一定要 <b>choice</b> → 每個 choice 都有 <b>opportunity cost</b>。<br>三個 basic questions：<b>What</b> to produce? <b>How</b> to produce? <b>For whom</b>?"],
          ["table", ["Term", "Exam definition（背到字字準）"], [
            ["Scarcity", "The condition in which limited resources are insufficient to satisfy unlimited wants."],
            ["Opportunity cost", "The value of the <b>next best alternative forgone</b> when a choice is made."],
            ["Factors of production", "Land, labour, capital, entrepreneurship (rent, wages, interest, profit)."],
            ["Free good", "A good with zero opportunity cost (e.g. air) — 唔使放棄任何嘢。"],
          ]],
          ["rhyme", "口訣 1", "地勞資企，租工息利", "Land→rent, Labour→wages, Capital→interest, Entrepreneurship→profit（四個 factors 同佢哋嘅 rewards）。"],
          ["trap", [
            "Opportunity cost 係 <b>next best</b> 一個，唔係「所有放棄咗嘅嘢」加埋。",
            "Capital 喺經濟學係 man-made goods（機器、工廠），<b>唔係錢</b>！",
          ]],
        ],
      },
      {
        h: "PPC 生產可能曲線（必畫）",
        min: 3.5,
        blocks: [
          ["key", "PPC = maximum combinations of two goods an economy can produce with <b>all resources fully and efficiently employed</b>, given technology.<br><b>Diagram</b>：x 軸 Good A（quantity），y 軸 Good B；concave（向外彎）曲線 PPC₁。"],
          ["table", ["喺圖上", "意思", "IB 字眼"], [
            ["點喺曲線上", "全部資源用晒、有效率", "productive efficiency"],
            ["點喺曲線入面", "有失業 / 浪費", "unemployment / inefficiency"],
            ["點喺曲線外面", "而家做唔到", "unattainable"],
            ["沿住曲線郁 A→B", "多咗一樣，少咗另一樣", "opportunity cost（兩條軸都要畫箭咀）"],
            ["裡面 → 曲線上", "用返閒置資源", "<b>actual</b> growth"],
            ["成條曲線向外移 PPC₁→PPC₂", "多咗 / 好咗資源、technology", "<b>potential</b> growth"],
          ]],
          ["rhyme", "口訣 2", "入去出嚟係 actual，成條推出係 potential", "Actual growth = 由入面行出去條線；potential growth = 條線本身向外推。"],
          ["eg", "A→B：capital goods 由 20 升到 30，consumer goods 由 50 跌到 40。Opportunity cost？", [
            "放棄咗 50 − 40 = <b>10 units of consumer goods</b> 換 10 units capital goods → 每 1 unit capital good 嘅 OC = 1 consumer good。",
            "Concave → 再郁落去 OC 會<b>上升</b>（increasing opportunity cost），因為 resources are not equally suited to all uses。",
          ]],
          ["trap", [
            "失業減少 ≠ PPC 外移！只係由入面郁去曲線（actual growth）。",
            "Straight-line PPC = <b>constant</b> opportunity cost；concave 先係 increasing。",
          ]],
        ],
      },
      {
        h: "Economic systems · Positive vs normative · Circular flow",
        min: 2.5,
        blocks: [
          ["table", ["System", "邊個分配資源", "+", "−"], [
            ["Free market", "price mechanism", "efficiency, choice, innovation", "inequality, market failure"],
            ["Planned", "government", "equity, basic needs", "no price signals, inefficiency"],
            ["Mixed", "both（現實所有國家）", "balance", "government failure risk"],
          ]],
          ["key", "<b>Positive</b> = can be tested with evidence（啱唔啱都得，可以驗證）｜<b>Normative</b> = value judgement（should, fair, too high, better）。<br><b>Ceteris paribus</b> = all other things being equal。"],
          ["rhyme", "口訣 3", "有 should 就係 normative", "有數字唔代表係 positive；睇有冇價值判斷。"],
          ["note", "<b>Circular flow</b>：households ⇄ firms。<b>Leakages</b>（S, T, M）vs <b>Injections</b>（I, G, X）。Injections &gt; leakages → national income 增加。<br><b>9 key concepts</b>：scarcity, choice, efficiency, equity, economic well-being, sustainability, change, interdependence, intervention（IA 要用）。"],
          ["trap", ["Circular flow 入面 saving 係 <b>leakage</b>，investment 先係 injection — 唔好掉轉。"]],
        ],
      },
    ],
    summary: [
      "資源有限、慾望無限 → 要揀 → 有機會成本",
      "Opportunity cost = next best alternative forgone",
      "地勞資企，租工息利",
      "線上有效率，線內有浪費，線外做唔到",
      "入去出嚟係 actual，成條推出係 potential",
      "有 should 就係 normative",
    ],
    practice: [
      { q: "Define <i>opportunity cost</i>.", m: 2, a: "The value of the next best alternative [1] that is forgone when a choice is made [1]." },
      { q: "Using a PPC diagram, explain the difference between actual and potential economic growth.", m: 4, a: "Diagram: axes two goods, PPC₁ and PPC₂, point A inside [1]. Actual growth: A moves towards/onto the PPC using unemployed resources [1]. Potential growth: PPC shifts out (PPC₁→PPC₂) [1] due to more/better factors of production or technology [1]." },
      { q: "Explain why a PPC is usually drawn concave to the origin.", m: 2, a: "Resources are not equally suited to producing both goods [1], so as more of one good is produced, increasing amounts of the other must be given up — increasing opportunity cost [1]." },
      { q: "Identify whether each statement is positive or normative: (i) “Youth unemployment rose to 14% in 2025.” (ii) “The government should spend more on public transport.”", m: 2, a: "(i) Positive — can be tested against data [1]. (ii) Normative — contains a value judgement (“should”) [1]." },
    ],
  },

  "econ-2": {
    title: "Demand & Supply · Movement vs Shift · Determinants",
    parts: [
      {
        h: "Demand 需求",
        min: 3,
        blocks: [
          ["key", "<b>Demand</b> = the quantity of a good that consumers are <b>willing and able</b> to buy at each possible price in a given time period, ceteris paribus.<br><b>Law of demand</b>：P↑ → Qd↓（inverse relationship），ceteris paribus。"],
          ["table", ["點解 D 向下斜", "一句講晒"], [
            ["Income effect", "P↓ → real income↑ → 買得多啲"],
            ["Substitution effect", "P↓ → 相對其他嘢平咗 → 轉買佢"],
            ["Diminishing marginal utility", "每多一件，額外滿足感（MU）跌 → 要平啲先肯多買"],
          ]],
          ["rhyme", "口訣 1（D 嘅 non-price determinants）", "收入口味人，替補預期", "Income（normal / inferior）、Tastes、Number of consumers、Substitutes、Complements、Expectations of future prices。"],
          ["table", ["Event", "Effect on D"], [
            ["Income↑（normal good）", "D 右移"],
            ["Income↑（inferior good, e.g. bus travel）", "D 左移"],
            ["Price of substitute↑", "D 右移"],
            ["Price of complement↑", "D 左移"],
          ]],
        ],
      },
      {
        h: "Supply 供應",
        min: 2.5,
        blocks: [
          ["key", "<b>Supply</b> = the quantity of a good that producers are <b>willing and able</b> to supply at each possible price in a given time period, ceteris paribus.<br><b>Law of supply</b>：P↑ → Qs↑，因為 higher profit incentive 同 increasing marginal costs。"],
          ["rhyme", "口訣 2（S 嘅 non-price determinants）", "成本科技稅補貼，相關預期災難多公司", "Costs of factors of production、Technology、Indirect taxes / Subsidies、Prices of related goods（joint / competitive supply）、Expectations、Shocks（weather, disasters）、Number of firms。"],
          ["note", "成本↑ / tax / 天災 → S <b>左移</b>（S₁→S₂ 向上）。Technology↑ / subsidy / 新公司 → S <b>右移</b>。"],
          ["trap", ["S 左移 = 「supply 減少」— 唔好講成 S 「向上移所以增加」。"]],
        ],
      },
      {
        h: "Movement vs Shift（最常考）+ 畫圖",
        min: 3,
        blocks: [
          ["rhyme", "口訣 3", "自己價錢沿線行，其他因素成條郁", "Own price change → movement along（extension / contraction of Qd）；non-price determinant → shift of the curve。"],
          ["table", ["原因", "IB 字眼", "例"], [
            ["自己價錢↓", "increase in <b>quantity demanded</b>（extension）", "咖啡平咗 → 買多啲咖啡"],
            ["收入↑", "increase in <b>demand</b>（D₁→D₂）", "加人工 → 任何價都買多啲"],
          ]],
          ["eg", "咖啡價錢上升，對 tea market 有咩影響？（4 marks）", [
            "Tea 同 coffee 係 <b>substitutes</b> → 有人轉飲茶 → D for tea 由 D₁ 右移去 D₂。",
            "原價 P₁ 出現 <b>excess demand</b> → 價格上升 → Qs extension。",
            "新 equilibrium：P₂ &gt; P₁，Q₂ &gt; Q₁。圖：axes Price / Quantity，D₁ D₂ S，虛線標 P₁ P₂ Q₁ Q₂ + 箭咀。",
          ]],
          ["trap", [
            "價錢變 → 寫「demand increases」= 失分！要寫 <b>quantity demanded</b>。",
            "圖一定要：axes 寫 Price (P) / Quantity (Q)、curves 有 label、新舊 equilibrium 都標，仲要喺文字度 refer 返個圖。",
          ]],
        ],
      },
    ],
    summary: [
      "Demand / supply 定義：willing and able, at each price, given time period",
      "D 向下斜：income effect、substitution effect、diminishing MU",
      "收入口味人，替補預期（D 移）",
      "成本科技稅補貼，相關預期災難多公司（S 移）",
      "自己價錢沿線行，其他因素成條郁",
      "Inferior good：人工加，D 反而左移",
    ],
    practice: [
      { q: "Define <i>demand</i>.", m: 2, a: "The quantity of a good that consumers are willing and able to buy [1] at each possible price over a given time period, ceteris paribus [1]." },
      { q: "Explain the difference between a change in demand and a change in quantity demanded.", m: 2, a: "A change in quantity demanded is a movement along the demand curve caused by a change in the good's own price [1]; a change in demand is a shift of the whole curve caused by a non-price determinant (e.g. income) [1]." },
      { q: "Using a diagram, explain how a rise in the cost of fertiliser affects the market for rice.", m: 4, a: "Diagram: S₁ shifts left to S₂, P↑ Q↓ labelled [1–2]. Fertiliser is a factor input, so costs of production rise and producers supply less at each price [1]; excess demand at P₁ pushes price up to P₂ and quantity falls to Q₂ [1]." },
      { q: "Explain why an increase in income may reduce the demand for second-hand clothing.", m: 2, a: "Second-hand clothing is likely an inferior good (negative YED) [1]; as income rises consumers switch to new clothing, so D shifts left [1]." },
    ],
  },

  "econ-3": {
    title: "Equilibrium · Price mechanism · Surplus & allocative efficiency",
    parts: [
      {
        h: "Equilibrium 均衡 & disequilibrium",
        min: 2.5,
        blocks: [
          ["key", "<b>Equilibrium</b>：Qd = Qs，冇 tendency to change。<br>P &gt; Pe → <b>excess supply</b>（surplus）→ P 跌｜P &lt; Pe → <b>excess demand</b>（shortage）→ P 升"],
          ["rhyme", "口訣 1", "價高貨多要減價，價低搶貨會加價", "Above equilibrium → surplus → price falls；below → shortage → price rises。"],
          ["table", ["同時變", "P", "Q"], [
            ["D↑ S 不變", "↑", "↑"],
            ["S↑ D 不變", "↓", "↑"],
            ["D↑ 同 S↑", "?（睇邊個移得多）", "↑"],
            ["D↑ 同 S↓", "↑", "?"],
          ]],
          ["trap", ["要寫<b>過程</b>：shortage → competition among buyers → P↑ → Qd contracts, Qs extends → new equilibrium。淨係寫結果冇齊分。"]],
        ],
      },
      {
        h: "Price mechanism 三個 functions",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 2", "訊號、誘因、分配（S-I-R）", "<b>Signalling</b>, <b>Incentive</b>, <b>Rationing</b>。"],
          ["table", ["Function", "意思（D 右移為例）"], [
            ["Signalling", "價格上升 communicates information：消費者想要多啲呢樣嘢"],
            ["Incentive", "高價 → 高利潤 → firms 有誘因增加 Qs / 新公司 enter；消費者有誘因少買"],
            ["Rationing", "價高 → 只有 willing and able to pay 嘅人買到 → 分配稀缺貨品"],
          ]],
          ["eg", "Plant-based milk demand ↑，price mechanism 點樣 reallocate resources？", [
            "D₁→D₂，原價有 shortage → P↑（signal：消費者想要多啲）。",
            "P↑ → 利潤↑ → firms 增產，resources（土地、勞工）由 dairy 轉去 plant-based milk（incentive）。",
            "高價 ration 有限嘅供應 → 新 equilibrium P₂, Q₂。",
          ]],
        ],
      },
      {
        h: "Consumer / producer surplus & allocative efficiency",
        min: 3.5,
        blocks: [
          ["key", "<b>Consumer surplus</b> = highest price consumers are willing to pay − price actually paid（D 以下、P 以上三角形）<br><b>Producer surplus</b> = price received − lowest price producers are willing to accept（P 以下、S 以上三角形）<br><b>Social / community surplus</b> = CS + PS"],
          ["rhyme", "口訣 3", "消費者喺上，生產者喺下", "Diagram：Pe 條橫線上面、D 以下 = CS；下面、S 以上 = PS。"],
          ["key", "<b>Allocative efficiency</b>：<b>MB = MC</b>（free market 冇 externalities 時 = MSB = MSC）→ social surplus is <b>maximised</b>。D 代表 marginal benefit，S 代表 marginal cost。"],
          ["eg", "D 喺 price axis 嘅 intercept = $12，Pe = $8，Qe = 300。CS？", [
            "CS = ½ × base × height = ½ × 300 × (12 − 8)",
            "= <b>$600</b>（記得寫單位 $）",
          ]],
          ["trap", [
            "Allocative efficiency 係 <b>MB = MC</b>，唔係「cost 最低」（嗰個係 productive efficiency）。",
            "Output 唔喺 Qe（多咗或少咗）都會有 <b>welfare loss</b>（deadweight loss）三角形。",
          ]],
        ],
      },
    ],
    summary: [
      "Qd = Qs 就係 equilibrium",
      "價高貨多要減價，價低搶貨會加價",
      "訊號、誘因、分配（signalling, incentive, rationing）",
      "消費者喺上，生產者喺下",
      "MB = MC → allocative efficiency → social surplus 最大",
      "Surplus 計數 = ½ × base × height，加 $",
    ],
    practice: [
      { q: "Define <i>consumer surplus</i>.", m: 2, a: "The difference between the highest price consumers are willing to pay [1] and the price they actually pay [1]." },
      { q: "A linear supply curve meets the price axis at $2. Equilibrium price is $7 and quantity is 400 units. Calculate producer surplus.", m: 2, a: "½ × 400 × (7 − 2) [1] = <b>$1000</b> [1]." },
      { q: "Using a diagram, explain the signalling and incentive functions of price when the supply of avocados falls.", m: 4, a: "Diagram S₁→S₂ left, P↑ [1]. Shortage at old price bids price up [1]. Signalling: higher price tells buyers avocados are scarcer, so they cut consumption [1]. Incentive: higher price encourages producers to extend supply / grow more avocados [1]." },
      { q: "Explain why the competitive market equilibrium is allocatively efficient.", m: 4, a: "D represents marginal benefit, S represents marginal cost [1]; at equilibrium MB = MC [1]; social surplus (CS + PS) is maximised [1]; any output above/below creates welfare loss [1] (assuming no externalities)." },
    ],
  },

  "econ-4": {
    title: "Rational choice · Behavioural economics · Nudges · Business objectives",
    parts: [
      {
        h: "Rational consumer choice 理性選擇（假設）",
        min: 2,
        blocks: [
          ["key", "傳統模型假設 consumers：① <b>consistent (rational) preferences</b> ② <b>perfect information</b> ③ <b>utility maximisation</b>。<br><b>Utility</b> = satisfaction from consumption；<b>diminishing marginal utility</b>：每多一件，額外滿足感下降。"],
          ["rhyme", "口訣 1", "諗得清、知得晒、要最爽", "Rational preferences、perfect information、maximise utility — behavioural economics 就係話呢三樣唔成立。"],
        ],
      },
      {
        h: "Behavioural economics 行為經濟學",
        min: 3.5,
        blocks: [
          ["table", ["概念", "意思", "例子"], [
            ["Bounded rationality", "資訊、時間、腦力有限 → 揀「夠好」", "唔會比較晒 50 個電話月費"],
            ["Bounded self-control", "知道對自己唔好都控制唔到", "食煙、唔儲錢"],
            ["Bounded selfishness", "會關心其他人", "捐錢、做義工"],
            ["Rule of thumb (heuristics)", "用簡單捷徑做決定", "次次買同一個牌子"],
            ["Anchoring", "過份依賴第一個見到嘅數字", "「原價 $999，而家 $499」"],
            ["Framing", "講法唔同 → 選擇唔同", "「90% fat-free」vs「10% fat」"],
            ["Availability bias", "最近 / 印象深嘅事件影響判斷", "睇完空難新聞唔敢搭飛機"],
            ["Imperfect information", "唔知道產品嘅真實好處 / 壞處", "唔知糖嘅健康成本"],
          ]],
          ["rhyme", "口訣 2", "三個 bounded（理性、自控、自私），三個 bias（拇指、錨、框）", "Bounded rationality / self-control / selfishness；rule of thumb, anchoring, framing（+ availability）。"],
        ],
      },
      {
        h: "Choice architecture, nudges & business objectives",
        min: 3,
        blocks: [
          ["key", "<b>Nudge</b> = changing the way choices are presented (choice architecture) to influence behaviour, <b>without restricting options or significantly changing economic incentives</b>。"],
          ["table", ["Choice architecture", "意思", "例"], [
            ["Default choice", "唔揀就自動係呢個（opt-out）", "pension auto-enrolment, organ donation"],
            ["Restricted choice", "只俾少量選項", "學校飯堂淨係有健康選擇"],
            ["Mandated choice", "一定要做決定先可以繼續", "申請車牌要答捐唔捐器官"],
          ]],
          ["note", "<b>Business objectives</b>（唔一定 profit maximisation）：<b>corporate social responsibility (CSR)</b>、<b>market share</b>、<b>satisficing</b>（夠好就得）、<b>growth</b>。"],
          ["trap", [
            "Nudge 唔係 tax / ban — 有加稅或禁止就唔係 nudge。",
            "Evaluate nudge：低成本、保留自由 ✅ vs 效果細、短暫、manipulation ethics、要 evidence ❌。",
          ]],
        ],
      },
    ],
    summary: [
      "諗得清、知得晒、要最爽 → 傳統假設",
      "三個 bounded：rationality, self-control, selfishness",
      "Biases：rule of thumb, anchoring, framing, availability",
      "Nudge：改選擇點擺，唔禁唔加錢",
      "Default / restricted / mandated choice",
      "Firm 目標：profit, CSR, market share, satisficing, growth",
    ],
    practice: [
      { q: "Define <i>nudge</i>.", m: 2, a: "Influencing people's choices by changing how options are presented (choice architecture) [1] without removing options or significantly changing incentives [1]." },
      { q: "Explain how a default choice could increase the number of organ donors.", m: 4, a: "Default = opt-out: everyone registered unless they choose otherwise [1]. People show inertia / bounded rationality and rarely change defaults [1], so registration rises [1]; freedom of choice is preserved as people can still opt out [1]." },
      { q: "Explain, with an example, the concept of anchoring.", m: 2, a: "Relying too heavily on the first piece of information when making a decision [1], e.g. a “was $200, now $120” label makes $120 seem cheap [1]." },
      { q: "Outline two business objectives other than profit maximisation.", m: 4, a: "Any two, each identified [1] + explained [1]: CSR (acting ethically/sustainably to build reputation); market share (maximising sales to dominate the market); satisficing (achieving satisfactory profit to satisfy stakeholders); growth (increasing firm size)." },
    ],
  },

  "econ-5": {
    title: "PED · YED · PES — formulas, determinants, revenue",
    parts: [
      {
        h: "PED 需求價格彈性",
        min: 3.5,
        blocks: [
          ["key", "\\(PED = \\dfrac{\\%\\Delta Q_d}{\\%\\Delta P}\\)　｜　\\(\\%\\Delta = \\dfrac{new-old}{old}\\times100\\)<br>Definition：a measure of the <b>responsiveness of quantity demanded to a change in the good's own price</b>。"],
          ["table", ["|PED|", "名稱", "TR 加價時"], [
            ["&gt; 1", "price elastic", "TR ↓"],
            ["&lt; 1", "price inelastic", "TR ↑"],
            ["= 1", "unit elastic", "TR 不變"],
            ["0", "perfectly inelastic（垂直 D）", "TR ↑"],
            ["∞", "perfectly elastic（水平 D）", "—"],
          ]],
          ["rhyme", "口訣 1（PED determinants）", "替必比時癮", "<b>替</b>代品多唔多 / 近唔近、<b>必</b>需品 vs 奢侈品、佔收入<b>比</b>例、<b>時</b>間長短、上<b>癮</b>（addictive）。"],
          ["rhyme", "口訣 2", "Inelastic 加價賺多啲，elastic 減價賺多啲"],
          ["eg", "戲飛由 $10 加到 $12，每週由 5000 張跌到 4500 張。", [
            "%ΔP = +20%，%ΔQd = −10%",
            "PED = −10 ÷ 20 = <b>−0.5</b> → price inelastic",
            "TR：$50 000 → $54 000，加價令 TR ↑ ✅",
          ]],
        ],
      },
      {
        h: "YED 收入彈性 & PES 供應彈性",
        min: 3,
        blocks: [
          ["key", "\\(YED = \\dfrac{\\%\\Delta Q_d}{\\%\\Delta Y}\\)　　\\(PES = \\dfrac{\\%\\Delta Q_s}{\\%\\Delta P}\\)"],
          ["table", ["YED", "Good", "例"], [
            ["&lt; 0", "inferior", "bus travel, instant noodles"],
            ["0 – 1", "normal, necessity（income inelastic）", "food, utilities"],
            ["&gt; 1", "normal, luxury（income elastic）", "overseas holidays, restaurants"],
          ]],
          ["rhyme", "口訣 3（PES determinants）", "時間、存貨、閒置、流動", "<b>Time</b> period、ability to <b>store stocks</b>、<b>spare capacity</b>、<b>mobility of factors</b>（+ rate at which costs rise）。"],
          ["note", "Engel's law 應用：經濟增長時 food 嘅 YED 低 → primary sector 比例↓，services（YED 高）比例↑ — sectoral change。"],
        ],
      },
      {
        h: "Applications & 失分位",
        min: 2,
        blocks: [
          ["table", ["應用", "要講嘅點"], [
            ["Firm pricing", "inelastic → 加價；elastic → 減價"],
            ["Government indirect tax", "揀 inelastic goods（煙、汽油）→ Q 跌得少 → <b>revenue 高</b>；但 burden 多落 consumers、可能 regressive"],
            ["Primary commodities", "PED 同 PES 都 <b>低</b> → supply / demand shock → 價格大幅波動（volatile）→ 生產者收入唔穩定"],
          ]],
          ["trap", [
            "Elasticity 冇單位，唔好寫 %！PED 負數可以寫負數，但 classify 用 absolute value。",
            "Percentage change 用 <b>old</b> value 做分母。",
            "YED 0.4 係 <b>necessity</b>（normal good），唔係 inferior — 要負數先係 inferior。",
          ]],
        ],
      },
    ],
    summary: [
      "PED = %ΔQd ÷ %ΔP；YED 換 Y；PES 換 Qs",
      "替必比時癮",
      "Inelastic 加價賺多啲，elastic 減價賺多啲",
      "YED：負 = inferior，0–1 necessity，&gt;1 luxury",
      "時間、存貨、閒置、流動（PES）",
      "Primary goods：PED、PES 都低 → 價格大上大落",
    ],
    practice: [
      { q: "Define <i>price elasticity of supply</i>.", m: 2, a: "A measure of the responsiveness of quantity supplied [1] to a change in the good's own price [1]." },
      { q: "The price of a gym membership falls from $50 to $45 and memberships rise from 2000 to 2400. Calculate PED and state whether demand is elastic or inelastic.", m: 2, a: "%ΔQ = +20%, %ΔP = −10% → PED = <b>−2</b> [1]; price elastic (|PED| &gt; 1) [1]." },
      { q: "Average incomes rise by 4% and demand for a good falls by 2%. Calculate YED and identify the type of good.", m: 2, a: "YED = −2 ÷ 4 = <b>−0.5</b> [1]; inferior good [1]." },
      { q: "Explain why governments often place indirect taxes on goods with price inelastic demand.", m: 4, a: "With inelastic demand, quantity demanded falls proportionately less than the price rise [1], so the tax base stays large [1] and tax revenue is high and predictable [1]; most of the burden falls on consumers [1] (may be regressive)." },
      { q: "Explain why the price of agricultural products tends to be volatile.", m: 4, a: "Low PED (necessities, few substitutes) [1]; low PES in the short run (time lag to grow crops, perishable) [1]; so a shift in S (e.g. weather) or D [1] causes a large change in price [1]." },
    ],
  },

  "econ-6": {
    title: "Indirect taxes · Subsidies · Price ceilings & floors",
    parts: [
      {
        h: "Indirect tax 間接稅",
        min: 3,
        blocks: [
          ["key", "<b>Specific (per-unit) tax</b> → S <b>平行</b>向上移，垂直距離 = tax。<b>Ad valorem (%) tax</b> → S <b>pivot</b>（越貴差距越大）。<br>結果：Pc↑（但升少過 tax）、Pp↓、Q↓、government revenue、welfare loss。"],
          ["note", "<b>Diagram labels</b>：S₁、S₂ = S₁ + tax、D；Pe、Qe；Pc（consumer price）、Pp（price producers receive）、Qt。Tax revenue 長方形 = (Pc − Pp) × Qt；consumer burden = (Pc − Pe) × Qt，producer burden = (Pe − Pp) × Qt。"],
          ["rhyme", "口訣 1", "邊個 inelastic 邊個孭", "Demand 越 inelastic → consumers 承擔越多 tax burden（incidence）。"],
          ["eg", "煙每包徵 $2 稅，價由 $8 升到 $9.50，量由 10m 跌到 9m。", [
            "Revenue = $2 × 9m = <b>$18m</b>",
            "Consumer burden = $1.50 × 9m = $13.5m（75%）；producer burden = $0.50 × 9m = $4.5m",
          ]],
        ],
      },
      {
        h: "Subsidy 補貼",
        min: 2,
        blocks: [
          ["key", "Subsidy = payment from government to producers to lower costs → S <b>向下 / 右移</b>。Pc↓，Pp↑（Pc + subsidy），Q↑。<br><b>Government cost = subsidy per unit × new Q</b>（成個長方形）。"],
          ["table", ["Stakeholder", "效果"], [
            ["Consumers", "價平咗、買多咗 ✅"],
            ["Producers", "收多咗、賣多咗 ✅"],
            ["Government", "支出 → <b>opportunity cost</b> ❌"],
            ["Society", "如果原本 market efficient → overallocation → welfare loss ❌"],
            ["Foreign producers", "競爭唔過 ❌"],
          ]],
        ],
      },
      {
        h: "Price controls 價格管制 + 其他 intervention",
        min: 3.5,
        blocks: [
          ["rhyme", "口訣 2", "天花板喺下面，地板喺上面", "<b>Price ceiling (maximum price)</b> 設喺 Pe <b>以下</b>先有效 → shortage；<b>price floor (minimum price)</b> 設喺 Pe <b>以上</b> → surplus。"],
          ["table", ["", "Price ceiling（e.g. rent control, food）", "Price floor（e.g. agriculture, minimum wage）"], [
            ["Diagram", "Pmax &lt; Pe → Qs &lt; Qd", "Pmin &gt; Pe → Qs &gt; Qd"],
            ["問題", "<b>shortage</b>、queues、black market、quality↓、non-price rationing", "<b>surplus</b>（government 要買 → storage cost、dumping abroad）；min wage → <b>unemployment</b>（labour surplus）"],
            ["邊個得益", "買到嘅 consumers", "producers / workers who keep jobs"],
            ["Welfare loss", "有", "有 + government 支出"],
          ]],
          ["note", "其他 intervention（SL）：<b>command and control regulation</b>（禁止 / 限制）、<b>consumer nudges</b>、direct provision。點解 intervene：earn revenue, support firms, support low-income households, influence production/consumption, correct market failure, promote equity。"],
          ["trap", [
            "Ceiling 畫喺 equilibrium 上面 = 冇效（non-binding）！",
            "Subsidy 嘅 cost 用<b>新</b> quantity × subsidy，唔係舊 Q。",
            "Paper 1 (b) evaluate intervention 一定要講 <b>stakeholders</b>：consumers, producers, workers, government, society。",
          ]],
        ],
      },
    ],
    summary: [
      "Specific tax 平行上移，ad valorem 會 pivot",
      "邊個 inelastic 邊個孭",
      "Revenue = tax × 新 Q；subsidy cost = subsidy × 新 Q",
      "天花板喺下面（shortage），地板喺上面（surplus）",
      "Minimum wage = labour market 嘅 price floor → 可能 unemployment",
      "Evaluate：stakeholders + welfare loss + opportunity cost",
    ],
    practice: [
      { q: "Define <i>price ceiling</i>.", m: 2, a: "A legally imposed maximum price [1] set below the equilibrium price [1]." },
      { q: "A subsidy of $3 per unit is granted on electric bicycles. Quantity rises from 50 000 to 60 000. Calculate the cost to the government.", m: 2, a: "$3 × 60 000 [1] = <b>$180 000</b> [1]." },
      { q: "Using a diagram, explain the effect of a minimum wage set above the equilibrium wage on the labour market.", m: 4, a: "Diagram: axes wage / quantity of labour, D(labour), S(labour), Wmin above We [1]. Quantity of labour supplied rises, quantity demanded falls [1]. Surplus of labour = unemployment (Qs − Qd) [1]. Workers who keep jobs earn more [1]." },
      { q: "Explain why the incidence of a tax on cigarettes falls mainly on consumers.", m: 4, a: "Demand for cigarettes is price inelastic (addictive, few substitutes) [1]. When S shifts up by the tax [1], producers can pass most of it on as a higher price [1] with only a small fall in Q, so Pc − Pe &gt; Pe − Pp [1]." },
    ],
  },

  "econ-7": {
    title: "Externalities · Merit/demerit goods · Common pool resources",
    parts: [
      {
        h: "四款 externality 圖（必背）",
        min: 4,
        blocks: [
          ["key", "<b>Market failure</b> = the failure of markets to achieve allocative efficiency (MSB ≠ MSC) → over- or under-allocation of resources → <b>welfare loss</b>。<br><b>Externality</b> = a cost or benefit to a <b>third party</b> not reflected in the market price。"],
          ["table", ["Type", "邊條線移", "結果", "例"], [
            ["Negative production", "MSC &gt; MPC（MSC 喺上面）", "Qm &gt; Qopt：overproduction", "工廠污染"],
            ["Negative consumption", "MSB &lt; MPB（MSB 喺下面）", "Qm &gt; Qopt：overconsumption", "食煙、揸車塞車"],
            ["Positive production", "MSC &lt; MPC（MSC 喺下面）", "Qm &lt; Qopt：underproduction", "firm 培訓員工、R&amp;D"],
            ["Positive consumption", "MSB &gt; MPB（MSB 喺上面）", "Qm &lt; Qopt：underconsumption", "疫苗、教育"],
          ]],
          ["rhyme", "口訣 1", "負就多咗，正就少咗；三角形指住 Qm", "Negative → too much；positive → too little。Welfare loss 三角形喺 MSC 同 MSB 之間，<b>尖角指向 Qm</b>。"],
          ["note", "畫圖：y 軸 Price / costs / benefits，x 軸 Quantity。Qm 喺 MPB = MPC，Qopt 喺 MSB = MSC。<b>MSC = MPC + marginal external cost</b>。"],
        ],
      },
      {
        h: "Merit / demerit goods & policies",
        min: 2.5,
        blocks: [
          ["table", ["Term", "Definition"], [
            ["Merit good", "A good that is underprovided by the market because consumers undervalue its benefits（often positive consumption externalities）"],
            ["Demerit good", "A good that is overconsumed because consumers underestimate its harm（often negative consumption externalities）"],
          ]],
          ["table", ["Policy", "✅", "❌"], [
            ["Carbon / Pigouvian tax", "internalises externality、revenue、innovation incentive", "難計 external cost、regressive、inelastic D 效果細"],
            ["Tradable permits (cap and trade)", "pollution 數量確定、最平嘅 firm 減排", "cap 點定、permit 價波動、lobbying"],
            ["Legislation / regulation", "簡單直接", "冇誘因做多過標準、監管成本"],
            ["Subsidy（positive ext.）", "↑ merit goods 消費", "opportunity cost"],
            ["Education / nudges", "平、保留自由", "慢、效果唔肯定"],
          ]],
        ],
      },
      {
        h: "Common pool resources 共用資源",
        min: 2,
        blocks: [
          ["key", "<b>Common pool resource</b> = <b>rivalrous</b> but <b>non-excludable</b>（海魚、森林、地下水、大氣）→ overuse → <b>tragedy of the commons</b> → threat to <b>sustainability</b>。"],
          ["rhyme", "口訣 2", "搶得到又冇人管，就會用到冇", "Rivalrous（你用咗我冇得用）+ non-excludable（阻唔到人用）。"],
          ["note", "Responses：legislation / quotas、carbon tax、cap and trade、<b>collective self-governance</b>（社區自己管）、international agreements（Paris Agreement）、funding clean technology、education。"],
          ["trap", [
            "Common pool resource 係 <b>rivalrous</b>，public good 係 non-rivalrous — 好多人撈亂。",
            "Paper 1 (b)：最少比較兩個 policies + real example（EU ETS、Singapore congestion charge、Mexico soda tax）。",
          ]],
        ],
      },
    ],
    summary: [
      "Externality = third party, not in the price",
      "負就多咗，正就少咗；三角形指住 Qm",
      "Production 郁 MSC，consumption 郁 MSB",
      "Merit good underconsumed，demerit good overconsumed",
      "搶得到又冇人管，就會用到冇（common pool）",
      "Policy evaluate：tax vs permits vs regulation vs nudge",
    ],
    practice: [
      { q: "Define <i>negative externality</i>.", m: 2, a: "A cost imposed on a third party [1] that is not reflected in the market price / not paid by the producer or consumer [1]." },
      { q: "Using a diagram, explain why a free market overproduces steel when production causes pollution.", m: 4, a: "Diagram: MSC above MPC, MPB = MSB, Qm &gt; Qopt, welfare loss shaded pointing to Qm [2]. Firms ignore external costs, producing where MPB = MPC [1]; social optimum is MSB = MSC at lower output, so too many resources are allocated to steel [1]." },
      { q: "Explain why fish stocks in international waters are at risk of depletion.", m: 4, a: "Fish are a common pool resource [1]: non-excludable — no one can be prevented from fishing [1]; rivalrous — each fish caught reduces the stock for others [1]; so individuals overfish, threatening sustainability (tragedy of the commons) [1]." },
      { q: "Explain how a cap-and-trade scheme reduces pollution.", m: 4, a: "Government sets a cap on total emissions and issues permits [1]; firms must hold permits for each unit emitted [1]; low-cost abaters sell spare permits, high-cost firms buy, so reductions happen at least cost [1]; cap reduced over time raises permit price / incentive to innovate [1]." },
    ],
  },

  "econ-8": {
    title: "Public goods · Free riders · Government provision",
    parts: [
      {
        h: "兩個特徵",
        min: 3,
        blocks: [
          ["key", "<b>Public good</b> = a good that is <b>non-rivalrous</b> and <b>non-excludable</b>。<br>Non-rivalrous：one person's consumption does not reduce availability to others。<br>Non-excludable：impossible to prevent non-payers from consuming。"],
          ["rhyme", "口訣 1", "唔搶又唔閂門", "Non-rivalrous（唔使搶）+ non-excludable（閂唔到門）。2-mark definition 兩個都要寫！"],
          ["table", ["", "Excludable", "Non-excludable"], [
            ["<b>Rivalrous</b>", "Private good（漢堡）", "Common pool resource（海魚）"],
            ["<b>Non-rivalrous</b>", "Club good（Netflix）", "<b>Public good</b>（街燈、國防、燈塔、防洪）"],
          ]],
          ["note", "<b>Quasi-public good</b>：有部分特徵，例如道路（塞車就變 rivalrous；收費就 excludable）。"],
        ],
      },
      {
        h: "Free-rider problem → missing market",
        min: 2.5,
        blocks: [
          ["key", "<b>Free rider</b> = a person who benefits from a good without paying for it。因為 non-excludable → 冇人肯講自己 willingness to pay → firm 收唔到錢 → <b>good is not provided at all</b> = <b>missing market</b>（最極端嘅 market failure）。"],
          ["rhyme", "口訣 2", "人人搭便車，冇人肯開車", "Free riders → no revenue → no private supply。"],
          ["eg", "點解私人公司唔會起防洪堤？", [
            "區內所有居民都受保護，俾唔俾錢都一樣（non-excludable）；一個人受保護唔影響其他人（non-rivalrous）。",
            "每個人都有 incentive free ride → firm 收唔夠錢 cover cost → 冇人做 → government 要 provide。",
          ]],
        ],
      },
      {
        h: "Government responses",
        min: 2.5,
        blocks: [
          ["table", ["Response", "說明"], [
            ["Direct provision", "用 tax revenue 提供（國防、街燈）"],
            ["Contracting out", "政府出錢，私人公司建造 / 營運"],
            ["Public-private partnership", "合作分擔成本和風險"],
          ]],
          ["note", "<b>Evaluate</b>：冇 price signal → 難計 benefit（要用 cost-benefit analysis）、opportunity cost（錢可以用喺 health / education）、political influence → 可能 over / under provide（<b>government failure</b>）。"],
          ["trap", [
            "Public school / public hospital <b>唔係</b> public good（係 merit good — rivalrous 同 excludable）。",
            "Public good 唔係「政府提供嘅嘢」，係睇兩個特徵。",
          ]],
        ],
      },
    ],
    summary: [
      "唔搶又唔閂門 = public good",
      "人人搭便車，冇人肯開車 → missing market",
      "2x2 表：private / club / common pool / public",
      "Government：direct provision, contracting out, PPP",
      "公立學校唔係 public good，係 merit good",
    ],
    practice: [
      { q: "Define <i>public good</i>.", m: 2, a: "A good that is non-rivalrous [1] and non-excludable [1]." },
      { q: "Explain why the free-rider problem leads to market failure.", m: 4, a: "Free rider: someone who benefits without paying [1]. Because the good is non-excludable, consumers have no incentive to pay/reveal preferences [1]; firms cannot earn revenue so do not supply it [1]; the market is missing although social benefit is high — under-allocation of resources [1]." },
      { q: "Distinguish between a public good and a common pool resource.", m: 2, a: "Both are non-excludable [1]; a public good is non-rivalrous while a common pool resource is rivalrous [1]." },
      { q: "Outline one difficulty a government faces in providing public goods.", m: 2, a: "e.g. no price signal so the value of benefits is hard to measure [1], so the government may over- or under-provide / there is an opportunity cost of the tax revenue used [1]." },
    ],
  },

  "econ-9": {
    title: "GDP · GNI · Real vs nominal · Business cycle · Well-being",
    parts: [
      {
        h: "Measuring output 量度產出",
        min: 3.5,
        blocks: [
          ["key", "<b>GDP</b> = the total value of all final goods and services produced <b>within a country</b> in a given time period。<br>三個方法同一答案：<b>output</b>（value added）= <b>income</b>（wages + rent + interest + profit）= <b>expenditure</b>：\\(GDP = C + I + G + (X - M)\\)"],
          ["table", ["Measure", "點計", "用途"], [
            ["GNI", "GDP + income from abroad − income paid abroad", "國民（residents）收入，唔理喺邊度賺"],
            ["Nominal", "current prices", "未除 inflation"],
            ["Real", "\\(\\dfrac{\\text{nominal}}{\\text{price deflator}}\\times100\\)", "睇真正產量變化"],
            ["Per capita", "÷ population", "平均生活水平"],
            ["PPP", "用 purchasing power parity 換算", "國與國比較（price level 唔同）"],
          ]],
          ["rhyme", "口訣 1", "國內 GDP，國民 GNI；真要除通脹，人均除人頭"],
          ["eg", "Nominal GDP 由 $500bn 升到 $540bn，deflator 由 100 升到 104。Real growth？", [
            "Real GDP（yr 2）= 540 ÷ 104 × 100 = $519.2bn",
            "Growth = (519.2 − 500) ÷ 500 × 100 = <b>3.85%</b>（唔係 8%！）",
          ]],
        ],
      },
      {
        h: "Business cycle 經濟週期",
        min: 2,
        blocks: [
          ["key", "Real GDP 圍住 <b>long-term growth trend</b>（potential output）上落：<b>expansion → peak → contraction → trough</b>。<br><b>Recession</b> = two consecutive quarters of negative real GDP growth。"],
          ["note", "畫圖：x 軸 Time，y 軸 Real GDP；波浪線 = actual output；斜直線 = long-term trend。Peak 時 actual &gt; potential（inflationary gap），trough 時 actual &lt; potential（recessionary gap）。"],
          ["trap", ["Contraction 時 growth rate 跌 ≠ 一定負增長。Real GDP growth 由 5% 跌到 2% 仍然係增長，只係慢咗。"]],
        ],
      },
      {
        h: "Limitations of GDP & alternative measures",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 2（GDP 唔計嘅嘢）", "黑工家務分配差，污染質素同休閒", "Informal economy、unpaid work、income distribution、environmental damage（externalities / sustainability）、quality of goods、leisure、composition of output（e.g. defence）。"],
          ["table", ["Alternative", "包括咩"], [
            ["OECD Better Life Index", "11 dimensions（housing, jobs, environment, life satisfaction…）"],
            ["Happiness Index (World Happiness Report)", "survey of life evaluation"],
            ["Happy Planet Index", "well-being and life expectancy relative to ecological footprint"],
            ["Green GDP", "GDP − cost of environmental degradation"],
          ]],
          ["trap", ["比較唔同國家一定要用 <b>real GDP per capita at PPP</b> — 漏咗 per capita 或 PPP 會扣分。"]],
        ],
      },
    ],
    summary: [
      "GDP = C + I + G + (X − M)",
      "國內 GDP，國民 GNI；真要除通脹，人均除人頭",
      "Real = nominal ÷ deflator × 100",
      "Recession = 連續兩季 real GDP 負增長",
      "黑工家務分配差，污染質素同休閒",
      "國際比較：real GDP per capita (PPP)",
    ],
    practice: [
      { q: "Define <i>gross domestic product (GDP)</i>.", m: 2, a: "The total value of all final goods and services produced within a country [1] in a given time period (usually a year) [1]." },
      { q: "Real GDP was $480bn in 2024 and $492bn in 2025. Calculate the real GDP growth rate.", m: 2, a: "(492 − 480) ÷ 480 × 100 [1] = <b>2.5%</b> [1]." },
      { q: "A country's GDP is $900bn. Its residents earn $40bn abroad and foreigners earn $65bn in the country. Calculate GNI.", m: 2, a: "900 + 40 − 65 [1] = <b>$875bn</b> [1]." },
      { q: "Explain two limitations of using GDP per capita to compare living standards between countries.", m: 4, a: "Any two, each stated [1] + explained [1]: ignores income distribution (an average hides inequality); excludes the informal economy/unpaid work; ignores environmental damage; different price levels (need PPP); ignores leisure/quality of life." },
    ],
  },

  "econ-10": {
    title: "AD · SRAS · LRAS (Keynesian vs monetarist) · Output gaps",
    parts: [
      {
        h: "Aggregate demand 總需求",
        min: 3,
        blocks: [
          ["key", "<b>AD</b> = the total planned spending on a country's goods and services <b>at each price level</b> in a given time period：\\(AD = C + I + G + (X - M)\\)<br>AD 向下斜：wealth effect、interest rate effect、international trade effect。"],
          ["table", ["Component", "Determinants（shift AD）"], [
            ["C", "consumer confidence, interest rates, wealth, personal income taxes, household debt, expectations"],
            ["I", "interest rates, business confidence, technology, business taxes, corporate debt"],
            ["G", "political and economic priorities"],
            ["X − M", "income of trading partners, exchange rates, trade policies, relative inflation"],
          ]],
          ["rhyme", "口訣 1", "信心利率財富稅，外國收入匯率貿", "C、I 睇 confidence / interest / wealth / tax；X−M 睇 foreign income / exchange rate / trade policy。"],
          ["trap", ["Macro 圖 axes：<b>Average price level</b> 同 <b>Real GDP / real output</b>。寫 P 同 Q = 扣分！"]],
        ],
      },
      {
        h: "Aggregate supply：SRAS & LRAS",
        min: 3,
        blocks: [
          ["key", "<b>SRAS</b>：向上斜，因為短期 wages 同 input prices fixed。Shift：wages、raw material / energy prices、business taxes、subsidies、supply shocks。"],
          ["table", ["", "Monetarist / new classical", "Keynesian"], [
            ["LRAS 形狀", "垂直喺 potential output Yp", "三段：水平 → 向上 → 垂直（full employment Yf）"],
            ["點解", "wages / prices flexible → 自動返 Yp", "wages downwardly sticky → recession 可以持續"],
            ["Policy 含意", "唔使 intervene（長期）", "需要 government 刺激 AD"],
          ]],
          ["rhyme", "口訣 2", "Monetarist 一條企，Keynes 三段斜", "Monetarist LRAS vertical；Keynesian AS 平 → 斜 → 企。"],
          ["note", "<b>LRAS 右移</b>：quantity / quality of factors of production↑、technology、efficiency↑、institutional changes、supply-side policies。"],
        ],
      },
      {
        h: "Equilibrium, gaps & multiplier",
        min: 2.5,
        blocks: [
          ["table", ["情況", "圖", "後果"], [
            ["<b>Recessionary (deflationary) gap</b>", "AD = SRAS 喺 Yp <b>左邊</b>", "cyclical unemployment"],
            ["<b>Inflationary gap</b>", "AD = SRAS 喺 Yp <b>右邊</b>", "demand-pull inflation"],
            ["<b>Full employment</b>", "AD = SRAS = LRAS", "只有 natural unemployment"],
          ]],
          ["note", "Monetarist 長期自動調整：recessionary gap → 失業 → wages↓ → SRAS 右移 → 返去 Yp。Keynesian：wages sticky → 可能卡住，要 policy。<br><b>Multiplier</b>（SL 概念）：injection 令 real GDP 增加<b>多過</b>原本金額，因為 one person's spending is another's income（計數係 HL）。"],
          ["eg", "Oil price 大升，對 oil-importing economy 嘅影響？", [
            "Costs↑ → <b>SRAS 左移</b>",
            "Average price level↑（<b>cost-push inflation</b>）+ real GDP↓ + unemployment↑ = <b>stagflation</b>",
          ]],
        ],
      },
    ],
    summary: [
      "AD = C + I + G + (X − M)",
      "信心利率財富稅，外國收入匯率貿",
      "Axes：average price level / real GDP",
      "Monetarist 一條企，Keynes 三段斜",
      "Gap 喺 Yp 左 = recessionary；右 = inflationary",
      "SRAS 左移 = cost-push + stagflation",
    ],
    practice: [
      { q: "Define <i>aggregate demand</i>.", m: 2, a: "The total planned spending on goods and services produced in an economy [1] at each average price level in a given time period [1]." },
      { q: "Using an AD/AS diagram, explain how a fall in business confidence could cause a recessionary gap.", m: 4, a: "Diagram: AD₁→AD₂ left, Ye below Yp/LRAS, lower price level [1–2]. Lower confidence → firms cut investment (I) [1] → AD falls, real GDP falls below potential, cyclical unemployment rises [1]." },
      { q: "Explain why, in the monetarist model, a recessionary gap is eliminated in the long run.", m: 4, a: "Real GDP below Yp → unemployment [1] → nominal wages fall (flexible) [1] → costs fall, SRAS shifts right [1] → economy returns to Yp at lower price level [1]." },
      { q: "Using the Keynesian AS model, explain why an increase in AD may not cause inflation.", m: 4, a: "Diagram: Keynesian AS with horizontal section, AD shifts right within it [1–2]. Large spare capacity/unemployed resources [1], so firms can raise output without higher costs; real GDP rises with constant price level [1]." },
    ],
  },

  "econ-11": {
    title: "Unemployment · Inflation · Growth — measure, causes, costs",
    parts: [
      {
        h: "Unemployment 失業",
        min: 3,
        blocks: [
          ["key", "<b>Unemployment</b> = people of working age who are <b>actively seeking work</b> but are without a job。<br>\\(\\text{Unemployment rate} = \\dfrac{\\text{unemployed}}{\\text{labour force}}\\times100\\)（labour force = employed + unemployed）"],
          ["table", ["Type", "原因", "Policy"], [
            ["Structural", "skills / location mismatch（產業轉型）", "supply-side（training, mobility）"],
            ["Frictional", "轉工期間", "better job information"],
            ["Seasonal", "季節性需求", "—"],
            ["Cyclical (demand-deficient)", "AD 跌、recession", "demand-side（fiscal / monetary）"],
          ]],
          ["rhyme", "口訣 1", "結構摩擦季節 = natural rate；週期先靠 AD", "Natural rate of unemployment = structural + frictional + seasonal。"],
          ["note", "<b>Costs</b>：lost output（PPC 入面）、tax↓ benefits↑、social problems、loss of skills（hysteresis）。<b>測量問題</b>：hidden unemployment（放棄搵工）、<b>underemployment</b>、平均數隱藏 disparities（地區、年齡、性別、種族）。"],
        ],
      },
      {
        h: "Inflation 通脹 & deflation",
        min: 3.5,
        blocks: [
          ["table", ["Term", "Definition"], [
            ["Inflation", "a <b>sustained increase</b> in the average/general price level"],
            ["Disinflation", "a <b>fall in the rate of inflation</b>（仍然係正數）"],
            ["Deflation", "a <b>sustained decrease</b> in the average price level"],
            ["CPI", "index of the price of a weighted basket of goods and services bought by a typical household"],
          ]],
          ["eg", "Basket：Food weight 40, price index 110；Housing weight 60, price index 105。Weighted index？", [
            "(40 × 110 + 60 × 105) ÷ 100 = (4400 + 6300) ÷ 100 = <b>107</b> → 7% 通脹 vs base year",
          ]],
          ["rhyme", "口訣 2", "需求拉，成本推", "<b>Demand-pull</b>：AD 右移；<b>cost-push</b>：SRAS 左移。"],
          ["table", ["Costs of inflation", "Costs of deflation"], [
            ["purchasing power↓（fixed incomes, savers）", "delayed consumption（等平啲先買）"],
            ["uncertainty → investment↓", "real debt burden↑"],
            ["export competitiveness↓", "profits↓ → bankruptcies, unemployment"],
            ["menu & shoe-leather costs, redistribution", "deflationary spiral"],
          ]],
          ["trap", [
            "Inflation 由 5% 跌到 2% = <b>disinflation</b>，物價仍然升緊！唔係 deflation。",
            "CPI limitations：唔同家庭消費模式、quality changes、new products、basket 更新。",
          ]],
        ],
      },
      {
        h: "Economic growth & trade-offs",
        min: 1.5,
        blocks: [
          ["key", "<b>Economic growth</b> = an increase in <b>real GDP</b> over time。短期：AD↑（用返 spare capacity）；長期：LRAS 右移（PPC 外移）。<br>好處：living standards、jobs、tax revenue｜代價：inflation、environmental damage（sustainability）、inequality、current account deficit。"],
          ["note", "Trade-offs：低失業 vs 低通脹、growth vs sustainability、growth vs equity。"],
        ],
      },
    ],
    summary: [
      "Unemployment rate = unemployed ÷ labour force × 100",
      "結構摩擦季節 = natural rate；週期先靠 AD",
      "Inflation 升、disinflation 升慢咗、deflation 跌",
      "Weighted index = Σ(weight × index) ÷ Σweight",
      "需求拉，成本推",
      "Growth 好處多，但小心 inflation、環境、不平等",
    ],
    practice: [
      { q: "Define <i>disinflation</i>.", m: 2, a: "A fall in the rate of inflation [1]; prices are still rising but more slowly [1]." },
      { q: "A country has 28.5 million employed and 1.5 million unemployed. Calculate the unemployment rate.", m: 2, a: "Labour force = 30m [1]; 1.5 ÷ 30 × 100 = <b>5%</b> [1]." },
      { q: "The CPI rose from 125 to 130. Calculate the rate of inflation.", m: 2, a: "(130 − 125) ÷ 125 × 100 [1] = <b>4%</b> [1]." },
      { q: "Explain two consequences of deflation.", m: 4, a: "Any two, stated [1] + explained [1]: consumers delay purchases expecting lower prices, reducing AD; real value of debt rises, cutting spending by borrowers; falling profits lead to unemployment/bankruptcies." },
      { q: "Using an AD/AS diagram, explain cost-push inflation.", m: 4, a: "Diagram: SRAS₁→SRAS₂ left, price level rises, real GDP falls [1–2]. Caused by rising costs of production e.g. wages/oil [1], firms raise prices to cover costs, average price level rises [1]." },
    ],
  },

  "econ-12": {
    title: "Inequality · Poverty · Lorenz & Gini · Tax policy",
    parts: [
      {
        h: "Measuring inequality",
        min: 3,
        blocks: [
          ["key", "<b>Equality</b> = 大家一樣；<b>equity</b> = fairness（唔一定一樣）。<br><b>Lorenz curve</b>：x 軸 cumulative % of population，y 軸 cumulative % of income；45° line = line of perfect equality。條 curve 越遠離 45° 線 → 越不平等。"],
          ["key", "<b>Gini coefficient</b> = \\(\\dfrac{A}{A+B}\\)（A = 45° 線同 Lorenz curve 之間嘅面積，B = Lorenz curve 以下）。0 = perfect equality，1 = perfect inequality。"],
          ["rhyme", "口訣 1", "肚腩越大越唔公平", "Lorenz curve 彎得越勁（A 越大）→ Gini 越高。"],
          ["note", "其他：income share ratios，e.g. <b>Palma ratio</b> = top 10% income share ÷ bottom 40%。<b>Wealth</b>（stock）通常比 <b>income</b>（flow）更唔平等。"],
        ],
      },
      {
        h: "Poverty 貧窮 & causes",
        min: 2.5,
        blocks: [
          ["table", ["Term", "Definition"], [
            ["Absolute poverty", "income below the level needed to meet basic needs（World Bank line：US$3.00/day, 2021 PPP）"],
            ["Relative poverty", "income below a given proportion（e.g. 50% / 60%）of <b>median</b> income in a country"],
            ["MPI", "Multidimensional Poverty Index：health, education, living standards"],
          ]],
          ["rhyme", "口訣 2（causes of inequality / poverty）", "機會教育被歧視，財富稅制科技全球化", "Inequality of opportunity、human capital 差異、discrimination、unequal wealth、tax policies、globalisation & technological change、market-based supply-side policies。"],
          ["note", "影響：lower living standards、less social mobility、health / education 差、social unrest、slower growth（poor 冇錢投資 human capital）。"],
        ],
      },
      {
        h: "Taxes & policies",
        min: 3,
        blocks: [
          ["table", ["Tax", "Average tax rate 隨收入", "例"], [
            ["Progressive", "↑", "income tax（marginal rate 隨 bands 上升）"],
            ["Proportional", "不變", "flat tax"],
            ["Regressive", "↓", "indirect taxes（VAT, excise）"],
          ]],
          ["eg", "Income tax：首 $10 000 0%，$10 001–$40 000 20%，&gt; $40 000 40%。收入 $60 000？", [
            "Tax = 0 + 0.2 × 30 000 + 0.4 × 20 000 = 6000 + 8000 = <b>$14 000</b>",
            "Average rate = 14 000 ÷ 60 000 × 100 = <b>23.3%</b>；marginal rate = <b>40%</b>",
          ]],
          ["note", "Policies：progressive taxes、transfer payments、universal basic income、minimum wage、investment in education / health、anti-discrimination laws、wealth taxes。Evaluate：work disincentives、tax avoidance / evasion、fiscal cost、targeting。"],
          ["trap", [
            "Marginal rate ≠ average rate！收入 $60 000 唔係全部俾 40%。",
            "Relative poverty 用 <b>median</b>（唔係 mean）。",
          ]],
        ],
      },
    ],
    summary: [
      "Equity = fair，equality = same",
      "肚腩越大越唔公平（Lorenz）；Gini 0 → 1",
      "Absolute = basic needs；relative = % of median",
      "Progressive 平均稅率升，regressive 跌",
      "Marginal rate ≠ average rate",
      "Policy：tax、transfers、UBI、min wage、education、health",
    ],
    practice: [
      { q: "Define <i>regressive tax</i>.", m: 2, a: "A tax where the average tax rate (proportion of income paid in tax) [1] falls as income rises [1]." },
      { q: "Income tax is 0% on the first $15 000 and 30% on income above $15 000. Calculate the tax and the average tax rate on an income of $45 000.", m: 3, a: "0.3 × 30 000 = <b>$9 000</b> [1–2]; average rate 9 000 ÷ 45 000 × 100 = <b>20%</b> [1]." },
      { q: "Using a Lorenz curve diagram, explain what an increase in the Gini coefficient means.", m: 4, a: "Diagram: axes cumulative % population/income, line of equality, Lorenz curve moves further away [1–2]. Gini = A/(A+B); a higher value means area A is larger [1], so income is distributed more unequally [1]." },
      { q: "Explain two causes of income inequality.", m: 4, a: "Any two, stated [1] + explained [1]: differences in human capital/education; inequality of opportunity; discrimination; unequal ownership of wealth (property income); technological change favouring skilled workers; regressive tax systems." },
    ],
  },

  "econ-13": {
    title: "Monetary policy · Fiscal policy · Strengths & limitations",
    parts: [
      {
        h: "Monetary policy 貨幣政策",
        min: 3.5,
        blocks: [
          ["key", "<b>Monetary policy</b> = changes in <b>interest rates and/or the money supply</b> by the <b>central bank</b> to influence AD。Goals：low & stable inflation（target ~2%）、low unemployment、stable growth、reduce business cycle fluctuations。"],
          ["table", ["Tool", "Expansionary（減息）"], [
            ["Open market operations", "central bank <b>buys</b> government bonds → money supply↑ → interest rates↓"],
            ["Minimum reserve requirements", "<b>lower</b> → banks can lend more"],
            ["Policy (base) rate", "<b>cut</b>"],
            ["Quantitative easing", "大量 buy assets → money supply↑, long-term rates↓"],
          ]],
          ["rhyme", "口訣 1（transmission）", "減息 → 借錢平、儲錢唔抵、供樓輕、貨幣跌 → C、I、X−M 升 → AD 右移", ""],
          ["table", ["Strengths ✅", "Limitations ❌"], [
            ["independent central bank（credibility、冇 political pressure）", "time lags（12–24 months）"],
            ["incremental、可以好快調整、reversible", "low confidence → 減息都唔借（liquidity trap / zero lower bound）"],
            ["冇 budget deficit 問題", "banks 未必 pass on 減息、一個利率影響全國"],
          ]],
        ],
      },
      {
        h: "Fiscal policy 財政政策",
        min: 3,
        blocks: [
          ["key", "<b>Fiscal policy</b> = changes in <b>government spending and/or taxation</b> to influence AD。<br>Expansionary：G↑ / T↓｜Contractionary：G↓ / T↑。"],
          ["note", "<b>Automatic stabilisers</b>：progressive taxes + unemployment benefits 自動「熨平」business cycle（recession 時 tax 自動跌、benefits 自動升）。<br><b>Budget deficit</b>：G &gt; tax revenue；<b>public debt</b> = 累積 deficits。"],
          ["table", ["Strengths ✅", "Limitations ❌"], [
            ["G 直接加 AD；multiplier", "time lags（recognition, decision, implementation）"],
            ["可以 target 特定 sectors / regions", "political pressure、難 reverse"],
            ["deep recession（利率已 ~0）時有效", "budget deficit & debt；<b>crowding out</b>"],
            ["infrastructure 同時 ↑ LRAS", "inability to fine-tune"],
          ]],
          ["rhyme", "口訣 2", "借得多，息就升，私人投資被擠走", "<b>Crowding out</b>：government borrowing → interest rates↑ → private investment↓。"],
        ],
      },
      {
        h: "Exam 答法",
        min: 1.5,
        blocks: [
          ["eg", "Using AD/AS，explain how expansionary monetary policy closes a recessionary gap。", [
            "Central bank cuts policy rate / buys bonds → cost of borrowing↓、saving incentive↓ → C 同 I↑",
            "AD₁→AD₂ 右移，Ye 向 Yp 移；real GDP↑，cyclical unemployment↓，price level 微升",
          ]],
          ["trap", [
            "Monetary policy 係 <b>central bank</b> 做，fiscal policy 係 <b>government</b> 做 — 唔好撈亂。",
            "Open market operations：<b>buy</b> bonds = expansionary，<b>sell</b> bonds = contractionary。",
          ]],
        ],
      },
    ],
    summary: [
      "Monetary = central bank：利率 + money supply",
      "減息 → C、I、X−M 升 → AD 右移",
      "Fiscal = government：G 同 T",
      "Automatic stabilisers：progressive tax + benefits",
      "借得多，息就升，私人投資被擠走",
      "兩樣都有 time lags；fiscal 有 debt，monetary 怕 liquidity trap",
    ],
    practice: [
      { q: "Define <i>monetary policy</i>.", m: 2, a: "Changes in interest rates and/or the money supply [1] by the central bank to influence aggregate demand [1]." },
      { q: "Explain how an increase in interest rates may reduce inflation.", m: 4, a: "Borrowing becomes more expensive / saving more attractive [1], mortgage payments rise reducing disposable income [1], so C and I fall (and currency may appreciate reducing X−M) [1]; AD shifts left, reducing demand-pull inflation [1]." },
      { q: "Explain the concept of crowding out.", m: 2, a: "Increased government borrowing to finance a deficit raises interest rates [1], reducing private sector investment and consumption, offsetting the rise in AD [1]." },
      { q: "Explain two reasons why fiscal policy may be more effective than monetary policy in a deep recession.", m: 4, a: "Interest rates may already be near zero / low confidence means rate cuts do not boost borrowing (liquidity trap) [1+1]; government spending directly adds to AD and can target sectors, with a multiplier effect [1+1]." },
    ],
  },

  "econ-14": {
    title: "Supply-side policies — market-based vs interventionist",
    parts: [
      {
        h: "目標同 diagram",
        min: 2,
        blocks: [
          ["key", "<b>Supply-side policies</b> = policies that aim to increase the <b>quantity and/or quality of factors of production</b> and the efficiency of markets → <b>LRAS 右移</b>（Keynesian 圖：垂直部分右移）。<br>結果：long-term growth <b>without inflationary pressure</b>、natural rate of unemployment↓、competitiveness↑。"],
          ["rhyme", "口訣 1", "AD 係短期加油，LRAS 係長期擴路", "Demand-side 影響短期 output；supply-side 提高 potential output。"],
        ],
      },
      {
        h: "兩大類 policies",
        min: 4,
        blocks: [
          ["table", ["Interventionist（政府出手）", "Market-based（放手俾市場）"], [
            ["Investment in <b>human capital</b>：education, training, healthcare", "<b>Competition</b>：deregulation, privatisation, trade liberalisation, anti-monopoly regulation"],
            ["Investment in new <b>technology</b>：R&amp;D grants / tax credits", "<b>Labour market reforms</b>：weaken trade unions, reduce unemployment benefits, lower / abolish minimum wage"],
            ["Investment in <b>infrastructure</b>：roads, ports, broadband", "<b>Incentive-related</b>：cut personal income tax, cut corporate tax"],
            ["<b>Industrial policies</b>：support specific industries", ""],
          ]],
          ["rhyme", "口訣 2", "人科基工 vs 競勞稅", "Interventionist：人力資本、科技、基建、工業政策；market-based：競爭、勞工市場改革、減稅誘因。"],
          ["eg", "Infrastructure investment 點樣帶來 growth without inflation？", [
            "短期：G 係 AD 一部分 → AD 右移",
            "長期：運輸成本↓、productivity↑ → LRAS 右移",
            "產能增加吸收 AD 增長 → real GDP↑，price level 大致穩定（同一個圖畫兩個 shift）",
          ]],
        ],
      },
      {
        h: "Evaluation",
        min: 2.5,
        blocks: [
          ["table", ["", "Interventionist", "Market-based"], [
            ["✅", "改善 market failure（education 有 positive externalities）；短期仲有 AD 效果；可減 inequality", "冇直接 fiscal cost；提升效率同 competitiveness"],
            ["❌", "<b>time lags 長</b>、cost 高（opportunity cost / deficit）、government 可能揀錯行業", "inequality↑、worker insecurity、環境 deregulation 風險、tax cut 對 work incentive 效果 debated、tax revenue↓"],
          ]],
          ["trap", [
            "Supply-side 唔係「增加 SRAS」咁簡單 — 要講 <b>LRAS / potential output</b>。",
            "減 corporate tax 係 market-based（incentive），唔係 fiscal policy 去 AD — 寫清楚你嘅角度。",
          ]],
        ],
      },
    ],
    summary: [
      "Supply-side → LRAS 右移 → growth without inflation",
      "AD 係短期加油，LRAS 係長期擴路",
      "人科基工 vs 競勞稅",
      "Interventionist 慢同貴，但改善 market failure",
      "Market-based 平，但可能加劇 inequality",
    ],
    practice: [
      { q: "Define <i>privatisation</i>.", m: 2, a: "The transfer of ownership of a firm/industry [1] from the public sector to the private sector [1]." },
      { q: "Using an AD/AS diagram, explain how investment in education can increase potential output.", m: 4, a: "Diagram: LRAS₁→LRAS₂ right, Yp increases [1–2]. Education raises human capital / labour productivity [1], increasing the quality of labour and productive capacity, so potential output rises [1]." },
      { q: "Explain one market-based supply-side policy and how it may reduce unemployment.", m: 4, a: "e.g. reducing unemployment benefits [1]: increases incentive to search for/accept work [1], reducing frictional/natural unemployment [1]; labour supply rises, LRAS shifts right [1]. (Or deregulation / lower minimum wage, similarly explained.)" },
      { q: "Explain two limitations of interventionist supply-side policies.", m: 4, a: "Any two, stated [1] + explained [1]: long time lags (education takes years); high fiscal cost / opportunity cost / budget deficit; government may pick the wrong industries (government failure)." },
    ],
  },

  "econ-15": {
    title: "Benefits of trade · Comparative advantage · Protectionism",
    parts: [
      {
        h: "Why trade? 點解要貿易",
        min: 2,
        blocks: [
          ["rhyme", "口訣 1（benefits of trade）", "平多大競爭，效率資源匯科技", "Lower prices、greater choice、economies of scale、increased competition、efficient allocation、access to resources、foreign exchange、spread of technology / ideas。"],
          ["key", "<b>Absolute advantage</b>：用同樣資源生產得多啲。<br><b>Comparative advantage</b>：the ability to produce a good at a <b>lower opportunity cost</b> than another country → 專門生產有 comparative advantage 嘅嘢 → 雙方得益。"],
          ["eg", "A：20 cars 或 40 t rice；B：10 cars 或 30 t rice。", [
            "1 car 嘅 OC：A = 2 t rice，B = 3 t rice → <b>A 有 comparative advantage in cars</b>",
            "1 t rice 嘅 OC：A = ½ car，B = ⅓ car → <b>B in rice</b>（計數係 HL 重點，SL 識概念）",
          ]],
        ],
      },
      {
        h: "Types of protection 保護主義（tariff 圖必背）",
        min: 4,
        blocks: [
          ["note", "<b>Tariff diagram</b>：domestic D 同 S；world price Pw（水平 Sw）；加 tariff 後 Pw + t。Q1（domestic production before）、Q2（after）、Q3（consumption after）、Q4（consumption before）。Imports 由 Q1Q4 縮細到 Q2Q3。"],
          ["table", ["Tariff 影響", "結果"], [
            ["Consumers", "價↑、Q 由 Q4 跌到 Q3、consumer surplus↓ ❌"],
            ["Domestic producers", "Q 由 Q1 升到 Q2、revenue↑ ✅"],
            ["Government", "revenue = t × (Q3 − Q2) ✅"],
            ["Foreign producers", "exports↓ ❌"],
            ["Society", "<b>兩個 welfare loss 三角形</b>（inefficient domestic production + lost consumption）❌"],
          ]],
          ["table", ["Tool", "要點"], [
            ["Quota", "limit on <b>quantity</b> of imports；冇 government revenue；有 licence 嘅 foreign firms 賺 higher price（quota rent）"],
            ["Production subsidy", "domestic S 右移；consumer price 仍係 Pw；government 要出錢"],
            ["Administrative barriers", "health / safety / environmental standards、繁複程序"],
          ]],
          ["rhyme", "口訣 2", "稅、額、補、文件", "Tariff、quota、subsidy、administrative barriers。"],
        ],
      },
      {
        h: "For & against protection",
        min: 2.5,
        blocks: [
          ["table", ["For ✅", "Against ❌"], [
            ["infant industry", "misallocation of resources（違反 comparative advantage）"],
            ["national security / strategic goods", "higher prices、less choice for consumers"],
            ["protect domestic jobs", "retaliation → trade wars"],
            ["health, safety, environmental standards", "less competition → inefficiency"],
            ["anti-dumping", "higher costs for firms using imported inputs"],
            ["government revenue（發展中國家重要）", "reduced export competitiveness"],
            ["overcome current account deficit、diversification", "corruption / rent-seeking"],
          ]],
          ["trap", [
            "Tariff 圖 quantities 要標齊 Q1–Q4，同埋寫清楚 imports 前後。",
            "Dumping = 以低於 cost / 本國價格喺外國賣，唔係「平價出口」咁簡單。",
          ]],
        ],
      },
    ],
    summary: [
      "平多大競爭，效率資源匯科技",
      "Comparative advantage = lower opportunity cost",
      "稅、額、補、文件",
      "Tariff：domestic producers + government 得益；consumers 輸；兩個 welfare loss",
      "Quota 冇 revenue，有 quota rent",
      "For：infant / security / jobs；Against：retaliation / inefficiency / 貴",
    ],
    practice: [
      { q: "Define <i>comparative advantage</i>.", m: 2, a: "The ability of a country to produce a good [1] at a lower opportunity cost than another country [1]." },
      { q: "Using a diagram, explain the effect of a tariff on domestic producers and the government.", m: 4, a: "Tariff diagram with Pw, Pw + t, D, S, Q1–Q4 [1–2]. Domestic price rises so domestic producers increase output from Q1 to Q2 and gain revenue/producer surplus [1]; government earns revenue = tariff × imports (Q3 − Q2) [1]." },
      { q: "Explain two arguments in favour of protectionism.", m: 4, a: "Any two, stated [1] + explained [1]: infant industry (time to achieve economies of scale); national security; protect employment; anti-dumping; government revenue; health and safety standards." },
      { q: "Distinguish between a tariff and a quota.", m: 2, a: "A tariff is a tax on imports, raising their price and generating government revenue [1]; a quota is a physical limit on the quantity of imports and generates no tax revenue [1]." },
    ],
  },

  "econ-16": {
    title: "Economic integration · Trading blocs · WTO · Monetary union",
    parts: [
      {
        h: "Integration 階梯（由淺到深）",
        min: 3.5,
        blocks: [
          ["table", ["Level", "加咗咩", "例"], [
            ["Preferential trade agreement (PTA)", "部分貨品減 barriers", "—"],
            ["Free trade area (FTA)", "成員之間<b>冇</b> barriers；各自對外 tariff", "USMCA, ASEAN (AFTA)"],
            ["Customs union", "FTA + <b>common external tariff</b>", "Mercosur（不完全）, EU customs union"],
            ["Common market", "customs union + <b>free movement of labour and capital</b>", "EU single market"],
            ["Monetary union", "common market + <b>common currency + central bank</b>", "Eurozone（ECB）"],
          ]],
          ["rhyme", "口訣 1", "優惠 → 自由 → 關稅同盟 → 共同市場 → 貨幣", "每上一級加一樣：共同對外稅 → 人同資金自由流 → 同一貨幣。"],
          ["note", "<b>Bilateral</b>（兩國）、<b>regional</b>（trading blocs）、<b>multilateral</b>（WTO）。<b>WTO</b>：promote trade liberalisation、settle trade disputes、提供 negotiation forum。"],
        ],
      },
      {
        h: "Trading blocs：好處 vs 代價",
        min: 2.5,
        blocks: [
          ["table", ["✅", "❌"], [
            ["larger market → economies of scale", "<b>trade diversion</b>（由平嘅非成員轉買貴啲嘅成員貨）"],
            ["<b>trade creation</b>（貴嘅本地生產被平啲嘅成員 imports 取代）", "loss of sovereignty"],
            ["more competition → efficiency", "domestic firms 面對競爭 → unemployment"],
            ["attract FDI、political cooperation、bargaining power", "loss of tariff revenue、benefits 分配不均"],
          ]],
          ["note", "FTA 需要 <b>rules of origin</b>，防止非成員貨品經低 tariff 成員轉運入嚟。"],
        ],
      },
      {
        h: "Monetary union",
        min: 2,
        blocks: [
          ["table", ["Pros", "Cons"], [
            ["冇 transaction costs、冇 exchange rate risk", "<b>loss of independent monetary policy</b>（一個利率夾唔到所有國家）"],
            ["price transparency → competition", "<b>不能 devalue</b> 恢復 competitiveness"],
            ["lower interest rates（credibility）、more FDI", "fiscal rules 限制（e.g. Greece debt crisis）"],
          ]],
          ["trap", [
            "Customs union 同 FTA 嘅分別 = <b>common external tariff</b>（最常考 2 marks）。",
            "Common market 要寫 <b>factors of production</b>（labour and capital）自由流動。",
          ]],
        ],
      },
    ],
    summary: [
      "優惠 → 自由 → 關稅同盟 → 共同市場 → 貨幣",
      "Customs union = FTA + common external tariff",
      "Common market = + free movement of labour and capital",
      "Trade creation 好，trade diversion 壞",
      "Monetary union：冇匯率風險，但冇自己 monetary policy",
    ],
    practice: [
      { q: "Define <i>customs union</i>.", m: 2, a: "An agreement between countries to remove trade barriers among members (free trade area) [1] and adopt a common external tariff on non-members [1]." },
      { q: "Distinguish between a free trade area and a common market.", m: 2, a: "A free trade area removes trade barriers between members only [1]; a common market also has a common external tariff and free movement of labour and capital [1]." },
      { q: "Explain two disadvantages for a country of joining a monetary union.", m: 4, a: "Loss of independent monetary policy — the single interest rate may not suit its economic cycle [1+1]; cannot devalue its currency to restore competitiveness / fiscal constraints [1+1]." },
      { q: "Explain two benefits for a developing country of joining a trading bloc.", m: 4, a: "Any two, stated [1] + explained [1]: access to a larger market and economies of scale; attracts FDI; increased competition improves efficiency; greater bargaining power in trade negotiations." },
    ],
  },

  "econ-17": {
    title: "Exchange rates · Balance of payments",
    parts: [
      {
        h: "Floating exchange rates 浮動匯率",
        min: 3.5,
        blocks: [
          ["key", "<b>Exchange rate</b> = the value of one currency expressed in terms of another。Floating：由 forex market 嘅 <b>D 同 S</b> 決定。<br>Diagram：y 軸「Price of € in $」（$ per €），x 軸「Quantity of €」；D€、S€。"],
          ["table", ["Demand for 本國貨幣↑（appreciate）", "Supply of 本國貨幣↑（depreciate）"], [
            ["外國人買我哋 exports / 嚟旅遊", "我哋買 imports / 去外國旅遊"],
            ["inward FDI、portfolio investment", "outward FDI / investment"],
            ["本國 interest rate↑（hot money 流入）", "外國 interest rate 較高"],
            ["speculation 預期升值、central bank 買入", "speculation 預期貶值、central bank 賣出"],
          ]],
          ["rhyme", "口訣 1", "升值：出口貴、入口平（SPICED）", "<b>S</b>trong <b>P</b>ound, <b>I</b>mports <b>C</b>heap, <b>E</b>xports <b>D</b>ear。"],
          ["table", ["Appreciation 影響", "Depreciation 影響"], [
            ["exports less competitive、X−M↓、AD↓", "exports cheaper、X↑ M↓、AD↑"],
            ["imported inflation↓（imports 平）", "imported (cost-push) inflation↑"],
            ["current account 可能惡化", "current account 可能改善（需時）"],
          ]],
          ["eg", "£1 = ¥180 → £1 = ¥195。一件 £50 嘅英國貨喺日本幾錢？", [
            "之前 50 × 180 = ¥9000；之後 50 × 195 = <b>¥9750</b>",
            "Pound appreciated → UK exports 貴咗 ¥750（≈ 8.3%）",
          ]],
        ],
      },
      {
        h: "Fixed & managed",
        min: 1.5,
        blocks: [
          ["table", ["System", "點運作", "+ / −"], [
            ["Fixed (peg)", "central bank 用 reserves 同 interest rates 維持匯率（e.g. HK$ peg to US$）", "certainty ✅；要大量 reserves、失去 monetary independence ❌"],
            ["Managed float", "大致浮動，central bank 間中 intervene", "flexible + 減少 volatility"],
          ]],
          ["trap", ["Fixed system 叫 <b>revaluation / devaluation</b>；floating 叫 <b>appreciation / depreciation</b>。用錯字眼扣 definition 分。"]],
        ],
      },
      {
        h: "Balance of payments 國際收支",
        min: 3,
        blocks: [
          ["key", "<b>Balance of payments</b> = a record of all transactions between the residents of a country and the rest of the world over a period of time。<br><b>Current account + capital account + financial account (+ errors and omissions) = 0</b>"],
          ["table", ["Account", "包括"], [
            ["<b>Current</b>", "balance of trade in goods + services、<b>primary income</b>（wages, interest, profits, dividends）、<b>secondary income</b>（transfers, remittances, aid）"],
            ["<b>Capital</b>", "capital transfers、buying / selling non-produced, non-financial assets（e.g. patents, land for embassies）"],
            ["<b>Financial</b>", "FDI、portfolio investment、reserve assets"],
          ]],
          ["rhyme", "口訣 2", "貨服一次二次 = current；FDI 股票儲備 = financial", "Current account deficit 一定由 capital + financial account surplus 抵銷。"],
          ["trap", ["Remittances = <b>secondary income</b>（current account），唔係 financial account。"]],
        ],
      },
    ],
    summary: [
      "Exchange rate 由 forex D 同 S 決定",
      "SPICED：升值出口貴、入口平",
      "利率↑、FDI 流入 → 升值",
      "Floating：appreciate/depreciate；fixed：revalue/devalue",
      "Current = goods, services, primary, secondary income",
      "Current + capital + financial (+ errors) = 0",
    ],
    practice: [
      { q: "Define <i>appreciation</i>.", m: 2, a: "An increase in the value of a currency in terms of another currency [1] in a floating exchange rate system / determined by market forces [1]." },
      { q: "The exchange rate is US$1 = ¥150. Calculate the US$ price of a Japanese camera priced at ¥225 000.", m: 2, a: "225 000 ÷ 150 [1] = <b>US$1500</b> [1]." },
      { q: "Using an exchange rate diagram, explain how a fall in a country's interest rates may affect its currency.", m: 4, a: "Diagram: D for the currency shifts left (and/or S right), exchange rate falls [1–2]. Lower rates make deposits/financial assets less attractive to foreign investors (hot money outflow) [1], so demand for the currency falls → depreciation [1]." },
      { q: "Identify the account of the balance of payments in which each is recorded: (i) a firm builds a factory abroad; (ii) migrant workers send money home.", m: 2, a: "(i) Financial account (FDI) [1]; (ii) current account — secondary income [1]." },
    ],
  },

  "econ-18": {
    title: "Sustainable development · Measuring development · Barriers · Strategies",
    parts: [
      {
        h: "Development & measurement",
        min: 3,
        blocks: [
          ["key", "<b>Economic development</b> = a multidimensional process involving improvements in standards of living, reduction in poverty and inequality, improvements in health, education and freedom/choice。<br><b>Sustainable development</b> = development that meets the needs of the present <b>without compromising the ability of future generations to meet their own needs</b>。17 UN <b>SDGs</b>（2015–2030）。"],
          ["table", ["Indicator", "包括"], [
            ["Single", "GDP / GNI per capita (PPP)、life expectancy、infant / maternal mortality、literacy、mean years of schooling"],
            ["<b>HDI</b>", "health（life expectancy）、education（expected + mean years of schooling）、standard of living（GNI per capita PPP）"],
            ["IHDI", "HDI adjusted for inequality"],
            ["GII / GDI", "gender inequality / gender development"],
            ["MPI", "multidimensional poverty：health, education, living standards"],
          ]],
          ["rhyme", "口訣 1", "HDI = 壽命、讀書、荷包", "GNI rank − HDI rank &gt; 0 → 呢個國家將收入轉化成 human development 做得好。"],
        ],
      },
      {
        h: "Barriers 障礙",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 2", "窮困貧富制度差，基建人才靠商品；地理政局債與性別，借唔到錢冇得飛", "Poverty trap、inequality、weak institutions（corruption, property rights, legal system）、lack of infrastructure、low human capital、dependence on primary commodities、informal economy、geography（landlocked）、political instability、debt、gender inequality、lack of access to credit。"],
          ["note", "<b>Poverty trap / cycle</b>：low income → low saving → low investment → low productivity → low income。<br><b>Primary commodity dependence</b>：low PED/PES → price volatility；low YED → 世界收入升，demand 升得慢。"],
        ],
      },
      {
        h: "Strategies 策略 + evaluate",
        min: 3,
        blocks: [
          ["table", ["Strategy", "✅", "❌"], [
            ["Export promotion / diversification", "foreign exchange、economies of scale", "依賴外國需求、protectionism abroad"],
            ["Import substitution", "保護新工業", "inefficiency（拉美經驗）"],
            ["FDI（MNCs）", "capital, technology, jobs, tax", "profit repatriation、環境破壞、weak labour standards"],
            ["Foreign aid / multilateral assistance（World Bank, IMF）", "fill savings gap、humanitarian", "dependency、corruption、tied aid、conditionality"],
            ["Microfinance", "credit for poor / women、entrepreneurship", "high interest、over-indebtedness、small scale"],
            ["Education, health, infrastructure, good governance, empowering women", "human capital、LRAS↑", "long time lags、cost"],
          ]],
          ["trap", [
            "Growth ≠ development！Growth 只係 real GDP↑；development 要講 health、education、poverty、freedom。",
            "Paper 2 嘅 15-mark question 一定要 <b>quote 返 text / data</b>（“paragraph 3 shows…”）+ diagram + 結論。",
          ]],
        ],
      },
    ],
    summary: [
      "Development = 生活水平、貧窮、健康、教育、自由",
      "Sustainable = 唔犧牲下一代",
      "HDI = 壽命、讀書、荷包",
      "Poverty trap：低收入 → 低儲蓄 → 低投資 → 低收入",
      "Strategies：trade, FDI, aid, microfinance, education, institutions",
      "Evaluate：sustainability、distribution、dependency",
    ],
    practice: [
      { q: "Define <i>sustainable development</i>.", m: 2, a: "Development that meets the needs of the present generation [1] without compromising the ability of future generations to meet their own needs [1]." },
      { q: "Distinguish between economic growth and economic development.", m: 2, a: "Growth is an increase in real GDP over time [1]; development is a broader, multidimensional improvement in living standards, poverty reduction, health, education and freedom [1]." },
      { q: "Explain how dependence on primary commodity exports can be a barrier to development.", m: 4, a: "Low PED and PES cause volatile prices and export revenues [1], making government revenue and planning unstable [1]; low YED means demand grows slowly as world incomes rise [1]; little value added / few linkages to the rest of the economy [1]." },
      { q: "Explain two limitations of foreign direct investment as a development strategy.", m: 4, a: "Any two, stated [1] + explained [1]: profit repatriation; environmental damage; weak labour standards / exploitation; crowding out local firms; tax avoidance (transfer pricing); enclave economies with few linkages." },
    ],
  },
});
