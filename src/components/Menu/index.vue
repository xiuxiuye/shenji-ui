<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'

const componentName = 'sj-menu'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  mode?: 'horizontal' | 'vertical' | 'inline';
  activeKey?: string;
  expandedKeys?: string[];
  theme?: 'light' | 'dark';
  accordion?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'inline',
  theme: 'light',
  accordion: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
