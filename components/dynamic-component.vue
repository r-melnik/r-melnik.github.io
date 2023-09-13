<template>
  <Members
    v-if="type === 'members'"
    :settings="settings"
    :members="$store.state.data.members"
  />
  <Alumni
    v-else-if="type === 'alumni'"
    :settings="settings"
    :alumni="$store.state.data.alumni"
  />
  <Gallery
    v-else-if="type === 'gallery'"
    :settings="settings"
    :gallery="$store.state.data.gallery"
  />
  <ToC
    v-else-if="type === 'toc'"
    :settings="settings"
    :components="$props.components"
  />
  <ProjectLinks v-else-if="type === 'project_links'" :settings="settings" />
  <Projects
    v-else-if="type === 'projects'"
    :projects="
      $route.params.projectId
        ? [projects.find((each) => String(each.id) === $route.params.projectId)]
        : projects
    "
    :settings="settings"
    :active="$route.params.projectId ? true : false"
  />
  <Publications
    v-else-if="type === 'publications'"
    :publication="$route.params.publicationId ?? ''"
    :settings="settings"
  />
  <FAQs v-else-if="type === 'faq'" :settings="settings" />
  <Networking v-else-if="type === 'networking'" :settings="settings" />
  <CountryLinks v-else-if="type === 'country-links'" :settings="settings" />
  <SimpleTable v-else-if="type === 'simple-table'" :settings="settings" />
  <Researchers v-else-if="type === 'researchers'" :settings="settings" />
</template>

<script>
import Members from "~/components/members.vue";
import Alumni from "~/components/alumni.vue";
import Gallery from "~/components/gallery.vue";
import ToC from "~/components/toc.vue";
import ProjectLinks from "~/components/project-links.vue";
import Projects from "~/components/projects.vue";
import Publications from "~/components/publications.vue";
import FAQs from "~/components/faqs.vue";
import Networking from "~/components/networking.vue";
import CountryLinks from "~/components/country-links.vue";
import SimpleTable from "~/components/simple-table.vue";
import Researchers from "~/components/researchers.vue";

export default {
  props: ["type", "settings", "components"],
  components: {
    Members,
    Alumni,
    Gallery,
    ToC,
    ProjectLinks,
    Projects,
    Publications,
    FAQs,
    Networking,
    CountryLinks,
    SimpleTable,
    Researchers,
  },
  data() {
    return {
      projects: this.$store.state.data.projects.map((project) => {
        const subprojects = project.subprojects.map((subproject) => {
          const publications = (subproject.publications ?? [])
            .map((publicationId) => {
              const journal = this.$store.state.data.journals.find(
                (publication) => publication.id === publicationId
              );
              if (journal) {
                return journal;
              }
              const proceeding = this.$store.state.data.proceedings.find(
                (publication) => publication.id === publicationId
              );
              if (proceeding) {
                return proceeding;
              }
              const book = this.$store.state.data.books.find(
                (publication) => publication.id === publicationId
              );
              if (book) {
                return book;
              }
            })
            .sort((a, b) => {
              if (parseInt(a.code) > parseInt(b.code)) {
                return 1;
              } else if (parseInt(a.code) < parseInt(b.code)) {
                return -1;
              } else {
                return 0;
              }
            });

          return {
            ...subproject,
            publications,
          };
        });
        return {
          ...project,
          subprojects,
        };
      }),
    };
  },
};
</script>

<style></style>
