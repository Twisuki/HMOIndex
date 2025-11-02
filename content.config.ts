import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    dynamic: defineCollection({
      type: "page",
      source: "dynamic/*.md",
      schema: z.object({
        date: z.string(),
        cover: z.string(),
        author: z.string(),
      }),
    }),
  },
})
