<template>
  <div ref="sjWave" :class="classes" @click="startWaving" />
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
const sjWave = ref<HTMLElement | null>(null)
onMounted(() => {
  if (sjWave.value) {
    sjWave.value.addEventListener('animationend', endWaving)
  }
})

/**
 * remove animation listenser
 */
onUnmounted(() => {
  if (sjWave.value) {
    sjWave.value.removeEventListener('animationend', endWaving)
  }
})
</script>
