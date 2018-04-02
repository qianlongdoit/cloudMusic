<template>
  <transition name="bottomInOut">
    <div class="current-music" v-show="showCurrent">
      <div class="header">
        <i class="icon icon-back" @click="hideCurrent"></i>
        <div class="info">
          <p>{{'爱的告白'}}</p>
          <p>
            {{'丁丁'}}
            <i class="icon icon-right"></i>
          </p>
        </div>
        <i class="icon icon-share"></i>
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
    background #343434
    opacity 1
    &.bottomInOut-enter-to, &.bottomInOut-leave-to
      transition all 0.4s
    &.bottomInOut-enter, &.bottomInOut-leave-to
      transform translateY(100%)
      opacity 0
    .header
      display flex
      align-items center
      border-bottom 1px solid #7e8c8d
      .icon-back
        color #fff
        flex 0 0 44px
        font-size 24px
        line-height 60px
        height 60px
        text-align center
        vertical-align top
      div
        flex 1 1 auto
        height 100%
        p:first-child
          color #fff
          font-size 20px
          height 20px
          padding 13px 0 2px
        p:last-child
          color #8d8d8d
          font-size 14px
          height 25px
          line-height 25px
          .icon
            vertical-align middle
      .icon-share
        flex 0 0 44px
        text-align center
        font-size 38px
        color #fff
</style>
