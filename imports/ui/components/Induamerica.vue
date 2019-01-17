<template>
  <section>
    <template>
      <v-combobox
        v-model="selectPlates"
        :items="plates"
        label="Seleccione unidades"
        multiple
        small-chips
        hide-selected
        solo
      ></v-combobox>

      <v-slider v-model="kmValue" thumb-label="always" max="120" label="Limite de Velocidad [Km/h]" step="5"></v-slider>
    </template>
    <template>
      <section>
        <v-menu
          ref="menuDS"
          :close-on-content-click="false"
          v-model="pickerDS"
          :nudge-right="40"
          :return-value.sync="dateStart"
          lazy
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateStart"
            label="Fecha de Inicio"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dateStart" @input="$refs.menuDS.save(dateStart)"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menuTS"
          :close-on-content-click="false"
          v-model="pickerTS"
          :nudge-right="40"
          :return-value.sync="timeStart"
          lazy
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="timeStart"
            label="Tiempo de Inicio"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="pickerTS"
            v-model="timeStart"
            @change="$refs.menuTS.save(timeStart)"
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </section>
    </template>
    <template>
      <section>
        <v-menu
          ref="menuDE"
          :close-on-content-click="false"
          v-model="pickerDE"
          :nudge-right="40"
          :return-value.sync="dateEnd"
          lazy
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateEnd"
            label="Fecha de Termino"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dateEnd" @input="$refs.menuDE.save(dateEnd)"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menuTE"
          :close-on-content-click="false"
          v-model="pickerTE"
          :nudge-right="40"
          :return-value.sync="timeEnd"
          lazy
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="timeEnd"
            label="Tiempo de Termino"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="pickerTE"
            v-model="timeEnd"
            @change="$refs.menuTE.save(timeEnd)"
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </section>
    </template>
    <template>
      <section>
        <v-btn color="primary" block @click="genReport" :disabled="false">Generar Reporte</v-btn>
      </section>
    </template>
    <template>
      <v-progress-linear v-if="progressState == 1" :indeterminate="true" color="green"></v-progress-linear>
    </template>
    <template>
      <v-snackbar v-model="snackbar" :right="true" :timeout="timeout" :top="true">
        {{ snackbarText }}
        <v-btn color="pink" flat @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </template>
  </section>
</template>

<script>
// Date Time Format for Query: 2018-11-26T18:02:29.000Z
const MAX_DAYS = 2;
const MAX_PLATES = 52;

import { stNDMRC } from "../../api/streamers";
import { json2excel } from "js2excel";

export default {
  name: "Induamerica",
  mounted() {
    Meteor.call("ArrayPlates_getPlates_Induamerica", (error, plates) => {
      if (!error) {
        this.plates = plates.plates;
      }
    });

    stNDMRC.on("Rows", (userID, data) => {
      if (userID == this.userID) {
        this.buttonGRDisabled = false;
        this.progressState = 0;

        try {
          json2excel({
            data,
            name: "Reporte",
            formateDate: "yyyy/mm/dd"
          });
        } catch (e) {
          console.error("export error");
        }
      }
    });
    stNDMRC.on("NoData", (userID, plate) => {
      if (userID == this.userID) {
        this.buttonGRDisabled = false;
        this.progressState = 0;
        // console.log(value);
        this.snackbar = true;
        this.snackbarText = `No hay data`;
      }
    });
  },
  data: () => ({
    plates: [],
    selectPlates: [],
    dateStart: null,
    dateEnd: null,
    timeStart: null,
    timeEnd: null,
    pickerDS: false,
    pickerDE: false,
    pickerTS: false,
    pickerTE: false,
    buttonGRDisabled: false, // TRUE PARA DESHABILITAR
    progressState: 0,
    snackbar: false,
    timeout: 1500,
    snackbarText: null,
    userID: new Date().getTime(),
    kmValue: 0
  }),
  methods: {
    genReport() {
      const T = "T";
      const Z = ":00.000Z";
      const {
        userID,
        selectPlates,
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
        kmValue
      } = this;
      const dateTimeStart = dateStart + T + timeStart + Z;
      const dateTimeEnd = dateEnd + T + timeEnd + Z;

      console.log(selectPlates, dateStart, dateEnd, timeStart, timeEnd);

      if (
        dateStart &&
        timeStart &&
        dateEnd &&
        timeEnd &&
        kmValue &&
        selectPlates.length > 0
      ) {
        if (selectPlates.length > 0 && selectPlates.length <= MAX_PLATES) {
          const diffDays = getDaysDiff(dateTimeEnd, dateTimeStart);
          console.log("days:", diffDays);

          if (diffDays >= 0 && diffDays <= MAX_DAYS) {
            this.snackbar = true;
            this.snackbarText = "Iniciando proceso...";
            this.buttonGRDisabled = true;
            this.progressState = 1;
            Meteor.call(
              "Induamerica_queryEvents",
              userID,
              selectPlates,
              dateTimeStart,
              dateTimeEnd,
              kmValue
            );
          } else {
            console.log(
              `Maximo ${MAX_DAYS} dias de diferencia entre fecha de inicio y termino`
            );
            this.snackbar = true;
            this.snackbarText = `Son ${MAX_DAYS} dias como maximo`;
          }
        } else {
          console.log(`Maximo ${MAX_PLATES} unidades`);
          this.snackbar = true;
          this.snackbarText = `Son ${MAX_PLATES} unidades como maximo`;
        }
      } else {
        console.log("Debe llenar los campos");
        this.snackbar = true;
        this.snackbarText = "Debe rellenar todos los campos";
      }
    }
  }
};

function getDaysDiff(dateTimeMax, dateTimeMin) {
  const diff =
    new Date(dateTimeMax).getTime() - new Date(dateTimeMin).getTime();
  return parseInt(diff / (24 * 60 * 60 * 1000));
}
</script>

<style>
</style>

