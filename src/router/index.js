import Vue from 'vue'
import Router from 'vue-router'

import myMusic from '../components/myMusic/index.vue'

import findMusic from '../components/findMusic/index.vue'
import discover from '../components/findMusic/discover/index.vue'
import video from '../components/findMusic/video/index.vue'
import station from '../components/findMusic/station/index.vue'

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
      component: findMusic,
      children: [
        {
          path: '/findMusic/discover',
          component: discover
        },
        {
          path: '/findMusic/video',
          component: video
        },
        {
          path: '/findMusic/station',
          component: station
        }
      ]
    },
    {
      path:'/community',
      component: community
    }
  ]
})
