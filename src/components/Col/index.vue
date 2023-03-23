<template>
  <div v-if="isValid" :class="classes" :style="styles">
    <slot></slot>
    {{ size }}
  </div>
</template>

<script lang="ts">
import { inject, computed, Ref, ComputedRef } from 'vue'
import useStyles from './hooks/useStyles'
import useClasses from './hooks/useClasses'
import isValidParent from 'src/utils/isValidParent'
import isColResponsive from './utils/isColResponsive'
import useScreenResize from 'src/utils/hooks/useScreenResize'
import consoleError from 'src/utils/console/error'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'
import type { SizeProp } from './types'

/**
 * props
 */
interface Props {
  order?: number | string;
  span?: number | string;
  offset?: number | string;
  push?: number | string;
  pull?: number | string;
  xs?: SizeProp;
  sm?: SizeProp;
  md?: SizeProp;
  lg?: SizeProp;
  xl?: SizeProp;
  xxl?: SizeProp;
  xxxl?: SizeProp;
}

const componentName = 'sj-col'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * check parent is valid
 */
const isValid = isValidParent('sj-row')
if (!isValid) {
  consoleError('神机：非法使用Col组件，请配合Row组件使用')
}

const props = withDefaults(defineProps<Props>(), {
  order: 0,
  span: 24,
  offset: 0,
  push: 0,
  pull: 0
})

/**
 * handle screen resize
 */
const size: Ref<ScreenSize> | null = isColResponsive(props) ? useScreenResize() : null

const offset: ComputedRef<[number, number]> = inject('gutterOffset') || computed(() => [0, 0])

const styles = useStyles(size, offset, props)

const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
