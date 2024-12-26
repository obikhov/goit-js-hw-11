import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',  // Указываем папку src как корневую для разработки
    base: '/https://github.com/obikhov/goit-js-hw-11/', // Добавляем base для размещения на GitHub Pages, где 'repository-name' это имя вашего репозитория
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',  // Папка, куда будет собираться проект
      emptyOutDir: true,
    },
    server: {
      open: true, // Автоматически открывает браузер при запуске
      port: 5174, // Порт для локальной разработки
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
