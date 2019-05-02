<template>
  <v-content>
    <v-container text-xs-center grid-list-lg>
      <v-layout align-center justify-center>
        <v-flex xs10>
          <DinetContentToolbar>
          <DinetContentChart>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import DinetContentToolbar from "./DinetContentToolbar.vue";
import DinetContentChart from "./DinetContentChart.vue";
export default {
  components: {
    DinetContentToolbar,
    DinetContentChart
  }
};
</script>

<style>
</style>
