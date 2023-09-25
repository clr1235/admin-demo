import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'

import {getToken} from '@/utils/cache/cookies'
import {isWhiteList} from '@/constants'
import {usePermissionStore, useUserStore} from '@/stores/index'

// 配置网页进度条
NProgress.configure({ showSpinner: false });


// 全局路由配置
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // 登录token
    if (getToken()) {
        if (to.path === '/login' || to.path === '/login/') {
            next({path: '/'})
        } else {
            const userStore = useUserStore()
            const hasRoles = userStore?.userInfo?.roles?.length > 0
            if (hasRoles) {
                // 么有匹配到任何路由，跳转404
                if (to.matched.length === 0) {
                    from.name ? next({name: from.name}) : next('/404')
                } else {
                    next()
                }
            } else {
                // const {roles} = await userStore.getUserInfo()
                // try {
                //     const {roles} = await userStore.getUserInfo()
                //     next({ ...to, replace: true });
                // } catch (error) {
                //     // 移除token 并跳转登录页
                //     await userStore.resetStore()
                //     next(`/login?redirect=${to.path}`)
                // }
                next()
            }
        }
        NProgress.done()
    } else {
        if (isWhiteList(to)) {
            // 免登录页面直接进入
            next()
        } else {
            // 将用户重定向到登录页面
            next({path: '/login'})
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})

router.onError(() => {
    // 路由发生错误后销毁进度条
    NProgress.remove()
})