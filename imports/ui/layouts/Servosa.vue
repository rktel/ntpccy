<template>
    <v-app>
        <v-toolbar color="primary" dense dark app clipped-left>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Servosa</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <VNavigationDrawer clipped app flat>
            <h3>Drawer Left</h3>
        </VNavigationDrawer>
    </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
