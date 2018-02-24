import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import myMusic from '../components/myMusic/index.vue'
import findMusic from '../components/findMusic/index.vue'
import community from '../components/community/index.vue'

Vue.use(Router)
Vue.use(VueResource)
// Vue.http.options.root = 'http://127.0.0.1:3000'

export default new Router({
  routes: [
    //  首页
    {
      path:'/',
      redirect:'/findMusic'
    },
    {
      path:'/myMusic',
      component: myMusic
    },
    {
      path:'/findMusic',
      component: findMusic
    },
    {
      path:'/community',
      component: community
    }
  ]
})
