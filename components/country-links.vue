<template>
  <v-card-title class="text-center py-0">
    <span class="ma-auto" v-if="open == undefined">
      ||
      <span v-for="(item, index) in settings.countries">
        <a v-if="item.link" :href="item.link" target="_blank">{{
          item.title
        }}</a>
        <span v-else @click="open = index"
          ><a style="text-decoration: underline">{{ item.title }}</a></span
        >
        ||
      </span>
    </span>
    <span class="ma-auto" v-else>
      <v-icon @click="open = undefined">mdi-arrow-left-bold</v-icon>
      ||
      <span v-for="(item, index) in settings.countries[open].children">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
        ||
      </span>
    </span>
  </v-card-title>
</template>
<script>
export default {
  props: ["settings"],
  data() {
    return {
      open: undefined,
    };
  },
};
</script>

<style></style>
