<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import useClasses from './hooks/useClasses'
import type { CommonSize } from 'src/types/global'

/**
 * props
 */
interface Props {
  size?: CommonSize;
  vertical?: boolean;
  round?: boolean;
}

const componentName = 'sj-button-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), { size: 'normal', vertical: false, round: false })

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
