import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

console.log(import.meta.url, 'import.meta.url====')
// https://vitejs.dev/config/
export default defineConfig({
    // 指定用于加载.env文件的目录地址
    envDir: './env',
    // 插件
    plugins: [
        vue(),
        vueJsx(),
        // 自动按需引入
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false // css in js
                })
            ]
        })
    ],
    // css处理
    // css: {
    //     postcss: {

    //     },
    //     preprocessorOptions: {

    //     }
    // },

    server: {
        // 开发代理
        proxy: {
            '/api': {
                target: 'https://testcrm.jlkc56.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/crm': {
                target: 'https://testcrm.jlkc56.com',
                changeOrigin: true,
                logLevel: 'debug', // 日志 查看代理服务详情
            },
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
            '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
            '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
        }
    }
})
