import { createRouter, createWebHistory } from 'vue-router'

import staticRoutes from './staticsRoutes'



const routes = [...staticRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({
    top: 0
  }),
})


export default router
