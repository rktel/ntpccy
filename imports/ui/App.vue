<template>
  <div class="appRoot">
    <template v-if="!$route.meta.spa">
      <router-view></router-view>
    </template>
    <template else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {
  beforeMount() {
    let personal = {}

    Meteor.call("getPersonal", (error, persona) => {
   
        personal = persona
        console.log(personal)
      
    });

    if (Meteor.userId() && true) {
      this.$router.push({ name: "Home" });
    } else {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>
