/**
 * Created by Administrator on 2018/1/7.
 */
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

export default {
  state,
  mutations
};
