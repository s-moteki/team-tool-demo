import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/main/Main'
import Notice from '@/views/main/children/Notice'
import Event from '@/views/main/children/Home'
import Report from '@/views/main/children/News'
import store from '@/store'
import MicrosoftApis from '@/api/microsoft/MicrosoftApis'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'event',
          meta: {currentChild: 'event'},
          component: Event
        },
        {
          path: 'notice',
          meta: {currentChild: 'notice'},
          component: Notice
        },
        {
          path: 'news',
          meta: {currentChild: 'news'},
          component: Report
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = MicrosoftApis.Auth.getAccessToken()
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router

router.afterEach((to, from) => {
  // set current page
  if (to.meta.currentChild) {
    store.commit('childPage/setCurrentChild', to.meta.currentChild)
    store.commit('childPage/setError', false)
  }
})
