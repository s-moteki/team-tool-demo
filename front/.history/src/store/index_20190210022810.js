import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

import tabmenu from './module/tabmenu'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    tabmenu
  },
  strict: debug
})
