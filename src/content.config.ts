import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      client: z.string(),
      role: z.string(),
      year: z.number(),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      // Lower numbers show first on the home page.
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
