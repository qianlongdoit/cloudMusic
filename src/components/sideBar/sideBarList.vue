<template>
  <div class="list">
    <i class="icon" :class="sideClass"></i>
    <span class="title">{{sideTitle}}</span>
    <span class="remark" v-show="listDetail.remark">{{sideRemark}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      listDetail: {
        iconClass: {
          type: String,
          default: ''
        },
        title: {
          type: String,
          default: ''
        },
        remark: {
          type: String,
          default: ''
        }
      }
    },
    data(){
      return {
        sideClass: this.listDetail.iconClass,
        sideTitle: this.listDetail.title,
        sideRemark: this.listDetail.remark
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .list
    width 100%
    height 45px
    line-height 45px
    box-sizing border-box
    padding 0 15px
    position relative
    .icon, .title, .remark
      display inline-block
      line-height 40px
      vertical-align middle
    .icon
      font-size 20px
      margin-right 6px
      color #9a9a9a
    .title
      font-size 16px
      color #333
    .remark
      position absolute
      right 15px
      font-weight 400
      font-size 10px
      color #9c9c9c
</style>
