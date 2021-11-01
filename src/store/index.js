import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import {login} from './modules/login.module'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules:{
    login
  },
})


