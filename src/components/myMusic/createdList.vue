<template>
  <div class="createdList">
    <v-listtile @click.native="toggle" :listDetail="listDetail"></v-listtile>
    <div class="musicListWrapper" v-show="listDetail.notHidden">
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
        listDetail: {
          notHidden: true,
          title: this.listInfo.title,
          total: this.listInfo.total
        }
      }
    },
    computed:{
      notHidden(){
        return this.listDetail.notHidden
      }
    },
    methods:{
      toggle(){
        this.listDetail.notHidden = !this.listDetail.notHidden;
//        console.log(listDetail.notHidden)
      }
    },
    mounted(){
      console.log("now: ",this.listDetail)
    },
    components: {
      'v-listtile': listTitle,
      'v-musiclist': musicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
