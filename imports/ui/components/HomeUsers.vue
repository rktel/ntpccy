<template>
  <v-layout row justify-center>
    <v-dialog v-model="userDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="black" dense>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="hideUserDialog">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <template>
          <form class="px-3">
            <v-text-field v-model="firstname" label="Nombres" required></v-text-field>
            <v-text-field v-model="lastname" label="Apellidos" required></v-text-field>
            <v-select :items="roleItems" v-model="roleSelect" label="Rol" required></v-select>
            <v-select  v-if="roleSelect == 'Tecnico'" :items="apiItems" v-model="apiSelect" label="Api" required></v-select>
            <v-btn block @click="savePersonal">Crear</v-btn>
          </form>
        </template>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Lista de Usuarios [{{personal.length}}]</v-subheader>

          <v-list-tile v-for="person in personal" :key="person._id">
            <v-list-tile-content>
              <v-list-tile-title>{{person.firstname }} {{person.lastname}} [{{person.username}},{{person.password}},{{person.role}}]</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="removePersonal(person)">
                <v-icon color="red lighten-1">delete_forever</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { Personal } from "../../api/collections.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "HomeUsers",
  data: () => ({
    firstname: "",
    lastname: "",
    roleItems: Meteor.settings.public.roles,
    apiItems: Meteor.settings.public.api,
    roleSelect: null,
    apiSelect:null
  }),
  meteor: {
    $subscribe: {
      personal: []
    },
    personal() {
      return Personal.find({});
    }
  },
  computed: {
    ...mapState(["userDialog"])
  },
  methods: {
    ...mapMutations(["HIDE_USERDIALOG"]),
    hideUserDialog() {
      this.HIDE_USERDIALOG();
    },
    savePersonal() {
      if (this.firstname && this.lastname && this.roleSelect) {
        const personal = {
          firstname: this.firstname,
          lastname: this.lastname,
          role: this.roleSelect
        };
        Meteor.call("createPersonal", personal, (error, id) => {
          if (!error) {
            this.clear();
          }
        });
      }
    },
    removePersonal(person) {
      Meteor.call("removePersonal", person);
    },
    clear() {
      this.firstname = "";
      this.lastname = "";
      this.roleSelect = null;
    }
  }
};
</script>

<style>
</style>
