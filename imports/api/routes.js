import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Layouts
import Login from '../ui/layouts/Login.vue'
import Home from '../ui/layouts/Home.vue'
import Dinet from '../ui/layouts/Dinet.vue'

const routes = [
    { path: '/', redirect: '/rpt' },
    { name: 'Login', path: '/login', component: Login },
    { name: 'Home', path: '/rpt', component: Home },
    {
        name: 'Dinet', path: '/dinet', component: Dinet,
        meta: {
            spa: true
        }
    },
]

export default new VueRouter({
    mode: 'history',
    routes
}) 