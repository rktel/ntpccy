<template>
    <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    Meteor.userId()
      ? this.$router.push({ name: "Home" })
      : this.$router.push({ name: "Login" });
  }
}
</script>

<style>

</style>
