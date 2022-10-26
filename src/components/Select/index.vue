<template>
  <div
    ref="sjSelectRef"
    :class="classes"
    :tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    {{ transitionName }}
    <div :class="`${classNamePrefix}-content`"></div>
    <div :class="`${classNamePrefix}-arrow`">
      <Icon type="down" />
    </div>
    <transition :name="transitionName">
      <div
        v-if="popupVisible"
        ref="sjSelectPopupRef"
        :class="`${classNamePrefix}-popup`"
        :style="popupStyles"
      >
        <Option
          v-for="option in options"
          :key="option[valueField]"
          :value="option[valueField]"
          :label="option[labelField]"
          :disabled="option?.disabled"
        ></Option>
        <!-- <slot /> -->
      </div>
    </transition>
    <!-- popup shadow -->
    <div
      ref="sjSelectPopupShadowRef"
      :class="`${classNamePrefix}-popup-shadow`"
      :style="popupStyles"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import Icon from '../Icon'
import Option from '../Option'
import useClasses from './hooks/useClasses'
import usePopupStyles from './hooks/usePopupStyles'
import {
  transitionName,
  initPopupPosition,
  setPopupClean,
  setPopupShadowClean,
  cleanPopup,
  cleanPopupShadow
} from './hooks/usePopup'
import isArray from 'src/utils/isArray'
import isString from 'src/utils/isString'
import isNumber from 'src/utils/isNumber'
import consoleError from 'src/utils/console/error'
import useProvide from 'src/utils/hooks/useProvide'
import type { Provider } from './types'
import type {
  CommonSize,
  CommonFormStatus,
  CommonFormBorderType
} from 'src/types/global'
import type { ReferenceElement, FloatingElement } from '@floating-ui/dom'

export const componentName = 'sj-select'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
type SingleModelValue = string | number
type Props = {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: SingleModelValue | SingleModelValue[];
  clearable?: boolean;
  loading?: boolean;
  round?: boolean;
  filterable?: boolean;
  filter?: (pattern: string, option: Record<string, unknown>) => boolean;
  labelField?: string;
  valueField?: string;
  maxCount?: number;
  multiple?: boolean;
  options?: Array<Record<string, unknown>>;
  placeholder?: string;
  placement?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end';
  remote?: boolean;
  remoteMethod?: () => Promise<Array<Record<string, unknown>>>;
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: true,
  autofocus: false,
  clearable: false,
  loading: false,
  round: false,
  filterable: false,
  labelField: 'label',
  valueField: 'value',
  multiple: false,
  options: () => [],
  remote: false,
  container: 'body',
  virtual: false,
  arrow: 'down',
  borderType: 'block',
  popupMaxHeight: 256,
  search: false,
  visible: false,
  popupWithSelectWidth: true,
  placement: 'bottom-start'
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * styles
 */
const popupStyles = usePopupStyles(props)

/**
 * emit
 */
type Emit = {
  (e: 'update:modelValue', value: SingleModelValue | SingleModelValue[]): void;
}
const emit = defineEmits<Emit>()

/**
 * handle popup mounted
 */
const popupVisible = ref<boolean>(false)
const sjSelectRef = ref<ReferenceElement>()
const sjSelectPopupRef = ref<FloatingElement>()
const sjSelectPopupShadowRef = ref<FloatingElement>()

watch(popupVisible, async (newValue, preValue) => {
  if (newValue) {
    await nextTick()
    const select = sjSelectRef.value
    const selectPopup = sjSelectPopupRef.value
    if (select && selectPopup) {
      const clean = initPopupPosition(select, selectPopup, {
        placement: props?.placement
      })
      setPopupClean(clean)
    }
  } else {
    cleanPopup()
  }
})

onMounted(() => {
  const select = sjSelectRef.value
  const selectPopupShadow = sjSelectPopupShadowRef?.value
  if (select && selectPopupShadow) {
    const clean = initPopupPosition(select, selectPopupShadow, {
      placement: props?.placement
    })
    setPopupShadowClean(clean)
  }
})

onUnmounted(() => {
  cleanPopup()
  cleanPopupShadow()
})

/**
 * event handler
 */
const handleFocus = () => {
  popupVisible.value = true
}
const handleBlur = () => {
  // popupVisible.value = false
}

/**
 * model-value
 */
const realValues = ref<Array<string | number>>([])

watch(() => props?.modelValue, () => {
  if (props?.multiple) {
    if (isArray(props?.modelValue)) {
      realValues.value = [...props?.modelValue as SingleModelValue[]]
    } else {
      consoleError('神机：Select在多选模式下model-value的类型应为数组')
    }
  } else {
    if (isString(props?.modelValue) || isNumber(props?.modelValue)) {
      realValues.value = [props?.modelValue as SingleModelValue]
    } else {
      consoleError('神机：Select在单选模式下model-value的类型应为string | number')
    }
  }
}, { immediate: true })

watch(realValues, () => {
  if (props?.multiple) {
    emit('update:modelValue', realValues.value)
  } else {
    emit('update:modelValue', realValues.value[0])
  }
})

/**
 * provide
 */
const provider = computed<Provider>(() => {
  return {
    selectedValues: props?.multiple ? [...realValues?.value] : [realValues?.value[0]]
  }
})
useProvide<Provider>(componentName, provider)
</script>
