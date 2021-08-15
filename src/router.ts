import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

const routes: RouteRecordRaw[] = [
  { path: '/', alias: '/login', component: Pages.Login, meta: {} },
  {
    path: '/u',
    component: Pages.User,
    meta: { auth: true },
    children: [{ path: '', alias: 'dashboard', component: Pages.Dashboard, meta: {} }],
  },
  { path: '/error/:code?', name: 'Error', component: Pages.Error, meta: {} },
  { path: '/:catchAll(.*)', name: 'NotFound', component: Pages.NotFound, meta: {} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
