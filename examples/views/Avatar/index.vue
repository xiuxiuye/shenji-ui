<template>
  <Flex align="center">
    <Avatar bordered size="48px" icon="user" border-color="red" shape="square" />
    <Avatar bordered size="large" icon="user" />
    <Avatar bordered icon="user" />
    <Avatar bordered size="small" icon="user" />
  </Flex>

  <Flex align="center">
    <Avatar size="48px" icon="user" shape="square" src="/examples/assets/exp.webp" />
    <Avatar size="48px" icon="user" shape="circle" src=""
      fallback-src="/examples/assets/logo.png" alt="图像加载失败" object-fit="fill" />
    <Avatar bordered size="48px" src="/examples/assets/exp.webp1" color="red" @on-error="loadError">
      <span style="color: aliceblue;">叶修</span>
    </Avatar>
  </Flex>
</template>

<script setup lang="ts">
const loadError = (event) => {
  console.log(event)
}
</script>

<style lang="scss">
.sj-avatar {
  margin-right: 16px;
}
</style>
