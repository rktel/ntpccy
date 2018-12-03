<template>
  <v-app>
    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-title>Reportes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="adminRoles.includes(userProfile.role)" title="Usuarios" @click="showUserDialog">
        <v-icon color="blue">supervised_user_circle</v-icon>
      </v-btn>
      <v-btn icon @click="logout" title="Cerrar sesion">
        <v-icon color="red">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <section>
        <p class="text-xs-right pa-3">Bienvenido {{userProfile.firstname}}</p>
      </section>
      <v-container>
        <h1>Bienvenido al Home</h1>
        <home-users></home-users>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomeUsers from '../components/HomeUsers.vue'
export default {
  name: "Home",
  components:{
    HomeUsers
  },
  mounted() {
    Meteor.call("getPersonal", (error, persona) => {
      if (!error) {
        this.SET_USERPROFILE(persona);
      }
    });
  },
  data: () => ({
    adminRoles: ['Hyperadmin','Superadmin']
  }),
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    ...mapMutations(["SET_USERPROFILE","SHOW_USERDIALOG"]),
    logout() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    showUserDialog(){
        this.SHOW_USERDIALOG()
    },
  }
};
</script>

<style>
</style>
