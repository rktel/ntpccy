<template>
  <section>
    <v-layout row wrap>
      <v-flex lg6 xs12>
        <v-card v-if="report" class="pt-4">
          <h3 class="text-xs-center">{{this.report.plate}} [Excesos de 15 Km/h]</h3>
          <span class="text-xs-left">Reporte tipo: Ratio [10 * d/e]</span>
          <apexcharts type="bar" :options="optionsABRatio" :series="seriesABRatio"></apexcharts>
          <h5 class="text-xs-right">[ d: distancia recorrida (Km), e: numero de eventos]</h5>
        </v-card>
      </v-flex>
      <v-flex lg6 xs12>
        <v-card v-if="report" class="pt-4">
          <h3 class="text-xs-center">{{this.report.plate}} [Excesos de 15 Km/h]</h3>
          <span class="text-xs-left">Reporte tipo: Distancia/Eventos</span>
          <apexcharts type="bar" :options="optionsABDistanceEvent" :series="seriesABDistanceEvent"></apexcharts>
          <h5 class="text-xs-right">[ distancia recorrida en (Km)]</h5>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Session } from "meteor/session";
export default {
  components: {
    apexcharts: VueApexCharts
  },
  mounted() {
    /** */
  },
  meteor: {
    dark() {
      return Session.get("dark");
    },
    report() {
      return Session.get("report");
    }
  },
  watch: {
    report: function() {
      //  console.log("Session.get(report): ",Session.get("report"));
      if (this.report) {
        console.log(this.report);
        //Data por Placa
        const report = this.report;
        const plate = report.plate;
        const data = report.data;
        // Data Serie Turno A
        const serieA_exceso15 = data.map(el => el.turnA.exceso15);
        const serieA_distancia = data.map(el => el.turnA.distancia);

        const ratioA = serieA_distancia.map((el, index) => {
          if (el && serieA_exceso15[index]) {
            return parseInt((10 * el) / serieA_exceso15[index]);
          } else {
            return 0;
          }
        });
        // Data Serie Turno B
        const seriesDays = data.map(el => el.day);
        const serieB_exceso15 = data.map(el => el.turnB.exceso15);
        const serieB_distancia = data.map(el => el.turnB.distancia);
        const ratioB = serieB_distancia.map((el, index) => {
          if (el && serieB_exceso15[index]) {
            return parseInt((10 * el) / serieB_exceso15[index]);
          } else {
            return 0;
          }
        });
        /********************** RatioAB ********************/ 
        this.seriesABRatio = [
          {
            name: "Turno A",
            data: ratioA
          },
          {
            name: "Turno B",
            data: ratioB
          }
        ];
        this.optionsABRatio = {
          colors: ['#3F51B5', '#4CAF50'],
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
              horizontal: false,
              columnWidth: "40%"
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: seriesDays
          }
        };
        /********************** ABDistanciaEventos ********************/ 
        this.seriesABDistanceEvent = [
          {
            name: "Distancia Turno A",
            data: serieA_distancia
          },
          {
            name: "Distancia Turno B",
            data: serieB_distancia
          },
          {
            name: "Eventos Turno A",
            data: serieA_exceso15
          },
          {
            name: "Eventos Turno B",
            data: serieB_exceso15
          }
        ];
        this.optionsABDistanceEvent = {
          colors: ['#673AB7', '#009688', '#FFC107', '#607D8B'],
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
              columnWidth: "40%"
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: seriesDays
          }
        };
      }
    },
    dark: function() {
      if (Session.get("dark")) {
        this.optionsABRatio = darkTheme;
        this.optionsABDistanceEvent = darkTheme;
      } else {
        this.optionsABRatio = lightTheme;
        this.optionsABDistanceEvent = lightTheme;
      }
    }
  },
  data() {
    return {
      /**************************** ABRatio  *****************************/
      seriesABRatio: [],
      optionsABRatio: {},
      /**************************** AB Distancia/Eventos  *****************************/
      seriesABDistanceEvent: [],
      optionsABDistanceEvent: {},


    };
  }
};

/* CONSTANTES DE INICIO */

//const ratioLabel = `Ratio(10*d/e) 15Km/h  [d=distancia, e=eventos]`,
const darkTheme = {
  theme: {
    mode: "dark"
  }
};
const lightTheme = {
  theme: {
    mode: "light"
  }
};
/*
const seriesABRatioDefault = [
  {
    name: "Ratio A",
    data: [99]
  },
  {
    name: "Ratio B",
    data: [99]
  }
];
const optionsABRatioDefault = {
  chart: {
    toolbar: {
      show: false
    }
  },
  theme: {
    mode: "dark"
  },
  title: {
    text: "Ratio(10*d/e) 15Km/h  [d=distancia, e=eventos]",
    align: "center",
    style: {
      fontSize: "16px"
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "40%"
    }
  },
  dataLabels: {
    enabled: true
  }
};
*/
</script>

<style scoped>
</style>
