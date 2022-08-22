<template>
  <Input size="normal" round />
  <div class="wrapper">
    <Input size="small" round />
    <Input size="normal" round />
    <Input size="large" round />
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
      <Input size="normal" prefix="user" suffix="gift" />
      <Input size="normal" prefix="user" suffix="gift" v-model="test" :password="isPassword" clearable search
        search-button search-button-text="123" loading />
      <Input size="normal" prefix="user" suffix="gift" />
    </InputGroup>
  </div>
  <div class="wrapper">
    <Input ref="sonRef" prefix="user" suffix="gift" autofocus show-length max-length="10" v-model="test"
      :password="isPassword" clearable search search-button :show-search="showSearch" :loading="loading"
      :search-place="place" @clear="handleClear" @search="handleSearch" @focus="handleFocus" @blur="handleBlur"
      @change="handleChange" @input="handleInput" placeholder="请输入自定义提示">
    <template #prepend>
      <Button type="normal">Search1</Button>
    </template>
    <template #append>
      <Button type="normal">Search2</Button>
    </template>
    <template #search-button>
      <Button>Custom Search Btn</Button>
    </template>
    </Input>
    {{ test }}
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import InputGroup from '../../../src/components/Input/InputGroup.vue'
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
  mounted () {
    // setInterval(() => {
    // }, 3000)
    console.log(333, this.$refs.sonRef)
  },
  components: { InputGroup }
}
</script>

<style lang="scss">
.wrapper {
  padding: 16px;
  width: 960px;
  display: inline-block;
}
</style>
