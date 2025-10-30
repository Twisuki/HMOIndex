<script setup lang="ts">
export interface NavbarItem {
  label: string
  labelEN: string
  to: string
  active: boolean
}

const route = useRoute()

const isLoaded = ref(false)
const isDesktop = ref(false)
let mediaQuery: MediaQueryList

const items = computed<NavbarItem[]>(() => [
  {
    label: "主页",
    labelEN: "HOME",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "动态",
    labelEN: "DYNAMIC",
    to: "/dynamic",
    active: route.path.startsWith("/dynamic"),
  },
  {
    label: "服务器",
    labelEN: "SERVER",
    to: "/server",
    active: route.path.startsWith("/server"),
  },

  {
    label: "资源",
    labelEN: "RESOURCE",
    to: "/resource",
    active: route.path.startsWith("/resource"),
  },
])

onMounted(() => {
  mediaQuery = window.matchMedia("(min-width: 769px)")
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
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-container::after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(50%);
  background-color: #ffffff;
}
</style>
