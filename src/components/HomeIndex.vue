<template>
  <div style="height:100vh">           
        <MglMap class="mapa" :center="center" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom">                      
            <!-- <MglMarker :coordinates="coordinatesMarker" color="blue" /> -->
            <MglMarker v-for="marker in markers" :key="marker.index" :coordinates="marker.coord" color="blue">
                <MglPopup anchor="bottom">
                    <VCard class="popup" elevation="0">                        
                        <h2  class="text-center pb-2">{{marker.activity}}</h2>  
                        
                        <div class="text-xs-center mt-2" :style="`transform: rotate(90deg);`">
                            <v-avatar tile size="200">
                                <img style="width:100%" v-if="marker.img" :src="marker.img" alt="">   
                            
                            </v-avatar>                      
                        </div>
                        <v-list>
                            <v-list-item class="ml-n4 mr-n4 mt-n8 mb-n8"  three-line v-for="(impact, index) in marker.impacts"
                                    :key="index">

                                <v-list-item-content >
                                    <v-list-item-subtitle>
                                        {{impact}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>   
                            </v-list-item>
                        </v-list>
                        <span class="text--disabled " style="float:right">
                             Criado em: <b> {{new Date(marker.createdAt).toLocaleDateString()}}</b>
                        </span>
                    </VCard>
                </MglPopup>
            </MglMarker>
        </MglMap>
  </div>
</template>

<script>
import { MglMap, MglMarker,MglPopup } from "vue-mapbox";
import axios from 'axios'
export default {
    name: 'HomeIndex',
    components: {
        MglMap,
        MglMarker,
        MglPopup
    },
    data(){
        return {
            accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
            mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
            center: [-43.12725,-22.81692],
            zoom: 11,
            coordinatesMarker: [-43.12725,-22.81692],
            coordinatesMarker2: [-43.12725,-22.81692],
            coordinatesMarker3: [-43.12725,-22.81692],
            imgTest: '',
            markers: []

        }
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
            if (item.photo.length > 1){
                console.log(`ITEM FODA`, item)
            }
            return obj
        })
    },
    methods:{
        async onMapLoad(event) {
            console.log('nMAP LOADED')
            const asyncActions = event.component.actions;
            navigator.geolocation.getCurrentPosition((data) => {
                asyncActions.flyTo({
                    center: [data.coords.longitude, data.coords.latitude],
                    zoom: 10,
                    speed: 1
                }) 
            })
        }
    }
}
</script>

<style>
.popup{
    padding:8px 8px 4px 8px;
}

.mapboxgl-popup-content{
    padding: 0px !important;
}
</style>