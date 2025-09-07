import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://deadmeme.dev',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    })
  ],
});

