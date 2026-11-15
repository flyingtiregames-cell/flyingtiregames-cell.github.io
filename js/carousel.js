// Turns each [data-carousel] into a swipeable carousel with arrows and dots.
document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
  var track = carousel.querySelector(".track");
  var slides = track.children;
  var count = slides.length;
  if (count < 2) return;

  var current = function () { return Math.round(track.scrollLeft / track.clientWidth); };
  var go = function (i) { track.scrollTo({ left: ((i + count) % count) * track.clientWidth }); };

  var dots = document.createElement("div");
  dots.className = "dots";
  var dotEls = [];
  for (var i = 0; i < count; i++) {
    var d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Show picture " + (i + 1));
    d.addEventListener("click", go.bind(null, i));
    dots.appendChild(d); dotEls.push(d);
  }

  function arrow(cls, label, symbol, step) {
    var b = document.createElement("button");
    b.className = "arrow " + cls; b.setAttribute("aria-label", label); b.innerHTML = symbol;
    b.addEventListener("click", function () { go(current() + step); });
    return b;
  }

  track.addEventListener("scroll", function () {
    var c = current();
    dotEls.forEach(function (d, i) { d.classList.toggle("active", i === c); });
  }, { passive: true });

  carousel.append(arrow("prev", "Previous picture", "&#8249;", -1), arrow("next", "Next picture", "&#8250;", 1), dots);
});
