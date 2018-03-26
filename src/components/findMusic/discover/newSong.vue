<template>
  <div>
    <v-title :text="{content: '最新音乐'}"></v-title>
    <div class="cover">
      <div class="item" v-for="(item, index) in itemDetail">
        <img :src="item.song.album.blurPicUrl" alt="">
        <p>{{item.name}}</p>
        <p>{{item.song.artists[0].name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../../global.js'
  import title from './title.vue'
  export default{
    data(){
      return {
        itemDetail: []
      }
    },
    components: {
      "v-title": title
    },
    created() {
      this.$axios.get(global.serverAddress + '/personalized/newsong')
        .then((res) => {
          this.itemDetail = res.data.result.splice(0, 6)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/base.styl'
  .item
    musicList(33.3%)
    img
      width 100%
    p:last-child
      color #999
      font-size 11px
    p
      overFlower(1, 17px)
</style>
