<template>
  <v-container style="height:100%" fluid>    
        <v-container class="snapshot-mapa pa-0">
            <MglMap class="mapa" :center="center" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom"  @load="onMapLoad" >                      
                <MglMarker :coordinates="coordCampo" color="blue" />
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
                    {{file}}
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
                console.log(data)
                x[0] = data.coords.longitude;
                x[1] = data.coords.latitude;        
            });
        
            return x
        }
    },
    methods:{
        async create(){         
            const formData = new FormData();
            formData.append("data", `{ "lat": "123", "lng": "123" }`);
            formData.append("files.photo", this.file);
            await axios.post("https://guanabara-backend.herokuapp.com/location-points", formData).then(res => {
                console.log(res);
                console.log(res.data);
            });

            // let obj = {
            //     long: this.coordCampo[0],
            //     lat: this.coordCampo[1]
            // }

            // axios.post('https://guanabara-backend.herokuapp.com/location-point', obj)
            this.goTo();
        },
        async onMapLoad(event) {
            const asyncActions = event.component.actions;            
            const newParams = await asyncActions.flyTo({
            center: this.centeredLoc,
            zoom: 9,
            speed: 1
            }) 
            console.log(newParams)
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
            coordCampo:[1,1],
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