<template>
  <Flex align="center">
    <Avatar bordered size="48px" icon="user" border-color="red" shape="square" />
    <Avatar bordered size="large" icon="user" />
    <Avatar bordered icon="user" />
    <Avatar bordered size="small" icon="user" />
  </Flex>
  <br />
  <Flex align="center">
    <Avatar size="48px" icon="user" shape="square" src="/examples/assets/exp.webp" />
    <Avatar size="48px" icon="user" shape="circle" src="" fallback-src="/examples/assets/logo.png" alt="图像加载失败"
      object-fit="fill" />
    <Avatar bordered size="large" src="/examples/assets/exp.webp1" color="red" @on-error="loadError">
      <span style="color: aliceblue;">修</span>
      <span style="color: aliceblue;">羞</span>
    </Avatar>
  </Flex>
  <br />
  <Flex>
    <AvatarGroup style="marginRight: 32px;">
      <Avatar size="large" bordered src="/examples/assets/exp.webp" />
      <Avatar size="large" bordered>
        <template #icon>
          <Icon type="user" size="16" />
        </template>
      </Avatar>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
    </AvatarGroup>
    <AvatarGroup tight>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
      <Avatar size="large" bordered src="/examples/assets/exp.webp" />
      <Avatar size="large" bordered color="green">
        <template #icon>
          <Icon type="user" size="16" />
        </template>
      </Avatar>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
    </AvatarGroup>
  </Flex>
  <br />
  <Flex>
    <AvatarGroup vertical tight style="marginRight: 32px;">
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
      <Avatar size="large" bordered src="/examples/assets/exp.webp" />
      <Avatar size="large" bordered color="green">
        <template #icon>
          <Icon type="user" size="16" />
        </template>
      </Avatar>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
    </AvatarGroup>
    <AvatarGroup vertical>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
      <Avatar size="large" bordered src="/examples/assets/exp.webp" />
      <Avatar size="large" bordered color="green">
        <template #icon>
          <Icon type="user" size="16" />
        </template>
      </Avatar>
      <Avatar bordered size="large" color="red">
        <span style="color: aliceblue;">修</span>
      </Avatar>
    </AvatarGroup>
  </Flex>
</template>

<script setup lang="ts">
const loadError = (event) => {
  console.log(event)
}
</script>

<style lang="scss">
// .sj-avatar {
//   margin-right: 16px;
// }
</style>
