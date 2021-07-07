import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>import( '@/components/HomeIndex.vue')
  },
  {
    path: '/campo',
    name: 'Campo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>import( '@/components/campo/MapaCampo.vue')
  },
  {  
    path: '/add',
    name: 'Criar Ponto',    
    component: () => import( '@/components/campo/CriarPonto.vue'),
  },
  {  
    path: '/meusPontos',
    name: 'Meus Pontos',    
    component: () => import( '@/components/meus-pontos/MeusPontos.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
