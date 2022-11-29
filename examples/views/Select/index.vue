<template>
  <div class="main">
    <div class="test test1"></div>
    <br /><br />
    <Select
      status="success"
      :multiple="false"
      :options="optionsRef"
      v-model="selected"
      :filterable="true"
      clearable
      placeholder="请选择"
    >
    </Select>
    <div class="test"></div>
  </div>
</template>
<script setup>
import { ref, h } from 'vue'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
const selected = ref('guangzhou')

const options = [
  { label: '北京', value: 'beijing', disabled: false, name: 'BeiJing' },
  { label: '上海', value: 'shanghai', name: 'ShangHai' },
  { label: '深圳', value: 'shenzhen', name: 'ShenZhen' },
  { label: '广州', value: 'guangzhou', name: 'GuangZhou' },
  { label: '浙江', value: 'zhejiang', name: 'ZheJiang' },
  { label: '浙江-义乌', value: 'zhejiang-yiwu', name: 'ZheJiang-YiWu' }
]
const optionsRef = ref(options)

const handleEvent = (value) => {
  console.log(22, value)
}

const loading = ref(false)
const handleRemote = (query) => {
  loading.value = true
  setTimeout(() => {
    if (query) {
      optionsRef.value = options.filter((el) => el?.name?.includes(query))
    } else {
      optionsRef.value = options
    }
    loading.value = false
  }, 3000)
}
const renderOption = (option, selected) => {
  return h(
    'div',
    {
      style: {
        flexGrow: 1,
        display: 'flex',
        color: option?.disabled ? '#aaa' : selected ? 'red' : 'green',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },
    [option?.label, h('span', {}, option?.name)]
  )
}
const renderLabel = (option, onRemove) => {
  const originOption = option?.meta?.originOption
  return h('span', {}, [
    h('span', `${originOption?.label}(${originOption?.name})`),
    h(
      Icon,
      {
        style: {
          marginLeft: '8px'
        },
        type: 'close',
        onclick: (event) => {
          event.stopPropagation()
          onRemove(option?.value)
        }
      },
      ['']
    )
  ])
}
</script>
<style lang="scss">
.main {
  // box-sizing: border-box;
  // height: 400px;
  // overflow-y: auto;
  // border: 1px solid blue;
  padding-left: 100px;
  width: 400px;
}
.test {
  border: 1px solid green;
  height: 400px;
  margin: 16px 0;
}
.test1 {
  height: 400px;
}
.test2 {
  height: 100px;
  overflow: auto;
}
.test3 {
  height: 700px;
}
</style>
