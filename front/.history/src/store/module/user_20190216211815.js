
const state = {
  name: 'unknown'
}

// getters
const getters = {}

// mutations
const mutations = {
  setName (state, name) {
    state.currentChild = name
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
