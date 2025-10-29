<script setup lang="ts">
interface NavButtonProps {
  icon: string
  callback?: () => void
  to?: string
}

const props = defineProps<NavButtonProps>()
const router = useRouter()

const handleClick = () => {
  if (props.callback) props.callback()
  else if (props.to) router.push(props.to)
}
</script>

<template>
  <div
    class="button-container"
    @click="handleClick"
  >
    <div class="button">
      <i :class="icon" />
    </div>
  </div>
</template>

<style scoped>
.button-container {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container:hover {
  background-color: var(--bg-gray);
}
</style>
