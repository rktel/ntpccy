<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12 lg3>
        <v-select
          v-model="vehicle"
          :items="plates"
          hint="Seleccione unidad"
          persistent-hint
          height ="20"
          flat
        ></v-select>
      </v-flex>
      <v-flex xs12 lg3>
        <v-select
          v-model="searchItem"
          :items="searchItems"
          hint="Tipo de reporte"
          persistent-hint
          height ="20"
          flat
          
        ></v-select>
      </v-flex>
      <v-flex v-if="searchItem === 'Dia'" xs12 lg3>
        <v-menu
          ref="pickerDay"
          :close-on-content-click="false"
          v-model="pickerDay"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            label="Seleccione dia"
            v-model="pickerDayModel"
            prepend-inner-icon="event"
            readonly
            
          ></v-text-field>
          <v-date-picker v-model="pickerDayModel" no-title @input="pickerDay = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex v-else-if="searchItem === 'Mes'" xs12 lg3>
        <v-menu
          ref="pickerMonth"
          :close-on-content-click="false"
          v-model="pickerMonth"
          transition="scale-transition"
        >
          <v-text-field
            slot="activator"
            label="Seleccione mes"
            v-model="pickerMonthModel"
            prepend-inner-icon="event"
            readonly
            
          ></v-text-field>
          <v-date-picker
            v-model="pickerMonthModel"
            no-title
            @input="pickerMonth = false"
            type="month"
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 lg1 pt-0>
        <v-tooltip bottom>
          <v-btn fab slot="activator" @click="getVehicleData">
            <v-icon>search</v-icon>
          </v-btn>
          <span>Buscar</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { Session } from "meteor/session";
export default {
  mounted() {
    Meteor.call("DNT_getPlates", (error, plates) => {
      if (!error) {
        console.log("plates:", plates);
        Session.set("DNT_plates", plates);
        // Meteor.call("DNT_getData")
      }
    });
  },
  meteor: {
    plates() {
      return Session.get("DNT_plates");
    }
  },
  data() {
    return {
      searchItem: "Dia",
      searchItems: ["Dia"],
      pickerDayModel: new Date().toISOString().substr(0, 10),
      pickerDay: false,
      pickerMonthModel: null,
      pickerMonth: false,
      vehicle: false
    };
  },
  methods: {
    getVehicleData() {
      if (this.searchItem === "Dia") {
        if (this.vehicle && this.pickerDayModel) {
          // DAY: 2019-05-16
           Meteor.call('DNT_TEST_getDayData', this.pickerDayModel, this.vehicle, (error, report)=>{
            if(!error){
             // console.log(report);
             // Session.set("report", report)
            }
          })
        }
      }else if(this.searchItem === "Rango"){
        if(this.vehicle && this.pickerDayModel_S && this.pickerDayModel_E){
          Meteor.call('DNT_getRangeDayData', this.pickerDayModel_S, this.pickerDayModel_E, this.vehicle )
        }
      }
      else {
        if (this.vehicle && this.pickerMonthModel) {
         Meteor.call('DNT_getMonthData', this.pickerMonthModel, this.vehicle, (error, report)=>{
            if(!error){
             // console.log(report);
              Session.set("report", report)
            }
          })
          
        }
      }
    }
  }
};
</script>

<style>
</style>
