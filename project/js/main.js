// Utilities
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

// Year in footer
qs('#year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
qsa('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = qs(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Mobile menu
const burger = qs('.burger');
const mobileMenu = qs('#mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  qsa('.mobile-menu__link', mobileMenu).forEach((link) =>
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// Sticky action bar logic
const bars = qsa('.action-bar');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  const show = y > 300;
  bars.forEach((b) => {
    b.hidden = !show;
    if (show) b.classList.add('visible');
  });
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll to top
const topBtn = qs('[data-scroll-top]');
if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Countdown timer
function startCountdown(root, targetDate) {
  const daysEl = qs('[data-days]', root);
  const hoursEl = qs('[data-hours]', root);
  const minsEl = qs('[data-minutes]', root);
  const secsEl = qs('[data-seconds]', root);
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      clearInterval(intId);
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
    // mini widget
    const mini = qs('#miniTimer');
    if (mini) mini.textContent = `${pad(h + d * 24)}:${pad(m)}:${pad(s)}`;
  }
  tick();
  const intId = setInterval(tick, 1000);
}

// Initialize countdown with +5 hours by default
qsa('.countdown-timer').forEach((timer) => {
  const targetAttr = timer.getAttribute('data-target');
  const target = targetAttr ? new Date(targetAttr) : new Date(Date.now() + 5 * 60 * 60 * 1000 + 12 * 60 * 1000 + 15 * 1000);
  startCountdown(timer, target);
});

// Accordion
qsa('[data-accordion]').forEach((acc) => {
  qsa('.accordion__item', acc).forEach((item) => {
    const header = qs('.accordion__header', item);
    const panel = qs('.accordion__panel', item);
    header.addEventListener('click', () => {
      const open = item.hasAttribute('open');
      qsa('.accordion__item', acc).forEach((i) => i.removeAttribute('open'));
      if (!open) item.setAttribute('open', '');
      header.setAttribute('aria-expanded', String(!open));
    });
  });
});





