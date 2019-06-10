<template>
  <section>
    <VLayout>
      <VFlex xs3>
        <VCard>
          <!--section class="px-3">
            <v-text-field label="Filtrar nombre" append-icon="search"></v-text-field>
          </section>
          <VDivider/-->
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
          <VList dense :style="{height: 205+ 'px', overflowY: 'scroll'}">
            <VListTile v-for="(item) in names" :key="item.name">
              <v-list-tile-action>
                <v-checkbox></v-checkbox>
              </v-list-tile-action>
              <VListTileContent>
                <v-list-tile-sub-title>{{item.name}}</v-list-tile-sub-title>
              </VListTileContent>
            </VListTile>
          </VList>
        </VCard>
      </VFlex>
      <VFlex xs1>
        <VLayout align-center justify-center column fill-height>
          <VBtn color="primary" icon>
            <VIcon>chevron_right</VIcon>
          </VBtn>
          <VBtn color="primary" icon>
            <VIcon>chevron_left</VIcon>
          </VBtn>
        </VLayout>
      </VFlex>
      <VFlex xs3>
        <VLayout justify-center column fill-height>
          <VCard>
            <section>
              <VList two-line dense>
                <VListTile>
                  <v-list-tile-action>
                    <v-checkbox></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Elegidos</v-list-tile-title>
                    <v-list-tile-sub-title>0/{{names.length}} elegidos</v-list-tile-sub-title>
                  </v-list-tile-content>
                </VListTile>
              </VList>
            </section>
            <VDivider/>
            <VList dense :style="{height: 205+ 'px', overflowY: 'scroll'}">
              <VListTile v-for="(item) in names" :key="item.name">
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
                <VListTileContent>
                  <v-list-tile-sub-title>{{item.name}}</v-list-tile-sub-title>
                </VListTileContent>
              </VListTile>
            </VList>
          </VCard>
        </VLayout>
      </VFlex>
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
let neoNames = [];
export default {
  created() {
    neoNames = NAMES.map((el, index) => {
      return {
        checked: false,
        name: el
      };
    });
    this.names = neoNames
  },
  data() {
    return {
      names: []
    };
  }
};
</script>

<style>
</style>
