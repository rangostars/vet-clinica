/* ───────── Видео внутри hero ───────── */
document.addEventListener('DOMContentLoaded', function () {
  const videoBox = document.getElementById('heroVideo');
  const video    = document.getElementById('heroVideoPlayer');
  const skipBtn  = document.getElementById('heroSkip');

  if (!videoBox || !video) return;

  let shown = false;

  // Показываем видео-слой сразу, не дожидаясь загрузки файла
  function showVideo() {
    if (shown) return;
    shown = true;

    videoBox.classList.remove('hero-video--hidden');

    const p = video.play();
    if (p && typeof p.then === 'function') {
      p.catch(function () {
        // Браузер отказался автоплей → убираем слой, остаётся hero
        videoBox.remove();
      });
    }
  }

  // Скрыть видео-слой и показать hero
  function finish() {
    if (!videoBox || videoBox.classList.contains('is-hidden')) return;
    videoBox.classList.add('is-hidden');
    setTimeout(function () {
      videoBox.remove();
    }, 600);
  }

  // Запускаем сразу
  showVideo();

  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  skipBtn && skipBtn.addEventListener('click', finish);

  // Страховка: если видео зависло — через 15 сек всё равно показываем контент
  setTimeout(finish, 15000);
});

