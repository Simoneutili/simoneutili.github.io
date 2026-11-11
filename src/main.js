document.documentElement.classList.add('js');

// 1. Light / Dark Theme Toggle
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeLabel = document.querySelector('[data-theme-label]');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  const normalized = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = normalized;
  document.documentElement.setAttribute('data-theme', normalized);
  if (themeLabel) themeLabel.textContent = normalized === 'dark' ? 'Dark' : 'Light';
  if (themeToggle) themeToggle.setAttribute('aria-pressed', String(normalized === 'dark'));
  if (themeMeta) themeMeta.setAttribute('content', normalized === 'dark' ? '#0b0d10' : '#f5f5f7');
  if (persist) {
    try {
      window.localStorage?.setItem('su-theme', normalized);
    } catch {
      // Ignore storage errors in private/sandboxed contexts
    }
  }
}

const initialTheme = document.documentElement.getAttribute('data-theme') || document.documentElement.dataset.theme || 'light';
applyTheme(initialTheme, false);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });
}

// 2. Mobile Navigation Menu
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = (restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    if (restoreFocus && typeof menuButton.focus === 'function') menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  if (window.matchMedia) {
    window.matchMedia('(min-width: 781px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }
}

// 3. Hero Portrait Switcher
const portraitStageImg = document.getElementById('hero-portrait-img');
const portraitCaption = document.getElementById('hero-portrait-caption');
const portraitButtons = [...document.querySelectorAll('[data-portrait-src]')];

if (portraitStageImg && portraitButtons.length) {
  portraitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-portrait-src');
      const alt = btn.getAttribute('data-portrait-alt') || '';
      const caption = btn.getAttribute('data-portrait-caption') || '';
      portraitStageImg.setAttribute('src', src);
      portraitStageImg.setAttribute('alt', alt);
      if (portraitCaption) portraitCaption.textContent = caption;
      portraitButtons.forEach(other => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
    });
  });
}

// 4. Category Filter Toolbar
const filterButtons = [...document.querySelectorAll('.filter-btn[data-filter]')];
const workCards = [...document.querySelectorAll('[data-card]')];
const workSections = [...document.querySelectorAll('[data-work-section]')];

function setCategoryFilter(filter = 'all') {
  filterButtons.forEach(btn => {
    const active = btn.getAttribute('data-filter') === filter;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  workCards.forEach(card => {
    const categories = (card.getAttribute('data-categories') || '').split(/\s+/);
    const matches = filter === 'all' || categories.includes(filter);
    card.hidden = !matches;
  });

  workSections.forEach(section => {
    const cardsInSection = [...section.querySelectorAll('[data-card]')];
    const hasVisible = cardsInSection.some(card => !card.hidden);
    section.hidden = !hasVisible;
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setCategoryFilter(btn.getAttribute('data-filter') || 'all');
  });
});

// 5. Card Mini Media Switcher (Video / Photo preview toggle on each card)
document.querySelectorAll('[data-switch-media]').forEach(btn => {
  btn.addEventListener('click', () => {
    const slug = btn.getAttribute('data-switch-media');
    const frame = document.querySelector(`[data-media-frame="${slug}"]`);
    if (!frame) return;

    const type = btn.getAttribute('data-media-type');
    const src = btn.getAttribute('data-media-src');
    const poster = btn.getAttribute('data-media-poster') || '';
    const caption = btn.getAttribute('data-media-caption') || '';

    document.querySelectorAll(`[data-switch-media="${slug}"]`).forEach(sibling => {
      const active = sibling === btn;
      sibling.classList.toggle('is-active', active);
      sibling.setAttribute('aria-pressed', String(active));
    });

    if (type === 'video') {
      frame.innerHTML = `
        <video class="work-video-preview" muted loop playsinline autoplay preload="metadata" poster="${poster}" data-autoplay-video aria-label="${caption}">
          <source src="${src}" type="video/mp4">
        </video>
        <a class="media-overlay-link" href="work/${slug}/" aria-label="Open full page"></a>
      `;
      const video = frame.querySelector('video');
      if (video && typeof video.play === 'function') {
        video.play().catch(() => {});
      }
    } else if (type === 'pdf') {
      frame.innerHTML = `
        <img class="work-image-preview" src="${poster}" alt="${caption}" width="800" height="500" style="object-position: top center;">
        <span class="pdf-badge-overlay">Open PDF Report ↗</span>
        <a class="media-overlay-link" href="${src}" target="_blank" rel="noopener" aria-label="Open PDF report: ${caption}"></a>
      `;
    } else {
      frame.innerHTML = `
        <img class="work-image-preview" src="${src}" alt="${caption}" width="800" height="500">
        <a class="media-overlay-link" href="work/${slug}/" aria-label="Open full page"></a>
      `;
    }
  });
});

// 6. Inline Expandable Drawers (Project Technical Breakdown & Media Gallery + BibTeX)
function bindDrawerToggles(attr) {
  document.querySelectorAll(`[${attr}]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute(attr);
      const drawer = document.getElementById(targetId);
      if (!drawer) return;
      const willOpen = drawer.hidden;
      drawer.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });
}

bindDrawerToggles('data-drawer-toggle');
bindDrawerToggles('data-bibtex-toggle');

// 7. Lightbox Modal for Gallery Images
const lightbox = document.getElementById('media-lightbox');
const lightboxStage = document.getElementById('lightbox-stage');
const lightboxCaption = document.getElementById('lightbox-caption');

if (lightbox && lightboxStage) {
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxStage.innerHTML = '';
    if (lightboxCaption) lightboxCaption.textContent = '';
  };

  document.querySelectorAll('[data-lightbox-src]').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const caption = btn.getAttribute('data-lightbox-caption') || '';
      lightboxStage.innerHTML = `<img src="${src}" alt="${caption}">`;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.hidden = false;
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach(el => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

// 8. Toast Notification & Copy Citation Reference
let toastTimer;
function notify(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

document.querySelectorAll('.copy-reference').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.citation);
      notify('Reference copied.');
    } catch {
      const reference = document.querySelector('.reference-block p');
      if (reference && window.getSelection && document.createRange) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(reference);
        selection.removeAllRanges();
        selection.addRange(range);
        if (typeof reference.scrollIntoView === 'function') {
          reference.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
      }
      notify('Select and copy the reference below.');
    }
  });
});

// 9. Viewport Autoplay for Videos, Reveal Observer, Scroll-Linked Bento Motion & Scroll-Spy
const revealItems = [...document.querySelectorAll('.reveal-item')];
const motionCards = [...document.querySelectorAll('.work-card, .pub-card, .timeline-card, .portrait-bento, .status-bento')];
const prefersReducedMotion = Boolean(
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

if ('IntersectionObserver' in window) {
  // Progressive reveal animation for cards & section headers
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-revealed');
        setTimeout(() => el.classList.add('is-settled'), 750);
        revealObserver.unobserve(el);
      }
    }
  }, { rootMargin: '0px 0px -36px 0px', threshold: 0.05 });

  revealItems.forEach((item, idx) => {
    // Subtle stagger for cards sitting side-by-side in the same section
    if (item.classList.contains('timeline-card')) {
      item.style.transitionDelay = `${(idx % 2) * 60}ms`;
    }
    revealObserver.observe(item);
  });

  // Section scroll-spy
  const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if (sectionLinks.length) {
    const spyObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        sectionLinks.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => spyObserver.observe(section));
  }

  // Video autoplay when in viewport
  const playWhenReady = video => {
    if (typeof video.play !== 'function') return;
    if (video.readyState >= 2) {
      video.play().catch(() => {});
    } else {
      video.addEventListener('loadeddata', () => {
        if (video.dataset.inView === 'true') video.play().catch(() => {});
      }, { once: true });
      if (typeof video.load === 'function' && video.networkState === 0) {
        video.load();
      }
    }
  };

  const videoObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.dataset.inView = 'true';
        playWhenReady(video);
      } else {
        video.dataset.inView = 'false';
        if (typeof video.pause === 'function') video.pause();
      }
    }
  }, { threshold: 0.2 });

  document.querySelectorAll('video[data-autoplay-video]').forEach(video => videoObserver.observe(video));
} else {
  revealItems.forEach(item => {
    item.classList.add('is-revealed', 'is-settled');
  });
}

// Continuous subtle scroll-linked float on each bento box (Apple / NVIDIA micro-parallax)
if (!prefersReducedMotion && motionCards.length && typeof window.requestAnimationFrame === 'function') {
  let ticking = false;

  const updateScrollMotion = () => {
    ticking = false;
    const vh = window.innerHeight || 800;
    const halfVh = vh * 0.5;

    for (const card of motionCards) {
      if (card.hidden) continue;
      const rect = card.getBoundingClientRect();
      // Only compute for cards near or inside the viewport
      if (rect.bottom < -120 || rect.top > vh + 120) continue;

      const cardCenter = rect.top + rect.height * 0.5;
      // Normalized position in [-1, 1] relative to viewport center
      const norm = Math.max(-1, Math.min(1, (cardCenter - halfVh) / (halfVh + rect.height * 0.4)));
      // Smooth vertical float (-10px when above center, +10px when below center)
      const shiftY = (norm * 10.5).toFixed(2);
      // Counter-parallax inside media frame (-7px to +7px)
      const mediaY = (-norm * 7.5).toFixed(2);
      // Subtle focus scale (1.0 in center, 0.992 toward top/bottom edges)
      const dist = Math.abs(norm);
      const scale = (1 - dist * 0.008).toFixed(4);

      card.style.setProperty('--scroll-y', `${shiftY}px`);
      card.style.setProperty('--media-y', `${mediaY}px`);
      card.style.setProperty('--scroll-scale', scale);
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollMotion);
    }
  }, { passive: true });

  window.ResizeObserver
    ? new ResizeObserver(() => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateScrollMotion);
        }
      }).observe(document.body)
    : window.addEventListener('resize', updateScrollMotion, { passive: true });

  window.requestAnimationFrame(updateScrollMotion);
}
