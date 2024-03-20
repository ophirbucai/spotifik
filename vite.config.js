import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
            include: '**/*.svg'
        })
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            },
            '/images': {
                target: 'https://i.ytimg.com/vi/',
                changeOrigin: true,
                rewrite: path => (path.replace(/^\/images/, '') + '/mqdefault.jpg')
            }
        }
    }
})
