<template>
  <div v-show="popupVisible" class="sj-popup" ref="sjPopupRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  hide,
  autoUpdate
} from '@floating-ui/dom'
import type {
  ComputePositionConfig,
  ReferenceElement,
  FloatingElement
} from '@floating-ui/dom'

const componentName = 'sj-popup'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  visible?: boolean;
  referenceRef?: HTMLElement;
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
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom'
})

type PlacementFrom = 'top' | 'bottom' | 'left' | 'right'
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
const popupVisible = ref<boolean>(false)
const sjPopupRef = ref<HTMLElement | null>(null)
const cleanPopupAutoUpdate = ref<() => void>()
const placementFrom = ref<PlacementFrom>()

const initPopupPosition = (
  referenceEle: ReferenceElement,
  floatingEle: FloatingElement,
  options: ComputePositionConfig
): (() => void) => {
  const postionOptions: ComputePositionConfig = {
    middleware: [offset(4), flip(), shift(), hide()],
    ...options
  }
  /**
   * auto update position
   */
  return autoUpdate(referenceEle, floatingEle, () => {
    computePosition(referenceEle, floatingEle, postionOptions).then(
      ({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEle.style, {
          left: `${x}px`,
          top: `${y}px`,
          backgroundColor: 'red'
        })
        const placementPrefix = placement?.split('-')[0] as PlacementFrom
        placementFrom.value = placementPrefix
        console.log(placementPrefix, props?.visible, popupVisible.value)
        if (props?.visible && !popupVisible.value) {
          floatingEle?.classList?.add(transitionClassName[placementPrefix]?.enter)
          popupVisible.value = true
        }
        // setTimeout(() => {
        //   floatingEle.classList.add('sjtest')
        //   console.log(333, placementPrefix, floatingEle)
        // }, 4000)
        // setTimeout(() => {
        //   floatingEle.classList.remove('sjtest')
        //   floatingEle.classList.add('sjtest-reverse')
        //   console.log(444, placementPrefix, floatingEle)
        // }, 10000)
        // transitionName.value = `sj-popup-slide-from-${placementPrefix}`

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

watch(() => props?.visible, async (newValue) => {
  if (newValue) {
    await nextTick()
    const referenceEle = props?.referenceRef
    const floatingEle = sjPopupRef?.value
    if (referenceEle && floatingEle) {
      cleanPopupAutoUpdate.value = initPopupPosition(referenceEle, floatingEle, {
        placement: props?.placement
      })
    }
  } else {
    if (cleanPopupAutoUpdate.value) {
      cleanPopupAutoUpdate.value()
    }
  }
}, { immediate: true })

</script>

<style lang="scss">
.sj-popup {
  position: absolute;
  top: 0;
  left: 0;
}
/* top */
.sj-popup-slide-enter-from-top {
  animation: sjPopupSlideFromTop 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromTop {
  0% { transform: translateY(4px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.sj-popup-slide-leave-from-top {
  animation: sjPopupSlideFromTopReservce 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromTopReservce {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(4px); opacity: 0; }
}

/* bottom */
.sj-popup-slide-enter-from-bottom {
  animation: sjPopupSlideFromBottom 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromBottom {
  0% { transform: translateY(-4px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.sj-popup-slide-leave-from-bottom {
  animation: sjPopupSlideFromBottomReservce 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromBottomReservce {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-4px); opacity: 0; }
}

/* left */
.sj-popup-slide-enter-from-left {
  animation: sjPopupSlideFromLeft 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromLeft {
  0% { transform: translateX(4px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.sj-popup-slide-leave-from-left {
  animation: sjPopupSlideFromLeftReservce 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromLeftReservce {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(4px); opacity: 0; }
}

/* right */
.sj-popup-slide-enter-from-right {
  animation: sjPopupSlideFromRight 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromRight {
  0% { transform: translateX(-4px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.sj-popup-slide-leave-from-right {
  animation: sjPopupSlideFromRightReservce 4s ease-in-out forwards;
}
@keyframes sjPopupSlideFromRightReservce {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-4px); opacity: 0; }
}
</style>
