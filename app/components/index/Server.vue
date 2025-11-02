<script setup lang="ts">
interface ServerCard {
  title: string
  intro: string
  cover: string
  to: string
}

const serverItems: ServerCard[] = [
  {
    title: "起源服",
    intro: "以生电, 建造玩法为核心, 生电佬交流中心, 社团重要线上活动举办地, 社团早期文化遗产圣地, 现已进入老年期.",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
  {
    title: "古典服",
    intro: "当现代文明的辉煌隐去，古典的回声响彻耳畔，ban生电和高频红石之后，玩家们又将何去何从，远古的大陆上最早的文明走出了新的乐章。",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
  {
    title: "复建服",
    intro: "你心中的大学是什么样子? 我想...复建属于我们的湖南大学! 幻境社复建部专属服务器, 24h不间断营业, 工期密排ing!",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
  {
    title: "起床服",
    intro: "老发聊发少年狂, pvp玩起床, 经典, 也是当年模样. 湖大起床服重启1.8.9版本经典4v4v4v4, 于寒暑假举办HUC起床战争系列赛, 欢迎大家组队报名.",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
  {
    title: "生存乐事",
    intro: "厌倦了996的生活? 那就一起来玩生!存!乐!事! 更多结构, 更多冒险, 更多社交, 还有更多品类的菜品等你发现! 要养老, 就来生存乐事!",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
  {
    title: "天空厨房",
    intro: "天空从来不是极限, 美食也能到达更远的天际! 机械动力的轰鸣中, 农夫仍在天空享有自己的一片田园, 做出更多美食, 天空厨房cook in sky.",
    cover: "/images/index/cover_1.jpg",
    to: "/server",
  },
]

const currentIndex = ref(0)
const totalIndex = serverItems.length
let timer: number | null = null
const interval = 5000

const startAutoPlay = () => {
  stopAutoPlay()

  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % totalIndex
  }, interval)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const setIndex = (index: number) => {
  if (index >= 0 && index < totalIndex) {
    stopAutoPlay()
    currentIndex.value = index
    startAutoPlay()
  }
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<template>
  <BaseSection classname="server-container">
    <div class="server">
      <div
        v-for="(item, index) in serverItems"
        :key="index"
        class="server-card"
        :class="{ shown: index === currentIndex }"
        :style="{
          backgroundImage: `url(${item.cover})`,
        }"
      >
        <div class="text">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="intro">
            {{ item.intro }}
          </div>
          <a
            :href="item.to"
            class="button"
          >
            <span>
              详细介绍
              <i class="fa-solid fa-arrow-right" />
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="line-container">
      <div
        v-for="index in totalIndex"
        :key="index"
        class="line"
        :class="{ active: currentIndex === index - 1 }"
        @click="setIndex(index - 1)"
      />
    </div>
  </BaseSection>
</template>

<style scoped>
.server-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.server {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.server-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0;
  transition: opacity 2s ease;

  & .text {
    position: absolute;
    right: var(--padding-y);
    bottom: var(--padding-y);
    width: 30%;
    padding: var(--padding-y) var(--padding-y);
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: var(--border-radius);
    background-color: var(--bg-cover);

    & .title {
      text-align: right;
      font-size: var(--title-size);
      font-weight: bold;
      color: var(--text-light);
    }

    & .intro {
      text-indent: 2em;
      overflow-wrap: anywhere;
    }

    & .button {
      width: 50%;
      margin-left: auto;
      transform: skew(-20deg);
      border: 1px solid var(--text-light);
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: all 0.3s ease;

      & span {
        transform: skew(20deg);
        color: var(--text-light);
      }

      &:hover {
        transform: scale(1.1) skew(-20deg);
      }
    }
  }

  &.shown {
    opacity: 1;
  }
}

.line-container {
  width: 100%;
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  gap: 0.5rem;

  & .line {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--text);
    cursor: pointer;
    transition: background 0.3s ease;

    &.active {
      background: var(--text-light);
    }
  }
}

@media (max-width: 1024px) {
  .server-card .text {
    width: 50%;
  }
}

@media (max-width: 640px) {
  .server-card .text {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    border-radius: 0;

    & .intro {
      font-size: 0.75rem;
    }

    & .button {
      width: 75%;
    }
  }
}

@media (max-width: 420px) {
  .server-card .text {
    width: 75%;

    & .button span {
      font-size: 0.75rem;
    }
  }

  .line-container {
    padding-top: 0.5rem;
    gap: 0.25rem;
  }
}
</style>
