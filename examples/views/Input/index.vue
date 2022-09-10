<template>
  <Input size="normal" round />
  <div class="wrapper">
    <Input prefix="user" suffix="gift" size="small" round />
    <br />
    <Input prefix="user" suffix="gift" size="normal" round />
    <br />
    <Input prefix="user" suffix="gift" size="large" round />
  </div>
  <div class="wrapper">
    <Input prefix="user" border="none" model-value="none-border" />
    <Input prefix="user" disabled border="block" model-value="block-border" />
    <Input prefix="user" border="line" model-value="line-border" />
  </div>
  <div class="wrapper">
    <Input size="normal" status="success" />
    <Input size="normal" status="error" disabled />
    <Input size="normal" status="warning" />
  </div>
  <div class="wrapper">
    <InputGroup>
      <Input
        size="normal"
        prefix="user"
        suffix="gift"
        v-model="test"
        :password="isPassword"
        clearable
        search
      >
      </Input>
      <Input>
        <template #prepend>
          <Button type="normal">Search1</Button>
          <Button type="normal">Search1</Button>
        </template>
        <template #append>
          <Button type="normal">Search2</Button>
        </template>
        <template #search-button>
          <Button>Custom Search Btn</Button>
        </template>
      </Input>
      <InputNumber />
    </InputGroup>
  </div>
  <div class="wrapper">
    <Input
      ref="sonRef"
      round
      prefix="user"
      suffix="gift"
      autofocus
      :disabled="true"
      show-length
      max-length="100"
      v-model="test"
      :password="isPassword"
      clearable
      :loading="loading"
      :search-place="place"
      @clear="handleClear"
      @search="handleSearch"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @input="handleInput"
      placeholder="请输入自定义提示"
    >
      <template #prepend>
        <Input />
      </template>
      <template #append>
        <Button type="primary">Search</Button>
      </template>
    </Input>
  </div>
</template>

<script lang="ts">
export default {
  name: '',
  data () {
    return {
      test: '',
      isPassword: false,
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
  mounted () {
    // setInterval(() => {
    // }, 3000)
    console.log(333, this.$refs.sonRef)
  }
}
</script>

<style lang="scss">
.wrapper {
  padding: 16px;
  display: inline-block;
}
</style>
