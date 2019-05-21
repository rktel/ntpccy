import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userProfile: {},
        userDialog: false,
        drawer: true
    },
    getters: {
        drawer: state => state.drawer
    },
    mutations: {
        SET_USERPROFILE: (state, payload) => {
            state.userProfile = payload
        },
        SHOW_USERDIALOG: (state) => {
            state.userDialog = true
        },
        HIDE_USERDIALOG: (state) => {
            state.userDialog = false
        },
        TOGGLE_DRAWER:()=>{
            state.drawer = !state.drawer
        }
    },
    actions: {
        //END VUEX PRACTICE
    }
})