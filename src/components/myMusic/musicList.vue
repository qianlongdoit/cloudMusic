<template>
  <div class="musicList">
    <img src="../../../static/musiclist/1.jpg" alt="" class="cover">
    <div class="detail">
      <p class="listTitle">我喜欢的音乐</p>
      <i class="down"></i>
      <span class="total">
        {{85}}首
        <b class="downCount">,已下载{{83}}首</b>
      </span>
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
    .cover
      width 60px
      height 60px
    .detail
      display inline-block
      position relative
      width 100%
      span
        font-size 14px
      .listTitle{}
      .down{}
      .status
        position absolute
        top 50%
        right 15px
</style>
