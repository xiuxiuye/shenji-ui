<template>
  <div :class="classes" tabindex="0" :autofocus="autofocus" @click="handleClick" @mousedown="handleMouseDown"
    @mouseup="handleMouseUp">
    <div :class="`${classNamePrefix}-stand-in`" v-if="isCheckedTextVisible">
      <div :class="`${classNamePrefix}-stand-in-checked`">
        <slot name="checked">{{checkedText}}</slot>
      </div>
      <div :class="`${classNamePrefix}-stand-in-unchecked`">
        <slot name="unchecked">{{uncheckedText}}</slot>
      </div>
    </div>
    <div :class="`${classNamePrefix}-rail`">
      <div :class="dotClasses">
        <Icon :class="`${classNamePrefix}-icon`" type="loading-a" :size="size" v-if="loading" />
        <slot name="icon" v-if="isIconVisible">
          <Icon :class="`${classNamePrefix}-icon`" :type="icon || ''" :size="size" />
        </slot>
        <template v-if="isCheckedTextVisible">
          <div :class="`${classNamePrefix}-checked-text`">
            <slot name="checked">{{checkedText}}</slot>
          </div>
          <div :class="`${classNamePrefix}-unchecked-text`">
            <slot name="unchecked">{{uncheckedText}}</slot>
          </div>
        </template>
      </div>
    </div>
    <Wave v-if="waveDisabled" />
  </div>
</template>

<script lang="ts">
import Icon from '../Icon/index.vue'
import Wave from '../Wave/index.vue'
import { ref, watch, computed, useSlots } from 'vue'
import useClasses from './hooks/useClasses'
import useDotClasses from './hooks/useDotClasses'
import type { CommonSize } from 'src/types/global'
const componentName = 'sj-switch'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean | number | string;
  loading?: boolean;
  round?: boolean;
  icon?: string;
  checkedValue?: boolean | number | string;
  uncheckedValue?: boolean | number | string;
  checkedText?: string;
  uncheckedText?: string;
  rubberBand?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  disabled: false,
  autofocus: false,
  modelValue: false,
  loading: false,
  round: true,
  checkedValue: true,
  uncheckedValue: false,
  rubberBand: true
})

/**
 * slots
 */
const slots = useSlots()

/**
 * emit
 */
interface IEmit {
  (e: 'change', checked: boolean, checkedValue: boolean | number | string): void;
  (e: 'update:modelValue', value: boolean | number | string): void;
}
const emit = defineEmits<IEmit>()

/**
 * model value
 */
const realValue = ref<boolean>(false)

watch(
  () => props?.modelValue,
  () => {
    realValue.value = props?.modelValue === props?.checkedValue
  },
  { immediate: true }
)

watch(realValue, () => {
  const finalValue = realValue?.value ? props?.checkedValue : props?.uncheckedValue
  emit('change', realValue?.value, finalValue)
  emit('update:modelValue', finalValue)
})

const handleClick = () => {
  if (props?.disabled || props?.loading) return
  realValue.value = !realValue?.value
}

/**
 * rubber-band
 */
const rubberBanding = ref<boolean>(false)
const handleMouseDown = () => {
  if (!props?.rubberBand) return
  rubberBanding.value = true
}
const handleMouseUp = () => {
  rubberBanding.value = false
}

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props, realValue)
const dotClasses = useDotClasses(classNamePrefix, realValue, rubberBanding)

const isCheckedTextVisible = computed<boolean>(() => !!props?.checkedText || !!props?.uncheckedText || !!slots?.checked || !!slots?.unchecked)
const isIconVisible = computed<boolean>(() => !props?.loading && (!!slots?.icon || !!props?.icon))
const waveDisabled = computed<boolean>(() => !props?.disabled && !props?.loading)
</script>
