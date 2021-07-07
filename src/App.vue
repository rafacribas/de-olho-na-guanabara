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
              mdi-check
            </v-icon>
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
    </v-navigation-drawer>

    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color:white">De Olho na Guanabara</v-toolbar-title>
    </v-app-bar>

    <v-main>
      
      <router-view />
      
    </v-main>
  </v-app>
</template>

<script>
  export default {
   data(){
     return{
       drawer:null,
        items: [
        { title: 'Mapa', icon: 'mdi-image', link: '/' },
        { title: 'Campo', icon: 'mdi-view-dashboard', link: '/campo/' },
        { title: 'Meus Pontos', icon: 'mdi-help-box',link: '/meusPontos' },
      ] 
     }
   }
  }
</script>