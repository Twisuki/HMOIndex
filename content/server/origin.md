---
name: "origin"
title: "起源服"
intro: "以生电, 建造玩法为核心, 生电佬交流中心, 社团重要线上活动举办地, 社团早期文化遗产圣地, 现已进入老年期."
description: "湖大起源服是由 Minecraft 岳麓幻境社开设的 Purpur 端类原版 Minecraft 服务器, 主要玩法为生存与建筑, 服务端版本 1.21.1."
cover: "/content/server/cover_origin.webp"
date: "2025-02-06"
map: "a.hmomc.cn:25570"
index: 1
address: 
  - "a.origin.hmomc.cn"
  - "b.origin.hmomc.cn"
---

## 新人须知

湖大起源服是由 Minecraft 岳麓幻境社开设的 `Purpur` 端类原版 Minecraft 服务器, 主要玩法为 **生存与建筑**, 服务端版本 `1.21.1`.

我们欢迎大家互相帮助, 交流与讨论.

## 服务器规则

## 入服指南

> **征集报错信息**
>
> 如果你在加入服务器过程中遇到了错误, 欢迎在群里发送截图, 崩溃报告等, 我们会维护一个服务器连接故障修复参考文档.

1. 客户端: Java `1.21` 与 `1.21.1` 版本均可, 无指定模组需求.
2. 登录方式: 仅支持正版验证, 请使用正版账号登录启动客户端.
3. 加入服务器: 服务器地址详见内部文档.

网页地图: [mc.hmomc.cn:25570](https://mc.hmomc.cn:25570)

> **遇到故障?**
>
> 如果你遇到无法连接服务器, 卡顿, 掉线, 打不开网页地图的情况, 可以参考这篇文档尝试解决. 如果仍为解决, 欢迎到群里提问.

## 服务器设置

- 跳过夜晚仅需一人睡觉
- 难度: 困难
- 保留物品栏: 不开启
- 生物破坏: 开启
- 种子: 5076036733988069176

## 服务端插件说明

### 插件列表

```
Purpur 插件：
bluemap-5.7-spigot // 网页地图
CommandAPI-10.0.1 // 印象里好像是假人的前置
CoreProtect-CE-23.0-RC1b // 记录发生的事情（？
EssentialsX-2.21.0 // 实用命令
fakeplayer-0.3.13 // 假人
GSit-2.2.1 // 动作
LuckPerms-Bukkit-5.4.145 // 权限管理
minimotd-bukkit-2.1.3 // 自定义 MOTD
spark-1.10.119-bukkit // 分析性能
tabtps-spigot-1.3.25 // 监测性能
voicechat-bukkit-2.5.26 // 语音聊天

MCDR 插件：
PrimeBackup-v1.9.5 // 备份
```

### EssentialsX 实用命令

| 指令              | 说明                        |
| ----------------- | --------------------------- |
| /back             | 传送你至先前的位置.         |
| /home [名称]      | 传送到家的位置              |
| /sethome [名称]   | 设置家(注意, 家数量最大为5) |
| /delhome [名称]   | 删除家                      |
| /warp [名称]      | 传送到地标                  |
| /tpa [player]     | 请求传送到玩家              |
| /tpahere [player] | 请求玩家传送到你            |
| /tpaccept         | 接受传送请求                |
| /tpdeny           | 拒绝传送请求                |

### fakeplayer 假人

用法详见 [Modrinth](https://modrinth.com/plugin/fakeplayer).

给到的权限节点:

```
fakeplayer.spawn
fakeplayer.tp
fakeplayer.action
```

每个玩家能创建两个假人, 不跟随下线.

### PrimeBackup 备份

每4小时备份一次, 每3小时尝试进行一次清理.

### GSit 动作

- `/sit` 坐下, `/crawl` 爬行.
- 右键楼梯, 台阶等方块可以坐在上面.
- 右键其他玩家可以跳上并骑乘其他玩家.

### TabTPS 监测性能

`/tabtps toggle [三种可选模式]` 监测TPS, MSPT等.

`/tabtps:mspt` 查看服务器刻信息. 如果提示没有权限: 恭喜你, 那就是我忘了开, 可以群里提醒一下.

## 数据包说明

### Safe Creeper 苦力怕防爆地形

苦力怕, 闪电苦力怕爆炸将 **不会破坏地形**, 爆炸伤害不变.

## 最后

关于文档的任何问题, 欢迎在群中反馈.
