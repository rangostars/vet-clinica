/* ─── Бургер-меню ─── */
(function () {
  function initBurger() {
    const toggle = document.getElementById('burgerToggle');
    const inner  = document.getElementById('headerInner');
    if (!toggle || !inner) return;

    toggle.addEventListener('click', function () {
      const isOpen = inner.classList.toggle('burger-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    inner.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        inner.classList.remove('burger-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBurger);
  } else {
    initBurger();
  }
})();

