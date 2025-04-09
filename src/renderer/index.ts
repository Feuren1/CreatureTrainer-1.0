import '@pixi/unsafe-eval'
import { Application } from 'pixi.js'
import { SceneManager } from './screens/screenManager'
import { MainMenuScreen } from './screens/mainScreen/mainMenuScreen'
import { Scene } from './screens/abstractions/Scene'

class AppState {
  private _showWelcomeMessage: boolean
  private _windowWidth: number
  private _windowHeight: number
  public sceneManager: SceneManager

  constructor(app: Application, initScene: Scene) {
    this._showWelcomeMessage = true
    this._windowWidth = window.innerWidth
    this._windowHeight = window.innerHeight
    this.sceneManager = new SceneManager(app, initScene)
  }

  set windowWidth(width: number) {
    this._windowWidth = width;
  }

  set windowHeight(height: number) {
    this._windowHeight = height;
  }

  get windowWidth(): number {
    return this._windowWidth
  }

  get windowHeight(): number {
    return this._windowHeight
  }

  set showWelcomeMessage(value: boolean) {
    console.log('Setter called with value:', value);
    this._showWelcomeMessage = value
    this.handleWelcomeMessage();
  }

  get showWelcomeMessage(): boolean {
    return this._showWelcomeMessage
  }

  private onResize(): void {
    this._windowWidth = window.innerWidth
    this._windowHeight = window.innerHeight
    /* this.notifyScenes() */
  }

  /* private notifyScenes(): void {
    if (this.sceneManager) {
      this.sceneManager.updateWindowSize(this._windowWidth, this._windowHeight)
    }
  } */

  handleWelcomeMessage(): void {
    const container = document.getElementById('app')
    if (!container) return
    if (this.showWelcomeMessage) {
      container.innerHTML = `
      <div class="mainContainer">
          <h1>Creature Trainer</h1>
          <p>Welcome to the Creature Trainer!</p>
          <button id="start-button">Start Training</button>
      </div>`
    } else {
      container.innerHTML = ''
    }
  }
}

async function main(): Promise<void> {
  
  const app: Application = new Application()
  const initScene: MainMenuScreen = new MainMenuScreen()
  const appstate: AppState = new AppState(app, initScene);

  await app.init({
    background: '1b1b1f',
    resizeTo: window,
    width: window.innerWidth,
    height: window.innerHeight
  })

  appstate.sceneManager.init()
  appstate.handleWelcomeMessage();

  const startButton = document.getElementById('start-button')
  startButton?.addEventListener('click', () => {
    appstate.showWelcomeMessage = false
    appstate.sceneManager.show()
  })
}

main()
