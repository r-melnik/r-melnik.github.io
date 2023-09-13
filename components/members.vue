<template>
  <v-row>
    <v-col v-for="(each, index) in members" :key="index" cols="12" lg="6">
      <v-card class="" elevation="0">
        <v-list-item class="pa-1 d-block d-md-flex">
          <v-list-item-avatar
            rounded
            color="grey"
            size="150"
            class="mb-auto memberBioPic"
          >
            <img v-if="each.img" :src="each.img" />
            <h2 v-else class="white--text ma-auto">M3AI<sup>®</sup></h2>
          </v-list-item-avatar>
          <v-list-item-content class="mb-auto">
            <h4>{{ each.first_name }} {{ each.last_name }}</h4>
            <v-list-item-subtitle>{{ each.affiliation }}</v-list-item-subtitle>
            <v-list-item-action-text>
              <div class="ql-editor px-0" v-html="each.bio"></div>
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["members"],
};
</script>

<style></style>
