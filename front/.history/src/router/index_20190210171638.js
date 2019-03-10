import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/pages/public/SignIn'
import TeamTool from '@/components/pages/auth/TeamTool'
import Home from '@/components/pages/auth/Home'
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
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/team-tool',
      name: 'TeamTool',
      component: TeamTool,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          component: Home
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
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  }
  next()
})

export default router
