import { Container } from 'pixi.js'

export abstract class Scene {
  public windowHeight: number | undefined
  public windowWidth: number | undefined
  public container: Container = new Container()

  abstract init(): void
  abstract update(delta: number): void
  abstract destroy(): void
  abstract onResize(width:number,height:number): void
}
