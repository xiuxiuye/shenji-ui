<template>
  <Input size="normal" round />
  <div class="wrapper">
    <Input prefix="user" suffix="gift" size="small" round />
    <br />
    <Input prefix="user" suffix="gift" size="normal" password round />
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
      <Input-Group-Label>Https://</Input-Group-Label>
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
      <Input-Group-Label>.Com</Input-Group-Label>
      <Input />
      <Input-Group-Label>.Cn</Input-Group-Label>
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
    />
  </div>
  <div class="wrapper">
    <InputGroup>
      <Input prefix="user" suffix="lock" search search-button>
        <template #search-button>
          <Button>
            <Icon type="loading-a" />
          </Button>
        </template>
      </Input>
      <InputNumber prefix="user" suffix="lock" />
      <Input
        prefix="user"
        suffix="lock"
        search
        search-button
        search-button-text="Search"
      />
      <Input prefix="user" suffix="lock" search search-button>
        <template #search-button>
          <Button type="error">Error</Button>
        </template>
      </Input>
    </InputGroup>
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
