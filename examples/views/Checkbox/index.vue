<template>
  <div style="padding: 16px;">
    <Checkbox size="small" indeterminate>Checkbox</Checkbox>
    <Checkbox ref="sonRef" size="normal">Checkbox</Checkbox>
    <Checkbox size="large">Checkbox</Checkbox>
  </div>
  <div style="padding: 16px;">
    <CheckboxGroup size="large" :disabled="disabled" vertical v-model="value" @change="handleChange">
      <Checkbox size="small" value="beijing">北京</Checkbox>
      <Checkbox size="normal" value="shanghai">上海</Checkbox>
      <Checkbox size="large" value="shenzhen">深圳</Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script setup lang="ts">
// export default {
//   name: '',
//   mounted () {
//     console.log(this.$refs.sonRef)
//     this.$refs.sonRef.focus()

//     setTimeout(() => {
//       this.$refs.sonRef.blur()
//     }, 3000)
//   }
// }
import { ref, onMounted } from 'vue'
import CheckboxGroup from '../../../src/components/CheckboxGroup/index.vue'
const sonRef = ref()
const disabled = ref(false)
const value = ref(['beijing', 'shenzhen'])
const handleChange = (val) => {
  console.log(666, val)
}

onMounted(() => {
  // console.log(sonRef.value)
  sonRef.value.focus()
  setTimeout(() => {
    sonRef.value.blur()
    // disabled.value = false
    // value.value = ['shanghai']
  }, 3000)
})
</script>

<style lang="scss">
</style>
