<template>
  <div class="campo-index">
      <MapaCampo />      
  </div>
</template>

<script>
import MapaCampo from '@/components/campo/MapaCampo.vue'
export default {
    name: 'CampoIndex',
    components:{
        MapaCampo
    }
}
</script>

<style>
.campo-index{
    height:100%
}
</style>