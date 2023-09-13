<template>
  <div>
    <ol>
      <a>
        <li class="mx-2" v-for="title in titles" v-scroll-to="`#${title.id}`">
          {{ title.text }}
        </li>
      </a>
    </ol>
    <div
      class="pt-8 pb-0"
      v-if="!($props.settings && $props.settings.disableDivider)"
    >
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: ["components", "settings"],
  data() {
    return {
      titles: this.$props.components
        .slice(
          this.$props.components.findIndex((each) => each.type === "toc") + 1
        )
        .filter((each) => each.title)
        .map((each) => ({
          id: this.$store.getters.parseKey(each.title),
          text: each.title,
        })),
    };
  },
};
</script>

<style></style>
