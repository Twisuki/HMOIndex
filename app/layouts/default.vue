<script setup lang="ts">

</script>

<template>
  <div class="container">
    <BaseNavbar />
    <div class="content">
      <slot />
    </div>
    <BaseFooter />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
