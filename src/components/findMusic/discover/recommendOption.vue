<template>
  <div>
    <div class="circle">
      <i class="icon" :class="icon"></i>
    </div>
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      recInfo: {
        icon: {
          type: String,
          default: ''
        },
        text: {
          type: String,
          default: ''
        },
        link: {
          type: String,
          default: ''
        },
      }
    },
    data(){
      return {
        icon: this.recInfo.icon,
        text: this.recInfo.text,
        link: this.recInfo.link
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/theme.styl'
  .circle
    text-align center
    padding 20px 0 12px
    .icon
      display inline-block
      border 1px solid $themeRed
      border-radius 50%
      width 50px
      height 50px
      color $themeRed
      font-size 30px
      line-height 50px
  .text
    display inline-block
    width 100%
    text-align center
</style>
