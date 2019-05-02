<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12 lg4 pt-4>
        <div class="title font-italic grey--text">Control de Velocidad</div>
      </v-flex>
      <v-flex xs12 offset-lg2 lg2>
        <v-select v-model="dropdown" :items="dropdown_font" label="Dia/Mes" placeholder=" " outline></v-select>
      </v-flex>
      <v-flex v-if="dropdown === 'Dia'" xs12 lg2>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
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
      <v-flex v-else-if="dropdown === 'Mes'" xs12 lg2>
        <v-menu
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
          transition="scale-transition"
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
      <v-flex xs12 lg1>
        <v-tooltip bottom>
          <v-btn icon dark slot="activator">
            <v-icon>search</v-icon>
          </v-btn>
          <span>Buscar</span>
        </v-tooltip>
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
  methods: {}
};
</script>

<style>
</style>
