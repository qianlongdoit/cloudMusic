<template>
  <div class="sidebar">
    <transition name="mask">
      <div class="sidebar-mask" v-show="isShow" @click="hideSideBar"></div>
    </transition>

    <transition name="fade">
      <div class="side-content" v-show="isShow">
        <div class="bg-img" :style="{backgroundImage:'url(../../../static/images/bg.jpg)'}"></div>

        <div class="userInfo">
          <!--登录状态-->
          <div class="logined" v-show="isLogin">
            <img class="avatar" src="../../../static/images/userlogo.jpg" alt="头像">
            <p class="detail">
              <span class="name">gofor</span>
              <img class="vip-ico" src="../../../static/images/vip.png" alt="会员">
              <i class="level">LV.9</i>
            </p>
            <span class="sign">
            <a href="">
              签到
              <span class="icon-right" v-show="false"></span>
            </a>
          </span>
          </div>

          <!--未登录状态-->
          <div class="unlogin" v-show="!isLogin">
            <p class="tips">登录网易云音乐</p>
            <p class="tips">320K高音质无限下载，手机电脑多端同步</p>
            <button class="btn-login" type="button" @click="turnToLogin">
              立即登录
            </button>
          </div>
        </div>

        <div class="list-wrapper">
          <v-sidelist :listDetail="{iconClass:'icon-message',title:'我的消息'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-vip',title:'我的会员',remark:'2019.01.07到期'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-market',title:'商城'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-date',title:'在线听歌免流量'}"></v-sidelist>
          <v-split :splitStyle="{background:'#f0f0f0',height:'5',border:'#eee'}"></v-split>
          <v-sidelist :listDetail="{iconClass:'icon-friend',title:'我的好友'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-place',title:'附近的人'}"></v-sidelist>
          <v-split :splitStyle="{background:'#f0f0f0',height:'5',border:'#eee'}"></v-split>
          <v-sidelist :listDetail="{iconClass:'icon-theme',title:'个性换肤',remark:'官方红'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-mic',title:'听歌识曲'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-set-time',title:'定时停止播放'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-scan',title:'扫一扫'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-lock',title:'音乐闹钟'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-car',title:'驾驶模式'}"></v-sidelist>
          <v-sidelist :listDetail="{iconClass:'icon-cloud',title:'音乐云盘'}"></v-sidelist>
        </div>

        <div class="settings">
          <div class="item">
            <i class="icon icon-night"></i>
            <span class="title">夜间模式</span>
          </div><div class="item">
            <i class="icon icon-setting"></i>
            <span class="title">设置</span>
          </div><div class="item">
            <i class="icon icon-exit"></i>
            <span class="title">退出</span>
          </div>
        </div>
      </div>
    </transition>

    <!--登录界面-->
    <v-login v-show="showLoginPage"></v-login>
  </div>
</template>

<script>
  import store from '../../store'
  import sideBarList from './sideBarList.vue'
  import split from './split.vue'
  import login from '../login/index.vue'

  export default {
      data() {
          return {
            isLogin: false
          }
      },
    computed: {
      isShow(){
        return store.state.sideBar.isShow
      },
      showLoginPage(){
        return store.state.sideBar.showLoginPage
      }
    },
    methods: {
      hideSideBar(){
        store.commit('hideSideBar')
      },
      turnToLogin(){
          store.commit('showLoginPage')
      }
    },
    components: {
      'v-sidelist': sideBarList,
      'v-split': split,
      'v-login': login
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/base.styl'
  .sidebar
    .sidebar-mask
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      opacity 1
      z-index 10
      background rgba(0, 0, 0, 0.5)
      &.mask-enter-to, &.mask-leave-to
        transition opacity 0.3s
      &.mask-enter, &.mask-leave-to
        opacity 0
    .side-content
      position fixed
      top: 0
      bottom 0
      left: 0
      right: 0
      width 286px
      height 100%
      overflow auto
      background #fff
      z-index 11
      -webkit-overflow-scrolling: touch
      &::-webkit-scrollbar
        display none
        width 0
      &.fade-enter-to, &.fade-leave-to
        transition: transform 0.4s
      &.fade-enter, &.fade-leave-to
        transform: translate3d(-286px, 0, 0)
      .bg-img
        height 200px
        width 100%
        position absolute
        top 0
        filter blur(1px)
        opacity 0.8
      .userInfo
        height 200px
        width 100%
        padding: 50px 15px 15px
        box-sizing border-box
        position relative
        backgroundSize cover
        .unlogin
          width 100%
          margin 0 auto
          text-align center
          padding-top 20px
        .tips
          font-size 13px
          line-height 20px
          color #e8e8e8
        .btn-login
          font-size 16px
          line-height 24px
          background none
          color #fff
          padding 2px 40px
          margin-top 15px
          border 1px solid #cccccc
          border-radius 15px
          outline none
          &:active
            background $link_acitve
        .avatar
          width 80px
          height 80px
          border-radius 50%
          position absolute
          left 15px
          bottom 50px
        .detail
          position absolute
          bottom 15px
          left 15px
          font-size 0
          color #fff
          .name
            display inline-block
            font-size 16px
            line-height 24px
            font-weight 500
            max-width 130px
            vertical-align middle
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
          .vip-ico
            width 14px
            height 14px
            vertical-align middle
            margin-left 6px
          .level
            font-size 8px
            vertical-align middle
            margin-left 6px
            border 1px solid #fff
            padding 1px 6px 1px 4px
            border-radius 8px
        .sign
          position absolute
          bottom 15px
          right 15px
          border 1px solid #e1e1e1
          border-radius 12px
          padding 4px 8px
          font-size 12px
          a
            color #fff
          span
            vertical-align middle
            font-size 9px
            line-height 12px
      .settings
        position fixed
        bottom 0
        height 40px
        width 286px
        z-index 12
        border-top 1px solid #f0f0f0
        background #fff
        .item
          box-sizing border-box
          text-align center
          display inline-block
          width 30%
          &:first-child
            width 40%
          .title,.icon
            line-height 40px
            vertical-align middle
          .title
            font-size 16px
            color #333
          .icon
            font-size 20px
            color #666666
</style>
