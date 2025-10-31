<script setup lang="ts">

</script>

<template>
  <IndexSection classname="hero-container">
    <template #default="{ scrolled }">
      <div class="hero">
        Hero Section
        <p> Scrolled: {{ scrolled }}</p>
        <p>Hero</p>
      </div>
    </template>
  </IndexSection>
</template>

<style scoped>
.hero-container {
  width: 100%;
  height: calc(100vh - 6rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  width: 100%;
  height: 100%;
  background-color: var(--bg-decoration);
}
</style>
