<template>
  <GenericPage
    path="/research/projects"
    subPath="/research/projects/[projectId]"
  />
</template>
<script>
import GenericPage from "~/components/generic-page.vue";
export default {
  components: {
    GenericPage,
  },
  head() {
    return this.$store.getters.getProjectSEO(
      parseInt(this.$route.params.projectId)
    );
  },
};
</script>
