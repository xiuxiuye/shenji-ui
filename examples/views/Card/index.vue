<template>
  <Flex>
    <div style="width: 300px; padding: 16px;">
      <Card title="Card title" cover="/examples/assets/exp.webp" description="This is a description." icon="setting" shadow="always">
        <template #header-extra>
          <Button text type="primary">more</Button>
        </template>
        <template #footer>
          <Flex justify="center">这是卡片底部</Flex>
        </template>
        <span>汉堡包是英语Hamburger的音译，是一种发源于德国汉堡的食品，后传入美国，经美国人改良后的美式汉堡风靡全球，是现代西式快餐中的主要食物。</span>
      </Card>
    </div>
    <div style="width: 300px; padding: 16px;">
      <Card title="Card title" description="This is a description." icon="user" size="small" shadow="always">
        <template #cover>
          <img src="../../assets/exp.webp" alt="">
        </template>
        <template #header-extra>
          <Button text type="primary">more</Button>
        </template>
        <template #footer>
          <Flex justify="center">这是卡片底部</Flex>
        </template>
        <span>汉堡包是英语Hamburger的音译，是一种发源于德国汉堡的食品，后传入美国，经美国人改良后的美式汉堡风靡全球，是现代西式快餐中的主要食物。</span>
      </Card>
    </div>
    <Card style="width: 360px" description="This is a description." icon="search" size="large" shadow="always" loading>
      <template #cover>
        <img src="../../assets/exp.webp" alt="">
      </template>
      <template #header-title>
        Card title by slots
      </template>
      <template #header-extra>
        <Button text type="primary">more</Button>
      </template>
      <template #header-description>
        This is a description by description.
      </template>
      <template #footer>
        <Flex justify="center">这是卡片底部</Flex>
      </template>
      <span>汉堡包是英语Hamburger的音译，是一种发源于德国汉堡的食品，后传入美国，经美国人改良后的美式汉堡风靡全球，是现代西式快餐中的主要食物。</span>
    </Card>
    <div style="width: 300px; padding: 16px;">
      <Card title="Card title" description="This is a description." icon="setting" shadow="always" :no-padding="['header']">
        <template #cover>
          <img src="../../assets/exp.webp" alt="">
        </template>
        <template #header-extra>
          <Button text type="primary">more</Button>
        </template>
        <template #footer>
          <Flex justify="center">这是卡片底部</Flex>
        </template>
        <span>汉堡包是英语Hamburger的音译，是一种发源于德国汉堡的食品，后传入美国，经美国人改良后的美式汉堡风靡全球，是现代西式快餐中的主要食物。</span>
      </Card>
    </div>
  </Flex>
</template>

<script setup>
import cover from '../../assets/exp.webp'
console.log(cover)
</script>
