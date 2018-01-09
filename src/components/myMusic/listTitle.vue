<template>
  <div class="listBand">
    <i class="icon icon-down" :class="[isHidden?'icon-down':'icon-right']"></i>
    <span class="title">
      创建的歌单
      <b>({{22}})</b>
    </span>
    <i class="setting icon-setting"></i>
  </div>
</template>

<script>
  export default {
    props: {
      listInfo: {
        isHidden: {
          type: Boolean,
          default: true
        },
        title:{
          type: String,
          default: '创建的歌单'
        },
        total: {
          type: Number,
          default: 0
        }
      }
    },
    data(){
      return {
        isHidden: this.listInfo.isHidden,
        title: this.listInfo.title,
        total: this.listInfo.total,
      }
    },
    mounted(){
      console.log(this.listInfo)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .listBand
    height 28px
    background #e1e1e1
    .icon, .title, .setting
      line-height 28px
      vertical-align middle
    .icon
      font-size 12px
      margin 0 10px
    .title
      font-size 12px
      color #666666
      b
        color #333333
    .setting
      font-size 20px
      float right
      margin-right 10px
</style>
