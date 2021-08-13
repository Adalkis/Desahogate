import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isAuthenticated:false
  },
  mutations: {
    setAuth(state,auth){
      state.isAuthenticated=auth;
    }
  },
  actions: {
    setAuth({commit}, auth){
      commit('setAuth',auth)

    }
  },
 
})
