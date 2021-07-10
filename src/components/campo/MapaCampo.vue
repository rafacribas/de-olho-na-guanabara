<template>
    <v-container class="pa-0" fluid style="height:100%">      
      <router-view style="height:100%"/>
      <MglMap  class="mapa" :accessToken="accessToken" @load="onMapLoad" :mapStyle="mapStyle" :center="center" :zoom="zoom" > 
          <MglGeolocateControl :positionOptions="positionOptions" trackUserLocation position="top-right" />
          <MglMarker v-for="marker in markers" :key="marker.index" :coordinates="marker.coord" color="blue" />
      </MglMap>
      <div class="d-flex justify-center mt-2" style="position:relative;bottom:130px">
          <v-btn            
              bottom
              @click="getUserLocation()"
              x-large
              elevation="2"
              color="primary"
              :loading="isLoading"
              :disabled="isLoading"
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
import { MglMap, MglGeolocateControl, MglMarker } from "vue-mapbox";
import { EventBus } from '@/event-bus';
import axios from 'axios'

export default {
  name: 'MapaCampo',
  components: {
    MglMap,
    MglGeolocateControl,
    MglMarker
    },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
      isLoading: false,
      zoom: 13,
      positionOptions: { enableHighAccuracy: true, timeout: 6000},
      coordCampo: [],
      center: [-43.12725,-22.81692],
      markers: []
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
      this.isLoading = true;
      console.log('taporra')
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((data) => {
                  console.log(data)
                  this.coordCampo[0] = data.coords.longitude;
                  this.coordCampo[1] = data.coords.latitude;     
                  EventBus.$emit('ponto-campo', this.coordCampo)                               
                  this.isLoading = false;
                  this.$router.push('/add')
              });
          }
    }
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  async mounted(){
    const response = await axios.get('https://guanabara-backend.herokuapp.com/location-points')
        console.log('res',response)       
        this.markers = response.data.map(item =>{
            let obj = {
                'coord': [item.lng,item.lat],
                'createdAt': item.createdAt,
                'img': item.photo[0]?.formats?.thumbnail?.url || null,
                'activity' : item.activity,
                'impacts': item.impacts.split(';')
            }
            return obj
        })
  }
};
</script>
<style scoped>

.mapa{
    height:97%;
}
</style>