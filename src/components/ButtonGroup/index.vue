<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import useClasses from './hooks/useClasses'
const componentName = 'sj-button-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface IProps {
  size?: 'small' | 'normal' | 'large';
  vertical?: boolean;
  round?: boolean;
}

const props = withDefaults(defineProps<IProps>(), { size: 'normal', vertical: false, round: false })

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
