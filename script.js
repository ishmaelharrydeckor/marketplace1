(function () {
  // ---- Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function () {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  // ---- Testimonial slider
  var slider = document.getElementById('slider');
  document.querySelectorAll('[data-slide]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = slider.querySelector('.testimonial');
      var step = card.getBoundingClientRect().width + 30;
      slider.scrollBy({ left: step * Number(btn.dataset.slide), behavior: 'smooth' });
    });
  });

  // ---- Pricing toggle
  var sw = document.getElementById('billing-switch');
  var lm = document.getElementById('lbl-monthly');
  var ly = document.getElementById('lbl-yearly');
  sw.addEventListener('click', function () {
    var yearly = sw.getAttribute('aria-checked') !== 'true';
    sw.setAttribute('aria-checked', String(yearly));
    lm.classList.toggle('on', !yearly);
    ly.classList.toggle('on', yearly);
    document.querySelectorAll('[data-monthly]').forEach(function (el) {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });
  });

  // ---- Scroll reveal + count-up
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    var to = Number(el.dataset.to);
    if (reduce) { el.textContent = to; return; }
    var start = performance.now();
    (function tick(now) {
      var p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  document.querySelectorAll('.section-title, .kf, .panel, .plan, .blog, .stat, .demo-card, .cta').forEach(function (el) { el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('.count').forEach(countUp);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('.count').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
