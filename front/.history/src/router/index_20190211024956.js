import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Main from '@/views/main/Main'
import Notice from '@/views/main/children/Notice'
import Home from '@/views/main/children/Home'
import Report from '@/views/main/children/Report'

import store from '@/store/index.js'

import firebase from 'firebase/app'
import 'firebase/auth'

alert(store.childPage)
const router = new Router({
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
          redirect: 'home'
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
          path: 'report',
          meta: {currentChild: 'report'},
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

router.afterEach((to,from) =>{
  if (to.meta.currentChild) {
    store.childPage.commit('childPage/setCurrentChild', to.meta.currentChild)
  }
})
