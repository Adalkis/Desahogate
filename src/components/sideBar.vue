<template>
<div class="side_bar_content">
    <div class="mb-3">
         <span>
        <b-icon icon="person" class="icon_card"></b-icon>
         <router-link to="/mypost">Profile</router-link>
    </span>

    </div>

    <div>
        <span>
        <b-icon icon="card-text" class="icon_card"></b-icon>
         <router-link to="/mypost">My post</router-link>
    </span>

    </div>
    
    
    
   
</div>
    
</template>

<script>


export default{
    name:'sideBar'
}
</script>

<style scoped>
.icon_card{
    font-size: 30px;
    margin-right: 10px;
}
a{
    text-decoration: none;
    color: black;
}
</style>
