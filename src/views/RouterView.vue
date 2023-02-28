<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
     <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-icon>
              mdi-eye
            </v-icon>
            <span class="ml-7 subtitle-1">Guanabara</span>
          </v-list-item-title>

        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="isLoggedin">
        <div class="pa-2">
          <v-btn @click="logoff" block color="secondary">
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="secondary" app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color:white">De Olho na Guanabara</v-toolbar-title>
    </v-app-bar>

    <v-main>
      
      <router-view />
      
    </v-main>
  </v-app>
</template>


<script>
import { isSignedIn, signOut } from '../auth';

  export default {
   data(){
     return{
       drawer:null,
        items: [
        { title: 'Mapa Campo', icon: 'mdi-map-marker-plus-outline', link: '/app' },
        { title: 'Registrar Usuario', icon: 'mdi-account-plus', link: '/app/registrar' },
        // { title: 'Pontos cadastrados', icon: 'mdi-map', link: '/meusPontos' },
        // { title: 'Meus Pontos', icon: 'mdi-map-search',link: '/meusPontos' },
      ] 
     }
   },
   methods: {
     logoff() {
      signOut();
      window.location.assign('/login')
      //  window.sessionStorage.setItem('token', `false`)
      //  window.location.assign('/')
     }
   },
   computed:{
     isLoggedin(){
      if (isSignedIn()) {       // de acessar a página Home.
        return true
      }else{
        return false
      }
      //  const existsSessionAuth = window.sessionStorage.getItem('auth')
      //  return existsSessionAuth == 'false'|| !existsSessionAuth ? false : true
     }
   }
  }
</script>