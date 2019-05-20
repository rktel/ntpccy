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
          <v-radio-group v-model="period" row @change="changePeriod">
            <v-radio label="Dia" value="day"></v-radio>
            <v-radio label="Rango" value="range"></v-radio>
            <v-radio label="Mes" value="month"></v-radio>
          </v-radio-group>
          <v-menu
            ref="pickerDay"
            :close-on-content-click="false"
            v-model="pickerDay"
            transition="scale-transition"
            v-if="period == 'day'"
          >
            <v-text-field
              slot="activator"
              v-model="pickerDayModel"
              readonly
              height="20"
              flat
              placeholder="Dia"
            ></v-text-field>
            <v-date-picker v-model="pickerDayModel" no-title @input="pickerDay = false"></v-date-picker>
          </v-menu>
          <v-menu
            ref="pickerMonth"
            :close-on-content-click="false"
            v-model="pickerMonth"
            transition="scale-transition"
            v-else-if="period == 'month'"
          >
            <v-text-field
              slot="activator"
              v-model="pickerMonthModel"
              readonly
              label="Mes"
              persistent-hint
              height="20"
              flat
            ></v-text-field>
            <v-date-picker
              v-model="pickerMonthModel"
              no-title
              @input="pickerMonth = false"
              type="month"
            ></v-date-picker>
          </v-menu>
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
      period: "day",
      pickerDayModel: new Date().toISOString().substr(0, 10),
      pickerDay: false,
      pickerMonthModel: null,
      pickerMonth: false,
    };
  },
  methods: {
    changePeriodo() {
      console.log(this.period);
    }
  }
};
</script>

<style>
</style>
