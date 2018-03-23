/**
 * Created by Administrator on 2018/3/23.
 */
/**自动轮播对象
 * 有init, update, touching, play, pause 5个方法
 */
export default {
  timer: 0, //记录定时器id
  W: 0, //记录图片的宽度
  oSlide: null, //轮播图dom对象
  oFocus: null, //轮播图下面的小图标dom对象
  index: 0, //第几个图片处于激活状态
  init: function (img, icon, W, n) {
    this.oSlide = img;
    this.oFocus = icon;
    this.index = n;
    this.W = W;
    var oSlide = this.oSlide,
      _this = this;
    oSlide.style.transform = 'translateX(-' + (this.index + 1) * 10 + '%)';
    this.oFocus[this.index].classList.add('active');

    //到最后一张图片时，把图片拉回到第一张的位置
    oSlide.addEventListener('webkitTransitionEnd', function () {
      if (_this.index === 0) {
        oSlide.style.transition = 'none';
        oSlide.style.transform = 'translateX(-10%)';
      }
    });

    //初始化触摸拖拽事件
    this.touching();
  },
  /**当不指定参数时，自动轮播更新
   * 当指定参数时，按指定的参数进行更新轮播图
   */
  update: function (current, next) {
    var oSlide = this.oSlide,
      oFocus = this.oFocus,
      W = this.W,
      len = oFocus.length;
    if (arguments.length !== 2) {
      oSlide.style.transition = 'all ease-in-out 0.5s';
      //1.移除当前的索引图标的样式样；
      //2.判断索引是否需要回到原点，否则++；
      //3.当前索引值图标亮起，图片切换到下一张
      oFocus[this.index].classList.remove('active');
      oSlide.style.transform = 'translateX(-' + (this.index + 2) * W + 'px)';
      this.index === len - 1 ? this.index = 0 : this.index++;
      oFocus[this.index].classList.add('active');
    } else {
      oSlide.style.transition = 'all ease-in-out 0.2s';
      oFocus[current].classList.remove('active');
      oSlide.style.transform = 'translateX(-' + (next + 1) * W + 'px)';
      this.index = (next + len) % len;
      oFocus[this.index].classList.add('active');
    }
  },
  /**触摸拖拽方法
   * 当触摸时长超过150ms且拖拽距离大于图片宽度1/5时执行拖拽到下一张
   */
  touching: function () {
    var startX = 0,
      distance = 0,
      W = this.W,
      oSlide = this.oSlide,
      _this = this,
      timeStamp;

    oSlide.addEventListener('touchstart', function (e) {
      // e.preventDefault();  //阻止后click事件无法触发
      timeStamp = Date.now();
      _this.pause();
      startX = e.touches[0].clientX;

      oSlide.addEventListener('touchmove', sliding);
    });

    oSlide.addEventListener('touchend', function (e) {
      var current = _this.index,
        next;
      var duration = Date.now() - timeStamp;
      //  若滑动距离大于是图片的1/20且时间间隔大于150ms则认为要滑动，否则将滑动还原
      if (Math.abs(distance) > W / 20 && duration > 150) {
        next = current;
        distance > 0 ? next++ : next--;

        _this.update(current, next);
      } else {
        //    否则回到原来位置
        _this.update(current, current);
      }
      _this.play();

      //  取消事件绑定
      oSlide.removeEventListener('touchmove', sliding);
    });

    //    滑动时的图片的拖拽
    function sliding(e) {
      distance = startX - e.touches[0].clientX;
      var offsetX = (_this.index + 1) * W + distance;

      oSlide.style.transition = 'none';
      oSlide.style.transform = 'translateX(-' + offsetX + 'px)';
    }
  },
  //  自动播放
  play: function () {
    var _this = this;
    _this.timer = setInterval(function () {
      _this.update();
    }, 5000)
  },
  //  暂停自动播放
  pause: function () {
    clearInterval(this.timer);
  }
};
