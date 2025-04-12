/* eslint-disable prettier/prettier */
import { Application } from 'pixi.js'
import '@pixi/unsafe-eval'
import { Scene } from './abstractions/Scene'

export class SceneManager {
    private initScene!: Scene;
    private currentScene?: Scene;

  constructor(private app: Application, initScene: Scene) {
    this.initScene = initScene;
    this.currentScene = initScene;
  }

  init(): void {
    this.app.stage.addChild(this.initScene.container);
  }

  show(): void {
    document.body.appendChild(this.app.canvas)
  }

  switchScene(newScene: Scene): void {
    console.log("switchingScene")
    if (this.currentScene) {
      this.currentScene.destroy()
    }
    this.currentScene = newScene
    this.app.stage.addChild(this.currentScene.container)
    this.currentScene.init()
  }

  resize(width:number,height:number): void {
    this.currentScene?.onResize(width,height);
  }

}

