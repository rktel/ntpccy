import Vue from 'vue'

import App from '/imports/ui/App.vue'

// Quitamos mensaje Vue Development de consola del navegador
Vue.config.productionTip = false

import router from '../imports/api/routes'

// Inicio de Vue en Meteor Client Side
Meteor.startup(() => {
    new Vue({
        render: h => h(App),
        router
    }).$mount('app')
});