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
    <Transition :name="transitionName">
      <div
        v-if="popupVisible"
        ref="sjSelectPopupRef"
        :class="`${classNamePrefix}-popup`"
        :style="popupStyles"
      ></div>
    </Transition>
    <!-- popup shadow -->
    <div
      ref="sjSelectPopupShadowRef"
      :class="`${classNamePrefix}-popup-shadow`"
      :style="popupStyles"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  hide,
  autoUpdate
} from '@floating-ui/dom'
import Icon from '../Icon'
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
import type {
  CommonSize,
  CommonFormStatus,
  CommonFormBorderType
} from 'src/types/global'
import type {
  ComputePositionConfig,
  ReferenceElement,
  FloatingElement
} from '@floating-ui/dom'

const componentName = 'sj-select'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: string | number | Array<string | number>;
  clearable?: boolean;
  loading?: boolean;
  round?: boolean;
  filterable?: boolean;
  filter?: (pattern: string, option: Record<string, any>) => boolean;
  labelField?: string;
  valueField?: string;
  maxCount?: number;
  multiple?: boolean;
  options?: Array<Record<string, any>>;
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
  remoteMethod?: () => Promise<Array<Record<string, any>>>;
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

const props = withDefaults(defineProps<IProps>(), {
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
  popupVisible.value = false
}
</script>
