<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import isArray from 'src/utils/isArray'
import useClasses from './hooks/useClasses'
import useProvide from 'src/utils/hooks/useProvide'
import type { Provider } from './types'
import type { CommonSize } from 'src/types/global'

export const componentName = 'sj-checkbox-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface Props {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: Array<number | string | boolean>;
  vertical?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  vertical: false,
  modelValue: () => []
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * emit
 */
interface Emit {
  (e: 'change', value: Array<number | string | boolean>): void;
  (e: 'update:modelValue', value: Array<number | string | boolean>): void;
}
const emit = defineEmits<Emit>()

/**
 * model-value
 */
const realValue = ref<Array<number | string | boolean>>([])

watch(props?.modelValue, () => {
  if (isArray(props?.modelValue)) {
    realValue.value = props?.modelValue
  }
}, { immediate: true })

const addChecked = (value: number | string | boolean) => {
  if (realValue?.value?.includes(value)) return
  realValue?.value?.push(value)
  emit('update:modelValue', realValue?.value)
  emit('change', realValue?.value)
}
const removeChecked = (value: number | string | boolean) => {
  const index = realValue?.value?.findIndex((val) => val === value)
  if (index >= 0) {
    realValue?.value?.splice(index, 1)
    emit('update:modelValue', realValue?.value)
    emit('change', realValue?.value)
  }
}

/**
 * provide
 */
const provider = computed<Provider>(() => {
  return {
    size: props?.size,
    disabled: props?.disabled,
    modelValue: props?.modelValue,
    addChecked,
    removeChecked
  }
})
useProvide<Provider>(componentName, provider)
</script>
