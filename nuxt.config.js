// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  },
})

// export default defineNuxtConfig({
//   modules: ['@pinia/nuxt']
// })