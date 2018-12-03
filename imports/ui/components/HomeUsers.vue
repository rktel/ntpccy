<template>
  <v-layout row justify-center >
    <v-dialog v-model="userDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
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
                <v-btn block>Crear</v-btn>
            </form>
        </template>
        <v-divider></v-divider>
        <v-list>
          <v-header>Lista de Usuarios [0]</v-header>
          <v-list-tile>

            <v-list-tile-content>
              <v-list-tile-title>Main Title</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="red lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HomeUsers",
  data: ()=>({

  }),
  computed: {
    ...mapState(["userDialog"])
  },
  methods: {
    ...mapMutations(["HIDE_USERDIALOG"]),
    hideUserDialog(){
        this.HIDE_USERDIALOG()
    },
  }
};
</script>

<style>
</style>
