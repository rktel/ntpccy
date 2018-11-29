import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
       names: ['Sophia','Deysi','Carmen','Milleny'],
       username: ''
    },
    getters:{
        countNames: state => {
            return state.names.length
        }
    },
    mutations:{
        ADD_NAME: (state,name) => {
            state.names.push(name)
        },
        SET_USERNAME: (state, payload) =>{
            state.username = payload
        }
    },
    actions:{

    }
})