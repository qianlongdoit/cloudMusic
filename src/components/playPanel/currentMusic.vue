<template>
  <transition name="bottomInOut">
    <div class="current-music" v-show="showCurrent">
      <div class="filterBG" :style="{backgroundImage: 'url('+ CD.al.picUrl +')',
       backgroundSize: 'cover',
       backgroundPosition: 'center center'}"></div>

      <div class="current-music-content">
        <div class="header">
          <i class="icon icon-back" @click="hideCurrent"></i>
          <div class="info">
            <p>{{CD.name}}{{CD.alia.length ? '(' + CD.alia[0] + ')' : ''}}</p>
            <p>
              {{CD.ar | artist}}
              <i class="icon icon-right"></i>
            </p>
          </div>
          <i class="icon icon-share"></i>
        </div>

        <transition name="fade">
          <div class="cd-wrapper">
            asasdasd
            <div class="needle"></div>
          </div>
        </transition>

        <transition name="fade">
          <div class="lrc-wrapper">

          </div>
        </transition>

        <div class="content-footer">

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
      },
      CD(){
        return store.state.playPanel.currentCD
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
    opacity 1
    background #aaa
    &.bottomInOut-enter-to, &.bottomInOut-leave-to
      transition all 0.4s
    &.bottomInOut-enter, &.bottomInOut-leave-to
      transform translateY(100%)
      opacity 0
    .filterBG
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      filter blur(35px)
      transform scale(1.2)
      z-index 4
    .current-music-content
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      z-index 5
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
            font-size 18px
            height 20px
            padding 13px 0 2px
          p:last-child
            color #e8e8e8
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
      .cd-wrapper
        position absolute
        top 60px
        left 0
        right 0
        .needle
          background url("../../../static/img/stick_bg.png")
          background-size cover
          transform-origin 14px 16px
          transition all .3s
          width 92px
          height 138px
      .lrc-wrapper
        display none
</style>
