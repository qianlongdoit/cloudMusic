/**
 * Created by Administrator on 2018/1/11.
 */
import axios from 'axios'
import global from '../../global'

const state = {
  audioElement: '',  //audio标签
  listDetail: {
    tracks:[]
  }, //歌单信息
  playModel: 0, //播放模式  0、列表循环 1、随机播放 2、单曲循环
  listSheet: [],  //播放列表
  showSongList: false,  //播放列表是否显示
  showMusicList: false, //歌单列表是否显示
  showCurrent: false, //当前播放页面是否显示
  currentCD: {    //当前播放的歌曲信息
    name: '逍遥叹',
    al: {
      picUrl: '../../../static/images/userlogo.jpg'
    },
    ar: [{id: '', name: '胡歌', tns: [], alias: []}],
    alia: []
  },
  current: 0, //当前播放的索引
  // musicDuration: 0, //歌曲时长
  playingTime: 0, //当前播放时间
  playing: false, //是否正在播放
  timer: 0,

}

const mutations = {
  init(state, ele){
    state.audioElement = ele;
  },
  play(state){
    state.playing = true;
    state.audioElement.load()
    state.audioElement.play()
  },
  pause(state){
    state.playing = false;
    state.audioElement.pause()
  },
  togglePlay(){
    state.playing ? state.audioElement.pause() : state.audioElement.play();
    state.playing = !state.playing;
  },
  hiddenSongList(state){
    state.showSongList = false;
  },
  switchModel(state){
    state.playModel = (state.playModel + 1) % 3;
  },

  toggleMusicList(state){
    state.showMusicList = !state.showMusicList;
  },
  toggleCurrentMusic(state){
    state.showCurrent = !state.showCurrent;
  },
  //  设置当前播发的CD
  setCurrentCD(state, index){
    state.current = index;
    state.currentCD = state.listDetail.tracks[index];
  },
  //  设置当前播放CD的url
  setSourceUrl(state, obj){
    state.audioElement.setAttribute('src', obj.url);
  },
  //  设置当前的播放进度
  setCurrentProcess(state, percent){
    state.playingTime = percent;
  },
  //  设置当前播放的计时器ID
  setTimer(state, id){
    state.timer = id;
  },
  //  歌单中移除指定的CD
  removeOne(state, i){
    // state.listSheet.splice(i, 1);
    // if (state.current > i){
    //   state.current--
    // }else if (state.current === i){
    //   state.audioElement.pause();
    // }
  }
}

const actions = {
  set_sourceUrl({commit}, i){
    commit('setCurrentCD', i);
    axios.get(global.serverAddress + '/music/url?id=' + state.currentCD.id)
      .then((res) => {
        commit('setSourceUrl', res.data.data[0]);
        commit('play');
      })
      .catch((err) => {
        console.log(err)
      });

  },
}

export default {
  state,
  mutations,
  actions
}
