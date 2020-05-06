import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import "normalize.css/normalize.css";
import './utils/rem'

import formatDate from "./utils/formatDate";

import * as Element from 'element-ui'
import "element-ui/lib/theme-chalk/base.css"; // fade style
import "element-ui/lib/theme-chalk/index.css";

import hljs from 'highlight.js'


import './components/index'

import '@/styles/index.scss'


Vue.config.productionTip = false;
Vue.use(Element)

/**
 * 注册全局指令
 * v-highlight
 */
import "highlight.js/styles/github.css";
Vue.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('pre code')
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

/**
 * 注册全局方法
 * formatDate
 */
Vue.prototype.formatDate = formatDate

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
