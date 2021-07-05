<template>
  <v-container fluid class="pa-1" style="height:100%">
        <MglMap class="mapa" :center="center" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" >                      
            <MglMarker :coordinates="coordinatesMarker" color="blue" />
        </MglMap>
  </v-container>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";
export default {
    name: 'HomeIndex',
    components: {
        MglMap,
        MglMarker    
    },
    data(){
    return {
        accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
        mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-42.749668, -21.870],
        zoom: 15,
        coordinatesMarker: [-42.749668, -21.870]

    }
}
}
</script>

<style>

</style>