import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'

import {getToken} from '@/utils/cache/cookies'
import {isWhiteList} from '@/constants'
import {usePermissionStore} from '@stores/index'

// 配置网页进度条
NProgress.configure({ showSpinner: false });


// 全局路由配置
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // 处理菜单
    const permissionStore = usePermissionStore()
    await permissionStore.dispatchRoutes()
    await permissionStore.handleRoutes()

    // 登录token
    const loginToken = getToken()

    if (isWhiteList(to)) {
        next()
        NProgress.done()
    } else {
        if (loginToken) {
            if (to.path === '/login' || to.path === '/login/') {
                next({path: '/'})
            } else {
                next()
            }
            NProgress.done()
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