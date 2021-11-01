import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    // meta:{auth:true},
    props:true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{auth:true}
   
  },
  
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from,next)=>{
 
   if(to.name == 'Login' && store.state.login.isLoggedIn){
     next({name:'Home'});
   }
   else{
     next();
   }

  
 
 
  


})


export default router
