<template>
  <div class="demo">
    <h3>Size</h3>
    <InputNumber size="small" />
    <InputNumber size="normal" />
    <InputNumber size="large" />
  </div>
  <div class="demo">
    <InputNumber
      size="normal"
      v-model="value"
      precision="2"
      step="0.01"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: ''
}
</script>

<script setup lang="ts">
const value = ref(1)
const change = (value) => {
  console.log('change: ', value)
}
</script>

<style lang="scss">
.demo {
  padding: 16px;
}
</style>
