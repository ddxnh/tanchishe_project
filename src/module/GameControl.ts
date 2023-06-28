import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";


export default class GameControl {
  food: Food
  snake: Snake
  scorePanel: ScorePanel
  direction: string = ''
  isAlive = true
  private Xdirection: string[] = ['ArrowLeft', 'a', 'ArrowRight', 'd']
  private Ydirection: string[] = ['ArrowUp', 'w', 'ArrowDown', 's']
  constructor(canthrowWall: boolean = false) {
    this.food = new Food()
    this.snake = new Snake(canthrowWall)
    this.scorePanel = new ScorePanel()
    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandle.bind(this))
    this.run()
  }
  // event类型是keyboardEvent
  // event.key是键盘按键

  keydownHandle(event: KeyboardEvent) {
    // 增加防抖
    if (this.direction === event.key) return
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'ArrowRight':
      case 'd':
        if (this.Xdirection.includes(this.direction)) return
        this.direction = event.key
        break;
      case 'ArrowUp':
      case 'w':
      case 'ArrowDown':
      case 's':
        if (this.Ydirection.includes(this.direction)) return
        this.direction = event.key
        break;
    }
  }
  // 蛇动的方法
  run() {

    let x = this.snake.X
    let y = this.snake.Y
    /* 
      w ArrowUp       top减少
      d ArrowRight    left增加
      a ArrowLeft     left减少
      s ArrowDown     top增加
    */
    switch (this.direction) {
      case 'w':
      case 'ArrowUp':
        y -= 10
        break;
      case 's':
      case 'ArrowDown':
        y += 10
        break;
      case 'a':
      case 'ArrowLeft':
        x -= 10
        break;
      case 'd':
      case 'ArrowRight':
        x += 10
        break;
    }

    // 检查是否吃到食物
    this.checkEat(x, y)

    //修改蛇的坐标 
    try {
      this.snake.X = x
      this.snake.Y = y
    } catch (e: any) {
      alert(e.message)
      // 撞墙之后 要停止继续移动
      this.isAlive = false
    }
    this.isAlive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }
  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      // 食物的位置随机
      this.food.change()
      // 增加一分分数
      this.scorePanel.addScore()
      // 增加一条蛇
      this.snake.addBody()
    }
  }
}

