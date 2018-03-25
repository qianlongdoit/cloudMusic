<template>
  <div class="content">
    <ul class="nav">
      <li>
        <router-link to="/findMusic/discover"><span>音乐</span></router-link>
      </li>
      <li>
        <router-link to="/findMusic/video"><span>视频</span></router-link>
      </li>
      <li>
        <router-link to="/findMusic/station"><span>电台</span></router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created(){
      this.$router.push({path: '/findMusic/discover'})
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/theme.styl'

  .nav
    display flex
    justify-content center
    .router-link-active
      color $themeRed
      border-bottom solid 2px red
    li
      margin 0 25px
      a
        display inline-block
        padding 10px 18px
        font-size 14px
        color #333
</style>
