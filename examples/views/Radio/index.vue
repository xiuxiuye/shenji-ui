<template>
  <div style="padding: 16px;">
    <Radio size="small">Radio</Radio>
    <Radio size="normal" @change="handleChange" ref="myRadio">Radio</Radio>
    <Radio size="large" disabled>Radio</Radio>
  </div>
  <RadioGroup size="normal" name="duck" v-model="radioValue" @change="handleChange">
    <Radio size="normal" value="one">Radio1</Radio>
    <Radio size="normal" value="two">Radio2</Radio>
    <Radio size="normal" value="three">Radio3</Radio>
  </RadioGroup>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
export default {
  name: ''
}
</script>

<script setup lang="ts">
const radioValue = ref('two')
const radioValue1 = ref(true)

const handleChange = (v, e) => {
  console.log(v, e)
}
const myRadio = ref(null)
onMounted(() => {
  myRadio.value.focus()
  setTimeout(() => {
    myRadio.value.blur()
  }, 3000)
})
</script>

<style lang="scss">
</style>
