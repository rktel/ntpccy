<template>
  <section>
      <VLayout>
          <VFlex xs5>
              <VCard>
                  <VCardTitle>
                      <h3>Opciones</h3>
                      <VSubheader>0/{{names.length}} elegidos </VSubheader>
                  </VCardTitle>
                  <VDivider/>
                  <VList dense>
                      <VListTile v-for="(item) in names" :key="item">
                          {{item}}
                      </VListTile>
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
