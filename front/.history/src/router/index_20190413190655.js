import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/Main'
import Notice from '@/views/home/Notice'
import Event from '@/views/home/Event'
import Report from '@/views/home/News'
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
    // /home
    {
      path: '/home',
      component: Main,
      meta: { requiresAuth: true, currentMenu: 'home' },
      children: [
        {
          path: '',
          redirect: '/home/event'
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

// 前処理
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

// 後処理
router.afterEach((to, from) => {
  if (to.meta.currentChild) {
    // カレントページ状態の更新
    store.commit('childPage/setCurrentChild', to.meta.currentChild)
    store.commit('childPage/setError', false)
    // カレントメニューの更新
    store.commit('menu/setCurrentMenu', to.meta.currentMenu)
  }
})
