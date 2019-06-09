<template>
  <section>
    <VLayout>
      <VFlex xs5>
        <VCard width="200">
          <section>
            <VList two-line dense>
              <VListTile>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Opciones</v-list-tile-title>
                  <v-list-tile-sub-title>0/{{names.length}} elegidos</v-list-tile-sub-title>
                </v-list-tile-content>
              </VListTile>
            </VList>
          </section>
          <VDivider/>
          <section class="px-2">
            <v-input append-icon="search">
                <input type="text" value="Text de prueba">
            </v-input>
          </section>
          <VDivider/>
          <VList dense :style="{height: 205+ 'px', overflowY: 'scroll'}">
            <VListTile v-for="(item) in names" :key="item">
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>
              <VListTileContent>
                <v-list-tile-sub-title>{{item}}</v-list-tile-sub-title>
              </VListTileContent>
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
  "Kung Fu Panda",
  "Monchichi",
  "Mini Beat Power Rocket",
  "Gaby and Alex"
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
