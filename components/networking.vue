<template>
  <v-card id="networkingTable">
    <v-data-iterator
      :items="items"
      :search="search"
      :sort-desc="sort === 'desc'"
      sort-by="date"
      class="px-5"
    >
      <template v-slot:header>
        <v-card-title class="d-flex align-center flex-lg-nowrap">
          <v-text-field
            v-model="search"
            clearable
            prepend-inner-icon="search"
            label="Search"
            class="mr-2"
          ></v-text-field>
          <v-select
            v-model="filters"
            :items="filterValues"
            class="mx-2 news-select"
            label="Filter By"
            multiple
            attach
          ></v-select>
          <v-select
            v-model="sort"
            :items="sortValues"
            class="mx-2"
            label="Sort By"
          ></v-select>
        </v-card-title>
      </template>
      <template v-slot:default="props">
        <v-card-text>
      
          <v-row style="height: 575px; overflow-y: scroll;">
            <template v-for="item in props.items">
              <v-col :key="item.name" cols="6">
                <v-card style="height: 100%" elevation="1">
                  <v-card-title>
                    <v-row>
                      <v-col cols="12" md="9">{{ item.title }}</v-col>
                      <v-col cols="12" md="3" class="text-center px-0">
                        <v-chip small color="blue" dark class="overline">
                          {{ item.status }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <div class="justify-center text-center bold orange--text">
                    <b>{{ item.dateRange }}</b>
                  </div>

                  <v-card-text
                    v-if="item.description"
                    class="d-flex flex-wrap justify-space-between"
                    v-html="item.description"
                  />
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      filters: ["member", "other"],
      search: "",
      sort: "desc",
      filterValues: [
        {
          text: "Events with involvements of Lab members",
          value: "member",
        },
        {
          text: "Other events of interest",
          value: "other",
        },
      ],
      sortValues: [
        {
          text: "Latest",
          value: "asc",
        },
        {
          text: "Oldest",
          value: "desc",
        },
      ],
    };
  },
  computed: {
    items: {
      get() {
        return this.$store.state.data.news
          .filter((item) => this.filters.includes(item.type))
          .map((item) => ({
            ...item,
            status: this.$store.getters.getDateStatus(item.endDate ?? item.date),
            dateRange: this.$store.getters.formatDateRange(
              item.date,
              item.endDate
            ),
          }));
      },
    },
  },
  methods: {},
};
</script>

<style></style>
