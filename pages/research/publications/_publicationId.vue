<template>
  <GenericPage
    path="/research/publications"
    subPath="/research/publications/[publicationId]"
  />
</template>
<script>
import GenericPage from "~/components/generic-page.vue";
export default {
  components: {
    GenericPage,
  },
  head() {
    return this.$store.getters.getPublicationSEO(
      parseInt(this.$route.params.publicationId)
    );
  },
};
</script>
