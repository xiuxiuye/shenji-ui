<template>
  <div ref="wave" :class="classes" @click="startWaving" />
</template>
<script lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { Classes } from '../../types/global'

const componentName = 'sj-wave'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
const isWaving = ref(false)
const classNamePrefix = componentName
const classes = computed<Classes>(() => ([
  classNamePrefix,
  {
    'sj-wave-spread-active': isWaving.value
  }
]))

const startWaving = () => {
  isWaving.value = true
}

const endWaving = () => {
  isWaving.value = false
}

/**
 * add animation listenser
 */
const wave = ref(null)
onMounted(() => {
  const dom = wave.value
  if (dom) {
    (dom as HTMLElement).addEventListener('animationend', endWaving)
  }
})

/**
 * remove animation listenser
 */
onUnmounted(() => {
  const dom = wave.value
  if (dom) {
    (dom as HTMLElement).removeEventListener('animationend', endWaving)
  }
})
</script>

<style lang="scss">
@keyframes sj-wave-opacity {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 0;
  }
}

@keyframes sj-wave-spread-primary {
  from {
    outline: 0.5px solid var(--sj-primary-color);
  }

  to {
    outline: 6px solid var(--sj-primary-color);
  }
}

.sj-wave-spread-active {
  animation-name: sj-wave-spread-primary,
    sj-wave-opacity;
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

.sj-wave {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
}
</style>
