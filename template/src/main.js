// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'

{{#vuex}}
import store from '@/store'
{{/vuex}}
{{#router}}
{{#mpvue}}
import MpvueRouterPatch from 'mpvue-router-patch'
{{/mpvue}}
{{#if_not mpvue}}
import router from './router'
{{/if_not}}
{{/router}}
import weui from 'weui.js'
import { DWeuiPlugin } from '@ddjf/ddui'

Vue.config.productionTip = false
{{#if_and router mpvue}}
Vue.use(MpvueRouterPatch)
{{/if_and}}
Vue.use(DWeuiPlugin, { weui })

/* eslint-disable no-new */
{{#if_not mpvue}}
new Vue({
  el: '#app',{{#vuex}}
  store,
  {{/vuex}}{{#router}}
    router,
   {{/router}}components: { App },
   template: '<App/>'
})
{{/if_not}}

{{#mpvue}}
  const app = new Vue({
  {{#vuex}}store,{{/vuex}}
    ...App
  })
  app.$mount()
{{/mpvue}}
