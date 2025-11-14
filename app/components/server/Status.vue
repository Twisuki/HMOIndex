<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  isOnline: boolean
  pending: boolean
  onlinePlayers: number
  maxPlayers: number
}

const props = defineProps<Props>()

const statusInfo = computed(() => {
  if (props.pending) {
    return {
      text: "加载中...",
      iconClass: "fa-solid fa-spinner fa-spin",
      color: "yellow",
    }
  }
  if (props.isOnline) {
    return {
      text: `在线 (${props.onlinePlayers}/${props.maxPlayers})`,
      iconClass: "fa-solid fa-circle-check",
      color: "green",
    }
  }
  return {
    text: "离线",
    iconClass: "fa-solid fa-circle-xmark",
    color: "red",
  }
})
</script>

<template>
  <span class="status">
    服务器状态:
    <i
      :class="statusInfo.iconClass"
      :style="{ color: statusInfo.color }"
    />
    <span :style="{ color: statusInfo.color }">{{ statusInfo.text }}</span>
  </span>
</template>

<style scoped>
.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
