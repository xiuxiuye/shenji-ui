<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, provide, Ref } from 'vue'
import useScreenResize from 'src/utils/hooks/useScreenResize'
import isRowResponsive from './utils/isRowResponsive'
import useOffset from './hooks/useOffset'
import useStyles from './hooks/useStyles'
import type { BaseType, Gutter } from './types'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'

const componentName = 'sj-row'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface Props {
  gutter?: BaseType | Gutter;
}

const props = defineProps<Props>()

/**
 * handle screen resize
 */
const size: Ref<ScreenSize> | null = isRowResponsive(props) ? useScreenResize() : null

const offset = useOffset(size, props)
const styles = useStyles(offset)
const classNamePrefix = componentName
const classes = computed<string[]>(() => [classNamePrefix])

/**
 * provide
 */
provide('gutterOffset', offset)
</script>
