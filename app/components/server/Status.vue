<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
  isOnline: boolean
  pending: boolean
  onlinePlayers: number
  maxPlayers: number
}>()

const statusText = computed(() => {
  if (props.pending) return "加载中..."
  if (props.isOnline) return `在线 (${props.onlinePlayers}/${props.maxPlayers})`
  return "离线"
})

const statusIconClass = computed(() => {
  if (props.pending) return "fa-solid fa-spinner fa-spin"
  if (props.isOnline) return "fa-solid fa-circle-check"
  return "fa-solid fa-circle-xmark"
})

const statusColor = computed(() => {
  if (props.pending) return "var(--text-light)"
  if (props.isOnline) return "green"
  return "red"
})
</script>

<template>
  <span class="status">
    服务器状态:
    <i
      :class="statusIconClass"
      :style="{ color: statusColor }"
    />
    <span :style="{ color: statusColor }">{{ statusText }}</span>
  </span>
</template>

<style scoped>
.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
