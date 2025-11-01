import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect:'/Manager/home'},
    { path: '/Manager/', name: 'Manager', component:() => import('../views/Manager.vue'),
      children:[
        { path: 'home', name: 'home', component: () =>  import('../views/Home.vue'),},
        { path: 'admin', name: 'admin', component: () =>  import('../views/Admin.vue'),},
      ]
    },

    { path: '/notFound', component: import('../views/404.vue'),},
    { path: '/:pathMatch(.*)', redirect:'/notFound'},

  ],
})

export default router
