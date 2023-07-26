import {h} from 'vue'
import { defineStore } from 'pinia'
import router from '@router'
import asyncRoutes from '@router/asyncRoutes'

export const usePermissionStore = defineStore('permission', {
    state: () => {
        return {
            asyncRoutes: []
        }
    },
    actions: {
        // 将动态路由处理成左侧菜单
        handleRoutes() {
            this.asyncRoutes = asyncRoutes.map(item => {
                return {
                    key: item.name,
                    icon: () => h(item.meta.icon),
                    label: item.meta.title,
                    title: item.meta.title
                }
            })
        },
        // 添加动态路由
        dispatchRoutes() {
            asyncRoutes.forEach(item => {
                if (item) {
                    router.addRoute('home', item)
                }
            })
        }
    }
})
