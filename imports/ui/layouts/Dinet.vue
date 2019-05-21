<template>
  <v-app :dark="dark">
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>

    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
      <v-avatar v-if="!avatar">
        <img v-if="!avatar" src="img/Dinet_alt.png" alt="Dinet">
      </v-avatar>
      <img v-else src="img/Dinet_white.png" alt="Dinet" width="55">
      <v-toolbar-title>Control de Velocidad</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-speed-dial v-model="fab" direction="bottom" transition="slide-y-reverse-transition">
        <v-btn v-model="fab" fab slot="activator" flat>
          <v-icon>more_vert</v-icon>
          <v-icon>arrow_upward</v-icon>
        </v-btn>
        <v-tooltip left>
          <v-btn fab small slot="activator">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <span>Pantalla completa</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab small slot="activator">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <span>Invertir color</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab small slot="activator">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
          <span>Salir</span>
        </v-tooltip>
      </v-speed-dial>
    </v-toolbar>
    <DinetContent></DinetContent>
    <DinetFooter></DinetFooter>
  </v-app>
</template>

<script>
import { Session } from "meteor/session";
import Util from "../../../util";

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
      drawer: true,
      fab: false
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    },
    logout() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    invertColor() {
      Session.set("dark", !Session.get("dark"));
    },
    fullscreen() {
      Util.toggleFullScreen();
    }
  },
  created() {
    Session.set("dark", true);

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
    },
    avatar() {
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
