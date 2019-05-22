<template>
  <section>
    <v-layout row wrap>
      <v-flex lg6 offset-lg3 xs12>
        <v-card v-show="report">
          <apexcharts type="bar" :options="optionsA" :series="seriesA"></apexcharts>
        </v-card>
      </v-flex>
      <!--v-flex lg6 xs12>
        <v-card>
          <apexcharts type="bar" :options="optionsB" :series="seriesB"></apexcharts>
        </v-card>
      </v-flex-->
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
      console.log("Session.get(report): ",Session.get("report"));
      if(Session.get("report")){
        const report = Session.get("report")
        const plate = report.plate
        const data = report.data
        const serieA_exceso15 = data.map(el=>el.turnA.exceso15)
        console.log(serieA_exceso15);
      }
        /*
        this.seriesA = [
          {
            name: "#Eventos",
            data: [this.report.exceso15]
          },
          {
            name: "Distancia(Km)",
            data: [this.report.distanciaRecorrida]
          }
        ];        
      }
      */
      /*
      if (Session.get("report")) {
        this.seriesA = [
          {
            name: "#Eventos",
            data: [this.report.exceso15]
          },
          {
            name: "Distancia(Km)",
            data: [this.report.distanciaRecorrida]
          }
        ];
      }
      */
    },
    dark: function() {
      if (Session.get("dark")) {
        this.optionsA = {
          theme: {
            mode: "dark"
          }
        };
        this.optionsB = {
          theme: {
            mode: "dark"
          }
        };
      } else {
        this.optionsA = {
          theme: {
            mode: "light"
          }
        };
        this.optionsB = {
          theme: {
            mode: "light"
          }
        };
      }
    }
  },
  data() {
    return {
      /******************************* TURNO A ***************************************/
      seriesA: [
        {
          name: "#Eventos",
          data: [76]
        },
        {
          name: "Distancia(Km)",
          data: [30]
        }
      ],
      optionsA: {
        chart: {
          toolbar: {
            show: false
          },
          events: {
            dataPointSelection: function(event, chartContext, config) {
              //console.log("SeriesAconfig:", config);
            }
          }
        },
        theme: {
          mode: "dark",
          palette: "palette3"
        },
        title: {
          text: "Exceso 15 Km/h",
          align: "center",
          style: {
            fontSize: "16px"
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%"
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
        //  categories: ["Turno A"]
          categories: [""]
        },
        fill: {
          opacity: 0.9
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      },
      /******************************* TURNO B ***************************************/
      seriesB: [
        {
          name: "#Eventos",
          data: [44]
        },
        {
          name: "Distancia(Km)",
          data: [80]
        }
      ],
      optionsB: {
        chart: {
          toolbar: {
            show: false
          },
          events: {
            dataPointSelection: function(event, chartContext, config) {
              // console.log("SeriesBconfig:", config);
            }
          }
        },
        theme: {
          mode: "dark",
          palette: "palette2"
        },
        title: {
          text: "Exceso 15 Km/h",
          align: "center",
          style: {
            fontSize: "16px"
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%"
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: ["Turno B"]
        },
        fill: {
          opacity: 0.9
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      }
      /***********************************END TURNO B ***********************************/
    };
  }
};
</script>

<style scoped>
</style>
