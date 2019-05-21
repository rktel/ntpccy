<template>
  <v-navigation-drawer app clipped floating v-model="sidebar">
    <v-layout column>
      <v-flex>
        <v-subheader>OBJETO</v-subheader>
        <v-divider></v-divider>
        <div class="pa-3">
          <v-select v-model="vehicle" :items="plates" label="Vehiculo" height="20" flat></v-select>
        </div>
        <v-divider></v-divider>
      </v-flex>
      <v-flex>
        <v-subheader>PERIODO</v-subheader>
        <v-divider></v-divider>
        <div class="pa-3">
          <v-radio-group v-model="period" row @change="changePeriod">
            <v-radio label="Dia" value="day"></v-radio>
            <v-radio label="Mes" value="month"></v-radio>
            <v-radio label="Rango" value="range"></v-radio>
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
              label="Dia"
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
          <section>
            <v-menu
              ref="pickerDayStart"
              :close-on-content-click="false"
              v-model="pickerDayStart"
              transition="scale-transition"
              v-if="period == 'range'"
            >
              <v-text-field
                slot="activator"
                v-model="pickerDayStartModel"
                readonly
                height="20"
                flat
                label="Desde"
              ></v-text-field>
              <v-date-picker v-model="pickerDayStartModel" no-title @input="pickerDayStart = false"></v-date-picker>
            </v-menu>
            <v-menu
              ref="pickerDayEnd"
              :close-on-content-click="false"
              v-model="pickerDayEnd"
              transition="scale-transition"
              v-if="period == 'range'"
            >
              <v-text-field
                slot="activator"
                v-model="pickerDayEndModel"
                readonly
                height="20"
                flat
                label="Hasta"
              ></v-text-field>
              <v-date-picker v-model="pickerDayEndModel" no-title @input="pickerDayEnd = false"></v-date-picker>
            </v-menu>
          </section>
        </div>
        <v-divider></v-divider>
      </v-flex>
      <v-flex>
        <v-subheader>ACCION</v-subheader>
        <v-divider></v-divider>
        <div class="pa-3">
          <v-btn block @click="getData" :loading="loadingData">Buscar</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { Session } from "meteor/session";
export default {

  meteor: {
    sidebar() {
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
      pickerDayStartModel: null,
      pickerDayStart: false,
      pickerDayEndModel: null,
      pickerDayEnd: false,
      pickerMonthModel: null,
      pickerMonth: false,
      loadingData: false,
    };
  },
  methods: {
    getData() {
      if (this.period === "day") {
        if (this.vehicle && this.pickerDayModel) {
            Meteor.call("DNT_TEST_getData", {vehicle: this.vehicle, type: 'day', day: this.pickerDayModel })
          // DAY: 2019-05-16
          /*
          Meteor.call(
            "DNT_TEST_getDayData",
            this.pickerDayModel,
            this.vehicle,
            (error, report) => {
              if (!error) {
                // console.log(report);
                // Session.set("report", report)
              }
            }
          );
          */
        }
      } else if (this.period === "range") {
        if (this.vehicle && this.pickerDayStartModel && this.pickerDayEndModel) {
            Meteor.call("DNT_TEST_getData", {vehicle: this.vehicle, type: 'range', dayStart: this.pickerDayStartModel, dayEnd: this.pickerDayEndModel })
        }
      } else if (this.period === "month") {
        if (this.vehicle && this.pickerMonthModel) {
            Meteor.call("DNT_TEST_getData", {vehicle: this.vehicle, type: 'month', month: this.pickerMonthModel })
        }
      }
    }
  }
};
</script>

<style>
</style>
