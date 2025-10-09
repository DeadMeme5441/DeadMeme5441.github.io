import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				pubDate: z.coerce.date().optional(),
				date: z.coerce.date().optional(),
				updatedDate: z.coerce.date().optional(),
				lastmod: z.coerce.date().optional(),
				heroImage: image().optional(),
				tags: z.array(z.string()).default([]),
				draft: z.boolean().default(false),
			})
			.refine((data) => data.pubDate || data.date, {
				message: 'Provide either pubDate or date in frontmatter.',
			})
			.transform((data) => {
				const baseDate = (data.pubDate ?? data.date) as Date;
				const updatedDate = data.updatedDate ?? data.lastmod ?? baseDate;
				return {
					title: data.title,
					description: data.description,
					pubDate: baseDate,
					updatedDate,
					heroImage: data.heroImage,
					tags: data.tags,
					draft: data.draft,
				};
			}),
});

const interestingStuff = defineCollection({
	loader: glob({ base: './src/content/interesting-stuff', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z
			.object({
				title: z.string(),
				description: z.string().optional(),
				pubDate: z.coerce.date().optional(),
				date: z.coerce.date().optional(),
				category: z.enum(['websites', 'twitter-posts', 'videos', 'books', 'articles', 'podcasts', 'other']),
				link: z.string().url().optional(),
				tags: z.array(z.string()).default([]),
				draft: z.boolean().default(false),
			})
			.refine((data) => data.pubDate || data.date, {
				message: 'Provide either pubDate or date in frontmatter.',
			})
			.transform((data) => {
				const baseDate = (data.pubDate ?? data.date) as Date;
				return {
					title: data.title,
					description: data.description,
					pubDate: baseDate,
					category: data.category,
					link: data.link,
					tags: data.tags,
					draft: data.draft,
				};
			}),
});

const thoughtsAndOpinions = defineCollection({
	loader: glob({ base: './src/content/thoughts-and-opinions', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				pubDate: z.coerce.date().optional(),
				date: z.coerce.date().optional(),
				updatedDate: z.coerce.date().optional(),
				lastmod: z.coerce.date().optional(),
				tags: z.array(z.string()).default([]),
				draft: z.boolean().default(false),
			})
			.refine((data) => data.pubDate || data.date, {
				message: 'Provide either pubDate or date in frontmatter.',
			})
			.transform((data) => {
				const baseDate = (data.pubDate ?? data.date) as Date;
				const updatedDate = data.updatedDate ?? data.lastmod ?? baseDate;
				return {
					title: data.title,
					description: data.description,
					pubDate: baseDate,
					updatedDate,
					tags: data.tags,
					draft: data.draft,
				};
			}),
});

export const collections = { blog, interestingStuff, thoughtsAndOpinions };
