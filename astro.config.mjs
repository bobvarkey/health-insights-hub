import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  trailingSlash: 'never',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/ncd-app'),
      },
    },
  },
});
