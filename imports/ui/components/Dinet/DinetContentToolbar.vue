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
      <v-date-picker v-model="date" scrollable @input="modal = false">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
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
                      :return-value.sync="date"
                    >
                      <v-text-field
                        slot="activator"
                        label="Picker in menu"
                        v-model="date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
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
