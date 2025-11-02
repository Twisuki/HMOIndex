<script setup lang="ts">

</script>

<template>
  <BaseSection classname="title-container">
    <template #default="{ scrolled }">
      <div
        class="title"
        :class="{ scrolled }"
      >
        <span>
          社团动态
        </span>
      </div>
    </template>
  </BaseSection>
</template>

<style scoped>
.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  position: relative;
  width: 100%;
  padding-left: var(--padding-y);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--text);
  }

  & span {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-light);
    transform: translateX(5%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &.scrolled span {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
