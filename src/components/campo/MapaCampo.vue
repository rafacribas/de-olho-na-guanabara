<template>
    <v-container class="pa-0" fluid style="height:100%">      
      <router-view style="height:100%"/>    
        <MglMap class="mapa" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" >
            <MglMarker :coordinates="coordinates" color="blue" />            
             <MglGeolocateControl :positionOptions="positionOptions" trackUserLocation position="top-right" />
             <MglMarker :coordinates="coordinates2" color="blue" />
        </MglMap>
        <div class="d-flex justify-center mt-2" style="position:relative;bottom:90px">
            <v-btn
                to="/campo/add"
                bottom
                x-large
                elevation="2"
                color="blue"
                fab                
                style="color:white"
            >+
            </v-btn>
        </div>
    </v-container>
    
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglGeolocateControl } from "vue-mapbox";

export default {
  name: 'MapaCampo',
  components: {
    MglMap,
    MglMarker,
    MglGeolocateControl
    },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
      coordinates:  [-42.749668, -21.870],
      zoom: 3,
      coordinates2 : [0,0],
      positionOptions: { enableHighAccuracy: true, timeout: 6000}
    };
  },
  methods:{
    getUserLocation(){
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((data) => {
                  console.log(data)
                  this.coordinates2[0] = data.coords.longitude;
                  this.coordinates2[1] = data.coords.latitude
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