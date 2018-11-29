import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Layouts
import Login from '../ui/layouts/Login.vue'
import Home from '../ui/layouts/Home.vue'

const routes = [
    { name: 'Login', path: '/login', component: Login },
    { name: 'Home', path: '/', component: Home, redirect:'/home' },
]

export default new VueRouter({
    mode: 'history',
    routes
}) 