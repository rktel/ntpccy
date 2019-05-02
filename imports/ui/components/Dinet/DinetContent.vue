<template>
  <v-content>
    <v-container text-xs-center>
      <v-layout align-center justify-center>
        <v-flex xs10>
          <DinetContentToolbar></DinetContentToolbar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import DinetContentToolbar from './DinetContentToolbar.vue'
export default {
    components:{
        DinetContentToolbar
    }
};
</script>

<style>
</style>
