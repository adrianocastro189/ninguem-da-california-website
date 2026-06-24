import { z } from 'zod';
import data from './site.json';

/**
 * Schema for the single central content file. Empty strings are valid
 * (empty photo, "link em breve", empty agenda) — see ARCHITECTURE.md §4.
 */
const SiteSchema = z.object({
  email: z.string().email(),
  socials: z.object({ youtube: z.string().url(), instagram: z.string().url() }),
  featuredVideo: z.string(),
  history: z.string(),
  members: z.array(
    z.object({ name: z.string(), role: z.string(), photo: z.string() }),
  ),
  gallery: z.array(z.object({ src: z.string(), caption: z.string() })),
  shorts: z.array(z.string()),
  shows: z.array(
    z.object({
      date: z.string(),
      city: z.string(),
      venue: z.string(),
      time: z.string(),
      ticket: z.string().optional().default(''),
    }),
  ),
  repertoire: z.array(
    z.object({ title: z.string(), artist: z.string(), link: z.string() }),
  ),
});

export type Site = z.infer<typeof SiteSchema>;

/** Parsed, validated site content. Throws at build time on a malformed file. */
export const site: Site = SiteSchema.parse(data);
