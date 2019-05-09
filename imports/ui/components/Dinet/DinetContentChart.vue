<template>
  <section>
    <v-layout row wrap>
      <v-flex lg3 xs12>
        <v-card height="250" color="grey lighten-2">
          <div>
            <apexchart
              class="vertical-bar"
              height="250"
              type="bar"
              :options="options"
              :series="series"
            ></apexchart>
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
export default {
  mounted() {
   // setInterval(this.increment, 2000);
  },
  data: function() {
    return {
      options: {
        xaxis: {
          categories: [1991, 1992]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40]
        }
      ]
    };
  },
  methods: {
    increment() {
      let seriesData = this.series[0].data;
      seriesData = seriesData.map(element => {
        return element + 1;
      });
      this.series[0].data = seriesData;
    }
  }
};
</script>

<style scoped>
.vertical-bar {
  max-width: 600px;
  margin: 35px auto;
}
</style>
