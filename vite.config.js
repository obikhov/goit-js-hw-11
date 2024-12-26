import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

// Укажите название репозитория в `base`, если ваш проект размещен в подкаталоге
export default defineConfig(({ command }) => {
  return {
    base: '/goit-js-hw-11/', // Замените 'goit-js-hw-11' на имя вашего репозитория

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',  // Папка с исходным кодом проекта
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
      outDir: '../dist',  // Папка для выходных файлов
      emptyOutDir: true,  // Очищает папку dist перед сборкой
    },
    server: {
      open: true, // Автоматически откроет браузер при запуске
      port: 5174, // Порт для локального сервера
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',  // Сортировка CSS по мобильной версии
      }),
    ],
  };
});
