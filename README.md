# Portfolio

A design portfolio built with [Astro](https://astro.build). It builds to a fully static site with no client-side JavaScript.

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Make it yours

1. **`src/site.ts`**: your name, role, intro line, email and social links.
2. **`src/pages/about.astro`**: your bio, experience and capabilities.
3. **`src/styles/global.css`**: colors, fonts and the type scale are all tokens at the top of the file.
4. **`astro.config.mjs`**: set `site` to your real domain.

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
