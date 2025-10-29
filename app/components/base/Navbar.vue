<script setup lang="ts">

</script>

<template>
  <div class="navbar-container">
    <div class="navbar">
      <div class="left">
        logo
      </div>
      <div class="mid">
        tab
      </div>
      <div class="right">
        icon
      </div>
    </div>
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

.navbar {
  width: var(--max-width);
  padding: 0 var(--padding-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.left,
.mid,
.right {
  display: flex;
  flex: 1;
}
</style>
