<template>
  <div class="volume progress">
    <span><i class="icon icon-volume-medium"></i></span>
    <div class="progress-bar" ref="ballWrapper">
      <div class="progress-content">
        <span class="current-progress" :style="{width:percent*100 + '%'}"></span>
        <span class="progress-ball" :style="{left: left}" ref="ball"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    computed: {
      percent(){
        return 0.5;
      },
      left(){
        return '50%'
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .icon-volume-medium
    font-size 16px
  .volume
    height 5vh
    margin 0 auto
    padding 0 10px
    display flex
    align-items center
    position  fixed
    top 10vh
    left 0
    right 0
    z-index 5
    color #fff

</style>
