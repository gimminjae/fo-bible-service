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
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy'
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
          target: 'http://3.39.187.103:8080',
          changeOrigin: true,
        },
      },
    },
  },
  axios: {
    proxy:true,
    proxyHeaders: false,
    credentials: false
  },
  proxy: {
    "/api": {
      target: 'http://3.39.187.103:8080',
      path: {
        '^/api/': '/api/'
      },
      changeOrigin: true
    }
    // },
  }
}