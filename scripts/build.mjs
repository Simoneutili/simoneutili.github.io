import { mkdir, cp, writeFile, rm, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, projects, publications } from '../src/content.mjs';
import { renderHome, renderProject, renderPublication, renderNotFound } from '../src/render.mjs';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function build() {
  const dist = resolve(root, 'dist');
  const requiredPublicPaths = new Set([
    'assets/fonts/inter-400.woff2',
    'assets/fonts/space-grotesk-600.woff2',
    profile.cv,
    ...profile.portraits.map(p => p.src),
    ...projects.map(p => p.image),
    ...projects.filter(p => p.videoPreview).map(p => p.videoPreview),
    ...projects.flatMap(p => (p.gallery || []).map(g => g.src)),
  ]);

  for (const relPath of requiredPublicPaths) {
    await access(resolve(root, 'public', relPath)).catch(() => {
      throw new Error(`Missing required asset in public/: ${relPath}`);
    });
  }

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(resolve(root, 'public'), dist, { recursive: true });
  await cp(resolve(root, 'src/styles.css'), resolve(dist, 'styles.css'));
  await cp(resolve(root, 'src/main.js'), resolve(dist, 'main.js'));
  await writeFile(resolve(dist, 'index.html'), renderHome());
  await writeFile(resolve(dist, '404.html'), renderNotFound());

  for (const project of projects) {
    const dir = resolve(dist, 'work', project.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, 'index.html'), renderProject(project));
  }

  for (const publication of publications) {
    const dir = resolve(dist, 'publications', publication.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, 'index.html'), renderPublication(publication));
  }

  await writeFile(resolve(dist, '.nojekyll'), '');
  console.log(`Built ${2 + projects.length + publications.length} static pages in dist/.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
