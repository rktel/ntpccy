<script>
// Date Time Format for Query: 2018-11-26T18:02:29.000Z
const MAX_DAYS = 5;
const MAX_PLATES = 10;

import { stDNT } from "../../api/streamers";
import { json2excel } from "js2excel";

export default {
  name: "Dinet",
  mounted() {
    Meteor.call("ArrayPlates_getPlates_Dinet", (error, plates) => {
      if (!error) {
        this.plates = plates.plates;
        console.log("ArrayPlates:", plates.plates);
      }
    });

    stDNT.on("Rows", (userID, data) => {
      if (userID == this.userID) {
        this.buttonGRDisabled = false;
        this.progressState = 0;
        this.data = data;
        /*
        try {
          json2excel({
            data,
            name: "Reporte",
            formateDate: "yyyy/mm/dd"
          });
        } catch (e) {
          console.error("export error");
        }
*/
      }
    });
    stDNT.on("NoData", (userID, plate) => {
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
    data: []
  }),
  methods: {
    exportTableToExcel() {
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById("tblData");
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      // Specify file name
      // filename = filename ? filename + ".xls" : "excel_data.xls";
      let filename = "excel_data.xls";

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["ufeff", tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
    },
    genReport() {
      const T = "T";
      const Z = ":00.000Z";
      const {
        userID,
        selectPlates,
        dateStart,
        dateEnd,
        timeStart,
        timeEnd
      } = this;
      const dateTimeStart = dateStart + T + timeStart + Z;
      const dateTimeEnd = dateEnd + T + timeEnd + Z;

      console.log(selectPlates, dateStart, dateEnd, timeStart, timeEnd);

      if (
        dateStart &&
        timeStart &&
        dateEnd &&
        timeEnd &&
        selectPlates.length > 0
      ) {
        if (selectPlates.length > 0 && selectPlates.length <= MAX_PLATES) {
          const diffDays = getDaysDiff(dateTimeEnd, dateTimeStart);
          //  console.log("days:", diffDays);

          if (diffDays >= 0 && diffDays <= MAX_DAYS) {
            this.snackbar = true;
            this.snackbarText = "Iniciando proceso...";
            this.buttonGRDisabled = true;
            this.progressState = 1;
            Meteor.call(
              "Dinet_queryEvents",
              userID,
              selectPlates,
              dateTimeStart,
              dateTimeEnd
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

<template>
  <section class="contenedor bg-color">
    <div class="itemOne">

        <v-combobox
          v-model="selectPlates"
          :items="plates"
          label="Seleccione unidades"
          multiple
          small-chips
          hide-selected
          solo
        ></v-combobox>


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
    
    
        <section>
          <v-btn color="primary" block @click="genReport" :disabled="false">Generar Reporte</v-btn>
        </section>
   
     
        <v-progress-linear v-if="progressState == 1" :indeterminate="true" color="green"></v-progress-linear>
    
   
        <v-snackbar v-model="snackbar" :right="true" :timeout="timeout" :top="true">
          {{ snackbarText }}
          <v-btn color="pink" flat @click="snackbar = false">Cerrar</v-btn>
        </v-snackbar>
    
    </div>
    <div class="itemTwo">
      <template>
        <v-btn color="green" @click="exportTableToExcel">Export Table Data To Excel File</v-btn>
        <table
          id="tblData"
          summary="Lista de Excesos de velocidad"
          rules="groups"
          frame="hsides"
          border="2"
        >
          <caption>LISTA DE EXCESOS DE VELOCIDAD</caption>
          <colgroup align="center"></colgroup>
          <colgroup align="center"></colgroup>
          <colgroup align="center"></colgroup>
          <colgroup align="center"></colgroup>

          <thead valign="top">
            <tr>
              <th>Placa</th>
              <th>Exceso 15km/h</th>
              <th>Exceso 30km/h</th>
              <th>Exceso 80km/h</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="el in data" :key="el.index">
              <td>{{el.placa}}</td>
              <td>{{el.exceso15}}</td>
              <td>{{el.exceso30}}</td>
              <td>{{el.exceso80}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </section>
</template>
