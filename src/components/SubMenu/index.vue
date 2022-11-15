<template>
  <div :class="classes">
    <div :class="`${classNamePrefix}-title`"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'

const componentName = 'sj-sub-menu'

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
  expandedIcon?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  expandedIcon: 'down',
  disabled: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
