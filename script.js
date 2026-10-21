/* ─── Бургер-меню (финальная версия, работает с чистыми якорями) ─── */
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

    // На мобилке: перед кликом по якорю запомним позицию — 
    // иначе при схлопывании меню браузер "теряет" цель
    inner.querySelectorAll('.main-nav a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return; // секции нет — пусть браузер попробует

        e.preventDefault();
        // 1) сразу прыгаем наверх к секции — до схлопывания меню
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 2) закрываем меню
        inner.classList.remove('burger-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        // 3) обновляем URL
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      });
    });

    // Закрытие при клике по остальным ссылкам (prices.html и т.п.)
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
