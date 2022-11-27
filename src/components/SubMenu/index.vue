<template>
  <div v-if="isValid" :class="classes" :key="symbol" ref="sjSubMenuRef">
    <div
      :class="headerClasses"
      :style="styles"
      @click="handleClick"
      @mouseenter="handleHeaderMouseEnter"
      @mouseleave="handleHeaderMouseLeave"
    >
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title sj-text-ellipsis`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span :class="expandIconClasses" v-if="expandedIcon">
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
      :placement="popupPlacement"
      flipable
    >
      <div
        :class="popupBodyClasses"
        :style="horizontalLevel1PopupStyles"
        @mouseenter="handlePopupMouseEnter"
        @mouseleave="handlePopupMouseLeave"
      >
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
import {
  useClasses,
  useHeaderClasses,
  useExpandIconClasses,
  usePopupBodyClasses
} from './hooks/useClasses'
import { componentName as popupComponentName } from '../Popup/index.vue'
import { componentName as menuComponentName } from '../Menu/index.vue'
import { componentName as menuGroupComponentName } from '../MenuGroup/index.vue'
import {
  MenuModes,
  type Provider as MenuProvider,
  type MenuMode
} from '../Menu/types'
import type { Provider as MenuGroupProvider } from '../MenuGroup/types'
import type { Provider } from './types'
import type { StyleValue, Timeout } from 'src/types/global'

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
 * current menu level
 */
const currentMenuLevel = computed<number>(() => {
  const menuLevel = menuInjecter?.value?.menuLevel || 0
  const subMenuLevel = subMenuInjecter?.value?.menuLevel || 0
  const menuGroupLevel = menuGroupInjecter?.value?.menuLevel || 0
  return Math.max(menuLevel, subMenuLevel, menuGroupLevel) + 1
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

/**
 * horizontal level1 popup min-width
 */
const horizontalLevel1PopupStyles = computed<StyleValue>(() => {
  const styles: StyleValue = {}
  if (
    menuMode.value === MenuModes.horizontal &&
    currentMenuLevel.value === 1 &&
    sjSubMenuRef.value
  ) {
    styles.minWidth = `${sjSubMenuRef.value?.offsetWidth}px`
  }
  return styles
})

/**
 * popup placement
 */
const popupPlacement = computed<string>(() => {
  if (menuMode.value === MenuModes.horizontal && currentMenuLevel.value === 1) {
    return 'bottom-start'
  }
  return 'right-start'
})

const expandedIcon = computed<string>(() => {
  if (menuMode.value === MenuModes.horizontal && currentMenuLevel.value === 1) return ''
  if (props?.expandedIcon) return props?.expandedIcon
  if (menuMode.value === MenuModes.inline) return 'down'
  return 'right'
})

/**
 * disabled
 */
const disabled = computed<boolean>(() => {
  if (subMenuInjecter) return subMenuInjecter?.value?.disabled
  return props?.disabled
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
  if (disabled.value || popupMenu.value) return
  updateExpandedSubMenus(expanded.value ? [] : [props?.symbol], true)
}

/**
 * toggle popup menu expanded
 */
let enterHeaderTimeout: Timeout | null = null
let leaveHeaderTimeout: Timeout | null = null
const setEnterHeaderTimeout = () => {
  if (!enterHeaderTimeout) {
    enterHeaderTimeout = setTimeout(() => {
      updateExpandedSubMenus([props?.symbol], true)
      enterHeaderTimeout = null
    }, 100)
  }
}
const setLeaveHeaderTimeout = () => {
  if (!leaveHeaderTimeout) {
    leaveHeaderTimeout = setTimeout(() => {
      updateExpandedSubMenus([], true)
      leaveHeaderTimeout = null
    }, 100)
  }
}
const clearLeaveHeaderTimeout = () => {
  if (leaveHeaderTimeout) clearTimeout(leaveHeaderTimeout)
  leaveHeaderTimeout = null
}
/**
 * enter & leave sub-menu header
 */
const handleHeaderMouseEnter = () => {
  if (disabled.value) return
  if (leaveHeaderTimeout) {
    clearLeaveHeaderTimeout()
  }
  setEnterHeaderTimeout()
}
const handleHeaderMouseLeave = () => {
  if (disabled.value) return
  setLeaveHeaderTimeout()
}
/**
 * enter & leave popup menu
 */
const handlePopupMouseEnter = () => {
  if (disabled.value) return
  if (subMenuInjecter) {
    subMenuInjecter?.value?.handlePopupMouseEnter()
  }
  if (leaveHeaderTimeout) {
    clearLeaveHeaderTimeout()
  }
}
const handlePopupMouseLeave = () => {
  if (disabled.value) return
  setLeaveHeaderTimeout()
  if (subMenuInjecter) {
    subMenuInjecter?.value?.handlePopupMouseLeave()
  }
}

/**
 * classes
 */
const ignoreExpandAnimation = computed<boolean>(() => {
  if (menuMode.value === MenuModes.vertical) return true
  if (menuMode.value === MenuModes.horizontal && currentMenuLevel.value > 1) {
    return true
  }
  return false
})
const horizontal = computed<boolean>(() => {
  return menuMode.value === MenuModes.horizontal
})
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, active, disabled)
const headerClasses = useHeaderClasses(
  classNamePrefix,
  horizontal,
  currentMenuLevel
)
const expandIconClasses = useExpandIconClasses(
  classNamePrefix,
  expanded,
  ignoreExpandAnimation
)
const popupBodyClasses = usePopupBodyClasses(classNamePrefix, menuInjecter)

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
    disabled: disabled.value,
    menuLevel: currentMenuLevel.value,
    paddingLeftSpan: paddingLeftSpan.value,
    updateActiveSubMenus,
    updateExpandedSubMenus,
    handlePopupMouseEnter,
    handlePopupMouseLeave
  }
})
useProvide<Provider>(componentName, provider)
</script>
