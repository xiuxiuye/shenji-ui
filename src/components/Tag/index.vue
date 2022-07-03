<template>
  <div v-if="visible" :class="classes" :style="styles">
    <div v-if="isIconExist" :class="`${classNamePrefix}-icon`" :style="iconStyles">
      <slot name="icon">
        <Icon v-if="!!icon" :type="icon" :size="size" />
      </slot>
    </div>
    <div :class="`${classNamePrefix}-content`">
      <slot></slot>
      <Icon v-if="closable" :class="`${classNamePrefix}-close`" :style="iconStyles" :type="closeIcon" :size="size"
        @click="handleClose" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, useSlots } from 'vue'
import Icon from '../Icon'
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'
import useIconStyles from './hooks/useIconStyles'

const componentName = 'sj-tag'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface IProps {
  closable?: boolean;
  closeIcon?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
  color?: string;
  textColor?: string;
  icon?: string;
  bordered?: boolean;
  borderColor?: string;
  type?: 'normal' | 'info' | 'success' | 'error' | 'warning';
  disabled?: boolean;
  round?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  closable: false,
  closeIcon: 'close',
  size: 'normal',
  visible: true,
  bordered: true,
  type: 'normal',
  disabled: false,
  round: false
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
const iconStyles = useIconStyles(props)

/**
 * event
 */
interface IEmit {
  (e: 'close', event: Event): void;
}
const emit = defineEmits<IEmit>()
const handleClose = (event: Event) => {
  if (!props?.disabled) emit('close', event)
}

/**
 * slots
 */
const slots = useSlots()

/**
 * computed
 */
const isIconExist = computed<boolean>(() => {
  console.log(slots?.icon, props?.icon)
  console.log(!!slots?.icon, !!props?.icon)
  console.log(!!slots?.icon || !!props?.icon)
  return !!slots?.icon || !!props?.icon
})
</script>
