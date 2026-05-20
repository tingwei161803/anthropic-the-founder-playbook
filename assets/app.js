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

  /* Switching language or edition: on wide screens carry the hash so the reader
     stays on the same chapter (the TOC is pinned alongside). On mobile that lands
     mid-page and feels like a glitch, so let the clean link load at the top. */
  document.querySelectorAll('[data-lang-link], [data-version-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = window.location.hash;
      const keepChapter = hash && window.matchMedia('(min-width: 961px)').matches;
      if (keepChapter) {
        e.preventDefault();
        window.location.href = a.getAttribute('href') + hash;
      }
    });
  });

  /* Highlight Anthropic product names (Claude / Claude Code / Claude Cowork) in body copy.
     Done in JS so both language pages stay in sync and the markup stays clean. */
  function highlightProducts() {
    // Longest names first so "Claude Code" wins over a bare "Claude" at the same spot.
    const PRODUCT_RE = /Claude Code|Claude Cowork|Claude/g;
    const SKIP_TAGS = new Set(['A', 'CODE', 'PRE', 'SCRIPT', 'STYLE', 'BUTTON', 'H1', 'H2', 'H3', 'H4']);
    const roots = document.querySelectorAll(
      '.prose, .stage__block > p:not(.stage__block-label), .stage__block ul, .stage__block ol, .tool__desc, .challenge__body'
    );

    const chips = [];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || node.nodeValue.indexOf('Claude') === -1) return NodeFilter.FILTER_REJECT;
          for (let p = node.parentElement; p && p !== root.parentElement; p = p.parentElement) {
            if (SKIP_TAGS.has(p.tagName) || p.classList.contains('product')) return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const targets = [];
      while (walker.nextNode()) targets.push(walker.currentNode);

      targets.forEach((node) => {
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        let last = 0;
        let m;
        PRODUCT_RE.lastIndex = 0;
        while ((m = PRODUCT_RE.exec(text)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          const span = document.createElement('span');
          span.className = 'product';
          span.textContent = m[0];
          frag.appendChild(span);
          chips.push(span);
          last = m.index + m[0].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });

    animateChips(chips);
  }

  /* Light up each product chip as it scrolls into view. Falls back to the
     static filled state when motion is reduced or IntersectionObserver is absent. */
  function animateChips(chips) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!chips.length || reduce || !('IntersectionObserver' in window)) return;

    chips.forEach((chip) => chip.classList.add('is-armed'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-armed');
        entry.target.classList.add('is-lit');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    chips.forEach((chip) => io.observe(chip));
  }

  /* Show the live GitHub star count in the header button. */
  function loadStarCount() {
    const el = document.querySelector('.ghstar__count');
    if (!el) return;
    const REPO = 'tingwei161803/anthropic-the-founder-playbook';
    const CACHE_KEY = 'fp_gh_stars';
    const TTL = 60 * 60 * 1000; // 1 hour
    const render = (n) => {
      el.textContent = n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
      el.hidden = false;
    };

    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.t < TTL) render(cached.n);
    } catch (e) { /* private mode / bad cache — ignore */ }

    fetch(`https://api.github.com/repos/${REPO}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || typeof data.stargazers_count !== 'number') return;
        render(data.stargazers_count);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ n: data.stargazers_count, t: Date.now() }));
        } catch (e) { /* storage unavailable — count still shows this session */ }
      })
      .catch(() => { /* offline or rate-limited — leave the button without a count */ });
  }

  highlightProducts();
  loadStarCount();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();
  updateActive();
})();
