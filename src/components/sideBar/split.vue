<template>
  <div class="split" ref="split"></div>
</template>

<script>
  export default {
    props:{
      splitStyle:{
        height: {
          type: String,
          default: '10'
        },
        background: {
          type: String,
          default: '#f3f5f7'
        },
        border: {
          type: String,
          default: 'transparent'
        }
      }
    },
    mounted(){
      this.$refs.split.style.background = this.splitStyle.background;
      this.$refs.split.style.height = this.splitStyle.height + 'px';
      this.$refs.split.style.borderColor = this.splitStyle.border;
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .split
    display block
    width 100%
    box-sizing border-box
    border-width 1px
    border none
    border-top-width:1px
    border-top-style:solid
    border-bottom-width:1px
    border-bottom-style:solid
</style>
