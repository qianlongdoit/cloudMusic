<template>
  <div class="header">
    <div class="header-wrapper">
      <i class="menu icon-menu" @click="showSideBar"></i>

      <div class="navbar">
        <router-link to="/myMusic">
          <i class="music icon-music"></i>
        </router-link>

        <router-link to="/findMusic">
          <i class="music icon-wangyi"></i>
        </router-link>

        <router-link to="/community">
          <i class="music icon-community"></i>
        </router-link>
      </div>

      <i class="search icon-search"></i>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data(){
      return {msg:'Data'}
    },
    methods:mapMutations([
      'showSideBar'
    ])
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/theme.styl"
  .header
    position fixed
    top 0
    left 0
    right 0
    height 60px
    .header-wrapper
      background $themeRed
      height:100%
      display flex
      align-items center
      justify-content space-between
      i
        color #fff
        font-size 26px
        line-height 60px
        padding 10px 15px
      /*.menu*/
      .navbar
        i
          color #ccafaf
        .router-link-active
          i
            color #fff
</style>
