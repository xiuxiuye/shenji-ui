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
import useClasses from './hooks/useClasses'
import useCheckedClasses from './hooks/useCheckedClasses'
import useInject from 'src/utils/hooks/useInject'
import isValidParent from 'src/utils/isValidParent'
import consoleError from 'src/utils/console/error'
import { componentName as checkboxGroupComponentName } from '../CheckboxGroup/index.vue'
import type { CheckboxRefExpose } from './types'
import type { Provider } from '../CheckboxGroup/types'

const componentName = 'sj-checkbox'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * inject
 */
const injecter = useInject<Provider>(checkboxGroupComponentName)

/**
 * props
 */
interface Props {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
  value?: string | number | boolean;
}
const props = withDefaults(defineProps<Props>(), {
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
const classes = useClasses(classNamePrefix, props, injecter)
const checkedClasses = useCheckedClasses(classNamePrefix, props)

/**
 * emit
 */
interface Emit {
  (e: 'change', value: boolean, event: Event): void;
  (e: 'update:modelValue', value: boolean): void;
}
const emit = defineEmits<Emit>()

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
    consoleError('神机：value is required of checkbox in checkboxGroup')
    return
  }
  const checkboxGroupValues = injecter?.value?.modelValue
  if (checkboxGroupValues && isArray(checkboxGroupValues)) {
    checked.value = checkboxGroupValues?.includes(props?.value)
  }
})

watch(checked, (val) => {
  if (!isCheckboxGroupChild) return
  if (!props?.value) {
    consoleError('神机：value is required of checkbox in checkboxGroup')
    return
  }
  if (val) {
    injecter?.value?.addChecked(props?.value)
  } else {
    injecter?.value?.removeChecked(props?.value)
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

const exposeVars: CheckboxRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
