<template>
<div style="height:100vh">
    <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />

</div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapbox from "mapbox-gl";
import { MglMap } from "v-mapbox";
export default {
    components: {
        MglMap
    },
    data() {
    return {
     accessToken: 'pk.eyJ1IjoicmFmYWNyaWJhcyIsImEiOiJjazloZ3R0aW0weWIxM2ZwOWl2bTZ5aHhrIn0.q8zXHOGQxnHffPu-T6L85A', // your access token. Needed if you using Mapbox maps
    mapStyle: 'mapbox://styles/rafacribas/cl1ye632t001j14ms7r26m9md'
    };
    },

    created() {
    // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = mapbox;
    }
};
</script>

<style>

</style>