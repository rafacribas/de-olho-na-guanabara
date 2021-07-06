<template>
  <v-container style="height:100%" fluid>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
            {{ text }}
        </v-snackbar>
        <v-container class="snapshot-mapa pa-0">
            <MglMap class="mapa" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom"  @load="onMapLoad" >                      
                <MglMarker :coordinates="coordinatesMarker" color="blue" />
            </MglMap>
        </v-container>    
        <v-container>         
            <v-row>
                <v-col>
                    <v-select 
                        outlined
                        color="blue"
                        label="Impacto"
                        :items="impactos"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-file-input
                        v-model="file"
                        truncate-length="15"
                        chips
                        outlined
                        hide-details
                        label="Foto"
                        capture="user"
                        accept="image/*"
                        append-icon="mdi-camera"
                        prepend-icon=""
                        ></v-file-input>
                </v-col>
                <v-col cols="12" justify="center">
                    <v-btn @click="create" color="green" x-large style="width: 100%">
                        <span style="color: white">
                            CONFIRMAR
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
  </v-container>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";
import axios from 'axios'


export default {
    name: 'CriarPonto',
    components: {
        MglMap,
        MglMarker    
    },        
    computed:{
        centeredLoc(){
            let x = [];
    
            navigator.geolocation.getCurrentPosition((data) => {
                x[0] = data.coords.longitude;
                x[1] = data.coords.latitude;        
            });
        
            return x
        }
    },
    methods:{
        async centeredLoc2(){
            let x = [];
    
            await navigator.geolocation.getCurrentPosition((data) => {
                x[0] = data.coords.longitude;
                x[1] = data.coords.latitude;        
            });
        
            return x
        },
        create(){         
            const formData = new FormData();
            let lng;
            let lat;
            navigator.geolocation.getCurrentPosition(async (data) => {
                console.log('DATA', data)
                lng = data.coords.longitude;
                lat = data.coords.latitude; 

                formData.append("data", `{ "lat": "${lat}", "lng": "${lng}" }`);
                formData.append("files.photo", this.file);

                await axios.post("https://guanabara-backend.herokuapp.com/location-points", formData).then(res => {
                    console.log(res);
                    console.log(res.data);
                });       

                this.snackbar = true;
                setTimeout(()=>this.$router.push('/'), 1500)
            });
            
        },         
        async onMapLoad(event) {
            console.log('nMAP LOADED')
            const asyncActions = event.component.actions;
            navigator.geolocation.getCurrentPosition((data) => {
                asyncActions.flyTo({
                    center: [data.coords.longitude, data.coords.latitude],
                    zoom: 13,
                    speed: 1
                }) 
            })
        }

    },
    data(){
        return {
            accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
            mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
            center: [-43.1551208,-22.8855783],
            zoom: 5,
            file: null,
            coordinatesMarker: [-42.749668, -21.870],
            snackbar: false,
            text: 'Ponto cadastrado.',
            timeout: 2000,
            impactos:[
                'Demarcação de áreas de exploração e tráfego',
                'Incremento do fluxo de embarcações na região',
                'Levantamentos geofísicos preliminares',
                'Alterações na dinâmica geoeconômica das áreas terrestres adjacentes',
                'Perfuração de poços'                
            ]
        }
    }

}
</script>

<style scoped>.v-text-field--:not(.v-text-field--single-line) input{
    margin-top:0px !important;
}
.snapshot-mapa{
    height:50%
}
</style>