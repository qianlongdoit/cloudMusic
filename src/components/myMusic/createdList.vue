<template>
  <div class="createdList">
    <v-listtile @click.native="toggle" :listInfo="{isHidden}"></v-listtile>
    <div class="musicListWrapper" v-show="isHidden">
      <v-musiclist></v-musiclist>
      <v-musiclist></v-musiclist>
      <v-musiclist></v-musiclist>
      <v-musiclist></v-musiclist>
    </div>
  </div>
</template>

<script>
  import listTitle from './listTitle.vue'
  import musicList from  './musicList.vue'

  export default {
    props:{
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
        isHidden: true
      }
    },
    methods:{
      toggle(){
        this.isHidden = !this.isHidden;
      }
    },
    components: {
      'v-listtile': listTitle,
      'v-musiclist': musicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
