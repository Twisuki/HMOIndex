<script setup lang="ts">
defineProps({
  items: {
    type: Array as () => NavbarItem[],
  },
})
</script>

<template>
  <div class="navbar">
    <div class="left">
      <div class="logo">
        <img
          src="~/assets/images/logo.png"
          alt="HMO logo"
        >
      </div>
      <div class="title">
        <p class="title__1">
          湖南大学
        </p>
        <p class="title__2">
          岳麓幻境社
        </p>
      </div>
    </div>
    <div class="mid">
      tab
    </div>
    <div class="right">
      <BaseNavbarButton icon="fa-solid fa-bars" />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: var(--max-width);
  padding: 0 var(--padding-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.left,
.right {
  flex: 1;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  width: 2.5rem;
  height: 2.5rem;

  & img {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.title {
  display: flex;
  flex-direction: column;

  .title__1 {
    font-size: 1rem;
    font-weight: 700;
  }

  .title__2 {
    font-size: 1rem;
    font-weight: 700;
  }
}

.mid {
  display: none;
}

.right {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
}
</style>
