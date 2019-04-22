
const state = {
  currentChild: 'event',
  error: false
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentChild (state, pageName) {
    state.currentChild = pageName
  },
  setError (state, error) {
    state.error = error
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
