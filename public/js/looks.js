/* Design tries: open any page with ?look=a, ?look=b or ?look=c to preview a direction (?look=off clears it).
   The choice is remembered in this browser so you can click around the whole site in one look. */
(function () {
  const LOOKS = {
    a: { fonts: "Geist:wght@400;500;600;700&family=Geist+Mono:wght@500",
         eyebrow: "IB Diploma revision · 8 subjects at SL and HL",
         h1: ["Revise every topic.", "Get marked like the real exam."], h2: "Ways to revise" },
    b: { fonts: "Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@500",
         eyebrow: "IB Diploma · eight subjects · SL & HL",
         h1: ["Every topic, every paper,", "marked like the real thing."], h2: "Seven ways to revise" },
    c: { fonts: "Archivo:wdth,wght@112,700;112,800",
         eyebrow: "IB revision for 8 Diploma subjects",
         h1: ["Practise like it's", "exam day."], h2: "Pick how you revise today" },
  };
  let look = null;
  try {
    const q = new URLSearchParams(location.search).get("look");
    if (q === "off") localStorage.removeItem("ib-look");
    else if (q && LOOKS[q]) localStorage.setItem("ib-look", q);
    look = localStorage.getItem("ib-look");
  } catch (e) { look = new URLSearchParams(location.search).get("look"); }
  const L = LOOKS[look];
  if (!L) return;
  const root = document.documentElement;
  root.classList.add("look-" + look, "lk-anim");
  const add = (href) => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l); };
  add("https://fonts.googleapis.com/css2?family=" + L.fonts + "&display=swap");
  add("css/looks/base.css");
  add("css/looks/" + look + ".css");

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function patchHome() {
    const h1 = document.querySelector(".hero h1");
    if (!h1 || h1.dataset.look) return !!h1;
    h1.dataset.look = "1";
    let i = 0;
    const words = (s, cls) => s.split(" ").map((w) => `<span class="fx-w${cls}" style="--wi:${i++}">${esc(w)}</span>`).join(" ");
    h1.innerHTML = words(L.h1[0], "") + ' <span class="hl">' + words(L.h1[1], "") + "</span>";
    const eb = document.querySelector(".hero .eyebrow"); if (eb) eb.textContent = L.eyebrow;
    const h2 = document.querySelector("#features"); if (h2 && h2.previousElementSibling) h2.previousElementSibling.textContent = L.h2;
    const f = document.querySelector(".features");
    if (f && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { f.classList.add("lk-in"); io.disconnect(); } }), { rootMargin: "0px 0px -80px 0px" });
      io.observe(f);
    }
    return true;
  }
  if (document.body && document.body.dataset.page !== "home") return;
  let n = 0;
  const t = setInterval(() => { if ((document.querySelector(".hero h1.fx-split") && patchHome()) || ++n > 60) clearInterval(t); }, 50);
})();
