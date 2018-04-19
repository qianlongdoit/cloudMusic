# 网易云音乐Web版
用vue全家桶系列还原移动端的网易云音乐  
网易云音乐不限制调用的接口有限，故只实现的有限的功能  
本项目是为了学习vue创建的，这是学习vue后做的第一个vue项目，也是做的第一个音乐播放播放器。  
数据方面除了`我的歌单`的歌单id使用的本地数据，其他的歌单数据都是通过本地服务器转发获取的网络数据


## 部分效果截图
### 歌曲播放及歌词显示
![](static/images/showdemo/playMusic.gif)
### 推荐歌单
![](static/images/showdemo/recommendMusic.gif)

[点击查看更多演示效果gif图](static/images/showdemo)


## 实现功能
### 完成页面
侧边导航页、我的音乐、发现音乐页面、最后是核心播放音乐部分
### 播放音乐
- [x] 播放面板
- [x] 歌单信息，显示选择的歌单介绍信息、创建者，收藏数、评论数、分享数以及歌单所包含的歌曲信息
- [x] 播放列表，显示当前播放的歌曲列表，可以对播放模式的切换、歌曲的删除
- [x] 正在播放的歌曲，播放/暂停、上一曲、下一曲、播放模式切换、歌词与播放动画的切换显示、歌词与播放进度的同步显示、歌曲播放进度时间条的显示及拖拽调整、播放音量的控制  


### 发现音乐
获取推荐的歌单、独家放送、最新音乐、推荐MV的信息，其中推荐歌单可以点击查看歌单详情和播放音乐
### 我的音乐
读取本地的音乐列表，点击进入播放列表页进行播放

## 工具和技能
`axios`+`vue`+`vue-router`+`vuex`+`stylus`

## 收获
1. 对vue的动画及过渡效果有了个基本的掌握
2. 开拓了对复杂动画编写的思路(如CD转动动画的暂停与恢复)
3. 对模块化、组件化的开发便捷性有了一定的体会
4. 感受到了stylus书写css的便捷性
5. 加深了对vuex的使用和理解，感受到其对状态管理的便捷性
6. 加深了对vue的理解，$refs只有在组件渲染完成后才生成,避免在计算属性或模板中使用

## TODO
1. 添加搜索歌曲的功能
2. 查看歌曲的评论(之前测试接口发现有的歌曲无法获得评论数据，后来测试发现又可以获得，故未完成)
3. 歌词lrc数据中，对双语歌词的解析显示、多个时间标签比如迭句部分歌词解析尚未优化

### 服务端
服务端的转发是使用了[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的api接口
```
# 环境要求
需要 NodeJS 6.0+ 环境

# 服务端安装
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install

# 运行
$ node app.js
```

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
