
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

// getters
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
