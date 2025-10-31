<script setup lang="ts">

</script>

<template>
  <IndexSection
    classname="intro-container"
    card
  >
    <template #default="{ scrolled }">
      <div class="intro">
        Intro Section
        <p> Scrolled: {{ scrolled }}</p>
        <p>简介, 快速传送门</p>
      </div>
    </template>
  </IndexSection>
</template>

<style scoped>
.intro-container {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
