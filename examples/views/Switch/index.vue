<template>
  <Switch />
  <Input @focus="focus" @blur="blur" />

  <div class="main">
    <div class="left" :style="{ width: check ? '280px' : '' }"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const check = ref(false)
const focus = () => {
  check.value = true
}
const blur = () => {
  check.value = false
}
</script>

<style lang="scss">
.sj-switch {
  margin: 16px;
}
.main{
  margin-top: 100px;
  height: 40px;
  width: 300px;
  display: flex;

  .left,
  .right {
    height: inherit;
  }

  .left {
    background-color: red;
    width: 20px;
    transition: width 5s ease-in;
  }
  .right {
    flex-grow: 1;
    flex-shrink: 1;
    background-color: aqua;
  }
}
</style>
