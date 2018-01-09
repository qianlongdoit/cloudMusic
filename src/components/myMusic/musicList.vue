<template>
  <div class="musicList">
    <img src="../../../static/musiclist/2.jpg" alt="" class="cover">
    <div class="detail">

      <div class="detailWrapper">
        <p class="listTitle">我喜欢的音乐</p>
        <i class="down"></i>
        <span class="total">
          {{85}}首
          <b class="downCount">,已下载{{83}}首</b>
        </span>
      </div>

      <i class="status icon-list-circle-small"></i>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .musicList
    display flex
    box-sizing border-box
    height 68px
    .cover
      width 60px
      height 60px
      margin 4px 4px
    .detail
      position relative
      width 100%
      height 100%
      margin-left 10px
      border-bottom 1px solid rgba(7,17,27,.1)
      .detailWrapper
        display inline-block
        height 100%
        .listTitle
          font-size 16px
          color #333
          margin 18px 0 5px
        span
          font-size 12px
          color: #666
      .status
        font-size 20px
        line-height 68px
        color #666
        float right
        margin-right 10px
</style>
