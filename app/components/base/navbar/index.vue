<script setup lang="ts">
export interface NavbarItem {
  label: string
  to: string
  active: boolean
}

const route = useRoute()

const isLoaded = ref(false)
const isDesktop = ref(false)
let mediaQuery: MediaQueryList

const items = computed<navbarItem[]>(() => [
  {
    label: "主页",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "服务器",
    to: "/servers",
    active: route.path.startsWith("/servers"),
  },
  {
    label: "动态",
    to: "/dynamic",
    active: route.path.startsWith("/dynamic"),
  },
  {
    label: "资源",
    to: "/source",
    active: route.path.startsWith("/source"),
  },
])

onMounted(() => {
  mediaQuery = window.matchMedia("(min-width: 1025px)")
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener("change", handleMediaChange)

  isLoaded.value = true
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", handleMediaChange)
})

const handleMediaChange = (e: MediaQueryListEvent) => {
  isDesktop.value = e.matches
}
</script>

<template>
  <div class="navbar-container">
    <BaseNavbarDesktop
      v-if="isDesktop && isLoaded"
      :items="items"
    />
    <BaseNavbarTablet
      v-if="!isDesktop && isLoaded"
      :items="items"
    />
  </div>
</template>

<style scoped>
.navbar-container {
  width: 100%;
  height: var(--nav-height);
  background-color: var(--bg);
  box-shadow: 0 2px 10px var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
