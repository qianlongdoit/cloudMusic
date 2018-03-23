<template>
  <div>
    <div class="wrapper">
      <ul class="slide clearfix">
        <li v-for="img in imgs">
          <a href="#"><img :src="img"></a>
        </li>
      </ul>

      <ul class="focus">
        <li v-for="point in icon"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import autoSlide from "../../assets/js/slide.js"
  export default {
    data(){
      return {
        icon: [
          "../../static/images/slide/1.jpg",
          "../../static/images/slide/2.jpg",
          "../../static/images/slide/3.jpg",
          "../../static/images/slide/4.jpg",
          "../../static/images/slide/5.jpg",
          "../../static/images/slide/6.jpg",
          "../../static/images/slide/7.jpg",
        ],
        imgs: []
      }
    },
    created(){
      this.imgs = JSON.parse(JSON.stringify(this.icon))
    },
    mounted(){
      var oSlide = document.querySelector('.slide');
      var oFocus = document.querySelectorAll('.focus li');
      var width = document.querySelector('.slide img').offsetWidth;
      var data = this.icon;
      this.imgs.push(data[0]);
      this.imgs.unshift(data[data.length - 1]);

      autoSlide.init(oSlide, oFocus, width, 0)
      autoSlide.play();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/global.styl'
  @import "../../common/theme.styl"
  ::before, ::after
    padding 0
    margin 0
    box-sizing border-box
  .clearfix::before, .clearfix::after
    content ""
    display block
    height 0
    line-height 0
    visibility hidden
    clear both
  .wrapper
    width 100%
    min-width 320px
    max-width 750px
    margin 0 auto
    position relative
    overflow hidden
    .slide
      width 1000%
      position relative
      -webkit-transform: translateX(-10%)
      -moz-transform: translateX(-10%)
      -ms-transform: translateX(-10%)
      -o-transform: translateX(-10%)
      transform: translateX(-10%)
      li
        width 10%
        float left
        display inline-block
        a, img
          display block
          width 100%
    .focus
      position absolute
      width 100%
      bottom 6px
      display flex
      justify-content center
      .active
        background $themeRed
      li
        display inline-block
        background #cccccc
        width 8px
        height 8px
        border-radius 50%
        margin 0 5px
</style>
