import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER_INFO: (state, payloud) => {
      state.userInfo = payloud
    },
    REMOVE_USER_INFO: (state) => {
      state.userInfo = null
    }
  },
  actions: {
    async getUserInfoFn ({
      commit
    }, userId) {
      const res = await getUserInfo(userId)
      if (+res.data.code === 2000) {
        commit('SET_USER_INFO', res.data.data)
      }
    }
  },
  modules: {
  }
})
