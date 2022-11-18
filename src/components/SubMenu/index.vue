<template>
  <div v-if="isValid" :class="classes">
    <div :class="`${classNamePrefix}-header`" @click="handleClick">
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span :class="`${classNamePrefix}-expand`">
        <Icon :type="expandedIcon" />
      </span>
    </div>
    <CollapseTransition>
      <div v-if="isExpanded" :class="`${classNamePrefix}-body`">
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import useClasses from './hooks/useClasses'
import isString from 'src/utils/isString'
import consoleError from 'src/utils/console/error'
import CollapseTransition from 'src/components/CollapseTransition'

const componentName = 'sj-sub-menu'

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
const isExpanded = ref<boolean>(false)
const handleClick = () => {
  isExpanded.value = !isExpanded.value
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
