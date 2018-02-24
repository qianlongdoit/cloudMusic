<template>
  <div class="login">
    <div class="header">
      <p>
        <i class="icon icon-back" @click="hidden"></i>
        手机号码登录
      </p>
    </div>

    <div class="login-body">
      <div class="input-wrapper">
        <label>
          <i class="icon"></i>
          <input type="number" placeholder="填写手机号">
        </label>
      </div>

      <div class="input-wrapper">
        <label>
          <i class="icon"></i>
          <input type="password" placeholder="请输入密码">
        </label>
      </div>

      <button class="btn-login" type="button" @click="login">登录</button>
    </div>

    <div class="login-bottom">

    </div>
  </div>
</template>

<script>
  import store from '../../store'

  export default{
    methods: {
      hidden(){
        store.commit('hideLoginPage')
      },
      login(){
        this.$http.get('/song/detail?ids=347230')
          .then(res => {
            console.log(res)
          })
          .catch(res => {
            console.log(res)
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/theme.styl"
  .login
    z-index 13
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    .header
      background $themeRed
      p
        color #fff
        font-size 20px
        line-height 60px
        font-weight 400
        .icon
          display inline-block
          line-height 60px
          padding 0 20px

  .login-body
    margin-top 60px
    padding 10px 18px 0
    background #fff
    height 100%
    .input-wrapper
      box-sizing border-box
      border-bottom 1px solid #aaaaaa
      height 30px
      line-height 30px
      font-size 16px
      margin-top 15px
      padding-bottom 10px
      input
        color #000
        height 100%
        outline none
    .btn-login
      font-size 18px
      line-height 24px
      background $themeRed
      color #fff
      padding 10px 0
      margin-top 30px
      border-radius 30px
      border none
      outline none
      width 100%
      &:active
        opacity 0.8
</style>
