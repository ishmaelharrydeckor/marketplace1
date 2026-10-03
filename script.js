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

  // ---- Dashboard mock (hero + demo)
  var dashboard =
    '<div class="db-top"><span class="brand"><svg class="logo"><use href="#i-logo"/></svg>Remoplus</span>' +
    '<span class="db-search">Explore your options!</span><i class="db-ico"></i><i class="db-ico"></i><i class="db-av"></i></div>' +
    '<div class="db-body"><div class="db-side"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="db-main"><div class="db-stats">' +
    [['Total Tasks', '145+', '+5%'], ['Team Online', '65+', '+2%'], ['Pending Tasks', '40+', '+3%'], ['Completed Tasks', '110+', '+4%']]
      .map(function (s) { return '<div class="db-stat"><small>' + s[0] + '</small><b>' + s[1] + '</b><em>' + s[2] + '</em></div>'; }).join('') +
    '</div><div class="db-row">' +
    '<div class="db-panel"><b>Seals Analysis</b><div class="bars">' +
    [40, 70, 55, 38, 62, 74, 58, 44, 95, 68, 52, 80].map(function (h, i) { return '<i' + (i === 8 ? ' class="hot"' : '') + ' style="height:' + h + '%"></i>'; }).join('') +
    '</div></div>' +
    '<div class="db-panel"><b>Seals Overview</b><div class="ring"><span>65%</span></div></div>' +
    '<div class="db-panel"><b>Pending Tasks</b><ul class="db-tasks">' +
    [['Designer Team', 'Innovative Creative Design Team'], ['Development Team', 'Collaborative Agile Development Team'], ['Marketing Team', 'Strategic Marketing Team']]
      .map(function (t) { return '<li>' + t[0] + '<small>' + t[1] + '</small></li>'; }).join('') +
    '</ul></div></div></div></div>';
  document.querySelectorAll('[data-dashboard]').forEach(function (el) { el.innerHTML = dashboard; });

  // ---- Calendar mock
  var cal = document.querySelector('[data-calendar]');
  if (cal) {
    cal.innerHTML =
      '<div class="cal-head"><span>August</span><b>September 2025</b><span>October</span></div><div class="cal-grid">' +
      '<i></i><i></i>' + ['Sun', 'Mon', 'Tue', 'Web', 'Thu'].map(function (d) { return '<span>' + d + '</span>'; }).join('') +
      '<span>11:00 am</span><i></i><div class="cal-ev">Designer Team</div>' +
      '<span>10:00 am</span>' +
      '<span>09:00 am</span><i></i><i></i><div class="cal-ev two">Development Team</div>' +
      '<span>08:00 am</span></div>';
  }

  // ---- CTA chart mock
  var chart = document.querySelector('[data-chart]');
  if (chart) {
    chart.innerHTML = '<b>Seals Analysis</b><div class="bars">' +
      [45, 80, 62, 50, 72, 86, 65, 50, 100, 78, 62, 90].map(function (h, i) { return '<i' + (i === 8 ? ' class="hot"' : '') + ' style="height:' + h + '%"></i>'; }).join('') + '</div>';
  }

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
