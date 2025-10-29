<script setup lang="ts">

</script>

<template>
  <div class="footer-container">
    <div class="footer">
      Copyright &copy; {{ new Date().getFullYear() }} HMO - Apache 2.0 License
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
  height: 2rem;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  width: var(--max-width);
  padding: 0 var(--padding-x);
  text-align: center;
}
</style>
