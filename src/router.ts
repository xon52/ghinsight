import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

const routes: RouteRecordRaw[] = [
  { path: '/', alias: '/dashboard', component: Pages.Dashboard, meta: { auth: true } },
  { path: '/login', component: Pages.Login, meta: {} },
  { path: '/error/:code?', name: 'Error', component: Pages.Error, meta: {} },
  { path: '/:catchAll(.*)', name: 'NotFound', component: Pages.NotFound, meta: {} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
