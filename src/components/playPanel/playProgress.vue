<template>
  <div class="progress">
    <span>{{percent * duration | timeFormatter}}</span>
    <div class="progress-bar" ref="ballWrapper">
      <div class="progress-content">
        <span class="current-progress" :style="{width:percent*100 + '%'}" ref="current"></span>
        <span class="progress-ball" :style="{left: left}" ref="ball"></span>
      </div>
    </div>
    <span @click="test">{{duration | timeFormatter}}</span>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    computed: {
      left(){
        return `calc(${this.percent * 100}% - 8px)` //calc()内运算符要空格隔开!
      },
      percent(){
        return store.state.playPanel.percent;
      },
      duration(){
        return store.state.playPanel.musicDuration;
      },
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
    methods: {
      test(){
        console.log(this.percent)
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
      var current = this.$refs.current;
      var ballWrapper = this.$refs.ballWrapper;

      ballWrapper.addEventListener('touchstart', function (e) {
        maxLeft = ballWrapper.offsetWidth - ball.offsetWidth / 2;
        start = e.touches[0].clientX;
        intialLeft = ball.offsetLeft;
        var width = start - ballWrapper.offsetLeft;
        if (width < 0) {
          width = 0;
        } else if (width > maxLeft) {
          width = maxLeft;
        }
        ball.style.left = width - ball.offsetWidth / 2 + 'px';
        current.style.width = width + 'px';
        percent = width / ballWrapper.offsetWidth;
        store.commit('setPercent', percent)

        ballWrapper.addEventListener('touchmove', drag);
      });

      //  拖拽结束时，取消移动监听事件，播放拖拽后的播放进度
      ballWrapper.addEventListener('touchend', function () {
        ballWrapper.removeEventListener('touchmove', drag)
        store.commit('setCurrentTime', percent)
      });

      function drag(e) {
        end = e.touches[0].clientX;
        var finalLeft = intialLeft + (end - start);
        if (finalLeft < -ball.offsetWidth / 2) {
          finalLeft = -ball.offsetWidth / 2;
        } else if (finalLeft > maxLeft) {
          finalLeft = maxLeft;
        }
        ball.style.left = finalLeft + 'px';
        current.style.width = finalLeft + ball.offsetWidth / 2 + 'px';
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
