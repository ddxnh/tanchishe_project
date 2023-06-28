export default class Snake {
  head: HTMLElement
  snake: HTMLElement
  bodies: HTMLCollection
  canthrowWall: boolean
  constructor(canthrowWall: boolean = false) {
    this.head = document.querySelector('#snake > div')!
    this.snake = document.getElementById('snake')!
    this.bodies = this.snake.getElementsByTagName('div')
    this.canthrowWall = canthrowWall
  }

  // 获取头的x坐标
  get X() {
    return this.head.offsetLeft
  }
  // 获取头的y坐标
  get Y() {
    return this.head.offsetTop
  }
  // 设置头x坐标
  set X(value: number) {
    if (value === this.X) return
    if (value < 0 || value > 290) {
      if (this.canthrowWall) {
        value < 0 && (value = 290)
        value > 290 && (value = 0)
      } else {
        throw new Error('蛇撞墙了，游戏结束!!!')
      }
    }

    // 检查掉头
    // 如果有两个及以上 且蛇头移动位置与其后面一个位置坐标相同就是掉头了
    /* if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 往左走向右掉头了
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    } */

    // 每当修改坐标时调用蛇身移动
    this.moveBody()
    // 修改头的位置坐标
    this.head.style.left = value + 'px'

    this.checkHeadBody()
  }
  // 设置头y的坐标
  set Y(value: number) {
    if (value === this.Y) return
    if (value < 0 || value > 290) {
      if (this.canthrowWall) {
        value < 0 && (value = 290)
        value > 290 && (value = 0)
      } else {
        throw new Error('蛇撞墙了，游戏结束!!!')
      }
    }
    // 检查掉头
    // 如果有两个及以上 且蛇头移动位置与其后面一个位置坐标相同就是掉头了
    /*   if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
        // 往左走向右掉头了
        if (value > this.Y) {
          value = this.Y - 10
        } else {
          value = this.Y + 10
        }
      } */
    // 每当修改坐标时调用蛇身移动
    this.moveBody()
    // 修改头的位置坐标
    this.head.style.top = value + 'px'
    this.checkHeadBody()
  }
  // 添加身体元素
  addBody() {
    this.snake.insertAdjacentHTML('beforeend', '<div></div>')
  }
  // 蛇的身体也跟着移动
  moveBody() {

    // 从蛇的最后一个元素开始
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个的位置坐标
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 把最后的元素坐标改成前一个元素坐标
      (this.bodies[i] as HTMLElement).style.left = x + 'px';
      (this.bodies[i] as HTMLElement).style.top = y + 'px';
    }
  }
  // 检查是否会撞自己
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = (this.bodies[i] as HTMLElement)
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了,游戏结束!!!')
      }
    }
  }
}
