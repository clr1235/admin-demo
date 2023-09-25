
const Test1 = () => import('@/views/test1/index.vue')
const Test2 = () => import('@/views/test2/index.vue')
const Test3 = () => import('@/views/test3/index.vue')

import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons-vue';

const asyncRoutes = [
    {
        path: '/test1',
        name: 'test1',
        meta: {
            icon: UserOutlined,
            title: '测试页面1',
        },
        component: Test1,
    },
    {
        path: '/test2',
        name: 'test2',
        meta: {
            icon: VideoCameraOutlined,
            title: '测试页面2',
        },
        component: Test2,
    },
    {
        path: '/test3',
        name: 'test3',
        meta: {
            icon: UploadOutlined,
            title: '测试页面3',
        },
        component: Test3,
    },
]

export default asyncRoutes