<template>
  <section>
    <v-layout row wrap>
      <v-flex lg6 xs12>
        <v-card v-show="report">
          <apexcharts type="bar" :options="optionsABRatio" :series="seriesABRatio"></apexcharts>
        </v-card>
      </v-flex>
      <v-flex lg6 xs12>
        <v-card v-show="report">
          <apexcharts type="bar" :options="optionsAB" :series="seriesAB"></apexcharts>
        </v-card>
      </v-flex>
      <v-flex lg6 xs12>
        <v-card v-show="report">
          <apexcharts type="bar" :options="optionsA" :series="seriesA"></apexcharts>
        </v-card>
      </v-flex>
      <v-flex lg6 xs12>
        <v-card v-show="report">
          <apexcharts type="bar" :options="optionsB" :series="seriesB"></apexcharts>
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
        const report = this.report;
        const plate = report.plate;
        const data = report.data;
        const serieA_exceso15 = data.map(el => el.turnA.exceso15);
        const serieA_distancia = data.map(el => el.turnA.distancia);

        const ratioA = serieA_distancia.map((el, index)=>{
          if(!el && !serieA_exceso15[index]){
            return parseInt(el/serieA_exceso15[index])
          }else{
            return 0
          }
        })

        const serieA_days = data.map(el => el.day);
        console.log(serieA_exceso15, serieA_distancia, serieA_days);
        this.seriesA = [
          {
            name: "#Eventos",
            data: serieA_exceso15
          },
          {
            name: "Distancia(Km)",
            data: serieA_distancia
          }
        ];
        this.optionsA = {
          xaxis: {
            categories: serieA_days
          }
        };

        const serieB_exceso15 = data.map(el => el.turnB.exceso15);
        const serieB_distancia = data.map(el => el.turnB.distancia);
        const ratioB = serieB_distancia.map((el, index)=>{
          if(!el && !serieB_exceso15[index]){
            return parseInt(el/serieB_exceso15[index])
          }else{
            return 0
          }
        })
        const serieB_days = data.map(el => el.day);
        console.log(serieB_exceso15, serieB_distancia, serieB_days);
        this.seriesB = [
          {
            name: "#Eventos",
            data: serieB_exceso15
          },
          {
            name: "Distancia(Km)",
            data: serieB_distancia
          }
        ];
        this.optionsB = {
          xaxis: {
            categories: serieB_days
          }
        };


        this.seriesAB = [
          {
            name: "#Eventos A",
            data: serieA_exceso15
          },
          {
            name: "Distancia(Km) A",
            data: serieA_distancia
          },
          {
            name: "#Eventos B",
            data: serieB_exceso15
          },
          {
            name: "Distancia(Km) B",
            data: serieB_distancia
          }
        ];
        this.optionsAB = {
          xaxis: {
            categories: serieB_days
          }
        };


        this.seriesABRatio = [
          {
            name: "Ratio A",
            data: ratioA
          },
          {
            name: "Ratio B",
            data: ratioB
          },

        ];
        this.optionsABRatio = {
          xaxis: {
            categories: serieB_days
          }
        };

      }

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
        this.optionsABRatio = {
          theme: {
            mode: "dark"
          }
        };
        this.optionsAB = {
          theme: {
            mode: "dark"
          }
        };
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
        this.optionsABRatio = {
          theme: {
            mode: "light"
          }
        };
        this.optionsAB = {
          theme: {
            mode: "light"
          }
        };
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
      /**************************** ABRatio  *****************************/
      seriesABRatio: [
        {
          name: "Ratio A",
          data: [76]
        },
        {
          name: "Ratio B",
          data: [30]
        },
      ],
      optionsABRatio: {
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
            columnWidth: "40%"
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
      /*********************************** AB ******************************************/
      seriesAB: [
        {
          name: "#Eventos A",
          data: [76]
        },
        {
          name: "Distancia(Km) A",
          data: [30]
        },
        {
          name: "#Eventos B",
          data: [76]
        },
        {
          name: "Distancia(Km) B",
          data: [30]
        }
      ],
      optionsAB: {
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
            columnWidth: "40%"
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
      /******************************* TURNO A *****************************************/
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
            columnWidth: "40%"
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
            columnWidth: "40%"
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
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
      }
      /***********************************END TURNO B ***********************************/
    };
  }
};
</script>

<style scoped>
</style>
