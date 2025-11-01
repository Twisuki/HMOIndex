<script setup lang="ts">

</script>

<template>
  <IndexSection classname="hero-container">
    <template #default="{ scrolled }">
      <BaseResponsive :breakpoints="640">
        <template #desktop>
          <IndexHeroDesktop :scrolled />
        </template>
        <template #tablet>
          <IndexHeroTablet :scrolled />
        </template>
      </BaseResponsive>
    </template>
  </IndexSection>
</template>

<style scoped>
.hero-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
