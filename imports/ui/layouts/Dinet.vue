<template>
  <v-app :dark="dark">
    <v-navigation-drawer floating v-model="drawerRight" right clipped app width="400">
      <v-layout fill-height row  align-center>
        <v-flex pa-0>
          <h3 class="text-xs-center">Ranking Conductores</h3>
          <h4 class="text-xs-center">{{pilotsData.day}}</h4>
            <apexcharts type="bar" :options="optionsPilots" :series="seriesPilots"></apexcharts>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
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

    <v-toolbar app clipped-left clipped-right fixed>
      <v-toolbar-side-icon @click="openDrawer"></v-toolbar-side-icon>
      <v-avatar v-if="!dark">
        <img v-if="!dark" src="img/Dinet_alt.png" alt="Dinet">
      </v-avatar>
      <img v-else src="img/Dinet_white.png" alt="Dinet" width="55">
      <v-toolbar-title>Speed Control</v-toolbar-title>
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
     <v-snackbar v-model="snackbar" top>
      {{snackbarText}}
     </v-snackbar>
    <DinetContent></DinetContent>
    <DinetFooter></DinetFooter>
  </v-app>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Session } from "meteor/session";
import Util from "../../util";

import DinetContent from "../../ui/components/Dinet/DinetContent.vue";
import DinetFooter from "../../ui/components/Dinet/DinetFooter.vue";

export default {
  components: {
    DinetContent,
    DinetFooter,
    apexcharts: VueApexCharts
  },
  data() {
    return {
      dark: true,
      drawer: true,
      drawerRight: false,
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
      plates: [],
      vehicle: null,
      snackbar: false,
      snackbarText: '',
      pilotsData: {},
      seriesPilots: [],
      optionsPilots: {},
    };
  },
  methods: {
    loadingDataEnd() {
      this.loadingData = false;
      this.drawer = false;
    },
    loadingDataStart() {
      this.loadingData = true;
    },
    openDrawer() {
      this.drawer = !this.drawer;
    },
    openDrawerRight(){
      this.drawerRight = true;
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
      Session.set("dark", !Session.get("dark"));
    },
    fullscreen() {
      Util.toggleFullScreen();
    },
    getData() {
      if(!this.vehicle){
          this.snackbar = true;
          this.snackbarText = 'Debe seleccionar un vehiculo'
      }
      if (this.period === "day") {
        if(this.pickerDayModel){
          Meteor.call("DNT_TEST_getDataPilots",  { type: "day", day: this.pickerDayModel }, (error, data) => {
              if (!error) {
                 // Session.set("report", data);
                 // console.log(data);
                 if(1){
                   this.pilotsData = data;
                   this.openDrawerRight()
                 }
               // this.loadingDataEnd();
              }
          });          
        }
        if (this.vehicle && this.pickerDayModel) {
          this.loadingDataStart();
          Meteor.call("DNT_TEST_getData",  { vehicle: this.vehicle, type: "day", day: this.pickerDayModel }, (error, data) => {
              if (!error) {
                Session.set("report", data);
                this.loadingDataEnd();
              }
          });
        }
      } else if (this.period === "range") {
        if (this.vehicle &&  this.pickerDayStartModel &&  this.pickerDayEndModel ) {
            const numberDays = getNumberDays(this.pickerDayStartModel, this.pickerDayEndModel)
            if(numberDays <= 6){
                this.loadingDataStart();
                Meteor.call("DNT_TEST_getData", { vehicle: this.vehicle, type: "range", dayStart: this.pickerDayStartModel, dayEnd: this.pickerDayEndModel },
                  (error, data) => {
                    if (!error) {
                      Session.set("report", data);
                      this.loadingDataEnd();
                    }
                });
            }else{
              this.snackbar = true;
              this.snackbarText = 'Son 7 dias como maximo'
            }
        }
      } else if (this.period === "month") {
        if (this.vehicle && this.pickerMonthModel) {
          this.loadingDataStart();
          Meteor.call("DNT_TEST_getData", { vehicle: this.vehicle, type: "month", month: this.pickerMonthModel },
            (error, data) => {
              if (!error) {
                Session.set("report", data);
                this.loadingDataEnd();
              }
            }
          );
        }
      }
    }
  },
  created() {
    Session.set("dark", true); // chart theme
    Session.set("report", false); // chart report
    Meteor.call("DNT_getPlates", (error, plates) => {
      if (!error) {
        this.plates = plates;
      }
    });
  },
  watch:{
    pilotsData: function () {
       if (this.pilotsData) {
         let data = this.pilotsData.data
         const pilots = data.map(el => el.pilot);
         const ratios = data.map(el => {
           if(el.distancia && el.overspeed15){
             return parseInt(10*(el.distancia/el.overspeed15))
           }else{
             return 0
           }
         })
         console.log('pilots:', pilots)
         console.log('ratios:', ratios)
        /********************** Pilots ********************/ 
        
        this.seriesPilots = [
          {
            name: "Ratio",
            data: ratios
          },

        ];
        this.optionsPilots = {
          //colors: ['#3F51B5', '#4CAF50'],
          chart: {
            toolbar: {
              show: false
            }
          },
          theme: {
            mode: "dark"
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "30%"
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: pilots
          }
        };         

       }
    }
  }
};

function getNumberDays(a, b) {
  let date2 = new Date(a);
  let date1 = new Date(b);
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
</script>

<style scoped>
.application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
