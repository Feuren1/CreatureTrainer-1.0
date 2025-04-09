import { Assets, Container, Sprite } from 'pixi.js'
import { Scene } from '../abstractions/Scene'

export class MainMenuScreen implements Scene {
  public windowHeight: number | undefined;
  public windowWidth: number | undefined;
  public container: Container = new Container()
  
  constructor() {
    this.init()
  }
  onResize(): void {
    throw new Error('Method not implemented.');
  }
  

  async init(): Promise<void> {
    const asset = await Assets.load(
      'file://A:\\Github\\CreatureTrainer1.0\\src\\renderer\\assets\\Logo\\CreatureTrainerLogo.png'
    )
    const logo = new Sprite(asset);
    logo.anchor.set(0.5)
    logo.x = window.innerWidth / 2
    logo.y = window.innerHeight / 2
    this.container.addChild(logo)
  }
  update(): void {
    throw new Error('Method not implemented.')
  }
  destroy(): void {
    throw new Error('Method not implemented.')
  }

  /* async onResize(): Promise<void> {
    const { width, height } = await ipcRenderer.invoke('get-window-size');
    this.updateSceneLayout(width, height);
  } */

  updateSceneLayout(width: number, height: number): void {
    this.windowHeight = height
    this.windowWidth = width
    console.log(`New window size: ${width}x${height}`);
  
  }

  /* updateWindowSize(width: number, height: number): void {
    console.log('Updating window size:', width, height)

    this.container.width = width
    this.container.height = height

    
    const logo = this.container.getChildAt(0) // Assuming logo is the first child
    logo.x = width / 2
    logo.y = height / 2
  } */
}
