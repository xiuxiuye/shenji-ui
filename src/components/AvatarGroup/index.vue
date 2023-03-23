<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'

interface Props {
  tight?: boolean;
  vertical?: boolean;
}

const componentName = 'sj-avatar-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
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
