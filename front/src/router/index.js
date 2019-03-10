import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/main/Main'
import Notice from '@/views/main/children/Notice'
import Home from '@/views/main/children/Home'
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
          path: 'home',
          meta: {currentChild: 'home'},
          component: Home
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
  ]
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
  if (to.meta.currentChild) {
    store.commit('childPage/setCurrentChild', to.meta.currentChild)
  }
})
