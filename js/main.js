(function () {
  var doc = document.documentElement;
  var header = document.querySelector(".site-header");

  // Header: subtiele lijn zodra je scrolt
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobiel menu
  var toggle = document.querySelector(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = doc.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Ontbrekende foto's: toon een nette linnen placeholder met label
  document.querySelectorAll(".media img").forEach(function (img) {
    function missing() { img.parentElement.classList.add("is-missing"); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener("error", missing);
  });

  // Rustige fade-in bij scrollen
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Projecten: klik op een project = diavoorstelling van alle foto's van dat project
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector(".lightbox__caption");
    var photos = [], index = 0, title = "";

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function show(i) {
      index = (i + photos.length) % photos.length;
      lbImg.src = photos[index];
      lbImg.alt = title + ", foto " + (index + 1);
      lbCap.textContent = title + "  ·  " + (index + 1) + " / " + photos.length;
      new Image().src = photos[(index + 1) % photos.length]; // volgende alvast laden
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".gallery__item").forEach(function (item) {
      item.addEventListener("click", function (ev) {
        ev.preventDefault();
        var count = parseInt(item.dataset.count, 10) || 1;
        photos = [];
        for (var n = 1; n <= count; n++) photos.push(item.dataset.project + pad(n) + ".jpg");
        title = item.querySelector("strong").textContent;
        show(0);
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });

    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(index - 1); });
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(index + 1); });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox || ev.target.classList.contains("lightbox__close")) close();
    });
    document.addEventListener("keydown", function (ev) {
      if (!lightbox.classList.contains("is-open")) return;
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") show(index - 1);
      if (ev.key === "ArrowRight") show(index + 1);
    });

    // vegen op gsm
    var startX = null;
    lightbox.addEventListener("touchstart", function (ev) { startX = ev.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (ev) {
      if (startX === null) return;
      var dx = ev.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  // Contactformulier: zonder server opent het een e-mail met de ingevulde gegevens
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      if (form.getAttribute("action")) return; // echte form-service ingesteld
      ev.preventDefault();
      var data = new FormData(form);
      var body =
        "Naam: " + data.get("naam") + "\n" +
        "E-mail: " + data.get("email") + "\n" +
        "Telefoon: " + (data.get("telefoon") || "-") + "\n" +
        "Gemeente: " + (data.get("gemeente") || "-") + "\n\n" +
        data.get("bericht");
      window.location.href = "mailto:" + form.dataset.mailto +
        "?subject=" + encodeURIComponent("Aanvraag via website – " + data.get("naam")) +
        "&body=" + encodeURIComponent(body);
      form.closest(".form").classList.add("is-sent");
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
