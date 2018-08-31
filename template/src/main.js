// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './css/_normalize.scss'
import './css/main.scss'
{{#router}}
import router form './route'
{{/router}}
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  components: { App },
  template: '<App/>'
})
