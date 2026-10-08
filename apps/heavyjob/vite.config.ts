import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// PORT is set by the preview launcher; falls back to the default for local use.
export default defineConfig({ plugins: [react()], server: { port: Number(process.env.PORT) || 5174, strictPort: !!process.env.PORT } });
