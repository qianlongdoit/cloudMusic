<template>
  <section class="play-panel">
    <img class="song-cover" src="../../../static/musiclist/10.jpg">

    <div class="summary">
      <div class="song-name-wrapper">
        <p class="song-name" ref="songName" :class="[playing?'text-flow':'']">{{'【剑三·咩炮】野火（剧情版）（柴田淳Cover ）'}}</p>
      </div>
      <span class="singer">{{'以冬'}}</span>
    </div>

    <div class="control">
      <i class="icon" :class="[playing?'icon-pause-detail':'icon-playdetail']" @click="togglePlay"></i>
      <i class="icon icon-list-music"></i>
    </div>
    <audio ref="audio">
      <source src="../../../static/music/逍遥叹.mp3"/>
    </audio>

    <v-playList :info="{show:false}"></v-playList>
  </section>
</template>

<script>
  import store from '../../store'
  import playList from './playList.vue'
  export default{
    data(){
      return {

      }
    },
    computed: {
      playing(){
        return store.state.playPanel.playing;
      }
    },
    methods: {
      togglePlay(){
        store.commit('togglePlay');
      }
    },
    mounted(){
      //  初始化播放器
      store.commit('init', this.$refs.audio)
    },
    components:{
      "v-playList": playList
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

  .icon-pause-detail
    border-radius 50%
    color red

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

</style>
