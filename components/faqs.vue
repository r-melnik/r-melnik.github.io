<template>
  <v-card-text class="py-4">
    <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in faqs" :key="i">
      <v-expansion-panel-header
        ><b>{{ item.title }}</b></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <span v-html="item.body"></span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card-text>
</template>

<script>
export default {
  props: ["settings"],
  data() {
    return {
      faqs: this.$props.settings.faqs,
    };
  },
};
</script>

<style></style>
