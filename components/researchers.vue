<template>
  <v-card  class="pa-2">
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search for Names and Affiliations"
      class="mx-2 mt-auto flex-1"
      hide-details=""
    ></v-text-field>
    <v-data-table
      fixed-header
      height="575px"
      class="pa-0 px-0"
      :items="$store.state.data.researchers"
      :headers="settings.columns"
      :search="search"
    >
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["settings"],
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style></style>
