<template>
  <v-app>
    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-title>Generador de Reportes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="userProfile.role == 'Hyperadmin'" title="Usuarios">
        <v-icon color="blue">supervised_user_circle</v-icon>
      </v-btn>
      <v-btn icon @click="logout" title="Cerrar sesion">
        <v-icon color="red">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-system-bar status lights-out dark fixed>
          <v-spacer></v-spacer>
          <span>Bienvenido {{userProfile.firstname}}</span>
      </v-system-bar>
      <v-container>
        <h1>Bienvenido al Home</h1>

      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  mounted() {
    Meteor.call("getPersonal", (error, persona) => {
      if (!error) {
        this.SET_USERPROFILE(persona);
      }
    });
  },
  data() {
    return {
 
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    ...mapMutations(["SET_USERPROFILE"]),
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
