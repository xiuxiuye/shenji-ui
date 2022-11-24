import type { SetColorVar } from './types'

const setColorVar: SetColorVar = (name, value) => {
  document.documentElement.style.setProperty(name, value)
}

export default setColorVar
