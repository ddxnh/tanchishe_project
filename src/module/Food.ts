// 定义食物类
export default class Food {
  element: HTMLElement

  constructor() {
    // 拿到food的id并赋值给element
    // !表示有值
    this.element = document.getElementById('food')!
  }
  // 获取食物水平坐标
  get X() {
    return this.element.offsetLeft
  }
  // 获取食物垂直坐标
  get Y() {
    return this.element.offsetTop
  }

  // 获取食物的随机坐标
  change() {
    // 取到的是0~29以内10的倍数
    const left = Math.round(Math.random() * 29) * 10
    const top = Math.round(Math.random() * 29) * 10

    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}