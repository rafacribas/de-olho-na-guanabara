import Vue from 'vue'
import VueRouter from 'vue-router'
import { isSignedIn } from '../auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>import( '@/components/HomeIndex2.vue')
    },
    {
    path: '/app',
    name: 'RouterView',
    component: () =>import( '@/views/RouterView.vue'),
    beforeEnter (_, __, next){
      if (isSignedIn()) {       // de acessar a página Home.
        next();
        return;
      }
      next('/login')
    },
    children: [
      {  
        path: 'registrar',
        name: 'Registrar Usuario',    
        component: () => import( '@/components/RegistrarUsuario.vue'),
      },
      {
        path: '/',
        name: 'Campo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>import( '@/components/campo/MapaCampo.vue')
      },
      {  
        path: '/app/add',
        name: 'Criar Ponto',    
        component: () => import( '@/components/campo/CriarPonto.vue'),
        children: [
          {
            path: ':id',
            component: () => import( '@/components/campo/CriarPonto.vue')
          },
        ],
      },
      {  
        path: '/meusPontos',
        name: 'Meus Pontos',    
        component: () => import( '@/components/meus-pontos/MeusPontos.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>import( '@/views/Login.vue'),
    beforeEnter (_, __, next) { // Impede usuários assinados de
      if (!isSignedIn()) {      // acessar a página de login.
        next();
        return;
      }
      next('/app')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path != '/login' && to.path != '/'){
//     const existsSessionAuth = window.sessionStorage.getItem('auth')

//     if(existsSessionAuth === 'false' || !existsSessionAuth){
//       window.location.assign('/login')
//     }
      
//   }
//   next()
// })

export default router
