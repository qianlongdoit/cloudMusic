/**
 * Created by Administrator on 2018/1/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './modules/sideBar'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    sideBar: sideBar
  }
})
