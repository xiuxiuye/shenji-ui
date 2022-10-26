<template>
  <i :class="classes" :style="styles" />
</template>
<script lang="ts">
import useClasses from './hooks/useClasses'
import useStyles from './hooks/useStyles'
const componentName = 'sj-icon'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  color?: string;
  size?: 'large' | 'normal' | 'small' | string | number;
  type: string;
}

const props = withDefaults(defineProps<Props>(), { size: 'normal' })

const classes = useClasses(componentName, props)

const styles = useStyles(props)
</script>
