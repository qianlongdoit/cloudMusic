<template>
  <div class="content" ref="myMusic">
    <v-main :menuInfo="{icon:'icon-music',title:'本地音乐',count:629}"></v-main>
    <v-main :menuInfo="{icon:'icon-zuijinplay',title:'最近播放',count:100}"></v-main>
    <v-main :menuInfo="{icon:'icon-download',title:'下载管理',count:611}"></v-main>
    <v-main :menuInfo="{icon:'icon-diantai',title:'我的电台',count:1}"></v-main>
    <v-main :menuInfo="{icon:'icon-collect',title:'我的收藏',count:0}"></v-main>
    <v-createdlist :listInfo="{title:'创建的歌单',list:myList.created}"></v-createdlist>
    <v-createdlist :listInfo="{title:'收藏的歌单',list:myList.favorite}"></v-createdlist>
  </div>
</template>

<script>
  import mainMenu from './mainMenu.vue'
  import createdList from './createdList.vue'

  export default {
    data(){
      return {
        myList: {
          created: [],
          favorite: []
        }
      }
    },
    components: {
      'v-main': mainMenu,
      'v-createdlist': createdList
    },
    created(){
      let myList = this.myList;
      this.$axios.get('../../../static/data/allList.json')
        .then((res) => {
          let result = res.data.playlist;
          result.forEach((v, k) => {
            v.subscribed ? myList.favorite.push(v) : myList.created.push(v);
          });
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
