<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card hover class="pa-4">
                        <v-card-text>
                            <h1 class="font-weight-bold text-xs-center mb-4">Login</h1>
                            <v-text-field append-icon="person" name="login" label="Usuario" placeholder="Introduce tu usuario" type="text" outline></v-text-field>
                            <v-text-field append-icon="lock" name="password" label="Password" placeholder="Introduce tu password" type="password" outline></v-text-field>
                        </v-card-text>
                        <v-card-actions class="text-xs-center">
                            <v-btn block round>login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-container>
        </v-content>       
    </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>
