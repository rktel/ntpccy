<template>
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
        label="Picker in menu"
        v-model="date"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="date" no-title @input="menu = false">
       </v-date-picker>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      menu: false
    };
  }
};
</script>

<style>
</style>
