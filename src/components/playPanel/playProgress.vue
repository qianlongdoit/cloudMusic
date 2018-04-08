<template>
  <div class="progress">
    <span class="current-time">{{'00:00'}}</span>
    <div class="progress-bar" ref="ballWrapper">
      <span class="current-progress"></span>
      <span class="progress-ball" ref="ball"></span>
    </div>
    <span class="total-time">{{'03:38'}}</span>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    mounted(){
      var start,
        end,
        intialLeft;
      var ball = this.$refs.ball;
      var maxLeft = this.$refs.ballWrapper.offsetWidth - 8;

      ball.addEventListener('touchstart', function (e) {
        start = e.touches[0].clientX;
        intialLeft = ball.offsetLeft;

        ball.addEventListener('touchmove', drag);
      });

      ball.addEventListener('touchend', function () {
        ball.removeEventListener('touchmove', drag)
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
    .current-time
      margin-right 12px
    .progress-bar
      flex 1
      height 2px
      border-radius 1px
      background #f5f5f54d
      position relative
      .current-progress
        color #fff
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
    .total-time
      margin-left 12px
</style>
