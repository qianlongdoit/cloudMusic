/**
 * Created by Administrator on 2018/1/11.
 */
import axios from 'axios'
import global from '../../global'

const state = {
  audioElement: '',  //audio标签
  listId: -1, //当前播放歌单的id
  id: -1, //当前播放歌曲的id
  listDetail: {   //原始后台传递的歌单信息
    tracks: []
  }, //歌单信息
  playModel: 0, //播放模式  0、列表循环 1、随机播放 2、单曲循环
  volume: 0.6,  //播放音量(0-1)
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
  lrc: '歌词加载中...',  //当前的歌词信息
  lrcIndex: 0,  //当前播放歌词行数的索引
  current: 0, //当前播放的列表中的索引
  musicDuration: 0, //歌曲时长(毫秒)
  percent: 0, //当前播放时间的比例(0-1)
  playing: false, //是否正在播放
  timer: 0, //当前播放动画的计时器

}

const mutations = {
  setAudioElement(state, ele){
    state.audioElement = ele;
  },
  setListId(state, id){
    state.listId = id
  },
  setId(state, id){
    state.id = id ? id : state.currentCD.id;
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
        state.currentCD = state.listDetail.tracks[index];
        break;
      case 1:  //随机
        state.current = parseInt(Math.random() * length);
        state.currentCD = state.listDetail.tracks[index];
        break;
      case 2:  //单曲
        return false;
        break;
    }
  },
  togglePlay(state){
    state.playing ? (state.audioElement.pause(), clearInterval(state.timer)) : state.audioElement.play();
    state.playing = !state.playing;
  },
  toggleSongList(state){
    state.showSongList = !state.showSongList;
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
  //  设置播放器的音量
  setVolume(state, value){
    state.volume = value;
    state.audioElement.volume = value;
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
  //  设置当前播放的CD的lrc
  setLrc(state, lrc){
    state.lrc = lrc;
  },
  //  设置播放歌曲的lrcIndex
  setLrcIndex(state, value){
    state.lrcIndex = value;
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
  stopTimer(state){
    clearInterval(state.timer);
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
    //  获取指定歌曲的lrc
    axios.get(global.serverAddress + '/lyric?id=' + state.currentCD.id)
      .then((res => {
        commit('setLrc', res.data.lrc.lyric)
      }))
      .catch((err) => {
        console.log(err)
        commit('setLrc', '[00:000.00] 暂无歌词')
      })
  },
  //  设置播放进度
  set_percent({commit, state}, rePlay = true){
    clearInterval(state.timer);
    commit('setTimer', setInterval(() => {
      var percent = state.audioElement.currentTime * 1000 / state.musicDuration;
      // console.log(state.audioElement.currentTime)
      commit('setPercent', percent)
      if (rePlay) {
        commit('setLrcIndex', 0)
      }
    }, 1000))
  },
}

export default {
  state,
  mutations,
  actions
}
