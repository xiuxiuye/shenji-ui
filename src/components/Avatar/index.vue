<template>
  <div :class="classes" :style="styles">
    <img v-if="isImgExist" :src="src" :alt="alt" :onerror="handleImageLoadError" :style="imgStyles">
    <slot v-else-if="isIconExist" name="icon">
      <Icon :type="icon" />
    </slot>
    <div v-else-if="isTextExist" class="sj-avatar-text-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon'
import { computed, useSlots, ref } from 'vue'
import isString from 'src/utils/isString'
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'
import useImgStyles from './hooks/useImgStyles'
import type { ImgHTMLAttributes } from 'vue'
import type { CommonSize } from 'src/types/global'
const componentName = 'sj-avatar'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  size?: CommonSize | number | string;
  icon?: string;
  bordered?: boolean;
  borderColor?: string;
  color?: string;
  src?: string;
  alt?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  fallbackSrc?: string;
  shape?: 'circle' | 'square';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  bordered: false,
  shape: 'circle'
})

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * styles
 */
const styles = useStyles(props)
const imgStyles = useImgStyles(props)

/**
 * img load error
 */
interface LoadErrorEmit {
  (e: 'on-error', event: Event): void;
}
interface Image extends ImgHTMLAttributes {
  onerror: null;
}

const isImageLoadErrorCount = ref<number>(0)
const loadErrorEmit = defineEmits<LoadErrorEmit>()
const handleImageLoadError = (event: Event) => {
  isImageLoadErrorCount.value++
  loadErrorEmit('on-error', event)
  /**
   * load fallback image
   */
  if (props?.fallbackSrc && isString(props?.fallbackSrc) && event?.target) {
    const imgRef = event?.target as unknown as Image
    imgRef.src = props?.fallbackSrc
    if (isImageLoadErrorCount.value >= 2) {
      imgRef.onerror = null
    }
  }
}

/**
 * slots
 */
const slots = useSlots()

/**
 * computed
 */
const isImgExist = computed<boolean>(() => {
  if (props?.src && props?.fallbackSrc && isImageLoadErrorCount.value < 2) return true
  if (!!slots?.icon || !!props?.icon || !!slots?.default) return false
  return true
})
const isIconExist = computed<boolean>(() => !isImgExist.value && (!!slots?.icon || !!props?.icon))
const isTextExist = computed<boolean>(() => !isImgExist.value && !isIconExist.value && !!slots?.default)
</script>
