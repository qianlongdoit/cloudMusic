<template>
  <div class="mainMenu">
    <i class="icon" :class="icon"></i>
    <div class="menuWrapper">
      <span class="title">{{title}}</span>
      <span class="count">({{count}})</span>
      <p class="border_1px"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      menuInfo: {
        icon: {
          type: String,
          default: ''
        },
        title:{
          type: String,
          default: ''
        },
        count:{
          type: Number,
          default: 0
        }
      }
    },
    data(){
      return {
        icon: this.menuInfo.icon,
        title: this.menuInfo.title,
        count: this.menuInfo.count
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/theme.styl"
  @import "../../common/base.styl"
  .mainMenu
    height 55px
    position relative
    background #f3f3f3
    .icon,.title,.count
      line-height 55px
      vertical-align middle
    .icon
      position absolute
      top 0
      left 0
      font-size 24px
      margin 0 15px
      color $themeRed
    .menuWrapper
      display inline-block
      margin-left 60px
      width 100%
    .title
      font-size 16px
    .count
      font-size 12px
      color: #aaa
    .border_1px
      border_1px(rgba(7,17,27,.1))
</style>
