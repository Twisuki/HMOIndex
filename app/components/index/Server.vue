<script setup lang="ts">
import cover1 from "~/assets/images/index/cover_1.jpg"

interface ServerCard {
  title: string
  intro: string
  cover: string
  to: string
}

const serverItems: ServerCard[] = [
  {
    title: "起源服",
    intro: "社团的第一个服务器, 主要玩法为生存与建筑.",
    cover: cover1,
    to: "/server",
  },
  {
    title: "古典服",
    intro: "当现代文明的辉煌隐去，古典的回声响彻耳畔，ban生电和高频红石之后，玩家们又将何去何从，远古的大陆上最早的文明走出了新的乐章。",
    cover: cover1,
    to: "/server",
  },
]
</script>

<template>
  <IndexSection
    classname="server-container"
    card
  >
    <BaseCarousel
      :interval="5000"
      classname="server-carousel"
    >
      <div
        v-for="(item, index) in serverItems"
        :key="index"
        class="server-card"
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
    </BaseCarousel>
  </IndexSection>
</template>

<style scoped>
.server-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.server-carousel {
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
}

.server-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

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

    .intro {
      font-size: 0.75rem;
    }

    .button {
      width: 75%;
    }
  }
}

@media (max-width: 420px) {
  .server-card .text {
    width: 75%;

    .button span {
      font-size: 0.75rem;
    }
  }
}
</style>
