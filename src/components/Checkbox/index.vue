<template>
  <div :class="classes">
    <input ref="sjCheckboxRef" type="checkbox" class="sj-checkbox-input" :autofocus="autofocus" v-model="checked" @change="handleChange" />
    <div :class="'sj-checkbox-box'">
      <transition name="sj-origin-scale">
        <div :class="checkedClasses" v-if="checked"></div>
      </transition>
      <div class="sj-checkbox-indeterminate"></div>
    </div>
    <span class="sj-checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import useClasses from './hooks/useClasses'
import useCheckedClasses from './hooks/useCheckedClasses'
const componentName = 'sj-checkbox'
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
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  modelValue: false,
  indeterminate: false
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const checkedClasses = useCheckedClasses(classNamePrefix, props)

/**
 * emit
 */
interface IEmit {
  (e: 'change', value: boolean, event: Event): void;
  (e: 'update:modelValue', value: boolean): void;
}
const emit = defineEmits<IEmit>()

/**
 * v-model
 */
const checked = ref<boolean>(!!props?.modelValue)
watch(() => props?.modelValue, () => {
  if (checked.value !== !!props?.modelValue) {
    checked.value = !!props?.modelValue
  }
})
/**
 * event
 */
const handleChange = (event: Event) => {
  emit('change', checked?.value, event)
  emit('update:modelValue', checked?.value)
}

/**
 * methods
 */
const sjCheckboxRef = ref(null)
const focus = () => {
  const dom: HTMLElement | null = sjCheckboxRef?.value
  if (dom) {
    (dom as HTMLElement)?.focus()
  }
}

const blur = () => {
  const dom: HTMLElement | null = sjCheckboxRef?.value
  if (dom) {
    (dom as HTMLElement)?.blur()
  }
}

interface IExposeVars {
  focus: () => void;
  blur: () => void;
}
const exposeVars: IExposeVars = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
