/**
 * Created by Administrator on 2018/1/7.
 */
const state = {
  isShow: false,
  showLoginPage: false
}

const mutations = {
  showSideBar(state){
    state.isShow = true;
  },
  hideSideBar(state){
    state.isShow = false;
  },

  showLoginPage(state){
    state.showLoginPage = true;
  },
  hideLoginPage(state){
    state.showLoginPage = false;
  }
}

export default {
  state,
  mutations
};
