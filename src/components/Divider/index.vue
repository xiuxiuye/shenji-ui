<template>
  <div :class="classes">
    <div :class="`${classNamePrefix}-left`" :style="leftStyles" />
    <template v-if="hasText">
      <div :class="`${classNamePrefix}-text`">
        <slot>{{ text }}</slot>
      </div>
      <div :class="`${classNamePrefix}-right`" :style="rightStyles" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, useSlots } from 'vue'
import useClasses from './hooks/useClasses'
import useLeftStyles from './hooks/useLeftStyles'
import useRightStyles from './hooks/useRightStyles'
const componentName = 'sj-divider'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface Props {
  dashed?: boolean;
  text?: string;
  placement?: 'left' | 'right' | 'center';
  vertical?: boolean;
  offset?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  dashed: false,
  placement: 'center',
  vertical: false,
  offset: '8%'
})

/**
 * slots
 */
const slots = useSlots()
const hasText = computed<boolean>(() => !!(slots?.default || props?.text) && !props?.vertical)

/**
 * classes & styles
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const leftStyles = useLeftStyles(hasText, props)
const rightStyles = useRightStyles(hasText, props)
</script>
