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
});
