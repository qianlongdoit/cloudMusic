<template>
  <div class="createdList">
    <v-listtile></v-listtile>
    <v-musiclist></v-musiclist>
  </div>
</template>

<script>
  import listTitle from './listTitle.vue'
  import musicList from  './musicList.vue'

  export default {
    components: {
      'v-listtile': listTitle,
      'v-musiclist': musicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
