<template>
  <v-app :dark="dark">
    <v-navigation-drawer app clipped floating v-model="drawer">
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
                <v-date-picker
                  v-model="pickerDayStartModel"
                  no-title
                  @input="pickerDayStart = false"
                ></v-date-picker>
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
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
      <v-avatar v-if="!dark">
        <img v-if="!dark" src="img/Dinet_alt.png" alt="Dinet">
      </v-avatar>
      <img v-else src="img/Dinet_white.png" alt="Dinet" width="55">
      <v-toolbar-title>Control de Velocidad</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-speed-dial v-model="fab" direction="bottom" transition="slide-y-reverse-transition">
        <v-btn v-model="fab" fab slot="activator" flat>
          <v-icon>more_vert</v-icon>
          <v-icon>arrow_upward</v-icon>
        </v-btn>
        <v-tooltip left>
          <v-btn fab small @click="fullscreen" slot="activator">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <span>Pantalla completa</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab small @click="invertColor" slot="activator">
            <v-icon>invert_colors</v-icon>
          </v-btn>
          <span>Invertir color</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab small @click="logout" slot="activator">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
          <span>Salir</span>
        </v-tooltip>
      </v-speed-dial>
    </v-toolbar>
    <DinetContent></DinetContent>
    <DinetFooter></DinetFooter>
  </v-app>
</template>

<script>
// import { Session } from "meteor/session";
import Util from "../../util";

import DinetContent from "../../ui/components/Dinet/DinetContent.vue";
import DinetFooter from "../../ui/components/Dinet/DinetFooter.vue";

export default {
  components: {
    DinetContent,
    DinetFooter
  },
  data() {
    return {
      dark: true,
      drawer: true,
      fab: false,
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
      plates: []
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    },
    logout() {
      Meteor.logout(error => {
        if (!error) {
          this.$router.push({ name: "Login" });
        }
      });
    },
    invertColor() {
      this.dark = !this.dark;
    },
    fullscreen() {
      Util.toggleFullScreen();
    },
    getData() {
      if (this.period === "day") {
        if (this.vehicle && this.pickerDayModel) {
          Meteor.call("DNT_TEST_getData", {
            vehicle: this.vehicle,
            type: "day",
            day: this.pickerDayModel
          });
        }
      } else if (this.period === "range") {
        if (this.vehicle && this.pickerDayStartModel && this.pickerDayEndModel) {
          Meteor.call("DNT_TEST_getData", {
            vehicle: this.vehicle,
            type: "range",
            dayStart: this.pickerDayStartModel,
            dayEnd: this.pickerDayEndModel
          });
        }
      } else if (this.period === "month") {
        if (this.vehicle && this.pickerMonthModel) {
          Meteor.call("DNT_TEST_getData", {
            vehicle: this.vehicle,
            type: "month",
            month: this.pickerMonthModel
          });
        }
      }
    }
  },
  created() {
    Meteor.call("DNT_getPlates", (error, plates) => {
      if (!error) {
        this.plates = plates;
      }
    });
  }
};
</script>

<style scoped>
.application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
