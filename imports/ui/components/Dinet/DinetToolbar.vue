<template>
  <v-toolbar app>
    <v-layout justify-space-between>
      <v-avatar color="grey lighten-4">
        <img src="img/Dinet_alt.png" alt="avatar">
      </v-avatar>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon>account_circle</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile v-for="(item,key) in profileMenu" :key="key" @click="item.action">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      profileMenu: [{ title: "Logout", action: () => this.logout }]
    };
  },
  methods: {
      logout(){
          alert('Logout')
      }
  }
};
</script>

<style>
</style>
