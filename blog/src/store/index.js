import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  userInfo: {
    autograph: '',
    avatar: '',
    company: '',
    job: '',
    nickname: '',
  }
}

const mutations = {
  SET_INFO: (state, info) => {
    state.userInfo = Object.assign(state.userInfo, info)
  },
}

const actions = {
  getInfo ({ commit }, state) {
    commit('SET_INFO', state)
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
