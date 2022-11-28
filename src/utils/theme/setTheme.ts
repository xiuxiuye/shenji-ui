import isString from '../isString'
import isObject from '../isObject'
import generateColors from './generateColors'
import setColorVar from './setColorVar'
import {
  PLACEHOLDER_COLOR_VARS,
  BASE_COLOR_VALUES,
  LIGHT_NEUTRAL_CSS_COLOR_VARS,
  DARK_NEUTRAL_CSS_COLOR_VARS
} from './cssVars'
import {
  ThemeMode,
  type SetTheme,
  type Color,
  type Options,
  type ThemeColorVars
} from './types'

/**
 * 初始化明亮和暗黑两套css颜色变量
 */
const DEFAULT_THEMES = [ThemeMode.light, ThemeMode.dark]
const DEFAULT_LIGHT_THEME_BACKGROUND_COLOR =
  LIGHT_NEUTRAL_CSS_COLOR_VARS['--sj-light-theme-background-color']
const DEFAULT_DARK_THEME_BACKGROUND_COLOR =
  DARK_NEUTRAL_CSS_COLOR_VARS?.['--sj-dark-theme-background-color']

const setTheme: SetTheme = (options) => {
  /**
   * 初始化主题色和功能色的基础色值
   */
  const colors: Color = {
    ...BASE_COLOR_VALUES
  }
  const color = options?.color
  if (isString(color)) {
    colors.primary = color as string
  } else if (isObject(color)) {
    const keys = Object.keys(colors) as Array<keyof Color>
    keys.forEach((key) => {
      if (isString((color as Color)[key])) {
        colors[key] = (color as Color)[key]
      }
    })
  }
  /**
   * 初始化配置项
   */
  const colorOptions: Options = {
    mode: ThemeMode.light,
    backgroundColor: DEFAULT_LIGHT_THEME_BACKGROUND_COLOR
  }
  if (options?.mode && DEFAULT_THEMES.includes(options?.mode as ThemeMode)) {
    colorOptions.mode = options?.mode
  }
  if (isString(options?.backgroundColor)) {
    colorOptions.backgroundColor = options?.backgroundColor
  } else if (colorOptions?.mode === ThemeMode.dark) {
    colorOptions.backgroundColor = DEFAULT_DARK_THEME_BACKGROUND_COLOR
  }
  /**
   * 生成明亮和暗黑的主题色和功能色css变量色值
   */
  const themeColorVars: ThemeColorVars = {
    [ThemeMode.light]: {
      ...LIGHT_NEUTRAL_CSS_COLOR_VARS
    },
    [ThemeMode.dark]: {
      ...DARK_NEUTRAL_CSS_COLOR_VARS
    },
    current: {}
  }
  DEFAULT_THEMES.forEach((themeMode) => {
    const generateOptions: Options = { ...colorOptions }
    if (themeMode !== colorOptions?.mode) {
      generateOptions.mode = themeMode
      generateOptions.backgroundColor =
        themeMode === ThemeMode.light
          ? DEFAULT_LIGHT_THEME_BACKGROUND_COLOR
          : DEFAULT_DARK_THEME_BACKGROUND_COLOR
    }
    const colorNames = Object.keys(colors) as Array<keyof Color>
    colorNames.forEach((clolorName) => {
      const baseGenerateColor = colors[clolorName]
      const colorValues = generateColors(baseGenerateColor, generateOptions)
      if (colorValues) {
        const placeholderVars = Object.keys(PLACEHOLDER_COLOR_VARS)
        placeholderVars.forEach((placeholderVar) => {
          const colorIndex = PLACEHOLDER_COLOR_VARS[placeholderVar]
          const colorVarName = placeholderVar.replace(
            '[placeholder]',
            `${themeMode}-${clolorName}`
          )
          themeColorVars[themeMode][colorVarName] = colorValues[colorIndex]
        })
      }
    })
  })
  /**
   * 根据当前theme mode对应的css变量生成当前全局通用css变量
   */
  const currentModeColorVars = themeColorVars[colorOptions?.mode as ThemeMode]
  const currentModeColorVarNames = Object.keys(currentModeColorVars)
  currentModeColorVarNames.forEach((colorVarName) => {
    const currentColorVarName = colorVarName.replace(
      `${colorOptions?.mode}-`,
      ''
    )
    themeColorVars.current[currentColorVarName] =
      currentModeColorVars[colorVarName]
  })
  /**
   * 注册color css变量
   */
  const colorVarTypes = Object.keys(themeColorVars) as Array<keyof ThemeColorVars>
  colorVarTypes.forEach(colorVarType => {
    const colorVars = Object.keys(themeColorVars[colorVarType])
    colorVars.forEach(colorVar => setColorVar(colorVar, themeColorVars[colorVarType][colorVar]))
  })
}

export default setTheme
