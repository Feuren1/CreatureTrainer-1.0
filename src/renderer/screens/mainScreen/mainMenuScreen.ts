import { Assets, Container, Sprite, Ticker } from 'pixi.js'
import { Scene } from '../abstractions/Scene'

export class MainMenuScreen implements Scene {
  public windowHeight: number | undefined
  public windowWidth: number | undefined
  public container: Container = new Container()

  constructor() {
    this.container.width = window.innerWidth
    this.container.height = window.innerHeight
    this.init()
  }
  
  async init(): Promise<void> {
    const asset = await Assets.load(
      'file://A:\\Github\\CreatureTrainer1.0\\src\\renderer\\assets\\Logo\\CreatureTrainerLogo.png'
    )
    const logo = new Sprite(asset)
    logo.anchor.set(0.5)
    logo.label = 'logo'
    logo.x = window.innerWidth / 2
    logo.y = window.innerHeight / 2
    logo.cursor = 'pointer'
    logo.eventMode = 'static'
    this.container.addChild(logo)

    let time = 0

    const ticker: Ticker = new Ticker()
    ticker.add(() => {
      time += ticker.deltaTime * 0.05 // deltaTime is a number

      const pulse = 1 + Math.sin(time) * 0.05 // scale oscillates between 0.9 and 1.1
      logo.scale.set(pulse)
    })

    logo.on('pointertap', () => {
      this.onLogoClick()
    })

    ticker.start()
  }

  onLogoClick(): void {
    console.log('Logo clicked, switching scene...')
  }
  
  update(): void {
    throw new Error('Method not implemented.')
  }
  
  destroy(): void {
    this.container.destroy()
  }

  async onResize(width: number, height: number): Promise<void> {
    const logo = this.container.getChildByName('logo')
    if (logo) {
      logo.x = width / 2
      logo.y = height / 2
    }
  }
}
