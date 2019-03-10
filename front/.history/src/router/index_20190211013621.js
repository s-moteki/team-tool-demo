import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/main/Main'
import Notice from '@/views/main/children/Notice'
import Home from '@/views/main/children/Home'
import Report from '@/views/main/children/Report'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          name: 'Home',
          path: 'home',
          component: Home
        },
        {
          name: 'Notice',
          path: 'notice',
          component: Notice
        },
        {
          name: 'Report',
          path: 'report',
          component: Report
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
  }
  next()
})

export default router
