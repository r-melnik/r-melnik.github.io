<template>
  <v-card class="px-5 py-1 my-1" :elevation="component.elevation || 0">
    <div
      :id="
        component.title
          ? $store.getters.parseKey(component.title)
          : undefined
      "
    ></div>
    <v-card-title class="pa-0 break-word mt-1 d-inline" v-if="component.title" v-html="component.title" />
    <DynamicComponent
      v-if="component.type"
      :type="component.type"
      :settings="component.settings"
      :components="page.components"
    />
    <v-card-text
      class="pa-0 mt-4 mt-2 mb-2"
      v-if="component.html"
      v-html="component.html"
    />
    <v-card-text
      class="d-flex flex-wrap justify-space-around mt-2"
      v-if="component.buttons"
    >
      <v-btn
        v-for="button in component.buttons"
        color="blue"
        dark
        class="my-1 mx-1"
        :to="button.link"
        v-html="button.title"
        :key="$store.getters.parseKey(page.name+button.title)"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import DynamicComponent from "~/components/dynamic-component.vue";
export default {
  props: ["component", "page"],
  components: {
    DynamicComponent,
  },
};
</script>
