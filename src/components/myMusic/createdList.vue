<template>
  <div class="createdList">
    <div class="listBand" @click.native="toggle">
      <i class="icon" :class="[notHidden?'icon-down':'icon-right']"></i>
      <span class="title">{{title}}<b>({{list.length}})</b></span>
      <i class="setting icon-setting"></i>
    </div>

    <div class="musicListWrapper" v-show="notHidden">
      <div class="musicList" v-for="(item, index) in list" @click="showMusicList(item.id)">
        <img :src="item.coverImgUrl" alt="" class="cover">
        <div class="detail">
          <div class="detailWrapper">
            <p class="listTitle">{{(index ===0 && list.subscribed)?'我喜欢的音乐':item.name}}</p>
            <i class="down"></i>
            <span class="total">{{item.trackCount}}首</span>
          </div>

          <i class="status" :class="[item.id === nowListId?'icon-volume-medium':'icon-list-circle-small']"></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import global from '../../global.js'
  import store from '../../store'

  export default {
    props: {
      listInfo: {
        title: {
          type: String,
          default: ''
        },
        list: {
          type: Array,
          default: []
        }
      }
    },
    data(){
      return {
        list: this.listInfo.list,
        notHidden: true,
        title: this.listInfo.title,
      }
    },
    computed:{
      nowListId(){
        return store.state.playPanel.listId;
      }
    },
    methods: {
      toggle(){
        this.notHidden = !this.notHidden;
      },
      showMusicList(id){
        store.commit('setListId', id)
        this.$axios.get(global.serverAddress + '/playlist/detail?id=' + id)
          .then((res) => {
            store.commit('setListDetail', res.data.playlist)
            store.commit('toggleMusicList') //  如果播放有加载中的图片进行占位则不必放在回调内，减少加载时的等待
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .listBand
    height 28px
    background #e2e2e2
    .icon, .title, .setting
      line-height 28px
      vertical-align middle
    .icon
      font-size 12px
      margin 0 10px
    .title
      font-size 12px
      color #666666
      b
        color #333333
    .setting
      font-size 20px
      float right
      margin-right 10px

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
      border-bottom 1px solid rgba(7, 17, 27, .1)
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
      .icon-volume-medium
        color red
</style>
