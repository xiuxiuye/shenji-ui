<template>
  <div v-if="isValid" :class="classes" :style="styles">
    <slot></slot>
    {{size}}
  </div>
</template>

<script lang="ts">
import { inject, computed } from 'vue'
import isValidParent from 'src/utils/isValidParent'
import useScreenResize from 'src/utils/hooks/useScreenResize'
import isColResponsive from './utils/isColResponsive'
import useStyles from './hooks/useStyles'
import useClasses from './hooks/useClasses'
import type { Ref, ComputedRef } from 'vue'

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
  console.error(new Error('神机：非法使用Col组件，请配合Row组件使用'))
}

/**
 * props
 */
interface IProps {
  order?: number | string;
  span?: number | string;
  offset?: number | string;
  push?: number | string;
  pull?: number | string;
  xs?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  sm?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  md?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  lg?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  xl?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  xxl?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
  xxxl?: number | string | Pick<IProps, 'order' | 'span' | 'offset' | 'push' | 'pull'>;
}

const props = withDefaults(defineProps<IProps>(), {
  order: 0,
  span: 24,
  offset: 0,
  push: 0,
  pull: 0
})

/**
 * handle screen resize
 */
const size: Ref<string> | null = isColResponsive(props) ? useScreenResize() : null

const offset: ComputedRef<[number, number]> = inject('gutterOffset') || computed(() => [0, 0])

const styles = useStyles(size, offset, props)

const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
</script>
