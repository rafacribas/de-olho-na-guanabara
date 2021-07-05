<template>
  <v-container style="height:100%" fluid>    
    
        <v-container>
            <v-row>
                <v-col>
                    
                    <v-text-field
                    outlined             
                     hide-details
                    color="primary"
                    label="Nome"
                    />
                
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select 
                        outlined                         
                        color="blue"
                        label="Impacto"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-file-input
                        truncate-length="15"
                        chips
                        outlined
                        hide-details
                        label="Foto"                        
                        prepend-icon="mdi-camera"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="2" justify="center">
                        <v-btn color="green" x-large>
                            <v-icon color="white">                            
                                mdi-check-circle-outline
                            </v-icon>
                        </v-btn>
                    </v-col>
            </v-row>
        </v-container>
        <v-container class="snapshot-mapa pa-0">
            <MglMap class="mapa" :center="center" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" >                      
                <MglMarker :coordinates="coordinatesMarker" color="blue" />
            </MglMap>
        </v-container>
        
  </v-container>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";

export default {
    name: 'CriarPonto',
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

<style scoped>.v-text-field--:not(.v-text-field--single-line) input{
    margin-top:0px !important;
}
.snapshot-mapa{
    height:50%
}
</style>