<template>
  <section></section>
</template>

<script>
export default {
  name: "HomeForm",
  mounted(){
    Meteor.call('getPlates', (error, plates) => {
        if(!error){
            console.log(plates.sort())
        }
    })
  }
};
</script>

<style>
</style>
