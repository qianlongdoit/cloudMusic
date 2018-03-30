<template>
  <transition name="bottomInOut">
    <div class="music-sheet" v-if="showMusicList">
      <div class="header">
        <i class="icon icon-back" @click="hideMusicList"></i>
        <span>歌单</span>
        <div class="search">
          <i class="icon icon-search"></i>
          <i class="icon icon-list-circle"></i>
        </div>
      </div>

      <div class="middle">
        <div class="music-cover-wrapper">
          <div class="music-cover">
            <div class="cover">
              <img :src="listDetail.coverImgUrl" alt="">
              <p>
                <i class="icon icon-erji"></i>
                <span>{{listDetail.playCount > 100000 ? parseInt(listDetail.playCount/10000) + '万': parseInt(listDetail.playCount)}}</span>
              </p>
              <span class="i">i</span>
            </div>

            <div class="desc">
              <p>{{listDetail.name}}</p>
              <div class="creator">
                <img :src="creator.avatarUrl" alt="">
                <span>
              {{creator.nickname}}
              <i class="icon icon-right"></i>
            </span>
              </div>
            </div>
          </div>

          <div class="action">
            <div>
              <i class="icon icon-add"></i>
              <p>{{listDetail.subscribedCount}}</p>
            </div>
            <div>
              <i class="icon icon-msg"></i>
              <p>{{listDetail.commentCount}}</p>
            </div>
            <div>
              <i class="icon icon-share"></i>
              <p>{{listDetail.shareCount}}</p>
            </div>
            <div>
              <i class="icon icon-download"></i>
              <p>下载</p>
            </div>
          </div>
        </div>

        <div class="sheet-item">
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
          <p>倔强-五月天</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import global from '../../global'
  import store from '../../store'
  export default{
    computed: {
      showMusicList(){
        return store.state.playPanel.showMusicList;
      },
      listDetail(){
        return store.state.playPanel.listDetail;
      },
      creator(){
        return store.state.playPanel.listDetail.creator;
      }
    },
    methods: {
      hideMusicList(){
        store.commit('toggleMusicList')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .music-sheet
    position fixed
    top 0
    left 0
    right 0
    bottom 50px
    background #fff
    opacity 1
    &.bottomInOut-enter-to, &.bottomInOut-leave-to
      transition all 0.4s
    &.bottomInOut-enter, &.bottomInOut-leave-to
      transform translateY(100%)
      opacity 0
    .header
      background #333
      .icon, span
        color #fff
        display inline-block
        line-height 60px
        height 60px
        padding 0 10px
        vertical-align middle
      span
        font-size 18px
      .icon
        font-size 24px
      .search
        display inline-block
        float right

    .middle
      position absolute
      top 60px
      width 100%
      height calc(100% - 60px)
      overflow auto
      background #666
      .music-cover-wrapper
        padding 40px 25px 20px
        height 240px
      .music-cover
        display flex
        .cover
          height 150px
          width 150px
          position relative
          p
            font-size 12px
            color #fff
            position absolute
            top 4px
            right 4px
          img
            height 100%
          .i
            display inline-block
            border 1px solid #f0f0f0
            border-radius 50%
            width 16px
            height 16px
            line-height 16px
            background rgba(0,0,0,0.6)
            text-align center
            color #fff
            position absolute
            right 4px
            bottom 4px
        .desc
          box-sizing border-box
          height 150px
          padding 10px 0 20px 15px
          color: #fff
          p
            font-size 15px
            line-height 24px
            margin-bottom 30px
          .creator
            height 30px
            vertical-align middle
            img
              width 30px
              display inline-block
              border-radius 50%
              vertical-align middle
            span
              display inline-block
              height 100%
              line-height 30px
              padding 0 5px
              font-size 12px
              color: #e6e6e6

      .action
        display flex
        justify-content space-around
        margin-top 25px
        div
          text-align center
        i
          font-size 24px
          color #fff
        p
          font-size 12px
          color #e6e6e6
          line-height 18px
      .sheet-item
        width 100%
</style>
