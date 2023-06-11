// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  modules: [
    '@nuxtjs/tailwindcss',
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
}
