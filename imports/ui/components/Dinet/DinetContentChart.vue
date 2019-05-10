<template>
  <section>
    <v-layout row wrap>
      <v-flex lg3 xs12>
        <v-card height="250">
          <div class="example">
            <apexcharts
              type="bar"
              :options="chartOptions"
              :series="series"
            ></apexcharts>
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
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [70, 91]
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
