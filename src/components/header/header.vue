<template>
  <div class="main">
    <section class="header">
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
    </section>

    <router-view></router-view>
  </div>
</template>

<script>
  import store from '../../store'

  export default {
    methods: {
      showSideBar(){
        store.commit('showSideBar')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/theme.styl"
  .header
    height 60px
    position fixed
    top 0
    left 0
    right 0
    .header-wrapper
      background $themeRed
      height 100%
      display flex
      align-items center
      justify-content space-between
      i
        color #fff
        font-size 26px
        line-height 60px
        padding 0 15px
      .navbar
        i
          color #ccafaf
        .router-link-active
          i
            color #fff
</style>
