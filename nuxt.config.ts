// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/color-mode", "@nuxt/eslint", "@nuxt/eslint-config"],
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        // Font Awesome CDN
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
})
