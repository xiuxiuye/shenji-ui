import { ref } from 'vue'
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
          top: `${y}px`,
          backgroundColor: 'red'
        })

        const placementPrefix = placement?.split('-')[0]
        setTimeout(() => {
          floatingEle.classList.add('sjtest')
          console.log(333, placementPrefix, floatingEle)
          // floatingEle.classList.remove('sjtest')
          // floatingEle.classList.add('sjtest-reverse')
          // console.log(444, placementPrefix, floatingEle)
        }, 4000)
        setTimeout(() => {
          floatingEle.classList.remove('sjtest')
          floatingEle.classList.add('sjtest-reverse')
          console.log(444, placementPrefix, floatingEle)
          // floatingEle.classList.remove('sjtest')
          // floatingEle.classList.add('sjtest-reverse')
          // console.log(444, placementPrefix, floatingEle)
        }, 10000)
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
  console.log('clean')
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
