import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = {
    ...loadEnv(mode, process.cwd(), ['VITE_API_BASE_URL']),
  };

  return defineConfig({  base: '/',
  plugins: [react(),svgrPlugin()],
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'build',
    },
  });

}
