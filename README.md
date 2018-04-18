# 网易云音乐Web版
用vue全家桶系列制作的移动端网易云音乐的Web版
计划还原完全部的接口，但项目基于的接口有限，故只实现的有限的页面功能

## 部分效果截图

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 实现功能
### 完成页面：侧边导航页、我的音乐、发现音乐页面、最后是核心播放音乐部分
### 播放音乐
- [x] 播放面板
- [x] 歌单信息，显示选择的歌单介绍信息、创建者，收藏数、评论数、分享数以及歌单所包含的歌曲信息
- [x] 播放列表，显示当前播放的歌曲列表，可以对播放模式的切换、歌曲的删除
- [x] 正在播放的歌曲，播放/暂停、上一曲、下一曲、播放模式切换、歌词与播放动画的切换显示、歌词与播放进度的同步显示（对双语歌词的解析、多个时间标签比如迭句部分歌词解析尚未优化）、歌曲播放进度时间条的显示及拖拽调整、播放音量的控制

### 发现音乐
获取推荐的歌单、独家放送、最新音乐、推荐MV的信息，其中推荐歌单可以点击查看歌单详情和播放音乐
### 我的音乐
读取本地的音乐列表，点击进入播放列表页进行播放

## 


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
