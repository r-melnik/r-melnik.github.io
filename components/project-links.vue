<template>
  <v-list class="py-0">
    <v-list-item-group >
      <v-card class="w-100" tile three-line flat>
        <template v-for="(each, index) in $store.state.data.projects">
          <v-list-item :key="$store.getters.parseKey(each.title) + index" :to="`/research/projects/${each.pIndex}`">
            <v-list-item-content class="pt-0">
              <div class="d-flex py-3">
                <div class="px-1">
                  <v-avatar color="orange" size="32" class="ma-auto">
                    <span class="white--text caption">P{{ each.pIndex }}</span>
                  </v-avatar>
                </div>
                <span class="black--text text-left px-2 my-auto">{{
                  each.title
                }}</span>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index + 1 < $store.state.data.projects.length"
            :key="index"
          ></v-divider>
        </template>
      </v-card>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: [],
};
</script>

<style></style>
