<template>
  <div :class="conatinerClasses">
    <div :class="`${classNamePrefix}-disabled-mask`" v-if="disabled"></div>
    <div :class="classes" @keydown.up="handleKeyUp" @keydown.down="handleKeyDown">
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
      <div :class="`${classNamePrefix}-controls`" v-if="controls">
        <div :class="addControlClasses" @click="handleAddNumber">
          <slot name="add-icon">
            <Icon :type="addIcon" size="small" />
          </slot>
        </div>
        <div :class="minusControlClasses" @click="handleMinusNumber">
          <slot name="minus-icon">
            <Icon :type="minusIcon" size="small" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, useSlots, watch } from 'vue'
import Icon from '../Icon'
import sum from 'src/utils/sum'
import minus from 'src/utils/minus'
import toFixed from 'src/utils/toFixed'
import isNumber from 'src/utils/isNumber'
import isFunction from 'src/utils/isFunction'
import isVaildNumber from 'src/utils/isVaildNumber'
import useClasses from './hooks/useClasses'
import useControlClasses from './hooks/useControlClasses'
import useConatinerClasses from './hooks/useContainerClasses'
import type { IInputNumberRefExpose } from './types'
import type { CommonSize, CommonFormStatus, CommonFormBorderType } from 'src/types/global'
const componentName = 'sj-input-number'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
type Formatter = (value: string) => string;
type Parse = (value: string) => number | undefined;
interface IProps {
  size?: CommonSize;
  clearable?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: number;
  max?: number | string;
  min?: number | string;
  step?: number | string;
  precision?: number | string;
  status?: CommonFormStatus;
  borderType?: CommonFormBorderType;
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
  borderType: 'block',
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
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'change', value?: number): void;
  (e: 'update:modelValue', value?: number): void;
}
const emit = defineEmits<IEmit>()

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
 * step
 */
const realStep = computed<number>(() =>
  isVaildNumber(props?.step) ? +props?.step : 1
)

/**
 * formatter & parser
 */
const isFormatted = computed<boolean>(
  () => isFunction(props?.formatter) && isFunction(props?.parser)
)

/**
 * v-model
 */
const realValue = ref<string>('')
const preRealValue = ref<string>('')
const judgeValueValidity = (value?: number): boolean => {
  if (value === undefined) return true
  if (!isVaildNumber(value)) return false
  if (isVaildNumber(props?.max) && value > realMax?.value) return false
  if (isVaildNumber(props?.min) && value < realMin?.value) return false
  return true
}
const isValidValue = computed<boolean>(() => {
  const tempValue = recoverRealValue(realValue?.value)
  return judgeValueValidity(tempValue)
})

const setValuePrecision = (value?: number): string => {
  if (value === undefined) return ''
  return toFixed(
    value,
    isVaildNumber(props?.precision) ? +props?.precision : 0
  )
}

const getFinalRealValue = (value?: number): string => {
  const preciseValue = setValuePrecision(value)
  return isFormatted?.value
    ? (props?.formatter as Formatter)(preciseValue)
    : preciseValue
}

const recoverRealValue = (value: string): number | undefined => {
  return isFormatted?.value
    ? (props?.parser as Parse)(value)
    : value === ''
      ? undefined
      : +value
}
/**
 * 根据外界的传进的值初始化实际的number值
 */
watch(
  () => props?.modelValue,
  (newValue) => {
    if (newValue === undefined || isNumber(newValue)) {
      if (newValue !== recoverRealValue(realValue.value)) {
        realValue.value = getFinalRealValue(newValue)
      }
    } else {
      console.error(
        new Error(
          '神机：InputNumber的modelValue(v-model)类型错误，需number类型的数据。'
        )
      )
    }
  },
  {
    immediate: true
  }
)

watch(realValue, (newValue, preValue) => {
  if (isValidValue?.value) {
    const changeValue = recoverRealValue(newValue)
    emit('change', changeValue)
    emit('update:modelValue', changeValue)
  } else {
    const tempValue = recoverRealValue(preValue)
    if (judgeValueValidity(tempValue)) {
      preRealValue.value = preValue
    }
  }
})

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
  const tempValue = recoverRealValue(realValue?.value)
  if (tempValue === undefined) {
    realValue.value = `${resetValue}`
  } else {
    realValue.value = getFinalRealValue(
      Math.min(sum(tempValue, realStep?.value), realMax?.value)
    )
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
  const tempValue = recoverRealValue(realValue?.value)
  if (tempValue === undefined) {
    realValue.value = `${resetValue}`
  } else {
    realValue.value = getFinalRealValue(
      Math.max(minus(tempValue, realStep?.value), realMin?.value)
    )
  }
}

const handleKeyUp = (event: Event) => {
  if (!props?.keyboard) return
  event.preventDefault()
  handleAddNumber()
}

const handleKeyDown = (event: Event) => {
  if (!props?.keyboard) return
  event.preventDefault()
  handleMinusNumber()
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, isValidValue)
const conatinerClasses = useConatinerClasses(classNamePrefix, props)
const addControlClasses = useControlClasses(
  classNamePrefix,
  'add',
  isAddBtnDisabled
)
const minusControlClasses = useControlClasses(
  classNamePrefix,
  'minus',
  isMinusDisabled
)

/**
 * clearable
 */
const isClearBtnVisible = computed<boolean>(
  () => props?.clearable && !!realValue?.value && !props?.disabled
)
const handleClear = () => {
  realValue.value = getFinalRealValue(undefined)
  emit('clear')
}

/**
 * blur event
 */
const handleBlur = (event: FocusEvent) => {
  const tempValue = recoverRealValue(realValue?.value)
  if (!isValidValue?.value) {
    if (isVaildNumber(tempValue)) {
      if ((tempValue as number) > realMax?.value) {
        realValue.value = getFinalRealValue(realMax?.value)
      } else {
        realValue.value = getFinalRealValue(realMin?.value)
      }
    } else {
      realValue.value = preRealValue?.value
    }
  } else {
    const formattedValue = getFinalRealValue(tempValue)
    if (formattedValue !== realValue?.value) {
      realValue.value = formattedValue
    }
  }
  emit('blur', event)
}
/**
 * focus event
 */
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

/**
 * methods
 */
const sjInputNumberRef = ref(null)
const focus = () => {
  if (props.disabled) return
  const dom: HTMLElement | null = sjInputNumberRef?.value
  if (dom) {
    (dom as HTMLElement)?.focus()
  }
}

const blur = () => {
  if (props.disabled) return
  const dom: HTMLElement | null = sjInputNumberRef?.value
  if (dom) {
    (dom as HTMLElement)?.blur()
  }
}

const exposeVars: IInputNumberRefExpose = {
  focus,
  blur
}
defineExpose(exposeVars)
</script>
