<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'
const componentName = 'sj-flex'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface Props {
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean | undefined;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

const props = withDefaults(defineProps<Props>(), {
  wrap: undefined
})

/**
 * classes
 */
const classes = useClasses(componentName, props)
</script>
