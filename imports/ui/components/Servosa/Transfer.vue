<template>
  <section>
    <VLayout>
      <VFlex xs5>
        <VCard>
          <section>
            <VList two-line>
              <VListTile>
                <v-list-tile-content>
                  <v-list-tile-title>Opciones</v-list-tile-title>
                  <v-list-tile-sub-title>0/{{names.length}}  elegidos</v-list-tile-sub-title>
                </v-list-tile-content>
              </VListTile>
            </VList>
          </section>
          <VDivider/>
          <VList dense>
            <VListTile v-for="(item) in names" :key="item">{{item}}</VListTile>
          </VList>
        </VCard>
      </VFlex>
      <VFlex xs2></VFlex>
      <VFlex xs5></VFlex>
    </VLayout>
  </section>
</template>

<script>
const NAMES = [
  "Peppa",
  "Gato con Botas",
  "Mappets Baby",
  "El Mundo de Luna",
  "Kung FU Panda"
];
export default {
  data() {
    return {
      names: NAMES
    };
  }
};
</script>

<style>
</style>
