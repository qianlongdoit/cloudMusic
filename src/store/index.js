/**
 * Created by Administrator on 2018/1/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './modules/sideBar'
import myMusic from './modules/myMusic'
import playPanel from './modules/playPanel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    sideBar: sideBar,
    myMusic: myMusic,
    playPanel: playPanel
  }
})
