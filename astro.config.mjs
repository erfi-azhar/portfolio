// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Set this to your real domain before deploying (used for canonical URLs).
  site: 'https://example.com',
  integrations: [mdx()],
});
