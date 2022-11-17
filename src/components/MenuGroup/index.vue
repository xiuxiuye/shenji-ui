<template>
  <div :class="classNamePrefix">
    <div :class="`${classNamePrefix}-header`">
      <span v-if="icon" :class="`${classNamePrefix}-icon`">
        <Icon :type="icon" />
      </span>
      <span :class="`${classNamePrefix}-title`">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
    </div>
    <div :class="`${classNamePrefix}-body`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from '../Icon'

const componentName = 'sj-menu-group'

export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
}
defineProps<Props>()

/**
 * classes
 */
const classNamePrefix = componentName
</script>
