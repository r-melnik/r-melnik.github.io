import pages from "./static/data/pages.json";
import books from "./static/data/books.json";
import proceedings from "./static/data/proceedings.json";
import journals from "./static/data/journals.json";
import projects from "./static/data/projects.json";
const getLinks = async () => {
  var links = [];
  Object.keys(pages).forEach(key => {
    if (!key.match(/\[[^\]]*\]/g)) {
      links.push(key);
    }
  });
  [
    ...books,
    ...proceedings,
    ...journals,
  ].forEach(publication => {
    links.push('/research/publications/' + publication.shortcode)
  })
  projects.forEach(project => {
    links.push('/research/projects/' + project.id)
    if (project && project.subprojects) {
      project.subprojects.forEach(subproject => {
        links.push('/research/projects/' + project.id + '/' + subproject.id)
      })
    }
  })
  return links;
}
export default {
  ssr: false,
  target: "static",
  /*
   ** Headers of the page
   */
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  head: {
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "pragma", content: "no-cache" },
      { "http-equiv": "cache-control", content: "no-cache" },
      { "http-equiv": "expires", content: "0" },
      {
        hid: "robots",
        name: "robots",
        content: "all",
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      },

      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Architects+Daughter|PT+Serif&display=swap"
      },

      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Serif:400i&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.quilljs.com/1.3.6/quill.snow.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/global.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vueditor.js", mode: "client" }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "vue-scrollto/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/svg"
  ],
  sitemap: {
    hostname: "https://r-melnik.github.io",
    gzip: true,
    routes: getLinks
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: 'https://r-melnik.github.io/'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false
    }
  },
  router: {},
  server: {},
  generate: {
    async routes(callback) {
      const links = await getLinks()
      callback(null, links);
    }
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: false,
    extend(config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 500000;
      }
    }
  }
};
