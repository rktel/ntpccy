<template>
  <section>
    <v-layout row wrap>
      <v-flex lg4 xs12>
        <v-card height="200" color="grey lighten-2">
          <apexchart height="180" type="bar" :options="options1" :series="series1"></apexchart>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12>
        <v-card height="200">
          <v-btn>Mark</v-btn>
        </v-card>
      </v-flex>

      <v-flex lg8 xs12>
        <v-card height="500">
          <v-btn>Jarvis</v-btn>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12>
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

        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        responsive:[{
          breakpoint: 800,
          options:{
            colors:['#EEEEEE'],
            chart:{
              background:'#003',
              foreColor: '#500',
              events:{
                dataPointSelection: function(event, chartContext, config){
                  console.log('event:',event, 'chartContext:',chartContext, 'config:',config)
                }
              }
            }
          }
        }]

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
