<template>
    <v-container class="pa-0" fluid style="height:100%">      
        <router-view style="height:100%"/>
        <MglMap  class="mapa" :accessToken="accessToken" @load="onMapLoad" :mapStyle="mapStyle" :center="center" :zoom="zoom" > 
            <MglGeolocateControl :positionOptions="positionOptions" trackUserLocation position="top-right"/>
            <MglMarker v-for="marker in markers" :key="marker.index" :coordinates="marker.coord" color="blue">
                <MglPopup :coordinates="marker.coord">
                <div>
                    <h3>{{marker.categories}}</h3>
                    <div v-if="marker.elements" class="d-flex justify-center">                        
                        <h5 v-for="(element, index) in marker.elements" :key="element + index">{{element}}</h5>
                    </div>
                    <v-carousel
                        cycle
                        v-if="marker.img.length > 1"
                        height="200"
                        hide-delimiter-background
                    >
                        <v-carousel-item
                            v-for="(slide, i) in marker.img"
                            :key="i"
                            :src="slide"
                        />
                    </v-carousel>
                    <v-img v-else class="ma-1" :src="marker.img[0]"></v-img>
                    <ul>
                        <li v-for="(impact, index) in marker.impacts" :key="impact + index">{{impact}}</li>
                    </ul>  
                </div>
                </MglPopup>
            </MglMarker>
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
            >
                <v-icon>
                mdi-crosshairs
                </v-icon>
            </v-btn>
        </div>
    </v-container>
    
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglGeolocateControl, MglMarker,MglPopup } from "vue-mapbox";
import { EventBus } from '@/event-bus';
import axios from 'axios'

export default {
    name: 'MapaCampo',
    components: {
    MglMap,
    MglGeolocateControl,
    MglMarker,
    MglPopup
    },
    data() {
        return {
        accessToken: 'pk.eyJ1IjoicmFmYWNyaWJhcyIsImEiOiJjazloZ3R0aW0weWIxM2ZwOWl2bTZ5aHhrIn0.q8zXHOGQxnHffPu-T6L85A',
        mapStyle: 'mapbox://styles/rafacribas/cl1ye632t001j14ms7r26m9md',
        isLoading: false,
        zoom: 13,
        positionOptions: { enableHighAccuracy: true, timeout: 15000},
        coordCampo: [],
        center: [-43.12725,-22.81692],
        markers: [],
        userLocation: null
        };
    },
    methods:{
    async onMapLoad(event) {
        const asyncActions = event.component.actions;
        navigator.geolocation.getCurrentPosition((data) => {
            asyncActions.easeTo({
                center: [data.coords.longitude, data.coords.latitude],
                zoom: 13,
                speed: 1
            }) 
        })
    },
    getUserLocation(){
        this.isLoading = true;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((data) => {
                    this.coordCampo[0] = data.coords.longitude;
                    this.coordCampo[1] = data.coords.latitude;     
                    EventBus.$emit('ponto-campo', this.coordCampo)                               
                    this.isLoading = false;
                    this.$router.push('/app/add')
                });
            }
    }
    },
    created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    },
    async mounted(){
        const response = await axios.get('https://guanabara-backend.herokuapp.com/location-points?_limit=-1')
            this.markers = response.data.map(item =>{
                let photos;
                if(item.photo.length)
                    photos = item.photo?.map(photo => photo.formats?.thumbnail?.url)
                else
                    photos = ['data:image/png;base64,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']
                let obj = {
                    'coord': [item.lng,item.lat],
                    'createdAt': item.createdAt,
                    'img': photos,
                    'elements' : item.elements.split(';'),
                    'impacts': item.impacts.split(';'),
                    'categories': item.categories
                }
                return obj
            })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                console.log(data)
                this.coordCampo[0] = data.coords.longitude;
                this.coordCampo[1] = data.coords.latitude;     
                EventBus.$emit('ponto-campo', this.coordCampo)                               
            });
        }
    }
};
</script>
<style scoped>
.popup{
    padding:8px 8px 4px 8px;
}

.mapboxgl-popup-content{
    padding: 0px !important;
}

.v-carousel {
    margin: 10px 0px;
}

</style>