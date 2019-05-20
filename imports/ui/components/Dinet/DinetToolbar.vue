<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click="toggleSidebar"></v-toolbar-side-icon>
    <v-avatar v-if="!avatar">
      <img v-if="!avatar" src="img/Dinet_alt.png" alt="avatar">
    </v-avatar>
    <img v-else src="img/Dinet_white.png" alt="avatar" width="55">
    <v-toolbar-title>Control de Velocidad</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-speed-dial v-model="fab" direction="bottom" transition="slide-y-reverse-transition">
      <v-btn v-model="fab" fab slot="activator" flat>
        <v-icon>more_vert</v-icon>
        <v-icon>arrow_upward</v-icon>
      </v-btn>
      <v-tooltip left>
        <v-btn fab small @click="fullscreen" slot="activator">
          <v-icon>fullscreen</v-icon>
        </v-btn>
        <span>Pantalla completa</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab small @click="invertColor" slot="activator">
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <span>Invertir color</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn fab small @click="logout" slot="activator">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <span>Salir</span>
      </v-tooltip>
    </v-speed-dial>
  </v-toolbar>
</template>

<script>
import { Session } from "meteor/session";
import Util from "../../../util";
export default {
  meteor: {
    avatar() {
      return Session.get("dark");
    }
  },
  data() {
    return {
      fab: false
    };
  },
  methods: {
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
    },
    toggleSidebar() {
      Session.get("openSidebar")
        ? Session.set("openSidebar", false)
        : Session.set("openSidebar", true);
    }
  }
};
</script>

<style>
</style>
