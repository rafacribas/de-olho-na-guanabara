<template>
  <v-container fluid class="pa-1" style="height:100%">
        <MglMap class="mapa" :center="center" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" >                      
            <MglMarker :coordinates="coordinatesMarker" color="blue" />
            <MglMarker :coordinates="coordinatesMarker2" color="black">
                <MglPopup anchor="bottom">
                    <VCard elevation=0>
                        <div class="popup">
                            aa
                        </div>

                    </VCard>
                </MglPopup>
            </MglMarker>
        </MglMap>
  </v-container>
</template>

<script>
import { MglMap, MglMarker,MglPopup } from "vue-mapbox";
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
        center: [-43.1551208,-22.8855783],
        zoom: 9,
        coordinatesMarker: [-43.1551208,-22.8855783],
        coordinatesMarker2: [-43.1451208,-22.6885783],
        coordinatesMarker3: [-43.1251208,-22.6885783]

    }
}
}
</script>

<style>
.popup{
    padding:15px;
    
}
</style>