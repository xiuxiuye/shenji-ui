import type { App, Component } from 'vue'
import './theme/init'
import { ISJComponent } from 'src/types/global'
import registerVueComponent from 'src/utils/registerVueComponent'

type WithInstall = (component: Component) => ISJComponent

const withInstall: WithInstall = (component) => {
  return {
    install: (app: App) => {
      registerVueComponent(app, component)
    },
    ...component
  }
}

export default withInstall
