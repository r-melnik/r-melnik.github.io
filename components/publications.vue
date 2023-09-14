<template>
  <v-card class="pt-3" id="publicationDataTable">
    <v-card-title class="justify-space-between pt-0 pb-2 px-1 d-flex">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search for Titles, Journals, Authors or Codes"
        class="mx-2 mt-auto flex-1"
        hide-details=""
      ></v-text-field>
      <v-select
        class="my-auto mx-2 mt-auto"
        :items="typeItems"
        attach
        multiple
        hide-details=""
        label="Filter Publications by Category"
        v-model="typeValue"
      ></v-select>
      <v-chip
        class="ma-2 ml-auto"
        color="primary"
        text-color="white"
        :href="settings.pdf_link"
      >
        {{ settings.pdf_button }}
        <v-icon right>mdi-file-pdf-box</v-icon>
      </v-chip>
    </v-card-title>
    <v-data-table
      :footer-props="{
        'items-per-page-options': [10, 20, 50, 100],
      }"
      height="575px"
      :search="search"
      :options.sync="options"
      show-expand
      mobile-breakpoint="1264"
      :headers="settings.columns"
      :items="publications"
      :expanded.sync="expanded"
      class="elevation-0"
      fixed-header
      item-key="shortcode"
      :custom-filter="exactSearchHandler"
    >
      <template v-slot:item.code="{ item }">
        {{ item.shortcode }}
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-between">
          <v-tooltip bottom v-if="item.doi || item.link">
            <template v-slot:activator="{ on }">
              <a
                v-on="on"
                target="_blank"
                class="link-killer ma-auto"
                :href="
                  item.doi
                    ? `https://doi.org/${item.doi}`
                    : item.link
                    ? `${item.link}`
                    : `https://google.com/search?q=${item.title}`
                "
              >
                <v-icon small class="mx-1" color="primary"
                  >mdi-arrow-right-bold</v-icon
                >
              </a>
            </template>
            <span>{{ settings.view_publication }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                v-if="item.pdf"
                v-on="on"
                target="_blank"
                class="link-killer ma-auto"
                :href="item.pdf"
              >
                <v-icon small class="mx-1" color="primary"
                  >mdi-file-pdf-box</v-icon
                >
              </a>
            </template>
            <span>{{ settings.view_pdf }}</span>
          </v-tooltip>
          <v-tooltip
            bottom
            v-if="
              item.extraInfo ||
              (!item.extraInfo &&
                !item.doi &&
                !item.pdf &&
                !item.isbn &&
                !item.link &&
                item.abstract)
            "
          >
            <template v-slot:activator="{ on }">
              <a
                v-on="on"
                @click="toggleItemExpand(item)"
                class="link-killer ma-auto"
              >
                <v-icon small class="mx-1" color="primary"
                  >mdi-information-outline</v-icon
                >
              </a>
            </template>
            <span>{{ settings.view_information }}</span>
          </v-tooltip>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="py-3 pt-10"
          v-if="item.abstract || item.extraInfo"
        >
          <div v-if="item.extraInfo">
            <h5>Additional Information:</h5>
            <div class="ql-editor pa-0 py-1" v-html="item.extraInfo"></div>
          </div>
          <v-divider class="py-2 mt-2" v-if="item.extraInfo && item.abstract" />
          <div v-if="item.abstract">
            <h5>Abstract:</h5>
            <p class="py-1 ma-0">{{ item.abstract }}</p>
          </div>
        </td>
        <td :colspan="headers.length" class="py-3 pt-5" v-else>
          <h5>This entery has no abstract.</h5>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["publication", "settings"],
  components: {},
  data() {
    return {
      open: undefined,
      typeItems: ["Journal", "Book/Editorial", "Proceeding"],
      typeValue: ["Journal", "Book/Editorial", "Proceeding"],
      search: this.$props.publication ?? "",
      expanded: [],
      options: {
        page: 1,
        itemsPerPage: 50,
        sortBy: ["year", "code"],
        sortDesc: [true, true],
        groupBy: [],
        groupDesc: [],
        mustSort: false,
        multiSort: false,
      },
    };
  },
  computed: {
    publications: {
      get() {
        return this.$store.state.data.publications.filter((item) => {
          if (this.typeValue.includes(item.type)) {
            return true;
          }
          return false;
        });
      },
    },
  },
  methods: {
    toggleItemExpand(item) {
      const expanded = this.$data.expanded ?? [];
      const isExpanded = expanded.find((i) => i.shortcode === item.shortcode);
      if (isExpanded) {
        this.$data.expanded = expanded.filter(
          (i) => i.shortcode !== item.shortcode
        );
      } else {
        this.$data.expanded.push(item);
      }
    },
    exactSearchHandler(value, search, item) {
      const isExact =
        search.includes("EB-") ||
        search.includes("EP-") ||
        search.includes("EJ-");
      if (value != null && search != null && typeof value === "string") {
        if (isExact && value.toLowerCase() === search.toLowerCase()) {
          return true;
        } else if (
          !isExact &&
          value.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      }
    },
  },
};
</script>
