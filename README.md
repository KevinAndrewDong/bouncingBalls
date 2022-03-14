# 大球吃小球
基于Javascript对象构造的小游戏[查看在线版本](https://kevinandrewdong.github.io/bouncingBalls/)

- 定义构造器 Shape()，通过继承定义小球 Ball(), 大球EvilCircle()
- 定义 draw() 方法，使用 beginPath(), arc(), fillStyle, fill()方法画出实心彩球，strokeStyle()和stroke()画空心球
- 给小球原型加上 update() 方法，碰到画布的边缘后速度反向，collisionDetect() 小球相互碰撞后颜色随机
- 给大球原型加上 checkBounds() 方法，碰到画布的边缘后反弹一个半径的距离，collisionDetect() 碰到小球后令其exists属性为false
- 定义loop() 函数: 使用fillRect()画矩形遮住视图，调用 draw() 和 update() 函数画出所有小球，使用 requestAnimationFrame() 方法每隔一小段时间再次运行一次这个函数
- 定义setControls()方法，将一个 onkeydown 的事件监听器给 window 对象，键盘按下的时候移动大球
- 创建一个变量para存储段落 .score 的引用，使用变量count显示更新的球数量,、在每次恶魔吃球时count减1。
<img width="1254" alt="image" src="https://user-images.githubusercontent.com/20911103/158256970-ae711813-0990-498b-bb5d-b8407875fd8b.png">
