<template>
  <v-toolbar app fixed>
    <v-layout justify-space-between>
      <v-avatar color="grey lighten-4">
        <img src="img/Dinet_alt.png" alt="avatar">
      </v-avatar>
      <v-flex>
        <v-btn icon @click="invertColor">
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <v-menu offset-x offset-y>
          <v-btn icon slot="activator">
            <v-icon>account_circle</v-icon>
          </v-btn>
          <v-list dense>
            <v-list-tile v-for="(item,key) in profileMenu" :key="key" @click="item.action">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { Session } from "meteor/session";

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
    }
  }
};
</script>

<style>
</style>
