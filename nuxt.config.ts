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
  routeRules: {
    "/api/**": { ssr: true },
    "/**": { prerender: true },
  },
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: false,
    },
  },
  hooks: defaultCoverHooks,
})
