<template>
  <div :class="classNamePrefix">
    <div :class="`${classNamePrefix}-header sj-text-ellipsis`" :style="styles">
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
import { componentName as popupComponentName } from '../Popup/index.vue'
import isValidParent from 'src/utils/isValidParent'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as subMenuComponentName } from '../SubMenu/index.vue'
import type { Provider as MenuProvider } from '../Menu/types'
import type { Provider as SubMenuProvider } from '../SubMenu/types'
import type { Provider } from './types'
import type { StyleValue } from 'src/types/global'

interface Props {
  title?: string;
  icon?: string;
}

export const componentName = 'sj-menu-group'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
defineProps<Props>()

/**
 * injecter
 */
const menuInjecter = useInject<MenuProvider>(menuComponentName)
const subMenuInjecter = useInject<SubMenuProvider>(subMenuComponentName)
const menuGroupInjecter = useInject<Provider>(componentName)

/**
 * menu mode
 */
const popupMenu = computed<boolean>(() => {
  if (!menuInjecter) return false
  return menuInjecter?.value?.popupMenu
})

/**
 * classes
 */
const classNamePrefix = componentName

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
 * styles
 */
let popupMenuPaddingLeftSpan = 0
const paddingLeftSpan = computed<number>(() => {
  const subMenuPaddingLeftSpan = subMenuInjecter?.value?.paddingLeftSpan || 0
  const menuGroupPaddingLeftSpan =
    menuGroupInjecter?.value?.paddingLeftSpan || 0

  if (popupMenu.value) {
    if (currentMenuLevel.value === 1) {
      popupMenuPaddingLeftSpan = 1
    } else if (!popupMenuPaddingLeftSpan) {
      if (isValidParent(popupComponentName)) {
        popupMenuPaddingLeftSpan = 1
      } else {
        popupMenuPaddingLeftSpan = menuGroupPaddingLeftSpan + 1
      }
    }
    return popupMenuPaddingLeftSpan
  }
  return Math.max(subMenuPaddingLeftSpan, menuGroupPaddingLeftSpan) + 1
})
const styles = computed<StyleValue>(() => {
  const basePaddingLeft = menuInjecter?.value?.basePaddingLeft || 0
  return {
    paddingLeft: `${paddingLeftSpan.value * basePaddingLeft}px`
  }
})

/**
 * provider
 */
const provider = computed<Provider>(() => {
  return {
    menuLevel: currentMenuLevel.value,
    paddingLeftSpan: paddingLeftSpan.value
  }
})
useProvide<Provider>(componentName, provider)
</script>
