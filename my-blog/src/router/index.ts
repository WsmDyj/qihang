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
    meta: { title: '个人主页 - 起航'}
  },
  { 
    path: '/article',
    name: 'article',
    component: () => import('../views/article/index.vue'),
    meta: { title: '文章页 - 起航'}
  },
  { 
    path: '/questions',
    name: 'questions',
    component: () => import('../views/questions/index.vue'),
    meta: { title: '问答 - 起航'}
  },
  { 
    path: '/ask',
    name: 'ask',
    component: () => import('../views/ask/index.vue'),
    meta: { title: '提问 - 起航'}
  },
  { 
    path: '/hot',
    name: 'hot',
    component: () => import('../views/hot/index.vue'),
    meta: { title: '视频 - 起航'}
  },
  { 
    path: '/share',
    name: 'share',
    component: () => import('../views/share/index.vue'),
    meta: { title: '分享 - 起航'}
  },
  { 
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue'),
    meta: { title: '搜索 - 起航'}
  },
  { 
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings/index.vue'),
    meta: { title: '个人资料 - 起航'}
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
