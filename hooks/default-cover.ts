import type { FileAfterParseHook } from "@nuxt/content"

const FALLBACK_COVER = "/images/cover.webp"

/**
 * @description 在文件解析后检查封面字段, 若为空, 则设置默认值
 */
export default {
  "content:file:afterParse": (ctx: FileAfterParseHook) => {
    if (ctx.collection.name !== "dynamic" && ctx.collection.name !== "server") {
      return
    }
    const cover = ctx.content.cover
    if (typeof cover !== "string" || cover.trim() === "") {
      ctx.content.cover = FALLBACK_COVER
    }
  },
}
