<template>
  <div class="main">
    <div class="test"></div>{{selected}}
    <Select :options="options" v-model="selected">
    </Select>
    <div class="test"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const selected = ref('shanghai')

// \
const options = [
  { label: '北京', value: 'beijing', disabled: true },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '广州', value: 'guangzhou' },
  { label: '浙江', value: 'zhejiang' }
]
</script>
<style lang="scss">
.main {
  // box-sizing: border-box;
  // height: 400px;
  // overflow-y: auto;
  // border: 1px solid blue;
  padding-left: 100px;
}
.test {
  border: 1px solid green;
  height: 300px;
  margin: 16px 0;
}
</style>
