import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Layouts
import Login from '../ui/layouts/Login.vue'
import Home from '../ui/layouts/Home.vue'
import Dinet from '../ui/layouts/Dinet.vue'
import Phantom from '../ui/layouts/Phantom.vue'
import Servosa from '../ui/layouts/Servosa.vue'

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
    {
        name: 'Phantom', path: '/phantom', component: Phantom,
        meta: {
            spa: true
        }
    },
    {
        name: 'Servosa', path: '/servosa', component: Servosa,
        meta: {
            spa: true
        }
    },
]

export default new VueRouter({
    mode: 'history',
    routes
}) 