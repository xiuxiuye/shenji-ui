<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClassesComputed from './hooks/useClassesComputed'
const componentName = 'sj-avatar-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  tight?: boolean;
  vertical?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  tight: false,
  vertical: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClassesComputed(classNamePrefix, props)
</script>
