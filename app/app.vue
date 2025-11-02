<script setup lang="ts">
const title = "HMO-Minecraft岳麓幻境社"
const description = "这里是湖南大学校级社团Minecraft岳麓幻境社, 欢迎湖南高校学子共建的Minecraft高校圈! 本社下辖5大常驻服务器以及轮换整合包服务器, 满足各类高校Minecraft玩家的不同需要. 更有HUC高校起床战争系列赛, 百人社会模拟实验, 百团大战, 迎新茶话会等各类线上线下活动等你参与!"

useHead({
  link: [
    // Font Awesome CDN
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
      crossorigin: "anonymous",
    }],
})

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
