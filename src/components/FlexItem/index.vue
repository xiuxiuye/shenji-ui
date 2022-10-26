<template>
  <div v-if="isValid" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'
import isValidParent from 'src/utils/isValidParent'
import consoleError from 'src/utils/console/error'

const componentName = 'sj-flex-item'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * check parent is valid
 */
const isValid = isValidParent('sj-flex')
if (!isValid) {
  consoleError('神机：非法使用FlexItem组件，请配合Flex组件使用')
}

/**
 * props
 */
interface Props {
  order?: number | string;
  grow?: boolean | number | string | undefined;
  shrink?: boolean | number | string | undefined;
  align?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

const props = withDefaults(defineProps<Props>(), {
  grow: undefined,
  shrink: undefined
})

/**
 * classes && styles
 */
const classes = useClasses(componentName, props)
const styles = useStyles(props)
</script>
