<template>
<div>
     <p class="text">Últimos usuarios que han compartido</p>
       
            <div   v-for="(post, index) in recent_post" :key="index">
                <p class="text">{{post.users.name}} {{post.users.lastname}}</p>
            </div>

</div>
   
     
  
</template>

<script>
import getPostApi from "@/api/getPost.js";

export default {
    data(){
        return{
            all_post:[],
            recent_post:[]
        }
    },
    mounted:async function(){
         await getPostApi
      .getPost()
      .then((res) => {
        this.all_post = res.data;  
        this.recent_post.push(this.all_post[0], this.all_post[1], this.all_post[2])
      })
      .catch((err) => console.log(err));
    }
    
}
</script>

<style scoped>

p.text {
    font-family: cursive;
}


</style>