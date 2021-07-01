<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title color='blue'>De Olho na Guanabara</v-toolbar-title>
    </v-app-bar>

    <v-main>
      
      <MapaWrapper />
      
    </v-main>
  </v-app>
</template>

<script>
import MapaWrapper from './components/MapaWrapper.vue'
  export default {
    components : {
      MapaWrapper
    },
    data: () => ({ drawer: null }),
  }
</script>