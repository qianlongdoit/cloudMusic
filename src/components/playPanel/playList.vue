<template>
  <div>
    <transition name="mask">
      <div class="mask" v-show="showList" @click="change"></div>
    </transition>

    <transition name="fade">
      <div class="list-sheet" v-show="showList">
        <div class="controller">
          <p class="model">
            <i class="ico icon-music-shunxu" @click="change"></i>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    props: {},
    computed: {
      showList(){
        return store.state.playPanel.showSongList
      }
    },
    methods: {
      change(){
        store.commit('hiddenSongList')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    height 315px
    background #2d9b40
    width 100%
    z-index 21
    &.fade-enter-to, &.fade-leave-to
      transition transform 0.4s
    &.fade-enter, &.fade-leave-to
      transform translateY(315px)
    .controller
      background #ffffff
      height 50px
</style>
