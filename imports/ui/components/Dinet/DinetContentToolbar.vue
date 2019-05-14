<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12 lg3>
        <v-select v-model="vehicle" :items="plates" label="Seleccione unidad" paceholder=" " outline></v-select>
      </v-flex>
      <v-flex xs12 lg3>
        <v-select v-model="searchItem" :items="searchItems" label="Tipo de reporte" placeholder=" " outline></v-select>
      </v-flex>
      <v-flex v-if="searchItem === 'Dia'" xs12 lg3>
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
      <v-flex v-else-if="searchItem === 'Mes'" xs12 lg3>
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
      <v-flex xs12 lg1 pt-0>
        <v-tooltip bottom>
          <v-btn fab slot="activator">
            <v-icon>search</v-icon>
          </v-btn>
          <span>Buscar</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { Session } from "meteor/session";
export default {
  mounted() {
    Meteor.call("DNT_getPlates", (error, plates) => {
      if (!error) {
        console.log("plates:", plates);
        Session.set("DNT_plates", plates);
        // Meteor.call("DNT_getData")
      }
    });
  },
  meteor: {
    plates() {
      return Session.get("DNT_plates");
    }
  },
  data() {
    return {
      searchItem: "Dia",
      searchItems: ["Mes", "Dia"],
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
