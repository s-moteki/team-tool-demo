
const state = {
  currentMenu: 'report'
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentMenu (state, menuName) {
    state.currentChild = menuName
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
