<template>
  <div>
    <slot>
      <div class="sj-loading-bloom" :style="styles">
        <div class="sj-loading-dot"></div>
        <div class="sj-loading-dot"></div>
        <div class="sj-loading-dot"></div>
        <div class="sj-loading-dot"></div>
      </div>
    </slot>
    <div v-if="slots?.loadingTips" class="sj-loading-tips">
      <slot name="loadingTips"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import isValidNumber from 'src/utils/isVaildNumber'
import isString from 'src/utils/isString'
import type { StyleValue } from 'src/types/global'

interface Props {
  size?: number | string;
}

const props = defineProps<Props>()

const styles = computed<StyleValue>(() => {
  const tempStyles: StyleValue = {}
  if (props?.size) {
    if (isValidNumber(props?.size)) {
      tempStyles.width = `${props?.size}px`
      tempStyles.height = `${props?.size}px`
    } else if (isString(props?.size) && /^\d+px$/.test(props?.size as string)) {
      tempStyles.width = props?.size
      tempStyles.height = props?.size
    }
  }
  return tempStyles
})

const slots = useSlots()
</script>
