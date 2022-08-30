<template>
  <div :class="conatinerClasses">
    {{ realValue }}
    <slot name="prepend" v-if="slots?.prepend"></slot>
    <div :class="classes">
      <div :class="`${classNamePrefix}-prefix`" v-if="slots?.prefix || prefix">
        <slot name="prefix">
          <Icon v-if="!!prefix" :type="prefix" />
        </slot>
      </div>
      <input
        ref="sjInputNumberRef"
        type="text"
        v-model="realValue"
        :autofocus="autofocus"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div :class="`${classNamePrefix}-suffix`" v-if="slots?.suffix || suffix">
        <slot name="suffix">
          <Icon v-if="!!suffix" :type="suffix" />
        </slot>
      </div>
      <Icon
        v-if="isClearBtnVisible"
        :class="`${classNamePrefix}-clear`"
        type="close-circle-fill"
        @click="handleClear"
      />
      <div class="sj-input-number-control" v-if="controls">
        <div :class="addClasses">
          <Icon :type="addIcon" size="small" @click="handleAddNumber" />
        </div>
        <div :class="minusClasses">
          <Icon :type="minusIcon" size="small" @click="handleMinusNumber" />
        </div>
      </div>
    </div>
    <slot name="append" v-if="slots?.append"></slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, useSlots, watch } from 'vue'
import Icon from 'src/components/Icon'
import toFixed from 'src/utils/toFixed'
import isNumber from 'src/utils/isNumber'
import isFunction from 'src/utils/isFunction'
import isVaildNumber from 'src/utils/isVaildNumber'
import useClasses from './hooks/useClasses'
import useControlClasses from './hooks/useControlClasses'
import useConatinerClasses from './hooks/useContainerClasses'
const componentName = 'sj-input-number'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
type Formatter = (value?: number) => string;
type Parse = (value?: string) => number | undefined;
interface IProps {
  size?: 'small' | 'normal' | 'large';
  clearable?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: number;
  max?: number | string;
  min?: number | string;
  step?: number | string;
  precision?: number | string;
  status?: 'success' | 'warning' | 'error';
  border?: 'none' | 'block' | 'line';
  stringMode?: boolean;
  prefix?: string;
  suffix?: string;
  controls?: boolean;
  addIcon?: string;
  minusIcon?: string;
  formatter?: Formatter;
  parser?: Parse;
  keyboard?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  clearable: false,
  disabled: false,
  autofocus: false,
  step: 1,
  precision: 0,
  border: 'block',
  stringMode: false,
  controls: true,
  addIcon: 'up',
  minusIcon: 'down',
  keyboard: true
})

/**
 * slots
 */
const slots = useSlots()

/**
 * emit
 */
interface IEmit {
  (e: 'clear'): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'change', value?: number): void;
  (e: 'update:modelValue', value?: number): void;
}
const emit = defineEmits<IEmit>()

/**
 * formatter & parser
 */
const isFormatted = computed<boolean>(
  () => isFunction(props?.formatter) && isFunction(props?.parser)
)

/**
 * v-model
 */
const realValue = ref<number | string>('')
const preRealValue = ref<number | string>('')
const isValidValue = computed<boolean>(() => isVaildNumber(realValue?.value))

const setValuePrecision = (value?: number): string => {
  if (value === undefined) return ''
  return toFixed(
    value,
    isVaildNumber(props?.precision) ? +props?.precision : 0
  )
}

const getFinalRealValue = (value?: number): string => {
  console.log(value)
  const preciseValue = setValuePrecision(value)
  return isFormatted?.value
    ? (props?.formatter as Formatter)(+preciseValue || undefined)
    : preciseValue
}
/**
 * 根据外界的传进的值初始化实际的number值
 */
watch(
  () => props?.modelValue,
  (newValue) => {
    if (newValue === undefined) {
      realValue.value = ''
    } else if (isNumber(newValue)) {
      realValue.value = getFinalRealValue(newValue)
    } else {
      console.error(
        new Error('神机：InputNumber的modelValue(v-model)属性类型错误')
      )
    }
  },
  {
    immediate: true
  }
)

watch(realValue, (newValue, preValue) => {
  if (isVaildNumber(newValue)) {
    const changeValue = isFormatted?.value
      ? (props?.parser as Parse)(newValue as string)
      : newValue === ''
        ? undefined
        : +newValue
    emit('change', changeValue)
  } else if (isVaildNumber(preValue)) {
    preRealValue.value = preValue
  }
})

/**
 * max value & min value
 */
const realMax = computed<number>(() =>
  props?.max !== undefined && isVaildNumber(props?.max) ? +props?.max : Infinity
)
const realMin = computed<number>(() =>
  props?.min !== undefined && isVaildNumber(props?.min)
    ? +props?.min
    : -Infinity
)

/**
 * add value & minus value
 */
const isAddBtnDisabled = computed<boolean>(() => {
  return (
    !isValidValue?.value ||
    (realValue?.value !== '' && +realValue?.value >= realMax?.value)
  )
})
const isMinusDisabled = computed<boolean>(() => {
  return (
    !isValidValue?.value ||
    (realValue?.value !== '' && +realValue?.value <= realMin?.value)
  )
})

const handleAddNumber = () => {
  if (isAddBtnDisabled?.value) return
  const resetValue =
    realMax?.value < 0
      ? realMax?.value
      : realMin?.value > 0
        ? realMin?.value
        : 0
  if (realValue?.value === '') {
    realValue.value = resetValue
  } else {
    const step = isVaildNumber(props?.step) ? +props?.step : 1
    realValue.value = getFinalRealValue(+(+realValue.value + step).toFixed(+props?.precision))
  }
}
const handleMinusNumber = () => {
  if (isMinusDisabled?.value) return
  const resetValue =
    realMax?.value < 0
      ? realMax?.value
      : realMin?.value > 0
        ? realMin?.value
        : 0
  if (realValue?.value === '') {
    realValue.value = resetValue
  } else {
    const step = isVaildNumber(props?.step) ? +props?.step : 1
    realValue.value = getFinalRealValue(+(+realValue.value - step).toFixed(+props?.precision))
  }
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, isValidValue)
const conatinerClasses = useConatinerClasses(classNamePrefix, slots)
const addClasses = useControlClasses(classNamePrefix, 'add', isAddBtnDisabled)
const minusClasses = useControlClasses(
  classNamePrefix,
  'minus',
  isMinusDisabled
)

/**
 * clearable
 */
const isClearBtnVisible = computed<boolean>(
  () => props?.clearable && !!realValue?.value
)
const handleClear = () => {
  realValue.value = getFinalRealValue(undefined)
  emit('clear')
}

/**
 * blur event
 */
const handleBlur = (event: Event) => {
  if (!isValidValue?.value) {
    realValue.value = preRealValue?.value
  } else {
    const tempValue = realValue?.value === '' ? undefined : +realValue?.value
    realValue.value = getFinalRealValue(tempValue)
  }
  emit('blur', event)
}
/**
 * focus event
 */
const handleFocus = (event: Event) => {
  emit('focus', event)
}
</script>
