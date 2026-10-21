/* ─── Бургер-меню (v2 — с корректной навигацией по якорям) ─── */
(function () {
  function initBurger() {
    const toggle = document.getElementById('burgerToggle');
    const inner  = document.getElementById('headerInner');
    if (!toggle || !inner) return;

    function openMenu() {
      inner.classList.add('burger-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Закрыть меню');
    }

    function closeMenu() {
      inner.classList.remove('burger-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Открыть меню');
    }

    toggle.addEventListener('click', function () {
      inner.classList.contains('burger-open') ? closeMenu() : openMenu();
    });

    // Клик по любой ссылке меню
    inner.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href') || '';
        const hashIndex = href.indexOf('#');
        const isSamePage = hashIndex !== -1 && (
          href.startsWith('#') ||
          href.startsWith(location.pathname.split('/').pop())
        );

        if (isSamePage) {
          // На этой же странице: даём браузеру прыгнуть к якорю,
          // а меню закрываем ПОСЛЕ этого, чтобы не сбить скролл
          const id = href.slice(hashIndex + 1);
          const target = id ? document.getElementById(id) : null;

          if (target) {
            e.preventDefault();
            closeMenu();

            // Ждём, пока меню «схлопнется», чтобы высота стабилизировалась
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Обновляем URL без редиректа
                if (history.replaceState) {
                  history.replaceState(null, '', '#' + id);
                }
              });
            });
            return;
          }
        }

        // Иначе — обычный переход (на другую страницу)
        closeMenu();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBurger);
  } else {
    initBurger();
  }
})();
