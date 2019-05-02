<template>
  <v-toolbar app fixed>
    <v-layout justify-space-between>
      <v-avatar color="grey lighten-4">
        <img src="img/Dinet_alt.png" alt="avatar">
      </v-avatar>
      <div>
        <v-tooltip left>
          <v-btn icon @click="fullscreen" slot="activator">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <span>Pantalla completa</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn icon @click="invertColor" slot="activator">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <span>Pantalla completa</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn icon @click="logout" slot="activator">
            <v-icon>settings</v-icon>
          </v-btn>
          <span>Pantalla completa</span>
        </v-tooltip>
      </div>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { Session } from "meteor/session";
import Util from "../../../util";
export default {
  data() {
    return {
      profileMenu: [{ title: "Logout", action: () => this.logout() }]
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
    }
  }
};
</script>

<style>
</style>
