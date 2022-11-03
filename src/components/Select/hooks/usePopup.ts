import { ref, onUnmounted } from 'vue'
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

export const transitionName = ref<string>()
const cleanPopupAutoUpdate = ref<() => void>()
const cleanPopupShadowAutoUpdate = ref<() => void>()

export const initPopupPosition = (
  referenceEle: ReferenceElement,
  floatingEle: FloatingElement,
  options: ComputePositionConfig
): () => void => {
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

export const setPopupClean = (clean: () => void) => {
  cleanPopupAutoUpdate.value = clean
}

export const setPopupShadowClean = (clean: () => void) => {
  cleanPopupShadowAutoUpdate.value = clean
}

export const cleanPopup = async () => {
  if (cleanPopupAutoUpdate?.value) {
    cleanPopupAutoUpdate?.value()
    cleanPopupAutoUpdate.value = undefined
  }
}

export const cleanPopupShadow = async () => {
  if (cleanPopupShadowAutoUpdate?.value) {
    cleanPopupShadowAutoUpdate?.value()
    cleanPopupShadowAutoUpdate.value = undefined
  }
}