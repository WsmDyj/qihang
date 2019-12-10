import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import * as Element from 'element-ui'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import 'element-ui/lib/theme-chalk/base.css' // fade style

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'


import formatDate from './utils/formatDate'

Vue.config.productionTip = false;
Vue.use(Element)

Vue.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

Vue.prototype.formatDate = formatDate

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
