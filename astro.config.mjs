// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Pages are static HTML by default. Only routes that set
// `export const prerender = false` (the contact endpoint and /health)
// run on the Cloudflare Worker.
export default defineConfig({
  // TODO: replace with the real domain before launch.
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'ignore',
  // No sessions, and images are optimised at build time, so the Worker
  // needs no KV namespace or Images binding.
  session: false,
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
