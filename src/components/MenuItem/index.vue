<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'

const componentName = 'sj-menu-item'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  // eslint-disable-next-line vue/no-reserved-props
  key: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
