<template>
  <Input size="normal" round />
  <div class="wrapper">
    <Input size="small" round />
    <Input size="normal" round />
    <Input size="large" round />
  </div>
  <div class="wrapper">
    <Input prefix="user" border="none" model-value="none-border" />
    <Input prefix="user" border="block" model-value="block-border" />
    <Input prefix="user" border="line" model-value="line-border" />
  </div>
  <div class="wrapper">
    <Input size="normal" status="success" />
    <Input size="normal" status="error" />
    <Input size="normal" status="warning" />
  </div>
  <div class="wrapper">
    <Input prefix="user" suffix="gift" size="normal" status="error" show-length max-length="10" v-model="test"
      :password="isPassword" autofocus clearable search search-button :show-search="showSearch" :loading="loading"
      :search-place="place" @clear="handleClear" @search="handleSearch" @focus="handleFocus" @blur="handleBlur"
      @change="handleChange" @input="handleInput" placeholder="请输入自定义提示">
      <template #prepend>
      <Button type="warning">Search1</Button>
    </template>
    <template #append>
      <Button type="error">Search2</Button>
    </template>
    <template #search-button>
      <Button type="success">Search3</Button>
    </template>
    </Input>
    {{ test }}
  </div>
</template>

<script lang="ts">
export default {
  name: '',
  data () {
    return {
      test: '',
      isPassword: true,
      place: 'after',
      loading: false,
      showSearch: true
    }
  },
  methods: {
    handleClear () {
      console.log('clear!')
    },
    handleSearch (query) {
      console.log('search:', query)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    handleFocus (event) {
      console.log('focus:', event)
    },
    handleBlur (event) {
      console.log('blur:', event)
    },
    handleChange (value, event) {
      console.log('change:', value, event)
    },
    handleInput (value, event) {
      console.log('input:', value, event)
    }
  },
  created () {
    // setInterval(() => {
    // }, 3000)
  }
}
</script>

<style lang="scss">
.wrapper {
  padding: 16px;
  width: 660px;
  display: inline-block;
}
</style>
