<template>
  <div :class="classes">
    <div v-if="isCoverExisted" :class="`${classNamePrefix}-cover`">
      <slot name="cover">
        <img :src="cover" alt="图片资源无效">
      </slot>
    </div>
    <div v-if="isHeaderExisted" :class="`${classNamePrefix}-header`">
      <slot name="header">
        <div :class="`${classNamePrefix}-header-main`">
          <div :class="`${classNamePrefix}-header-title`">
            <Icon v-if="isIconExisted" :type="icon" />
            <slot name="header-title">
              {{ title }}
            </slot>
          </div>
          <div :class="`${classNamePrefix}-header-extra`">
            <slot name="header-extra"></slot>
          </div>
        </div>
        <div v-if="isDescriptionExisted" :class="`${classNamePrefix}-header-description`">
          <slot name="header-description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>
    <div v-if="isContentExisted" :class="`${classNamePrefix}-content`" :style="contentStyles">
      <Loading v-if="loading" />
      <slot v-else></slot>
    </div>
    <div v-if="isFooterExisted" :class="`${classNamePrefix}-footer`">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Loading from './components/Loading.vue'
import { useSlots, computed } from 'vue'
import Icon from 'src/components/Icon'
import useClasses from './hooks/useClasses'
import useContentStyles from './hooks/useContentStyles'
import type { CommonSize } from 'src/types/global'

const componentName = 'sj-card'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
/**
 * props
 */
interface IProps {
  bordered?: boolean;
  loading?: boolean;
  divideble?: boolean;
  cover?: string;
  title?: string;
  icon?: string;
  description?: string;
  size?: CommonSize;
  shadow?: 'never' | 'hover' | 'always';
  noPadding?: string | string[];
}

const props = withDefaults(defineProps<IProps>(), {
  bordered: true,
  loading: false,
  size: 'normal',
  divideble: true
})

/**
 * slots
 */
const slots = useSlots()

/**
 * computed
 */
const isCoverExisted = computed<boolean>(() => !!slots?.cover || !!props?.cover)
const isHeaderExisted = computed<boolean>(() => !!slots?.header || !!slots['header-title'] || !!slots['header-extra'] || !!props?.title)
const isIconExisted = computed<boolean>(() => !!props?.icon)
const isDescriptionExisted = computed<boolean>(() => !!slots['header-description'] || !!props?.description)
const isContentExisted = computed<boolean>(() => !!slots?.default || props?.loading)
const isFooterExisted = computed<boolean>(() => !!slots?.footer)

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

/**
 * styles
 */
const contentStyles = useContentStyles(isHeaderExisted, isFooterExisted)
</script>
