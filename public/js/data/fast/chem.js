/* ⏱ 10-minute fast notes · Chemistry SL, 2025 guide (format: see js/fastnotes.js). */
IB.addFast({
  "chem-1": {
    title: "States of matter · Nuclear atom · Isotopes & Ar",
    parts: [
      {
        h: "Matter & kinetic theory 物質同粒子",
        min: 2.5,
        blocks: [
          ["key", "<b>Element</b> 一種原子｜<b>Compound</b> 化學結合、固定比例｜<b>Mixture</b> 物理混合、比例可變（homogeneous 均勻 e.g. solution, alloy；heterogeneous 唔均勻）<br><b>Temperature (K) ∝ average kinetic energy</b>　T(K) = T(°C) + 273"],
          ["rhyme", "口訣 1", "變態唔升溫，能量拆 IMF", "Change of state 期間溫度唔變：能量用嚟 overcome intermolecular forces，唔係加 KE。"],
          ["table", ["Separation 方法", "靠咩分", "例子"], [
            ["Filtration", "solubility（固體唔溶）", "sand + water"],
            ["Crystallisation / evaporation", "solute 留低", "salt from brine"],
            ["(Fractional) distillation", "boiling point", "ethanol + water"],
            ["Paper chromatography", "對 mobile / stationary phase 嘅吸引", "ink dyes"],
          ]],
          ["trap", [
            "Melting / boiling 期間寫「temperature increases」→ 0 分。",
            "Endothermic：melting, vaporisation, sublimation；exothermic：freezing, condensation, deposition。",
          ]],
        ],
      },
      {
        h: "Nuclear atom 原子結構",
        min: 2.5,
        blocks: [
          ["table", ["Particle", "Relative mass", "Charge", "位置"], [
            ["proton", "1", "+1", "nucleus"],
            ["neutron", "1", "0", "nucleus"],
            ["electron", "5 × 10⁻⁴（≈ 1/1840）", "−1", "energy levels"],
          ]],
          ["key", "\\(^{A}_{Z}X\\)：A = protons + neutrons，Z = protons<br>neutrons = A − Z　　electrons in ion = Z − charge（S²⁻：16 − (−2) = 18）"],
          ["rhyme", "口訣 2", "質子定身份，中子定重量", "Isotopes：same Z, different neutrons → <b>same chemical properties</b>（same electron configuration）、<b>different physical properties</b>（mass, density, diffusion rate）。"],
          ["trap", ["Isotope 化學性質唔同 ✗ —— 電子排列一樣，所以 chemical properties 一樣。", "負離子係加電子：Cl⁻ 有 18 個電子，唔係 16。"]],
        ],
      },
      {
        h: "Relative atomic mass & mass spectra",
        min: 3,
        blocks: [
          ["key", "\\(A_r = \\dfrac{\\sum(\\text{isotope mass} \\times \\%\\text{ abundance})}{100}\\)　——weighted mean, relative to 1/12 of a ¹²C atom"],
          ["eg", "Mass spectrum of Cl：m/z 35 (75.8%)、m/z 37 (24.2%)。求 Ar。", [
            "(35 × 75.8 + 37 × 24.2) ÷ 100 = (2653 + 895.4) ÷ 100",
            "= 35.484 → <b>35.5</b>（Ar 冇單位）✅",
          ]],
          ["eg", "Ga 有 ⁶⁹Ga 同 ⁷¹Ga，Ar = 69.72。求 ⁶⁹Ga 嘅 % abundance。", [
            "設 ⁶⁹Ga = x%，⁷¹Ga = (100 − x)%",
            "69x + 71(100 − x) = 6972 → 7100 − 2x = 6972 → x = <b>64%</b>（⁷¹Ga 36%）",
          ]],
          ["rhyme", "口訣 3", "未知設 x，其餘 100 減", "Peak 高度 ∝ abundance；如果畀 ratio（3 : 1）就除總數 4 唔係 100。"],
          ["trap", ["Ar 寫單位 g mol⁻¹ ✗（Ar 係 relative，冇單位；molar mass 先有 g mol⁻¹）。", "畀咗 ratio 但照除 100。"]],
        ],
      },
    ],
    summary: [
      "Change of state 溫度唔變：能量去 overcome IMF",
      "T(K) ∝ average KE；K = °C + 273",
      "neutrons = A − Z；ion 電子 = Z − charge",
      "Isotopes：化學一樣，物理唔同",
      "Ar = Σ(mass × %)/100；ratio 就除總和",
      "未知 abundance：x 同 100 − x",
    ],
    practice: [
      { q: "State the number of protons, neutrons and electrons in \\(^{34}_{16}\\mathrm{S^{2-}}\\).", m: 2, a: "16 protons, 18 neutrons [1]; 18 electrons [1]." },
      { q: "Explain why the temperature of a pure solid stays constant while it melts.", m: 2, a: "Energy absorbed is used to overcome intermolecular forces / attractions between particles [1]; not to increase average kinetic energy, so temperature is constant [1]." },
      { q: "Magnesium has isotopes ²⁴Mg (79.0%), ²⁵Mg (10.0%) and ²⁶Mg (11.0%). Calculate Ar(Mg) to two decimal places.", m: 2, a: "(24 × 79.0 + 25 × 10.0 + 26 × 11.0)/100 [1] = (1896 + 250 + 286)/100 = 24.32 [1]." },
      { q: "Outline why ³⁵Cl and ³⁷Cl have the same chemical properties but different densities.", m: 2, a: "Same number of electrons / same electron configuration, so same chemical properties [1]; different number of neutrons so different mass, hence different density [1]." },
    ],
  },

  "chem-2": {
    title: "Emission spectra · Sublevels & orbitals · Configurations",
    parts: [
      {
        h: "Emission spectra 發射光譜",
        min: 3,
        blocks: [
          ["key", "Electron 由 <b>higher → lower</b> energy level 跌落嚟 → emit photon，\\(E = h\\nu\\)。Energy levels 係 discrete（quantised）→ <b>line spectrum</b>，唔係 continuous。"],
          ["table", ["跌落去", "Region", "記法"], [
            ["n = 1", "UV（能量最大）", "跌到地下 → 最大力"],
            ["n = 2", "visible", "跌到 2 樓 → 睇得到"],
            ["n = 3", "IR", "跌到 3 樓 → 最細力"],
          ]],
          ["rhyme", "口訣 1", "越高層越逼，線越高頻越密", "<b>Convergence</b>：higher energy 嗰邊線越嚟越近，因為 energy levels 越上越近。"],
          ["trap", ["Emission = 跌落嚟（放光）；absorption = 升上去。方向寫錯即失分。", "Continuous spectrum（白光）vs line spectrum 要識講分別。"]],
        ],
      },
      {
        h: "Sublevels, orbitals & Aufbau",
        min: 3.5,
        blocks: [
          ["table", ["Sublevel", "Orbitals", "Max e⁻", "形狀"], [
            ["s", "1", "2", "spherical"],
            ["p", "3", "6", "dumbbell (px, py, pz)"],
            ["d", "5", "10", "—"],
            ["f", "7", "14", "—"],
          ]],
          ["key", "Level n 最多 <b>2n²</b> 個電子。填法：1s 2s 2p 3s 3p <b>4s 3d</b> 4p<br><b>Aufbau</b> 由低填起｜<b>Pauli</b> 每 orbital 最多 2 個、spin 相反｜<b>Hund</b> 先逐個坐、同 spin，再 pair"],
          ["rhyme", "口訣 2", "4s 先入後出，鉻銅半滿全滿", "Cr = [Ar]3d⁵4s¹，Cu = [Ar]3d¹⁰4s¹；transition metal 變 ion 時 <b>先甩 4s</b>。"],
          ["eg", "寫 Fe 同 Fe³⁺ 嘅 configuration。", [
            "Fe (26)：1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ = [Ar]3d⁶4s²",
            "Fe³⁺：先甩 4s² 再甩一粒 3d → <b>[Ar]3d⁵</b> ✅",
          ]],
          ["trap", ["Fe²⁺ 寫 [Ar]3d⁴4s² ✗ → 正確 [Ar]3d⁶。", "Orbital diagram：p 同 d 先單獨填（Hund），箭頭方向要一致先 pair。"]],
        ],
      },
      {
        h: "First IE 連結（S3.1 常考）",
        min: 2,
        blocks: [
          ["key", "First IE：X(g) → X⁺(g) + e⁻（一定要 gaseous！）"],
          ["table", ["點解 dip?", "原因"], [
            ["Mg → Al 跌", "Al 嘅電子喺 3p，energy 高過 3s、離核遠少少"],
            ["P → S 跌", "S 嘅 3p 有一對 paired electrons → repulsion，易拎走"],
          ]],
          ["trap", ["寫 IE equation 漏 (g) state symbol。", "解釋 dip 唔講 sublevel（3p vs 3s）或 spin-pair repulsion。"]],
        ],
      },
    ],
    summary: [
      "跌落嚟放光；跌去 n=1 UV、n=2 visible",
      "線越高頻越密 = convergence",
      "s2 p6 d10 f14；level 2n²",
      "Aufbau、Pauli、Hund：由低填，相反 spin，先坐後 pair",
      "4s 先入後出；Cr、Cu 例外",
      "IE dip：Al 入 3p、S pair 相斥",
    ],
    practice: [
      { q: "State the full electron configuration of Cu and of Cu²⁺.", m: 2, a: "Cu: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹ [1]; Cu²⁺: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁹ [1]." },
      { q: "Explain why the emission spectrum of hydrogen consists of lines that converge at higher frequency.", m: 3, a: "Electrons fall from higher to lower (discrete) energy levels [1]; emitting photons of specific energy/frequency, giving lines [1]; energy levels get closer together at higher energy so lines converge [1]." },
      { q: "Deduce the number of unpaired electrons in a nitrogen atom, referring to Hund's rule.", m: 2, a: "3 unpaired electrons [1]; 2p electrons occupy separate p orbitals singly with parallel spins before pairing [1]." },
      { q: "Which transition in a hydrogen atom emits a photon of the highest energy? A. n=2→n=1 B. n=3→n=2 C. n=4→n=3 D. n=1→n=2", m: 1, a: "A (largest energy gap, ending at n = 1; D is absorption)." },
    ],
  },

  "chem-3": {
    title: "The mole · Formulae · Solutions · Ideal gases",
    parts: [
      {
        h: "Mole & formulae 摩爾",
        min: 3,
        blocks: [
          ["key", "\\(n = \\dfrac{m}{M}\\)　\\(N = n \\times N_A\\)（\\(N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}\\)）"],
          ["rhyme", "口訣 1（empirical formula）", "% 除 Ar，再除最細", "見到 .5 就 ×2，見到 .33 / .67 就 ×3。Molecular formula：M ÷ M(empirical) = n。"],
          ["eg", "52.2% C、13.0% H、34.8% O，M = 46.08 g mol⁻¹。求 molecular formula。", [
            "C 52.2/12.01 = 4.35；H 13.0/1.01 = 12.9；O 34.8/16.00 = 2.18",
            "÷ 2.18 → 2 : 5.9 : 1 → empirical C₂H₆O（M = 46.08）",
            "n = 46.08/46.08 = 1 → <b>C₂H₆O</b> ✅",
          ]],
          ["trap", ["用 % 直接當原子比例（忘記除 Ar）。", "5.9 要 round 做 6，但 1.5 唔可以 round 做 2！"]],
        ],
      },
      {
        h: "Solutions 溶液",
        min: 2,
        blocks: [
          ["key", "\\(c = \\dfrac{n}{V}\\)（mol dm⁻³，V 用 dm³ = cm³ ÷ 1000）　Dilution：\\(c_1V_1 = c_2V_2\\)"],
          ["eg", "25.0 cm³ 2.00 mol dm⁻³ HCl 加水到 250.0 cm³。新濃度？", ["c₂ = 2.00 × 25.0 / 250.0 = <b>0.200 mol dm⁻³</b>"]],
          ["note", "Standard solution：準確知濃度。做法：weigh by difference → dissolve → transfer to <b>volumetric flask</b>（連洗液）→ fill to the mark → invert to mix。"],
          ["trap", ["c = n/V 用 cm³ → 答案大 1000 倍。", "g dm⁻³ ↔ mol dm⁻³：除 / 乘 M。"]],
        ],
      },
      {
        h: "Ideal gases 理想氣體",
        min: 3.5,
        blocks: [
          ["key", "\\(pV = nRT\\)：p (Pa)、V (m³)、T (K)、R = 8.31 J K⁻¹ mol⁻¹<br>STP（273 K, 100 kPa）molar volume = <b>22.7 dm³ mol⁻¹</b>　Combined：\\(\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}\\)"],
          ["rhyme", "口訣 2", "壓 Pa 體 m³，溫度永遠 K", "kPa × 1000；dm³ ÷ 1000；cm³ ÷ 10⁶；°C + 273。"],
          ["eg", "0.500 mol gas 喺 25 °C、100 kPa 嘅體積？", [
            "V = nRT/p = 0.500 × 8.31 × 298 / 100 000",
            "= 0.0124 m³ = <b>12.4 dm³</b> ✅",
          ]],
          ["table", ["Ideal gas 假設", "Real gas 點解唔跟"], [
            ["particle volume negligible", "high p：粒子體積唔可以忽略"],
            ["no intermolecular forces", "low T：粒子慢，attractive forces 有影響"],
            ["elastic collisions, random motion", "→ deviate at <b>high p, low T</b>"],
          ]],
          ["note", "Graphs（P1B 常見）：p vs 1/V 直線（Boyle）；V vs T(K) 直線經原點；p vs T(K) 直線經原點。"],
          ["trap", ["T 用 °C 代入 pV = nRT。", "Real gas 最理想係 <b>low p, high T</b>，唔係倒轉。"]],
        ],
      },
    ],
    summary: [
      "n = m/M；N = n × 6.02 × 10²³",
      "% 除 Ar，再除最細；.5 乘 2",
      "c = n/V，V 一定 dm³",
      "c₁V₁ = c₂V₂ 稀釋",
      "pV = nRT：Pa、m³、K",
      "STP 22.7 dm³ mol⁻¹；real gas 高壓低溫走樣",
    ],
    practice: [
      { q: "Calculate the number of oxygen atoms in 4.40 g of CO₂.", m: 2, a: "n(CO₂) = 4.40/44.01 = 0.100 mol [1]; O atoms = 2 × 0.100 × 6.02 × 10²³ = 1.20 × 10²³ [1]." },
      { q: "A gas occupies 2.00 dm³ at 300 K and 100 kPa. Calculate its volume at 400 K and 200 kPa.", m: 2, a: "V₂ = 2.00 × (100/200) × (400/300) [1] = 1.33 dm³ [1]." },
      { q: "A compound is 85.6% C and 14.4% H by mass with M = 56.1 g mol⁻¹. Determine its molecular formula.", m: 3, a: "C 85.6/12.01 = 7.13; H 14.4/1.01 = 14.3 → 1 : 2, CH₂ [1]; M(CH₂) = 14.03, n = 56.1/14.03 = 4 [1]; C₄H₈ [1]." },
      { q: "Explain why real gases deviate from ideal behaviour at high pressure.", m: 2, a: "Particles are closer together, so their own volume is not negligible compared with the container [1]; intermolecular attractions become significant [1]." },
    ],
  },

  "chem-4": {
    title: "Ionic · Covalent · Metallic · IMF · Chromatography",
    parts: [
      {
        h: "Ionic & metallic 離子同金屬",
        min: 2.5,
        blocks: [
          ["key", "<b>Ionic</b>：electrostatic attraction between oppositely charged ions（lattice）<br><b>Metallic</b>：electrostatic attraction between a lattice of cations and delocalised electrons"],
          ["rhyme", "口訣 1", "電荷大、半徑細，就夠實淨", "Lattice enthalpy / metallic strength ↑ 當 charge ↑、radius ↓ → m.p. ↑（MgO > NaCl；Mg > Na）。"],
          ["table", ["Property", "Ionic", "Metallic"], [
            ["Conduct", "molten / aq only（ions free to move）", "solid & liquid（delocalised e⁻）"],
            ["Mechanical", "brittle（同電荷 ions 錯位相斥）", "malleable, ductile（layers slide）"],
            ["m.p.", "high", "generally high；alloys 更硬（唔同大小原子阻住 layers 滑）"],
          ]],
          ["trap", ["Ionic solid 唔導電因為 ions <b>fixed in lattice</b>，唔係「冇電子」。", "Metal 導電靠 delocalised <b>electrons</b>；molten salt 靠 <b>ions</b>。"]],
        ],
      },
      {
        h: "Covalent & VSEPR 共價同形狀",
        min: 3,
        blocks: [
          ["key", "Covalent bond = attraction between a <b>shared pair of electrons</b> and the nuclei。Coordination bond：兩粒電子都嚟自同一原子（NH₄⁺, H₃O⁺, CO）。"],
          ["table", ["Domains", "Lone pairs", "Shape", "Angle", "例"], [
            ["2", "0", "linear", "180°", "CO₂"],
            ["3", "0", "trigonal planar", "120°", "BF₃"],
            ["3", "1", "bent", "~117°", "SO₂"],
            ["4", "0", "tetrahedral", "109.5°", "CH₄"],
            ["4", "1", "trigonal pyramidal", "~107°", "NH₃"],
            ["4", "2", "bent", "~104.5°", "H₂O"],
          ]],
          ["rhyme", "口訣 2", "雙鍵當一個，孤對推更多", "Double/triple bond = 1 domain；lone pair repel 多過 bonding pair → 每多一對 lone pair，角度減約 2.5°。"],
          ["note", "Giant covalent：diamond（4 bonds, hard, no conduct）、graphite（3 bonds, layers, delocalised e⁻ → conducts）、graphene、C₆₀ fullerene（molecular）、SiO₂。"],
          ["trap", ["H₂O 叫 bent / V-shaped，唔好寫「linear」或「tetrahedral」（嗰個係 electron domain geometry）。", "Lewis structure 要畫埋所有 lone pairs。"]],
        ],
      },
      {
        h: "IMF, polarity & chromatography",
        min: 3,
        blocks: [
          ["key", "強度：London (dispersion) &lt; dipole–induced dipole &lt; dipole–dipole &lt; hydrogen bond（H on N/O/F … lone pair on N/O/F）"],
          ["rhyme", "口訣 3", "沸騰拆 IMF，唔拆共價鍵", "Simple molecular 沸點高低 = IMF 強弱；London forces 隨 number of electrons ↑。Polar bond + 對稱形狀（CO₂、CCl₄）→ non-polar molecule。"],
          ["eg", "解釋 H₂O（bp 100 °C）高過 H₂S（bp −60 °C）。", [
            "H₂O：hydrogen bonds between molecules（H bonded to very electronegative O）",
            "H₂S：only dipole–dipole + London forces, weaker",
            "→ more energy needed to overcome IMF in H₂O ✅",
          ]],
          ["note", "<b>Chromatography</b>（S2.2）：components 分開靠對 <b>stationary phase</b>（paper/water）同 <b>mobile phase</b>（solvent）嘅 relative attraction。\\(R_f = \\dfrac{\\text{distance moved by spot}}{\\text{distance moved by solvent front}}\\)（0–1，冇單位）。例：spot 3.6 cm，front 8.0 cm → Rf = 0.45。"],
          ["trap", ["寫「boiling breaks covalent bonds」→ 即刻 0。", "Rf 用 baseline 量起，唔係由紙底；start line 要用鉛筆、高過 solvent。"]],
        ],
      },
    ],
    summary: [
      "Ionic / metallic：電荷大半徑細就強",
      "Ionic 熔咗或溶咗先導電",
      "雙鍵當一個，孤對推更多",
      "沸騰拆 IMF，唔拆 covalent bond",
      "H-bond：H 連 N、O、F",
      "對稱就 non-polar；Rf = spot ÷ front",
    ],
    practice: [
      { q: "Deduce the shape and bond angle of PCl₃.", m: 2, a: "Trigonal pyramidal [1]; ~107° (accept 100–108°) [1]." },
      { q: "Explain why CCl₄ is non-polar although C–Cl bonds are polar.", m: 2, a: "Tetrahedral / symmetrical shape [1]; bond dipoles cancel, no net dipole [1]." },
      { q: "Explain why graphite conducts electricity but diamond does not.", m: 2, a: "Graphite: each C bonded to three others, one delocalised electron per atom free to move [1]; diamond: all four valence electrons used in bonds, no mobile electrons [1]." },
      { q: "In paper chromatography a dye moved 2.7 cm while the solvent moved 9.0 cm. Calculate Rf and outline why two dyes separate.", m: 3, a: "Rf = 2.7/9.0 = 0.30 [1]; dyes have different relative attractions (IMF) to the stationary and mobile phases [1]; so travel different distances [1]." },
      { q: "Explain why magnesium oxide has a higher melting point than sodium chloride.", m: 2, a: "Mg²⁺/O²⁻ have greater charges (and smaller radii) than Na⁺/Cl⁻ [1]; stronger electrostatic attraction / lattice, more energy needed to separate ions [1]." },
    ],
  },

  "chem-5": {
    title: "Bonding triangle · Polymers · Periodic trends · Oxides",
    parts: [
      {
        h: "Materials 物料",
        min: 3,
        blocks: [
          ["key", "<b>Bonding triangle</b>：x-axis = <b>average electronegativity</b>，y-axis = <b>electronegativity difference</b> Δχ。左下 metallic、右下 covalent、頂 ionic；大部分物質喺中間（bonding continuum）。"],
          ["eg", "用 data booklet：Na χ = 0.9，Cl χ = 3.2。分類 NaCl。", [
            "Δχ = 3.2 − 0.9 = 2.3；average = (0.9 + 3.2)/2 = 2.05",
            "落喺 triangle 上方 → predominantly <b>ionic</b> ✅",
          ]],
          ["rhyme", "口訣 1", "雙鍵打開手拖手", "<b>Addition polymer</b>：alkene 嘅 C=C 打開，monomers 連埋，冇原子流失。Repeating unit 要畫 <b>2 個 C 主鏈 + brackets + continuation bonds + n</b>。"],
          ["note", "Alloys：金屬 + 其他元素 → 唔同大小原子阻住 layers sliding → harder, stronger。Plastics：durable, non-biodegradable → 環境問題；recycling 需要分類。"],
          ["trap", ["Poly(propene) repeating unit 寫成 -CH₂-CH₂-CH₂- ✗ → 正確 -[CH₂-CH(CH₃)]-，CH₃ 係側鏈。", "Bonding triangle 兩條軸調亂。"]],
        ],
      },
      {
        h: "Periodic trends 週期趨勢",
        min: 3,
        blocks: [
          ["table", ["Property", "Across period →", "Down group ↓"], [
            ["Atomic radius", "↓", "↑"],
            ["First IE", "↑（有 dip）", "↓"],
            ["Electronegativity", "↑", "↓"],
            ["Electron affinity", "generally more exothermic", "less exothermic"],
            ["Metallic character", "↓", "↑"],
          ]],
          ["rhyme", "口訣 2（解釋三寶）", "核電荷、層數、屏蔽", "每個 trend 都用：nuclear charge、number of shells / distance、shielding → attraction for outer electrons。"],
          ["note", "Group 1：down the group 更 reactive（IE ↓）；2Na + 2H₂O → 2NaOH + H₂。Group 17：down the group 較唔 reactive；Cl₂ + 2KBr → 2KCl + Br₂（強嘅 displace 弱嘅 halide）。Ionic radius：cation 細過原子，anion 大過原子。"],
          ["trap", ["Across period radius 變細係因為 nuclear charge ↑ 而 <b>shielding 差唔多</b>，唔係「多咗電子」。", "Halogen reactivity 方向同 group 1 相反。"]],
        ],
      },
      {
        h: "Oxides & oxidation states",
        min: 2.5,
        blocks: [
          ["key", "Metal oxide = <b>basic</b>（Na₂O + H₂O → 2NaOH）｜Non-metal oxide = <b>acidic</b>（SO₃ + H₂O → H₂SO₄；CO₂ → H₂CO₃）｜Al₂O₃ = <b>amphoteric</b>"],
          ["note", "Environmental link：NOₓ / SO₂ → <b>acid deposition</b>；CO₂ 溶入海 → H₂CO₃ → <b>ocean acidification</b>。"],
          ["rhyme", "口訣 3", "元素零，總和平，O 負二，H 正一", "例：KMnO₄：+1 + x + 4(−2) = 0 → x = +7，寫 manganese(VII)。"],
          ["trap", ["寫 oxidation state 漏正號（+7 唔好寫 7+；7+ 係 ion charge 寫法）。", "H₂O₂ 入面 O 係 −1；metal hydride 入面 H 係 −1。"]],
        ],
      },
    ],
    summary: [
      "Triangle：x 平均 χ，y 係 Δχ",
      "雙鍵打開手拖手，兩碳主鏈加括號",
      "核電荷、層數、屏蔽解釋所有 trend",
      "Group 1 越落越勁，Group 17 越落越弱",
      "金屬氧化物 basic，非金屬 acidic，Al₂O₃ 兩樣都得",
      "元素零，總和平，O −2，H +1",
    ],
    practice: [
      { q: "Draw (describe) the repeating unit of the polymer formed from propene, CH₂=CHCH₃.", m: 2, a: "-[CH₂-CH(CH₃)]- with two-carbon backbone and CH₃ side group [1]; brackets with continuation bonds / n [1]." },
      { q: "Explain why atomic radius decreases across period 3.", m: 2, a: "Nuclear charge increases while electrons are added to the same shell / shielding similar [1]; greater attraction pulls outer electrons closer [1]." },
      { q: "Write an equation for the reaction of sodium oxide with water and state the nature of the oxide.", m: 2, a: "Na₂O + H₂O → 2NaOH [1]; basic oxide [1]." },
      { q: "Deduce the oxidation state of sulfur in Na₂S₂O₃.", m: 1, a: "+2 (2(+1) + 2x + 3(−2) = 0)." },
    ],
  },

  "chem-6": {
    title: "Functional groups · Naming · Isomers · Spectroscopy",
    parts: [
      {
        h: "Functional groups & IUPAC 命名",
        min: 3,
        blocks: [
          ["table", ["Class", "Group", "命名", "例"], [
            ["alkene", "C=C", "-ene", "but-1-ene"],
            ["halogenoalkane", "C–X", "chloro-/bromo-", "2-bromopropane"],
            ["alcohol", "–OH (hydroxyl)", "-ol", "propan-2-ol"],
            ["aldehyde", "–CHO (carbonyl, 末端)", "-al", "propanal"],
            ["ketone", "C=O (carbonyl, 中間)", "-one", "propanone"],
            ["carboxylic acid", "–COOH (carboxyl)", "-oic acid", "ethanoic acid"],
            ["ester", "–COO–", "-yl -oate", "methyl ethanoate"],
            ["ether / amine / amide", "C–O–C / –NH₂ / –CONH₂", "alkoxy- / -amine / -amide", "methoxyethane / ethanamine / ethanamide"],
          ]],
          ["rhyme", "口訣 1", "最長鏈、最細號、字母排", "Longest chain containing the functional group → lowest locant → substituents alphabetical（2-methylbutan-1-ol）。"],
          ["note", "Homologous series：same general formula, same functional group, differ by CH₂, similar chemical properties, gradual trend in physical properties（b.p. ↑ 因為 London forces ↑）。"],
          ["trap", ["Ester 命名先 alkyl（嚟自 alcohol）再 -oate（嚟自 acid）：CH₃COOCH₃ = methyl ethanoate。", "Aldehyde 嘅 C=O 一定喺鏈尾，唔使寫數字（propanal 唔寫 propan-1-al）。"]],
        ],
      },
      {
        h: "Isomers & classifying",
        min: 2,
        blocks: [
          ["key", "<b>Structural isomers</b>：same molecular formula, different structural formula（chain / position / functional group）"],
          ["eg", "C₄H₁₀O 有幾多個 alcohol isomers？", [
            "butan-1-ol（primary）、butan-2-ol（secondary）",
            "2-methylpropan-1-ol（primary）、2-methylpropan-2-ol（<b>tertiary</b>）→ 4 個 ✅",
          ]],
          ["rhyme", "口訣 2", "數碳鄰居定級數", "連住 –OH / –X 嗰粒 C 有幾多粒 C 鄰居：1 = primary，2 = secondary，3 = tertiary。"],
        ],
      },
      {
        h: "Spectroscopy 光譜（P1B / P2 必考）",
        min: 3.5,
        blocks: [
          ["key", "<b>IHD</b> = (2C + 2 + N − H − X)/2 = rings + π bonds<br><b>MS</b>：molecular ion M⁺ → M；fragments 15 CH₃⁺、29 C₂H₅⁺/CHO⁺、31 CH₂OH⁺、45 COOH⁺<br><b>IR</b>：bond vibrations → functional group<br><b>¹H NMR</b>：no. of signals = H environments；integration = H ratio；chemical shift vs TMS (0 ppm)"],
          ["table", ["IR band / cm⁻¹", "Bond", "睇法"], [
            ["3200–3600 broad", "O–H alcohol", "闊、圓"],
            ["2500–3000 very broad", "O–H acid", "又闊又爛，蓋住 C–H"],
            ["1700–1750 strong", "C=O", "尖、深"],
            ["2850–3090", "C–H", "幾乎個個有"],
          ]],
          ["eg", "C₂H₄O₂：MS M⁺ = 60；IR 2500–3000 very broad + 1710；¹H NMR 2 signals, 3 : 1。", [
            "IHD = (4 + 2 − 4)/2 = 1 → 一個 C=O",
            "Very broad O–H + C=O → carboxylic acid",
            "3 : 1 = CH₃ 同 COOH → <b>ethanoic acid, CH₃COOH</b> ✅",
          ]],
          ["rhyme", "口訣 3", "MS 稱重，IR 認組，NMR 數屋企", "做 combined spectra 題：M → IHD → IR → NMR → 寫結構 → check 返。"],
          ["trap", ["IR 範圍要喺 data booklet 揀，唔好背錯數字。", "對稱分子 H environment 數多咗（propanone 只有 1 個 signal）。", "SL 唔使分析 splitting pattern（AHL）。"]],
        ],
      },
    ],
    summary: [
      "最長鏈、最細號、字母排",
      "Ester：alkyl 先，-oate 後",
      "數碳鄰居定 1°/2°/3°",
      "IHD = (2C + 2 + N − H − X)/2",
      "MS 稱重，IR 認組，NMR 數屋企",
      "Broad 2500–3000 + 1700 = carboxylic acid",
    ],
    practice: [
      { q: "State the IUPAC name of CH₃CH₂COOCH₂CH₃.", m: 1, a: "Ethyl propanoate." },
      { q: "Calculate the IHD of C₄H₆ and suggest one possible structure.", m: 2, a: "(2×4 + 2 − 6)/2 = 2 [1]; e.g. but-1-yne / buta-1,3-diene / cyclobutene [1]." },
      { q: "Deduce the number of signals and their ratio in the ¹H NMR spectrum of propan-2-ol, (CH₃)₂CHOH.", m: 2, a: "3 signals [1]; ratio 6 : 1 : 1 [1]." },
      { q: "Explain how IR spectroscopy distinguishes propan-1-ol from propanal.", m: 2, a: "Propan-1-ol: broad absorption 3200–3600 cm⁻¹ (O–H) [1]; propanal: strong absorption 1700–1750 cm⁻¹ (C=O) and no broad O–H [1]." },
    ],
  },

  "chem-7": {
    title: "Enthalpy · Calorimetry · Bond enthalpy & Hess · Fuels",
    parts: [
      {
        h: "ΔH & calorimetry 量熱",
        min: 3.5,
        blocks: [
          ["key", "\\(q = mc\\Delta T\\)（m = <b>水/溶液</b>質量 g，c = 4.18 J g⁻¹ K⁻¹）　\\(\\Delta H = -\\dfrac{q}{n}\\)（kJ mol⁻¹）"],
          ["rhyme", "口訣 1", "升溫放熱負，降溫吸熱正", "Exothermic：surroundings 變熱，ΔH &lt; 0，products 喺 energy profile 較低；endothermic 相反。"],
          ["eg", "Excess Zn 加入 50.0 cm³ 0.200 mol dm⁻³ CuSO₄，ΔT = +10.0 K。求 ΔH。", [
            "q = 50.0 × 4.18 × 10.0 = 2090 J = 2.09 kJ",
            "n(CuSO₄) = 0.200 × 0.0500 = 0.0100 mol（limiting）",
            "ΔH = −2.09 / 0.0100 = <b>−209 kJ mol⁻¹</b> ✅",
          ]],
          ["note", "P1B 必考：heat loss → 實驗值 <b>less exothermic</b> than literature。改善：lid、polystyrene cup / insulation、stir、extrapolate temperature–time graph 返去加入時間求 max ΔT。燃燒實驗：incomplete combustion、soot、draught shield。"],
          ["trap", ["m 用咗燃料質量。", "漏咗負號或單位 kJ mol⁻¹ → 失 A mark。", "Excess reagent 唔係計 n 嗰個。"]],
        ],
      },
      {
        h: "Bond enthalpy & Hess's law",
        min: 3,
        blocks: [
          ["key", "\\(\\Delta H = \\sum\\text{bonds broken} - \\sum\\text{bonds formed}\\)　Breaking = endothermic，forming = exothermic"],
          ["eg", "H₂(g) + Cl₂(g) → 2HCl(g)；H–H 436、Cl–Cl 242、H–Cl 431 kJ mol⁻¹。", [
            "Broken：436 + 242 = 678；Formed：2 × 431 = 862",
            "ΔH = 678 − 862 = <b>−184 kJ mol⁻¹</b>",
          ]],
          ["rhyme", "口訣 2", "斷減成；反轉變號，乘就乘埋", "Hess's law：ΔH independent of route。用方程式砌目標反應。"],
          ["eg", "C + O₂ → CO₂ ΔH = −394；CO + ½O₂ → CO₂ ΔH = −283。求 C + ½O₂ → CO。", ["第一條照用 + 第二條反轉：−394 + 283 = <b>−111 kJ mol⁻¹</b>"]],
          ["trap", ["Bond enthalpy 係 average、只適用 gaseous → 同 data 有差異。", "方向顛倒成「formed − broken」。"]],
        ],
      },
      {
        h: "Fuels 燃料",
        min: 2,
        blocks: [
          ["table", ["燃燒", "產物", "問題"], [
            ["complete", "CO₂ + H₂O", "CO₂ greenhouse gas"],
            ["incomplete（O₂ 唔夠）", "CO / C (soot) + H₂O", "CO toxic；soot 污染"],
          ]],
          ["note", "Fossil fuels：high specific energy，non-renewable。Biofuels（ethanol 由 fermentation、biodiesel）：renewable、理論上 carbon neutral，但佔農地。Fuel cell：2H₂ + O₂ → 2H₂O，化學能直接變電能，efficiency 高。"],
          ["trap", ["寫 incomplete combustion 方程式要 balance：CH₄ + 1½O₂ → CO + 2H₂O。"]],
        ],
      },
    ],
    summary: [
      "q = mcΔT，m 係水；ΔH = −q/n",
      "升溫負，降溫正；單位 kJ mol⁻¹",
      "Heat loss → less exothermic",
      "斷減成；bond enthalpy 係 average、gas",
      "Hess：反轉變號，乘就乘埋",
      "O₂ 唔夠 → CO + soot",
    ],
    practice: [
      { q: "Burning 0.230 g of ethanol (M = 46.08 g mol⁻¹) raised the temperature of 100.0 g of water by 15.0 K. Calculate ΔHc of ethanol.", m: 3, a: "q = 100.0 × 4.18 × 15.0 = 6270 J [1]; n = 0.230/46.08 = 4.99 × 10⁻³ mol [1]; ΔHc = −6.27/4.99 × 10⁻³ = −1.26 × 10³ kJ mol⁻¹ [1]." },
      { q: "Suggest why the value in Q1 is less exothermic than the literature value (−1367 kJ mol⁻¹) and one improvement.", m: 2, a: "Heat lost to surroundings / incomplete combustion [1]; insulate / use a lid or draught shield / reduce distance between flame and calorimeter [1]." },
      { q: "Use bond enthalpies (N≡N 945, H–H 436, N–H 391 kJ mol⁻¹) to calculate ΔH for N₂ + 3H₂ → 2NH₃.", m: 3, a: "Broken: 945 + 3(436) = 2253 [1]; formed: 6(391) = 2346 [1]; ΔH = −93 kJ mol⁻¹ [1]." },
      { q: "State the products of incomplete combustion of octane and one hazard of each.", m: 2, a: "Carbon monoxide – toxic, binds to haemoglobin [1]; carbon/soot – respiratory problems / global dimming [1] (water also formed)." },
    ],
  },

  "chem-8": {
    title: "Reacting masses · Limiting reactant · Yield · Titration",
    parts: [
      {
        h: "Mole method & limiting reactant",
        min: 3.5,
        blocks: [
          ["key", "<b>mass → moles → ratio → moles → mass / volume</b><br>Limiting reactant：每個 n ÷ 方程式係數，最細嗰個係 limiting"],
          ["rhyme", "口訣 1", "先變摩爾，再睇比例", "永遠唔好用 mass ratio！寫清楚「mole ratio 1 : 2」攞 M mark。"],
          ["eg", "5.00 g Mg + 100.0 cm³ 1.00 mol dm⁻³ HCl。Mg + 2HCl → MgCl₂ + H₂。求 H₂ 喺 STP 嘅體積。", [
            "n(Mg) = 5.00/24.31 = 0.206；n(HCl) = 0.100",
            "÷ 係數：Mg 0.206，HCl 0.100/2 = 0.0500 → <b>HCl limiting</b>",
            "n(H₂) = 0.0500 mol → V = 0.0500 × 22.7 = <b>1.14 dm³</b> ✅",
          ]],
          ["trap", ["冇除係數就比較 moles。", "中途 round 數 → 最後答案偏差；計數機保留全數。"]],
        ],
      },
      {
        h: "% yield & atom economy",
        min: 2,
        blocks: [
          ["key", "% yield = experimental ÷ theoretical × 100　　Atom economy = M(desired product) ÷ ΣM(all reactants) × 100"],
          ["eg", "CaCO₃ → CaO + CO₂（M 100.09 → 56.08）。CaO 嘅 atom economy？", ["56.08/100.09 × 100 = <b>56.0%</b>"]],
          ["rhyme", "口訣 2", "Yield 睇實驗，economy 睇方程式", "% yield 低：transfer loss、incomplete reaction、side reactions。Atom economy 高 = less waste = green chemistry。"],
        ],
      },
      {
        h: "Titration 滴定（P1B 重點）",
        min: 3,
        blocks: [
          ["key", "n(known) = cV → mole ratio → n(unknown) → c = n/V。Titres <b>concordant</b> 即相差 ≤ 0.10 cm³，取平均。"],
          ["eg", "25.00 cm³ NaOH 需要 20.00 cm³ 0.0500 mol dm⁻³ H₂SO₄。H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O。", [
            "n(H₂SO₄) = 0.0500 × 0.02000 = 1.00 × 10⁻³ mol",
            "n(NaOH) = 2 × 1.00 × 10⁻³ = 2.00 × 10⁻³ mol",
            "c = 2.00 × 10⁻³ / 0.02500 = <b>0.0800 mol dm⁻³</b> ✅",
          ]],
          ["note", "Uncertainty（P1B）：burette ±0.05 cm³ per reading → titre ±0.10 cm³；pipette ±0.06 cm³（25 cm³ class B 左右）。% uncertainty = absolute ÷ value × 100；乘除就 % 相加。"],
          ["trap", ["H₂SO₄ 同 NaOH 係 1 : 2，唔係 1 : 1。", "Rough titre 唔計入平均。"]],
        ],
      },
    ],
    summary: [
      "先變摩爾，再睇比例",
      "n ÷ 係數，最細係 limiting",
      "Yield 睇實驗，economy 睇方程式",
      "Titration：cV → ratio → n → c",
      "Concordant ≤ 0.10 cm³，rough 唔計",
      "% uncertainty 乘除相加",
    ],
    practice: [
      { q: "Calculate the mass of iron formed from 80.0 g of Fe₂O₃ (M = 159.70) in Fe₂O₃ + 3CO → 2Fe + 3CO₂.", m: 3, a: "n(Fe₂O₃) = 80.0/159.70 = 0.501 mol [1]; n(Fe) = 1.00 mol [1]; mass = 1.00 × 55.85 = 56.0 g [1]." },
      { q: "In the reaction in Q1 only 42.0 g of iron was obtained. Calculate the percentage yield.", m: 1, a: "42.0/56.0 × 100 = 75.0%." },
      { q: "Calculate the atom economy for producing ethene in C₂H₅OH → C₂H₄ + H₂O (M: 46.08 → 28.06).", m: 1, a: "28.06/46.08 × 100 = 60.9%." },
      { q: "A titre is 22.40 cm³ read from a burette with uncertainty ±0.05 cm³ per reading. Calculate the percentage uncertainty of the titre.", m: 2, a: "Absolute uncertainty = ±0.10 cm³ (two readings) [1]; 0.10/22.40 × 100 = ±0.45% [1]." },
    ],
  },

  "chem-9": {
    title: "Measuring rate · Collision theory · Maxwell–Boltzmann · Catalysts",
    parts: [
      {
        h: "Measuring rate 量度速率（P1B 熱門）",
        min: 3,
        blocks: [
          ["key", "Rate = change in concentration (amount) ÷ time（mol dm⁻³ s⁻¹）。Rate at time t = <b>gradient of tangent</b>。"],
          ["table", ["方法", "量咩", "適用"], [
            ["gas syringe / inverted burette", "volume of gas", "Mg + HCl, CaCO₃ + HCl"],
            ["balance", "mass loss（gas 走咗）", "CaCO₃ + HCl"],
            ["colorimeter", "absorbance / colour", "有色物質"],
            ["disappearing cross", "time for precipitate", "Na₂S₂O₃ + HCl"],
            ["pH / conductivity probe", "[H⁺] / ions", "離子數變化"],
          ]],
          ["eg", "Gas volume–time 圖，t = 0 嘅 tangent 經過 (0, 0) 同 (20 s, 30 cm³)。Initial rate？", ["Gradient = 30/20 = <b>1.5 cm³ s⁻¹</b>"]],
          ["trap", ["Rate 慢慢減因為 reactant concentration ↓ → collision frequency ↓。", "Final volume 只由 limiting reactant 決定，唔關 catalyst / 溫度事。", "1/time 可以當 relative rate 用（disappearing cross）。"]],
        ],
      },
      {
        h: "Collision theory 碰撞理論",
        min: 2.5,
        blocks: [
          ["key", "Successful collision：<b>E ≥ Ea</b> + <b>correct orientation</b>"],
          ["table", ["Factor ↑", "點解快咗"], [
            ["concentration / pressure", "more frequent collisions"],
            ["surface area", "more particles exposed → more frequent collisions"],
            ["temperature", "<b>greater proportion with E ≥ Ea</b>（主要）+ more frequent collisions"],
            ["catalyst", "alternative pathway, lower Ea"],
          ]],
          ["rhyme", "口訣 1", "濃度面積撞多啲，溫度催化夠力啲", "前兩個係 frequency，後兩個係 energy（proportion ≥ Ea）。"],
          ["trap", ["寫「more collisions」唔夠 → 要寫 <b>more frequent</b> / per unit time。", "Catalyst 唔係畀粒子更多 energy。"]],
        ],
      },
      {
        h: "Maxwell–Boltzmann & energy profiles",
        min: 3,
        blocks: [
          ["key", "M–B 曲線：由 origin 開始，偏左峰，右邊尾巴唔掂 x-axis。Axes：<b>number (fraction) of particles</b> vs <b>kinetic energy</b>。Area = total particles。"],
          ["rhyme", "口訣 2", "升溫峰矮向右移，催化 Ea 向左移", "High T：peak lower, broader, shifted right，<b>area 不變</b>，Ea 右邊面積大好多。Catalyst：曲線唔變，Ea 線向左。"],
          ["note", "Energy profile：reactants → 頂點 = <b>transition state</b>（activated complex）→ products。Ea 由 reactants 量到頂；ΔH 由 reactants 量到 products。Catalysed pathway 頂點較低，ΔH 不變。"],
          ["trap", ["畫高溫曲線面積大咗 / 峰高咗 → 扣分。", "Ea 箭頭由 products 量起 ✗。"]],
        ],
      },
    ],
    summary: [
      "Rate = 切線 gradient",
      "Successful：E ≥ Ea + 啱方向",
      "濃度面積撞多啲，溫度催化夠力啲",
      "More frequent，唔係 more",
      "升溫峰矮向右移，面積不變",
      "Catalyst：lower Ea，ΔH 不變",
    ],
    practice: [
      { q: "Explain, with reference to the Maxwell–Boltzmann distribution, why increasing temperature increases the rate.", m: 3, a: "Average kinetic energy increases / curve shifts right and flattens [1]; greater proportion of particles have E ≥ Ea [1]; more frequent successful collisions [1]." },
      { q: "Outline two methods to measure the rate of CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g).", m: 2, a: "Measure volume of CO₂ with a gas syringe over time [1]; measure mass loss on a balance over time [1] (or pH/conductivity)." },
      { q: "Explain why powdered CaCO₃ reacts faster than the same mass of marble chips but gives the same final volume of CO₂.", m: 2, a: "Larger surface area → more frequent collisions [1]; same amount (moles) of limiting reactant so same total CO₂ [1]." },
      { q: "State what is represented by the maximum of a reaction energy profile.", m: 1, a: "Transition state / activated complex." },
    ],
  },

  "chem-10": {
    title: "Dynamic equilibrium · Kc · Le Chatelier",
    parts: [
      {
        h: "Dynamic equilibrium & Kc",
        min: 3,
        blocks: [
          ["key", "Closed system；<b>forward rate = reverse rate</b>；concentrations <b>constant（唔一定相等）</b>；macroscopic properties constant。"],
          ["key", "aA + bB ⇌ cC + dD：\\(K_c = \\dfrac{[C]^c[D]^d}{[A]^a[B]^b}\\)　K ≫ 1 → 偏右（products）；K ≪ 1 → 偏左"],
          ["rhyme", "口訣 1", "產物做頭，係數做次方", "N₂ + 3H₂ ⇌ 2NH₃：Kc = [NH₃]² / ([N₂][H₂]³)。"],
          ["note", "反轉方程式 → 1/K；係數 ×2 → K²。K <b>只隨溫度變</b>。"],
          ["trap", ["寫「concentrations are equal」或「reaction stopped」→ 0 分。", "Kc 用 + 唔用 ×；漏次方。"]],
        ],
      },
      {
        h: "Le Chatelier's principle",
        min: 3.5,
        blocks: [
          ["key", "Equilibrium 受擾 → position shifts to <b>partially oppose</b> the change"],
          ["table", ["改變", "Position", "K"], [
            ["加 reactant / 抽走 product", "→ right", "不變"],
            ["↑ pressure", "→ fewer moles of gas", "不變"],
            ["↑ temperature", "→ endothermic direction", "<b>變</b>"],
            ["catalyst", "no shift，到 equilibrium 快啲", "不變"],
          ]],
          ["rhyme", "口訣 2", "你加我減，你熱我吸，你壓我縮", "答題四步：change → direction → reason（oppose）→ effect on yield / K。"],
          ["eg", "Haber：N₂ + 3H₂ ⇌ 2NH₃，ΔH = −92 kJ mol⁻¹。點解用 ~450 °C、~200 atm、Fe catalyst？", [
            "低溫 → 偏右（exothermic forward）但 rate 太慢 → 450 °C = <b>compromise</b> between yield and rate",
            "高壓 → 4 mol gas → 2 mol，偏右；但太高壓成本同安全問題",
            "Fe catalyst：rate ↑，唔改變 yield",
          ]],
          ["trap", ["升溫 exothermic 反應 → K <b>減少</b>，唔係只講 position。", "Catalyst 「shifts equilibrium」✗。"]],
        ],
      },
      {
        h: "Q vs K（延伸，快速睇）",
        min: 1.5,
        blocks: [
          ["key", "Reaction quotient Q：同 Kc 一樣嘅 expression，但用任何時刻嘅濃度。Q &lt; K → forward；Q &gt; K → reverse；Q = K → at equilibrium。"],
          ["note", "2025 guide 入面 Q 同 ICE 計 K 係 AHL；SL 主要考 expression、K 大細意義同 Le Chatelier。"],
        ],
      },
    ],
    summary: [
      "Rate 相等，濃度不變（唔係相等）",
      "產物做頭，係數做次方",
      "K 只怕溫度",
      "你加我減，你熱我吸，你壓我縮",
      "Catalyst 唔郁 position，只係快啲到",
      "工業條件 = yield、rate、cost compromise",
    ],
    practice: [
      { q: "Write the Kc expression for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).", m: 1, a: "Kc = [SO₃]² / ([SO₂]²[O₂])." },
      { q: "For the reaction in Q1 (ΔH &lt; 0), predict the effect on the equilibrium position and on Kc of increasing the temperature.", m: 2, a: "Position shifts left (endothermic direction) [1]; Kc decreases [1]." },
      { q: "Outline two characteristics of a system in dynamic equilibrium.", m: 2, a: "Rate of forward reaction equals rate of reverse reaction [1]; concentrations of reactants and products remain constant / closed system [1]." },
      { q: "State and explain the effect of increasing pressure on the yield of NH₃ in N₂(g) + 3H₂(g) ⇌ 2NH₃(g).", m: 2, a: "Yield increases [1]; equilibrium shifts to the side with fewer moles of gas (4 → 2) to oppose the increase [1]." },
    ],
  },

  "chem-11": {
    title: "Brønsted–Lowry · pH & Kw · Strong vs weak · Neutralisation",
    parts: [
      {
        h: "Brønsted–Lowry & conjugate pairs",
        min: 2.5,
        blocks: [
          ["key", "<b>Acid</b> = proton (H⁺) donor｜<b>Base</b> = proton acceptor｜<b>Conjugate pair</b> 相差一粒 H⁺｜<b>Amphiprotic</b>：可以 donate 又 accept（H₂O、HCO₃⁻、HSO₄⁻）"],
          ["eg", "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻：指出 conjugate pairs。", [
            "H₂O 畀 H⁺ → acid；conjugate base OH⁻",
            "NH₃ 收 H⁺ → base；conjugate acid NH₄⁺ ✅",
          ]],
          ["rhyme", "口訣 1", "畀 H 係酸，收 H 係鹼，差一粒係一對", ""],
          ["trap", ["Conjugate base of H₂SO₄ 係 HSO₄⁻，唔係 SO₄²⁻。", "Amphiprotic（proton）≠ amphoteric（酸鹼都反應，e.g. Al₂O₃）。"]],
        ],
      },
      {
        h: "pH & Kw",
        min: 3,
        blocks: [
          ["key", "pH = −log₁₀[H⁺]　[H⁺] = 10⁻ᵖᴴ　Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴（298 K）　pH + pOH = 14"],
          ["rhyme", "口訣 2", "差一級，差十倍", "pH 3 比 pH 5 嘅 [H⁺] 大 100 倍；稀釋 10 倍（strong acid）→ pH +1。"],
          ["eg", "求 0.0050 mol dm⁻³ Ba(OH)₂ 嘅 pH（298 K）。", [
            "[OH⁻] = 2 × 0.0050 = 0.010 mol dm⁻³（一粒 Ba(OH)₂ 兩粒 OH⁻）",
            "pOH = 2.00 → pH = <b>12.00</b> ✅",
          ]],
          ["note", "Kw 隨溫度變（ionisation 係 endothermic，T ↑ → Kw ↑ → pure water pH &lt; 7，但仍然 neutral 因為 [H⁺] = [OH⁻]）。"],
          ["trap", ["pH 嘅 d.p. = [H⁺] 嘅 s.f.（[H⁺] 2 s.f. → pH 2 d.p.）。", "Base 直接 −log[OH⁻] 就當 pH ✗。"]],
        ],
      },
      {
        h: "Strong vs weak & neutralisation",
        min: 3,
        blocks: [
          ["table", ["", "Strong (HCl, HNO₃, H₂SO₄)", "Weak (CH₃COOH, H₂CO₃)"], [
            ["Dissociation", "complete", "partial（⇌ equilibrium）"],
            ["同濃度 pH", "lower", "higher"],
            ["Conductivity", "higher（more ions）", "lower"],
            ["Rate with Mg / CaCO₃", "faster", "slower"],
            ["中和同 volume NaOH", "same（同 moles）", "same"],
          ]],
          ["rhyme", "口訣 3", "強弱講解離，濃稀講份量", "Strong/weak = 解離程度；concentrated/dilute = mol dm⁻³。"],
          ["note", "Reactions：acid + metal → salt + H₂；+ carbonate → salt + H₂O + CO₂；+ metal oxide/hydroxide → salt + H₂O（neutralisation, exothermic）。<br>Titration curve（strong/strong）：起點 pH ~1，equivalence 有 sharp jump，<b>pH = 7</b>；indicator 嘅 colour-change range 要喺 jump 入面。"],
          ["trap", ["寫「weak acid = dilute」✗。", "Weak acid 唔係中和少啲 NaOH——同 moles 就同 volume。"]],
        ],
      },
    ],
    summary: [
      "畀 H 係酸，收 H 係鹼，差一粒係一對",
      "pH = −log[H⁺]；差一級，差十倍",
      "Base：pOH → 14 − pOH",
      "Kw = 1.0 × 10⁻¹⁴ at 298 K",
      "強弱講解離，濃稀講份量",
      "同 moles 酸中和同 volume NaOH",
    ],
    practice: [
      { q: "Identify the two conjugate acid–base pairs in HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺.", m: 2, a: "HCO₃⁻ / CO₃²⁻ [1]; H₃O⁺ / H₂O [1]." },
      { q: "Calculate the pH of a solution with [OH⁻] = 2.5 × 10⁻³ mol dm⁻³ at 298 K.", m: 2, a: "[H⁺] = 1.0 × 10⁻¹⁴ / 2.5 × 10⁻³ = 4.0 × 10⁻¹² [1]; pH = 11.40 [1]." },
      { q: "Describe two experiments that distinguish 0.10 mol dm⁻³ HCl from 0.10 mol dm⁻³ CH₃COOH.", m: 2, a: "HCl has lower pH (pH meter / universal indicator) [1]; HCl has higher conductivity / reacts faster with Mg or CaCO₃ (more bubbles) [1]." },
      { q: "A solution of HNO₃ has pH 2.0. It is diluted by a factor of 100. State the new pH.", m: 1, a: "pH 4.0." },
    ],
  },

  "chem-12": {
    title: "Oxidation states · Half-equations · Cells · Organic redox",
    parts: [
      {
        h: "Oxidation states & half-equations",
        min: 3,
        blocks: [
          ["key", "<b>OIL RIG</b>：oxidation = loss of e⁻ / oxidation state ↑；reduction = gain / ↓<br><b>Oxidising agent</b> 自己被 reduce；<b>reducing agent</b> 自己被 oxidise"],
          ["rhyme", "口訣 1（酸性 half-equation）", "先配原子，水補氧，H⁺ 補氫，電子補電", "e.g. MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O；Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O"],
          ["eg", "合併 MnO₄⁻ 同 Fe²⁺ → Fe³⁺ + e⁻。", [
            "Fe 嗰條 × 5，等電子數相同（5e⁻）",
            "<b>MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O</b>（電荷：+17 = +17 ✅）",
          ]],
          ["trap", ["Overall equation 仲有 e⁻ 未消 → 扣分。", "Oxidising agent 寫成「被 oxidise 嗰個」✗。"]],
        ],
      },
      {
        h: "Activity series & cells",
        min: 3,
        blocks: [
          ["key", "Activity series：越 reactive = stronger reducing agent；佢會 displace 較唔 reactive 嘅 metal ion（Zn + Cu²⁺ → Zn²⁺ + Cu）；H 以上嘅金屬同 dilute acid 出 H₂。"],
          ["table", ["", "Primary (voltaic) cell", "Electrolytic cell"], [
            ["能量", "chemical → electrical, spontaneous", "electrical → chemical, non-spontaneous"],
            ["Anode", "oxidation, <b>−</b>", "oxidation, <b>+</b>"],
            ["Cathode", "reduction, <b>+</b>", "reduction, <b>−</b>"],
          ]],
          ["rhyme", "口訣 2", "An Ox, Red Cat；電子行線，離子行橋", "Electrons 由 anode 經 external wire 去 cathode；salt bridge 畀 ions 行，保持 electrical neutrality。較 reactive 嘅金屬做 anode。"],
          ["note", "Secondary (rechargeable) cells：lead–acid、lithium-ion、NiCd——充電時反應倒轉。Fuel cell：持續供應 fuel。"],
          ["trap", ["寫「electrons flow through the salt bridge」→ 0。", "Voltaic 同 electrolytic 嘅 anode 正負號相反。"]],
        ],
      },
      {
        h: "Electrolysis & organic redox",
        min: 2.5,
        blocks: [
          ["key", "Molten salt electrolysis：metal 喺 cathode（e.g. Pb²⁺ + 2e⁻ → Pb），non-metal 喺 anode（2Br⁻ → Br₂ + 2e⁻）。"],
          ["table", ["Alcohol", "+ acidified K₂Cr₂O₇（orange → green）"], [
            ["primary", "aldehyde（<b>distil</b>）→ carboxylic acid（<b>reflux</b>, excess oxidant）"],
            ["secondary", "ketone"],
            ["tertiary", "no reaction（stays orange）"],
          ]],
          ["note", "Reduction：carboxylic acid / aldehyde → primary alcohol，ketone → secondary alcohol（LiAlH₄ / NaBH₄）；alkene + H₂（Ni catalyst）→ alkane。"],
          ["trap", ["想要 aldehyde 但寫 reflux ✗。", "顏色寫反（green → orange）。"]],
        ],
      },
    ],
    summary: [
      "OIL RIG；oxidising agent 自己被 reduce",
      "原子、水補氧、H⁺ 補氫、電子補電",
      "An Ox, Red Cat",
      "電子行線，離子行橋",
      "Voltaic anode 負；electrolytic anode 正",
      "1° → 醛（蒸）→ 酸（回流）；2° → 酮；3° 唔郁",
    ],
    practice: [
      { q: "Deduce the oxidation state of chromium in Cr₂O₇²⁻ and state whether it is oxidised or reduced when it forms Cr³⁺.", m: 2, a: "+6 [1]; reduced (oxidation state decreases +6 → +3) [1]." },
      { q: "20.00 cm³ of 0.0200 mol dm⁻³ KMnO₄ reacts exactly with Fe²⁺ (MnO₄⁻ : Fe²⁺ = 1 : 5). Calculate the amount of Fe²⁺.", m: 2, a: "n(MnO₄⁻) = 0.0200 × 0.02000 = 4.00 × 10⁻⁴ mol [1]; n(Fe²⁺) = 5 × 4.00 × 10⁻⁴ = 2.00 × 10⁻³ mol [1]." },
      { q: "In a Mg/Cu voltaic cell, identify the anode and state the direction of electron flow.", m: 2, a: "Mg is the anode (more reactive, oxidised) [1]; electrons flow from Mg to Cu through the external circuit [1]." },
      { q: "State the products at each electrode in the electrolysis of molten sodium chloride and give the half-equation at the cathode.", m: 3, a: "Cathode: sodium [1]; anode: chlorine [1]; Na⁺ + e⁻ → Na [1]." },
    ],
  },

  "chem-13": {
    title: "Radicals · Nucleophiles & electrophiles · Lewis acids",
    parts: [
      {
        h: "Radicals 自由基（R3.3）",
        min: 3,
        blocks: [
          ["key", "<b>Radical</b>：species with an unpaired electron（寫 Cl•）。<b>Homolytic fission</b>：共價鍵斷開，每邊攞一粒電子；需要 UV light。"],
          ["table", ["Step", "特徵", "CH₄ + Cl₂ 例子"], [
            ["Initiation", "0 radical → 2 radicals", "Cl₂ → 2Cl•（UV）"],
            ["Propagation", "1 radical in → 1 radical out", "CH₄ + Cl• → •CH₃ + HCl<br>•CH₃ + Cl₂ → CH₃Cl + Cl•"],
            ["Termination", "2 radicals → 0", "Cl• + •CH₃ → CH₃Cl；2•CH₃ → C₂H₆"],
          ]],
          ["rhyme", "口訣 1", "光開頭，一換一，二合一", "Alkanes 一般好 unreactive（strong C–C, C–H, non-polar），但 radical substitution 可以發生。"],
          ["trap", ["Propagation 寫成 CH₄ + Cl• → CH₃Cl + H• ✗（正確出 HCl + •CH₃）。", "漏寫 UV light 條件。"]],
        ],
      },
      {
        h: "Nucleophiles, electrophiles & Lewis（R3.4）",
        min: 3,
        blocks: [
          ["key", "<b>Heterolytic fission</b>：兩粒電子都去同一邊 → ions。<br><b>Nucleophile</b>：electron-rich，<b>donates a lone pair</b>（OH⁻, H₂O, NH₃, CN⁻）<br><b>Electrophile</b>：electron-deficient，<b>accepts an electron pair</b>（H⁺, NO₂⁺, δ+ Br in Br₂）"],
          ["rhyme", "口訣 2", "Nucleo 鍾意核（正），electro 鍾意電子", "Nucleophile 去攻擊 δ+ 碳；electrophile 去攻擊 C=C 嘅電子雲。"],
          ["key", "<b>Lewis acid</b> = electron-pair acceptor；<b>Lewis base</b> = electron-pair donor → 形成 <b>coordination bond</b>（e.g. BF₃ + NH₃ → H₃N→BF₃；Cu²⁺ + 6H₂O → [Cu(H₂O)₆]²⁺）"],
          ["trap", ["Nucleophile = Lewis base；electrophile = Lewis acid——definitions 一定要講 <b>electron pair</b>。", "Brønsted 講 H⁺；Lewis 講 electron pair，唔好混。"]],
        ],
      },
      {
        h: "Reactions 要識寫",
        min: 2.5,
        blocks: [
          ["table", ["反應", "類型", "例"], [
            ["halogenoalkane + OH⁻(aq)", "nucleophilic substitution", "CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻"],
            ["alkene + Br₂", "electrophilic addition", "C₂H₄ + Br₂ → CH₂BrCH₂Br（orange → colourless）"],
            ["alkene + HBr", "electrophilic addition", "C₂H₄ + HBr → CH₃CH₂Br"],
            ["alkene + H₂O (steam, H₃PO₄)", "electrophilic addition", "C₂H₄ + H₂O → C₂H₅OH"],
            ["alkane + Cl₂ (UV)", "radical substitution", "CH₄ + Cl₂ → CH₃Cl + HCl"],
          ]],
          ["eg", "點樣分 hexane 同 hex-1-ene？", ["加 bromine water、搖勻：hex-1-ene <b>orange → colourless</b>（electrophilic addition）；hexane 冇變化（喺黑暗中）✅"]],
          ["trap", ["Bromine water 由「clear」變 colourless ✗——要寫 colourless，唔係 clear。", "SL 寫 equation + 反應類型；curly-arrow mechanism（SN1/SN2）係 AHL。"]],
        ],
      },
    ],
    summary: [
      "Radical = unpaired electron；homolytic 一人一粒",
      "光開頭，一換一，二合一",
      "Nucleophile 畀電子對，electrophile 收電子對",
      "Lewis acid 收、Lewis base 畀 → coordination bond",
      "Halogenoalkane + OH⁻ = nucleophilic substitution",
      "Alkene + Br₂ = electrophilic addition，橙變無色",
    ],
    practice: [
      { q: "Write equations for the initiation and two propagation steps of the reaction of methane with bromine in UV light.", m: 3, a: "Br₂ → 2Br• [1]; CH₄ + Br• → •CH₃ + HBr [1]; •CH₃ + Br₂ → CH₃Br + Br• [1]." },
      { q: "Define nucleophile and give one example.", m: 2, a: "Species that donates a pair of electrons (to form a covalent bond) / electron-rich [1]; e.g. OH⁻, NH₃, H₂O, CN⁻ [1]." },
      { q: "Identify the Lewis acid and Lewis base in BF₃ + NH₃ → F₃B–NH₃, explaining your answer.", m: 2, a: "NH₃ is the Lewis base – donates its lone pair [1]; BF₃ is the Lewis acid – accepts the electron pair (B has incomplete octet) forming a coordination bond [1]." },
      { q: "State the reagent and condition to convert ethene into ethanol and the type of reaction.", m: 2, a: "Steam with (phosphoric) acid catalyst / high temperature and pressure [1]; electrophilic addition [1]." },
    ],
  },
});
