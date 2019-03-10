import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

import test from './module/teststore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    test
  },
  strict: debug
})
