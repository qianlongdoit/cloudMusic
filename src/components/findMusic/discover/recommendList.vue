<template>
  <div>
    <v-title :text="{content:'推荐歌单'}"></v-title>
    <div class="cover">
      <div class="item" v-for="(item, index) in itemDetail" @click="showMusicList(item.id)">
        <img :src="item.picUrl" alt="">
        <span>
          <i class="icon icon-erji"></i>
          {{item.playCount > 100000 ? parseInt(item.playCount / 10000) + '万' : parseInt(item.playCount)}}
        </span>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../../global.js'
  import store from '../../../store'
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
    methods: {
      showMusicList(id){
        this.$axios.get(global.serverAddress + '/playlist/detail?id=' + id)
          .then((res) => {
            store.state.playPanel.listDetail = res.data.playlist;
            store.commit('setListDetail', res.data.playlist)
            store.commit('toggleMusicList') //  如果播放有加载中的图片进行占位则不必放在回调内，减少加载时的等待
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    created() {
      this.$axios.get(global.serverAddress + '/personalized')
        .then((res) => {
          this.itemDetail = res.data.result.splice(0, 6);
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
    span
      position absolute
      top 5px
      right 8px
      font-size 12px
      color #ffffff
    p
      overFlow(2, 34px)
</style>
