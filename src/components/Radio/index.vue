<template>
  <div :class="classes">
    <input ref="sjRadioRef" type="radio" class="sj-radio-input" v-model="realValue" :checked="realChecked"
      :value="value" :autofocus="autofocus" :name="realName" @change="handleChange" />
    <div class="sj-radio-box">
      <Transition name="sj-origin-scale">
        <div class="sj-radio-box-checked" v-if="realChecked"></div>
      </Transition>
    </div>
    <span class="sj-radio-label">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, ref, watchEffect } from 'vue'
import useClasses from './hooks/useClasses'
import useInject from 'src/utils/hooks/useInject'
import { componentName as radioGroupComponentName } from '../RadioGroup/index.vue'
import type { RadioRefExpose } from './types'
import type { Provider } from '../RadioGroup/types'

const componentName = 'sj-radio'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * inject
 */
const injecter = useInject<Provider>(radioGroupComponentName)

/**
 * props
 */
interface Props {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  name?: string;
  value?: string | number;
}
const props = withDefaults(defineProps<Props>(), {
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
const classes = useClasses(classNamePrefix, props, injecter)
/**
 * name
 */
const realName = computed<string>(() => injecter?.value?.name || props?.name)
/**
 * emit
 */
interface Emit {
  (e: 'change', value: string | number, event: Event): void;
  (e: 'update:modelValue', value: boolean): void;
}
const emit = defineEmits<Emit>()
/**
 * model-value
 */
const realValue = ref<string | number>('')
watchEffect(() => {
  const radioGroupValue = injecter?.value?.realValue
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
  injecter?.value?.updateRadioGroupValue(props?.value)
  emit('change', realValue?.value, event)
  emit('update:modelValue', realChecked?.value)
}
/**
 * methods
 */
const sjRadioRef = ref<HTMLElement | null>(null)
const focus = () => {
  if (sjRadioRef.value) {
    sjRadioRef.value?.focus()
  }
}

const blur = () => {
  if (sjRadioRef.value) {
    sjRadioRef.value?.blur()
  }
}

const exposeVars: RadioRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
