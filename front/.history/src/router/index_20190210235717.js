import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'SignIn'
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
      meta: { requiresAuth: true }
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
