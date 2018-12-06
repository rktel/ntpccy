<template>
  <section>
      <template>
          <v-combobox 
          v-model="selectPlates" 
          :items="plates" 
          label="Seleccione unidades" 
          multiple
          small-chips
          hide-selected
          solo></v-combobox>
      </template>
      <template>
            <v-menu ref="menuDS" :close-on-content-click="false" v-model="pickerDS" :nudge-right="40" :return-value.sync="dateStart" lazy transition="scale-transition" offset-y min-width="290px">
                <v-text-field slot="activator" v-model="dateStart" label="Fecha de Inicio" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="dateStart" @input="$refs.menuDS.save(dateStart)"></v-date-picker>
            </v-menu>
            <v-menu ref="menuTS" :close-on-content-click="false" v-model="pickerTS" :nudge-right="40" :return-value.sync="timeStart" lazy transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <v-text-field slot="activator" v-model="timeStart" label="Tiempo de Inicio" prepend-icon="access_time" readonly> </v-text-field>
                <v-time-picker v-if="pickerTS" v-model="timeStart" @change="$refs.menuTS.save(timeStart)" format="24hr"> </v-time-picker>
            </v-menu>          
      </template>
      <template>
            <v-menu ref="menuDE" :close-on-content-click="false" v-model="pickerDE" :nudge-right="40" :return-value.sync="dateEnd" lazy transition="scale-transition" offset-y min-width="290px">
                <v-text-field slot="activator" v-model="dateEnd" label="Fecha de Termino" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="dateEnd" @input="$refs.menuDE.save(dateEnd)"></v-date-picker>
            </v-menu>
            <v-menu ref="menuTE" :close-on-content-click="false" v-model="pickerTE" :nudge-right="40" :return-value.sync="timeEnd" lazy transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <v-text-field slot="activator" v-model="timeEnd" label="Tiempo de Termino" prepend-icon="access_time" readonly> </v-text-field>
                <v-time-picker v-if="pickerTE" v-model="timeEnd" @change="$refs.menuTE.save(timeEnd)" format="24hr"> </v-time-picker>
            </v-menu>          
      </template>
      <template>
            <section>
                <v-btn color="primary" block>Generar Reporte</v-btn>
            </section>          
      </template>
      <template>
          <v-progress-linear v-if="progressState == 1" :indeterminate="true" color="green"></v-progress-linear>
      </template>
      <template>
            <v-snackbar v-model="snackbar" :right="true" :timeout="timeout" :top="true">
            {{ snackbarText }}
            <v-btn color="pink" flat  @click="snackbar = false">Cerrar</v-btn>
            </v-snackbar>
      </template>
  </section>
</template>

<script>
export default {
  name: "HomeForm",
  data:()=>({
      plates: [],
      selectPlates:[],
      dateStart: null,
      dateEnd: null,
      timeStart: null,
      timeEnd: null,
      pickerDS: false,
      pickerDE: false,
      pickerTS: false,
      pickerTE: false,
      buttonGRDisabled: false, // TRUE PARA DESHABILITAR
      progressState: 0,
      snackbar: false,
      timeout: 6000,
      snackbarText: null,
  }),
  mounted(){
    Meteor.call('getPlates', (error, plates) => {
        if(!error){
            this.plates = plates.sort()
        }
    })
  }
};
</script>

<style>
</style>
