import { profile, projects, experience, publications, education } from './content.mjs';

export const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const e = escapeHtml;

function formatAuthors(authorsStr = '') {
  return e(authorsStr).replace(/\*\*([^*]+)\*\*/g, '<strong class="author-self">$1</strong>');
}

const icons = {
  arrowUpRight: '<svg class="icon icon-ext" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronRight: '<svg class="icon icon-chevron-right" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronDown: '<svg class="icon chevron-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sun: '<svg class="icon icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
  code: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
  paper: '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>',
  web: '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>',
  moon: '<svg class="icon icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const external = (href, text, cls = 'nv-link', icon = icons.arrowUpRight) =>
  `<a class="${cls}" href="${e(href)}" target="_blank" rel="noopener noreferrer"><span>${e(text)}</span>${icon}<span class="sr-only"> (opens in a new tab)</span></a>`;

function renderFigureCard(fig, prefix = '') {
  return `<figure class="prose-inline-figure">
      <button type="button" class="prose-figure-btn" data-lightbox-src="${prefix}${e(fig.src)}" data-lightbox-caption="${e(fig.caption)}" aria-label="View full size: ${e(fig.label || fig.caption)}">
        <img src="${prefix}${e(fig.src)}" alt="${e(fig.caption)}" loading="lazy" width="760" height="440">
      </button>
      <figcaption>${fig.label ? `<strong>${e(fig.label)}:</strong> ` : ''}${e(fig.caption)}</figcaption>
    </figure>`;
}

function proseBody(s) {
  const paragraphs = [].concat(s.text || []).map(t => `<p>${e(t)}</p>`).join('');
  const points = (s.points || []).map(pt => `<li>${pt.term ? `<strong>${e(pt.term)}.</strong> ` : ''}${e(pt.text || pt)}</li>`).join('');
  return paragraphs + (points ? `<ul class="prose-points">${points}</ul>` : '');
}

function renderProseSection(s, prefix = '') {
  const heading = s.heading || s.title;
  if (Array.isArray(s.figures) && s.figures.length > 0) {
    return `<div class="prose-block prose-with-figures-strip">
      <div class="prose-text-col">
        ${heading ? `<h4 class="prose-heading">${e(heading)}</h4>` : ''}
        ${proseBody(s)}
      </div>
      <div class="prose-figures-row prose-figures-cols-${s.figures.length}">
        ${s.figures.map(f => renderFigureCard(f, prefix)).join('')}
      </div>
    </div>`;
  }
  if (!s.figure) {
    return `<div class="prose-block">
      ${heading ? `<h4 class="prose-heading">${e(heading)}</h4>` : ''}
      ${proseBody(s)}
    </div>`;
  }
  const fig = s.figure;
  const isWide = fig.layout === 'wide';
  const isContain = fig.fit === 'contain';
  return `<div class="prose-block prose-with-figure ${isWide ? 'prose-figure-wide' : 'prose-figure-side'}${isContain ? ' prose-figure-contain' : ''}">
    <div class="prose-text-col">
      ${heading ? `<h4 class="prose-heading">${e(heading)}</h4>` : ''}
      ${proseBody(s)}
    </div>
    ${renderFigureCard(fig, prefix)}
  </div>`;
}

function header(prefix, home) {
  const anchor = id => `${home ? '' : `${prefix}index.html`}#${id}`;
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="site-header">
    <div class="header-inner container">
      <a class="wordmark" href="${prefix}index.html" aria-label="Simone Utili home">
        <span class="wordmark-name">${e(profile.name)}</span>
        <span class="wordmark-sub">TU Delft</span>
      </a>

      <nav class="main-nav" id="main-nav" aria-label="Section navigation">
        <a href="${anchor('about')}" data-section-link="about">About</a>
        <a href="${anchor('projects')}" data-section-link="projects">Research</a>
        <a href="${anchor('publications')}" data-section-link="publications">Publications</a>
        <a href="${anchor('hackathons')}" data-section-link="hackathons">Hackathons</a>
        <a href="${anchor('experience')}" data-section-link="experience">Experience</a>
        <a class="nav-cv" href="${prefix}${e(profile.cv)}" target="_blank" rel="noopener">CV${icons.arrowUpRight}</a>
      </nav>

      <div class="header-controls">
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch between light and dark theme" title="Toggle light / dark mode">
          ${icons.sun}
          ${icons.moon}
          <span class="theme-toggle-label" data-theme-label>Light</span>
        </button>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" hidden>
          <span>Menu</span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(prefix) {
  return `<footer class="site-footer" id="contact">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-bio">
          <p class="footer-name">${e(profile.name)}</p>
          <p class="footer-tagline">${e(profile.role)} · ${e(profile.location)}</p>
        </div>
        <div class="footer-links-col">
          <a class="nv-link" href="mailto:${e(profile.email)}"><span>${e(profile.email)}</span>${icons.arrowUpRight}</a>
          <div class="footer-pills">
            ${external(profile.github, 'GitHub', 'nv-link')}
            ${external(profile.linkedin, 'LinkedIn', 'nv-link')}
            ${external(profile.scholar, 'IEEE AIM 2026', 'nv-link')}
            <a class="nv-link" href="${prefix}${e(profile.cv)}" download><span>CV (PDF)</span>${icons.arrowUpRight}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Simone Utili · Delft, Netherlands</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </div>
  </footer>
  <div class="lightbox" id="media-lightbox" role="dialog" aria-modal="true" aria-label="Media viewer" hidden>
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-content">
      <button class="lightbox-close" type="button" data-lightbox-close aria-label="Close media viewer">✕ Close</button>
      <div class="lightbox-stage" id="lightbox-stage"></div>
      <p class="lightbox-caption" id="lightbox-caption"></p>
    </div>
  </div>
  <div class="toast" role="status" aria-live="polite" aria-atomic="true"></div>`;
}

function documentShell({ title, description, prefix = '', body, home = false, bodyClass = '' }) {
  const themeInitScript = `(function(){try{var q=new URLSearchParams(window.location.search).get('theme');var saved=localStorage.getItem('su-theme');var t=(q==='dark'||q==='light')?q:(saved==='dark'?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.dataset.theme='light';}})();`;
  return `<!doctype html>
<html lang="en" id="top" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f5f5f7">
  <title>${e(title)}</title>
  <meta name="description" content="${e(description)}">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:image" content="https://simoneutili.github.io/assets/media/liminal-award-team.jpg">
  <meta name="author" content="Simone Utili">
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${prefix}assets/fonts/sf-pro-display-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${prefix}assets/fonts/sf-pro-text-400.woff2" as="font" type="font/woff2" crossorigin>
  <script>${themeInitScript}</script>
  <link rel="stylesheet" href="${prefix}styles.css">
  <script src="${prefix}main.js" defer></script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
  ${header(prefix, home)}
  <main id="main">${body}</main>
  ${footer(prefix)}
</body>
</html>`;
}

function renderExperienceCard(p, prefix = '') {
  const galleryItems = p.gallery || [];
  const hasVideo = Boolean(p.videoPreview);
  const filterTokens = ['all', p.category, ...(p.filterTags || [])].join(' ');
  const drawerId = `drawer-${p.slug}`;

  return `<article class="work-card reveal-item" id="card-${e(p.slug)}" data-card data-categories="${e(filterTokens)}">
    <div class="work-card-main">
      <div class="work-media-col">
        <div class="work-media-frame" data-media-frame="${e(p.slug)}">
          ${hasVideo ? `
            <video class="work-video-preview" muted loop playsinline preload="metadata" poster="${prefix}${e(p.image)}" data-autoplay-video aria-label="${e(p.title)} animated video preview">
              <source src="${prefix}${e(p.videoPreview)}" type="video/mp4">
            </video>
          ` : `
            <img class="work-image-preview" src="${prefix}${e(p.image)}" alt="${e(p.imageAlt)}" width="800" height="500" loading="lazy" decoding="async">
          `}
          <a class="media-overlay-link" href="${prefix}work/${e(p.slug)}/" aria-label="Open full page for ${e(p.title)}"></a>
        </div>
        ${galleryItems.length > 1 ? `
          <div class="mini-gallery-bar" role="group" aria-label="Switch media preview for ${e(p.title)}">
            ${galleryItems.slice(0, 5).map((item, idx) => `
              <button type="button" class="mini-media-btn ${idx === 0 ? 'is-active' : ''}"
                data-switch-media="${e(p.slug)}"
                data-media-type="${e(item.type)}"
                data-media-src="${prefix}${e(item.src)}"
                data-media-poster="${item.poster ? `${prefix}${e(item.poster)}` : `${prefix}${e(p.image)}`}"
                data-media-caption="${e(item.caption)}"
                aria-pressed="${idx === 0 ? 'true' : 'false'}"
                title="${e(item.label)}">
                ${item.type === 'video' ? '▶ ' : item.type === 'pdf' ? '📄 ' : ''}${e(item.label)}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="work-info-col">
        <div class="work-meta-top">
          <span class="work-institution">${e(p.institution)}</span>
          <span class="work-meta-dot" aria-hidden="true">·</span>
          <span class="work-period">${e(p.period)}</span>
          ${p.award ? `<span class="award-badge">${e(p.award)}</span>` : ''}
        </div>

        <h3 class="work-title">
          <a href="${prefix}work/${e(p.slug)}/">${e(p.title)}</a>
        </h3>
        ${p.subtitle ? `<p class="work-subtitle">${e(p.subtitle)}</p>` : ''}
        ${p.authors ? `<p class="work-authors">${formatAuthors(p.authors)}</p>` : ''}
        <p class="work-summary">${e(p.summary)}</p>

        <p class="work-tech-line" aria-label="Technologies">
          ${p.tags.map(t => `<span>${e(t)}</span>`).join('<span class="tech-sep" aria-hidden="true">·</span>')}
        </p>

        <div class="work-actions">
          <button type="button" class="drawer-toggle-btn" aria-expanded="false" aria-controls="${e(drawerId)}" data-drawer-toggle="${e(drawerId)}">
            <span>Details &amp; Media (${galleryItems.length || 1})</span>
            ${icons.chevronDown}
          </button>
          <div class="work-links-inline">
            <a class="nv-link" href="${prefix}work/${e(p.slug)}/"><span>Project Page</span>${icons.chevronRight}</a>
            ${p.repo ? external(p.repo, 'Code', 'nv-link') : ''}
            ${p.website ? external(p.website, 'Website', 'nv-link') : ''}
            ${p.modelUrl ? external(p.modelUrl, p.modelLabel || 'Model', 'nv-link') : ''}
            ${p.paperUrl ? external(p.paperUrl, 'Paper', 'nv-link') : ''}
            ${p.pdfUrl ? `<a class="nv-link" href="${prefix}${e(p.pdfUrl)}" target="_blank" rel="noopener"><span>${e(p.pdfLabel || 'PDF')}</span>${icons.arrowUpRight}</a>` : ''}
            ${p.video ? external(p.video, 'Video', 'nv-link') : ''}
            ${p.event ? external(p.event, 'Event', 'nv-link') : ''}
          </div>
        </div>
      </div>
    </div>

    <div class="work-drawer" id="${e(drawerId)}" hidden>
      <div class="drawer-inner">
        <div class="drawer-prose">
          ${p.sections.map(s => renderProseSection(s, prefix)).join('')}
        </div>

        ${galleryItems.length ? `
          <div class="drawer-gallery">
            <h4 class="drawer-gallery-title">Media Gallery</h4>
            <div class="drawer-gallery-grid">
              ${galleryItems.map(item => `
                <figure class="drawer-media-item">
                  ${item.type === 'video' ? `
                    <div class="drawer-video-wrap">
                      <video controls playsinline preload="metadata" poster="${item.poster ? `${prefix}${e(item.poster)}` : `${prefix}${e(p.image)}`}">
                        <source src="${prefix}${e(item.src)}" type="video/mp4">
                      </video>
                    </div>
                  ` : item.type === 'pdf' ? `
                    <a class="drawer-img-btn drawer-pdf-link" href="${prefix}${e(item.src)}" target="_blank" rel="noopener" aria-label="Open PDF: ${e(item.label)}">
                      <img src="${item.poster ? `${prefix}${e(item.poster)}` : `${prefix}${e(p.image)}`}" alt="${e(item.caption)}" loading="lazy" width="480" height="300">
                      <span class="pdf-badge-overlay">Open PDF Report ↗</span>
                    </a>
                  ` : `
                    <button type="button" class="drawer-img-btn" data-lightbox-src="${prefix}${e(item.src)}" data-lightbox-caption="${e(item.caption)}" aria-label="View full size: ${e(item.label)}">
                      <img src="${prefix}${e(item.src)}" alt="${e(item.caption)}" loading="lazy" width="480" height="300">
                    </button>
                  `}
                  <figcaption>
                    <strong>${e(item.label)}:</strong> ${e(item.caption)}
                  </figcaption>
                </figure>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  </article>`;
}

function renderPublicationCard(pub, prefix = '') {
  const bibId = `bibtex-${pub.slug}`;
  return `<article class="pub-card reveal-item" id="pub-${e(pub.slug)}">
    <div class="pub-media">
      ${pub.videoPreview ? `
        <video class="pub-video" muted loop playsinline preload="metadata" poster="${prefix}${e(pub.image)}" data-autoplay-video aria-label="${e(pub.title)} preview">
          <source src="${prefix}${e(pub.videoPreview)}" type="video/mp4">
        </video>
      ` : pub.pdf ? `
        <a class="drawer-pdf-link pub-pdf-thumb" href="${prefix}${e(pub.pdf)}" target="_blank" rel="noopener" aria-label="Open PDF: ${e(pub.title)}">
          <img src="${prefix}${e(pub.image)}" alt="${e(pub.title)}" loading="lazy" width="420" height="260">
          <span class="pdf-badge-overlay">Open PDF ↗</span>
        </a>
      ` : `
        <img src="${prefix}${e(pub.image)}" alt="${e(pub.title)}" loading="lazy" width="420" height="260">
      `}
    </div>
    <div class="pub-body">
      <div class="work-meta-top">
        <span class="work-institution">${e(pub.shortVenue || pub.venue)}</span>
        <span class="work-meta-dot" aria-hidden="true">·</span>
        <span class="work-period">${e(pub.year)}</span>
        <span class="award-badge">${e(pub.award || pub.status)}</span>
      </div>
      <h3 class="work-title"><a href="${prefix}publications/${e(pub.slug)}/">${e(pub.title)}</a></h3>
      ${pub.subtitle ? `<p class="work-subtitle" lang="it">${e(pub.subtitle)}</p>` : ''}
      <p class="work-authors">${formatAuthors(pub.authors)}</p>
      <p class="work-summary">${e(pub.description)}</p>
      <div class="work-actions">
        <button type="button" class="drawer-toggle-btn" data-bibtex-toggle="${e(bibId)}" aria-expanded="false" aria-controls="${e(bibId)}">
          <span>BibTeX</span>
          ${icons.chevronDown}
        </button>
        <div class="work-links-inline">
          <a class="nv-link" href="${prefix}publications/${e(pub.slug)}/"><span>Paper Details</span>${icons.chevronRight}</a>
          ${external(pub.url, pub.linkText, 'nv-link')}
          ${pub.pdf ? `<a class="nv-link" href="${prefix}${e(pub.pdf)}" target="_blank" rel="noopener"><span>PDF</span>${icons.arrowUpRight}</a>` : ''}
          ${pub.repo ? external(pub.repo, 'Code', 'nv-link') : ''}
        </div>
      </div>
      <div class="bibtex-drawer" id="${e(bibId)}" hidden>
        <pre><code>${e(pub.bibtex)}</code></pre>
      </div>
    </div>
  </article>`;
}

export function renderHome() {
  const hackathonItems = projects.filter(p => p.category === 'hackathon');
  const researchItems = projects.filter(p => p.category === 'research');

  return documentShell({
    title: 'Simone Utili · Robotics, Control & Learning (TU Delft)',
    description: 'Portfolio of Simone Utili, MSc Robotics student at TU Delft working on control theory, reinforcement learning, motion planning, and physical AI.',
    home: true,
    body: `
    <!-- HERO / BIO -->
    <section class="hero-section container" id="about" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-bio-col">
          <p class="nv-kicker">${e(profile.location)} <span aria-hidden="true">/</span> ${e(profile.role)}</p>
          <h1 id="hero-title">${e(profile.name)}</h1>
          <p class="hero-lead">${e(profile.tagline)}</p>

          <div class="hero-prose">
            ${profile.bio.map(paragraph => `<p>${e(paragraph)}</p>`).join('')}
          </div>

          <div class="hero-spec-bar">
            <span class="spec-label">Focus</span>
            <p class="spec-items">
              ${profile.interests.map(item => `<span>${e(item)}</span>`).join('<span class="tech-sep" aria-hidden="true">·</span>')}
            </p>
          </div>

          <div class="hero-toolbar">
            <a class="btn-apple-primary" href="${e(profile.cv)}" target="_blank" rel="noopener">Curriculum Vitae (PDF)</a>
            <div class="hero-links-inline">
              ${external(profile.github, 'GitHub', 'nv-link')}
              ${external(profile.scholar, 'IEEE AIM 2026', 'nv-link')}
              ${external(profile.linkedin, 'LinkedIn', 'nv-link')}
              <a class="nv-link" href="mailto:${e(profile.email)}"><span>${e(profile.email)}</span></a>
            </div>
          </div>
        </div>

        <div class="hero-portrait-col">
          <div class="portrait-bento" data-portrait-switcher>
            <div class="portrait-stage">
              <img id="hero-portrait-img" src="${e(profile.portraits[0].src)}" alt="${e(profile.portraits[0].alt)}" width="640" height="760" fetchpriority="high">
              <div class="portrait-overlay">
                <span class="portrait-caption" id="hero-portrait-caption">${e(profile.portraits[0].caption)}</span>
              </div>
            </div>
            <div class="portrait-thumbs" role="group" aria-label="Switch personal robotics photo">
              ${profile.portraits.map((p, idx) => `
                <button type="button" class="portrait-thumb-btn ${idx === 0 ? 'is-active' : ''}"
                  data-portrait-src="${e(p.src)}"
                  data-portrait-alt="${e(p.alt)}"
                  data-portrait-caption="${e(p.caption)}"
                  aria-pressed="${idx === 0 ? 'true' : 'false'}"
                  title="${e(p.caption)}">
                  <img src="${e(p.src)}" alt="${e(p.alt)}" width="64" height="64" loading="lazy">
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      ${profile.currentStatus ? `
        <aside class="status-bento reveal-item" aria-label="Current status and MSc thesis search">
          <div class="status-bento-main">
            <div class="status-header-row">
              <span class="status-live-pill">
                <span class="status-pulse-dot" aria-hidden="true"></span>
                <span>${e(profile.currentStatus.kicker)}</span>
              </span>
            </div>
            <h2 class="status-title">${e(profile.currentStatus.title)}</h2>
            <p class="status-prose">${e(profile.currentStatus.text)}</p>
          </div>
          <div class="status-bento-side">
            <span class="spec-label">Thesis Directions</span>
            <ul class="status-pillars" aria-label="Target thesis topics">
              ${profile.currentStatus.pillars.map(pillar => `<li>${e(pillar)}</li>`).join('')}
            </ul>
            <a class="nv-link status-cta" href="mailto:${e(profile.email)}?subject=MSc%20Thesis%20Opportunity%20-%20Simone%20Utili">
              <span>${e(profile.currentStatus.ctaText)}</span>${icons.arrowUpRight}
            </a>
          </div>
        </aside>
      ` : ''}
    </section>

    <!-- SEGMENTED FILTER CONTROL -->
    <section class="filter-toolbar-section container" id="work" aria-label="Filter research and hackathons">
      <div class="segmented-control" role="toolbar" aria-label="Category filter">
        <button type="button" class="filter-btn is-active" data-filter="all" aria-pressed="true">All (${projects.length})</button>
        <button type="button" class="filter-btn" data-filter="research" aria-pressed="false">Research (${researchItems.length})</button>
        <button type="button" class="filter-btn" data-filter="hackathon" aria-pressed="false">Hackathons (${hackathonItems.length})</button>
        <button type="button" class="filter-btn" data-filter="control" aria-pressed="false">Control &amp; Planning</button>
        <button type="button" class="filter-btn" data-filter="learning" aria-pressed="false">RL &amp; Learning</button>
        <button type="button" class="filter-btn" data-filter="hardware" aria-pressed="false">Hardware</button>
      </div>
    </section>

    <!-- SECTION 1: RESEARCH & PROJECTS -->
    <section class="work-section container" id="projects" data-work-section="research" aria-labelledby="projects-title">
      <div class="section-header reveal-item">
        <div>
          <p class="nv-kicker">Academic Research &amp; Systems Engineering</p>
          <h2 id="projects-title">Research &amp; Engineering</h2>
        </div>
        <p class="section-desc">Online reinforcement learning calibration in NVIDIA Isaac Lab, whole-body motion planning &amp; MPC, autonomous mobile manipulation, and bilateral haptic control.</p>
      </div>
      <div class="work-list">
        ${researchItems.map(p => renderExperienceCard(p)).join('')}
      </div>
    </section>

    <!-- SECTION 2: PUBLICATIONS -->
    <section class="work-section container" id="publications" aria-labelledby="publications-title">
      <div class="section-header reveal-item">
        <div>
          <p class="nv-kicker">Peer-Reviewed &amp; Industry Literature</p>
          <h2 id="publications-title">Publications</h2>
        </div>
      </div>
      <div class="pub-list">
        ${publications.map(pub => renderPublicationCard(pub)).join('')}
      </div>
    </section>

    <!-- SECTION 3: HACKATHONS -->
    <section class="work-section container" id="hackathons" data-work-section="hackathon" aria-labelledby="hackathons-title">
      <div class="section-header reveal-item">
        <div>
          <p class="nv-kicker">Rapid Prototyping &amp; Control Sprints</p>
          <h2 id="hackathons-title">Hackathons</h2>
        </div>
        <p class="section-desc">48-hour deployments on physical humanoids, bimanual manipulators, and custom mechatronic prototypes.</p>
      </div>
      <div class="work-list">
        ${hackathonItems.map(p => renderExperienceCard(p)).join('')}
      </div>
    </section>

    <!-- SECTION 4: EXPERIENCE & EDUCATION -->
    <section class="work-section container" id="experience" aria-labelledby="experience-title">
      <div class="section-header reveal-item">
        <div>
          <p class="nv-kicker">Background</p>
          <h2 id="experience-title">Experience &amp; Education</h2>
        </div>
        <a class="nv-link" href="${e(profile.cv)}" download><span>Download CV (PDF)</span>${icons.arrowUpRight}</a>
      </div>

      <div class="exp-edu-grid">
        <div class="exp-col">
          <h3 class="sub-heading">Experience</h3>
          <div class="timeline-list">
            ${experience.map(exp => `
              <article class="timeline-card reveal-item">
                <div class="timeline-top">
                  <span class="timeline-period">${e(exp.period)}</span>
                  <span class="timeline-loc">${e(exp.location)}</span>
                </div>
                <h4 class="timeline-role">${e(exp.role)}</h4>
                <p class="timeline-org"><strong>${e(exp.organization)}</strong> · <span>${e(exp.detail)}</span></p>
                <p class="timeline-desc">${e(exp.description)}</p>
                <p class="work-tech-line">
                  ${exp.tags.map(t => `<span>${e(t)}</span>`).join('<span class="tech-sep" aria-hidden="true">·</span>')}
                </p>
              </article>
            `).join('')}
          </div>
        </div>

        <div class="edu-col">
          <h3 class="sub-heading">Education</h3>
          <div class="timeline-list">
            ${education.map(edu => `
              <article class="timeline-card reveal-item">
                <div class="timeline-top">
                  <span class="timeline-period">${e(edu.period)}</span>
                  <span class="timeline-loc">${e(edu.location)}</span>
                </div>
                <h4 class="timeline-role">${e(edu.degree)}</h4>
                <p class="timeline-org"><strong>${e(edu.institution)}</strong></p>
                <p class="timeline-desc">${e(edu.detail)}</p>
                ${edu.coursework ? `
                  <p class="work-tech-line">
                    ${edu.coursework.map(c => `<span>${e(c)}</span>`).join('<span class="tech-sep" aria-hidden="true">·</span>')}
                  </p>
                ` : ''}
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
    `
  });
}

function renderPaperFigure(fig, prefix) {
  return `<figure class="paper-figure paper-figure-${e(fig.size || fig.layout)}">
    <button type="button" class="paper-figure-btn" data-lightbox-src="${prefix}${e(fig.src)}" data-lightbox-caption="${e(fig.caption)}" aria-label="View full size: ${e(fig.label || fig.caption)}">
      <img src="${prefix}${e(fig.src)}" alt="${e(fig.caption)}" loading="lazy">
    </button>
    <figcaption>${fig.label ? `<strong>${e(fig.label)}.</strong> ` : ''}${e(fig.caption)}</figcaption>
  </figure>`;
}

function renderPaperSection(s, prefix) {
  // Photos and small figures sit beside the text; diagrams and plots follow it at full width.
  const aside = s.figure && ['medium', 'small'].includes(s.figure.size || s.figure.layout);
  const figure = s.figure ? renderPaperFigure(s.figure, prefix) : '';
  return `<section class="paper-section">
    <div class="paper-text${aside ? ' has-aside' : ''}">
      <h2>${e(s.heading || s.title)}</h2>
      ${aside ? figure : ''}
      ${proseBody(s)}
    </div>
    ${aside ? '' : figure}
    ${s.table ? renderPaperTable(s.table) : ''}
  </section>`;
}

function renderPaperTable(t) {
  const row = (cells, tag) => `<tr>${cells.map(c => `<${tag}>${e(c)}</${tag}>`).join('')}</tr>`;
  return `<figure class="paper-table">
    <table>
      <thead>${row(t.head, 'th')}</thead>
      <tbody>${t.rows.map(r => row(r, 'td')).join('')}</tbody>
    </table>
    <figcaption>${e(t.caption)}</figcaption>
  </figure>`;
}

function renderGalleryItem(item, p, prefix) {
  const poster = `${prefix}${e(item.poster || p.image)}`;
  const media = item.type === 'video' ? `
    <video controls playsinline preload="metadata" poster="${poster}">
      <source src="${prefix}${e(item.src)}" type="video/mp4">
    </video>` : item.type === 'pdf' ? `
    <a class="paper-gallery-btn" href="${prefix}${e(item.src)}" target="_blank" rel="noopener" aria-label="Open PDF: ${e(item.label)}">
      <img src="${poster}" alt="${e(item.caption)}" loading="lazy">
    </a>` : `
    <button type="button" class="paper-gallery-btn" data-lightbox-src="${prefix}${e(item.src)}" data-lightbox-caption="${e(item.caption)}" aria-label="View full size: ${e(item.label)}">
      <img src="${prefix}${e(item.src)}" alt="${e(item.caption)}" loading="lazy">
    </button>`;
  return `<figure class="paper-gallery-item">
    <div class="paper-gallery-media${item.fit === 'contain' ? ' is-contain' : ''}">${media}</div>
    <figcaption><strong>${e(item.label)}.</strong> ${e(item.caption)}</figcaption>
  </figure>`;
}

export function renderProject(p) {
  const prefix = '../../';
  const related = publications.find(pub => pub.slug === p.relatedPublication);
  const isHackathon = p.category === 'hackathon';
  const siblings = projects.filter(other => other.category === p.category);
  const index = siblings.indexOf(p);
  const previous = siblings.at(index - 1);
  const next = siblings[(index + 1) % siblings.length];

  // The gallery only shows media that is not already on the page.
  const shown = new Set([p.demo, p.demoPoster, ...p.sections.filter(s => s.figure).map(s => s.figure.src)]);
  const galleryItems = (p.gallery || []).filter(item => !shown.has(item.src));

  const button = (href, label, icon, internal = false) =>
    `<a class="paper-btn" href="${internal ? prefix : ''}${e(href)}"${internal ? '' : ' target="_blank" rel="noopener noreferrer"'}>${icon}<span>${e(label)}</span></a>`;
  const buttons = [
    p.paperUrl && button(p.paperUrl, 'IEEE Xplore', icons.web),
    p.pdfUrl && button(p.pdfUrl, p.pdfLabel || 'PDF', icons.paper, true),
    p.repo && button(p.repo, 'Code', icons.code),
    p.video && button(p.video, 'Video', icons.play),
    p.website && button(p.website, 'Project site', icons.web),
    p.modelUrl && button(p.modelUrl, p.modelLabel || 'Model', icons.web),
    p.event && button(p.event, 'Event', icons.web)
  ].filter(Boolean);

  return documentShell({
    title: `${p.title} · Simone Utili`,
    description: p.summary,
    prefix,
    bodyClass: 'paper-page',
    body: `<article class="paper${isHackathon ? ' paper-story' : ''}">
      <header class="paper-header">
        <a class="back-link" href="../../index.html#${isHackathon ? 'hackathons' : 'projects'}">← ${isHackathon ? 'All hackathons' : 'All research'}</a>
        <p class="paper-venue">
          <span>${e(p.institution)}</span>
          <span class="work-meta-dot" aria-hidden="true">·</span>
          <span>${e(p.period)}</span>
          ${p.award ? `<span class="award-badge">${e(p.award)}</span>` : ''}
        </p>
        <h1>${e(p.title)}</h1>
        ${p.subtitle ? `<p class="paper-tagline">${e(p.subtitle)}</p>` : ''}
        ${p.authors ? `<p class="paper-authors">${formatAuthors(p.authors)}</p>` : ''}
        ${buttons.length ? `<div class="paper-links">${buttons.join('')}</div>` : ''}
      </header>

      <figure class="paper-teaser">
        ${p.demo ? `
          <video controls autoplay muted loop playsinline preload="metadata" poster="${prefix}${e(p.demoPoster || p.image)}"${p.demoAspect ? ` style="aspect-ratio: ${e(p.demoAspect)}"` : ''} aria-label="${e(p.title)} demonstration video">
            <source src="${prefix}${e(p.demo)}" type="video/mp4">
          </video>
        ` : `<img src="${prefix}${e(p.image)}" alt="${e(p.imageAlt)}">`}
        <figcaption>${e(p.demo ? p.demoCaption || p.summary : p.imageAlt)}</figcaption>
      </figure>

      <section class="paper-section">
        <div class="paper-text">
          ${isHackathon ? '' : '<h2>Overview</h2>'}
          ${proseBody({ text: p.overview || p.summary })}
          <ul class="paper-tags" aria-label="Methods and tools">
            ${p.tags.map(t => `<li>${e(t)}</li>`).join('')}
          </ul>
        </div>
      </section>

      ${p.highlights ? `
        <ul class="paper-stats" aria-label="Key results">
          ${p.highlights.map(h => `<li><strong>${e(h.value)}</strong><span>${e(h.label)}</span></li>`).join('')}
        </ul>
      ` : ''}

      ${p.sections.map(s => renderPaperSection(s, prefix)).join('')}

      ${galleryItems.length ? `
        <section class="paper-section">
          <div class="paper-text"><h2>${isHackathon ? 'Photos and clips' : 'Gallery'}</h2></div>
          <div class="paper-gallery${galleryItems.length <= 2 || galleryItems.length === 4 ? ' paper-gallery-few' : ''}">
            ${galleryItems.map(item => renderGalleryItem(item, p, prefix)).join('')}
          </div>
        </section>
      ` : ''}

      ${related?.bibtex ? `
        <section class="paper-section">
          <div class="paper-text">
            <h2>Citation</h2>
            <pre class="paper-bibtex"><code>${e(related.bibtex)}</code></pre>
            <button class="drawer-toggle-btn copy-reference" type="button" data-citation="${e(related.bibtex)}" hidden>Copy BibTeX</button>
          </div>
        </section>
      ` : ''}

      <nav class="paper-pager" aria-label="More ${isHackathon ? 'hackathons' : 'research'}">
        <a href="../${e(previous.slug)}/"><span>← Previous</span><strong>${e(previous.title)}</strong></a>
        <a href="../${e(next.slug)}/"><span>Next →</span><strong>${e(next.title)}</strong></a>
      </nav>
    </article>`
  });
}

export function renderPublication(p) {
  const prefix = '../../';
  const related = projects.find(project => project.relatedPublication === p.slug);
  return documentShell({
    title: `${p.title} · Simone Utili`,
    description: p.description,
    prefix,
    body: `<article class="publication-detail container">
      <a class="back-link" href="../../index.html#publications">← Back to Publications</a>
      <div class="publication-detail-layout">
        <div>
          <p class="nv-kicker">${e(p.kind)} · ${e(p.year)}</p>
          <h1>${e(p.title)}</h1>
          ${p.subtitle ? `<p class="case-deck" lang="it">${e(p.subtitle)}</p>` : ''}
          <p class="work-authors">${formatAuthors(p.authors || '')}</p>
          <p class="publication-detail-description">${e(p.description)}</p>
          <p>${e(p.contribution)}</p>
          <div class="work-actions">
            <button class="drawer-toggle-btn copy-reference" type="button" data-citation="${e(p.citation)}" hidden>Copy Reference</button>
            <div class="work-links-inline">
              ${external(p.url, p.linkText, 'nv-link')}
              ${p.pdf ? `<a class="nv-link" href="${prefix}${e(p.pdf)}" target="_blank" rel="noopener"><span>Download PDF</span>${icons.arrowUpRight}</a>` : ''}
              ${p.repo ? external(p.repo, 'GitHub Repository', 'nv-link') : ''}
            </div>
          </div>
        </div>
        <aside class="publication-facts">
          <div><span>Venue</span><p>${e(p.venue)}</p></div>
          <div><span>Year</span><p>${e(p.year)}</p></div>
          <div><span>Status</span><p>${e(p.status)}</p></div>
          ${related ? `<a class="nv-link" href="../../work/${e(related.slug)}/"><span>Project &amp; Videos</span>${icons.chevronRight}</a>` : ''}
        </aside>
      </div>
      <section class="reference-block">
        <h2>Citation Reference</h2>
        <p>${e(p.citation)}</p>
        ${p.bibtex ? `<pre><code>${e(p.bibtex)}</code></pre>` : ''}
      </section>
    </article>`
  });
}

export function renderNotFound() {
  return documentShell({
    title: 'Page not found · Simone Utili',
    description: 'Return to Simone Utili’s robotics portfolio.',
    prefix: '/',
    body: `<section class="not-found container">
      <p class="nv-kicker">404</p>
      <h1>Page not found.</h1>
      <a class="btn-apple-primary" href="/">Return Home</a>
    </section>`
  });
}
