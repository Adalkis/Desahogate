<template>

<div class="container">
    <login-component></login-component>
</div>
    
</template>

<script>
import loginComponent from '@/components/loginComponent.vue'
export default {
    name:'Login',
     components: {
    loginComponent
  }
    
}
</script>