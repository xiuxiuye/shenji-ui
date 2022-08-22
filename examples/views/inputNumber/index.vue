<template>
  <div class="demo">
    <h3>Size</h3>
    <InputNumber size="small" />
    <InputNumber size="normal" />
    <InputNumber size="large" />
  </div>
  <div class="demo">
    <InputNumber size="normal" v-model="value" clearable autofocus max="6" min="-6" step="10" />
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
</script>

<style lang="scss">
.demo {
  padding: 16px;
}
</style>
