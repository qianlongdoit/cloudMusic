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
                <span>
                  {{listDetail.playCount > 100000
                  ? parseInt(listDetail.playCount / 10000) + '万'
                  : parseInt(listDetail.playCount)}}
                </span>
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
              <i class="icon icon-playdetail"></i>
              <span>播放全部</span>
              <span>(共{{listDetail.trackCount}}首)</span>
            </div>

            <div class="right-setting">
              <i class="icon icon-list-music"></i>
              <span>多选</span>
            </div>
          </div>

          <ul class="sheet-item">
            <li class="item" v-for="(item, index) in tracks">
              <div class="index">
                <span v-if="id !== item.id">{{index + 1}}</span>
                <i v-if="id === item.id" class="icon icon-volume-medium" style="color: red"></i>
              </div>

              <div class="item-body">
                <div @click="play(index, item.id)">
                  <p class="item-title">
                    {{item.name}}
                    <span v-if="item.alia.length">({{item.alia[0]}})</span></p>
                  <p class="artist">
                    <img src="../../../static/img/sq.png" alt="">
                    <span>{{item.ar | artist}} - {{item.al.name}}</span>
                  </p>
                </div>
                <i class="icon icon-list-circle"></i>
              </div>
            </li>

          </ul>
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
      },
      tracks(){
        return store.state.playPanel.listDetail.tracks;
      },
      id(){
        return store.state.playPanel.id
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
      },
      play(i, id){
        store.commit('setId', id)
        store.dispatch('set_sourceUrl', i);
        store.dispatch('set_percent')
        store.commit('setListId', store.state.playPanel.listDetail.id)
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
  @import "../../common/base.styl"
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
              display inline-block
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
          height 40px
          padding-left 10px
          border-bottom 1px solid #ededed
          box-sizing border-box
          .play, span
            display inline-block
          span
            line-height 40px
            vertical-align bottom
          .icon
            color #000
            font-size 22px
            line-height 40px
            padding 0 8px
          .play span:last-child
            font-size 12px
            color #aaa
          .right-setting
            padding-right 10px
            font-size 12px
            float right
            vertical-align baseline
            .icon
              display inline-block
              font-size 16px
              line-height 40px
              padding 0 0

        .sheet-item
          color #000
        .item
          display flex
          justify-content flex-start
          .index
            text-align center
            span, i
              color #666
              width 50px
              line-height 60px
              display inline-block

          .item-body
            border-bottom 1px solid #ededed
            width calc(100% - 50px)
            div
              display inline-block
              width calc(100% - 60px)
            p
              display inline-block
            .item-title, .artist, span
              width 100%
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .item-title, .item-title span
              font-size 16px
              line-height 35px
              vertical-align middle
              display inline-block
            .item-title span
              color #666
            .artist
              vertical-align baseline
              font-size 12px
              line-height 18px
              img
                display inline-block
                width 14px
                padding 2px 3px
              span
                display inline-block
                width calc(100% - 20px)
            .icon
              float right
              line-height 60px
              margin-right 10px
              font-size 18px
              color #666
</style>
