<template>
  <div class="d-flex flex-column py-3">
    <v-card min-width="444" max-width="444" class="mx-auto" flat>
      <v-carousel
        height="300"
        hide-delimiter-background
        :continuous="true"
        :cycle="true"
        v-model="slideshow"
        hide-delimiters
      >
        <template v-for="(each, index) in filteredGallery">
          <v-carousel-item
            :key="index"
            :src="each.link"
            class="member-slide-photo"
            @click="dialog = true"
          >
          </v-carousel-item>
        </template>
      </v-carousel>
    </v-card>
    <v-dialog v-model="dialog" height="95vh" width="95vw">
      <v-card min-height="95vh" width="95vw">
        <v-toolbar dark color="transparent" elevation="0">
          <v-layout justify-space-between class="black--text">
            <v-card-title class="d-flex justify-space-between pb-0">
              <v-icon
                @click="
                  slideshow - 1 == -1
                    ? (slideshow = filteredGallery.length - 1)
                    : slideshow--
                "
                class="mx-2 black--text"
                aria-label="Previous"
                >mdi-arrow-left</v-icon
              >

              <v-icon
                @click="
                  slideshow + 1 == filteredGallery.length
                    ? (slideshow = 0)
                    : slideshow++
                "
                class="mx-3 black--text"
                aria-label="Next"
                >mdi-arrow-right</v-icon
              >
            </v-card-title>
          </v-layout>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon color="black" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="d-flex flex-column pa-3" style="height: 100%">
          <img
            class="ma-auto"
            style="max-width: 100%"
            :src="
              filteredGallery && filteredGallery.length > 0
                ? filteredGallery[slideshow].link
                : ''
            "
            alt=""
          />

          <div
            style="height: 100%"
            v-html="
              filteredGallery && filteredGallery.length > 0
                ? filteredGallery[slideshow].description
                : ''
            "
            class="text-justify ma-auto pt-4"
          ></div>
        </div>
      </v-card>
    </v-dialog>
    <div
      v-html="
        filteredGallery && filteredGallery.length > 0
          ? filteredGallery[slideshow].description
          : ''
      "
      style="max-width: 400px"
      class="mx-auto pt-4 text-justify"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["gallery", "settings"],
  data() {
    return {
      dialog: false,
      slideshow: 0,
      filteredGallery: this.$props.gallery.filter(
        (each) => each.type === this.$props.settings.type
      ),
    };
  },
};
</script>

<style></style>
