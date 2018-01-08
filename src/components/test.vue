<template>
  <div class="test" v-show="isShow">
    this is test
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
//    data(){
//      return {
//        isShow: false
//      }
//    },
    computed: mapState([
        'isShow'
    ])
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .test
    position fixed
    top 100px
</style>
