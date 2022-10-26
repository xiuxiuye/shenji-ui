<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'
import isValidParent from 'src/utils/isValidParent'
import consoleError from 'src/utils/console/error'

const componentName = 'sj-grid-item'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * check parent is valid
 */
const isValid = isValidParent('sj-grid')
if (!isValid) {
  consoleError('神机：非法使用GridItem组件，请配合Grid组件使用')
}

/**
 * props
 */
interface Props {
  colSpan?: number | string | [number | string, number | string];
  rowSpan?: number | string | [number | string, number | string];
  justify?: 'start' | 'end' | 'center' | 'stretch';
  align?: 'start' | 'end' | 'center' | 'stretch';
}

const props = defineProps<Props>()

const classes = useClasses(componentName, props)
const styles = useStyles(props)
</script>
