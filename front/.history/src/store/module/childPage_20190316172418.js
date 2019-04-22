
const state = {
  currentChild: 'home',
  error: false
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentChild (state, pageName) {
    state.currentChild = pageName
  },
  setError (state, err) {
    state.err = err
  }
}

// actions
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
