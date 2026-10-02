document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('show'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.08, rootMargin:'0px 0px -4% 0px'});
    items.forEach(el => observer.observe(el));
  }

  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu');
  if (header && menu) {
    menu.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    document.querySelectorAll('.mobile-nav a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('open');
        menu.setAttribute('aria-expanded','false');
      });
    });
  }
});
