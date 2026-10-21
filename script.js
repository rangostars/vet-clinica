/* ───────── Стартовое видео ───────── */
document.addEventListener('DOMContentLoaded', function () {
  const videoBox = document.getElementById('introVideo');
  const video    = document.getElementById('introVideoPlayer');
  const skipBtn  = document.getElementById('introSkip');
  const hero     = document.querySelector('.hero');

  if (!videoBox || !video || !hero) return;

  function finish() {
    if (videoBox.classList.contains('is-hidden')) return;

    videoBox.classList.add('is-hidden');
    hero.classList.remove('hero--hidden');
    hero.classList.add('hero--revealed');

    setTimeout(function () {
      videoBox.remove();
    }, 600);
  }

  // Видео закончилось → показываем hero
  video.addEventListener('ended', finish);

  // Не удалось загрузить видео → показываем hero
  video.addEventListener('error', finish);

  // Пользователь нажал «Пропустить»
  skipBtn && skipBtn.addEventListener('click', finish);

  // Страховка: если видео «зависло» — через 15 секунд всё равно показываем hero
  setTimeout(finish, 15000);
});
/* ───────── Видео внутри hero ───────── */
document.addEventListener('DOMContentLoaded', function () {
  const videoBox  = document.getElementById('heroVideo');
  const video     = document.getElementById('heroVideoPlayer');
  const skipBtn   = document.getElementById('heroSkip');

  if (!videoBox || !video) return;

  function finish() {
    if (videoBox.classList.contains('is-hidden')) return;
    videoBox.classList.add('is-hidden');
    setTimeout(function () {
      videoBox.remove();
    }, 600);
  }

  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  skipBtn && skipBtn.addEventListener('click', finish);

  // Страховка: если видео зависло — через 15 сек всё равно показываем контент
  setTimeout(finish, 15000);
});

