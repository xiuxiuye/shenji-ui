<template>
  <div style="padding: 16px;">
    <!-- <Tag disabled>青花瓷</Tag> -->
    <Tag size="large" border-color="red" round icon="user" closable>告白气球</Tag>
    <!-- <Tag size="normal" border-color="blue" :color="color" :text-color="text" round icon="user" closable>七里香</Tag>
    <Tag size="small" icon="user" closable round>稻香</Tag> -->
  </div>
  <!-- <div style="padding: 16px;">
    <Tag>稻香</Tag>
    <Tag type="info">青花瓷</Tag>
    <Tag type="success" closable icon="user" disabled>告白气球</Tag>
    <Tag type="warning" closable icon="user" round @close="test">
      <template #icon>
        <Icon type="search" />
      </template>
      爱的飞行日记
    </Tag>
    <Tag type="error" closable icon="user" closeIcon="gift" @close="test">给我一首歌的时间</Tag>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
const color = ref('rgba(255, 0, 0, 0.6)')
const text = ref('white')
// setInterval(() => {
//   if (color.value === 'red') {
//     color.value = 'white'
//     text.value = 'black'
//   } else {
//     color.value = 'red'
//     text.value = 'white'
//   }
// }, 3000)
const test = () => {
  alert('close!')
}
</script>

<style lang="scss">
.sj-tag {
  margin-right: 16px;
}
</style>
