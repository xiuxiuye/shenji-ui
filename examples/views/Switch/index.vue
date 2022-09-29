<template>
  <div class="main">
    <Switch size="large" disabled loading :round="true" v-model="check" @change="handleChange" />{{check}}
    <Switch size="normal" icon="lock" checked-text="一花一世" unchecked-text="一念花开" v-model="check"
      @change="handleChange">
    </Switch>{{check}}
    <Switch size="normal" icon="user" :rubber-band="true" :round="true" v-model="check" @change="handleChange" />
    {{check}}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const check = ref(false)
const handleChange = (...rest) => {
  console.log(rest)
}
const enter = () => {
  check.value = true
}
const leave = () => {
  check.value = false
}
</script>

<style lang="scss">
.sj-switch {
  margin: 16px;
}

.main {
  border: 1px solid red;
}
</style>
