<template>
  <div class="musicList" @click="showMusicList">
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
  import global from '../../global.js'
  import store from '../../store'
  export default {
    methods:{
      showMusicList(id){
        this.$axios.get(global.serverAddress + '/playlist/detail?id=' + id)
          .then((res) => {
            store.commit('setListDetail', res.data.playlist)
            store.commit('toggleMusicList') //  如果播放有加载中的图片进行占位则不必放在回调内，减少加载时的等待
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .musicList
    display flex
    box-sizing border-box
    height 70px
    background #f3f3f3
    .cover
      width 60px
      height 60px
      margin 5px 5px
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
