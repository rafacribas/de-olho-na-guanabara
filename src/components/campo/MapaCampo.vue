<template>
    <v-container class="pa-0" fluid style="height:100%">      
      <!-- criar ponto -->
      <router-view style="height:100%"/>
      <MglMap class="mapa" :accessToken="accessToken" :mapStyle="mapStyle" :center="center" :zoom="zoom" > 
          <MglGeolocateControl :positionOptions="positionOptions" trackUserLocation position="top-right" />
      </MglMap>
      <div class="d-flex justify-center mt-2" style="position:relative;bottom:90px">
          <v-btn            
              bottom
              to="add"
              @click="getUserLocation()"
              x-large
              elevation="2"
              color="blue"
              fab                
              style="color:white"
          ><v-icon>
            mdi-crosshairs
          </v-icon>
          </v-btn>
      </div>
    </v-container>
    
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglGeolocateControl } from "vue-mapbox";

export default {
  name: 'MapaCampo',
  components: {
    MglMap,
    MglGeolocateControl
    },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
      coordinates:  [-42.749668, -21.870],
      zoom: 2,
      coordinates2 : [0,0],
      positionOptions: { enableHighAccuracy: true, timeout: 6000},
      center: [-43.1551208,-22.8004402],
      coordCampo: []
    };
  },
  methods:{
    getUserLocation(){
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((data) => {
                  console.log(data)
                  this.coordCampo[0] = data.coords.longitude;
                  this.coordCampo[1] = data.coords.latitude;                                    
              });
          }
    }

  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>
<style scoped>

.mapa{
    height:100%;
}
</style>