import Vue from 'vue'
import Vuetify from 'vuetify'
import App from '/imports/ui/App.vue'

// Quitamos mensaje Vue Development de consola del navegador
Vue.config.productionTip = false

// Vue Router config
import router from '../imports/api/routes'

// Vuex config
import store from '../imports/api/store'

// Vuetify CSS
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

// Meteor Tracker
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

// ApexCharts
//import VueApexCharts from 'vue-apexcharts'
//Vue.component('apexchart', VueApexCharts)

// Inicio de Vue en Meteor Client Side
Meteor.startup(() => {
    new Vue({
        render: h => h(App),
        router,
        store
    }).$mount('app')
});
// comentario forzado