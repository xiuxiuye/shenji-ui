<template>
  <div style="padding: 16px;">
    <Checkbox size="small">Checkbox</Checkbox>
    <Checkbox ref="sonRef" size="normal">Checkbox</Checkbox>
    <Checkbox size="large">Checkbox</Checkbox>
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
const sonRef = ref()
onMounted(() => {
  console.log(sonRef.value)
  sonRef.value.focus()
  setTimeout(() => {
    sonRef.value.blur()
  }, 3000)
})
</script>

<style lang="scss">
</style>
