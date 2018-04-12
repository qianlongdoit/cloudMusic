<template>
  <div class="volume">
    <span><i class="icon icon-volume-medium"></i></span>
    <div class="volume-bar" @touchstart.stop="mouseDown($event)"
         @touchmove.stop="touchMove($event)">
      <div class="progress-content" ref="wrapper">

        <span class="current-progress" :style="{width:volume*100 + '%'}"></span>
        <span class="progress-ball" ref="ball" :style="{left: left}"></span>

      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data(){
      return {
        startX: 0,
        ballStartX: 0,
        width: 0,
      }
    },

    computed: {
      left(){
        return `calc(${this.volume * 100}% - ${this.width/2}px)`;
      },
      volume(){
        return store.state.playPanel.volume;
      }
    },
    methods: {
      mouseDown(e){
        let X = e.touches[0].clientX;
        let wrapper = this.$refs.wrapper;
        this.startX = X;
        this.ballStartX = this.$refs.ball.offsetLeft;
        store.commit('setVolume', (X - wrapper.offsetLeft)/wrapper.offsetWidth);
      },
      touchMove(e){
        let X = e.touches[0].clientX - this.startX;
        let ball = this.$refs.ball;
        let wrapper = this.$refs.wrapper;
        let ballLeft = this.ballStartX + X;
        if (ballLeft < -ball.offsetWidth / 2) {
          ballLeft = -ball.offsetWidth / 2
        } else if (ballLeft > wrapper.offsetWidth - ball.offsetWidth / 2) {
          ballLeft = wrapper.offsetWidth - ball.offsetWidth / 2
        }

        store.commit('setVolume', (ballLeft + ball.offsetWidth / 2) / wrapper.offsetWidth)
      }
    },
    mounted(){
      this.width = this.$refs.ball.offsetWidth
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .icon-volume-medium
    font-size 16px
    width 32px
    text-align center

  .volume
    height 5vh
    margin 0 auto
    padding 0 10px
    color #ffffffb3
    display flex
    align-items center
    position fixed
    top 10vh
    left 0
    right 0
    z-index 5
    .volume-bar
      flex 1
      height 2px
      margin 0 12px
      padding 8px 0
      border-radius 1px
      .progress-content
        width 100%
        height 100%
        background #f5f5f54d
        position relative
      .current-progress
        display inline-block
        background #ffffffb3
        height 2px
        float left
      .progress-ball
        box-sizing border-box
        border-radius 50%
        width 10px
        height 10px
        position absolute
        top -5px
        left -5px
        background #fff
</style>
