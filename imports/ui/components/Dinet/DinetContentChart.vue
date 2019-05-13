<template>
  <section>
    <v-layout row wrap>
      <v-flex lg6 xs12>
        <v-card height="300" class="pr-3 pt-3">
          <div>
            <apexcharts type="bar" :options="chartOptions" :series="series"></apexcharts>
          </div>
        </v-card>
      </v-flex>

      <v-flex lg6 xs12>
        <v-card height="300">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

    </v-layout>
  </section>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Session } from "meteor/session";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts
  },
  meteor: {
    dark() {
      return Session.get("dark");
    }
  },
  watch:{
    dark: function(){
      if(Session.get("dark")){
        this.chartOptions = {
          theme:{
            mode: "dark"
          }
        }
      }else{
        this.chartOptions = {
          theme:{
            mode: "light"
          }
        }        
      }
    }
  },
  data() {
    return {
      series: [
        {
          name: "#Eventos",
          data: [76]
        },
        {
          name: "Distancia(Km)",
          data: [30]
        }
      ],
      chartOptions: {
        chart: {
         /*  foreColor: "#2d3436" */
        },
        theme: {
          mode: "dark",
          palette: "palette2",
          monochrome: {
            enabled: true,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65
          }
        },
        responsive: [
          {
            breakpoint: 850,
            options: {
              chart: {
                height: 260
              }
            }
          }
        ],
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
          categories: ["Turno A"]
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
    };
  }
};
</script>

<style scoped>

</style>
