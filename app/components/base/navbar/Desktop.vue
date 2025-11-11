<script setup lang="ts">
import type { NavbarItem } from "./index.vue"

const props = defineProps<{ items: NavbarItem[] }>()

const navItems = ref<HTMLElement[]>([])

const setNavItem = (el: HTMLElement, index: number) => {
  if (el) navItems.value[index] = el
}

const handleMouseEnter = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  navItems.value.forEach((item) => {
    item.classList.remove("active")
  })
  target.classList.add("active")
}

const handleMouseLeave = () => {
  navItems.value.forEach((item) => {
    const index = navItems.value.indexOf(item)
    item.classList.toggle("active", props.items[index]?.active)
  })
}
</script>

<template>
  <div class="navbar">
    <div class="left">
      <img
        src="/images/title.webp"
        alt="HMO"
      >
    </div>
    <div class="right">
      <a
        v-for="(item, index) in items"
        :ref="(el) => setNavItem(el as HTMLElement, index)"
        :key="item.to"
        class="item"
        :href="item.to"
        :class="{ active: item.active }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
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
  width: var(--max-width);
  padding: 0 var(--padding-x);
  height: 4rem;
  display: flex;
  justify-content: space-between;
  gap: var(--padding-x);
}

.left {
  height: 100%;

  & img {
    height: 100%;
  }
}

.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.item {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;

  &::after {
    content: "";
    width: 0;
    height: 6px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateY(50%);
    z-index: 200;
    background-color: var(--text-focus);
    transition: all 0.1s ease;
  }

  &.active {
    color: var(--text-focus);

    &::after {
      width: 100%;
      left: 0;
    }
  }
}
</style>
