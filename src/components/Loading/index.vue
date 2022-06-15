<template>
  <div :class="classes">
    <div v-if="visible" class="sj-loading-animation">
      <slot>
        <Loading />
      </slot>
      <div class="sj-loading-tip">
        <slot name="tip">{{ tip }}</slot>
      </div>
    </div>
    <div class="sj-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { useSlots, computed } from 'vue'
import Loading from './components/Loading.vue'
import useClasses from './hooks/useClasses'
const componentName = 'sj-loading'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  tip?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'normal',
  size: 'normal',
  visible: true
})

/**
 * slots
 */
const slots = useSlots()

/**
 * computed
 */
const isMaskExist = computed<boolean>(() => !!slots?.default)

/**
 * classes
 */
const classNamePrefix = componentName
const classes = useClasses(classNamePrefix, props)

</script>

<style lang="scss">
</style>
