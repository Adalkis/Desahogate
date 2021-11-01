import authApi from "../../api/auth/auth";
import router from '@/router'
export const login ={
   state : {
    user:null,
    isLoggedIn:false
  },
  mutations:{
    LOGIN(state,payload){
      state.user = payload
      console.log('esto es login mutations')
      console.log(state.user)
    },
    SETAUTH(state, payload){
      state.isLoggedIn=payload
    }
  },
  actions : {
    LOGIN: async({commit}, payload)=>{
      await authApi.login(payload)
      .then((res)=>{
        // this.state.user=res.data;
        console.log(res.status)
        if(res.status === 200){
          commit('LOGIN', res.data.user)
          router.push({name: "Home"});
        }
          
      })
      .catch(err=>{
        console.log('entre en error finalmente')
          alert('Las credenciales son inválidas');
      })
      
    },
  SETAUTH: ({commit}, auth)=>{
    console.log('entre aqui en SetAuth')
    commit("SETAUTH", auth)
  }
}
}
    




  
 