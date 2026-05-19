/* Reading progress bar + active-section highlighting in the TOC. */
(() => {
  const progress = document.querySelector('.progress');
  const sections = Array.from(document.querySelectorAll('.section[id]'));
  const tocItems = new Map(
    Array.from(document.querySelectorAll('.toc__item')).map((el) => [el.dataset.target, el])
  );

  function updateProgress() {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  }

  function updateActive() {
    const offset = window.innerHeight * 0.35;
    let current = sections[0]?.id;
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top - offset <= 0) current = s.id;
    }
    tocItems.forEach((el, id) => {
      el.dataset.active = id === current ? 'true' : 'false';
    });
  }

  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      updateProgress();
      updateActive();
      raf = null;
    });
  }

  /* Mobile TOC toggle */
  const toc = document.querySelector('.toc');
  const tocToggle = document.querySelector('.toc__toggle');
  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => {
      const open = toc.dataset.open === 'true';
      toc.dataset.open = open ? 'false' : 'true';
    });
    document.querySelectorAll('.toc__item a').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 960px)').matches) {
          toc.dataset.open = 'false';
        }
      });
    });
  }

  /* Preserve hash when switching languages so users land on the same chapter */
  document.querySelectorAll('[data-lang-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = window.location.hash;
      if (hash) {
        e.preventDefault();
        window.location.href = a.getAttribute('href') + hash;
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();
  updateActive();
})();
