import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _69a69991 = () => interopDefault(import('../pages/assignData.vue' /* webpackChunkName: "pages/assignData" */))
const _ae517668 = () => interopDefault(import('../pages/Dashboard.vue' /* webpackChunkName: "pages/Dashboard" */))
const _cf45634e = () => interopDefault(import('../pages/upload.vue' /* webpackChunkName: "pages/upload" */))
const _76f81dea = () => interopDefault(import('../pages/uploads.vue' /* webpackChunkName: "pages/uploads" */))
const _2355bad8 = () => interopDefault(import('../pages/reporting/[filename].vue' /* webpackChunkName: "pages/reporting/[filename]" */))
const _030c37ac = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/assignData",
    component: _69a69991,
    name: "assignData"
  }, {
    path: "/Dashboard",
    component: _ae517668,
    name: "Dashboard"
  }, {
    path: "/upload",
    component: _cf45634e,
    name: "upload"
  }, {
    path: "/uploads",
    component: _76f81dea,
    name: "uploads"
  }, {
    path: "/reporting/%5Bfilename%5D",
    component: _2355bad8,
    name: "reporting-[filename]"
  }, {
    path: "/",
    component: _030c37ac,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
