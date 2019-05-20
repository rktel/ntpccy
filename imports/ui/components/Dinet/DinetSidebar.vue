<template>
  <v-navigation-drawer app clipped floating v-model="openSidebar">
    <v-layout column>
      <v-flex>
        <v-btn>Buscar</v-btn>
      </v-flex>
      <v-flex>
        <v-btn>Buscar</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small>Buscar</v-btn>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { Session } from "meteor/session";
export default {
  meteor: {
    openSidebar() {
      return Session.get("openSidebar");
    }
  }
};
</script>

<style>
</style>
