import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        // Nécessaire pour que le hot-reload fonctionne depuis un conteneur Docker
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'dist',
    },
});