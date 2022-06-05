<template>
  <div class="sj-card-content-loading">
    <div v-for="i in 10"
      :key="`sj-card-content-loading-item-${i}`"
      class="sj-card-content-loading-item sj-blink">
    </div>
  </div>
</template>
