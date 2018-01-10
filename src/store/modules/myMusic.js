/**
 * Created by Administrator on 2018/1/9.
 */
const state = {
  created: {
    isHidden: true,
    title: '创建的歌单'
  },
  favorite: {
    isHidden: true,
    title: '收藏的歌单'
  }
}

const mutations = {
  toggle(state){
    state.isHidden = !state.isHidden;
  }
}

export default {
  state,
  mutations
}
