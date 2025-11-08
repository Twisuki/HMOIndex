<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="img-preloader">
    <img
      :src="src"
      alt="preloader"
    >
  </div>
</template>

<style scoped>
.img-preloader {
  width: 0;
  height: 0;

  & img {
    width: 0;
    height: 0;
  }
}
</style>
