<template>
  <section class="play-panel" v-if="">
    <img class="song-cover" :src="CD.al.picUrl">

    <div class="summary" @click="showCurrentMusic">
      <div class="song-name-wrapper">
        <p class="song-name" ref="songName" :class="[playing && overFlow ?'text-flow':'']">
          {{CD.name}}{{CD.alia.length ? '(' + CD.alia[0] + ')' : ''}}
        </p>
      </div>
      <span class="singer">{{CD.ar | artist}}</span>
    </div>

    <div class="control">
      <i class="icon" :class="[playing?'icon-pause-detail':'icon-playdetail']" @click="togglePlay"></i>
      <i class="icon icon-list-music" @click="showList"></i>
    </div>
    <audio ref="audio"></audio>

    <v-playList :info="{}"></v-playList>
    <v-musicList></v-musicList>
    <v-currentMusic></v-currentMusic>
  </section>
</template>

<script>
  import store from '../../store'
  import playList from './playList.vue'
  import musicList from './musicList.vue'
  import currentMusic from './currentMusic.vue'
  export default{
    data(){
      return {
        overFlow: false
      }
    },
    computed: {
      playing(){
        return store.state.playPanel.playing;
      },
      CD(){
        return store.state.playPanel.currentCD;
      },
      flow: {
        get: function () {
          return this.overFlow;
        },
        set: function(value){
          this.overFlow = value;
        }
      }
    },
    methods: {
      togglePlay(){
        store.commit('togglePlay');
      },
      showList(){
        store.commit('toggleSongList')
      },
      showCurrentMusic(){
        store.commit('toggleCurrentMusic')
      }
    },
    watch: {
      CD(){
        var songName = this.$refs.songName;
        var _this = this;
        setTimeout(() => {
          _this.flow = songName.offsetWidth > 220;
        }, 1000)
      }
    },
    mounted(){
      //  初始化播放器
      store.commit('setAudioElement', this.$refs.audio)
      store.commit('setSourceUrl', '../../../static/music/逍遥叹.mp3')
      store.commit('setMusicDuration')
      //  播放结束后自动播放下一首
      store.state.playPanel.audioElement.addEventListener('ended', ()=>{
        store.commit('playNext');
        store.dispatch('set_sourceUrl', store.state.playPanel.current)
        store.dispatch('set_percent')
      })
    },
    components: {
      "v-playList": playList,
      "v-musicList": musicList,
      "v-currentMusic": currentMusic
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @keyframes scroll {
    from {
      transform: translate3d(0, 0, 0)
    }
    to {
      transform: translate3d(-300px, 0, 0)
    }
  }

  .text-flow
    animation scroll 10s linear 2s infinite

  .play-panel
    position fixed
    bottom 0
    display flex
    justify-content space-between
    background #fff
    height 50px
    width 100%
    box-sizing border-box
    padding 5px
    z-index 24
    .song-cover
      width 40px
      height 40px
    .summary
      width 60%
      padding 0 15px 0 5px
      .song-name, .singer, .song-name-wrapper
        height 20px
        line-height 20px
      .song-name-wrapper
        position relative
        text-overflow clip
        overflow hidden
        white-space: nowrap;
        .song-name
          position absolute
          top 0
          left 0
          font-size 14px
      .singer
        font-size 12px
        color #aaa
    .control
      line-height 40px
      font-size 28px
      .icon-pause-detail
        color red

</style>
