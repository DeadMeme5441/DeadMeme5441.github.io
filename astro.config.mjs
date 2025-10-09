// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
	site: 'https://deadmeme.dev',
	integrations: [mdx(), sitemap()],
    markdown: {
        rehypePlugins: [
        rehypeHeadingIds,
        ],
    },
});
