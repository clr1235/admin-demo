import { fileURLToPath, URL } from 'node:url'
import process from 'node:process';

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig(({mode}) => {
    // const env = loadEnv(mode, process.cwd(), '')
    // console.log(process.cwd(), 'process.cwd()========')
    // console.log('env=s=s=s=s=', import.meta.env.VITE_APP_BASE_API)
    // console.log(JSON.stringify(env.VITE_APP_BASE_API), 'mode========')
    return {
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
            host: "0.0.0.0", // 允许IP访问
            // 开发代理
            proxy: {
                '/api': {
                    target: 'https://mock.apifox.cn/m1/3331204-0-default',
                    secure: true, // 如果是https接口，需要配置这个参数为true
                    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            }
        },
        // 构建
        build: {
            chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
            minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
            terserOptions: {
                compress: {
                    keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
                    drop_console: true, // 生产环境去除 console
                    drop_debugger: true, // 生产环境去除 debugger
                },
                format: {
                    comments: false, // 删除注释
                },
            },
        },
    }
})
