<script setup lang="ts">
import type { NavbarItem } from "./index.vue"

defineProps<{ items: NavbarItem[] }>()

const isNavShown = ref(false)

const toggleNav = () => {
  isNavShown.value = !isNavShown.value
}
</script>

<template>
  <div class="navbar">
    <div class="left">
      <img
        src="~/assets/images/title.png"
        alt="HMO"
      >
    </div>
    <div class="right">
      <div
        class="toggle"
        :class="{ active: isNavShown }"
        @click="toggleNav"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </div>
    </div>
    <div
      class="body"
      :class="{ shown: isNavShown }"
    >
      <a
        v-for="item in items"
        :key="item.to"
        class="item"
        :href="item.to"
        :class="{ active: item.active }"
      >
        <div class="label-en">
          {{ item.labelEN }}
        </div>
        <div class="label">
          {{ item.label }}
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: relative;
  width: var(--max-width);
  padding: 0 var(--padding-x);
  height: 3rem;
  display: flex;
  justify-content: space-between;
}

.left {
  height: 100%;

  & img {
    height: 100%;
  }
}

.right {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.toggle {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;

  & .bar {
    display: block;
    position: absolute;
    width: 70%;
    height: 2px;
    background-color: var(--text);
    left: 15%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
  }

  & .bar:nth-child(1) {
    top: 25%;
  }

  & .bar:nth-child(2) {
    top: 50%;
  }

  & .bar:nth-child(3) {
    top: 75%;
  }
}

.toggle.active {
  & .bar:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  & .bar:nth-child(2) {
    transform: translateX(75%);
    opacity: 0;
  }

  & .bar:nth-child(3) {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }
}

.body {
  position: absolute;
  width: 100%;
  padding: 4px var(--padding-x);
  left: 0;
  top: 100%;
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: var(--bg-cover);
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transition: all 0.5s ease;

  &.shown {
    pointer-events: auto;
    top: 3rem;
    transform: translateY(0);
    opacity: 1;
  }
}

.item {
  position: relative;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 4px;
  color: var(--text);
  font-weight: 600;
  text-decoration: none;

  &::after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    z-index: 200;
    background-color: var(--text);
  }

  &.active {
    color: var(--text-focus);
  }
}
</style>
