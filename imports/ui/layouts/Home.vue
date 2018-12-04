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
      <section style="{'position':'absolute', 'right':'20px', 'top':'52px'}">
        <p class="text-xs-right pa-3">Bienvenido {{userProfile.firstname}}</p>
      </section>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink xs12 sm8 md6>
            <home-form></home-form>
            <home-users></home-users>
          </v-flex>
        </v-layout>          
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomeUsers from '../components/HomeUsers.vue'
import HomeForm from '../components/HomeForm.vue'
export default {
  name: "Home",
  components:{
    HomeUsers, HomeForm
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
