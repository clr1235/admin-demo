import Layout from '@/views/layout/index.vue'

const staticRoutes = [
    {
        index: '43',
        path: '/404',
        redirect: '/404',
        hidden: true
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: () => import(/* webpackChunkName: "login" */ '@views/signUp/login/index.vue')
    },
    {
        index: '43',
        path: '/register',
        name: 'Register',
        meta: {
            title: '注册'
        },
        component: () => import(/* webpackChunkName: "register" */ '@views/signUp/register/index.vue')
    },
    {
        index: '43',
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */ '@views/error/403.vue')
    },
    {
        index: '43',
        path: '/404',
        name: '404',
        meta: {
            title: '访问路径不存在'
        },
        hidden: true,
        component: () => import(/* webpackChunkName: "403" */ '@views/error/404.vue')
    },
    {
        index: '43',
        path: '/',
        name: 'home',
        component: Layout,
        redirect: () => ({ name: 'dashboard' }),
        children: [
            {
                path: '/home',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: () => import(/* webpackChunkName: "table" */ '@views/home/index.vue')
            },
        ]
    }
]

export default staticRoutes
