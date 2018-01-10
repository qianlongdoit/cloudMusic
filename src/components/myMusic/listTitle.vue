<template>
  <div class="listBand" @click="toggle">
    <i class="icon icon-down" :class="[notHidden?'icon-down':'icon-right']"></i>
    <span class="title">
      {{title}}
      <b>({{total}})</b>
    </span>
    <i class="setting icon-setting"></i>
  </div>
</template>

<script>
  export default {
    props: {
      listDetail: {
        notHidden: {
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
//        notHidden: this.listDetail.notHidden,
        title: this.listDetail.title,
        total: this.listDetail.total,
        count: 0
      }
    },
    computed:{
      notHidden(){
        return this.listDetail.notHidden
      }
    },
    methods:{
      toggle(){
//        this.listDetail.notHidden = !this.listDetail.notHidden;
//        console.log(this.listDetail.notHidden)
        this.count++
      }
    },
    mounted(){
      console.log(this.listDetail)
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
