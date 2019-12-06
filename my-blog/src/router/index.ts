import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: { title: '起航'}
  },
  { 
    path: '/author',
    name: 'author',
    component: () => import('../views/author/index.vue'),
    meta: { title: '个人主页-起航'}
  },
  { 
    path: '/article',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    meta: { title: '文章页-起航'}
  },
  { 
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue'),
    meta: { title: '搜索-起航'}
  },
  { 
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings/index.vue'),
    meta: { title: '个人资料-起航'}
  },
  { 
    path: '/markdown',
    name: 'markdown',
    component: () => import('../views/markdown/index.vue'),
    meta: { title: '写文章'}
  },
  { 
    path: '/oauth',
    name: 'oauth',
    component: () => import('../views/oauth/index.vue') 
  },
  { 
    path: '/redirect',
    name: 'redirect',
    component: () => import('../views/redirect/index.vue') 
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
