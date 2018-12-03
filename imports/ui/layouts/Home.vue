<template>
  <v-app>
    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-title>Generador de Reportes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="blue">supervised_user_circle</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon color="red">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-system-bar status color="primary" lights-out>
          <v-spacer></v-spacer>
          <span>username</span>
      </v-system-bar>
      <v-container>
        <h1>Bienvenido al Home</h1>

      </v-container>
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
 
    };
  },
  computed: {
 
  },
  methods: {
    logout() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    },
  }
};
</script>

<style>
</style>
