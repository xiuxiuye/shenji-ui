<template>
  <div v-if="isValid" :class="classes" :style="styles" :key="symbol" @click="handleClick">
    <span v-if="icon" :class="`${classNamePrefix}-icon`">
      <Icon :type="icon" />
    </span>
    <span :class="`${classNamePrefix}-content`">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon'
import { computed, watch } from 'vue'
import isString from 'src/utils/isString'
import consoleError from 'src/utils/console/error'
import useClasses from './hooks/useClasses'
import useInject from 'src/utils/hooks/useInject'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as subMenuComponentName } from '../SubMenu/index.vue'
import { componentName as menuGroupComponentName } from '../MenuGroup/index.vue'
import type { Provider as MenuProvider } from '../Menu/types'
import type { Provider as SubMenuProvider } from '../SubMenu/types'
import type { Provider as MenuGroupProvider } from '../MenuGroup/types'
import type { StyleValue } from 'src/types/global'

const componentName = 'sj-menu-item'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  symbol: string;
  icon?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

/**
 * injecter
 */
const menuInjecter = useInject<MenuProvider>(menuComponentName)
const subMenuInjecter = useInject<SubMenuProvider>(subMenuComponentName)
const menuGroupInjecter = useInject<MenuGroupProvider>(menuGroupComponentName)

/**
 * 合法性检查
 */
const isValid = computed<boolean>(() => {
  if (props?.symbol && isString(props?.symbol)) return true
  consoleError('神机：symbol is a required prop for the MenuItem component')
  return false
})

/**
 * disabled
 */
const disabled = computed<boolean>(() => {
  return props?.disabled
})

/**
 * current menu level
 */
const currentMenuLevel = computed<number>(() => {
  const menuLevel = menuInjecter?.value?.menuLevel || 0
  const subMenuLevel = subMenuInjecter?.value?.menuLevel || 0
  const menuGroupLevel = menuGroupInjecter?.value?.menuLevel || 0
  return Math.max(menuLevel, subMenuLevel, menuGroupLevel) + 1
})

/**
 * active
 */
const active = computed<boolean>(() => {
  if (!isValid.value) return false
  return props?.symbol === menuInjecter?.value?.activeItem
})
const handleClick = () => {
  if (disabled.value) return
  const updateActiveItem = menuInjecter?.value?.updateActiveItem
  if (updateActiveItem) {
    updateActiveItem(props?.symbol)
  }
}
watch(active, (newValue) => {
  if (newValue) {
    if (subMenuInjecter) {
      subMenuInjecter?.value?.updateActiveSubMenus([])
    } else {
      menuInjecter?.value?.updateActiveSubMenus([])
    }
  }
}, { immediate: true })

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, active)

/**
 * styles
 */
const styles = computed<StyleValue>(() => {
  const basePaddingLeft = menuInjecter?.value?.basePaddingLeft || 0
  return {
    paddingLeft: `${currentMenuLevel.value * basePaddingLeft}px`
  }
})
</script>
