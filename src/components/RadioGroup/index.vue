<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { watchEffect, ref } from 'vue'
import useClasses from './hooks/useClasses'
import useProvide from './hooks/useProvide'
const componentName = 'sj-radio-group'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface IProps {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  modelValue?: string | number;
  vertical?: boolean;
  name?: string;
}
const props = withDefaults(defineProps<IProps>(), {
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
interface IEmit {
  (e: 'change', value: string | number): void;
  (e: 'update:modelValue', value: string | number): void;
}
const emit = defineEmits<IEmit>()

/**
 * model-value
 */
const realValue = ref<string | number>('')

watchEffect(() => {
  realValue.value = props?.modelValue
})

const updateRadioGroupValue = (value: string | number) => {
  realValue.value = value
  emit('change', realValue.value)
  emit('update:modelValue', realValue.value)
}

/**
 * provide
 */
useProvide(realValue, props, { updateRadioGroupValue })
</script>
