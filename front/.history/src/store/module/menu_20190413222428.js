
const state = {
  currentMenu: 'home'
}

// getters
const getters = {}

// mutations
const mutations = {
  setCurrentMenu (state, menuName) {
    state.currentMenu = menuName
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
