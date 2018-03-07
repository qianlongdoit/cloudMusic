import Vue from 'vue'
import Router from 'vue-router'

import myMusic from '../components/myMusic/index.vue'
import findMusic from '../components/findMusic/index.vue'
import community from '../components/community/index.vue'

Vue.use(Router)

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
