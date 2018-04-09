/**
 * Created by Administrator on 2018/1/11.
 */
import axios from 'axios'
import global from '../../global'

const state = {
  audioElement: '',  //audio标签
  listDetail: {   //原始后台传递的歌单信息
    tracks: []
  }, //歌单信息
  playModel: 0, //播放模式  0、列表循环 1、随机播放 2、单曲循环
  listSheet: [],  //播放列表
  showSongList: false,  //播放列表是否显示
  showMusicList: false, //歌单列表是否显示
  showCurrent: false, //当前播放页面是否显示
  showLrc: false, //是否切换显示歌词
  currentCD: {    //当前播放的歌曲信息
    name: '逍遥叹',
    al: {
      picUrl: '../../../static/images/userlogo.jpg'
    },
    ar: [{id: '', name: '胡歌', tns: [], alias: []}],
    alia: []
  },
  current: 0, //当前播放的索引
  musicDuration: 0, //歌曲时长(毫秒)
  percent: 0, //当前播放时间的比例(0-1)
  playing: false, //是否正在播放
  timer: 0, //当前播放动画的计时器

}

const mutations = {
  init(state, ele){
    state.audioElement = ele;
    ele.addEventListener('ended', () => {
      // console.log('ended')
      clearInterval(state.timer)
      state.playing = false
    })
  },
  play(state){
    state.playing = true;
    state.audioElement.load()
    state.audioElement.play()
  },
  playNext(state, isNext = true){
    let length = state.listDetail.tracks.length;
    let index = state.current;
    let model = state.playModel;
    if (!length) return false;
    switch (model) {
      case 0:  //列表
        isNext ? index++ : index--;
        if (index < 0) {
          index += length;
        }
        state.current = index % length;
        break;
      case 1:  //随机
        state.current = parseInt(Math.random() * length);
        break;
      case 2:  //单曲
        return false;
        break;
    }
  },
  pause(state){
    state.playing = false;
    state.audioElement.pause()
    clearInterval(state.timer)
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
  toggleLrc(state){
    state.showLrc = !state.showLrc;
  },

  //  设置listDetail及listSheet
  setListDetail(state, obj){
    state.listDetail = obj;
    state.listSheet = JSON.parse(JSON.stringify(obj.tracks));
  },
  //  设置当前播发的CD
  setCurrentCD(state, index){
    state.current = index;
    state.currentCD = state.listDetail.tracks[index];
  },
  //  设置当前播放CD的url
  setSourceUrl(state, url){
    state.audioElement.setAttribute('src', url);
  },
  //  获取播放时长
  setMusicDuration(state){
    if (state.currentCD.dt) {
      //  获取网易云的后台的音乐时长
      state.musicDuration = state.currentCD.dt;
    } else {
      //  获取本地音乐的音乐时长
      state.audioElement.oncanplay = function () {
        state.musicDuration = state.audioElement.duration * 1000;
      }
    }
  },
  //  设置播放的percent值
  setPercent(state, percent){
    state.percent = percent;
  },
  //  设置播放的进度
  setCurrentTime(state, percent){
    state.audioElement.currentTime = state.musicDuration * percent / 1000;
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
  //  播放指定index的歌曲
  set_sourceUrl({commit, state}, i){
    commit('setCurrentCD', i);
    axios.get(global.serverAddress + '/music/url?id=' + state.currentCD.id)
      .then((res) => {
        commit('setSourceUrl', res.data.data[0].url);
        commit('play');
      })
      .catch((err) => {
        console.log(err)
      });
  },
  set_percent({commit}){
    state.timer = setInterval(() => {
      var percent = state.audioElement.currentTime * 1000 / state.musicDuration;

      commit('setPercent', percent)
    }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}
