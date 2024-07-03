import DashboardView from '@/views/home/DashboardView.vue'
import NotFoundView from '@/views/not-found/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView
    },
    {
      path: '/:id',
      name: 'DashboardView',
      component: DashboardView
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView
    }
  ]
})

export default router
