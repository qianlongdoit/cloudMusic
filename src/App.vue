<template>
  <div id="app">
    <!--导航条头部-->
    <v-header></v-header>
    <v-sidebar></v-sidebar>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import sidebar from './components/sideBar/index.vue'

  export default {
    name: 'app',
    components: {
      'v-header': header,
      'v-sidebar': sidebar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../static/css/reset.css";
  @import "./common/stylus/global.styl";
</style>
