import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build'
    },
    // Ajoutez ceci :
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: []
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // Force l'utilisation du compilateur moderne (plus rapide)
                silenceDeprecations: [
                    'legacy-js-api',
                    'import',
                    'global-builtin',
                    'color-functions',
                    'mixed-decls'
                ],
            },
        },
    },
})