<template>
  <Teleport to="body">
    <div v-if="popupVisible" class="sj-popup" ref="sjPopupRef">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { ref, watch, nextTick } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  hide,
  autoUpdate,
  autoPlacement
} from '@floating-ui/dom'
import type {
  ComputePositionConfig,
  ReferenceElement,
  FloatingElement,
  Alignment,
  Placement
} from '@floating-ui/dom'

export const componentName = 'sj-popup'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  referenceRef?: HTMLElement;
  visible?: boolean;
  placement?: Placement;
  flipable?: boolean;
  autoPlacement?: boolean;
  alignment?: Alignment;
  autoAlignment?: boolean;
  allowedPlacements?: Placement[];
}

const props = withDefaults(defineProps<Props>(), {
  autoAlignment: true
})

type PlacementFrom = 'top' | 'bottom' | 'left' | 'right';
interface PlacementFromAction {
  enter: string;
  leave: string;
}
const transitionClassName: Record<PlacementFrom, PlacementFromAction> = {
  top: {
    enter: 'sj-popup-slide-enter-from-top',
    leave: 'sj-popup-slide-leave-from-top'
  },
  bottom: {
    enter: 'sj-popup-slide-enter-from-bottom',
    leave: 'sj-popup-slide-leave-from-bottom'
  },
  left: {
    enter: 'sj-popup-slide-enter-from-left',
    leave: 'sj-popup-slide-leave-from-left'
  },
  right: {
    enter: 'sj-popup-slide-enter-from-right',
    leave: 'sj-popup-slide-leave-from-right'
  }
}

/**
 * handle popup position
 */
const placementFrom = ref<PlacementFrom>()
const cleanPopupAutoUpdate = ref<() => void>()
const handlePopupEnter = (
  referenceEle: ReferenceElement,
  floatingEle: FloatingElement
): (() => void) => {
  /**
   * set computePosition options
   */
  const options: ComputePositionConfig = {
    middleware: [
      offset(4),
      shift(),
      hide()
    ]
  }
  if (props?.autoPlacement) {
    const { alignment, autoAlignment, allowedPlacements } = props
    options.middleware?.push(autoPlacement({ alignment, autoAlignment, allowedPlacements }))
  } else {
    const { placement, flipable } = props
    options.placement = placement
    if (flipable) {
      options.middleware?.push(flip())
    }
  }
  /**
   * auto update position
   */
  return autoUpdate(referenceEle, floatingEle, () => {
    computePosition(referenceEle, floatingEle, options).then(
      ({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEle.style, {
          left: `${x}px`,
          top: `${y}px`
        })
        const placementPrefix = placement?.split('-')[0] as PlacementFrom
        placementFrom.value = placementPrefix
        if (props?.visible) {
          const preEnterClassName = floatingEle?.classList[1]
          const currentEnterClassName =
            transitionClassName[placementPrefix]?.enter
          if (!preEnterClassName) {
            floatingEle?.classList?.add(currentEnterClassName)
          } else if (preEnterClassName !== currentEnterClassName) {
            floatingEle?.classList.remove(preEnterClassName)
            floatingEle?.classList?.add(currentEnterClassName)
          }
        }
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

/**
 * 根据外部的visible值控制popup的可见性
 */
const popupVisible = ref<boolean>(false)
const sjPopupRef = ref<HTMLElement | null>(null)
watch(
  () => props?.visible,
  async (newValue) => {
    if (newValue) {
      popupVisible.value = newValue
      await nextTick()
      const referenceEle = props?.referenceRef
      const floatingEle = sjPopupRef?.value
      if (referenceEle && floatingEle) {
        cleanPopupAutoUpdate.value = handlePopupEnter(
          referenceEle,
          floatingEle
        )
      }
    } else if (popupVisible.value) {
      const floatingEle = sjPopupRef?.value
      if (floatingEle && placementFrom.value) {
        const leaveClassName = transitionClassName[placementFrom.value]?.leave
        floatingEle?.classList?.remove(
          transitionClassName[placementFrom.value]?.enter
        )
        floatingEle?.classList?.add(leaveClassName)
        setTimeout(() => {
          popupVisible.value = false
          floatingEle?.classList?.remove(leaveClassName)
        }, 300)
      }
      if (cleanPopupAutoUpdate.value) {
        cleanPopupAutoUpdate.value()
      }
    }
  },
  { immediate: true }
)
</script>
