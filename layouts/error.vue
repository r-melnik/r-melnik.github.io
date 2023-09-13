<template>
  <GenericPage v-if="path" :path="path" />
  <div v-else>
    <h1>404</h1>
    <p>The page you requested could not be found.</p>
    <center><a href="/"> Go Back Home </a></center>
  </div>
</template>

<script>
import GenericPage from "~/components/generic-page.vue";

export default {
  layout: "error",
  components: {
    GenericPage,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
      path: this.$store.state.data.pages[this.$route.path]
        ? this.$route.path
        : undefined,
    };
  },
  created() {},
  mounted() {},
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;

    return {
      title,
    };
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,300,500);

.button {
  font-weight: 300;
  color: #fff;
  font-size: 1.2em;
  text-decoration: none;
  border: 1px solid #efefef;
  padding: 0.5em;
  border-radius: 3px;
  float: left;
  margin: 6em 0 0 -155px;
  left: 50%;
  position: relative;
  transition: all 0.3s linear;
}

.button:hover {
  background-color: #007aff;
  color: #fff;
}

p {
  font-size: 2em;
  text-align: center;
  font-weight: 100;
}

h1 {
  text-align: center;
  font-size: 15em;
  font-weight: 100;
}
</style>
