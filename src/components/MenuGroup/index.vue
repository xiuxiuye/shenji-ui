<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
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
const props = defineProps<Props>()

/**
 * classes
 */
const classNamePrefix = componentName
</script>
