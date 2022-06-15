<template>
  <div class="test1" style="padding: 16px;">
    <Loading size="large" tip="Loading..." />
    <Loading size="normal" tip="Loading..." />
    <Loading size="small" tip="Loading..." />
  </div>
  <br>
  <div class="test2" style="padding: 16px;">
    <Loading tip="Loading..." fix />
    <div class="tt">hello loading</div>
  </div>
</template>

<script lang="ts">
export default {
  name: ''
}
</script>

<script setup lang="ts">
</script>

<style lang="scss">
.test1 {
  .sj-loading {
    margin-right: 32px;
  }
}

.test2 {
  border: 1px solid red;
  width: 500px;
  height: 300px;
  position: relative;
  background-color: rgb(230, 247, 255);

  .tt {
    position: absolute;
    width: 100px;
    height: 100px;
    background: black;
    color: white;
    z-index: 10;
  }
}
</style>
