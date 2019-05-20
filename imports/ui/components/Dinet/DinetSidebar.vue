<template>
  <v-navigation-drawer app clipped floating v-model="openSidebar">
    <v-layout column>
      <v-flex>
        <v-subheader>OBJETO</v-subheader>
        <v-divider></v-divider>
        <div class="pa-4">
          <v-select
            v-model="vehicle"
            :items="plates"
            placeholder="Vehiculo"
            persistent-hint
            height="20"
            flat
          ></v-select>
        </div>
        <v-divider></v-divider>
      </v-flex>
      <v-flex>
        <v-subheader>PERIODO</v-subheader>
        <v-divider></v-divider>
        <div class="pa-4">
          <v-radio-group v-model="periodo" row @change="changePeriodo">
            <v-radio label="Dia" value="dia"></v-radio>
            <v-radio label="Rango" value="rango"></v-radio>
            <v-radio label="Mes" value="mes"></v-radio>
          </v-radio-group>
        </div>
        <v-divider></v-divider>
      </v-flex>
      <v-flex>
        <v-subheader>ACCION</v-subheader>
        <v-divider></v-divider>
        <div class="pa-4">
          <v-btn small block>Buscar</v-btn>
        </div>
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
    },
    plates() {
      return Session.get("DNT_plates");
    }
  },
  data() {
    return {
      periodo: "dia"
    };
  },
  methods: {
    changePeriodo() {
      console.log(this.periodo);
    }
  }
};
</script>

<style>
</style>
