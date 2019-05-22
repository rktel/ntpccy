<template>
  <v-content>
    <v-container text-xs-center grid-list-xl>
      <v-layout align-center justify-center>
        <v-flex xs12>
          <DinetContentChart></DinetContentChart>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

import DinetContentChart from "./DinetContentChart.vue";
export default {
  components: {

    DinetContentChart
  }
};
</script>

<style>
</style>
