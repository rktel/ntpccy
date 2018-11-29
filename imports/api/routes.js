import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Layouts
import Login from '../ui/layouts/Login.vue'
import Home from '../ui/layouts/Home.vue'

const routes = [
    { path: '/', redirect:'/home'},
    { name: 'Login', path: '/login', component: Login },
    { name: 'Home', path: '/home', component: Home},
]

export default new VueRouter({
    mode: 'history',
    routes
}) 