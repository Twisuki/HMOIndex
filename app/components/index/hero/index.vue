<script setup lang="ts">

</script>

<template>
  <BaseSection classname="hero-container">
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
  </BaseSection>
</template>

<style scoped>
.hero-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
