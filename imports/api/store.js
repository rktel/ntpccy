import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userProfile: {},
        userDialog: false
    },
    getters: {

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
        }
    },
    actions: {
        //END VUEX PRACTICE
    }
})