/* ⏱ 10-minute fast notes · Physics SL (guide first assessed 2025; format: see js/fastnotes.js). */
IB.addFast({
  "phys-1": {
    title: "Kinematics · suvat · Graphs · Projectiles",
    parts: [
      {
        h: "suvat 基本功", min: 2.5,
        blocks: [
          ["key", "<b>只限 uniform acceleration</b>：\\(v = u + at\\)｜\\(s = ut + \\tfrac12 at^2\\)｜\\(v^2 = u^2 + 2as\\)｜\\(s = \\frac{(u+v)}{2}t\\)<br>Displacement、velocity、acceleration 係 <b>vector</b>；distance、speed 係 scalar。"],
          ["rhyme", "口訣 1", "寫低五個字，剔三個，揀冇第五個嗰條", "s u v a t 列晒出嚟，已知剔三個，要搵嘅圈一個，剩低嗰個唔關事 → 揀唔包佢嘅公式。"],
          ["eg", "石頭由 45 m 高由靜止跌落（忽略空氣阻力）。求落地時間同速度。", [
            "取向下為正：u = 0, a = 9.81, s = 45",
            "\\(s = \\tfrac12 at^2\\) → \\(t = \\sqrt{2(45)/9.81} = 3.03\\) s",
            "\\(v = u + at = 9.81 \\times 3.03 = 29.7\\) m s⁻¹ <b>downwards</b> ✅（記得寫方向）",
          ]],
          ["trap", [
            "揀咗方向就成條題用到底：上為正 → \\(g = -9.81\\)。符號亂晒係最常見失分。",
            "最高點：<b>v = 0（直拋）但 a 仍然係 9.81 向下</b>，唔係零！",
          ]],
        ],
      },
      {
        h: "Motion graphs 運動圖", min: 2,
        blocks: [
          ["table", ["Graph", "Gradient =", "Area under =", "廣東話記法"], [
            ["s–t", "velocity", "（冇意義）", "斜率就係速度"],
            ["v–t", "acceleration", "displacement", "斜率加速度，面積位移"],
            ["a–t", "（rate of change of a）", "change in velocity", "面積 = Δv"],
          ]],
          ["rhyme", "口訣 2", "斜率落一級，面積升一級", "s → v → a：求 gradient 就向右行一格；計 area 就向左行一格。"],
          ["eg", "車由靜止 10 s 內均勻加速到 20 m s⁻¹，再以 20 m s⁻¹ 行 10 s。求總位移。", [
            "v–t 圖：三角形 ½ × 10 × 20 = 100 m",
            "長方形 10 × 20 = 200 m → 總共 <b>300 m</b> ✅",
          ]],
          ["trap", ["曲線 s–t 圖求 instantaneous velocity：要畫 <b>tangent</b> 再計 gradient，唔可以 s ÷ t。", "數格仔計面積：記得每格代表幾多 m（睇刻度）。"]],
        ],
      },
      {
        h: "Projectiles 拋射", min: 2.5,
        blocks: [
          ["key", "橫直分開計，<b>時間 t 係橋</b>。<br>Horizontal：\\(u_x = u\\cos\\theta\\)，a = 0（等速）｜Vertical：\\(u_y = u\\sin\\theta\\)，a = −g"],
          ["rhyme", "口訣 3", "橫行唔加速，直落受地心；先直後橫，t 做中間人"],
          ["eg", "球以 20 m s⁻¹、30° 仰角喺平地踢出。求 range。", [
            "\\(u_x = 20\\cos30° = 17.3\\) m s⁻¹，\\(u_y = 20\\sin30° = 10.0\\) m s⁻¹",
            "Time of flight：\\(t = 2u_y/g = 2(10.0)/9.81 = 2.04\\) s",
            "Range = 17.3 × 2.04 = <b>35.3 m</b> ✅",
          ]],
          ["note", "<b>Fluid resistance（drag）</b>：drag 隨速度增加 → max height ↓、range ↓、軌跡<b>唔對稱</b>（落嗰段較斜）。<br><b>Terminal speed</b>：drag = weight → resultant force = 0 → a = 0。"],
          ["trap", ["橫向用咗 g；或者最高點寫 v = 0（其實仲有 \\(u_x\\)）。", "Explain terminal speed 要三步：drag ↑ with speed → drag = weight → resultant force zero so constant speed。"]],
        ],
      },
    ],
    summary: [
      "suvat 只限恆定加速度，五揀三",
      "揀定正方向，g 帶埋符號",
      "v–t：斜率 = a，面積 = 位移",
      "拋射橫直分家，t 做橋",
      "最高點 a 仍係 g 向下",
      "drag = weight → terminal speed",
    ],
    practice: [
      { q: "A ball is thrown vertically upwards at 15 m s⁻¹. Calculate the maximum height reached. Ignore air resistance.", m: 2, a: "\\(0 = 15^2 - 2(9.81)s\\) [M1] → s = 11.5 m [A1]" },
      { q: "A car accelerates uniformly from rest to 20 m s⁻¹ in 10 s and then travels at constant speed for 10 s. Determine the total distance travelled.", m: 2, a: "Area under v–t graph: ½ × 10 × 20 + 10 × 20 [M1] = 300 m [A1]" },
      { q: "A ball is kicked from level ground at 20 m s⁻¹ at 30° to the horizontal. Calculate its horizontal range.", m: 3, a: "u_y = 10.0 m s⁻¹, t = 2 × 10.0/9.81 = 2.04 s [M1]; u_x = 17.3 m s⁻¹ [M1]; range = 35.3 m (≈ 35 m) [A1]" },
      { q: "Explain why a skydiver falling from rest eventually reaches a constant speed.", m: 3, a: "Drag/air resistance increases with speed [1]; eventually drag equals weight [1]; resultant force (and acceleration) zero so speed constant [1]" },
      { q: "State how air resistance changes the shape of a projectile's trajectory.", m: 2, a: "Lower maximum height and shorter range [1]; path no longer symmetrical / descent steeper than ascent [1]" },
    ],
  },

  "phys-2": {
    title: "Newton's Laws · Forces · Momentum · Circular Motion",
    parts: [
      {
        h: "Newton's laws + Free-body diagram", min: 2.5,
        blocks: [
          ["key", "N1：冇 resultant force → 靜止或 constant velocity<br>N2：\\(F = \\frac{\\Delta p}{\\Delta t}\\)（質量不變 → \\(F = ma\\)）<br>N3：A 推 B，B 用<b>同類型、等大、反向</b>嘅力推返 A（作用喺<b>兩件</b>唔同物件）"],
          ["rhyme", "口訣 1", "三律一對兩件物，同類同大反方向", "N3 pair 永遠唔會喺同一個 free-body diagram 入面互相抵消。"],
          ["table", ["Force", "公式", "幾時出現"], [
            ["Weight", "\\(W = mg\\)", "永遠，向下"],
            ["Friction", "static \\(\\le \\mu_s F_N\\)；dynamic \\(= \\mu_d F_N\\)", "接觸面"],
            ["Spring (Hooke)", "\\(F_H = -kx\\)", "彈簧伸縮"],
            ["Buoyancy", "\\(F_b = \\rho V g\\)", "浸喺流體（= 排開流體重量）"],
            ["Viscous drag (Stokes)", "\\(F_d = 6\\pi\\eta r v\\)", "細球慢速喺流體"],
          ]],
          ["eg", "5.0 kg 箱被 30 N 水平拉，\\(\\mu_d = 0.40\\)。求加速度。", [
            "Friction = 0.40 × 5.0 × 9.81 = 19.6 N",
            "a = (30 − 19.6) ÷ 5.0 = <b>2.08 m s⁻²</b> ✅（用 resultant force！）",
          ]],
          ["trap", ["FBD 只畫作用<b>喺該物件上</b>嘅力，唔好畫佢施俾人嘅力；唔好另外加一支「centripetal force」。", "升降機向上加速：\\(N - mg = ma\\) → N &gt; mg。"]],
        ],
      },
      {
        h: "Momentum & Impulse 動量", min: 2.5,
        blocks: [
          ["key", "\\(p = mv\\)｜Impulse \\(J = F\\Delta t = \\Delta p\\) = <b>area under F–t graph</b>（N s）<br>冇外力（isolated system）→ <b>total momentum conserved</b>"],
          ["rhyme", "口訣 2", "動量實守恆，動能睇彈性", "Elastic：KE 守恆；inelastic：KE 唔守恆（變熱、聲）。黐埋一齊 = totally inelastic。"],
          ["eg", "3.0 kg 小車以 4.0 m s⁻¹ 撞向靜止 1.0 kg 小車，黐埋。求共同速度，判斷 elastic 與否。", [
            "p before = 3.0 × 4.0 = 12 kg m s⁻¹ → v = 12 ÷ 4.0 = <b>3.0 m s⁻¹</b>",
            "KE before = ½(3.0)(4.0²) = 24 J；after = ½(4.0)(3.0²) = 18 J → KE 減少 → <b>inelastic</b> ✅",
          ]],
          ["trap", ["反彈：Δv = v − u 要帶符號，5 m s⁻¹ 撞牆以 3 m s⁻¹ 彈返 → Δv = 8 m s⁻¹，唔係 2。", "Explosion：開始 p = 0 → 碎片動量等大反向。"]],
        ],
      },
      {
        h: "Circular motion 圓周運動", min: 2,
        blocks: [
          ["key", "\\(v = \\frac{2\\pi r}{T} = \\omega r\\)｜\\(a = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}\\)（指向圓心）｜\\(F = \\frac{mv^2}{r}\\)"],
          ["rhyme", "口訣 3", "速率不變速度變，向心力係真力扮", "Centripetal force 唔係新嘅力，係 tension / friction / gravity / normal force 提供。"],
          ["eg", "1200 kg 車以 15 m s⁻¹ 轉半徑 50 m 嘅彎。求所需 friction。", ["F = 1200 × 15² ÷ 50 = <b>5400 N towards the centre</b> ✅"]],
          ["trap", ["寫「velocity constant」錯 — 方向一直變，所以有 acceleration。", "Explain 打滑：所需 \\(mv^2/r\\) 大過 maximum friction → 唔夠力提供向心力。"]],
        ],
      },
    ],
    summary: [
      "N3 一對力，作用兩件物",
      "F = Δp/Δt，面積就係 impulse",
      "動量實守恆，動能睇彈性",
      "反彈 Δv 要加埋",
      "向心力係真力扮，指向圓心",
      "浮力 ρVg，Stokes 6πηrv，Hooke −kx",
    ],
    practice: [
      { q: "A 60 kg person stands in a lift accelerating upwards at 2.0 m s⁻². Calculate the normal reaction force on the person.", m: 2, a: "N − mg = ma → N = 60(9.81 + 2.0) [M1] = 709 N (≈ 710 N) [A1]" },
      { q: "A force–time graph for a kick is a triangle of peak 200 N lasting 0.050 s. The 0.10 kg ball starts from rest. Calculate the speed of the ball after the kick.", m: 3, a: "Impulse = area = ½ × 200 × 0.050 = 5.0 N s [M1][A1]; v = 5.0 ÷ 0.10 = 50 m s⁻¹ [A1]" },
      { q: "A 3.0 kg trolley at 4.0 m s⁻¹ collides with a stationary 1.0 kg trolley and they stick together. Determine whether the collision is elastic.", m: 3, a: "v = 12/4.0 = 3.0 m s⁻¹ [1]; KE before 24 J, after 18 J [1]; KE not conserved so inelastic [1]" },
      { q: "Explain why a car may skid outwards when driving round a bend on an icy road.", m: 2, a: "Friction provides the centripetal force mv²/r [1]; on ice the maximum friction is less than the required mv²/r, so the car cannot follow the circle [1]" },
      { q: "A steel ball falls through oil. State the three forces acting on it and the condition for terminal speed.", m: 2, a: "Weight, buoyancy (upthrust), viscous drag [1]; terminal speed when weight = buoyancy + drag [1]" },
    ],
  },

  "phys-3": {
    title: "Work · Energy · Power · Efficiency",
    parts: [
      {
        h: "Work done 做功", min: 2,
        blocks: [
          ["key", "\\(W = Fs\\cos\\theta\\)（θ = force 同 displacement 嘅夾角）<br>Work done = energy transferred；<b>area under F–s graph</b> = work done"],
          ["rhyme", "口訣 1", "力同位移要同路，唔同路就乘 cos", "力垂直於運動（例如向心力）→ cos 90° = 0 → 冇做功。"],
          ["eg", "20 N 嘅力與水平成 60° 拉箱水平行 5.0 m。求做功。", ["W = 20 × 5.0 × cos 60° = <b>50 J</b> ✅"]],
          ["trap", ["力有角度仲用 W = Fs → 冇分。", "彈簧 F–s 圖係三角形：W = ½Fx，唔係 Fx。"]],
        ],
      },
      {
        h: "Energy stores + Conservation", min: 2.5,
        blocks: [
          ["table", ["Store", "公式", "記法"], [
            ["Kinetic", "\\(E_k = \\tfrac12 mv^2 = \\frac{p^2}{2m}\\)", "v 要平方"],
            ["Gravitational PE", "\\(\\Delta E_p = mg\\Delta h\\)", "近地面先用"],
            ["Elastic PE", "\\(E_H = \\tfrac12 k\\Delta x^2\\)", "彈簧"],
          ]],
          ["rhyme", "口訣 2", "能量唔會死，只係搬屋走", "Total energy constant；有 friction 就有部份變 thermal energy（dissipated）。"],
          ["eg", "過山車由 20 m 高靜止滑落到 5.0 m 高（無摩擦）。求速度。", [
            "\\(mg\\Delta h = \\tfrac12 mv^2\\)，m 抵消",
            "\\(v = \\sqrt{2(9.81)(15)} = \\) <b>17.2 m s⁻¹</b> ✅",
          ]],
          ["trap", ["Δh 係高度<b>差</b>（15 m），唔係 20 m。", "Energy dissipated = 開始總能量 − 最後總能量；寫埋去咗邊（thermal energy in surroundings）。"]],
        ],
      },
      {
        h: "Power · Efficiency · Energy density", min: 2.5,
        blocks: [
          ["key", "\\(P = \\frac{W}{t} = Fv\\)｜Efficiency \\(\\eta = \\frac{\\text{useful output}}{\\text{total input}}\\)（energy 或 power）<br>Energy density = energy released per unit mass of fuel（J kg⁻¹）"],
          ["rhyme", "口訣 3", "等速行車力等阻，功率就係 F 乘 v"],
          ["eg", "1200 kg 車以 25 m s⁻¹ 等速行駛，總阻力 800 N。求引擎輸出功率。", [
            "等速 → driving force = 800 N",
            "P = Fv = 800 × 25 = <b>2.0 × 10⁴ W (20 kW)</b> ✅（質量係陷阱，用唔著）",
          ]],
          ["note", "<b>Sankey diagram</b>：箭頭闊度 ∝ 能量；input = useful + wasted。"],
          ["trap", ["Efficiency &gt; 100% 一定計錯。", "P = Fv 嘅 F 係 driving force，唔係 resultant force。"]],
        ],
      },
    ],
    summary: [
      "W = Fs cosθ，垂直冇做功",
      "F–s 面積 = 做功",
      "½mv²、mgΔh、½kx² 三大能量",
      "能量唔會死，摩擦變熱",
      "P = W/t = Fv，等速力等阻",
      "效率 = 有用 ÷ 總共，冇得過 1",
    ],
    practice: [
      { q: "A spring of spring constant 200 N m⁻¹ is compressed by 0.10 m and used to launch a 0.050 kg ball horizontally. Calculate the launch speed.", m: 3, a: "E = ½ × 200 × 0.10² = 1.0 J [M1]; ½ × 0.050 v² = 1.0 [M1]; v = 6.3 m s⁻¹ [A1]" },
      { q: "A car travels at a constant 25 m s⁻¹ against resistive forces of 800 N. Calculate the useful power output of the engine.", m: 2, a: "Driving force = resistive force = 800 N [M1]; P = Fv = 2.0 × 10⁴ W [A1]" },
      { q: "A 60 W lamp produces 12 W of light. Calculate its efficiency and the energy wasted in one minute.", m: 2, a: "η = 12/60 = 0.20 (20%) [1]; wasted = 48 × 60 = 2.9 × 10³ J [1]" },
      { q: "A box is pulled 5.0 m along a floor by a 20 N force at 60° to the horizontal. Calculate the work done by the force.", m: 2, a: "W = Fs cos θ = 20 × 5.0 × cos 60° [M1] = 50 J [A1]" },
      { q: "Outline why fuels with a high energy density are preferred for aircraft.", m: 2, a: "More energy released per kg of fuel [1]; so less mass needs to be carried for the same energy, reducing the work needed to lift/accelerate the plane [1]" },
    ],
  },

  "phys-6": {
    title: "Thermal Energy · c & L · Conduction · Radiation",
    parts: [
      {
        h: "Temperature vs Internal energy", min: 1.5,
        blocks: [
          ["key", "Temperature ∝ <b>average</b> kinetic energy of particles：\\(\\bar{E}_k = \\tfrac32 k_B T\\)<br>Internal energy = total random <b>KE + intermolecular PE</b> of all particles｜T(K) = θ(°C) + 273"],
          ["rhyme", "口訣 1", "溫度睇平均，內能計總數", "一桶暖水嘅內能可以大過一杯滾水 — 粒子多好多。"],
          ["trap", ["寫 temperature = kinetic energy（漏咗 average）扣分。", "Thermal equilibrium：冇 net energy transfer，因為溫度相同。"]],
        ],
      },
      {
        h: "Specific heat capacity & Latent heat", min: 2.5,
        blocks: [
          ["table", ["情況", "公式", "粒子層面"], [
            ["溫度變（斜線）", "\\(Q = mc\\Delta T\\)", "average KE ↑"],
            ["溶化 / 沸騰（平線）", "\\(Q = mL\\)", "PE ↑（breaks bonds），KE 不變 → T 不變"],
          ]],
          ["rhyme", "口訣 2", "斜線 mcΔT，平線 mL；平線溫唔郁，能量去拆鍵"],
          ["eg", "2.0 kW 水煲將 1.5 kg 水由 20 °C 煲到 100 °C（c = 4180 J kg⁻¹ K⁻¹，無熱損失）。求時間。", [
            "Q = 1.5 × 4180 × 80 = 5.02 × 10⁵ J",
            "t = Q ÷ P = 5.02 × 10⁵ ÷ 2000 = <b>251 s</b> ✅",
          ]],
          ["note", "<b>混合</b>：energy lost by hot = energy gained by cold。例：0.20 kg 80 °C 水 + 0.30 kg 20 °C 水 → \\(T = \\frac{0.20(80) + 0.30(20)}{0.50} = 44\\) °C"],
          ["trap", ["實驗值通常偏大/偏細：因為 energy lost to surroundings — evaluate 時要講方向。", "ΔT 用 K 或 °C 都得（差值一樣），但 T 本身（radiation、gas）一定要 K。"]],
        ],
      },
      {
        h: "Conduction · Convection · Radiation", min: 3,
        blocks: [
          ["key", "Conduction：\\(\\frac{\\Delta Q}{\\Delta t} = kA\\frac{\\Delta T}{\\Delta x}\\)｜Convection：fluid 受熱 → density ↓ → 上升（bulk movement）<br>Black-body：\\(L = \\sigma A T^4\\)（Stefan–Boltzmann）｜\\(\\lambda_{max}T = 2.9 \\times 10^{-3}\\) m K（Wien）｜\\(b = \\frac{L}{4\\pi d^2}\\)"],
          ["rhyme", "口訣 3", "T 翻一倍，功率十六倍；越熱越藍，峰值波長縮"],
          ["eg", "星體表面 6000 K，半徑 7.0 × 10⁸ m。求 luminosity。", [
            "A = 4πR² = 4π(7.0 × 10⁸)² = 6.16 × 10¹⁸ m²",
            "L = 5.67 × 10⁻⁸ × 6.16 × 10¹⁸ × 6000⁴ = <b>4.5 × 10²⁶ W</b> ✅",
          ]],
          ["trap", ["Stefan–Boltzmann 用 °C → 全錯。", "球體面積係 4πR²，唔係 πR²。", "Conduction 嘅 Δx 係厚度，mm 要轉 m。"]],
        ],
      },
    ],
    summary: [
      "溫度睇平均動能，內能 = KE + PE 總和",
      "斜線 mcΔT，平線 mL",
      "平線溫唔郁，能量去拆鍵",
      "熱 = 冷，混合求終溫",
      "傳導 kAΔT/Δx，厚度轉 m",
      "L = σAT⁴，T 一定 K",
      "Wien：λT = 2.9 × 10⁻³",
    ],
    practice: [
      { q: "A 2.0 kW kettle heats 1.5 kg of water from 20 °C to 100 °C. Calculate the minimum time taken. (c = 4180 J kg⁻¹ K⁻¹)", m: 2, a: "Q = 1.5 × 4180 × 80 = 5.0 × 10⁵ J [M1]; t = 251 s [A1]" },
      { q: "A glass window of area 1.5 m² and thickness 4.0 mm has a temperature difference of 10 K across it. The thermal conductivity of glass is 0.80 W m⁻¹ K⁻¹. Calculate the rate of thermal energy transfer.", m: 2, a: "P = kAΔT/Δx = 0.80 × 1.5 × 10 ÷ 4.0 × 10⁻³ [M1] = 3.0 × 10³ W [A1]" },
      { q: "A star has surface temperature 6000 K and radius 7.0 × 10⁸ m. Calculate its luminosity.", m: 2, a: "L = σ4πR²T⁴ [M1] = 4.5 × 10²⁶ W [A1]" },
      { q: "Explain, in terms of particles, why the temperature of a substance stays constant while it boils.", m: 2, a: "Energy supplied increases intermolecular potential energy / breaks bonds [1]; average kinetic energy unchanged so temperature constant [1]" },
      { q: "The peak wavelength of a star's spectrum is 290 nm. Calculate its surface temperature.", m: 1, a: "T = 2.9 × 10⁻³ ÷ 290 × 10⁻⁹ = 1.0 × 10⁴ K [1]" },
    ],
  },
});
IB.addFast({
  "phys-7": {
    title: "Greenhouse Effect · Albedo · Emissivity · Energy Balance",
    parts: [
      {
        h: "Albedo · Emissivity · Solar constant", min: 2.5,
        blocks: [
          ["key", "<b>Albedo</b> α = reflected power ÷ incident power（Earth ≈ 0.3）<br><b>Emissivity</b> e = power emitted ÷ power emitted by a black body at same T → \\(P = e\\sigma AT^4\\)<br><b>Solar constant</b> S ≈ 1360 W m⁻²；地球平均入射 = S/4"],
          ["rhyme", "口訣 1", "反射睇 albedo，放射睇 emissivity；除四因為圓碟變波波", "截面 πR² 收光，但成個球面 4πR² 平均分 → ÷ 4。"],
          ["table", ["表面", "Albedo", "效果"], [
            ["Snow / ice", "高（≈ 0.8）", "反射多，吸收少"],
            ["Ocean / forest", "低（≈ 0.1）", "吸收多"],
            ["Cloud cover ↑", "↑", "反射多"],
          ]],
          ["trap", ["Albedo（反射）同 emissivity（放射）撈亂。", "Albedo 冇單位，係 0–1 之間嘅比例。"]],
        ],
      },
      {
        h: "Greenhouse mechanism 機制", min: 2.5,
        blocks: [
          ["key", "太陽 → <b>short-wavelength</b>（visible/UV）穿過大氣 → 地面變暖 → 地面放 <b>long-wavelength infrared</b> → greenhouse gases（CO₂, CH₄, H₂O, N₂O）<b>absorb</b> IR（頻率 = 分子振動 natural frequency，resonance）→ <b>re-emit in all directions</b>，部份返落地面 → 地面更暖"],
          ["rhyme", "口訣 2", "短波入，長波出；氣體共振食紅外，四面八方再放返", "三分題就係：IR emitted → absorbed (resonance) → re-emitted in all directions / some back to surface。"],
          ["note", "<b>Enhanced greenhouse effect</b>：人類燒化石燃料、砍樹、畜牧 → GHG 濃度 ↑ → 更多 IR 被吸收再放返 → global warming。<br>Feedback：冰融 → albedo ↓ → 吸收更多 → 更暖（positive feedback）。"],
          ["trap", ["只寫 \"trap heat\" 冇分 — 要寫 absorb + re-emit。", "唔好講 ozone hole 導致 global warming。"]],
        ],
      },
      {
        h: "Energy balance 計數", min: 2.5,
        blocks: [
          ["key", "Equilibrium：power absorbed = power emitted<br>\\((1-\\alpha)\\frac{S}{4} = e\\sigma T^4\\)（per m²）"],
          ["rhyme", "口訣 3", "入嘅扣反射除四，出嘅 eσT⁴，最後開四次方"],
          ["eg", "α = 0.30，S = 1360 W m⁻²，大氣有效 emissivity e = 0.62。估計地面溫度。", [
            "吸收：0.70 × 1360 ÷ 4 = 238 W m⁻²",
            "\\(T^4 = \\frac{238}{0.62 \\times 5.67\\times10^{-8}} = 6.77 \\times 10^9\\)",
            "T = <b>287 K</b> ✅（e = 1 冇大氣就只得 255 K → 差嘅 32 K 就係 greenhouse effect）",
          ]],
          ["trap", ["忘記 ÷ 4 或者忘記 (1 − α)。", "最後忘記開四次方，答案變咗 10⁹。"]],
        ],
      },
    ],
    summary: [
      "Albedo 反射，emissivity 放射",
      "S/4：圓碟收光，波波平分",
      "短波入，長波出",
      "氣體共振食 IR，四面八方再放返",
      "(1 − α)S/4 = eσT⁴，記得開四次方",
      "冰融 albedo 跌，越融越熱",
    ],
    practice: [
      { q: "A planet receives 340 W m⁻² on average and reflects 102 W m⁻². Calculate its albedo.", m: 1, a: "α = 102/340 = 0.30 [1]" },
      { q: "Earth's surface at 288 K emits 240 W m⁻² into space (as measured from space). Calculate the effective emissivity.", m: 2, a: "σT⁴ = 5.67 × 10⁻⁸ × 288⁴ = 390 W m⁻² [M1]; e = 240/390 = 0.62 [A1]" },
      { q: "Explain how greenhouse gases in the atmosphere increase Earth's surface temperature.", m: 3, a: "Surface emits infrared [1]; GHG molecules absorb IR as it matches their vibrational (natural) frequencies / resonance [1]; re-emit in all directions, some back to the surface [1]" },
      { q: "Suggest why melting of polar ice may increase global warming.", m: 2, a: "Ice replaced by water/land of lower albedo [1]; more radiation absorbed, raising temperature further (positive feedback) [1]" },
      { q: "Show that the mean intensity of solar radiation over Earth's surface is S/4.", m: 2, a: "Power intercepted = S × πR² [1]; spread over total surface 4πR² → S/4 [1]" },
    ],
  },

  "phys-8": {
    title: "Gas Laws · Ideal Gas Equation · Kinetic Model",
    parts: [
      {
        h: "Ideal gas equation", min: 2.5,
        blocks: [
          ["key", "\\(pV = nRT = Nk_BT\\)｜\\(N = nN_A\\)（\\(N_A = 6.02\\times10^{23}\\) mol⁻¹）｜\\(p = F/A\\)<br>固定份量：\\(\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}\\)　<b>T 一定用 K</b>"],
          ["table", ["Law", "不變", "關係"], [
            ["Boyle", "T", "\\(pV\\) = constant"],
            ["Charles", "p", "\\(V/T\\) = constant"],
            ["Pressure (Gay-Lussac)", "V", "\\(p/T\\) = constant"],
          ]],
          ["rhyme", "口訣 1", "pV 等 nRT，攝氏加 273；cm³ 乘 10⁻⁶"],
          ["eg", "輪胎 27 °C 時氣壓 250 kPa，曬熱到 57 °C（體積不變）。求新氣壓。", [
            "T₁ = 300 K, T₂ = 330 K",
            "p₂ = 250 × 330/300 = <b>275 kPa</b> ✅",
          ]],
          ["trap", ["用 °C 計比例：57/27 → 大錯。", "Graph：p–T(°C) 直線外推到 −273 °C = absolute zero。"]],
        ],
      },
      {
        h: "Kinetic model 動力論", min: 3,
        blocks: [
          ["key", "\\(p = \\tfrac13\\rho\\overline{v^2}\\)｜\\(\\bar{E}_k = \\tfrac32 k_BT\\)｜Internal energy of ideal monatomic gas \\(U = \\tfrac32 Nk_BT = \\tfrac32 nRT\\)"],
          ["note", "<b>Assumptions</b>：大量粒子 random motion；粒子體積 negligible；除碰撞外<b>冇 intermolecular forces</b>；collisions elastic；碰撞時間 negligible。<br>→ 所以理想氣體冇 PE，內能全部係 KE。"],
          ["rhyme", "口訣 2", "熱咗跑快啲，撞得密又大力", "Explain pressure ↑：faster → <b>more frequent</b> collisions AND <b>greater change in momentum</b> per collision → greater force per unit area。"],
          ["eg", "300 K 氣體粒子平均動能？", ["\\(\\bar E_k = 1.5 \\times 1.38\\times10^{-23} \\times 300 = \\) <b>6.21 × 10⁻²¹ J</b> ✅（同粒子質量無關）"]],
          ["trap", ["Boyle 解釋（T 不變）：速度唔變，只係 collision <b>frequency</b> ↑ — 唔好寫撞得大力咗。", "Pressure 來源要寫 rate of change of momentum → force。"]],
        ],
      },
      {
        h: "Real gases", min: 1.5,
        blocks: [
          ["key", "Real gas 近似 ideal：<b>low pressure, high temperature, low density</b>（粒子遠、intermolecular forces 同體積可忽略）"],
          ["rhyme", "口訣 3", "低壓高溫最理想"],
          ["trap", ["高壓：粒子體積唔可忽略；低溫：吸引力令 pressure 細過預期、會液化。"]],
        ],
      },
    ],
    summary: [
      "pV = nRT = NkT",
      "T 一定轉 K，cm³ 轉 m³",
      "熱咗跑快：撞得密又大力",
      "Boyle 只係撞得密",
      "Ek = 3/2 kT，同質量無關",
      "低壓高溫最理想",
    ],
    practice: [
      { q: "A gas at 200 kPa occupies 3.0 L. It is compressed to 1.2 L at constant temperature. Calculate the new pressure.", m: 1, a: "p₂ = 200 × 3.0/1.2 = 500 kPa [1]" },
      { q: "Calculate the number of molecules in 1.0 × 10⁻³ m³ of gas at 100 kPa and 300 K.", m: 2, a: "N = pV/k_BT = 1.0 × 10⁵ × 1.0 × 10⁻³ ÷ (1.38 × 10⁻²³ × 300) [M1] = 2.4 × 10²² [A1]" },
      { q: "Explain, using the kinetic model, why the pressure of a gas increases when its volume is reduced at constant temperature.", m: 2, a: "Mean speed unchanged but particles hit the walls more frequently (smaller volume / more per unit volume) [1]; greater rate of change of momentum → greater force per unit area [1]" },
      { q: "State two assumptions of the kinetic model of an ideal gas.", m: 2, a: "Any two: negligible particle volume; no intermolecular forces except in collisions; elastic collisions; random motion; negligible collision time [1 each]" },
      { q: "Outline why a real gas deviates from ideal behaviour at high pressure.", m: 2, a: "Particles closer together [1]; volume of particles / intermolecular forces no longer negligible [1]" },
    ],
  },

  "phys-10": {
    title: "Current · Resistance · Kirchhoff · emf & Internal Resistance",
    parts: [
      {
        h: "I, V, R 基本", min: 2.5,
        blocks: [
          ["key", "\\(I = \\frac{\\Delta q}{\\Delta t}\\)｜\\(V = \\frac{W}{q}\\)｜\\(R = \\frac{V}{I}\\)｜\\(R = \\frac{\\rho L}{A}\\)｜\\(P = VI = I^2R = \\frac{V^2}{R}\\)｜drift：\\(I = nAvq\\)"],
          ["table", ["Component", "I–V / 特性", "原因"], [
            ["Ohmic resistor", "直線過原點", "R constant（T 不變）"],
            ["Filament lamp", "曲線變平，R ↑", "T ↑ → lattice ions vibrate more"],
            ["NTC thermistor", "T ↑ → R ↓", "more charge carriers"],
            ["LDR", "光 ↑ → R ↓", "more charge carriers"],
          ]],
          ["eg", "1.5 m nichrome 線，直徑 0.40 mm，ρ = 1.1 × 10⁻⁶ Ω m。求 R。", [
            "A = π(0.20 × 10⁻³)² = 1.26 × 10⁻⁷ m²（⚠ 用半徑！）",
            "R = 1.1 × 10⁻⁶ × 1.5 ÷ 1.26 × 10⁻⁷ = <b>13 Ω</b> ✅",
          ]],
          ["trap", ["直徑當半徑用；mm² 轉 m² 要 × 10⁻⁶。", "Ohmic 嘅定義：current ∝ p.d. <b>at constant temperature</b>。"]],
        ],
      },
      {
        h: "Series · Parallel · Kirchhoff · Potential divider", min: 2.5,
        blocks: [
          ["key", "Series：\\(R = R_1 + R_2\\)，同一 I｜Parallel：\\(\\frac1R = \\frac1{R_1} + \\frac1{R_2}\\)，同一 V<br><b>Kirchhoff</b>：junction \\(\\Sigma I = 0\\)（charge conserved）｜loop \\(\\Sigma V = 0\\)（energy conserved）"],
          ["rhyme", "口訣 1", "串聯電流一樣，並聯電壓一樣；並聯越加越細", "並聯總電阻一定細過最細嗰個。"],
          ["eg", "6.0 Ω 同 3.0 Ω 並聯，再串 4.0 Ω，接 12 V（無內阻）。求總電流。", [
            "並聯：6 × 3/(6 + 3) = 2.0 Ω → 總 R = 6.0 Ω",
            "I = 12 ÷ 6.0 = <b>2.0 A</b> ✅",
          ]],
          ["note", "<b>Potential divider</b>：\\(V_{out} = V_{in}\\frac{R_2}{R_1 + R_2}\\) — 大電阻分大電壓。Thermistor 變熱 → R ↓ → 佢分到嘅 V ↓。"],
          ["trap", ["並聯直接相加。", "Voltmeter 理想 R = ∞（並聯），ammeter 理想 R = 0（串聯）。"]],
        ],
      },
      {
        h: "emf & Internal resistance · Cells", min: 2.5,
        blocks: [
          ["key", "emf ε = energy transferred <b>per unit charge</b> by the source｜\\(\\varepsilon = I(R + r)\\)｜terminal p.d. \\(V = \\varepsilon - Ir\\)（\"lost volts\" Ir）"],
          ["rhyme", "口訣 2", "V 對 I 作圖：截距係 emf，斜率負內阻"],
          ["eg", "電池：I = 0.40 A 時 V = 5.6 V；I = 0.80 A 時 V = 5.2 V。求 ε 同 r。", [
            "r = −gradient = (5.6 − 5.2)/(0.80 − 0.40) = <b>1.0 Ω</b>",
            "ε = 5.6 + 0.40 × 1.0 = <b>6.0 V</b> ✅",
          ]],
          ["note", "Primary cell：用完即棄；secondary cell：可 recharge。Discharge 時 terminal p.d. 先跌少少，平穩一段，最後急跌。"],
          ["trap", ["emf 同 p.d. 混淆：emf 係 source 俾 energy，p.d. 係 component 用 energy。", "Internal resistance 都會發熱（I²r）。"]],
        ],
      },
    ],
    summary: [
      "I = Δq/Δt，V = W/q",
      "R = ρL/A，直徑要除二",
      "串聯 I 一樣，並聯 V 一樣",
      "Kirchhoff：電荷守恆 + 能量守恆",
      "大電阻分大電壓",
      "V = ε − Ir：截距 emf，斜率 −r",
    ],
    practice: [
      { q: "A 6.0 Ω and a 3.0 Ω resistor are in parallel, and this combination is in series with a 4.0 Ω resistor and a 12 V supply of negligible internal resistance. Calculate the current in the 3.0 Ω resistor.", m: 3, a: "Total R = 2.0 + 4.0 = 6.0 Ω, I = 2.0 A [1]; p.d. across parallel part = 2.0 × 2.0 = 4.0 V [1]; I = 4.0/3.0 = 1.3 A [1]" },
      { q: "A current of 0.50 A flows for 2.0 minutes. Calculate the number of electrons passing a point.", m: 2, a: "q = 0.50 × 120 = 60 C [M1]; N = 60/1.60 × 10⁻¹⁹ = 3.75 × 10²⁰ [A1]" },
      { q: "A cell gives terminal p.d. 5.6 V at 0.40 A and 5.2 V at 0.80 A. Determine the emf and internal resistance.", m: 3, a: "r = 0.4/0.4 = 1.0 Ω [2]; ε = 6.0 V [1]" },
      { q: "A thermistor and fixed resistor form a potential divider. Explain what happens to the p.d. across the thermistor as its temperature rises.", m: 2, a: "Thermistor resistance decreases (NTC) [1]; it takes a smaller share of the supply p.d., so its p.d. falls [1]" },
      { q: "Calculate the resistance of a 1.5 m wire of diameter 0.40 mm made of material of resistivity 1.1 × 10⁻⁶ Ω m.", m: 2, a: "A = π(2.0 × 10⁻⁴)² = 1.26 × 10⁻⁷ m² [M1]; R = 13 Ω [A1]" },
    ],
  },

  "phys-11": {
    title: "Simple Harmonic Motion (SL)",
    parts: [
      {
        h: "SHM 嘅定義", min: 2.5,
        blocks: [
          ["key", "\\(a = -\\omega^2 x\\)：acceleration <b>proportional to displacement</b> AND <b>directed towards equilibrium</b>（負號）<br>\\(\\omega = \\frac{2\\pi}{T} = 2\\pi f\\)"],
          ["rhyme", "口訣 1", "加速同位移成正比，方向永遠返屋企", "兩個條件一個都唔可以少。"],
          ["table", ["位置", "x", "v", "a"], [
            ["Equilibrium", "0", "max", "0"],
            ["Extreme (amplitude)", "±x₀", "0", "max（指向中間）"],
          ]],
          ["trap", ["寫 \"acceleration proportional to displacement\" 但漏 \"towards equilibrium / opposite direction\"。", "Period 同 amplitude 無關（isochronous）。"]],
        ],
      },
      {
        h: "Time period 兩條式", min: 2.5,
        blocks: [
          ["key", "Mass–spring：\\(T = 2\\pi\\sqrt{\\frac{m}{k}}\\)｜Simple pendulum（小角度）：\\(T = 2\\pi\\sqrt{\\frac{l}{g}}\\)"],
          ["rhyme", "口訣 2", "彈簧睇質量，鐘擺睇長度；擺錘質量冇關係"],
          ["eg", "月球 g = 1.62 m s⁻²，1.0 m 鐘擺嘅 period？", ["T = 2π√(1.0/1.62) = <b>4.9 s</b> ✅（地球係 2.0 s）"]],
          ["note", "質量 × 4 → T × 2（因為開方）。實驗：量 10 次擺動再 ÷ 10 減少 reaction time 誤差；plot T² against l 得直線，gradient = 4π²/g。"],
          ["trap", ["大角度（&gt; ~10°）鐘擺唔再係 SHM。", "鐘擺長度量到擺錘<b>中心</b>。"]],
        ],
      },
      {
        h: "Energy · Phase · Graphs", min: 2,
        blocks: [
          ["key", "冇 damping：Ek ⇄ Ep 不斷轉換，<b>total energy constant</b>。<br>Phase difference：兩個振動差幾多 cycle，用 rad：\\(\\Delta\\phi = 2\\pi\\frac{\\Delta t}{T}\\)"],
          ["rhyme", "口訣 3", "v 快 x 四分一，a 同 x 正相反", "v–t 領先 x–t 一個 quarter cycle（π/2）；a–t 同 x–t antiphase（π）。"],
          ["trap", ["Ek–x 圖係倒轉拋物線，Ep–x 係正拋物線，兩者相加係水平線。", "Ek 一個 period 內到 max 兩次 → Ek 變化頻率係 2f。"]],
        ],
      },
    ],
    summary: [
      "a = −ω²x：成正比 + 返中間",
      "中間最快，兩邊最大加速",
      "彈簧睇 m/k，鐘擺睇 l/g",
      "Period 同振幅無關",
      "Ek ⇄ Ep，總能量不變",
      "v 快 x 四分一，a 同 x 相反",
    ],
    practice: [
      { q: "State the two conditions for an object to perform simple harmonic motion.", m: 2, a: "Acceleration proportional to displacement (from equilibrium) [1]; directed towards the equilibrium position / opposite to displacement [1]" },
      { q: "An object in SHM has period 0.40 s and amplitude 0.020 m. Calculate its maximum acceleration.", m: 2, a: "ω = 2π/0.40 = 15.7 rad s⁻¹ [M1]; a = ω²x₀ = 4.9 m s⁻² [A1]" },
      { q: "The mass on a spring is increased by a factor of 4. State and explain the change in period.", m: 2, a: "Period doubles [1]; T ∝ √m [1]" },
      { q: "Calculate the period of a 1.0 m simple pendulum on the Moon (g = 1.62 m s⁻²).", m: 2, a: "T = 2π√(1.0/1.62) [M1] = 4.9 s [A1]" },
      { q: "Two pendulums have the same period. One reaches its maximum displacement T/4 after the other. State the phase difference in radians.", m: 1, a: "π/2 rad [1]" },
    ],
  },

  "phys-12": {
    title: "Wave Model · v = fλ · Transverse & Longitudinal",
    parts: [
      {
        h: "Wave 基本", min: 2.5,
        blocks: [
          ["key", "Waves transfer <b>energy</b>, not matter｜\\(v = f\\lambda\\)｜\\(T = \\frac1f\\)<br>Transverse：振動 ⊥ energy transfer（光、繩波）｜Longitudinal：振動 ∥ energy transfer（聲；compressions & rarefactions）"],
          ["rhyme", "口訣 1", "橫波上下郁，縱波前後推；波走粒子唔走"],
          ["eg", "Sonar 聲波（水中 1500 m s⁻¹）0.40 s 後收到回音。求水深。", ["來回距離 = 1500 × 0.40 = 600 m → 深度 = <b>300 m</b> ✅（除二！）"]],
          ["trap", ["Sound 唔可以喺 vacuum 傳播；EM wave 可以。", "Wave speed 由 medium 決定；改 frequency 唔會改速度，只會改 λ。"]],
        ],
      },
      {
        h: "兩種 graph 唔好撈", min: 2.5,
        blocks: [
          ["table", ["Graph", "橫軸", "讀到", "記法"], [
            ["Displacement–distance", "x / m", "λ, amplitude", "影相：某一刻成條波"],
            ["Displacement–time", "t / s", "T, amplitude", "錄影：一粒粒子隨時間"],
          ]],
          ["rhyme", "口訣 2", "距離圖搵 λ，時間圖搵 T"],
          ["note", "<b>Phase difference</b> 兩點相隔 Δx：\\(\\Delta\\phi = 2\\pi\\frac{\\Delta x}{\\lambda}\\)。相隔 λ → in phase；λ/2 → antiphase。<br>Longitudinal wave 畫成 displacement–distance 圖時：正 = 向右移位；compression 喺粒子向中間擠嘅位置。"],
          ["trap", ["喺 displacement–time 圖讀 λ → 錯。", "粒子下一刻向上定向下：睇波前進方向，用「前面粒子先郁」推。"]],
        ],
      },
      {
        h: "EM spectrum + Sound", min: 2,
        blocks: [
          ["key", "EM waves：vacuum 中都係 \\(c = 3.00 \\times 10^8\\) m s⁻¹，全部 transverse。<br>Radio → Microwave → IR → Visible（400–700 nm）→ UV → X-ray → Gamma（λ 越來越短，f 同 photon energy 越來越大）"],
          ["rhyme", "口訣 3", "無微紅光紫 X 伽", "Radio、Microwave、IR、Light、UV、X-ray、Gamma。"],
          ["trap", ["單位：MHz × 10⁶，nm × 10⁻⁹。", "Visible 範圍記 400–700 nm。"]],
        ],
      },
    ],
    summary: [
      "波送能量唔送物質",
      "v = fλ，速度睇 medium",
      "橫波上下，縱波前後",
      "距離圖搵 λ，時間圖搵 T",
      "Δφ = 2πΔx/λ",
      "EM 全部 c，無微紅光紫 X 伽",
    ],
    practice: [
      { q: "A wave on a string has frequency 50 Hz and wavelength 0.40 m. Calculate its speed.", m: 1, a: "v = 50 × 0.40 = 20 m s⁻¹ [1]" },
      { q: "A sonar pulse travelling at 1500 m s⁻¹ returns 0.40 s after emission. Calculate the depth of the sea bed.", m: 2, a: "Total distance = 600 m [M1]; depth = 300 m [A1]" },
      { q: "Two points on a wave of wavelength 0.40 m are 0.10 m apart. Calculate their phase difference.", m: 1, a: "2π × 0.10/0.40 = π/2 rad [1]" },
      { q: "Describe how sound travels through air.", m: 2, a: "Air particles oscillate parallel to the direction of energy transfer (longitudinal) [1]; forming compressions and rarefactions that move through the air [1]" },
      { q: "Distinguish between a displacement–distance graph and a displacement–time graph for a wave.", m: 2, a: "Displacement–distance shows all particles at one instant; gives wavelength [1]; displacement–time shows one particle over time; gives period [1]" },
    ],
  },
});
IB.addFast({
  "phys-13": {
    title: "Reflection · Refraction · Diffraction · Double-slit",
    parts: [
      {
        h: "Refraction & TIR", min: 2.5,
        blocks: [
          ["key", "Snell：\\(n_1\\sin\\theta_1 = n_2\\sin\\theta_2\\)｜\\(\\frac{n_1}{n_2} = \\frac{v_2}{v_1}\\)，\\(n = \\frac{c}{v}\\)<br>Critical angle：\\(\\sin\\theta_c = \\frac{n_2}{n_1}\\)；<b>TIR</b>：由大 n 去細 n，而且 θ &gt; θc"],
          ["rhyme", "口訣 1", "入密慢、向法線；出疏快、離法線", "角度永遠由 normal 度起！"],
          ["eg", "光由空氣以 50° 入水（n = 1.33）。求折射角。", ["sin r = sin 50° ÷ 1.33 = 0.576 → r = <b>35°</b> ✅"]],
          ["trap", ["量角由 surface 度 → 全錯。", "Refraction 時 frequency 不變，speed 同 λ 一齊變。"]],
        ],
      },
      {
        h: "Diffraction & Superposition", min: 2,
        blocks: [
          ["key", "Diffraction：波穿過 gap / 繞過障礙物會 spread out；<b>gap ≈ λ</b> 時最明顯。<br>Superposition：重疊位置 displacement 相加。"],
          ["table", ["Path difference", "Phase difference", "結果"], [
            ["nλ", "0, 2π…（in phase）", "Constructive → bright / loud"],
            ["(n + ½)λ", "π（antiphase）", "Destructive → dark / quiet"],
          ]],
          ["rhyme", "口訣 2", "整數倍就加，半條尾就殺"],
          ["note", "Single slit（SL 定性）：中央 maximum 最闊最光，兩邊 maxima 窄啲暗啲。Slit 越窄 / λ 越長 → pattern 越闊。"],
          ["trap", ["干涉要 <b>coherent</b> sources（constant phase difference，同 frequency）。"]],
        ],
      },
      {
        h: "Young's double-slit", min: 3,
        blocks: [
          ["key", "\\(s = \\frac{\\lambda D}{d}\\)：s = fringe spacing，D = slit 去 screen 距離，d = slit separation"],
          ["rhyme", "口訣 3", "s 等 λD 除 d：遠啲闊啲，密縫闊啲，紅光闊啲"],
          ["eg", "Fringe spacing 2.4 mm，D = 1.5 m，d = 0.25 mm。求 λ。", [
            "λ = sd/D = 2.4 × 10⁻³ × 0.25 × 10⁻³ ÷ 1.5",
            "= 4.0 × 10⁻⁷ m = <b>400 nm</b> ✅",
          ]],
          ["note", "量 s：量幾條 fringe 總距離 ÷ 間隔數，減少 uncertainty。"],
          ["trap", ["mm 冇轉 m。", "10 條 bright fringe 只有 9 個 spacing。"]],
        ],
      },
    ],
    summary: [
      "角度由法線度",
      "入密慢向法線，出疏離法線",
      "TIR：大 n 去細 n + 超過 θc",
      "gap ≈ λ 衍射最勁",
      "整數倍就加，半條尾就殺",
      "s = λD/d，記得轉 m",
    ],
    practice: [
      { q: "Light enters water (n = 1.33) from air at an angle of incidence of 50°. Calculate the angle of refraction.", m: 2, a: "sin r = sin 50°/1.33 = 0.576 [M1]; r = 35° [A1]" },
      { q: "Calculate the critical angle for diamond (n = 2.42) in air.", m: 1, a: "θc = sin⁻¹(1/2.42) = 24° [1]" },
      { q: "In a double-slit experiment the fringe spacing is 2.4 mm, the slit separation 0.25 mm and the screen distance 1.5 m. Calculate the wavelength.", m: 2, a: "λ = sd/D [M1] = 4.0 × 10⁻⁷ m [A1]" },
      { q: "Explain how a bright fringe forms in a double-slit interference pattern.", m: 3, a: "Light diffracts at each slit so waves overlap [1]; waves are coherent [1]; path difference = nλ so they arrive in phase / constructive interference [1]" },
      { q: "Calculate the speed of light in glass of refractive index 1.50.", m: 1, a: "v = 3.00 × 10⁸/1.50 = 2.00 × 10⁸ m s⁻¹ [1]" },
    ],
  },

  "phys-14": {
    title: "Standing Waves · Harmonics · Resonance",
    parts: [
      {
        h: "Standing wave 點形成", min: 2.5,
        blocks: [
          ["key", "兩列<b>相同 frequency 同 amplitude</b>、<b>相反方向</b>嘅波 superpose（通常係反射波）→ standing wave<br>Node：amplitude 0｜Antinode：amplitude max｜相鄰 nodes 距離 = λ/2"],
          ["table", ["", "Travelling wave", "Standing wave"], [
            ["Energy", "transferred", "<b>not</b> transferred"],
            ["Amplitude", "所有點一樣", "由 0（node）到 max（antinode）"],
            ["Phase", "沿波連續變", "兩個 node 之間同相；隔一個 node 反相"],
          ]],
          ["rhyme", "口訣 1", "企喺度唔送能量；節點唔郁，腹點最勁"],
          ["trap", ["寫 standing wave 傳送能量 → 錯。", "Node 之間嘅粒子 in phase（唔係逐點唔同）。"]],
        ],
      },
      {
        h: "Harmonics 弦同管", min: 3,
        blocks: [
          ["table", ["Boundary", "兩端", "λₙ", "Harmonics"], [
            ["String fixed both ends", "N–N", "\\(\\frac{2L}{n}\\)", "全部 n = 1, 2, 3…"],
            ["Pipe open both ends", "A–A", "\\(\\frac{2L}{n}\\)", "全部 n = 1, 2, 3…"],
            ["Pipe closed one end", "N–A", "\\(\\frac{4L}{n}\\)", "<b>淨係單數</b> n = 1, 3, 5…"],
          ]],
          ["rhyme", "口訣 2", "兩頭一樣二 L，一開一閂四 L 單數", "Closed end = node（空氣郁唔到）；open end = antinode。"],
          ["eg", "Resonance tube（一端閉）用 500 Hz 音叉，第一個共鳴長度 0.17 m。求聲速。", [
            "第一共鳴 L = λ/4 → λ = 0.68 m",
            "v = fλ = 500 × 0.68 = <b>340 m s⁻¹</b> ✅",
          ]],
          ["trap", ["一端閉管寫埋 2nd harmonic — 冇偶數！下一個係 3f。", "畫圖：弦嘅 node/antinode 係 displacement；管入面係 air 嘅 displacement。"]],
        ],
      },
      {
        h: "Resonance & Damping", min: 2,
        blocks: [
          ["key", "Resonance：driving frequency = <b>natural frequency</b> → amplitude max（能量最有效咁傳入）<br>Damping：能量流失 → amplitude ↓；damping 越大，resonance peak 越<b>矮、越闊</b>，peak 稍微向低頻移"],
          ["table", ["Damping", "效果"], [
            ["Light (under)", "慢慢減細，仲振好多次"],
            ["Critical", "最快返到 equilibrium，<b>冇</b> oscillation（汽車避震）"],
            ["Heavy (over)", "慢慢爬返 equilibrium，冇 oscillation"],
          ]],
          ["rhyme", "口訣 3", "推鞦韆要啱拍子；阻尼大，峰就矮又闊"],
          ["trap", ["Useful：microwave oven、樂器、MRI；Problematic：橋、建築物、車身震。舉例要講清楚邊個 frequency matches。"]],
        ],
      },
    ],
    summary: [
      "兩列相反波 → 駐波，唔送能量",
      "節點距離 λ/2",
      "兩頭一樣二 L",
      "一開一閂四 L，單數 harmonics",
      "Driving f = natural f → resonance",
      "Critical damping 最快冇振",
    ],
    practice: [
      { q: "A pipe open at both ends is 0.50 m long. Calculate the frequencies of the first two harmonics. (Speed of sound 340 m s⁻¹)", m: 2, a: "λ₁ = 1.0 m, f₁ = 340 Hz [1]; f₂ = 680 Hz [1]" },
      { q: "A string 1.2 m long vibrates in its third harmonic. The wave speed is 240 m s⁻¹. Calculate the frequency.", m: 2, a: "λ = 2(1.2)/3 = 0.80 m [M1]; f = 300 Hz [A1]" },
      { q: "State two differences between a standing wave and a travelling wave.", m: 2, a: "Standing wave does not transfer energy [1]; amplitude varies with position (nodes/antinodes) whereas travelling wave amplitude is constant / phase differences differ [1]" },
      { q: "A pipe closed at one end has fundamental frequency 250 Hz. State the next two frequencies at which it resonates.", m: 2, a: "750 Hz [1]; 1250 Hz [1]" },
      { q: "Describe the effect of increasing damping on the amplitude–driving frequency graph of an oscillating system.", m: 2, a: "Maximum amplitude decreases [1]; peak becomes broader (and shifts slightly to lower frequency) [1]" },
    ],
  },

  "phys-15": {
    title: "Doppler Effect (SL)",
    parts: [
      {
        h: "Doppler 點解發生", min: 2.5,
        blocks: [
          ["key", "Source 同 observer 有 relative motion → <b>observed frequency 改變</b>。<br>行近：wavefronts 被壓近 → λ ↓、f ↑｜行遠：λ ↑、f ↓"],
          ["rhyme", "口訣 1", "行近擠埋高音調，行遠拉開低音調", "救護車經過：音調先高後低，喺經過一刻突然跌。"],
          ["note", "畫 wavefront diagram：source 每發一個 wavefront 都向前移咗少少 → 前面圓圈密，後面疏。Wave speed 唔變（由 medium 決定）。"],
          ["trap", ["寫 wave speed 改變 → 錯（sound 速度由空氣決定）。", "Doppler 唔係因為聲音大細改變；係 frequency。"]],
        ],
      },
      {
        h: "Light: Redshift / Blueshift", min: 2.5,
        blocks: [
          ["key", "EM waves（v ≪ c）：\\(\\frac{\\Delta f}{f} \\approx \\frac{\\Delta\\lambda}{\\lambda} \\approx \\frac{v}{c}\\)<br>λ 變長（向紅）→ <b>redshift</b> → 遠離｜λ 變短 → blueshift → 接近"],
          ["rhyme", "口訣 2", "紅移走佬，藍移埋身", "Δλ ÷ λ × c = 速度。"],
          ["eg", "Hα 線實驗室 656.3 nm，星系觀察到 659.0 nm。求速度。", [
            "Δλ = 2.7 nm",
            "v = 2.7/656.3 × 3.00 × 10⁸ = <b>1.2 × 10⁶ m s⁻¹ away</b>（redshift）✅",
          ]],
          ["trap", ["用觀察值做分母都差唔多，但最好用 emitted λ。", "要寫方向：moving away / towards。"]],
        ],
      },
      {
        h: "Applications", min: 1.5,
        blocks: [
          ["table", ["應用", "原理"], [
            ["Galaxies 紅移", "大部份遠離 → universe expanding"],
            ["Rotating star / binary", "一邊 red 一邊 blue"],
            ["Radar speed gun / Doppler ultrasound", "反射波 frequency shift → 速度（血流）"],
          ]],
          ["rhyme", "口訣 3", "頻率變幅度大，速度就快"],
        ],
      },
    ],
    summary: [
      "行近擠埋 f 高，行遠拉開 f 低",
      "Wave speed 唔變",
      "光：Δλ/λ ≈ v/c",
      "紅移走佬，藍移埋身",
      "記得寫方向",
    ],
    practice: [
      { q: "A spectral line of wavelength 656.3 nm in the laboratory is observed at 659.0 nm in light from a galaxy. Calculate the speed of the galaxy and state its direction of motion.", m: 3, a: "Δλ = 2.7 nm [1]; v = (2.7/656.3) × 3.00 × 10⁸ = 1.2 × 10⁶ m s⁻¹ [1]; moving away (redshift) [1]" },
      { q: "An ambulance with a siren passes a stationary pedestrian. Describe what the pedestrian hears.", m: 2, a: "Higher frequency/pitch than emitted as it approaches [1]; lower frequency as it moves away (sudden drop as it passes) [1]" },
      { q: "Explain, with reference to wavefronts, why the frequency observed in front of a moving source is higher.", m: 2, a: "Source moves towards the wavefronts it has emitted so they are closer together / wavelength shorter [1]; wave speed unchanged so f = v/λ is greater [1]" },
      { q: "Light from one edge of a rotating star is blueshifted. State what this shows about that edge.", m: 1, a: "It is moving towards the observer [1]" },
    ],
  },

  "phys-16": {
    title: "Gravitational Fields · Newton's Law · Kepler · Orbits",
    parts: [
      {
        h: "Newton's law of gravitation", min: 2.5,
        blocks: [
          ["key", "\\(F = G\\frac{Mm}{r^2}\\)｜Field strength \\(g = \\frac{F}{m} = \\frac{GM}{r^2}\\)（N kg⁻¹）<br>r 由<b>中心</b>度起；均勻球體當 point mass"],
          ["rhyme", "口訣 1", "距離加倍力四分一；r 由心度，唔係由地面", "Inverse square law。"],
          ["eg", "地球表面上高度 = 地球半徑 R 嘅位置，g 係幾多？", ["r = 2R → g = 9.81 ÷ 2² = <b>2.45 N kg⁻¹</b> ✅"]],
          ["note", "Field lines：指向質量中心，radial；地面附近當 uniform（平行等距）。"],
          ["trap", ["用高度當 r（漏加地球半徑）。", "Field strength 係 vector，要寫方向 towards the centre。"]],
        ],
      },
      {
        h: "Kepler's laws + Orbits", min: 3,
        blocks: [
          ["table", ["Kepler", "內容"], [
            ["1st", "Orbits are ellipses with the Sun at one focus"],
            ["2nd", "Line joining planet to Sun sweeps equal areas in equal times（近日行快）"],
            ["3rd", "\\(T^2 \\propto r^3\\)"],
          ]],
          ["key", "圓形軌道：gravity 提供 centripetal force<br>\\(\\frac{GMm}{r^2} = \\frac{mv^2}{r}\\) → \\(v = \\sqrt{\\frac{GM}{r}}\\)；代 \\(v = \\frac{2\\pi r}{T}\\) → \\(T^2 = \\frac{4\\pi^2}{GM}r^3\\)"],
          ["rhyme", "口訣 2", "引力做向心，越遠越慢越長命"],
          ["eg", "Show that 半徑 4.22 × 10⁷ m 嘅地球軌道 period ≈ 24 h（GM = 3.98 × 10¹⁴）。", [
            "\\(T = 2\\pi\\sqrt{r^3/GM} = 2\\pi\\sqrt{(4.22\\times10^7)^3/3.98\\times10^{14}}\\)",
            "= 8.63 × 10⁴ s = <b>24.0 h</b> ✅（geostationary）",
          ]],
          ["trap", ["Show that 題要寫齊 derivation 每一步，最後多一個 s.f.。", "衛星質量 m 會抵消 — orbit 同衛星質量無關。"]],
        ],
      },
    ],
    summary: [
      "F = GMm/r²，r 由中心度",
      "g = GM/r²，距離加倍四分一",
      "Kepler：橢圓、等面積、T² ∝ r³",
      "引力 = mv²/r",
      "越遠越慢越長命",
    ],
    practice: [
      { q: "Calculate the gravitational force between Earth (6.0 × 10²⁴ kg) and the Moon (7.3 × 10²² kg) separated by 3.8 × 10⁸ m.", m: 2, a: "F = 6.67 × 10⁻¹¹ × 6.0 × 10²⁴ × 7.3 × 10²² / (3.8 × 10⁸)² [M1] = 2.0 × 10²⁰ N [A1]" },
      { q: "Calculate the gravitational field strength at a height above Earth's surface equal to Earth's radius (surface g = 9.81 N kg⁻¹).", m: 2, a: "r doubled so g ÷ 4 [M1]; 2.45 N kg⁻¹ [A1]" },
      { q: "Show that for a circular orbit T² = (4π²/GM)r³.", m: 3, a: "GMm/r² = mv²/r [1]; v = 2πr/T substituted [1]; rearranged to T² = 4π²r³/GM [1]" },
      { q: "Planet X orbits a star at 4 times the orbital radius of planet Y. Determine the ratio T_X/T_Y.", m: 2, a: "T ∝ r^{3/2} [1]; 4^{1.5} = 8 [1]" },
      { q: "State Kepler's second law and what it implies about a planet's speed.", m: 2, a: "Line from Sun to planet sweeps out equal areas in equal times [1]; planet moves faster when closer to the Sun [1]" },
    ],
  },

  "phys-17": {
    title: "Electric & Magnetic Fields · Coulomb · Field Patterns",
    parts: [
      {
        h: "Charge + Coulomb's law", min: 2.5,
        blocks: [
          ["key", "Charge conserved、quantised（e = 1.60 × 10⁻¹⁹ C，Millikan oil drop）<br>\\(F = k\\frac{q_1q_2}{r^2}\\)，\\(k = \\frac{1}{4\\pi\\varepsilon_0} = 8.99\\times10^9\\) N m² C⁻²｜\\(E = \\frac{F}{q}\\)（N C⁻¹ = V m⁻¹）"],
          ["rhyme", "口訣 1", "同性相拒異性吸，距離三倍力九分一", "Charging by friction / contact / induction 全部係 electrons 轉移。"],
          ["eg", "Millikan：4.89 × 10⁻¹⁵ kg 油滴喺 E = 1.0 × 10⁵ V m⁻¹ 中靜止。求 charge。", [
            "qE = mg → q = 4.89 × 10⁻¹⁵ × 9.81 ÷ 1.0 × 10⁵",
            "= 4.8 × 10⁻¹⁹ C = <b>3e</b> ✅（證明 charge quantised）",
          ]],
          ["trap", ["μC 轉 C（× 10⁻⁶）；Coulomb 式 r 要平方。", "E 嘅方向 = 正電荷受力方向。"]],
        ],
      },
      {
        h: "Electric field patterns", min: 2,
        blocks: [
          ["table", ["Arrangement", "Field lines", "記法"], [
            ["Point charge +", "radial outwards", "正電向外射"],
            ["Point charge −", "radial inwards", "負電向內收"],
            ["Parallel plates", "uniform：平行、等距，+ 指去 −；邊緣彎", "\\(E = \\frac{V}{d}\\)"],
          ]],
          ["rhyme", "口訣 2", "正出負入，平行板平行線"],
          ["trap", ["Field lines 唔可以相交；要畫箭咀。", "平行板 E = V/d，d 用 m。"]],
        ],
      },
      {
        h: "Magnetic field patterns", min: 2,
        blocks: [
          ["table", ["Source", "Field", "方向規則"], [
            ["Straight wire", "concentric circles，越遠越疏", "right-hand grip：拇指 = I"],
            ["Solenoid", "入面 uniform，外面似 bar magnet", "grip：手指 = I，拇指 = N"],
            ["Bar magnet", "N 出 S 入", "—"],
          ]],
          ["rhyme", "口訣 3", "右手握電線，拇指電流四指場"],
          ["trap", ["Magnetic field lines 係 closed loops。", "Solenoid 裏面線要平行等距（uniform）。"]],
        ],
      },
    ],
    summary: [
      "電荷守恆，e 嘅整數倍",
      "F = kq₁q₂/r²，r 要平方",
      "E = F/q = V/d",
      "正出負入，平行板 uniform",
      "右手握：拇指電流",
      "Solenoid 入面 uniform",
    ],
    practice: [
      { q: "Calculate the force on an electron in a uniform electric field of 1.2 × 10⁴ V m⁻¹.", m: 1, a: "F = eE = 1.60 × 10⁻¹⁹ × 1.2 × 10⁴ = 1.9 × 10⁻¹⁵ N [1]" },
      { q: "The separation of two point charges is tripled. State the factor by which the force changes.", m: 1, a: "1/9 [1]" },
      { q: "An oil drop of mass 4.89 × 10⁻¹⁵ kg is held stationary between plates 5.0 mm apart with a p.d. of 500 V. Determine the charge on the drop in terms of e.", m: 3, a: "E = 500/5.0 × 10⁻³ = 1.0 × 10⁵ V m⁻¹ [1]; q = mg/E = 4.8 × 10⁻¹⁹ C [1]; = 3e [1]" },
      { q: "Sketch and describe the electric field between two oppositely charged parallel plates.", m: 2, a: "Parallel, equally spaced lines from + to − (uniform) [1]; curved at the edges [1]" },
      { q: "Describe the magnetic field around a long straight wire carrying a current.", m: 2, a: "Concentric circles centred on the wire [1]; direction by right-hand grip rule / field weaker further away [1]" },
    ],
  },
});
IB.addFast({
  "phys-18": {
    title: "Charges in E & B Fields · F = BIL · Parallel Wires",
    parts: [
      {
        h: "Charge in uniform electric field", min: 2,
        blocks: [
          ["key", "Force \\(F = qE\\)，constant → 好似 projectile：<b>parabolic path</b>（垂直入場）<br>經 p.d. V 加速：\\(qV = \\tfrac12 mv^2\\)（1 eV = 1.60 × 10⁻¹⁹ J）"],
          ["rhyme", "口訣 1", "電場似地心，粒子拋物線"],
          ["trap", ["電子受力方向同 E 相反。", "平行於場入：直線加速/減速，唔係拋物線。"]],
        ],
      },
      {
        h: "Charge in magnetic field", min: 3,
        blocks: [
          ["key", "\\(F = qvB\\sin\\theta\\)，永遠 ⊥ velocity → <b>uniform circular motion</b>，速率不變（<b>no work done</b>）<br>\\(qvB = \\frac{mv^2}{r}\\) → \\(r = \\frac{mv}{qB}\\)"],
          ["rhyme", "口訣 2", "磁力打橫推，兜圈唔加速；重快大圈，電多場強細圈"],
          ["eg", "Proton（m = 1.67 × 10⁻²⁷ kg）以 3.0 × 10⁵ m s⁻¹ 垂直入 0.20 T 磁場。求半徑。", [
            "r = mv/qB = 1.67 × 10⁻²⁷ × 3.0 × 10⁵ ÷ (1.60 × 10⁻¹⁹ × 0.20)",
            "= <b>1.6 × 10⁻² m</b> ✅",
          ]],
          ["note", "<b>Velocity selector</b>（E ⊥ B）：qE = qvB → \\(v = \\frac{E}{B}\\) 嘅粒子直線穿過。<br>方向：Fleming's left-hand rule（中指 = <b>正電荷</b>運動方向 / conventional current）；電子要反轉。"],
          ["trap", ["電子用左手定則冇反轉方向。", "寫磁場令粒子加速/減速 → 錯，KE 不變。"]],
        ],
      },
      {
        h: "Force on wires", min: 2,
        blocks: [
          ["key", "Wire：\\(F = BIL\\sin\\theta\\)｜兩條平行線：\\(\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi r}\\)<br><b>同方向電流相吸，反方向相拒</b>"],
          ["rhyme", "口訣 3", "電線同向手拖手，反向就分手"],
          ["eg", "兩條平行線相距 0.10 m，各 5.0 A 同方向。求每米力。", ["F/L = 4π × 10⁻⁷ × 5.0 × 5.0 ÷ (2π × 0.10) = <b>5.0 × 10⁻⁵ N m⁻¹, attractive</b> ✅"]],
          ["trap", ["Wire 同 B 平行 → sin 0° = 0 → 冇力。", "1 A 嘅舊定義就係呢個 setup — 唔使背但要識用公式。"]],
        ],
      },
    ],
    summary: [
      "電場 qE，拋物線",
      "qV = ½mv²",
      "磁場 qvB，兜圈唔加速",
      "r = mv/qB",
      "BIL，左手定則，電子反轉",
      "同向相吸，反向相拒",
    ],
    practice: [
      { q: "A proton moving at 3.0 × 10⁵ m s⁻¹ enters a 0.20 T magnetic field at right angles. Calculate the radius of its path.", m: 2, a: "r = mv/qB [M1] = 1.6 × 10⁻² m [A1]" },
      { q: "Explain why a charged particle moving perpendicular to a uniform magnetic field moves in a circle at constant speed.", m: 3, a: "Magnetic force is always perpendicular to velocity [1]; so no work done / speed (KE) constant [1]; force constant in magnitude and towards a centre → centripetal → circle [1]" },
      { q: "Crossed fields of E = 2.0 × 10⁴ V m⁻¹ and B = 0.10 T let particles pass undeflected. Calculate their speed.", m: 2, a: "qE = qvB [M1]; v = E/B = 2.0 × 10⁵ m s⁻¹ [A1]" },
      { q: "Two long parallel wires 0.10 m apart each carry 5.0 A in the same direction. Calculate the force per unit length and state its direction.", m: 2, a: "F/L = μ₀I₁I₂/2πr = 5.0 × 10⁻⁵ N m⁻¹ [1]; attractive [1]" },
      { q: "An electron is accelerated from rest through 200 V. Calculate its kinetic energy in J.", m: 1, a: "E = qV = 1.60 × 10⁻¹⁹ × 200 = 3.2 × 10⁻¹⁷ J [1]" },
    ],
  },

  "phys-20": {
    title: "Atomic Structure · Rutherford · Spectra",
    parts: [
      {
        h: "Rutherford scattering", min: 2.5,
        blocks: [
          ["table", ["Observation（α 打金箔）", "Conclusion"], [
            ["大部份直穿過", "atom 大部份係 empty space"],
            ["少數小角度偏轉", "有 positive charge 集中喺中間"],
            ["極少數 &gt; 90° 反彈", "nucleus 好細、好 dense、帶正電，集中大部份質量"],
          ]],
          ["rhyme", "口訣 1", "大部份穿過係空，少數反彈有核心"],
          ["note", "要 vacuum（α 喺空氣行唔遠）、金箔要薄（避免多次散射）。Electrons 圍住 nucleus。"],
          ["trap", ["Observation 同 conclusion 要一一對應，兩個都寫先有分。"]],
        ],
      },
      {
        h: "Nuclear notation", min: 1.5,
        blocks: [
          ["key", "\\({}^{A}_{Z}X\\)：A = nucleon number（p + n），Z = proton number｜neutrons N = A − Z<br>Isotopes：同 Z 唔同 N"],
          ["rhyme", "口訣 2", "上面總人數，下面質子數，相減係中子"],
          ["eg", "\\({}^{235}_{92}\\)U 有幾多中子？", ["235 − 92 = <b>143</b> ✅"]],
        ],
      },
      {
        h: "Emission & Absorption spectra", min: 3,
        blocks: [
          ["key", "Electrons 喺 <b>discrete energy levels</b>。跳落低 level → emit photon：\\(E = hf = \\frac{hc}{\\lambda} = \\Delta E\\)<br>Emission：黑底彩線｜Absorption：連續光譜上有黑線（同一位置）→ 識別元素（star 成份）"],
          ["rhyme", "口訣 3", "跳落放光，吸光跳上；能級差 = hf"],
          ["eg", "能級差 3.0 eV。求放出 photon λ。", [
            "ΔE = 3.0 × 1.60 × 10⁻¹⁹ = 4.8 × 10⁻¹⁹ J",
            "λ = hc/ΔE = 6.63 × 10⁻³⁴ × 3.00 × 10⁸ ÷ 4.8 × 10⁻¹⁹ = <b>4.1 × 10⁻⁷ m</b>（violet）✅",
          ]],
          ["note", "4 個 levels（n = 1–4）最多 emission lines：4 × 3 ÷ 2 = <b>6</b>。"],
          ["trap", ["eV 冇轉 J。", "Absorption lines 暗係因為吸收後 re-emit 喺<b>所有方向</b>，向住觀察者嘅少咗。"]],
        ],
      },
    ],
    summary: [
      "大部份穿過係空，少數反彈有核心",
      "A 上 Z 下，中子 = A − Z",
      "能級 discrete → line spectra",
      "ΔE = hf = hc/λ，eV 轉 J",
      "Absorption：黑線同 emission 同位",
    ],
    practice: [
      { q: "Outline how the results of the Rutherford–Geiger–Marsden experiment support the nuclear model of the atom.", m: 3, a: "Most alpha particles pass straight through → atom mostly empty space [1]; a few deflected through large angles [1] → small, dense, positively charged nucleus [1]" },
      { q: "State the number of neutrons in a nucleus of ²³⁵₉₂U.", m: 1, a: "143 [1]" },
      { q: "An electron falls between two levels separated by 3.0 eV. Calculate the wavelength of the photon emitted.", m: 2, a: "ΔE = 4.8 × 10⁻¹⁹ J [M1]; λ = hc/ΔE = 4.1 × 10⁻⁷ m [A1]" },
      { q: "Explain why the spectrum of light from a star contains dark lines.", m: 3, a: "Cooler gas in the star's outer layers absorbs photons whose energy equals differences in energy levels [1]; absorbed photons are re-emitted in all directions [1]; so fewer photons of those wavelengths reach the observer [1]" },
      { q: "State the maximum number of different emission lines possible from transitions between four energy levels.", m: 1, a: "6 [1]" },
    ],
  },

  "phys-22": {
    title: "Radioactive Decay · Half-life · Binding Energy",
    parts: [
      {
        h: "α β γ 三兄弟", min: 2.5,
        blocks: [
          ["table", ["Type", "係乜", "Nuclear change", "Ionising / Stopped by"], [
            ["α", "\\({}^4_2\\)He nucleus", "A − 4, Z − 2", "最強 / paper 或幾 cm 空氣"],
            ["β⁻", "electron + <b>antineutrino</b>", "n → p：Z + 1", "中 / 幾 mm aluminium"],
            ["β⁺", "positron + <b>neutrino</b>", "p → n：Z − 1", "中（遇 electron annihilate）"],
            ["γ", "high-energy photon", "冇變（只係 energy ↓）", "最弱 / 厚 lead 減弱"],
          ]],
          ["rhyme", "口訣 1", "α 紙擋，β 鋁擋，γ 鉛都擋唔晒；β 負配反中微子"],
          ["eg", "寫出 \\({}^{210}_{84}\\)Po 嘅 α decay。", ["\\({}^{210}_{84}\\)Po → \\({}^{206}_{82}\\)Pb + \\({}^{4}_{2}\\alpha\\) ✅（上下兩行數都要平衡）"]],
          ["trap", ["β⁻ 漏寫 antineutrino（\\(\\bar\\nu_e\\)）。", "β 能量譜係 <b>continuous</b> → 證明有第三粒粒子（neutrino）分走能量。"]],
        ],
      },
      {
        h: "Half-life & Background", min: 2.5,
        blocks: [
          ["key", "Half-life：一半 nuclei（或 activity）decay 所需時間。Decay 係 <b>random</b>（唔知邊粒幾時）同 <b>spontaneous</b>（外界條件影響唔到）。<br>剩低 = \\(N_0 \\left(\\tfrac12\\right)^n\\)，n = half-lives 數目"],
          ["rhyme", "口訣 2", "一半一半再一半；先扣 background 先計"],
          ["eg", "量到 85 counts min⁻¹，background 25 counts min⁻¹。兩個 half-lives 後會量到幾多？", [
            "Corrected = 85 − 25 = 60 → 兩個 half-lives 後 15",
            "量到 = 15 + 25 = <b>40 counts min⁻¹</b> ✅",
          ]],
          ["trap", ["冇扣 background 就計 half-life。", "Graph 讀 half-life 要由任何一點揾減半時間，最好讀兩次取平均。"]],
        ],
      },
      {
        h: "Strong force · Mass defect · Binding energy", min: 2.5,
        blocks: [
          ["key", "Strong nuclear force：吸引、<b>極短程（~10⁻¹⁵ m）</b>、作用於所有 nucleons，抵消 protons 之間嘅 electrostatic repulsion。<br>Mass defect Δm = 分開 nucleons 總質量 − nucleus 質量｜Binding energy \\(E = \\Delta mc^2\\)（1 u = 931.5 MeV c⁻²）"],
          ["rhyme", "口訣 3", "拆核要俾錢，Fe-56 最穩陣", "Binding energy per nucleon 曲線 peak 喺 Fe-56 附近：輕核 fusion、重核 fission 都向 peak 行 → 放能量。"],
          ["eg", "He-4 mass defect 0.0304 u。求 binding energy per nucleon。", [
            "BE = 0.0304 × 931.5 = 28.3 MeV",
            "÷ 4 = <b>7.1 MeV per nucleon</b> ✅",
          ]],
          ["trap", ["Binding energy 唔係 nucleus 「擁有」嘅能量，係<b>拆開</b>所需嘅能量。", "大 nuclei 要多啲 neutrons 先穩定（N &gt; Z）。"]],
        ],
      },
    ],
    summary: [
      "α 紙、β 鋁、γ 鉛",
      "β⁻ 配反中微子，β⁺ 配中微子",
      "Random + spontaneous",
      "一半一半再一半，先扣 background",
      "Strong force 吸引、超短程",
      "BE = Δmc²，Fe-56 最穩",
    ],
    practice: [
      { q: "Write the nuclear equation for the beta-minus decay of ¹⁴₆C.", m: 2, a: "¹⁴₆C → ¹⁴₇N + ⁰₋₁e [1] + antineutrino ν̄ₑ [1]" },
      { q: "A detector records 85 counts per minute near a source; background is 25 counts per minute. Determine the recorded count rate after two half-lives.", m: 2, a: "Corrected rate 60 → 15 [1]; recorded 15 + 25 = 40 counts min⁻¹ [1]" },
      { q: "The mass defect of a helium-4 nucleus is 0.0304 u. Calculate the binding energy per nucleon in MeV.", m: 2, a: "28.3 MeV [M1]; ÷ 4 = 7.1 MeV [A1]" },
      { q: "State what the continuous energy spectrum of beta particles suggests.", m: 1, a: "A third particle (antineutrino/neutrino) is emitted and shares the energy [1]" },
      { q: "Explain, with reference to the binding energy curve, why both fission of heavy nuclei and fusion of light nuclei release energy.", m: 3, a: "Binding energy per nucleon peaks near Fe-56 [1]; products of both processes have greater binding energy per nucleon [1]; difference in binding energy (mass defect) is released [1]" },
    ],
  },

  "phys-23": {
    title: "Fission · Chain Reaction · Nuclear Reactor",
    parts: [
      {
        h: "Fission 點樣放能量", min: 2.5,
        blocks: [
          ["key", "重 nucleus（U-235）吸收 <b>slow (thermal) neutron</b> → 變 U-236（unstable）→ 分裂成兩個中等 nuclei + 2–3 neutrons + energy<br>Energy released 因為 products 嘅 <b>binding energy per nucleon 較大</b>；≈ 200 MeV per fission，大部份係 products 嘅 KE"],
          ["rhyme", "口訣 1", "慢中子撞大核，一拆二再出兩三"],
          ["eg", "\\({}^{235}_{92}\\)U + \\({}^1_0\\)n → \\({}^{141}_{56}\\)Ba + \\({}^{92}_{36}\\)Kr + x \\({}^1_0\\)n。求 x。", [
            "Nucleons：236 = 141 + 92 + x → <b>x = 3</b>",
            "Protons：92 = 56 + 36 ✅",
          ]],
          ["note", "Spontaneous fission 都會發生但好少；neutron-induced 先係 reactor 用嘅。"],
          ["trap", ["左邊記得計埋入射嗰粒 neutron（235 + 1）。"]],
        ],
      },
      {
        h: "Chain reaction + Reactor parts", min: 3,
        blocks: [
          ["key", "放出嘅 neutrons 引發更多 fission → <b>chain reaction</b>。要 <b>critical mass</b>：平均每次 fission 至少一粒 neutron 引發下一次。"],
          ["table", ["Component", "作用", "口訣"], [
            ["Moderator（water / graphite）", "<b>collisions</b> slow down neutrons → 更易引發 fission", "減速"],
            ["Control rods（boron / cadmium）", "<b>absorb</b> neutrons → 控制 reaction rate", "食中子"],
            ["Coolant + heat exchanger", "帶走 thermal energy → 產生 steam → turbine", "帶熱"],
            ["Shielding", "吸收 radiation 保護工作人員", "擋"],
          ]],
          ["rhyme", "口訣 2", "減速靠緩和，食中子靠控制棒"],
          ["trap", ["Control rods slow neutrons → 錯，係 moderator。", "Fuel enrichment：增加 U-235 比例。"]],
        ],
      },
      {
        h: "計數 + 利弊", min: 1.5,
        blocks: [
          ["eg", "1000 MW 發電站，每次 fission 200 MeV。每秒幾多次 fission？", [
            "200 MeV = 200 × 1.60 × 10⁻¹³ = 3.2 × 10⁻¹¹ J",
            "1.0 × 10⁹ ÷ 3.2 × 10⁻¹¹ = <b>3.1 × 10¹⁹ s⁻¹</b> ✅",
          ]],
          ["note", "好處：no CO₂ during operation、energy density 極高（≈ 8 × 10¹³ J kg⁻¹ U-235）。壞處：radioactive waste（long half-life）、accident risk、decommissioning。"],
          ["rhyme", "口訣 3", "冇碳排但有廢料"],
        ],
      },
    ],
    summary: [
      "慢中子撞 U-235，一拆二出兩三",
      "Products BE per nucleon 大 → 放能量",
      "Chain reaction 要 critical mass",
      "Moderator 減速，control rods 食中子",
      "Coolant 帶熱去 turbine",
      "冇碳排但有長壽廢料",
    ],
    practice: [
      { q: "Determine the number of neutrons released in: ²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + x ¹₀n.", m: 1, a: "x = 3 [1]" },
      { q: "A power station has a useful output of 1000 MW and each fission releases 200 MeV. Assuming 100% efficiency, calculate the fission rate.", m: 2, a: "200 MeV = 3.2 × 10⁻¹¹ J [M1]; rate = 3.1 × 10¹⁹ s⁻¹ [A1]" },
      { q: "Distinguish between the role of the moderator and the role of the control rods.", m: 2, a: "Moderator slows down neutrons (by collisions) so they are more likely to cause fission [1]; control rods absorb neutrons to control the rate of reaction [1]" },
      { q: "Outline what is meant by a chain reaction.", m: 2, a: "Neutrons released by one fission [1]; go on to cause further fissions [1]" },
      { q: "State one advantage and one disadvantage of nuclear fission power.", m: 2, a: "Advantage: no greenhouse gas during operation / high energy density [1]; disadvantage: long-lived radioactive waste / risk of accidents [1]" },
    ],
  },

  "phys-24": {
    title: "Fusion & Stars · HR Diagram · Parallax",
    parts: [
      {
        h: "Fusion + Stellar equilibrium", min: 2.5,
        blocks: [
          ["key", "Main-sequence stars：<b>hydrogen → helium</b> fusion in core。需要極高 temperature 同 density/pressure → nuclei 有足夠 KE 克服 <b>electrostatic repulsion</b>，靠近到 strong force 範圍。<br><b>Equilibrium</b>：向內 gravity = 向外 radiation + gas (thermal) pressure"],
          ["rhyme", "口訣 1", "高溫高壓先撞得埋；引力向內，輻射向外"],
          ["trap", ["寫 \"high temperature to overcome the strong force\" → 錯，係克服 electrostatic repulsion。"]],
        ],
      },
      {
        h: "Luminosity · Brightness · Parallax", min: 2.5,
        blocks: [
          ["key", "\\(L = \\sigma 4\\pi R^2 T^4\\)｜\\(b = \\frac{L}{4\\pi d^2}\\)｜\\(d(\\text{pc}) = \\frac{1}{p(\\text{arcsec})}\\)<br>1 pc = 3.26 ly = 3.09 × 10¹⁶ m；1 ly = 9.46 × 10¹⁵ m；1 AU = 1.50 × 10¹¹ m"],
          ["rhyme", "口訣 2", "parallax 細，距離遠；比例題用 L ∝ R²T⁴"],
          ["eg", "White dwarf：L = 0.010 L☉，T = 2 T☉。求 R / R☉。", [
            "\\(R^2 \\propto \\frac{L}{T^4} = \\frac{0.010}{16}\\)",
            "R = √(6.25 × 10⁻⁴) = <b>0.025 R☉</b> ✅",
          ]],
          ["trap", ["Parallax 只適用近距離星（幾百 pc 內），太遠角度太細量唔到。", "b 單位 W m⁻²，L 單位 W。"]],
        ],
      },
      {
        h: "HR diagram + Evolution", min: 2.5,
        blocks: [
          ["key", "HR diagram：y 軸 luminosity（log），x 軸 surface temperature <b>向右減少</b>（log）<br>Main sequence：左上（熱、光、重）→ 右下；Red giants / supergiants：右上；White dwarfs：左下"],
          ["table", ["Mass", "Evolution path", "結局"], [
            ["低（例如 Sun）", "MS → red giant → planetary nebula", "<b>white dwarf</b>（&lt; 1.4 M☉ Chandrasekhar limit）"],
            ["高（大好多倍 M☉）", "MS → red supergiant → <b>supernova</b>", "<b>neutron star</b> 或 <b>black hole</b>"],
          ]],
          ["rhyme", "口訣 3", "細星變紅巨，白矮收尾；大星超紅巨，爆完剩中子或黑洞"],
          ["trap", ["HR 溫度軸畫成向右增加 → 錯。", "Red giant 雖然 T 低但 R 好大，所以 L 高。"]],
        ],
      },
    ],
    summary: [
      "H → He，高溫高壓克服電斥",
      "引力向內，輻射壓向外",
      "L = σ4πR²T⁴，b = L/4πd²",
      "d = 1/p，parallax 只得近星",
      "HR 溫度向右跌",
      "細星白矮，大星超新星",
    ],
    practice: [
      { q: "A star has a parallax angle of 0.10 arcseconds. Calculate its distance in light-years.", m: 2, a: "d = 1/0.10 = 10 pc [M1]; = 32.6 ly (≈ 33 ly) [A1]" },
      { q: "A star of luminosity 3.8 × 10²⁸ W has apparent brightness 1.0 × 10⁻⁹ W m⁻². Calculate its distance from Earth.", m: 2, a: "d = √(L/4πb) [M1] = 1.7 × 10¹⁸ m [A1]" },
      { q: "A white dwarf has luminosity 0.010 L☉ and surface temperature 2T☉. Determine its radius in terms of R☉.", m: 2, a: "R² ∝ L/T⁴ = 0.010/16 [M1]; R = 0.025 R☉ [A1]" },
      { q: "Explain why very high temperatures are needed for fusion in a star's core.", m: 2, a: "Nuclei are positively charged and repel electrostatically [1]; high temperature gives enough kinetic energy to get close enough for the strong force to act [1]" },
      { q: "Outline the evolution of a star of about one solar mass after it leaves the main sequence.", m: 3, a: "Becomes a red giant (hydrogen in core used up, helium fusion) [1]; outer layers ejected as planetary nebula [1]; core remains as a white dwarf [1]" },
    ],
  },
});
