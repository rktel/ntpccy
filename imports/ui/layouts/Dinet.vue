<template>
  <v-app :dark="dark">
    <DinetSidebar></DinetSidebar>
    <DinetToolbar></DinetToolbar>
    <DinetContent></DinetContent>
    <DinetFooter></DinetFooter>
  </v-app>
</template>

<script>
import { Session } from "meteor/session";

import DinetToolbar from "../../ui/components/Dinet/DinetToolbar.vue";
import DinetContent from "../../ui/components/Dinet/DinetContent.vue";
import DinetFooter from "../../ui/components/Dinet/DinetFooter.vue";
import DinetSidebar from "../../ui/components/Dinet/DinetSidebar.vue";

export default {
  components: {
    DinetToolbar,
    DinetContent,
    DinetFooter,
    DinetSidebar
  },
  beforeCreate() {
    Session.set("dark", true);
  },
  meteor: {
    dark() {
      return Session.get("dark");
    }
  }
};
</script>

<style scoped>
.application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
