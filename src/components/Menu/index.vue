<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import useClasses from './hooks/useClasses'
import useProvide from 'src/utils/hooks/useProvide'
import isArray from 'src/utils/isArray'
import isString from 'src/utils/isString'
import { MenuModes, type Provider, type MenuMode } from './types'

export const componentName = 'sj-menu'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  mode?: MenuMode;
  activeItem?: string;
  expandedSubMenus?: string[];
  theme?: 'light' | 'dark';
  accordion?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  mode: MenuModes.inline,
  accordion: false
})

/**
 * emit
 */
type Emit = {
  (e: 'click', symbol: string): void;
  (e: 'expand', symbols: string[]): void;
};
const emit = defineEmits<Emit>()

const accordion = computed<boolean>(() => {
  if (props?.mode !== MenuModes.inline) return true
  return props?.accordion
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * active menu-item
 */
const activeItem = ref<string>('')
watch(
  () => props?.activeItem,
  (newValue) => {
    if (newValue && isString(newValue)) {
      activeItem.value = newValue
    }
  },
  {
    immediate: true
  }
)
const updateActiveItem = (symbol: string) => {
  if (activeItem.value !== symbol) {
    activeItem.value = symbol
  }
  emit('click', symbol)
}

/**
 * active sub-menus
 */
const activeSubMenus = ref<string[]>([])
const updateActiveSubMenus = (symbols: string[]) => {
  activeSubMenus.value = symbols
}

/**
 * expanded sub-menu
 */
const expandedSubMenus = ref<string[]>([])
watch(
  () => props?.expandedSubMenus,
  (newValue) => {
    if (newValue && isArray(newValue)) {
      expandedSubMenus.value = newValue
    }
  },
  {
    immediate: true
  }
)
const updateExpandedSubMenus = (symbol: string | string[]) => {
  if (isString(symbol)) {
    const index = expandedSubMenus.value.indexOf(symbol as string)
    if (index === -1) {
      expandedSubMenus.value.push(symbol as string)
    } else {
      expandedSubMenus.value.splice(index, 1)
    }
  } else {
    expandedSubMenus.value = symbol as string[]
  }
  emit('expand', expandedSubMenus.value)
}

/**
 * provider
 */
const provider = computed<Provider>(() => {
  return {
    theme: props?.theme,
    mode: props?.mode,
    popupMenu: props?.mode !== MenuModes.inline,
    accordion: accordion.value,
    menuLevel: 0,
    basePaddingLeft: 16,
    activeItem: activeItem.value,
    activeSubMenus: activeSubMenus.value,
    expandedSubMenus: expandedSubMenus.value,
    updateActiveItem,
    updateActiveSubMenus,
    updateExpandedSubMenus
  }
})
useProvide<Provider>(componentName, provider)
</script>
