<template>
  <div class="content" ref="myMusic">
    <v-main :menuInfo="{icon:'icon-music',title:'本地音乐',count:629}"></v-main>
    <v-main :menuInfo="{icon:'icon-zuijinplay',title:'最近播放',count:100}"></v-main>
    <v-main :menuInfo="{icon:'icon-download',title:'下载管理',count:611}"></v-main>
    <v-main :menuInfo="{icon:'icon-diantai',title:'我的电台',count:1}"></v-main>
    <v-main :menuInfo="{icon:'icon-collect',title:'我的收藏',count:0}"></v-main>
    <v-createdlist :listInfo="{tittle:'创建的歌单'}"></v-createdlist>
    <v-createdlist :listInfo="{tittle:'收藏的歌单'}"></v-createdlist>
  </div>
</template>

<script>
  import mainMenu from './mainMenu.vue'
  import createdList from './createdList.vue'

  export default {
    components: {
      'v-main': mainMenu,
      'v-createdlist': createdList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    position fixed
    top 60px
    left 0
    right 0
    overflow auto
    height 100%
    -webkit-overflow-scrolling: touch
    &::-webkit-scrollbar
      display none
      width 0
</style>
