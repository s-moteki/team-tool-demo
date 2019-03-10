// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import firebase from 'firebase/app'
import 'es6-promise/auto'
import 'firebase/auth'

Vue.use(Vuex)

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyCZOZ48w2ZhkU2bYqlfrM-RGionOxIFsWM',
  authDomain: 'test-front-adf12.firebaseapp.com',
  databaseURL: 'https://test-front-adf12.firebaseio.com',
  projectId: 'test-front-adf12',
  storageBucket: 'test-front-adf12.appspot.com',
  messagingSenderId: '911446773928'
}

firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
