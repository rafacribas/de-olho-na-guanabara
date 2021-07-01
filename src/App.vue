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
      
      <Mapa />
      
    </v-main>
  </v-app>
</template>

<script>
import Mapa from './components/Mapa.vue'
  export default {
    components : {
      Mapa
    },
    data: () => ({ drawer: null }),
  }
</script>