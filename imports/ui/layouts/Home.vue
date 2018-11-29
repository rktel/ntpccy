<template>
  <v-app>
    <v-content>
      <v-container>
        <h1>Home Page</h1>
        <ul>
            <li v-for="name in names" :key="name" v-text="name"></li>
        </ul>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  computed:{
      ...mapState([
          'names'
      ]),
  }
};
</script>

<style>
</style>
