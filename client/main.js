import Vue from 'vue'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
    new Vue({
        render: h => h(App),
    }).$mount('app')
});