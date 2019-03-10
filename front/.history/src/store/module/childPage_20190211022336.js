
const state = {
  currentChild: 'home'
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentPage (state, pageName) {
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
