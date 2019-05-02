<template>
  <v-toolbar app fixed>
    <v-layout justify-space-between>
      <v-avatar color="grey lighten-4">
        <img src="img/Dinet_alt.png" alt="avatar">
      </v-avatar>
      <div>
        <v-speed-dial
          v-model="fab"
          direction="bottom"
          open-on-hover="true"
          transition="slide-y-reverse-transition"
        >
          <v-btn v-model="fab" color="blue darken-2" dark fab slot="activator">
            <v-icon>account_circle</v-icon>
            <v-icon>close</v-icon>
          </v-btn>

          <v-btn fab dark small color="green">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn fab dark small color="red">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-speed-dial>

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
          <span>Invertir color</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn icon @click="logout" slot="activator">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
          <span>Salir</span>
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
    }
  }
};
</script>

<style>
</style>
