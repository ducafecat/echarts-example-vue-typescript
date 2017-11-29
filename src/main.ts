// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$textInfo = `vue.$textInfo 全局变量`

/* tslint:disable */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
/* tslint:enable */
