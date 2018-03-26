<template>
  <div class="title">
    <span>{{content}}</span>
    <i class="icon icon-right"></i>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        content:{
          type: String,
          default: ''
        }
      }
    },
    data(){
      return {
        content: this.text.content
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title
    padding 25px 0 20px
    span
      border-left: 3px solid red
      padding-left 10px
    icon
      color #999
</style>
