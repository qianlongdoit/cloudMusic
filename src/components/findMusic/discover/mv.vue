<template>
  <div>
    <v-title :text="{content:'推荐MV'}"></v-title>
    <div class="cover">
      <div class="item" v-for="(item, index) in itemDetail">
        <img :src="item.picUrl" alt="">
        <span>
          <i class="icon icon-erji"></i>
          {{item.playCount > 100000 ? parseInt(item.playCount/10000) + '万': parseInt(item.playCount)}}
        </span>
        <p>{{item.name}}</p>
        <p>{{item.artistName}}</p>
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
      this.$axios.get(global.serverAddress + '/personalized/mv')
        .then((res) => {
          this.itemDetail = res.data.result;
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
    musicList(50%)
    img
      width 100%
    span
      position absolute
      top 5px
      right 8px
      font-size 12px
      color #ffffff
    p:last-child
      color #999
      font-size 11px
    p
      overFlower(2, 17px)
</style>
