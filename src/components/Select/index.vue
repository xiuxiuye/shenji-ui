<template>
  <div
    ref="sjSelectRef"
    :class="classes"
    :tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur"
  >
  {{transitionName}}
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
const transitionName = ref<string>()
const popupVisible = ref<boolean>(false)
const sjSelectRef = ref<ReferenceElement>()
const sjSelectPopupRef = ref<FloatingElement>()
const sjSelectPopupShadowRef = ref<FloatingElement>()
const cleanPopupAutoUpdate = ref<() => void>()
const cleanPopupShadowAutoUpdate = ref<() => void>()

const initPopupPosition = (
  referenceEle: ReferenceElement,
  floatingEle: FloatingElement
): () => void => {
  const postionOptions: ComputePositionConfig = {
    placement: props?.placement,
    middleware: [offset(4), flip(), shift(), hide()]
  }
  /**
   * auto update position
   */
  return autoUpdate(referenceEle, floatingEle, () => {
    computePosition(referenceEle, floatingEle, postionOptions).then(
      ({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEle.style, {
          left: `${x}px`,
          top: `${y}px`
        })

        const placementPrefix = placement?.split('-')[0]
        transitionName.value = `sj-popup-slide-from-${placementPrefix}`

        if (middlewareData.hide) {
          const { referenceHidden } = middlewareData.hide
          Object.assign(floatingEle.style, {
            visibility: referenceHidden ? 'hidden' : 'visible'
          })
        }
      }
    )
  })
}

const cleanonPopup = async () => {
  if (cleanPopupAutoUpdate?.value) {
    cleanPopupAutoUpdate?.value()
    cleanPopupAutoUpdate.value = undefined
  }
}

const cleanonPopupShadow = async () => {
  if (cleanPopupShadowAutoUpdate?.value) {
    cleanPopupShadowAutoUpdate?.value()
    cleanPopupShadowAutoUpdate.value = undefined
  }
}

watch(popupVisible, async (newValue, preValue) => {
  if (newValue) {
    await nextTick()
    const select = sjSelectRef.value
    const selectPopup = sjSelectPopupRef.value
    if (select && selectPopup) {
      cleanPopupAutoUpdate.value = initPopupPosition(select, selectPopup)
    }
  } else {
    cleanonPopup()
  }
})

onMounted(() => {
  const select = sjSelectRef.value
  const selectPopupShadow = sjSelectPopupShadowRef?.value
  if (select && selectPopupShadow) {
    cleanPopupShadowAutoUpdate.value = initPopupPosition(select, selectPopupShadow)
  }
})

onUnmounted(() => {
  cleanonPopup()
  cleanonPopupShadow()
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
