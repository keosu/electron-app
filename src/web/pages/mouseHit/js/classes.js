var DOM = {
  /**
   * 根据id获取元素
   * @param {String} id
   */
  get: function (id) {
    return document.getElementById(id);
  },
  /**
   * 获取元素的CSS样式值
   * @param {DOM Object} element
   * @param {String} name
   */
  getStyleValue: function (element, name) {
    if (element.currentStyle) {
      return element.currentStyle[name];
    } else {
      var style = document.defaultView.getComputedStyle(element, null);
      return style[name];
    }
  },
  /**
   * 隐藏元素
   * @param {DOM Object} element
   */
  hide: function (element) {
    element.style.display = 'none';
  },
  /**
   * 显示元素
   * @param {DOM Object} element
   */
  show: function (element) {
    element.style.display = 'block';
  },
  /**
   * 删除元素
   * @param {DOM Object} element
   */
  remove: function (element) {
    element.parentNode.removeChild(element);
  },
  /**
   * 检查元素是否具有某个class样式
   * @param {DOM Object} element
   * @param {String} className
   */
  hasClass: function (element, className) {
    var names = element.className.split(/\s+/);
    for (var i = 0; i < names.length; i++) {
      if (names[i] == className) {
        return true;
      }
    }
    return false;
  },
  /**
   * 为元素添加class样式
   * @param {DOM Object} element
   * @param {String} className
   */
  addClass: function (element, className) {
    if (!this.hasClass(element, className)) {
      element.className += ' ' + className;
    }
  },
  /**
   * 从元素上移除class样式
   * @param {DOM Object} element
   * @param {String} className
   */
  removeClass: function (element, className) {
    if (this.hasClass(element, className)) {
      var names = element.className.split(/\s+/), newClassName = [];
      for (var i = 0; i < names.length; i++) {
        if (names[i] != className) {
          newClassName.push(names[i]);
        }
      }
      element.className = newClassName.join(' ');
    }
  }
};

function random(min, max) {
  return Math.floor((max - min + 1) * Math.random()) + min;
}

/**
   * 通过闭包实现的事件代理
   * @param {Function} func
   * @param {Object} scope
   */
function delegate(func, scope) {
  scope = scope || window;

  if (arguments.length > 2) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function () {
      return func.apply(scope, args);
    }
  } else {
    return function () {
      return func.call(scope);
    }
  }
}
/**
 * 音频资源列表
 */
function getAudioRes() {
  return [{
    id: 'begin_music',
    src: 'audio/begin_music'
  }, {
    id: 'second_music',
    src: 'audio/second_music'
  }, {
    id: 'game_music',
    src: 'audio/game_music',
    loop: true
  }, {
    id: 'game_pass',
    src: 'audio/game_pass'
  }, {
    id: 'no_hit',
    src: 'audio/no_hit'
  }, {
    id: 'over_music',
    src: 'audio/over_music'
  }];
}
/**
 * 图像资源列表
 */
function getImageRes() {
  return [{
    id: 'hammer',
    src: 'images/hammer.png'
  }, {
    id: "bg_hole",
    src: "images/bg_canvas.png"
  }, {
    id: "bg_holeHide",
    src: "images/bg_hole.png"
  }, {
    id: "mouse",
    src: "images/mouse.png"
  }, {
    id: "help",
    src: "images/help.png"
  }, {
    id: "star",
    src: "images/star.png"
  }, {
    id: "icon",
    src: "images/icon.png"
  }, {
    id: "time_roller",
    src: "images/time_roller.png"
  }];
}

/**
 * 星星动画帧
 */
var getStarFrames = (function () {

  var frames = {
    star: [{
      x: 0,
      y: 0
    }, {
      x: 111,
      y: 0
    }, {
      x: 236,
      y: 0
    }, {
      x: 375,
      y: 0
    }, {
      x: 0,
      y: 72
    }, {
      x: 111,
      y: 72
    }, {
      x: 236,
      y: 72
    }, {
      x: 375,
      y: 72
    }, {
      x: 0,
      y: 144
    }, {
      x: 111,
      y: 144
    }, {
      x: 236,
      y: 144
    }, {
      x: 375,
      y: 144
    }, {
    }]
  }

  /**
   * @param {String} animName
   */
  return function (animName) {
    return frames[animName];
  }
})();

/**
 * 分数帧
 */
var getScoreFrames = (function () {

  var frames = {
    score: [{
      x: 5,                       //+500
      y: 0
    }, {                             //x/2
      x: 111,
      y: 0
    }, {                             //-100
      x: 207,
      y: 0
    }, {                             //+100
      x: 322,
      y: 0
    }, {                              //+20%
      x: 5,
      y: 65
    }]
  }

  /**
   * @param {String} animName
   */
  return function (animName) {
    return frames[animName];
  }
})();

/**
 * 地鼠动画帧
 */
var getMouseFrames = (function () {

  var frames = {
    mouse1: [{
      x: 14,
      y: 9
    }, {
      x: 145,
      y: 9
    }, {
      x: 284,
      y: 9
    }, {
      x: 415,
      y: 9
    }],
    mouse2: [{
      x: 14,
      y: 126
    }, {
      x: 145,
      y: 126
    }, {
      x: 284,
      y: 126
    }, {
      x: 415,
      y: 126
    }],
    mouse3: [{
      x: 14,
      y: 239
    }, {
      x: 145,
      y: 239
    }, {
      x: 284,
      y: 239
    }, {
      x: 415,
      y: 239
    }],
    mouse4: [{
      x: 14,
      y: 348
    }, {
      x: 145,
      y: 348
    }, {
      x: 284,
      y: 348
    }, {
      x: 415,
      y: 348
    }],
    mouse5: [{
      x: 14,
      y: 467
    }, {
      x: 145,
      y: 467
    }, {
      x: 284,
      y: 467
    }, {
      x: 418,
      y: 467
    }]
  }

  /**
   * @param {String} animName
   */
  return function (animName) {
    return frames[animName];
  }
})();

var ImageManager = {
  /**
   * @private
   */
  __loadList: {},
  /**
   * @private
   */
  __loadImage: function (item, callback) {
    var image = new Image();
    image.onload = function () {
      ImageManager.__loadList[item.id] = image;
      callback();
    }
    image.src = item.src;
  },
  /**
   * 加载图片资源
   * @param {Array} images @format {id: '', src: ''}
   * @param {Function} statechange
   */
  load: function (images, statechange, __index) {
    __index = __index || 0;
    if (images[__index]) {
      ImageManager.__loadImage(images[__index], function () {
        ImageManager.load(images, statechange, __index + 1);
      });
    }
    statechange(__index);
  },
  /**
   * 获取已加载的Image对象
   * @param {String} id
   */
  get: function (id) {
    return this.__loadList[id];
  }
};



class Animation {

  constructor() {
    /**
     * 动画图片
     */
    this.img = null;
    /**
     * 帧列表
     * @format {
     *     x: 0,
     *     y: 0,
     *     duration: 0,
     *     collRect: [[left, top, width, height]]
     * }
     */
    this.frames = [];
    /**
     * 循环播放
     */
    this.loop = true;
    /**
     * 播放倍速
     */
    this.speed = 1;
    /**
     * @read only
     * 播放状态
     */
    this.playing = false;
    /**
     * @read only
     * 正在播放的帧索引(第一帧从0开始)
     */
    this.currentFrameIndex = 0;
    /**
     * @read only
     * 正在播放的帧对象
     */
    this.currentFrame = null;
    /**
     * @private
     * 当前帧已播放次数
     */
    this.currentPlayeTimes = 0; //在Animation内部自定义这样，是为了让对象自控制自己的帧变换，间接影响这个数值快慢就是刷新canvas速率的快慢
    /**
     * 多少次界面刷新更换一帧
     */
    this.maxPlayTimes = 4;

  }

  init(imageName, getFrameMethod, framesName) {
    this.img = ImageManager.get(imageName);
    this.frames = getFrameMethod(framesName);
    this.currentFrameIndex = 0;
    this.currentFrame = this.frames[this.currentFrameIndex];
    this.currentFramePlayed = 0;
  }
  update() {
    if (this.currentPlayeTimes >= this.maxPlayTimes) {
      if (this.currentFrameIndex >= this.frames.length - 2) {
        this.currentFrameIndex = 0;
      } else {
        this.currentFrameIndex++;
      }
      this.currentFrame = this.frames[this.currentFrameIndex];
      this.currentPlayeTimes = 0;
    } else {
      this.currentPlayeTimes++;
    }
  }

  draw(ct, x, y, w, h) {
    var f = this.currentFrame;
    ct.drawImage(this.img, f.x, f.y, w, h, x, y, w, h);
  }
}

class Audio {
  constructor() { }
  /**
   * 静音模式
   */
  static mute = false;
  /**
   * buzz group对象
   */
  static buzzGroup = null;
  /**
   * 音频列表
   */
  static list = {};
  /**
   * 播放音乐
   * @param {Number} id
   * @param {Boolean} resumePlay
   */
  static play(id, resumePlay) {
    if (this.list[id] && !this.mute) {
      if (!resumePlay) {
        this.list[id].setTime(0);
      }
      this.list[id].play();
    }
  }
  /**
   * 暂停播放
   * @param {Number} id
   */
  static pause(id) {
    this.list[id].pause();
  }
  /**
   * 暂停所有音频
   */
  pauseAll() {
    buzz.all().pause();
  }
}

class Hammer {
  constructor() {
    //锤子position
    this.x = 150;
    this.y = 150;
    // 设置锤子大小
    this.width = 98;
    this.height = 77;
    this.image = ImageManager.get('hammer');

  }
  draw(context, isPress) {

    if (isPress) {
      context.save();
      context.translate(this.x - 30, this.y + 44);
      context.rotate(Math.PI / 180 * 330);
      context.drawImage(this.image, 0, 0, this.width, this.height);
      context.restore();
    } else {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

  }
}

class Mouse {
  constructor() {
    this.x;
    this.y;
    this.width = 130;
    this.height;

    /**
    * 最终的y位置,因为为了实现地鼠向上冒的效果
    */
    this.finalY;
    this.finalHeight;
    /**
    * 精灵状态， show和hide，show就包括normal和dead
    */
    this.state = 'hide';
    this.up = 1; //向上飘
    this.duration = 3;//刷新一次向上飘的像素
    this.disppearDuration = 56;//'dead'状态下消失计数
    this.anim;


  }
  init(mouseName, x, y, finalHeight) {
    var anim = new Animation();
    anim.init('mouse', getMouseFrames, mouseName);
    this.anim = anim;
    this.x = x;
    this.finalY = y;
    this.finalHeight = finalHeight;
    this.y = this.finalY + this.finalHeight;
    this.height = 0;
  }

  reprepare(self, existMatrix, i, j) {  //传入i,j和存在矩阵，为了重置
    self.state = 'hide';
    self.up = 1;
    self.height = 0;
    self.y = this.finalY + this.finalHeight;
    self.disppearDuration = 56;
    existMatrix[i][j] = 0;
  }


  draw(context, existMatrix, i, j) {

    var self = this;
    if (this.state == 'normal') {
      if (this.up == 1 && this.y > this.finalY) {
        this.y -= this.duration;
        this.height += this.duration;
      } else {
        this.up = 0;
        this.y += this.duration;
        this.height -= this.duration;
      }
      if (this.height < 0) {
        this.reprepare(this, existMatrix, i, j);
      } else {
        self.anim.update();
        self.anim.draw(context, this.x, this.y, this.width, this.height);
      }
    }
    else if (this.state == 'dead') {
      self.anim.currentFrame = self.anim.frames[3];
      self.anim.draw(context, this.x, this.y, this.width, this.height);
      self.disppearDuration--;
      if (self.disppearDuration == 0) {
        self.reprepare(self, existMatrix, i, j);
      }
    }
  }
}


class MouseHit {
  constructor() {

    /**
     * 锤子
     */
    this.hammer = null;

    /**
    * 地鼠,有5种
    */
    this.mouse0 = [];
    this.mouse1 = [];
    this.mouse2 = [];
    this.mouse3 = [];
    this.mouse4 = [];
    /**
     * 地鼠初始化x轴位置
     */
    this.mouseX = [
      [130, 322, 516],
      [106, 322, 522],
      [97, 322, 544]
    ];
    /**
       * 地鼠初始化y轴位置
       */
    this.mouseY = [170, 262, 362];
    this.mouseType = [106];
    //存在矩阵,表示在那个坑存在地鼠
    this.existMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    /**
    * 星星
    */
    this.star = [];
    /**
      * 分数帧类
      */
    this.scoreObject = [];

    /**
     * UI对象
     */
    this.ui = null;

    /**
     * 预备时间
     */
    this.readyTime = 0;

    /**
     * 是否即将开始
     */
    this.isGo = false;
    /**
     * canvas上下文
     */
    this.canvas;
    this.context;
    // 地鼠洞
    this.bg_hole;
    // 地鼠洞遮掩
    this.bg_holeHide;
    //准备3,2,1数字，Game over
    this.startNumber = ImageManager.get('icon');
    //计时条
    this.timeRoller = ImageManager.get('time_roller');
    //计时数，不打算用一个新的setInterval来做 
    this.timeCaculator = 0;
    //第几关，初始是第一关
    this.dijiguan = 1;
    //每关过关分数,第一默认为2000		
    this.requireScore = 2000;
    this.readyInterval;
    this.drawMouseInterval;
    this.drawCanvasInterval;
  }

  /**
  * @private
  * 创建锤子
  */
  __createHammer() {
    var hammer = new Hammer();
    this.hammer = hammer;
  }

  /**
  * @private
  * 创建分数对象
  */
  __createScoreObject() {
    for (let i = 0; i < 3; i++) {
      var arr = [];
      for (let j = 0; j < 3; j++) {
        var score = new Score();
        arr[j] = score;
      }
      this.scoreObject[i] = arr;
    }
  }

  /**
  * @private
  * 创建地鼠 
  */
  __createMouse() {

    for (let i = 0; i < 3; i++) {
      var arr = [], arr1 = [], arr2 = [], arr3 = [], arr4 = [];
      for (let j = 0; j < 3; j++) {
        var mouse0 = new Mouse(), mouse1 = new Mouse(), mouse2 = new Mouse(), mouse3 = new Mouse(), mouse4 = new Mouse();
        mouse0.init('mouse1', this.mouseX[i][j], this.mouseY[i], 106);
        mouse1.init('mouse2', this.mouseX[i][j], this.mouseY[i], 106);
        mouse2.init('mouse3', this.mouseX[i][j], this.mouseY[i], 106);
        mouse3.init('mouse4', this.mouseX[i][j], this.mouseY[i] - 12, 120);
        mouse4.init('mouse5', this.mouseX[i][j], this.mouseY[i] - 25, 130);
        arr[j] = mouse0, arr1[j] = mouse1, arr2[j] = mouse2, arr3[j] = mouse3, arr4[j] = mouse4;
      }
      this.mouse0[i] = arr, this.mouse1[i] = arr1, this.mouse2[i] = arr2, this.mouse3[i] = arr3, this.mouse4[i] = arr4;
    }
  }
  /**
  * @private
  * 创建星星
  */
  __createStar() {

    for (let i = 0; i < 3; i++) {
      var arr = [];
      for (let j = 0; j < 3; j++) {
        var star = new Star();
        star.init(this.mouseX[i][j] + 10, this.mouseY[i]); // y轴不是必要的，到时碰撞时会重置
        arr[j] = star;
      }
      this.star[i] = arr;
    }
  }
  /**
  * @private
  * 创建场景
  */
  __createScene() {
    // 地鼠洞
    this.bg_hole = {
      image: ImageManager.get('bg_hole'),
      width: 750,
      height: 550
    };

    // 地鼠洞遮掩
    this.bg_holeHide = {
      image: ImageManager.get('bg_holeHide'),
      width: 750,
      height: 550
    };

  }
  /**
  * 创建UI对象
  */
  __createUI() {
    var ui = new UI(), MouseHit = this;
    ui.init();

    ui.onretry = function () {
      //Audio.play('ogg_background');

      this.toBody();
      MouseHit.stateInit();
    }
    this.ui = ui;
    this.ui.hammer = this.hammer;
    this.ui.mouse0 = this.mouse0;
    this.ui.mouse1 = this.mouse1;
    this.ui.mouse2 = this.mouse2;
    this.ui.mouse3 = this.mouse3;
    this.ui.mouse4 = this.mouse4;
    this.ui.star = this.star;
    this.ui.scoreObject = this.scoreObject;
    this.ui.existMatrix = this.existMatrix;

  }
  /**
  * 初始化游戏
  */
  init() {
    this.__createScoreObject();
    this.__createHammer();
    this.__createMouse();
    this.__createStar();
    this.__createScene();
    this.__createUI();
    this.canvas = DOM.get('maincanvas');
    this.context = this.canvas.getContext('2d');
  }


  /**
  * 预备状态
  * @return {Boolean} 返回预备状态是否完毕
  */
  ready(self, index) {

    self.__drawReadyScreen(self);
    switch (index) {

      case 0: self.context.drawImage(self.startNumber, 449, 296, 51, 87, 360, 300, 51, 87); Audio.play('begin_music'); break;    //绘制3
      case 1: self.context.drawImage(self.startNumber, 390, 296, 54, 87, 360, 300, 54, 87); Audio.play('begin_music'); break;    //绘制2
      case 2: self.context.drawImage(self.startNumber, 329, 296, 52, 87, 360, 300, 52, 87); Audio.play('begin_music'); break;    //绘制1
      case 3: self.context.drawImage(self.startNumber, 15, 296, 293, 87, 245, 300, 293, 87); Audio.play('second_music'); break;   //绘制start
      case 4: clearInterval(this.readyInterval); //清除此Interval事件
        self.ui.btnPauseVisible(true);
        self.__setIntervalFunc(self);  //启动setInterval事件  
    }

  }
  /**
  *预备状态下背景绘制
  */
  __drawReadyScreen(self) {
    self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
    self.context.drawImage(self.bg_hole.image, 0, 0, self.bg_hole.width, self.bg_hole.height);
  }
  /**
  *计时条绘制
  *passPix 过去像素
  */
  __drawTimeRoller(self, passPix) {
    self.context.drawImage(self.timeRoller, 0, 80, 373, 68, 183, 149, 220, 40);
    self.context.drawImage(self.timeRoller, 0, 152, 373 - passPix, 40, 182 + passPix, 163, 220 - passPix, 25);
    self.context.drawImage(self.timeRoller, 0, 0, 373, 80, 183, 143, 220, 51);
  }
  /**
  * 游戏主体在这里设置setInterval事件
  */
  __setIntervalFunc(self) {
    this.drawCanvasInterval = setInterval(function () {
      self.drawScreen(self);
      self.__checkIsPass(self);   //关卡判断，最后阶段加的，就丢在这里
    }, 30);
    this.drawMouseInterval = setInterval(function () {
      self.randomSelectMouse(self);
    }, 2000);

  }
  /**
  * 关卡判断
  */
  __checkIsPass(self) {

    if (self.timeCaculator > 2100) {             //关卡时间到
      clearInterval(self.drawCanvasInterval);//不再
      clearInterval(self.drawMouseInterval);//不再随机产生地鼠
      self.timeCaculator = 0;
      if (self.ui.score >= self.requireScore) {    //过关
        self.requireScore += 400;              //每关加200
        DOM.get('currentScore').innerHTML = ~~self.ui.score;
        DOM.get('requireScore').innerHTML = ~~self.requireScore;
        DOM.show(DOM.get('nextLoding')); //下一关界面放这里
        self.dijiguan++;
        self.ui.score = 0;
        self.ui.setNumber(0);
        Audio.play('game_pass');
        //重新设置		
      } else {                             //不过关
        self.requireScore = 2000;
        self.dijiguan = 1;
        self.ui.toOver();//失败界面
        DOM.get('score').innerHTML = "你的得分：" + ~~self.ui.score;
        self.ui.score = 0;
        Audio.play('over_music');
      }

    } else {
      self.__drawTimeRoller(self, self.timeCaculator / 10); //绘制计时条
      self.timeCaculator++;
    }

  }
  /**
  * 随机显现地鼠
  */
  randomSelectMouse(self) {
    var createNum = random(1, 2);
    for (var i = 1; i <= createNum; i++) {
      var a = random(0, 2);
      var b = random(0, 2);
      if (self.existMatrix[a][b] == 1) {  // 存在地鼠，不产生地鼠
        i--;
      } else {
        self.existMatrix[a][b] = 1;    //设置已存在地鼠
        var k = random(0, 4);
        if (k == 0) { self.mouse0[a][b].state = 'normal'; }
        else if (k == 1) { self.mouse1[a][b].state = 'normal'; }
        else if (k == 2) { self.mouse2[a][b].state = 'normal'; }
        else if (k == 3) { self.mouse3[a][b].state = 'normal'; }
        else { self.mouse4[a][b].state = 'normal'; }
      }
    }
  }
  drawMouse(self, i, j) {
    self.mouse0[i][j].draw(self.context, self.existMatrix, i, j);
    self.mouse1[i][j].draw(self.context, self.existMatrix, i, j);
    self.mouse2[i][j].draw(self.context, self.existMatrix, i, j);
    self.mouse3[i][j].draw(self.context, self.existMatrix, i, j);
    self.mouse4[i][j].draw(self.context, self.existMatrix, i, j);
  }
  drawScreen(self) {
    self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);  //清除canvas
    self.context.drawImage(self.bg_hole.image, 0, 0, self.bg_hole.width, self.bg_hole.height);   //背景，并不完全占满整个canvas，所以要重新清屏
    for (let j = 0; j < 3; j++)
      self.drawMouse(self, 0, j); //第一行地鼠
    for (let j = 0; j < 3; j++)
      self.star[0][j].draw(self.context);  //第一行星星
    self.context.drawImage(self.bg_holeHide.image, 0, 0, self.bg_holeHide.width, 302, 0, 0, self.bg_holeHide.width, 302);   //第一行遮掩洞
    for (let j = 0; j < 3; j++)
      self.drawMouse(self, 1, j); //第二行地鼠
    for (let j = 0; j < 3; j++)
      self.star[1][j].draw(self.context);  //第二行星星
    self.context.drawImage(self.bg_holeHide.image, 0, 302, self.bg_holeHide.width, 100, 0, 302, self.bg_holeHide.width, 100); //第二行遮掩洞 
    for (let j = 0; j < 3; j++)
      self.drawMouse(self, 2, j); //第三行地鼠
    for (let j = 0; j < 3; j++)
      self.star[2][j].draw(self.context);  //第三行星星
    self.context.drawImage(self.bg_holeHide.image, 0, 400, self.bg_holeHide.width, 100, 0, 400, self.bg_holeHide.width, 100); //第三行遮掩洞 	
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        self.scoreObject[i][j].draw(self.context);      //分数对象
    self.hammer.draw(self.context, self.ui.mousePress);//锤子
  }


  /**
  * 初始化状态
  */
  stateInit() {

    this.ui.setNumber(0);//初始化分数
    this.__drawReadyScreen(this);
    // UI
    this.ui.btnPauseVisible(false);
    var self = this;
    var index = 0;
    this.readyInterval = setInterval(function () {   //setInterval最好是这样写，在控制和传参数方面都有好处
      self.ready(self, index);
      index++;
    }, 1000);
  }

}

class Score {
  constructor() {
    this.x;
    this.y;
    this.duration = 20;//消失canvas刷新次数	
    this.scoreType = -1;//画的分数帧,default是-1，不绘图。
    this.image = ImageManager.get('icon');
    this.frames = frames = getScoreFrames("score");
    this.width = 106;
    this.height = 65;
  }


  draw(context) {
    if (this.scoreType > -1 && this.duration > 0) {
      var f = this.frames[this.scoreType];
      context.drawImage(this.image, f.x, f.y, this.width, this.height, this.x, this.y, this.width, this.height);
      this.duration--;
    } else {
      this.duration = 20;
      this.scoreType = -1;
    }
  }
}


class Star {
  constructor() {
    this.x;
    this.y;
    this.width = 111;
    this.height = 72;

    this.state = 'hide';
    this.anim;
  }
  init(x, y) {
    var anim = new Animation();
    anim.init('star', getStarFrames, 'star');	//第一个是image的id号，最后个star是帧里面的名字
    this.anim = anim;
    this.x = x;
    this.y = y;
  }

  draw(context) {
    if (this.state == 'show') {
      this.anim.update();
      this.anim.draw(context, this.x, this.y, this.width, this.height);
      if (this.anim.currentFrameIndex == 11) {
        this.state = 'hide';
        this.anim.currentFrameIndex = -1;
      }
    }
  }
}

class UI {
  constructor() {
    // 预备界面
    this.gameCover = DOM.get('gameCover');
    // 游戏主体
    this.gameBody = DOM.get('gameBody');
    // 游戏结束
    this.gameOver = DOM.get('gameOver');
    // 分数
    this.number = DOM.get('number');
    /**
       * 得分
       */
    this.score = 0;
    //存在矩阵,表示在那个坑存在地鼠
    this.existMatrix;
    this.hammer;
    this.mouse0;
    this.mouse1;
    this.mouse2;
    this.mouse3;
    this.mouse4;
    this.star;
    this.scoreObject;
    this.mousePress = false;
  }
  /**
  * UI事件定义
  */
  // 打开声音
  static onsoundopen = new Function();
  // 关闭声音
  static onsoundclose = new Function();
  // 开始
  static onplay = new Function();
  // 帮助
  static onshowHelp = new Function();
  // 暂停
  static onpause = new Function();
  // 继续游戏
  static onresume = new Function();
  // 准备
  static onretry = new Function();

  /**
  * @private
  * 初始化声音控制按钮
  */
  __initBtnSound() {
    var btnSound = DOM.get('btnSound'), UI = this;
    btnSound.onclick = delegate(function () {
      if (DOM.hasClass(btnSound, 'disabled')) {
        DOM.removeClass(btnSound, 'disabled');
        this.onsoundopen();
      } else {
        DOM.addClass(btnSound, 'disabled');
        this.onsoundclose();
      }
    }, this, btnSound);
  }

  /**
  * @private
  * 初始化开始游戏按钮
  */
  __initBtnPlay() {
    var btnPlay = DOM.get('btnPlay'), self = this;
    btnPlay.onclick = function () {
      self.onplay();
    }
  }
  /**
  * @private
  * 初始化暂停按钮
  */
  __initBtnPause() {
    var btnPause = DOM.get('btnPause'), UI = this;
    btnPause.onclick = delegate(function () {
      if (DOM.hasClass(btnPause, 'disabled')) {
        DOM.removeClass(btnPause, 'disabled');
        this.onreadystart();
      } else {
        DOM.addClass(btnPause, 'disabled');
        this.onpause();
      }
    }, this, btnPause);
  }
  /**
  * @private
  * 初始化准备按钮
  */
  __initBtnRetry() {
    var btnRetry = DOM.get('btnRetry'), self = this;
    btnRetry.onclick = function () {
      self.onretry();
    }
  }
  /**
  * @private
  * 初始化帮助按钮
  */
  __initBtnHelp() {
    var btnHelp = DOM.get('btnHelp'), self = this;
    btnHelp.onclick = function () {
      DOM.show(DOM.get('HelpDiv'));
      DOM.hide(DOM.get('gameCover'));
    }
    var backMenu = DOM.get('btnBack');  //帮助里面的返回主菜单
    backMenu.onclick = function () {
      DOM.hide(DOM.get('HelpDiv'));
      DOM.show(DOM.get('gameCover'));
    }

  }
  /**
  * @private
  * 初始化失败界面按钮
  */
  __initBtnFail() {
    var btnRetry = DOM.get('btnRetry'), self = this;
    btnRetry.onclick = function () {
      self.onretry();
    }
    var btnBackToMenu = DOM.get('btnBackToMenu');  //失败里面的返回主菜单
    btnBackToMenu.onclick = function () {
      self.toCover();
    }
  }
  /**
  * @private
  * 下一关
  */
  __initBtnSuccess() {
    var nextLoding = DOM.get('nextLoding'), self = this;
    nextLoding.onclick = function () {
      DOM.hide(DOM.get('nextLoding'));
      self.onresume();
    }
  }
  /**
  * 鼠标事件的注册
  */
  __initMouseEventListener() {
    var canvas = DOM.get('gameBody'), self = this;
    canvas.onmouseover = function () {
      this.style.cursor = 'none';
    }
    canvas.onmouseout = function () {
      this.style.cursor = '';
    }
    canvas.onmousemove = function (e) {
      if (self.hammer) {
        var even = window.event || e;  //为了兼容各种浏览器，由于没有滚动条，所以不用其他处理
        self.hammer.x = even.clientX; self.hammer.x -= 300;
        self.hammer.y = even.clientY; self.hammer.y -= 40;
      }
    }
    canvas.onmousedown = function () {
      self.mousePress = true;
    }
    canvas.onmouseup = function (e) {
      self.mousePress = false;
      var even = window.event || e;
      self.__pengzhuang(self, even.clientX - 300, even.clientY - 40);
    }
  }

  /**
  * 锤子与地鼠的碰撞检测
  */
  __pengzhuang(self, x, y) {

    outerloop:
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (self.existMatrix[i][j] == 1) {
          var it0 = self.mouse0[i][j], it1 = self.mouse1[i][j], it2 = self.mouse2[i][j], it3 = self.mouse3[i][j], it4 = self.mouse4[i][j];
          if (self.__boundTest(self, it0, x, y, i, j)) { self.__caculateScore(self, "mouse0", x, y, i, j); break outerloop };
          if (self.__boundTest(self, it1, x, y, i, j)) { self.__caculateScore(self, "mouse1", x, y, i, j); break outerloop };
          if (self.__boundTest(self, it2, x, y, i, j)) { self.__caculateScore(self, "mouse2", x, y, i, j); break outerloop };
          if (self.__boundTest(self, it3, x, y, i, j)) { self.__caculateScore(self, "mouse3", x, y, i, j); break outerloop };
          if (self.__boundTest(self, it4, x, y, i, j)) { self.__caculateScore(self, "mouse4", x, y, i, j); break outerloop };
        }
      }
    }

  }
  /* 
  *it待检测对象
  */

  __boundTest(self, it, x, y, i, j) {
    if (it.state == 'normal') {
      if (x > it.x && y > (it.y - 50) && x < (it.x + it.width) && y < (it.y + it.height - 50)) {
        it.state = 'dead';
        self.star[i][j].state = 'show';
        self.star[i][j].y = it.y;//重置星星y轴位置
        Audio.play('no_hit');
        return true;

      }
    }
    return false;
  }
  /**
  * 分数计算
  */
  __caculateScore(self, type, x, y, i, j) {
    switch (type) {
      case "mouse0": self.scoreObject[i][j].scoreType = 4; this.score += this.score * 0.2; break;                          //+20%
      case "mouse1": self.scoreObject[i][j].scoreType = 3; this.score += 100; break;                          //+100
      case "mouse2": self.scoreObject[i][j].scoreType = 0; this.score += 500; break;                          //+500
      case "mouse3": self.scoreObject[i][j].scoreType = 2; this.score -= 100; if (this.score < 0) this.score = 0; break;       //-100
      case "mouse4": self.scoreObject[i][j].scoreType = 1; this.score /= 2; break;                          //x/2
    }
    self.scoreObject[i][j].x = x; self.scoreObject[i][j].y = y;
    this.setNumber(~~this.score);  //设置分数
  }

  /**
  * 初始化界面及事件
  */
  init() {
    this.__initBtnSound();
    this.__initBtnPlay();
    this.__initBtnPause();
    this.__initBtnFail();
    this.__initBtnSuccess();
    this.__initBtnRetry();
    this.__initBtnHelp();
    this.__initMouseEventListener();

  }
  /**
  * 设置分数
  * @param {Number} number
  */
  setNumber(number) {
    var numberChar = number.toString().split('');
    for (var i = 0; i < numberChar.length; i++) {
      numberChar[i] = '<span class="number' + numberChar[i] + '"></span>';
    }
    this.number.innerHTML = numberChar.join('');
  }
  /**
  * 显示或隐藏暂停按钮
  * @param {Boolean} state
  */
  btnPauseVisible(state) {
    if (state) {
      DOM.show(DOM.get('btnPause'));
    } else {
      DOM.hide(DOM.get('btnPause'));
    }
  }

  /**
  * 切换到预备界面
  */
  toCover() {
    DOM.hide(this.gameBody);
    DOM.hide(this.gameOver);
    DOM.show(this.gameCover);
  }
  /**
  * 切换到游戏主体界面
  */
  toBody() {
    DOM.hide(this.gameOver);
    DOM.hide(this.gameCover);
    DOM.show(this.gameBody);
  }
  /**
  * 切换到游戏结束界面
  */
  toOver() {
    DOM.hide(this.gameCover);
    DOM.hide(this.gameBody);
    DOM.show(this.gameOver);
  }
}
