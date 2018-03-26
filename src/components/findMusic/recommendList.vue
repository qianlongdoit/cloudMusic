<template>
  <div>
    <v-title :text="{content:'推荐歌单'}"></v-title>
    <div class="cover">
      <div class="item" v-for="(item, index) in itemDetail">
        <img :src="item.picUrl" alt="">
        <span>
          <i class="icon icon-erji"></i>
          {{item.playCount > 100000 ? parseInt(item.playCount/10000) + '万': parseInt(item.playCount)}}
        </span>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../global.js'
  import title from './title.vue'
  export default {
    data(){
      return {
        itemDetail: []
      }
    },
    components: {
      "v-title": title
    },
    created() {
      this.$axios.get(global.serverAddress + '/personalized')
        .then((res) => {
          this.itemDetail = res.data.result.splice(0, 6)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .item
    width 33.3%
    padding 0 2px 2px 0
    box-sizing border-box
    position relative
    display inline-block
    img
      width 100%
    span
      position absolute
      top 5px
      right 8px
      font-size 12px
      color #ffffff
    p
      height 34px
      font-size 12px
      line-height 17px
      margin 5px 10px
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp: 2
      overflow hidden
</style>
