<template>
  <v-navigation-drawer app clipped floating v-model="openSidebar">
    <v-layout column>
      <v-flex>
        <v-subheader>OBJETO</v-subheader>
        <v-divider></v-divider>
        <div class="px-2">
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
        <v-radio-group v-model="periodo" row>
          <v-radio label="Dia" value="dia"></v-radio>
          <v-radio label="Rango" value="rango"></v-radio>
          <v-radio label="Mes" value="mes"></v-radio>
        </v-radio-group>
        <v-divider></v-divider>
      </v-flex>
      <v-flex>
        <v-subheader>ACCION</v-subheader>
        <v-divider></v-divider>
        <v-btn small block>Buscar</v-btn>
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
  }
};
</script>

<style>
</style>
