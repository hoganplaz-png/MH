/* Motion: scroll reveals, count-ups, celebrations. Everything is skipped under prefers-reduced-motion,
   and content always ends up visible (a safety timer reveals anything the observer missed). */
(function () {
  const IB = window.IB;
  const reduce = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pages no longer animate in on scroll: content is simply there. The one orchestrated moment is the
  // examiner's ticks on the home-page script (CSS). Kept as a no-op so existing callers still work.
  IB.animate = function () {};

  // Confetti burst from an element (used for full marks, revised topics, drill streaks).
  IB.celebrate = function (el) {
    if (reduce() || !el) return;
    const r = el.getBoundingClientRect();
    const colors = ["#0B7A47", "#2443C8", "#D7425E", "#5ED39B", "#93A9FF"];
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("span");
      s.className = "confetti";
      const ang = (Math.PI * 2 * i) / 22 + Math.random() * 0.4;
      const dist = 60 + Math.random() * 90;
      s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;background:${colors[i % colors.length]};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 40}px;--rot:${Math.random() * 540}deg`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  };

  // Header gains a shadow once the page scrolls.
  window.addEventListener("scroll", () => {
    const h = document.querySelector(".site-header");
    if (h) h.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  // Reading-progress bar under the header + header shadow.
  const bar = document.createElement("div");
  bar.className = "read-progress";
  bar.setAttribute("aria-hidden", "true");
  const setBar = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 200 ? Math.min(1, scrollY / max) : 0})`;
  };
  document.addEventListener("DOMContentLoaded", () => { document.body.appendChild(bar); setBar(); });
  window.addEventListener("scroll", setBar, { passive: true });

  IB.floaters = function () {};
  IB.pageEnter = function () {};

  // Score in marking feedback counts up; checklist chips pop in one by one.
  IB.animateFeedback = function (el) {
    if (!el || reduce()) return;
    const h = el.querySelector("h4");
    const m = h && h.firstChild && /^(\d+)\/(\d+)/.exec(h.firstChild.textContent || "");
    if (m) {
      const target = +m[1], rest = h.firstChild.textContent.slice(m[1].length), t0 = performance.now();
      const step = (now) => { const p = Math.min(1, (now - t0) / 600); h.firstChild.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + rest; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    el.querySelectorAll(".mk-check span, ul li").forEach((x, i) => { x.style.animationDelay = `${120 + i * 70}ms`; x.classList.add("pop-li"); });
  };

  // Scroll-spy: the notes section bar highlights the section on screen.
  IB.scrollSpy = function (root) {
    const bar = root && root.querySelector(".jumpbar");
    if (!bar || !("IntersectionObserver" in window)) return;
    const links = Array.from(bar.querySelectorAll("a[href^='#sec-']"));
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove("here"));
      const a = map.get(en.target.id);
      if (a) { a.classList.add("here"); a.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce() ? "auto" : "smooth" }); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((a, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  };
})();
