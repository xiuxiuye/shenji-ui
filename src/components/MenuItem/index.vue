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
import { computed } from 'vue'
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

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, active)

/**
 * styles
 */
const paddingLeftLevel = computed<number>(() => {
  const subMenuPaddingLeftCount = subMenuInjecter?.value?.paddingLeftLevel || 1
  const menuGroupPaddingLeftCount = menuGroupInjecter?.value?.paddingLeftLevel || 1
  return Math.max(subMenuPaddingLeftCount, menuGroupPaddingLeftCount)
})
const styles = computed<StyleValue>(() => {
  const basePaddingLeft = menuInjecter?.value?.basePaddingLeft || 0
  return {
    paddingLeft: `${paddingLeftLevel.value * basePaddingLeft}px`
  }
})
</script>
