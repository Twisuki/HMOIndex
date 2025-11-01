<script setup lang="ts">
export interface NavbarItem {
  label: string
  labelEN: string
  to: string
  active: boolean
}

const route = useRoute()
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
</script>

<template>
  <div class="navbar-container">
    <BaseResponsive>
      <template #desktop>
        <BaseNavbarDesktop :items />
      </template>
      <template #tablet>
        <BaseNavbarTablet :items />
      </template>
    </BaseResponsive>
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
