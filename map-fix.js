/* Fix for embedded-map errors and slow scrolling in mobile previews. */
(function () {
  const iframe = document.getElementById('mapFrame');
  const loading = document.getElementById('mapLoading');
  if (!iframe) return;

  function loadMap() {
    if (iframe.dataset.loaded === 'true') return;
    const url = iframe.dataset.src;
    if (!url) return;
    iframe.dataset.loaded = 'true';
    iframe.src = url;
    iframe.addEventListener('load', () => {
      if (loading) loading.style.display = 'none';
    }, { once: true });
    iframe.addEventListener('error', () => {
      if (loading) loading.textContent = 'Hindi ma-load ang map. Gamitin ang Open directions button.';
    }, { once: true });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMap();
        observer.disconnect();
      }
    }, { rootMargin: '250px' });
    observer.observe(iframe);
  } else {
    setTimeout(loadMap, 500);
  }
})();
