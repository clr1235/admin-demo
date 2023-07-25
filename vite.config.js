import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'


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

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
