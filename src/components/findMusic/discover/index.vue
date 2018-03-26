<template>
  <div>
    <v-slide></v-slide>
    <div class="recommend">
      <v-option :recInfo="{icon:'icon-fm',text:'私人FM',link:'/fm'}"></v-option>
      <v-option :recInfo="{icon:'icon-date',text:'每日推荐',link:'/daily'}"></v-option>
      <v-option :recInfo="{icon:'icon-list-music',text:'歌单',link:'/musicList'}"></v-option>
      <v-option :recInfo="{icon:'icon-rank-list',text:'排行榜',link:'/musicRank'}"></v-option>
    </div>
    <v-recommendList></v-recommendList>
    <v-monopolyList></v-monopolyList>
    <v-newSong></v-newSong>
    <v-mv></v-mv>
  </div>
</template>

<script>
  import slide from './slide.vue'
  import recommendOption from './recommendOption.vue'
  import recommendList from './recommendList.vue'
  import monopolyList from './monopolyList.vue'
  import newSong from  './newSong.vue'
  import mv from './mv.vue'
  export default {
    components: {
      "v-slide": slide,
      "v-option": recommendOption,
      "v-recommendList": recommendList,
      "v-monopolyList": monopolyList,
      "v-newSong": newSong,
      "v-mv": mv
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    display flex
    justify-content space-around
    border-bottom 1px solid rgba(7,17,27,0.1)
    padding-bottom 20px
</style>
