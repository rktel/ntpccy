<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12 lg5 class="green">

              <span class="title font-italic grey--text">Control de Velocidad</span>
 
      </v-flex>
      <v-flex xs12 offset-lg2 lg5 class="red">

          <v-btn primary>Signup</v-btn>
    
      </v-flex>
    </v-layout>
    <v-toolbar color="transparent" flat>
      <v-toolbar-title class="px-4">
        <span class="title font-italic grey--text">Control de Velocidad</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        ref="menu"
        lazy
        :close-on-content-click="false"
        v-model="menu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Seleccione dia"
          v-model="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
      </v-menu>
      <v-menu
        ref="menu2"
        lazy
        :close-on-content-click="false"
        v-model="menu2"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Seleccione mes"
          v-model="date2"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date2" no-title @input="menu2 = false" type="month"></v-date-picker>
      </v-menu>

      <v-radio-group v-model="radios" row>
        <template slot="label">
          <div>
            Your favourite
            <strong>search engine</strong>
          </div>
        </template>
        <v-radio value="Dia">
          <template slot="label">
            <v-menu
              ref="menu"
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Seleccione dia"
                v-model="date"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
            </v-menu>
          </template>
        </v-radio>
        <v-radio value="Mes">
          <template slot="label">
            <v-menu
              ref="menu2"
              lazy
              :close-on-content-click="false"
              v-model="menu2"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Seleccione mes"
                v-model="date2"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date2" no-title @input="menu2 = false" type="month"></v-date-picker>
            </v-menu>
          </template>
        </v-radio>
      </v-radio-group>
    </v-toolbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      menu: false,
      date2: null,
      menu2: false,
      radios: "Dia"
    };
  }
};
</script>

<style>
</style>
