<template>
  <div :class="conatinerClasses">
    <slot name="prepend" v-if="slots?.prepend"></slot>
    <div :class="classes">
      <div :class="`${classNamePrefix}-prefix`" v-if="slots?.prefix || prefix">
        <slot name="prefix">
          <Icon v-if="!!prefix" :type="prefix" />
        </slot>
      </div>
      <input ref="sjInputNumberRef" type="number" v-model="realValue" :max="max" :min="min" :autofocus="autofocus"
        @change="handleChange" />
      <div :class="`${classNamePrefix}-suffix`" v-if="slots?.suffix || suffix">
        <slot name="suffix">
          <Icon v-if="!!suffix" :type="suffix" />
        </slot>
      </div>
      <Icon v-if="isClearBtnVisible" :class="`${classNamePrefix}-clear`" type="close-circle-fill"
        @click="handleClear" />
      <div class="sj-input-number-control">
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
import { ref, computed, useSlots, watch, watchEffect } from 'vue'
import Icon from 'src/components/Icon'
import isString from 'src/utils/isString'
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
  formatter?: (value: number) => string;
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
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)
const conatinerClasses = useConatinerClasses(classNamePrefix, slots)

/**
 * emit
 */
interface IEmit {
  (e: 'clear'): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'change', value?: number, event: Event): void;
  (e: 'input', value?: number, event: Event): void;
  (e: 'update:modelValue', value?: number): void;
}
const emit = defineEmits<IEmit>()

/**
 * v-model
 */
const realValue = ref<number>()
watchEffect(() => {
  if (!isVaildNumber(props?.modelValue)) {
    realValue.value = undefined
  } else {
    realValue.value = Number(props?.modelValue)
  }
})
watch(realValue, () => {
  if (isString(realValue?.value)) {
    realValue.value = undefined
  } else if (isVaildNumber(realValue?.value)) {
    const min = Number(props?.min)
    const max = Number(props?.max)
    if (isVaildNumber(max) && (realValue?.value as number) > max) {
      realValue.value = max
    }
    if (isVaildNumber(min) && (realValue?.value as number) < min) {
      realValue.value = min
    }
  } else {
    emit('update:modelValue', realValue?.value)
  }
})

/**
 * max value & min value
 */
const isAddBtnDisabled = computed<boolean>(() => {
  return isVaildNumber(props?.max) && realValue?.value !== undefined && realValue?.value >= Number(props?.max)
})
const isMinusDisabled = computed<boolean>(() => {
  return isVaildNumber(props?.min) && realValue?.value !== undefined && realValue?.value <= Number(props?.min)
})
const addClasses = useControlClasses(classNamePrefix, 'add', isAddBtnDisabled)
const minusClasses = useControlClasses(classNamePrefix, 'minus', isMinusDisabled)

const handleAddNumber = () => {
  const min = Number(props?.min)
  if (realValue?.value === undefined) {
    if (!isVaildNumber(min)) {
      realValue.value = 0
    } else {
      realValue.value = Math.max(0, min)
    }
  } else {
    const step = Number(props?.step)
    realValue.value += isVaildNumber(step) ? step : 1
  }
}

const handleMinusNumber = () => {
  const max = Number(props?.max)
  if (realValue?.value === undefined) {
    if (!isVaildNumber(max)) {
      realValue.value = 0
    } else {
      realValue.value = Math.min(0, max)
    }
  } else {
    const step = Number(props?.step)
    realValue.value -= isVaildNumber(step) ? step : 1
  }
}

/**
 * clearable
 */
const isClearBtnVisible = computed<boolean>(() => props?.clearable && realValue?.value !== undefined)
const handleClear = () => {
  realValue.value = undefined
  emit('clear')
}

/**
 * change
 */
const handleChange = (event: Event) => {
  emit('change', realValue?.value, event)
}
</script>
