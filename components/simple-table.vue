<template>
  <v-simple-table fixed-header height="600px" class="pa-0 px-0">
    <template v-slot:default>
      <thead class="py-0">
        <tr class="px-0 py-0">
          <th
            class="px-0 text-left"
            v-for="(col, index) in settings.columns"
            :key="'col-' + $store.getters.parseKey(col)"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(each, index) in settings.data" :key="index">
          <td
            v-for="(row, index) in each"
            :key="'row-' + $store.getters.parseKey(row)"
          >
            {{ row }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: ["settings"],
};
</script>

<style></style>
