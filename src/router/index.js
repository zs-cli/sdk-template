import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

import accountManageRoutes from './accountManage'

const Login = () => import(/* webpackChunkName: "group-index" */ '@/views/Login/index')
const Page404 = () => import(/* webpackChunkName: "group-index" */ '@/views/404')

const defaultRoutes = [
  { path: '/', redirect: '/login', hidden: true },
  { path: '/login', name: 'login', component: Login, hidden: true },
  { path: '/404', name: '404', component: Page404, hidden: true, },
  { path: '*', redirect: '/404', hidden: true },
]

const routes = [
  ...defaultRoutes,
  setRoutes(accountManageRoutes),
]

function setRoutes(route) {
  return {
    component: Layout,
    ...route
  }
}

function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL || process.env.BASE_URL,
    // scrollBehavior: () => ({ y: 0 }),
    routes,
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
