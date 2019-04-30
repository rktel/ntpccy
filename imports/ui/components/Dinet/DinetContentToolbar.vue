<template>
  <v-toolbar color="transparent" flat>
    <v-toolbar-title class="px-4">
      <span class="title font-italic grey--text">Control de Velocidad</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-dialog
      ref="dialog"
      persistent
      v-model="modal"
      lazy
      full-width
      width="290px"
      :return-value.sync="date"
    >
      <v-text-field
        slot="activator"
        label="Dia"
        v-model="date"
        append-icon="event"
        placeholder=" "
        readonly
        outline
      ></v-text-field>
      <v-date-picker v-model="date" scrollable>

      </v-date-picker>
    </v-dialog>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      modal: false
    };
  }
};
</script>

<style>
</style>
