import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../ui/layouts/Login.vue'

const routes = [
    { name: 'Login', path: '/login', component: Login }
]

export default new VueRouter({
    mode: 'history',
    routes
}) 