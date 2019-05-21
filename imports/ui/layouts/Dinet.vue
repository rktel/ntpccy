<template>
  <v-app :dark="dark">
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
    </v-toolbar>
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
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    }
  },
  created() {
    Session.set("dark", true);
    Session.set("openSidebar", true);

    Meteor.call("DNT_getPlates", (error, plates) => {
      if (!error) {
        // console.log("plates:", plates);
        Session.set("DNT_plates", plates);
        // Meteor.call("DNT_getData")
      }
    });
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
