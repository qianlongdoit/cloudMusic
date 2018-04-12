<template>
  <div class="progress">
    <span>{{percent * duration | timeFormatter}}</span>
    <div class="progress-bar" ref="ballWrapper">
      <div class="progress-content">
        <span class="current-progress" :style="{width:percent*100 + '%'}" ref="current"></span>
        <span class="progress-ball" :style="{left: left}" ref="ball"></span>
      </div>
    </div>
    <span>{{duration | timeFormatter}}</span>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data(){
      return {
        ballWidth: 0,
      }
    },
    computed: {
      left(){
        return `calc(${this.percent * 100}% - ${this.ballWidth/2}px)` //calc()内运算符要空格隔开!
      },
      percent(){
        return store.state.playPanel.percent;
      },
      duration(){
        return store.state.playPanel.musicDuration;
      },
      playing(){
        return store.state.playPanel.playing;
      }
    },
    filters: {
      timeFormatter(value){
        var time = new Date(value);
        var m = time.getMinutes();
        var s = time.getSeconds();
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${m}:${s}`
      }
    },
    mounted(){
      //  加载时添加进度条拖拽事件
      var start,
        end,
        intialLeft,
        maxLeft,
        percent;
      var ball = this.$refs.ball;
//      var current = this.$refs.current;
      var ballWrapper = this.$refs.ballWrapper;
      var _this = this;
      this.ballWidth = ball.offsetWidth;

      //  拖拽的时候停止percent进度更新动画
      ballWrapper.addEventListener('touchstart', function (e) {
        store.commit('stopTimer')
        maxLeft = ballWrapper.offsetWidth - ball.offsetWidth / 2;
        start = e.touches[0].clientX;
        intialLeft = ball.offsetLeft;
        var width = start - ballWrapper.offsetLeft;
        if (width < 0) {
          width = 0;
        } else if (width > maxLeft) {
          width = maxLeft;
        }
//        ball.style.left = width - ball.offsetWidth / 2 + 'px';
//        current.style.width = width + 'px';
        percent = width / ballWrapper.offsetWidth;
        store.commit('setPercent', percent)

        ballWrapper.addEventListener('touchmove', drag);
      });

      //  拖拽结束时，1.取消移动监听事件，2.播放拖拽后的播放进度，3.恢复percent更新动画
      ballWrapper.addEventListener('touchend', function () {
        ballWrapper.removeEventListener('touchmove', drag)
        store.commit('setCurrentTime', percent) //设置当前的播放进度
        if(_this.playing){ //如果正在播放状态，恢复动画
          store.dispatch('set_percent')
        }
      });

      function drag(e) {
        end = e.touches[0].clientX;
        var finalLeft = intialLeft + (end - start);
        if (finalLeft < -ball.offsetWidth / 2) {
          finalLeft = -ball.offsetWidth / 2;
        } else if (finalLeft > maxLeft) {
          finalLeft = maxLeft;
        }
//        ball.style.left = finalLeft + 'px';
//        current.style.width = finalLeft + ball.offsetWidth / 2 + 'px';
        percent = (finalLeft + ball.offsetWidth / 2) / ballWrapper.offsetWidth;
        store.commit('setPercent', percent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .progress
    height 6vh
    margin 0 auto
    padding 0 10px
    display flex
    align-items center
    span
      font-size 12px
      width 32px
      text-align center
    .progress-bar
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
          background red
          height 2px
          float left
        .progress-ball
          box-sizing border-box
          border-radius 50%
          border 6px solid #fff
          width 16px
          height 16px
          position absolute
          top -8px
          left -8px
          background red
</style>
