<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card hover class="pa-5" max-width=300>
                        <v-card-text>
                            <h2 class="font-weight-bold">Login</h2>
                            <v-text-field prepend-icon="person" name="login" label="Usuario" type="text"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Contraseña" type="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn>login</v-btn>
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
