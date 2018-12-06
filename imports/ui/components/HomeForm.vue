<template>
  <section>
      <template>
          <v-combobox v-model="selectPlates" :items="plates" label="Seleccione unidades" multiple></v-combobox>
      </template>
      <template></template>
  </section>
</template>

<script>
export default {
  name: "HomeForm",
  data:()=>({
      plates: [],
      selectPlates:[]
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
