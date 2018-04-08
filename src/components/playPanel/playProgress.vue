<template>
  <div class="progress">
    <span>{{percent * CD.dt | timeFormatter}}</span>
    <div class="progress-bar" ref="ballWrapper">
      <div class="progress-content">
        <span class="current-progress" ref="current"></span>
        <span class="progress-ball" ref="ball"></span>
      </div>
    </div>
    <span @click="test">{{CD.dt | timeFormatter}}</span>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data(){
      return {
        progress: 0
      }
    },
    computed: {
      percent: {
        get() {
          return this.progress;
        },
        set(value){
          this.progress = value;
        }
      },
      CD(){
        return store.state.playPanel.currentCD;
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
    methods: {
      test(){
        var time = this.CD.dt;
        console.log(new Date(time).getMinutes())
        console.log(new Date(time).getSeconds())
      }
    },
    mounted(){
      //  加载时添加进度条拖拽事件
      var _this = this;
      var start,
        end,
        intialLeft;
      var ball = this.$refs.ball;
      var current = this.$refs.current;
      var ballWrapper = this.$refs.ballWrapper;
      var maxLeft = ballWrapper.offsetWidth - ball.offsetWidth/2;

      ballWrapper.addEventListener('touchstart', function (e) {
        start = e.touches[0].clientX;
        intialLeft = ball.offsetLeft;
        ball.style.left = (start - ballWrapper.offsetLeft) + 'px';
        current.style.width = (start - ballWrapper.offsetLeft) + 'px';
        _this.percent = parseFloat(current.style.width) / maxLeft;
        console.log( _this.percent)

        ballWrapper.addEventListener('touchmove', drag);
      });

      ballWrapper.addEventListener('touchend', function () {
        ballWrapper.removeEventListener('touchmove', drag)
        store.commit('setCurrentProcess', _this.percent)
      });

      function drag(e) {
        end = e.touches[0].clientX;
        var finalLeft = intialLeft + (end - start);
        if (finalLeft < -8) {
          finalLeft = -8;
        } else if (finalLeft > maxLeft) {
          finalLeft = maxLeft;
        }
        ball.style.left = finalLeft + 'px';
        current.style.width = Math.abs(finalLeft) + 'px';
        _this.percent = parseFloat(current.style.width)/maxLeft;
        console.log( _this.percent)
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
