<template>
  <section class="play-panel">
    <img class="song-cover" src="../../../static/musiclist/10.jpg">

    <div class="summary">
      <div class="song-name-wrapper">
        <p class="song-name">{{'【剑三·咩炮】野火（剧情版）（柴田淳Cover ）'}}</p>
      </div>
      <span class="singer">{{'以冬'}}</span>
    </div>

    <div class="control">
      <i class="icon icon-playdetail"></i>
      <i class="icon icon-list-music"></i>
    </div>
  </section>
</template>

<script>

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
          animation scroll 10s linear 2s infinite
      .singer
        font-size 12px
        color #aaa
    .control
      line-height 40px
      font-size 28px

</style>
