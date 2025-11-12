<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("server").path(route.path).first()
})

console.log(page.value)

// 自建api 搭建于aliyun 
const PING_API_BASE = "http://47.121.127.41:4567/ping"

const serverAddress = computed(() => page.value?.meta?.address as string | undefined)

const { data: serverPing, pending: pingPending, error: pingError } = useFetch(() => {
  const address = serverAddress.value
  if (address) {
    return `${PING_API_BASE}?address=${address}`
  }
  return null
}, {
  server: false,
  lazy: true,
  watch: [serverAddress],
  transform: (response) => {
    if (response && typeof response === "object" && "error" in response) {
      throw new Error(response.error)
    }
    return response
  },
})

const isOnline = computed(() => !!serverPing.value && !pingError.value)
const onlinePlayers = computed(() => serverPing.value?.players?.online || 0)
const maxPlayers = computed(() => serverPing.value?.players?.max || 0)
const _motd = computed(() => serverPing.value?.description?.text || "服务器离线")
const onlinePlayersList = computed(() => serverPing.value?.players?.onlinePlayers || [])
</script>

<template>
  <div class="page">
    <BaseSection classname="nav-container">
      <template #title>
        <a
          href="/server"
          class="nav"
        >
          <i class="fa-solid fa-arrow-left" />
          返回主页
        </a>
      </template>
    </BaseSection>

    <img
      class="cover"
      :src="page?.cover"
      alt="cover"
    >

    <div class="title">
      <i class="fa-solid fa-play" />
      {{ page?.title }}
    </div>

    <div class="info">
      <span class="date">
        开服日期:
        <i class="fa-solid fa-calendar" />
        <span>
          {{ page?.date || "xxxx-xx-xx" }}
        </span>
      </span>
      <span class="map">
        网页地图:
        <i class="fa-solid fa-earth-americas" />
        <a
          v-if="page?.map"
          :href="`https://${page?.map}`"
          target="_blank"
        >
          {{ page?.map || "暂无" }}
        </a>
        <span v-else>暂无</span>
      </span>
      <span
        v-if="serverAddress"
        class="status"
      >
        服务器状态:
        <i
          v-if="pingPending"
          class="fa-solid fa-spinner fa-spin"
        />
        <template v-else-if="isOnline">
          <i
            class="fa-solid fa-circle-check"
            style="color: green;"
          />
          <span style="color: green;">在线 ({{ onlinePlayers }}/{{ maxPlayers }})</span>
        </template>
        <template v-else>
          <i
            class="fa-solid fa-circle-xmark"
            style="color: red;"
          />
          <span style="color: red;">离线</span>
        </template>
      </span>
    </div>

    <div
      v-if="isOnline && onlinePlayersList.length > 0"
      class="online-players"
    >
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

    <template v-if="page">
      <ContentRenderer
        :value="page"
      />
    </template>
    <template v-else>
      页面未找到
    </template>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 var(--padding-x) var(--padding-y);
}

.nav {
  width: 100%;
  margin-bottom: 1rem;
  color: var(--text-light);
  text-decoration: none;
  font-size: var(--title-size);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & i {
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translateX(-2px);
  }
}

.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}

.title {
  font-size: calc(var(--title-size) * 1.5);
  font-weight: bold;
  color: var(--text-light);

  & i {
    font-size: calc(var(--title-size) * 1.5);
  }
}

.info {
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;

  & span {
    font-size: var(--font-size);
    color: var(--text-light);
  }

  & a {
    color: var(--text-light);
    text-decoration: underline;

    &:hover {
      color: var(--text-focus);
    }
  }
}

@media (max-width: 420px) {
  .info {
    flex-direction: column;
    align-items: flex-start;
  }
}

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
