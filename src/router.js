import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = ()=> import('./views/Home.vue')

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
  }
})

export default router;