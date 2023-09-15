<template>
  <v-col cols="12" md="4" lg="3">
    <v-container fluid>
      <v-card flat>
        <v-text-field
          append-icon="search"
          v-model="search"
          filled
          flat
          class="pl-3"
          label="Search for events, projects, members, publications, keywords, etc."
        ></v-text-field>
        <v-card-title v-if="search && results.length === 0" class="pb-0">
          There are no suggestions for your query.
        </v-card-title>
        <v-sheet
          class="mx-auto side-list"
          v-else-if="search && results.length > 0"
          max-height="800"
          style="overflow-y: Scroll"
        >
          <v-list flat>
            <v-list-item-group color="indigo" v-for="each in results" :key="$store.getters.parseKey(each.title)">
              <v-list-item-title
                class="primary--text text--darken-3"
                v-if="each.values.length > 0"
              >
                <v-chip small>{{ each.title }}</v-chip></v-list-item-title
              >
              <template
                v-for="(value, index) in each.values"
                v-if="each.values.length > 0"
              >
                <v-list-item :href="value.item.path">
                  <v-list-item-content>
                    <v-list-item-title
                      class="primary--text text--darken-3"
                      v-html="value.item.title"
                      :title="value.item.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle v-html="value.item.subtitle">
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-html="value.item.description">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-sheet>
        <div v-else>
          <v-card-title class="py-0">
            What's On M3AI
            <sup>®</sup>
          </v-card-title>
          <v-sheet
            class="mx-auto side-list"
            max-height="300"
            style="overflow-y: Scroll"
          >
            <v-list flat>
              <v-list-item-group  color="indigo">
                <template v-for="(each, index) in $store.state.data.news">
                  <v-list-item href="/events/networking">
                    <v-list-item-content>
                      <v-list-item-title class="primary--text text--darken-3">{{
                        each.title
                      }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ each.datetime }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        each.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-sheet>
          <v-layout justify-space-between>
            <v-card-title class="pb-0">Lab Projects</v-card-title>
            <v-card-title class="d-flex justify-space-between pb-0">
              <v-icon @click="model--" class="mx-2" aria-label="Previous"
                >mdi-arrow-left</v-icon
              >

              <v-icon @click="model++" class="mx-3" aria-label="Next"
                >mdi-arrow-right</v-icon
              >
            </v-card-title>
          </v-layout>

          <v-sheet class="mx-auto" max-width="100%">
            <v-slide-group center-active mandatory v-model="model">
              <v-slide-item
                v-for="(each, index) in $store.state.data.projects"
                :key="`sidebar-project-${index}`"
                v-slot:default="{ active, toggle }"
              >
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-4 justify-center"
                  width="300"
                  @click="toggle"
                >
                  <div class="pa-5" v-if="each.img">
                    <v-card>
                      <v-img
                        class="white--text align-end d-flex project-front-image"
                        height="200px"
                        :src="each.img"
                      ></v-img>
                    </v-card>
                  </div>

                  <v-card-text class="text--primary">
                    <div class="d-flex">
                      <h4 class="mx-auto pb-2 white--text">{{ each.title }}</h4>
                    </div>
                    <div class="white--text text--lighten-2">
                      <p>{{ each.description }}</p>
                    </div>
                  </v-card-text>
                  <v-scale-transition>
                    <v-btn
                      v-if="active && each.id"
                      class="learnMoreProjectButton mx-10"
                      outlined
                      color="white"
                      small
                      :to="`/research/projects/${each.id}`"
                      >Read Project</v-btn
                    >
                  </v-scale-transition>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </v-card>
    </v-container>
  </v-col>
</template>
<script>
import Fuse from "fuse.js";
export default {
  data() {
    return {
      model: 0,
      search: "",
    };
  },
  computed: {
    results: {
      get() {
        const options = {
          keys: ["title", "subtitle", "description"],
          threshold:0.5
        };
        const publications = new Fuse(
          this.$store.state.data.publications.map((publication) => ({
            ...publication,
            title: publication.title,
            subtitle: publication.type + " " + publication.shortcode,
            description: publication.authors,
            path: `/research/publications/${publication.shortcode}`,
          })),
          options
        );
        const members = new Fuse(
          this.$store.state.data.members.map((member) => ({
            ...member,
            title: `${member.first_name} ${member.last_name}`,
            subtitle: member.bio,
            img: member.img,
            path: "/about/team",
          })),
          options
        );
        const events = new Fuse(
          this.$store.state.data.news.map((event) => ({
            ...event,
            subtitle: event.datetime,
            path: "/events/networking",
          })),
          options
        );
        const projects = new Fuse(
          this.$store.state.data.projects.map((project) => ({
            ...project,
            title: project.title,
            subtitle: project.description,
            img: project.img,
            description: undefined,
            path: `/research/projects/${project.id}`,
          })),
          options
        );
        const alumni = new Fuse(
          this.$store.state.data.alumni.map((alumn) => ({
            ...alumn,
            title: `${alumn.first_name} ${alumn.last_name}`,
            subtitle: alumn.affiliation,
            description: alumn.bio,
            path: "/about/team",
          })),
          options
        );
        const researchers = new Fuse(
          this.$store.state.data.researchers.map((researcher) => ({
            ...researcher,
            title: `${researcher.first_name} ${researcher.last_name}`,
            subtitle: researcher.bio,
            path: "/links/researchers",
          })),
          options
        );
        const pages = new Fuse(
          Object.keys(this.$store.state.data.pages)
            .filter((one) => !one.match(/\[[^\]]*\]/g))
            .map((key) => ({
              ...this.$store.state.data.pages[key],
              path: key,
              title: this.$store.state.data.pages[key].name,
              subtitle: this.$store.state.data.pages[key].seo.description,
            })),
          options
        );
        const data = [
          {
            title: "Pages",
            values: pages.search(this.search).slice(0, 5),
          },
          {
            title: "Publications",
            values: publications.search(this.search).slice(0, 5),
          },
          {
            title: "Members",
            values: members.search(this.search).slice(0, 5),
          },
          {
            title: "Events",
            values: events.search(this.search).slice(0, 5),
          },
          {
            title: "Projects",
            values: projects.search(this.search).slice(0, 5),
          },
          {
            title: "Alumni",
            values: alumni.search(this.search).slice(0, 5),
          },
          {
            title: "Researchers",
            values: researchers.search(this.search).slice(0, 5),
          },
        ];
        return data;
      },
    },
  },
};
</script>
