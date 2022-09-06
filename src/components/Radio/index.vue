<template>
  <div :class="classes">
    <input ref="sjRadioRef" type="radio" class="sj-radio-input" v-model="realValue" :checked="realChecked"
      :value="value" :autofocus="autofocus" :name="realName" @change="handleChange" />
    <div class="sj-radio-box">
      <transition name="sj-origin-scale">
        <div class="sj-radio-box-checked" v-if="realChecked"></div>
      </transition>
    </div>
    <span class="sj-radio-label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, ref, watchEffect } from 'vue'
import useInject from './hooks/useInject'
import useClasses from './hooks/useClasses'
import type { IRadioRefExpose } from './types'
const componentName = 'sj-radio'
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
  name?: string;
  value?: string | number;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  name: '',
  value: 'on'
})
/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, injects?.radioGroupProps)
/**
 * name
 */
const realName = computed<string>(() => injects?.radioGroupProps?.value?.name || props?.name)
/**
 * emit
 */
interface IEmit {
  (e: 'change', value: string | number, event: Event): void;
  (e: 'update:modelValue', value: boolean): void;
}
const emit = defineEmits<IEmit>()
/**
 * model-value
 */
const realValue = ref<string | number>('')
watchEffect(() => {
  const radioGroupValue = injects?.radioGroupProps?.value?.realValue
  if (radioGroupValue) {
    realValue.value = radioGroupValue
  } else if (props?.modelValue) {
    realValue.value = props?.value
  } else {
    realValue.value = ''
  }
})

const realChecked = computed<boolean>(() => realValue?.value === props?.value)
/**
 * event
 */
const handleChange = (event: Event) => {
  if (injects?.radioGroupMethods) {
    injects?.radioGroupMethods?.updateRadioGroupValue(props?.value)
  }
  emit('change', realValue?.value, event)
  emit('update:modelValue', realChecked?.value)
}
/**
 * methods
 */
const sjRadioRef = ref(null)
const focus = () => {
  const dom: HTMLElement | null = sjRadioRef?.value
  if (dom) {
    (dom as HTMLElement)?.focus()
  }
}

const blur = () => {
  const dom: HTMLElement | null = sjRadioRef?.value
  if (dom) {
    (dom as HTMLElement)?.blur()
  }
}

const exposeVars: IRadioRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
