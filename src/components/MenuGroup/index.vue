<template>
  <div :class="classNamePrefix">
    <div :class="`${classNamePrefix}-header`" :style="styles">
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
    </div>
    <div :class="`${classNamePrefix}-body`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon'
import { computed } from 'vue'
import useProvide from 'src/utils/hooks/useProvide'
import useInject from 'src/utils/hooks/useInject'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as subMenuComponentName } from '../SubMenu/index.vue'
import type { Provider as MenuProvider } from '../Menu/types'
import type { Provider as SubMenuProvider } from '../SubMenu/types'
import type { Provider } from './types'
import type { StyleValue } from 'src/types/global'

export const componentName = 'sj-menu-group'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
}
defineProps<Props>()

/**
 * injecter
 */
const menuInjecter = useInject<MenuProvider>(menuComponentName)
const subMenuInjecter = useInject<SubMenuProvider>(subMenuComponentName)
const menuGroupInjecter = useInject<Provider>(componentName)

/**
 * classes
 */
const classNamePrefix = componentName

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
