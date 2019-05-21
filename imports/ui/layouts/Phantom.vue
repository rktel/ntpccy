<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer"></v-navigation-drawer>
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
    </v-toolbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
</style>
