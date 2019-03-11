<template>
  <v-app>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      v-if="adminRoles.includes(userProfile.role)"
    >
      <v-list dense>
        <v-list-tile v-for="api in apiItems" :key="api.name" @click="changeApi(api.name)">
          <v-list-tile-action>
            <v-icon>play_arrow</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{api.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left dense>
      <v-toolbar-side-icon
        v-if="adminRoles.includes(userProfile.role)"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>RPT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="adminRoles.includes(userProfile.role)"
        title="Usuarios"
        @click="showUserDialog"
      >
        <v-icon color="blue">supervised_user_circle</v-icon>
      </v-btn>
      <v-btn icon @click="logout" title="Cerrar sesion">
        <v-icon color="red">power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <section :style="{'position':'absolute', 'left':'20px', 'top':'10px'}">
        <img :src="`/img/${userProfile.api}.png `" height="35" >
      </section>
      <section :style="{'position':'absolute', 'right':'20px', 'top':'10px'}">
        <p>Bienvenid@ {{userProfile.firstname}}</p>
      </section>
      <v-container fluid fill-height>
        <v-layout >
          <v-flex shrink xs12 sm8 md6>
            <antapaccay v-if="userProfile.api == 'Antapaccay'"></antapaccay>
            <exsa v-if="userProfile.api == 'Exsa'"></exsa>
            <exsa-km v-if="userProfile.api == 'ExsaKm'"></exsa-km>
            <induamerica v-if="userProfile.api == 'Induamerica'"></induamerica>
            <servosa v-if="userProfile.api == 'Servosa'"></servosa>
            <dinet v-if="userProfile.api == 'Dinet'"></dinet>
            <home-users></home-users>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <img src="/img/seclog.png" height="20">
      <span class="px-2 grey--text">SecuritasPeru</span>
      <v-spacer></v-spacer>
      <span class="px-2 grey--text">&copy; {{(new Date()).getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomeUsers from "../components/HomeUsers.vue";
import Antapaccay from "../components/Antapaccay.vue";
import Exsa from "../components/Exsa.vue";
import Induamerica from "../components/Induamerica.vue";
import Servosa from "../components/Servosa.vue";
import ExsaKm from "../components/ExsaKm.vue";
import Dinet from "../components/Dinet.vue";

export default {
  name: "Home",
  components: {
    HomeUsers,
    Antapaccay,
    Exsa,
    Induamerica,
    Servosa,
    ExsaKm,
    Dinet
  },
  created() {
    Meteor.call("getPersonal", (error, persona) => {
      if (!error) {
        if (persona.role == "Hyperadmin" || persona.role == "Superadmin") {
          persona.api = "Antapaccay";
        }
        this.SET_USERPROFILE(persona);
      }
    });
  },
  data: () => ({
    adminRoles: ["Hyperadmin", "Superadmin"],
    drawer: true,
    apiItems: createApiArray(Meteor.settings.public.api)
  }),
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    ...mapMutations(["SET_USERPROFILE", "SHOW_USERDIALOG"]),
    changeApi(apiName) {
      Meteor.call("getPersonal", (error, persona) => {
        if (!error) {
          persona.api = apiName;
          this.SET_USERPROFILE(persona);
          this.drawer = !this.drawer
        }
      });
    },
    logout() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    showUserDialog() {
      this.SHOW_USERDIALOG();
    }
  }
};

function createApiArray(apiItems) {
  return apiItems.map(el => {
    return {
      name: el,
      uri: el.toLowerCase().replace(/[aeiouáéíóú]/gi, "")
    };
  });
}
</script>

<style>
</style>
