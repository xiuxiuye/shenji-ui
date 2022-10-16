<template>
  <div :class="classes">
    <input
      ref="sjCheckboxRef"
      type="checkbox"
      class="sj-checkbox-input"
      :autofocus="autofocus"
      v-model="checked"
      @change="handleChange"
    />
    <div class="sj-checkbox-box">
      <Transition name="sj-origin-scale">
        <div :class="checkedClasses" v-if="checked"></div>
      </Transition>
    </div>
    <span class="sj-checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { ref, watch, watchEffect } from 'vue'
import isArray from 'src/utils/isArray'
import useInject from './hooks/useInject'
import useClasses from './hooks/useClasses'
import useCheckedClasses from './hooks/useCheckedClasses'
import isValidParent from 'src/utils/isValidParent'
import type { ICheckboxRefExpose } from './types'
const componentName = 'sj-checkbox'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * inject
 */
const injects = useInject()

/**
 * props
 */
interface IProps {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
  value?: string | number | boolean;
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
const classes = useClasses(classNamePrefix, props, injects?.checkboxGroupProps)
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
const isCheckboxGroupChild = isValidParent('sj-checkbox-group')
const checked = ref<boolean>(!!props?.modelValue)
watch(
  () => props?.modelValue,
  () => {
    if (checked.value !== !!props?.modelValue) {
      checked.value = !!props?.modelValue
    }
  }
)

watchEffect(() => {
  if (!isCheckboxGroupChild) return
  if (!props?.value) {
    console.error(
      new Error('神机：value is required of checkbox in checkboxGroup')
    )
    return
  }
  const checkboxGroupValues = injects?.checkboxGroupProps?.value?.modelValue
  if (checkboxGroupValues && isArray(checkboxGroupValues)) {
    checked.value = checkboxGroupValues?.includes(props?.value)
  }
})

watch(checked, (val) => {
  if (!isCheckboxGroupChild) return
  if (!props?.value) {
    console.error(
      new Error('神机：value is required of checkbox in checkboxGroup')
    )
    return
  }
  if (val) {
    injects?.checkboxGroupMethods?.addChecked(props?.value)
  } else {
    injects?.checkboxGroupMethods?.removeChecked(props?.value)
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

const exposeVars: ICheckboxRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
