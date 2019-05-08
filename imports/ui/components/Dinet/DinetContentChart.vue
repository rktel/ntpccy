<template>
  <section>
    <v-layout row wrap>
      <v-flex lg3 xs12>
        <v-card height="200" color="grey lighten-2">
          <apexchart width="380" type="bar" :options="options1" :series="series1"></apexchart>
        </v-card>
      </v-flex>
      <v-flex lg3 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg3 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg3 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

      <v-flex lg9 xs12>
        <v-card height="500">
          <v-btn>Jarvis</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg3 xs12>
        <v-card height="500">
          <v-btn>Jarvis</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  mounted() {
    setInterval(this.increment, 2000);
  },
  data: function() {
    return {
      options1: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
          dataLabels: {
            enabled: true,
            style: {
                colors: ['#333']
            },
      },
      series1: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  },
  methods: {
    increment() {
      let seriesData = this.series1[0].data;
      seriesData = seriesData.map(element => {
        return element + 1;
      });
      this.series1[0].data = seriesData;
    }
  }
};
</script>

<style scoped>
</style>
