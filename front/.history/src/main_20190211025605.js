import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

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
  store,
  router,
  render: h => h(App)
}).$mount('#app')
