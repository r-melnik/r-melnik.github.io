<template>
  <v-app v-if="$store.state.isReady">
    <v-app-bar
      app
      dark
      flat
      prominent
      color="#1565C0"
      src="/header.jpg"
      fade-img-on-scroll
      absolute
      scroll-threshold="500"
      height="206"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(21,101,192,0.32), rgba(255,255,255,0.2)"
          class="top-image"
        ></v-img>
      </template>

      <v-layout
        class="flex-row flex-grow-max px-5 justify-space-between white--text darken--3"
        style="
          justify-content: space-between;
          background-color: rgb(21, 101, 192);
        "
      >
        <v-btn
          class="d-md-none d-flex my-2 mx-2"
          color="primary"
          @click.stop="drawer = !drawer"
          >{{ $store.state.data.layout.header.mobile.menu_open }}</v-btn
        >

        <div
          class="font-weight-light caption d-none-xs white--text"
          style="line-height: 1.8rem"
        >
          <span
            class="tracking-in-contract-bck-top spaced-out-font white--text"
          >
            {{ $store.state.data.layout.header.quote.natura }}
          </span>
          <span
            style="vertical-align: text-bottom; font-weight: bold"
            class="tracking-in-contract-bck-top-sl curvy-font white--text"
          >
            {{ $store.state.data.layout.header.quote.explore }}
          </span>
          <span
            style="font-weight: bold"
            class="tracking-in-contract-bck-top-sl2 curvy-font white--text"
          >
            {{ $store.state.data.layout.header.quote.dream }}
          </span>
          <span
            class="tracking-in-contract-bck-top-sl3 curvy-font white--text"
            style="vertical-align: text-top; font-weight: bold"
          >
            {{ $store.state.data.layout.header.quote.discover }}
          </span>
        </div>

        <v-btn text class="caption">{{
          new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}</v-btn>
      </v-layout>
      <v-layout class="mt-auto justify-content-around flex-row flex-grow-max">
        <v-toolbar-title class="text-wrap px-0 text-center">
          <span
            class="main-title"
            style="text-shadow: 0 0 9px black"
            v-html="$store.state.data.layout.header.title"
          ></span>

          <br />
          <span
            class="body-1"
            style="text-shadow: 0 0 9px black"
            v-html="$store.state.data.layout.header.subtitle"
          >
          </span>
        </v-toolbar-title>
        <v-toolbar-title class="text-wrap d-none d-md-flex">
          <v-tabs
            center-active
            centered
            background-color="transparent"
            grow
            v-model="active_nav"
          >
            <v-tab
              v-for="(item, index) in $store.state.data.menu"
              :key="index"
              class="px-0"
            >
              <v-menu open-on-hover offset-y bottom>
                <template v-slot:activator="{ on }">
                  <nuxt-link :to="item.path" class="link-killer nav-icon-soft">
                    <span v-on="on" class="link-killer nav-icon-soft px-3">
                      <p class="nav-text">{{ item.title }}</p>
                    </span>
                  </nuxt-link>
                </template>
                <v-list v-if="item.routes" class="top-10" id="xxx">
                  <template v-for="(child, ix) in item.routes">
                    <v-list-item :key="ix" :to="child.path">
                      <v-list-item-title>{{ child.title }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-tab>
          </v-tabs>
        </v-toolbar-title>
      </v-layout>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click.stop="drawer = !drawer">{{
            $store.state.data.layout.header.mobile.menu_close
          }}</v-btn>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(item, index) in $store.state.data.menu"
          :key="'mobile-' + index"
          link
        >
          <v-menu open-on-hover offset-x left>
            <template v-slot:activator="{ on }">
              <nuxt-link :to="item.path" class="link-killer nav-icon-soft">
                <span v-on="on" class="link-killer nav-icon-soft px-4">
                  <p class="nav-text">{{ item.title }}</p>
                </span>
              </nuxt-link>
            </template>
            <v-list v-if="item.routes" class="top-10" id="xxx">
              <template v-for="(child, ix) in item.routes">
                <v-list-item :key="ix" :to="child.path">
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container
        fluid
        class="py-0 divider-ce d-flex"
        style="background-color: rgb(21, 101, 192)"
      >
        <v-container fluid class="py-0 text-white my-auto">{{
          $store.state.data.layout.header.banner
        }}</v-container>
      </v-container>
      <v-app>
        <v-container fluid class="lighten-5 text-justify break-word">
          <v-row class="mb-6" no-gutters>
            <v-col cols="12" md="8" lg="9">
              <nuxt />
            </v-col>
            <sidebar />
          </v-row>
        </v-container>
      </v-app>
    </v-main>
    <v-footer padless>
      <v-card
        color="#0D47A1"
        flat
        tile
        class="text-center py-3 pt-5 bottomFootQ"
        width="100%"
        fluid
      >
        <v-container
          class="py-0 px-0 text--white"
          style="position: relative; min-height: 400px"
          fluid
        >
          <img
            src="/footer-bg.png"
            style="
              opacity: 0.15;
              position: absolute;
              left: 50%;
              transform: translate(-50%, 0);
              top: 0;
            "
            class="bottom-img"
            alt="Footer Image Of M3AI - Brain"
          />

          <v-container class="pb-0" fluid>
            <v-timeline class="d-none d-md-block">
              <v-timeline-item
                small
                color="orange"
                v-for="quote in $store.state.data.layout.footer.quotes"
                :key="$store.getters.parseKey(quote.text)"
              >
                <template v-slot:opposite>
                  <span class="headline font-weight-bold orange--text">{{
                    quote.year
                  }}</span>
                </template>
                <v-card color="transparent" class="py-3 px-3 grey lighten-3">
                  <blockquote
                    class="curvy-font"
                    style="font-size: 1.1rem; font-weight: bold; padding: 15px"
                  >
                    {{ quote.text }}
                  </blockquote>
                  <blockquote
                    class="text-right px-3 curvy-font font-weight-bold"
                  >
                    {{ quote.author }}
                  </blockquote>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <v-timeline class="d-md-none" dense>
              <v-timeline-item
                small
                color="amber"
                v-for="quote in $store.state.data.layout.footer.quotes"
                :key="$store.getters.parseKey(quote.text)"

              >
                <v-card color="transparent" class="py-3 px-3 grey lighten-3">
                  <blockquote
                    class="curvy-font"
                    style="font-size: 1.1rem; font-weight: bold; padding: 15px"
                  >
                    {{ quote.text }}
                  </blockquote>
                  <blockquote
                    class="text-right px-3 curvy-font font-weight-bold"
                  >
                    ({{ quote.author }}, {{ quote.year }})
                  </blockquote>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <v-col cols="12">
              <v-card class="white--text transparent" flat>
                <h4
                  class="d-inline white--text transparent"
                  v-html="$store.state.data.layout.footer.notice.text"
                ></h4>
                <v-chip
                  x-small
                  :to="$store.state.data.layout.footer.notice.button.link"
                  class="white--text primary"
                >
                  {{ $store.state.data.layout.footer.notice.button.text }}
                </v-chip>
              </v-card>
            </v-col>
          </v-container>
        </v-container>
        <v-card-text>
          <v-btn
            class="mx-4 white--text"
            icon
            :href="'mailto:' + $store.state.data.layout.footer.email"
            aria-label="Email Us"
          >
            <v-icon size="24px"> mdi-email </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text">
          Copyright © {{ new Date().getFullYear() }} —
          <span v-html="$store.state.data.layout.footer.disclaimer.text"></span>

          <v-dialog v-model="disclaimer" width="700">
            <template v-slot:activator="{ on, attrs }">
              <a
                v-bind="attrs"
                v-on="on"
                class="white--text text-decoration-underline"
                >{{ $store.state.data.layout.footer.disclaimer.button.text }}</a
              >
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                {{ $store.state.data.layout.footer.disclaimer.button.text }}
              </v-card-title>

              <v-card-text
                class="py-2 pt-4"
                v-html="
                  $store.state.data.layout.footer.disclaimer.button.content
                "
              >
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="disclaimer = false">
                  {{ $store.state.data.layout.footer.disclaimer.button.close }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog></v-card-text
        >
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import sidebar from "~/components/sidebar.vue";
import pages from "~/static/data/pages.json";
import menu from "~/static/data/menu.json";
import layout from "~/static/data/layout.json";
import journals from "~/static/data/journals.json";
import books from "~/static/data/books.json";
import proceedings from "~/static/data/proceedings.json";
import projects from "~/static/data/projects.json";
import members from "~/static/data/members.json";
import news from "~/static/data/news.json";
import gallery from "~/static/data/gallery.json";
import researchers from "~/static/data/researchers.json";
import authors from "~/static/data/authors.json";
import alumni from "~/static/data/alumni.json";
export default {
  components: {
    sidebar,
  },
  name: "layout",
  async beforeMount() {
    this.$store.commit("setData", {
      journals,
      researchers,
      projects,
      members,
      gallery,
      books,
      authors,
      alumni,
      proceedings,
      news,
      pages,
      menu,
      layout,
    });
    this.$store.dispatch("getData");
  },

  computed: {
    active_nav: {
      get() {
        return this.$store.state.data.menu.findIndex(
          (one, index) =>
            one.path === this.$route.path ||
            (one.routes &&
              one.routes.find((two, index) => two.path === this.$route.path)) ||
            (this.$route.path.includes(one.path) &&
              one.routes &&
              one.routes.find(
                (two, index) =>
                  this.$route.path.includes(two.path) ||
                  (two.children &&
                    two.children.find(
                      (child) => child.path === this.$route.path
                    ))
              ))
        );
      },
      set(value) {},
    },
  },
  data() {
    return {
      drawer: false,
      disclaimer: false,
    };
  },
};
</script>
