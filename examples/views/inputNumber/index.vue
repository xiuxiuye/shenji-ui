<template>
  <div class="demo">
    <h3>Size</h3>
    <InputNumber size="small" />
    <InputNumber size="normal" />
    <InputNumber size="large" />
  </div>
  <div class="demo">
    <InputGroup>
      <Button>Default</Button>
      <InputNumber
        ref="myInputNumber"
        size="normal"
        v-model="value"
        precision="2"
        min="-2"
        max="2"
        step="0.1"
        clearable
        @change="change"
        :disabled="true"
        :controls="true"
      >
        <template #prefix> 人民币 </template>
        <template #suffix> 元 </template>
        <template #prepend>
          <Button search>Search</Button>
        </template>
        <template #append>
          <Input />
          <InputNumber />
        </template>
      </InputNumber>
      <Input />
    </InputGroup>
  </div>
  {{ value }}
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
export default {
  name: ''
}
</script>

<script setup lang="ts">
const value = ref(0.01)
const change = (value) => {
  console.log('change: ', value)
}
const formatter = (val: string) => {
  if (!val) return val
  return `￥ ${val}`
}
const parser = (val: string) => {
  if (val.replace('￥ ', '') === '') {
    return undefined
  }
  return +val.replace('￥ ', '')
}
const handleFocus = (event) => {
  console.log('focus: ', event)
}
const handleBlur = (event) => {
  console.log('blur: ', event)
}
const myInputNumber = ref(null)
onMounted(() => {
  console.log(myInputNumber?.value?.focus())
  setTimeout(() => {
    myInputNumber?.value?.blur()
  }, 5000)
})
</script>

<style lang="scss">
.demo {
  padding: 16px;
}
</style>
