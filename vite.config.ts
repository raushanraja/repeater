import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/repeater',
    plugins: [tailwindcss(), solidPlugin()],
    server: {
        port: 3300,
    },
    build: {
        target: 'esnext',
    },
    optimizeDeps: {
        include: ['solid-markdown > micromark', 'solid-markdown > unified'],
    },
});
