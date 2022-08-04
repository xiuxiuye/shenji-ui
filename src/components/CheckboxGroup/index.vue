<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import useClasses from './hooks/useClasses'
import useProvide from './hooks/useProvide'
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
  size?: 'small' | 'normal' | 'large';
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
const addChecked = (value: number | string | boolean) => {
  if (props?.modelValue?.includes(value)) return
  emit('update:modelValue', [...props?.modelValue, value])
  emit('change', [...props?.modelValue, value])
}
const removeChecked = (value: number | string | boolean) => {
  const tempValue = [...props?.modelValue]
  const index = tempValue?.findIndex(val => val === value)
  if (index >= 0) {
    tempValue?.splice(index, 1)
    emit('update:modelValue', tempValue)
    emit('change', tempValue)
  }
}

/**
 * provide
 */
useProvide(props, { addChecked, removeChecked })
</script>
