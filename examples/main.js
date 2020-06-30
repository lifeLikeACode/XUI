// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import XUI from '../package/index.js'
Vue.config.productionTip = false
Vue.use(XUI)
/* eslint-disable no-new */
new Vue({
  name: 'root',
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.config.silent = true
