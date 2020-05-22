import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

import childPage from './module/childPage'
import menu from './module/menu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    childPage,
    menu
  },
  strict: debug
})
