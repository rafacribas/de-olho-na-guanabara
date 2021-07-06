<template>
    <v-container class="pa-0" fluid style="height:100%">      
      <router-view style="height:100%"/>
      <MglMap  class="mapa" :accessToken="accessToken" @load="onMapLoad" :mapStyle="mapStyle" :center="center" :zoom="zoom" > 
          <MglGeolocateControl :positionOptions="positionOptions" trackUserLocation position="top-right" />
      </MglMap>
      <div class="d-flex justify-center mt-2" style="position:relative;bottom:130px">
          <v-btn            
              bottom
              to="/add"
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
      zoom: 20,
      positionOptions: { enableHighAccuracy: true, timeout: 6000},
      coordCampo: [],
      center: [0, 0] 
    };
  },
  methods:{
    async onMapLoad(event) {
        const asyncActions = event.component.actions;
        navigator.geolocation.getCurrentPosition((data) => {
            asyncActions.flyTo({
                center: [data.coords.longitude, data.coords.latitude],
                zoom: 13,
                speed: 1
            }) 
        })
    },
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
    height:97%;
}
</style>