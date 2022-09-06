<template>
  <div>
    <button @click="add">add</button>
    <button @click="all">all</button>
    <!-- <Message /> -->
  </div>
</template>

<script lang="ts">
// import { message } from '../../../src'
let count = 1
export default {
  methods: {
    all () {
      this.$message.create({
        content: '3333333333',
        icon: 'search',
        iconColor: '#ff0000'
      })
    },
    add () {
      const duration = 0
      const closable = true
      const placement = 'right-top'
      if (count % 5 === 1) {
        this.$message.info({
          content: '1234567890' + '-' + count,
          duration,
          closable,
          placement
        })
      } else if (count % 5 === 2) {
        this.$message.error({
          content: 'error 你好啊' + '-' + count,
          duration,
          closable,
          placement
        })
      } else if (count % 5 === 3) {
        this.$message.success({
          content: 'This is a success message This is a success message' + '-' + count,
          duration,
          closable,
          placement
        })
      } else if (count % 5 === 4) {
        this.$message.warning({
          content: 'warning 你好啊' + '-' + count,
          duration,
          closable
        })
      } else if (count % 5 === 0) {
        this.$message.loading({
          content: 'loaidng 你好啊' + '-' + count,
          duration,
          closable,
          placement,
          onClose () {
            console.log('close!')
          }
        })
      }
      count++
    }
  }
}
</script>

<script setup lang="ts">
</script>

<style lang="scss">
</style>
