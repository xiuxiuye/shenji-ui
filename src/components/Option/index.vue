<template>
  <div :class="classes" @click="handleClick">
    <div :class="`${classNamePrefix}-content`">
      <slot>{{ label }}</slot>
    </div>
    <Icon v-if="selected" :class="`${classNamePrefix}-selected-icon`" type="check" />
  </div>
</template>

<script lang="ts">
import { computed, watch } from 'vue'
import Icon from '../Icon'
import useInject from 'src/utils/hooks/useInject'
import { componentName as selectComponentName } from '../Select/index.vue'
import type { Provider } from '../Select/types'
import type { Classes } from 'src/types/global'

const componentName = 'sj-option'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
  label?: string;
  value?: string | number;
}

const props = withDefaults(defineProps<Props>(), { disabled: false })

/**
 * inject
 */
const injecter = useInject<Provider>(selectComponentName)

/**
 * selected
 */
const selected = computed<boolean>(() => {
  if (props?.value === undefined) return false
  if (!injecter || !injecter?.value?.selectedValues) return false
  const { selectedValues } = injecter?.value
  return selectedValues?.includes(props?.value)
})

/**
 * classes
 */
const classNamePrefix = 'sj-select-option'
const classes = computed<Classes>(() => {
  return [
    classNamePrefix,
    {
      [`${classNamePrefix}-selected`]: selected?.value,
      [`${classNamePrefix}-disabled`]: props?.disabled
    }
  ]
})

/**
 * event handler
 */
const handleClick = () => {
  console.log('click', props?.value)
}
</script>
