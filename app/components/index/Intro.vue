<script setup lang="ts">
interface ButtonItem {
  label: string
  to: string
  color: string
}

const buttonItems: ButtonItem[] = [
  {
    label: "服务器介绍",
    to: "/server",
    color: "blue",
  },
  {
    label: "社团动态",
    to: "/dynamic",
    color: "blue",
  },
  {
    label: "直播间",
    to: "https://live.bilibili.com/1805408278",
    color: "blue",
  },
  {
    label: "加入我们",
    to: "",
    color: "blue",
  },
]
</script>

<template>
  <IndexSection
    :scroll="0.75"
    classname="intro-container"
    card
  >
    <template #default="{ scrolled }">
      <div class="intro">
        <div class="text">
          我们是 {{ scrolled }}
          <div>
            湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.湖南大学岳麓幻境社.
          </div>
        </div>

        <div class="button">
          <a
            v-for="(item, index) in buttonItems"
            :key="index"
            :href="item.to"
            class="button-item"
            :class="{ scrolled }"
          >
            <span>{{ item.label }}</span>
          </a>
        </div>
      </div>
    </template>
  </IndexSection>
</template>

<style scoped>
.intro-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.text {
  text-align: center;
}

.button {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: var(--padding-y) var(--padding-x);
}

.button-item {
  flex: 1;
  height: 3rem;
  transform: skew(-20deg) translateY(50%);
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  opacity: 0;
  transition: all 0.5s ease;

  & span {
    transform: skew(20deg);
    color: var(--text-light);
    font-weight: bold;
  }
}

.button-item.scrolled {
  transform: skew(-20deg) translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .button {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
