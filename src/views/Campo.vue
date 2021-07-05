<template>
  <v-container fluid class="container">    
    <router-view/>
  </v-container>
</template>

<script>

export default {
  name: 'CampoView',
}
</script>
<style scoped>
.container{
  height:100%;
}
</style>