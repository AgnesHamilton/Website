import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: z.string(),
    address: z.string().optional(),
    summary: z.string(),
    event_url: z.string().url().optional().or(z.literal("")),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/updates" }),
  schema: z.object({
    title: z.string(),
    published_at: z.coerce.date(),
    summary: z.string(),
    image: z.string().optional(),
    old_path: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { events, updates };
