import { Container, Text } from 'pixi.js'
import { Scene } from '../abstractions/Scene'

export class BattleScreen implements Scene {
  public windowHeight: number | undefined
  public windowWidth: number | undefined


  constructor() {
    this.container.width = window.innerWidth
    this.container.height = window.innerHeight
    this.init()
  }

  onResize(): void {
    throw new Error('Method not implemented.')
  }
  public container: Container = new Container()

  init(): void {
    const text = new Text({
      text: 'BATTLESCREEN',
      style: { fill: '#ffffff' }
    })

    this.container.addChild(text)
  }
  update(): void {
    throw new Error('Method not implemented.')
  }
  destroy(): void {
    throw new Error('Method not implemented.')
  }
}
