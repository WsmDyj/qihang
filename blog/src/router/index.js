import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('../views/author')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings')
    }
  ]
})
