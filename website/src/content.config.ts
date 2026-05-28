import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One markdown file per section. Frontmatter holds the editable fields.
// Loose schema — each section has its own shape and we don't want to fight
// typescript while iterating. Decap CMS enforces structure on the editor side.
const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({}).passthrough(),
});

export const collections = {
  sections,
};
