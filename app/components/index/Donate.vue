<script setup lang="ts">

</script>

<template>
  <BaseSection
    classname="donate-container"
  >
    <div class="donate">
      <span>支持一下我们社团!</span>
      <img
        src="/images/donate.webp"
        alt="捐款码"
      >
    </div>
  </BaseSection>
</template>

<style scoped>
.donate-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.donate {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.donate span {
  font-size: var(--title-size);
  color: var(--text-light);
}

.donate img {
  width: 10rem;
  height: 10rem;
}

@media (max-width: 420px) {
  .donate {
    flex-direction: column-reverse;
    gap: 1rem;
  }
}
</style>
