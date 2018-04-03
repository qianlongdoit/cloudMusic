<template>
  <div>
    <transition name="mask">
      <div class="mask" v-show="playSetting.showList" @click="fadeInOut"></div>
    </transition>

    <transition name="fade">
      <div class="list-sheet" v-show="playSetting.showList">
        <div class="controller">
          <p class="model">
            <i class="icon" :class="playModelClass[playSetting.playModel]" @click="switchModel"></i>
            <span>{{playModelName[playSetting.playModel]}} ({{tracks.length}})</span>
          </p>

          <p class="action">
            <i class="icon icon-add-project"></i>
            <span>收藏全部</span>
            <i class="icon icon-delete"></i>
          </p>
        </div>

        <div class="list-content" ref="listContent">
          <div class="list-item" v-for="(item, index) in tracks" @click="play(index)">
            <div class="item-info" :class="[index === now?'red':'']">
              <i v-if="index === now" class="icon icon-volume-medium"></i>
              <span>{{item.name}}</span>
              <span class="artist"> - {{item.ar | artist}}</span>
            </div>

            <i class="icon icon-close"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    props: {},
    data(){
      return {
        playModelName: ['列表循环', '随机播放', '单曲循环'],
        playModelClass: ['icon-music-shunxu', 'icon-music-random', 'icon-music-danqu1']
      }
    },
    computed: {
      playSetting(){
        return {
          showList: store.state.playPanel.showSongList,
          playModel: store.state.playPanel.playModel
        }
      },
      tracks(){
        return store.state.playPanel.listDetail.tracks;
      },
      now(){
        return store.state.playPanel.current
      }
    },
    methods: {
      fadeInOut(){
        store.commit('hiddenSongList')
      },
      switchModel(){
        store.commit('switchModel')
      },
      play(i){
        store.dispatch('set_sourceUrl', i);
      }
    },
    watch: {
      playSetting(){
        console.log(this.now)
        if (this.playSetting.showList){
//          this.$refs.listContent.scrollTop = 150
//          console.log(50 * this.now)
//          console.log(this.$refs.listContent.scrollTop)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .red
    color red
    .artist
      color red

  .artist
    color #8d8d8d

  .mask
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background rgba(0, 0, 0, 0.5)
    opacity 1
    z-index 20
    &.mask-enter-to, &.mask-leave-to
      transition transform 0.3s
    &.mask-enter, &.mask-leave-to
      transform opacity 0

  .list-sheet
    position absolute
    bottom 0
    left 0
    right 0
    height 400px
    background #ffffff
    width 100%
    z-index 21
    &.fade-enter-to, &.fade-leave-to
      transition transform 0.4s
    &.fade-enter, &.fade-leave-to
      transform translateY(400px)
    .controller
      background #ffffff
      height 50px
      padding 15px 5px
      box-sizing border-box
      border-bottom 1px solid #ededed
      p
        font-size 14px
        line-height 20px
        display inline-block
        .icon
          display inline-block
          font-size 20px
          line-height 20px
          vertical-align top
          color #8d8d8d
          padding 0 10px
      .model .icon
        width 45px
        box-sizing border-box
      .action
        float right
        span
          margin-right 10px
      .icon-delete
        border-left 1px solid #dbdbdb

  .list-content
    height 350px
    overflow auto
    .list-item
      height 50px
      box-sizing border-box
      border-bottom 1px solid #ededed
      margin-left 10px
      .item-info
        display inline-block
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 80%
        .icon, span
          line-height 49px
        span
          font-size 14px
        .artist
          font-size 12px
      .icon-close
        float right
        margin-right 10px
        color #8d8d8d
        font-size 20px
        line-height 50px
</style>
