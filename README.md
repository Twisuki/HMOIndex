# HMOIndex - 湖南大学岳麓幻境社官网

## 1. 简介

这是 **湖南大学 HMO - Minecraft 岳麓幻境社** 的官方网站, 基于 `nuxt` 和 `nuxt-content` 搭建.

### 1.1 依赖列表

- dependencies
  - @nuxt/content: 3.8.0
  - @nuxt/eslint: 1.9.0
  - @nuxt/eslint-config: 1.9.0
  - @nuxtjs/color-mode: 3.5.2
  - @nuxtjs/mdc: 0.18.0
  - better-sqlite3: 12.4.1
  - eslint: 9.38.0
  - nuxt: 4.2.0
  - vue: 3.5.22
  - vue-router: 4.6.3

- devDependencies
  - @types/node: 24.9.1
  - eslint-plugin-format: 1.0.2
  - modern-css-reset: 1.4.0
  - typescript: 5.9.3

### 1.2 目录结构

```
[root]
├─ app                   # 应用目录
│  ├─ assets             # 资源目录(样式文件)
│  ├─ components         # 组件目录
│  ├─ layouts            # 布局目录
│  ├─ pages              # 页面目录
│  └─ app.vue
├─ content               # 内容目录 (存放 nuxt-content 的 md 文件)
├─ public                # 公共资源目录(静态资源)
├─ content.config.ts     # nuxt-content 配置文件
├─ eslint.config.mjs     # eslint 配置文件
├─ nuxt.config.ts        # nuxt 配置文件
└─ ...
```

## 2. 快速开始

本项目使用`node 22`, 请使用 `node -v` 确认你的版本.

1. 安装依赖

   ```bash
   $ pnpm install
   ```

2. 启动开发服务器

   ```bash
   $ pnpm dev
   ```

## 3. 开发规范

### 3.1 代码规范

本项目使用 `@nuxt/eslint`, `@nuxt/eslint-config` 和 `eslint-plugin-format` 进行代码规范检查.

请在提交代码之前运行 `pnpm lint` 进行代码格式化.

### 3.2 提交规范

本项目使用 [gitmoji](https://gitmoji.dev/) 作为提交规范, 请勿混用 cz.

## 4. 运维与配置

所有内容分发均在 `content` 目录下, 通过编辑 `md` 文件导入.

### 4.1 动态页面

"动态"位于 `content/dynamic` 目录下, 命名格式为 `yyyymmdd-[index].md`, 例如 `20251108-1.md`.

"动态"的 `front-matter` 配置如下:

```yaml
data: "发布日期"
index: "同日文章索引, 从1开始"
title: "标题"
description: "简介"
cover: "封面路径(相对于 public 目录, 以 /content/dynamic/ 开头)"
author: "作者"
```

_具体 front-matter 信息详见 `content.config.ts`._

动态图片统一放置在 `public/images/dynamic/` 目录下, 封面命名为 `cover_yyyymmddd-[index].[png\jpg]`, 其他图片命名为 `yyyymmdd-[index]_[name].[png/jpg]`.

### 4.2 服务器页面

"服务器"位于 `content/server` 目录下, 命名格式为 `[servername].md`, 例如 `origin.md`.

"服务器"的 `front-matter` 配置如下:

```yaml
name: "服务器代号"
title: "服务器名称"
intro: "服务器介绍"
description: "正式的服务器简介"
cover: "封面路径(相对于 public 目录, 以 /content/server/ 开头)"
date: "开服时间"
map: "网页地图网址"
ip: "服务器ip"
index: "展示顺序"
```

_具体 front-matter 信息详见 `content.config.ts`._

服务器图片统一放置在 `public/images/server/` 目录下, 封面命名为 `cover_[servername].[png/jpg]`, 其他图片命名为 `[servername]_[name].[png/jpg]`.

### 4.3 服务器封面图集

"服务器封面图集"的数据存储在 `content/cover.md` 文件中, 其 `front-matter` 配置如下:

```yaml
cover:
  - url: "封面路径(相对于 public 目录, 以 /content/cover/ 开头)"
    server: "服务器代号"
    description: "描述文本"
  - url: "封面路径(相对于 public 目录, 以 /content/cover/ 开头)"
    server: "服务器代号"
    description: "描述文本"
```

_具体 front-matter 信息详见 `content.config.ts`._

图集图片放在在 `public/content/cover/` 目录下, 命名格式为 `[servername]_[index].[png/jpg]`, 例如 `origin_1.jpg`, `classic_2.jpg`.
