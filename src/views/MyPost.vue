<template>
 <div>
   <post-component></post-component>
 </div>
</template>

<script>
import postComponent from '@/components/postComponent.vue'

export default {
  name:'MyPost',
  components:{postComponent}
}
</script>
