// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt/config';
export default {
// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4493633870090510"
//         crossorigin="anonymous"></script>
  head: {
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-4493633870090510',
        async: true
      }
    ]
  },
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