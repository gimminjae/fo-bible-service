// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt/config';
export default {
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    // '@nuxtjs/proxy',
    // '@nuxtjs/axios'
  ],
  colorMode: {
    preference: 'dark', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  },
  devtools: { enabled: true },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.BO_GW_API_URL,
          changeOrigin: true,
        },
      },
    },
  },
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    "/api": process.env.BO_GW_API_URL,
    // "/api": {
    //   target: 'http://3.34.136.203:8080',
    //   path: {
    //     '^/api/': '/api/'
    //   },
    //   changeOrigin: true,
    // },
  }
}