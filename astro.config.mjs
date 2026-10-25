// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/site.config.ts';

// Pages are static HTML by default. Only routes that set
// `export const prerender = false` (the contact endpoint and /health)
// run on the Cloudflare Worker.
export default defineConfig({
  // Set the address in src/site.config.ts.
  site: site.url,
  output: 'static',
  trailingSlash: 'ignore',
  // No sessions, and images are optimised at build time, so the Worker
  // needs no KV namespace or Images binding.
  session: false,
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    react(),
    // Internal pages stay out of the sitemap.
    sitemap({
      filter: (page) => !/\/(styleguide|og-card|privacy)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
