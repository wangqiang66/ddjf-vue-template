/**
 * 终止对外暴露的文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import RouterList from './router'

Vue.used(Router)

const router = new Router({
  mode: 'history',
  routes: RouterList
})

// 处理一些拦截， 例如登录的拦截等等
router.beforeEach((to, from, next) => {
  next()
})