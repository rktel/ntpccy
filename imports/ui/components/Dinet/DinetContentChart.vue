<template>
  <section>
    <v-layout row wrap>
      <v-flex lg3 xs12 h>
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
      <v-flex lg3 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

      <v-flex lg9 xs12>
        <v-card height="500">
          <div>
            <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
          </div>
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
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
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
#vuechart-example {
  background-color: brown;
}
</style>
