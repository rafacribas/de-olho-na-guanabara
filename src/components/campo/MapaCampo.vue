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
// import axios from 'axios'
import request from '@/router/requests.js'

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
        accessToken: process.env.VUE_APP_ACCESS_TOKEN,
        mapStyle: process.env.VUE_APP_MAP_STYLE_URL,
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
        async getData(){
            const resposta = await request('GET', 'denuncias?populate=*');
            this.markers = resposta.data.map(item => {
                let photos = [];
                if(item.photo){ 
                    photos = item.photo?.map(photo => {
                        return process.env.VUE_APP_STRAPI_URL+photo.url
                    })
                }
                else
                    photos[0] = process.env.VUE_APP_NO_IMAGE_URL
                let obj = {
                    'coord': [item.lng,item.lat],
                    'createdAt': item.createdAt,
                    'elements' : item.elements.split(';'),
                    'impacts': item.impacts.split(';'),
                    'categories': item.categories,
                    'img': photos
                }
                return obj
            })

            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((data) => {
                this.coordCampo[0] = data.coords.longitude;
                this.coordCampo[1] = data.coords.latitude;     
                EventBus.$emit('ponto-campo', this.coordCampo)                               
            });
        }
        },
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
        this.getData()

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