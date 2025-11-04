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
    color: "#5c77ff",
  },
  {
    label: "社团动态",
    to: "/dynamic",
    color: "#5cb3ff",
  },
  {
    label: "直播间",
    to: "https://live.bilibili.com/1805408278",
    color: "#5cdfff",
  },
  {
    label: "加入我们",
    to: "",
    color: "#58f4e2",
  },
]
</script>

<template>
  <BaseSection
    :scroll="0.75"
    classname="intro-container"
    card
  >
    <template #default="{ scrolled }">
      <div class="intro">
        <div class="text">
          <p>
            这里是湖南大学校级社团Minecraft岳麓幻境社, 欢迎湖南高校学子共建的Minecraft高校圈!
          </p>
          <p>
            本社下辖5大常驻服务器以及轮换整合包服务器, 满足各类高校Minecraft玩家的不同需要.
          </p>
          <p>
            更有HUC高校起床战争系列赛, 百人社会模拟实验, 百团大战, 迎新茶话会等各类线上线下活动等你参与!
          </p>
        </div>

        <div class="button">
          <a
            v-for="(item, index) in buttonItems"
            :key="index"
            :href="item.to"
            class="button-item"
            :class="{ scrolled }"
            :style="{
              backgroundColor: item.color,
            }"
          >
            <span>{{ item.label }}</span>
          </a>
        </div>
      </div>
    </template>
  </BaseSection>
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
  margin-top: 1rem;
}

.text {
  text-align: center;
  font-size: var(--font-size);
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
  font-size: var(--font-size);
  padding: var(--padding-y) 0;
  transform: skew(-20deg) translateY(50%);
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

  &:hover {
    transform: skew(-20deg) translateY(-4px);
  }
}

@media (max-width: 768px) {
  .button {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
