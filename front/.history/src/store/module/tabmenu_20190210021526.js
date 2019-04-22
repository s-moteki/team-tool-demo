
const state = {
  currentTab: 'Home'
}

// getters
const getters = {}

// mutations
const mutations = {
  setProducts (state, tabtitle) {
    state.currentTab = tabtitle
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
