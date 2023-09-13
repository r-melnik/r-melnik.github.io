<template>
  <v-container fluid class="py-2 px-0">
    <v-row class="px-2 py-1">
      <v-col
        v-for="(component, index) in page.components"
        class="text-justify py-0"
        :cols="component.size || 12"
        :key="
          component.title ??
          `component-${index}-${Object.keys(component).length}`
        "
      >
        <GenericComponent :component="component" :page="page" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GenericComponent from "~/components/generic-component.vue";
export default {
  props: ["page"],
  components: {
    GenericComponent,
  },
};
</script>
