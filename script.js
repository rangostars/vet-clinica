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

