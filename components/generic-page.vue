<template>
  <div class="px-2 py-0 w-100">
    <v-tabs :value="data.active_index" center-active centered>
      <nuxt-link
        class="link-killer my-auto"
        v-for="(item, index) in data.parent.routes"
        :key="index"
        :to="item.path"
      >
        <v-tab>
          <span class="text-left w-100">{{ item.title }}</span>
        </v-tab>
      </nuxt-link>
    </v-tabs>
    <CMP :page="data.page" />
  </div>
</template>
<script>
import CMP from "~/components/component-array.vue";
const PATH = "/about/introduction";
export default {
  props: ["path", "subPath"],
  components: {
    CMP,
  },
  computed: {
    data: {
      get() {
        const path = this.$props.path ?? this.$route.path;
        const subPath = this.$props.subPath;
        return this.$store.getters.getPage(path, subPath);
      },
    },
  },
  head() {
    const path = this.$props.path ?? this.$route.path;
    const subPath = this.$props.subPath;
    if (subPath) {
      return undefined;
    }
    return this.$store.getters.getPage(path, subPath).seo;
  },
};
</script>
