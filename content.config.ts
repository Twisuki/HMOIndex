import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    dynamic: defineCollection({
      type: "page",
      source: "dynamic/*.md",
      schema: z.object({
        date: z.string().describe("动态发布日期"),
        index: z.number().describe("同日序号"),
        cover: z.string().describe("封面url"),
        authors: z.array(z.string()).describe("作者"),
      }),
    }),
    server: defineCollection({
      type: "page",
      source: "server/*.md",
      schema: z.object({
        name: z.string().describe("服务器代号"),
        intro: z.string().describe("服务器简介(艺术向)"),
        cover: z.string().describe("封面url"),
        date: z.string().describe("开服日期"),
        map: z.string().nullable().describe("网页地图url"),
        index: z.number().describe("序号"),
        ip: z.string().describe("服务器地址"),
      }),
    }),
    serverCover: defineCollection({
      type: "data",
      source: "cover.md",
      schema: z.object({
        cover: z.array(z.object({
          url: z.string().describe("封面url"),
          server: z.string().describe("所属服务器"),
          description: z.string().describe("封面描述(位置等)"),
        })).describe("服务器封面图集"),
      }),
    }),
  },
})
