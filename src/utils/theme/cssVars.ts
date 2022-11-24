import type { Color } from './types'

export const PLACEHOLDER_COLOR_VARS: Record<string, number> = {
  '--sj-[placeholder]-focus-background-color': 0,
  '--sj-[placeholder]-hover-background-color': 1,
  '--sj-[placeholder]-hover-color': 4,
  '--sj-[placeholder]-color': 5,
  '--sj-[placeholder]-active-color': 6
}

/**
 * 主体色 & 功能色
 */
export const BASE_COLOR_VALUES: Color = {
  primary: '#1677ff',
  info: '#1677ff',
  error: '#f5222d',
  success: '#52c41a',
  warning: '#faad14'
}

/**
 * 明亮中间色
 */
export const LIGHT_NEUTRAL_CSS_COLOR_VARS: Record<string, string> = {
  '--sj-light-title-color': 'rgba(0, 0, 0, 0.85)',
  '--sj-light-primary-text-color': 'rgba(0, 0, 0, 0.85)',
  '--sj-light-secondary-text-color': 'rgba(0, 0, 0, 0.45)',
  '--sj-light-disable-color': 'rgba(0, 0, 0, 0.25)',
  '--sj-light-border-color': 'rgba(0, 0, 0, 0.15)',
  '--sj-light-divider-color': 'rgba(0, 0, 0, 0.06)',
  '--sj-light-background-color': 'rgba(0, 0, 0, 0.04)',
  '--sj-light-table-header-background-color': 'rgba(0, 0, 0, 0.02)',
  '--sj-light-theme-background-color': 'rgba(255, 255, 255, 1)'
}

/**
 * 暗黑中间色
 */
export const DARK_NEUTRAL_CSS_COLOR_VARS: Record<string, string> = {
  '--sj-dark-title-color': 'rgba(255, 255, 255, 0.85)',
  '--sj-dark-primary-text-color': 'rgba(255, 255, 255, 0.85)',
  '--sj-dark-secondary-text-color': 'rgba(255, 255, 255, 0.45)',
  '--sj-dark-disable-color': 'rgba(255, 255, 255, 0.25)',
  '--sj-dark-border-color': 'rgba(255, 255, 255, 0.15)',
  '--sj-dark-divider-color': 'rgba(255, 255, 255, 0.06)',
  '--sj-dark-background-color': 'rgba(255, 255, 255, 0.04)',
  '--sj-dark-table-header-background-color': 'rgba(255, 255, 255, 0.02)',
  '--sj-dark-theme-background-color': 'rgba(0, 0, 0, 1)'
}
