<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import useClasses from './hooks/useClasses'
import useProvide from 'src/utils/hooks/useProvide'
import type { Provider } from './types'

/**
 * props
 */
interface Props {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  modelValue?: string | number;
  vertical?: boolean;
  name?: string;
}

export const componentName = 'sj-radio-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  vertical: false,
  modelValue: ''
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
  (e: 'change', value: string | number): void;
  (e: 'update:modelValue', value: string | number): void;
}
const emit = defineEmits<Emit>()

/**
 * model-value
 */
const realValue = ref<string | number>('')

watch(
  () => props?.modelValue,
  () => {
    realValue.value = props?.modelValue
  },
  { immediate: true }
)

const updateRadioGroupValue = (value: string | number) => {
  realValue.value = value
  emit('change', realValue.value)
  emit('update:modelValue', realValue.value)
}

/**
 * provide
 */
const provider = computed<Provider>(() => {
  return {
    size: props?.size,
    disabled: props?.disabled,
    name: props?.name,
    realValue: realValue?.value,
    updateRadioGroupValue
  }
})
useProvide<Provider>(componentName, provider)
</script>
