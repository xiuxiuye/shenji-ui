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
  '--sj-light-theme-background-color': 'rgba(255, 255, 255, 1)',
  '--sj-light-disable-background-color': 'rgba(255, 255, 255, 0.6)',
  /* 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片 hover 等； */
  '--sj-light-shadow-level-1': '0px 1px 2px -2px rgba(0, 0, 0, 0.16), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09)',
  /* 物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，如：下拉面板等； */
  '--sj-light-shadow-level-2': '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
  /* 物体位于高层级，该物体的运动和其他层级没有关联，如：对话框等。 */
  '--sj-light-shadow-level-3': '0px 6px 16px -8px rgba(0, 0, 0, 0.08), 0px 9px 28px 0px rgba(0, 0, 0, 0.06), 0px 12px 48px 16px rgba(0, 0, 0, 0.03)',
  /* 特定业务主题变量 */
  '--sj-light-select-single-filter-background-color': 'rgba(255, 255, 255, 0.8)'
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
  '--sj-dark-theme-background-color': '#181818',
  '--sj-dark-disable-background-color': 'rgba(0, 0, 0, 0.6)',
  /* 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片 hover 等； */
  '--sj-dark-shadow-level-1': '0px 1px 2px -2px rgba(255, 255, 255, 0.16), 0px 3px 6px 0px rgba(255, 255, 255, 0.12), 0px 5px 12px 4px rgba(255, 255, 255, 0.09)',
  /* 物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，如：下拉面板等； */
  '--sj-dark-shadow-level-2': '0px 3px 6px -4px rgba(255, 255, 255, 0.12), 0px 6px 16px 0px rgba(255, 255, 255, 0.08), 0px 9px 28px 8px rgba(255, 255, 255, 0.05)',
  /* 物体位于高层级，该物体的运动和其他层级没有关联，如：对话框等。 */
  '--sj-dark-shadow-level-3': '0px 6px 16px -8px rgba(255, 255, 255, 0.08), 0px 9px 28px 0px rgba(255, 255, 255, 0.06), 0px 12px 48px 16px rgba(255, 255, 255, 0.03)',
  /* 特定业务主题变量 */
  '--sj-dark-select-single-filter-background-color': 'rgba(0, 0, 0, 0.4)'
}
