<template>
  <div :class="classes" tabindex="0">
    <div :class="`${classNamePrefix}-checked`" v-if="realValue"></div>
    <div :class="`${classNamePrefix}-unchecked`" v-else>自然</div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import useClasses from './hooks/useClasses'
import type { CommonSize } from 'src/types/global'
const componentName = 'sj-switch'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean | number | string;
  loading?: boolean;
  round?: boolean;
  icon?: string;
  checkedValue?: boolean | number | string;
  uncheckedValue?: boolean | number | string;
  rubberBand?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  modelValue: false,
  loading: false,
  round: true,
  checkedValue: true,
  uncheckedValue: false,
  rubberBand: true
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * model value
 */
const realValue = ref<boolean>(false)

watch(
  () => props?.modelValue,
  () => {
    realValue.value = props?.modelValue === props?.checkedValue
  },
  { immediate: true }
)
</script>
