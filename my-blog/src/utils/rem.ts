(function(doc, win) {
  var docEl = doc.documentElement;
  let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
  let recalc = function() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 350) {
      docEl.style.fontSize = "12px";
    } else {
      docEl.style.fontSize = 12 * (clientWidth / 350) + "px";
    }
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
