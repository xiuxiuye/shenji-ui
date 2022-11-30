<template>
  <div class="demo">
    <InputNumber
      size="large"
      clearable
      :disabled="false"
      :autofocus="false"
      precision="3"
      max="4"
      min="-4"
      step="0.222"
      v-model="value"
      border-type="block"
      prefix="user"
      suffix="lock"
      :controls="true"
      :keyboard="false"
    >
  </InputNumber>
  <br />
  <Select />
  </div>
  <div class="demo">
    <InputGroup>
      <Input prefix="user" suffix="lock" search search-button>
        <template #search-button>
          <Button>
            <Icon type="loading-a" />
          </Button>
        </template>
      </Input>
      <InputNumber prefix="user" suffix="lock" />
      <Input
        prefix="user"
        suffix="lock"
        search
        search-button
        search-button-text="Search"
      />
      <InputNumber prefix="user" suffix="lock" />
      <Input prefix="user" suffix="lock" search search-button>
        <template #search-button>
          <Button type="error">Error</Button>
        </template>
      </Input>
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
const value = ref(2.22)
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
