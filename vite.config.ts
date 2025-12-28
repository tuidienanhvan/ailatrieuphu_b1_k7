
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: Define __dirname for ESM environments where it's not globally available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Cấu hình Proxy để vượt qua lỗi CORS ở Localhost
        proxy: {
          '/api': {
            target: 'https://pistudy.vn',
            changeOrigin: true,
            secure: false,
            // Giả mạo Headers để vượt qua firewall/check referer của server đích
            configure: (proxy, _options) => {
              proxy.on('proxyReq', (proxyReq, _req, _res) => {
                proxyReq.setHeader('Origin', 'https://pistudy.vn');
                proxyReq.setHeader('Referer', 'https://pistudy.vn/');
              });
            },
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
