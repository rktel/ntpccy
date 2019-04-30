<template>
    <v-app>
          <DinetToolbar></DinetToolbar>
          <DinetContent></DinetContent>
    </v-app>
</template>

<script>
import DinetToolbar from "../../ui/components/Dinet/DinetToolbar.vue";
import DinetContent from "../../ui/components/Dinet/DinetContent.vue";
export default {
  components: {
    DinetToolbar,DinetContent
  }
};
</script>

<style>
</style>
