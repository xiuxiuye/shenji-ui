import generateColors from './generateColors'
import setColorVar from './setColorVar'
import type { InitSubColorVars } from './types'

interface Color {
  color: string;
  cssVarsIndex: Record<string, number>;
}

const COLOR_VARS: Color[] = [
  {
    color: 'blue',
    cssVarsIndex: {
      '--sj-info-focus-background-color': 0,
      '--sj-info-hover-background-color': 1,
      '--sj-info-hover-color': 4,
      '--sj-info-color': 5,
      '--sj-info-active-color': 6
    }
  },
  {
    color: 'red',
    cssVarsIndex: {
      '--sj-error-focus-background-color': 0,
      '--sj-error-hover-background-color': 1,
      '--sj-error-hover-color': 4,
      '--sj-error-color': 5,
      '--sj-error-active-color': 6
    }
  },
  {
    color: 'green',
    cssVarsIndex: {
      '--sj-success-focus-background-color': 0,
      '--sj-success-hover-background-color': 1,
      '--sj-success-hover-color': 4,
      '--sj-success-color': 5,
      '--sj-success-active-color': 6
    }
  },
  {
    color: 'gold',
    cssVarsIndex: {
      '--sj-warning-focus-background-color': 0,
      '--sj-warning-hover-background-color': 1,
      '--sj-warning-hover-color': 4,
      '--sj-warning-color': 5,
      '--sj-warning-active-color': 6
    }
  }
]

const initSubColorVars: InitSubColorVars = (options) => {
  COLOR_VARS.forEach(item => {
    const colors = generateColors(item?.color, options)
    const cssVarsIndex = item.cssVarsIndex
    Object.keys(cssVarsIndex).forEach(key => setColorVar(key, colors[cssVarsIndex[key]]))
  })
}

export default initSubColorVars
