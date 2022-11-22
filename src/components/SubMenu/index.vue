<template>
  <div v-if="isValid" :class="classes" :key="symbol" ref="sjSubMenuRef">
    <div
      :class="`${classNamePrefix}-header`"
      :style="styles"
      @click="handleClick"
    >
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title sj-text-ellipsis`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span :class="expandIconClasses">
        <slot name="expanded-icon">
          <Icon :type="expandedIcon" />
        </slot>
      </span>
    </div>
    <Popup
      v-if="popupMenu"
      :mount-following="true"
      :visible="expanded"
      :reference-ref="sjSubMenuRef"
      placement="right-start"
      flipable
    >
      <div :class="`${classNamePrefix}-popup-body`">
        <slot></slot>
      </div>
    </Popup>
    <CollapseTransition v-else>
      <div v-if="expanded" :class="`${classNamePrefix}-body`">
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import isString from 'src/utils/isString'
import isValidParent from 'src/utils/isValidParent'
import consoleError from 'src/utils/console/error'
import useProvide from 'src/utils/hooks/useProvide'
import useInject from 'src/utils/hooks/useInject'
import Popup from '../Popup'
import CollapseTransition from '../CollapseTransition'
import { useClasses, useExpandIconClasses } from './hooks/useClasses'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as menuGroupComponentName } from '../MenuGroup/index.vue'
import {
  MenuModes,
  type Provider as MenuProvider,
  type MenuMode
} from '../Menu/types'
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
  disabled: false
})

/**
 * ref
 */
const sjSubMenuRef = ref<HTMLElement | null>(null)

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
 * menu mode
 */
const menuMode = computed<MenuMode>(() => {
  if (!menuInjecter) return MenuModes.inline
  return menuInjecter?.value?.mode
})
const popupMenu = computed<boolean>(() => {
  if (!menuInjecter) return false
  return menuInjecter?.value?.popupMenu
})

const expandedIcon = computed<string>(() => {
  if (props?.expandedIcon) return props?.expandedIcon
  return popupMenu.value ? 'right' : 'down'
})

/**
 * disabled
 */
const disabled = computed<boolean>(() => {
  if (subMenuInjecter) return subMenuInjecter?.value?.disabled
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
  if (!isValid.value || !menuInjecter) return false
  return menuInjecter?.value?.activeSubMenus?.includes(props?.symbol)
})

/**
 * update active sub-menus
 */
const updateActiveSubMenus = (symbols: string[]) => {
  const newActiveSubMenus = [props?.symbol, ...symbols]
  if (subMenuInjecter) {
    subMenuInjecter?.value?.updateActiveSubMenus(newActiveSubMenus)
  } else if (menuInjecter) {
    menuInjecter?.value?.updateActiveSubMenus(newActiveSubMenus)
  }
}

/**
 * update expanded sub-menus
 */
const updateExpandedSubMenus = (symbols: string[], self?: boolean) => {
  if (!menuInjecter) return
  if (!menuInjecter?.value?.accordion) {
    menuInjecter?.value?.updateExpandedSubMenus(props?.symbol)
    return
  }
  const newExpandedSubMenus = self ? [...symbols] : [props?.symbol, ...symbols]
  if (subMenuInjecter) {
    subMenuInjecter?.value?.updateExpandedSubMenus(newExpandedSubMenus)
  } else {
    menuInjecter?.value?.updateExpandedSubMenus(newExpandedSubMenus)
  }
}

/**
 * toggle expand
 */
const expanded = computed<boolean>(() => {
  if (!isValid.value || !menuInjecter) return false
  return menuInjecter?.value?.expandedSubMenus?.includes(props?.symbol)
})
const handleClick = () => {
  if (disabled.value) return
  updateExpandedSubMenus(expanded.value ? [] : [props?.symbol], true)
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, active, disabled)
const expandIconClasses = useExpandIconClasses(classNamePrefix, expanded, popupMenu)

/**
 * styles
 */
const paddingLeftSpan = computed<number>(() => {
  const subMenuPaddingLeftSpan = subMenuInjecter?.value?.paddingLeftSpan || 1
  const menuGroupPaddingLeftSpan =
    menuGroupInjecter?.value?.paddingLeftSpan || 1
  if (popupMenu.value) {
    return isValidParent(menuGroupComponentName)
      ? menuGroupPaddingLeftSpan + 1
      : 1
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
    disabled: disabled.value,
    menuLevel: currentMenuLevel.value,
    paddingLeftSpan: paddingLeftSpan.value,
    updateActiveSubMenus,
    updateExpandedSubMenus
  }
})
useProvide<Provider>(componentName, provider)
</script>
