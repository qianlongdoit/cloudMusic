<template>
  <div>
    <v-title :text="{content:'独家放送'}"></v-title>
    <div class="cover">
      <div class="item" v-for="item in itemDetail">
        <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../../global.js'
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
      this.$axios.get(global.serverAddress + '/personalized/privatecontent')
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
  .item:last-child
    width 100%
  .item
    musicList(50%)
    img
      width 100%
      height 100%
    p
      overFlower(2, 17px)
</style>
