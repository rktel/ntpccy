<template>
  <section>
    <v-layout row wrap>
      <v-flex lg3 xs12>
        <v-card height="250">
          <div class="example">
            <apexcharts type="bar" :options="chartOptions" :series="series" heigth="250"></apexcharts>
          </div>
        </v-card>
      </v-flex>
      <v-flex lg3 xs12>
        <v-card height="250">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg6 xs12>
        <v-card height="250">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

      <!--v-flex lg8 xs12>
        <v-card height="450">
          <v-btn>Jarvis</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12>
        <v-card height="450">
          <v-btn>Jarvis</v-btn>
        </v-card>
      </v-flex-->
    </v-layout>
  </section>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts
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
          data: [35]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "45%"
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: [
            "1° Turno",
          ]
        },
          fill: {
          opacity: 0.8
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val
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
