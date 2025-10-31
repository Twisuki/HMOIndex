<script setup lang="ts">

</script>

<template>
  <div class="page">
    <IndexHero />
    <IndexIntro />
    <IndexServer />
    <IndexDynamic />

    <p>
      Server Section 与 Dynamic Section 顺序待定.
    </p>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 var(--padding-x);
}
</style>
