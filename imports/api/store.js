import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userProfile: {}
    },
    getters:{

    },
    mutations:{
        SET_USERPROFILE: (state, payload) => {
            state.userProfile = payload
        } 
    },
    actions:{
        //END VUEX PRACTICE
    }
})