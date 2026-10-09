/* ⏱ 10-minute fast notes · Mathematics AA SL (format: see js/fastnotes.js). */
IB.addFast({
  "math-6": {
    title: "Transformations · Asymptotes · Domain & Range",
    intro: "由零開始，最後衝刺版。每個 section 有時間建議，跟住讀就得。",
    parts: [
      {
        h: "Transformations 圖形變換",
        min: 3,
        blocks: [
          ["key", "萬能公式：\\(y = a\\,f\\big(b(x-h)\\big) + k\\)<br><b>括號外</b>（a, k）郁 y → 直向（vertical）｜<b>括號內</b>（b, h）郁 x → 橫向（horizontal）"],
          ["rhyme", "口訣 1", "出面照住做，入面反轉做", "外面 +3 就真係上 3；入面 +3 反而係左 3；入面 ×2 反而係縮一半。"],
          ["table", ["寫法", "效果（IB 字眼）", "點 (x, y) 變成", "廣東話記法"], [
            ["\\(f(x)+k\\)", "translation by \\(\\binom{0}{k}\\)（k&lt;0 就落）", "(x, y+k)", "外加 → 上"],
            ["\\(f(x-h)\\)", "translation by \\(\\binom{h}{0}\\)：right h", "(x+h, y)", "入面減 → 去右（反轉）"],
            ["\\(f(x+h)\\)", "translation left h", "(x−h, y)", "入面加 → 去左"],
            ["\\(a\\,f(x)\\)", "vertical stretch, scale factor a", "(x, ay)", "y 乘 a"],
            ["\\(f(bx)\\)", "horizontal stretch, scale factor \\(\\tfrac{1}{b}\\)", "(x/b, y)", "x 除 b（反轉）"],
            ["\\(-f(x)\\)", "reflection in the x-axis", "(x, −y)", "外面負 → y 變號"],
            ["\\(f(-x)\\)", "reflection in the y-axis", "(−x, y)", "入面負 → x 變號"],
          ]],
          ["rhyme", "口訣 2（最快做題法）", "x 做相反，y 照計", "新 x = x ÷ b + h　　新 y = a × y + k（先乘除，後加減）"],
          ["eg", "(2, 5) 喺 \\(y=f(x)\\) 上。求 \\(y = 3f(2x-4)+1\\) 嘅對應點。", [
            "Step 1 抽 b 出嚟：\\(2x-4 = 2(x-2)\\) → b = 2, h = 2（⚠ 一定要先抽！）",
            "Step 2 x：2 ÷ 2 + 2 = <b>3</b>　y：3 × 5 + 1 = <b>16</b> → <b>(3, 16)</b> ✅",
          ]],
          ["trap", [
            "\\(f(2x-4)\\) 唔係 right 4！係 right <b>2</b>（因為要先抽 2 出嚟）。",
            "Describe 要寫齊：<b>方向 + 數值 + 字眼</b>，例：“horizontal stretch, scale factor ½” / “translation by vector \\(\\binom{2}{0}\\)”。淨係寫 “move right” 冇分。",
            "順序：用口訣 2 嘅寫法（抽 b 出嚟後）就係<b>先 stretch，後 translate</b>，直向橫向都係咁，最穩陣。",
          ]],
        ],
      },
      {
        h: "Domain & Range 定義域 / 值域",
        min: 2.5,
        blocks: [
          ["key", "<b>Domain</b> = 你可以放入去嘅 x ｜ <b>Range</b> = 出嚟嘅 y"],
          ["rhyme", "口訣 3（搵 domain）", "分母唔做零，根號唔可負，log 入面要正數"],
          ["table", ["Function", "Domain", "Range"], [
            ["\\(\\frac{1}{x-3}\\)", "x ≠ 3", "y ≠ 0"],
            ["\\(\\sqrt{x-2}\\)", "x ≥ 2", "y ≥ 0"],
            ["\\(\\ln(x+1)\\)", "x &gt; −1", "y ∈ ℝ"],
            ["\\(e^x + 4\\)", "x ∈ ℝ", "y &gt; 4"],
            ["\\((x-1)^2 + 5\\)", "x ∈ ℝ", "y ≥ 5（vertex 最低點）"],
            ["\\(-2(x+3)^2 + 7\\)", "x ∈ ℝ", "y ≤ 7（a 負 → 開口向下）"],
          ]],
          ["rhyme", "口訣 4（搵 range）", "畫個圖，睇上落；頂點、漸近線、端點，三樣睇齊", "GDC 可以用（Paper 2）：graph → 睇 min/max 同 asymptote。Paper 1 就靠 sketch。"],
          ["key", "Transformation 對 domain/range 嘅影響：<b>橫向變換改 domain，直向變換改 range</b>。<br>例：f 嘅 range 係 0 ≤ y ≤ 4，咁 \\(2f(x)-1\\) 嘅 range = 2(0)−1 ≤ y ≤ 2(4)−1 → <b>−1 ≤ y ≤ 7</b>。<br>Inverse：「domain range 對調」 — \\(f^{-1}\\) 嘅 domain = f 嘅 range。"],
          ["trap", [
            "≥ 定 &gt;？有漸近線 → 用 &gt;（永遠掂唔到）；有 vertex / 端點 → 用 ≥。",
            "Range 要用 <b>y</b> 或 <b>f(x)</b> 寫，唔好寫 x！",
            "負 a 嘅直向 stretch 會令 range 上下對調：f 嘅 range 0 ≤ y ≤ 4 → \\(-f(x)\\) 係 −4 ≤ y ≤ 0（唔係 0 ≤ y ≤ −4）。",
          ]],
        ],
      },
      {
        h: "Vertical & Horizontal Asymptotes 漸近線",
        min: 3,
        blocks: [
          ["rhyme", "口訣 5", "直線分母零，橫線睇頭頭", "VA（直）：分母 = 0 嘅 x ｜ HA（橫）：x 好大時 y 去邊 → 睇 x 前面嘅「頭頭」係數"],
          ["table", ["類型", "VA（x = ?）", "HA（y = ?）"], [
            ["\\(y = \\frac{ax+b}{cx+d}\\)", "\\(x = -\\frac{d}{c}\\)", "\\(y = \\frac{a}{c}\\)（頭 ÷ 頭）"],
            ["\\(y = \\frac{a}{x-h} + k\\)", "x = h", "y = k"],
            ["\\(y = a e^{x} + k\\) 或 \\(a\\,b^{x} + k\\)", "冇", "y = k"],
            ["\\(y = \\ln(x-h) + k\\)", "x = h", "冇"],
          ]],
          ["eg", "\\(f(x) = \\frac{6x-1}{2x+4}\\)", [
            "VA：2x + 4 = 0 → <b>x = −2</b> ｜ HA：6 ÷ 2 → <b>y = 3</b>",
            "∴ Domain：x ≠ −2　Range：y ≠ 3（<b>口訣 6：「漸近線就係 domain / range 嘅缺口」</b>）",
            "x-intercept：分子 = 0 → x = 1/6 ｜ y-intercept：x = 0 → y = −1/4",
          ]],
          ["key", "<b>Transformation + asymptote 快法：漸近線跟住一齊郁！</b><br>\\(y=\\frac1x\\)（VA x=0, HA y=0）→ \\(y=\\frac{1}{x-3}+2\\)：VA 右移 3 → x = 3；HA 上移 2 → y = 2。<br>\\(y=e^x\\)（HA y=0）→ \\(y=-e^x+5\\)：先 reflect（y=0 不變），再 +5 → <b>y = 5</b>，range <b>y &lt; 5</b>。"],
          ["trap", [
            "漸近線一定要寫成<b>方程</b>：寫 “x = −2”，唔好淨係寫 “−2”。",
            "HA 頭頭係數：\\(\\frac{3-2x}{x+1}\\) 嘅 HA 係 <b>y = −2</b>（唔係 3！睇 x 前面嘅數）。",
            "Sketch 時：漸近線用虛線畫、標方程；曲線要貼近但<b>唔好掂到</b>；標埋 intercepts（寫坐標）。",
          ]],
        ],
      },
      {
        h: "Exponential & log graphs 指數同對數圖",
        min: 1.5,
        blocks: [
          ["table", ["Graph", "必過嘅點", "Asymptote", "Domain / Range"], [
            ["\\(y = a^x\\)（a &gt; 1）", "(0, 1)", "HA y = 0", "x ∈ ℝ, y &gt; 0"],
            ["\\(y = \\log_a x\\)", "(1, 0)", "VA x = 0", "x &gt; 0, y ∈ ℝ"],
          ]],
          ["rhyme", "口訣 7", "exp 同 log 係鏡像，鏡就係 y = x", "\\(e^x\\) 同 \\(\\ln x\\) 互為 inverse：(0,1) ↔ (1,0)，HA y=0 ↔ VA x=0。"],
          ["trap", ["\\(\\ln(x-2)\\) 嘅 VA 係 x = 2，domain x &gt; 2；sketch 時曲線喺 x = 2 右邊貼住條虛線落去。"]],
        ],
      },
    ],
    summary: [
      "出面照住做，入面反轉做",
      "x 做相反（÷b, +h），y 照計（×a, +k）— 入面有數先抽 b",
      "分母唔做零，根號唔可負，log 入面要正數",
      "畫個圖睇上落：頂點、漸近線、端點",
      "直線分母零，橫線睇頭頭",
      "漸近線 = domain/range 嘅缺口；inverse 就 domain range 對調",
      "exp 同 log 係鏡像，鏡就係 y = x",
    ],
    practice: [
      { q: "The point (4, −2) lies on \\(y = f(x)\\). Find the coordinates of the image on \\(y = -2f(x+1) + 3\\).", m: 3, a: "x: 4 − 1 = <b>3</b>; y: −2(−2) + 3 = <b>7</b> → <b>(3, 7)</b>" },
      { q: "Let \\(f(x) = \\frac{3x+5}{x-2}\\), x ≠ 2. Write down the equations of the vertical and horizontal asymptotes. Hence state the range of f.", m: 4, a: "VA <b>x = 2</b>; HA <b>y = 3</b>; range <b>y ≠ 3</b>（y ∈ ℝ, y ≠ 3）" },
      { q: "Find the largest possible domain of \\(g(x) = \\sqrt{10 - 2x}\\). State the range of g.", m: 3, a: "10 − 2x ≥ 0 → <b>x ≤ 5</b>; range <b>g(x) ≥ 0</b>" },
      { q: "The graph of \\(y = e^x\\) is reflected in the x-axis, then translated by the vector \\(\\binom{0}{2}\\). Write down the equation of the new graph and its horizontal asymptote, and state its range.", m: 4, a: "<b>\\(y = -e^x + 2\\)</b>; HA <b>y = 2</b>; range <b>y &lt; 2</b>" },
      { q: "Describe fully the transformation(s) that map \\(y = f(x)\\) to \\(y = f(3x - 6)\\).", m: 3, a: "\\(f(3(x-2))\\)：<b>horizontal stretch, scale factor 1/3</b>, then <b>translation 2 units right</b>（vector \\(\\binom{2}{0}\\)）。或者：先 translate right 6，再 horizontal stretch sf 1/3 — 兩個順序都 accept，但數值要跟順序配！" },
    ],
  },
  "math-1": {
    title: "Arithmetic · Geometric · Sigma · Compound interest",
    intro: "Topic 1 送分題：公式全部喺 formula booklet，最重要係識揀公式、數啱項數、P2 識用 GDC。",
    parts: [
      {
        h: "Arithmetic sequences 等差數列",
        min: 2.5,
        blocks: [
          ["key", "\\(u_n = u_1 + (n-1)d\\)　　\\(S_n = \\frac{n}{2}\\big(2u_1 + (n-1)d\\big) = \\frac{n}{2}(u_1 + u_n)\\)<br>Test：\\(u_2 - u_1 = u_3 - u_2 = d\\)（common difference）"],
          ["rhyme", "口訣 1", "等差加 d，第 n 項只加 (n−1) 次", "第 1 項冇加過 d，所以第 20 項係加 19 次 d。"],
          ["eg", "An arithmetic sequence has \\(u_4 = 17\\) and \\(u_{10} = 41\\). Find \\(u_1\\), d and \\(S_{15}\\).", [
            "兩項相減：\\(u_{10} - u_4 = 6d = 24\\) → <b>d = 4</b>（唔使解聯立！）",
            "\\(u_1 = 17 - 3(4) = \\) <b>5</b>",
            "\\(S_{15} = \\frac{15}{2}\\big(2(5) + 14(4)\\big) = 7.5 \\times 66 = \\) <b>495</b> ✅",
          ]],
          ["trap", [
            "寫 \\(u_1 + nd\\) 係最常見錯：一定係 <b>(n − 1)d</b>。",
            "項數：7, 11, …, 83 → \\(n = \\frac{83 - 7}{4} + 1 = 20\\)，記得 <b>+1</b>。",
            "\\(u_n\\)（一項）同 \\(S_n\\)（總和）唔好撈亂；\\(u_n = S_n - S_{n-1}\\)。",
          ]],
        ],
      },
      {
        h: "Geometric sequences & sum to infinity 等比數列",
        min: 2.5,
        blocks: [
          ["key", "\\(u_n = u_1 r^{n-1}\\)　　\\(S_n = \\frac{u_1(r^n - 1)}{r - 1} = \\frac{u_1(1 - r^n)}{1 - r}\\)　　\\(S_\\infty = \\frac{u_1}{1 - r}\\)，<b>只限 \\(|r| &lt; 1\\)</b>"],
          ["rhyme", "口訣 2", "等比乘 r，無限要細過 1", "Sum to infinity 一定要寫 “since |r| &lt; 1, the series converges” — 呢句就係 R1。"],
          ["table", ["", "Arithmetic", "Geometric"], [
            ["3 consecutive terms a, b, c", "\\(2b = a + c\\)", "\\(b^2 = ac\\)"],
            ["兩項畀咗", "相減 → d", "相除 → r"],
            ["Real-life 字眼", "“increases by 50 each year”", "“increases by 5%” → r = 1.05；“loses 20%” → r = 0.8"],
          ]],
          ["eg", "A geometric sequence has \\(u_2 = 12\\) and \\(u_5 = -1.5\\). Find r and \\(S_\\infty\\).", [
            "相除：\\(r^3 = \\frac{-1.5}{12} = -\\frac18\\) → <b>\\(r = -\\frac12\\)</b>；\\(u_1 = 12 \\div (-\\frac12) = -24\\)",
            "\\(|r| &lt; 1\\) so \\(S_\\infty\\) exists：\\(\\frac{-24}{1 - (-\\frac12)} = \\frac{-24}{1.5} = \\) <b>−16</b> ✅",
          ]],
          ["trap", [
            "\\(r^2 = 4\\) → \\(r = \\pm 2\\)，兩個都要留住，除非題目話 terms are positive。",
            "r = −2 冇 sum to infinity — 要寫原因（|r| ≥ 1, series diverges）。",
            "負數 r 入計數機要加括號：\\((-0.5)^4\\) 唔係 \\(-0.5^4\\)。",
          ]],
        ],
      },
      {
        h: "Sigma notation & “find n” 求項數",
        min: 1.5,
        blocks: [
          ["key", "\\(\\sum_{k=a}^{b} u_k\\)：項數 = <b>b − a + 1</b>。Linear sigma = 項數 × (頭 + 尾) ÷ 2。<br>例：\\(\\sum_{k=1}^{20}(4k-1)\\)：頭 3、尾 79 → \\(\\frac{20}{2}(3 + 79) = 820\\)"],
          ["rhyme", "口訣 3", "「第一次超過」一定向上捨入", "解出 n &gt; 10.7 → 答 <b>n = 11</b>（n 係整數）。P1 用 log，P2 用 GDC table 或 solver。"],
          ["eg", "Find the least n such that \\(u_n = 3 \\times 2^{n-1}\\) exceeds 1000.", [
            "\\(2^{n-1} &gt; 333.3\\) → \\(n - 1 &gt; \\frac{\\ln 333.3}{\\ln 2} = 8.38\\) → n &gt; 9.38",
            "<b>n = 10</b>（check：\\(u_9 = 768\\)，\\(u_{10} = 1536\\)）✅",
          ]],
        ],
      },
      {
        h: "Compound interest · Depreciation · Standard form",
        min: 2,
        blocks: [
          ["key", "\\(FV = PV\\left(1 + \\frac{r}{100k}\\right)^{kn}\\)　k = compounding periods per year（monthly k = 12，quarterly k = 4），n = years。<br>Depreciation：\\(V = V_0\\left(1 - \\frac{r}{100}\\right)^{n}\\)（r 用負數入 TVM 都得）。"],
          ["rhyme", "口訣 4", "利率除 k，年數乘 k", "TVM：N = kn，I% = r，PV = −本金（錢出去係負），PMT = 0，P/Y = C/Y = k，solve FV。"],
          ["eg", "A car bought for $24 000 depreciates by 15% per year. Find its value after 5 years.", [
            "\\(24000 \\times 0.85^5 = \\) <b>$10 648.93</b>",
            "P2 要寫出算式或 TVM 輸入值先攞 M1，唔好淨係寫答案。",
          ]],
          ["note", "<b>Standard form (1.1)</b>：\\(a \\times 10^k\\)，\\(1 \\le a &lt; 10\\)。\\((6 \\times 10^5)(4 \\times 10^3) = 24 \\times 10^8 = 2.4 \\times 10^9\\) — 最後一步要 normalise。"],
          ["trap", [
            "錢要答到 <b>2 d.p.</b>（nearest cent），唔係 3 s.f.。",
            "“After 10 years” 用 n = 10；“at the start of year 10” 只係過咗 9 年。",
          ]],
        ],
      },
    ],
    summary: [
      "等差加 d，第 n 項只加 (n−1) 次",
      "兩項畀咗：等差相減，等比相除",
      "等比乘 r，無限要細過 1（寫埋 since |r| &lt; 1）",
      "項數 = 尾 − 頭 + 1",
      "「第一次超過」向上捨入",
      "利率除 k，年數乘 k；錢答 2 位小數",
    ],
    practice: [
      { q: "An arithmetic sequence has \\(u_1 = 7\\) and \\(d = 3\\). Find \\(u_{20}\\) and \\(S_{20}\\).", m: 4, a: "\\(u_{20} = 7 + 19(3) = \\) <b>64</b>；\\(S_{20} = \\frac{20}{2}(7 + 64) = \\) <b>710</b>" },
      { q: "Find the sum to infinity of the geometric series \\(81 + 27 + 9 + \\dots\\), justifying why it exists.", m: 3, a: "\\(r = \\frac13\\)，\\(|r| &lt; 1\\) so it converges (R1)；\\(S_\\infty = \\frac{81}{1 - \\frac13} = \\) <b>121.5</b>" },
      { q: "Evaluate \\(\\sum_{k=1}^{12}(5k - 2)\\).", m: 3, a: "12 terms, first 3, last 58 → \\(\\frac{12}{2}(3 + 58) = \\) <b>366</b>" },
      { q: "$3000 is invested at 4.5% per annum compounded quarterly. Find the value of the investment after 6 years, to the nearest cent.", m: 3, a: "\\(3000\\left(1 + \\frac{4.5}{400}\\right)^{24}\\) (M1)(A1) = <b>$3923.97</b>（A1）" },
      { q: "A geometric series has \\(u_1 = 5\\) and \\(r = 1.2\\). Find the least value of n for which \\(S_n &gt; 500\\).", m: 4, a: "\\(\\frac{5(1.2^n - 1)}{0.2} &gt; 500\\) → \\(1.2^n &gt; 21\\) → \\(n &gt; 16.7\\) → <b>n = 17</b>" },
    ],
  },
  "math-2": {
    title: "Laws of exponents · Logarithms · Exponential equations & models",
    intro: "Paper 1 成日考：化同底、合併 log、隱藏二次方程；Paper 2 就考 growth/decay model。",
    parts: [
      {
        h: "Laws of exponents 指數定律",
        min: 1.5,
        blocks: [
          ["key", "\\(a^m a^n = a^{m+n}\\)　\\(\\frac{a^m}{a^n} = a^{m-n}\\)　\\((a^m)^n = a^{mn}\\)　\\(a^0 = 1\\)　\\(a^{-n} = \\frac{1}{a^n}\\)　\\(a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m\\)"],
          ["rhyme", "口訣 1", "同底乘就加，除就減，次方再次方就乘", "分數次方：「分母開方，分子次方」— 先開方數字細啲：\\(8^{2/3} = (\\sqrt[3]{8})^2 = 4\\)。"],
          ["eg", "Solve \\(4^{x+1} = 8^x\\).", [
            "化同底 2：\\(2^{2x+2} = 2^{3x}\\)",
            "次方相等：2x + 2 = 3x → <b>x = 2</b> ✅",
          ]],
        ],
      },
      {
        h: "Logarithms 對數",
        min: 3,
        blocks: [
          ["key", "\\(a^x = b \\iff x = \\log_a b\\)（a &gt; 0, a ≠ 1, b &gt; 0）　\\(\\ln x = \\log_e x\\)"],
          ["rhyme", "口訣 2", "log 即係問次方", "\\(\\log_2 32\\) = 「2 幾多次方 = 32？」→ 5。\\(\\log_a 1 = 0\\)，\\(\\log_a a = 1\\)。"],
          ["table", ["Law", "寫法", "廣東話記法"], [
            ["Product", "\\(\\log_a xy = \\log_a x + \\log_a y\\)", "乘變加"],
            ["Quotient", "\\(\\log_a \\frac{x}{y} = \\log_a x - \\log_a y\\)", "除變減"],
            ["Power", "\\(\\log_a x^m = m\\log_a x\\)", "次方拎出嚟乘"],
            ["Change of base", "\\(\\log_a x = \\frac{\\log_b x}{\\log_b a} = \\frac{\\ln x}{\\ln a}\\)", "換底：上下都 ln"],
          ]],
          ["eg", "Solve \\(\\log_2 x + \\log_2(x - 2) = 3\\).", [
            "合併：\\(\\log_2 x(x - 2) = 3\\) → \\(x^2 - 2x = 8\\)",
            "\\((x - 4)(x + 2) = 0\\) → x = 4 or −2",
            "Reject −2（log 入面唔可以負）→ <b>x = 4</b> ✅（寫埋原因 = R1）",
          ]],
          ["trap", [
            "<b>冇</b> \\(\\log(a + b)\\) 嘅定律！\\(\\log(x+2) \\neq \\log x + \\log 2\\)。",
            "\\((\\ln x)^2 \\neq 2\\ln x\\)；只有 \\(\\ln x^2 = 2\\ln x\\)。",
            "每個答案都要代返入原式 check：log 入面一定要 &gt; 0。",
          ]],
        ],
      },
      {
        h: "Exponential equations & models 指數方程同模型",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 3", "唔同底就兩邊 ln，見到 \\(a^{2x}\\) 就設 y", "\\(3^{2x} = 7\\) → \\(2x\\ln 3 = \\ln 7\\) → \\(x = \\frac{\\ln 7}{2\\ln 3}\\)（P1 留 exact）。"],
          ["eg", "Solve \\(e^{2x} - 5e^x + 6 = 0\\).", [
            "Let \\(y = e^x\\)：\\(y^2 - 5y + 6 = 0\\) → y = 2 or 3",
            "\\(e^x = 2\\) → <b>x = ln 2</b>；\\(e^x = 3\\) → <b>x = ln 3</b> ✅（如果 y ≤ 0 就 reject，因為 \\(e^x &gt; 0\\)）",
          ]],
          ["key", "Model \\(N = N_0 e^{kt}\\)：k &gt; 0 growth，k &lt; 0 decay；t = 0 時 N = \\(N_0\\)（initial value）。<br>步驟：<b>先除 \\(N_0\\)，再 ln</b>。"],
          ["eg", "The mass of a substance is \\(A = 500e^{-0.02t}\\) grams, t in years. Find when A = 200.", [
            "\\(e^{-0.02t} = 0.4\\) → \\(t = \\frac{\\ln 0.4}{-0.02} = \\) <b>45.8 years</b> ✅",
          ]],
          ["trap", [
            "P1 要 exact：寫 \\(\\frac{\\ln 7}{2\\ln 3}\\)，唔好變小數。",
            "Model 題答案要有單位，同埋睇清楚問「幾時」定「幾多」。",
          ]],
        ],
      },
      {
        h: "Exp & log graphs（2.9）",
        min: 1,
        blocks: [
          ["table", ["Graph", "必過點", "Asymptote", "Domain / Range"], [
            ["\\(y = a^x\\)，\\(y = e^x\\)", "(0, 1)", "y = 0", "x ∈ ℝ；y &gt; 0"],
            ["\\(y = \\log_a x\\)，\\(y = \\ln x\\)", "(1, 0)", "x = 0", "x &gt; 0；y ∈ ℝ"],
          ]],
          ["note", "兩者互為 inverse → reflection in y = x。詳細 transformation 睇 math-6 嘅 10 分鐘筆記。"],
        ],
      },
    ],
    summary: [
      "同底乘加、除減、次方乘",
      "分母開方，分子次方",
      "log 即係問次方",
      "乘變加，除變減，次方拎出嚟乘；冇 log(a+b)",
      "唔同底就兩邊 ln；見 \\(a^{2x}\\) 就設 y",
      "model 先除 \\(N_0\\) 再 ln；答案代返 check",
    ],
    practice: [
      { q: "Find the exact value of \\(\\log_{10} 8 - \\log_{10} 4 + \\log_{10} 5\\).", m: 3, a: "\\(\\log_{10}\\frac{8 \\times 5}{4} = \\log_{10} 10 = \\) <b>1</b>" },
      { q: "Solve \\(5^{2x-1} = 3\\), giving your answer in exact form.", m: 3, a: "\\((2x - 1)\\ln 5 = \\ln 3\\) → \\(x = \\frac{\\ln 3 + \\ln 5}{2\\ln 5} = \\) <b>\\(\\frac{\\ln 15}{2\\ln 5}\\)</b>（或 \\(\\frac{\\ln 15}{\\ln 25}\\)）" },
      { q: "Solve \\(\\log_3(x + 1) + \\log_3(x - 1) = 1\\).", m: 4, a: "\\(x^2 - 1 = 3\\) → x = ±2；reject −2（log of negative）→ <b>x = 2</b>" },
      { q: "Solve \\(9^x - 10 \\times 3^x + 9 = 0\\).", m: 4, a: "\\(y = 3^x\\)：\\(y^2 - 10y + 9 = 0\\) → y = 1 or 9 → <b>x = 0 or x = 2</b>" },
      { q: "Given \\(\\log_a 2 = p\\) and \\(\\log_a 3 = q\\), express \\(\\log_a 18\\) and \\(\\log_a \\frac{8}{9}\\) in terms of p and q.", m: 4, a: "\\(\\log_a(2 \\times 3^2) = \\) <b>p + 2q</b>；\\(\\log_a \\frac{2^3}{3^2} = \\) <b>3p − 2q</b>" },
    ],
  },
  "math-3": {
    title: "Deductive proof · Binomial theorem",
    intro: "Proof 題靠格式攞分；binomial 題靠 general term 一條式搞掂。",
    parts: [
      {
        h: "Simple deductive proof 證明",
        min: 2.5,
        blocks: [
          ["key", "格式：<b>LHS = … = … = RHS</b>（由一邊推到另一邊），最後寫一句結論。<br>Even = 2n，odd = 2n + 1，consecutive = n, n + 1, n + 2（n ∈ ℤ）。Identity 用 ≡。"],
          ["rhyme", "口訣 1", "由左行到右，唔好兩邊一齊郁", "揀複雜嗰邊開始拆，拆到等於另一邊。唔可以由要證嘅結論開始推。"],
          ["eg", "Prove that the sum of any two odd integers is even.", [
            "Let the odd integers be 2m + 1 and 2n + 1，m, n ∈ ℤ",
            "Sum = 2m + 2n + 2 = <b>2(m + n + 1)</b>",
            "Since m + n + 1 is an integer, the sum is even. ∎（呢句 = R1）",
          ]],
          ["trap", [
            "代幾個數入去試 <b>唔係</b> proof（但一個 counterexample 就可以 disprove）。",
            "兩個 odd 數要用唔同字母（2m + 1 同 2n + 1），用同一個 n 就只證咗相同嘅數。",
            "冇結論句會失最後一分。",
          ]],
        ],
      },
      {
        h: "Binomial expansion 二項式展開",
        min: 2,
        blocks: [
          ["key", "\\((a + b)^n = \\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r\\)　　\\(\\binom{n}{r} = {}^nC_r = \\frac{n!}{r!(n-r)!}\\)"],
          ["rhyme", "口訣 2", "a 次數落，b 次數升，加埋永遠等於 n", "係數用 Pascal's triangle（細 n）或 nCr。n = 4：1, 4, 6, 4, 1。"],
          ["eg", "Expand \\((x + 2)^4\\).", [
            "\\(x^4 + 4x^3(2) + 6x^2(2)^2 + 4x(2)^3 + 2^4\\)",
            "= <b>\\(x^4 + 8x^3 + 24x^2 + 32x + 16\\)</b> ✅",
          ]],
        ],
      },
      {
        h: "Finding a specific term 搵指定項",
        min: 3,
        blocks: [
          ["rhyme", "口訣 3", "寫 general term，執 x 次方，令佢等於目標", "Step：① 寫 \\(\\binom{n}{r}a^{n-r}b^r\\) ② 計 x 嘅總次方 ③ = 目標次方，解 r ④ 代返計係數。"],
          ["eg", "Find the coefficient of \\(x^5\\) in \\((2x - 3)^7\\).", [
            "General term：\\(\\binom{7}{r}(2x)^{7-r}(-3)^r\\)",
            "7 − r = 5 → r = 2",
            "\\(\\binom{7}{2}(2)^5(-3)^2 = 21 \\times 32 \\times 9 = \\) <b>6048</b> ✅",
          ]],
          ["eg", "Find the constant term in \\(\\left(x^2 + \\frac{1}{x}\\right)^6\\).", [
            "\\(\\binom{6}{r}(x^2)^{6-r}(x^{-1})^r\\)：x 次方 = 12 − 2r − r = 12 − 3r = 0 → r = 4",
            "\\(\\binom{6}{4} = \\) <b>15</b> ✅",
          ]],
          ["trap", [
            "負號要包埋入 b：\\((-3)^r\\)，唔係 \\(-3^r\\)。",
            "問 <b>coefficient</b> 就唔好寫 x；問 <b>term</b> 就要連 x 寫。",
            "r 由 0 開始：第 r + 1 項先用 r。",
          ]],
        ],
      },
    ],
    summary: [
      "由左行到右，唔好兩邊一齊郁；最後寫結論",
      "Even 2n，odd 2n + 1，兩個數用兩個字母",
      "a 次數落，b 次數升，加埋等於 n",
      "寫 general term，執 x 次方，令佢等於目標",
      "負號入括號；coefficient 唔寫 x",
    ],
    practice: [
      { q: "Prove that the square of any odd integer is odd.", m: 3, a: "\\((2n + 1)^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1\\)；\\(2n^2 + 2n\\) is an integer, so it is <b>odd</b>." },
      { q: "Find the coefficient of \\(x^2\\) in the expansion of \\((3 - x)^5\\).", m: 3, a: "\\(\\binom{5}{2}(3)^3(-x)^2\\) → \\(10 \\times 27 = \\) <b>270</b>" },
      { q: "Find the constant term in the expansion of \\(\\left(2x + \\frac{1}{x^2}\\right)^6\\).", m: 4, a: "\\(\\binom{6}{r}(2x)^{6-r}x^{-2r}\\)：6 − 3r = 0 → r = 2；\\(15 \\times 2^4 = \\) <b>240</b>" },
      { q: "Show that \\((n + 2)^2 - n^2\\) is a multiple of 4 for all \\(n \\in \\mathbb{Z}\\).", m: 3, a: "\\(n^2 + 4n + 4 - n^2 = 4n + 4 = 4(n + 1)\\)，n + 1 ∈ ℤ → <b>multiple of 4</b>" },
      { q: "In the expansion of \\((1 + kx)^6\\), the coefficient of \\(x^2\\) is 60. Find the possible values of k.", m: 4, a: "\\(\\binom{6}{2}k^2 = 15k^2 = 60\\) → \\(k^2 = 4\\) → <b>k = ±2</b>" },
    ],
  },
  "math-4": {
    title: "Straight lines · Functions · Composite & inverse",
    intro: "Topic 2 嘅基本功：每份 paper 都有一題 composite / inverse。",
    parts: [
      {
        h: "Straight lines 直線",
        min: 1.5,
        blocks: [
          ["key", "\\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\)　forms：\\(y = mx + c\\)，\\(ax + by + d = 0\\)，\\(y - y_1 = m(x - x_1)\\)<br>Parallel：\\(m_1 = m_2\\)　Perpendicular：\\(m_1 m_2 = -1\\)"],
          ["rhyme", "口訣 1", "垂直就倒轉再變號", "m = 3 → 垂直 m = \\(-\\frac13\\)。"],
          ["eg", "Find the line through (2, −1) perpendicular to \\(y = 3x + 4\\), in the form ax + by + d = 0.", [
            "\\(m = -\\frac13\\)：\\(y + 1 = -\\frac13(x - 2)\\)",
            "× 3：3y + 3 = −x + 2 → <b>x + 3y + 1 = 0</b> ✅（a, b, d 要係整數）",
          ]],
        ],
      },
      {
        h: "Functions & key features 函數",
        min: 2,
        blocks: [
          ["key", "Function：每個 x（domain）只對應 <b>一個</b> y（range）→ vertical line test。<br>Key features（2.4）：intercepts、max/min（vertex）、asymptotes、symmetry — P2 用 GDC 搵，答 3 s.f.。"],
          ["rhyme", "口訣 2", "分母唔做零，根號唔可負，log 入面要正數", "搵 largest possible domain 就靠呢句（詳細表喺 math-6）。"],
          ["trap", [
            "Range 要用 y 或 f(x) 寫，例如 f(x) ≥ 2，唔好寫 x ≥ 2。",
            "Sketch 要標 intercepts 坐標、端點（實心 / 空心）同 asymptote 方程。",
          ]],
        ],
      },
      {
        h: "Composite functions 合成函數",
        min: 2,
        blocks: [
          ["key", "\\((f \\circ g)(x) = f(g(x))\\)：<b>先做 g，再做 f</b>"],
          ["rhyme", "口訣 3", "入面先做，由右至左", "\\(f \\circ g\\)：g 喺右邊，最貼 x，所以先做。"],
          ["eg", "\\(f(x) = 3x - 1\\)，\\(g(x) = x^2 + 2\\)。Find \\((f \\circ g)(x)\\), \\((g \\circ f)(x)\\) and \\((f \\circ g)(1)\\).", [
            "\\(f(g(x)) = 3(x^2 + 2) - 1 = \\) <b>\\(3x^2 + 5\\)</b>",
            "\\(g(f(x)) = \\) <b>\\((3x - 1)^2 + 2\\)</b>（一般 \\(f \\circ g \\neq g \\circ f\\)）",
            "數字題最快：g(1) = 3 → f(3) = <b>8</b> ✅",
          ]],
        ],
      },
      {
        h: "Inverse functions 反函數",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 4", "x y 對調，再搵返 y", "① y = f(x) ② 對調 x、y ③ 令 y 做主項 ④ 寫 \\(f^{-1}(x) = …\\) 同 domain。"],
          ["key", "只有 <b>one-to-one</b> function 先有 inverse（horizontal line test）。<br>\\(f^{-1}\\) 嘅 graph = f 喺 <b>y = x</b> 嘅 reflection；domain of \\(f^{-1}\\) = range of f；\\((f \\circ f^{-1})(x) = x\\)。"],
          ["eg", "Find \\(f^{-1}(x)\\) for \\(f(x) = \\frac{2x + 3}{x - 1}\\), x ≠ 1.", [
            "對調：\\(x = \\frac{2y + 3}{y - 1}\\) → \\(xy - x = 2y + 3\\)",
            "y 放一邊：\\(y(x - 2) = x + 3\\) → <b>\\(f^{-1}(x) = \\frac{x + 3}{x - 2}\\), x ≠ 2</b> ✅",
          ]],
          ["trap", [
            "\\(f^{-1}(x) \\neq \\frac{1}{f(x)}\\)！",
            "求 \\(f^{-1}(5)\\) 呢類數字：直接解 f(x) = 5 最快。",
            "二次函數要先 restrict domain（例如 x ≥ vertex 嘅 x）先有 inverse；開方揀 + 定 − 睇 domain。",
          ]],
        ],
      },
    ],
    summary: [
      "垂直就倒轉再變號",
      "一個 x 只可以有一個 y",
      "入面先做，由右至左",
      "x y 對調，再搵返 y",
      "inverse = y = x 鏡像；domain range 對調",
      "\\(f^{-1}\\) 唔係 1/f",
    ],
    practice: [
      { q: "\\(f(x) = 2x + 5\\) and \\(g(x) = x^2\\). Find \\((g \\circ f)(-1)\\).", m: 2, a: "f(−1) = 3 → g(3) = <b>9</b>" },
      { q: "Let \\(f(x) = 4 - 3x\\). Find \\(f^{-1}(x)\\) and hence \\(f^{-1}(10)\\).", m: 3, a: "\\(x = 4 - 3y\\) → <b>\\(f^{-1}(x) = \\frac{4 - x}{3}\\)</b>；\\(f^{-1}(10) = \\) <b>−2</b>" },
      { q: "The line \\(L_1\\) has equation \\(2x - 5y = 10\\). Find the equation of the line perpendicular to \\(L_1\\) passing through (0, 3).", m: 4, a: "\\(L_1\\)：\\(y = \\frac25 x - 2\\)，m = \\(\\frac25\\)；perpendicular m = \\(-\\frac52\\) → <b>\\(y = -\\frac52 x + 3\\)</b>" },
      { q: "Let \\(f(x) = \\sqrt{x - 1} + 2\\), x ≥ 1. State the range of f, and find \\(f^{-1}(x)\\) stating its domain.", m: 5, a: "Range <b>f(x) ≥ 2</b>；\\(x = \\sqrt{y - 1} + 2\\) → <b>\\(f^{-1}(x) = (x - 2)^2 + 1\\)</b>, domain <b>x ≥ 2</b>" },
      { q: "Let \\(f(x) = x^2 - 4x\\), x ≥ 2. Explain why \\(f^{-1}\\) exists and find \\(f^{-1}(x)\\).", m: 4, a: "f is one-to-one for x ≥ 2（vertex at x = 2）(R1)。\\(y = (x - 2)^2 - 4\\) → <b>\\(f^{-1}(x) = 2 + \\sqrt{x + 4}\\)</b>, x ≥ −4（取 + 因為 x ≥ 2）" },
    ],
  },
  "math-5": {
    title: "Quadratic forms · Solving & inequalities · Discriminant",
    intro: "三種寫法、一個 Δ — 識轉換就成章搞掂。",
    parts: [
      {
        h: "Three forms 三種寫法",
        min: 2.5,
        blocks: [
          ["table", ["Form", "寫法", "一眼睇到"], [
            ["Standard", "\\(ax^2 + bx + c\\)", "y-intercept c；axis \\(x = -\\frac{b}{2a}\\)"],
            ["Vertex", "\\(a(x - h)^2 + k\\)", "vertex (h, k)"],
            ["Factorised", "\\(a(x - p)(x - q)\\)", "x-intercepts p, q；axis \\(x = \\frac{p + q}{2}\\)"],
          ]],
          ["rhyme", "口訣 1", "a 正笑口，a 負喊口；括號入面 h 要反轉", "\\(2(x + 3)^2 - 1\\) 嘅 vertex 係 (<b>−3</b>, −1)。"],
          ["eg", "Write \\(2x^2 + 8x + 3\\) in the form \\(a(x - h)^2 + k\\).", [
            "抽 a：\\(2(x^2 + 4x) + 3\\)",
            "配方：\\(2[(x + 2)^2 - 4] + 3 = \\) <b>\\(2(x + 2)^2 - 5\\)</b> → vertex (−2, −5) ✅",
          ]],
        ],
      },
      {
        h: "Solving & inequalities 解方程同不等式",
        min: 2.5,
        blocks: [
          ["key", "\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)　P1：factorise / formula / completing square；P2：GDC。<br>Inequality：<b>解 = 0 → sketch → 睇上定下</b>"],
          ["rhyme", "口訣 2", "大過零揀兩邊，細過零夾中間", "（a &gt; 0 時）\\((x - 4)(x + 3) &gt; 0\\) → x &lt; −3 <b>or</b> x &gt; 4；\\(&lt; 0\\) → −3 &lt; x &lt; 4。"],
          ["eg", "Solve \\(2x^2 - 5x - 3 \\le 0\\).", [
            "\\((2x + 1)(x - 3) = 0\\) → x = \\(-\\frac12\\), 3",
            "笑口，≤ 0 夾中間 → <b>\\(-\\frac12 \\le x \\le 3\\)</b> ✅",
          ]],
          ["trap", [
            "兩邊除 x 會失咗 x = 0 呢個根 — 要 factorise。",
            "“x &lt; −3 and x &gt; 4” 係錯（冇數做到），要寫 <b>or</b>。",
          ]],
        ],
      },
      {
        h: "Discriminant Δ 判別式",
        min: 3,
        blocks: [
          ["table", ["Δ = b² − 4ac", "Roots", "Graph / line vs curve"], [
            ["Δ &gt; 0", "two distinct real roots", "交 x 軸兩次 / line meets curve at 2 points"],
            ["Δ = 0", "two equal (repeated) roots", "掂 x 軸 / line is <b>tangent</b>"],
            ["Δ &lt; 0", "no real roots", "唔交 / line does not meet curve"],
            ["Δ ≥ 0", "real roots", "有交點"],
          ]],
          ["rhyme", "口訣 3", "line 撞 curve：代入、移埋一邊、睇 Δ", "Tangent → Δ = 0；always positive → a &gt; 0 and Δ &lt; 0。"],
          ["eg", "Find k such that \\(y = kx - 4\\) is a tangent to \\(y = x^2\\).", [
            "\\(x^2 = kx - 4\\) → \\(x^2 - kx + 4 = 0\\)",
            "Δ = \\(k^2 - 16 = 0\\) → <b>k = ±4</b> ✅",
          ]],
          ["eg", "Find k such that \\(kx^2 + 4x + k = 0\\) has two distinct real roots.", [
            "Δ = 16 − 4k² &gt; 0 → k² &lt; 4 → −2 &lt; k &lt; 2",
            "仲要 k ≠ 0（唔係 quadratic）→ <b>−2 &lt; k &lt; 2, k ≠ 0</b> ✅",
          ]],
          ["trap", [
            "“Two distinct” 用 &gt; 0；“real roots” 用 ≥ 0 — 差一個等號就失 A1。",
            "Δ 入面有 k² → 又係一條二次不等式，要 sketch 再揀範圍。",
          ]],
        ],
      },
    ],
    summary: [
      "a 正笑口，a 負喊口；h 要反轉",
      "配方：抽 a、半 b 平方、減返出嚟",
      "大過零揀兩邊，細過零夾中間",
      "line 撞 curve：代入、移埋一邊、睇 Δ",
      "Tangent Δ = 0；distinct &gt; 0；real ≥ 0",
    ],
    practice: [
      { q: "Let \\(f(x) = -x^2 + 6x - 5\\). Find the coordinates of the vertex, the x-intercepts and the y-intercept.", m: 4, a: "Vertex <b>(3, 4)</b>；\\(-(x - 1)(x - 5)\\) → <b>x = 1, 5</b>；y-intercept <b>(0, −5)</b>" },
      { q: "Solve \\(x^2 - x - 12 &gt; 0\\).", m: 3, a: "\\((x - 4)(x + 3) &gt; 0\\) → <b>x &lt; −3 or x &gt; 4</b>" },
      { q: "Find the values of k for which \\(x^2 + (k - 2)x + 4 = 0\\) has no real roots.", m: 4, a: "\\((k - 2)^2 - 16 &lt; 0\\) → −4 &lt; k − 2 &lt; 4 → <b>−2 &lt; k &lt; 6</b>" },
      { q: "A quadratic has x-intercepts −1 and 5 and passes through (0, −10). Find its equation in the form \\(y = ax^2 + bx + c\\).", m: 3, a: "\\(y = a(x + 1)(x - 5)\\)，−5a = −10 → a = 2 → <b>\\(y = 2x^2 - 8x - 10\\)</b>" },
      { q: "Write \\(x^2 + 4x + 1\\) in the form \\((x + h)^2 + k\\). Hence solve \\(x^2 + 4x + 1 = 0\\), giving exact answers.", m: 4, a: "<b>\\((x + 2)^2 - 3\\)</b>；\\(x + 2 = \\pm\\sqrt3\\) → <b>\\(x = -2 \\pm \\sqrt3\\)</b>" },
    ],
  },
  "math-7": {
    title: "3D geometry · Sine & cosine rules · Bearings · Radians, arcs & sectors",
    intro: "公式大部分喺 booklet；分數靠揀啱 rule、畫圖、計數機 mode 啱。",
    parts: [
      {
        h: "3D shapes & coordinates 立體",
        min: 2,
        blocks: [
          ["key", "Distance \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}\\)　Midpoint = 坐標平均。<br>Volume：cone \\(\\frac13\\pi r^2h\\)，sphere \\(\\frac43\\pi r^3\\)，pyramid \\(\\frac13Ah\\)；Surface：sphere \\(4\\pi r^2\\)，cone curved \\(\\pi rl\\)。"],
          ["rhyme", "口訣 1", "立體搵角，抽個直角三角形出嚟攤平", "Angle between a line and a plane：由線頂垂直落平面，搵 projection，用 tan / sin / cos。"],
          ["eg", "A cuboid is 3 cm × 4 cm × 12 cm (height 12). Find the angle between a space diagonal and the base.", [
            "Base diagonal = \\(\\sqrt{3^2 + 4^2} = 5\\)",
            "\\(\\tan\\theta = \\frac{12}{5}\\) → <b>θ = 67.4°</b> ✅（space diagonal = 13）",
          ]],
          ["trap", ["Cone 嘅 slant height l ≠ height h：\\(l^2 = r^2 + h^2\\)。", "Hemisphere 表面積：curved \\(2\\pi r^2\\) + 底 \\(\\pi r^2\\)（如果係實心）。"]],
        ],
      },
      {
        h: "Sine rule · Cosine rule · Area 非直角三角形",
        min: 3,
        blocks: [
          ["key", "\\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)　　\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)　　Area = \\(\\frac12 ab\\sin C\\)"],
          ["rhyme", "口訣 2", "有對邊對角用 sine，夾角或三邊用 cosine", "已知一對「邊 + 佢對面嘅角」→ sine rule；SAS 或 SSS → cosine rule。"],
          ["eg", "In triangle ABC, AB = 10, BC = 7 and angle A = 40°. Find the possible sizes of angle C.（ambiguous case）", [
            "\\(\\sin C = \\frac{10\\sin 40°}{7} = 0.918\\) → C = 66.7°",
            "或者 C = 180° − 66.7° = 113.3°；113.3° + 40° &lt; 180° → 都得 → <b>C = 66.7° or 113.3°</b> ✅",
          ]],
          ["trap", [
            "Ambiguous case：已知兩邊同一個<b>非夾角</b>，sine rule 搵角要諗埋鈍角 180° − θ。",
            "最大角對最長邊；cosine rule 搵角時 cos 負 → 鈍角，正常。",
            "Calculator 要 degree mode（題目用度數時）。",
          ]],
        ],
      },
      {
        h: "Bearings · Elevation & depression（3.3）",
        min: 1.5,
        blocks: [
          ["key", "<b>True bearing</b>：由北方 <b>順時針</b> 量，寫 3 位數（065°）。<br><b>Angle of elevation</b> 由水平向上；<b>depression</b> 由水平向下 — 兩者相等（alternate angles）。"],
          ["rhyme", "口訣 3", "每點畫條北，順時針數三位", "B 由 A 嘅 bearing 係 θ → A 由 B 嘅 bearing 係 θ ± 180°。"],
          ["eg", "From a point 50 m from the base of a tower, the angle of elevation of the top is 32°. Find the height.", [
            "\\(h = 50\\tan 32° = \\) <b>31.2 m</b> ✅",
          ]],
        ],
      },
      {
        h: "Radians · Arc · Sector 弧度",
        min: 2,
        blocks: [
          ["key", "\\(\\pi\\) rad = 180°　　Arc \\(l = r\\theta\\)　　Sector \\(A = \\frac12 r^2\\theta\\)（θ 一定要 radians）<br>Sector perimeter = \\(2r + r\\theta\\)；Segment = sector − triangle = \\(\\frac12 r^2(\\theta - \\sin\\theta)\\)"],
          ["rhyme", "口訣 4", "度變弧乘 π/180，弧變度乘 180/π", "135° = \\(\\frac{3\\pi}{4}\\)；\\(\\frac{2\\pi}{5}\\) = 72°。"],
          ["eg", "A sector has radius 8 cm and angle 0.9 rad. Find the arc length, perimeter, area and the area of the segment.", [
            "Arc = 8(0.9) = <b>7.2 cm</b>；perimeter = 16 + 7.2 = <b>23.2 cm</b>",
            "Area = ½(64)(0.9) = <b>28.8 cm²</b>；segment = 32(0.9 − sin 0.9) = <b>3.73 cm²</b>（radian mode！）✅",
          ]],
          ["trap", ["Perimeter 唔好漏兩條半徑。", "計 sin 0.9 要用 radian mode，否則全錯。"]],
        ],
      },
    ],
    summary: [
      "立體搵角，抽直角三角形攤平",
      "有對邊對角用 sine，夾角或三邊用 cosine",
      "Sine rule 搵角：諗埋 180° − θ",
      "每點畫條北，順時針數三位",
      "弧長 rθ，扇形 ½r²θ，θ 一定用 radians",
      "計之前 check degree / radian mode",
    ],
    practice: [
      { q: "Convert 210° to radians and \\(\\frac{2\\pi}{5}\\) to degrees.", m: 2, a: "<b>\\(\\frac{7\\pi}{6}\\)</b>；<b>72°</b>" },
      { q: "In triangle PQR, PQ = 9 cm, QR = 12 cm and angle PQR = 110°. Find PR and the area of the triangle.", m: 5, a: "\\(PR^2 = 81 + 144 - 216\\cos 110°\\) → <b>PR = 17.3 cm</b>；Area = ½(9)(12)sin 110° = <b>50.7 cm²</b>" },
      { q: "A triangle has sides 5, 7 and 8 cm. Find the largest angle.", m: 3, a: "Opposite 8：\\(\\cos\\theta = \\frac{25 + 49 - 64}{70} = \\frac17\\) → <b>81.8°</b>" },
      { q: "A sector has angle 1.2 radians and perimeter 32 cm. Find the radius and the area of the sector.", m: 4, a: "2r + 1.2r = 32 → <b>r = 10 cm</b>；Area = ½(100)(1.2) = <b>60 cm²</b>" },
      { q: "A(2, −1, 3) and B(6, 1, −1). Find AB and the midpoint of AB.", m: 3, a: "\\(\\sqrt{16 + 4 + 16} = \\) <b>6</b>；midpoint <b>(4, 0, 1)</b>" },
    ],
  },
  "math-8": {
    title: "Unit circle · Identities · Trig graphs · Trig equations",
    intro: "P1 必考 exact values 同解 trig equation；P2 必考 modelling（Ferris wheel、潮汐）。",
    parts: [
      {
        h: "Unit circle & exact values 單位圓",
        min: 2.5,
        blocks: [
          ["key", "cos θ = x 坐標，sin θ = y 坐標，\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\)"],
          ["table", ["θ", "0", "π/6", "π/4", "π/3", "π/2"], [
            ["sin", "0", "½", "√2/2", "√3/2", "1"],
            ["cos", "1", "√3/2", "√2/2", "½", "0"],
            ["tan", "0", "√3/3", "1", "√3", "冇定義（asymptote）"],
          ]],
          ["rhyme", "口訣 1", "All Students Take Coffee（CAST）", "Q1 全部正，Q2 sin 正，Q3 tan 正，Q4 cos 正。先用 reference angle 計數值，再用象限定符號。"],
          ["eg", "Find the exact values of \\(\\cos\\frac{5\\pi}{6}\\), \\(\\sin\\frac{4\\pi}{3}\\) and \\(\\tan\\frac{7\\pi}{4}\\).", [
            "\\(\\frac{5\\pi}{6}\\) 喺 Q2（ref π/6）→ <b>\\(-\\frac{\\sqrt3}{2}\\)</b>",
            "\\(\\frac{4\\pi}{3}\\) 喺 Q3（ref π/3）→ <b>\\(-\\frac{\\sqrt3}{2}\\)</b>；\\(\\frac{7\\pi}{4}\\) 喺 Q4 → <b>−1</b> ✅",
          ]],
        ],
      },
      {
        h: "Identities 恆等式",
        min: 2,
        blocks: [
          ["key", "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\)　　\\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\)<br>\\(\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta\\)"],
          ["rhyme", "口訣 2", "畀一個搵另一個：先平方關係，再用象限揀正負", "唔好用 GDC 計角度再 sin — P1 要 exact。"],
          ["eg", "Given \\(\\cos\\theta = \\frac23\\) and \\(\\frac{3\\pi}{2} &lt; \\theta &lt; 2\\pi\\), find \\(\\sin\\theta\\), \\(\\sin 2\\theta\\) and \\(\\cos 2\\theta\\).", [
            "\\(\\sin^2\\theta = 1 - \\frac49 = \\frac59\\)；Q4 → <b>\\(\\sin\\theta = -\\frac{\\sqrt5}{3}\\)</b>",
            "\\(\\sin 2\\theta = 2(-\\frac{\\sqrt5}{3})(\\frac23) = \\) <b>\\(-\\frac{4\\sqrt5}{9}\\)</b>；\\(\\cos 2\\theta = 2(\\frac49) - 1 = \\) <b>\\(-\\frac19\\)</b> ✅",
          ]],
        ],
      },
      {
        h: "Circular function graphs & modelling 三角函數圖像",
        min: 2,
        blocks: [
          ["key", "\\(y = a\\sin\\big(b(x - c)\\big) + d\\)：amplitude |a|，period \\(\\frac{2\\pi}{b}\\)，principal axis y = d，max = d + |a|，min = d − |a|。"],
          ["rhyme", "口訣 3", "高低相減除二係 a，高低相加除二係 d", "b = 2π ÷ period；cos 由最高點開始，−cos 由最低點開始。"],
          ["eg", "Tide depth: max 9 m at t = 2, next min 3 m at t = 8 (hours). Find a model \\(h = a\\cos\\big(b(t - c)\\big) + d\\).", [
            "a = (9 − 3)/2 = 3；d = (9 + 3)/2 = 6",
            "Half period = 6 → period 12 → b = \\(\\frac{2\\pi}{12} = \\frac{\\pi}{6}\\)；cos 最高點喺 t = 2 → c = 2",
            "<b>\\(h = 3\\cos\\big(\\frac{\\pi}{6}(t - 2)\\big) + 6\\)</b> ✅",
          ]],
        ],
      },
      {
        h: "Solving trig equations 解三角方程",
        min: 2.5,
        blocks: [
          ["rhyme", "口訣 4", "先搵基本角，再用 CAST 搵齊；有 2x 就先拉長範圍", "sin：θ, π − θ；cos：θ, 2π − θ；tan：θ, θ + π。2x 喺 [0, 2π] → x 喺 [0, π]。"],
          ["eg", "Solve \\(\\sin 2x = \\frac{\\sqrt3}{2}\\) for \\(0 \\le x \\le \\pi\\).", [
            "2x ∈ [0, 2π]：2x = \\(\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\)",
            "<b>x = \\(\\frac{\\pi}{6}, \\frac{\\pi}{3}\\)</b> ✅",
          ]],
          ["eg", "Solve \\(2\\cos^2 x + 3\\sin x - 3 = 0\\) for \\(0 \\le x \\le 2\\pi\\).", [
            "用 \\(\\cos^2 x = 1 - \\sin^2 x\\)：\\(2\\sin^2 x - 3\\sin x + 1 = 0\\)",
            "\\((2\\sin x - 1)(\\sin x - 1) = 0\\) → sin x = ½ or 1",
            "<b>x = \\(\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}\\)</b> ✅",
          ]],
          ["trap", [
            "唔好兩邊除 sin x / cos x — 會失咗 sin x = 0 嗰啲解；要 factorise。",
            "漏解 = 失最後 A1；範圍兩端（0、2π）要 check 包唔包。",
            "P2 用 GDC 畫圖搵 intersection：記得 radian mode 同 window 要包晒範圍。",
          ]],
        ],
      },
    ],
    summary: [
      "All Students Take Coffee：象限定符號",
      "畀一個搵另一個：平方關係 + 象限揀正負",
      "高低相減除二係 a，相加除二係 d，b = 2π ÷ period",
      "先搵基本角，再搵齊；有 2x 先拉長範圍",
      "唔好除 sin x，要 factorise",
    ],
    practice: [
      { q: "Find the exact value of \\(\\sin\\frac{2\\pi}{3} + \\cos\\frac{5\\pi}{4}\\).", m: 2, a: "\\(\\frac{\\sqrt3}{2} - \\frac{\\sqrt2}{2} = \\) <b>\\(\\frac{\\sqrt3 - \\sqrt2}{2}\\)</b>" },
      { q: "Given \\(\\sin\\theta = \\frac{5}{13}\\) and θ is obtuse, find the exact values of \\(\\cos\\theta\\) and \\(\\sin 2\\theta\\).", m: 4, a: "<b>\\(\\cos\\theta = -\\frac{12}{13}\\)</b>（Q2）；\\(\\sin 2\\theta = 2(\\frac{5}{13})(-\\frac{12}{13}) = \\) <b>\\(-\\frac{120}{169}\\)</b>" },
      { q: "Let \\(f(x) = 4\\sin(2x) - 1\\). Write down the amplitude, the period and the range of f.", m: 3, a: "Amplitude <b>4</b>；period <b>π</b>；range <b>−5 ≤ f(x) ≤ 3</b>" },
      { q: "Solve \\(2\\cos x + \\sqrt3 = 0\\) for \\(0 \\le x \\le 2\\pi\\).", m: 3, a: "\\(\\cos x = -\\frac{\\sqrt3}{2}\\) → <b>x = \\(\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\)</b>" },
      { q: "Solve \\(\\cos 2x - 3\\cos x + 2 = 0\\) for \\(0 \\le x \\le 2\\pi\\).", m: 5, a: "\\(2\\cos^2 x - 3\\cos x + 1 = 0\\) → \\((2\\cos x - 1)(\\cos x - 1) = 0\\) → <b>x = 0, \\(\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\), 2π</b>" },
    ],
  },
  "math-9": {
    title: "Sampling · Averages & spread · Box plots · Correlation & regression",
    intro: "大部分喺 Paper 2 用 GDC；攞分關鍵係識解讀同用啱字眼。",
    parts: [
      {
        h: "Sampling & data 抽樣",
        min: 1.5,
        blocks: [
          ["table", ["Method", "點做", "記法"], [
            ["Simple random", "每個人機會一樣（抽籤 / random numbers）", "最公平"],
            ["Systematic", "每隔 k 個揀一個（k = N ÷ n）", "隔住揀"],
            ["Stratified", "分組，按比例，組內 <b>random</b> 抽", "比例 + 隨機"],
            ["Quota", "分組，按比例，組內 <b>non-random</b> 揀夠數", "比例 + 唔隨機"],
            ["Convenience", "揀最方便嗰啲", "最易 biased"],
          ]],
          ["note", "Discrete（數得，例如人數）vs continuous（量度，例如身高）。Stratified sample size = 組人數 ÷ 總數 × sample size。"],
        ],
      },
      {
        h: "Averages, spread & diagrams 平均同離散",
        min: 3,
        blocks: [
          ["key", "Mean \\(\\bar x = \\frac{\\sum fx}{n}\\)；IQR = Q₃ − Q₁；σ 用 GDC（抄 <b>σx</b> 唔好抄 Sx）；variance = σ²。<br><b>Outlier</b>：&lt; Q₁ − 1.5 × IQR 或 &gt; Q₃ + 1.5 × IQR。"],
          ["rhyme", "口訣 1", "加數只郁中心，乘數中心同 spread 一齊郁", "全部 ×a + b：mean → a·mean + b，σ → |a|σ，variance → a²σ²。"],
          ["eg", "Q₁ = 20, Q₃ = 31. Show that 49 is an outlier.", [
            "IQR = 11；upper fence = 31 + 1.5(11) = 47.5",
            "<b>49 &gt; 47.5</b>, so 49 is an outlier ✅（一定要寫出比較）",
          ]],
          ["table", ["Diagram", "要記"], [
            ["Grouped data", "用 mid-interval values 估 mean（係 estimate）"],
            ["Cumulative frequency", "喺 upper class boundary 畫點；median 讀 n/2，Q₁ n/4，Q₃ 3n/4"],
            ["Box-and-whisker", "Min, Q₁, median, Q₃, max；outlier 用 × 另外標，鬚畫到最大非 outlier"],
          ]],
          ["trap", [
            "“多過 170 g 有幾多個” = 總數 − cf(170)，唔係直接讀 cf。",
            "有 outlier 就用 median + IQR 描述，因為 mean 同 σ 會被拉走。",
          ]],
        ],
      },
      {
        h: "Correlation & regression 相關同回歸",
        min: 3,
        blocks: [
          ["table", ["r", "描述（要三樣：強弱 + 正負 + linear）"], [
            ["0.9 → 1", "very strong positive linear"],
            ["0.5 → 0.9", "moderate–strong positive linear"],
            ["≈ 0", "no linear correlation"],
            ["負數", "同上，但 negative"],
          ]],
          ["rhyme", "口訣 2", "由 x 估 y 用 y on x，由 y 估 x 用 x on y", "唔可以將 y on x 條線移項去估 x（AA SL 4.10）。兩條線都經過 mean point (x̄, ȳ)。"],
          ["key", "y = ax + b：<b>a</b> = x 每增加 1，y 平均變幾多（用情境 + 單位講）；<b>b</b> = x = 0 時嘅 y。<br>Data range 內 = interpolation（reliable）；外 = <b>extrapolation（unreliable）</b>。"],
          ["eg", "y = 4.38x + 36.0 (r = 0.996) for 2 ≤ x ≤ 10 hours of revision. Estimate the score for 6 hours; comment on using it for 20 hours.", [
            "4.38(6) + 36.0 = <b>62.3</b>",
            "20 is outside 2 ≤ x ≤ 10 → <b>extrapolation, not reliable</b> ✅",
          ]],
          ["trap", [
            "Correlation ≠ causation — 唔好寫 “revision causes higher scores”。",
            "Regression equation 要寫成 “y = …”，係數 3 s.f.。",
          ]],
        ],
      },
    ],
    summary: [
      "Stratified 比例 + 隨機；quota 比例 + 唔隨機",
      "Outlier：Q₁ − 1.5 IQR，Q₃ + 1.5 IQR，寫出比較",
      "加數只郁中心，乘數中心同 spread 一齊郁",
      "GDC 抄 σx；分組用組中點",
      "由 x 估 y 用 y on x，由 y 估 x 用 x on y",
      "r 講三樣：強弱、正負、linear；range 外 = extrapolation",
    ],
    practice: [
      { q: "For the data 3, 7, 7, 8, 10, 12, 15, find the median and the interquartile range.", m: 3, a: "Median <b>8</b>；Q₁ = 7, Q₃ = 12 → <b>IQR = 5</b>" },
      { q: "The mean of 10 numbers is 12. One number, 30, is removed. Find the mean of the remaining numbers.", m: 3, a: "Total 120 − 30 = 90；90 ÷ 9 = <b>10</b>" },
      { q: "A data set has mean 20 and standard deviation 3. Each value is multiplied by 2 and then 5 is subtracted. Find the new mean, standard deviation and variance.", m: 3, a: "Mean <b>35</b>；sd <b>6</b>；variance <b>36</b>" },
      { q: "For 10 ≤ x ≤ 30, the regression line of y on x is y = −1.2x + 50 and r = −0.85. (a) Describe the correlation. (b) Estimate y when x = 20. (c) Explain why this line should not be used to estimate x when y = 30.", m: 4, a: "(a) <b>strong negative linear</b>；(b) <b>26</b>；(c) to estimate x from y you need the <b>regression line of x on y</b>" },
      { q: "A school has 240 Year 1 and 360 Year 2 students. A stratified sample of 40 is taken. How many Year 1 students are in the sample?", m: 2, a: "\\(\\frac{240}{600} \\times 40 = \\) <b>16</b>（Year 2：24）" },
    ],
  },
  "math-10": {
    title: "Probability rules · Venn diagrams · Tree diagrams · Conditional",
    intro: "畫圖先，計數後 — Venn 同 tree 一畫就有 method mark。",
    parts: [
      {
        h: "Basics 基本概率",
        min: 1.5,
        blocks: [
          ["key", "\\(P(A) = \\frac{n(A)}{n(U)}\\)　\\(P(A') = 1 - P(A)\\)　Expected number of occurrences = <b>np</b>"],
          ["rhyme", "口訣 1", "「至少一個」= 1 − 「一個都冇」", "兩粒骰：畫 6 × 6 sample space grid，36 個結果。"],
        ],
      },
      {
        h: "Combined events & Venn 組合事件",
        min: 3,
        blocks: [
          ["key", "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)<br>Mutually exclusive：\\(P(A \\cap B) = 0\\)　Independent：\\(P(A \\cap B) = P(A)P(B)\\)<br>Conditional：\\(P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}\\)"],
          ["rhyme", "口訣 2", "或就加再減交；與就乘（獨立先得）；given 就除條件", "Given B → 分母係 P(B)，即係個 universe 縮細咗做 B。"],
          ["table", ["", "Mutually exclusive", "Independent"], [
            ["意思", "唔可以同時發生", "一個發生唔影響另一個"],
            ["Test", "\\(P(A \\cap B) = 0\\)", "\\(P(A \\cap B) = P(A)P(B)\\) 或 \\(P(A \\mid B) = P(A)\\)"],
          ]],
          ["eg", "In a class of 30, 18 study French, 14 study Spanish and 5 study neither. Find P(both) and P(Spanish | French).", [
            "Venn：18 + 14 − x + 5 = 30 → <b>x = 7</b>，P(both) = \\(\\frac{7}{30}\\)",
            "P(S | F) = \\(\\frac{7}{18}\\) ✅（分母 = 讀 French 嘅 18 個）",
          ]],
          ["trap", [
            "Mutually exclusive ≠ independent！（兩個都有正概率嘅 ME events 一定 <b>唔係</b> independent）",
            "Show independence：要計出 P(A)P(B) 嘅數，同 P(A ∩ B) 比較，再寫結論。",
            "Venn 由中間（intersection）開始填。",
          ]],
        ],
      },
      {
        h: "Tree diagrams & without replacement 樹形圖",
        min: 3,
        blocks: [
          ["rhyme", "口訣 3", "沿住枝乘，唔同結果加", "Without replacement：第二層分母減 1，分子睇第一次抽咗乜。"],
          ["eg", "A bag has 5 red and 3 blue counters. Two are taken without replacement. Find P(same colour) and P(first is red | same colour).", [
            "P(RR) = \\(\\frac58 \\times \\frac47 = \\frac{20}{56}\\)；P(BB) = \\(\\frac38 \\times \\frac27 = \\frac{6}{56}\\)",
            "P(same) = \\(\\frac{26}{56} = \\) <b>\\(\\frac{13}{28}\\)</b>",
            "P(R first | same) = \\(\\frac{20/56}{26/56} = \\) <b>\\(\\frac{10}{13}\\)</b> ✅",
          ]],
          ["trap", ["“Different colours” 有兩條路（RB 同 BR），唔好漏一條。", "Conditional 由 tree 計：分子係「兩樣都啱」嗰條路，分母係條件嘅總和。"]],
        ],
      },
    ],
    summary: [
      "至少一個 = 1 − 一個都冇",
      "或就加再減交",
      "與就乘（獨立先得）",
      "given 就除條件",
      "ME ≠ independent；independent 要計數比較",
      "沿住枝乘，唔同結果加；冇放返分母減 1",
    ],
    practice: [
      { q: "P(A) = 0.6, P(B) = 0.3 and P(A ∩ B) = 0.18. Determine whether A and B are independent, and find P(A ∪ B).", m: 3, a: "P(A)P(B) = 0.18 = P(A ∩ B) → <b>independent</b>；P(A ∪ B) = 0.6 + 0.3 − 0.18 = <b>0.72</b>" },
      { q: "A and B are mutually exclusive with P(A) = 0.25 and P(B) = 0.4. Write down P(A ∩ B) and find P(A ∪ B).", m: 2, a: "<b>0</b>；<b>0.65</b>" },
      { q: "Two fair dice are rolled. Given that at least one die shows a six, find the probability that the total is at least 10.", m: 4, a: "At least one six：11 outcomes；of these total ≥ 10：(6,4), (4,6), (6,5), (5,6), (6,6) → <b>\\(\\frac{5}{11}\\)</b>" },
      { q: "P(rain) = 0.3. If it rains, P(Sam is late) = 0.4; otherwise 0.1. Find P(Sam is late) and P(rain | Sam is late).", m: 5, a: "0.3(0.4) + 0.7(0.1) = <b>0.19</b>；\\(\\frac{0.12}{0.19} = \\) <b>\\(\\frac{12}{19}\\)</b>（0.632）" },
      { q: "A fair die is rolled 120 times. Find the expected number of sixes.", m: 1, a: "120 × \\(\\frac16\\) = <b>20</b>" },
    ],
  },
  "math-11": {
    title: "Discrete random variables · Binomial · Normal distribution",
    intro: "Paper 2 送分位：講清楚 distribution + parameters，GDC 按啱掣。",
    parts: [
      {
        h: "Discrete random variables 離散隨機變量",
        min: 2,
        blocks: [
          ["key", "\\(\\sum P(X = x) = 1\\)　　\\(E(X) = \\sum x\\,P(X = x)\\)　　Fair game：<b>E(gain) = 0</b>"],
          ["rhyme", "口訣 1", "概率加埋等於一，期望值係乘完再加", "E(X) 係長遠平均，唔一定係 X 可以攞到嘅值。"],
          ["eg", "X takes values 1, 2, 3 with probabilities 0.2, k, 0.5. Find k and E(X).", [
            "0.2 + k + 0.5 = 1 → <b>k = 0.3</b>",
            "E(X) = 1(0.2) + 2(0.3) + 3(0.5) = <b>2.3</b> ✅",
          ]],
          ["trap", ["遊戲題：gain = 贏到嘅錢 − 入場費，記得減入場費。"]],
        ],
      },
      {
        h: "Binomial distribution 二項分佈",
        min: 3,
        blocks: [
          ["rhyme", "口訣 2", "定次數、兩結果、p 不變、互獨立", "四樣齊 → \\(X \\sim B(n, p)\\)。寫出 “X ~ B(12, 0.25)” 通常有一分。"],
          ["key", "\\(P(X = r) = \\binom{n}{r}p^r(1 - p)^{n-r}\\)　　E(X) = np　　Var(X) = np(1 − p)"],
          ["table", ["題目字眼", "GDC"], [
            ["exactly 3：P(X = 3)", "binompdf"],
            ["at most 3：P(X ≤ 3)", "binomcdf(3)"],
            ["fewer than 3：P(X &lt; 3)", "binomcdf(<b>2</b>)"],
            ["at least 3：P(X ≥ 3)", "1 − binomcdf(<b>2</b>)"],
            ["more than 3：P(X &gt; 3)", "1 − binomcdf(<b>3</b>)"],
          ]],
          ["eg", "X ~ B(12, 0.25). Find P(X = 3) and P(X ≥ 3).", [
            "P(X = 3) = \\(\\binom{12}{3}(0.25)^3(0.75)^9 = \\) <b>0.258</b>",
            "P(X ≥ 3) = 1 − P(X ≤ 2) = <b>0.609</b> ✅",
          ]],
        ],
      },
      {
        h: "Normal distribution 常態分佈",
        min: 3,
        blocks: [
          ["key", "\\(X \\sim N(\\mu, \\sigma^2)\\)：對稱鐘形，mean = median = mode。約 68% / 95% / 99.7% 喺 1σ / 2σ / 3σ 之內。<br>\\(z = \\frac{x - \\mu}{\\sigma}\\)　\\(Z \\sim N(0, 1)\\)"],
          ["rhyme", "口訣 3", "搵概率用 cdf，搵數值用 invNorm；μ σ 唔知就轉 z", "invNorm 入嘅係 <b>左邊面積</b>：「最高 10%」→ invNorm(0.9, μ, σ)。"],
          ["eg", "\\(X \\sim N(50, \\sigma^2)\\) and P(X &lt; 56) = 0.8. Find σ.", [
            "z = invNorm(0.8) = 0.8416",
            "\\(\\frac{56 - 50}{\\sigma} = 0.8416\\) → <b>σ = 7.13</b> ✅",
          ]],
          ["trap", [
            "\\(N(50, 16)\\) 嘅 σ 係 <b>4</b>，唔係 16！",
            "P(X &gt; a) 用 normalcdf(a, 9E99)；寫答案要寫 P(…) = …（唔好只寫 calculator 語法）。",
            "Normal 係 continuous：P(X = a) = 0，&lt; 同 ≤ 一樣；binomial 就唔一樣。",
          ]],
        ],
      },
    ],
    summary: [
      "概率加埋等於一；E(X) 乘完再加；fair 即 E(gain) = 0",
      "定次數、兩結果、p 不變、互獨立",
      "at least k = 1 − P(X ≤ k − 1)",
      "搵概率用 cdf，搵數值用 invNorm（左邊面積）",
      "μ σ 唔知就轉 z；N(μ, σ²) 第二個係方差",
    ],
    practice: [
      { q: "X ~ B(8, 0.4). Find P(X = 2) and E(X).", m: 3, a: "\\(\\binom82(0.4)^2(0.6)^6 = \\) <b>0.209</b>；E(X) = <b>3.2</b>" },
      { q: "X ~ B(8, 0.4). Find P(X ≥ 2).", m: 2, a: "1 − P(X ≤ 1) = 1 − 0.106 = <b>0.894</b>" },
      { q: "Lengths L ~ N(25, 1.5²) cm. Find P(23 &lt; L &lt; 27), and find l such that P(L &lt; l) = 0.1.", m: 4, a: "<b>0.818</b>；invNorm(0.1, 25, 1.5) = <b>23.1 cm</b>" },
      { q: "A game costs $3 to play. A fair die is rolled; a six wins $12, otherwise nothing. Find the expected gain and the cost that would make the game fair.", m: 3, a: "E(gain) = \\(\\frac16(12) - 3 = \\) <b>−$1</b>（not fair）；fair cost <b>$2</b>" },
      { q: "X ~ N(μ, 4²) and P(X &gt; 60) = 0.2. Find μ.", m: 3, a: "P(X &lt; 60) = 0.8 → z = 0.8416；60 − 4(0.8416) = <b>μ = 56.6</b>" },
    ],
  },
  "math-12": {
    title: "Derivative rules · Tangents & normals · Stationary points & optimisation",
    intro: "Calculus 佔分最多：rules 要快，tangent 同 optimisation 要有固定步驟。",
    parts: [
      {
        h: "Meaning of the derivative 導數意思",
        min: 1.5,
        blocks: [
          ["key", "\\(f'(x) = \\frac{dy}{dx}\\) = gradient function = rate of change；\\(f'(x) = \\lim_{h \\to 0}\\frac{f(x + h) - f(x)}{h}\\)。<br>f'(x) &gt; 0 → increasing；f'(x) &lt; 0 → decreasing。"],
          ["rhyme", "口訣 1", "f' 正就上山，f' 負就落山，f' 零就企定", "畀 f' 嘅圖問 f：f' 嘅 x-intercept = f 嘅 stationary point。"],
        ],
      },
      {
        h: "Differentiation rules 微分法則",
        min: 3,
        blocks: [
          ["table", ["f(x)", "f'(x)"], [
            ["\\(x^n\\)", "\\(nx^{n-1}\\)"],
            ["\\(\\sin x\\) / \\(\\cos x\\)", "\\(\\cos x\\) / \\(-\\sin x\\)"],
            ["\\(e^x\\)", "\\(e^x\\)"],
            ["\\(\\ln x\\)", "\\(\\frac1x\\)"],
          ]],
          ["rhyme", "口訣 2（chain）", "外微內不動，再乘內微", "\\(\\sin(x^2)\\) → \\(\\cos(x^2) \\times 2x\\)；\\(e^{3x}\\) → \\(3e^{3x}\\)；\\(\\ln(3x + 1)\\) → \\(\\frac{3}{3x + 1}\\)。"],
          ["rhyme", "口訣 3（product / quotient）", "前微後不微，加前不微後微；商：下乘上微 減 上乘下微，除下平方", "\\((uv)' = u'v + uv'\\)　\\(\\left(\\frac uv\\right)' = \\frac{u'v - uv'}{v^2}\\)"],
          ["eg", "Differentiate \\(y = x^2e^{3x}\\).", [
            "u = x², v = e^{3x}：u' = 2x，v' = 3e^{3x}",
            "\\(y' = 2xe^{3x} + 3x^2e^{3x} = \\) <b>\\(xe^{3x}(2 + 3x)\\)</b> ✅",
          ]],
          ["trap", ["微分前先改寫：\\(\\frac{2}{x} = 2x^{-1}\\)，\\(\\sqrt x = x^{1/2}\\)。", "Quotient rule 個減號次序唔好調轉（u'v − uv'）。"]],
        ],
      },
      {
        h: "Tangents & normals 切線同法線",
        min: 1.5,
        blocks: [
          ["rhyme", "口訣 4", "搵點、搵斜率、代 y − y₁ = m(x − x₁)", "Normal 斜率 = \\(-\\frac{1}{f'(a)}\\)（垂直就倒轉再變號）。"],
          ["eg", "Find the tangent and normal to \\(y = x^3 - 2x\\) at x = 1.", [
            "Point：y = 1 − 2 = −1 → (1, −1)；gradient 3(1)² − 2 = 1",
            "Tangent：<b>y = x − 2</b>；Normal：gradient −1 → <b>y = −x</b> ✅",
          ]],
        ],
      },
      {
        h: "Stationary points, concavity & optimisation 極值",
        min: 3,
        blocks: [
          ["key", "Stationary：f'(x) = 0。f''(x) &gt; 0 → <b>min</b>（concave up）；f''(x) &lt; 0 → <b>max</b>（concave down）。<br>Point of inflexion：f''(x) = 0 <b>而且 f'' 變號</b>。"],
          ["rhyme", "口訣 5（optimisation）", "設一個變量 → 微分 → 等於零 → 證 max/min → 答返題目", "最後一步最多人漏：題目問 “maximum volume” 就要答 volume，唔係 x。"],
          ["eg", "Squares of side x are cut from the corners of a 12 cm × 12 cm card to make an open box. Find the maximum volume.", [
            "\\(V = x(12 - 2x)^2 = 4x^3 - 48x^2 + 144x\\)，0 &lt; x &lt; 6",
            "\\(V' = 12x^2 - 96x + 144 = 12(x - 2)(x - 6) = 0\\) → x = 2（x = 6 令 V = 0，reject）",
            "V''(2) = 24(2) − 96 = −48 &lt; 0 → max；<b>V = 2(8)² = 128 cm³</b> ✅",
          ]],
          ["trap", [
            "f''(a) = 0 唔一定係 inflexion — 要講 f'' changes sign。",
            "要寫 justification（second derivative 或 sign table）先有 R1。",
            "“Show that” 題最後一行要同題目一模一樣。",
          ]],
        ],
      },
    ],
    summary: [
      "f' 正上山，f' 負落山，f' 零企定",
      "外微內不動，再乘內微",
      "前微後不微，加前不微後微；商：下微上減上微下，除下平方",
      "切線：搵點、搵斜率、代式；法線倒轉變號",
      "f'' 正係 min，f'' 負係 max；inflexion 要變號",
      "Optimisation 最後答返題目問嘅嘢",
    ],
    practice: [
      { q: "Differentiate \\(y = 3x^4 - \\frac{2}{x} + \\sqrt{x}\\).", m: 3, a: "<b>\\(12x^3 + \\frac{2}{x^2} + \\frac{1}{2\\sqrt x}\\)</b>" },
      { q: "Differentiate \\(y = e^{2x}\\cos x\\).", m: 3, a: "<b>\\(2e^{2x}\\cos x - e^{2x}\\sin x\\)</b>" },
      { q: "Find the equation of the normal to \\(y = \\ln x\\) at the point where x = e.", m: 4, a: "Point (e, 1)；gradient \\(\\frac1e\\) → normal gradient −e → <b>\\(y - 1 = -e(x - e)\\)</b>（\\(y = -ex + e^2 + 1\\)）" },
      { q: "Let \\(f(x) = x^3 - 6x^2 + 9x + 1\\). Find the coordinates of the stationary points and determine their nature. Find the point of inflexion.", m: 6, a: "f'(x) = 3(x − 1)(x − 3)；<b>(1, 5) max</b>（f''(1) = −6）；<b>(3, 1) min</b>（f''(3) = 6）；f''(x) = 6x − 12 = 0 and changes sign → <b>inflexion (2, 3)</b>" },
      { q: "Show that the derivative of \\(\\frac{x}{x^2 + 1}\\) is \\(\\frac{1 - x^2}{(x^2 + 1)^2}\\).", m: 3, a: "\\(\\frac{1(x^2 + 1) - x(2x)}{(x^2 + 1)^2} = \\frac{1 - x^2}{(x^2 + 1)^2}\\)（AG）" },
    ],
  },
  "math-13": {
    title: "Indefinite integrals · Inspection · Definite integrals & area",
    intro: "Integration = 微分倒轉做；area 題記得分開 x 軸上下。",
    parts: [
      {
        h: "Indefinite integrals 不定積分",
        min: 3,
        blocks: [
          ["table", ["f(x)", "\\(\\int f(x)\\,dx\\)"], [
            ["\\(x^n\\)（n ≠ −1）", "\\(\\frac{x^{n+1}}{n + 1} + C\\)"],
            ["\\(\\frac1x\\)", "\\(\\ln|x| + C\\)"],
            ["\\(e^x\\)", "\\(e^x + C\\)"],
            ["\\(\\cos x\\) / \\(\\sin x\\)", "\\(\\sin x + C\\) / \\(-\\cos x + C\\)"],
            ["\\(f(ax + b)\\)", "\\(\\frac1a F(ax + b) + C\\)"],
          ]],
          ["rhyme", "口訣 1", "加一除新次，記得 + C；入面 ax + b 就再除 a", "\\(\\int e^{2x}dx = \\frac12 e^{2x} + C\\)；\\(\\int (3x - 1)^4 dx = \\frac{(3x - 1)^5}{15} + C\\)。"],
          ["eg", "Given \\(f'(x) = \\cos 2x\\) and \\(f\\left(\\frac{\\pi}{4}\\right) = 3\\), find f(x).", [
            "\\(f(x) = \\frac12\\sin 2x + C\\)",
            "\\(\\frac12\\sin\\frac{\\pi}{2} + C = 3\\) → C = 2.5 → <b>\\(f(x) = \\frac12\\sin 2x + 2.5\\)</b> ✅",
          ]],
          ["trap", ["漏 + C = 失 A1。", "\\(\\int \\frac{1}{x^2}dx = -\\frac1x + C\\)，唔係 ln。", "\\(\\int \\sin x\\,dx = -\\cos x\\)（負號喺積分嗰邊）。"]],
        ],
      },
      {
        h: "Integration by inspection / substitution 觀察法",
        min: 2,
        blocks: [
          ["key", "\\(\\int f(g(x))\\,g'(x)\\,dx = F(g(x)) + C\\) — 見到「入面嘅微分」喺出面，就可以一步過。"],
          ["rhyme", "口訣 2", "見到入面嘅微分喺出面，就當佢一粒", "唔夠倍數就自己補返：\\(\\int x e^{x^2}dx = \\frac12 e^{x^2} + C\\)。"],
          ["table", ["Integral", "Answer"], [
            ["\\(\\int 2x(x^2 + 1)^3dx\\)", "\\(\\frac{(x^2 + 1)^4}{4} + C\\)"],
            ["\\(\\int \\frac{2x}{x^2 + 1}dx\\)", "\\(\\ln(x^2 + 1) + C\\)"],
            ["\\(\\int \\cos x\\sin^3 x\\,dx\\)", "\\(\\frac{\\sin^4 x}{4} + C\\)"],
          ]],
          ["note", "Check：將答案微分返，應該等於題目。"],
        ],
      },
      {
        h: "Definite integrals & area 定積分同面積",
        min: 3,
        blocks: [
          ["key", "\\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)<br>Area under curve：x 軸下面嘅積分係 <b>負數</b> → 分開 roots 計，取絕對值。<br>Area between curves = \\(\\int_a^b (\\text{top} - \\text{bottom})\\,dx\\)"],
          ["rhyme", "口訣 3", "上減下，交點做上下限", "P2：寫出 integral 同 limits（M1）再用 GDC 計。"],
          ["eg", "Find the area enclosed by \\(y = x^2\\) and \\(y = x + 2\\).", [
            "交點：\\(x^2 = x + 2\\) → x = −1, 2",
            "\\(\\int_{-1}^{2}(x + 2 - x^2)dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{2} = \\frac{10}{3} - \\left(-\\frac76\\right) = \\) <b>4.5</b> ✅",
          ]],
          ["trap", ["Curve 穿過 x 軸時，直接由頭積到尾會正負抵銷。", "上下限次序：上限代入減下限代入。"]],
        ],
      },
    ],
    summary: [
      "加一除新次，記得 + C",
      "入面 ax + b 就再除 a",
      "見到入面嘅微分喺出面，就當佢一粒",
      "上減下，交點做上下限",
      "x 軸下面係負，分段取絕對值",
    ],
    practice: [
      { q: "Find \\(\\int (6x^2 - 4x + 5)\\,dx\\).", m: 2, a: "<b>\\(2x^3 - 2x^2 + 5x + C\\)</b>" },
      { q: "Find \\(\\int x(x^2 + 3)^5\\,dx\\).", m: 3, a: "<b>\\(\\frac{(x^2 + 3)^6}{12} + C\\)</b>" },
      { q: "Find the exact value of \\(\\int_1^e \\frac{2}{x}\\,dx\\).", m: 3, a: "\\([2\\ln x]_1^e = 2 - 0 = \\) <b>2</b>" },
      { q: "Find the area of the region enclosed by \\(y = 4x - x^2\\) and the x-axis.", m: 4, a: "Roots 0, 4：\\(\\left[2x^2 - \\frac{x^3}{3}\\right]_0^4 = 32 - \\frac{64}{3} = \\) <b>\\(\\frac{32}{3}\\)</b>" },
      { q: "Given \\(f'(x) = 3x^2 - 2x\\) and f(2) = 1, find f(x).", m: 3, a: "\\(f(x) = x^3 - x^2 + C\\)；8 − 4 + C = 1 → C = −3 → <b>\\(f(x) = x^3 - x^2 - 3\\)</b>" },
    ],
  },
  "math-14": {
    title: "Displacement · Velocity · Acceleration · Distance travelled",
    intro: "Kinematics = 微分 + 積分嘅應用題，P1 P2 都考，分數好穩陣。",
    parts: [
      {
        h: "s, v, a 嘅關係",
        min: 2,
        blocks: [
          ["key", "\\(v = \\frac{ds}{dt}\\)　\\(a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\)　\\(s = \\int v\\,dt\\)　\\(v = \\int a\\,dt\\)"],
          ["rhyme", "口訣 1", "微分落樓梯，積分上樓梯", "s → v → a 係微分（落）；a → v → s 係積分（上），每上一層用 initial condition 搵 C。"],
          ["table", ["題目字眼", "數學意思"], [
            ["at rest", "v = 0"],
            ["changes direction", "v = 0 <b>而且 v 變號</b>"],
            ["speed", "|v|"],
            ["speeding up", "v 同 a 同號"],
            ["initially / at the origin", "t = 0 / s = 0"],
          ]],
          ["eg", "a = 6t − 4, v(0) = 2 and s(0) = 1. Find v and s.", [
            "v = 3t² − 4t + C，v(0) = 2 → <b>v = 3t² − 4t + 2</b>",
            "s = t³ − 2t² + 2t + C，s(0) = 1 → <b>s = t³ − 2t² + 2t + 1</b> ✅",
          ]],
        ],
      },
      {
        h: "Displacement vs distance 位移同路程",
        min: 3,
        blocks: [
          ["key", "Displacement = \\(\\int_{t_1}^{t_2} v\\,dt\\)（可以負）　Distance travelled = \\(\\int_{t_1}^{t_2} |v|\\,dt\\)（一定正）"],
          ["rhyme", "口訣 2", "位移照積，路程要加絕對值", "P1：搵 v = 0 嘅時間，分段積分，每段取正再加。P2：GDC 直接 ∫|v|。"],
          ["eg", "\\(v = 3t^2 - 12t + 9\\) for 0 ≤ t ≤ 4. Find the displacement and the distance travelled.", [
            "v = 3(t − 1)(t − 3)：t = 1, 3 時 at rest 同轉方向",
            "s = t³ − 6t² + 9t：s(0) = 0, s(1) = 4, s(3) = 0, s(4) = 4",
            "Displacement = s(4) − s(0) = <b>4</b>；distance = 4 + 4 + 4 = <b>12</b> ✅",
          ]],
          ["trap", ["題目問 distance 你計 displacement = 全錯。", "GDC 計 ∫|v| 一定要寫出條 integral 同 limits 先有 M1。"]],
        ],
      },
      {
        h: "v–t graphs & GDC 圖像",
        min: 2,
        blocks: [
          ["key", "v–t 圖：<b>gradient = acceleration</b>；<b>面積 = displacement</b>（x 軸下面係負）。Max speed 要睇 |v| 最大，可能喺端點或者負數嗰邊。"],
          ["rhyme", "口訣 3", "斜率係加速，面積係位移", "P2 題：graph v(t) → max/min/zero → fnInt；radian mode！"],
          ["trap", ["Max velocity ≠ max speed（v = −5 嘅 speed 係 5）。", "Speeding up / slowing down 要同時講 v 同 a 嘅符號。"]],
        ],
      },
    ],
    summary: [
      "微分落樓梯，積分上樓梯；每上一層搵 C",
      "At rest v = 0；轉方向要 v 變號",
      "位移照積，路程要加絕對值",
      "斜率係加速，面積係位移",
      "v a 同號就加速",
    ],
    practice: [
      { q: "A particle has displacement \\(s = t^3 - 6t^2 + 9t\\). Find the times when it is at rest and its acceleration at t = 3.", m: 4, a: "v = 3t² − 12t + 9 = 3(t − 1)(t − 3) → <b>t = 1, 3</b>；a = 6t − 12 → <b>a(3) = 6</b>" },
      { q: "v = 4 − 2t and s(0) = 3. Find s(5).", m: 3, a: "s = 4t − t² + 3 → <b>s(5) = −2</b>" },
      { q: "v = 2t − 6 for 0 ≤ t ≤ 5. Find the displacement and the total distance travelled.", m: 4, a: "\\([t^2 - 6t]_0^5 = \\) <b>−5</b>；distance = |−9| + 4 = <b>13</b>" },
      { q: "A particle moves with \\(v(t) = 10\\sin\\left(\\frac t2\\right)\\) m s⁻¹. Find the distance travelled for 0 ≤ t ≤ 8.", m: 3, a: "\\(\\int_0^8 |v(t)|\\,dt\\)（M1）= <b>46.9 m</b>（v changes sign at t = 2π）" },
      { q: "\\(v = t^2 - 5t + 4\\). Is the particle speeding up or slowing down at t = 2? Justify.", m: 2, a: "v(2) = −2, a = 2t − 5 = −1；same sign → <b>speeding up</b>" },
    ],
  },
});
