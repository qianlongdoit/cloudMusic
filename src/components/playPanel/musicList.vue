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
        <div class="background" ref="header"></div>
      </div>

      <div class="middle" @scroll="scrollHandle" ref="middle">
        <div class="music-cover-wrapper" ref="wrapper">
          <div class="music-cover">
            <div class="cover">
              <img :src="listDetail.coverImgUrl" alt="">
              <p>
                <i class="icon icon-erji"></i>
                <span>{{listDetail.playCount > 100000 ? parseInt(listDetail.playCount / 10000) + '万' : parseInt(listDetail.playCount)}}</span>
              </p>
              <span class="i">i</span>
            </div>

            <div class="desc">
              <p>{{listDetail.name}}</p>
              <div class="creator">
                <img :src="creator.avatarUrl" alt="">
                <span>{{creator.nickname}}</span>
                <i class="icon icon-right"></i>
              </div>
            </div>
          </div>

          <div class="action">
            <div>
              <i class="icon icon-add"></i>
              <p>{{listDetail.subscribedCount > 100000
                ? (parseInt(listDetail.subscribedCount / 1000)) / 10 + '万'
                : listDetail.subscribedCount}}</p>
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

        <div class="sheet">
          <div class="sheet-wrapper">
            <div class="play">
              <span><i class="icon icon-playdetail"></i></span>
              <span>播放全部</span>
              <span>(共{{listDetail.trackCount}}首)</span>
            </div>

            <div class="right-setting">
              <i class="icon icon-list-music"></i>
              <span>多选</span>
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
      },
      scrollHandle(){
        let opacity = this.$refs.middle.scrollTop / (this.$refs.wrapper.offsetHeight - this.$refs.header.offsetHeight)
        opacity > 1
          ? (this.$refs.header.style.opacity = 1, this.$refs.header.style.filter = 'alpha(opacity:100)')
          : (this.$refs.header.style.opacity = opacity, this.$refs.header.style.filter = `alpha(opacity:${100})`);
      }
    },
    watch: {
      listDetail(){
        this.$nextTick(() => {
          this.$refs.wrapper.style.backgroundImage = `url(${this.listDetail.coverImgUrl})`
          this.$refs.wrapper.style.backgroundSize = `5800%`
          this.$refs.wrapper.style.backgroundPosition = `center center`
          this.$refs.header.style.backgroundImage = `url(${this.listDetail.coverImgUrl})`
          this.$refs.header.style.backgroundSize = `5800%`
          this.$refs.header.style.backgroundPosition = `center top`
          this.$refs.header.style.opacity = 0
        })
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
      z-index 1
      position relative
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
      .background
        position absolute
        top 0
        left 0
        height 100%
        width 100%
        z-index -1

    .middle
      position absolute
      top 0
      width 100%
      height 100%
      overflow auto
      background #f9f9f9
      .music-cover-wrapper
        padding 90px 25px 10px
        height 220px
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
            background rgba(0, 0, 0, 0.6)
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
            vertical-align baseline
            img
              width 30px
              display inline-block
              border-radius 50%
            span
              display inline-block
              height 100%
              max-width 95px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              line-height 30px
              padding 0 5px
              font-size 12px
              color: #e6e6e6
            .icon
              line-height 30px
              vertical-align top

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
      .sheet
        width 100%
        .sheet-wrapper
          .play
            display inline-block
            line-height 20px
            span:first-child
              color #000
            span:last-child
              font-size 14px
          .right-setting
            font-size 14px
            float right

        .sheet-item
          color #000
</style>
