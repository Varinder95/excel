export default {
  head: {
    title: "BootstrapVue Nuxt.js Frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    script: [
      {        
        src:"https://kit.fontawesome.com/34dc34f6fd.js",
        crossorigin:"anonymous"      
      },    
    ],
  },
  buildModules: [
    // https://go.nuxtjs.dev/apollo
    '@nuxtjs/apollo',
  ],
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/apollo
    '@nuxtjs/apollo',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://127.0.0.1:4000'
      }
    }
  },

  axios: {
    baseURL: 'http://127.0.0.1:8000',
    proxyHeaders: false,
    credentials: false
  }
};
