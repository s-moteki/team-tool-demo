
const state = {
  currentChild: 'home'
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentChild (state, pageName) {
    state.currentChild = pageName
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
