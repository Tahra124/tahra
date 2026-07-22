(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('.menu-button');
  const theme = document.querySelector('.theme-button');
  const progress = document.querySelector('.progress span');
  const toast = document.querySelector('[data-toast]');
  const closeMenu = () => { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open menu'); };

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const setTheme = value => { root.dataset.theme = value; localStorage.setItem('tahra-theme', value); theme.setAttribute('aria-label', value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); };
  setTheme(root.dataset.theme || 'light');
  theme.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  menu.addEventListener('click', () => { const open = !header.classList.contains('menu-open'); header.classList.toggle('menu-open', open); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  addEventListener('resize', () => { if (innerWidth > 900) closeMenu(); });

  const update = () => { const y = scrollY; header.classList.toggle('scrolled', y > 16); const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${max ? Math.min(100, y / max * 100) : 0}%`; };
  update(); addEventListener('scroll', update, {passive:true});

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) reveals.forEach(el => el.classList.add('visible'));
  else { const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } }), {threshold:.1, rootMargin:'0px 0px -35px'}); reveals.forEach(el => observer.observe(el)); }

  const photo = document.querySelector('[data-photo]'); const photoCard = document.querySelector('[data-photo-card]');
  const showPhoto = () => photoCard.classList.add('has-photo'); const hidePhoto = () => photoCard.classList.remove('has-photo');
  photo.addEventListener('load', showPhoto); photo.addEventListener('error', hidePhoto); if (photo.complete && photo.naturalWidth) showPhoto();

  const cv = document.querySelector('[data-cv]'); let missing = false; let timer;
  fetch(cv.href, {method:'HEAD', cache:'no-store'}).then(r => missing = r.status === 404).catch(() => missing = false);
  cv.addEventListener('click', e => { if (!missing) return; e.preventDefault(); toast.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => toast.classList.remove('show'), 3000); });
})();
