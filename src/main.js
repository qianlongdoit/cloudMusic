// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axois from 'axios'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios =axois

/* eslint-disable no-new */

//  组成全局过滤器
Vue.filter('artist', function (value) {
  return value.length === 1
    ? value[0].name
    : value.reduce(function (acc, cur, index) {
      return index + 1 === value.length
        ? acc + cur.name
        : acc + cur.name + '/'
    }, "");
})

new Vue({
  el: '#app',
  router,
  store,
  render(h){
    return h(App)
  }
})
