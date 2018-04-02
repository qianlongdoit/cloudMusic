<template>
  <transition name="bottomInOut">
    <div class="current-music" v-show="showCurrent">
      <div class="header clearfix">
        <i class="icon icon-back" @click="hideCurrent"></i>
        <p>爱的告白</p>
        <p>
          丁丁
          <i class="icon icon-right"></i>
        </p>
        <div class="share">
          <i class="icon icon-share"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import store from '../../store'
  export default {
    computed: {
      showCurrent(){
        return store.state.playPanel.showCurrent
      }
    },
    methods: {
      hideCurrent(){
        store.commit('toggleCurrentMusic')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .current-music
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #999
    opacity 1
    &.bottomInOut-enter-to, &.bottomInOut-leave-to
      transition all 0.4s
    &.bottomInOut-enter, &.bottomInOut-leave-to
      transform translateY(100%)
      opacity 0
    .header
      .icon, p
        color #fff
        display inline-block
        line-height 60px
        height 60px
        padding 0 10px
        vertical-align middle
      .icon
        font-size 24px
      .share
        float right
</style>
