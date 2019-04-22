
const state = {
  all: []
}

// getters
const getters = {}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
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
