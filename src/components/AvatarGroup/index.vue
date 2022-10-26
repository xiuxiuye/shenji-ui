<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'
const componentName = 'sj-avatar-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  tight?: boolean;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tight: false,
  vertical: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
