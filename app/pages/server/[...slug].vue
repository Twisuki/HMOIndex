<script lang="ts" setup>
interface Player {
  name: string
  uuid: string
}

interface MinecraftPingResponse {
  players?: {
    online?: number
    max?: number
    onlinePlayers?: Player[]
  }
  description?: {
    text?: string
  }
  error?: string
}

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("server").path(route.path).first()
})

const serverAddress = computed(() => {
  const address = page.value?.address
  if (Array.isArray(address)) {
    return address.join(",")
  }
  return address as string | undefined
})

const { data: serverPing, pending: pingPending, error: pingError } = useLazyFetch<MinecraftPingResponse>(() => {
  const address = serverAddress.value
  if (address) {
    // 我们的 API 现在支持逗号分隔的多个地址
    return `/api/server/status?host=${address}`
  }
  return undefined as unknown as string
}, {
  server: false,
  watch: [serverAddress],
  transform: (response) => {
    if (response && typeof response === "object" && "error" in response) {
      throw new Error(response.error as string)
    }
    return response
  },
})

const isOnline = computed(() => !!serverPing.value && !pingError.value)
const onlinePlayers = computed(() => serverPing.value?.players?.online || 0)
const maxPlayers = computed(() => serverPing.value?.players?.max || 0)
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
        v-if="page?.name !== 'join'"
        class="join"
      >
        入服指南:
        <i class="fa-solid fa-book" />
        <a href="https://docs.qq.com/aio/p/scw3wwi5x2tslm9?p=homViskRsqkXC8nDU2h6HY">点击查看</a>
      </span>
      <ClientOnly>
        <ServerStatus
          v-if="serverAddress"
          :is-online="isOnline"
          :pending="pingPending"
          :online-players="onlinePlayers"
          :max-players="maxPlayers"
        />
      </ClientOnly>
    </div>

    <ClientOnly>
      <ServerOnlinePlayers
        v-if="isOnline && onlinePlayersList.length > 0"
        :online-players-list="onlinePlayersList"
      />
    </ClientOnly>

    <template v-if="page">
      <ContentRenderer :value="page" />
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
  flex-wrap: wrap;
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

@media (max-width: 768px) {
  .info {
    flex-direction: column;
    align-items: flex-start;

    & span {
      width: 100%;
    }
  }
}
</style>
