<template>
  <div class="progress">
    <span class="current-time">{{'00:00'}}</span>
    <div class="progress-bar">
      <span class="current-progress"></span>
      <span class="progress-ball"></span>
    </div>
    <span class="total-time">{{'03:38'}}</span>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .progress
    height 6vh
    margin 0 auto
    padding 0 10px
    display flex
    align-items center
    span
      font-size 12px
    .current-time
      margin-right 10px
    .progress-bar
      flex 1
      height 2px
      border-radius 1px
      background #f5f5f54d
      .current-progress
        color #fff
      .progress-ball
        border-radius 50%
    .total-time
      margin-left 10px
</style>
