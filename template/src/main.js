// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './css/_normalize.scss'
import './css/main.scss'
{{#router}}
import router form './route'
{{/router}}
{{#vuex}}
import store form './store'
{{/vuex}}
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  components: { App },
  template: '<App/>'
})
