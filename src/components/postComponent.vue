<template>
<div class="container">
    <div v-for="post in my_post">
        <p>{{post}}</p>
    </div>
</div>
    
</template>

<script>
import authenticatedUserApi from '@/api/auth/authenticatedUser.js';
import getPostApi from '@/api/getPost.js'
export default {
    name:'Post',
    data(){
        return{
            post:[],
            user_id:null,
            my_post:[],
            array:[]
         

        }
    },
    mounted:async function(){
         await authenticatedUserApi.authenticated()
        .then(res=>this.user_id=res.data.id)
        .catch(err=>console.log(err));

         await getPostApi.getPost()
        .then(res=>{
            console.log(this.user_id)
            this.post= res.data;
            
           
            this.post.map(x=>{
                let result = x.user_id == this.user_id;
                if(result){
                   this.array.push(x);
                   
                  this.my_post.push(x.post_name)
                  
                }
                
               
           

                
                

            })
            
        })
        .catch(err=>console.log(err))
        
    }
}
</script>

<style scoped>
.container{
    width: 700px;
        margin-top: -75px;
}
</style>