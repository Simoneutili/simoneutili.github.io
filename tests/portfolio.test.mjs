import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';
import { projects, publications } from '../src/content.mjs';

const dist = resolve(import.meta.dirname, '../dist');
const pages = [
  'index.html',
  '404.html',
  ...projects.map(p => `work/${p.slug}/index.html`),
  ...publications.map(p => `publications/${p.slug}/index.html`),
];
const script = await readFile(resolve(import.meta.dirname, '../src/main.js'), 'utf8');
const documents = new Map(
  await Promise.all(
    pages.map(async page => [page, parseHTML(await readFile(resolve(dist, page), 'utf8')).document])
  )
);

test('all generated pages have usable navigation, accessible images, looping video previews, and valid internal destinations', async () => {
  for (const [page, document] of documents) {
    assert.equal(document.querySelectorAll('h1').length, 1, page);
    assert.equal(document.documentElement.lang, 'en');
    assert.ok(document.querySelector('meta[name="viewport"]'));
    assert.ok(document.querySelector('main#main'));
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${page}`);
    for (const img of document.querySelectorAll('img')) {
      assert.ok(img.hasAttribute('alt'), `Missing alt on ${page}`);
    }
    for (const el of document.querySelectorAll('[href], [src], [poster]')) {
      const value = el.getAttribute('href') ?? el.getAttribute('src') ?? el.getAttribute('poster');
      assert.notEqual(value, '#', `Empty destination: ${page}`);
      const url = new URL(value, `https://portfolio.test/${page}`);
      if (url.origin !== 'https://portfolio.test') continue;
      let target = decodeURIComponent(url.pathname).slice(1);
      if (!target || target.endsWith('/')) target += 'index.html';
      assert.ok((await stat(resolve(dist, target))).isFile(), `${page}: ${value}`);
      if (url.hash) {
        assert.ok(documents.get(target)?.getElementById(url.hash.slice(1)), `${page}: missing ${value}`);
      }
    }
  }

  const homeDoc = documents.get('index.html');
  const cards = homeDoc.querySelectorAll('[data-card]');
  assert.equal(cards.length, projects.length, 'Every hackathon and research project renders as an interactive card');
  for (const card of cards) {
    assert.ok(card.querySelector('video[data-autoplay-video]'), `Card ${card.id} has an animated video preview`);
    assert.ok(card.querySelector('.work-drawer'), `Card ${card.id} has an expandable description & media drawer`);
  }

  assert.equal((await readFile(resolve(dist, 'documents/simone-utili-cv.pdf'))).subarray(0, 5).toString(), '%PDF-');
  assert.equal((await readFile(resolve(dist, 'documents/aim2026-real2sim-paper.pdf'))).subarray(0, 5).toString(), '%PDF-');
});

async function interactive(page = 'index.html', clipboard = async () => {}, setup = () => ({})) {
  const { document, window } = parseHTML(await readFile(resolve(dist, page), 'utf8'));
  const storage = new Map();
  const browser = {
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, val) => storage.set(key, String(val)),
    },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    ...setup(document),
  };
  vm.runInNewContext(script, {
    document,
    window: browser,
    navigator: { clipboard: { writeText: clipboard } },
    setTimeout: () => 1,
    clearTimeout() {},
  });
  return { document, Event: window.Event, storage };
}

test('light and dark theme toggle updates data-theme, label, meta theme-color, and localStorage', async () => {
  const { document, storage } = await interactive();
  const toggle = document.querySelector('[data-theme-toggle]');
  const label = document.querySelector('[data-theme-label]');
  assert.equal(document.documentElement.getAttribute('data-theme'), 'light');
  assert.equal(label.textContent, 'Light');

  toggle.click();
  assert.equal(document.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(label.textContent, 'Dark');
  assert.equal(toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(storage.get('su-theme'), 'dark');

  toggle.click();
  assert.equal(document.documentElement.getAttribute('data-theme'), 'light');
  assert.equal(label.textContent, 'Light');
  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(storage.get('su-theme'), 'light');
});

test('hero portrait switcher cycles through personal robotics photographs', async () => {
  const { document } = await interactive();
  const stageImg = document.getElementById('hero-portrait-img');
  const caption = document.getElementById('hero-portrait-caption');
  const thumbs = [...document.querySelectorAll('[data-portrait-src]')];
  assert.equal(thumbs.length, 3);
  assert.ok(!thumbs.some(t => (t.getAttribute('data-portrait-src') || '').includes('profile-portrait.jpg')));

  thumbs[1].click();
  assert.equal(stageImg.getAttribute('src'), thumbs[1].getAttribute('data-portrait-src'));
  assert.equal(caption.textContent, thumbs[1].getAttribute('data-portrait-caption'));
  assert.equal(thumbs[1].getAttribute('aria-pressed'), 'true');
  assert.equal(thumbs[0].getAttribute('aria-pressed'), 'false');
});

test('category filter toolbar filters hackathons, research projects, and domain tags', async () => {
  const { document } = await interactive();
  const allCards = [...document.querySelectorAll('[data-card]')];
  const controlBtn = document.querySelector('[data-filter="control"]');
  const researchBtn = document.querySelector('[data-filter="research"]');
  const allBtn = document.querySelector('[data-filter="all"]');

  controlBtn.click();
  const visibleControl = allCards.filter(c => !c.hidden);
  assert.ok(visibleControl.length >= 4);
  assert.equal(controlBtn.getAttribute('aria-pressed'), 'true');

  researchBtn.click();
  const hackathonSection = document.querySelector('[data-work-section="hackathon"]');
  const researchSection = document.querySelector('[data-work-section="research"]');
  assert.equal(hackathonSection.hidden, true);
  assert.equal(researchSection.hidden, false);

  allBtn.click();
  assert.equal(allCards.filter(c => !c.hidden).length, projects.length);
  assert.equal(hackathonSection.hidden, false);
});

test('card inline drawers, mini media switcher, and lightbox modal operate interactively', async () => {
  const { document } = await interactive();
  const liminalToggle = document.querySelector('[data-drawer-toggle="drawer-liminal"]');
  const liminalDrawer = document.getElementById('drawer-liminal');
  assert.equal(liminalDrawer.hidden, true);

  liminalToggle.click();
  assert.equal(liminalDrawer.hidden, false);
  assert.equal(liminalToggle.getAttribute('aria-expanded'), 'true');

  const mediaButtons = [...document.querySelectorAll('[data-switch-media="liminal"]')];
  assert.ok(mediaButtons.length > 1);
  const photoButton = mediaButtons.find(b => b.getAttribute('data-media-type') === 'image');
  photoButton.click();
  const frame = document.querySelector('[data-media-frame="liminal"]');
  assert.ok(frame.querySelector('img.work-image-preview'));
  assert.equal(photoButton.getAttribute('aria-pressed'), 'true');

  const bartenderCard = document.getElementById('card-mobile-manipulator');
  assert.ok(bartenderCard.querySelector('a[href="documents/barista-motion-planning-report.pdf"]'));
  assert.equal(document.querySelector('[data-switch-media="mobile-manipulator"][data-media-type="pdf"]'), null);

  const lightboxTrigger = document.querySelector('[data-lightbox-src]');
  const lightbox = document.getElementById('media-lightbox');
  assert.equal(lightbox.hidden, true);
  lightboxTrigger.click();
  assert.equal(lightbox.hidden, false);
  lightbox.querySelector('[data-lightbox-close]').click();
  assert.equal(lightbox.hidden, true);
});

test('mobile menu opens and closes on navigation, Escape and outside click', async () => {
  const { document, Event } = await interactive();
  const toggle = document.querySelector('.menu-toggle');
  assert.equal(toggle.hidden, false);
  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  document.querySelector('.main-nav a').click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  toggle.click();
  const escape = new Event('keydown');
  escape.key = 'Escape';
  document.dispatchEvent(escape);
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  toggle.click();
  document.body.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
});

test('publication reference is readable without JS and copy works with feedback', async () => {
  let copied;
  const page = 'publications/real2sim/index.html';
  assert.ok(documents.get(page).querySelector('.reference-block p').textContent.includes('Real2Sim'));
  const { document } = await interactive(page, async value => { copied = value; });
  document.querySelector('.copy-reference').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(copied, document.querySelector('.reference-block p').textContent);
  assert.equal(document.querySelector('.toast').textContent, 'Reference copied.');
  const fallback = await interactive(page, async () => { throw new Error('Not allowed'); });
  fallback.document.querySelector('.copy-reference').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(fallback.document.querySelector('.toast').textContent, 'Select and copy the reference below.');
});
