(function () {
  // define variables
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var player, score, ticker;

  // platform variables
  var platformHeight, platformLength, gapLength;
  var platformWidth = 32;
  var platformBase = canvas.height - platformWidth;  // bottom row of the game
  var platformSpacer = 64;

  var KEY_STATUS = {};

  /**
   * Get a random number between range
   * @param {integer}
   * @param {integer}
   */
  function rand(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  /**
   * Bound a number between range
   * @param {integer} num - Number to bound
   * @param {integer}
   * @param {integer}
   */
  function bound(num, low, high) {
    return Math.max(Math.min(num, high), low);
  }

  /**
   * Asset pre-loader object. Loads all images
   */

  class AssetLoader {
    constructor() {
      this.assetsLoaded = 0;

    }
    get imglist() {
      return {
        'bg': 'imgs/bg.png',
        'sky': 'imgs/sky.png',
        'backdrop': 'imgs/backdrop.png',
        'backdrop2': 'imgs/backdrop_ground.png',
        'grass': 'imgs/grass.png',
        'avatar_normal': 'imgs/normal_walk.png',
        'water': 'imgs/water.png',
        'grass1': 'imgs/grassMid1.png',
        'grass2': 'imgs/grassMid2.png',
        'bridge': 'imgs/bridge.png',
        'plant': 'imgs/plant.png',
        'bush1': 'imgs/bush1.png',
        'bush2': 'imgs/bush2.png',
        'cliff': 'imgs/grassCliffRight.png',
        'spikes': 'imgs/spikes.png',
        'box': 'imgs/boxCoin.png',
        'slime': 'imgs/slime.png'
      };
    }

    get totalAssest() {
      return Object.keys(this.imglist).length;
    }

    /**
     * Ensure all assets are loaded before using them
     * @param {number} dic  - Dictionary name ('imgs', 'sounds', 'fonts')
     * @param {number} name - Asset name in the dictionary
     */
    assetLoaded(dic, name) {
      // don't count assets that have already loaded
      if (this[dic][name].status !== 'loading') {
        return;
      }

      this[dic][name].status = 'loaded';
      this.assetsLoaded++;

      // finished callback
      if (this.assetsLoaded === this.totalAssest) {
        gameStart();

      }
    }

    downloadAll() {
      // load images
      this.imgs = {}
      for (var img in this.imglist) {
        if (this.imglist.hasOwnProperty(img)) {
          let src = this.imglist[img];

          // create a closure for event binding
          (function (asset, img) {
            asset.imgs[img] = new Image();
            asset.imgs[img].status = 'loading';
            asset.imgs[img].name = img;
            asset.imgs[img].onload = function () {
              asset.assetLoaded('imgs', img);
            };
            asset.imgs[img].src = src;
          })(this, img);
        }
      }
    }
  }

  var assetLoader = new AssetLoader();

  /**
   * Creates a Spritesheet
   * @param {string} - Path to the image.
   * @param {number} - Width (in px) of each frame.
   * @param {number} - Height (in px) of each frame.
   */
  function SpriteSheet(path, frameWidth, frameHeight) {
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    // calculate the number of frames in a row after the image loads
    var self = this;
    this.image.onload = function () {
      self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    };

    this.image.src = path;
  }

  /**
   * Creates an animation from a spritesheet.
   * @param {SpriteSheet} - The spritesheet used to create the animation.
   * @param {number}      - Number of frames to wait for before transitioning the animation.
   * @param {array}       - Range or sequence of frame numbers for the animation.
   * @param {boolean}     - Repeat the animation once completed.
   */
  function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

    var animationSequence = [];  // array holding the order of the animation
    var currentFrame = 0;        // the current frame to draw
    var counter = 0;             // keep track of frame rate

    // start and end range for frames
    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber);

    /**
     * Update the animation
     */
    this.update = function () {

      // update to the next frame if it is time
      if (counter == (frameSpeed - 1))
        currentFrame = (currentFrame + 1) % animationSequence.length;

      // update the counter
      counter = (counter + 1) % frameSpeed;
    };

    /**
     * Draw the current frame
     * @param {integer} x - X position to draw
     * @param {integer} y - Y position to draw
     */
    this.draw = function (x, y) {
      // get the row and col of the frame
      var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
      var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight);
    };
  }

  /**
   * Create a parallax background
   */
  const background = (function () {
    var sky = {};
    var backdrop = {};
    var backdrop2 = {};

    /**
     * Draw the backgrounds to the screen at different speeds
     */
    this.draw = function () {
      ctx.drawImage(assetLoader.imgs.bg, 0, 0);

      // Pan background
      sky.x -= sky.speed;
      backdrop.x -= backdrop.speed;
      backdrop2.x -= backdrop2.speed;

      // draw images side by side to loop
      ctx.drawImage(assetLoader.imgs.sky, sky.x, sky.y);
      ctx.drawImage(assetLoader.imgs.sky, sky.x + canvas.width, sky.y);

      ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x, backdrop.y);
      ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x + canvas.width, backdrop.y);

      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x, backdrop2.y);
      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x + canvas.width, backdrop2.y);

      // If the image scrolled off the screen, reset
      if (sky.x + assetLoader.imgs.sky.width <= 0)
        sky.x = 0;
      if (backdrop.x + assetLoader.imgs.backdrop.width <= 0)
        backdrop.x = 0;
      if (backdrop2.x + assetLoader.imgs.backdrop2.width <= 0)
        backdrop2.x = 0;
    };

    /**
     * Reset background to zero
     */
    this.reset = function () {
      sky.x = 0;
      sky.y = 0;
      sky.speed = 0.2;

      backdrop.x = 0;
      backdrop.y = 0;
      backdrop.speed = 0.4;

      backdrop2.x = 0;
      backdrop2.y = 0;
      backdrop2.speed = 0.6;
    }
    return {
      draw: this.draw,
      reset: this.reset
    };
  })();

  class Vector {
    constructor(x, y, dx, dy) {
      // position
      this.x = x || 0;
      this.y = y || 0;
      // direction
      this.dx = dx || 0;
      this.dy = dy || 0;
    }

    /**
     * Advance the vectors position by dx,dy
     */
    advance() {
      this.x += this.dx;
      this.y += this.dy;
    };

    /**
     * Get the minimum distance between two vectors
     * @param {Vector}
     * @return minDist
     */
    minDist(vec) {
      let minDist = Infinity;
      let max = Math.max(Math.abs(this.dx), Math.abs(this.dy),
        Math.abs(vec.dx), Math.abs(vec.dy));
      let slice = 1 / max;

      let x, y, distSquared;

      // get the middle of each vector
      let vec1 = {}, vec2 = {};
      vec1.x = this.x + this.width / 2;
      vec1.y = this.y + this.height / 2;
      vec2.x = vec.x + vec.width / 2;
      vec2.y = vec.y + vec.height / 2;
      for (var percent = 0; percent < 1; percent += slice) {
        x = (vec1.x + this.dx * percent) - (vec2.x + vec.dx * percent);
        y = (vec1.y + this.dy * percent) - (vec2.y + vec.dy * percent);
        distSquared = x * x + y * y;

        minDist = Math.min(minDist, distSquared);
      }

      return Math.sqrt(minDist);
    };
  }

  class Player extends Vector {
    constructor() {
      super(0, 0, 0, 0);
      this.width = 60;
      this.height = 96;
      this.speed = 6;

      // jumping
      this.gravity = 1;
      this.dy = 0;
      this.jumpDy = -10;
      this.isFalling = false;
      this.isJumping = false;

      // spritesheets
      this.sheet = new SpriteSheet('imgs/normal_walk.png', this.width, this.height);
      this.walkAnim = new Animation(this.sheet, 4, 0, 15);
      this.jumpAnim = new Animation(this.sheet, 4, 15, 15);
      this.fallAnim = new Animation(this.sheet, 4, 11, 11);
      this.anim = this.walkAnim;


      this.jumpCounter = 0;  // how long the jump button can be pressed down
    }
    /**
     * Update the player's position and animation
     */
    update() {

      // jump if not currently jumping or falling
      if (KEY_STATUS.space && this.dy === 0 && !this.isJumping) {
        this.isJumping = true;
        this.dy = this.jumpDy;
        this.jumpCounter = 12;
      }

      // jump higher if the space bar is continually pressed
      if (KEY_STATUS.space && this.jumpCounter) {
        this.dy = this.jumpDy;
      }

      this.jumpCounter = Math.max(this.jumpCounter - 1, 0);

      this.advance();

      // add gravity
      if (this.isFalling || this.isJumping) {
        this.dy += this.gravity;
      }

      // change animation if falling
      if (this.dy > 0) {
        this.anim = this.fallAnim;
      }
      // change animation is jumping
      else if (this.dy < 0) {
        this.anim = this.jumpAnim;
      }
      else {
        this.anim = this.walkAnim;
      }

      this.anim.update();
    }

    /**
     * Draw the player at it's current position
     */
    draw() {
      this.anim.draw(this.x, this.y);
    }

    /**
     * Reset the player's position
     */
    reset() {
      this.x = 64;
      this.y = 250;
    }
  }

  player = new Player();

  class Sprite extends Vector {
    constructor(x, y, type) {
      super(x, y, 0, 0);
      this.width = platformWidth;
      this.height = platformWidth;
      this.type = type;
    }
    /**
     * Update the Sprite's position by the player's speed
     */
    update() {
      this.dx = -player.speed;
      this.advance();
    };

    /**
     * Draw the sprite at it's current position
     */
    draw() {
      ctx.save();
      ctx.translate(0.5, 0.5);
      ctx.drawImage(assetLoader.imgs[this.type], this.x, this.y);
      ctx.restore();
    };

  }
  /**
   * Get the type of a platform based on platform height
   * @return Type of platform
   */
  function getType() {
    var type;
    switch (platformHeight) {
      case 0:
      case 1:
        type = Math.random() > 0.5 ? 'grass1' : 'grass2';
        break;
      case 2:
        type = 'grass';
        break;
      case 3:
        type = 'bridge';
        break;
      case 4:
        type = 'box';
        break;
    }
    if (platformLength === 1 && platformHeight < 3 && rand(0, 3) === 0) {
      type = 'cliff';
    }

    return type;
  }

  class Game {
    constructor() {

    }

    /**
   * Update all this.ground position and draw. Also check for collision against the player.
   */
    updateGround() {
      // animate this.ground
      player.isFalling = true;
      for (var i = 0; i < this.ground.length; i++) {
        this.ground[i].update();
        this.ground[i].draw();

        // stop the player from falling when landing on a platform
        var angle;
        if (player.minDist(this.ground[i]) <= player.height / 2 + platformWidth / 2 &&
          (angle = Math.atan2(player.y - this.ground[i].y, player.x - this.ground[i].x) * 180 / Math.PI) > -130 &&
          angle < -50) {
          player.isJumping = false;
          player.isFalling = false;
          player.y = this.ground[i].y - player.height + 5;
          player.dy = 0;
        }
      }

      // remove this.ground that have gone off screen
      if (this.ground[0] && this.ground[0].x < -platformWidth) {
        this.ground.splice(0, 1);
      }
    }

    /**
     * Update all water position and draw.
     */
    updateWater() {
      // animate water
      for (var i = 0; i < this.water.length; i++) {
        this.water[i].update();
        this.water[i].draw();
      }

      // remove water that has gone off screen
      if (this.water[0] && this.water[0].x < -platformWidth) {
        var w = this.water.splice(0, 1)[0];
        w.x = this.water[this.water.length - 1].x + platformWidth;
        this.water.push(w);
      }
    }

    /**
     * Update all environment position and draw.
     */
    updateEnvironment() {
      // animate environment
      for (var i = 0; i < this.environment.length; i++) {
        this.environment[i].update();
        this.environment[i].draw();
      }

      // remove environment that have gone off screen
      if (this.environment[0] && this.environment[0].x < -platformWidth) {
        this.environment.splice(0, 1);
      }
    }

    /**
     * Update all enemies position and draw. Also check for collision against the player.
     */
    updateEnemies() {
      // animate enemies
      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update();
        this.enemies[i].draw();

        // player ran into enemy
        if (player.minDist(this.enemies[i]) <= player.width - platformWidth / 2) {
          this.gameOver();
        }
      }

      // remove this.enemies that have gone off screen
      if (this.enemies[0] && this.enemies[0].x < -platformWidth) {
        this.enemies.splice(0, 1);
      }
    }

    /**
     * Update the players position and draw
     */
    updatePlayer() {
      player.update();
      player.draw();

      // game over
      if (player.y + player.height >= canvas.height) {
        this.gameOver();
      }
    }

    /**
     * Spawn new sprites off screen
     */
    spawnSprites() {
      // increase score
      score++;

      // first create a gap
      if (gapLength > 0) {
        gapLength--;
      }
      // then create this.ground
      else if (platformLength > 0) {
        var type = getType();

        this.ground.push(new Sprite(
          canvas.width + platformWidth % player.speed,
          platformBase - platformHeight * platformSpacer,
          type
        ));
        platformLength--;

        // add random environment sprites
        this.spawnEnvironmentSprites();

        // add random enemies
        this.spawnEnemySprites();
      }
      // start over
      else {
        // increase gap length every speed increase of 4
        gapLength = rand(player.speed - 2, player.speed);
        // only allow a this.ground to increase by 1
        platformHeight = bound(rand(0, platformHeight + rand(0, 2)), 0, 4);
        platformLength = rand(Math.floor(player.speed / 2), player.speed * 4);
      }
    }

    /**
     * Spawn new environment sprites off screen
     */
    spawnEnvironmentSprites() {
      if (score > 40 && rand(0, 20) === 0 && platformHeight < 3) {
        if (Math.random() > 0.5) {
          this.environment.push(new Sprite(
            canvas.width + platformWidth % player.speed,
            platformBase - platformHeight * platformSpacer - platformWidth,
            'plant'
          ));
        }
        else if (platformLength > 2) {
          this.environment.push(new Sprite(
            canvas.width + platformWidth % player.speed,
            platformBase - platformHeight * platformSpacer - platformWidth,
            'bush1'
          ));
          this.environment.push(new Sprite(
            canvas.width + platformWidth % player.speed + platformWidth,
            platformBase - platformHeight * platformSpacer - platformWidth,
            'bush2'
          ));
        }
      }
    }

    /**
     * Spawn new enemy sprites off screen
     */
    spawnEnemySprites() {
      if (score > 100 && Math.random() > 0.96 && this.enemies.length < 3 && platformLength > 5 &&
        (this.enemies.length ? canvas.width - this.enemies[this.enemies.length - 1].x >= platformWidth * 3 ||
          canvas.width - this.enemies[this.enemies.length - 1].x < platformWidth : true)) {
        this.enemies.push(new Sprite(
          canvas.width + platformWidth % player.speed,
          platformBase - platformHeight * platformSpacer - platformWidth,
          Math.random() > 0.5 ? 'spikes' : 'slime'
        ));
      }
    }

    static requestAnimFrame() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
          window.setTimeout(callback, 1000 / 60);
        }
    }

    loop() {
      if (!this.stop) {
        Game.requestAnimFrame()(() => { this.loop() });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.draw();

        // update entities
        this.updateWater();
        this.updateEnvironment();
        this.updatePlayer();
        this.updateGround();
        this.updateEnemies();

        // draw the score
        ctx.fillText('得分: ' + score + 'm', canvas.width - 140, 30);

        // spawn a new Sprite
        if (ticker % Math.floor(platformWidth / player.speed) === 0) {
          this.spawnSprites();
        }

        // increase player speed only when player is jumping
        if (ticker > (Math.floor(platformWidth / player.speed) * player.speed * 20) && player.dy !== 0) {
          player.speed = bound(++player.speed, 0, 15);
          player.walkAnim.frameSpeed = Math.floor(platformWidth / player.speed) - 1;

          // reset ticker
          ticker = 0;

          // spawn a platform to fill in gap created by increasing player speed
          if (gapLength === 0) {
            var type = getType();
            this.ground.push(new Sprite(
              canvas.width + platformWidth % player.speed,
              platformBase - platformHeight * platformSpacer,
              type
            ));
            platformLength--;
          }
        }

        ticker++;
      }
    }

    gameOver() {
      this.stop = true;
      document.getElementById('game-over').style.display = 'block';
    }

    start() {

      document.getElementById('game-over').style.display = 'none';
      this.ground = [];
      this.water = [];
      this.environment = [];
      this.enemies = [];
      player.reset();
      ticker = 0;
      this.stop = false;
      score = 0;
      platformHeight = 2;
      platformLength = 15;
      gapLength = 0;

      ctx.font = '16px arial, sans-serif';

      for (var i = 0; i < 30; i++) {
        this.ground.push(new Sprite(i * (platformWidth - 3), platformBase - platformHeight * platformSpacer, 'grass'));
      }

      for (i = 0; i < canvas.width / 32 + 2; i++) {
        this.water.push(new Sprite(i * platformWidth, platformBase, 'water'));
      }

      background.reset();

      this.loop();

    }
  }



  function gameStart() {
    let game = new Game();
    game.start();
  }


  (function gameInit() {
    var KEY_CODES = {
      32: 'space'
    };

    for (var code in KEY_CODES) {
      if (KEY_CODES.hasOwnProperty(code)) {
        KEY_STATUS[KEY_CODES[code]] = false;
      }
    }

    document.onkeydown = function (e) {
      var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
      if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
      }
    };
    document.onkeyup = function (e) {
      var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
      if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
      }
    };

    document.getElementById('restart').addEventListener('click', gameStart);

    assetLoader.downloadAll();
  })();


})();