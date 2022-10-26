<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'

const componentName = 'sj-grid'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  cols?: number | string;
  rows?: number | string;
  colGap?: number | string;
  rowGap?: number | string;
  flow?: 'row' | 'column' | 'row-dense' | 'column-dense';
  justify?: 'start' | 'end' | 'center' | 'stretch';
}

const props = withDefaults(defineProps<Props>(), { cols: 24 })

const classes = useClasses(componentName, props)
const styles = useStyles(props)
</script>
