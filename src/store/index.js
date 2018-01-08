/**
 * Created by Administrator on 2018/1/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  isShow: false
}

const mutations = {
  showSideBar(state){
    state.isShow = true;
  },
  hideSideBar(state){
    state.isShow = false;
  }
}
export default new Vuex.Store({
  state,
  mutations
})
