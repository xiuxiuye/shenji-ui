<template>
  <div v-if="isValid" :class="classes" :key="symbol">
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
 * 合法性检查
 */
const isValid = computed<boolean>(() => {
  console.log(props?.symbol)
  if (props?.symbol && isString(props?.symbol)) return true
  consoleError('神机：symbol is a required prop for the MenuItem component')
  return false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
