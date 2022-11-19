<template>
  <div v-if="isValid" :class="classes" :key="symbol">
    <div :class="`${classNamePrefix}-header`" :style="styles" @click="handleClick">
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span :class="expandIconClasses">
        <Icon :type="expandedIcon" />
      </span>
    </div>
    <CollapseTransition>
      <div v-if="expanded" :class="`${classNamePrefix}-body`">
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useClasses, useExpandIconClasses } from './hooks/useClasses'
import isString from 'src/utils/isString'
import consoleError from 'src/utils/console/error'
import CollapseTransition from 'src/components/CollapseTransition'
import useProvide from 'src/utils/hooks/useProvide'
import useInject from 'src/utils/hooks/useInject'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as menuGroupComponentName } from '../MenuGroup/index.vue'
import type { Provider as MenuProvider } from '../Menu/types'
import type { Provider as MenuGroupProvider } from '../MenuGroup/types'
import type { Provider } from './types'
import type { StyleValue } from 'src/types/global'

export const componentName = 'sj-sub-menu'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  symbol: string;
  title?: string;
  icon?: string;
  expandedIcon?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  expandedIcon: 'down',
  disabled: false
})

/**
 * injecter
 */
const menuInjecter = useInject<MenuProvider>(menuComponentName)
const menuGroupInjecter = useInject<MenuGroupProvider>(menuGroupComponentName)
const subMenuInjecter = useInject<Provider>(componentName)

/**
 * 合法性检查
 */
const isValid = computed<boolean>(() => {
  if (props?.symbol && isString(props?.symbol)) return true
  consoleError('神机：symbol is a required prop for the SubMenu component')
  return false
})

/**
 * toggle expand
 */
const expanded = computed<boolean>(() => {
  if (!isValid.value || !menuInjecter?.value?.expandedSubMenus) return false
  return menuInjecter?.value?.expandedSubMenus?.includes(props?.symbol)
})
const handleClick = () => {
  if (props?.disabled) return
  const updateExpandedSubMenus = menuInjecter?.value?.updateExpandedSubMenus
  if (updateExpandedSubMenus) {
    updateExpandedSubMenus(props?.symbol)
  }
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const expandIconClasses = useExpandIconClasses(classNamePrefix, expanded)

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

/**
 * provider
 */
const provider = computed<Provider>(() => {
  return {
    paddingLeftLevel: paddingLeftLevel.value + 1
  }
})
useProvide<Provider>(componentName, provider)
</script>
