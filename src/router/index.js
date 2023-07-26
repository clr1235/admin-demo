import { createRouter, createWebHistory } from 'vue-router'

import staticRoutes from './staticsRoutes'
import {usePermissionStore} from '@stores/index'


const routes = [...staticRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({
    top: 0
  }),
})


router.beforeEach(async (to, from, next) => {
    const permissionStore = usePermissionStore()
    // console.log(to, 'to===', from)
    await permissionStore.dispatchRoutes()
    await permissionStore.handleRoutes()
    console.log(to, 'to=s=s=s=')
    if (to.name !== 'home') {
        next()
    } else {
        next()
    }
    
})

export default router
