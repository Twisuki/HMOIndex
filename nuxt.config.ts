// https://nuxt.com/docs/api/configuration/nuxt-config
import defaultCoverHooks from "./hooks/default-cover"

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/eslint-config",
    "@nuxt/content",
  ],
  ssr: true,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  hooks: defaultCoverHooks,
})
