//设置剩余小球
const para = document.querySelector('.score');
let count = 0;



// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

function randomColor() {
  return 'rgb(' +
      random(0, 255) + ', ' +
      random(0, 255) + ', ' +
      random(0, 255) + ')';
}

//定义构造器Shape(), Ball(), EvilCircle()
class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }
}

class EvilCircle extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }
}


//小球方法
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0,2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; ++j) {
    if (this != balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
        // this.velX = -(this.velX);
        // this.velY = -(this.velY);
        // balls[j].velX = -(balls[j].velX);
        // balls[j].velY = -(balls[j].velY);
      }
    }
  }
}


//大球方法
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0,2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }
  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }
  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }
  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}

EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; ++j) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.size + balls[j].size) {
        balls[j].exists = false;
        this.size += 4;
        count--;
        para.textContent = '还有  ' + count + '  个小球';
      }
    }
  }
}

//键盘按键监测
EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velY;
        break;
    }
  };
};

//生成小球和大球
let balls = [];

while (balls.length < 50) {
  let size = random(10, 20);
  let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      randomColor(),
      size
  );
  balls.push(ball);
  count++;
  para.textContent = '还有  ' + count + '  个小球';
}

let evilCircle = new EvilCircle(random(0 , width), random(0 , height),
    40, 40, true, 'white', 40);
evilCircle.setControls();


//动起来
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();

