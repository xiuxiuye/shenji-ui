<template>
  <Transition
    name="sj-collapse"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
export const componentName = 'sj-collapse-transition'
export default {
  name: componentName
}
</script>

<script setup lang="ts">
const enter = (el: HTMLElement) => {
  el.style.height = 'auto'
  const height = window.getComputedStyle(el).height
  el.style.height = '0px'
  // eslint-disable-next-line
  el.offsetHeight; // force repaint
  // noinspection JSSuspiciousNameCombination
  el.style.height = height
  console.log('enter', el, el.offsetHeight, height)
}
const afterEnter = (el: HTMLElement) => {
  el.style.height = 'auto'
}
const leave = (el: HTMLElement) => {
  el.style.height = window.getComputedStyle(el).height
  // eslint-disable-next-line
  el.offsetHeight; // force repaint
  el.style.height = '0px'
}
const afterLeave = (el: HTMLElement) => {
  el.style.height = 'auto'
}
</script>

<style lang="scss">
.sj-collapse-enter-active,
.sj-collapse-leave-active {
  transition: height 0.3s ease-in-out;
}
</style>
