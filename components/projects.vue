<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <div>
        <v-card
          v-for="(project, index) in projects"
          :class="index !== 0 ? 'py-10' : 'pb-10'"
          :key="`project-${index}-${project.id}`"
          flat
          tile
        >
          <v-container
            fluid
            class="d-flex blue darken-3 flex-wrap"
            :id="`project-${index}-${project.id}`"
          >
            <div class="px-1 my-auto">
              <v-avatar color="orange" class="ma-auto" size="42">
                <span class="white--text">P{{ project.id }}</span>
              </v-avatar>
            </div>
            <v-card-title
              class="white--text text-center"
              style="flex-grow: 1"
              >{{ project.title }}</v-card-title
            >

            <v-btn
              color="orange"
              class="white--text ma-auto"
              v-if="!active"
              small
              :to="`/research/projects/${project.id}`"
              >{{ settings.button }}</v-btn
            >
            <v-btn
              color="orange"
              class="white--text ma-auto"
              v-if="active"
              small
              :to="`/research/projects`"
              >{{ settings.button }}</v-btn
            >
          </v-container>
          <v-container fluid class="pa-0">
            <v-row no-gutters>
              <v-col cols="12" lg="10" class="white pa-0 d-flex">
                <v-container class="ma-auto">
                  <p class="ma-auto" v-if="!active">
                    {{ project.description }}
                  </p>
                  <div v-else-if="active" v-html="project.body"></div>
                  <div v-if="!active" class="py-5">
                    <v-list>
                      <v-list-item-group>
                        <v-card class="w-100" tile three-line>
                          <template
                            v-for="(subproject, index) in project.subprojects"
                          >
                            <a
                              class="link-killer"
                              :to="`/research/projects/${project.id}/${subproject.id}`"
                              ><v-list-item
                                :key="`subproject-list-${index}-${subproject.id}`"
                              >
                                <v-list-item-content class="pt-0">
                                  <div class="d-flex py-3">
                                    <div class="px-1">
                                      <v-avatar
                                        color="orange"
                                        size="32"
                                        class="ma-auto"
                                      >
                                        <span class="white--text caption"
                                          >P{{ project.id }}.{{
                                            subproject.id
                                          }}</span
                                        >
                                      </v-avatar>
                                    </div>
                                    <span class="black--text text-left px-2">{{
                                      subproject.title
                                    }}</span>
                                  </div>
                                </v-list-item-content>
                              </v-list-item>
                            </a>
                            <v-divider
                              v-if="index + 1 < project.subprojects.length"
                              :key="index"
                            ></v-divider>
                          </template>
                        </v-card>
                      </v-list-item-group>
                    </v-list>
                  </div>
                  <div v-else-if="active" class="py-5">
                    <v-expansion-panels :value="[open - 1]" multiple>
                      <template
                        v-for="(subproject, index) in project.subprojects"
                      >
                        <v-expansion-panel
                          :id="'sub-' + project.id + '-' + subproject.id"
                          :key="index"
                        >
                          <v-expansion-panel-header class>
                            <div class="d-flex">
                              <div class="px-1 ma-auto">
                                <v-avatar color="orange" size="32" class>
                                  <span class="white--text caption"
                                    >P{{ project.id }}.{{ subproject.id }}</span
                                  >
                                </v-avatar>
                              </div>
                              <div
                                class="black--text text-justify px-1 my-auto"
                                style="flex-grow: 1"
                              >
                                {{ subproject.title }}
                              </div>
                            </div>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <div class="d-flex flex-wrap flex-column">
                              <div
                                class="ql-editor"
                                v-html="subproject.body"
                              ></div>
                              <div
                                v-if="
                                  subproject.publications &&
                                  subproject.publications.length != 0
                                "
                              >
                                <v-card-text class="ma-0 pb-1 text-center">
                                  <b>{{ settings.references }}</b>
                                </v-card-text>
                                <v-card-text
                                  class="ma-0 pt-0 d-flex flex-wrap justify-content-around"
                                >
                                  <v-tooltip
                                    bottom
                                    v-for="(
                                      publication, i
                                    ) in subproject.publications"
                                    :key="i"
                                    max-width="350px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        target="_blank"
                                        :to="
                                          publication.shortcode
                                            ? `/research/publications/${publication.shortcode}`
                                            : `https://google.com/?q=${encodeUrl(
                                                publication.title
                                              )}`
                                        "
                                        color="dark"
                                        v-bind="attrs"
                                        v-on="on"
                                        class="ma-1"
                                        elevation="0"
                                        text
                                        >{{ publication.shortcode }}</v-btn
                                      >
                                    </template>
                                    <div class="d-flex flex-column">
                                      <span
                                        ><b>{{ settings.title }}</b
                                        >{{ publication.title }} </span
                                      ><span
                                        ><b>{{ settings.year }}</b
                                        >{{ publication.year }}</span
                                      ><span
                                        ><b>{{ settings.abstract }}</b
                                        >{{
                                          publication.abstract.split(".")[0] +
                                          "."
                                        }}
                                        <span class="caption">{{
                                          settings.more
                                        }}</span></span
                                      >
                                    </div>
                                  </v-tooltip>
                                </v-card-text>
                              </div>
                            </div>
                          </v-expansion-panel-content>

                          <v-divider />
                        </v-expansion-panel>
                      </template>
                    </v-expansion-panels>
                  </div>
                </v-container>
              </v-col>
              <v-col cols="12" lg="2" class="orange pa-0 d-block white--text" />
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ["projects", "active", "settings"],
  components: {},
  data() {
    return {
      open: undefined,
    };
  },
  mounted() {
    const subProjectId = this.$route.params.subProjectId;
    const projectId = this.$route.params.projectId;
    this.open = subProjectId;
    const elm = document.getElementById(`sub-${projectId}-${subProjectId}`);
    if (elm) {
      elm.scrollIntoView();
    }
  },
  updated() {
    const subProjectId = this.$route.params.subProjectId;
    const projectId = this.$route.params.projectId;
    this.open = subProjectId;

    const elm = document.getElementById(`sub-${projectId}-${subProjectId}`);

    if (elm) {
      elm.scrollIntoView();
    }
  },
};
</script>
