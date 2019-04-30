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
  created() {

    if (Meteor.userId()) {
      this.$router.push({ name: "Home" });
    } else {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>
