import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue') 
  },
  { 
    path: '/author',
    name: 'author',
    component: () => import('../views/author/index.vue')
  },
  { 
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings/index.vue') 
  },
  { 
    path: '/token',
    name: 'token',
    component: () => import('../views/Home.vue') 
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
