<template>
  <div class="main">
    <div class="test"></div>
    {{ selected }}
    <Select
      :visible="true"
      :options="options"
      v-model="selected"
      filterable
      clearable
      placeholder="请选择"
      remote
      :remote-method="handleRemote"
      :option-render="renderOption"
      :label-render="renderLabel"
    >
    </Select>
    <div class="test"></div>
  </div>
</template>
<script setup>
import { ref, h } from 'vue'
const selected = ref('shanghai')

const options = [
  { label: '北京', value: 'beijing', disabled: true, name: 'BeiJing' },
  { label: '上海', value: 'shanghai', name: 'ShangHai' },
  { label: '深圳', value: 'shenzhen', name: 'ShenZhen' },
  { label: '广州', value: 'guangzhou', name: 'GuangZhou' },
  { label: '浙江', value: 'zhejiang', name: 'ZheJiang' },
  { label: '浙江-义乌', value: 'zhejiang-yiwu', name: 'ZheJiang-YiWu' }
]
const handleRemote = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(options)
    }, 100000)
  })
}
const renderOption = (option, selected) => {
  return h('div', {
    style: {
      flexGrow: 1,
      display: 'flex',
      color: option?.disabled ? '#aaa' : selected ? 'red' : 'green',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, [option?.label, h('span', {}, option?.name)])
}
const renderLabel = (option) => {
  const originOption = option?.meta?.originOption
  return h('span', {}, `${originOption?.label}(${originOption?.name})`)
}
</script>
<style lang="scss">
.main {
  // box-sizing: border-box;
  // height: 400px;
  // overflow-y: auto;
  // border: 1px solid blue;
  padding-left: 100px;
}
.test {
  border: 1px solid green;
  height: 300px;
  margin: 16px 0;
}
</style>
