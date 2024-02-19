import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import * as path from 'path';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
    plugins: [
        /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
        // devtools(),
        solidPlugin(),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        alias: {
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@components': path.resolve(__dirname, './src/components'),
            '@types': path.resolve(__dirname, './src/types'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@data': path.resolve(__dirname, './src/data'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
});
