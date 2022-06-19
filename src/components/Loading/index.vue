<template>
  <div v-if="isMaskExist" :class="containerClasses">{{ tips }}
    <Loading v-if="visible" :class="classes" :size="size">
      <slot name="loading"></slot>
      <template #loadingTips>
        <slot name="tips">{{ tips }}</slot>
      </template>
    </Loading>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
  <Loading v-else-if="visible" :class="classes" :size="size">
    <slot name="loading"></slot>
    <template #loadingTips>
      <slot name="tips">{{ tips }}</slot>
    </template>
  </Loading>
</template>

<script lang="ts">
import { useSlots, computed } from 'vue'
import Loading from './components/Loading.vue'
import useClasses from './hooks/useClasses'
import useContentClasses from './hooks/useContentClasses'
import useContainerClasses from './hooks/useContainerClasses'

const componentName = 'sj-loading'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  tips?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
  fit?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'normal',
  visible: true,
  fit: false
})

/**
 * slots
 */
const slots = useSlots()

/**
 * computed
 */
const isMaskExist = computed<boolean>(() => !!slots?.default)
const isMaskVisible = computed<boolean>(() => props?.visible && isMaskExist?.value)

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, isMaskExist, props)
const contentClasses = useContentClasses(classNamePrefix, isMaskVisible)
const containerClasses = useContainerClasses(classNamePrefix, props)
</script>
