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
        author: z.string().describe("作者"),
      }),
    }),
    server: defineCollection({
      type: "page",
      source: "server/*.md",
      schema: z.object({
        intro: z.string().describe("服务器简介(艺术向)"),
        cover: z.string().describe("封面url"),
        date: z.string().describe("开服日期"),
        map: z.string().nullable().describe("网页地图url"),
        index: z.number().describe("序号"),
      }),
    }),
  },
})
