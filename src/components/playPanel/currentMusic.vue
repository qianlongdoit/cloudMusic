<template>
  <transition name="bottomInOut">
    <div class="current-music" v-show="showCurrentPage">
      <div class="filterBG" :style="{backgroundImage: 'url('+ CD.al.picUrl +')',
       backgroundSize: 'cover',
       backgroundPosition: 'center center'}"></div>

      <div class="current-music-content">
        <div class="header">
          <i class="icon icon-back" @click="hideCurrent"></i>
          <div class="info">
            <p ref="songName" :class="[playing && overFlow?'text-flow':'']">
              {{CD.name}}{{CD.alia.length ? '(' + CD.alia[0] + ')' : ''}}</p>
            <p>
              {{CD.ar | artist}}
              <i class="icon icon-right"></i>
            </p>
          </div>
          <i class="icon icon-share"></i>
        </div>

        <transition name="fade">
          <div class="cd-wrapper" v-show="!showLrc" @click="toggleLrc">
            <div class="needle" :class="[playing? '': 'pause']"></div>

            <div class="cd" ref="cd">
              <div class="cd-cover" ref="CDCover" :class="[playing? 'rotate': '']">
                <div class="cd-bg"></div>
                <img :src="CD.al.picUrl" alt="">
              </div>
            </div>

            <div class="action">
              <i class="icon icon-like"></i>
              <i class="icon icon-download"></i>
              <i class="icon icon-msg"></i>
              <i class="icon icon-list-circle-small"></i>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div>
            <v-soundCtrl></v-soundCtrl>
            <div class="lrc-wrapper" v-if="showLrc" @click="toggleLrc" ref="lrcWrapper">
              <p v-for="(line, index) in lrc" :class="[nowIndex === index?'active':'']"
                 :data-index="line.time">
                {{line.lrc}}
              </p>
            </div>
          </div>
        </transition>

        <div class="content-footer">
          <v-playProgress></v-playProgress>

          <div class="play-ctrl">
            <i class="icon" :class="playModelClass[playModel]" @click="switchModel"></i>
            <i class="icon icon-prevdetail" @click="playPre"></i>
            <i class="icon" :class="[running?'icon-pause-detail':'icon-playdetail']" @click="togglePlaying"></i>
            <i class="icon icon-nextdetail" @click="playNext"></i>
            <i class="icon icon-list-music" @click="showList"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import store from '../../store'
  import playProgress from './playProgress.vue'
  import soundCtrl from './soundCtrl.vue'
  export default {
    data(){
      return {
        overFlow: false,
        playModelClass: ['icon-music-shunxu', 'icon-music-random', 'icon-music-danqu1'],
        isRunning: false,
      }
    },
    computed: {
      flow: {
        get: function () {
          return this.overFlow;
        },
        set: function (value) {
          this.overFlow = value;
        }
      },
      running: {
        get(){
          return this.isRunning;
        },
        set(value){
          this.isRunning = value;
        }
      },
      playing(){
        return store.state.playPanel.playing;
      },
      playModel(){
        return store.state.playPanel.playModel;
      },
      showCurrentPage(){
        return store.state.playPanel.showCurrent
      },
      showLrc(){
        return store.state.playPanel.showLrc;
      },
      lrc(){
        let lrc = store.state.playPanel.lrc.split('\n')
        let newLrc = []
        for (let i = 0; i < lrc.length; i++) {
          let lrc1 = lrc[i].replace(/\[.+\]/, '');
          if (!lrc1) continue;
          let str;
          //  对不支持滚动的歌词的进行处理
          try {
            str = lrc[i].match(/\[.+\]/)[0];
          } catch (e) {
            str = '[99:99.999]';
            if (i === 0) {
              newLrc.push({
                time: 0,
                lrc: '*该歌词不支持自动滚动*'
              })
            }
          }
          let arr = str.slice(1, str.length - 1).split(':');
          let time = arr[0] * 60 + Number(arr[1]);
          newLrc.push({
            time: time,
            lrc: lrc1
          })
        }
        return newLrc;
      },
      nowTime(){
        return store.state.playPanel.percent * store.state.playPanel.musicDuration / 1000;
      },
      nowIndex(){
        return store.state.playPanel.lrcIndex;
      },
      CD(){
        return store.state.playPanel.currentCD
      }
    },
    methods: {
      hideCurrent(){
        store.commit('toggleCurrentMusic')
      },
      togglePlaying(){
        this.running = !this.running;
        if (this.playing) {
          setTimeout(() => {
            store.commit('togglePlay')
          }, 1000)
        } else {
          store.commit('togglePlay')
          //  设置播放的动画
          store.dispatch('set_percent', false)
        }
      },
      toggleLrc(){
        store.commit('toggleLrc')
      },
      switchModel(){
        store.commit('switchModel')
      },
      showList(){
        store.commit('toggleSongList');
      },
      playNext(){
        store.commit('playNext');
        store.dispatch('set_sourceUrl', store.state.playPanel.current)
        store.dispatch('set_percent')
      },
      playPre(){
        store.commit('playNext', false);
        store.dispatch('set_sourceUrl', store.state.playPanel.current)
        store.dispatch('set_percent')
      }

    },
    watch: {
      playing: function (current, old) {
        //  CD播放动画的暂停与重启
        //  旋转时旋转内圈，暂停时把内圈累计的transform赋值给外圈
        if (old) {
          let CDTrans = getComputedStyle(this.$refs.cd).transform;
          let CDCoverTrans = getComputedStyle(this.$refs.CDCover).transform;
          this.$refs.cd.style.transform = CDTrans === 'none' ? CDCoverTrans : CDCoverTrans.concat('', CDTrans)
        }
      },
      showCurrentPage(current, old){
        if (!this.playing) return false;
        var songName = this.$refs.songName;
        var _this = this;
        setTimeout(() => {
          _this.flow = songName.offsetWidth > 287;
        }, 1000);
      },
      nowTime(current, old){
        if (!this.showLrc) return;
        let lrc = this.lrc;
        let pHeight = document.querySelector('.lrc-wrapper p').offsetHeight;
        let i = current - old < 2 ? this.nowIndex : 0;  //如果是顺播放则nowIndex不必从头查找
        for (; i < lrc.length - 1; i++) {
          //  歌词换行显示取0.5s的补正
          if (current >= lrc[i].time - 0.5 && current < lrc[i + 1].time - 0.5) {
            store.commit('setLrcIndex', i)
            break;
          }
        }
        //  对于最后一行歌词的判断
        if (current >= lrc[lrc.length - 1].time - 0.5) {
          store.commit('setLrcIndex', lrc.length - 1)
        }
        this.$refs.lrcWrapper.scrollTop = this.nowIndex * pHeight - 50
      }
    },
    components: {
      "v-playProgress": playProgress,
      'v-soundCtrl': soundCtrl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @keyframes goRotate {
    0% {
      transform: rotate(0)
    }
    50% {
      transform: rotate(180deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .text-flow
    animation scroll 10s linear 2s infinite

  .current-music
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    opacity 1
    background #aaa
    &.bottomInOut-enter-to, &.bottomInOut-leave-to
      transition all 0.4s
    &.bottomInOut-enter, &.bottomInOut-leave-to
      transform translateY(100%)
      opacity 0
    .filterBG
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      filter blur(35px)
      transform scale(1.2)
      z-index 4
    .current-music-content
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      z-index 4
      ::-webkit-scrollbar
        display none
      .header
        display flex
        align-items center
        border-bottom 1px solid #7e8c8d 57
        .icon-back
          color #fff
          flex 0 0 44px
          font-size 24px
          line-height 60px
          height 60px
          text-align center
          vertical-align top
        div
          flex 1 1 auto
          height 100%
          width 287px
          text-overflow clip
          overflow hidden
          white-space: nowrap;
          position relative
          p:first-child
            color #fff
            font-size 18px
            line-height 25px
            position absolute
            top 12px
            left 0
          p:last-child
            color #e8e8e8
            font-size 14px
            height 25px
            line-height 25px
            position absolute
            bottom 0
            left 0
            .icon
              vertical-align middle
        .icon-share
          flex 0 0 44px
          text-align center
          font-size 38px
          color #fff
      .cd-wrapper, .lrc-wrapper
        position absolute
        left 0
        right 0
        bottom 20vh
        &.fade-enter-to, &.fade-leave-to
          transition: opacity 0.3s
        &.fade-enter, &.fade-leave-to
          opacity: 0
      .cd-wrapper
        top 10vh
        overflow hidden
        z-index 4
        .pause
          transform rotateZ(-30deg)
        .needle
          background url("../../../static/img/stick_bg.png")
          background-size cover
          transform-origin 14px 16px
          width 92px
          height 138px
          position absolute
          top -17px
          left 43%
          z-index 5
          transition all .3s ease-in-out .2s
        .cd
          margin 70px auto 0
          position relative
          width 44vh
          height 44vh
          .cd-cover
            margin 0 auto
            width 100%
            height 100%
            &.rotate
              animation goRotate 24s linear infinite .2s
              animation-fill-mode both
            .cd-bg
              width 44vh
              height 44vh
              position absolute
              top 0
              left 50%
              background url("../../../static/img/cd_wrapper.png")
              background-size 100%
              transform translate3d(-50%, 0, 0)
            img
              position absolute
              top 7.5vh
              left 50%
              width 29vh
              height 29vh
              border-radius 50%
              transform translate3d(-50%, 0, 0)
        .action
          display flex
          justify-content space-around
          color #ffffff
          font-size 30px
          position absolute
          bottom 0
          left 50%
          width 75vw
          transform translateX(-50%)
      .lrc-wrapper
        overflow auto
        color #ffffff80
        top 15vh
        p
          font-size 16px
          line-height 7vh
          text-align center
        p:first-child
          margin-top 23vh
        p:last-child
          margin-bottom 23vh
        .active
          color #fff
      .content-footer
        position absolute
        left 0
        bottom 0
        height 18vh
        width 100%
        color #fff
        .play-ctrl
          height 12vh
          display flex
          justify-content space-around
          align-items center
          i
            width 40px
            text-align center
            font-size 32px
</style>
