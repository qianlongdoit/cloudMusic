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
          default: ''
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
    methods:{
      toggle(){
        this.listDetail.notHidden = !this.listDetail.notHidden;
      }
    },
    components: {
      'v-listtile': listTitle,
      'v-musiclist': musicList
    },
    created(){
      this.$axios.get('../../../static/data/allList.json')
        .then((res) => {
          console.log(res.data.playlist)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
