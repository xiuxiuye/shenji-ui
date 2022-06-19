<template>
  <div class="test1" style="padding: 16px;">
  <Loading size="64" tips="Loading1..." />
    <Loading size="large" tips="Loading1..." />
    <Loading size="normal">
      <template #tips>
        Loading2...
      </template>
    </Loading>
    <Loading size="small" tips="Loading3..." />
  </div>
  <br>
  <Loading tips="Loading4..." :visible="true" fit>
    <div class="test2">
      <div class="tt">hello loading <button @click="click">click</button></div>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const click = () => {
  alert(1)
}
</script>

<style lang="scss">
.test1 {
  .sj-loading {
    margin-right: 32px;
  }
}

.test2 {
  width: 300px;
  height: 300px;
  background-color: blue;
  position: relative;
  z-index: 200;

  .tt {
    width: 100px;
    height: 100px;
    background: green;
    color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
}
</style>
