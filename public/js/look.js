/* Design tries (preview only): ?look=clean | editorial | swiss switches the look and remembers it; ?look=off goes back.
   Loaded in <head> before first paint so there is no flash of the old look. */
(function () {
  var LOOKS = ["clean", "editorial", "swiss"];
  var look = null;
  try {
    var q = new URLSearchParams(location.search).get("look");
    if (q === "off") localStorage.removeItem("ib-look");
    else if (LOOKS.indexOf(q) >= 0) localStorage.setItem("ib-look", q);
    look = localStorage.getItem("ib-look");
  } catch (e) {}
  if (LOOKS.indexOf(look) < 0) return;
  var root = document.documentElement;
  root.setAttribute("data-look", look);
  var v = (document.currentScript && document.currentScript.src.split("?v=")[1]) || "";
  document.write('<link rel="stylesheet" href="css/look-' + look + '.css?v=' + v + '">');
})();
