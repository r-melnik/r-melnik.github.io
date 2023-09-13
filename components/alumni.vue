<template>
  <v-simple-table fixed-header height="600px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" v-for="column in settings.columns">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template>
          <template v-for="(each, index) in alumni">
            <tr :key="index" v-if="each.year > settings.cutoff">
              <td>{{ each.first_name }} {{ each.last_name }}</td>
              <td>
                <div
                  class="ql-editor px-0 overflow-hidden"
                  v-html="each.bio"
                ></div>
              </td>
              <td>
                {{ each.affiliation }}
              </td>
            </tr>
          </template>
          <tr>
            <td class="text-center" colspan="3">
              <div class="py-5" v-html="settings.middle" />
            </td>
          </tr>
          <template v-for="(each, index) in alumni">
            <tr :key="index" v-if="each.year < settings.cutoff">
              <td>{{ each.first_name }} {{ each.last_name }}</td>
              <td>
                <div
                  class="ql-editor px-0 overflow-hidden"
                  v-html="each.bio"
                ></div>
              </td>
              <td>
                {{ each.affiliation }}
              </td>
            </tr>
          </template>
          <tr>
            <td class="text-center" colspan="3">
              <div class="py-5" v-html="settings.bottom" />
            </td>
          </tr>
        </template>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["alumni", "settings"],
};
</script>

<style></style>
