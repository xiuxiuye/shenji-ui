<template>
  <div :class="classes">{{realValue}}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect } from 'vue'
import isArray from 'src/utils/isArray'
import useClasses from './hooks/useClasses'
import useProvide from './hooks/useProvide'
import type { CommonSize } from 'src/types/global'
const componentName = 'sj-checkbox-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: Array<number | string | boolean>;
  vertical?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  vertical: false,
  modelValue: () => ([])
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * emit
 */
interface IEmit {
  (e: 'change', value: Array<number | string | boolean>): void;
  (e: 'update:modelValue', value: Array<number | string | boolean>): void;
}
const emit = defineEmits<IEmit>()

/**
 * model-value
 */
const realValue = ref<Array<number | string | boolean>>([])

watchEffect(() => {
  if (isArray(props?.modelValue)) {
    realValue.value = props?.modelValue
  }
})

const addChecked = (value: number | string | boolean) => {
  if (realValue?.value?.includes(value)) return
  realValue?.value?.push(value)
  emit('update:modelValue', realValue?.value)
  emit('change', realValue?.value)
}
const removeChecked = (value: number | string | boolean) => {
  const index = realValue?.value?.findIndex(val => val === value)
  if (index >= 0) {
    realValue?.value?.splice(index, 1)
    emit('update:modelValue', realValue?.value)
    emit('change', realValue?.value)
  }
}

/**
 * provide
 */
useProvide(props, { addChecked, removeChecked })
</script>
