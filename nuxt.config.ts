// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // css: ['@/assets/css/main.css'],
  hub: {
    blob: true,
    database: true,
  },
  nitro: {
    experimental: {
      tasks: true,
      websocket: true,
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthub/core',
    'nuxt-auth-utils',
    'nuxt-security',
    '@nuxt/test-utils/module'
  ]
})