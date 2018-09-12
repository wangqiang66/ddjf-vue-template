import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

const store = {
  modules: {},
  state: {
    userInfo: {}
  },
  getters: {},
  mutations: {
    SET_USER_INFO (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async login ({mutations}, {userName, password}) {
      // add login code
    }
  }
}

export default new Vuex.Store(store)
