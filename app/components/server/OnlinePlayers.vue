<script lang="ts" setup>
interface Player {
  name: string
  uuid: string
}

defineProps<{
  onlinePlayersList: Player[]
}>()
</script>

<template>
  <div class="online-players">
    <div class="player-title">
      在线玩家 ({{ onlinePlayersList.length }})
    </div>
    <div class="player-list">
      <div
        v-for="player in onlinePlayersList"
        :key="player.uuid"
        class="player-item"
      >
        <img
          :src="`https://nmsr.nickac.dev/head/${player.name}`"
          :alt="player.name"
          class="player-head"
        >
        <span class="player-name">{{ player.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.online-players {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.player-title {
  font-size: var(--title-size);
  font-weight: bold;
  color: var(--text-light);
}

.player-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.player-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: auto;
}

.player-head {
  width: 30px;
  height: 30px;
  border-radius: 0;
  object-fit: cover;
  border: none;
}

.player-name {
  font-size: var(--font-size);
  color: var(--text-light);
  text-align: left;
  word-break: keep-all;
}
</style>
