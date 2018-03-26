<template>
  <div id="app">
    <!--导航条头部-->
    <v-header></v-header>
    <!--侧边栏-->
    <v-sidebar></v-sidebar>
    <!--播放栏-->
    <v-play></v-play>
  </div>
</template>

<script>
  import main from './components/header/main.vue'
  import sidebar from './components/sideBar/index.vue'
  import playPanel from './components/playPanel/index.vue'

  export default {
    name: 'app',
    components: {
      'v-header': main,
      'v-sidebar': sidebar,
      'v-play': playPanel
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../static/css/reset.css";
  @import "./common/stylus/global.styl";
</style>
