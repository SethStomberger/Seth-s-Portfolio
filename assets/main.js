(function () {
  var about = document.getElementById('about');
  var still = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)');
  var ticking = false;
  function update() {
    ticking = false;
    if (still.matches) { about.style.filter = ''; about.style.opacity = ''; return; }
    var h = about.offsetHeight || window.innerHeight;
    var p = Math.min(Math.max(window.scrollY / h, 0), 1);
    about.style.filter = p > 0 ? 'blur(' + (p * 6).toFixed(2) + 'px)' : '';
    about.style.opacity = (1 - p * 0.3).toFixed(3);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (still.addEventListener) still.addEventListener('change', update);
  update();

  var links = document.querySelectorAll('.menu a[data-s]');
  var ids = ['about', 'work', 'experience'];
  function setActive() {
    var mid = window.innerHeight * 0.45, current = 'about';
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) current = id;
    });
    if (id_prev !== current) {
      links.forEach(function (a) { a.classList.toggle('active', a.dataset.s === current); });
      id_prev = current;
    }
  }
  var id_prev = null;
  window.addEventListener('scroll', function () { requestAnimationFrame(setActive); }, { passive: true });
  setActive();
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.getElementById(a.dataset.s);
      if (!t) return;
      e.preventDefault();
      var y = a.dataset.s === 'about' ? 0 : t.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: still.matches ? 'auto' : 'smooth' });
    });
  });

  var photos = document.getElementById('photos');
  photos.querySelector('.avatar').addEventListener('click', function () { photos.classList.toggle('open'); });
})();
