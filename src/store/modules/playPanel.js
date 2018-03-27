/**
 * Created by Administrator on 2018/1/11.
 */
const state = {
  audioElement: '',  //audio标签
  song: '', //歌曲名
  artist: '', //演唱者
  playModel: 1, //播放模式  1、列表循环 2、随机播放 3、单曲循环
  listSheet: [],  //播放列表
  showSongList: false,  //播放列表是否显示
  musicDuration: 0, //歌曲时长
  playingTime: 0, //当前播放时间
  playing: false, //是否正在播放

}

const mutations = {
  init(state, ele){
    state.audioElement = ele;
  },
  play(state){
    state.playing = true;
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
  }
}

export default {
  state,
  mutations
}
