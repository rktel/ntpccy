<template>
  <section>
    <v-layout row wrap align-center>
      <v-flex xs12 lg5>
        <div class="title font-italic grey--text">Control de Velocidad</div>
      </v-flex>
      <v-flex xs12 offset-lg2 lg5 >
        <v-layout row wrap align-center>
          <v-flex>
 
            <v-select
            v-model="dropdown"
              :items="dropdown_font"
              label="Dia/Mes"
              placeholder=" "
              outline
              dense
            ></v-select>
          </v-flex>
          <v-flex v-if="dropdown === 'Dia'">
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
      
      
 
              width="100px"
            >
              <v-text-field
                slot="activator"
                label="Seleccione dia"
                v-model="date"
                prepend-inner-icon="event"
                readonly
                outline
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex v-else-if="dropdown === 'Mes'">
            <v-menu
              ref="menu2"
              lazy
              :close-on-content-click="false"
              v-model="menu2"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                label="Seleccione mes"
                v-model="date2"
                prepend-inner-icon="event"
                readonly
                outline
              ></v-text-field>
              <v-date-picker v-model="date2" no-title @input="menu2 = false" type="month"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex>
            <v-btn icon color="#11274c" @mouseover="mouseOver">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropdown: "Dia",
      dropdown_font: ["Mes", "Dia"],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      date2: null,
      menu2: false
    };
  },
  methods: {
    mouseOver() {
      alert("Demo");
    }
  }
};
</script>

<style>
</style>
