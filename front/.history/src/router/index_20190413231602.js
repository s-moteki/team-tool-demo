import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/Main'
import Notice from '@/views/home/Notice'
import Event from '@/views/home/Event'
import News from '@/views/home/News'
import Work from '@/views/report/Work'
import Cost from '@/views/report/Cost'
import History from '@/views/report/History'
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
          redirect: 'event'
        },
        {
          path: 'event',
          component: Event
        },
        {
          path: 'notice',
          component: Notice
        },
        {
          path: 'news',
          component: News
        }
      ]
    },
    // /report
    {
      path: '/report',
      component: Main,
      meta: { requiresAuth: true, currentMenu: 'report' },
      children: [
        {
          path: '',
          redirect: 'work'
        },
        {
          path: 'work',
          component: Work
        },
        {
          path: 'Cost',
          component: Cost
        },
        {
          path: 'history',
          component: History
        }
      ]
    },
  ],
  // 遷移時のスクロール位置リセット
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
    to.matched.forEach(record => {
      const menu = record.meta.currentMenu
      if (menu && menu != undefined) {

        // カレントページ状態の更新
        store.commit('childPage/setCurrentChild', to.path.split('/').slice(-1)[0])
        store.commit('childPage/setError', false)

        // カレントメニューの更新
        store.commit('menu/setCurrentMenu', menu)
      }
    })
})
