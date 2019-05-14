<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12 lg3>
        <v-select
          v-model="vehicle"
          :items="plates"
          label="Seleccione unidad"
          paceholder=" "
          outline
        ></v-select>
      </v-flex>
      <v-flex xs12 lg3>
        <v-select
          v-model="searchItem"
          :items="searchItems"
          label="Tipo de reporte"
          placeholder=" "
          outline
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
            outline
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
            outline
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
      searchItems: ["Mes", "Dia"],
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
          const timeStart = this.pickerDayModel+"T"+"00:00:00.000Z"
          const timeEnd = this.pickerDayModel+"T"+"23:59:59.000Z"
          Meteor.call('DNT_getDayData', timeStart, timeEnd, this.vehicle, (error, report)=>{
            if(!error){
              console.log(report);
            }
          })
        }
      } else {
        if (this.vehicle && this.pickerMonthModel) {
          const month = /this.pickerMonthModel/
         Meteor.call('DNT_getMonthData', month, this.vehicle, (error, report)=>{
            if(!error){
              console.log(report);
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
