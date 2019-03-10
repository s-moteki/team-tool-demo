
const state = {
  currentTab: 'Home'
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentTab (state, tabtitle) {
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
