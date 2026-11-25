import { defineConfig } from 'vite';

// Pages supplies its configured path; a custom domain supplies an empty path.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/portfolio/',
});
