import generateColors from './generateColors'
import setColorVar from './setColorVar'
import initSubColorVars from './initSubColorVars'
import type { Create } from './types'

const PRIMARY_COLOR_VARS_INDEX = {
  '--sj-primary-focus-background-color': 0,
  '--sj-primary-hover-background-color': 1,
  '--sj-primary-hover-color': 4,
  '--sj-primary-color': 5,
  '--sj-primary-active-color': 6
}

const create: Create = (color = 'blue', options = { mode: 'light' }) => {
  const colors = generateColors(color, options)
  Object.keys(PRIMARY_COLOR_VARS_INDEX).forEach(key => setColorVar(key, colors[PRIMARY_COLOR_VARS_INDEX[key]]))

  /**
   * init sub colors: info, error, success, warining
   */
  initSubColorVars(options)
}

export default create
