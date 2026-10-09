/* ⏱ 10-minute fast notes · Biology SL (2025 guide; format: see js/fastnotes.js). */
IB.addFast({
  "bio-1": {
    title: "Water 嘅特性 · DNA & RNA 結構 · Chargaff 計數",
    parts: [
      {
        h: "Water 水點解咁勁",
        min: 3,
        blocks: [
          ["key", "Water 係 <b>polar</b>：O 帶 δ−，H 帶 δ+ → 分子之間形成 <b>hydrogen bonds</b>。<br>水<b>所有</b>特性都由 H-bond 嚟 — 答題第一句就寫呢個。"],
          ["rhyme", "口訣 1", "極性生氫鍵，氫鍵生特性", "答 property 題：property → 點解（H-bond）→ 對生物有咩好處，三步各一分。"],
          ["table", ["Property（IB 字眼）", "原因", "對生物嘅用處"], [
            ["<b>Cohesion</b>", "水分子之間 H-bond", "xylem 入面成條水柱被拉上去（transpiration pull）；surface tension 俾昆蟲企喺水面"],
            ["<b>Adhesion</b>", "水同 polar/charged 表面 H-bond", "capillary action：xylem 壁、泥土、葉 cell wall"],
            ["<b>Solvent</b> properties", "polar/ionic 物質被水分子包住（hydrophilic）", "metabolism 喺水溶液進行；blood plasma 運輸 glucose、ions"],
            ["High <b>specific heat capacity</b>", "要打斷好多 H-bond 先升溫", "水溫穩定 → 水生 habitat 同體溫穩定"],
            ["High <b>latent heat of vaporisation</b>", "蒸發要打斷 H-bond，帶走大量熱", "sweating / transpiration 散熱"],
            ["Buoyancy · viscosity · thermal conductivity", "水比空氣密、黏、導熱", "水中動物（e.g. ringed seal）浮得起但游得辛苦、失熱快；空氣中（e.g. black-throated loon 飛行時）相反"],
          ]],
          ["eg", "Explain how sweating cools the body. [2]", [
            "Water has a <b>high latent heat of vaporisation</b>（因為要打斷 hydrogen bonds）[1]",
            "Evaporation of sweat <b>removes a lot of heat energy</b> from the skin surface → body cools [1]",
          ]],
          ["trap", [
            "水分子<b>之間</b>係 hydrogen bond；分子<b>入面</b> O–H 係 covalent bond。寫錯即刻冇分。",
            "Hydrophobic 物質（lipids）唔溶於水 — 要寫 “non-polar”，唔好寫 “水唔鍾意佢”。",
          ]],
        ],
      },
      {
        h: "DNA vs RNA 結構",
        min: 3,
        blocks: [
          ["key", "<b>Nucleotide</b> = pentose sugar + phosphate + nitrogenous base。<br>Sugar–phosphate <b>backbone</b> 用 covalent bonds 連住；兩條 strand 之間用 <b>hydrogen bonds</b>（complementary base pairing）連住。"],
          ["table", ["", "DNA", "RNA"], [
            ["Sugar", "deoxyribose", "ribose"],
            ["Bases", "A, T, C, G", "A, <b>U</b>, C, G"],
            ["Strands", "double helix, two <b>antiparallel</b> strands", "usually single-stranded"],
            ["功能", "儲存 genetic information", "mRNA / tRNA / rRNA 做 protein synthesis"],
          ]],
          ["rhyme", "口訣 2", "A 配 T，C 配 G；RNA 冇 T 用 U 嚟頂", "A–T（RNA 就 A–U），C–G。Purine（A, G）一定配 pyrimidine（C, T, U）。"],
          ["note", "畫 nucleotide：pentagon（sugar）→ phosphate（圓圈）接 C5 → base（長方形）接 C1。三樣都要 label。DNA 結構：鹼基排序（base sequence）就係 genetic code，排列組合無限 → 儲存量無限。"],
          ["trap", [
            "Antiparallel = 兩條 strand 方向相反（5'→3' 對 3'→5'），唔係 “parallel but upside down” 咁含糊。",
            "Distinguish DNA/RNA 要 <b>成對寫</b>：“DNA has deoxyribose <b>whereas</b> RNA has ribose”。",
          ]],
        ],
      },
      {
        h: "Chargaff 百分比計數",
        min: 2,
        blocks: [
          ["rhyme", "口訣 3", "A 等 T，C 等 G，扣咗一對再分半", "Double-stranded DNA：%A = %T，%C = %G。"],
          ["eg", "A sample of double-stranded DNA contains 18% thymine. Calculate the percentage of cytosine. [2]", [
            "T = A = 18% → A + T = 36% [M1]",
            "C + G = 100 − 36 = 64% → C = <b>32%</b> [A1]",
          ]],
          ["trap", ["Single-stranded RNA / virus DNA 唔跟 Chargaff rule — 題目講 single-stranded 就唔可以咁計。"]],
        ],
      },
    ],
    summary: [
      "極性生氫鍵，氫鍵生特性",
      "Cohesion 拉水柱，adhesion 爬管壁",
      "Specific heat 穩溫度，latent heat 散熱快",
      "Nucleotide 三件頭：sugar + phosphate + base",
      "A 配 T，C 配 G；RNA 冇 T 用 U 嚟頂",
      "兩條 strand 反方向 = antiparallel",
      "A 等 T，C 等 G，扣咗一對再分半",
    ],
    practice: [
      { q: "Outline how hydrogen bonding gives water its cohesive property and how this is used by plants.", m: 3, a: "Water is polar (δ− O, δ+ H) [1]; hydrogen bonds form between water molecules = cohesion [1]; allows a continuous column of water to be pulled up the xylem by transpiration (cohesion–tension) [1]" },
      { q: "State two differences between DNA and RNA.", m: 2, a: "Any two: deoxyribose vs ribose; thymine vs uracil; double-stranded vs single-stranded" },
      { q: "A DNA sample contains 31% guanine. Calculate the percentage of adenine.", m: 2, a: "C = 31% → C + G = 62% [M1]; A = (100 − 62) ÷ 2 = <b>19%</b> [A1]" },
      { q: "Explain why water is described as a good solvent for transport in blood.", m: 2, a: "Water is polar so it forms hydrogen bonds / attracts ions and polar molecules (hydrophilic) [1]; glucose, amino acids, ions dissolve in plasma and are carried around the body [1]" },
      { q: "Describe how the two strands of a DNA molecule are held together.", m: 2, a: "Hydrogen bonds between complementary bases [1]; A with T and C with G, strands antiparallel [1]" },
    ],
  },

  "bio-2": {
    title: "Microscopy · Magnification · Prokaryote vs Eukaryote",
    parts: [
      {
        h: "Magnification 計數",
        min: 3,
        blocks: [
          ["key", "\\(M = \\frac{I}{A}\\)　（magnification = image size ÷ actual size）<br><b>先換同一單位</b>：1 mm = 1000 µm；1 µm = 1000 nm"],
          ["rhyme", "口訣 1", "I AM 三角，單位先對齊", "遮住要求嗰個：I = A × M；A = I ÷ M；M = I ÷ A。mm 變 µm 就 ×1000。"],
          ["eg", "A cell measures 36 mm on a drawing magnified ×1200. Calculate its actual size in µm. [2]", [
            "36 mm = 36 000 µm [M1]",
            "A = 36 000 ÷ 1200 = <b>30 µm</b> [A1]",
          ]],
          ["eg", "A scale bar 20 mm long is labelled 5 µm. Calculate the magnification. [1]", [
            "20 mm = 20 000 µm → M = 20 000 ÷ 5 = <b>×4000</b>",
          ]],
          ["trap", [
            "唔換單位 → 答案差 1000 倍，係最常見失分位。",
            "Magnification 冇單位（寫 ×4000）；actual size 一定要有單位。",
            "<b>Resolution</b> ≠ magnification：resolution = 分辨兩點嘅能力。Electron microscope 贏喺 resolution（~0.2 nm vs light ~200 nm）。",
          ]],
        ],
      },
      {
        h: "Prokaryote vs Eukaryote",
        min: 3,
        blocks: [
          ["table", ["Feature", "Prokaryote（e.g. <i>E. coli</i>）", "Eukaryote"], [
            ["DNA", "naked, circular, 喺 <b>nucleoid</b>（+ plasmids）", "linear, with histones, 喺 <b>nucleus</b>"],
            ["Ribosomes", "<b>70S</b>", "<b>80S</b>（mitochondria/chloroplast 入面 70S）"],
            ["Membrane-bound organelles", "冇", "有（mitochondria, ER, Golgi…）"],
            ["Cell wall", "peptidoglycan", "plant cellulose / fungi chitin / animal 冇"],
            ["Size", "~1–5 µm", "~10–100 µm"],
          ]],
          ["key", "所有 cell 都有：<b>plasma membrane, cytoplasm, DNA, ribosomes</b>（common structures）。"],
          ["rhyme", "口訣 2", "原核七十冇核膜，真核八十樣樣有"],
          ["note", "Endosymbiosis：mitochondria & chloroplasts 有 70S ribosomes、circular DNA、double membrane、binary fission → 曾經係被吞咗嘅 prokaryote。"],
          ["trap", ["寫 “prokaryotes have no DNA” ❌ — 佢哋有 DNA，只係冇 nucleus。"]],
        ],
      },
      {
        h: "Plant · Animal · Fungi + Atypical cells",
        min: 2.5,
        blocks: [
          ["table", ["", "Plant", "Animal", "Fungi"], [
            ["Cell wall", "cellulose", "冇", "chitin"],
            ["Chloroplasts", "有", "冇", "冇"],
            ["Vacuole", "large permanent", "small, temporary", "有"],
            ["Centrioles", "冇", "有", "冇"],
            ["Energy store", "starch", "glycogen", "glycogen"],
          ]],
          ["note", "<b>Atypical cells</b>（挑戰 cell theory）：red blood cells（冇 nucleus）、phloem sieve tube members（冇 nucleus，靠 companion cell）、skeletal muscle fibres（multinucleate，好長）、aseptate fungal hyphae（冇 cross wall）。"],
          ["trap", ["Cell theory 三點：living things made of cells；cell = smallest unit of life；cells come from pre-existing cells。"]],
        ],
      },
    ],
    summary: [
      "I AM 三角，單位先對齊（mm ×1000 = µm）",
      "Magnification 冇單位，actual size 一定有",
      "Resolution 先係 EM 嘅真正優勢",
      "原核七十冇核膜，真核八十樣樣有",
      "植物 cellulose，真菌 chitin，動物冇牆",
      "怪細胞挑戰 cell theory：RBC、sieve tube、muscle fibre、aseptate hyphae",
    ],
    practice: [
      { q: "A mitochondrion is 2.5 µm long. On a micrograph it measures 50 mm. Calculate the magnification.", m: 2, a: "50 mm = 50 000 µm [M1]; 50 000 ÷ 2.5 = <b>×20 000</b> [A1]" },
      { q: "Distinguish between the genetic material of prokaryotic and eukaryotic cells.", m: 2, a: "Prokaryote: naked, circular DNA in nucleoid (plus plasmids) [1]; eukaryote: linear DNA associated with histones, inside a nucleus [1]" },
      { q: "State one structure found in plant cells but not in fungal cells, and one found in both.", m: 2, a: "Plant only: chloroplast / cellulose cell wall [1]; both: cell wall / vacuole / nucleus / mitochondria [1]" },
      { q: "Explain why skeletal muscle fibres are considered atypical cells.", m: 2, a: "They are multinucleate / very long (formed by fusion of cells) [1]; this does not fit the idea of a cell as a single unit with one nucleus [1]" },
    ],
  },

  "bio-3": {
    title: "Species · Classification tools · Evidence for evolution · Speciation",
    parts: [
      {
        h: "Species 物種 + 認物種工具",
        min: 3,
        blocks: [
          ["key", "<b>Biological species concept</b>：a group of organisms that can <b>interbreed</b> to produce <b>fertile offspring</b>。<br>限制：asexual organisms、fossils、hybrids（e.g. mule 不育）。"],
          ["rhyme", "口訣 1", "大楷屬名細楷種，斜體或者加底線", "Binomial：<i>Homo sapiens</i>。手寫 underline 兩個字。"],
          ["table", ["工具", "點用", "考咩"], [
            ["<b>Dichotomous key</b>", "每步兩個選擇，用睇得到嘅特徵", "跟住 key 認物種；自己整 key 要用 observable features，唔好用顏色/大小相對字眼"],
            ["<b>Karyotype</b>", "chromosomes 按 size 同 centromere 位置排對", "數 chromosome number、認性別、睇 trisomy"],
            ["Chromosome number", "同一 species 固定", "human 46 vs chimpanzee 48（chromosome 2 fusion）"],
            ["Genome size / DNA barcoding", "genome 大細同複雜程度冇關；eDNA 用 DNA 認環境中嘅 species", "data 題"],
          ]],
          ["trap", ["寫 binomial 冇斜體/冇底線、或者種名用大楷，都會冇分。"]],
        ],
      },
      {
        h: "Evidence for evolution 進化證據",
        min: 3,
        blocks: [
          ["table", ["Evidence", "點樣支持 evolution"], [
            ["<b>DNA / amino acid sequences</b>", "sequence 越似 → common ancestor 越近"],
            ["<b>Homologous structures</b>（pentadactyl limb）", "同一基本結構、唔同功能 → common ancestry（divergent）"],
            ["<b>Analogous structures</b>（bird vs insect wing）", "同功能、唔同來源 → <b>convergent evolution</b>"],
            ["<b>Selective breeding</b>（狗、粟米、椰菜家族）", "人工選擇幾代就有巨大變化 → natural selection 長時間都得"],
          ]],
          ["rhyme", "口訣 2", "同源同骨唔同用，同功同用唔同宗"],
          ["eg", "Explain how the pentadactyl limb provides evidence for evolution. [3]", [
            "Bat wing, whale flipper, human arm share the same arrangement of bones（one bone, two bones, wrist bones, five digits）[1]",
            "but are used for different functions（flying, swimming, grasping）[1]",
            "best explained by descent from a <b>common ancestor</b>, with natural selection adapting the limb（divergent evolution）[1]",
          ]],
        ],
      },
      {
        h: "Speciation 新物種點樣出現",
        min: 2.5,
        blocks: [
          ["key", "Speciation 鏈：<b>population split → reproductive isolation（no gene flow）→ different selection pressures → divergence → can no longer interbreed</b>"],
          ["rhyme", "口訣 3", "分開、斷流、各自選、唔再配"],
          ["table", ["", "Allopatric", "Sympatric"], [
            ["隔離方法", "geographical barrier（山、海、河）", "同一地方：behavioural / temporal isolation"],
            ["例子", "島上 populations 分化", "唔同求偶叫聲 / 唔同開花季節"],
          ]],
          ["trap", [
            "唔好寫 “organisms adapt to become a new species” — 係 <b>population</b> 經過好多代進化。",
            "淨係 “separated” 唔夠，一定要寫 <b>no gene flow</b> 同 <b>different selection pressures</b>。",
          ]],
        ],
      },
    ],
    summary: [
      "Species = interbreed + fertile offspring",
      "大楷屬名細楷種，斜體或者加底線",
      "Key 用睇得到嘅特徵，karyotype 數染色體",
      "Sequence 越似，祖先越近",
      "同源同骨唔同用，同功同用唔同宗",
      "分開、斷流、各自選、唔再配",
    ],
    practice: [
      { q: "Outline one limitation of the biological species concept.", m: 1, a: "Cannot be applied to asexually reproducing organisms / fossils / some species form fertile hybrids" },
      { q: "Distinguish between homologous and analogous structures.", m: 2, a: "Homologous: same basic structure from a common ancestor, may have different functions [1]; analogous: similar function but different structure/origin, from convergent evolution [1]" },
      { q: "Explain how selective breeding provides evidence for evolution.", m: 2, a: "Humans selected individuals with desired traits to breed over many generations, producing large changes from the wild ancestor [1]; shows that selection can change species, so natural selection over longer time could produce new species [1]" },
      { q: "Explain how a population separated by a mountain range could become two species.", m: 4, a: "Geographical barrier prevents interbreeding / no gene flow [1]; different environments → different selection pressures [1]; mutations / allele frequencies change independently, populations diverge [1]; eventually reproductively isolated — cannot produce fertile offspring together (allopatric speciation) [1]" },
    ],
  },

  "bio-4": {
    title: "Biodiversity crisis · Population sampling · Chi-squared · Interactions",
    parts: [
      {
        h: "Biodiversity & conservation",
        min: 2,
        blocks: [
          ["key", "Biodiversity 三個 level：<b>ecosystem · species · genetic</b>。而家係人類造成嘅 <b>sixth mass extinction</b>。"],
          ["rhyme", "口訣 1（威脅五大）", "屋、搶、污、侵、熱", "Habitat loss（屋）、overexploitation（搶）、pollution（污）、invasive species（侵）、climate change（熱）。"],
          ["table", ["In situ（原地）", "Ex situ（離地）"], [
            ["nature reserves, national parks, rewilding, 移除 invasive species", "zoos, botanic gardens, <b>seed banks</b>, captive breeding"],
            ["保留成個 ecosystem 同自然行為", "保存 genetic diversity，可以 reintroduce；但 gene pool 細"],
          ]],
          ["trap", ["EDGE species（Evolutionarily Distinct and Globally Endangered）可以用嚟決定保育優先次序。"]],
        ],
      },
      {
        h: "Population size 點估",
        min: 2.5,
        blocks: [
          ["table", ["方法", "用喺", "要點"], [
            ["<b>Random quadrat sampling</b>", "sessile（植物、藤壺）", "random coordinates；平均每 quadrat × 總面積"],
            ["<b>Capture–mark–release–recapture</b>", "會走嘅動物", "Lincoln index"],
          ]],
          ["key", "Lincoln index：\\(N = \\frac{M \\times n}{m}\\)　M = 第一次標記數，n = 第二次捉到總數，m = 第二次入面有標記嘅"],
          ["rhyme", "口訣 2", "頭次乘二次，除返重遇嘅"],
          ["eg", "40 snails marked. Later 50 caught, 8 of them marked. Estimate N. [2]", [
            "N = 40 × 50 ÷ 8 [M1]　= <b>250</b> [A1]",
          ]],
          ["note", "Assumptions：no births/deaths/migration；marks not lost & don't affect survival；marked ones mix randomly。Sigmoid curve：exponential → transitional → plateau at <b>carrying capacity</b>（density-dependent factors：competition, predation, disease = negative feedback）。"],
        ],
      },
      {
        h: "Chi-squared test for association",
        min: 3,
        blocks: [
          ["key", "\\(\\chi^2 = \\sum \\frac{(O-E)^2}{E}\\)　Expected = \\(\\frac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}\\)　df = (rows − 1)(columns − 1)"],
          ["rhyme", "口訣 3", "大過 critical，拒絕 H₀，有關連", "H₀：兩個 species 嘅分佈 <b>冇 association</b>（independent）。"],
          ["eg", "50 quadrats: A + B together 20, A only 5, B only 5, neither 20. Test for association (critical value 3.84, p = 0.05). [4]", [
            "Totals: A present 25, B present 25, N = 50 → every E = 25 × 25 ÷ 50 = <b>12.5</b> [1]",
            "Each (O − E)²/E = 7.5² ÷ 12.5 = 4.5 → χ² = 4 × 4.5 = <b>18</b> [1]",
            "df = (2−1)(2−1) = <b>1</b> [1]",
            "18 &gt; 3.84 → reject H₀：<b>significant positive association</b>（一齊出現多過預期）[1]",
          ]],
          ["trap", [
            "Expected 用 totals 計，唔係就咁除 4。",
            "Association ≠ causation；結論要寫 “significant at p = 0.05”。",
          ]],
        ],
      },
      {
        h: "Community interactions",
        min: 1.5,
        blocks: [
          ["table", ["Interaction", "例子"], [
            ["Mutualism（+/+）", "root nodule <i>Rhizobium</i>、mycorrhizae、coral 同 zooxanthellae"],
            ["Parasitism（+/−）", "malaria <i>Plasmodium</i>、tapeworm"],
            ["Predation / herbivory", "lynx–hare 數量循環"],
            ["Interspecific competition", "red vs grey squirrel"],
          ]],
          ["note", "Top-down（predator 控制）vs bottom-up（食物/資源控制）。Keystone species 影響不成比例（sea otter → sea urchin → kelp）。"],
        ],
      },
    ],
    summary: [
      "三層多樣性：ecosystem、species、genes",
      "屋、搶、污、侵、熱",
      "In situ 保生境，ex situ 保基因",
      "頭次乘二次，除返重遇嘅",
      "Expected = 行總 × 列總 ÷ 大總",
      "大過 critical，拒絕 H₀，有關連",
      "Plateau = carrying capacity，靠 negative feedback",
    ],
    practice: [
      { q: "In a study, 60 beetles were marked. In a second sample of 45, 9 were marked. Estimate the population size and state one assumption.", m: 3, a: "60 × 45 ÷ 9 [M1] = <b>300</b> [A1]; assumption e.g. no migration/births/deaths between samples / marks not lost [1]" },
      { q: "State the null hypothesis for a chi-squared test of association between two plant species.", m: 1, a: "There is no association between the distributions of the two species (they are distributed independently)" },
      { q: "A chi-squared value of 2.1 was obtained with 1 degree of freedom (critical value 3.84). State the conclusion.", m: 2, a: "2.1 &lt; 3.84 so accept / fail to reject H₀ [1]; no significant association between the species at p = 0.05 [1]" },
      { q: "Compare in situ and ex situ conservation.", m: 3, a: "Both aim to prevent extinction / keep genetic diversity [1]; in situ protects species in natural habitat with whole ecosystem [1]; ex situ outside habitat (zoo, seed bank), smaller gene pool, can be used for reintroduction [1]" },
      { q: "Explain why a population stops growing when it reaches carrying capacity.", m: 2, a: "Density-dependent factors (competition for resources, predation, disease) increase as population rises [1]; birth rate = death rate, negative feedback keeps size stable [1]" },
    ],
  },

  "bio-5": {
    title: "Condensation · Carbohydrates · Lipids · Proteins",
    parts: [
      {
        h: "Condensation vs Hydrolysis + Carbohydrates",
        min: 3,
        blocks: [
          ["rhyme", "口訣 1", "砌嘢甩水，拆嘢加水", "<b>Condensation</b>：monomers 連埋，釋放 H₂O。<b>Hydrolysis</b>：加 H₂O 拆開 bond。"],
          ["table", ["Polysaccharide", "Monomer", "結構", "功能"], [
            ["Amylose（starch）", "α-glucose", "1,4 linkages，螺旋形", "植物 energy store，compact"],
            ["Amylopectin / <b>glycogen</b>", "α-glucose", "1,4 + 1,6 → branched（glycogen 更多分支）", "好多端點 → 快速加減 glucose"],
            ["<b>Cellulose</b>", "β-glucose", "直鏈、相鄰 glucose 倒轉，鏈之間 H-bond → microfibrils", "cell wall，好高 tensile strength"],
          ]],
          ["note", "α vs β glucose：C1 嘅 OH — α 喺下，β 喺上。Starch/glycogen insoluble → 唔影響 osmosis。<b>Glycoproteins</b>：cell–cell recognition（ABO blood group antigens）。"],
          ["trap", ["寫 “starch is made of glucose” 唔夠 — 要寫 <b>α-glucose</b>；cellulose 寫 <b>β-glucose</b>。"]],
        ],
      },
      {
        h: "Lipids 脂類",
        min: 2.5,
        blocks: [
          ["key", "<b>Triglyceride</b> = glycerol + 3 fatty acids（3 個 ester bonds，condensation 甩 3 粒水）<br><b>Phospholipid</b> = glycerol + 2 fatty acids + phosphate → hydrophilic head + hydrophobic tails → <b>bilayer</b>"],
          ["table", ["", "Saturated", "Unsaturated"], [
            ["C=C double bonds", "冇", "有（cis 會整個 kink）"],
            ["室溫", "solid（動物脂肪）", "liquid（植物油）"],
          ]],
          ["rhyme", "口訣 2", "脂肪一克頂兩克糖，又輕又保暖", "Lipid 每克 energy 約 carbohydrate 兩倍 → 輕身儲能；adipose tissue 仲有 thermal insulation。"],
          ["note", "Steroids（cholesterol、oestrogen、testosterone）= 四個 fused rings，hydrophobic → 穿過 membrane。"],
        ],
      },
      {
        h: "Proteins 蛋白質",
        min: 3,
        blocks: [
          ["key", "Amino acid：amine（NH₂）+ carboxyl（COOH）+ H + <b>R group</b>，連住同一粒 C。<br>Amino acids 用 <b>peptide bond</b> 連（condensation）。20 種 amino acids → 排列無限 → protein 無限多款。"],
          ["rhyme", "口訣 3", "n 粒氨基酸，n − 1 粒水", "整一條 polypeptide 甩出嘅水 = peptide bonds 數目 = n − 1。"],
          ["eg", "How many water molecules are released when a polypeptide of 150 amino acids is formed? [1]", ["150 − 1 = <b>149</b>"]],
          ["table", ["概念", "要記"], [
            ["Essential amino acids", "身體整唔到，要由食物攝取"],
            ["R groups", "polar / non-polar / charged → 決定 folding 同功能"],
            ["<b>Denaturation</b>", "heat 或 extreme pH 打斷維持 3D shape 嘅 bonds → shape 變 → 失去功能（通常 irreversible）"],
          ]],
          ["trap", [
            "Denaturation 唔會打斷 peptide bonds（primary structure 不變）。",
            "Proteins 唔會 “die”；enzymes 唔係 “killed”。",
          ]],
        ],
      },
    ],
    summary: [
      "砌嘢甩水，拆嘢加水",
      "α 儲能（starch、glycogen），β 起牆（cellulose）",
      "Glycogen 最多分支，最快放糖",
      "Triglyceride 三條尾，phospholipid 兩條尾一個頭",
      "脂肪一克頂兩克糖，又輕又保暖",
      "n 粒氨基酸，n − 1 粒水",
      "Denature = 形變 → 功能冇",
    ],
    practice: [
      { q: "Distinguish between the structure of amylose and cellulose.", m: 2, a: "Amylose: α-glucose, helical chain [1]; cellulose: β-glucose, straight chains with alternate glucose inverted, linked by hydrogen bonds into microfibrils [1]" },
      { q: "State the products of the complete hydrolysis of a triglyceride.", m: 1, a: "Glycerol and three fatty acids" },
      { q: "Explain why phospholipids form bilayers in water.", m: 3, a: "Phosphate head is hydrophilic, fatty acid tails hydrophobic [1]; heads face water on both sides [1]; tails point inward, away from water [1]" },
      { q: "Outline why triglycerides are used for long-term energy storage in animals.", m: 2, a: "Release about twice as much energy per gram as carbohydrate — lighter store [1]; insoluble / do not affect osmosis; also give thermal insulation [1]" },
      { q: "Explain how a change in pH can affect the function of a protein.", m: 3, a: "Changes charges on R groups [1]; ionic/hydrogen bonds holding the 3D shape break [1]; shape changes (denaturation) so it can no longer bind / function [1]" },
    ],
  },

  "bio-6": {
    title: "Membranes & Transport · Organelles · SA:V & Specialisation",
    parts: [
      {
        h: "Fluid mosaic model + transport",
        min: 3.5,
        blocks: [
          ["key", "<b>Fluid mosaic</b>：phospholipid bilayer + integral & peripheral proteins + cholesterol（調 fluidity）+ glycoproteins/glycolipids（recognition）。Hydrophobic core 擋住 ions 同 polar molecules。"],
          ["table", ["Transport", "方向", "要 ATP？", "用咩"], [
            ["Simple diffusion", "高 → 低", "唔使", "直接穿 bilayer（O₂, CO₂, 細 non-polar）"],
            ["Facilitated diffusion", "高 → 低", "唔使", "<b>channel</b>（e.g. K⁺ channel）/ <b>carrier</b> proteins"],
            ["Osmosis", "水：低 solute → 高 solute", "唔使", "aquaporins（同 bilayer）"],
            ["<b>Active transport</b>", "低 → 高（against gradient）", "要", "<b>pump proteins</b>（Na⁺/K⁺ pump：3 Na⁺ out, 2 K⁺ in）"],
            ["Endocytosis / exocytosis", "大量/大粒", "要", "vesicles（membrane fluidity）"],
          ]],
          ["rhyme", "口訣 1", "順流唔使錢，逆流要畀 ATP"],
          ["trap", [
            "Osmosis 只係<b>水</b>郁，唔好寫 solute 郁。",
            "Active transport 要寫齊：<b>against concentration gradient + pump protein + ATP</b>。",
          ]],
        ],
      },
      {
        h: "Organelles & compartmentalisation",
        min: 2,
        blocks: [
          ["table", ["Organelle", "功能"], [
            ["Nucleus（double membrane, pores）", "儲 DNA；transcription 同 translation 分開"],
            ["Mitochondria", "aerobic respiration → ATP"],
            ["Chloroplast", "photosynthesis"],
            ["Rough ER → Golgi → vesicles", "製造 → 修飾包裝 → 運走/分泌 proteins"],
            ["Lysosome", "hydrolytic enzymes，消化"],
          ]],
          ["rhyme", "口訣 2", "分房住，各自做，有毒嘢鎖埋一間", "Compartmentalisation：enzymes 同 substrate 集中；唔夾嘅反應分開；唔同 pH；有害 enzymes 隔離。"],
        ],
      },
      {
        h: "SA:V ratio + Specialisation",
        min: 3,
        blocks: [
          ["key", "Cube 邊長 l：SA = 6l²，V = l³，SA:V = 6/l : 1 → <b>細胞越大，SA:V 越細</b> → exchange 追唔上需要 → 細胞要分裂或改形狀（microvilli、扁平）。"],
          ["eg", "Calculate SA:V for a cube-shaped cell of side 3 µm. [2]", [
            "SA = 6 × 9 = 54 µm²；V = 27 µm³ [M1]",
            "SA:V = 54 ÷ 27 = <b>2 : 1</b> [A1]",
          ]],
          ["table", ["Stem cell", "可以變成"], [
            ["Totipotent（zygote）", "任何 cell 包括胎盤"],
            ["Pluripotent（embryo）", "身體任何 cell type"],
            ["Multipotent（adult, e.g. bone marrow）", "幾種相關 cell"],
          ]],
          ["note", "Specialised cells：type I pneumocytes（極薄 → gas exchange）、type II（surfactant）、red blood cells、sperm（flagellum, mitochondria, acrosome）vs egg（大、food reserves）。Differentiation = 開咗唔同 genes（gene expression）。"],
        ],
      },
    ],
    summary: [
      "Fluid mosaic：bilayer + proteins + cholesterol",
      "順流唔使錢，逆流要畀 ATP",
      "Channel 開門，carrier 轉身，pump 食 ATP",
      "分房住，各自做，有毒嘢鎖埋一間",
      "越大越慘：SA:V 細，交換慢",
      "Toti 樣樣得，pluri 身體得，multi 少少得",
    ],
    practice: [
      { q: "Distinguish between facilitated diffusion and active transport.", m: 2, a: "Facilitated: down the gradient, via channel/carrier proteins, no ATP [1]; active: against the gradient, via pump proteins using ATP [1]" },
      { q: "Calculate the SA:V ratio of a cube-shaped cell with side 5 µm.", m: 2, a: "SA = 150 µm², V = 125 µm³ [M1]; 1.2 : 1 [A1]" },
      { q: "Outline the role of cholesterol in animal cell membranes.", m: 2, a: "Fits between phospholipids / restricts movement of fatty acid tails [1]; regulates fluidity — prevents membrane being too fluid at high temperature or too rigid at low temperature [1]" },
      { q: "Outline two advantages of compartmentalisation in a eukaryotic cell.", m: 2, a: "Enzymes and substrates concentrated / efficient [1]; incompatible reactions or harmful enzymes (lysosomes) separated / different pH maintained [1]" },
    ],
  },

  "bio-7": {
    title: "Gas exchange · Ventilation · Blood vessels · Water transport in plants",
    parts: [
      {
        h: "Gas exchange surfaces + Lungs",
        min: 3,
        blocks: [
          ["rhyme", "口訣 1（好 exchange surface 四寶）", "薄、濕、大、斜", "<b>Thin</b>（short diffusion distance）、<b>moist</b>、<b>large surface area</b>、<b>steep concentration gradient</b>（靠 ventilation + blood flow 維持）。"],
          ["table", ["吸氣 Inhalation", "呼氣 Exhalation（安靜時）"], [
            ["External intercostals + diaphragm <b>contract</b>", "佢哋 relax（用力呼氣先用 internal intercostals + abdominal muscles）"],
            ["Ribcage up & out；diaphragm 變平", "Ribcage down & in；diaphragm 拱返上"],
            ["Thorax volume ↑ → pressure ↓", "Volume ↓ → pressure ↑"],
            ["Air flows <b>in</b>（down pressure gradient）", "Air flows <b>out</b>"],
          ]],
          ["rhyme", "口訣 2", "肌肉 → 體積 → 壓力 → 氣流", "每一步一分，順序寫晒。"],
          ["note", "Lung volumes（spirometer）：<b>tidal volume</b> = 一啖正常呼吸；<b>vital capacity</b> = TV + IRV + ERV（最大吸 → 最大呼）。Alveoli：type I pneumocytes 極薄；type II 分泌 <b>surfactant</b>（減 surface tension，防止黐埋）；dense capillary network。"],
          ["trap", ["唔好寫 “lungs inflate and suck air in” — 係 pressure 差令空氣流入。"]],
        ],
      },
      {
        h: "Leaves · Transpiration · Stomatal density",
        min: 2.5,
        blocks: [
          ["key", "Leaf：waxy cuticle → palisade mesophyll → <b>spongy mesophyll（air spaces）</b> → stomata + guard cells（下表皮多）。<br><b>Transpiration</b> = water vapour 由葉（stomata）流失；係 gas exchange 嘅代價。"],
          ["table", ["Factor ↑", "Transpiration rate", "點解"], [
            ["Temperature", "↑", "evaporation & diffusion 快"],
            ["Humidity", "↓", "concentration gradient 細咗"],
            ["Wind", "↑", "吹走葉面濕氣，gradient 斜咗"],
            ["Light", "↑", "stomata 打開"],
          ]],
          ["eg", "24 stomata seen in a field of view of diameter 0.4 mm. Calculate stomatal density. [2]", [
            "Area = πr² = π × 0.2² = 0.126 mm² [M1]",
            "Density = 24 ÷ 0.126 ≈ <b>191 stomata mm⁻²</b> [A1]",
          ]],
          ["trap", ["Potometer 量嘅係 <b>water uptake</b>，唔係真正 water loss。"]],
        ],
      },
      {
        h: "Blood vessels + Xylem",
        min: 3,
        blocks: [
          ["table", ["", "Artery", "Vein", "Capillary"], [
            ["Wall", "厚，多 muscle + elastic fibres", "薄", "one cell thick（endothelium）"],
            ["Lumen", "窄", "闊", "好窄（單排 RBC）"],
            ["Valves", "冇", "有", "冇"],
            ["Pressure", "高、有 pulse", "低", "低；有 fenestrations → exchange"],
          ]],
          ["rhyme", "口訣 3", "動脈厚牆頂高壓，靜脈闊管靠活門"],
          ["note", "<b>Coronary occlusion</b>：coronary artery 被 fatty plaque（atherosclerosis）+ clot 塞住 → 心肌缺 O₂。Risk factors：smoking、high blood pressure、high LDL cholesterol、obesity、lack of exercise。Pulse rate：radial / carotid artery 數 30 s × 2。"],
          ["key", "Xylem：dead, hollow, <b>lignified</b> vessels（頂得住 tension）、冇 end walls、pits。<br>Cohesion–tension：stomata 蒸發 → 拉低 xylem pressure（tension）→ cohesion 令水柱唔斷 → adhesion 黐住管壁。"],
          ["note", "Distribution：dicot stem 嘅 vascular bundles 排成圈（xylem 向內、phloem 向外）；root 嘅 xylem 喺中心（star shape）。"],
        ],
      },
    ],
    summary: [
      "薄、濕、大、斜",
      "肌肉 → 體積 → 壓力 → 氣流",
      "Vital capacity = TV + IRV + ERV",
      "熱、風、光↑ 蒸騰快；濕度↑ 蒸騰慢",
      "動脈厚牆頂高壓，靜脈闊管靠活門",
      "蒸發拉，cohesion 連，lignin 撐",
    ],
    practice: [
      { q: "Explain how the alveoli are adapted for efficient gas exchange.", m: 3, a: "Large total surface area (many alveoli) [1]; walls one cell thick / type I pneumocytes — short diffusion distance [1]; dense capillary network + ventilation keep steep gradient / surfactant keeps moist and prevents collapse [1]" },
      { q: "Outline the changes that cause air to leave the lungs during forced exhalation.", m: 3, a: "Internal intercostal and abdominal muscles contract [1]; ribcage moves down/in and diaphragm pushed up — thorax volume decreases [1]; pressure increases above atmospheric so air flows out [1]" },
      { q: "Predict and explain the effect of increased humidity on transpiration rate.", m: 2, a: "Rate decreases [1]; smaller water vapour concentration gradient between air spaces and outside air, so slower diffusion out of stomata [1]" },
      { q: "Explain how the structure of a vein is related to its function.", m: 2, a: "Wide lumen — less resistance to low-pressure blood flow [1]; valves prevent backflow [1]" },
      { q: "State two causes of coronary occlusion.", m: 2, a: "Any two: atherosclerosis / fatty plaque; blood clot; smoking; high blood pressure; high cholesterol/fat diet; obesity" },
    ],
  },

  "bio-8": {
    title: "Habitats & Adaptation · Tolerance · Modes of nutrition · Niches",
    parts: [
      {
        h: "Habitat, tolerance & adaptation",
        min: 3,
        blocks: [
          ["key", "每個 species 對每個 abiotic factor（temperature, water, light, pH, salinity）都有 <b>range of tolerance</b>；分佈受最窄嗰個限制。"],
          ["rhyme", "口訣 1", "耐唔耐得住，決定住唔住得"],
          ["table", ["環境", "例子", "Adaptations"], [
            ["Sand dune（xerophyte）", "marram grass", "rolled leaves、sunken stomata、hairs → trap humid air；thick waxy cuticle；deep roots"],
            ["Desert", "cactus", "spines（細 SA）、water storage tissue、CAM（夜晚開 stomata）"],
            ["Mangrove（halophyte）", "mangrove", "salt glands、pneumatophores（呼吸根）"],
            ["Coral reef 條件", "hard corals", "要 clear, shallow, warm（~23–29 °C）、salinity 穩定、pH 穩定"],
          ]],
          ["trap", ["Adaptation 題：<b>structure → how it works → 點樣幫佢喺嗰個環境生存</b>，唔好淨係列特徵。"]],
        ],
      },
      {
        h: "Modes of nutrition 營養方式",
        min: 3,
        blocks: [
          ["table", ["類型", "能量/碳來源", "例子"], [
            ["Photoautotroph", "light；CO₂", "plants, algae"],
            ["Chemoautotroph", "氧化無機物（e.g. Fe²⁺, H₂S）", "某啲 archaea / bacteria"],
            ["Holozoic heterotroph", "食落肚再消化", "animals"],
            ["Saprotroph", "分泌 enzymes 喺體外消化死物再吸收", "fungi, bacteria"],
            ["<b>Mixotroph</b>", "兩樣都得", "<i>Euglena</i>"],
          ]],
          ["rhyme", "口訣 2", "自己煮係 auto，搵人食係 hetero，兩樣都做係 mixo"],
          ["note", "O₂ 需要：obligate aerobes（一定要 O₂）、obligate anaerobes（O₂ 會毒死）、facultative anaerobes（有冇都得）。Archaea 好多樣化，好多係 chemoautotroph，住喺極端環境。"],
        ],
      },
      {
        h: "Feeding adaptations + Niche",
        min: 2.5,
        blocks: [
          ["table", ["主題", "例子"], [
            ["Herbivore adaptations", "insects 嘅 piercing mouthparts（aphids）、grinding molars"],
            ["Plant defences", "toxins / secondary compounds、spines、thorns"],
            ["Predator vs prey", "predators：speed, camouflage, venom；prey：camouflage, warning colouration, toxins"],
            ["Hominidae teeth", "牙齒形態（molars, canines）反映 diet → 化石推斷食咩"],
          ]],
          ["key", "<b>Ecological niche</b> = species 嘅 role：habitat + 用咩資源 + 同其他 species 嘅 interactions。<br>Fundamental niche（冇競爭時可以用嘅全部）vs realised niche（有競爭時實際用嘅）。Competitive exclusion：兩個 species 唔可以長期共用同一個 niche。"],
          ["trap", ["Niche ≠ habitat；habitat 只係 “住喺邊”。"]],
        ],
      },
    ],
    summary: [
      "耐唔耐得住，決定住唔住得",
      "Xerophyte：卷葉、陷氣孔、厚蠟、深根",
      "自己煮係 auto，搵人食係 hetero，兩樣都做係 mixo",
      "Saprotroph 體外消化死物",
      "Niche = 住邊 + 食咩 + 同邊個玩",
      "Fundamental 係理想，realised 係現實",
    ],
    practice: [
      { q: "Explain two adaptations of marram grass to sand dunes.", m: 4, a: "Rolled leaves [1] trap humid air / reduce water vapour gradient, less transpiration [1]; sunken stomata / hairs / thick waxy cuticle [1] reduce water loss / deep roots reach water [1]" },
      { q: "Distinguish between a saprotroph and a holozoic heterotroph.", m: 2, a: "Saprotroph secretes enzymes onto dead matter and absorbs products (external digestion) [1]; holozoic ingests food then digests internally [1]" },
      { q: "State what is meant by a mixotroph, with an example.", m: 2, a: "Organism that can be autotrophic and heterotrophic [1]; e.g. <i>Euglena</i> [1]" },
      { q: "Outline the abiotic conditions needed for hard coral reefs.", m: 3, a: "Warm water (~23–29 °C) [1]; shallow, clear water so light reaches zooxanthellae [1]; stable salinity / pH [1]" },
    ],
  },

  "bio-9": {
    title: "Enzymes · Factors affecting rate · Metabolism",
    parts: [
      {
        h: "Enzyme 點樣做嘢",
        min: 3,
        blocks: [
          ["key", "Enzymes = globular proteins = biological <b>catalysts</b>，<b>lower activation energy</b>。<br>Substrate 撞入 <b>active site</b>（shape + chemistry complementary）→ enzyme–substrate complex → products。"],
          ["rhyme", "口訣 1", "隨機亂撞，撞啱就配", "Molecular motion：substrate 同 enzyme 隨機碰撞（collisions），方向啱先 bind。"],
          ["note", "<b>Induced fit</b>：substrate bind 時 active site 會輕微變形，fit 得更貼 → 削弱 substrate 嘅 bonds。Metabolism = 所有 enzyme-catalysed reactions；<b>anabolism</b>（砌大分子，e.g. protein synthesis, photosynthesis）vs <b>catabolism</b>（拆，e.g. digestion, respiration）。"],
          ["trap", [
            "Enzyme 唔會 “used up”；亦唔係 “alive”，所以唔會 “die / killed”。",
            "Activation energy 係 “lowered”，唔好寫 “provides energy”。",
          ]],
        ],
      },
      {
        h: "三大因素 + 圖表描述",
        min: 3.5,
        blocks: [
          ["table", ["Factor", "圖形", "解釋"], [
            ["Temperature", "慢慢升 → optimum → <b>急跌</b>", "升：kinetic energy ↑ → collisions 多；過 optimum：H-bonds/ionic bonds 斷 → active site 變形 → <b>denatured</b>"],
            ["pH", "倒 V（每隻 enzyme 唔同 optimum，pepsin ~2）", "R group charges 改變 → bonds 斷 → active site 變形"],
            ["Substrate concentration", "升 → <b>plateau</b>", "所有 active sites 都 occupied（saturated），enzyme 變 limiting"],
          ]],
          ["rhyme", "口訣 2", "熱過頭變形，酸鹼亂電荷，塞滿就平頂"],
          ["eg", "In a catalase experiment 24 cm³ of O₂ was collected in 40 s. Calculate the mean rate. [2]", [
            "24 ÷ 40 [M1] = <b>0.6 cm³ s⁻¹</b> [A1]（單位要寫！）",
          ]],
          ["note", "量 rate：product 出現速度（O₂ 體積、顏色變化）或 substrate 消失速度；初速用 graph 開頭嘅 <b>tangent</b> gradient。控制變量：temperature（water bath）、pH（buffer）、enzyme concentration。"],
          ["trap", [
            "Describe 圖：trend + <b>引數據（optimum 數值同單位）</b> + 轉變位。",
            "低溫唔會 denature，只係慢（collisions 少）。",
          ]],
        ],
      },
      {
        h: "Inhibition 抑制（延伸）",
        min: 1.5,
        blocks: [
          ["table", ["", "Competitive", "Non-competitive"], [
            ["Bind 邊度", "active site", "其他位置（allosteric site）"],
            ["加多 substrate", "可以 overcome", "唔可以"],
          ]],
          ["note", "End-product inhibition：最尾嘅 product 抑制 pathway 第一隻 enzyme → negative feedback 控制。"],
        ],
      },
    ],
    summary: [
      "Enzyme 降 activation energy，自己唔使用完",
      "隨機亂撞，撞啱就配",
      "Induced fit：入嚟先變形貼身",
      "熱過頭變形，酸鹼亂電荷，塞滿就平頂",
      "Rate = 量 ÷ 時間，記得單位",
      "Anabolism 砌，catabolism 拆",
    ],
    practice: [
      { q: "Explain why the rate of an enzyme-catalysed reaction increases as temperature rises from 10 °C to 30 °C.", m: 2, a: "Molecules gain kinetic energy / move faster [1]; more frequent successful collisions between substrate and active site [1]" },
      { q: "Describe the effect of substrate concentration on enzyme activity.", m: 3, a: "At low concentration rate increases (proportionally) with substrate concentration [1]; rate increase slows [1]; reaches a plateau when active sites are saturated / enzyme concentration limiting [1]" },
      { q: "Outline the induced-fit model of enzyme action.", m: 2, a: "Active site is not a perfect fit initially; it changes shape as substrate binds [1]; this strains bonds in the substrate, lowering activation energy [1]" },
      { q: "Distinguish between anabolism and catabolism.", m: 2, a: "Anabolism: building complex molecules from simpler ones, requires energy (e.g. protein synthesis) [1]; catabolism: breaking down complex molecules, releases energy (e.g. digestion / respiration) [1]" },
    ],
  },

  "bio-10": {
    title: "ATP · Respiration · Photosynthesis · Limiting factors",
    parts: [
      {
        h: "ATP + Cell respiration",
        min: 3,
        blocks: [
          ["key", "<b>ATP → ADP + Pi</b> 釋放 energy（active transport、muscle contraction、synthesis）。Respiration 用 glucose（或 lipids）<b>釋放</b> energy 去整 ATP。"],
          ["table", ["", "Aerobic", "Anaerobic（human）", "Anaerobic（yeast）"], [
            ["要 O₂？", "要", "唔使", "唔使"],
            ["Products", "CO₂ + H₂O", "<b>lactate</b>", "<b>ethanol + CO₂</b>"],
            ["ATP yield", "大（~30+ per glucose）", "細（2）", "細（2）"],
            ["地方", "cytoplasm + <b>mitochondria</b>", "cytoplasm", "cytoplasm"],
          ]],
          ["rhyme", "口訣 1", "人做乳酸，酵母做酒加氣"],
          ["note", "Lipids 都可以做 respiratory substrate（每克 energy 多啲，但要 O₂，唔可以 anaerobic）。<b>Respirometer</b>：KOH / soda lime 吸 CO₂ → 液滴移動 = O₂ uptake；要有 control（死種子 / 玻璃珠）同 water bath。"],
          ["eg", "In a respirometer the droplet moved 30 mm in 10 min in a capillary of radius 0.5 mm. Calculate the rate of O₂ uptake. [2]", [
            "Volume = πr²h = π × 0.5² × 30 = 23.6 mm³ [M1]",
            "Rate = 23.6 ÷ 10 = <b>2.4 mm³ min⁻¹</b> [A1]",
          ]],
          ["trap", ["Energy 係 <b>released</b>，唔係 “produced”；植物<b>日夜都</b> respire。"]],
        ],
      },
      {
        h: "Photosynthesis + Chromatography",
        min: 2.5,
        blocks: [
          ["key", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂（light energy → chemical energy）。O₂ 嚟自 <b>water</b>（photolysis）。"],
          ["table", ["Spectrum", "畫咩"], [
            ["Absorption spectrum", "每個 wavelength 被 pigment 吸收幾多"],
            ["Action spectrum", "每個 wavelength 嘅 photosynthesis rate"],
          ]],
          ["rhyme", "口訣 2", "紅藍食晒，綠光反彈", "Chlorophyll 吸 red + blue，reflect green → 所以葉係綠色。兩個 spectrum 形狀相似 → 證明吸收嘅光用嚟做 photosynthesis。"],
          ["eg", "A pigment moved 2.4 cm; solvent front moved 6.0 cm. Calculate Rf. [1]", ["Rf = 2.4 ÷ 6.0 = <b>0.40</b>（冇單位，一定 &lt; 1）"]],
        ],
      },
      {
        h: "Limiting factors",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 3", "斜坡睇 x，平頂睇其他", "Graph 升緊：x 軸嗰個 factor 係 limiting；平咗：其他 factor（CO₂ / temperature）先係 limiting。"],
          ["table", ["Factor", "點限制"], [
            ["Light intensity", "供 energy 俾 light-dependent stage"],
            ["CO₂ concentration", "carbon fixation 嘅原料"],
            ["Temperature", "enzymes（太高 denature）"],
          ]],
          ["note", "CO₂ enrichment experiments（greenhouse / FACE）：測試未來高 CO₂ 對植物生長影響。量 rate：O₂ 氣泡（<i>Elodea</i>）、CO₂ uptake、biomass ↑。"],
          ["trap", ["Describe limiting factor 圖：要講邊段係邊個 limiting，同埋 “another factor is now limiting”。"]],
        ],
      },
    ],
    summary: [
      "ATP 拆一粒 phosphate 就放能",
      "有氧大獎 CO₂ + 水；人做乳酸，酵母做酒加氣",
      "Respirometer：KOH 吸 CO₂，液滴量 O₂",
      "紅藍食晒，綠光反彈",
      "Rf = pigment ÷ solvent，永遠細過 1",
      "斜坡睇 x，平頂睇其他",
    ],
    practice: [
      { q: "Compare aerobic and anaerobic respiration in humans.", m: 3, a: "Both release energy from glucose / produce ATP / start in cytoplasm [1]; aerobic needs O₂, produces CO₂ + water; anaerobic produces lactate without O₂ [1]; aerobic much higher ATP yield, uses mitochondria [1]" },
      { q: "Explain the role of potassium hydroxide in a respirometer.", m: 2, a: "Absorbs CO₂ released by the organisms [1]; so volume change / droplet movement is due only to O₂ uptake [1]" },
      { q: "Distinguish between an absorption spectrum and an action spectrum.", m: 2, a: "Absorption: % light absorbed by pigments at each wavelength [1]; action: rate of photosynthesis at each wavelength [1]" },
      { q: "A pigment has an Rf of 0.65 and the solvent front moved 8.0 cm. Calculate how far the pigment moved.", m: 1, a: "0.65 × 8.0 = <b>5.2 cm</b>" },
      { q: "Explain why increasing light intensity beyond a certain point does not increase the rate of photosynthesis.", m: 2, a: "Light is no longer limiting [1]; another factor such as CO₂ concentration or temperature now limits the rate [1]" },
    ],
  },

  "bio-11": {
    title: "Neurons · Action potentials · Synapses · Integration",
    parts: [
      {
        h: "Resting & action potential",
        min: 3.5,
        blocks: [
          ["key", "<b>Resting potential ≈ −70 mV</b>：Na⁺/K⁺ pump 用 ATP 泵 3 Na⁺ 出、2 K⁺ 入 + K⁺ leak。<br>過 <b>threshold（~−55 mV）</b> → all-or-nothing action potential。"],
          ["table", ["階段", "發生咩", "mV"], [
            ["<b>Depolarisation</b>", "voltage-gated <b>Na⁺</b> channels 開，Na⁺ diffuse <b>入</b>", "−70 → +30/+40"],
            ["<b>Repolarisation</b>", "Na⁺ channels 關，<b>K⁺</b> channels 開，K⁺ diffuse <b>出</b>", "→ −70"],
            ["Hyperpolarisation", "K⁺ 出多咗少少", "低過 −70，然後 pump 搞返"],
          ]],
          ["rhyme", "口訣 1", "鈉入去正，鉀出返負", "Propagation：local currents 令隔籬一段 depolarise 到 threshold → 沿 axon 傳落去。"],
          ["note", "<b>Myelination</b>（Schwann cells）：只有 nodes of Ranvier depolarise → <b>saltatory conduction</b>，快好多。Speed = distance ÷ time。"],
          ["eg", "An impulse travels 0.9 m in 15 ms. Calculate the conduction speed. [2]", ["15 ms = 0.015 s [M1]；0.9 ÷ 0.015 = <b>60 m s⁻¹</b> [A1]"]],
        ],
      },
      {
        h: "Synaptic transmission",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 2（七步）", "到、鈣、泡、放、黐、鈉、清", "AP <b>到</b> presynaptic terminal → <b>Ca²⁺</b> 入 → <b>vesicles</b> 移去 membrane → exocytosis <b>釋放</b> neurotransmitter → diffuse 過 cleft <b>黐</b> receptors → <b>Na⁺</b> channels 開 → postsynaptic depolarise → neurotransmitter 被<b>清</b>走（acetylcholinesterase 分解 ACh / reuptake）。"],
          ["note", "Excitatory neurotransmitter：令 postsynaptic membrane depolarise；夠 threshold 先有 AP。Neonicotinoids 永久 bind 昆蟲 ACh receptors（唔被 acetylcholinesterase 分解）→ 麻痺、死亡。"],
          ["trap", ["Impulse 唔係 “jumps across the synapse” — 係 <b>chemical</b>（neurotransmitter diffuse）。"]],
        ],
      },
      {
        h: "Integration 協調",
        min: 2.5,
        blocks: [
          ["table", ["", "Nervous", "Endocrine"], [
            ["Signal", "electrical impulses + neurotransmitters", "hormones 經 blood"],
            ["速度/持續", "快、短", "慢、長"],
            ["範圍", "specific / localised", "widespread"],
          ]],
          ["table", ["結構", "功能"], [
            ["Reflex arc", "receptor → sensory → relay（spinal cord）→ motor → effector（unconscious）"],
            ["Cerebellum", "協調 skeletal muscle 動作、balance"],
            ["Hypothalamus + pituitary", "連接 nervous 同 endocrine 系統"],
            ["Pineal gland → <b>melatonin</b>", "黑暗時分泌，控制 sleep / circadian rhythm"],
            ["Adrenal → <b>epinephrine</b>", "fight or flight：heart rate ↑、ventilation ↑"],
            ["Medulla", "chemoreceptors 感應 blood CO₂/pH → 改 heart rate 同 ventilation rate"],
          ]],
          ["rhyme", "口訣 3", "神經快而準，荷爾蒙慢而廣"],
        ],
      },
    ],
    summary: [
      "靜止 −70：泵出三鈉入二鉀",
      "鈉入去正，鉀出返負",
      "Myelin 跳 nodes = saltatory，快",
      "到、鈣、泡、放、黐、鈉、清",
      "神經快而準，荷爾蒙慢而廣",
      "Reflex：receptor → sensory → relay → motor → effector",
      "Melatonin 管瞓覺，epinephrine 管走佬",
    ],
    practice: [
      { q: "Outline how the resting potential is maintained.", m: 2, a: "Na⁺/K⁺ pump actively transports 3 Na⁺ out and 2 K⁺ in using ATP [1]; membrane more permeable to K⁺ / K⁺ leaks out; inside negative ~−70 mV [1]" },
      { q: "Explain the events of depolarisation and repolarisation in an action potential.", m: 3, a: "Threshold reached, voltage-gated Na⁺ channels open, Na⁺ diffuses in — depolarisation [1]; Na⁺ channels close, K⁺ channels open [1]; K⁺ diffuses out — repolarisation [1]" },
      { q: "Explain why myelinated neurons conduct impulses faster.", m: 2, a: "Myelin insulates; depolarisation only at nodes of Ranvier [1]; impulse jumps node to node (saltatory conduction) [1]" },
      { q: "Explain how neonicotinoid pesticides kill insects.", m: 3, a: "Bind to acetylcholine receptors on postsynaptic membranes [1]; not broken down by acetylcholinesterase [1]; continuous stimulation / blocked transmission → paralysis and death [1]" },
      { q: "State the role of melatonin.", m: 1, a: "Controls circadian rhythms / sleep–wake cycle (secreted by pineal gland in darkness)" },
    ],
  },

  "bio-12": {
    title: "Pathogens · Innate defence · Adaptive immunity · Vaccines & antibiotics",
    parts: [
      {
        h: "First line + Innate immunity",
        min: 2.5,
        blocks: [
          ["key", "<b>Pathogen</b> = 引致疾病嘅生物/病原（virus, bacteria, fungi, protists）。第一道防線：<b>skin</b>（keratin、sebum、acidic）+ <b>mucous membranes</b>（mucus 黐住，lysozyme）。"],
          ["rhyme", "口訣 1（凝血）", "血小板出 factor，凝血酶變纖維", "Platelets + damaged tissue release clotting factors → <b>prothrombin → thrombin</b> → thrombin converts <b>soluble fibrinogen → insoluble fibrin</b> → 網住 RBC → clot。"],
          ["table", ["", "Innate", "Adaptive"], [
            ["Specific？", "non-specific", "specific（對特定 antigen）"],
            ["Memory？", "冇", "有 → 第二次更快更大"],
            ["例子", "phagocytes（ingest + digest）", "lymphocytes：B cells、T cells"],
          ]],
        ],
      },
      {
        h: "Adaptive immunity 特異性免疫",
        min: 3,
        blocks: [
          ["rhyme", "口訣 2", "抗原見 T 助，B 細胞克隆，漿細胞出抗體，記憶細胞守門口", "Antigen 被 phagocyte 呈現 → <b>helper T cell</b> 激活對應嘅 <b>B cell</b> → <b>clonal selection & expansion</b> → <b>plasma cells</b> 分泌 antibodies + <b>memory cells</b>。"],
          ["note", "Antibodies（proteins）：agglutination（黐埋一舊）、neutralise toxins、mark pathogens for phagocytosis、activate complement。Blood group antigens（A/B）→ transfusion 要 match。"],
          ["note", "<b>HIV</b>：感染 helper T cells → 數量下降 → 冇法激活 B cells → <b>AIDS</b>，容易受 opportunistic infections。傳播：unprotected sex、共用針、母嬰。"],
          ["trap", [
            "Antibodies 係 <b>proteins</b>，唔係 cells；plasma cells 先係 cells。",
            "Antigen ≠ antibody：寫反即刻 0 分。",
          ]],
        ],
      },
      {
        h: "Vaccines · Antibiotics · Zoonoses",
        min: 3,
        blocks: [
          ["table", ["主題", "要點"], [
            ["<b>Vaccines</b>", "含 antigen（weakened / inactivated pathogen、mRNA）→ primary response → memory cells → 真感染時 secondary response 快、大、長"],
            ["<b>Herd immunity</b>", "夠多人免疫 → 傳播鏈斷 → 保護唔可以打針嘅人"],
            ["<b>Antibiotics</b>", "針對 bacteria（cell wall、70S ribosomes）；<b>對 virus 無效</b>（virus 用宿主嘅 machinery）"],
            ["Antibiotic resistance", "random mutation → antibiotic 殺死敏感菌 → resistant 存活繁殖（overuse 加速）"],
            ["<b>Zoonoses</b>", "動物傳人：COVID-19、bird flu、rabies、TB（bovine）"],
          ]],
          ["rhyme", "口訣 3", "抗生素殺菌唔殺毒"],
          ["eg", "Cases fell from 2400 to 300 after a vaccination programme. Calculate the % change. [1]", ["(300 − 2400) ÷ 2400 × 100 = <b>−87.5%</b>（即下降 87.5%）"]],
        ],
      },
    ],
    summary: [
      "皮膚黏膜係城牆",
      "血小板出 factor，凝血酶變纖維（fibrinogen → fibrin）",
      "Innate 唔揀人，adaptive 認樣兼記仇",
      "抗原見 T 助，B 細胞克隆，漿細胞出抗體，記憶細胞守門口",
      "HIV 殺 helper T → AIDS",
      "抗生素殺菌唔殺毒",
      "Herd immunity：夠多人免疫，鏈就斷",
    ],
    practice: [
      { q: "Outline the role of fibrin in blood clotting.", m: 2, a: "Thrombin converts soluble fibrinogen into insoluble fibrin [1]; fibrin forms a mesh that traps platelets / red blood cells to seal the wound [1]" },
      { q: "Explain how B lymphocytes produce large amounts of a specific antibody.", m: 3, a: "Specific B cell with matching receptor binds antigen / activated by helper T cell [1]; divides by mitosis to form a clone (clonal selection) [1]; clone differentiates into plasma cells that secrete the antibody [1]" },
      { q: "Explain why HIV infection leads to AIDS.", m: 3, a: "HIV infects and destroys helper T cells [1]; fewer helper T cells so B cells are not activated / fewer antibodies [1]; immune system cannot fight opportunistic infections [1]" },
      { q: "Explain why antibiotics are not effective against viral infections.", m: 2, a: "Antibiotics target bacterial structures/metabolism e.g. cell walls, 70S ribosomes [1]; viruses lack these and use host cell machinery [1]" },
      { q: "Outline the concept of herd immunity.", m: 2, a: "When a high proportion of a population is immune [1]; transmission is reduced so non-immune individuals are protected [1]" },
    ],
  },

  "bio-13": {
    title: "Energy flow · Trophic levels · Pyramids · Carbon cycle",
    parts: [
      {
        h: "Energy flow 能量流",
        min: 3,
        blocks: [
          ["key", "Ecosystems 係 <b>open systems</b>：energy 由 <b>sunlight</b> 入，經 producers 變 chemical energy，沿 food chain 流，最後以 <b>heat</b> 離開。<br>Energy <b>flows</b>（唔循環）；nutrients <b>recycle</b>。"],
          ["rhyme", "口訣 1", "能量單程路，養分循環圈"],
          ["table", ["概念", "意思"], [
            ["Autotroph / producer", "用 light（或 chemical energy）由無機碳整有機物"],
            ["Heterotroph / consumer", "食其他生物攞有機物"],
            ["Decomposer / saprotroph", "分解死物，釋放 nutrients"],
            ["Trophic level", "喺 food chain 嘅位置"],
            ["Primary production", "producers 累積 biomass 嘅速度（g / kJ m⁻² yr⁻¹）"],
            ["Secondary production", "consumers 累積 biomass 嘅速度"],
          ]],
          ["rhyme", "口訣 2（點解只傳 ~10%）", "呼吸變熱、冇食晒、屙咗出去", "Losses：<b>respiration（heat）</b>、uneaten parts（骨、根）、<b>not digested（faeces）</b>、death without being eaten → 所以 food chain 好少多過 4–5 級。"],
          ["trap", ["寫 “energy is lost as waste” 唔夠，要講 <b>heat from cell respiration</b>。Energy 唔可以 recycle。"]],
        ],
      },
      {
        h: "Pyramids + Efficiency 計數",
        min: 2.5,
        blocks: [
          ["key", "Efficiency (%) = \\(\\frac{\\text{energy at higher level}}{\\text{energy at lower level}} \\times 100\\)　單位：kJ m⁻² yr⁻¹"],
          ["eg", "Producers: 1500 kJ m⁻² yr⁻¹; primary consumers: 120 kJ m⁻² yr⁻¹. Calculate the efficiency of transfer. [2]", [
            "120 ÷ 1500 × 100 [M1] = <b>8%</b> [A1]",
          ]],
          ["note", "<b>Pyramid of energy</b>：永遠係金字塔形（每級一定少過下面）；要按比例畫、label trophic levels、units。"],
          ["trap", ["畫 pyramid：bars 寬度要同數值成比例，第一級係 producers。"]],
        ],
      },
      {
        h: "Carbon cycle + Keeling curve",
        min: 3,
        blocks: [
          ["table", ["Process", "碳去邊"], [
            ["Photosynthesis", "CO₂ → organic compounds（fix 碳）"],
            ["Respiration（所有生物 + decomposers）", "organic → CO₂"],
            ["Combustion（fossil fuels, biomass, 山火）", "→ CO₂"],
            ["Fossilisation（peat, coal, oil, gas）", "部分死物冇完全分解 → 長期儲存"],
            ["Ocean", "CO₂ 溶入 → HCO₃⁻ / carbonate（貝殼、石灰岩）"],
          ]],
          ["rhyme", "口訣 3", "吸多過放係 sink，放多過吸係 source"],
          ["note", "<b>Keeling curve</b>（Mauna Loa）：CO₂ 長期上升（~315 ppm 1958 → 420+ ppm 而家），加上每年波動：北半球夏天 photosynthesis 多 → CO₂ 跌；冬天 respiration &gt; photosynthesis → 升。O₂ 同 CO₂ 喺 autotrophs 同 heterotrophs 之間互相依賴。"],
          ["trap", ["解釋波動要講 <b>Northern Hemisphere</b>（陸地同植物多啲）同 <b>seasonal photosynthesis</b>。"]],
        ],
      },
    ],
    summary: [
      "能量單程路，養分循環圈",
      "Sunlight 入，heat 出",
      "呼吸變熱、冇食晒、屙咗出去 → 只傳 ~10%",
      "Efficiency = 上級 ÷ 下級 × 100",
      "Energy pyramid 永不倒轉",
      "吸多過放係 sink，放多過吸係 source",
      "Keeling：長期升，夏天跌冬天升",
    ],
    practice: [
      { q: "Explain why ecosystems require a continuous supply of energy but not of carbon.", m: 2, a: "Energy is lost as heat (from respiration) and cannot be recycled — flows through [1]; carbon/nutrients are recycled by decomposers, respiration and photosynthesis [1]" },
      { q: "Secondary consumers receive 45 kJ m⁻² yr⁻¹ and primary consumers 500 kJ m⁻² yr⁻¹. Calculate the transfer efficiency.", m: 2, a: "45 ÷ 500 × 100 [M1] = <b>9%</b> [A1]" },
      { q: "Outline three reasons why energy is lost between trophic levels.", m: 3, a: "Heat lost from cell respiration [1]; not all parts eaten (bones, roots) [1]; not all digested / lost in faeces; some organisms die without being eaten [1]" },
      { q: "Explain the annual fluctuations in the Keeling curve.", m: 3, a: "CO₂ falls in Northern Hemisphere spring/summer [1] because photosynthesis exceeds respiration [1]; rises in autumn/winter when respiration/decomposition exceeds photosynthesis (more land and vegetation in N hemisphere) [1]" },
    ],
  },

  "bio-14": {
    title: "DNA replication · PCR & Gel · Transcription & Translation · Mutation",
    parts: [
      {
        h: "Replication · PCR · Gel electrophoresis",
        min: 3,
        blocks: [
          ["key", "<b>Semi-conservative</b>：每粒新 DNA = 1 條舊 strand（template）+ 1 條新 strand。<br><b>Helicase</b> 拆 H-bonds 打開 double helix → <b>DNA polymerase</b> 跟 complementary base pairing 加 nucleotides。"],
          ["rhyme", "口訣 1（PCR 三溫）", "九五拆，五五黐，七二砌", "Denature ~95 °C（strands 分開）→ anneal ~55 °C（primers 黐上去）→ extend ~72 °C（<b>Taq polymerase</b>，heat-stable）。每個 cycle DNA ×2。"],
          ["eg", "Starting with one DNA molecule, how many copies after 10 PCR cycles? [1]", ["2¹⁰ = <b>1024</b>"]],
          ["note", "<b>Gel electrophoresis</b>：DNA 帶 <b>negative charge</b>（phosphate）→ 向 <b>positive electrode</b> 移動；<b>細嘅 fragment 走得遠</b>。用途：DNA profiling（forensics、paternity）— band pattern 對比；COVID PCR test。"],
          ["trap", ["Gel：唔好寫 “heavier fragments move faster”；係 smaller fragments move further。"]],
        ],
      },
      {
        h: "Transcription & Translation",
        min: 3,
        blocks: [
          ["table", ["", "Transcription", "Translation"], [
            ["地方", "nucleus", "ribosome（cytoplasm / RER）"],
            ["Enzyme / 結構", "<b>RNA polymerase</b>", "ribosome + tRNA"],
            ["Template", "DNA <b>template（antisense）strand</b>", "mRNA codons"],
            ["Product", "mRNA", "polypeptide"],
          ]],
          ["rhyme", "口訣 2", "DNA 抄 mRNA，三個一組讀 codon，tRNA 帶 anticodon 嚟對", "Genetic code：<b>triplet</b>、<b>universal</b>、<b>degenerate</b>（一個 amino acid 可以有多個 codon）；start AUG（Met），stop codons 冇 amino acid。"],
          ["eg", "DNA template strand: 3'-TAC GGT CAT-5'. Give the mRNA and amino acids (AUG = Met, CCA = Pro, GUA = Val). [2]", [
            "mRNA 5'-<b>AUG CCA GUA</b>-3'（complementary，用 U 唔用 T）[1]",
            "Met – Pro – Val [1]",
          ]],
          ["trap", ["Codon 喺 <b>mRNA</b>；anticodon 喺 <b>tRNA</b>。DNA 唔會離開 nucleus — mRNA 先會。"]],
        ],
      },
      {
        h: "Mutation · Gene editing",
        min: 2.5,
        blocks: [
          ["table", ["Mutation", "效果"], [
            ["<b>Substitution</b>", "一個 codon 變 → 可能 same amino acid（degenerate, silent）、換 amino acid、或變 stop"],
            ["<b>Insertion / deletion</b>", "<b>frameshift</b> → 後面所有 codons 改晒（除非 3 個 bases）"],
          ]],
          ["note", "<b>Sickle cell</b>：DNA GAG → GTG（mRNA GAG → GUG）→ glutamic acid → <b>valine</b> → haemoglobin 低 O₂ 時黐埋成纖維 → RBC 變鐮刀形 → 塞 capillaries、運 O₂ 差。Mutagens：UV、X-rays、某啲 chemicals。Mutations 係 random；germ-line（會遺傳）vs somatic（唔遺傳，可致 cancer）。"],
          ["rhyme", "口訣 3", "換一粒改一個，加減一粒全部錯"],
          ["note", "<b>Gene knockout</b>：令一個 gene 失效，睇生物有咩變化 → 推斷 gene 功能。<b>CRISPR-Cas9</b>：guide RNA 帶 Cas9 去指定 sequence 剪斷 → 可以 edit genes。"],
        ],
      },
    ],
    summary: [
      "Semi-conservative：一舊一新",
      "Helicase 拆，polymerase 砌",
      "九五拆，五五黐，七二砌（Taq）",
      "DNA 負電向正極，細嘅走得遠",
      "DNA 抄 mRNA，三個一組讀 codon",
      "換一粒改一個，加減一粒全部錯",
      "Sickle cell：GAG → GTG，Glu → Val",
    ],
    practice: [
      { q: "Explain why DNA replication is described as semi-conservative.", m: 2, a: "Each original strand acts as a template [1]; each new molecule contains one original and one newly synthesised strand [1]" },
      { q: "Outline the steps of one PCR cycle.", m: 3, a: "Heated to ~95 °C to separate strands (denaturation) [1]; cooled to ~55 °C so primers anneal [1]; ~72 °C Taq polymerase extends new strands [1]" },
      { q: "Explain how DNA fragments are separated by gel electrophoresis.", m: 3, a: "DNA is negatively charged (phosphate groups) [1]; moves towards the positive electrode when current applied [1]; smaller fragments move further through the gel pores [1]" },
      { q: "Explain why a deletion of one base usually has a greater effect than a substitution.", m: 2, a: "Deletion causes frameshift — every codon after it is changed [1]; substitution changes only one codon, may be silent due to degeneracy [1]" },
      { q: "State the function of tRNA in translation.", m: 2, a: "Carries a specific amino acid to the ribosome [1]; its anticodon pairs with the complementary mRNA codon [1]" },
    ],
  },

  "bio-15": {
    title: "Mitosis & Meiosis · Reproduction · Inheritance",
    parts: [
      {
        h: "Mitosis vs Meiosis",
        min: 3,
        blocks: [
          ["table", ["", "Mitosis", "Meiosis"], [
            ["Divisions", "1", "2"],
            ["Daughter cells", "2，diploid，<b>genetically identical</b>", "4，haploid，<b>genetically different</b>"],
            ["用途", "growth, repair, asexual reproduction", "gametes（sexual reproduction）"],
          ]],
          ["rhyme", "口訣 1（phases）", "前排中，後分開，末重建（PMAT）", "Prophase：condense、nuclear membrane 散；Metaphase：排喺 equator、spindle 黐 centromere；Anaphase：sister chromatids 拉去兩極；Telophase：nuclear membrane 重建 → cytokinesis（動物 cleavage furrow；植物 cell plate）。"],
          ["rhyme", "口訣 2（meiosis 點樣整 variation）", "交叉換、隨機排、隨機配", "<b>Crossing over</b>（prophase I，non-sister chromatids）、<b>random orientation</b>（metaphase I）、random fertilisation。"],
          ["note", "<b>Non-disjunction</b>：chromosomes 分唔開 → gamete 多/少一條 → e.g. Down syndrome（trisomy 21），母親年紀越大風險越高。Mitotic index = cells in mitosis ÷ total cells。"],
        ],
      },
      {
        h: "Reproduction 生殖",
        min: 3,
        blocks: [
          ["table", ["Hormone", "來源", "作用"], [
            ["<b>FSH</b>", "pituitary", "促 follicle 發育；follicle 分泌 oestrogen"],
            ["<b>Oestrogen</b>", "follicle", "endometrium 增厚；高水平 → LH surge（positive feedback）"],
            ["<b>LH</b>", "pituitary", "surge → <b>ovulation</b>（~day 14）；follicle 變 corpus luteum"],
            ["<b>Progesterone</b>", "corpus luteum", "維持 endometrium；抑制 FSH & LH（negative feedback）；跌 → menstruation"],
          ]],
          ["rhyme", "口訣 3", "FSH 催卵，雌激素起牆，LH 放卵，黃體素守牆"],
          ["note", "<b>IVF</b>：hormone 先 down-regulate 自然週期 → 大劑量 FSH 刺激多個 follicles → 取卵 → 體外 fertilisation → embryo 放返 uterus。<br><b>Flowering plants</b>：pollination（insect / wind）→ fertilisation → seed → dispersal（避免同 parent 競爭）。Self-incompatibility 促進 <b>cross-pollination</b> → genetic variation。"],
        ],
      },
      {
        h: "Inheritance 遺傳",
        min: 3,
        blocks: [
          ["key", "Genetic cross 步驟：parents' phenotypes & genotypes → <b>gametes（圈住）</b> → Punnett grid → offspring genotypes → phenotypes → <b>ratio</b>。每步都有分！"],
          ["table", ["Pattern", "例子", "Heterozygote", "F2 / 典型 ratio"], [
            ["Complete dominance", "Aa", "顯性 phenotype", "3 : 1"],
            ["<b>Codominance</b>", "ABO：Iᴬ Iᴮ codominant，i recessive", "AB 兩個都表達", "—"],
            ["<b>Incomplete dominance</b>", "紅 × 白 snapdragon", "粉紅（中間）", "1 red : 2 pink : 1 white"],
            ["<b>Sex-linked</b>（X）", "haemophilia、red-green colour blindness", "XᴴXʰ carrier 女", "男多過女患病"],
          ]],
          ["rhyme", "口訣 4", "兩個正常生病仔 = recessive", "Pedigree：正常父母有患病子女 → recessive；有患病父母生正常子女 → dominant。"],
          ["eg", "Carrier mother XᴴXʰ × normal father XᴴY. Probability a child is a son with haemophilia? [2]", [
            "Gametes：Xᴴ, Xʰ × Xᴴ, Y → XᴴXᴴ, XᴴY, XʰXᴴ, <b>XʰY</b> [1]",
            "P = <b>1/4</b>（所有子女中）；如果問 “a son” 已知係仔 → 1/2 [1]",
          ]],
          ["trap", [
            "Sex-linked 一定要寫 X 同 Y：XʰY，唔可以淨寫 h。",
            "Continuous variation（height）= polygenic + environment；phenotypic plasticity = 同一 genotype 因環境有唔同 phenotype。PKU：recessive，靠低 phenylalanine diet 控制。",
          ]],
        ],
      },
    ],
    summary: [
      "Mitosis 一變二一樣；meiosis 一變四唔同",
      "前排中，後分開，末重建",
      "交叉換、隨機排、隨機配",
      "FSH 催卵，雌激素起牆，LH 放卵，黃體素守牆",
      "Cross：parents → gametes → grid → ratio",
      "Codominance 兩個都出，incomplete 撈埋中間色",
      "兩個正常生病仔 = recessive",
    ],
    practice: [
      { q: "State two differences between mitosis and meiosis.", m: 2, a: "Mitosis one division, meiosis two [1]; mitosis gives identical diploid cells, meiosis gives genetically different haploid cells [1]" },
      { q: "Outline the roles of LH and progesterone in the menstrual cycle.", m: 3, a: "LH surge triggers ovulation [1]; LH causes follicle to develop into corpus luteum [1]; progesterone maintains the endometrium / inhibits FSH and LH [1]" },
      { q: "A man with blood group AB and a woman with blood group O have children. Deduce the possible blood groups of their children, showing your working.", m: 3, a: "Parents IᴬIᴮ × ii [1]; gametes Iᴬ, Iᴮ and i [1]; children Iᴬi (group A) and Iᴮi (group B) in 1 : 1 ratio [1]" },
      { q: "Explain why red-green colour blindness is more common in males.", m: 2, a: "Gene is on the X chromosome; males have only one X (XY) [1]; one recessive allele is enough to show the condition in males, females need two [1]" },
      { q: "Outline how meiosis can lead to Down syndrome.", m: 2, a: "Non-disjunction — chromosome 21 homologues/chromatids fail to separate [1]; gamete with extra chromosome 21 fertilised → trisomy 21 [1]" },
    ],
  },

  "bio-16": {
    title: "Osmosis & Tonicity · Homeostasis · Blood glucose · Thermoregulation",
    parts: [
      {
        h: "Osmosis in cells",
        min: 3,
        blocks: [
          ["key", "Osmosis：水由 <b>low solute concentration（hypotonic）→ high solute concentration（hypertonic）</b> 穿過 partially permeable membrane。"],
          ["table", ["Solution", "Animal cell（冇 wall）", "Plant cell（有 wall）"], [
            ["Hypotonic（外面淡）", "水入 → swell → <b>burst（lysis）</b>", "水入 → <b>turgid</b>（wall 頂住唔爆）"],
            ["Isotonic", "冇淨變化", "flaccid"],
            ["Hypertonic（外面濃）", "水出 → <b>crenated</b>（縮皺）", "水出 → <b>plasmolysed</b>（membrane 離開 wall）"],
          ]],
          ["rhyme", "口訣 1", "水跟鹽走，濃嘅地方吸水"],
          ["note", "Medical：<b>isotonic saline</b> 用嚟 IV drip、洗傷口、運送 donor organs（防止細胞脹爆或者縮水）。"],
          ["eg", "Potato mass changed from 2.50 g to 2.35 g. Calculate % change. [2]", [
            "(2.35 − 2.50) ÷ 2.50 × 100 [M1] = <b>−6%</b> [A1]",
          ]],
          ["note", "實驗：plot % mass change（y）vs sucrose concentration（x）→ line 過 0 嗰點 = tissue 嘅 <b>isotonic point</b>。用 % change 因為每塊薯起始重量唔同。"],
          ["trap", ["Plant cells 唔會 burst（cell wall）；寫 “water moves from high to low concentration” 要講清楚係 <b>solute</b> concentration。"]],
        ],
      },
      {
        h: "Homeostasis + Blood glucose",
        min: 3,
        blocks: [
          ["key", "<b>Homeostasis</b> = 維持 internal environment 喺 narrow limits（set point）。<b>Negative feedback</b>：偏離 → receptor → coordinator → effector → 反方向拉返。"],
          ["rhyme", "口訣 2", "高糖 β 出 insulin 收糖，低糖 α 出 glucagon 放糖", "Pancreas islets of Langerhans：β cells → <b>insulin</b>（cells 吸 glucose、liver/muscle 整 <b>glycogen</b>）；α cells → <b>glucagon</b>（liver glycogen → glucose）。"],
          ["table", ["", "Type 1 diabetes", "Type 2 diabetes"], [
            ["原因", "autoimmune 破壞 β cells → 冇 insulin", "target cells 對 insulin <b>resistant</b>"],
            ["Onset", "通常細個", "通常成年；obesity、少運動、diet、genes"],
            ["治療", "insulin injections", "diet、exercise、藥物"],
          ]],
          ["trap", ["Glucagon ≠ glycogen！一個係 hormone，一個係儲存多醣。"]],
        ],
      },
      {
        h: "Thermoregulation 體溫調節",
        min: 2,
        blocks: [
          ["table", ["太熱", "太凍"], [
            ["Vasodilation of skin arterioles → 多血去皮膚散熱", "Vasoconstriction → 少血去皮膚"],
            ["Sweating（evaporation 帶走熱）", "Shivering（muscle contraction 產熱）"],
            ["毛髮平躺", "Hair erection（piloerection）"],
            ["—", "<b>Brown adipose tissue</b> thermogenesis（uncoupled respiration 出熱）、thyroxin ↑ metabolism"],
          ]],
          ["key", "Thermoreceptors（皮膚、core）→ <b>hypothalamus</b>（coordinator）→ effectors。"],
          ["trap", ["唔好寫 “blood vessels move closer to the skin” — 係 arterioles dilate/constrict。"]],
        ],
      },
    ],
    summary: [
      "水跟鹽走，濃嘅地方吸水",
      "動物淡水會爆，植物淡水變 turgid",
      "Line 過零 = isotonic point",
      "Negative feedback：偏咗就拉返",
      "高糖 β 出 insulin 收糖，低糖 α 出 glucagon 放糖",
      "Type 1 冇 insulin，type 2 唔聽 insulin",
      "熱：擴張出汗；凍：收縮震、褐脂燒",
    ],
    practice: [
      { q: "Explain what happens to a red blood cell placed in distilled water.", m: 3, a: "Distilled water is hypotonic / lower solute concentration than cytoplasm [1]; water enters by osmosis [1]; cell swells and bursts (lysis) as there is no cell wall [1]" },
      { q: "Explain why isotonic saline is used for donor organs.", m: 2, a: "No net movement of water into or out of cells [1]; prevents cells swelling/bursting or shrinking, keeping tissue undamaged [1]" },
      { q: "Explain how blood glucose concentration is returned to normal after a period without food.", m: 3, a: "Low glucose detected by α cells of pancreas [1]; glucagon secreted [1]; liver breaks down glycogen to glucose, released into blood (negative feedback) [1]" },
      { q: "Distinguish between type 1 and type 2 diabetes.", m: 2, a: "Type 1: β cells destroyed (autoimmune), no insulin produced [1]; type 2: insulin produced but target cells resistant / insensitive [1]" },
      { q: "Outline two responses to a fall in core body temperature.", m: 2, a: "Any two: vasoconstriction of skin arterioles; shivering; thermogenesis in brown adipose tissue; hair erection" },
    ],
  },

  "bio-17": {
    title: "Natural selection · Ecosystem stability · Climate change",
    parts: [
      {
        h: "Natural selection 自然選擇",
        min: 3,
        blocks: [
          ["rhyme", "口訣 1（五步）", "有變異、生太多、要爭、適者生、傳落去", "<b>Variation</b>（mutation、meiosis、random fertilisation）→ <b>overproduction</b> → <b>competition</b>（struggle for survival）→ better adapted survive & <b>reproduce</b> → pass on <b>heritable</b> alleles → allele frequency 改變 over generations。"],
          ["table", ["例子", "Selection pressure"], [
            ["Antibiotic resistance", "antibiotic"],
            ["Peppered moth", "predation（煙污樹皮顏色）"],
            ["<b>Endler's guppies</b>", "predators 多 → 顏色暗淡；predators 少 → sexual selection → 鮮艷"],
            ["<b>Sexual selection</b>（peacock tail）", "mate choice / competition for mates"],
          ]],
          ["note", "Abiotic factors（e.g. drought、temperature）亦係 selection pressure。只有 <b>heritable</b>（有 genetic basis）嘅 variation 先會被 selected。"],
          ["trap", [
            "唔好寫 “organisms adapt because they need to / want to” ❌（Lamarck）。",
            "Individuals 唔 evolve；<b>populations</b> evolve。",
          ]],
        ],
      },
      {
        h: "Stability & disruption 生態穩定",
        min: 3,
        blocks: [
          ["key", "Stable ecosystem：長時間維持（e.g. Amazon rainforest、古老森林）。靠：<b>energy supply（sunlight）、nutrient recycling、biodiversity、climate</b>。"],
          ["rhyme", "口訣 2", "過咗 tipping point，返唔到轉頭"],
          ["table", ["威脅", "機制"], [
            ["Deforestation → tipping point", "雨量減 → rainforest 變 savanna"],
            ["<b>Eutrophication</b>", "fertiliser 入水 → algal bloom → 遮光植物死 → bacteria 分解用晒 O₂（BOD↑）→ 魚死"],
            ["<b>Biomagnification</b>", "DDT / mercury：persistent、fat-soluble、唔排出 → 越高 trophic level 濃度越高"],
            ["Microplastics / macroplastics", "海洋生物誤食、纏住"],
            ["Keystone species 消失", "成個 community 崩潰"],
          ]],
          ["note", "<b>Mesocosms</b>：封閉嘅小生態系統做實驗測試 stability。<b>Rewilding</b>：重新引入 keystone species（e.g. Yellowstone wolves）恢復生態。Sustainable harvesting：quotas、捕魚限制。"],
        ],
      },
      {
        h: "Climate change 生物影響",
        min: 2.5,
        blocks: [
          ["table", ["影響", "例子"], [
            ["<b>Range shifts</b>（poleward / upslope）", "物種向北或者上山搬"],
            ["Polar habitat loss", "海冰減少 → polar bears、walrus"],
            ["Coral bleaching + ocean acidification", "溫度↑ → 趕走 zooxanthellae；pH↓ → carbonate 難沉積"],
            ["<b>Phenology mismatch</b>", "開花 / 毛蟲高峰提早，候鳥（pied flycatcher）冇變 → 食物錯配"],
            ["<b>Positive feedback</b>", "permafrost 融化釋放 CO₂ / CH₄ → 更暖"],
          ]],
          ["rhyme", "口訣 3", "搬家、融冰、白珊瑚、時間錯、越融越熱"],
          ["note", "Mitigation：carbon sequestration（植林、peatland/wetland 保護、restoration）。Evolution 都會發生：短生命週期物種可以快速適應。"],
          ["trap", ["答 climate change 題一定要<b>點名 organism + 具體 effect</b>，泛泛而談冇分。"]],
        ],
      },
    ],
    summary: [
      "有變異、生太多、要爭、適者生、傳落去",
      "Population 進化，individual 唔會",
      "Guppies：天敵多就暗，天敵少就靚",
      "過咗 tipping point，返唔到轉頭",
      "Eutrophication：肥 → 藻 → 死 → 菌食氧 → 魚死",
      "Biomagnification：持久 + 溶脂 = 越上越多",
      "搬家、融冰、白珊瑚、時間錯、越融越熱",
    ],
    practice: [
      { q: "Explain how natural selection could lead to an increase in the frequency of dark-coloured moths in a polluted area.", m: 4, a: "Variation in colour exists, heritable [1]; dark moths better camouflaged on soot-darkened bark [1]; light moths eaten more by birds (selection pressure) [1]; dark moths survive and reproduce, passing on alleles — frequency increases over generations [1]" },
      { q: "Outline the process of eutrophication.", m: 4, a: "Fertiliser (nitrates/phosphates) runoff into water [1]; algal bloom [1]; algae/plants die, decomposed by bacteria using O₂ (increased BOD) [1]; low O₂ kills fish and other aerobic organisms [1]" },
      { q: "Explain why mercury concentration is highest in top predators.", m: 3, a: "Mercury is persistent / not broken down or excreted, stored in tissues [1]; each predator eats many prey [1]; so concentration increases at each trophic level (biomagnification) [1]" },
      { q: "Explain how climate change can cause a mismatch in phenology, using an example.", m: 3, a: "Warmer temperatures cause earlier events (budburst / caterpillar peak) [1]; other species' timing set by day length (e.g. migratory pied flycatcher arrival) unchanged [1]; chicks hatch after food peak → lower survival [1]" },
      { q: "Outline one positive feedback effect of global warming.", m: 2, a: "Warming melts permafrost [1]; releases CO₂/methane from decomposition, increasing warming further (or: less ice → lower albedo → more absorption) [1]" },
    ],
  },
});
