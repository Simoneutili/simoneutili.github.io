# Simone Utili — Embodied AI & Robotics Portfolio (`simoneutili.github.io`)

Personal academic and engineering portfolio of **Simone Utili** (Embodied AI Engineer at Motion1 & MSc Robotics Researcher at TU Delft).

Designed from the ground up after top robotics PhD/researcher personal websites (`qianzhong-chen.github.io`, `web.stanford.edu/~jksun/`, `andreumatoses.github.io`, `saraybakker1.github.io`) with:
- **Light / Dark Mode Toggle** (`[data-theme="light"|"dark"]`) with `localStorage` persistence and zero-flash initialization.
- **Sticky Navigation & Category Filter Toolbar** (`All`, `★ Award Winners`, `Hackathons`, `Research & Projects`, `Embodied AI & VLA`, `Whole-Body Control & Planning`, `Hardware & Mechatronics`).
- **Interactive 5-Photo Researcher Portrait Switcher** featuring real photos of Simone with the Unitree G1 at ETH Zurich, holding the $2,500 ETHRC prize check, building mechatronic hardware at TU Delft, and at the ESA ExoMars Rosalind Franklin Rover facility.
- **Animated Video Previews & Multi-Clip Switchers** on every single hackathon and research card, plus expandable inline technical breakdown & photo/video gallery drawers and 12 dedicated case-study pages (`work/<slug>/`).

## Local Development & Verification

Requires Node.js 22+.

```sh
npm run dev    # Builds dist/ and starts local server with HTTP Range support at http://localhost:4173
npm run check  # Builds all 16 static pages and runs the automated link, asset, and interactive test suite
npm run build  # Generates production static site in dist/
```

## Architecture & Key Files

- `src/content.mjs`: Complete structured dataset for profile, affiliations, recent highlights/awards, 7 hackathons (`liminal`, `openhumanoid`, `nursearm`, `intrinsic-ai-challenge`, `samxl-blade-climber`, `moneyheister-amr`, `underground-pipe-robot`), 5 research & engineering projects (`real2sim`, `motion-humanoid-vla`, `photosyntech`, `haptic-teaching`, `mobile-manipulator`), 2 publications (`real2sim` IEEE/ASME AIM 2026 paper + Clust-ER MECH white paper), experience, and education.
- `src/render.mjs`: Static HTML generator for the homepage (`index.html`), 12 project case-study pages (`work/<slug>/index.html`), 2 publication pages (`publications/<slug>/index.html`), and `404.html`.
- `src/styles.css`: Clean, high-density academic researcher stylesheet with complete Light and Dark theme tokens, responsive layouts, and accessible interactions.
- `src/main.js`: Client-side interactivity (Light/Dark theme toggle, hero portrait switcher, category filter toolbar, mini media switcher on cards, inline expandable drawers, gallery lightbox modal, viewport video autoplay, and citation copy).
- `public/assets/media/`: Web-optimized `.mp4` video previews and `.jpg`/`.png` photographs from Simone's hackathons and research projects.
- `public/documents/`: `simone-utili-cv.pdf` and `aim2026-real2sim-paper.pdf`.
