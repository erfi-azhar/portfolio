# Portfolio

A design portfolio built with [Astro](https://astro.build). It builds to a fully static site with no client-side JavaScript.

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Make it yours

1. **`src/site.ts`**: name, role, location, intro, email, handle, résumé link and social links.
2. **`src/data/career.ts`**: your roles and education. The About timeline and the home page company logos both read from here.
3. **`src/pages/index.astro`**: the home page intro, at the top of the file. Plain text lights up word by word as you scroll; small objects add the inline extras (logos, the selection box, the gradient word, the clicking cursor, the wave).
4. **`src/pages/about.astro`**: the About intro, closing line and photo captions.
5. **Images**: replace `src/assets/home/hero.svg` (home hero), `src/assets/about/portrait.svg` (your photo, also used in the nav) and `src/assets/about/memory-*.svg`, keeping the file names, or update the imports.
6. **`src/styles/studio.css`**: colours, fonts and layout width for every page.
7. **`astro.config.mjs`**: set `site` to your real domain.

## Adding a case study

Create a file in `src/content/projects/`, e.g. `my-project.mdx`:

```mdx
---
title: Project title
summary: One sentence about the outcome.
client: Company
role: Your role
year: 2025
tags: [Research, UX]
cover: ../../assets/projects/my-project.jpg
coverAlt: Describe the image
order: 4          # lower shows first
draft: false      # true hides it
---

## The problem
...
```

Put images in `src/assets/projects/`. Astro optimizes and resizes them automatically. You can also use them inside the case study:

```mdx
import { Image } from 'astro:assets';
import screen from '../../assets/projects/my-project-flow.png';

<Image src={screen} alt="The new flow" />
```

The three included projects are templates. Each one includes prompts for what to write.

## Deploying

Any static host works. With Vercel, Netlify or Cloudflare Pages, import the repo. The build command is `npm run build` and the output directory is `dist`.
