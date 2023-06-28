
// 定义分数面板
export default class ScorePanel {
  score = 30
  level = 4
  scoreSpan: HTMLElement
  levelSpan: HTMLElement
  // 最大等级
  maxLevel: number
  // 多少分升一级
  scoreUp: number
  constructor(maxLevel: number = 10, scoreUp: number = 5) {
    this.scoreSpan = document.getElementById('score')!
    this.levelSpan = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.scoreUp = scoreUp
  }
  // 添加分数
  addScore() {
    this.score++
    // 元素为字符串
    this.scoreSpan.innerHTML = this.score + ''
    // 如果分数每到10分升一级
    if (this.score % this.scoreUp === 0 && this.score !== 0) {
      this.levelUp()
    }
  }
  // 升级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelSpan.innerHTML = ++this.level + ''
    }
  }
}