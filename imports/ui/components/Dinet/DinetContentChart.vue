<template>
  <section>
    <v-layout row wrap>

      <v-flex lg4 xs12>
        <v-card height="300">
          <div class="example">
            <apexcharts type="bar" :options="chartOptions" :series="series"></apexcharts>
          </div>
        </v-card>
      </v-flex>

      <v-flex lg4 xs12>
        <v-card height="300">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12>
        <v-card height="300">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

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
  mounted(){
    console.log(this.$vuetify.breakpoint)
  },
  computed:{

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
        theme:{
          mode:'dark'
        },
        responsive:[{
          breakpoint: 850,
          options:{
            chart:{
              height:260
            }
          }
        }],
        title:{
          text:"Exceso 15 Km/h",
          align: 'center'
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
          categories: [
            "Turno A",
          ]
        },
          fill: {
          opacity: 0.9
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
