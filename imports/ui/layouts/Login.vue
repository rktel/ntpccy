<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card hover light class="pa-4">
              <v-card-text>
                <h1 class="font-weight-bold text-xs-center mb-4">Login</h1>
                <v-text-field
                  append-icon="person"
                  name="login"
                  label="Usuario"
                  placeholder="Introduce tu usuario"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  label="Password"
                  placeholder="Introduce tu password"
                  type="password"
                  v-model="password"
                  @keyup.enter="onLogin"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="text-xs-center">
                <v-btn block dark @click="onLogin">entrar</v-btn>
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
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onLogin() {
      const { username, password } = this;
      if (username.length > 0 && password.length > 0) {
        Meteor.loginWithPassword(username, password, error => {
          if (!error) {
            this.$router.push({ name: "Home" });
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
